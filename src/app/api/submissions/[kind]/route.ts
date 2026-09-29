import { SUBMISSION_KINDS, type SubmissionKind } from "@/lib/forms/schemas";
import { apiError, checkOrigin, json } from "@/lib/server/api";
import { errorName, logger } from "@/lib/server/log";
import { RATE_LIMITS, rateLimiter } from "@/lib/server/rate-limit";
import { PayloadTooLargeError, getClientIp, readJsonWithLimit } from "@/lib/server/request";
import { processSubmission } from "@/lib/server/submissions/process";

const MAX_JSON_BYTES = 64 * 1024;

/** POST /api/submissions/bid | quote | contact */
export async function POST(request: Request, context: RouteContext<"/api/submissions/[kind]">) {
  const { kind } = await context.params;
  if (!SUBMISSION_KINDS.includes(kind as SubmissionKind)) return apiError(404, "Not found.");
  if (!checkOrigin(request)) return apiError(403, "This request was not accepted.");

  const ip = getClientIp(request.headers);
  const limit = rateLimiter.check(`submit:${ip}`, RATE_LIMITS.submission);
  if (!limit.allowed) {
    return apiError(
      429,
      "Too many submissions in a short time. Please wait a few minutes, or call us directly.",
      {},
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await readJsonWithLimit(request, MAX_JSON_BYTES);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) return apiError(413, "The submission is too large.");
    return apiError(400, "The submission could not be read.");
  }

  try {
    const result = await processSubmission(kind as SubmissionKind, body, { ip });
    if (result.ok) return json({ ok: true, reference: result.reference });
    return apiError(result.status, result.error, result.fieldErrors ? { fieldErrors: result.fieldErrors } : {});
  } catch (error) {
    logger.error("submission.unhandled", { kind, error: errorName(error) });
    return apiError(500, "Something went wrong on our side. Please try again, or call us.");
  }
}
