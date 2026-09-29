/**
 * Option lists shared by the forms (client) and the submission handlers
 * (server). Values are stable identifiers stored with each submission; labels
 * are what people see and what appears in notification emails.
 */

export interface Option<T extends string = string> {
  value: T;
  label: string;
}

export const PROJECT_TYPES = [
  { value: "tenant-improvement", label: "Tenant improvement / fit-out" },
  { value: "interior-renovation", label: "Interior renovation" },
  { value: "new-construction", label: "New construction" },
  { value: "base-building", label: "Base building" },
  { value: "retail", label: "Retail" },
  { value: "office", label: "Office" },
  { value: "institutional", label: "Institutional" },
  { value: "industrial", label: "Industrial" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

export const BID_TRADES = [
  { value: "drywall", label: "Drywall" },
  { value: "metal-stud-framing", label: "Metal Stud Framing" },
  { value: "taping-finishing", label: "Taping & Finishing" },
  { value: "plastering", label: "Plastering" },
  { value: "insulation", label: "Insulation" },
  { value: "painting", label: "Painting" },
  { value: "acoustic-ceilings", label: "Acoustic Ceilings" },
  { value: "flooring", label: "Flooring" },
  { value: "demolition", label: "Demolition" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export type BidTrade = (typeof BID_TRADES)[number]["value"];

export const PROJECT_SIZES = [
  { value: "under-2500", label: "Under 2,500 sq ft" },
  { value: "2500-10000", label: "2,500 – 10,000 sq ft" },
  { value: "10000-50000", label: "10,000 – 50,000 sq ft" },
  { value: "over-50000", label: "Over 50,000 sq ft" },
  { value: "unknown", label: "Not sure yet" },
] as const satisfies readonly Option[];

export type ProjectSize = (typeof PROJECT_SIZES)[number]["value"];

export const CONTACT_TOPICS = [
  { value: "project", label: "Project enquiry" },
  { value: "general", label: "General enquiry" },
  { value: "supplier", label: "Supplier or manufacturer" },
  { value: "other", label: "Other" },
] as const satisfies readonly Option[];

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

/** Quote-form service choices are built from the service catalogue plus these. */
export const QUOTE_SERVICE_EXTRAS = [
  { value: "multiple", label: "Multiple trades / full interior package" },
  { value: "other", label: "Other / not sure" },
] as const satisfies readonly Option[];

export function labelFor<T extends string>(options: readonly Option<T>[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export const values = <T extends string>(options: readonly Option<T>[]) =>
  options.map((o) => o.value) as [T, ...T[]];
