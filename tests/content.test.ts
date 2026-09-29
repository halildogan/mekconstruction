import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { services } from "@/content/services";
import { sectors } from "@/content/sectors";
import { projects } from "@/content/projects";
import { imageCredits, images } from "@/content/images";
import { siteConfig } from "@/content/site";

const unique = (values: string[]) => new Set(values).size === values.length;

describe("content integrity", () => {
  it("has unique, URL-safe slugs", () => {
    for (const list of [services, sectors, projects]) {
      const slugs = list.map((i) => i.slug);
      expect(unique(slugs)).toBe(true);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("only references existing services and sectors", () => {
    const serviceSlugs = new Set(services.map((s) => s.slug));
    const sectorSlugs = new Set(sectors.map((s) => s.slug));
    for (const s of services) {
      for (const r of s.relatedServices) expect(serviceSlugs.has(r), `${s.slug} → ${r}`).toBe(true);
      for (const sec of s.sectors) expect(sectorSlugs.has(sec), `${s.slug} → ${sec}`).toBe(true);
    }
    for (const p of projects) {
      if (p.sector) expect(sectorSlugs.has(p.sector)).toBe(true);
      for (const svc of p.services ?? []) expect(serviceSlugs.has(svc)).toBe(true);
    }
  });

  it("credits every licensed image", () => {
    const creditIds = new Set(imageCredits.map((c) => c.id));
    const all = [images.hero, images.about, ...Object.values(images.services), ...Object.values(images.sectors)];
    for (const img of all) {
      expect(img.alt.length).toBeGreaterThan(10);
      if (img.creditId) expect(creditIds.has(img.creditId), img.creditId).toBe(true);
    }
  });

  it("keeps meta descriptions within search-result length", () => {
    for (const s of services) {
      expect(s.seo?.description?.length ?? 0).toBeLessThanOrEqual(170);
    }
  });

  it("uses production company details", () => {
    expect(siteConfig.url).toBe("https://mekdomain.ca");
    expect(siteConfig.phone.e164).toBe("+16479791421");
    expect(siteConfig.publicEmail ?? "").not.toContain("construction.com");
  });
});

describe("no template or placeholder content ships", () => {
  const forbidden = [
    /lorem ipsum/i,
    /john doe/i,
    /jane smith/i,
    /robert johnson/i,
    /mary williams/i,
    /sample title/i,
    /@construction\.com/i,
    /\b20\+ years\b/i,
    /unmatched excellence/i,
    /where vision meets reality/i,
    /your trusted partner/i,
    /cutting-edge/i,
  ];

  function files(dir: string): string[] {
    return readdirSync(dir).flatMap((name) => {
      const full = path.join(dir, name);
      return statSync(full).isDirectory() ? files(full) : /\.(tsx?|css)$/.test(name) ? [full] : [];
    });
  }

  it("contains none of the previous site's template phrases", () => {
    for (const file of files(path.resolve(__dirname, "../src"))) {
      const text = readFileSync(file, "utf8");
      for (const pattern of forbidden) expect(pattern.test(text), `${pattern} in ${file}`).toBe(false);
    }
  });
});
