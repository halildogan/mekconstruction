import type { BidInvitation, ContactMessage, QuoteRequest, SubmissionKind } from "@/lib/forms/schemas";
import type { FileFamily } from "@/lib/uploads/rules";

export interface StoredFile {
  name: string;
  key: string;
  size: number;
  mime: string;
  family: FileFamily;
  sha256: string;
}

export type NotificationStatus = "sent" | "not-configured" | "failed" | "skipped";

interface StoredSubmissionBase {
  /** Schema version of this record, for future migrations to a database. */
  version: 1;
  reference: string;
  receivedAt: string;
  files: StoredFile[];
  notifications: {
    internal: NotificationStatus;
    acknowledgement: NotificationStatus;
  };
}

export type StoredSubmission =
  | (StoredSubmissionBase & { kind: "bid"; data: Omit<BidInvitation, "attachments" | "consent"> })
  | (StoredSubmissionBase & { kind: "quote"; data: Omit<QuoteRequest, "attachments" | "consent"> })
  | (StoredSubmissionBase & { kind: "contact"; data: Omit<ContactMessage, "consent"> });

export type SubmissionResult =
  | { ok: true; reference: string }
  | {
      ok: false;
      status: number;
      error: string;
      fieldErrors?: Record<string, string[]>;
    };

export type { SubmissionKind };
