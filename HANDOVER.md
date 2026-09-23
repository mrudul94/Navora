# Handover — before this website is published

The site is code-complete: every page, route, form, legal document and piece of
copy is finished and the build passes. Five things still need input from Navora.
Items 1 and 2 are the ones that stop it going live today.

---

## 1. Photography — 12 files

Blocking. Until these exist, the affected sections render a tinted placeholder
block reading "Image to follow".

`docs/IMAGES.md` has the full table: exact filenames, subjects, aspect
ratios, minimum widths, and where to source the images. Save each file into
`public/images/` using the exact filename given.

When a stock photo is later replaced by a genuine Navora photograph, set
`illustrative: false` on that entry in `src/content/` so the "Illustrative
image" caption is removed. For products, use the **Illustrative image** toggle
on the image in the CMS.

---

## 2. Business details

Blocking. These live in **`src/config/site.js`**. Each unconfirmed value is
written as `TODO_CONFIRM_…` and renders on the site as a conspicuous amber
"To confirm" chip, so nothing unfinished can be mistaken for real data. Replace
the string and the chip disappears.

| Field | What is needed |
|---|---|
| `email` | Primary monitored business email |
| `telephone` | Active business telephone number |
| `businessHours` | e.g. "Monday to Friday, 9am to 5pm UK time" |
| `companyNumber` | Companies House number |
| `registeredOffice` | Registered office address, and confirmation it may be displayed |
| `keralaPartner` | Partner company's legal name — **and their written permission to name them** |
| `domain` | Final domain |
| `origin` | Full https:// origin; feeds canonical URLs, the sitemap and social cards |

`jurisdiction` is set to England and Wales, and the Website Terms state that as
the governing law. Change both if the company is registered elsewhere.

Set up branded email on the domain before putting an address on the site.

---

## 3. Logo

The header and footer use a type-set `NAVORA / GLOBAL LIMITED` wordmark. It is
clean, sharp at every size, and needs no file.

The previous gold, three-dimensional logo was removed: it belongs to the luxury
positioning the content pack abandons, and it does not work on a light
background. If you want a graphic mark, supply a vector or high-resolution
transparent version designed for a light background and it can be swapped into
`src/layout/Navbar.jsx`.

The favicon at `public/favicon.svg` is a simple green monogram and can stay or
be replaced.

---

## 4. Navora Honey Shot — before sale or promotion

**Navora Honey Shot is seeded as hidden** (`isPublished: false`). This is
deliberate. Before it is published, the product record needs:

- full ingredient list
- net quantity
- nutritional information
- storage instructions and shelf life
- manufacturer or packer details
- country of origin
- allergen statement

The same applies to the honey candy when it launches. The other seven products
are supplier or future categories and are seeded as published.

---

## 5. Legal review

The Privacy Notice, Cookie Notice and Website Terms have been written to
describe what this site actually does — Cloudflare hosting, security and
enquiry storage, the Sanity image CDN, self-hosted fonts, and one consent
record in local storage. They are accurate, but they are not a substitute for advice.

**Have a suitably qualified UK professional review all three before launch.**

---

## Loading the product data

Products are added and published in the Sanity Studio (`navora-cms/`). There
is no hardcoded product list or seed file. A published product shows on the
Products page straight away; push to `main` (which rebuilds) to add its
prerendered page, sitemap entry and PDF sheet.

If the CMS is unreachable, the Products page shows "Product information is
being updated" and asks visitors to send their requirement.

---

## Checks to run after filling the gaps

One command runs everything:

```bash
npm run verify     # lint → audit → smoke tests → build
```

It is made of four parts you can also run on their own:

| Command | Checks |
|---|---|
| `npm run lint` | ESLint across the repo |
| `npm run audit` | Removed claims, enquiry pipeline, dead links, image manifest, colour contrast, hosting config |
| `npm run smoke` | Renders every route, then drives the real interactions in a DOM |
| `npm run build` | Regenerates the sitemap and builds |

`npm run audit` is the one that matters most after an edit. It fails the build
if any removed claim reappears, if the enquiry endpoint stops
validating against the shared field list, if an internal link goes nowhere, or
if a colour pair drops below WCAG AA.

While photography and business details are outstanding it reports two expected
notes — 12 images not yet supplied, and 7 unconfirmed facts. Both disappear as
you complete items 1 and 2 above.

### Still to check by hand

These need a real browser and cannot be automated here:

- **Visual and responsive pass.** `npm run preview`, then walk every page at
  1440px, 768px and 360px. Confirm no horizontal scrolling at 360px.
- **Cookies in DevTools.** With storage cleared, load the site and confirm under
  Application that **no cookies and no local storage entries exist** before you
  choose. Then Reject all → one entry with `analytics: false`; reload → the
  banner stays gone; the footer "Cookie preferences" link reopens the panel.
- **No third-party font requests.** The Network tab should show no request to
  `fonts.googleapis.com` or `fonts.gstatic.com` on any page.
- **Forms end to end.** Submit both forms on the deployed site and confirm the
  rows appear via `npm run enquiries`. Email notification is off until you add
  a Resend key (see below) — enquiries are still stored without it.
- **Keyboard pass.** Tab through each page; focus should always be visible, the
  mobile drawer and cookie dialog should trap focus and close on Escape.

---

## Hosting and enquiries (Cloudflare)

The site runs on **Cloudflare Pages**. Enquiries are stored in a **D1**
database on your own Cloudflare account — no third-party form service.

```bash
npm run db:migrate      # apply the schema to the remote database (once)
npm run deploy          # verify, then deploy
npm run enquiries       # list the 50 most recent enquiries
```

### How updates reach the site

Deployment is **manual, by design** for now:

```bash
npm run deploy
```

That runs lint → audit → smoke tests → build, and only uploads if all of them
pass. A reintroduced false claim or a broken build stops the deploy rather than
shipping.

The code is on GitHub at `github.com/mrudul94/Navora`, but **pushing does not
deploy**. Git is version control and backup; `npm run deploy` is the deploy.

Two consequences worth knowing:

- Deploys depend on this machine and this Cloudflare login. Nobody else can
  currently publish a change.
- Each deploy gets its own permanent URL, and the live address always points at
  the newest. Rolling back is a click in the Cloudflare dashboard.

### Later: automatic deploys from Git

Worth doing at launch, not before — see the account note below. A Cloudflare
Pages project created by direct upload (which this one was) **cannot be
converted** to Git-connected, so this means creating a new project:

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
2. Select the `Navora` repository
3. Build command: **`npm run verify`** — not `npm run build`. Verify builds as
   its last step anyway, and using it means the claim audit and smoke tests
   gate every deploy. Given that false claims are why this site was rebuilt,
   that guard belongs in CI rather than only on a developer's machine.
4. Output directory: `dist`
5. Environment variable: `VITE_SANITY_PROJECT_ID`
6. Settings → Bindings → add D1: variable `DB` → database `navora-enquiries`

The `.pages.dev` address will differ from the current one, which stops
mattering once the real domain is attached.

### Who owns the hosting

The site currently runs on a **personal** Cloudflare account
(`mrudulp2002@gmail.com`). Navora's own content pack asks you to:

> Confirm that Navora owns and controls the domain, hosting account, CMS
> project, source code and business email accounts.

As it stands Navora controls none of the hosting, and enquiries from real
buyers would be stored under a personal login.

**Move before the first real enquiry arrives.** D1 databases cannot be
transferred between Cloudflare accounts. While the table is empty, recreating
it on a Navora-owned account is one command (`npm run db:migrate`). Once it
holds buyers' personal data it becomes an export, an import and a data
protection conversation.

The natural moment is when Navora's business email exists — already a blocking
item above. Doing the account move, the Git-connected project and the domain
connection together means setting up once instead of three times.

### Turning on email notification

Enquiries are stored whether or not email is configured, so this is optional
and can wait. To switch it on:

1. Create a free account at resend.com and verify the sending domain.
2. `npx wrangler pages secret put RESEND_API_KEY --project-name navora-global`
3. Set `NOTIFY_EMAIL` (where enquiries go) and `NOTIFY_FROM` (an address on the
   verified domain) in `wrangler.toml` or the Pages dashboard.

Until then, check `npm run enquiries` regularly — or the D1 console in the
Cloudflare dashboard. **This is the one operational gap:** nothing will prompt
you that an enquiry has arrived.

### What the endpoint does

`functions/api/enquiry.js` rejects unknown forms, silently accepts honeypot
hits, validates every field server-side against the same `src/content/forms.js`
the React form uses, throttles to 5 submissions per submitter per 10 minutes,
writes to D1, then optionally emails. It stores no raw IP address — only a
salted hash for throttling and the two-letter country Cloudflare reports.

### The site is currently hidden from search engines

`public/_headers` sets `X-Robots-Tag: noindex, nofollow` on every page. That is
deliberate: the site is deployed and working, but photography and several
business details are still outstanding, and a placeholder version of Navora's
site should not be indexed at the `.pages.dev` address.

**Remove that one line from `public/_headers` at launch**, then redeploy. It is
marked with a comment in the file, and `npm run audit` prints a note about it
on every run so it cannot be forgotten.

### Connecting the domain

Add the domain under the Pages project's Custom domains tab, then update
`origin` in `src/config/site.js` and rerun `npm run build` so canonical URLs,
the sitemap and social cards point at the real address.

---

## Things worth knowing

- **Legacy URLs redirect.** `/sustainability` → `/responsible-sourcing`,
  `/wholesale` → `/for-business`, `/privacy-policy` → `/privacy-notice`,
  `/terms-conditions` → `/website-terms`, and the broken `/c` route reported
  before handover → `/`. Handled both at the edge and in the router.
- **`.env` is now git-ignored.** It was previously committed. If this repo has
  history, rotate anything sensitive in it.
- **Analytics is not installed**, per the content pack's instruction to add it
  only after consent is handled. The consent machinery is built and ready —
  register any tag through `registerConsentedScript()` in `src/lib/consent.js`.
- **The old `dist/` was deleted.** It was a stale build still containing every
  removed claim, and would have published them if uploaded.
