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
    summary: "Façades and exterior walls for commercial buildings, plus interior trade packages.",
    description:
      "Commercial buildings combine demanding appearance standards with tight schedules and multiple envelope trades working on the same elevation. MEK installs stucco, EIFS, metal and ACM cladding, exterior insulation and air barriers on commercial new construction and renovations, working under the general contractor or construction manager.",
    typicalScopes: [
      "Stucco, EIFS and panel cladding",
      "Exterior framing, sheathing and air barrier",
      "Sealants and flashings at openings",
      "Interior framing, board and finishes",
    ],
    image: images.sectors.commercialExterior,
    featured: true,
    order: 1,
  },
  {
    slug: "multi-residential",
    name: "Multi-Residential",
    summary: "Exterior wall systems for mid-rise and low-rise multi-residential buildings.",
    description:
      "Multi-residential buildings bring repetitive elevations, balconies, many openings and phased occupancy. MEK installs EIFS and stucco, fibre cement and panel cladding, continuous insulation, air barriers and sealants on condominium, rental and mixed-use buildings across the GTA.",
    typicalScopes: [
      "EIFS and stucco façades",
      "Fibre cement and panel cladding",
      "Continuous insulation and air barriers",
      "Balcony, window and slab-edge detailing",
    ],
    image: images.sectors.multiResidential,
    featured: true,
    order: 2,
  },
  {
    slug: "institutional",
    name: "Institutional",
    summary: "Envelope and interior work for education, healthcare, civic and public buildings.",
    description:
      "Institutional projects carry detailed specifications, performance requirements and closeout documentation, often on occupied sites. MEK installs exterior wall and cladding systems and interior scopes to those documents, within the owner's site and security requirements.",
    typicalScopes: [
      "Metal panel and EIFS cladding",
      "Air and vapour barriers",
      "Façade repairs on occupied buildings",
      "Interior partitions and finishes",
    ],
    image: images.sectors.institutional,
    featured: true,
    order: 3,
  },
  {
    slug: "industrial",
    name: "Industrial",
    summary: "Metal cladding, insulation and exterior wall work for industrial buildings.",
    description:
      "Industrial buildings need durable cladding on large wall areas and office or amenity areas finished to commercial standards. MEK installs metal panel cladding, exterior insulation, EIFS at office frontages and interior build-outs, working around the operational constraints of the facility.",
    typicalScopes: [
      "Metal wall panels and trims",
      "EIFS at office and entrance areas",
      "Exterior insulation and flashings",
      "Office and support-area build-outs",
    ],
    image: images.sectors.industrial,
    featured: true,
    order: 4,
  },
  {
    slug: "retail",
    name: "Retail",
    summary: "Storefront façades, plaza renewals and retail fit-outs on fixed opening dates.",
    description:
      "Retail work is driven by opening dates, landlord criteria and brand standards. MEK installs EIFS, stucco and ACM on storefronts and plaza façades and carries interior trade packages for retail units, sequenced so fixture and signage installers can follow.",
    typicalScopes: [
      "Storefront EIFS and ACM surrounds",
      "Plaza façade renewals",
      "Canopies, soffits and fascias",
      "Retail unit interiors",
    ],
    image: images.sectors.retail,
    featured: true,
    order: 5,
  },
  {
    slug: "office",
    name: "Office",
    summary: "Office building envelopes, recladding and interior fit-outs.",
    description:
      "Office buildings combine high-visibility façades with interiors that are fitted out and renewed over time. MEK installs panel cladding, rainscreen assemblies and sealants on office buildings, carries out envelope repairs on occupied properties, and provides interior trade work for tenant spaces.",
    typicalScopes: [
      "Metal and ACM rainscreen cladding",
      "Sealant and joint replacement",
      "Recladding of existing buildings",
      "Interior partitions and finishes",
    ],
    image: images.sectors.officeExterior,
    featured: true,
    order: 6,
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
    featured: false,
    order: 7,
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
    order: 8,
  },
];
