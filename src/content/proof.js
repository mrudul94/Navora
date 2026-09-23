import { site } from "../config/site";
import { CATALOGUE_PATH } from "../lib/downloads";

/**
 * Verifiable facts about Navora, for the "What you can check" sections.
 *
 * Content rule: only facts a buyer can check — a public register entry,
 * named people, published documents and written policies. Navora is a young
 * company, so there are deliberately no client names, shipment counts,
 * volumes, certifications, audits or testimonials here. Add one only when
 * Navora holds evidence for it.
 */
export const proofFacts = {
  registered: {
    icon: "company",
    title: "A company on the public register",
    text: `${site.legalName} is registered in ${site.jurisdiction} and was incorporated on ${site.incorporated}. The registered office is ${site.registeredOffice}.`,
    link: { label: "View the Companies House record", href: site.companiesHouseUrl },
  },
  founders: {
    icon: "partnership",
    title: "Named founders you can contact",
    text: "Navora is led by its co-founders, Albert Jose (Director) and Abhinav R Kurup (Chief Financial Officer), both based in the United Kingdom and each reachable by email.",
    link: { label: "Meet the founders", to: "/about" },
  },
  partner: {
    icon: "source",
    title: "An operating partner in Kerala",
    text: "Navora works with a partner company in Kerala, India, which provides local market knowledge and relationships with farmers, suppliers and food brands.",
    link: { label: "How the partnership works", to: "/about" },
  },
  catalogue: {
    icon: "download",
    title: "Published product information",
    text: "A PDF catalogue and a one-page sheet for every listed product, generated from the same records as this website.",
    link: { label: "Download the catalogue (PDF)", href: CATALOGUE_PATH, download: true },
  },
  labels: {
    icon: "label",
    title: "Every product labelled by who makes it",
    text: "Each product is marked Navora Brand, Supplier Product, Coming Soon or Future Category, so you know whether Navora or a partner supplier is the maker.",
    link: { label: "Browse the product range", to: "/products" },
  },
  accuracy: {
    icon: "evidence",
    title: "A written accuracy policy",
    text: "Certification, farming-method and similar claims are published only when Navora holds current evidence for the named product and supplier.",
    link: { label: "Read the responsible-sourcing approach", to: "/responsible-sourcing" },
  },
  writtenTerms: {
    icon: "verified",
    title: "No commitment until terms are in writing",
    text: "An enquiry, quotation or sample exchange never creates a supply commitment. That arises only when both parties agree commercial terms in writing.",
    link: { label: "See how an enquiry progresses", to: "/for-business" },
  },
  documents: {
    icon: "spec",
    title: "Documents requested for your review",
    text: "Where relevant, Navora requests available specifications, test reports, certifications and business documents from the supplier, so you can review them before agreeing terms.",
    link: { label: "Ask about documentation", to: "/contact" },
  },
};

/** Shared heading copy, so every proof section introduces itself the same way. */
export const proofIntro = {
  kicker: "What you can check",
  lead: "Navora is a young company, so instead of quoting client names or volumes we show what a buyer can verify today.",
};
