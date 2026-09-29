"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONTACT_TOPICS } from "@/lib/forms/options";
import { contactSchema, type ContactInput, type ContactMessage } from "@/lib/forms/schemas";
import { track } from "@/lib/analytics";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, FieldError, Honeypot, Select, TextArea, TextInput, describedBy } from "@/components/forms/fields";
import { FormErrorSummary, type SummaryError } from "@/components/forms/FormErrorSummary";
import { SubmissionSuccess } from "@/components/forms/SubmissionSuccess";
import { Turnstile } from "@/components/forms/Turnstile";
import { applyServerErrors, summarize } from "@/components/forms/formErrors";
import { useSubmission } from "@/components/forms/useSubmission";

const FIELD_ORDER = ["name", "company", "email", "phone", "topic", "message", "consent"] as const;

export function ContactForm({ phone }: { phone: { display: string; e164: string } }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactMessage>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      topic: "" as ContactInput["topic"],
      message: "",
      consent: false,
    },
  });
  const { state, submit, markStarted } = useSubmission("contact");
  const summaryRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [summary, setSummary] = useState<SummaryError[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string>();

  const focusSummary = () => requestAnimationFrame(() => summaryRef.current?.focus());

  const onValid = async (values: ContactMessage) => {
    setSummary([]);
    const result = await submit(values, { honeypot: honeypotRef.current?.value ?? "", turnstileToken });
    if (result.ok) {
      track("contact_submitted", { topic: values.topic });
      return;
    }
    setSummary(applyServerErrors(result.fieldErrors, FIELD_ORDER, setError));
    focusSummary();
  };

  if (state.status === "success") {
    return (
      <SubmissionSuccess
        title="Message received."
        reference={state.reference}
        phone={phone}
        nextSteps={["We read every message and reply by email or phone.", "For bids and quotes, use the dedicated forms so documents arrive with the project details we need."]}
      >
        <p>Thank you for contacting MEK Construction Inc.</p>
      </SubmissionSuccess>
    );
  }

  const errorMessage = state.status === "error" ? state.message : undefined;

  return (
    <form
      noValidate
      onSubmit={(event) =>
        void handleSubmit(onValid, (formErrors) => {
          setSummary(summarize(formErrors, FIELD_ORDER));
          focusSummary();
        })(event)
      }
      onFocusCapture={markStarted}
      className="relative grid gap-6"
    >
      {(summary.length > 0 || errorMessage) && (
        <FormErrorSummary ref={summaryRef} errors={summary} message={errorMessage} />
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="name" label="Name" required error={errors.name?.message}>
          <TextInput id="name" autoComplete="name" invalid={!!errors.name} aria-describedby={describedBy("name", undefined, errors.name?.message)} {...register("name")} />
        </Field>
        <Field name="company" label="Company" error={errors.company?.message}>
          <TextInput id="company" autoComplete="organization" invalid={!!errors.company} aria-describedby={describedBy("company", undefined, errors.company?.message)} {...register("company")} />
        </Field>
        <Field name="email" label="Email" required error={errors.email?.message}>
          <TextInput id="email" type="email" inputMode="email" autoComplete="email" invalid={!!errors.email} aria-describedby={describedBy("email", undefined, errors.email?.message)} {...register("email")} />
        </Field>
        <Field name="phone" label="Phone" error={errors.phone?.message}>
          <TextInput id="phone" type="tel" inputMode="tel" autoComplete="tel" invalid={!!errors.phone} aria-describedby={describedBy("phone", undefined, errors.phone?.message)} {...register("phone")} />
        </Field>
      </div>
      <Field name="topic" label="Topic" required error={errors.topic?.message}>
        <Select id="topic" placeholder="Select a topic" invalid={!!errors.topic} aria-describedby={describedBy("topic", undefined, errors.topic?.message)} {...register("topic")}>
          {CONTACT_TOPICS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>
      <Field name="message" label="Message" required error={errors.message?.message}>
        <TextArea id="message" rows={6} invalid={!!errors.message} aria-describedby={describedBy("message", undefined, errors.message?.message)} {...register("message")} />
      </Field>
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
      <div>
        <Button type="submit" variant="secondary" size="lg" arrow disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "Sending…" : "Send Message"}
        </Button>
      </div>
    </form>
  );
}
