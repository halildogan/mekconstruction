import { describe, expect, it } from "vitest";
import { REFERENCE_PATTERN, createReference } from "@/lib/server/reference";
import { RateLimiter } from "@/lib/server/rate-limit";
import { resolveSiteUrl } from "@/lib/site-url";
import { escapeHtml, renderEmailHtml } from "@/lib/server/email/templates";
import { sanitizeHeaderValue } from "@/lib/server/email";
import { assertSafeKey } from "@/lib/server/storage/types";

describe("submission references", () => {
  it("formats references with the Toronto date and a random suffix", () => {
    const ref = createReference("bid", new Date("2026-09-29T15:00:00Z"));
    expect(ref).toMatch(REFERENCE_PATTERN);
    expect(ref.startsWith("MEK-BID-20260929-")).toBe(true);
    expect(createReference("quote").startsWith("MEK-RFQ-")).toBe(true);
    expect(createReference("contact").startsWith("MEK-MSG-")).toBe(true);
  });

  it("uses the Toronto calendar date near midnight UTC", () => {
    // 02:00 UTC on Sept 30 is still Sept 29 in Toronto.
    expect(createReference("bid", new Date("2026-09-30T02:00:00Z"))).toContain("-20260929-");
  });

  it("is not sequential", () => {
    const refs = new Set(Array.from({ length: 50 }, () => createReference("bid")));
    expect(refs.size).toBe(50);
  });
});

describe("rate limiter", () => {
  it("blocks after the limit and recovers after the window", () => {
    let now = 0;
    const limiter = new RateLimiter(() => now);
    const rule = { limit: 2, windowMs: 1000 };
    expect(limiter.check("ip", rule).allowed).toBe(true);
    expect(limiter.check("ip", rule).allowed).toBe(true);
    const blocked = limiter.check("ip", rule);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(limiter.check("other-ip", rule).allowed).toBe(true);
    now = 1500;
    expect(limiter.check("ip", rule).allowed).toBe(true);
  });
});

describe("canonical site URL", () => {
  it("never resolves to localhost, private IPs or plain http", () => {
    expect(resolveSiteUrl(undefined)).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("http://localhost:3000")).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("https://127.0.0.1:3000")).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("https://192.168.1.20")).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("http://mekdomain.ca")).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("not a url")).toBe("https://mekdomain.ca");
    expect(resolveSiteUrl("https://staging.mekdomain.ca/")).toBe("https://staging.mekdomain.ca");
  });
});

describe("email safety", () => {
  it("escapes user content in HTML emails", () => {
    expect(escapeHtml(`<img src=x onerror="a">&'`)).toBe("&lt;img src=x onerror=&quot;a&quot;&gt;&amp;&#39;");
    const html = renderEmailHtml({
      kicker: "Test",
      heading: "<script>alert(1)</script>",
      preheader: "x",
      reference: "MEK-BID-20260929-ABCDEF",
      rows: [{ label: "Company", value: "<b>Evil</b>" }],
      footer: [],
    });
    expect(html).not.toContain("<script>alert(1)</script>");
    expect(html).not.toContain("<b>Evil</b>");
  });

  it("strips header-injection characters from subjects", () => {
    expect(sanitizeHeaderValue("Hello\r\nBcc: victim@example.com")).toBe("Hello Bcc: victim@example.com");
  });
});

describe("storage keys", () => {
  it("rejects traversal and absolute keys", () => {
    expect(() => assertSafeKey("../secret")).toThrow();
    expect(() => assertSafeKey("/etc/passwd")).toThrow();
    expect(() => assertSafeKey("staging/abc/../../x")).toThrow();
    expect(() => assertSafeKey("submissions/bid/2026/09/MEK-BID-20260929-ABCDEF/files/01-plan.pdf")).not.toThrow();
  });
});
