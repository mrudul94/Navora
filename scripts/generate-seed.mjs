/**
 * Generates navora-cms/seed/products.ndjson from the approved product copy in
 * src/content/productsFallback.js, so the CMS seed and the site fallback can
 * never diverge.
 *
 * Import into Sanity with:
 *   cd navora-cms
 *   npx sanity dataset import seed/products.ndjson production --replace
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

const source = readFileSync(
  resolve(root, "src/content/productsFallback.js"),
  "utf8"
);

// Pull the array literal out of the module and evaluate just that expression.
const body = source
  .slice(source.indexOf("export const fallbackProducts = ") + "export const fallbackProducts = ".length)
  .split("\n];")[0] + "\n]";

const products = new Function(`return ${body};`)();

const docs = products.map((product) => {
  const doc = {
    _id: `product.${product.slug}`,
    _type: "product",
    name: product.name,
    slug: { _type: "slug", current: product.slug },
    ownership: product.ownership,
    category: product.category,
    shortDescription: product.shortDescription,
    description: product.description,
    displayOrder: product.displayOrder,
    // Navora-branded food must not go live until label data is confirmed.
    isPublished: product.ownership !== "navora-brand",
  };

  if (product.subheading) doc.subheading = product.subheading;
  if (product.origin) doc.origin = product.origin;
  if (product.availableForms) doc.availableForms = product.availableForms;
  if (product.minimumOrderQuantity)
    doc.minimumOrderQuantity = product.minimumOrderQuantity;

  return doc;
});

writeFileSync(
  resolve(root, "navora-cms/seed/products.ndjson"),
  docs.map((doc) => JSON.stringify(doc)).join("\n") + "\n"
);

console.log(`products.ndjson: ${docs.length} documents`);
console.log(
  `  published: ${docs.filter((d) => d.isPublished).length}, hidden pending label data: ${docs.filter((d) => !d.isPublished).length}`
);
