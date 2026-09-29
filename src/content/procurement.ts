/**
 * Procurement-facing content shared by the homepage bid section, the
 * Invite-to-Bid page and the Request-a-Quote page.
 */

/** MasterFormat sections that typically make up MEK's interior trade package. */
export const tradePackageSections = [
  { number: "02 41 19", title: "Selective Demolition" },
  { number: "07 21 00", title: "Thermal Insulation" },
  { number: "09 21 16", title: "Gypsum Board Assemblies" },
  { number: "09 22 16", title: "Non-Structural Metal Framing" },
  { number: "09 29 00", title: "Gypsum Board" },
  { number: "09 51 13", title: "Acoustical Panel Ceilings" },
  { number: "09 65 00", title: "Resilient Flooring" },
  { number: "09 81 00", title: "Acoustic Insulation" },
  { number: "09 91 23", title: "Interior Painting" },
] as const;

/** What general contractors can send with a bid invitation. */
export const bidChecklist = [
  { title: "Tender invitation", detail: "Trade package, scope of work and bid form, if you use one." },
  { title: "Issued for Tender drawings", detail: "Architectural drawings, reflected ceiling plans and relevant details." },
  { title: "Specifications", detail: "At minimum the Division 09 sections and any related Division 07 sections." },
  { title: "Addenda", detail: "All addenda issued to date — and any issued after you invite us." },
  { title: "Bid due date and time", detail: "Including where and how the price should be submitted." },
  { title: "Project information", detail: "Address, schedule, phasing, site access and any site-visit dates." },
] as const;

/** Steps after a bid invitation or quote request arrives. */
export const responseSteps = [
  {
    title: "Review",
    description: "We review the documents, scope and bid due date and confirm receipt with the reference number.",
  },
  {
    title: "Questions",
    description: "Scope gaps, missing sheets or conflicts are raised with you before pricing, not after award.",
  },
  {
    title: "Quotation",
    description:
      "Pricing is issued in writing against the documents and addenda received, with inclusions, exclusions and clarifications stated.",
  },
] as const;
