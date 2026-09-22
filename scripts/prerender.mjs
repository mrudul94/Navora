/**
 * Prerenders every route to static HTML after the Vite build.
 *
 * Without this the raw HTML of each route is an empty <div id="root">, which
 * hurts search indexing and makes WhatsApp, LinkedIn and email link previews
 * show nothing. Each route now ships real markup and real meta tags, and the
 * client hydrates it rather than rendering from scratch.
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

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const templatePath = join(dist, "index.html");

if (!existsSync(templatePath)) {
  console.error("dist/index.html not found — run the Vite build first.");
  process.exit(1);
}

const template = readFileSync(templatePath, "utf8");

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

  const routes = [...new Set([...staticRoutes, ...productRoutes])];

  // Cloudflare Pages serves dist/404.html for any unmatched path. Prerendering
  // it means an unknown URL still gets the branded page rather than a bare
  // Cloudflare error — and it replaces the SPA catch-all redirect, which would
  // otherwise shadow every prerendered route.
  routes.push("__404__");

  for (const route of routes) {
    try {
      const helmetContext = {};
      const location = route === "__404__" ? "/__not-found__" : route;

      const html = renderToString(
        React.createElement(
          HelmetProvider,
          { context: helmetContext },
          React.createElement(
            StaticRouter,
            { location },
            React.createElement(App)
          )
        )
      );

      const { helmet } = helmetContext;
      const head = [
        helmet?.title?.toString(),
        helmet?.meta?.toString(),
        helmet?.link?.toString(),
        helmet?.script?.toString(),
      ]
        .filter(Boolean)
        .join("\n    ");

      let page = template;

      // Replace the build's static title/description with this route's.
      page = page.replace(/<title>[\s\S]*?<\/title>\s*/, "");
      page = page.replace(/<meta\s+name="description"[^>]*>\s*/, "");
      page = page.replace(
        /<meta\s+property="og:(title|description|image)"[^>]*>\s*/g,
        ""
      );
      page = page.replace(
        /<meta\s+name="twitter:card"[^>]*>\s*/,
        ""
      );

      page = page.replace("</head>", `  ${head}\n  </head>`);
      page = page.replace(
        '<div id="root"></div>',
        `<div id="root">${html}</div>\n    ${dataScript}`
      );

      if (route === "__404__") {
        writeFileSync(join(dist, "404.html"), page);
      } else {
        const outDir = route === "/" ? dist : join(dist, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, "index.html"), page);
      }

      written++;
    } catch (error) {
      failures.push(`${route}: ${error.message}`);
    }
  }
} finally {
  await vite.close();
}

if (failures.length > 0) {
  console.error(`Prerender failed for ${failures.length} route(s):`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}

console.log(`Prerendered ${written} routes to static HTML.`);
