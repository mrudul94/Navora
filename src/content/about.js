import { site } from "../config/site";

/** About Us page copy. Source: Content Pack pp. 2, 4-5. */

export const hero = {
  heading: "A UK-registered company connecting food buyers with India",
  text: "Navora Global Limited was established in the United Kingdom to create stronger commercial links between Indian food producers and international buyers. Our partner company in Kerala provides local market understanding and helps us build relationships with farmers, suppliers and food brands.",
  image: "/images/about-partnership.webp",
  imageAlt: "Produce being reviewed ahead of a commercial discussion",
  illustrative: false,
};

export const story = {
  kicker: "Our story",
  heading: "Closing the gap between producer and buyer",
  paragraphs: [
    "India produces an exceptional range of spices, honey, grains, rice and other foods, yet many smaller producers and growing brands find it difficult to reach suitable buyers outside their home market. International buyers can face a different challenge: finding credible contacts, understanding product options and maintaining clear communication across markets.",
    "Navora was created to help close that gap. We combine a UK business presence with on-the-ground relationships in Kerala and India. This allows us to listen to buyer requirements, explore suitable supply options and create direct conversations with producers and brands.",
    "We are building the company carefully. Our current focus includes ginger, cardamom, honey, Honey Shot, millets and rice. Over time, we intend to add selected vegetables, fruits and other products where quality, supply and market demand are aligned.",
  ],
  image: "/images/about-story-origin.webp",
  imageAlt: "Spice and produce harvest in an agro-forestry farm in Kerala",
  illustrative: false,
};

export const model = {
  kicker: "What makes our model different",
  heading: "A UK company with working roots in India",
  points: [
    "A UK-registered company for international business development and communication.",
    "A partner company in Kerala with local relationships and market knowledge.",
    "A focus on small and medium-scale farmers, producers and brands as well as established suppliers.",
    "A flexible product-led approach based on the buyer's actual requirements.",
    "Navora-owned product development alongside third-party sourcing and market connection.",
  ],
};

export const purpose = {
  kicker: "Our purpose",
  heading: "Wider access, fairer opportunity",
  text: "We want more people to have access to quality food from India, and we want credible producers to have a fair opportunity to reach wider markets. We aim to grow through transparent communication, realistic commitments and partnerships that create value for both sides.",
};

export const missionVision = [
  {
    heading: "Mission",
    text: "To make quality Indian food products more accessible to international buyers while creating fairer market opportunities for farmers, producers and growing food brands.",
  },
  {
    heading: "Vision",
    text: "To build a trusted route between Indian food producers and global markets, with relationships that support quality, transparency and long-term growth.",
  },
];

export const values = {
  kicker: "Our values",
  heading: "What we hold ourselves to",
  items: [
    {
      name: "Trust",
      text: "We communicate clearly about products, origin, documentation, availability and commercial terms.",
    },
    {
      name: "Quality",
      text: "We work with suppliers who can meet agreed product specifications and buyer requirements.",
    },
    {
      name: "Partnership",
      text: "We aim to build lasting relationships with farmers, producers, brands and buyers.",
    },
    {
      name: "Access",
      text: "We help smaller and medium-scale businesses reach opportunities that may otherwise be difficult to enter.",
    },
    {
      name: "Responsible growth",
      text: "We expand carefully and avoid claims or commitments that cannot be supported.",
    },
  ],
};

export const howWeWork = {
  kicker: "How we work",
  heading: "From first enquiry to long-term supply",
  steps: [
    {
      step: "01",
      heading: "Understand",
      text: "We learn about the required product, specification, volume, market and intended use.",
    },
    {
      step: "02",
      heading: "Identify",
      text: "We discuss suitable options with our partner and supplier network in India.",
    },
    {
      step: "03",
      heading: "Verify",
      text: "We gather the available product information, samples and documentation for buyer review.",
    },
    {
      step: "04",
      heading: "Connect",
      text: "We support direct commercial discussions on pricing, quantities, packaging and delivery.",
    },
    {
      step: "05",
      heading: "Develop",
      text: "Where there is a strong fit, we work towards a longer-term supply or market partnership.",
    },
  ],
};

export const leadership = {
  kicker: "Leadership & Founders",
  heading: "The team behind Navora Global",
  lead: "Founded on direct cross-continental partnership, connecting authentic Kerala agriculture with international markets.",
  founders: [
    {
      name: "Albert Jose",
      initials: "AJ",
      role: "Co-Founder & Director",
      location: "United Kingdom",
      focus: "Global Markets & Trade Relations",
      bio: "Overseeing international trade architecture, commercial buyer partnerships, and overseas distribution channels across the UK and international markets.",
      email: site.albertEmail,
    },
    {
      name: "Abhinav R Kurup",
      initials: "AK",
      role: "Co-Founder & Chief Financial Officer",
      location: "United Kingdom",
      focus: "Financial Management & Corporate Strategy",
      bio: "Leading financial governance, corporate strategy, commercial planning, and capital allocation to drive sustainable cross-border trade and partnerships for Navora Global.",
      email: site.abhinavEmail,
    },
  ],
};

/* ===========================================================================
   Answer-first additions. Everything below restates facts already on the site
   or on the public Companies House record — no new claims.
   =========================================================================== */

/** Kept from the original hero heading, now shown as the label above the H1. */
export const heroLabel = "Built in the UK and connected to India";

/** 2-3 sentence answer directly under the H1: who, for whom, for what. */
export const heroSummary =
  "Navora Global Limited is a UK-registered food trading and market-access company that works with a partner company in Kerala, India. It serves importers, wholesalers, distributors, retailers, food brands and hospitality buyers in the UK and international markets. Businesses use Navora to source Indian spices, honey, millets and rice, to explore private label, and to reach Indian producers and brands directly.";

export const inBrief = {
  kicker: "Navora in brief",
  heading: "Quick answers about who we are",
  items: [
    {
      question: "What does Navora Global do?",
      answer:
        "Navora helps business buyers in the UK and international markets source food products from India, and helps Indian producers and brands reach those buyers.",
      detail:
        "It learns each buyer's requirement, identifies suitable products through its partner and supplier network in India, gathers product information and documents, and supports the commercial discussion.",
      link: { to: "/products", label: "See the current product range" },
    },
    {
      question: "Who does Navora work with?",
      answer:
        "Importers, wholesalers, distributors, retailers, food brands and hospitality or food-service buyers, and the Indian farmers, producers and brands that supply them.",
      link: { to: "/for-business", label: "How Navora works with businesses" },
    },
    {
      question: "Where is Navora based?",
      answer: `In the United Kingdom, with an operating partner in Kerala, India.`,
      detail: `${site.legalName} is registered in ${site.jurisdiction}, with its registered office at ${site.registeredOffice}.`,
    },
    {
      question: "When should a buyer contact Navora?",
      answer:
        "When you have an Indian food product, an approximate quantity and a destination market in mind, or want to explore private label or a new supply route.",
      detail: "The specification does not need to be final. Navora will confirm whether it has a relevant option or needs to explore one.",
      link: { to: "/contact", label: "Send an enquiry" },
    },
  ],
};

/** Decision support: whether Navora is the right route for a buyer. */
export const fit = {
  kicker: "Decision support",
  heading: "Is Navora the right partner for you?",
  lead: "Navora suits businesses that buy, sell or make food and want a direct, documented route to or from India.",
  items: [
    {
      question: "When is Navora a good fit?",
      answer: "When your requirement matches the current range and you value direct, documented contact with the supply side.",
      points: [
        "You buy or distribute food commercially in the UK or another international market.",
        "You need spices, honey, millets or rice from India, or a closely related product.",
        "You want clear information on origin, specification and documentation before agreeing terms.",
        "You want to explore private label and are happy for Navora to confirm a capable supplier first.",
        "You are an Indian producer or brand looking for international buyers.",
      ],
    },
    {
      question: "When might Navora not be the right route yet?",
      answer: "When you need something Navora cannot yet supply or evidence.",
      points: [
        "A category outside the current range. Vegetables and fruits are planned, not yet available.",
        "A certification confirmed before any conversation. Certifications are confirmed per product and supplier on enquiry.",
        "Guaranteed volumes or delivery dates before the specification and terms are discussed.",
        "An online shop. Every order starts as an enquiry.",
      ],
      link: { to: "/responsible-sourcing", label: "How Navora handles claims and evidence" },
    },
  ],
};

/** Visible FAQ, also published as FAQPage structured data on the About page. */
export const aboutFaq = {
  kicker: "About Navora",
  heading: "Questions about the company",
  lead: "What buyers and producers usually ask before working with a new trading partner.",
  items: [
    {
      question: "Is Navora Global a registered company?",
      short: `Yes. ${site.legalName} is a company registered in ${site.jurisdiction}.`,
      answer: `It was incorporated on ${site.incorporated} and its registered office is ${site.registeredOffice}. The record is public on the Companies House register.`,
    },
    {
      question: "Who founded Navora Global?",
      short: "Albert Jose and Abhinav R Kurup, both based in the United Kingdom.",
      answer:
        "Albert Jose is Co-Founder and Director, responsible for global markets and trade relations. Abhinav R Kurup is Co-Founder and Chief Financial Officer, responsible for financial management and corporate strategy.",
    },
    {
      question: "What is Navora's connection to Kerala?",
      short: "Navora works with a partner company in Kerala that provides local knowledge and supplier relationships.",
      answer:
        "The partner helps Navora understand local markets and build relationships with farmers, suppliers and food brands in Kerala and wider India, while Navora handles international business development and communication from the UK.",
    },
    {
      question: "Is Navora a food manufacturer?",
      short: "Not of supplier products. Those are made by partner suppliers in India.",
      answer:
        "Navora-brand products, such as Navora Honey Shot, are developed and marketed under the Navora name. Every product on the site is labelled Navora Brand or Supplier Product so the maker is clear.",
    },
    {
      question: "Does Navora work with small producers?",
      short: "Yes. Small and medium-scale farmers, producers and brands are a particular focus.",
      answer:
        "Navora also works with established suppliers, but helping credible smaller producers and growing brands reach suitable buyers is part of why the company was set up.",
    },
    {
      question: "How do I start working with Navora?",
      short: "Send an enquiry with the product, approximate quantity and destination market.",
      answer: `Use the contact form or email ${site.email}. Navora reviews the requirement and confirms whether it has a relevant option. No supply commitment is made until both parties agree terms in writing.`,
    },
  ],
};
