import { randomInt } from "node:crypto";
import type { SubmissionKind } from "@/lib/forms/schemas";
import { torontoToday } from "@/lib/forms/schemas";

/** Crockford base32 without I, L, O, U — easy to read aloud over the phone. */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

const PREFIX: Record<SubmissionKind, string> = {
  bid: "BID",
  quote: "RFQ",
  contact: "MSG",
};

/**
 * Public submission reference, e.g. MEK-BID-20260929-7K3QXM.
 * Random (≈30 bits per day), never a sequential database id.
 */
export function createReference(kind: SubmissionKind, now: Date = new Date()): string {
  const date = torontoToday(now).replaceAll("-", "");
  let suffix = "";
  for (let i = 0; i < 6; i++) suffix += ALPHABET[randomInt(ALPHABET.length)];
  return `MEK-${PREFIX[kind]}-${date}-${suffix}`;
}

export const REFERENCE_PATTERN = /^MEK-(BID|RFQ|MSG)-\d{8}-[0-9A-HJKMNP-TV-Z]{6}$/;
