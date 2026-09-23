/**
 * Prerenders every route to static HTML after the Vite build.
 *
 * Without this the raw HTML of each route is an empty <div id="root">. Google
 * can render JavaScript, but slowly and not always; most AI crawlers
 * (ChatGPT, Claude, Perplexity) and link previews (WhatsApp, LinkedIn, email)
 * do not run it at all. Each route now ships its real content, title,
 * description, canonical and JSON-LD, and the client hydrates it.
 *
 * Output follows Cloudflare Pages' URL rules so the served URL matches the
 * canonical exactly (no trailing slash):
 *   /                  -> dist/index.html
 *   /about             -> dist/about.html
 *   /products/ginger   -> dist/products/ginger.html
 *   unknown paths      -> dist/404.html (served with a 404 status)
 *
 * Also writes dist/llms.txt (a plain-text summary for AI tools), sitemap.xml
 * and the PDF catalogue and product sheets (scripts/catalogue.mjs).
 *
 * Runs automatically as part of `npm run build`.
 */
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildCatalogue } from "./catalogue.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const templatePath = join(dist, "index.html");

if (!existsSync(templatePath)) {
  console.error("dist/index.html not found — run the Vite build first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf8");

if (!template.includes('<div id="root"></div>')) {
  console.error('dist/index.html has no empty <div id="root"></div> to fill.');
  process.exit(1);
}

/** Removes the template's default head tags that each route replaces. */
function stripDefaultHead(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/, "")
    .replace(/<meta\s+name="description"[\s\S]*?>\s*/, "")
    .replace(/<meta\s+name="robots"[\s\S]*?>\s*/g, "")
    .replace(/<meta\s+property="og:[^"]*"[\s\S]*?>\s*/g, "")
    .replace(/<meta\s+name="twitter:[^"]*"[\s\S]*?>\s*/g, "")
    .replace(/<link\s+rel="canonical"[\s\S]*?>\s*/g, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
}

/**
 * Separates the head tags from the page markup.
 *
 * With React 19, react-helmet-async renders <title>, <meta> and <link> as
 * React hoistables rather than filling the Helmet context, and
 * renderToString emits them as one block at the very start of the markup.
 * They must be in <head>: Google ignores a canonical outside it. React 19
 * reuses matching head tags when it hydrates, so moving them is safe.
 *
 * JSON-LD <script> tags are ordinary elements and stay in the body: Google
 * reads structured data anywhere in the page, and removing them would make
 * the markup differ from what the client renders.
 */
function splitHoistables(html) {
  const match = html.match(/^(?:<title\b[^>]*>[\s\S]*?<\/title>|<(?:meta|link)\b[^>]*>)+/);
  const head = match ? match[0] : "";
  return {
    head: head.replace(/></g, ">\n    <"),
    body: html.slice(head.length),
  };
}

function outputFile(route) {
  if (route === "__404__") return join(dist, "404.html");
  if (route === "/") return join(dist, "index.html");
  return join(dist, `${route.replace(/^\//, "")}.html`);
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

let written = 0;
const failures = [];

try {
  // --- Build-time data ----------------------------------------------------
  // Fetched once and inlined into every page, so product routes prerender
  // with real content and the client hydrates against identical markup.
  const { getProducts } = await vite.ssrLoadModule("/src/lib/sanity.js");
  const { setPrefetchedData } = await vite.ssrLoadModule("/src/lib/prefetch.js");
  const { pageSeo } = await vite.ssrLoadModule("/src/content/seo.js");
  const { faq } = await vite.ssrLoadModule("/src/content/faq.js");
  const { site } = await vite.ssrLoadModule("/src/config/site.js");
  const productsCopy = await vite.ssrLoadModule("/src/content/products.js");
  const { atAGlance } = await vite.ssrLoadModule("/src/content/home.js");

  const products = await getProducts();
  const data = { products };
  setPrefetchedData(data);

  const serialised = JSON.stringify(data).replace(/</g, "\\u003c");
  const dataScript = `<script>window.__NAVORA_DATA__=${serialised}</script>`;

  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

  // --- Routes -------------------------------------------------------------
  const staticRoutes = Object.values(pageSeo)
    .map((entry) => entry.path)
    .filter(Boolean);

  const productRoutes = products
    .filter((product) => product.slug)
    .map((product) => `/products/${product.slug}`);

  const routes = [...new Set([...staticRoutes, ...productRoutes]), "__404__"];

  for (const route of routes) {
    try {
      const location = route === "__404__" ? "/__not-found__" : route;

      const html = renderToString(
        React.createElement(
          HelmetProvider,
          { context: {} },
          React.createElement(StaticRouter, { location }, React.createElement(App))
        )
      );

      if (!html.trim()) throw new Error("rendered empty markup");

      const { head, body } = splitHoistables(html);
      if (!head.includes("<title>")) throw new Error("no <title> was rendered");

      let page = stripDefaultHead(template);
      page = page.replace("</head>", `  ${head}\n  </head>`);
      page = page.replace(
        '<div id="root"></div>',
        `<div id="root">${body}</div>\n    ${dataScript}`
      );

      const file = outputFile(route);
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, page);
      written++;
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
    }
  }

  // --- llms.txt -------------------------------------------------------------
  // https://llmstxt.org — a short, link-rich summary AI tools can read without
  // parsing the whole site. Generated from the same content as the pages.
  const link = (path) => `${site.origin}${path}`;
  const pageLines = Object.values(pageSeo)
    .filter((entry) => entry.path && entry.path !== "/")
    .map((entry) => `- [${entry.name}](${link(entry.path)}): ${entry.description}`);
  const productLines = products
    .filter((product) => product.slug)
    .map((product) => {
      const summary = product.shortDescription || product.subheading || "";
      return `- [${product.name}](${link(`/products/${product.slug}`)})${summary ? `: ${summary}` : ""}`;
    });
  const faqLines = faq.items.flatMap((item) => [
    `### ${item.question}`,
    "",
    item.short ? `**${item.short}** ${item.answer}` : item.answer,
    "",
  ]);

  const llms = [
    `# ${site.legalName}`,
    "",
    `> ${pageSeo.home.description}`,
    "",
    `${site.legalName} is registered in ${site.jurisdiction} (registered office: ${site.registeredOffice}) and works with a partner company in ${site.keralaPartnerLocation}. It sources food products from Indian farmers, producers and brands for importers, distributors, retailers, food-service and ingredient buyers in the UK and international markets, and develops products under the Navora brand.`,
    "",
    `Contact: ${site.email} · ${site.telephone} · ${link("/contact")}`,
    "",
    "## Pages",
    "",
    ...pageLines,
    "",
    "## Products",
    "",
    ...productLines,
    "",
    "## Downloads",
    "",
    `- [Product catalogue (PDF)](${link("/downloads/navora-product-catalogue.pdf")}): every product, with specifications where published and how to enquire.`,
    "",
    "## Frequently asked questions",
    "",
    ...faqLines,
  ].join("\n");

  writeFileSync(join(dist, "llms.txt"), `${llms.trimEnd()}\n`);

  // --- sitemap.xml ----------------------------------------------------------
  // Written from the routes actually prerendered, so it always matches the
  // pages that exist: the products published in Sanity.
  // Replaces the copy generated into public/ by scripts/generate-sitemap.mjs.
  const legal = new Set(["/privacy-notice", "/cookie-notice", "/website-terms"]);
  const today = new Date().toISOString().slice(0, 10);
  const priorityFor = (route) => {
    if (route === "/") return "1.0";
    if (legal.has(route)) return "0.3";
    if (route.startsWith("/products/")) return "0.7";
    return "0.8";
  };
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((route) => route !== "__404__")
  .map(
    (route) =>
      `  <url>\n    <loc>${link(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priorityFor(route)}</priority>\n  </url>`
  )
  .join("\n")}
</urlset>
`;
  writeFileSync(join(dist, "sitemap.xml"), sitemap);

  // --- PDF catalogue and product sheets ----------------------------------
  const sheets = await buildCatalogue({ root, dist, products, site, productsCopy, atAGlance });
  console.log(`PDF catalogue and ${sheets} product sheets written to dist/downloads.`);
} finally {
  await vite.close();
}

if (failures.length > 0) {
  console.error(`Prerender failed for ${failures.length} route(s):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Prerendered ${written} routes to static HTML, plus llms.txt.`);
