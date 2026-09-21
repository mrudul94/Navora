/**
 * The eight product records approved in the Content Pack (pp. 5-6), used when
 * the CMS returns nothing or is unreachable, so the Products page is never
 * blank and never strands the visitor on a loading message.
 *
 * This is the client's own approved copy, not placeholder data. The same
 * records ship as navora-cms/seed/products.ndjson for import into Sanity,
 * after which the CMS becomes the source of truth.
 *
 * Structured fields (forms, grades, packaging, MOQ, shelf life, certifications,
 * markets) are deliberately absent: the pack requires them to be confirmed per
 * product before publication. The UI omits any field it has no value for.
 */

export const fallbackProducts = [
  {
    _id: "fallback-navora-honey-shot",
    name: "Navora Honey Shot",
    slug: "navora-honey-shot",
    ownership: "navora-brand",
    category: "honey-products",
    shortDescription:
      "A convenient single-serve honey product developed and marketed under the Navora brand. Product and pack details are available for business enquiries.",
    subheading:
      "A convenient single-serve format for enjoying honey wherever the day takes you",
    description:
      "Navora Honey Shot is developed and marketed under the Navora brand. The portable single-serve format is designed for convenient use and for business partners seeking an easy-to-carry honey product. Contact our team for current pack specifications, ingredients, case quantity, availability and partnership options.",
    availableForms: ["Single-serve"],
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 1,
  },
  {
    _id: "fallback-natural-honey",
    name: "Natural Honey",
    slug: "natural-honey",
    ownership: "supplier-product",
    category: "honey-products",
    shortDescription:
      "Honey options sourced through supplier relationships in India. Origin, floral source, pack format and test information are provided according to the selected product.",
    description:
      "Honey options sourced through supplier relationships in India. Origin, floral source, pack format and test information are provided according to the selected product. Tell us your required format, volume and destination market and we will confirm the options currently available.",
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 2,
  },
  {
    _id: "fallback-ginger",
    name: "Ginger",
    slug: "ginger",
    ownership: "supplier-product",
    category: "spices",
    shortDescription:
      "Indian ginger available for relevant wholesale and business enquiries. Form, grade, season, packing and minimum quantity must be confirmed for each requirement.",
    description:
      "Indian ginger available for relevant wholesale and business enquiries. Form, grade, season, packing and minimum quantity must be confirmed for each requirement. Send us your specification and destination market and we will confirm what our supplier network can currently offer.",
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 3,
  },
  {
    _id: "fallback-cardamom",
    name: "Cardamom",
    slug: "cardamom",
    ownership: "supplier-product",
    category: "spices",
    shortDescription:
      "Cardamom sourced through supplier relationships, with grade, size, origin, packaging and availability confirmed against the buyer's needs.",
    description:
      "Cardamom sourced through supplier relationships, with grade, size, origin, packaging and availability confirmed against the buyer's needs. Share your required grade and volume and we will confirm current options with our partner and supplier network.",
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 4,
  },
  {
    _id: "fallback-millets",
    name: "Millets",
    slug: "millets",
    ownership: "supplier-product",
    category: "millets-grains",
    shortDescription:
      "Selected Indian millets for buyers seeking traditional grains and ingredient options. Varieties, processing and packing are confirmed by enquiry.",
    description:
      "Selected Indian millets for buyers seeking traditional grains and ingredient options. Varieties, processing and packing are confirmed by enquiry. Tell us the variety, processing and pack format you need for your market.",
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 5,
  },
  {
    _id: "fallback-rice",
    name: "Rice",
    slug: "rice",
    ownership: "supplier-product",
    category: "rice",
    shortDescription:
      "Selected rice varieties available for wholesale discussion. Variety, grade, pack size, volume and destination requirements must be specified.",
    description:
      "Selected rice varieties available for wholesale discussion. Variety, grade, pack size, volume and destination requirements must be specified. Send us your requirement and we will confirm the varieties and formats currently available.",
    minimumOrderQuantity: "Available on enquiry",
    displayOrder: 6,
  },
  {
    _id: "fallback-navora-honey-candy",
    name: "Navora Honey Candy",
    slug: "navora-honey-candy",
    ownership: "coming-soon",
    category: "honey-products",
    shortDescription:
      "A forthcoming Navora-branded product currently in development. Register a business enquiry for launch information.",
    description:
      "A forthcoming Navora-branded product currently in development under the Navora brand. Register a business enquiry and we will share launch information, pack details and partnership options when they are confirmed.",
    displayOrder: 7,
  },
  {
    _id: "fallback-vegetables-and-fruits",
    name: "Vegetables and Fruits",
    slug: "vegetables-and-fruits",
    ownership: "future-category",
    category: "future-categories",
    shortDescription:
      "A future category planned as Navora expands its verified supplier and logistics network.",
    description:
      "A future category planned as Navora expands its verified supplier and logistics network. If you buy or supply fresh produce, tell us what you are looking for and we will be in touch as this category develops.",
    displayOrder: 8,
  },
];

/**
 * Pre-sale note required by the pack (p. 7) for Navora-branded food products.
 * Shown in the CMS and to the site owner, never to the public.
 */
export const honeyShotPreSaleNote =
  "Replace this copy with the final ingredient list, net quantity, nutritional information, storage instructions, shelf life, manufacturer or packer details, country of origin and allergen statement before sale or formal promotion.";
