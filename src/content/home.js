/** Home page copy. Source: Content Pack pp. 3-4. */

export const hero = {
  label: "UK REGISTERED · CONNECTED TO KERALA, INDIA",
  heading: "From Kerala's farms to global shelves",
  lead: "Connecting Indian food producers with global markets",
  text: "Navora Global works with farmers, producers and food brands in India to help quality products reach buyers in the UK and international markets. From established ingredients to new consumer products, we create practical connections built on trust, product knowledge and long-term partnership.",
  image: "/images/hero-main.jpg",
  imageAlt: "Produce sourced in Kerala, prepared for export",
  illustrative: true,
};

export const whoWeAre = {
  kicker: "Who we are",
  heading: "A bridge between trusted origins and new markets",
  text: "Navora Global Limited is registered in the United Kingdom and works closely with a partner company in Kerala. Together, we connect international buyers with a developing network of Indian farmers, suppliers and food brands. Our role is to understand each market requirement, identify suitable products and support clear communication from initial enquiry to commercial discussion.",
  image: "/images/about-origin.jpg",
  imageAlt: "Produce being reviewed with a supplier",
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
      image: "/images/categories/spices.jpg",
      alt: "Ginger and cardamom",
    },
    {
      name: "Honey and honey products",
      slug: "honey-products",
      image: "/images/categories/honey.jpg",
      alt: "Honey",
    },
    {
      name: "Millets and grains",
      slug: "millets-grains",
      image: "/images/categories/millets.jpg",
      alt: "Millets",
    },
    {
      name: "Rice",
      slug: "rice",
      image: "/images/categories/rice.jpg",
      alt: "Rice grains",
    },
    {
      name: "Future fresh produce",
      slug: "future-categories",
      image: "/images/categories/produce.jpg",
      alt: "Vegetables and fruit",
    },
  ],
};

export const partnership = {
  heading: "Looking for an Indian food product or a route to a new market?",
  text: "Tell us what you buy, sell or produce. We welcome enquiries from importers, distributors, retailers, food-service businesses, producers and emerging brands.",
};

/* ===========================================================================
   Sections added in the 2026 redesign
   =========================================================================== */

/** Trust strip, directly under the hero. Every item is verifiable. */
export const trustStrip = [
  { icon: "company", label: "UK Registered Company" },
  { icon: "sourcing", label: "Kerala Sourcing Partner" },
  { icon: "product", label: "6 Product Lines" },
  { icon: "partnership", label: "Bulk, Retail & Private Label" },
];

/**
 * Honey Shot spotlight.
 *
 * Copy is taken from the existing approved product record only. The feature
 * points below each restate something already published. A composition claim
 * such as "pure honey" is deliberately NOT included: it describes what is in
 * the product and needs confirming against the real specification first.
 * Add it to `featuresToConfirm` once verified.
 */
export const honeyShot = {
  eyebrow: "NAVORA BRAND",
  heading: "Navora Honey Shot",
  subheading:
    "A convenient single-serve format for enjoying honey wherever the day takes you",
  text: "Navora Honey Shot is developed and marketed under the Navora brand. The portable single-serve format is designed for convenient use and for business partners seeking an easy-to-carry honey product.",
  features: [
    { icon: "product", label: "Single-serve format" },
    { icon: "brand", label: "Developed under the Navora brand" },
    { icon: "import", label: "Easy to carry and distribute" },
  ],
  /** Claims awaiting confirmation — nothing here is rendered. */
  featuresToConfirm: [
    "REPLACE_CONFIRM_COMPOSITION", // e.g. "100% pure honey" — needs the spec
    "REPLACE_CONFIRM_NET_QUANTITY",
    "REPLACE_CONFIRM_SHELF_LIFE",
  ],
  comingSoon: "Coming soon: Navora Honey Candy",
  image: "/images/honey-shot.jpg",
  imageAlt: "Navora Honey Shot single-serve pack",
  slug: "navora-honey-shot",
};

/** How it works — four steps. */
export const howItWorks = {
  kicker: "How it works",
  heading: "From first enquiry to ongoing supply",
  steps: [
    {
      step: "01",
      heading: "Share your requirement",
      text: "Tell us the product, format, quantity and destination market.",
    },
    {
      step: "02",
      heading: "We match suppliers",
      text: "We identify suitable suppliers through our Kerala partner network.",
    },
    {
      step: "03",
      heading: "Samples & documentation",
      text: "We gather specifications, samples and the certificates available for that product.",
    },
    {
      step: "04",
      heading: "Commercial discussion & supply",
      text: "Pricing, packing, logistics and ongoing support once terms are agreed.",
    },
  ],
};

/** Full-width image band. */
export const imageBand = {
  image: "/images/texture-band.jpg",
  imageAlt: "Spices and grain sourced in Kerala",
  line: "Rooted in Kerala. Built for international trade.",
};

/** Compact founders block on the home page. */
export const foundersPreview = {
  kicker: "The team",
  heading: "Meet the founders",
};
