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

  const dead = [...targets].filter(
    (t) => !routes.has(t) && !t.startsWith("/products/")
  );

  if (dead.length) fail(`dead internal links: ${dead.join(", ")}`);
  else pass(`${targets.size} link targets all resolve to a route`);
}

// --- 4. Images -------------------------------------------------------------
section("Images");
{
  const referenced = new Set();
  for (const file of sourceFiles) {
    for (const m of read(file).matchAll(/["'](\/images\/[^"']+)["']/g)) {
      referenced.add(m[1]);
    }
  }

  const manifest = new Set(
    [...read("docs/IMAGES.md").matchAll(/`([a-z0-9-]+\.(?:webp|jpg|png))`/g)].map(
      (m) => `/images/${m[1]}`
    )
  );

  const undocumented = [...referenced].filter((r) => !manifest.has(r));
  const unused = [...manifest].filter((m) => !referenced.has(m));

  if (undocumented.length) fail(`referenced but not documented: ${undocumented.join(", ")}`);
  if (unused.length) fail(`documented but unused: ${unused.join(", ")}`);
  if (!undocumented.length && !unused.length) {
    pass(`${referenced.size} images referenced, all documented in docs/IMAGES.md`);
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
  const todos = [...config.matchAll(/(\w+):\s*"TODO_CONFIRM_([A-Z_]+)"/g)].map((m) => m[1]);

  const leaked = sourceFiles
    .filter((f) => f !== "src/config/site.js" && f !== "src/components/common/ConfirmValue.jsx")
    .filter((f) => read(f).includes("TODO_CONFIRM_"));

  if (leaked.length) fail(`TODO_CONFIRM hard-coded outside config: ${leaked.join(", ")}`);
  else pass("all unconfirmed facts are confined to src/config/site.js");

  if (todos.length) {
    console.log(
      `  note  ${todos.length} unconfirmed: ${todos.join(", ")} — shown as visible "To confirm" chips`
    );
  } else {
    pass("every business fact is confirmed");
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
    ["body text on rice", t.pepper, t.rice],
    ["body text on jute", t.pepper, t.jute],
    ["body text on jute-soft", t.pepper, t["jute-soft"]],
    ["secondary text on rice", t["ink-2"], t.rice],
    ["secondary text on jute", t["ink-2"], t.jute],
    ["muted on rice", t.muted, t.rice],
    ["eyebrow (turmeric-text) on rice", t["turmeric-text"], t.rice],
    ["eyebrow (turmeric-text) on jute", t["turmeric-text"], t.jute],
    ["terracotta text on rice", t["terracotta-text"], t.rice],
    ["cardamom heading on rice", t.cardamom, t.rice],
    ["link on rice", t["cardamom-600"], t.rice],
    ["white on cardamom", W, t.cardamom],
    ["white on cardamom-deep", W, t["cardamom-deep"]],
    ["gold on cardamom", t["gold-on-dark"], t.cardamom],
    ["gold on cardamom-deep", t["gold-on-dark"], t["cardamom-deep"]],
    ["gold button label", "#1e1405", t.turmeric],
    ["step number", t["turmeric-text"], t.jute],
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

  // --- Decorative-only guard ---------------------------------------------
  // --turmeric is 2.76:1 on rice and --brass is 3.47:1 on cardamom. Both are
  // fills and rules, never type. This is the trap the previous redesign fell
  // into, so it is asserted rather than left to review.
  const decorative = [
    ["--turmeric", t.turmeric, t.rice],
    ["--brass", t.brass, t.cardamom],
  ];

  for (const [name, colour, ground] of decorative) {
    if (ratio(colour, ground) >= 4.5) {
      console.log(`  note  ${name} now passes as text — the decorative-only rule can be relaxed`);
    }
  }

  const cssFiles = walk("src/styles", (f) => f.endsWith(".css"));
  const misuse = [];
  const DECORATIVE = ["var(--turmeric)", "var(--brass)"];

  for (const file of cssFiles) {
    for (const rawLine of read(file).split(String.fromCharCode(10))) {
      const line = rawLine.trim();
      const isColourDecl =
        line.startsWith("color:") || line.startsWith("-webkit-text-fill-color:");
      if (isColourDecl && DECORATIVE.some((token) => line.includes(token))) {
        misuse.push(`${file}: ${line}`);
      }
    }
  }

  if (misuse.length) {
    for (const m of misuse) fail(`decorative colour used as text — ${m}`);
  } else {
    pass("--turmeric and --brass are never used as a text colour");
  }
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
      "_redirects puts the SPA fallback last",
      redirects.lastIndexOf("/*") > redirects.lastIndexOf("301"),
    ],
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
