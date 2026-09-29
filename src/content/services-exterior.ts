import type { Service } from "@/types/content";
import { images } from "@/content/images";

/**
 * Exterior façade and building-envelope services — MEK's primary positioning.
 *
 * Wording rule: MEK installs systems to the approved drawings, specifications
 * and manufacturer requirements. Never describe MEK as designing, engineering
 * or certifying an assembly.
 */

const INSTALL_NOTE =
  "MEK installs this work to the approved drawings, specifications and manufacturer requirements for the project. Design, engineering and building-envelope consulting are provided by the project's architect, engineers and envelope consultant.";

export const exteriorServices: Service[] = [
  /* ----------------------------- Façade & cladding ----------------------------- */
  {
    slug: "stucco-eifs",
    category: "facade-cladding",
    name: "Stucco & EIFS",
    tagline: "Exterior insulation and finish systems, cement stucco and acrylic finishes for commercial façades.",
    summary:
      "EIFS, traditional cement stucco and acrylic / synthetic stucco finishes, installed as complete systems from substrate preparation through base coat, mesh and finish.",
    overview: [
      "Stucco and EIFS are MEK's core façade trades. We install exterior insulation and finish systems (EIFS), traditional cement stucco and acrylic finish coats on commercial, institutional, industrial and multi-residential buildings across Toronto and the GTA.",
      "EIFS is installed as a tested system: water-resistive barrier, adhesive or mechanical attachment, insulation board, reinforced base coat and finish, with drainage, starter tracks, expansion joints and terminations as the manufacturer and the project specifications require — typically referencing the CAN/ULC-S716 series for EIFS in Canada. Transitions to windows, flashings, sealants and adjacent cladding are coordinated with the trades involved.",
    ],
    applications: [
      "New commercial and institutional façades",
      "Multi-residential mid-rise and low-rise exteriors",
      "Retail storefront and plaza elevations",
      "Industrial office and entrance areas",
      "Architectural bands, reveals and trims",
      "Recladding and over-cladding of existing walls",
    ],
    capabilities: [
      "Drainage EIFS with water-resistive barrier",
      "Adhesively and mechanically attached insulation board",
      "Reinforced base coat with standard and high-impact mesh",
      "Acrylic, silicone-enhanced and textured finish coats",
      "Cement stucco on lath with control joints",
      "Expansion joints, starter tracks, terminations and back-wrapping",
    ],
    systems: [
      "Manufacturer-approved EIFS systems as specified",
      "EPS and other specified insulation boards",
      "Polymer-modified base coats and fibreglass reinforcing mesh",
      "Acrylic / synthetic stucco finishes",
      "Portland cement stucco on metal lath",
    ],
    sectors: ["commercial", "multi-residential", "institutional", "industrial", "retail"],
    relatedServices: ["exterior-insulation", "air-weather-barriers", "exterior-sealants", "facade-repair-restoration"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.stucco,
    featured: true,
    order: 1,
    seo: {
      title: "Commercial Stucco & EIFS Contractor — Toronto & GTA",
      description:
        "Commercial stucco and EIFS contractor serving Toronto and the GTA: exterior insulation and finish systems, cement stucco and acrylic finishes for commercial façades.",
    },
  },
  {
    slug: "aluminum-cladding",
    category: "facade-cladding",
    name: "Aluminum & ACM Cladding",
    tagline: "Aluminum and aluminum composite material (ACM / ACP) panel systems for commercial façades.",
    summary:
      "Aluminum plate and aluminum composite material (ACM / ACP) panel cladding, installed on sub-framing to the approved shop drawings and panel layout.",
    overview: [
      "Aluminum and ACM panel systems give commercial buildings a precise, flat finish, but they only perform when sub-framing, joints and openings are set out accurately. MEK installs aluminum plate and aluminum composite material (ACM / ACP) cladding on commercial, institutional and multi-residential buildings in Toronto and the GTA.",
      "Panels are installed to the approved shop drawings, panel layout and manufacturer requirements, over the specified sub-framing, insulation and air/water-resistive barrier. Where fire performance requirements apply, only the panel products and assemblies approved for the project are used.",
    ],
    applications: [
      "Commercial and office façades",
      "Entrance canopies, fascias and signage bands",
      "Column and beam enclosures",
      "Multi-residential balconies and feature walls",
      "Retail storefront surrounds",
      "Recladding of existing buildings",
    ],
    capabilities: [
      "Sub-girt and clip framing installation",
      "Routed-and-returned and cassette panel systems",
      "Open- and closed-joint (rainscreen) configurations",
      "Panel layout coordination with shop drawings",
      "Trims, copings, closures and flashings",
      "Interfaces with windows, curtain wall and adjacent cladding",
    ],
    systems: [
      "Aluminum composite material (ACM / ACP) panels as specified",
      "Solid aluminum plate panels",
      "Aluminum sub-framing, girts and clips",
      "Specified insulation and air/water-resistive barriers",
    ],
    sectors: ["commercial", "office", "institutional", "multi-residential", "retail"],
    relatedServices: ["metal-panel-cladding", "rainscreen-systems", "exterior-framing-sheathing", "exterior-sealants"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.aluminum,
    featured: true,
    order: 2,
    seo: {
      title: "Aluminum & ACM Cladding Contractor — Toronto",
      description:
        "Aluminum and ACM / ACP panel cladding contractor in Toronto and the GTA, installing commercial façade panels to approved shop drawings and specifications.",
    },
  },
  {
    slug: "metal-panel-cladding",
    category: "facade-cladding",
    name: "Architectural Metal Panels",
    tagline: "Architectural metal cladding and exterior wall panels for commercial and institutional buildings.",
    summary:
      "Architectural metal wall panels, profiled metal cladding and exterior wall panel systems installed with their sub-framing, trims and flashings.",
    overview: [
      "Architectural metal cladding covers a wide range of systems — flat and profiled wall panels, insulated metal panels, perforated screens and exterior wall panel systems. MEK installs metal panel cladding on commercial, institutional and industrial buildings across Toronto, the GTA and Ontario.",
      "Each system is installed to its manufacturer's requirements and the approved shop drawings, with attention to alignment, joint consistency, fastener patterns and the flashings and trims that keep water out at openings, bases and parapets.",
    ],
    applications: [
      "Commercial and institutional elevations",
      "Industrial buildings and warehouses",
      "Mechanical screens and penthouses",
      "Feature walls and entrances",
      "Parapets, copings and fascias",
    ],
    capabilities: [
      "Flat and profiled metal wall panels",
      "Insulated metal panels where specified",
      "Exterior wall panel systems",
      "Sub-framing, girts and clip systems",
      "Trims, closures, copings and flashings",
    ],
    systems: [
      "Architectural metal wall panel systems as specified",
      "Profiled steel and aluminum cladding",
      "Insulated metal panels",
      "Perforated and screen panels",
    ],
    sectors: ["commercial", "industrial", "institutional", "office"],
    relatedServices: ["aluminum-cladding", "rainscreen-systems", "exterior-insulation", "exterior-framing-sheathing"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.metal,
    featured: true,
    order: 3,
    seo: {
      title: "Metal Cladding Contractor — Toronto & Ontario",
      description:
        "Architectural metal panel and metal cladding contractor for commercial, institutional and industrial buildings in Toronto, the GTA and Ontario.",
    },
  },
  {
    slug: "fibre-cement-siding",
    category: "facade-cladding",
    name: "Fibre Cement & Exterior Siding",
    tagline: "Fibre cement panels, lap siding and exterior siding systems.",
    summary:
      "Fibre cement panels and lap siding and other exterior siding systems, installed on furring or rainscreen framing with the trims and flashings they require.",
    overview: [
      "Fibre cement cladding is common on multi-residential, institutional and mixed-use buildings because it is durable and non-combustible. MEK installs fibre cement panels, fibre cement lap siding and other exterior siding systems specified for commercial and multi-residential projects.",
      "Installation follows the manufacturer's fastening, joint and clearance requirements, typically over a ventilated furring or rainscreen system with the specified weather-resistive barrier behind it.",
    ],
    applications: [
      "Multi-residential mid-rise and townhouse blocks",
      "Mixed-use and institutional buildings",
      "Accent and feature panels",
      "Soffits and returns where specified",
    ],
    capabilities: [
      "Fibre cement panel installation, exposed or concealed fastening",
      "Fibre cement and composite lap siding",
      "Furring and rainscreen strapping",
      "Trims, corners, reveals and flashings",
    ],
    systems: ["Fibre cement panels", "Fibre cement lap siding", "Other specified exterior siding products"],
    sectors: ["multi-residential", "institutional", "commercial"],
    relatedServices: ["rainscreen-systems", "air-weather-barriers", "soffit-fascia", "exterior-sealants"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.fiberCement,
    featured: false,
    order: 4,
    seo: {
      title: "Fibre Cement Cladding & Siding — Toronto & GTA",
      description:
        "Fibre cement panel and siding installation for multi-residential, institutional and commercial buildings in Toronto and the GTA.",
    },
  },
  {
    slug: "soffit-fascia",
    category: "facade-cladding",
    name: "Soffit & Fascia Systems",
    tagline: "Exterior soffits, fascias, canopies and bulkhead cladding.",
    summary:
      "Exterior soffits, fascias, canopy undersides and bulkheads finished in metal, ACM, fibre cement or EIFS to suit the façade.",
    overview: [
      "Soffits and fascias are highly visible and exposed to weather from below and behind. MEK frames and finishes exterior soffits, fascias, canopy undersides and exterior bulkheads in the material specified for the façade — metal panels, ACM, fibre cement or EIFS.",
      "Framing, insulation, venting and access requirements shown on the drawings are coordinated before finishes go on, including lighting and other services that pass through the soffit.",
    ],
    applications: ["Entrance canopies", "Overhangs and projecting floors", "Parapet fascias", "Exterior bulkheads and returns"],
    capabilities: [
      "Exterior soffit framing and sheathing",
      "Metal, ACM, fibre cement and EIFS soffit finishes",
      "Fascia bands and trims",
      "Vent and access panel coordination",
    ],
    systems: ["Metal and ACM soffit panels", "Fibre cement soffit boards", "EIFS soffit systems", "Exterior gypsum sheathing"],
    sectors: ["commercial", "retail", "multi-residential", "institutional"],
    relatedServices: ["aluminum-cladding", "stucco-eifs", "exterior-framing-sheathing"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.soffit,
    featured: false,
    order: 5,
    seo: {
      title: "Commercial Soffit & Fascia Systems — Toronto",
      description:
        "Exterior soffit, fascia and canopy cladding for commercial and multi-residential buildings in Toronto and the GTA: metal, ACM, fibre cement and EIFS.",
    },
  },

  /* ------------------------- Exterior wall & building envelope ------------------------- */
  {
    slug: "exterior-framing-sheathing",
    category: "building-envelope",
    name: "Exterior Framing & Sheathing",
    tagline: "Exterior steel stud walls and sheathing — the backbone of the exterior wall.",
    summary:
      "Exterior load-bearing and non-load-bearing steel stud framing and exterior sheathing, built to the engineered design and ready for air barrier and cladding.",
    overview: [
      "Everything on a framed exterior wall depends on the framing and sheathing being straight, plumb and correctly fastened. MEK installs exterior steel stud framing and exterior sheathing on commercial, institutional and multi-residential projects across the GTA.",
      "Exterior framing is typically an engineered element. MEK builds it to the approved drawings and the stamped framing shop drawings supplied for the project, including deflection connections, bracing and openings, then installs the specified exterior sheathing to receive the air barrier, insulation and cladding.",
    ],
    applications: [
      "Infill steel stud walls between floor slabs",
      "Parapets and mechanical screens",
      "Exterior walls behind EIFS, panels and siding",
      "Window and door rough openings",
      "Soffits and canopy framing",
    ],
    capabilities: [
      "Exterior steel stud framing to engineered shop drawings",
      "Deflection and slab-edge connections",
      "Rough openings, headers and sills",
      "Exterior gypsum and cementitious sheathing",
      "Sheathing joint treatment for air-barrier readiness",
    ],
    systems: [
      "Light-gauge steel studs and tracks (gauges as engineered)",
      "Exterior glass-mat gypsum sheathing",
      "Cement board and other specified sheathing",
    ],
    sectors: ["commercial", "multi-residential", "institutional", "industrial"],
    relatedServices: ["air-weather-barriers", "exterior-insulation", "stucco-eifs", "aluminum-cladding"],
    scopeNote:
      "Exterior steel stud framing is installed to the approved drawings and the engineered framing shop drawings provided for the project. MEK does not provide structural engineering.",
    image: images.exterior.framing,
    featured: true,
    order: 6,
    seo: {
      title: "Exterior Steel Stud Framing & Sheathing — Toronto",
      description:
        "Exterior steel stud framing and sheathing for commercial and multi-residential buildings in Toronto and the GTA, built to engineered shop drawings.",
    },
  },
  {
    slug: "exterior-insulation",
    category: "building-envelope",
    name: "Exterior & Continuous Insulation",
    tagline: "Continuous exterior insulation with rigid and semi-rigid boards.",
    summary:
      "Continuous exterior insulation using rigid and semi-rigid boards, fastened to suit the cladding system and detailed at openings, slab edges and transitions.",
    overview: [
      "Continuous exterior insulation is now standard on commercial and multi-residential walls, and its performance depends on how well joints, fasteners and transitions are handled. MEK installs exterior insulation on commercial, institutional and multi-residential buildings throughout Toronto and the GTA.",
      "Board type, thickness and attachment follow the specifications and the requirements of the cladding system — adhesively fixed behind EIFS, or mechanically fastened with clips and girts behind panels and siding.",
    ],
    applications: [
      "Behind EIFS and stucco",
      "Behind metal, ACM and fibre cement cladding",
      "Slab edges, parapets and returns",
      "Retrofit over-cladding of existing walls",
    ],
    capabilities: [
      "Rigid board insulation (e.g. EPS, XPS, polyiso) as specified",
      "Semi-rigid mineral wool boards",
      "Adhesive and mechanical attachment",
      "Staggered joints and tight transitions at openings",
      "Coordination with clip and girt systems",
    ],
    systems: ["EPS and XPS boards", "Polyisocyanurate boards", "Semi-rigid mineral wool", "Insulation fasteners and clip systems"],
    sectors: ["commercial", "multi-residential", "institutional", "industrial"],
    relatedServices: ["stucco-eifs", "air-weather-barriers", "rainscreen-systems", "exterior-framing-sheathing"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.insulation,
    featured: true,
    order: 7,
    seo: {
      title: "Exterior Insulation Contractor — Toronto & GTA",
      description:
        "Exterior and continuous insulation contractor in Toronto and the GTA: rigid and semi-rigid boards installed behind EIFS, metal panels and siding.",
    },
  },
  {
    slug: "air-weather-barriers",
    category: "building-envelope",
    name: "Air, Vapour & Weather Barriers",
    tagline: "Air barrier, AVB and weather-resistive barrier systems for exterior walls.",
    summary:
      "Fluid-applied and sheet air barriers, air/vapour barrier (AVB) membranes and weather-resistive barriers, with continuity at openings, slab edges and transitions.",
    overview: [
      "An air barrier only works if it is continuous. MEK installs air barrier, air/vapour barrier (AVB) and weather-resistive barrier systems on exterior walls, with the detailing at rough openings, slab edges, penetrations and material transitions where most failures start.",
      "Products and sequencing follow the specifications and manufacturer requirements, and the barrier is coordinated with windows, flashings, insulation and cladding so it stays continuous from foundation to roof.",
    ],
    applications: [
      "Sheathed steel stud walls",
      "Concrete and masonry backup walls",
      "Rough openings and penetrations",
      "Slab edges, parapets and roof-to-wall transitions",
    ],
    capabilities: [
      "Fluid-applied air and water-resistive barriers",
      "Self-adhered sheet membranes",
      "Mechanically attached weather-resistive barriers",
      "Transition membranes at openings and interfaces",
      "Penetration and termination detailing",
    ],
    systems: ["Fluid-applied membranes", "Self-adhered air/vapour barrier membranes", "Vapour-permeable air barriers", "Building wraps and WRBs"],
    sectors: ["commercial", "multi-residential", "institutional", "industrial"],
    relatedServices: ["exterior-framing-sheathing", "waterproofing-flashing", "exterior-insulation", "exterior-sealants"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.airBarrier,
    featured: true,
    order: 8,
    seo: {
      title: "Air & Vapour Barrier Installation — Toronto",
      description:
        "Air barrier, AVB and weather-resistive barrier installation for commercial and multi-residential exterior walls in Toronto and the GTA.",
    },
  },
  {
    slug: "rainscreen-systems",
    category: "building-envelope",
    name: "Rainscreen Assemblies",
    tagline: "Drained and ventilated rainscreen wall assemblies behind panel and siding cladding.",
    summary:
      "Rainscreen wall assemblies — sub-framing, cavity, insulation, barrier and cladding — installed so the drainage and ventilation path works as designed.",
    overview: [
      "A rainscreen wall manages water by design: cladding sheds most of it, and a drained, ventilated cavity handles the rest. MEK installs rainscreen assemblies behind metal, ACM, fibre cement and other panel cladding on commercial and multi-residential buildings.",
      "The cavity depth, sub-framing, insulation, barrier and venting at the base and top of the wall follow the approved drawings and system requirements, with flashings and insect screens installed so the cavity drains and vents as intended.",
    ],
    applications: ["Metal and ACM panel façades", "Fibre cement and siding façades", "Recladding of existing buildings"],
    capabilities: [
      "Clip-and-rail and girt sub-framing",
      "Cavity insulation and barrier installation",
      "Base, head and opening flashings",
      "Vent and insect screens",
      "Open- and closed-joint panel assemblies",
    ],
    systems: ["Thermally broken clip systems", "Aluminum and steel rails and girts", "Rainscreen insulation and barriers"],
    sectors: ["commercial", "multi-residential", "institutional", "office"],
    relatedServices: ["aluminum-cladding", "metal-panel-cladding", "exterior-insulation", "air-weather-barriers"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.rainscreen,
    featured: true,
    order: 9,
    seo: {
      title: "Rainscreen Wall Assemblies — Toronto & GTA",
      description:
        "Rainscreen wall assembly installation in Toronto and the GTA: sub-framing, insulation, barriers, flashings and panel cladding installed to specification.",
    },
  },
  {
    slug: "waterproofing-flashing",
    category: "building-envelope",
    name: "Waterproofing & Flashings",
    tagline: "Above-grade wall waterproofing, flashings and transition membranes.",
    summary:
      "Above-grade wall waterproofing, through-wall and sheet-metal flashings, and transition membranes at openings, parapets and material changes.",
    overview: [
      "Most envelope leaks happen at interfaces — window heads and sills, parapets, balconies and changes in cladding. MEK installs above-grade wall waterproofing, flashings and transition membranes at these locations as part of the exterior wall package.",
      "Membranes, sheet-metal flashings and end dams are installed to the approved details and manufacturer requirements, lapped shingle-fashion so water is directed out of the wall.",
    ],
    applications: ["Window and door openings", "Parapets and copings", "Balcony and slab-edge interfaces", "Base-of-wall and grade transitions"],
    capabilities: [
      "Sill, head and jamb flashings",
      "Transition membranes between wall and roof or glazing systems",
      "Sheet-metal flashings, copings and drip edges",
      "End dams and back dams",
    ],
    systems: ["Self-adhered and fluid-applied membranes", "Pre-finished sheet-metal flashings", "Transition and bridging membranes"],
    sectors: ["commercial", "multi-residential", "institutional", "industrial"],
    relatedServices: ["air-weather-barriers", "exterior-sealants", "facade-repair-restoration"],
    scopeNote:
      "MEK's waterproofing scope covers above-grade exterior wall waterproofing and flashings installed to the approved details. Below-grade and roofing waterproofing are coordinated with the appropriate trades.",
    image: images.exterior.waterproofing,
    featured: true,
    order: 10,
    seo: {
      title: "Wall Waterproofing & Flashings — Toronto & GTA",
      description:
        "Above-grade wall waterproofing, flashings and transition membranes for commercial and multi-residential buildings in Toronto and the GTA.",
    },
  },
  {
    slug: "exterior-sealants",
    category: "building-envelope",
    name: "Exterior Sealants & Joints",
    tagline: "Exterior sealants, caulking, expansion and control joints.",
    summary:
      "Exterior sealant and caulking at windows, panels and material transitions, plus expansion and control joints, with surfaces prepared and primed to specification.",
    overview: [
      "Sealant joints are the first line of defence at many exterior interfaces and among the first things to fail when poorly installed. MEK installs exterior sealants and joint systems at window perimeters, panel joints, control and expansion joints and material transitions.",
      "Joints are prepared, primed and sized with backer rod or bond-breaker to the joint design in the specifications and the sealant manufacturer's requirements, and tooled to the correct profile.",
    ],
    applications: ["Window and door perimeters", "Panel and EIFS joints", "Expansion and control joints", "Penetrations and transitions"],
    capabilities: [
      "Surface preparation and priming",
      "Backer rod and bond-breaker installation",
      "Silicone, polyurethane and hybrid sealants as specified",
      "Pre-compressed and expansion joint seals",
      "Sealant removal and replacement",
    ],
    systems: ["Silicone sealants", "Polyurethane sealants", "Hybrid / STPE sealants", "Pre-compressed foam joint seals"],
    sectors: ["commercial", "multi-residential", "institutional", "industrial", "office"],
    relatedServices: ["waterproofing-flashing", "facade-repair-restoration", "stucco-eifs"],
    scopeNote: INSTALL_NOTE,
    image: images.exterior.sealants,
    featured: true,
    order: 11,
    seo: {
      title: "Exterior Sealants & Caulking Contractor — Toronto",
      description:
        "Exterior sealant, caulking and expansion joint work in Toronto and the GTA: window perimeters, panel joints and transitions on commercial buildings.",
    },
  },

  /* ----------------------------- Repair & restoration ----------------------------- */
  {
    slug: "facade-repair-restoration",
    category: "facade-repair",
    name: "Façade Repair & Restoration",
    tagline: "Repairs to stucco, EIFS, cladding, joints and exterior walls on existing buildings.",
    summary:
      "Repair and restoration of existing façades — stucco and EIFS repairs, cladding repairs, sealant replacement, waterproofing repairs and exterior wall repairs.",
    overview: [
      "Existing buildings need repairs that match the original system and fix the cause, not just the symptom. MEK repairs and restores stucco, EIFS, metal and composite cladding, sealant joints and exterior wall components on occupied commercial, institutional and multi-residential buildings.",
      "Repair scopes are carried out to the condition assessment, repair drawings or specifications prepared by the owner's consultant, with access, protection and phasing planned around building occupants.",
    ],
    applications: [
      "Stucco and EIFS repairs and recoating",
      "Damaged or loose cladding panels",
      "Exterior joint and sealant replacement",
      "Waterproofing and flashing repairs",
      "Exterior wall repairs at openings and slab edges",
    ],
    capabilities: [
      "Stucco / EIFS repairs and finish matching",
      "Cladding repair and panel replacement",
      "Sealant removal and replacement",
      "Waterproofing and flashing repairs",
      "Phased work on occupied buildings",
    ],
    systems: ["Manufacturer-compatible EIFS and stucco repair materials", "Replacement panels and trims", "Sealants and membranes as specified"],
    sectors: ["commercial", "multi-residential", "institutional", "office", "retail"],
    relatedServices: ["building-envelope-retrofits", "stucco-eifs", "exterior-sealants", "waterproofing-flashing"],
    scopeNote:
      "Repairs are carried out to the owner's condition assessment, repair drawings or specifications. MEK does not provide building-envelope condition assessments or engineering.",
    image: images.exterior.restoration,
    featured: true,
    order: 12,
    seo: {
      title: "Façade Repair & Restoration Contractor — Toronto",
      description:
        "Façade repair and restoration in Toronto and the GTA: stucco and EIFS repairs, cladding repairs, sealant replacement and exterior wall repairs.",
    },
  },
  {
    slug: "building-envelope-retrofits",
    category: "facade-repair",
    name: "Envelope Retrofits & Recladding",
    tagline: "Recladding, over-cladding and envelope retrofits, including selective exterior demolition.",
    summary:
      "Building envelope renovations: selective exterior demolition, exterior finish replacement, over-cladding and retrofit of existing walls with new insulation and cladding.",
    overview: [
      "Older commercial and residential buildings are increasingly reclad to renew their appearance and improve energy performance. MEK carries out envelope retrofits — removing existing finishes, preparing the wall and installing new insulation, barriers and cladding or EIFS.",
      "Removal and re-installation follow the retrofit drawings and specifications, with temporary protection, access and phasing planned for occupied buildings.",
    ],
    applications: [
      "Recladding of commercial and multi-residential buildings",
      "Over-cladding with EIFS or panel systems",
      "Exterior finish replacement",
      "Storefront and entrance façade renewals",
    ],
    capabilities: [
      "Selective exterior demolition of finishes and cladding",
      "Substrate preparation and repair",
      "New insulation, air barrier and cladding",
      "Temporary weather protection during phasing",
    ],
    systems: ["EIFS and stucco", "Metal, ACM and fibre cement cladding", "Continuous insulation and air barriers"],
    sectors: ["commercial", "multi-residential", "institutional", "retail"],
    relatedServices: ["facade-repair-restoration", "stucco-eifs", "exterior-insulation", "aluminum-cladding"],
    scopeNote:
      "Retrofit work is carried out to the retrofit drawings and specifications prepared by the project's design team. Hazardous materials are identified and abated by qualified parties before exterior demolition proceeds.",
    image: images.exterior.retrofit,
    featured: false,
    order: 13,
    seo: {
      title: "Building Envelope Retrofits & Recladding — Toronto",
      description:
        "Commercial building envelope renovations in Toronto and the GTA: selective exterior demolition, recladding, over-cladding and exterior finish replacement.",
    },
  },
];
