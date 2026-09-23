/** Responsible Sourcing page copy. Source: Content Pack p. 8. */
import { sources } from "./sources";

export const hero = {
  heading: "How Navora approaches responsible food sourcing in India",
  text: "Navora is developing a supply network that values product quality, clear information and respectful business relationships. We want growth to create opportunities for farmers, producers, brands and buyers without making promises that the available evidence cannot support.",
  image: "/images/sourcing-farm.webp",
  imageAlt: "Smallholder farming in India",
  illustrative: false,
};

export const approach = {
  kicker: "Our approach",
  heading: "Five commitments we can stand behind",
  items: [
    {
      icon: "source",
      heading: "Know the source",
      text: "We aim to understand who supplies each product, where it comes from and what information is available about its production and handling.",
    },
    {
      icon: "spec",
      heading: "Agree the requirement",
      text: "Product quality depends on a clear specification. We work from the buyer's stated grade, format, packing, volume and destination needs.",
    },
    {
      icon: "evidence",
      heading: "Request evidence",
      text: "Where relevant, we request available specifications, test reports, certifications and business documents for review.",
    },
    {
      icon: "support",
      heading: "Support smaller businesses",
      text: "We are particularly interested in helping credible small and medium-scale producers and brands access suitable market conversations.",
    },
    {
      icon: "improve",
      heading: "Improve over time",
      text: "Our responsible-sourcing approach will develop as the company gains more supplier data, buyer feedback and operating experience.",
    },
  ],
};

/**
 * Verbatim from the pack. This statement is the legal spine of the page: it is
 * what allows the site to discuss sourcing without making unevidenced claims.
 * Do not soften or paraphrase it.
 */
export const accuracyStatement = {
  heading: "Accuracy statement",
  text: "Certification, farming-method, organic, pesticide-free, ethical-trade and environmental claims will be published only when Navora has current evidence relevant to the named product and supplier.",
};

export const callToAction = {
  heading: "Are you a farmer, producer or food brand interested in working with us?",
  text: "Introduce your business and tell us what you can supply.",
};

export const inspection = {
  image: "/images/sourcing-inspection.webp",
  imageAlt: "Produce being graded and inspected",
  illustrative: false,
};

/* ===========================================================================
   Answer-first additions. Describes practical considerations and what
   Navora does today — never an audit, farm visit, certification, statistic
   or guarantee Navora cannot evidence. Legal facts carry dated sources.
   =========================================================================== */

/** Kept from the original hero heading, now shown as the label above the H1. */
export const heroLabel = "Building responsible supply relationships";

/** 2-3 sentence answer directly under the H1. */
export const heroSummary =
  "At Navora, responsible sourcing means knowing where a product comes from, agreeing a clear specification, asking for evidence and publishing only the claims that evidence supports. It helps importers, retailers, food brands and hospitality buyers make informed supplier decisions, and helps Indian producers present their products credibly. Use this page before choosing a supplier, agreeing a specification or deciding what to say about a product.";

export const meaning = {
  kicker: "The basics",
  heading: "Responsible food sourcing, in plain language",
  items: [
    {
      question: "What is responsible food sourcing?",
      answer:
        "Buying food in a way that lets you show where it came from, that it meets an agreed standard, and that any claim made about it is backed by evidence.",
      detail:
        "It starts with traceability: UK food law requires food businesses to be able to identify who supplied them and which businesses they supplied, often called one step back, one step forward.",
      sources: [sources.traceability],
    },
    {
      question: "What does responsible sourcing mean at Navora?",
      answer:
        "Five working commitments: know the source, agree the requirement, request evidence, support smaller businesses and improve over time.",
      detail:
        "They describe how Navora works today. They are not a certification scheme, and Navora does not present them as one.",
    },
    {
      question: "Who does this approach help?",
      answer:
        "Buyers who need to justify supplier choices, and Indian producers and brands who want to be assessed on clear information.",
      points: [
        "Importers and distributors checking a new supply route",
        "Retailers and wholesalers with customer or label requirements",
        "Food brands preparing a private-label product",
        "Hospitality and food-service buyers who describe origin on menus",
        "Indian farmers, producers and brands presenting their products",
      ],
    },
    {
      question: "Which food-trade decisions does it support?",
      answer:
        "Choosing a supplier, agreeing a specification, deciding what can be said on a label or menu, and deciding whether to continue a supply relationship.",
      link: { to: "/for-business", label: "Compare wholesale, distribution and private label" },
    },
  ],
};

export const considerations = {
  kicker: "Practical considerations",
  heading: "What to look at when sourcing food from India",
  lead: "Six areas Navora works through with buyers. None of them is a guarantee; each is something to ask about and see evidence for.",
  items: [
    {
      question: "How is the origin of a product established?",
      answer:
        "By identifying the supplier, the region where the product is grown or made, and what is known about its production and handling.",
      points: [
        "Supplier name and location",
        "Growing or production region",
        "Whether the supplier grows, processes or trades the product",
      ],
    },
    {
      question: "What does traceability mean for an imported food?",
      answer:
        "Being able to name who supplied each lot and whom it was supplied to, with batch or lot references on the paperwork.",
      points: [
        "Batch or lot numbers on packs and documents",
        "Records linking each consignment to its supplier",
        "A named contact who can answer questions about a lot",
      ],
      sources: [sources.traceability],
    },
    {
      question: "Which documents should a buyer expect to review?",
      answer:
        "Those your product and market require: usually a specification and, where relevant, test reports, certificates and commercial documents.",
      points: [
        "Product specification",
        "Test reports for the product, where relevant",
        "Certificates held by the supplier, checked for scope and expiry date",
        "Any documents needed at the border for your product",
      ],
      sources: [sources.hrfnao, sources.importSteps],
    },
    {
      question: "How is product quality agreed?",
      answer:
        "Through a written specification covering grade, format, packing, volume and destination, and samples reviewed against it before terms are agreed.",
      link: { to: "/products", label: "Download product sheets" },
    },
    {
      question: "What should supplier communication look like?",
      answer:
        "Clear and in writing about product, origin, documentation, availability and terms, including what is not yet known.",
    },
    {
      question: "How do you judge suitability for your market?",
      answer:
        "Check the product against the destination's food law, labelling and allergen rules, and against what your own customers require.",
      points: [
        "Commodity code and any extra import checks",
        "Label content required in the destination market",
        "Allergen information for the product",
        "Certifications your customers ask for",
      ],
      sources: [sources.labelling, sources.allergens],
    },
  ],
};

export const buyerChecklist = {
  kicker: "Before you source",
  heading: "What to ask before sourcing, and how to read the answers",
  items: [
    {
      question: "What should I ask a supplier before sourcing?",
      answer: "Ask questions that can be answered with documents, not general assurances.",
      points: [
        "Who grows or makes the product, and where?",
        "How is the batch or lot I will receive identified?",
        "Can I see the specification, and a sample from a comparable lot?",
        "Which certificates are held, by whom, for which product, and until when?",
        "Are recent test reports available for this product?",
        "What packing, labelling and shelf-life information is available?",
        "What quantities and lead times are realistic?",
      ],
    },
    {
      question: "How can a buyer assess sourcing transparency?",
      answer:
        "By checking whether the answers come in writing, with current documents that name the same product and supplier you are buying from.",
      points: [
        "Documents name the supplier and product you are buying",
        "Certificates are in date and cover the product in question",
        "Gaps are stated openly rather than filled with general claims",
        "Claims on the pack match the evidence provided",
      ],
      link: { to: "/contact", label: "Ask Navora about a product" },
    },
  ],
};

/** Visible FAQ, also published as FAQPage structured data. */
export const sourcingFaq = {
  kicker: "Sourcing questions",
  heading: "Questions about how Navora sources",
  lead: "Direct answers on certification, audits, traceability and producers.",
  items: [
    {
      question: "Are Navora's products certified organic or fair trade?",
      short: "Not as a general claim. Certifications are confirmed per product and supplier.",
      answer:
        "Navora publishes a certification, organic, farming-method or ethical-trade claim only when it holds current evidence relevant to the named product and supplier. Ask about the certifications your market needs when you enquire.",
    },
    {
      question: "Does Navora audit its suppliers?",
      short: "Navora reviews supplier information and documents; it does not claim audits it cannot evidence.",
      answer:
        "Navora aims to understand who supplies each product and, where relevant, requests available specifications, test reports, certifications and business documents for buyer review.",
    },
    {
      question: "Can I trace a product back to the farm?",
      short: "It depends on the product and supplier; ask what traceability information is available.",
      answer:
        "Some products pass through collectors or processors before export, so the information available varies. Navora tells you what is known about each product's source and handling, and does not fill gaps with general claims.",
    },
    {
      question: "How does Navora support small farmers and producers?",
      short: "By helping credible small and medium-scale producers and brands reach suitable buyer conversations.",
      answer:
        "Navora presents suitable products to potential buyers and supports clearer international communication. It does not guarantee sales or prices to producers.",
    },
    {
      question: "Will Navora's responsible-sourcing approach change?",
      short: "Yes. It will develop as Navora gains supplier data, buyer feedback and operating experience.",
      answer:
        "Any new claim, such as a certification or sourcing standard, will be published only when Navora holds evidence for it.",
    },
    {
      question: "I am a producer. How do I introduce my business?",
      short: "Use the business enquiry form and tell us what you can supply.",
      answer:
        "Include the product, where it is grown or made, available formats and quantities, and any certifications or test reports you hold. Navora reviews each introduction against current buyer requirements.",
    },
  ],
};
