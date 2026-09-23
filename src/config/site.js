/**
 * Single source of truth for Navora's business facts.
 *
 * Values beginning with `TODO_CONFIRM_` have not yet been supplied by the
 * client. They are rendered on the site as a visible amber placeholder chip
 * rather than silently shown as real data. See HANDOVER.md.
 */

export const TODO_PREFIX = "TODO_CONFIRM_";

export const site = {
  legalName: "Navora Global Limited",
  shortName: "Navora Global",
  wordmark: "NAVORA",
  wordmarkSub: "GLOBAL LIMITED",

  // --- Contact -------------------------------------------------------------
  email: "info@navoraglobal.uk",
  telephone: "+44 7880 119991",
  // WhatsApp Business number, international format. Powers the floating chat
  // button and the Contact page link. Set to "" to hide WhatsApp everywhere.
  whatsapp: "+44 7880 119991",
  businessHours: "Monday to Saturday, 9:00 am – 5:00 pm",

  // --- Registration --------------------------------------------------------
  companyNumber: "TODO_CONFIRM_COMPANY_NUMBER",
  jurisdiction: "England and Wales",
  registeredOffice: "29 Nightingale Road, South Croydon, CR2 8PS, United Kingdom",

  // --- Operating partner ---------------------------------------------------
  // Do not publish the partner's name until they have confirmed permission.
  keralaPartner: "TODO_CONFIRM_PARTNER_COMPANY_NAME",
  keralaPartnerLocation: "Kerala, India",

  // --- Web -----------------------------------------------------------------
  domain: "navoraglobal.uk",
  origin: "https://www.navoraglobal.uk",
  domains: {
    primary: "navoraglobal.uk",
    additional: ["navoraglobal.org", "navoraglobal.info"],
  },

  // Official profiles (LinkedIn company page, Companies House entry, Google
  // Business Profile…). Published as schema.org sameAs so search engines and
  // AI assistants can tell this Navora apart from others with a similar name.
  // Add full https:// URLs only for profiles Navora controls.
  sameAs: [],

  // --- Leadership & Founders ------------------------------------------------
  albertEmail: "albert@navoraglobal.uk",
  abhinavEmail: "abhinav@navoraglobal.uk",

  // --- Legal ---------------------------------------------------------------
  legalLastReviewed: "21 September 2026",
  copyrightYear: new Date().getFullYear(),
};

/** True when a value is still an unconfirmed placeholder. */
export function isPlaceholder(value) {
  return typeof value === "string" && value.startsWith(TODO_PREFIX);
}

/** Human-readable label for an unconfirmed value, e.g. "PRIMARY BUSINESS EMAIL". */
export function placeholderLabel(value) {
  if (!isPlaceholder(value)) return "";
  return value.slice(TODO_PREFIX.length).replace(/_/g, " ");
}

/** Returns the value, or `fallback` when it is still a placeholder. */
export function resolved(value, fallback = null) {
  return isPlaceholder(value) ? fallback : value;
}
