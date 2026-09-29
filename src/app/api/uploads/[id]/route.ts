import { UPLOAD_ID_PATTERN } from "@/lib/uploads/rules";
import { apiError, checkOrigin, json } from "@/lib/server/api";
import { deleteStagedUpload } from "@/lib/server/uploads/staging";

/** DELETE /api/uploads/:id — discard a staged (not yet submitted) upload. */
export async function DELETE(request: Request, context: RouteContext<"/api/uploads/[id]">) {
  if (!checkOrigin(request)) return apiError(403, "This request was not accepted.");
  const { id } = await context.params;
  if (!UPLOAD_ID_PATTERN.test(id)) return apiError(404, "Not found.");
  await deleteStagedUpload(id).catch(() => undefined);
  return json({ ok: true });
}
