/**
 * Renders every route to a string with React's server renderer.
 *
 * Catches render-time crashes, bad imports and empty pages that a successful
 * bundle cannot. Dev-only helper; not part of the production build.
 *
 *   node scripts/smoke-render.mjs
 */
import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React from "react";

// Product detail pages fetch in an effect, which the server renderer never
// runs, so they legitimately render a loading state here. They are covered by
// scripts/smoke-client.mjs instead.
const dataDrivenRoutes = new Set([
  "/products/ginger",
  "/products/navora-honey-shot",
  "/products/does-not-exist",
]);

const routes = [
  "/",
  "/about",
  "/products",
  "/products/ginger",
  "/products/navora-honey-shot",
  "/products/does-not-exist",
  "/for-business",
  "/responsible-sourcing",
  "/contact",
  "/privacy-notice",
  "/cookie-notice",
  "/website-terms",
  "/definitely-not-a-page",
];

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

let failures = 0;

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

  for (const route of routes) {
    try {
      const html = renderToString(
        React.createElement(
          HelmetProvider,
          { context: {} },
          React.createElement(
            StaticRouter,
            { location: route },
            React.createElement(App)
          )
        )
      );

      const text = html
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const hasH1 = /<h1[\s>]/.test(html);
      const hasNav = html.includes("site-nav");
      const hasFooter = html.includes("site-footer");
      const dataDriven = dataDrivenRoutes.has(route);
      const thin = text.length < (dataDriven ? 100 : 200);

      if (thin || (!hasH1 && !dataDriven) || !hasNav || !hasFooter) {
        console.log(
          `  WARN ${route.padEnd(30)} h1=${hasH1} nav=${hasNav} footer=${hasFooter} text=${text.length}`
        );
        failures++;
      } else {
        console.log(
          `  ok   ${route.padEnd(30)} ${text.length} chars${dataDriven ? " (loading state, see smoke-client)" : ""}`
        );
      }
    } catch (error) {
      console.log(`  FAIL ${route.padEnd(30)} ${error.message}`);
      failures++;
    }
  }
} finally {
  await vite.close();
}

console.log(
  failures ? `\n${failures} route(s) need attention` : `\nAll ${routes.length} routes rendered.`
);
process.exit(failures ? 1 : 0);
