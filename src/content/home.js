/** Home page copy. Source: Content Pack pp. 3-4. */
import { sources } from "./sources";

export const hero = {
  label: "UK REGISTERED · CONNECTED TO INDIA",
  heading: "Connecting Indian food producers with UK and global markets",
  summary:
    "Navora Global helps UK and international food businesses source products from India, including spices, honey, millets and rice. It works with importers, wholesalers, distributors, retailers, food brands and hospitality buyers, and with the Indian producers who supply them. Use Navora when you need an Indian food product, a new supplier, or a route to private label.",
  text: "Navora Global works with farmers, producers and food brands in India to help quality products reach buyers in the UK and international markets. From established ingredients to new consumer products, we create practical connections built on trust, product knowledge and long-term partnership.",
};

/**
 * Short summary directly under the hero: one plain-language definition, who
 * it is for, what is supplied and how an enquiry runs. Search engines and AI
 * assistants extract this kind of block as the page's answer. Restates copy
 * from elsewhere on the site only.
 */
export const atAGlance = {
  kicker: "Navora at a glance",
  heading: "What Navora Global does, in brief",
  summary:
    "Navora Global Limited is a UK-registered food trading and market-access company. It helps importers, distributors, retailers and food-service buyers source food products from India, and helps Indian farmers, producers and food brands reach buyers in the UK and international markets.",
  columns: [
    {
      heading: "Who it is for",
      items: [
        "Importers and distributors",
        "Retailers and wholesalers",
        "Food-service and ingredient buyers",
        "Indian farmers, producers and emerging brands",
      ],
    },
    {
      heading: "What we supply",
      items: [
        "Spices: ginger and cardamom",
        "Honey and Navora Honey Shot",
        "Millets and rice",
        "Private label, where a capable supplier is identified",
      ],
    },
  ],
  steps: {
    heading: "How an enquiry works",
    items: [
      "Share the product, format, approximate quantity and destination market.",
      "Navora confirms whether it has a relevant option or needs to explore one.",
      "Review product information, samples or documents where available.",
      "Agree specification, price, packing and delivery terms in writing.",
    ],
  },
};

export const whoWeAre = {
  kicker: "Who we are",
  heading: "A bridge between trusted origins and new markets",
  text: "Navora Global Limited is registered in the United Kingdom and works closely with a partner company in Kerala. Together, we connect international buyers with a developing network of Indian farmers, suppliers and food brands. Our role is to understand each market requirement, identify suitable products and support clear communication from initial enquiry to commercial discussion.",
  image: "/images/who-we-are-bridge.webp",
  imageAlt: "Agricultural trade and produce review in Kerala",
  illustrative: false,
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
      alt: "Fresh vegetables and fruit in harvest crate",
    },
  ],
};

export const partnership = {
  heading: "Looking for an Indian food product or a route to a new market?",
  answer:
    "Navora can help with both: sourcing from India for buyers, and routes to new markets for Indian producers and brands.",
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
  image: "/images/hero-sourcing.webp",
  imageAlt: "Indian agricultural produce prepared for export",
  items: [
    { icon: "source", label: "Known origin" },
    { icon: "partnership", label: "Direct network" },
    { icon: "company", label: "UK registered" },
  ],
};

/**
 * Five Sourcing & Trade Pillars for commercial partners.
 * Differentiated from About Us corporate values.
 */
export const values = {
  kicker: "Cross-continental trade architecture",
  heading: "Our Sourcing & Trade Pillars",
  lead: "How we connect international buyers with Indian food producers through structured, transparent, and compliant supply chains.",
  items: [
    {
      name: "Direct Origin Network",
      icon: "sourcing",
      code: "01 / Sourcing",
      text: "Direct relationships with verified farmers, producers, and processing partners across India with an operating partner in Kerala.",
    },
    {
      name: "Specification & Standards",
      icon: "quality",
      code: "02 / Standards",
      text: "Rigorous alignment with UK and international food standards, batch documentation, and buyer technical requirements.",
    },
    {
      name: "Commercial Transparency",
      icon: "trust",
      code: "03 / Integrity",
      text: "Clear communication about products, verified origin, availability, pricing structures, and realistic supply timelines.",
    },
    {
      name: "Market Access Bridge",
      icon: "access",
      code: "04 / Market",
      text: "Connecting emerging agricultural producers and unique regional foods with established international wholesale and retail channels.",
    },
    {
      name: "Flexible Procurement",
      icon: "partnership",
      code: "05 / Flexibility",
      text: "Agile commercial models supporting container-load supply, custom packaging formats, or Navora-branded product lines.",
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

/* ===========================================================================
   Answer-first additions: audience, industries, use cases and when to get in
   touch. Restates approved copy; import facts carry dated official sources.
   =========================================================================== */

export const fitForBusiness = {
  kicker: "Who Navora is for",
  heading: "Is Navora right for your business?",
  lead: "Navora is built for businesses that buy, sell or serve food commercially, and for the Indian producers who supply them.",
  items: [
    {
      question: "Which industries does Navora serve?",
      answer:
        "Food import and distribution, wholesale and retail, food service and hospitality, and food brands that use Indian ingredients.",
      points: [
        "Importers and distributors building an Indian range",
        "Wholesalers and retailers, including own-brand ranges",
        "Hotels, restaurants, caterers and ingredient buyers",
        "Food brands exploring private label",
        "Indian farmers, producers and emerging brands",
      ],
    },
    {
      question: "What do businesses use Navora for?",
      answer:
        "To source a named Indian food product, find a new supplier for an existing specification, explore private label, or take an Indian product or brand to a new market.",
      link: { to: "/for-business", label: "Compare wholesale, distribution and private label" },
    },
    {
      question: "When is the right time to contact Navora?",
      answer:
        "Once you know the product, an approximate quantity and the destination market, even if the specification is not final.",
      detail:
        "UK import rules still apply to every order: each product needs a commodity code, and some high-risk food of non-animal origin needs extra border checks.",
      sources: [sources.importSteps, sources.tradeTariff, sources.hrfnao],
    },
    {
      question: "What does Navora need from you to help?",
      answer: "The product, required format, approximate quantity, destination market and timeline.",
      detail: "Missing details are fine at the start; Navora will ask for what it needs to confirm an option.",
      link: { to: "/contact", label: "Start an enquiry" },
    },
  ],
};
