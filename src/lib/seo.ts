import type { Metadata } from "next";
import { siteConfig } from "@/content/site";
import type { Service } from "@/types/content";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  /** Use the title as-is instead of applying the "| MEK Construction Inc." template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/**
 * Per-page metadata: title, description, canonical, Open Graph and Twitter.
 * Open Graph / Twitter images come from the `opengraph-image` file
 * conventions (site-wide default, overridden for services and projects).
 */
export function createMetadata({ title, description, path, absoluteTitle, noIndex }: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.legalName}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      locale: "en_CA",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}

/* --------------------------------- JSON-LD --------------------------------- */

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

type JsonLdObject = Record<string, unknown>;

/**
 * Organization + local business description. Only verified information from
 * siteConfig is used — no ratings, reviews or price ranges.
 */
export function organizationJsonLd(services: Service[]): JsonLdObject {
  const { address, phone, publicEmail } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": ORGANIZATION_ID,
    name: siteConfig.legalName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.companyName,
    url: siteConfig.url,
    logo: absoluteUrl("/brand/mek-logo-512.png"),
    image: absoluteUrl("/brand/mek-logo-512.png"),
    description: siteConfig.description,
    telephone: phone.e164,
    ...(publicEmail ? { email: publicEmail } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      ...siteConfig.serviceRegions
        .filter((r) => r.slug !== "toronto")
        .map((r) => ({ "@type": "AdministrativeArea", name: `${r.name}, Ontario` })),
    ],
    openingHoursSpecification: siteConfig.businessHours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
        opens: h.opens,
        closes: h.closes,
      })),
    knowsAbout: services.map((s) => s.name),
    ...(siteConfig.socialLinks.length ? { sameAs: siteConfig.socialLinks.map((l) => l.href) } : {}),
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.legalName,
    inLanguage: "en-CA",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbJsonLd(crumbs: Crumb[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: "Toronto" },
      { "@type": "AdministrativeArea", name: "Greater Toronto Area, Ontario" },
    ],
    audience: {
      "@type": "BusinessAudience",
      name: "General contractors, construction managers, developers and commercial property owners",
    },
  };
}

/** Serialize JSON-LD safely for inline <script> (prevents </script> breakouts). */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
