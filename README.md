# Navora Global website

Marketing and enquiry website for **Navora Global Limited**, a UK-registered
food trading and market-access company connecting Indian farmers, producers and
food brands with buyers in the UK and international markets.

All site copy comes from the *Navora Global Website Content Pack* (19 September
2026). The pack is the source of truth for wording and for what may and may not
be claimed — see [Content rules](#content-rules).

## Stack

| Part | Choice |
|---|---|
| Build | Vite 8 |
| UI | React 19, React Router 7 |
| Head tags | react-helmet-async |
| Icons | react-icons (Lucide set) |
| Fonts | Plus Jakarta Sans + Fraunces, self-hosted via Fontsource |
| Content | Sanity CMS for products; JS modules for page copy |
| Forms | Cloudflare Pages Function + D1 |
| Hosting | Cloudflare Pages |

## Running locally

```bash
npm install
cp .env.example .env     # add your Sanity project id
npm run dev
```

| Script | Does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Regenerates the sitemap, then builds to `dist/` |
| `npm run preview` | Serves the production build |
| `npm run lint` | ESLint over the whole repo |
| `npm run audit` | Claim sweep, form parity, dead links, image manifest, contrast, housekeeping |
| `npm run smoke` | Renders every route, then drives the real interactions in jsdom |
| `npm run verify` | lint → audit → smoke → build. **Run this before every deploy.** |
| `npm run sitemap` | Regenerates `public/sitemap.xml` |
| `npm run seed` | Regenerates the CMS seed from the approved product copy |

`npm run audit` is the guard rail for this project: it fails if a removed claim
reappears, if a form field drifts out of sync with `index.html`, if an internal
link goes nowhere, or if a colour pair drops below WCAG AA.

The site runs without a Sanity connection: `src/lib/sanity.js` falls back to the
approved product copy in `src/content/productsFallback.js`.

## Layout

```
src/
  config/       site.js (business facts), cookies.js (cookie registry)
  content/      all page copy, SEO strings, form definitions
  components/   common/ primitives, cards/
  layout/       Navbar, Footer, CookieConsent, MainLayout
  lib/          sanity, consent, useReveal, useFocusTrap
  pages/        one file per route
  styles/       tokens → base → components → layout → pages
navora-cms/     Sanity Studio and the product schema
scripts/        sitemap and CMS seed generators
```

### Where to change things

| To change | Edit |
|---|---|
| Any page wording | `src/content/<page>.js` |
| Address, email, phone, company number | `src/config/site.js` |
| Navigation or footer links | `src/content/site.js` |
| Page titles and meta descriptions | `src/content/seo.js` |
| Enquiry form fields | `src/content/forms.js` **and** `index.html` |
| Cookies listed in the Cookie Notice | `src/config/cookies.js` |
| Colours, spacing, type scale | `src/styles/tokens.css` |
| Products | The Sanity Studio |

## Content rules

These are not stylistic preferences — they are why the previous site was
replaced.

1. **No unevidenced claims.** No certifications, country counts, hub counts,
   delivery percentages, acreage, farmer numbers or purity percentages unless
   Navora holds current evidence for the named product and supplier.
2. **No health claims.** Nothing medicinal, clinical, therapeutic or
   disease-related. Describe food quality, origin, taste, format and sourcing.
3. **Be clear about ownership.** Every product carries a badge: Navora Brand,
   Supplier Product, Coming Soon or Future Category. Navora is not the
   manufacturer of supplier products.
4. **No commitment language.** Nothing on the site is an offer to supply.
5. **Label illustrative images.** Any photo that is not a genuine Navora
   photograph is captioned as illustrative. See `docs/IMAGES.md`.
6. **No non-essential cookies before consent.** See below.

The pack's own test: *every statement should let Navora explain who made the
product, what Navora's role is, what evidence supports the claim, and who can
respond if a buyer asks for details.*

## Cookies

`src/config/cookies.js` is the single source of truth. The `/cookie-notice`
page renders its table from that file, so the published notice cannot drift
from reality.

The site currently sets **no analytics or marketing cookies**. The only stored
item is the visitor's consent choice, which is strictly necessary.

To add analytics later, register it through `registerConsentedScript()` in
`src/lib/consent.js` and add it to `src/config/cookies.js`. Injecting a tag
anywhere else bypasses consent.

## Forms

Both forms POST JSON to `/api/enquiry`, a Cloudflare Pages Function in
`functions/api/enquiry.js`. That endpoint imports the same
`src/content/forms.js` the React form renders from, so there is one field list
and the two ends cannot drift apart.

The endpoint, in order: rejects an unknown form, silently accepts anything with
the honeypot filled, validates every field server-side (never trusting the
client), throttles to 5 submissions per submitter per 10 minutes, writes the
enquiry to D1, then — only if `RESEND_API_KEY` is set — sends an email.

**Storage comes before notification by design.** If email is not configured or
fails, the enquiry is still stored and the visitor still sees success. Nothing
is lost.

No raw IP address is stored: only a salted SHA-256 digest used for throttling,
plus the two-letter country Cloudflare reports.

```bash
npm run db:migrate      # apply the schema to the remote D1
npm run enquiries       # list the 50 most recent enquiries
```

## Deploying

```bash
npm run deploy          # verify, then wrangler pages deploy
```

`wrangler.toml` holds the Pages config and the D1 binding;
`public/_redirects`, `public/_headers` and `public/_routes.json` carry the
legacy 301s, the SPA fallback, the security headers, and the rule that keeps
the Function scoped to `/api/*` so static pages stay on the CDN edge.

Set `VITE_SANITY_PROJECT_ID` in the Cloudflare Pages environment variables.
Email notification needs three more, and is optional:

```bash
npx wrangler pages secret put RESEND_API_KEY --project-name navora-global
# then set NOTIFY_EMAIL and NOTIFY_FROM in wrangler.toml or the dashboard
```

## Before publishing

See **[HANDOVER.md](HANDOVER.md)** — the site is code-complete but needs
photography and confirmed business details before it goes live.
