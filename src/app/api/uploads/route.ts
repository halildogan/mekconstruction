import { UPLOAD_LIMITS } from "@/lib/uploads/rules";
import { apiError, checkOrigin, json } from "@/lib/server/api";
import { errorName, logger } from "@/lib/server/log";
import { RATE_LIMITS, rateLimiter } from "@/lib/server/rate-limit";
import { PayloadTooLargeError, getClientIp, readBodyWithLimit } from "@/lib/server/request";
import { INSPECTION_MESSAGES, inspectUpload } from "@/lib/server/uploads/inspect";
import { UPLOAD_FORMS, purgeStaleStaging, stageUpload, type UploadForm } from "@/lib/server/uploads/staging";

/**
 * POST /api/uploads?form=bid|quote
 *
 * Body: the raw file bytes. Header `X-File-Name`: URI-encoded original name.
 * Returns an upload id that the form includes on submission.
 */
export async function POST(request: Request) {
  if (!checkOrigin(request)) return apiError(403, "This request was not accepted.");

  const ip = getClientIp(request.headers);
  const limit = rateLimiter.check(`upload:${ip}`, RATE_LIMITS.upload);
  if (!limit.allowed) {
    return apiError(429, "Too many uploads in a short time. Please wait a few minutes and try again.", {}, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const form = new URL(request.url).searchParams.get("form");
  if (!form || !UPLOAD_FORMS.includes(form as UploadForm)) return apiError(400, "Unknown form.");

  let filename: string;
  try {
    filename = decodeURIComponent(request.headers.get("x-file-name") ?? "");
  } catch {
    return apiError(400, "The file name could not be read.");
  }
  if (!filename || filename.length > 255) return apiError(400, "The file name is missing or too long.");

  let body: Buffer;
  try {
    body = await readBodyWithLimit(request, UPLOAD_LIMITS.maxFileBytes);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return apiError(413, `This file is larger than ${UPLOAD_LIMITS.maxFileBytes / (1024 * 1024)} MB.`);
    }
    return apiError(400, "The upload was interrupted. Please try again.");
  }

  const inspection = inspectUpload(filename, body);
  if (!inspection.ok) {
    logger.warn("upload.rejected", { reason: inspection.reason, bytes: body.byteLength });
    return apiError(415, INSPECTION_MESSAGES[inspection.reason]);
  }

  try {
    const staged = await stageUpload(form as UploadForm, filename, body, inspection.type);
    // Opportunistic cleanup of abandoned uploads (local disk driver).
    void purgeStaleStaging().catch(() => undefined);
    return json({
      ok: true,
      upload: { id: staged.id, name: staged.originalName, size: staged.size, family: staged.family },
    });
  } catch (error) {
    logger.error("upload.store_failed", { error: errorName(error) });
    return apiError(500, "The file couldn't be saved. Please try again.");
  }
}
