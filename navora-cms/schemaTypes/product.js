/**
 * Product record.
 *
 * Structure follows the "Product page template" in the Navora Global Website
 * Content Pack (p. 6). Each record must reflect the actual supplier, product
 * and evidence available — do not reuse generic claims across products.
 *
 * The website omits any field left empty, so it is safe to publish a record
 * with only the details that have been confirmed.
 */

const OWNERSHIP = [
  { title: "Navora Brand", value: "navora-brand" },
  { title: "Supplier Product", value: "supplier-product" },
  { title: "Coming Soon", value: "coming-soon" },
  { title: "Future Category", value: "future-category" },
];

const CATEGORIES = [
  { title: "Spices", value: "spices" },
  { title: "Honey Products", value: "honey-products" },
  { title: "Millets and Grains", value: "millets-grains" },
  { title: "Rice", value: "rice" },
  { title: "Future Categories", value: "future-categories" },
];

/** Image with required alt text and an honesty flag for non-Navora photos. */
const imageFields = [
  {
    name: "alt",
    title: "Alternative text",
    type: "string",
    description: "Describe the image for screen readers and search engines.",
    validation: (Rule) => Rule.required(),
  },
  {
    name: "isIllustrative",
    title: "Illustrative image",
    type: "boolean",
    description:
      "Tick if this is a stock or representative photo rather than the actual Navora product. The site will label it 'Illustrative image'.",
    initialValue: false,
  },
];

export default {
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "basics", title: "Basics", default: true },
    { name: "specification", title: "Specification" },
    { name: "evidence", title: "Evidence" },
    { name: "media", title: "Images" },
    { name: "publishing", title: "Publishing" },
  ],
  fields: [
    // --- Basics ---------------------------------------------------------
    {
      name: "name",
      title: "Product name",
      type: "string",
      group: "basics",
      description: "The exact commercial name.",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "basics",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "ownership",
      title: "Ownership badge",
      type: "string",
      group: "basics",
      description:
        "Navora Brand = developed and marketed by Navora. Supplier Product = sourced through a supplier; Navora is not the manufacturer.",
      options: { list: OWNERSHIP, layout: "radio" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      group: "basics",
      description: "Controls which filter the product appears under.",
      options: { list: CATEGORIES },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subheading",
      title: "Subheading",
      type: "string",
      group: "basics",
      description: "Optional single line shown under the product name.",
    },
    {
      name: "shortDescription",
      title: "Short description",
      type: "text",
      rows: 3,
      group: "basics",
      description:
        "One or two factual sentences describing the product and intended business use. Shown on the product card.",
      validation: (Rule) => Rule.required().max(300),
    },
    {
      name: "description",
      title: "Full description",
      type: "text",
      rows: 6,
      group: "basics",
      validation: (Rule) => Rule.required(),
    },

    // --- Specification --------------------------------------------------
    {
      name: "origin",
      title: "Origin",
      type: "string",
      group: "specification",
      description: "Country and region — only when confirmed. Leave empty if not.",
    },
    {
      name: "availableForms",
      title: "Available forms",
      type: "array",
      of: [{ type: "string" }],
      group: "specification",
      description:
        "For example: fresh, dried, powder, whole, single-serve, retail pack. Confirm each one.",
      options: { layout: "tags" },
    },
    {
      name: "gradesVarieties",
      title: "Grades or varieties",
      type: "array",
      of: [{ type: "string" }],
      group: "specification",
      description: "Use the supplier's exact terminology.",
      options: { layout: "tags" },
    },
    {
      name: "packaging",
      title: "Packaging",
      type: "array",
      of: [{ type: "string" }],
      group: "specification",
      description: "Actual bulk and retail pack options.",
      options: { layout: "tags" },
    },
    {
      name: "minimumOrderQuantity",
      title: "Minimum order quantity",
      type: "string",
      group: "specification",
      description:
        "State a confirmed figure, or use 'Available on enquiry'.",
      initialValue: "Available on enquiry",
    },
    {
      name: "shelfLifeStorage",
      title: "Shelf life and storage",
      type: "text",
      rows: 3,
      group: "specification",
      description: "Use verified technical documentation only.",
    },
    {
      name: "markets",
      title: "Markets",
      type: "array",
      of: [{ type: "string" }],
      group: "specification",
      description:
        "State destination availability only after regulatory and logistics checks.",
      options: { layout: "tags" },
    },

    // --- Evidence -------------------------------------------------------
    {
      name: "certifications",
      title: "Certifications",
      type: "array",
      group: "evidence",
      description:
        "Name only current certification relevant to this facility or product, and link to evidence. Leave empty if none is held and verified — the site will say so.",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Certification",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "scope",
              title: "Scope",
              type: "string",
              description:
                "Which legal entity, facility and products this certificate covers.",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "evidenceUrl",
              title: "Link to evidence",
              type: "url",
            },
          ],
          preview: { select: { title: "name", subtitle: "scope" } },
        },
      ],
    },
    {
      name: "documentation",
      title: "Documentation available",
      type: "array",
      of: [{ type: "string" }],
      group: "evidence",
      description:
        "For example: specification, certificate of analysis, origin, allergen or microbiological information — where available.",
      options: { layout: "tags" },
    },

    // --- Media ----------------------------------------------------------
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      description: "Use the actual product and packaging wherever possible.",
      fields: imageFields,
    },
    {
      name: "gallery",
      title: "Further images",
      type: "array",
      group: "media",
      of: [{ type: "image", options: { hotspot: true }, fields: imageFields }],
      validation: (Rule) => Rule.max(6),
    },

    // --- Publishing -----------------------------------------------------
    {
      name: "displayOrder",
      title: "Display order",
      type: "number",
      group: "publishing",
      description: "Lower numbers appear first.",
      initialValue: 100,
    },
    {
      name: "isPublished",
      title: "Show on the website",
      type: "boolean",
      group: "publishing",
      description:
        "Untick to hide this product without deleting it. For Navora-branded food, do not publish until the final ingredient list, net quantity, nutrition, storage, shelf life, packer details, country of origin and allergen statement are confirmed.",
      initialValue: false,
    },
  ],

  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],

  preview: {
    select: {
      title: "name",
      ownership: "ownership",
      category: "category",
      media: "mainImage",
      isPublished: "isPublished",
    },
    prepare({ title, ownership, category, media, isPublished }) {
      const badge = OWNERSHIP.find((item) => item.value === ownership)?.title;
      const group = CATEGORIES.find((item) => item.value === category)?.title;
      return {
        title: isPublished ? title : `${title} (hidden)`,
        subtitle: [badge, group].filter(Boolean).join(" · "),
        media,
      };
    },
  },
};
