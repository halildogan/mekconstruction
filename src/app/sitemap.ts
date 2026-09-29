import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { getProjects, getServices } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

const STATIC_ROUTES = [
  "/",
  "/about",
  "/services",
  "/projects",
  "/sectors",
  "/contact",
  "/request-quote",
  "/invite-to-bid",
  "/privacy",
  "/terms",
  "/image-credits",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([getServices(), getProjects()]);
  const updated = new Date(siteConfig.contentUpdatedAt);

  return [
    ...STATIC_ROUTES.map((path) => ({ url: absoluteUrl(path), lastModified: updated })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), lastModified: updated })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: new Date(p.updatedAt ?? siteConfig.contentUpdatedAt),
    })),
  ];
}
