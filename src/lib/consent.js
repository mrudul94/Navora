/**
 * Consent storage and enforcement.
 *
 * Design rules:
 *  - Absence of a valid record means NO consent. Every failure path defaults
 *    to denied, never to granted.
 *  - Records are versioned and expire, so stale consent is never reused.
 *  - `loadConsentedScripts()` is the only sanctioned place to inject a
 *    non-essential tag.
 */

import {
  CONSENT_VERSION,
  CONSENT_MAX_AGE_DAYS,
  STORAGE_KEY,
  optionalCategories,
} from "../config/cookies";

const MAX_AGE_MS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 * 1000;

const listeners = new Set();

/** All optional categories denied — the safe default. */
export function deniedConsent() {
  return Object.fromEntries(optionalCategories.map((c) => [c.id, false]));
}

/** All optional categories granted. */
export function grantedConsent() {
  return Object.fromEntries(optionalCategories.map((c) => [c.id, true]));
}

/**
 * Reads the stored record. Returns null when there is none, when it is
 * malformed, when it was written for an older category set, or when it has
 * expired — in every one of those cases the visitor must be asked again.
 */
export function getConsent() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    // Private mode or storage blocked: treat as no consent.
    return null;
  }

  if (!raw) return null;

  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    return null;
  }

  if (!record || typeof record !== "object") return null;
  if (record.v !== CONSENT_VERSION) return null;
  if (typeof record.ts !== "number" || Number.isNaN(record.ts)) return null;
  if (Date.now() - record.ts > MAX_AGE_MS) return null;

  const prefs = deniedConsent();
  for (const category of optionalCategories) {
    prefs[category.id] = record[category.id] === true;
  }
  return prefs;
}

/** True when this category has been explicitly granted. */
export function hasConsent(categoryId) {
  const prefs = getConsent();
  return prefs ? prefs[categoryId] === true : false;
}

/** True when the visitor has not yet made a valid choice. */
export function needsConsentChoice() {
  return getConsent() === null;
}

/** Persists a choice and notifies subscribers. */
export function setConsent(prefs) {
  const next = { ...deniedConsent(), ...prefs };
  const record = { v: CONSENT_VERSION, ts: Date.now(), ...next };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable — the choice applies to this page view only.
  }

  notify(next);
  return next;
}

/** Clears the record so the banner is shown again. */
export function resetConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nothing to do */
  }
  notify(null);
}

function notify(prefs) {
  for (const listener of listeners) {
    try {
      listener(prefs);
    } catch (error) {
      console.error("Consent listener failed", error);
    }
  }
}

/** Subscribes to consent changes. Returns an unsubscribe function. */
export function onConsentChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// --- Preferences dialog channel --------------------------------------------
// Lets the footer button and the Cookie Notice page reopen the panel without
// prop-drilling through the whole tree.

const OPEN_EVENT = "navora:open-cookie-preferences";

export function openPreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export function onOpenPreferences(callback) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}

// --- Enforcement ------------------------------------------------------------

/**
 * The ONLY sanctioned place to load a non-essential script.
 *
 * Nothing is registered at launch: the site currently sets no analytics or
 * marketing cookies. When one is added, register it here so it can never run
 * before consent, and so withdrawing consent tears it down again.
 *
 * Example:
 *   registerConsentedScript("analytics", {
 *     load: () => { ...inject tag... },
 *     unload: () => { ...remove tag, clear its cookies... },
 *   });
 */
const registry = [];

export function registerConsentedScript(categoryId, { load, unload }) {
  registry.push({ categoryId, load, unload, loaded: false });
}

export function loadConsentedScripts() {
  for (const entry of registry) {
    const allowed = hasConsent(entry.categoryId);

    if (allowed && !entry.loaded) {
      entry.load();
      entry.loaded = true;
    } else if (!allowed && entry.loaded) {
      entry.unload?.();
      entry.loaded = false;
    }
  }
}

/** Wires enforcement to consent changes. Called once from MainLayout. */
export function initConsentEnforcement() {
  loadConsentedScripts();
  return onConsentChange(loadConsentedScripts);
}
