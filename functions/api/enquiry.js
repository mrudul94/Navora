/**
 * POST /api/enquiry — the website's enquiry endpoint.
 *
 * Runs as a Cloudflare Pages Function. It validates the submission against the
 * SAME field definitions the React form renders from (src/content/forms.js),
 * so the client and server can never disagree about what a form contains.
 *
 * Every accepted enquiry is written to D1 first. Email notification is a
 * separate, optional step: if it is not configured or fails, the enquiry is
 * still safely stored and the visitor still gets a success response. Nothing
 * is ever silently lost.
 */

import { allForms } from "../../src/content/forms.js";

const MAX_BODY_BYTES = 32 * 1024;
const MAX_FIELD_LENGTH = 5000;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX = 5;

const formsByName = new Map(allForms.map((form) => [form.formName, form]));

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Server-side mirror of the client validation. Never trust the client's. */
function validate(config, values) {
  const errors = {};

  for (const field of config.fields) {
    const raw = values[field.name];
    const value = typeof raw === "string" ? raw.trim() : "";

    if (value.length > MAX_FIELD_LENGTH) {
      errors[field.name] = `${field.label} is too long.`;
      continue;
    }

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }

    if (field.type === "email" && value && !isValidEmail(value)) {
      errors[field.name] = "Enter a valid email address.";
      continue;
    }

    // A select must contain one of its own options.
    if (field.type === "select" && value && !field.options.includes(value)) {
      errors[field.name] = `Choose a valid ${field.label.toLowerCase()}.`;
    }
  }

  if (config.requiresConsent && values.consent !== "yes" && values.consent !== true) {
    errors.consent = "Please confirm you agree before submitting.";
  }

  return errors;
}

/** Pulls the common columns out of a submission, whichever form it came from. */
function columns(values) {
  const pick = (...names) => {
    for (const name of names) {
      const value = values[name];
      if (typeof value === "string" && value.trim()) return value.trim();
    }
    return null;
  };

  return {
    name: pick("name", "fullName"),
    company: pick("company"),
    email: pick("email", "workEmail"),
    telephone: pick("telephone"),
    country: pick("country", "countryOrMarket"),
    enquiry_type: pick("enquiryType", "businessType"),
    product: pick("product", "productOfInterest"),
    message: pick("message"),
  };
}

/**
 * Salted digest of the submitter's IP, used only to throttle repeats.
 *
 * The raw IP is never stored: it is personal data we have no reason to keep,
 * and a one-way digest answers "have we just seen this submitter?" equally
 * well. The salt makes the digest useless outside this database.
 */
async function fingerprintOf(request, salt) {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for");

  if (!ip) return null;

  const bytes = new TextEncoder().encode(`${salt || "navora"}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Simple per-submitter throttle backed by the same D1 table. Enough to stop
 * casual form spam; the honeypot handles naive bots and Cloudflare the rest.
 */
async function isRateLimited(db, fingerprint) {
  if (!fingerprint) return false;

  const since = new Date(
    Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000
  ).toISOString();

  try {
    const row = await db
      .prepare(
        "SELECT COUNT(*) AS n FROM enquiries WHERE submitter_hash = ?1 AND submitted_at > ?2"
      )
      .bind(fingerprint, since)
      .first();
    return (row?.n ?? 0) >= RATE_LIMIT_MAX;
  } catch {
    // Never block a genuine enquiry because the check itself failed.
    return false;
  }
}

async function sendNotification(env, config, values, id) {
  const apiKey = env.RESEND_API_KEY;
  const to = env.NOTIFY_EMAIL;
  const from = env.NOTIFY_FROM;

  if (!apiKey || !to || !from) return false;

  const lines = config.fields
    .map((field) => {
      const value = values[field.name];
      return value ? `${field.label}: ${value}` : null;
    })
    .filter(Boolean)
    .join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.workEmail || values.email || undefined,
        subject: `Website enquiry — ${values.company || values.fullName || values.name || "new enquiry"}`,
        text: `A new enquiry was submitted on the Navora Global website.\n\nReference: ${id}\nForm: ${config.formName}\n\n${lines}\n`,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Enquiry notification failed", error);
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // --- Parse ------------------------------------------------------------
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: "That submission is too large." }, 413);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Could not read that submission." }, 400);
  }

  const config = formsByName.get(body?.form);
  if (!config) {
    return json({ ok: false, error: "Unknown form." }, 400);
  }

  const values = body.values && typeof body.values === "object" ? body.values : {};

  // --- Honeypot ---------------------------------------------------------
  // Accept silently so a bot cannot tell it was caught.
  if (typeof body.botField === "string" && body.botField.trim() !== "") {
    return json({ ok: true });
  }

  // --- Validate ---------------------------------------------------------
  const errors = validate(config, values);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, errors }, 422);
  }

  if (!env.DB) {
    console.error("D1 binding DB is missing — enquiry could not be stored");
    return json(
      {
        ok: false,
        error:
          "We could not record your enquiry just now. Please email us directly and we will pick it up.",
      },
      503
    );
  }

  // --- Throttle ---------------------------------------------------------
  const fingerprint = await fingerprintOf(request, env.SUBMITTER_SALT);

  if (await isRateLimited(env.DB, fingerprint)) {
    return json(
      {
        ok: false,
        error:
          "We have received several enquiries from you already. Please try again shortly, or email us directly.",
      },
      429
    );
  }

  // --- Store ------------------------------------------------------------
  const id = crypto.randomUUID();
  const submittedAt = new Date().toISOString();
  const common = columns(values);

  try {
    await env.DB.prepare(
      `INSERT INTO enquiries
         (id, form, submitted_at, name, company, email, telephone, country,
          enquiry_type, product, message, payload, submitter_hash, ip_country, notified)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, 0)`
    )
      .bind(
        id,
        config.formName,
        submittedAt,
        common.name,
        common.company,
        common.email,
        common.telephone,
        common.country,
        common.enquiry_type,
        common.product,
        common.message,
        JSON.stringify(values),
        fingerprint,
        request.cf?.country ?? null
      )
      .run();
  } catch (error) {
    console.error("Could not store enquiry", error);
    return json(
      {
        ok: false,
        error:
          "We could not record your enquiry just now. Please try again, or email us directly and we will pick it up.",
      },
      500
    );
  }

  // --- Notify (optional) -------------------------------------------------
  const notified = await sendNotification(env, config, values, id);
  if (notified) {
    try {
      await env.DB.prepare("UPDATE enquiries SET notified = 1 WHERE id = ?1")
        .bind(id)
        .run();
    } catch {
      // The enquiry is stored and the email was sent; the flag is cosmetic.
    }
  }

  return json({ ok: true, reference: id });
}

/** Pages returns 405 for methods with no handler; make GET explicit. */
export async function onRequestGet() {
  return json({ ok: false, error: "Method not allowed." }, 405);
}
