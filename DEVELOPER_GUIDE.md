# Navora Global — Developer Guide & Architecture Standards

This guide is written for any engineer maintaining, updating, or fixing bugs in this repository. It documents the architectural decisions, code conventions, and safety guardrails.

---

## 1. System Architecture

```
[ Visitor Browser ] 
        │
        ▼
[ Cloudflare CDN & Pages ] ─── Static Assets (React 19 SPA, Fonts, Images)
        │
        ├── POST /api/enquiry
        │         │
        │         ▼
        │   [ Cloudflare Pages Function ] (functions/api/enquiry.js)
        │         ├── 1. Validate fields against src/content/forms.js
        │         ├── 2. Honeypot check & IP hash rate-limiting
        │         ├── 3. Write record to Cloudflare D1 Database (navora-enquiries)
        │         └── 4. Forward email notification via Resend API
        │
        └── Product Queries
                  │
                  ▼
            [ Sanity CMS Studio ] (navora-cms/)
                  │
                  └── (Offline Fallback: src/content/productsFallback.js)
```

---

## 2. Directory Layout & Separation of Concerns

Maintain strict separation between **presentation**, **data/content**, and **configuration**:

```
├── .editorconfig               # Uniform indentation & encoding across all IDEs
├── eslint.config.js            # Code quality rules
├── wrangler.toml               # Cloudflare Pages & D1 database bindings
├── functions/
│   └── api/
│       └── enquiry.js          # Cloudflare serverless endpoint for contact/business forms
├── navora-cms/                 # Sanity Studio CMS project (manages product catalog)
├── migrations/                 # Cloudflare D1 SQL schema migrations
├── public/                     # Static files (images, favicon, _headers, _redirects)
├── scripts/                    # Audit, smoke tests, and sitemap generators
└── src/
    ├── config/
    │   ├── site.js             # Single source of truth for business details & legal facts
    │   └── cookies.js          # Cookie declarations and categories
    ├── content/                # ALL text copy, SEO metadata, and form definitions
    ├── components/
    │   ├── cards/              # Product and feature card components
    │   └── common/             # Reusable primitives (Button, Icon, Form inputs, SEO)
    ├── layout/                 # Navbar, Footer, CookieConsent modal, and MainLayout
    ├── lib/                    # Sanity client, consent manager, and custom hooks
    ├── pages/                  # Route components (Home, About, Products, Contact, etc.)
    └── styles/                 # CSS tokens, base styles, layout, and component CSS
```

---

## 3. Core Coding Standards

### A. Content Separation (Rule #1)
* **Never hardcode business copy or contact details directly in JSX.**
* If text needs to be changed, edit the relevant file in `src/content/<page>.js`.
* If company details (phone, email, registration number, address) change, update `src/config/site.js`.

### B. Styling & Design System
* The project uses **Vanilla CSS with semantic custom properties (tokens)** defined in `src/styles/tokens.css`.
* Always use predefined tokens for:
  * Colours: `var(--green-900)`, `var(--sand-50)`, `var(--gold)`, etc.
  * Spacing: `var(--space-sm)`, `var(--space-md)`, `var(--space-lg)`, etc.
  * Typography: `var(--font-heading)` (Fraunces), `var(--font-body)` (Plus Jakarta Sans).
* Ensure all text colours meet **WCAG AA contrast ratio (4.5:1 minimum)**. The automated audit will fail if any combination does not pass.

### C. Forms & Backend Parity
* Both forms (`Contact` and `For Business`) use a single shared engine.
* Form fields are defined **once** in `src/content/forms.js`.
* The serverless backend (`functions/api/enquiry.js`) imports the exact same file to perform server-side validation.
* **Never create a separate field list in the backend.** Adding or editing a field in `src/content/forms.js` automatically updates both client UI and server validation.

### D. Zero Downtime Sanity Fallback
* When fetching products, the client calls `src/lib/sanity.js`.
* If the Sanity CMS API is unreachable or not yet configured, it seamlessly falls back to `src/content/productsFallback.js`.
* When updating offline fallback products, run `npm run seed` to keep the Sanity seed dataset in sync.

---

## 4. Verification & Quality Commands

Always run the automated verification pipeline before deploying or committing major changes:

```bash
# 1. Full verification suite (runs lint, audit, smoke tests, and build):
npm run verify

# 2. Individual tasks:
npm run lint          # ESLint syntax & react hooks verification
npm run audit         # Content claims sweep, form validation parity, contrast audit
npm run smoke         # Headless browser rendering and DOM interaction tests
npm run build         # Production Vite build & sitemap regeneration
```

---

## 5. Deployment Workflow

### Direct Manual Deploy:
```bash
npm run deploy
```
* This runs `npm run verify` first. If any lint, audit, or test fails, the deployment will abort safely.

### Enquiry Operations:
```bash
# View the 50 most recent form enquiries stored in Cloudflare D1:
npm run enquiries

# Apply database migrations to remote D1 database:
npm run db:migrate
```
