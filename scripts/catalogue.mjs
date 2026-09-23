/**
 * Builds the downloadable PDFs from the same product data as the website:
 *
 *   dist/downloads/navora-product-catalogue.pdf   cover, one page per product,
 *                                                  and a how-to-enquire page
 *   dist/downloads/products/<slug>.pdf            one sheet per product
 *
 * Called from scripts/prerender.mjs, which has already fetched the products,
 * so the PDFs always match the pages. Only fields that have a value are
 * printed — the same content rules apply as on the site: no invented specs,
 * certifications or claims.
 */
import PDFDocument from "pdfkit";
import sharp from "sharp";
import { createWriteStream, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { CATALOGUE_PATH, productSheetPath } from "../src/lib/downloads.js";

// --- Brand ---------------------------------------------------------------------
const C = {
  cream: "#f7f2e9",
  card: "#fffcf7",
  ink: "#231a14",
  ink2: "#4d4038",
  muted: "#6f6154",
  line: "#e6dccb",
  orange: "#c1521c",
  orangeText: "#a8461a",
  orangeSoft: "#fbeade",
  orangeOnDark: "#e0783f",
  footer: "#241c16",
  footerText: "#b3a595",
  green: "#1f4a2c",
};

const A4 = { w: 595.28, h: 841.89 };
const M = 48; // page margin
const CONTENT_W = A4.w - M * 2;

/**
 * Brand fonts as static TTFs. pdfkit mis-embeds WOFF2 (text can render
 * invisibly in some PDF viewers), so these come from @expo-google-fonts
 * rather than the Fontsource WOFF2 files the website uses.
 */
function registerFonts(doc, root) {
  const f = (pkg, weight, file) => join(root, "node_modules/@expo-google-fonts", pkg, weight, file);
  doc.registerFont("Display", f("fraunces", "600SemiBold", "Fraunces_600SemiBold.ttf"));
  doc.registerFont("Body", f("plus-jakarta-sans", "400Regular", "PlusJakartaSans_400Regular.ttf"));
  doc.registerFont("BodySemi", f("plus-jakarta-sans", "600SemiBold", "PlusJakartaSans_600SemiBold.ttf"));
  doc.registerFont("BodyBold", f("plus-jakarta-sans", "700Bold", "PlusJakartaSans_700Bold.ttf"));
}

// --- Images ----------------------------------------------------------------------

const categoryImage = {
  spices: "category-spices.webp",
  "honey-products": "category-honey.webp",
  "millets-grains": "category-millets.webp",
  rice: "category-rice.webp",
  "future-categories": "category-produce.webp",
};

/** Product photo (CMS) or its category image, cropped to the sheet's frame, as JPEG. */
async function productImage(product, root, width, height) {
  let source = null;
  try {
    if (product.imageUrl) {
      const res = await fetch(product.imageUrl);
      if (res.ok) source = Buffer.from(await res.arrayBuffer());
    }
  } catch {
    // Offline or CDN error: fall through to the category image.
  }
  if (!source) {
    const file = categoryImage[product.category];
    const path = file && join(root, "public/images", file);
    if (path && existsSync(path)) source = readFileSync(path);
  }
  if (!source) return null;
  return sharp(source)
    .resize(Math.round(width * 2), Math.round(height * 2), { fit: "cover" })
    .jpeg({ quality: 82 })
    .toBuffer();
}

// --- Drawing helpers -------------------------------------------------------------

function pill(doc, text, x, y, { fill = C.orangeSoft, color = C.orangeText } = {}) {
  doc.font("BodyBold").fontSize(7.5);
  const label = text.toUpperCase();
  const w = doc.widthOfString(label, { characterSpacing: 0.8 }) + 16;
  doc.roundedRect(x, y, w, 17, 8.5).fill(fill);
  doc.fillColor(color).text(label, x + 8, y + 5, { characterSpacing: 0.8, lineBreak: false });
  return w;
}

function kicker(doc, text, x, y, color = C.orangeText) {
  doc.font("BodyBold").fontSize(8).fillColor(color)
    .text(text.toUpperCase(), x, y, { characterSpacing: 1.2, lineBreak: false });
}

function pageFooter(doc, site, pageLabel) {
  const y = A4.h - M + 10;
  doc.moveTo(M, y - 10).lineTo(A4.w - M, y - 10).lineWidth(0.6).strokeColor(C.line).stroke();
  doc.font("Body").fontSize(7.5).fillColor(C.muted)
    .text(
      `${site.legalName} · Registered in ${site.jurisdiction} · ${site.domain}`,
      M, y, { width: CONTENT_W - 60, lineBreak: false }
    );
  if (pageLabel) {
    doc.text(pageLabel, A4.w - M - 60, y, { width: 60, align: "right", lineBreak: false });
  }
}

function listValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(", ");
  return value == null ? "" : String(value).trim();
}

// --- Pages -----------------------------------------------------------------------

function coverPage(doc, { site, productsCopy, products, edition }) {
  doc.rect(0, 0, A4.w, A4.h).fill(C.footer);

  doc.image(doc.navoraLogo, M, M, { width: 150 });

  let y = 250;
  kicker(doc, "Product catalogue", M, y, C.orangeOnDark);
  y += 22;
  doc.font("Display").fontSize(34).fillColor("#ffffff")
    .text(productsCopy.hero.heading, M, y, { width: CONTENT_W * 0.85, lineGap: 2 });
  y = doc.y + 16;
  doc.font("Body").fontSize(11).fillColor(C.footerText)
    .text(productsCopy.hero.text, M, y, { width: CONTENT_W * 0.85, lineGap: 3 });

  // Contents
  y = doc.y + 34;
  doc.moveTo(M, y).lineTo(A4.w - M, y).lineWidth(0.6).strokeColor("#4a3d32").stroke();
  y += 16;
  kicker(doc, "In this catalogue", M, y, C.orangeOnDark);
  y += 20;
  const colW = CONTENT_W / 2;
  products.forEach((product, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = M + col * colW;
    const yy = y + row * 20;
    doc.font("BodySemi").fontSize(10.5).fillColor("#ffffff")
      .text(product.name, x, yy, { width: colW - 90, lineBreak: false });
    doc.font("Body").fontSize(8).fillColor(C.footerText)
      .text(productsCopy.ownershipLabels[product.ownership] || "", x + colW - 90, yy + 2, {
        width: 80, lineBreak: false,
      });
  });

  // Contact block
  const by = A4.h - M - 70;
  doc.moveTo(M, by - 14).lineTo(A4.w - M, by - 14).lineWidth(0.6).strokeColor("#4a3d32").stroke();
  doc.font("BodyBold").fontSize(10).fillColor("#ffffff").text(site.legalName, M, by);
  doc.font("Body").fontSize(9).fillColor(C.footerText)
    .text(`${site.email}  ·  ${site.telephone}  ·  ${site.domain}`, M, by + 16)
    .text(`Registered in ${site.jurisdiction}  ·  ${site.registeredOffice}`, M, by + 30);
  doc.text(`Edition: ${edition}`, M, by + 44);
}

async function productPage(doc, { product, site, productsCopy, root, pageLabel }) {
  doc.rect(0, 0, A4.w, A4.h).fill(C.cream);

  // Header strip
  doc.image(doc.navoraLogo, M, M - 14, { width: 70 });
  kicker(doc, "Product sheet", A4.w - M - 120, M - 4, C.muted);
  let y = M + 30;

  pill(doc, productsCopy.ownershipLabels[product.ownership] || "Product", M, y);
  y += 28;

  doc.font("Display").fontSize(28).fillColor(C.ink).text(product.name, M, y, { width: CONTENT_W });
  y = doc.y + 4;
  if (product.subheading) {
    doc.font("Body").fontSize(11.5).fillColor(C.muted).text(product.subheading, M, y, { width: CONTENT_W });
    y = doc.y + 4;
  }
  y += 10;

  // Image
  const imgH = 230;
  const image = await productImage(product, root, CONTENT_W, imgH);
  if (image) {
    doc.save();
    doc.roundedRect(M, y, CONTENT_W, imgH, 8).clip();
    doc.image(image, M, y, { width: CONTENT_W, height: imgH });
    doc.restore();
    y += imgH + 18;
  }

  // Description
  const description = product.description || product.shortDescription;
  if (description) {
    doc.font("Body").fontSize(10.5).fillColor(C.ink2)
      .text(description, M, y, { width: CONTENT_W, lineGap: 3 });
    y = doc.y + 16;
  }

  // Specification table — only rows with a value
  const rows = Object.entries(productsCopy.specLabels)
    .map(([key, label]) => [label, listValue(product[key])])
    .filter(([, value]) => value);

  if (rows.length) {
    kicker(doc, "Specification", M, y);
    y += 16;
    const labelW = 150;
    for (const [label, value] of rows) {
      doc.font("Body").fontSize(9.5);
      const h = Math.max(doc.heightOfString(value, { width: CONTENT_W - labelW - 16 }), 12) + 12;
      doc.moveTo(M, y).lineTo(A4.w - M, y).lineWidth(0.6).strokeColor(C.line).stroke();
      doc.font("BodySemi").fontSize(9.5).fillColor(C.ink).text(label, M, y + 6, { width: labelW });
      doc.font("Body").fontSize(9.5).fillColor(C.ink2)
        .text(value, M + labelW + 16, y + 6, { width: CONTENT_W - labelW - 16 });
      y += h;
    }
    doc.moveTo(M, y).lineTo(A4.w - M, y).lineWidth(0.6).strokeColor(C.line).stroke();
    y += 16;
  }

  // Certifications and documentation
  const certs = Array.isArray(product.certifications)
    ? product.certifications.filter((c) => c?.name)
    : [];
  const certText = certs.length
    ? certs.map((c) => (c.scope ? `${c.name} (${c.scope})` : c.name)).join("; ")
    : productsCopy.detailCopy.certificationsEmpty;
  const docText = listValue(product.documentation) || productsCopy.detailCopy.documentationEmpty;

  doc.font("BodySemi").fontSize(9.5).fillColor(C.ink).text("Certifications", M, y);
  doc.font("Body").fontSize(9).fillColor(C.ink2).text(certText, M, doc.y + 2, { width: CONTENT_W, lineGap: 2 });
  y = doc.y + 8;
  doc.font("BodySemi").fontSize(9.5).fillColor(C.ink).text("Documentation", M, y);
  doc.font("Body").fontSize(9).fillColor(C.ink2).text(docText, M, doc.y + 2, { width: CONTENT_W, lineGap: 2 });
  y = doc.y + 18;

  // Enquiry box, kept above the footer
  const url = `${site.origin}/products/${product.slug}`;
  const boxH = 86;
  // Pinned to the bottom of the page; moves to a new page only if the
  // content above has run into it.
  const boxY = A4.h - M - 30 - boxH;
  if (y > boxY) doc.addPage().rect(0, 0, A4.w, A4.h).fill(C.cream);
  doc.roundedRect(M, boxY, CONTENT_W, boxH, 8).fill(C.orangeSoft);
  doc.font("Display").fontSize(13).fillColor(C.ink)
    .text(productsCopy.detailCopy.enquiryHeading, M + 18, boxY + 14, { width: CONTENT_W - 36 });
  doc.font("Body").fontSize(9).fillColor(C.ink2)
    .text(productsCopy.detailCopy.enquiryText, M + 18, doc.y + 3, { width: CONTENT_W - 36 });
  doc.font("BodySemi").fontSize(9).fillColor(C.orangeText)
    .text(`${site.email}  ·  ${site.telephone}  ·  ${url}`, M + 18, doc.y + 6, {
      width: CONTENT_W - 36, link: url, lineBreak: false,
    });

  pageFooter(doc, site, pageLabel);
}

function backPage(doc, { site, atAGlance, productsCopy }) {
  doc.rect(0, 0, A4.w, A4.h).fill(C.cream);
  let y = M + 20;
  kicker(doc, "Working with Navora", M, y);
  y += 20;
  doc.font("Display").fontSize(26).fillColor(C.ink).text(atAGlance.steps.heading, M, y);
  y = doc.y + 20;

  atAGlance.steps.items.forEach((step, i) => {
    doc.circle(M + 11, y + 9, 11).fill(C.orangeSoft);
    doc.font("BodyBold").fontSize(10).fillColor(C.orangeText)
      .text(String(i + 1), M, y + 3.5, { width: 22, align: "center" });
    doc.font("Body").fontSize(11).fillColor(C.ink2).text(step, M + 36, y + 2, { width: CONTENT_W - 36 });
    y = Math.max(doc.y, y + 22) + 12;
  });

  y += 16;
  atAGlance.columns.forEach((column, i) => {
    const x = M + i * (CONTENT_W / 2);
    kicker(doc, column.heading, x, y);
    let yy = y + 18;
    for (const item of column.items) {
      doc.font("Body").fontSize(10).fillColor(C.ink2).text(`•  ${item}`, x, yy, { width: CONTENT_W / 2 - 16 });
      yy = doc.y + 5;
    }
  });

  // Contact panel
  const py = A4.h - M - 190;
  doc.roundedRect(M, py, CONTENT_W, 150, 10).fill(C.footer);
  kicker(doc, "Contact", M + 24, py + 22, C.orangeOnDark);
  doc.font("Display").fontSize(18).fillColor("#ffffff").text(site.legalName, M + 24, py + 40);
  doc.font("Body").fontSize(10).fillColor(C.footerText)
    .text(`Email: ${site.email}`, M + 24, doc.y + 8)
    .text(`${site.whatsapp ? "Telephone / WhatsApp" : "Telephone"}: ${site.telephone}`)
    .text(`Website: ${site.origin.replace(/^https?:\/\//, "")}`)
    .text(`Registered office: ${site.registeredOffice}`);

  doc.font("Body").fontSize(8).fillColor(C.muted)
    .text(productsCopy.hero.text, M, A4.h - M - 30, { width: CONTENT_W, lineGap: 1 });
}

// --- Documents ---------------------------------------------------------------------

function newDoc(root, logo, title, site) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    autoFirstPage: false,
    info: {
      Title: title,
      Author: site.legalName,
      Subject: "Indian food products for international business",
      Keywords: "Navora Global, Indian food sourcing, spices, honey, millets, rice",
    },
  });
  registerFonts(doc, root);
  // Stored under a prefixed name: pdfkit uses _root internally.
  doc.navoraLogo = logo;
  return doc;
}

function save(doc, file) {
  mkdirSync(dirname(file), { recursive: true });
  return new Promise((resolve, reject) => {
    const stream = createWriteStream(file);
    stream.on("finish", resolve);
    stream.on("error", reject);
    doc.pipe(stream);
    doc.end();
  });
}

/** Navora's own products first, then CMS display order — as on the Products page. */
function ownBrandFirst(a, b) {
  const rank = (p) => (p.ownership === "navora-brand" ? 0 : 1);
  if (rank(a) !== rank(b)) return rank(a) - rank(b);
  return (a.displayOrder ?? 99) - (b.displayOrder ?? 99);
}


export async function buildCatalogue({ root, dist, products, site, productsCopy, atAGlance }) {
  const logo = await sharp(join(root, "public/logo.png")).resize(600).png().toBuffer();
  const list = products.filter((p) => p.slug).sort(ownBrandFirst);
  const edition = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  // Full catalogue
  const doc = newDoc(root, logo, `${site.legalName} — Product Catalogue`, site);
  doc.addPage();
  coverPage(doc, { site, productsCopy, products: list, edition });
  for (const [i, product] of list.entries()) {
    doc.addPage();
    await productPage(doc, {
      product, site, productsCopy, root, pageLabel: `${i + 2} / ${list.length + 2}`,
    });
  }
  doc.addPage();
  backPage(doc, { site, atAGlance, productsCopy });
  await save(doc, join(dist, CATALOGUE_PATH));

  // One sheet per product
  for (const product of list) {
    const sheet = newDoc(root, logo, `${product.name} — ${site.legalName} product sheet`, site);
    sheet.addPage();
    await productPage(sheet, { product, site, productsCopy, root, pageLabel: edition });
    await save(sheet, join(dist, productSheetPath(product.slug)));
  }

  return list.length;
}
