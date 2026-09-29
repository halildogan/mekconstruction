import { getExtension } from "@/lib/uploads/rules";

/**
 * Produce a safe storage filename from a user-supplied name.
 *
 * - strips any directory components and control characters
 * - removes diacritics and characters outside [A-Za-z0-9 ._()-]
 * - prevents leading dots (hidden files) and path traversal
 * - keeps the (lower-cased) extension and caps total length
 *
 * The original name is kept separately (as metadata) for display in emails.
 */
export function sanitizeFilename(input: string, maxLength = 120): string {
  const base = input.split(/[\\/]/).pop() ?? "";
  const ext = getExtension(base);
  const stem = ext ? base.slice(0, -(ext.length + 1)) : base;

  const cleanStem = stem
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9 ._()-]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/\.{2,}/g, ".")
    .replace(/^[-.\s]+|[-.\s]+$/g, "");

  const safeStem = (cleanStem || "document").slice(0, maxLength - (ext ? ext.length + 1 : 0));
  return ext ? `${safeStem}.${ext}` : safeStem;
}

/** A display-safe version of the original name: no control characters, bounded length. */
export function displayFilename(input: string, maxLength = 180): string {
  const base = input.split(/[\\/]/).pop() ?? "";
  // eslint-disable-next-line no-control-regex
  const cleaned = base.replace(/[\u0000-\u001f\u007f]/g, "").trim();
  return (cleaned || "document").slice(0, maxLength);
}
