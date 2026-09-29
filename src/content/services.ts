import type { Service } from "@/types/content";
import { images } from "@/content/images";

/**
 * Trade services. This is the single source of truth for service pages, the
 * services index, homepage cards, navigation, forms and structured data.
 *
 * To add a service: append an entry with a unique slug, then (optionally) add
 * it to the bid-invitation trade list in `src/lib/forms/options.ts`.
 * `pnpm test` validates slugs and cross-references.
 */

const ASSEMBLY_NOTE =
  "Fire-rated, acoustic and other tested assemblies are installed to the approved drawings, specifications and listed assembly details issued for the project. MEK installs these systems; it does not design or certify them.";

export const services: Service[] = [
  {
    slug: "drywall-installation",
    name: "Drywall Installation",
    tagline: "Commercial gypsum board systems for walls, ceilings and shafts.",
    summary:
      "Gypsum board partitions, ceilings and bulkheads for commercial interiors, installed to the drawings, specifications and assembly details issued for the project.",
    overview: [
      "MEK installs commercial gypsum board systems across Toronto and the GTA — interior partitions, demising walls, ceilings, bulkheads and shaft enclosures — as part of the interior trade package on commercial, retail, office, institutional and industrial projects.",
      "Board types, layers, fastening and control joints follow the project specifications and the listed assemblies shown on the drawings. Where a wall or ceiling forms part of a fire separation or acoustic assembly, it is built to the approved assembly detail, and questions are raised through the general contractor before the work is closed in.",
    ],
    applications: [
      "Interior partitions and demising walls",
      "Corridor and suite separations",
      "Gypsum board ceilings and bulkheads",
      "Shaft wall enclosures where specified",
      "Column and beam enclosures",
      "Washroom and wet-area walls with moisture-resistant board",
    ],
    capabilities: [
      "Single- and multi-layer board installation",
      "Fire-rated assemblies installed where specified",
      "Moisture- and mould-resistant boards where specified",
      "Abuse- and impact-resistant boards where specified",
      "Control joints and deflection details per specification",
      "Coordination of access panels and service openings with other trades",
    ],
    systems: [
      "Regular and Type X gypsum board",
      "Moisture- and mould-resistant gypsum board",
      "Abuse- and impact-resistant gypsum board",
      "Shaft wall liner panels and C-H / C-T stud systems",
      "Specialty boards as specified (e.g. acoustic, lead-lined, curved)",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "industrial", "tenant-improvements"],
    relatedServices: ["metal-stud-framing", "taping-and-finishing", "insulation", "acoustic-ceilings"],
    scopeNote: ASSEMBLY_NOTE,
    image: images.services.drywall,
    featured: true,
    order: 1,
    seo: {
      title: "Commercial Drywall Contractor — Toronto & GTA",
      description:
        "Commercial drywall installation in Toronto and the GTA: gypsum board partitions, ceilings, bulkheads and shaft walls installed to project drawings and specifications.",
    },
  },
  {
    slug: "metal-stud-framing",
    name: "Metal Stud Framing",
    tagline: "Steel stud partitions, ceilings and bulkheads, laid out and built to the drawings.",
    summary:
      "Light-gauge steel framing for interior partitions, bulkheads, ceilings and openings, with backing coordinated for the trades that follow.",
    overview: [
      "Metal stud framing sets up everything that follows it. MEK lays out and frames interior partitions, bulkheads, drop ceilings and openings for commercial projects in Toronto and the GTA, working from the architectural drawings, reflected ceiling plans and specifications.",
      "Stud gauge, spacing, deflection track and bracing follow the project documents. Backing for millwork, washroom accessories, wall-mounted equipment and fixtures is coordinated with the general contractor and the affected trades before board goes on, which avoids opening finished walls later.",
    ],
    applications: [
      "Interior partitions and demising walls",
      "Bulkheads, soffits and drop ceilings",
      "Door and window openings, headers and jambs",
      "Furring of exterior and masonry walls",
      "Shaft and chase framing",
      "Framing for rated walls where specified",
    ],
    capabilities: [
      "Layout from architectural drawings and reflected ceiling plans",
      "Deflection and slip-track head details per specification",
      "Backing and blocking for millwork, fixtures and equipment",
      "Framed openings coordinated with door and frame schedules",
      "Ceiling framing and suspended drywall grid systems",
      "Rated wall framing built to the listed assembly detail",
    ],
    systems: [
      "Light-gauge steel studs and track (gauges as specified)",
      "Deflection / slip track head systems",
      "Furring channel and resilient channel",
      "Suspended drywall ceiling grid systems",
      "Shaft wall stud systems",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "industrial", "tenant-improvements"],
    relatedServices: ["drywall-installation", "insulation", "taping-and-finishing", "acoustic-ceilings"],
    scopeNote:
      "Framing is built to the approved drawings and specifications. Where framing requires engineering (for example, tall walls or heavy wall-mounted loads), it is installed to the engineered design supplied for the project.",
    image: images.services.framing,
    featured: true,
    order: 2,
    seo: {
      title: "Metal Stud Framing Contractor — Toronto & GTA",
      description:
        "Commercial metal stud framing in Toronto and the GTA: steel stud partitions, bulkheads, ceilings, openings and backing, built to project drawings and specifications.",
    },
  },
  {
    slug: "taping-and-finishing",
    name: "Taping & Finishing",
    tagline: "Joint treatment and finishing to the level the specification calls for.",
    summary:
      "Joint treatment, corner bead and finishing of gypsum board to the specified level of finish, ready for paint or wall coverings.",
    overview: [
      "Finish quality is judged under final lighting, so the finishing level has to match what the space needs. MEK tapes and finishes gypsum board to the level identified in the specifications, from fire-taping in service areas to Level 4 for general painted surfaces and Level 5 where critical lighting or finishes require it.",
      "Surfaces are prepared and checked before handover to the painter or wall-covering installer, and deficiencies are addressed before the area is turned over.",
    ],
    applications: [
      "Painted office and corridor walls",
      "Retail and front-of-house feature walls",
      "Ceilings and bulkheads",
      "Fire-taping in service spaces and above ceilings",
      "Surfaces under critical or raking light",
    ],
    capabilities: [
      "Joint treatment of flat joints, butt joints and fastener heads",
      "Corner bead, trims and reveals",
      "Level 4 finishing for general painted surfaces",
      "Level 5 skim-coat finishing where specified",
      "Fire-taping of rated assemblies where specified",
      "Surface preparation and deficiency repair before paint",
    ],
    systems: [
      "Paper and fibreglass joint tapes",
      "Setting-type and ready-mix joint compounds",
      "Metal, paper-faced and vinyl corner beads and trims",
      "Reveal and control joint trims",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "tenant-improvements"],
    relatedServices: ["drywall-installation", "painting", "plastering"],
    image: images.services.taping,
    featured: true,
    order: 3,
    seo: {
      title: "Drywall Taping & Finishing Contractor — Toronto",
      description:
        "Commercial drywall taping and finishing in Toronto and the GTA: joint treatment, corner bead, Level 4 and Level 5 finishes, and surface preparation for paint.",
    },
  },
  {
    slug: "plastering",
    name: "Plastering",
    tagline: "Skim coats, patching and plaster repairs for commercial interiors.",
    summary:
      "Skim coating, patching and repair of plaster and gypsum surfaces, including restoration of existing walls during renovations.",
    overview: [
      "Renovation work often means matching new work to old. MEK carries out skim coating, patching and plaster repairs so existing walls and ceilings are brought to a consistent surface that takes paint cleanly.",
      "On new construction, skim coats are applied where the specification or finish requires a smoother surface than standard joint treatment provides.",
    ],
    applications: [
      "Existing plaster walls and ceilings in renovations",
      "Patching after selective demolition or service changes",
      "Skim coats over gypsum board where specified",
      "Surface repair before repainting occupied spaces",
    ],
    capabilities: [
      "Full-surface skim coating",
      "Patching and crack repair",
      "Transition between existing plaster and new gypsum board",
      "Surface preparation for paint and wall coverings",
    ],
    systems: [
      "Gypsum veneer and skim-coat plasters",
      "Setting-type patching compounds",
      "Bonding agents and primers as specified",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "interior-renovations"],
    relatedServices: ["taping-and-finishing", "painting", "interior-renovations"],
    image: images.services.plastering,
    featured: false,
    order: 4,
    seo: {
      title: "Commercial Plastering & Skim Coating — Toronto",
      description:
        "Commercial plastering in Toronto and the GTA: skim coating, patching and repair of plaster and gypsum surfaces for new construction and renovations.",
    },
  },
  {
    slug: "insulation",
    name: "Insulation",
    tagline: "Acoustic and thermal insulation installed within framed assemblies.",
    summary:
      "Acoustic and thermal insulation installed within walls, ceilings and bulkheads, including insulation that forms part of a specified assembly.",
    overview: [
      "Insulation is installed at the point where framing is complete and services are roughed in, and before board closes the wall. MEK installs acoustic batts in partitions and ceilings, and thermal insulation in furred exterior walls and other areas identified on the drawings.",
      "Where insulation is a component of a fire-rated or acoustic assembly, the product type, thickness and density follow the approved construction documents and listed assembly details.",
    ],
    applications: [
      "Acoustic insulation in demising walls and office partitions",
      "Meeting rooms, washrooms and other sound-sensitive rooms",
      "Thermal insulation in furred exterior walls",
      "Ceiling and bulkhead cavities",
      "Assemblies where insulation is part of a rated design",
    ],
    capabilities: [
      "Acoustic batt insulation in stud cavities",
      "Thermal insulation in interior-side furring",
      "Insulation within fire-related assemblies where specified by approved construction documents",
      "Coordination with mechanical and electrical rough-in before close-up",
    ],
    systems: [
      "Mineral wool batts",
      "Glass fibre batts",
      "Acoustic and thermal products as specified",
    ],
    sectors: ["commercial", "office", "institutional", "industrial", "tenant-improvements"],
    relatedServices: ["metal-stud-framing", "drywall-installation"],
    scopeNote: ASSEMBLY_NOTE,
    image: images.services.insulation,
    featured: true,
    order: 5,
    seo: {
      title: "Commercial Acoustic & Thermal Insulation — Toronto & GTA",
      description:
        "Commercial insulation in Toronto and the GTA: acoustic batts in partitions and ceilings and thermal insulation in furred walls, installed to project specifications.",
    },
  },
  {
    slug: "painting",
    name: "Painting",
    tagline: "Commercial interior painting from primer to final coat.",
    summary:
      "Interior painting of walls, ceilings, doors and frames in commercial spaces, applied to the specified coating system and colour schedule.",
    overview: [
      "MEK paints commercial interiors to the finish schedule and coating system in the specifications — primer and finish coats on new gypsum board, repainting of occupied spaces, and painting of doors, frames and exposed surfaces.",
      "Taping, finishing and painting under one trade package keeps surface preparation and deficiency correction in one set of hands, which reduces back-and-forth at turnover.",
    ],
    applications: [
      "New gypsum board walls and ceilings",
      "Office, retail and tenant spaces",
      "Corridors, stairwells and common areas",
      "Hollow metal doors and frames",
      "Concrete block and exposed structure where specified",
    ],
    capabilities: [
      "Brush, roll and spray application",
      "Primer and finish systems per specification",
      "Colour schedules and feature walls",
      "Repainting in occupied or phased spaces",
      "Touch-ups and deficiency correction at turnover",
    ],
    systems: [
      "Latex and acrylic interior coatings",
      "Primers and sealers for gypsum, block and metal",
      "Specialty coatings as specified",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "industrial", "tenant-improvements"],
    relatedServices: ["taping-and-finishing", "plastering", "interior-renovations"],
    image: images.services.painting,
    featured: true,
    order: 6,
    seo: {
      title: "Commercial Painting Contractor — Toronto & GTA",
      description:
        "Commercial interior painting in the GTA: primer and finish coats on new gypsum board, repainting of occupied spaces, and doors and frames to the specified system.",
    },
  },
  {
    slug: "acoustic-ceilings",
    name: "Acoustic Ceilings",
    tagline: "Suspended ceiling grid and acoustic tile, coordinated with ceiling services.",
    summary:
      "Suspended acoustic ceiling grid and tile systems, laid out to the reflected ceiling plan and coordinated with lighting, diffusers and sprinklers.",
    overview: [
      "A suspended ceiling is where several trades meet. MEK installs acoustic ceiling grid and tile laid out to the reflected ceiling plan, with the grid coordinated around light fixtures, diffusers, sprinkler heads and access requirements.",
      "Grid, tile and edge details are installed to the manufacturer's requirements and the project specifications, including seismic or perimeter details where the documents call for them.",
    ],
    applications: [
      "Offices and open work areas",
      "Retail and commercial units",
      "Corridors and common areas",
      "Classrooms and institutional spaces",
      "Replacement ceilings in renovations",
    ],
    capabilities: [
      "Layout from reflected ceiling plans",
      "Main runner, cross tee and perimeter installation",
      "Tile installation and cutting around services",
      "Coordination with electrical, mechanical and sprinkler trades",
      "Drywall bulkhead transitions with the framing crew",
    ],
    systems: [
      "Exposed tee suspension systems",
      "Mineral fibre and fibreglass acoustic tiles",
      "Specialty tiles and edge profiles as specified",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "tenant-improvements"],
    relatedServices: ["metal-stud-framing", "drywall-installation", "interior-renovations"],
    image: images.services.acoustic,
    featured: true,
    order: 7,
    seo: {
      title: "Acoustic Ceiling Installation — Toronto & GTA",
      description:
        "Suspended acoustic ceiling grid and tile installation for commercial spaces in Toronto and the GTA, laid out to the reflected ceiling plan and coordinated with services.",
    },
  },
  {
    slug: "flooring",
    name: "Flooring",
    tagline: "Commercial floor finishes installed over prepared substrates.",
    summary:
      "Installation of commercial floor finishes such as resilient flooring and carpet tile, with substrate preparation to suit the specified product.",
    overview: [
      "Flooring is one of the last trades through a space and one of the most visible. MEK installs commercial floor finishes in tenant spaces, offices and retail units, working over substrates prepared to the flooring manufacturer's requirements.",
      "Product selection, layout and transitions follow the finish schedule and drawings. Substrate conditions that affect the installation are identified before work begins.",
    ],
    applications: [
      "Office and tenant improvement spaces",
      "Retail units",
      "Corridors and common areas",
      "Replacement flooring in renovations",
    ],
    capabilities: [
      "Substrate preparation and levelling as required",
      "Resilient flooring installation",
      "Carpet tile installation",
      "Base, transitions and trims",
    ],
    systems: [
      "Luxury vinyl tile and plank",
      "Vinyl composition tile",
      "Carpet tile",
      "Rubber and vinyl base",
    ],
    sectors: ["commercial", "office", "retail", "tenant-improvements"],
    relatedServices: ["interior-renovations", "painting", "selective-demolition"],
    image: images.services.flooring,
    featured: false,
    order: 8,
    seo: {
      title: "Commercial Flooring Installation — Toronto & GTA",
      description:
        "Commercial flooring installation in Toronto and the GTA: resilient flooring, carpet tile, base and transitions over properly prepared substrates.",
    },
  },
  {
    slug: "interior-renovations",
    name: "Interior Renovations",
    tagline: "Multi-trade interior scopes for tenant improvements and renovations.",
    summary:
      "Interior renovation and tenant improvement scopes that combine demolition, framing, drywall, finishing, ceilings and paint under one trade package.",
    overview: [
      "Tenant improvements and interior renovations usually involve several interior trades working in sequence in a confined area — often in occupied buildings. MEK can carry the interior package from selective demolition through framing, board, finishing, ceilings and paint, which simplifies coordination for the general contractor or owner's representative.",
      "Work in occupied buildings is planned around building rules, access, working hours and protection of adjacent areas, as set by the property manager and the constructor on the project.",
    ],
    applications: [
      "Office tenant improvements",
      "Retail unit fit-outs and refreshes",
      "Institutional interior upgrades",
      "Suite demising and re-configuration",
      "Common area and corridor upgrades",
    ],
    capabilities: [
      "Combined interior trade packages",
      "Phased work in occupied buildings",
      "Protection of adjacent finished areas",
      "Coordination with building management and base-building trades",
      "Deficiency and turnover support",
    ],
    systems: [
      "Metal stud framing and gypsum board",
      "Acoustic ceilings",
      "Taping, finishing and paint",
      "Floor finishes where included",
    ],
    sectors: ["office", "retail", "commercial", "institutional", "tenant-improvements", "interior-renovations"],
    relatedServices: ["selective-demolition", "metal-stud-framing", "drywall-installation", "painting"],
    scopeNote:
      "MEK performs interior trade work. Scopes requiring design, engineering, permits or licensed trades (for example, electrical or mechanical work) are carried by the appropriate parties on the project.",
    image: images.services.renovations,
    featured: false,
    order: 9,
    seo: {
      title: "Commercial Interior Renovation Contractor — Toronto",
      description:
        "Commercial interior renovations and tenant improvements in Toronto and the GTA: demolition, framing, drywall, finishing, ceilings and paint under one trade package.",
    },
  },
  {
    slug: "selective-demolition",
    name: "Selective Demolition",
    tagline: "Interior strip-outs and selective removals ahead of new work.",
    summary:
      "Interior strip-outs and selective removal of partitions, ceilings and finishes to prepare a space for new construction.",
    overview: [
      "Most interior renovations start with removal. MEK carries out selective interior demolition — partitions, ceilings, flooring and finishes — following the demolition drawings and the limits set by the general contractor.",
      "Removal is sequenced so that existing services identified to remain are protected and designated hazardous materials are handled by the appropriate abatement contractor before interior demolition proceeds.",
    ],
    applications: [
      "Tenant space strip-outs",
      "Removal of partitions and ceilings for re-configuration",
      "Flooring and finish removal",
      "Openings in existing gypsum board walls",
    ],
    capabilities: [
      "Selective removal to demolition drawings",
      "Protection of elements identified to remain",
      "Debris handling and disposal coordination",
      "Preparation of the space for new framing and finishes",
    ],
    systems: [
      "Non-structural interior partitions and ceilings",
      "Floor finishes",
      "Wall finishes and fixtures identified for removal",
    ],
    sectors: ["commercial", "office", "retail", "institutional", "tenant-improvements", "interior-renovations"],
    relatedServices: ["interior-renovations", "metal-stud-framing", "drywall-installation"],
    scopeNote:
      "Selective demolition is limited to non-structural interior elements identified on the demolition drawings. Designated substance surveys and abatement are completed by qualified parties before interior demolition begins.",
    image: images.services.demolition,
    featured: false,
    order: 10,
    seo: {
      title: "Interior Selective Demolition — Toronto & GTA",
      description:
        "Selective interior demolition in Toronto and the GTA: strip-outs and removal of partitions, ceilings and finishes to prepare commercial spaces for new work.",
    },
  },
];
