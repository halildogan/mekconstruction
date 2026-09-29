import type { ImageAsset, ImageCredit } from "@/types/content";

import heroFacade from "@/assets/images/hero/facade-cladding.jpg";
import extStucco from "@/assets/images/exterior/stucco-eifs.jpg";
import extAluminum from "@/assets/images/exterior/aluminum-cladding.jpg";
import extMetal from "@/assets/images/exterior/metal-panel-cladding.jpg";
import extFiberCement from "@/assets/images/exterior/fiber-cement.jpg";
import extSoffit from "@/assets/images/exterior/soffit-fascia.jpg";
import extInsulation from "@/assets/images/exterior/exterior-insulation.jpg";
import extFraming from "@/assets/images/exterior/framing-sheathing.jpg";
import extAirBarrier from "@/assets/images/exterior/air-barrier.jpg";
import extRainscreen from "@/assets/images/exterior/rainscreen.jpg";
import extWaterproofing from "@/assets/images/exterior/waterproofing.jpg";
import extSealants from "@/assets/images/exterior/sealants.jpg";
import extRestoration from "@/assets/images/exterior/facade-restoration.jpg";
import extRetrofit from "@/assets/images/exterior/envelope-retrofit.jpg";
import secCommercialExt from "@/assets/images/sectors/commercial-exterior.jpg";
import secMultiRes from "@/assets/images/sectors/multi-residential.jpg";
import secOfficeExt from "@/assets/images/sectors/office-exterior.jpg";
import heroInteriorFraming from "@/assets/images/hero/interior-framing.jpg";
import aboutDrywallBracing from "@/assets/images/about/drywall-bracing.jpg";
import svcDrywall from "@/assets/images/services/drywall-installation.jpg";
import svcFraming from "@/assets/images/services/metal-stud-framing.jpg";
import svcTaping from "@/assets/images/services/taping-finishing.jpg";
import svcPlastering from "@/assets/images/services/plastering.jpg";
import svcInsulation from "@/assets/images/services/insulation.jpg";
import svcPainting from "@/assets/images/services/painting.jpg";
import svcAcoustic from "@/assets/images/services/acoustic-ceilings.jpg";
import svcFlooring from "@/assets/images/services/flooring.jpg";
import svcRenovations from "@/assets/images/services/interior-renovations.jpg";
import svcDemolition from "@/assets/images/services/selective-demolition.jpg";
import secCommercial from "@/assets/images/sectors/commercial.jpg";
import secRetail from "@/assets/images/sectors/retail.jpg";
import secOffice from "@/assets/images/sectors/office.jpg";
import secInstitutional from "@/assets/images/sectors/institutional.jpg";
import secIndustrial from "@/assets/images/sectors/industrial.jpg";
import secTenant from "@/assets/images/sectors/tenant-improvements.jpg";
import secRenovations from "@/assets/images/sectors/interior-renovations.jpg";

/**
 * Representative trade photography.
 *
 * These are licensed third-party photographs (credited on /image-credits) used
 * to illustrate each trade. They are NOT MEK projects and must never be used
 * as project imagery. Replace any of them with MEK's own site photography by
 * swapping the import above and removing the `creditId` — components need no
 * changes.
 */

const MTA_AUTHOR = "MTA Capital Construction Mega Projects";
const CC_BY_2 = { license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" };
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const imageCredits: ImageCredit[] = [
  {
    id: "hero-facade-cladding",
    title: "Cladding a new department store building",
    author: "Fernweh",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cladding_the_new_John_Lewis_-_geograph.org.uk_-_4713035.jpg",
  },
  {
    id: "ext-stucco-eifs",
    title: "Insulation boards and plaster applied on a building façade",
    author: "Cjp24",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:PSE_Insulation_boards_and_plaster_applied_on_a_building_facade.jpg",
  },
  {
    id: "ext-aluminum-cladding",
    title: "Cladding going up on a new building",
    author: "Martyn Pattison",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cladding_going_up_on_new_building_on_Moor_Lane_-_geograph.org.uk_-_7252360.jpg",
  },
  {
    id: "ext-metal-panel-cladding",
    title: "Kinetic cladding on a high-rise building",
    author: "Phillip Pessar",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Kinetic_Cladding_830_Brickell_Building,_Miami_FL,_3_Oct_2022_-_01.jpg",
  },
  {
    id: "ext-fiber-cement",
    title: "Fibre cement cladding on a residential tower",
    author: "Marcin Floryan",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fiber_Cement_cladding_on_Mercury_Tower.jpg",
  },
  {
    id: "ext-soffit-fascia",
    title: "Discovery Square building exterior",
    author: "w_lemay",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Discovery_Square,_2nd_Avenue_SW_and_4th_Street_SW,_Rochester,_MN_-_54369110701.jpg",
  },
  {
    id: "ext-exterior-insulation",
    title: "Insulation boards on a building façade",
    author: "Cjp24",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Insulation_boards_on_a_building_facade.jpg",
  },
  {
    id: "ext-framing-sheathing",
    title: "Office building façade under construction",
    author: "Lasse Keskinen",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Signe_office_building_(Mannerheimintie_14,_Helsinki,_Finland)_Kalevankatu_facade_under_construction_Sep_13,_2025.jpg",
  },
  {
    id: "ext-air-barrier",
    title: "Mid-rise building with exterior sheathing",
    author: "Tiia Monto",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jyv%C3%A4skyl%C3%A4_-_Rusokinkatu_12.jpg",
  },
  {
    id: "ext-rainscreen",
    title: "Installation of zinc cladding on a museum façade",
    author: "Museum of Contemporary Art Kiasma (Finnish National Gallery)",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Installation_of_zink_cladding_on_Kiasma_east_fa%C3%A7ade,_1997_(14117140288).jpg",
  },
  {
    id: "ext-waterproofing",
    title: "Applying base coat to insulation at the base of a wall",
    author: "Hamed shahrokhei",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Step1XPS.jpg",
  },
  {
    id: "ext-sealants",
    title: "Workers on a suspended scaffold",
    author: "Dmitry Ivanov",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Workers_on_suspended_scaffold_in_Korolyov.jpg",
  },
  {
    id: "ext-facade-restoration",
    title: "Restoration of cladding and windows",
    author: "Hullian111",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:34-35_Whitefriargate_Resto_Cladding_and_Windows,_Apr24.jpg",
  },
  {
    id: "ext-envelope-retrofit",
    title: "Layers of base coat and reinforcing mesh on a façade",
    author: "Hamed shahrokhei",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_steps_of_implementing_layers_of_paste_and_fireproof_mesh.jpg",
  },
  {
    id: "sector-commercial-exterior",
    title: "Cladding a new department store building",
    author: "Fernweh",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Cladding_the_new_John_Lewis_-_geograph.org.uk_-_4713026.jpg",
  },
  {
    id: "sector-multi-residential",
    title: "Panelized exterior wall system on a residential building",
    author: "Maxnik2003",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Durabond_IBS_Panel_System.jpg",
  },
  {
    id: "sector-office-exterior",
    title: "Discovery Square office buildings",
    author: "w_lemay",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Discovery_Square,_2nd_Avenue_SW_and_4th_Street_SW,_Rochester,_MN.jpg",
  },
  {
    id: "hero-interior-framing",
    title: "Metal ceiling framing installation in the future LIRR passenger concourse",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Metal_ceiling_framing_installation_in_the_future_LIRR_passenger_concourse._(CM014B,_03-14-2019)_(40421610643).jpg",
    ),
  },
  {
    id: "drywall-installation",
    title: "Continued installation of sheetrock ceilings in the back of house offices",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Continued_installation_of_sheetrock_ceilings_in_the_back_of_house_offices_in_the_future_LIRR_concourse._07-22-2019_(48382975967).jpg",
    ),
  },
  {
    id: "metal-stud-framing",
    title: "Installation of steel stud framing at the ticket area",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Installation_of_steel_stud_framing_at_the_ticket_area_of_the_future_LIRR_passenger_concourse._(CM014B,_09-25-2018)_(43161884280).jpg",
    ),
  },
  {
    id: "taping-finishing",
    title: "Taping gypsum board seams in back of house rooms",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Taping_gypsum_board_seams_in_back_of_house_rooms_in_the_new_LIRR_passenger_concourse_in_preparation_for_painting_and_final_finishes._4-17-19_(47645209441).jpg",
    ),
  },
  {
    id: "plastering",
    title: "Spackling sheetrock on diagonal braces",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Spackling_sheetrock_on_diagonal_braces_at_the_entrance_to_the_future_ticketing_seating_area_in_the_LIRR_Concourse._10-30-2019_(48997429491).jpg",
    ),
  },
  {
    id: "insulation",
    title: "Installation of insulation in customer service rooms",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Installation_of_insulation_in_the_future_LIRR_concourse_Customer_Service_Rooms._(CM014B,_3-07-2018)_(26896975778).jpg",
    ),
  },
  {
    id: "painting",
    title: "Painting the walls of the back of house area",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Painting_the_walls_of_the_back_of_house_area_of_the_future_LIRR_passenger_concourse._(06-11-2019)_(48062639443).jpg",
    ),
  },
  {
    id: "acoustic-ceilings",
    title: "Continued installation of overhead ceiling tiles",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Continued_installation_of_overhead_ceiling_tiles_along_the_LIRR_passenger_concourse._(CM014B,_02-12-2019)_(47051373812).jpg",
    ),
  },
  {
    id: "flooring",
    title: "Sanding the floors of the 50th Street ventilation facility",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Sanding_the_floors_of_the_50th_Street_ventilation_facility._(CM014B,_10-24-2018)_(45519040032).jpg",
    ),
  },
  {
    id: "interior-renovations",
    title: "Installing ceiling framing in a retail space",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Installing_ceiling_framing_in_the_retail_space_of_the_LIRR_passenger_concourse._(CM014B,_01-29-2019)_(39985877493).jpg",
    ),
  },
  {
    id: "selective-demolition",
    title: "Interior selective demolition",
    author: "U.S. National Park Service (NPS Photo)",
    license: "Public domain",
    sourceUrl: commons("5._Interior_selective_demolition._(f9d58f1d-88c8-4e50-80ad-fbf4d2986190).jpg"),
  },
  {
    id: "sector-commercial",
    title: "Acoustic installation applied on the ceiling of a passenger concourse",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Acoustic_installation_applied_on_the_ceiling_of_the_future_LIRR_passenger_concourse._(CM014B,_12-12-2018)_(45591918724).jpg",
    ),
  },
  {
    id: "sector-retail",
    title: "Metal ceiling framing above a retail partition",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Metal_ceiling_framing_above_a_retail_partition_at_the_43rd_Street_node_of_the_future_LIRR_passenger_concourse._(CM014B,_03-21-2019)_(33565521638).jpg",
    ),
  },
  {
    id: "sector-office",
    title: "Office space being created within Kelvin Hall",
    author: "Frayedattheedges",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceUrl: commons("Office_space_being_created_within_Kelvin_Hall.JPG"),
  },
  {
    id: "sector-institutional",
    title: "Completed ceiling panels in a passenger escalator wellway",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Completed_ceiling_panels_located_in_the_new_passenger_escalator_wellway._(CM014B,_1-31-2018)_(40013810242).jpg",
    ),
  },
  {
    id: "sector-industrial",
    title: "Painting a block wall in a mechanical equipment room",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Painting_a_block_wall_located_in_the_mechanical_equipment_room_of_the_future_passenger_concourse._(CM014B,_02-12-2019)_(47051373512).jpg",
    ),
  },
  {
    id: "sector-tenant-improvements",
    title: "Installation of steel framing for ticket machines",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Installation_of_steel_framing_for_ticket_machines_in_the_future_LIRR_passenger_concourse._(CM014B,_09-24-2018)_(44925115452).jpg",
    ),
  },
  {
    id: "sector-interior-renovations",
    title: "Carpenters installing sheetrock in a back of house area",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Carpenters_installing_sheetrock_in_the_back_of_house_area_in_the_future_LIRR_Concourse._10-30-2019_(48997634792).jpg",
    ),
  },
  {
    id: "about-drywall-bracing",
    title: "Carpenters installing sheetrock at diagonal bracing",
    author: MTA_AUTHOR,
    ...CC_BY_2,
    sourceUrl: commons(
      "Carpenters_installing_sheetrock_at_the_diagonal_bracing_in_the_future_seating_and_ticketing_area_in_the_LIRR_Concourse._11-14-2019_(49070775311).jpg",
    ),
  },
];

export const images = {
  exterior: {
    stucco: { src: extStucco, alt: "Exterior insulation boards partly covered with base coat and finish on a multi-storey façade", creditId: "ext-stucco-eifs" },
    aluminum: { src: extAluminum, alt: "Crane lifting a large dark cladding panel into position on a new commercial building", creditId: "ext-aluminum-cladding" },
    metal: { src: extMetal, alt: "Architectural metal panel cladding across the upper floors of a high-rise under construction", creditId: "ext-metal-panel-cladding" },
    fiberCement: { src: extFiberCement, alt: "Curved fibre cement cladding bands on the balconies of a residential tower", creditId: "ext-fiber-cement" },
    soffit: { src: extSoffit, alt: "Commercial building with metal panel cladding, fascia bands and a projecting canopy soffit", creditId: "ext-soffit-fascia" },
    insulation: { src: extInsulation, alt: "Crew on suspended work platforms fixing exterior insulation boards to a multi-storey façade", creditId: "ext-exterior-insulation" },
    framing: { src: extFraming, alt: "Office building façade under construction with scaffolding, framed openings and exterior wall assemblies", creditId: "ext-framing-sheathing" },
    airBarrier: { src: extAirBarrier, alt: "Mid-rise building with exterior sheathing and membrane installed ahead of cladding", creditId: "ext-air-barrier" },
    rainscreen: { src: extRainscreen, alt: "Curved metal rainscreen cladding being installed on a building façade with scaffolding", creditId: "ext-rainscreen" },
    waterproofing: { src: extWaterproofing, alt: "Installer applying a trowelled coating over insulation board at the base of an exterior wall", creditId: "ext-waterproofing" },
    sealants: { src: extSealants, alt: "Two workers on a suspended platform working at window openings on a masonry façade", creditId: "ext-sealants" },
    restoration: { src: extRestoration, alt: "Scaffolded building façade during cladding and window restoration", creditId: "ext-facade-restoration" },
    retrofit: { src: extRetrofit, alt: "Workers on scaffolding applying insulation boards and reinforcing mesh to an existing building", creditId: "ext-envelope-retrofit" },
  },
  heroFacade: { src: heroFacade, alt: "Boom lifts and a mobile crane alongside a large commercial building as metal cladding panels are installed", creditId: "hero-facade-cladding" },
  hero: {
    src: heroInteriorFraming,
    alt: "Trades on scissor and mast lifts installing suspended metal ceiling framing in a large commercial interior",
    creditId: "hero-interior-framing",
  },
  about: {
    src: aboutDrywallBracing,
    alt: "Carpenter fastening gypsum board to framing around a diagonal structural brace",
    creditId: "about-drywall-bracing",
  },
  services: {
    drywall: {
      src: svcDrywall,
      alt: "Two installers lifting a gypsum board ceiling panel into place on metal framing",
      creditId: "drywall-installation",
    },
    framing: {
      src: svcFraming,
      alt: "Steel stud partition framing and top track fastened against a concrete block wall",
      creditId: "metal-stud-framing",
    },
    taping: {
      src: svcTaping,
      alt: "Finishers taping and applying joint compound to gypsum board seams from a rolling scaffold",
      creditId: "taping-finishing",
    },
    plastering: {
      src: svcPlastering,
      alt: "Finisher skim-coating gypsum board enclosures around angled structural braces",
      creditId: "plastering",
    },
    insulation: {
      src: svcInsulation,
      alt: "Mineral wool insulation installed between steel studs in an interior partition",
      creditId: "insulation",
    },
    painting: {
      src: svcPainting,
      alt: "Painters rolling finish coats on newly finished gypsum board corridor walls",
      creditId: "painting",
    },
    acoustic: {
      src: svcAcoustic,
      alt: "Installers on lifts setting acoustic ceiling tiles into a suspended grid along a long corridor",
      creditId: "acoustic-ceilings",
    },
    flooring: {
      src: svcFlooring,
      alt: "Worker preparing a concrete floor surface with a floor sander ahead of finish flooring",
      creditId: "flooring",
    },
    renovations: {
      src: svcRenovations,
      alt: "Ceiling framing and services being installed in an open retail interior under renovation",
      creditId: "interior-renovations",
    },
    demolition: {
      src: svcDemolition,
      alt: "Interior stripped back to structure during selective demolition, with lath and framing exposed",
      creditId: "selective-demolition",
    },
  },
  sectors: {
    commercialExterior: { src: secCommercialExt, alt: "Crane and boom lifts at a commercial building during exterior cladding installation", creditId: "sector-commercial-exterior" },
    multiResidential: { src: secMultiRes, alt: "Multi-storey residential building with a panelized exterior wall system and balconies", creditId: "sector-multi-residential" },
    officeExterior: { src: secOfficeExt, alt: "Multi-storey office buildings with metal panel and glazed façades", creditId: "sector-office-exterior" },
    commercial: {
      src: secCommercial,
      alt: "Large commercial interior with acoustic treatment being applied to the ceiling from lifts",
      creditId: "sector-commercial",
    },
    retail: {
      src: secRetail,
      alt: "Metal ceiling framing above a retail unit partition in a commercial concourse",
      creditId: "sector-retail",
    },
    office: {
      src: secOffice,
      alt: "Office fit-out in progress with framed partitions and new gypsum board walls",
      creditId: "sector-office",
    },
    institutional: {
      src: secInstitutional,
      alt: "Finished ceiling panels in a public transit facility",
      creditId: "sector-institutional",
    },
    industrial: {
      src: secIndustrial,
      alt: "Painter rolling coating onto a concrete block wall in a mechanical equipment room",
      creditId: "sector-industrial",
    },
    tenantImprovements: {
      src: secTenant,
      alt: "Steel stud framing built out for equipment openings in a tenant space",
      creditId: "sector-tenant-improvements",
    },
    renovations: {
      src: secRenovations,
      alt: "Carpenters installing gypsum board over insulated steel stud walls during an interior renovation",
      creditId: "sector-interior-renovations",
    },
  },
} satisfies Record<string, ImageAsset | Record<string, ImageAsset>>;
