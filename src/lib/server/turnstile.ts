import "server-only";

import { logger } from "@/lib/server/log";

/**
 * Optional Cloudflare Turnstile verification. Enabled only when both
 * NEXT_PUBLIC_TURNSTILE_SITE_KEY (browser widget) and TURNSTILE_SECRET_KEY
 * (this check) are set.
 */
export async function verifyTurnstile(secret: string, token: string | undefined, ip: string): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    logger.error("turnstile.verify_failed", { error: error instanceof Error ? error.name : "Unknown" });
    return false;
  }
}
