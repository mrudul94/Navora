import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import { useReveal } from "../lib/useReveal";
import { initConsentEnforcement } from "../lib/consent";

function MainLayout() {
  useReveal();

  // Loads any consented script and tears it down again if consent is
  // withdrawn. Nothing is registered at launch.
  useEffect(() => initConsentEnforcement(), []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default MainLayout;
