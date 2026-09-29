import "server-only";

import { siteConfig, formatAddressInline } from "@/content/site";
import { services } from "@/content/services";
import {
  BID_TRADES,
  CONTACT_TOPICS,
  PROJECT_SIZES,
  PROJECT_TYPES,
  QUOTE_SERVICE_EXTRAS,
  labelFor,
} from "@/lib/forms/options";
import { formatDateLong, formatTime12 } from "@/lib/format";
import { FAMILY_LABELS, formatBytes } from "@/lib/uploads/rules";
import type { EmailLayout } from "@/lib/server/email/templates";
import type { StoredSubmission } from "@/lib/server/submissions/types";

export interface DocumentLink {
  key: string;
  url: string;
}

const serviceLabel = (value: string) =>
  services.find((s) => s.slug === value)?.name ?? labelFor(QUOTE_SERVICE_EXTRAS, value);

function bidDeadline(date: string, time: string): string {
  return `${formatDateLong(date)}${time ? ` at ${formatTime12(time)} (Toronto time)` : ""}`;
}

function documentsFor(submission: StoredSubmission, links: DocumentLink[]) {
  return submission.files.map((f) => ({
    name: f.name,
    detail: `${FAMILY_LABELS[f.family]}, ${formatBytes(f.size)}`,
    href: links.find((l) => l.key === f.key)?.url,
  }));
}

const internalFooter = (submission: StoredSubmission, storageNote: string) => [
  `Received ${new Date(submission.receivedAt).toLocaleString("en-CA", { timeZone: "America/Toronto" })} (Toronto time) via ${siteConfig.url}.`,
  storageNote,
  "Reply to this email to respond directly to the sender.",
];

export function buildInternalNotification(
  submission: StoredSubmission,
  options: { links: DocumentLink[]; attached: boolean; storageDriver: "local" | "s3"; linkTtlHours: number },
): { subject: string; layout: EmailLayout } {
  const { links, attached, storageDriver, linkTtlHours } = options;
  const storagePrefix = submission.files[0]?.key.replace(/\/files\/.*$/, "");
  const storageNote = storagePrefix
    ? `Stored privately (${storageDriver === "s3" ? "object storage" : "server disk"}) under ${storagePrefix}.`
    : "No files were uploaded with this submission.";
  let documentsNote: string | undefined;
  if (submission.files.length) {
    const parts: string[] = [];
    if (attached) parts.push("Files are attached to this email.");
    if (links.length) parts.push(`Download links expire after ${linkTtlHours} hours.`);
    if (!attached && !links.length) parts.push("Files were too large to attach — retrieve them from storage.");
    documentsNote = parts.join(" ");
  }

  switch (submission.kind) {
    case "bid": {
      const d = submission.data;
      const trades = d.trades.map((t) => (t === "other" ? `Other: ${d.tradesOther}` : labelFor(BID_TRADES, t)));
      return {
        subject: `Bid invitation: ${d.projectName} — due ${d.bidDueDate}${d.bidDueTime ? ` ${d.bidDueTime}` : ""} [${submission.reference}]`,
        layout: {
          kicker: "New bid invitation",
          heading: d.projectName,
          preheader: `${d.companyName} invited MEK to bid. Due ${bidDeadline(d.bidDueDate, d.bidDueTime)}.`,
          reference: submission.reference,
          rows: [
            { label: "Bid due", value: bidDeadline(d.bidDueDate, d.bidDueTime) },
            { label: "Company", value: d.companyName },
            { label: "Contact", value: d.contactName },
            { label: "Email", value: d.email, href: `mailto:${d.email}` },
            { label: "Phone", value: d.phone, href: d.phone ? `tel:${d.phone.replace(/[^\d+]/g, "")}` : undefined },
            { label: "Project", value: d.projectName },
            { label: "Location", value: d.projectLocation },
            { label: "Project type", value: labelFor(PROJECT_TYPES, d.projectType) },
            { label: "Documents link", value: d.documentsLink, href: d.documentsLink || undefined },
          ],
          sections: [
            { title: "Trades requested", items: trades },
            { title: "Project description", paragraphs: [d.projectDescription] },
            { title: "Message", paragraphs: [d.message] },
          ],
          documents: documentsFor(submission, links),
          documentsNote,
          footer: internalFooter(submission, storageNote),
        },
      };
    }
    case "quote": {
      const d = submission.data;
      return {
        subject: `Quote request: ${serviceLabel(d.service)} — ${d.projectName || d.projectLocation} [${submission.reference}]`,
        layout: {
          kicker: "New quote request",
          heading: d.projectName || `${serviceLabel(d.service)} — ${d.projectLocation}`,
          preheader: `${d.name}${d.company ? ` (${d.company})` : ""} requested a quote for ${serviceLabel(d.service)}.`,
          reference: submission.reference,
          rows: [
            { label: "Name", value: d.name },
            { label: "Company", value: d.company },
            { label: "Email", value: d.email, href: `mailto:${d.email}` },
            { label: "Phone", value: d.phone, href: d.phone ? `tel:${d.phone.replace(/[^\d+]/g, "")}` : undefined },
            { label: "Service", value: serviceLabel(d.service) },
            { label: "Project", value: d.projectName },
            { label: "Location", value: d.projectLocation },
            { label: "Size", value: d.projectSize ? labelFor(PROJECT_SIZES, d.projectSize) : "" },
            { label: "Desired start", value: d.desiredStartDate ? formatDateLong(d.desiredStartDate) : "" },
            { label: "Documents link", value: d.documentsLink, href: d.documentsLink || undefined },
          ],
          sections: [{ title: "Project description", paragraphs: [d.projectDescription] }],
          documents: documentsFor(submission, links),
          documentsNote,
          footer: internalFooter(submission, storageNote),
        },
      };
    }
    case "contact": {
      const d = submission.data;
      return {
        subject: `Website enquiry: ${labelFor(CONTACT_TOPICS, d.topic)} — ${d.name} [${submission.reference}]`,
        layout: {
          kicker: "New website enquiry",
          heading: labelFor(CONTACT_TOPICS, d.topic),
          preheader: `${d.name}${d.company ? ` (${d.company})` : ""} sent a message.`,
          reference: submission.reference,
          rows: [
            { label: "Name", value: d.name },
            { label: "Company", value: d.company },
            { label: "Email", value: d.email, href: `mailto:${d.email}` },
            { label: "Phone", value: d.phone, href: d.phone ? `tel:${d.phone.replace(/[^\d+]/g, "")}` : undefined },
          ],
          sections: [{ title: "Message", paragraphs: [d.message] }],
          footer: internalFooter(submission, storageNote),
        },
      };
    }
  }
}

const ackFooter = () => [
  siteConfig.legalName,
  formatAddressInline(),
  `${siteConfig.phone.display}${siteConfig.publicEmail ? ` · ${siteConfig.publicEmail}` : ""} · ${siteConfig.url.replace(/^https?:\/\//, "")}`,
  "You are receiving this email because this address was entered on a form at our website.",
];

export function buildAcknowledgement(submission: StoredSubmission): { subject: string; layout: EmailLayout } {
  const files = submission.files.map((f) => `${f.name} (${formatBytes(f.size)})`);
  switch (submission.kind) {
    case "bid": {
      const d = submission.data;
      return {
        subject: `Bid invitation received — ${d.projectName} [${submission.reference}]`,
        layout: {
          kicker: "Bid invitation received",
          heading: `Thank you, ${d.contactName.split(" ")[0]}.`,
          preheader: `We received your bid invitation for ${d.projectName}.`,
          intro: [
            `We have received your invitation to bid on ${d.projectName}. We will review the tender information and confirm whether MEK will submit a price before the bid due date.`,
            "If addenda are issued or the closing date changes, reply to this email with the update and quote the reference below.",
          ],
          reference: submission.reference,
          rows: [
            { label: "Project", value: d.projectName },
            { label: "Location", value: d.projectLocation },
            { label: "Bid due", value: bidDeadline(d.bidDueDate, d.bidDueTime) },
            {
              label: "Trades",
              value: d.trades.map((t) => (t === "other" ? d.tradesOther : labelFor(BID_TRADES, t))).join(", "),
            },
          ],
          sections: [{ title: "Files received", items: files }],
          footer: ackFooter(),
        },
      };
    }
    case "quote": {
      const d = submission.data;
      return {
        subject: `Quote request received [${submission.reference}]`,
        layout: {
          kicker: "Quote request received",
          heading: `Thank you, ${d.name.split(" ")[0]}.`,
          preheader: "We received your quote request.",
          intro: [
            "We have received your quote request. We will review the information and drawings provided and contact you to confirm scope, schedule and any site visit needed to prepare pricing.",
          ],
          reference: submission.reference,
          rows: [
            { label: "Service", value: serviceLabel(d.service) },
            { label: "Project", value: d.projectName },
            { label: "Location", value: d.projectLocation },
          ],
          sections: [{ title: "Files received", items: files }],
          footer: ackFooter(),
        },
      };
    }
    case "contact": {
      const d = submission.data;
      return {
        subject: `We received your message [${submission.reference}]`,
        layout: {
          kicker: "Message received",
          heading: `Thank you, ${d.name.split(" ")[0]}.`,
          preheader: "We received your message.",
          intro: [
            "Thank you for contacting MEK Construction Inc. We have received your message and will respond as soon as we can.",
            `For time-sensitive matters, call us at ${siteConfig.phone.display}.`,
          ],
          reference: submission.reference,
          footer: ackFooter(),
        },
      };
    }
  }
}
