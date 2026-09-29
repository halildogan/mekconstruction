"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BID_TRADES, PROJECT_TYPES } from "@/lib/forms/options";
import { bidInvitationSchema, type BidInvitation, type BidInvitationInput } from "@/lib/forms/schemas";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
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
  "companyName",
  "contactName",
  "email",
  "phone",
  "projectName",
  "projectLocation",
  "projectType",
  "bidDueDate",
  "bidDueTime",
  "trades",
  "tradesOther",
  "projectDescription",
  "documentsLink",
  "attachments",
  "message",
  "consent",
] as const;

const defaultValues: BidInvitationInput = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  projectName: "",
  projectLocation: "",
  projectType: "" as BidInvitationInput["projectType"],
  bidDueDate: "",
  bidDueTime: "",
  trades: [],
  tradesOther: "",
  projectDescription: "",
  documentsLink: "",
  message: "",
  attachments: [],
  consent: false,
};

export function BidInvitationForm({ phone }: { phone: { display: string; e164: string } }) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm<BidInvitationInput, unknown, BidInvitation>({
    resolver: zodResolver(bidInvitationSchema),
    mode: "onTouched",
    defaultValues,
  });
  const { state, submit, markStarted } = useSubmission("bid");
  const today = useTorontoToday();
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const [uploads, setUploads] = useState<UploaderState>({ ids: [], busy: false, failed: 0 });
  const [summary, setSummary] = useState<{ errors: SummaryError[]; message?: string }>({ errors: [] });
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const onUploadsChange = useCallback((next: UploaderState) => setUploads(next), []);

  const trades = useWatch({ control, name: "trades" });
  const showSummary = (next: { errors: SummaryError[]; message?: string }) => {
    setSummary(next);
    requestAnimationFrame(() => summaryRef.current?.focus());
  };

  const onValid = async (values: BidInvitation) => {
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
      track("bid_invitation_submitted", { files: uploads.ids.length, trades: values.trades.length });
      return;
    }
    const fieldSummary = applyServerErrors(result.fieldErrors, FIELD_ORDER, setError);
    showSummary({ errors: fieldSummary });
  };

  if (state.status === "success") {
    return (
      <SubmissionSuccess
        title="Bid invitation received."
        reference={state.reference}
        phone={phone}
        nextSteps={[
          "We review the tender documents, scope and bid due date.",
          "If anything is missing or unclear, we contact you before pricing.",
          "We confirm whether MEK will submit a price, and issue our quotation before the bid due date.",
        ]}
      >
        <p>
          Thank you. Your invitation has been sent to MEK. Please send any addenda or changes to the closing date by
          replying to the confirmation email, quoting your reference.
        </p>
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
          track("bid_invitation_started");
        }
      }}
      className="relative grid gap-12"
      aria-describedby="bid-form-intro"
    >
      <p id="bid-form-intro" className="text-[0.9375rem] text-steel-600">
        Fields marked <span className="text-danger">*</span> are required.
      </p>

      {(summary.errors.length > 0 || errorMessage) && (
        <FormErrorSummary ref={summaryRef} errors={summary.errors} message={errorMessage} />
      )}

      <FormSection index="01" title="Your company" description="Who is inviting MEK to bid.">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="companyName" label="Company name" required error={errors.companyName?.message}>
            <TextInput
              id="companyName"
              autoComplete="organization"
              invalid={!!errors.companyName}
              aria-describedby={describedBy("companyName", undefined, errors.companyName?.message)}
              {...register("companyName")}
            />
          </Field>
          <Field name="contactName" label="Contact name" required error={errors.contactName?.message}>
            <TextInput
              id="contactName"
              autoComplete="name"
              invalid={!!errors.contactName}
              aria-describedby={describedBy("contactName", undefined, errors.contactName?.message)}
              {...register("contactName")}
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

      <FormSection index="02" title="Project" description="The project being tendered.">
        <Field name="projectName" label="Project name" required error={errors.projectName?.message}>
          <TextInput
            id="projectName"
            invalid={!!errors.projectName}
            aria-describedby={describedBy("projectName", undefined, errors.projectName?.message)}
            {...register("projectName")}
          />
        </Field>
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            name="projectLocation"
            label="Project address / location"
            required
            hint="Street address, or municipality if the address isn't public yet."
            error={errors.projectLocation?.message}
          >
            <TextInput
              id="projectLocation"
              autoComplete="off"
              invalid={!!errors.projectLocation}
              aria-describedby={describedBy("projectLocation", true, errors.projectLocation?.message)}
              {...register("projectLocation")}
            />
          </Field>
          <Field name="projectType" label="Project type" required error={errors.projectType?.message} hint="Closest match.">
            <Select
              id="projectType"
              placeholder="Select a project type"
              invalid={!!errors.projectType}
              aria-describedby={describedBy("projectType", true, errors.projectType?.message)}
              {...register("projectType")}
            >
              {PROJECT_TYPES.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>
      </FormSection>

      <FormSection index="03" title="Bid timing" description="When and how the price is due. Times are Toronto time (ET).">
        <div className="grid gap-6 sm:grid-cols-2">
          <Field name="bidDueDate" label="Bid due date" required error={errors.bidDueDate?.message}>
            <TextInput
              id="bidDueDate"
              type="date"
              min={today}
              invalid={!!errors.bidDueDate}
              aria-describedby={describedBy("bidDueDate", undefined, errors.bidDueDate?.message)}
              {...register("bidDueDate")}
            />
          </Field>
          <Field name="bidDueTime" label="Bid due time" hint="e.g. 2:00 p.m." error={errors.bidDueTime?.message}>
            <TextInput
              id="bidDueTime"
              type="time"
              step={900}
              invalid={!!errors.bidDueTime}
              aria-describedby={describedBy("bidDueTime", true, errors.bidDueTime?.message)}
              {...register("bidDueTime")}
            />
          </Field>
        </div>
      </FormSection>

      <FormSection
        index="04"
        title="Trade package"
        description="Select every trade you want MEK to price. Scope is confirmed against the documents."
      >
        <fieldset
          id="trades"
          tabIndex={-1}
          aria-describedby={errors.trades?.message ? "trades-error" : undefined}
          className="outline-none"
        >
          <legend className="mb-3 text-[0.9375rem] font-semibold">
            Requested trade(s)
            <span className="ml-1 text-danger" aria-hidden="true">
              *
            </span>
          </legend>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {BID_TRADES.map((trade) => (
              <Checkbox
                key={trade.value}
                id={`trade-${trade.value}`}
                value={trade.value}
                label={trade.label}
                invalid={!!errors.trades}
                {...register("trades")}
              />
            ))}
          </div>
          <FieldError name="trades" error={errors.trades?.message} />
        </fieldset>

        <div className={cn(!trades?.includes("other") && "hidden")}>
          <Field name="tradesOther" label="Other trade(s)" required error={errors.tradesOther?.message}>
            <TextInput
              id="tradesOther"
              invalid={!!errors.tradesOther}
              aria-describedby={describedBy("tradesOther", undefined, errors.tradesOther?.message)}
              {...register("tradesOther")}
            />
          </Field>
        </div>

        <Field
          name="projectDescription"
          label="Project description and scope notes"
          hint="Specification sections, alternates or separate prices required, phasing, site conditions."
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
        index="05"
        title="Documents"
        description="Tender invitation, Issued for Tender drawings, specifications and addenda. Upload files, share a link, or both."
      >
        <div id="attachments" tabIndex={-1} className="outline-none">
          <FileUploader
            form="bid"
            label="Tender documents"
            description="Drawings, specifications, addenda, bid forms and photos."
            onChange={onUploadsChange}
            error={errors.attachments?.message}
          />
        </div>
        <Field
          name="documentsLink"
          label="Link to tender documents"
          hint="BuildingConnected, Procore, SharePoint, Dropbox or similar — best for large packages."
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

      <FormSection index="06" title="Message and submit">
        <Field name="message" label="Message to MEK" error={errors.message?.message}>
          <TextArea
            id="message"
            rows={4}
            invalid={!!errors.message}
            aria-describedby={describedBy("message", undefined, errors.message?.message)}
            {...register("message")}
          />
        </Field>

        <div>
          <Checkbox
            id="consent"
            invalid={!!errors.consent}
            aria-describedby={errors.consent?.message ? "consent-error" : undefined}
            label={
              <>
                I&apos;m authorized to share these project documents with MEK, and I have read the{" "}
                <Link href="/privacy" className="font-semibold underline underline-offset-2" target="_blank">
                  Privacy Policy<span className="sr-only"> (opens in a new tab)</span>
                </Link>
                .<span className="ml-1 text-danger" aria-hidden="true">*</span>
              </>
            }
            {...register("consent")}
          />
          <FieldError name="consent" error={errors.consent?.message} />
        </div>

        <Honeypot ref={honeypotRef} />
        <Turnstile onToken={setTurnstileToken} />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button type="submit" size="lg" arrow disabled={state.status === "submitting"} aria-disabled={uploads.busy || undefined}>
            {state.status === "submitting" ? "Submitting…" : "Submit Bid Invitation"}
          </Button>
          <p className="text-sm text-steel-600" aria-live="polite">
            {uploads.busy ? "Files are still uploading…" : "Your documents are stored privately and never published."}
          </p>
        </div>
      </FormSection>
    </form>
  );
}
