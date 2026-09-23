import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/fraunces";

import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/layout.css";
import "./styles/sections.css";
import "./styles/pages.css";

import ScrollToTop from "./components/ScrollToTop";

const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Prerendered pages (scripts/prerender.mjs) ship real markup, so hydrate it;
// in dev the root is empty and is rendered from scratch.
const root = document.getElementById("root");
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  ReactDOM.createRoot(root).render(app);
}
