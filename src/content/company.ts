import type { CapabilityItem } from "@/types/content";

/**
 * Company copy that describes how MEK works. These are descriptions of
 * approach, not measured claims: keep them free of numbers, years, counts,
 * awards or guarantees unless those facts are verified and supplied.
 */

export const selectionCriteria: CapabilityItem[] = [
  {
    title: "Trade-focused execution",
    description:
      "MEK concentrates on interior trade scopes — framing, board, finishing, insulation, ceilings and paint — rather than spreading across every division of work.",
  },
  {
    title: "Detailed estimating",
    description:
      "Quotations are prepared from the issued drawings, specifications and addenda, with inclusions, exclusions and clarifications stated in writing.",
  },
  {
    title: "Schedule coordination",
    description:
      "Crew planning and sequencing follow the general contractor's schedule and the trades working before and after us.",
  },
  {
    title: "Organized project delivery",
    description:
      "Submittals, material deliveries, site instructions and deficiencies are tracked from mobilization through closeout.",
  },
  {
    title: "Commercial jobsite practice",
    description:
      "Work is planned around the constructor's safety program, building rules, site access, protection and housekeeping.",
  },
  {
    title: "Responsive communication",
    description:
      "A direct point of contact for pricing questions, RFIs and site coordination, with clear answers and written follow-up.",
  },
  {
    title: "Quality workmanship",
    description:
      "Work is checked against the drawings and specified finish levels before an area is turned over to the next trade.",
  },
];

export const audiences = [
  {
    title: "General contractors",
    description:
      "MEK prices tender packages and works as the interior trade subcontractor under your contract, schedule and site rules. Bid invitations, addenda and RFIs are answered directly.",
  },
  {
    title: "Construction managers",
    description:
      "For CM-delivered projects, MEK prices the trade packages you issue and coordinates with your site team on sequencing, submittals and closeout requirements.",
  },
  {
    title: "Developers",
    description:
      "MEK can provide trade pricing during budgeting and design development, and install interior scopes when the work is tendered through your general contractor or CM.",
  },
  {
    title: "Property managers",
    description:
      "For tenant turnovers, suite re-configurations and common-area upgrades, MEK plans work around building rules, occupied floors and after-hours access.",
  },
  {
    title: "Commercial owners and operators",
    description:
      "Retail, office, institutional and industrial operators can engage MEK directly for defined interior scopes, or through their contractor for larger projects.",
  },
] as const;

export const processSteps: CapabilityItem[] = [
  {
    title: "Invitation and document review",
    description:
      "Tender documents, drawings, specifications and addenda are reviewed against the scope, schedule and bid due date.",
  },
  {
    title: "Estimating and quotation",
    description:
      "Quantities are taken off the drawings and priced to the specified systems. The quotation lists inclusions, exclusions, clarifications and any alternates requested.",
  },
  {
    title: "Pre-construction coordination",
    description:
      "After award: schedule, submittals, layout, backing requirements and material deliveries are coordinated with the general contractor and adjacent trades.",
  },
  {
    title: "Execution",
    description:
      "Work is carried out to the approved drawings and specifications, with site supervision, daily coordination and housekeeping.",
  },
  {
    title: "Quality checks and deficiencies",
    description:
      "Completed areas are checked against the drawings and finish levels, and deficiencies are corrected before turnover.",
  },
  {
    title: "Closeout",
    description:
      "Closeout documents required by the contract are assembled and handed over, and warranty obligations are recorded.",
  },
];
