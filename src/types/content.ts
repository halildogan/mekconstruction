import type { StaticImageData } from "next/image";

/**
 * Domain types for site content.
 *
 * Content currently lives in typed modules under `src/content`. These types are
 * the contract the UI depends on, so a CMS or database can replace the data
 * modules later without touching components (see `src/lib/content.ts`).
 */

export interface ImageAsset {
  /** Static import (preferred: gives dimensions + blur placeholder) or an absolute/remote URL. */
  src: StaticImageData | string;
  alt: string;
  /** Required when `src` is a string. */
  width?: number;
  height?: number;
  /** Key into the image-credit registry when the photo is licensed third-party imagery. */
  creditId?: string;
}

export interface Seo {
  title?: string;
  description?: string;
}

export type ServiceCategoryId = "facade-cladding" | "building-envelope" | "facade-repair" | "interior";

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  /** Short label for navigation and chips. */
  shortName: string;
  description: string;
  /** Primary categories lead the site; secondary ones are listed after them with less emphasis. */
  emphasis: "primary" | "secondary";
  order: number;
}

/**
 * Scope that appears alongside MEK's work on façade projects but is NOT
 * advertised as self-performed (e.g. curtain wall, masonry). Shown only as
 * "related / coordinated scope". Promote an item to a Service only once MEK
 * confirms it performs that work directly.
 */
export interface CoordinatedScope {
  group: "glazing-openings" | "related-exterior";
  name: string;
  description: string;
}

export interface Service {
  slug: string;
  category: ServiceCategoryId;
  name: string;
  /** One or two sentences used on cards and in meta descriptions. */
  summary: string;
  /** Short hero line for the detail page. */
  tagline: string;
  overview: string[];
  applications: string[];
  capabilities: string[];
  systems: string[];
  /** Sector slugs this trade is typically delivered in. */
  sectors: string[];
  relatedServices: string[];
  /** A scope-boundary note, e.g. fire-rated assemblies are installed to approved documents. */
  scopeNote?: string;
  image: ImageAsset;
  featured: boolean;
  order: number;
  seo?: Seo;
}

export interface Sector {
  slug: string;
  name: string;
  summary: string;
  description: string;
  typicalScopes: string[];
  image: ImageAsset;
  /** Shown on the homepage sector grid. */
  featured: boolean;
  order: number;
}

export type ProjectStatus = "completed" | "in-progress" | "upcoming";

export type ClientType =
  | "general-contractor"
  | "construction-manager"
  | "developer"
  | "property-manager"
  | "owner"
  | "tenant"
  | "institution"
  | "other";

export type ProjectCategoryId =
  | "facade"
  | "stucco-eifs"
  | "cladding"
  | "building-envelope"
  | "commercial"
  | "industrial"
  | "institutional"
  | "multi-residential"
  | "interior";

export interface ProjectMetadataItem {
  label: string;
  value: string;
}

/**
 * A verified MEK project. Only add projects MEK has actually worked on, with
 * the client's permission to publish where required. Most fields are optional
 * so a project can be published with whatever information has been verified.
 */
export interface Project {
  slug: string;
  title: string;
  /** Must be true for the project to appear anywhere on the public site. */
  published: boolean;
  featured?: boolean;
  location?: string;
  sector?: string;
  /** Portfolio filter categories. */
  categories?: ProjectCategoryId[];
  services?: string[];
  clientType?: ClientType;
  /** ISO date (YYYY-MM or YYYY-MM-DD). */
  completionDate?: string;
  status?: ProjectStatus;
  shortDescription: string;
  longDescription?: string[];
  featuredImage?: ImageAsset;
  gallery?: ImageAsset[];
  scope?: string[];
  challenges?: string[];
  solution?: string[];
  metadata?: ProjectMetadataItem[];
  seo?: Seo;
  /** ISO date the entry was last edited; used for the sitemap. */
  updatedAt?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export interface ImageCredit {
  id: string;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  sourceUrl: string;
}
