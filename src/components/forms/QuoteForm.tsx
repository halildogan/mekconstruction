"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PROJECT_SIZES, type Option } from "@/lib/forms/options";
import { quoteRequestSchema, type QuoteRequest, type QuoteRequestInput } from "@/lib/forms/schemas";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import {
  Checkbox,
  Field,
  FieldError,
  FormSection,
  Honeypot,
  Select,
  TextArea,
  TextInput,
  describedBy,
} from "@/components/forms/fields";
import { FileUploader, type UploaderState } from "@/components/forms/FileUploader";
import { FormErrorSummary, type SummaryError } from "@/components/forms/FormErrorSummary";
import { SubmissionSuccess } from "@/components/forms/SubmissionSuccess";
import { Turnstile } from "@/components/forms/Turnstile";
import { applyServerErrors, summarize } from "@/components/forms/formErrors";
import { useSubmission, useTorontoToday } from "@/components/forms/useSubmission";

const FIELD_ORDER = [
  "name",
  "company",
  "email",
  "phone",
  "projectName",
  "projectLocation",
  "service",
  "projectSize",
  "desiredStartDate",
  "projectDescription",
  "documentsLink",
  "attachments",
  "consent",
] as const;

interface QuoteFormProps {
  services: Option[];
  defaultService?: string;
  phone: { display: string; e164: string };
}

export function QuoteForm({ services, defaultService = "", phone }: QuoteFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<QuoteRequestInput, unknown, QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectName: "",
      projectLocation: "",
      service: services.some((s) => s.value === defaultService) ? defaultService : "",
      projectSize: "",
      desiredStartDate: "",
      projectDescription: "",
      documentsLink: "",
      attachments: [],
      consent: false,
    },
  });
  const { state, submit, markStarted } = useSubmission("quote");
  const today = useTorontoToday();
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const [uploads, setUploads] = useState<UploaderState>({ ids: [], busy: false, failed: 0 });
  const [summary, setSummary] = useState<{ errors: SummaryError[]; message?: string }>({ errors: [] });
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const onUploadsChange = useCallback((next: UploaderState) => setUploads(next), []);

  const showSummary = (next: { errors: SummaryError[]; message?: string }) => {
    setSummary(next);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  const onValid = async (values: QuoteRequest) => {
    if (uploads.busy) {
      return showSummary({ errors: [], message: "Files are still uploading. Wait for them to finish, then submit." });
    }
    if (uploads.failed > 0) {
      return showSummary({ errors: [], message: "Some files failed to upload. Retry or remove them before submitting." });
    }
    setSummary({ errors: [] });
    const result = await submit(
      { ...values, attachments: uploads.ids },
      { honeypot: honeypotRef.current?.value ?? "", turnstileToken },
    );
    if (result.ok) {
      track("request_quote_submitted", { service: values.service, files: uploads.ids.length });
      return;
    }
    showSummary({ errors: applyServerErrors(result.fieldErrors, FIELD_ORDER, setError) });
  };

  if (state.status === "success") {
    return (
      <SubmissionSuccess
        title="Quote request received."
        reference={state.reference}
        phone={phone}
        nextSteps={[
          "We review your description, drawings and photos.",
          "We contact you to confirm scope, schedule and whether a site visit is needed.",
          "We issue a written quotation with inclusions, exclusions and clarifications.",
        ]}
      >
        <p>Thank you. Your request has been sent to MEK, and a confirmation is on its way to your inbox.</p>
      </SubmissionSuccess>
    );
  }

  const errorMessage = state.status === "error" ? state.message : summary.message;

  return (
    <form
      noValidate
      onSubmit={(event) =>
        void handleSubmit(onValid, (formErrors) => showSummary({ errors: summarize(formErrors, FIELD_ORDER) }))(event)
      }
      onFocusCapture={() => {
        markStarted();
        if (!started.current) {
          started.current = true;
          track("request_quote_started");
        }
      }}
      className="relative grid gap-12"
    >
      <p className="text-[0.9375rem] text-steel-600">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      {(summary.errors.length > 0 || errorMessage) && (
        <FormErrorSummary ref={summaryRef} errors={summary.errors} message={errorMessage} />
      )}

      <FormSection index="01" title="Contact details">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="name" label="Name" required error={errors.name?.message}>
            <TextInput
              id="name"
              autoComplete="name"
              invalid={!!errors.name}
              aria-describedby={describedBy("name", undefined, errors.name?.message)}
              {...register("name")}
            />
          </Field>
          <Field name="company" label="Company" error={errors.company?.message}>
            <TextInput
              id="company"
              autoComplete="organization"
              invalid={!!errors.company}
              aria-describedby={describedBy("company", undefined, errors.company?.message)}
              {...register("company")}
            />
          </Field>
          <Field name="email" label="Email" required error={errors.email?.message}>
            <TextInput
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              invalid={!!errors.email}
              aria-describedby={describedBy("email", undefined, errors.email?.message)}
              {...register("email")}
            />
          </Field>
          <Field name="phone" label="Phone" error={errors.phone?.message}>
            <TextInput
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              invalid={!!errors.phone}
              aria-describedby={describedBy("phone", undefined, errors.phone?.message)}
              {...register("phone")}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection index="02" title="Project and scope" description="Tell us what needs pricing and where.">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="projectName" label="Project name" error={errors.projectName?.message}>
            <TextInput
              id="projectName"
              invalid={!!errors.projectName}
              aria-describedby={describedBy("projectName", undefined, errors.projectName?.message)}
              {...register("projectName")}
            />
          </Field>
          <Field name="projectLocation" label="Project location" required error={errors.projectLocation?.message}>
            <TextInput
              id="projectLocation"
              invalid={!!errors.projectLocation}
              aria-describedby={describedBy("projectLocation", undefined, errors.projectLocation?.message)}
              {...register("projectLocation")}
            />
          </Field>
          <Field name="service" label="Service" required error={errors.service?.message}>
            <Select
              id="service"
              placeholder="Select a service"
              invalid={!!errors.service}
              aria-describedby={describedBy("service", undefined, errors.service?.message)}
              {...register("service")}
            >
              {services.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field name="projectSize" label="Estimated project size" error={errors.projectSize?.message}>
            <Select
              id="projectSize"
              placeholder="Select a size range"
              invalid={!!errors.projectSize}
              aria-describedby={describedBy("projectSize", undefined, errors.projectSize?.message)}
              {...register("projectSize")}
            >
              {PROJECT_SIZES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field name="desiredStartDate" label="Desired start date" error={errors.desiredStartDate?.message}>
            <TextInput
              id="desiredStartDate"
              type="date"
              min={today}
              invalid={!!errors.desiredStartDate}
              aria-describedby={describedBy("desiredStartDate", undefined, errors.desiredStartDate?.message)}
              {...register("desiredStartDate")}
            />
          </Field>
        </div>
        <Field
          name="projectDescription"
          label="Project description"
          required
          hint="Scope, approximate quantities or areas, finish requirements, access and timing constraints."
          error={errors.projectDescription?.message}
        >
          <TextArea
            id="projectDescription"
            rows={6}
            invalid={!!errors.projectDescription}
            aria-describedby={describedBy("projectDescription", true, errors.projectDescription?.message)}
            {...register("projectDescription")}
          />
        </Field>
      </FormSection>

      <FormSection
        index="03"
        title="Drawings and photos"
        description="Drawings, specifications and site photos help us price accurately."
      >
        <div id="attachments" tabIndex={-1} className="outline-none">
          <FileUploader
            form="quote"
            label="Files"
            description="Drawings, specifications, finish schedules and photos of existing conditions."
            onChange={onUploadsChange}
            error={errors.attachments?.message}
          />
        </div>
        <Field
          name="documentsLink"
          label="Link to documents"
          hint="For large files: a Dropbox, Google Drive, SharePoint or similar link."
          error={errors.documentsLink?.message}
        >
          <TextInput
            id="documentsLink"
            type="url"
            inputMode="url"
            placeholder="https://"
            invalid={!!errors.documentsLink}
            aria-describedby={describedBy("documentsLink", true, errors.documentsLink?.message)}
            {...register("documentsLink")}
          />
        </Field>
      </FormSection>

      <FormSection index="04" title="Submit">
        <div>
          <Checkbox
            id="consent"
            invalid={!!errors.consent}
            aria-describedby={errors.consent?.message ? "consent-error" : undefined}
            label={
              <>
                I have read the{" "}
                <Link href="/privacy" className="font-semibold underline underline-offset-2" target="_blank">
                  Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
                </Link>{" "}
                and agree to MEK using this information to prepare a quotation.
                <span className="ml-1 text-danger" aria-hidden="true">*</span>
              </>
            }
            {...register("consent")}
          />
          <FieldError name="consent" error={errors.consent?.message} />
        </div>

        <Honeypot ref={honeypotRef} />
        <Turnstile onToken={setTurnstileToken} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" arrow disabled={state.status === "submitting"}>
            {state.status === "submitting" ? "Submitting…" : "Request a Quote"}
          </Button>
          <p className="text-sm text-steel-600" aria-live="polite">
            {uploads.busy ? "Files are still uploading…" : "Files are stored privately and never published."}
          </p>
        </div>
      </FormSection>
    </form>
  );
}
