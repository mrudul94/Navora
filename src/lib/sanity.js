import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { fallbackProducts } from "../content/productsFallback";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || "2025-01-01";

export const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const builder = client ? imageUrlBuilder(client) : null;

export function getImageUrl(source, options = {}) {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (!builder) return "";

  let image = builder.image(source);
  if (options.width) image = image.width(options.width);
  if (options.height) image = image.height(options.height);
  if (options.fit) image = image.fit(options.fit);
  if (options.quality) image = image.quality(options.quality);

  return image.url();
}

/** Matches the product schema in navora-cms/schemaTypes/product.js. */
const productFields = `
  _id,
  name,
  "slug": slug.current,
  ownership,
  category,
  subheading,
  shortDescription,
  description,
  origin,
  availableForms,
  gradesVarieties,
  packaging,
  minimumOrderQuantity,
  shelfLifeStorage,
  certifications[]{ name, scope, evidenceUrl },
  documentation,
  markets,
  "imageUrl": mainImage.asset->url,
  "imageAlt": mainImage.alt,
  "imageIsIllustrative": mainImage.isIllustrative,
  gallery[]{
    "url": asset->url,
    alt,
    isIllustrative
  },
  displayOrder
`;

const LIST_QUERY = `*[_type == "product" && isPublished == true] | order(displayOrder asc, name asc) { ${productFields} }`;
const SINGLE_QUERY = `*[_type == "product" && isPublished == true && slug.current == $slug][0] { ${productFields} }`;

/**
 * The previous site could sit on "Loading products from Sanity CMS…"
 * indefinitely when the CMS was slow or unreachable — a defect raised before
 * handover. Every query is now bounded, and a timeout degrades to the approved
 * copy rather than leaving the visitor waiting.
 */
const QUERY_TIMEOUT_MS = Number(import.meta.env.VITE_CMS_TIMEOUT_MS) || 8000;

function withTimeout(promise, label) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(
        () => reject(new Error(`${label} timed out after ${QUERY_TIMEOUT_MS}ms`)),
        QUERY_TIMEOUT_MS
      )
    ),
  ]);
}

/**
 * Returns published products.
 *
 * Falls back to the approved copy in src/content/productsFallback.js when the
 * CMS is unconfigured, empty or unreachable, so the Products page is never
 * blank and never strands a visitor on a loading message.
 */
export async function getProducts() {
  if (!client) return fallbackProducts;

  try {
    const products = await withTimeout(client.fetch(LIST_QUERY), "Product list query");
    return Array.isArray(products) && products.length > 0
      ? products
      : fallbackProducts;
  } catch (error) {
    console.error("Could not load products from the CMS", error);
    return fallbackProducts;
  }
}

/** Returns one product by slug, falling back to the approved copy. */
export async function getProductBySlug(slug) {
  if (!slug) return null;

  const fromFallback = () =>
    fallbackProducts.find((product) => product.slug === slug) || null;

  if (!client) return fromFallback();

  try {
    const product = await withTimeout(
      client.fetch(SINGLE_QUERY, { slug }),
      "Product query"
    );
    return product || fromFallback();
  } catch (error) {
    console.error("Could not load the product from the CMS", error);
    return fromFallback();
  }
}
