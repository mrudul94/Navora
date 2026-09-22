import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
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

const container = document.getElementById("root");

const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Prerendered pages arrive with markup already in place; hydrate those rather
// than throwing the server's HTML away.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
