import "server-only";

import { NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { isSameOrigin } from "@/lib/server/request";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

export function apiError(status: number, error: string, extra: Record<string, unknown> = {}, headers: Record<string, string> = {}) {
  return json({ ok: false, error, ...extra }, status, headers);
}

const allowedOrigins = (() => {
  const url = new URL(siteConfig.url);
  return [url.origin, `${url.protocol}//www.${url.host}`];
})();

export function checkOrigin(request: Request) {
  return isSameOrigin(request, allowedOrigins);
}
