/** Products page copy. Source: Content Pack pp. 5-7. */

export const hero = {
  heading: "Food products for international business",
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
