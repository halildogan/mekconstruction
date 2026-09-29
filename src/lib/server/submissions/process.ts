import "server-only";

import { z } from "zod";
import { services } from "@/content/services";
import { QUOTE_SERVICE_EXTRAS } from "@/lib/forms/options";
import {
  schemasByKind,
  submissionMetaSchema,
  type SubmissionKind,
} from "@/lib/forms/schemas";
import { UPLOAD_LIMITS } from "@/lib/uploads/rules";
import { getServerEnv } from "@/lib/server/env";
import { sendEmail, type EmailAttachment } from "@/lib/server/email";
import { renderEmailHtml, renderEmailText } from "@/lib/server/email/templates";
import { errorName, logger } from "@/lib/server/log";
import { createReference } from "@/lib/server/reference";
import { getStorage } from "@/lib/server/storage";
import { verifyTurnstile } from "@/lib/server/turnstile";
import {
  commitStagedUpload,
  getStagedUpload,
  type StagedUpload,
} from "@/lib/server/uploads/staging";
import {
  buildAcknowledgement,
  buildInternalNotification,
  type DocumentLink,
} from "@/lib/server/submissions/notifications";
import type {
  NotificationStatus,
  StoredFile,
  StoredSubmission,
  SubmissionResult,
} from "@/lib/server/submissions/types";

/** Submissions completed faster than this are treated as automated. */
const MIN_ELAPSED_MS = 3000;

const envelopeSchema = z.object({ data: z.unknown(), meta: z.unknown() });

const QUOTE_SERVICE_VALUES = new Set<string>([
  ...services.map((s) => s.slug),
  ...QUOTE_SERVICE_EXTRAS.map((o) => o.value),
]);

function recipientsFor(kind: SubmissionKind): string[] {
  const { recipients } = getServerEnv().email;
  return kind === "bid" ? recipients.bid : kind === "quote" ? recipients.quote : recipients.contact;
}

function submissionPrefix(kind: SubmissionKind, reference: string, receivedAt: Date): string {
  const [year, month] = receivedAt.toISOString().slice(0, 7).split("-");
  return `submissions/${kind}/${year}/${month}/${reference}`;
}

function toFieldErrors(issues: readonly z.core.$ZodIssue[]): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "form");
    (out[key] ??= []).push(issue.message);
  }
  return out;
}

export async function processSubmission(
  kind: SubmissionKind,
  body: unknown,
  context: { ip: string },
): Promise<SubmissionResult> {
  const env = getServerEnv();

  const envelope = envelopeSchema.safeParse(body);
  if (!envelope.success) return { ok: false, status: 400, error: "The submission could not be read." };

  const meta = submissionMetaSchema.safeParse(envelope.data.meta ?? {});
  if (!meta.success) return { ok: false, status: 400, error: "The submission could not be read." };

  // Spam traps: respond as if successful so automated senders learn nothing.
  if (meta.data.website || (meta.data.elapsedMs !== undefined && meta.data.elapsedMs < MIN_ELAPSED_MS)) {
    logger.warn("submission.spam_dropped", { kind, trap: meta.data.website ? "honeypot" : "timing" });
    return { ok: true, reference: createReference(kind) };
  }

  if (env.turnstileSecretKey) {
    const human = await verifyTurnstile(env.turnstileSecretKey, meta.data.turnstileToken, context.ip);
    if (!human) {
      return {
        ok: false,
        status: 400,
        error: "We couldn't verify this submission. Please complete the verification and try again.",
      };
    }
  }

  const parsed = schemasByKind[kind].safeParse(envelope.data.data);
  if (!parsed.success) {
    return {
      ok: false,
      status: 422,
      error: "Some fields need attention.",
      fieldErrors: toFieldErrors(parsed.error.issues),
    };
  }
  const data = parsed.data;

  if (kind === "quote" && "service" in data && !QUOTE_SERVICE_VALUES.has(data.service)) {
    return { ok: false, status: 422, error: "Some fields need attention.", fieldErrors: { service: ["Select a service"] } };
  }

  // Resolve staged uploads from trusted server-side metadata.
  const attachmentIds = "attachments" in data ? [...new Set(data.attachments)] : [];
  const staged: StagedUpload[] = [];
  for (const id of attachmentIds) {
    const upload = await getStagedUpload(id);
    if (!upload || upload.form !== kind) {
      return {
        ok: false,
        status: 422,
        error: "One of the uploaded files has expired. Remove it and upload it again.",
        fieldErrors: { attachments: ["One of the uploaded files has expired. Remove it and upload it again."] },
      };
    }
    staged.push(upload);
  }
  const totalBytes = staged.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > UPLOAD_LIMITS.maxTotalBytes) {
    return { ok: false, status: 413, error: "The attached files exceed the total size limit." };
  }

  const receivedAt = new Date();
  const reference = createReference(kind, receivedAt);
  const prefix = submissionPrefix(kind, reference, receivedAt);
  const storage = getStorage();

  let record: StoredSubmission;
  try {
    const files: StoredFile[] = [];
    for (const [index, upload] of staged.entries()) {
      const key = await commitStagedUpload(upload, prefix, index);
      files.push({
        name: upload.originalName,
        key,
        size: upload.size,
        mime: upload.mime,
        family: upload.family,
        sha256: upload.sha256,
      });
    }

    const base = {
      version: 1 as const,
      reference,
      receivedAt: receivedAt.toISOString(),
      files,
      notifications: { internal: "skipped" as NotificationStatus, acknowledgement: "skipped" as NotificationStatus },
    };
    // Drop transport-only fields before storing.
    if (kind === "bid") {
      const { attachments: _a, consent: _c, ...rest } = data as z.output<typeof schemasByKind.bid>;
      record = { ...base, kind, data: rest };
    } else if (kind === "quote") {
      const { attachments: _a, consent: _c, ...rest } = data as z.output<typeof schemasByKind.quote>;
      record = { ...base, kind, data: rest };
    } else {
      const { consent: _c, ...rest } = data as z.output<typeof schemasByKind.contact>;
      record = { ...base, kind, data: rest };
    }

    await storage.put(`${prefix}/submission.json`, Buffer.from(JSON.stringify(record, null, 2)), "application/json");
  } catch (error) {
    logger.error("submission.store_failed", { kind, reference, error: errorName(error) });
    return {
      ok: false,
      status: 500,
      error: "We couldn't save your submission. Please try again in a few minutes, or call us.",
    };
  }

  logger.info("submission.stored", { kind, reference, files: record.files.length, bytes: totalBytes });

  record.notifications = await sendNotifications(record);
  try {
    await storage.put(`${prefix}/submission.json`, Buffer.from(JSON.stringify(record, null, 2)), "application/json");
  } catch (error) {
    logger.warn("submission.status_update_failed", { reference, error: errorName(error) });
  }

  return { ok: true, reference };
}

async function sendNotifications(record: StoredSubmission): Promise<StoredSubmission["notifications"]> {
  const env = getServerEnv();
  const storage = getStorage();
  const notConfigured = env.email.provider === "console";
  const status: StoredSubmission["notifications"] = { internal: "skipped", acknowledgement: "skipped" };

  // Internal notification, with small files attached and/or private links.
  const recipients = recipientsFor(record.kind);
  if (recipients.length === 0) {
    status.internal = "not-configured";
    logger.warn("submission.no_recipient", { reference: record.reference, kind: record.kind });
  } else {
    try {
      const totalBytes = record.files.reduce((sum, f) => sum + f.size, 0);
      const attachments: EmailAttachment[] = [];
      if (record.files.length && totalBytes <= env.email.attachmentMaxBytes) {
        for (const file of record.files) {
          const content = await storage.get(file.key);
          if (content) attachments.push({ filename: file.name, content, contentType: file.mime });
        }
      }
      const links: DocumentLink[] = [];
      if (env.uploadLinkTtlHours > 0) {
        for (const file of record.files) {
          const url = await storage.getSignedDownloadUrl(file.key, env.uploadLinkTtlHours * 3600, file.name);
          if (url) links.push({ key: file.key, url });
        }
      }
      const { subject, layout } = buildInternalNotification(record, {
        links,
        attached: attachments.length === record.files.length && attachments.length > 0,
        storageDriver: storage.driver,
        linkTtlHours: env.uploadLinkTtlHours,
      });
      await sendEmail({
        to: recipients,
        subject,
        html: renderEmailHtml(layout),
        text: renderEmailText(layout),
        replyTo: record.data.email,
        attachments: attachments.length === record.files.length ? attachments : undefined,
      });
      status.internal = notConfigured ? "not-configured" : "sent";
    } catch (error) {
      status.internal = "failed";
      logger.error("submission.internal_email_failed", { reference: record.reference, error: errorName(error) });
    }
  }

  // Acknowledgement to the sender.
  try {
    const { subject, layout } = buildAcknowledgement(record);
    await sendEmail({
      to: [record.data.email],
      subject,
      html: renderEmailHtml(layout),
      text: renderEmailText(layout),
      replyTo: recipientsFor(record.kind)[0],
    });
    status.acknowledgement = notConfigured ? "not-configured" : "sent";
  } catch (error) {
    status.acknowledgement = "failed";
    logger.error("submission.ack_email_failed", { reference: record.reference, error: errorName(error) });
  }

  return status;
}
