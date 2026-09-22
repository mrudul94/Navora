/** Home page copy. Source: Content Pack pp. 3-4. */

export const hero = {
  label: "UK REGISTERED · CONNECTED TO INDIA",
  heading: "Connecting Indian food producers with global markets",
  text: "Navora Global works with farmers, producers and food brands in India to help quality products reach buyers in the UK and international markets. From established ingredients to new consumer products, we create practical connections built on trust, product knowledge and long-term partnership.",
  image: "/images/hero-sourcing.webp",
  imageAlt: "Indian agricultural produce prepared for export",
  illustrative: true,
};

export const whoWeAre = {
  kicker: "Who we are",
  heading: "A bridge between trusted origins and new markets",
  text: "Navora Global Limited is registered in the United Kingdom and works closely with a partner company in Kerala. Together, we connect international buyers with a developing network of Indian farmers, suppliers and food brands. Our role is to understand each market requirement, identify suitable products and support clear communication from initial enquiry to commercial discussion.",
  image: "/images/about-partnership.webp",
  imageAlt: "Two people reviewing produce samples together",
  illustrative: true,
};

export const whatWeOffer = {
  kicker: "What we offer",
  heading: "Four ways we work with businesses",
  cards: [
    {
      icon: "sourcing",
      heading: "Sourcing from India",
      text: "Access to selected food products through trusted suppliers and producer relationships, with a particular connection to Kerala.",
    },
    {
      icon: "market",
      heading: "Market connections",
      text: "Introductions and commercial support for buyers, distributors, retailers and brands exploring new markets.",
    },
    {
      icon: "product",
      heading: "Navora products",
      text: "Consumer products developed and marketed under the Navora name, starting with Honey Shot and a forthcoming honey candy.",
    },
    {
      icon: "partnership",
      heading: "Business partnerships",
      text: "Flexible conversations covering bulk supply, distribution, retail, food service, private label and brand representation.",
    },
  ],
};

export const productCategories = {
  kicker: "Product categories",
  heading: "Products from trusted Indian sources",
  text: "Our current network includes suppliers of ginger, cardamom, honey, Honey Shot, millets and rice. We plan to expand into selected vegetables, fruits and other food categories as our supplier and buyer relationships grow.",
  labels: [
    {
      name: "Spices",
      slug: "spices",
      image: "/images/category-spices.webp",
      alt: "Ginger and cardamom",
    },
    {
      name: "Honey and honey products",
      slug: "honey-products",
      image: "/images/category-honey.webp",
      alt: "Honey",
    },
    {
      name: "Millets and grains",
      slug: "millets-grains",
      image: "/images/category-millets.webp",
      alt: "Millets",
    },
    {
      name: "Rice",
      slug: "rice",
      image: "/images/category-rice.webp",
      alt: "Rice grains",
    },
    {
      name: "Future fresh produce",
      slug: "future-categories",
      image: "/images/category-produce.webp",
      alt: "Vegetables and fruit",
    },
  ],
};

export const partnership = {
  heading: "Looking for an Indian food product or a route to a new market?",
  text: "Tell us what you buy, sell or produce. We welcome enquiries from importers, distributors, retailers, food-service businesses, producers and emerging brands.",
};

/* ===========================================================================
   Trade-house theme — supporting data.

   Everything below is either verbatim Content Pack copy or a neutral design
   label. No new claim about certification, testing, volumes or performance is
   introduced here. See the note in README under "Content rules".
   =========================================================================== */

/** Thin bar above the header. Both lines are Content Pack wording. */
export const announcement = {
  primary: "UK-registered food trading & market access",
  secondary:
    "Connecting trusted Indian farmers & emerging brands with international buyers",
};

/**
 * Three facts beneath the hero buttons.
 *
 * Deliberately NOT metrics. The Content Pack forbids invented statistics, so
 * these state only what is already published elsewhere on the site: the
 * company is UK-registered, the operating partner is in Kerala, and the
 * catalogue currently spans six product lines.
 */
export const heroFacts = [
  { value: "UK", label: "Registered company" },
  { value: "Kerala", label: "Operating partner" },
  { value: "Six", label: "Product lines" },
];

/** Small panel beside the hero. Labels only, no claims. */
export const heroPanel = {
  caption: "Kerala, India · Malabar Coast",
  image: "/images/sourcing-farm.webp",
  imageAlt: "Farmland in Kerala",
  items: [
    { icon: "source", label: "Known origin" },
    { icon: "partnership", label: "Direct network" },
    { icon: "company", label: "UK registered" },
  ],
};

/**
 * The Content Pack's five values (p. 2), shown as a card grid.
 * Names and descriptions are verbatim; the icon and sequence label are design.
 */
export const values = {
  kicker: "Cross-continental trade architecture",
  items: [
    {
      name: "Trust",
      icon: "verified",
      code: "01 / Foundation",
      text: "We communicate clearly about products, origin, documentation, availability and commercial terms.",
    },
    {
      name: "Quality",
      icon: "spec",
      code: "02 / Standard",
      text: "We work with suppliers who can meet agreed product specifications and buyer requirements.",
    },
    {
      name: "Partnership",
      icon: "partnership",
      code: "03 / Synergy",
      text: "We aim to build lasting relationships with farmers, producers, brands and buyers.",
    },
    {
      name: "Access",
      icon: "market",
      code: "04 / Route",
      text: "We help smaller and medium-scale businesses reach opportunities that may otherwise be difficult to enter.",
    },
    {
      name: "Responsible growth",
      icon: "improve",
      code: "05 / Stewardship",
      text: "We expand carefully and avoid claims or commitments that cannot be supported.",
    },
  ],
};

/** Sequence labels and footer tags for the pack's four "What we offer" cards. */
export const capabilityMeta = [
  { code: "01 / Origin", foot: "Direct supplier relationships" },
  { code: "02 / Bridge", foot: "Buyer introductions" },
  { code: "03 / Branded", foot: "Honey Shot & confectionery" },
  { code: "04 / Scale", foot: "Bulk, retail & private label" },
];

export const capabilityIntro =
  "Sourcing, market introductions, Navora-branded products and flexible partnership routes — from first enquiry through to commercial discussion.";
