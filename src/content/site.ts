import type { NavItem } from "@/types/content";
import { resolveSiteUrl } from "@/lib/site-url";

/**
 * Central company configuration.
 *
 * Every piece of company information shown on the site (name, phone, address,
 * hours, navigation) comes from this object. Change it here, never in JSX.
 *
 * Verification status (September 2026):
 * - phone, address: shown on the previous mekdomain.ca site.
 * - businessHours: taken from the previous site, where the weekday line was
 *   garbled ("Weekdays: Fri: 7:00 AM – 5:00 PM"). Confirm before relying on it.
 * - publicEmail: NOT verified. The previous site showed a template address
 *   from a generic template domain, which must not be used. Set a real mailbox here
 *   and every email link, the footer, the contact page and structured data
 *   will pick it up. While it is undefined, email is simply not displayed.
 *
 * Form notification recipients are server-side environment variables
 * (CONTACT_EMAIL, BID_EMAIL, QUOTE_EMAIL) so they are never hard-coded into
 * the client bundle and can differ between environments.
 */

export interface BusinessHours {
  label: string;
  /** schema.org day names */
  days: Array<
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  >;
  /** 24h HH:MM, omitted when closed */
  opens?: string;
  closes?: string;
}

export interface ServiceRegion {
  slug: string;
  name: string;
  municipalities: string[];
}

export const siteConfig = {
  companyName: "MEK Construction",
  legalName: "MEK Construction Inc.",
  shortName: "MEK",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en-CA",
  description:
    "MEK Construction Inc. is a commercial construction trade contractor serving Toronto and the GTA: drywall, metal stud framing, taping and finishing, insulation, painting, acoustic ceilings and interior renovation scopes for general contractors, construction managers and building owners.",
  tagline: "Commercial interior trade contractor — Toronto & GTA",

  phone: {
    display: "(647) 979-1421",
    e164: "+16479791421",
  },
  publicEmail: undefined as string | undefined,

  address: {
    street: "34 Paragon Rd",
    locality: "Etobicoke",
    city: "Toronto",
    region: "ON",
    regionName: "Ontario",
    postalCode: "M9R 1J8",
    country: "CA",
    countryName: "Canada",
  },

  businessHours: [
    {
      label: "Monday – Friday",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    { label: "Saturday", days: ["Saturday"], opens: "08:00", closes: "16:00" },
    { label: "Sunday", days: ["Sunday"] },
  ] satisfies BusinessHours[],

  primaryMarket: "Toronto and the Greater Toronto Area",
  serviceAreaNote:
    "Projects elsewhere in Ontario are reviewed case by case, based on scope, schedule and location.",
  serviceRegions: [
    {
      slug: "toronto",
      name: "City of Toronto",
      municipalities: [
        "Downtown Toronto",
        "Etobicoke",
        "North York",
        "Scarborough",
        "East York",
        "York",
      ],
    },
    {
      slug: "peel-region",
      name: "Peel Region",
      municipalities: ["Mississauga", "Brampton", "Caledon"],
    },
    {
      slug: "york-region",
      name: "York Region",
      municipalities: ["Vaughan", "Markham", "Richmond Hill", "Newmarket", "Aurora"],
    },
    {
      slug: "halton-region",
      name: "Halton Region",
      municipalities: ["Oakville", "Burlington", "Milton", "Halton Hills"],
    },
    {
      slug: "durham-region",
      name: "Durham Region",
      municipalities: ["Pickering", "Ajax", "Whitby", "Oshawa"],
    },
  ] satisfies ServiceRegion[],

  /** Add verified profiles only, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." } */
  socialLinks: [] as NavItem[],

  primaryNavigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Sectors", href: "/sectors" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  footerNavigation: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Sectors", href: "/sectors" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Quote", href: "/request-quote" },
    { label: "Invite MEK to Bid", href: "/invite-to-bid" },
  ] satisfies NavItem[],

  legalNavigation: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Image credits", href: "/image-credits" },
  ] satisfies NavItem[],

  /** Date the static page copy was last reviewed; used for sitemap lastModified. */
  contentUpdatedAt: "2026-09-29",
} as const;

export type SiteConfig = typeof siteConfig;

export function formatAddressLines(address = siteConfig.address): string[] {
  return [
    address.street,
    `${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`,
    address.countryName,
  ];
}

export function formatAddressInline(address = siteConfig.address): string {
  return `${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`;
}
