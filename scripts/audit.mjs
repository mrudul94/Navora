/**
 * Pre-publication audit.
 *
 * Static checks that protect the things most likely to regress on this site:
 * removed claims creeping back, the enquiry pipeline losing its shared field
 * definitions, dead internal links, missing images, colour contrast, and the
 * Cloudflare hosting configuration.
 *
 *   npm run audit
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(resolve(root, p), "utf8");

let failures = 0;
const section = (name) => console.log(`\n${name}`);
const pass = (msg) => console.log(`  pass  ${msg}`);
const fail = (msg) => {
  console.log(`  FAIL  ${msg}`);
  failures++;
};

function walk(dir, test, out = []) {
  for (const entry of readdirSync(resolve(root, dir))) {
    const rel = join(dir, entry);
    if (statSync(resolve(root, rel)).isDirectory()) walk(rel, test, out);
    else if (test(entry)) out.push(rel.replace(/\\/g, "/"));
  }
  return out;
}

const sourceFiles = [
  ...walk("src", (f) => /\.(jsx?|css)$/.test(f)),
  "index.html",
];

// --- 1. Claims the content pack requires to be gone ------------------------
section("Removed claims");
{
  const banned = [
    ["ISO 22000", /ISO\s?22000/i],
    ["HACCP", /HACCP/i],
    ["FSSAI", /FSSAI/i],
    ["countries served", /\b45\s?\+|\b45 countries/i],
    ["regional hubs", /\b120\s?\+|regional hubs/i],
    ["on-time delivery", /99\.8/],
    ["acres protected", /12,000|12000 acres/i],
    ["partner families", /\b500\s?\+|partner families/i],
    ["medicinal", /medicinal/i],
    ["clinical", /clinical/i],
    ["healing", /healing/i],
    ["wellness", /wellness/i],
    ["luxury", /luxury/i],
    ["invented founder", /Elara/i],
    ["placeholder address", /St James/i],
    ["investor deck", /investor/i],
    ["global hotline", /hotline/i],
    ["fictional phone", /20\s?7946/],
    ["old phone", /484\s?2345/],
    ["old domain", /navoraglobal\.com/i],
    ["shop language", /Shop Collections|Download Credentials/i],
    ["lorem", /lorem ipsum/i],
    ["fake submit", /alert\(/],
  ];

  // The accuracy statement legitimately names the claim types it disclaims.
  const allowed = [
    "src/content/responsibleSourcing.js",
    "src/pages/WebsiteTerms.jsx",
  ];

  let hits = 0;
  for (const file of sourceFiles) {
    const content = read(file);
    for (const [label, pattern] of banned) {
      if (!pattern.test(content)) continue;
      if (allowed.includes(file) && /pesticide|organic|farming-method|medical/i.test(content)) {
        continue;
      }
      fail(`${label} found in ${file}`);
      hits++;
    }
  }
  if (hits === 0) pass(`no banned claim found across ${sourceFiles.length} files`);
}

// --- 2. Enquiry pipeline ---------------------------------------------------
section("Enquiry pipeline");
{
  const endpointPath = "functions/api/enquiry.js";

  if (!existsSync(resolve(root, endpointPath))) {
    fail(`${endpointPath} is missing — the forms have no backend`);
  } else {
    const endpoint = read(endpointPath);
    const form = read("src/components/common/EnquiryForm.jsx");
    const forms = read("src/content/forms.js");

    // Both ends must read the field list from the same module, so there is no
    // second copy that can silently fall out of sync.
    if (/from "\.\.\/\.\.\/src\/content\/forms\.js"/.test(endpoint)) {
      pass("endpoint validates against src/content/forms.js — no duplicated field list");
    } else {
      fail("endpoint does not import the shared form definitions");
    }

    if (form.includes('"/api/enquiry"')) pass("form posts to /api/enquiry");
    else fail("form does not post to /api/enquiry");

    const formNames = [...forms.matchAll(/formName:\s*"([^"]+)"/g)].map((m) => m[1]);
    pass(`${formNames.length} forms defined: ${formNames.join(", ")}`);

    for (const [label, present] of [
      ["server-side validation", /function validate\(/.test(endpoint)],
      ["honeypot handling", /botField/.test(endpoint)],
      ["rate limiting", /isRateLimited/.test(endpoint)],
      ["durable storage", /INSERT INTO enquiries/.test(endpoint)],
    ]) {
      (present ? pass : fail)(label);
    }

    if (/user_agent|cf-connecting-ip["']?\s*\)\s*,/.test(endpoint) && !/fingerprintOf/.test(endpoint)) {
      fail("endpoint appears to store a raw IP address");
    } else {
      pass("no raw IP address is stored with an enquiry");
    }
  }

  if (/netlify/i.test(read("index.html"))) {
    fail("index.html still contains Netlify form markup");
  } else {
    pass("no Netlify markup left in index.html");
  }

}

// --- 3. Internal links -----------------------------------------------------
section("Internal links");
{
  const app = read("src/App.jsx");
  const routes = new Set(
    [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]).filter((r) => !r.includes(":") && r !== "*")
  );

  const targets = new Set();
  for (const file of sourceFiles.filter((f) => f.endsWith(".jsx") || f.endsWith(".js"))) {
    const content = read(file);
    for (const m of content.matchAll(/\bto=\{?"(\/[^"]*)"/g)) targets.add(m[1]);
    for (const m of content.matchAll(/\bpath:\s*"(\/[^"]*)"/g)) targets.add(m[1]);
  }

  const dead = [...targets].filter((t) => {
    const path = t.split("#")[0].split("?")[0]; // ignore fragments and queries
    return !routes.has(path) && !path.startsWith("/products/");
  });

  if (dead.length) fail(`dead internal links: ${dead.join(", ")}`);
  else pass(`${targets.size} link targets all resolve to a route`);
}

// --- 4. Images -------------------------------------------------------------
section("Images");
{
  // Matches quoted paths and paths inside template literals alike.
  const referenced = new Set();
  for (const file of sourceFiles) {
    for (const m of read(file).matchAll(
      /\/images\/(?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:webp|jpg|jpeg|png|svg)/gi
    )) {
      referenced.add(m[0]);
    }
  }

  const manifest = new Set(
    [
      ...read("public/images/README.md").matchAll(
        /`((?:[a-z0-9-]+\/)*[a-z0-9-]+\.(?:webp|jpg|png|svg))`/g
      ),
    ].map((m) => `/images/${m[1]}`)
  );

  const undocumented = [...referenced].filter((r) => !manifest.has(r));
  const unused = [...manifest].filter((m) => !referenced.has(m));

  if (undocumented.length) fail(`referenced but not documented: ${undocumented.join(", ")}`);
  if (unused.length) fail(`documented but unused: ${unused.join(", ")}`);
  if (!undocumented.length && !unused.length) {
    pass(`${referenced.size} images referenced, all documented in public/images/README.md`);
  }

  const missing = [...referenced].filter(
    (r) => !existsSync(resolve(root, "public", r.slice(1)))
  );
  if (missing.length) {
    console.log(
      `  note  ${missing.length} image file(s) not yet supplied — placeholders render until then (see HANDOVER.md)`
    );
  } else {
    pass("all referenced image files are present");
  }
}

// --- 5. Unconfirmed business facts -----------------------------------------
section("Business facts");
{
  const config = read("src/config/site.js");
  const founderConfig = read("src/config/founders.js");
  const unset = [...config.matchAll(/(\w+):\s*"REPLACE_[A-Z_]+"/g)].map((m) => m[1]);
  const founderUnset = [
    ...new Set([...founderConfig.matchAll(/(\w+):\s*"REPLACE_[A-Z_]+"/g)].map((m) => m[1])),
  ];

  // `featuresToConfirm` in home.js holds claims awaiting verification. They are
  // data only — nothing renders them — so the file is allowed to contain them.
  const allowedFiles = new Set([
    "src/config/site.js",
    "src/config/founders.js",
    "src/content/home.js",
  ]);

  const leaked = sourceFiles
    .filter((f) => !allowedFiles.has(f))
    .filter((f) => /REPLACE_[A-Z]/.test(read(f)));

  if (leaked.length) fail(`REPLACE_ placeholder outside the config files: ${leaked.join(", ")}`);
  else pass("placeholders are confined to the config files");

  if (unset.length) {
    console.log(
      `  note  ${unset.length} business detail(s) unset and HIDDEN from the UI: ${unset.join(", ")}`
    );
  } else {
    pass("every business fact is supplied");
  }

  if (founderUnset.length) {
    console.log(`  note  founder fields unset and hidden: ${founderUnset.join(", ")}`);
  }
}

// --- 5b. Nothing unfinished in the built output ----------------------------
section("Built output");
{
  const distIndex = resolve(root, "dist/index.html");
  if (!existsSync(distIndex)) {
    console.log("  note  dist/ not built yet — run npm run build, then re-audit");
  } else {
    const pages = walk("dist", (f) => f.endsWith(".html"));
    const banned = [/IMAGE TO FOLLOW/i, /To confirm:/i, /REPLACE_[A-Z]/];
    const offenders = [];

    for (const page of pages) {
      const html = read(page);
      for (const pattern of banned) {
        if (pattern.test(html)) offenders.push(`${page} (${pattern})`);
      }
    }

    if (offenders.length) {
      for (const offender of offenders) fail(`placeholder text in ${offender}`);
    } else {
      pass(`${pages.length} prerendered pages contain no placeholder text`);
    }

    // Prerendering must actually have produced content.
    const thin = pages.filter((page) => {
      const text = read(page).replace(/<[^>]+>/g, " ").replace(/s+/g, " ").trim();
      return text.length < 500;
    });
    if (thin.length) fail(`${thin.length} page(s) prerendered with almost no text: ${thin.join(", ")}`);
    else pass(`all ${pages.length} pages prerendered with real content`);
  }
}

// --- 6. Colour contrast ----------------------------------------------------
section("Colour contrast (WCAG AA, 4.5:1)");
{
  const css = read("src/styles/tokens.css");
  const t = {};
  for (const m of css.matchAll(/--([a-z0-9-]+):\s*(#[0-9a-f]{6})/gi)) t[m[1]] = m[2];

  const luminance = (hex) => {
    const c = hex.replace("#", "");
    const v = [0, 2, 4]
      .map((i) => parseInt(c.substr(i, 2), 16) / 255)
      .map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
    return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
  };
  const ratio = (a, b) => {
    const [l1, l2] = [luminance(a), luminance(b)];
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  };

  const W = "#ffffff";
  const pairs = [
    ["body text", t.ink, t.paper],
    ["secondary text", t["ink-2"], t.paper],
    ["muted on paper", t.muted, t.paper],
    ["muted on surface-alt", t.muted, t["surface-alt"]],
    ["kicker on paper", t["green-600"], t.paper],
    ["kicker on sage", t["green-600"], t.sage],
    ["body on sage", t.ink, t.sage],
    ["muted on sage", t.muted, t.sage],
    ["gold text on paper", t["gold-text"], t.paper],
    ["gold text on white", t["gold-text"], t.surface],
    ["gold text on gold-soft", t["gold-text"], t["gold-soft"]],
    ["gold on deep green", t["gold-on-dark"], t["green-deep"]],
    ["white on deep green", W, t["green-deep"]],
    ["gold button label", "#20180a", t.gold],
    ["primary button", W, t.green],
    ["primary button hover", W, t["green-600"]],
    ["link on white", t["green-600"], t.surface],
    ["footer text on green", W, t.green],
    ["footer heading on deep green", t["gold-on-dark"], t["green-deep"]],
    ["badge supplier", t.green, t["green-50"]],
    ["badge coming-soon", t["gold-text"], t["gold-soft"]],
    ["badge future-category", t["ink-2"], t["surface-sunken"]],
    ["step marker on green", t["gold-on-dark"], t.green],
    ["error text", t.danger, t["danger-50"]],
    ["success text", t.success, t["success-50"]],
  ];

  let worst = Infinity;
  let bad = 0;
  for (const [name, fg, bg] of pairs) {
    const r = ratio(fg, bg);
    worst = Math.min(worst, r);
    if (r < 4.5) {
      fail(`${name} is ${r.toFixed(2)}:1`);
      bad++;
    }
  }
  if (!bad) pass(`${pairs.length} text pairs pass, lowest ${worst.toFixed(2)}:1`);
}

// --- 7. Housekeeping -------------------------------------------------------
section("Housekeeping");
{
  const has = (p) => existsSync(resolve(root, p));
  const redirects = has("public/_redirects") ? read("public/_redirects") : "";
  const routes = has("public/_routes.json") ? read("public/_routes.json") : "";
  const wrangler = has("wrangler.toml") ? read("wrangler.toml") : "";

  const checks = [
    [".env is git-ignored", read(".gitignore").includes(".env")],
    ["no leftover netlify.toml", !has("netlify.toml")],
    ["wrangler.toml exists", Boolean(wrangler)],
    ["wrangler.toml publishes dist/", /pages_build_output_dir\s*=\s*"dist"/.test(wrangler)],
    ["D1 binding is configured", /binding\s*=\s*"DB"/.test(wrangler) && /database_id\s*=\s*"[0-9a-f-]{36}"/.test(wrangler)],
    ["_redirects exists", Boolean(redirects)],
    [
      // Routes are prerendered to their own index.html; a catch-all would
      // shadow them and serve the home page for every URL.
      "_redirects has no SPA catch-all (would shadow prerendered routes)",
      !redirects.split("\n").some((line) => line.trim().startsWith("/*")),
    ],
    ["404.html prerendered", has("dist/404.html") || !has("dist")],
    ["_headers exists", has("public/_headers")],
    ["_routes.json limits the Function to /api/*", /"include":\s*\[\s*"\/api\/\*"\s*\]/.test(routes)],
    ["D1 migration exists", has("migrations/0001_create_enquiries.sql")],
    ["no console.log in src", !sourceFiles.some((f) => f.startsWith("src/") && /console\.log\(/.test(read(f)))],
    ["robots.txt exists", has("public/robots.txt")],
    ["sitemap.xml exists", has("public/sitemap.xml")],
    ["no stale dist committed", !has("dist") || read(".gitignore").includes("dist")],
  ];

  for (const [name, ok] of checks) (ok ? pass : fail)(name);

  if (/X-Robots-Tag:\s*noindex/i.test(read("public/_headers"))) {
    console.log(
      "  note  public/_headers sets X-Robots-Tag: noindex — the site is hidden from search engines. Remove that line at launch (see HANDOVER.md)."
    );
  } else {
    pass("site is indexable (no X-Robots-Tag: noindex)");
  }
}

console.log(
  failures
    ? `\n${failures} audit check(s) failed\n`
    : "\nAudit passed.\n"
);
process.exit(failures ? 1 : 0);
