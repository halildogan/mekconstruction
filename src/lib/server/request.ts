import "server-only";

/**
 * Best-effort client IP for rate limiting.
 *
 * In production the app listens on 127.0.0.1 and is reachable only through
 * Cloudflare Tunnel, so Cloudflare's CF-Connecting-IP header is authoritative.
 * If the origin is ever exposed directly, these headers can be spoofed —
 * keep the Next.js port closed to the internet.
 */
export function getClientIp(headers: Headers): string {
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export class PayloadTooLargeError extends Error {
  constructor() {
    super("Payload too large");
    this.name = "PayloadTooLargeError";
  }
}

/**
 * Read a request body into memory, aborting as soon as it exceeds `maxBytes`
 * (the Content-Length header is checked first but not trusted).
 */
export async function readBodyWithLimit(request: Request, maxBytes: number): Promise<Buffer> {
  const declared = Number(request.headers.get("content-length") ?? "NaN");
  if (Number.isFinite(declared) && declared > maxBytes) throw new PayloadTooLargeError();
  if (!request.body) return Buffer.alloc(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      throw new PayloadTooLargeError();
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks, total);
}

export async function readJsonWithLimit(request: Request, maxBytes: number): Promise<unknown> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    throw new TypeError("Expected application/json");
  }
  const body = await readBodyWithLimit(request, maxBytes);
  return JSON.parse(body.toString("utf8"));
}

/** Reject cross-site form posts: browsers always send Origin on fetch/XHR POSTs. */
export function isSameOrigin(request: Request, allowedOrigins: string[]): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    try {
      if (new URL(origin).host === host) return true;
    } catch {
      return false;
    }
  }
  return allowedOrigins.includes(origin);
}
