/** Contact page copy. Source: Content Pack pp. 8-9. */
import { site } from "../config/site";
import { sources } from "./sources";

export const hero = {
  heading: "Contact Navora about sourcing, wholesale or partnerships",
  text: "Whether you are looking for a product, exploring a distribution opportunity or introducing your food business, send us the relevant details. We will review your enquiry and respond as soon as reasonably possible.",
  image: "/images/contact-desk.webp",
  imageAlt: "A desk prepared for a business discussion",
  illustrative: false,
};

/** Enquiry categories, also used as the options of the Enquiry type field. */
export const enquiryCategories = [
  "Buying or sourcing enquiry",
  "Distribution or retail partnership",
  "Farmer or supplier introduction",
  "Brand market-entry enquiry",
  "Navora product enquiry",
  "General enquiry",
];

export const detailsSection = {
  kicker: "Contact details",
  heading: "How to reach us",
};

export const formSection = {
  kicker: "Send an enquiry",
  heading: "Tell us how we can help",
};

/** Shown beneath the Contact form. Source: p. 9. */
export const privacyText =
  "We will use your details to respond to your enquiry and manage any related business communication. See our Privacy Notice for more information.";

/* ===========================================================================
   Answer-first additions. Describes the enquiry process as it actually runs:
   no promised response time, results, certifications or commitments.
   =========================================================================== */

/** Kept from the original hero heading, now shown as the label above the H1. */
export const heroLabel = "Start a conversation with Navora";

/** 2-3 sentence answer directly under the H1. */
export const heroSummary =
  "Contact Navora if your business imports, distributes, sells or serves food and wants products from India, or if you are an Indian producer or brand looking for international buyers. You can enquire about Indian food-product sourcing, wholesale supply, distribution, private label, partnerships and Navora's own products.";

export const beforeYouContact = {
  kicker: "Before you contact us",
  heading: "What makes an enquiry easy to answer",
  lead: "A rough idea is enough to start. The more of this you can share, the more useful the first reply.",
  items: [
    {
      question: "What should I have ready before I contact Navora?",
      answer: "The product, market, quantity and timeline, even if some are approximate.",
      points: [
        "Product interest: name, grade or format",
        "Expected market and sales channel",
        "Destination country",
        "Approximate quantity and how often you will order",
        "Packaging or private-label needs",
        "Certifications or documents your market requires",
        "Timeline for samples and first delivery",
      ],
      link: { to: "/products", label: "Check the current product range first" },
    },
    {
      question: "What is a product or sourcing enquiry?",
      answer:
        "A request asking Navora whether it can supply a particular food product from India to your specification, quantity and destination market.",
      detail:
        "It is the start of a conversation, not an order. Nothing is committed until both parties agree commercial terms in writing, and missing details are fine; Navora will ask for what it needs.",
      link: { to: "/responsible-sourcing", label: "Questions to ask before sourcing" },
    },
  ],
};

/** Decision support: product enquiry or partnership enquiry. */
export const enquiryRoutes = {
  kicker: "Which enquiry?",
  heading: "Product enquiry or partnership enquiry?",
  lead: "Send a product enquiry to buy a specific product. Send a partnership enquiry for an ongoing relationship such as distribution, private label or introducing your own products.",
  columns: ["Product enquiry", "Partnership enquiry"],
  rows: [
    {
      label: "Choose it when",
      cells: [
        "You know the product you want to buy",
        "You want distribution, representation, private label, or to introduce a farm, company or brand",
      ],
    },
    {
      label: "Typical sender",
      cells: [
        "Importers, wholesalers, retailers, food-service and hospitality buyers",
        "Distributors, retailers, food brands, and Indian producers and brands",
      ],
    },
    {
      label: "Include",
      cells: [
        "Product, format, approximate quantity, destination and timeline",
        "Your business, the products or markets involved, and what you want from the partnership",
      ],
    },
    {
      label: "Where to send it",
      cells: [
        "The form on this page, choosing \"Buying or sourcing enquiry\" or \"Navora product enquiry\"",
        "The form on this page with the matching enquiry type, or the For Business enquiry form",
      ],
    },
  ],
};

export const enquiryProcess = {
  kicker: "Our process",
  heading: "How Navora handles your enquiry",
  lead: "The same steps for every enquiry. We do not quote a fixed response time; we respond as soon as reasonably possible.",
  steps: [
    {
      step: "01",
      heading: "Received",
      text: "Your enquiry is recorded with the details you submit and used only to respond and manage related business communication.",
    },
    {
      step: "02",
      heading: "Reviewed",
      text: "We review the product, market, quantity and timeline against our current partner and supplier network in India.",
    },
    {
      step: "03",
      heading: "Answered",
      text: "We reply to say whether we have a relevant option, need to explore one, or cannot help with this requirement.",
    },
    {
      step: "04",
      heading: "Informed",
      text: "Where there is a fit, we share product information, samples or documents where available.",
    },
    {
      step: "05",
      heading: "Agreed",
      text: "Specification, price, packing and delivery terms are agreed in writing before any supply commitment.",
    },
  ],
};

/** Visible FAQ, also published as FAQPage structured data. */
export const contactFaq = {
  kicker: "Enquiry questions",
  heading: "Questions about contacting Navora",
  lead: "What to expect before and after you send an enquiry.",
  items: [
    {
      question: "Who should contact Navora Global?",
      short:
        "Businesses that buy, sell or serve food and want products from India, and Indian producers or brands seeking international buyers.",
      answer:
        "That includes importers, wholesalers, distributors, retailers, food brands, and hospitality and food-service buyers in the UK and international markets, as well as farmers, producers and emerging brands in India.",
    },
    {
      question: "What information should I include in a product enquiry?",
      short: "The product, format, approximate quantity, destination country and timeline.",
      answer:
        "Add any packaging or private-label needs and the certifications or documents your market requires. If some details are not settled yet, send what you have; Navora will ask for the rest.",
    },
    {
      question: "Can I enquire about wholesale, distribution or private label?",
      short: "Yes. All three can be discussed through an enquiry.",
      answer:
        "Choose the matching enquiry type on the form. Private label is discussed only where a capable supplier has been identified for the product and format you need.",
    },
    {
      question: "Which markets does Navora support?",
      short: "The UK and international markets.",
      answer:
        "Navora is registered in the UK and discusses supply to the UK and other international markets. Requirements differ by destination; for the UK, GOV.UK sets out the import steps and the Food Standards Agency lists the extra checks for some high-risk foods.",
      sources: [sources.importSteps, sources.hrfnao],
    },
    {
      question: "What happens after I send an enquiry?",
      short: "Navora reviews it and replies to say whether it has a relevant option or needs to explore one.",
      answer:
        "Where there is a fit, Navora shares product information, samples or documents where available. No supply commitment is made until both parties agree commercial terms in writing.",
    },
    {
      question: "Can I contact Navora by phone or WhatsApp?",
      short: `Yes. Call or message ${site.telephone}.`,
      answer: `Lines are open ${site.businessHours}. You can also email ${site.email}.`,
    },
  ],
};

/** Required consent checkbox on the For Business form. Source: p. 7. */
export const consentStatement =
  "By submitting this form, you agree that Navora Global Limited may use the information provided to respond to your enquiry. Please read our Privacy Notice for further information.";
