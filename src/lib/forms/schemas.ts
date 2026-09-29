import { z } from "zod";
import {
  BID_TRADES,
  CONTACT_TOPICS,
  PROJECT_SIZES,
  PROJECT_TYPES,
  values,
} from "@/lib/forms/options";
import { UPLOAD_ID_PATTERN, UPLOAD_LIMITS } from "@/lib/uploads/rules";

/**
 * Form schemas shared by the browser (inline validation through React Hook
 * Form) and the server (authoritative validation in the submission handlers).
 * The server never trusts that client validation ran.
 */

const PHONE_PATTERN = /^[+()\d\s.\-x#]*$/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_24H = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Today's date in Toronto as YYYY-MM-DD. */
export function torontoToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function isRealDate(value: string): boolean {
  if (!ISO_DATE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

const requiredText = (label: string, min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, `Enter ${label}`)
    .min(min, `${label.charAt(0).toUpperCase() + label.slice(1)} is too short`)
    .max(max, `Keep this under ${max} characters`);

const optionalText = (max: number) =>
  z.string().trim().max(max, `Keep this under ${max} characters`);

const email = z
  .string()
  .trim()
  .min(1, "Enter an email address")
  .max(254, "Email address is too long")
  .pipe(z.email("Enter a valid email address, like name@company.com"));

const phone = (required: boolean) =>
  z
    .string()
    .trim()
    .max(30, "Phone number is too long")
    .refine((v) => (required ? v.length > 0 : true), "Enter a phone number")
    .refine(
      (v) => v === "" || (PHONE_PATTERN.test(v) && v.replace(/\D/g, "").length >= 7),
      "Enter a valid phone number",
    );

const optionalUrl = z
  .string()
  .trim()
  .max(500, "Link is too long")
  .refine((v) => {
    if (v === "") return true;
    try {
      const url = new URL(v);
      return url.protocol === "https:" || url.protocol === "http:";
    } catch {
      return false;
    }
  }, "Enter a full link starting with https://");

const optionalFutureDate = (message: string) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || isRealDate(v), "Enter a valid date")
    .refine((v) => v === "" || v >= torontoToday(), message);

const consent = z
  .boolean({ error: "Please confirm you have read the privacy notice" })
  .refine((v) => v === true, "Please confirm you have read the privacy notice");

const attachments = z
  .array(z.string().regex(UPLOAD_ID_PATTERN, "Invalid attachment"))
  .max(UPLOAD_LIMITS.maxFiles, `Attach up to ${UPLOAD_LIMITS.maxFiles} files`);

/* ------------------------------------------------------------------------ */

export const bidInvitationSchema = z
  .object({
    companyName: requiredText("your company name", 2, 150),
    contactName: requiredText("your name", 2, 120),
    email,
    phone: phone(false),
    projectName: requiredText("the project name", 2, 200),
    projectLocation: requiredText("the project address or location", 2, 200),
    projectType: z.enum(values(PROJECT_TYPES), { error: "Select a project type" }),
    bidDueDate: z
      .string()
      .trim()
      .min(1, "Enter the bid due date")
      .refine(isRealDate, "Enter a valid date")
      .refine((v) => !isRealDate(v) || v >= torontoToday(), "The bid due date has already passed"),
    bidDueTime: z
      .string()
      .trim()
      .refine((v) => v === "" || TIME_24H.test(v), "Enter a valid time"),
    trades: z
      .array(z.enum(values(BID_TRADES)))
      .min(1, "Select at least one trade"),
    tradesOther: optionalText(200),
    projectDescription: optionalText(5000),
    documentsLink: optionalUrl,
    message: optionalText(3000),
    attachments,
    consent,
  })
  .superRefine((v, ctx) => {
    if (v.trades.includes("other") && v.tradesOther.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["tradesOther"],
        message: "Describe the other trade(s) you need priced",
      });
    }
  });

export type BidInvitationInput = z.input<typeof bidInvitationSchema>;
export type BidInvitation = z.output<typeof bidInvitationSchema>;

export const quoteRequestSchema = z.object({
  name: requiredText("your name", 2, 120),
  company: optionalText(150),
  email,
  phone: phone(false),
  projectName: optionalText(200),
  projectLocation: requiredText("the project location", 2, 200),
  service: z.string().trim().min(1, "Select a service").max(80),
  projectSize: z.union([z.enum(values(PROJECT_SIZES)), z.literal("")]),
  desiredStartDate: optionalFutureDate("The start date should be today or later"),
  projectDescription: requiredText("a short description of the work", 10, 5000),
  documentsLink: optionalUrl,
  attachments,
  consent,
});

export type QuoteRequestInput = z.input<typeof quoteRequestSchema>;
export type QuoteRequest = z.output<typeof quoteRequestSchema>;

export const contactSchema = z.object({
  name: requiredText("your name", 2, 120),
  company: optionalText(150),
  email,
  phone: phone(false),
  topic: z.enum(values(CONTACT_TOPICS), { error: "Select a topic" }),
  message: requiredText("a message", 10, 5000),
  consent,
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactMessage = z.output<typeof contactSchema>;

/** Anti-spam metadata sent alongside every submission. */
export const submissionMetaSchema = z.object({
  /** Honeypot. Real people never see or fill this field. */
  website: z.string().max(500).optional().default(""),
  /** Milliseconds between the form rendering and submission. */
  elapsedMs: z.number().int().nonnegative().max(1000 * 60 * 60 * 24 * 7).optional(),
  turnstileToken: z.string().max(4096).optional(),
});

export type SubmissionMeta = z.output<typeof submissionMetaSchema>;

export const SUBMISSION_KINDS = ["bid", "quote", "contact"] as const;
export type SubmissionKind = (typeof SUBMISSION_KINDS)[number];

export const schemasByKind = {
  bid: bidInvitationSchema,
  quote: quoteRequestSchema,
  contact: contactSchema,
} as const;
