import { faq as homeFaq } from "./faq";

/** Products page copy. Source: Content Pack pp. 5-7. */

export const hero = {
  heading: "Indian food products for international business",
  text: "Explore the categories currently available through Navora's own product development and supplier relationships in India. Product specifications, formats, quantities, certifications and availability vary by supplier and destination. Contact us with your requirements for accurate information.",
};

/**
 * Filters. `id` matches the `category` value in the Sanity product schema,
 * except `all` and `navora-brand` which filter on ownership.
 */
export const filters = [
  { id: "all", label: "All" },
  { id: "navora-brand", label: "Navora Brand", matches: "ownership" },
  { id: "spices", label: "Spices" },
  { id: "honey-products", label: "Honey Products" },
  { id: "millets-grains", label: "Millets and Grains" },
  { id: "rice", label: "Rice" },
  { id: "future-categories", label: "Future Categories" },
];

/** Ownership badges. Source: Product page template, p. 6. */
export const ownershipLabels = {
  "navora-brand": "Navora Brand",
  "supplier-product": "Supplier Product",
  "coming-soon": "Coming Soon",
  "future-category": "Future Category",
};

export const catalogueCta = {
  heading: "Need specifications, samples or commercial information?",
  text: "Send us the product, required format, approximate quantity and destination market. We will confirm what information and supply options are currently available.",
};

/** Labels for the product detail specification grid. */
export const specLabels = {
  origin: "Origin",
  availableForms: "Available forms",
  gradesVarieties: "Grades or varieties",
  packaging: "Packaging",
  minimumOrderQuantity: "Minimum order quantity",
  shelfLifeStorage: "Shelf life and storage",
  markets: "Markets",
};

export const detailCopy = {
  certificationsHeading: "Certifications",
  certificationsEmpty:
    "No certification is currently published for this product. Certification claims are published only when Navora holds current evidence relevant to the named product and supplier.",
  documentationHeading: "Documentation",
  documentationEmpty:
    "Documentation available for this product is confirmed on enquiry.",
  enquiryHeading: "Request information on this product",
  enquiryText:
    "Tell us the format, approximate quantity and destination market, and we will confirm what is currently available.",
};

export const emptyState = {
  heading: "Product information is being updated",
  text: "Our product records are currently being updated. Please send us your requirement and we will confirm what is available.",
};

/**
 * Summary under the Products header: what the range is, who it is for and
 * how to get specifications. Search engines and AI assistants extract this
 * block as the page's answer. Restates approved copy only.
 */
export const glance = {
  kicker: "The range at a glance",
  heading: "What Navora supplies, and to whom",
  summary:
    "Navora Global supplies Indian spices, honey, millets and rice to importers, distributors, retailers and food-service buyers in the UK and international markets, alongside Navora Honey Shot, its own branded product. Specifications, packing, quantities and certifications vary by supplier and destination, and are confirmed for each enquiry.",
  columns: [
    {
      heading: "Current categories",
      items: [
        "Spices: ginger and green cardamom",
        "Honey: natural honey and Navora Honey Shot",
        "Millets and rice",
        "Vegetables and fruits (planned)",
      ],
    },
    {
      heading: "Best suited to",
      items: [
        "Importers and distributors",
        "Retailers and wholesalers",
        "Food-service and ingredient buyers",
        "Private-label partners",
      ],
    },
  ],
  steps: {
    heading: "How to get specifications",
    items: [
      "Choose a product, or describe the one you need.",
      "Download its product sheet, or the full catalogue.",
      "Send the format, approximate quantity and destination market.",
      "Navora confirms available specifications, samples and documents.",
    ],
  },
};

export const rangeHeading = {
  kicker: "Current product range",
  heading: "Browse products by category",
};

export const comparison = {
  kicker: "Compare categories",
  heading: "Product categories compared",
  lead: "Each category, the products in it, and whether Navora sells it under its own brand or sources it from a supplier.",
};

/**
 * Questions buyers ask on the Products page, shown visibly and published as
 * FAQPage structured data. `short` is the one-line direct answer.
 */
const importRules = homeFaq.items.find((item) => item.sources);

export const productFaq = {
  kicker: "Buying questions",
  heading: "Questions about Navora products",
  lead: "What buyers usually ask before requesting specifications or samples.",
  items: [
    {
      question: "What Indian food products does Navora supply?",
      short: "Ginger, green cardamom, honey, millets and rice, plus Navora Honey Shot.",
      answer:
        "Navora's current range covers spices (ginger and green cardamom), natural honey, millets and rice, sourced through supplier relationships in India, and Navora Honey Shot, a single-serve honey product sold under the Navora brand. Navora Honey Candy is coming soon, and vegetables and fruits are a planned future category.",
    },
    {
      question: "What is the difference between a Navora Brand product and a Supplier Product?",
      short: "Navora Brand products are developed and marketed by Navora; Supplier Products are made by partner suppliers in India.",
      answer:
        "A Navora Brand product, such as Navora Honey Shot, is developed and marketed under the Navora name. A Supplier Product is sourced through Navora's supplier relationships in India, and Navora is not its manufacturer. Coming Soon marks a Navora product in development, and Future Category marks a category Navora plans to add. Every product on this page carries one of these labels.",
    },
    {
      question: "How do I get specifications, samples or a price?",
      short: "Send the product, format, approximate quantity and destination market.",
      answer:
        "Use the Request Product Information button or the contact form, and include the product, required format, approximate quantity and destination market. Navora confirms the specifications, samples, documents and commercial terms currently available. Prices depend on specification, volume, packing and delivery terms, so they are quoted per enquiry rather than listed.",
    },
    {
      question: "Can I buy in bulk or under my own label?",
      short: "Yes. Bulk supply and private label are both discussed on enquiry.",
      answer:
        "Bulk supply, retail formats and private label are all discussed as part of an enquiry. Private-label products are offered only where a capable supplier has been identified for the product and format you need.",
    },
    {
      question: "Which certifications and documents are available?",
      short: "It depends on the product, supplier and destination market.",
      answer:
        "Where relevant, Navora requests available specifications, test reports, certifications and business documents from the supplier for your review. A certification is published on a product page only when Navora holds current evidence for that product and supplier. Tell us what your market requires when you enquire.",
    },
    {
      question: "Can I download a product catalogue?",
      short: "Yes. A PDF catalogue and a sheet for each product are free to download.",
      answer:
        "The full Navora product catalogue is available as a PDF from the top of this page, and each product page has its own one-page product sheet. Both are generated from the same information as this website, so they stay up to date.",
    },
    ...(importRules ? [importRules] : []),
  ],
};
