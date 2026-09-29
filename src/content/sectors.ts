import type { Sector } from "@/types/content";
import { images } from "@/content/images";

/**
 * Market sectors. Add a sector by appending an entry; it appears on /sectors,
 * in project filters (once a project references it) and, when `featured`, on
 * the homepage.
 */
export const sectors: Sector[] = [
  {
    slug: "commercial",
    name: "Commercial",
    summary: "Interior trade packages for commercial buildings, from base-building interiors to common areas.",
    description:
      "Commercial buildings bring defined schedules, detailed specifications and multiple trades working in the same space. MEK prices and installs interior trade scopes for commercial new construction and renovation, working under the general contractor or construction manager.",
    typicalScopes: [
      "Metal stud framing and gypsum board",
      "Common area and corridor finishes",
      "Acoustic ceilings",
      "Taping, finishing and paint",
    ],
    image: images.sectors.commercial,
    featured: true,
    order: 1,
  },
  {
    slug: "retail",
    name: "Retail",
    summary: "Retail fit-outs and refreshes built around fixed opening dates and landlord criteria.",
    description:
      "Retail work is driven by turnover and opening dates, landlord design criteria and brand standards. MEK installs framing, board, finishes and ceilings for retail units and refreshes, with work sequenced so fixture and millwork installers can follow.",
    typicalScopes: [
      "Demising walls and bulkheads",
      "Feature walls with higher finish levels",
      "Backing for fixtures and signage",
      "Ceilings and paint",
    ],
    image: images.sectors.retail,
    featured: true,
    order: 2,
  },
  {
    slug: "office",
    name: "Office",
    summary: "Office interiors and fit-outs where acoustics, finish quality and phasing matter.",
    description:
      "Office interiors combine acoustic separation between rooms, high-visibility finishes and, frequently, work in occupied buildings. MEK frames, insulates, boards, finishes and paints office space to the tenant's drawings and the building's rules.",
    typicalScopes: [
      "Partitions with acoustic insulation",
      "Level 4 and Level 5 finishes",
      "Acoustic ceilings",
      "Phased work in occupied floors",
    ],
    image: images.sectors.office,
    featured: true,
    order: 3,
  },
  {
    slug: "institutional",
    name: "Institutional",
    summary: "Interior trade work for education, healthcare, civic and other public facilities.",
    description:
      "Institutional projects typically carry detailed specifications, rated assemblies, security and access requirements, and closeout documentation. MEK installs interior systems to those documents and works within the owner's site requirements.",
    typicalScopes: [
      "Fire-rated partitions to listed assemblies",
      "Abuse-resistant boards where specified",
      "Acoustic ceilings",
      "Paint and finishes",
    ],
    image: images.sectors.institutional,
    featured: true,
    order: 4,
  },
  {
    slug: "industrial",
    name: "Industrial",
    summary: "Interior build-outs for industrial buildings — offices, washrooms, service and support areas.",
    description:
      "Industrial buildings often need interior build-outs within a larger shell: office areas, washrooms, lunchrooms and service rooms. MEK frames, boards, finishes and paints these spaces and works around the operational constraints of the facility.",
    typicalScopes: [
      "Office and support-area build-outs",
      "Rated separations where specified",
      "Block and exposed-surface painting",
      "Ceilings in finished areas",
    ],
    image: images.sectors.industrial,
    featured: true,
    order: 5,
  },
  {
    slug: "tenant-improvements",
    name: "Tenant Improvements",
    summary: "Tenant improvement scopes delivered on tight schedules inside existing buildings.",
    description:
      "Tenant improvements compress several interior trades into a short schedule inside an existing building, with landlord rules, elevator bookings and after-hours work to plan around. MEK carries the interior trade package so the general contractor has fewer hand-offs to manage.",
    typicalScopes: [
      "Selective demolition",
      "Framing, board and finishing",
      "Ceilings and paint",
      "Deficiency correction at turnover",
    ],
    image: images.sectors.tenantImprovements,
    featured: true,
    order: 6,
  },
  {
    slug: "interior-renovations",
    name: "Interior Renovations",
    summary: "Renovation of existing interiors, matching new work to existing conditions.",
    description:
      "Renovations uncover existing conditions that do not always match the drawings. MEK removes, rebuilds and refinishes interiors, raising discrepancies through the general contractor and matching new surfaces to existing work.",
    typicalScopes: [
      "Selective demolition",
      "Re-framing and new partitions",
      "Plaster and drywall repair",
      "Refinishing and paint",
    ],
    image: images.sectors.renovations,
    featured: false,
    order: 7,
  },
];
