import type { AllowedFileType, FileFamily } from "@/lib/uploads/rules";
import { findAllowedType } from "@/lib/uploads/rules";

/**
 * Content inspection for uploaded files.
 *
 * The browser-supplied MIME type is ignored. The file's leading bytes must
 * match a signature for the family implied by its extension, and ZIP-based
 * files are opened far enough to list their entries so that macro-enabled
 * Office documents and archives carrying executables are rejected.
 */

export type InspectionResult =
  | { ok: true; type: AllowedFileType }
  | { ok: false; reason: InspectionFailure };

export type InspectionFailure =
  | "empty"
  | "extension-not-allowed"
  | "signature-mismatch"
  | "macro-enabled"
  | "dangerous-archive-entry"
  | "corrupt-archive";

const startsWith = (buf: Buffer, bytes: number[], offset = 0) =>
  buf.length >= offset + bytes.length && bytes.every((b, i) => buf[offset + i] === b);

const ascii = (buf: Buffer, start: number, end: number) => buf.subarray(start, end).toString("latin1");

const ZIP_LOCAL = [0x50, 0x4b, 0x03, 0x04];
const OLE_CFB = [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1];

function isPdf(buf: Buffer) {
  // The %PDF- header may be preceded by junk bytes; the spec allows it within the first 1 KB.
  return buf.subarray(0, 1024).includes(Buffer.from("%PDF-"));
}

function isImage(buf: Buffer, ext: string) {
  switch (ext) {
    case "jpg":
    case "jpeg":
      return startsWith(buf, [0xff, 0xd8, 0xff]);
    case "png":
      return startsWith(buf, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    case "webp":
      return ascii(buf, 0, 4) === "RIFF" && ascii(buf, 8, 12) === "WEBP";
    case "tif":
    case "tiff":
      return startsWith(buf, [0x49, 0x49, 0x2a, 0x00]) || startsWith(buf, [0x4d, 0x4d, 0x00, 0x2a]);
    case "heic": {
      if (ascii(buf, 4, 8) !== "ftyp") return false;
      const brand = ascii(buf, 8, 12);
      return ["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1", "msf1"].includes(brand);
    }
    default:
      return false;
  }
}

function isDwg(buf: Buffer) {
  return /^AC1\d{3}$/.test(ascii(buf, 0, 6));
}

const DANGEROUS_ENTRY =
  /\.(exe|com|bat|cmd|msi|msp|scr|pif|cpl|dll|sys|vbs|vbe|js|jse|wsf|wsh|hta|ps1|psm1|jar|sh|bash|app|apk|lnk|reg|iso|img|vhd|vhdx|docm|dotm|xlsm|xltm|xlam|pptm)$/i;

/**
 * List the entry names of a ZIP file by reading its central directory.
 * Returns null when the archive structure is invalid.
 */
export function listZipEntries(buf: Buffer): string[] | null {
  // End of central directory record: signature 0x06054b50, within the last 64 KB + 22 bytes.
  const minEocd = Math.max(0, buf.length - 0xffff - 22);
  let eocd = -1;
  for (let i = buf.length - 22; i >= minEocd; i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) {
      eocd = i;
      break;
    }
  }
  if (eocd < 0) return null;

  const entryCount = buf.readUInt16LE(eocd + 10);
  let offset = buf.readUInt32LE(eocd + 16);
  if (offset === 0xffffffff) return null; // ZIP64 — not needed for the file sizes allowed here.

  const names: string[] = [];
  for (let i = 0; i < entryCount; i++) {
    if (offset + 46 > buf.length || buf.readUInt32LE(offset) !== 0x02014b50) return null;
    const nameLength = buf.readUInt16LE(offset + 28);
    const extraLength = buf.readUInt16LE(offset + 30);
    const commentLength = buf.readUInt16LE(offset + 32);
    const nameStart = offset + 46;
    if (nameStart + nameLength > buf.length) return null;
    names.push(buf.subarray(nameStart, nameStart + nameLength).toString("utf8"));
    offset = nameStart + nameLength + extraLength + commentLength;
  }
  return names;
}

function inspectZipFamily(buf: Buffer, family: FileFamily): InspectionResult | null {
  if (!startsWith(buf, ZIP_LOCAL)) return { ok: false, reason: "signature-mismatch" };
  const entries = listZipEntries(buf);
  if (!entries) return { ok: false, reason: "corrupt-archive" };

  if (family === "archive") {
    if (entries.some((name) => DANGEROUS_ENTRY.test(name) || name.includes(".."))) {
      return { ok: false, reason: "dangerous-archive-entry" };
    }
    return null;
  }

  // Office Open XML documents.
  const hasContentTypes = entries.includes("[Content_Types].xml");
  const prefix = family === "word" ? "word/" : "xl/";
  if (!hasContentTypes || !entries.some((name) => name.startsWith(prefix))) {
    return { ok: false, reason: "signature-mismatch" };
  }
  if (entries.some((name) => /vbaProject\.bin$/i.test(name))) {
    return { ok: false, reason: "macro-enabled" };
  }
  return null;
}

export function inspectUpload(filename: string, buf: Buffer): InspectionResult {
  if (buf.length === 0) return { ok: false, reason: "empty" };
  const type = findAllowedType(filename);
  if (!type) return { ok: false, reason: "extension-not-allowed" };

  switch (type.family) {
    case "pdf":
      return isPdf(buf) ? { ok: true, type } : { ok: false, reason: "signature-mismatch" };
    case "image":
      return isImage(buf, type.ext) ? { ok: true, type } : { ok: false, reason: "signature-mismatch" };
    case "cad":
      return isDwg(buf) ? { ok: true, type } : { ok: false, reason: "signature-mismatch" };
    case "word":
    case "excel":
      if (type.ext === "doc" || type.ext === "xls") {
        return startsWith(buf, OLE_CFB) ? { ok: true, type } : { ok: false, reason: "signature-mismatch" };
      }
      return inspectZipFamily(buf, type.family) ?? { ok: true, type };
    case "archive":
      return inspectZipFamily(buf, "archive") ?? { ok: true, type };
  }
}

export const INSPECTION_MESSAGES: Record<InspectionFailure, string> = {
  empty: "This file is empty.",
  "extension-not-allowed": "This file type is not accepted.",
  "signature-mismatch": "This file's contents don't match its file type. Please export it again and retry.",
  "macro-enabled": "Macro-enabled Office files are not accepted. Save a copy without macros (.docx / .xlsx).",
  "dangerous-archive-entry": "This ZIP file contains file types that are not accepted.",
  "corrupt-archive": "This ZIP file could not be read. Please re-create it and retry.",
};
