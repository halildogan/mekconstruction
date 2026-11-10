import type { NavItem } from "@/types/content";
import { resolveSiteUrl } from "@/lib/site-url";

/**
 * Central company configuration.
 *
 * Every piece of company information shown on the site (name, phone, address,
 * hours, navigation) comes from this object. Change it here, never in JSX.
 *
 * Verification status (September 2026):
 * - phone, address: shown on the previous mekdomain.ca site.
 * - businessHours: taken from the previous site, where the weekday line was
 *   garbled ("Weekdays: Fri: 7:00 AM – 5:00 PM"). Confirm before relying on it.
 * - publicEmail: NOT verified. The previous site showed a template address
 *   from a generic template domain, which must not be used. Set a real mailbox here
 *   and every email link, the footer, the contact page and structured data
 *   will pick it up. While it is undefined, email is simply not displayed.
 *
 * Form notification recipients are server-side environment variables
 * (CONTACT_EMAIL, BID_EMAIL, QUOTE_EMAIL) so they are never hard-coded into
 * the client bundle and can differ between environments.
 */

export interface BusinessHours {
  label: string;
  /** schema.org day names */
  days: Array<
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  >;
  /** 24h HH:MM, omitted when closed */
  opens?: string;
  closes?: string;
}

export interface ServiceRegion {
  slug: string;
  name: string;
  type:
    | "city"
    | "regional-municipality"
    | "county"
    | "district"
    | "municipality";
  province: "ON" | "QC" | "MB";
  municipalities: string[];
  priority: "primary" | "secondary";
  active: boolean;
}

export const siteConfig = {
  companyName: "MEK Construction",
  legalName: "MEK Construction",
  shortName: "MEK",
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en-CA",
  description:
    "MEK Construction Inc. is a commercial construction trade contractor serving Toronto and the GTA: drywall, metal stud framing, taping and finishing, insulation, painting, acoustic ceilings and interior renovation scopes for general contractors, construction managers and building owners.",
  tagline: "Commercial interior trade contractor — Toronto & GTA",

  phone: {
    display: "(647) 979-1421",
    e164: "+16479791421",
  },
  publicEmail: undefined as string | undefined,

  address: {
    street: "34 Paragon Rd",
    locality: "Etobicoke",
    city: "Toronto",
    region: "ON",
    regionName: "Ontario",
    postalCode: "M9R 1J8",
    country: "CA",
    countryName: "Canada",
  },

  businessHours: [
    {
      label: "Monday – Friday",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "17:00",
    },
    { label: "Saturday", days: ["Saturday"], opens: "08:00", closes: "16:00" },
    { label: "Sunday", days: ["Sunday"] },
  ] satisfies BusinessHours[],

  primaryMarket: "Toronto and the Greater Toronto Area",
  serviceAreaNote:
    "Projects elsewhere in Ontario are reviewed case by case, based on scope, schedule and location.",
  
  
  serviceRegions: [
    // GREATER TORONTO AREA
    {
      slug: "toronto",
      name: "City of Toronto",
      type: "city",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Downtown Toronto", "North York", "Scarborough",
        "Etobicoke", "East York", "York", "Midtown Toronto",
        "Yorkville", "The Annex", "Liberty Village",
        "Leslieville", "The Beaches", "Leaside",
        "Don Mills", "Willowdale", "Downsview",
        "Rexdale", "Weston", "Humber Bay",
        "High Park", "Parkdale", "Mimico",
        "Agincourt", "Malvern", "Guildwood",
        "Wexford", "Birch Cliff",
      ],
    },
    {
      slug: "peel-region",
      name: "Peel Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Mississauga", "Brampton", "Caledon",
        "Bolton", "Caledon East", "Port Credit",
        "Streetsville", "Meadowvale", "Malton",
        "Cooksville", "Clarkson", "Erin Mills",
        "Bramalea", "Heart Lake",
      ],
    },
    {
      slug: "york-region",
      name: "York Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Vaughan", "Markham", "Richmond Hill",
        "Newmarket", "Aurora", "King",
        "East Gwillimbury", "Georgina",
        "Whitchurch-Stouffville", "Woodbridge",
        "Concord", "Maple", "Kleinburg",
        "Thornhill", "Unionville", "Buttonville",
        "Keswick", "Sutton", "Schomberg",
      ],
    },
    {
      slug: "halton-region",
      name: "Halton Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Oakville", "Burlington", "Milton",
        "Halton Hills", "Georgetown", "Acton",
        "Glen Williams", "Campbellville",
        "Bronte", "Palermo", "Aldershot",
      ],
    },
    {
      slug: "durham-region",
      name: "Durham Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Pickering", "Ajax", "Whitby", "Oshawa",
        "Clarington", "Bowmanville", "Courtice",
        "Newcastle", "Uxbridge", "Scugog",
        "Port Perry", "Brock", "Beaverton",
        "Brooklin", "Sunderland",
      ],
    },

    // GOLDEN HORSESHOE
    {
      slug: "hamilton",
      name: "Hamilton",
      type: "city",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Hamilton", "Stoney Creek", "Ancaster",
        "Dundas", "Waterdown", "Flamborough",
        "Binbrook", "Glanbrook", "Mount Hope",
        "Winona",
      ],
    },
    {
      slug: "niagara-region",
      name: "Niagara Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "St. Catharines", "Niagara Falls",
        "Welland", "Thorold", "Grimsby",
        "Lincoln", "Beamsville", "Vineland",
        "Niagara-on-the-Lake", "Fort Erie",
        "Port Colborne", "Pelham", "Fonthill",
        "West Lincoln", "Smithville",
        "Wainfleet", "Crystal Beach",
      ],
    },
    {
      slug: "brant-haldimand-norfolk",
      name: "Brant, Haldimand & Norfolk",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Brantford", "Paris", "Burford",
        "St. George", "Cainsville", "Ohsweken",
        "Caledonia", "Dunnville", "Hagersville",
        "Cayuga", "Jarvis", "Simcoe",
        "Port Dover", "Delhi", "Waterford",
        "Port Rowan", "Langton",
      ],
    },

    // CENTRAL ONTARIO
    {
      slug: "waterloo-region",
      name: "Waterloo Region",
      type: "regional-municipality",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Kitchener", "Waterloo", "Cambridge",
        "Woolwich", "Elmira", "St. Jacobs",
        "Wellesley", "Wilmot", "New Hamburg",
        "Baden", "North Dumfries", "Ayr",
        "Hespeler", "Preston", "Galt",
      ],
    },
    {
      slug: "wellington-county",
      name: "Wellington County & Guelph",
      type: "county",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Guelph", "Fergus", "Elora",
        "Centre Wellington", "Erin", "Hillsburgh",
        "Rockwood", "Puslinch", "Aberfoyle",
        "Mount Forest", "Arthur", "Harriston",
        "Palmerston", "Drayton", "Clifford",
      ],
    },
    {
      slug: "dufferin-county",
      name: "Dufferin County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Orangeville", "Shelburne", "Mono",
        "Grand Valley", "Amaranth",
        "East Garafraxa", "Mulmur", "Melancthon",
      ],
    },
    {
      slug: "simcoe-county",
      name: "Simcoe County & Barrie",
      type: "county",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "Barrie", "Orillia", "Innisfil",
        "Bradford", "Bradford West Gwillimbury",
        "Alliston", "New Tecumseth", "Tottenham",
        "Beeton", "Collingwood", "Wasaga Beach",
        "Midland", "Penetanguishene",
        "Oro-Medonte", "Springwater",
        "Essa", "Angus", "Clearview",
        "Stayner", "Creemore", "Severn",
        "Ramara", "Tiny", "Tay",
        "Coldwater", "Elmvale",
      ],
    },
    {
      slug: "muskoka",
      name: "District of Muskoka",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Bracebridge", "Gravenhurst",
        "Huntsville", "Muskoka Lakes",
        "Port Carling", "Bala", "Georgian Bay",
        "Honey Harbour", "Lake of Bays",
        "Baysville", "Dwight",
      ],
    },
    {
      slug: "grey-bruce",
      name: "Grey & Bruce Counties",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Owen Sound", "Meaford", "Thornbury",
        "The Blue Mountains", "Hanover",
        "Durham", "Markdale", "Flesherton",
        "Wiarton", "Southampton", "Port Elgin",
        "Saugeen Shores", "Kincardine",
        "Walkerton", "Tobermory", "Lion's Head",
        "Chesley", "Paisley", "Teeswater",
      ],
    },
    {
      slug: "kawartha-haliburton",
      name: "Kawartha Lakes & Haliburton",
      type: "municipality",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Lindsay", "Bobcaygeon", "Fenelon Falls",
        "Omemee", "Woodville", "Coboconk",
        "Haliburton", "Minden", "Minden Hills",
        "Dysart et al", "Algonquin Highlands",
        "Highlands East", "Wilberforce",
      ],
    },

    // SOUTHWESTERN ONTARIO
    {
      slug: "london-middlesex",
      name: "London & Middlesex County",
      type: "county",
      province: "ON",
      priority: "primary",
      active: true,
      municipalities: [
        "London", "Strathroy", "Strathroy-Caradoc",
        "Komoka", "Kilworth", "Ilderton",
        "Lucan", "Dorchester", "Thamesford",
        "Parkhill", "Glencoe", "Mount Brydges",
        "Delaware", "Ailsa Craig",
      ],
    },
    {
      slug: "oxford-county",
      name: "Oxford County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Woodstock", "Ingersoll", "Tillsonburg",
        "Norwich", "Tavistock", "Embro",
        "Burgessville", "Drumbo", "Plattsville",
        "Otterville", "Springford",
      ],
    },
    {
      slug: "perth-county",
      name: "Perth County & Stratford",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Stratford", "St. Marys", "Listowel",
        "Mitchell", "Milverton", "Shakespeare",
        "Sebringville", "Atwood", "Monkton",
        "Fullarton",
      ],
    },
    {
      slug: "elgin-county",
      name: "Elgin County & St. Thomas",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "St. Thomas", "Aylmer", "Port Stanley",
        "Dutton", "West Lorne", "Rodney",
        "Belmont", "Springfield", "Vienna",
        "Port Burwell", "Straffordville",
      ],
    },
    {
      slug: "lambton-county",
      name: "Lambton County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Sarnia", "Point Edward", "Petrolia",
        "Corunna", "Forest", "Watford",
        "Wyoming", "Grand Bend", "Thedford",
        "Alvinston", "Oil Springs",
        "Brights Grove",
      ],
    },
    {
      slug: "chatham-kent",
      name: "Chatham-Kent",
      type: "municipality",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Chatham", "Wallaceburg", "Blenheim",
        "Ridgetown", "Tilbury", "Dresden",
        "Thamesville", "Wheatley", "Bothwell",
        "Merlin", "Highgate",
      ],
    },
    {
      slug: "windsor-essex",
      name: "Windsor & Essex County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Windsor", "Tecumseh", "Lakeshore",
        "LaSalle", "Amherstburg", "Essex",
        "Kingsville", "Leamington",
        "Harrow", "Belle River", "Comber",
        "Colchester", "McGregor",
      ],
    },
    {
      slug: "huron-county",
      name: "Huron County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Goderich", "Exeter", "Clinton",
        "Seaforth", "Wingham", "Blyth",
        "Bayfield", "Zurich", "Grand Bend",
        "Brussels", "Hensall", "Dungannon",
      ],
    },

    // EASTERN ONTARIO
    {
      slug: "northumberland",
      name: "Northumberland County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Cobourg", "Port Hope", "Brighton",
        "Campbellford", "Colborne", "Grafton",
        "Hastings", "Warkworth", "Baltimore",
      ],
    },
    {
      slug: "peterborough",
      name: "Peterborough & County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Peterborough", "Lakefield",
        "Bridgenorth", "Ennismore",
        "Havelock", "Norwood", "Millbrook",
        "Keene", "Apsley", "Buckhorn", "Warsaw",
      ],
    },
    {
      slug: "hastings-quinte",
      name: "Hastings & Quinte",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Belleville", "Trenton", "Quinte West",
        "Frankford", "Stirling", "Marmora",
        "Madoc", "Tweed", "Bancroft",
        "Deseronto", "Foxboro", "Cannifton",
      ],
    },
    {
      slug: "prince-edward-county",
      name: "Prince Edward County",
      type: "municipality",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Picton", "Wellington", "Bloomfield",
        "Consecon", "Carrying Place",
        "Ameliasburgh", "Cherry Valley", "Milford",
      ],
    },
    {
      slug: "kingston-frontenac",
      name: "Kingston & Frontenac",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Kingston", "Amherstview", "Bath",
        "Sydenham", "Verona", "Harrowsmith",
        "Sharbot Lake", "Inverary", "Gananoque",
      ],
    },
    {
      slug: "lennox-addington",
      name: "Lennox & Addington",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Napanee", "Greater Napanee",
        "Odessa", "Tamworth", "Yarker",
        "Flinton", "Northbrook", "Kaladar",
      ],
    },
    {
      slug: "leeds-grenville",
      name: "Leeds & Grenville",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Brockville", "Prescott", "Gananoque",
        "Kemptville", "Merrickville",
        "Westport", "Athens", "Cardinal",
        "Spencerville", "Mallorytown",
        "Rockport", "Delta",
      ],
    },
    {
      slug: "ottawa",
      name: "City of Ottawa",
      type: "city",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Ottawa", "Kanata", "Nepean",
        "Orleans", "Barrhaven", "Stittsville",
        "Gloucester", "Vanier", "Manotick",
        "Greely", "Richmond", "Carp",
        "Dunrobin", "Osgoode", "Metcalfe",
        "Rockcliffe Park", "Westboro", "Centretown",
      ],
    },
    {
      slug: "lanark-county",
      name: "Lanark County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Perth", "Carleton Place", "Almonte",
        "Smiths Falls", "Mississippi Mills",
        "Lanark", "Pakenham", "Beckwith",
        "Tay Valley",
      ],
    },
    {
      slug: "renfrew-county",
      name: "Renfrew County",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Pembroke", "Petawawa", "Arnprior",
        "Renfrew", "Deep River", "Barry's Bay",
        "Eganville", "Cobden", "Calabogie",
        "Killaloe", "Chalk River",
      ],
    },
    {
      slug: "prescott-russell",
      name: "Prescott & Russell",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Hawkesbury", "Rockland",
        "Clarence-Rockland", "Casselman",
        "Russell", "Embrun", "Limoges",
        "Alfred", "Plantagenet", "Vankleek Hill",
        "L'Orignal", "Bourget",
      ],
    },
    {
      slug: "stormont-dundas-glengarry",
      name: "Stormont, Dundas & Glengarry",
      type: "county",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Cornwall", "Alexandria", "Maxville",
        "Winchester", "Chesterville",
        "Morrisburg", "Iroquois",
        "Long Sault", "Ingleside",
        "Lancaster", "Williamstown",
      ],
    },

    // NORTHERN ONTARIO
    {
      slug: "parry-sound",
      name: "Parry Sound District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Parry Sound", "Seguin", "Rosseau",
        "Sundridge", "South River",
        "Burk's Falls", "Magnetawan",
        "Powassan", "Dunchurch", "Kearney",
      ],
    },
    {
      slug: "nipissing",
      name: "Nipissing District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "North Bay", "West Nipissing",
        "Sturgeon Falls", "Mattawa",
        "Callander", "Bonfield", "Astorville",
        "Temagami", "Verner",
      ],
    },
    {
      slug: "greater-sudbury",
      name: "Greater Sudbury",
      type: "city",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Sudbury", "Val Caron", "Hanmer",
        "Chelmsford", "Azilda", "Lively",
        "Copper Cliff", "Garson", "Coniston",
        "Capreol", "Dowling",
      ],
    },
    {
      slug: "sudbury-district",
      name: "Sudbury District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Espanola", "French River",
        "Noelville", "Killarney", "Chapleau",
        "Markstay-Warren", "St. Charles",
        "Massey", "Webbwood",
      ],
    },
    {
      slug: "manitoulin",
      name: "Manitoulin District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Little Current", "Gore Bay",
        "Mindemoya", "Manitowaning",
        "Kagawong", "M'Chigeeng",
        "South Baymouth", "Tehkummah",
      ],
    },
    {
      slug: "algoma",
      name: "Algoma District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Sault Ste. Marie", "Wawa",
        "Elliot Lake", "Blind River",
        "Thessalon", "Bruce Mines",
        "Echo Bay", "Desbarats",
        "Spanish", "White River",
        "Hornepayne", "Dubreuilville",
      ],
    },
    {
      slug: "timiskaming",
      name: "Timiskaming District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Temiskaming Shores", "New Liskeard",
        "Haileybury", "Cobalt", "Englehart",
        "Kirkland Lake", "Larder Lake",
        "Earlton", "Elk Lake",
      ],
    },
    {
      slug: "cochrane-district",
      name: "Cochrane District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Timmins", "Cochrane", "Iroquois Falls",
        "Kapuskasing", "Hearst",
        "Smooth Rock Falls", "Moosonee",
        "Matheson", "Moonbeam",
      ],
    },
    {
      slug: "thunder-bay",
      name: "Thunder Bay District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Thunder Bay", "Nipigon",
        "Red Rock", "Schreiber", "Terrace Bay",
        "Marathon", "Manitouwadge",
        "Geraldton", "Longlac", "Nakina",
      ],
    },
    {
      slug: "kenora-district",
      name: "Kenora District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Kenora", "Dryden", "Sioux Lookout",
        "Red Lake", "Ear Falls",
        "Ignace", "Pickle Lake",
        "Vermilion Bay", "Keewatin",
      ],
    },
    {
      slug: "rainy-river",
      name: "Rainy River District",
      type: "district",
      province: "ON",
      priority: "secondary",
      active: true,
      municipalities: [
        "Fort Frances", "Atikokan",
        "Rainy River", "Emo", "Devlin",
        "Barwick", "Mine Centre",
      ],
    },

    // QUEBEC — POTENTIAL COVERAGE
    {
      slug: "outaouais-quebec",
      name: "Outaouais, Quebec",
      type: "district",
      province: "QC",
      priority: "secondary",
      active: false,
      municipalities: [
        "Gatineau", "Hull", "Aylmer",
        "Chelsea", "Cantley", "Val-des-Monts",
        "Wakefield", "Pontiac", "Shawville",
        "Fort-Coulonge", "Maniwaki",
      ],
    },
    {
      slug: "montreal-quebec",
      name: "Greater Montreal, Quebec",
      type: "municipality",
      province: "QC",
      priority: "secondary",
      active: false,
      municipalities: [
        "Montreal", "Laval", "Longueuil",
        "Brossard", "Saint-Lambert",
        "Boucherville", "Terrebonne",
        "Repentigny", "Dorval",
        "Pointe-Claire", "Kirkland",
        "Westmount", "La Prairie",
      ],
    },
    {
      slug: "monteregie-quebec",
      name: "Montérégie, Quebec",
      type: "district",
      province: "QC",
      priority: "secondary",
      active: false,
      municipalities: [
        "Vaudreuil-Dorion", "Hudson",
        "Rigaud", "Salaberry-de-Valleyfield",
        "Châteauguay", "Saint-Jean-sur-Richelieu",
        "Saint-Hyacinthe", "Beloeil",
        "Sorel-Tracy", "Huntingdon",
      ],
    },

    // MANITOBA — POTENTIAL COVERAGE
    {
      slug: "southern-manitoba",
      name: "Southern Manitoba",
      type: "district",
      province: "MB",
      priority: "secondary",
      active: false,
      municipalities: [
        "Winnipeg", "Steinbach", "Selkirk",
        "Portage la Prairie", "Brandon",
        "Winkler", "Morden", "Niverville",
        "Beausejour", "Stonewall",
      ],
    },
  ] satisfies ServiceRegion[],


  /** Add verified profiles only, e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." } */
  socialLinks: [] as NavItem[],

  primaryNavigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Sectors", href: "/sectors" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  footerNavigation: [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Sectors", href: "/sectors" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Request a Quote", href: "/request-quote" },
    { label: "Invite MEK to Bid", href: "/invite-to-bid" },
  ] satisfies NavItem[],

  legalNavigation: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    // { label: "Image credits", href: "/image-credits" },
  ] satisfies NavItem[],

  /** Date the static page copy was last reviewed; used for sitemap lastModified. */
  contentUpdatedAt: "2026-09-29",
} as const;

export type SiteConfig = typeof siteConfig;

export function formatAddressLines(address = siteConfig.address): string[] {
  return [
    address.street,
    `${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`,
    address.countryName,
  ];
}

export function formatAddressInline(address = siteConfig.address): string {
  return `${address.street}, ${address.locality}, ${address.city}, ${address.region} ${address.postalCode}`;
}
