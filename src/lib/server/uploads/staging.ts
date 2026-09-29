import "server-only";

import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";
import type { FileFamily } from "@/lib/uploads/rules";
import { UPLOAD_ID_PATTERN } from "@/lib/uploads/rules";
import { getStorage } from "@/lib/server/storage";
import { displayFilename, sanitizeFilename } from "@/lib/server/uploads/filename";
import type { AllowedFileType } from "@/lib/uploads/rules";

/**
 * Two-step upload flow:
 *
 * 1. Each file is uploaded on its own (POST /api/uploads), inspected, and
 *    written to `staging/<id>/`. The browser receives an unguessable id and
 *    shows per-file progress, errors and removal without touching the rest of
 *    the form.
 * 2. On submission the handler receives only ids; it re-reads the staged
 *    metadata (server-side, trusted), checks limits again and moves the files
 *    under the submission's private folder.
 *
 * Staged files that are never submitted are purged after STAGING_MAX_AGE_MS.
 */

export const STAGING_MAX_AGE_MS = 24 * 60 * 60 * 1000;
export const UPLOAD_FORMS = ["bid", "quote"] as const;
export type UploadForm = (typeof UPLOAD_FORMS)[number];

const stagedSchema = z.object({
  id: z.string().regex(UPLOAD_ID_PATTERN),
  form: z.enum(UPLOAD_FORMS),
  originalName: z.string(),
  storedName: z.string(),
  size: z.number().int().positive(),
  ext: z.string(),
  family: z.enum(["pdf", "word", "excel", "image", "archive", "cad"]),
  mime: z.string(),
  sha256: z.string(),
  uploadedAt: z.string(),
});

export type StagedUpload = z.infer<typeof stagedSchema> & { family: FileFamily };

const fileKey = (id: string) => `staging/${id}/file`;
const metaKey = (id: string) => `staging/${id}/meta.json`;

export async function stageUpload(
  form: UploadForm,
  filename: string,
  body: Buffer,
  type: AllowedFileType,
): Promise<StagedUpload> {
  const storage = getStorage();
  const id = randomBytes(16).toString("hex");
  const meta: StagedUpload = {
    id,
    form,
    originalName: displayFilename(filename),
    storedName: sanitizeFilename(filename),
    size: body.byteLength,
    ext: type.ext,
    family: type.family,
    mime: type.mime,
    sha256: createHash("sha256").update(body).digest("hex"),
    uploadedAt: new Date().toISOString(),
  };
  await storage.put(fileKey(id), body, "application/octet-stream");
  await storage.put(metaKey(id), Buffer.from(JSON.stringify(meta)), "application/json");
  return meta;
}

export async function getStagedUpload(id: string): Promise<StagedUpload | null> {
  if (!UPLOAD_ID_PATTERN.test(id)) return null;
  const raw = await getStorage().get(metaKey(id));
  if (!raw) return null;
  const parsed = stagedSchema.safeParse(JSON.parse(raw.toString("utf8")));
  return parsed.success ? parsed.data : null;
}

export async function deleteStagedUpload(id: string): Promise<void> {
  if (!UPLOAD_ID_PATTERN.test(id)) return;
  const storage = getStorage();
  await Promise.all([storage.delete(fileKey(id)), storage.delete(metaKey(id))]);
}

/** Move a staged file under the submission folder; returns the final storage key. */
export async function commitStagedUpload(upload: StagedUpload, destinationPrefix: string, index: number) {
  const storage = getStorage();
  const key = `${destinationPrefix}/files/${String(index + 1).padStart(2, "0")}-${upload.storedName}`;
  await storage.move(fileKey(upload.id), key);
  await storage.delete(metaKey(upload.id));
  return key;
}

export async function purgeStaleStaging(): Promise<void> {
  await getStorage().purgeStaleStaging(STAGING_MAX_AGE_MS);
}
