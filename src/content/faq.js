import { site } from "../config/site";

/**
 * Frequently asked questions, shown on the Home page and published as
 * FAQPage structured data. `sources` are optional links to official
 * guidance, shown under the answer. `short` is the one-line direct answer
 * shown first; answer engines quote it on its own, so keep it self-contained.
 *
 * Written so each answer stands on its own: search engines and AI assistants
 * quote them directly. Every answer restates copy already approved elsewhere
 * on the site — do not add claims here that the Content Pack does not make.
 */
export const faq = {
  kicker: "Questions",
  heading: "Frequently asked questions",
  lead: "Straight answers for buyers, producers and brands considering working with Navora.",
  items: [
    {
      question: "What does Navora Global do?",
      short: "Navora connects Indian food producers with business buyers in the UK and worldwide.",
      answer:
        "Navora Global Limited is a UK-registered food trading and market-access company. It connects Indian farmers, food producers and brands with importers, distributors, retailers, food-service businesses and other business buyers in the UK and international markets.",
    },
    {
      question: "Where is Navora Global based?",
      short: "In the UK, with an operating partner in Kerala, India.",
      answer: `Navora Global Limited is registered in ${site.jurisdiction}, with its registered office at ${site.registeredOffice}. It works closely with a partner company in Kerala, India, which provides local market knowledge and relationships with farmers, suppliers and food brands.`,
    },
    {
      question: "Which Indian food products can Navora supply?",
      short: "Ginger, cardamom, honey, millets and rice, plus Navora Honey Shot.",
      answer:
        "Navora's current network includes suppliers of ginger, cardamom, honey, millets and rice, alongside Navora Honey Shot, its own branded product. Navora Honey Candy is coming soon, and selected vegetables, fruits and other food categories are planned as supplier and buyer relationships grow.",
    },
    {
      question: "Who does Navora work with?",
      short: "Business buyers of food, and the Indian producers and brands that supply them.",
      answer:
        "Navora works with importers and distributors, retailers and wholesalers, food-service and ingredient buyers, Indian farmers and producers, emerging food brands and private-label partners.",
    },
    {
      question: "Does Navora offer bulk supply or private label?",
      short: "Yes. Both are discussed as part of an enquiry.",
      answer:
        "Yes, as part of a commercial discussion. Navora covers bulk supply, distribution, retail, food service, private label and brand representation. Private-label products are discussed only where a capable supplier has been identified.",
    },
    {
      question: "Does Navora manufacture the products it sells?",
      short: "No. Supplier products are made by partner suppliers; Navora-brand products are developed and marketed by Navora.",
      answer:
        "Navora-brand products, such as Navora Honey Shot, are developed and marketed under the Navora name. Supplier products are made by Navora's partner suppliers in India. Navora is not the manufacturer of supplier products, and each product on the site is labelled accordingly.",
    },
    {
      question: "What is the minimum order quantity?",
      short: "It varies by product and supplier, and is confirmed on enquiry.",
      answer:
        "Minimum order quantities, formats, packaging and lead times vary by product, supplier and destination market. They are confirmed during the enquiry, once Navora understands the product and volume you need.",
    },
    {
      question: "Are Navora's products certified?",
      short: "It depends on the product and supplier; certifications are confirmed on enquiry.",
      answer:
        "Certification depends on the individual product and supplier. Navora publishes a certification only when it holds current evidence for the named product and supplier. Ask about the certifications and documentation your market requires when you enquire.",
    },
    {
      question: "What rules apply to importing Indian food into the UK?",
      short: "UK food law applies, with extra border checks for some high-risk foods.",
      answer:
        "Food imported into Great Britain must meet UK food law, and some food of non-animal origin is classed as high-risk and needs extra border checks. The Food Standards Agency publishes the current requirements. On the Indian side, APEDA promotes agricultural and processed food exports and the Spices Board India supports spice exports. Navora discusses the documentation your market requires as part of each enquiry.",
      sources: [
        {
          label: "Food Standards Agency: importing high-risk food of non-animal origin",
          href: "https://www.food.gov.uk/business-guidance/importing-high-risk-food-and-feed-of-non-animal-origin-hrfnao-into-great-britain",
        },
        { label: "APEDA (India)", href: "https://apeda.gov.in/" },
        { label: "Spices Board India", href: "https://www.indianspices.com/" },
      ],
    },
    {
      question: "How do I start an enquiry with Navora?",
      short: "Send the product, quantity and destination market through the contact form or by email.",
      answer: `Use the contact form on this website or email ${site.email}. Include the product, required format, approximate quantity and destination market. Navora reviews the requirement, confirms whether it has a relevant option, and shares product information, samples or documents where available. No supply commitment is made until both parties agree commercial terms in writing.`,
    },
  ],
};
