import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AnnounceBar from "./AnnounceBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieConsent from "./CookieConsent";
import WhatsAppButton from "./WhatsAppButton";
import { useReveal } from "../lib/useReveal";
import { initConsentEnforcement } from "../lib/consent";
import { registerAnalytics } from "../lib/analytics";

function MainLayout() {
  useReveal();

  // Loads any consented script and tears it down again if consent is
  // withdrawn. Analytics registers only when its token is configured.
  useEffect(() => {
    registerAnalytics();
    return initConsentEnforcement();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <AnnounceBar />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </>
  );
}

export default MainLayout;
