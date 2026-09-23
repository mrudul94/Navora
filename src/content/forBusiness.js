/** For Business page copy. Source: Content Pack p. 7. */
import { sources } from "./sources";

export const hero = {
  heading: "Source Indian food for wholesale, distribution or private label",
  text: "We work with businesses looking to source food products from India and with Indian producers or brands seeking suitable international opportunities. Every enquiry begins with a conversation about the product, market, volume and commercial objective.",
  image: "/images/business-trade.webp",
  imageAlt: "Cartons prepared for export",
  illustrative: false,
};

export const partnerTypes = {
  kicker: "Who we work with",
  heading: "Six kinds of partner, one starting point",
  items: [
    {
      icon: "import",
      name: "Importers and distributors",
      text: "Explore product categories, supplier options and potential longer-term supply relationships.",
    },
    {
      icon: "retail",
      name: "Retailers and wholesalers",
      text: "Discuss retail-ready products, bulk formats, own-brand opportunities and market fit where available.",
    },
    {
      icon: "foodservice",
      name: "Food-service and ingredient buyers",
      text: "Share technical, format, volume and delivery requirements for supplier matching.",
    },
    {
      icon: "farmer",
      name: "Indian farmers and producers",
      text: "Present suitable products to potential buyers and support clearer international communication.",
    },
    {
      icon: "brand",
      name: "Emerging food brands",
      text: "Explore representation, distribution conversations or market-entry connections.",
    },
    {
      icon: "label",
      name: "Private-label partners",
      text: "Discuss product and packaging possibilities only where a capable supplier has been identified.",
    },
  ],
};

export const whatToExpect = {
  kicker: "What to expect",
  heading: "How an enquiry progresses",
  points: [
    "An initial review of your business and product requirement.",
    "A clear response on whether Navora currently has a relevant option or needs to explore one.",
    "Product information, samples or documents where available and appropriate.",
    "Commercial discussion covering specification, quantity, price, packing, delivery terms and lead time.",
    "No supply commitment until the parties agree the relevant commercial terms in writing.",
  ],
};

export const formSection = {
  kicker: "Partnership enquiry",
  heading: "Tell us what you need",
  text: "The more detail you can share about the product, market and volume, the faster we can confirm whether we have a relevant option.",
};

/* ===========================================================================
   Answer-first additions: definitions, a comparison, suitability checklists
   and an FAQ. No promises of supply, price, volume or lead time — those are
   confirmed per enquiry. Regulatory facts carry dated official sources.
   =========================================================================== */

/** Kept from the original hero heading, now shown as the label above the H1. */
export const heroLabel = "Build your next food partnership with Navora";

/** 2-3 sentence answer directly under the H1. */
export const heroSummary =
  "Navora Global helps importers, wholesalers, distributors, retailers, food brands and hospitality buyers in the UK and international markets source food products from India. Choose wholesale when you need bulk supply for your own use or resale, distribution when you want to take a product into a market or channel, and private label when you want an Indian-made product under your own brand.";

export const definitions = {
  kicker: "Plain-language definitions",
  heading: "Wholesale, distribution and private label from India, explained",
  lead: "Three ways a business can work with Navora. Each starts with the same enquiry; they differ in what you receive and whose brand the customer sees.",
  items: [
    {
      question: "What is wholesale sourcing from India?",
      answer:
        "Buying food products in bulk from Indian suppliers, for your own production, kitchens or resale, rather than in single retail packs.",
      detail:
        "Through Navora this currently covers spices (ginger and green cardamom), honey, millets and rice, to a specification you agree before ordering.",
      link: { to: "/products", label: "See the current product range" },
    },
    {
      question: "What is distribution?",
      answer:
        "Taking a product into a market or channel and supplying it on to retailers, wholesalers or food-service customers, usually on a continuing basis.",
      detail:
        "Navora discusses distribution and representation for Indian producers and brands, and connects distributors with products that suit their channel.",
    },
    {
      question: "What is private-label sourcing?",
      answer: "Having a supplier make a product that is sold under your brand rather than the maker's.",
      detail:
        "Navora discusses private label only where a capable supplier has been identified for the product and format you need. In the UK, the business whose name a food is sold under is responsible for its food information, so label content needs to meet UK rules.",
      sources: [sources.packagingLaw, sources.labelling],
    },
    {
      question: "Who is this service for?",
      answer:
        "Importers, wholesalers, distributors, retailers, food brands and hospitality or food-service buyers in the UK and international markets, and the Indian producers and brands that want to reach them.",
      link: { to: "/about", label: "Who Navora is and how it works" },
    },
  ],
};

/** Wholesale vs Distribution vs Private Label. Factual, no promised outcomes. */
export const routeComparison = {
  kicker: "Compare the routes",
  heading: "Wholesale vs distribution vs private label",
  lead: "Pick the column that matches what you sell and whose brand your customer sees.",
  columns: ["Wholesale", "Distribution", "Private label"],
  rows: [
    {
      label: "What you receive",
      cells: [
        "Bulk product to an agreed specification",
        "A product to supply on in your market or channel",
        "A product made by a supplier and sold under your brand",
      ],
    },
    {
      label: "Typical buyer",
      cells: [
        "Importers, wholesalers, food-service and ingredient buyers",
        "Distributors, importers and retailers adding a line",
        "Retailers and food brands",
      ],
    },
    {
      label: "Brand the customer sees",
      cells: ["The supplier's, or none for bulk", "The producer's or brand's", "Yours"],
    },
    {
      label: "What to decide first",
      cells: [
        "Product, grade, format and quantity",
        "Target market, channel and product fit",
        "Product, grade, packaging and label content",
      ],
    },
    {
      label: "What Navora confirms",
      cells: [
        "Specification, samples and available documents",
        "Supplier, continuity of supply and commercial terms",
        "Whether a capable supplier is identified",
      ],
    },
    {
      label: "Minimum quantities",
      cells: [
        "Vary by product and supplier; confirmed on enquiry",
        "Vary by product and supplier; confirmed on enquiry",
        "Vary by product, supplier and packaging; confirmed on enquiry",
      ],
    },
  ],
  note: "Prices, minimum quantities and lead times depend on the product, supplier and destination, and are confirmed per enquiry. Delivery responsibilities are agreed as part of the commercial terms, commonly using Incoterms® rules. Nothing in this table is an offer to supply.",
  sources: [sources.incoterms],
};

export const suitability = {
  kicker: "Is it right for you?",
  heading: "How to judge whether Navora suits your business",
  items: [
    {
      question: "Which route suits my business?",
      answer: "Start from what you sell and whose brand the customer sees.",
      points: [
        "You need bulk ingredients for production, kitchens or resale: wholesale.",
        "You want to add an Indian product or brand to your range or territory: distribution.",
        "You want a product under your own brand: private label.",
        "You are an Indian producer or brand seeking buyers: introduce your business below.",
      ],
    },
    {
      question: "What should I have ready before sourcing?",
      answer: "Enough detail about the product, volume, market and timeline to discuss options.",
      points: [
        "The product, and the grade or format you need",
        "An approximate quantity and how often you will order",
        "The destination country and sales channel",
        "The certifications or documents your customers require",
        "The commodity code and import requirements for your market",
        "Time to review samples before committing",
      ],
      sources: [sources.tradeTariff, sources.importSteps],
    },
    {
      question: "When is Navora probably not the right route yet?",
      answer: "When you need something Navora cannot yet supply or evidence.",
      points: [
        "A category outside the current range. Vegetables and fruits are planned, not yet available.",
        "A certification confirmed before any conversation.",
        "Guaranteed volumes or dates before the specification and terms are agreed.",
      ],
      link: { to: "/responsible-sourcing", label: "How Navora handles evidence and claims" },
    },
    {
      question: "How do I start?",
      answer: "Send the form at the bottom of this page, or a product enquiry from the Contact page.",
      detail:
        "Navora reviews the requirement and replies to say whether it has a relevant option or needs to explore one.",
      link: { to: "/contact", label: "Go to the Contact page" },
    },
  ],
};

/** Visible FAQ, also published as FAQPage structured data. */
export const businessFaq = {
  kicker: "Business buyer questions",
  heading: "Wholesale, distribution and private-label questions",
  lead: "Short answers to what importers, retailers, brands and food-service buyers ask first.",
  items: [
    {
      question: "Can I buy Indian food products wholesale through Navora?",
      short: "Yes. Bulk supply of spices, honey, millets and rice is discussed per enquiry.",
      answer:
        "Share the product, grade or format, approximate quantity and destination market. Navora confirms the specifications, samples and documents available, then quotes on the agreed specification, packing and delivery terms.",
    },
    {
      question: "Does Navora offer private-label food products?",
      short: "Yes, where a capable supplier has been identified for the product and format.",
      answer:
        "Private label is discussed as part of an enquiry. Navora first confirms whether a supplier in its network can make the product to your specification and packaging needs.",
    },
    {
      question: "Can Navora help an Indian brand enter the UK market?",
      short: "Yes. Navora discusses representation, distribution and market-entry connections.",
      answer:
        "Indian producers and emerging brands can introduce their business using the form on this page. Navora reviews the product and discusses suitable buyer conversations; it does not guarantee a listing or a sale.",
    },
    {
      question: "Is there a minimum order for wholesale or private label?",
      short: "Minimums vary by product, supplier and format, and are confirmed on enquiry.",
      answer:
        "For private label, packaging and printing can also set a minimum, so share your expected quantity early.",
    },
    {
      question: "Which markets does Navora supply?",
      short: "The UK and international markets.",
      answer:
        "Navora is UK-registered and discusses supply to the UK and other international markets. Requirements vary by destination, so include the destination country in your enquiry.",
    },
    {
      question: "Is a quotation or sample a commitment to supply?",
      short: "No.",
      answer:
        "A supply commitment arises only when both parties agree the relevant commercial terms in writing.",
    },
  ],
};
