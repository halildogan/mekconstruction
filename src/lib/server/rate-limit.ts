/**
 * In-memory sliding-window rate limiter.
 *
 * The site runs as a single Node.js process behind Cloudflare, so process
 * memory is an adequate store. Cloudflare WAF rate-limiting rules on
 * /api/* should be the first line of defence; this is the backstop. If the
 * app is ever scaled to several instances, swap this for a shared store
 * (e.g. Redis) behind the same function signature.
 */

export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export class RateLimiter {
  private hits = new Map<string, number[]>();
  private lastSweep = 0;

  constructor(private readonly now: () => number = Date.now) {}

  check(key: string, rule: RateLimitRule): RateLimitResult {
    const now = this.now();
    this.sweep(now, rule.windowMs);
    const windowStart = now - rule.windowMs;
    const recent = (this.hits.get(key) ?? []).filter((t) => t > windowStart);

    if (recent.length >= rule.limit) {
      this.hits.set(key, recent);
      const retryAfterMs = recent[0] + rule.windowMs - now;
      return { allowed: false, remaining: 0, retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)) };
    }
    recent.push(now);
    this.hits.set(key, recent);
    return { allowed: true, remaining: rule.limit - recent.length, retryAfterSeconds: 0 };
  }

  private sweep(now: number, windowMs: number) {
    if (now - this.lastSweep < 60_000) return;
    this.lastSweep = now;
    const cutoff = now - Math.max(windowMs, 60 * 60 * 1000);
    for (const [key, times] of this.hits) {
      if (times.every((t) => t <= cutoff)) this.hits.delete(key);
    }
  }
}

export const RATE_LIMITS = {
  upload: { limit: 40, windowMs: 15 * 60 * 1000 },
  submission: { limit: 6, windowMs: 15 * 60 * 1000 },
} satisfies Record<string, RateLimitRule>;

const globalForLimiter = globalThis as unknown as { __mekRateLimiter?: RateLimiter };
export const rateLimiter = (globalForLimiter.__mekRateLimiter ??= new RateLimiter());
