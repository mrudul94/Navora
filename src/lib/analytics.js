import { registerConsentedScript } from "./consent";
import { analyticsToken } from "../config/cookies";

/**
 * Cloudflare Web Analytics, loaded only after the visitor switches on the
 * Analytics category in the cookie banner.
 *
 * Cloudflare's beacon sets no cookies, uses no local storage and does not
 * fingerprint visitors; it reports page views, referrers, countries and page
 * speed as aggregate numbers. It is still gated behind consent, the safest
 * reading of UK PECR for a script that runs on the visitor's device.
 *
 * Do NOT also switch on "automatic setup" for this site in the Cloudflare
 * dashboard: that injects the beacon for every visitor and bypasses consent.
 * Use the manual (JS snippet) setup and put its token in
 * VITE_CF_ANALYTICS_TOKEN in .env.
 */

const BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";
const SCRIPT_ID = "cf-web-analytics";

let registered = false;

export function registerAnalytics() {
  if (!analyticsToken || registered) return;
  registered = true;

  registerConsentedScript("analytics", {
    load: () => {
      if (document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.defer = true;
      script.src = BEACON_SRC;
      // spa: true reports React Router page changes, not just full loads.
      script.dataset.cfBeacon = JSON.stringify({ token: analyticsToken, spa: true });
      document.head.appendChild(script);
    },
    // The beacon stops reporting from the next page load after removal.
    unload: () => {
      document.getElementById(SCRIPT_ID)?.remove();
    },
  });
}
