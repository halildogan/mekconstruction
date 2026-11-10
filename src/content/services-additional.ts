import type { Service } from "@/types/content";
import { images } from "@/content/images";

/**
 * Additional services for commercial and residential projects.
 * Publish only scopes MEK can contract and deliver using qualified personnel.
 * Images reuse existing relevant catalogue assets until dedicated, verified images are available.
 */
const PROFESSIONAL_NOTE =
  "Where design, engineering, permits, inspections or certifications are required, these are coordinated with appropriately licensed professionals and authorities as part of the agreed project scope.";

export const additionalServices: Service[] = [
  {
    slug: "exterior-painting-coatings", category: "facade-repair", name: "Exterior Painting & Coatings",
    tagline: "Exterior coatings and protective finishes for existing and new building surfaces.",
    summary: "Preparation and application of specified exterior paint and protective coating systems for commercial and residential buildings.",
    overview: [
      "MEK undertakes exterior painting and coating scopes for façades, trim, soffits and other suitable substrates on commercial, multi-residential and residential properties across Ontario.",
      "Substrate assessment, cleaning, repairs, primers and finish coats are planned around the specified coating system, site conditions and manufacturer requirements."
    ],
    applications: ["Commercial and residential façades", "Exterior trim, soffits and fascias", "Repainting during façade refurbishment", "Coated metal and masonry surfaces where specified"],
    capabilities: ["Surface cleaning and preparation", "Localized patching and coating repairs", "Primer and finish coat application", "Protection of adjacent glazing and finishes", "Phased work on occupied properties"],
    systems: ["Exterior acrylic and elastomeric coatings", "Substrate-specific primers and sealers", "Protective coatings as specified"],
    sectors: ["commercial", "multi-residential", "retail"], projectTypes: ["commercial", "residential"],
    relatedServices: ["facade-repair-restoration", "stucco-eifs", "soffit-fascia"],
    scopeNote: "Coating selection and preparation depend on substrate condition and the approved specification; specialized remediation or testing is arranged where required.",
    image: images.exterior.restoration, featured: false, order: 14,
    seo: { title: "Exterior Painting & Coatings Contractor — Ontario", description: "Exterior painting and protective coating services for commercial and residential properties in Toronto, the GTA and across Ontario." }
  },
  {
    slug: "masonry-brick-veneer", category: "facade-cladding", name: "Masonry & Brick Veneer",
    tagline: "Brick and masonry veneer installation for new construction and exterior renovations.",
    summary: "Brick veneer, architectural masonry and stone veneer installation with specified supports, ties, flashings and movement joints.",
    overview: [
      "MEK can deliver masonry and brick veneer packages for commercial and residential projects, including new façades, feature walls and selected replacement work.",
      "Installation is coordinated with the structural support, backup wall, moisture management and adjacent cladding systems identified in the approved drawings."
    ],
    applications: ["Commercial building elevations", "Residential exterior veneers", "Entrance and feature walls", "Replacement of deteriorated veneer areas"],
    capabilities: ["Brick and masonry veneer installation", "Coordination of anchors and ties", "Cavity and weep detailing", "Flashing and movement joint coordination", "Integration with adjacent cladding"],
    systems: ["Clay brick veneer", "Architectural concrete masonry", "Specified natural or manufactured stone veneer", "Approved anchors, ties and flashing systems"],
    sectors: ["commercial", "multi-residential", "institutional"], projectTypes: ["commercial", "residential"],
    relatedServices: ["rainscreen-systems", "air-weather-barriers", "exterior-sealants"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.exterior.fiberCement, featured: false, order: 15,
    seo: { title: "Brick Veneer & Masonry Contractor — Ontario", description: "Brick veneer and architectural masonry installation for commercial and residential construction in Toronto, the GTA and Ontario." }
  },
  {
    slug: "concrete-repair-restoration", category: "facade-repair", name: "Concrete Repair & Restoration",
    tagline: "Targeted concrete surface repair and restoration for existing buildings.",
    summary: "Repair of deteriorated concrete surfaces and architectural concrete elements to approved repair details and specifications.",
    overview: [
      "MEK coordinates concrete repair and restoration scopes associated with exterior walls, entrances, parapets and other accessible building elements.",
      "The repair method, substrate preparation and compatible materials are selected from the project engineer's assessment and approved repair specification where structural or durability issues are involved."
    ],
    applications: ["Concrete façade and architectural elements", "Parapets and exterior wall edges", "Localized spalls and surface deterioration", "Concrete substrates ahead of new cladding"],
    capabilities: ["Selective removal of unsound material", "Substrate preparation", "Specified patching and resurfacing", "Protective coating coordination", "Sequencing with façade work"],
    systems: ["Specified cementitious repair mortars", "Bonding and corrosion-protection products", "Concrete surface coatings as specified"],
    sectors: ["commercial", "multi-residential", "institutional", "industrial"], projectTypes: ["commercial", "residential"],
    relatedServices: ["facade-repair-restoration", "waterproofing-flashing", "exterior-painting-coatings"],
    scopeNote: "Structural repairs and repair designs require assessment and direction by an appropriately licensed engineer. MEK can coordinate that professional scope under the project agreement.",
    image: images.exterior.restoration, featured: false, order: 16,
    seo: { title: "Concrete Repair & Restoration — Toronto & Ontario", description: "Concrete surface repair and restoration for commercial, multi-residential and residential buildings across Toronto, the GTA and Ontario." }
  },
  {
    slug: "balcony-repair-restoration", category: "facade-repair", name: "Balcony Repair & Restoration",
    tagline: "Balcony surface, edge, coating and exterior interface restoration.",
    summary: "Balcony repair packages including concrete surface repairs, coatings, flashings and related exterior detailing to approved specifications.",
    overview: [
      "Balcony restoration requires coordination between concrete repairs, waterproofing, coatings, drainage and adjacent façade elements. MEK can manage these related scopes for multi-residential and residential properties.",
      "Work is planned around access, occupant protection and the engineer's repair details where structural components or guard connections are affected."
    ],
    applications: ["Multi-residential balcony refurbishment", "Balcony slab edge and soffit repairs", "Balcony surface coating renewal", "Waterproofing and façade interface repairs"],
    capabilities: ["Repair sequencing and access coordination", "Concrete patch and surface preparation", "Specified balcony coating systems", "Flashing and sealant interfaces", "Coordination of guard and railing trades"],
    systems: ["Specified concrete repair mortars", "Balcony waterproofing and traffic coatings", "Sealants and flashing materials"],
    sectors: ["multi-residential", "commercial"], projectTypes: ["commercial", "residential"],
    relatedServices: ["concrete-repair-restoration", "waterproofing-flashing", "exterior-sealants"],
    scopeNote: "Structural slab, guard and anchorage assessment, design and approvals are provided or reviewed by qualified professionals where required.",
    image: images.exterior.waterproofing, featured: false, order: 17,
    seo: { title: "Balcony Repair & Restoration — Ontario", description: "Balcony repair, surface restoration, coatings and waterproofing coordination for multi-residential properties in Toronto and Ontario." }
  },
  {
    slug: "window-door-installation", category: "facade-cladding", name: "Window & Door Installation",
    tagline: "Exterior windows and doors installed with properly detailed openings and transitions.",
    summary: "Installation and replacement of specified exterior windows and doors, including perimeter flashing, air sealing and cladding transitions.",
    overview: [
      "MEK can deliver exterior window and door installation or replacement as part of building-envelope renovations and new construction packages.",
      "Rough opening conditions, sill support, flashings, air and weather barriers, perimeter sealants and adjacent cladding are coordinated to the approved system details."
    ],
    applications: ["Commercial exterior windows and doors", "Residential window and entry door replacements", "Façade retrofit openings", "Storefront-adjacent exterior openings"],
    capabilities: ["Opening preparation and dimensional coordination", "Frame setting and anchorage to approved details", "Sill and perimeter flashing", "Air and water sealing", "Interior and exterior trim transitions"],
    systems: ["Specified exterior window units", "Specified exterior door and frame assemblies", "Flashing membranes and sealants", "Anchors and trims per approved details"],
    sectors: ["commercial", "retail", "multi-residential"], projectTypes: ["commercial", "residential"],
    relatedServices: ["air-weather-barriers", "waterproofing-flashing", "exterior-sealants", "aluminum-cladding"],
    scopeNote: "Specialized curtain wall, structural glazing and fire-rated openings require project-specific qualified installers, approvals and inspections as applicable.",
    image: images.exterior.aluminum, featured: false, order: 18,
    seo: { title: "Exterior Window & Door Installation — Ontario", description: "Commercial and residential exterior window and door installation and replacement with coordinated flashing and sealing across Ontario." }
  },
  {
    slug: "roofing-roof-repairs", category: "building-envelope", name: "Roofing & Roof Repairs",
    tagline: "Roof replacement and repair packages coordinated with the building envelope.",
    summary: "Roofing repair and replacement scopes, including roof-to-wall interfaces, flashings and specified roof systems.",
    overview: [
      "MEK can coordinate roofing and roof repair packages for commercial and residential properties, with particular attention to parapets, copings, penetrations and roof-to-wall transitions.",
      "Roof system selection, substrate conditions, drainage, insulation and warranty requirements follow the approved design and manufacturer's installation requirements."
    ],
    applications: ["Commercial low-slope roof renewal", "Residential roof repairs and replacement", "Parapet and roof edge refurbishment", "Roof-to-wall and penetration repairs"],
    capabilities: ["Roof condition and scope coordination", "Removal and replacement sequencing", "Specified roof membrane or covering installation", "Flashing and penetration detailing", "Coordination of drainage and insulation"],
    systems: ["Specified low-slope roofing membranes", "Specified residential roofing products", "Roof insulation and cover boards", "Metal flashings and edge systems"],
    sectors: ["commercial", "multi-residential", "industrial"], projectTypes: ["commercial", "residential"],
    relatedServices: ["waterproofing-flashing", "soffit-fascia", "air-weather-barriers"],
    scopeNote: "Roof design, code compliance, specialized system certification and manufacturer warranties are handled through appropriately qualified parties where required.",
    image: images.exterior.waterproofing, featured: false, order: 19,
    seo: { title: "Commercial & Residential Roofing — Ontario", description: "Roof repairs, replacement and roof-to-wall waterproofing coordination for commercial and residential buildings across Ontario." }
  },
  {
    slug: "kitchen-renovations", category: "residential-renovations", name: "Kitchen Renovations",
    tagline: "Kitchen remodelling with coordinated finishes, fixtures and trades.",
    summary: "Residential kitchen renovations including demolition, layout changes, cabinetry coordination, surfaces, flooring and finishing.",
    overview: [
      "MEK delivers kitchen renovation scopes from selective removal and substrate preparation through cabinetry, finishes and final detailing.",
      "Layouts, electrical and plumbing changes, ventilation and inspections are coordinated with the appropriate design professionals and licensed trades as required."
    ],
    applications: ["Condominium kitchen renovations", "Single-family home kitchen upgrades", "Kitchen layout and finish refreshes", "Kitchen renovations during whole-home projects"],
    capabilities: ["Selective demolition and protection", "Framing and drywall adjustments", "Cabinetry and countertop coordination", "Backsplash, flooring and painting", "Trade sequencing and deficiency closeout"],
    systems: ["Specified cabinetry and millwork", "Countertop and backsplash finishes", "Flooring and wall finishes", "Fixtures and appliances as specified"],
    sectors: ["multi-residential", "interior-renovations"], projectTypes: ["residential"],
    relatedServices: ["interior-renovations", "flooring", "painting", "full-home-renovations"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.services.renovations, featured: false, order: 111,
    seo: { title: "Kitchen Renovation Contractor — Toronto & Ontario", description: "Residential kitchen renovation and remodelling services in Toronto, the GTA and Ontario, including cabinetry, finishes and trade coordination." }
  },
  {
    slug: "bathroom-renovations", category: "residential-renovations", name: "Bathroom Renovations",
    tagline: "Bathroom renovations with coordinated waterproofing, tile and fixture installation.",
    summary: "Residential bathroom remodelling including selective demolition, substrate preparation, waterproofing, tile, fixtures and finishes.",
    overview: [
      "MEK manages bathroom renovations with a focus on waterproofing continuity, substrate preparation and coordinated fixture installation.",
      "The work is sequenced around plumbing, electrical, ventilation, tiling and finishes, with licensed trades and inspections included where the agreed scope requires them."
    ],
    applications: ["Residential main bathrooms", "Ensuite renovations", "Condominium bathroom upgrades", "Powder room improvements"],
    capabilities: ["Demolition and protection", "Wall and floor substrate preparation", "Shower and wet-area waterproofing", "Tile and finish installation", "Fixture and trade coordination"],
    systems: ["Specified wet-area waterproofing membranes", "Ceramic and porcelain tile systems", "Moisture-resistant boards", "Bathroom fixtures and finishes"],
    sectors: ["multi-residential", "interior-renovations"], projectTypes: ["residential"],
    relatedServices: ["interior-renovations", "flooring", "painting", "full-home-renovations"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.services.renovations, featured: false, order: 112,
    seo: { title: "Bathroom Renovation Contractor — Toronto & Ontario", description: "Residential bathroom renovation services across Toronto, the GTA and Ontario, including waterproofing, tiling, fixtures and finishing." }
  },
  {
    slug: "basement-finishing", category: "residential-renovations", name: "Basement Finishing",
    tagline: "Basement finishing and renovation for comfortable, functional living space.",
    summary: "Basement renovations including framing, insulation, drywall, ceilings, flooring and coordinated mechanical and electrical work.",
    overview: [
      "MEK can finish and renovate residential basements, from interior framing and insulation through drywall, flooring, painting and trim.",
      "Moisture conditions, ceiling heights, egress, fire separation and any proposed change of use are reviewed against the applicable project requirements before work proceeds."
    ],
    applications: ["Family and recreation rooms", "Home offices and hobby spaces", "Existing basement refurbishment", "Basement layout reconfiguration"],
    capabilities: ["Interior framing and insulation", "Drywall and finishing", "Ceilings and flooring", "Interior doors, trim and painting", "Licensed-trade coordination"],
    systems: ["Specified moisture-management materials", "Metal or wood framing as designed", "Gypsum board and insulation", "Residential flooring and ceiling finishes"],
    sectors: ["interior-renovations"], projectTypes: ["residential"],
    relatedServices: ["drywall-installation", "metal-stud-framing", "flooring", "full-home-renovations"],
    scopeNote: "Legal secondary suites, structural alterations and changes of use require separate design, permits and inspections where applicable; these are not implied by standard basement finishing.",
    image: images.services.renovations, featured: false, order: 113,
    seo: { title: "Basement Finishing & Renovation — Ontario", description: "Residential basement finishing and renovation in Toronto, the GTA and Ontario, including framing, insulation, drywall and flooring." }
  },
  {
    slug: "full-home-renovations", category: "residential-renovations", name: "Full Home Renovations",
    tagline: "Whole-home renovation packages with integrated construction coordination.",
    summary: "Comprehensive residential renovation services covering demolition, interior construction, finishes and coordinated specialist trades.",
    overview: [
      "MEK can manage whole-home renovation projects that combine multiple rooms, finishes and construction trades under one coordinated scope.",
      "The project plan addresses phasing, access, protection, procurement and inspections, while design and engineering requirements are handled by qualified professionals as applicable."
    ],
    applications: ["Whole-home interior renovations", "Multi-room residential upgrades", "Condominium unit renovations", "Occupied-home phased renovations"],
    capabilities: ["Project planning and trade coordination", "Selective demolition and rebuilding", "Framing, drywall and finishing", "Flooring, painting and trim", "Deficiency management and handover"],
    systems: ["Specified interior wall and ceiling systems", "Residential flooring and finishes", "Cabinetry and millwork packages", "Fixtures and materials per project scope"],
    sectors: ["multi-residential", "interior-renovations"], projectTypes: ["residential"],
    relatedServices: ["kitchen-renovations", "bathroom-renovations", "basement-finishing", "design-build-services"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.services.renovations, featured: false, order: 114,
    seo: { title: "Full Home Renovation Contractor — Ontario", description: "Whole-home renovation and remodelling services in Toronto, the GTA and Ontario, with coordinated trades, finishes and project management." }
  },
  {
    slug: "home-additions-extensions", category: "residential-renovations", name: "Home Additions & Extensions",
    tagline: "Residential additions and extensions delivered to approved plans and permits.",
    summary: "Home addition and extension construction with coordinated foundations, structure, building envelope and interior completion.",
    overview: [
      "MEK can manage residential additions and extensions, coordinating the new construction with the existing building's structure, weather protection and interior finishes.",
      "Design, engineering, zoning review, permit approvals and inspections are integrated into the agreed delivery approach through qualified professionals and authorities."
    ],
    applications: ["Rear and side home extensions", "Additional living space", "Room additions", "Extensions integrated with existing renovations"],
    capabilities: ["Design and permit coordination", "Construction planning and sequencing", "Foundation and structural trade coordination", "Exterior envelope installation", "Interior fit-out and finishes"],
    systems: ["Engineered structural systems as designed", "Exterior wall and roof assemblies", "Windows, doors and insulation", "Interior partitions and finishes"],
    sectors: ["interior-renovations"], projectTypes: ["residential"],
    relatedServices: ["design-build-services", "construction-project-management", "full-home-renovations", "roofing-roof-repairs"],
    scopeNote: "Structural design and approvals must be completed by qualified professionals. New custom home construction is not included in this service.",
    image: images.services.renovations, featured: false, order: 115,
    seo: { title: "Home Additions & Extensions Contractor — Ontario", description: "Residential home additions and extensions in Toronto, the GTA and Ontario, with design, permits, construction and trade coordination." }
  },
  {
    slug: "decks-patios-exterior-structures", category: "residential-renovations", name: "Decks, Patios & Exterior Structures",
    tagline: "Residential outdoor structures and exterior living-space improvements.",
    summary: "Construction and renovation of residential decks, patios and related exterior structures to approved project requirements.",
    overview: [
      "MEK can build and renovate decks, patios and selected exterior living-space structures as part of residential improvement projects.",
      "Foundations, structural connections, guards, drainage and required permits are addressed according to the project design and applicable requirements."
    ],
    applications: ["Residential decks and platforms", "Patio improvements", "Exterior stairs and landings", "Outdoor living-space renovations"],
    capabilities: ["Site preparation and layout", "Structural framing to approved design", "Decking and finish installation", "Guard and stair coordination", "Drainage and adjacent envelope detailing"],
    systems: ["Specified wood or composite decking", "Approved framing and connector systems", "Pavers and patio finishes as specified", "Guards, trims and exterior hardware"],
    sectors: ["multi-residential"], projectTypes: ["residential"],
    relatedServices: ["home-additions-extensions", "exterior-painting-coatings", "construction-project-management"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.exterior.soffit, featured: false, order: 116,
    seo: { title: "Decks, Patios & Exterior Structures — Ontario", description: "Residential deck, patio and exterior structure construction and renovation in Toronto, the GTA and across Ontario." }
  },
  {
    slug: "design-build-services", category: "construction-management", name: "Design-Build Services",
    tagline: "Integrated design and construction delivery under a coordinated project scope.",
    summary: "Design-build delivery coordinating design professionals, approvals, procurement and construction for commercial and residential projects.",
    overview: [
      "MEK can structure selected commercial and residential projects as design-build engagements, coordinating design development, budgeting, procurement and construction delivery.",
      "Where regulated professional services are required, licensed architects, engineers and other qualified specialists perform or approve the relevant work under the agreed contractual arrangement."
    ],
    applications: ["Commercial renovation packages", "Residential renovation and addition projects", "Building envelope upgrades", "Multi-trade construction scopes"],
    capabilities: ["Scope definition and feasibility coordination", "Design consultant coordination", "Budget and procurement planning", "Permit and approval coordination", "Construction scheduling and delivery"],
    systems: ["Project-specific design documents", "Approved construction specifications", "Trade procurement and scheduling processes"],
    sectors: ["commercial", "office", "retail", "multi-residential", "interior-renovations"], projectTypes: ["commercial", "residential"],
    relatedServices: ["construction-project-management", "interior-renovations", "building-envelope-retrofits", "full-home-renovations"],
    scopeNote: PROFESSIONAL_NOTE,
    image: images.services.renovations, featured: false, order: 201,
    seo: { title: "Design-Build Construction Services — Ontario", description: "Design-build services for commercial and residential renovation and construction projects in Toronto, the GTA and Ontario." }
  },
  {
    slug: "construction-project-management", category: "construction-management", name: "Construction & Project Management",
    tagline: "Construction planning, procurement, scheduling and trade coordination.",
    summary: "Construction and project management for commercial and residential scopes, from planning and trade procurement through site coordination and closeout.",
    overview: [
      "MEK can manage construction delivery for commercial and residential projects, coordinating budgets, schedules, subcontractors, materials and site activities.",
      "Project controls, reporting, safety responsibilities, inspections and turnover requirements are established according to the contract and applicable regulations."
    ],
    applications: ["Commercial renovation and tenant improvements", "Residential renovations and additions", "Façade and building-envelope upgrades", "Multi-trade construction packages"],
    capabilities: ["Scope and budget coordination", "Scheduling and milestone tracking", "Subcontractor procurement and coordination", "Site logistics and reporting", "Quality, deficiencies and handover coordination"],
    systems: ["Construction schedules and scope registers", "Procurement and change-management records", "Project reporting and closeout documentation"],
    sectors: ["commercial", "office", "retail", "industrial", "multi-residential", "interior-renovations"], projectTypes: ["commercial", "residential"],
    relatedServices: ["design-build-services", "interior-renovations", "building-envelope-retrofits", "full-home-renovations"],
    scopeNote: "Professional design, engineering and regulated inspection services are performed by appropriately licensed parties when required by the project.",
    image: images.services.renovations, featured: false, order: 202,
    seo: { title: "Construction & Project Management — Ontario", description: "Commercial and residential construction project management across Ontario, including planning, scheduling, procurement and trade coordination." }
  }
];
