/**
 * The cookie registry — single source of truth for the consent banner AND the
 * published Cookie Notice table. The `/cookie-notice` page renders from this
 * file, so the published table cannot drift from what the site actually does.
 *
 * RULE: if you add a script that sets a cookie or reads storage, add it here
 * and load it through `loadConsentedScripts()` in src/lib/consent.js. Injecting
 * a tag anywhere else bypasses consent and breaks UK PECR compliance.
 */

/**
 * Cloudflare Web Analytics site token (manual setup). Empty = analytics off,
 * and the banner and Cookie Notice say no analytics is used. See
 * src/lib/analytics.js.
 */
export const analyticsToken = import.meta.env?.VITE_CF_ANALYTICS_TOKEN || "";

/**
 * Bump when categories change — forces a fresh prompt for existing visitors.
 * Switching analytics on counts as a change, so anyone who chose before it
 * existed is asked again.
 */
export const CONSENT_VERSION = analyticsToken ? 2 : 1;

/** Consent records older than this are treated as expired (ICO guidance). */
export const CONSENT_MAX_AGE_DAYS = 365;

export const STORAGE_KEY = "navora.consent";

export const categories = [
  {
    id: "necessary",
    name: "Strictly necessary",
    required: true,
    description:
      "These are needed for the website to work and to keep it secure. They cannot be switched off.",
    items: [
      {
        name: "navora.consent",
        provider: "Navora Global Limited",
        purpose: "Stores your cookie preferences so you are not asked on every visit.",
        duration: "12 months",
        type: "Local storage",
      },
      {
        name: "__cf_bm, cf_clearance",
        provider: "Cloudflare",
        purpose:
          "Set by our hosting and security provider to tell genuine visitors from automated traffic and protect the site from abuse. Only set when a request is screened.",
        duration: "Up to 30 minutes (__cf_bm); up to 1 year (cf_clearance)",
        type: "Cookie",
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics",
    required: false,
    description:
      "These would help us understand how visitors use the website so we can improve it. Nothing is loaded unless you turn this on.",
    // Listed only when a Cloudflare Web Analytics token is configured. It is
    // loaded through registerConsentedScript, so it never runs before consent.
    items: analyticsToken
      ? [
          {
            name: "Cloudflare Web Analytics",
            provider: "Cloudflare",
            purpose:
              "Counts page views and measures page speed so we can improve the site. Sets no cookies, stores nothing on your device and does not identify you; we see only aggregate figures such as page views, referring sites and countries.",
            duration: "Nothing stored on your device",
            type: "Script",
          },
        ]
      : [],
  },
  {
    id: "marketing",
    name: "Marketing",
    required: false,
    description:
      "These would be used to measure the performance of marketing activity. Nothing is loaded unless you turn this on.",
    items: [],
  },
];

/** Optional category ids, in display order. */
export const optionalCategories = categories.filter((c) => !c.required);

/** True when no optional cookie is actually in use anywhere on the site. */
export const noOptionalCookiesInUse = optionalCategories.every(
  (c) => c.items.length === 0
);
