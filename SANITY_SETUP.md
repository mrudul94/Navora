# Sanity CMS setup

The Studio in `navora-cms/` manages product records. Page copy is not in the
CMS — it lives in `src/content/` (see the README).

## Connect

```bash
cd navora-cms
npm install
cp .env.example .env     # add SANITY_STUDIO_PROJECT_ID
npm run dev              # Studio at http://localhost:3333
```

The React site needs the same project id in the root `.env` as
`VITE_SANITY_PROJECT_ID`. Neither `.env` is committed.

## Load the approved products

```bash
cd navora-cms
npx sanity dataset import seed/products.ndjson production --replace
```

This imports the eight products approved in the content pack. Seven are
published; **Navora Honey Shot is imported hidden** until its label data is
confirmed — see HANDOVER.md.

`seed/products.ndjson` is generated from `src/content/productsFallback.js`.
Edit that file and run `node scripts/generate-seed.mjs` rather than editing the
NDJSON by hand, so the seed and the site's offline fallback stay identical.

## The product record

Fields follow the Product page template in the content pack (p. 6). The website
omits any field left empty, so publish only what has been confirmed.

Fields that carry legal weight:

- **Ownership badge** — Navora Brand means Navora developed and markets it.
  Supplier Product means it is sourced through a supplier and Navora is not the
  manufacturer. Getting this wrong misrepresents the business.
- **Certifications** — name, scope and a link to evidence. Leave empty unless
  the certificate is current and held for that named product or facility. The
  site states plainly when none is published.
- **Illustrative image** — tick for any photo that is not the actual product.
  The site then captions it "Illustrative image".
- **Show on the website** — leave off for Navora-branded food until the
  ingredient list, net quantity, nutrition, storage, shelf life, packer details,
  country of origin and allergen statement are confirmed.

## If the CMS is unreachable

`src/lib/sanity.js` falls back to `src/content/productsFallback.js`, so the
Products page always renders. A CMS outage degrades to the approved copy rather
than an empty page or a stuck loading message.
