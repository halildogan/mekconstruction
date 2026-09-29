/**
 * Upload rules shared by the browser uploader and the server.
 *
 * The browser uses these to give immediate feedback; the server enforces them
 * independently and additionally verifies file signatures (magic bytes), so a
 * renamed executable is rejected even if its extension looks acceptable.
 *
 * Per-file uploads go through Cloudflare, which limits request bodies to
 * 100 MB on Free/Pro plans — keep MAX_FILE_BYTES below that. Larger tender
 * packages should be shared as a link (the forms have a field for it).
 */

export const UPLOAD_LIMITS = {
  maxFileBytes: 50 * 1024 * 1024,
  maxFiles: 10,
  maxTotalBytes: 250 * 1024 * 1024,
} as const;

export type FileFamily = "pdf" | "word" | "excel" | "image" | "archive" | "cad";

export interface AllowedFileType {
  ext: string;
  family: FileFamily;
  /** Canonical MIME type stored with the file (never the browser-supplied one). */
  mime: string;
}

export const ALLOWED_FILE_TYPES: readonly AllowedFileType[] = [
  { ext: "pdf", family: "pdf", mime: "application/pdf" },
  { ext: "doc", family: "word", mime: "application/msword" },
  {
    ext: "docx",
    family: "word",
    mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  { ext: "xls", family: "excel", mime: "application/vnd.ms-excel" },
  {
    ext: "xlsx",
    family: "excel",
    mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  { ext: "jpg", family: "image", mime: "image/jpeg" },
  { ext: "jpeg", family: "image", mime: "image/jpeg" },
  { ext: "png", family: "image", mime: "image/png" },
  { ext: "webp", family: "image", mime: "image/webp" },
  { ext: "heic", family: "image", mime: "image/heic" },
  { ext: "tif", family: "image", mime: "image/tiff" },
  { ext: "tiff", family: "image", mime: "image/tiff" },
  { ext: "zip", family: "archive", mime: "application/zip" },
  { ext: "dwg", family: "cad", mime: "image/vnd.dwg" },
];

export const ALLOWED_EXTENSIONS = ALLOWED_FILE_TYPES.map((t) => t.ext);

/** Value for <input type="file" accept>. Extensions only: MIME hints vary by OS. */
export const ACCEPT_ATTRIBUTE = ALLOWED_EXTENSIONS.map((e) => `.${e}`).join(",");

export const ALLOWED_TYPES_LABEL = "PDF, DOC/DOCX, XLS/XLSX, JPG, PNG, WEBP, HEIC, TIFF, ZIP, DWG";

export function getExtension(filename: string): string {
  const match = /\.([A-Za-z0-9]{1,8})$/.exec(filename.trim());
  return match ? match[1].toLowerCase() : "";
}

export function findAllowedType(filename: string): AllowedFileType | undefined {
  const ext = getExtension(filename);
  return ALLOWED_FILE_TYPES.find((t) => t.ext === ext);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0)} MB`;
}

export const FAMILY_LABELS: Record<FileFamily, string> = {
  pdf: "PDF",
  word: "Word",
  excel: "Excel",
  image: "Image",
  archive: "ZIP",
  cad: "DWG",
};

/** Upload ids are 128-bit random hex strings issued by the server. */
export const UPLOAD_ID_PATTERN = /^[a-f0-9]{32}$/;
