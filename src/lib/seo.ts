import type { Metadata } from "next";
import { ServiceRegion, siteConfig } from "@/content/site";
import type { Service } from "@/types/content";

export function absoluteUrl(path = "/"): string {
  return new URL(path, siteConfig.url).toString();
}

const DEFAULT_SHARE_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${siteConfig.legalName} — commercial interior trade contractor, Toronto & GTA`,
};

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string
  /** Use the title as-is instead of applying the "| MEK Construction Inc." template. */
  absoluteTitle?: boolean;
  noIndex?: boolean;
}

/**
 * Per-page metadata: title, description, canonical, Open Graph and Twitter.
 * Open Graph / Twitter images come from the `opengraph-image` file
 * conventions (site-wide default, overridden for services and projects).
 */

export function createMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noIndex,
  image,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle
    ? title
    : `${title} | ${siteConfig.legalName}`;

  const url = absoluteUrl(path);
  const shareImage = image
    ? absoluteUrl(image)
    : DEFAULT_SHARE_IMAGE;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      siteName: siteConfig.legalName,
      locale: "en_CA",
      url,
      title: fullTitle,
      description,
      images: [shareImage],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage],
    },

    robots: noIndex
      ? { index: false, follow: true }
      : undefined,
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

const provinceNames: Record<ServiceRegion["province"], string> = {
  ON: "Ontario",
  QC: "Quebec",
  MB: "Manitoba",
};

const schemaType = (type: ServiceRegion["type"]) =>
  type === "city" ? "City" : "AdministrativeArea";

const seen = new Set<string>();

const areaServed = siteConfig.serviceRegions
  .filter((region) => region.active)
  .flatMap((region) => {
    const province = provinceNames[region.province];
    const places = [
      {
        "@type": schemaType(region.type),
        name: region.name,
        containedInPlace: {
          "@type": "AdministrativeArea",
          name: province,
        },
      },
      ...region.municipalities.map((municipality) => ({
        "@type": "Place",
        name: municipality,
        containedInPlace: {
          "@type": schemaType(region.type),
          name: region.name,
        },
      })),
    ];
    return places.filter((place) => {
      const key = `${region.province}:${place.name.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  });

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
    areaServed: areaServed,
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
  const url = absoluteUrl(`/services/${service.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.seo?.description ?? service.summary,
    url,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Ontario",
      containedInPlace: {
        "@type": "Country",
        name: "Canada",
      },
    },
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
