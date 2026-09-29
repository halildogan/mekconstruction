import type { CoordinatedScope, ServiceCategory } from "@/types/content";

/**
 * Service hierarchy. MEK is positioned first as a commercial façade, exterior
 * wall and building-envelope contractor; interior construction remains
 * available as a secondary category.
 *
 * Add a category here and reference its id from services in
 * `src/content/services.ts`.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: "facade-cladding",
    name: "Façade & Cladding Systems",
    shortName: "Façade & Cladding",
    description:
      "Stucco, EIFS, aluminum and ACM panels, architectural metal, fibre cement and siding — the finished face of the building, installed to the approved drawings and the manufacturer's requirements.",
    emphasis: "primary",
    order: 1,
  },
  {
    id: "building-envelope",
    name: "Exterior Wall & Building Envelope",
    shortName: "Building Envelope",
    description:
      "The layers behind the cladding: exterior steel stud framing, sheathing, continuous insulation, air and vapour barriers, rainscreen assemblies, waterproofing, flashings and sealants.",
    emphasis: "primary",
    order: 2,
  },
  {
    id: "facade-repair",
    name: "Façade Repair & Restoration",
    shortName: "Repair & Restoration",
    description:
      "Repairs, recladding and retrofits of existing building envelopes — from stucco, EIFS and cladding repairs to joint replacement and envelope renewal.",
    emphasis: "primary",
    order: 3,
  },
  {
    id: "interior",
    name: "Interior Construction",
    shortName: "Interior",
    description:
      "Drywall, metal stud framing, finishing, insulation, ceilings, paint and interior renovation scopes, priced separately or alongside exterior work.",
    emphasis: "secondary",
    order: 4,
  },
];

/**
 * Scope that commonly sits next to MEK's work on façade projects. Listed as
 * related / coordinated scope only — NOT advertised as self-performed.
 * Move an item into services.ts only after MEK confirms it performs the work.
 */
export const coordinatedScope: CoordinatedScope[] = [
  {
    group: "glazing-openings",
    name: "Curtain wall and window wall",
    description: "Interfaces between cladding, air barrier and the glazing system are coordinated with the glazing contractor.",
  },
  {
    group: "glazing-openings",
    name: "Commercial windows",
    description: "Rough openings, sub-sills, flashings and perimeter sealant coordinated with window installation.",
  },
  {
    group: "glazing-openings",
    name: "Architectural glass and glazing",
    description: "Transitions and trims at glazed areas coordinated with the glazing trade.",
  },
  {
    group: "glazing-openings",
    name: "Skylight-related exterior work",
    description: "Curb, flashing and cladding interfaces coordinated with roofing and skylight installers.",
  },
  {
    group: "glazing-openings",
    name: "Exterior doors, frames and openings",
    description: "Framed openings, trims and membranes prepared for door and frame installation.",
  },
  {
    group: "related-exterior",
    name: "Precast façade components",
    description: "Cladding, insulation and sealant interfaces with precast elements.",
  },
  {
    group: "related-exterior",
    name: "Masonry, brick and stone",
    description: "Transitions between masonry veneers and adjacent cladding or EIFS.",
  },
  {
    group: "related-exterior",
    name: "Concrete and precast repairs",
    description: "Sequencing with repair contractors where substrate repairs precede new finishes.",
  },
  {
    group: "related-exterior",
    name: "Roofing interfaces",
    description: "Parapet, coping and roof-to-wall transitions coordinated with the roofing contractor.",
  },
  {
    group: "related-exterior",
    name: "Exterior architectural details",
    description: "Bands, cornices, reveals and trims detailed as part of the cladding system where specified.",
  },
];

export const COORDINATED_GROUP_LABELS: Record<CoordinatedScope["group"], string> = {
  "glazing-openings": "Glazing & openings",
  "related-exterior": "Related exterior construction",
};
