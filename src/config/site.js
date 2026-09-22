/**
 * Single source of truth for Navora's business details.
 *
 * HOW THIS WORKS
 * Any value still starting with `REPLACE_` is treated as unset and is hidden
 * from the UI entirely — no "to confirm" text ever reaches a visitor. Replace
 * the string here and the line appears everywhere it belongs.
 *
 * Nothing else in the codebase should hard-code a contact detail.
 */

const UNSET_PREFIX = "REPLACE_";

export const site = {
  companyName: "Navora Global Limited",
  shortName: "Navora Global",
  wordmark: "NAVORA",
  wordmarkSub: "GLOBAL LIMITED",

  // --- Contact -------------------------------------------------------------
  email: "REPLACE_EMAIL",
  phoneUK: "REPLACE_UK_PHONE",
  phoneIndia: "REPLACE_INDIA_PHONE",
  whatsapp: "REPLACE_WHATSAPP", // digits only, for wa.me
  businessHours: "REPLACE_HOURS",

  // --- Registration --------------------------------------------------------
  registeredOffice: "REPLACE_UK_ADDRESS",
  companyNumber: "REPLACE_COMPANY_NUMBER",
  jurisdiction: "England and Wales",

  // --- Kerala operating partner -------------------------------------------
  partnerCompany: {
    name: "REPLACE_PARTNER_NAME",
    address: "REPLACE_KERALA_ADDRESS",
  },

  // --- Social --------------------------------------------------------------
  linkedin: "REPLACE_COMPANY_LINKEDIN",

  // --- Web -----------------------------------------------------------------
  domain: "REPLACE_DOMAIN",
  origin: "https://navora-global.pages.dev",

  // --- Legal ---------------------------------------------------------------
  legalLastReviewed: "22 September 2026",
  copyrightYear: 2026,
};

/** True when a value has not been supplied yet. */
export function isUnset(value) {
  // Non-strings (numbers, booleans) are always considered supplied.
  if (typeof value !== "string") return value === null || value === undefined;
  return value.trim() === "" || value.startsWith(UNSET_PREFIX);
}

/** True when a value is ready to show. */
export function isSet(value) {
  return !isUnset(value);
}

/** Returns the value if set, otherwise `fallback` (default null). */
export function valueOf(value, fallback = null) {
  return isSet(value) ? value : fallback;
}

/** `tel:` href with punctuation stripped. */
export function telHref(value) {
  return isSet(value) ? `tel:${value.replace(/[^+\d]/g, "")}` : null;
}

/** `mailto:` href. */
export function mailHref(value) {
  return isSet(value) ? `mailto:${value}` : null;
}

/** wa.me link from a digits-only number. */
export function whatsappHref(value) {
  return isSet(value) ? `https://wa.me/${value.replace(/\D/g, "")}` : null;
}

/** Company registration line, or null when the number is not yet supplied. */
export function registrationLine() {
  if (isUnset(site.companyNumber)) return null;
  return `Registered in ${site.jurisdiction}, Company No. ${site.companyNumber}`;
}

/**
 * Lists every value still awaiting real data. Used by the dev-time warning
 * below and by `npm run audit`, so an unfilled detail is visible to the team
 * without ever being visible to a visitor.
 */
export function unsetKeys() {
  const missing = [];

  const walk = (object, prefix = "") => {
    for (const [key, value] of Object.entries(object)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, path);
      } else if (isUnset(value)) {
        missing.push(path);
      }
    }
  };

  walk(site);
  return missing;
}

// Dev-time reminder. Never runs in production.
if (import.meta.env?.DEV) {
  const missing = unsetKeys();
  if (missing.length > 0) {
    console.warn(
      `[Navora] ${missing.length} business detail(s) still unset and hidden from the UI:\n  ` +
        missing.join("\n  ") +
        "\n\nFill them in src/config/site.js — see HANDOVER.md."
    );
  }
}
