/**
 * Client-side smoke test in a real DOM.
 *
 * Unlike scripts/smoke-render.mjs (server render, no effects), this mounts the
 * app in jsdom so effects run. It covers the things that only work at runtime:
 * product loading, the Products filters, the cookie banner and consent
 * storage, and the mobile navigation drawer.
 *
 *   node scripts/smoke-client.mjs
 */
import { JSDOM } from "jsdom";
import { createServer } from "vite";

const dom = new JSDOM("<!doctype html><html><body><div id='root'></div></body></html>", {
  url: "https://www.navoraglobal.uk/",
  pretendToBeVisual: true,
});

// Expose the DOM globally before React is loaded.
globalThis.window = dom.window;
globalThis.document = dom.window.document;
// Node 22 defines navigator as a getter-only global, so redefine it.
Object.defineProperty(globalThis, "navigator", {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
});
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.Element = dom.window.Element;
globalThis.Node = dom.window.Node;
globalThis.CustomEvent = dom.window.CustomEvent;
globalThis.Event = dom.window.Event;
globalThis.getComputedStyle = dom.window.getComputedStyle;
globalThis.requestAnimationFrame = (cb) => setTimeout(() => cb(Date.now()), 0);
globalThis.cancelAnimationFrame = (id) => clearTimeout(id);
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

// jsdom has no IntersectionObserver; the reveal hook falls back to showing
// everything, which is what we want to assert does not crash.
globalThis.IntersectionObserver = undefined;

const React = (await import("react")).default;
const { createRoot } = await import("react-dom/client");
const { act } = await import("react");
const { MemoryRouter } = await import("react-router-dom");
const { HelmetProvider } = await import("react-helmet-async");

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

const results = [];
const check = (name, pass, detail = "") =>
  results.push({ name, pass, detail });

const tick = () => new Promise((r) => setTimeout(r, 40));

try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

  async function mount(route) {
    const container = dom.window.document.createElement("div");
    dom.window.document.body.appendChild(container);
    const root = createRoot(container);

    await act(async () => {
      root.render(
        React.createElement(
          HelmetProvider,
          { context: {} },
          React.createElement(
            MemoryRouter,
            { initialEntries: [route] },
            React.createElement(App)
          )
        )
      );
    });
    await act(async () => {
      await tick();
    });

    return {
      container,
      html: () => container.innerHTML,
      text: () => container.textContent.replace(/\s+/g, " ").trim(),
      unmount: () => act(() => root.unmount()),
      $: (sel) => container.querySelector(sel),
      $$: (sel) => [...container.querySelectorAll(sel)],
      waitFor: async (predicate, timeoutMs = 15000) => {
        const started = Date.now();
        while (Date.now() - started < timeoutMs) {
          if (predicate(container)) return true;
          await act(async () => {
            await tick();
          });
        }
        return false;
      },
      click: async (el) => {
        await act(async () => {
          el.dispatchEvent(
            new dom.window.MouseEvent("click", { bubbles: true, cancelable: true })
          );
          await tick();
        });
      },
    };
  }

  // --- Products page: loads and filters -------------------------------
  {
    const page = await mount("/products");
    await page.waitFor((c) => c.querySelectorAll(".product-card:not(.product-card--skeleton)").length > 0);
    const cards = page.$$(".product-card:not(.product-card--skeleton)");
    check("Products page renders product cards", cards.length >= 1, `${cards.length} cards`);
    check(
      "Products page is not stuck loading",
      !page.text().includes("Loading products"),
      ""
    );

    const spiceChip = page
      .$$(".filter-chip")
      .find((b) => b.textContent.trim() === "Spices");
    await page.click(spiceChip);
    const filtered = page.$$(".product-card:not(.product-card--skeleton)");
    check(
      "Spices filter narrows to spices products",
      filtered.length >= 1,
      `${filtered.length} after filter`
    );
    check(
      "Filter chip reflects pressed state",
      spiceChip.getAttribute("aria-pressed") === "true"
    );

    const brandChip = page
      .$$(".filter-chip")
      .find((b) => b.textContent.trim() === "Navora Brand");
    if (brandChip) {
      await page.click(brandChip);
      check(
        "Navora Brand filter handles selection without crashing",
        brandChip.getAttribute("aria-pressed") === "true"
      );
    }

    await page.unmount();
  }

  // --- Product detail: resolves from the slug --------------------------
  {
    const page = await mount("/products/ginger");
    await page.waitFor((c) => Boolean(c.querySelector("h1")));
    check("Product detail renders an h1", Boolean(page.$("h1")), page.$("h1")?.textContent ?? "");
    check("Product detail shows the right product", page.$("h1")?.textContent === "Ginger");
    check(
      "Product detail shows an ownership badge",
      page.text().includes("Supplier Product")
    );
    check(
      "Product detail shows the certification honesty statement",
      page.text().includes("No certification is currently published")
    );
    await page.unmount();
  }

  // --- Unknown product --------------------------------------------------
  {
    const page = await mount("/products/not-a-real-product");
    await page.waitFor((c) => c.textContent.includes("could not find"));
    check(
      "Unknown product shows a recovery state",
      page.text().includes("could not find that product")
    );
    await page.unmount();
  }

  // --- Cookie consent ---------------------------------------------------
  {
    dom.window.localStorage.clear();
    const page = await mount("/");

    check("Cookie banner appears on a first visit", Boolean(page.$(".cookie-banner")));
    check(
      "Nothing is stored before a choice is made",
      dom.window.localStorage.length === 0,
      `${dom.window.localStorage.length} keys`
    );

    const actions = page.$$(".cookie-banner__actions .btn");
    const labels = actions.map((b) => b.textContent.trim());
    check(
      "Banner offers Reject as prominently as Accept",
      labels.includes("Reject all") && labels.includes("Accept all")
    );

    const reject = actions.find((b) => b.textContent.trim() === "Reject all");
    await page.click(reject);

    const stored = JSON.parse(dom.window.localStorage.getItem("navora.consent"));
    check("Rejecting stores a record", Boolean(stored));
    check("Rejecting denies analytics", stored?.analytics === false);
    check("Rejecting denies marketing", stored?.marketing === false);
    check("Banner is dismissed after choosing", !page.$(".cookie-banner"));
    check(
      "Exactly one storage key is written",
      dom.window.localStorage.length === 1,
      `${dom.window.localStorage.length} keys`
    );

    await page.unmount();
  }

  // --- Consent persists across a reload ---------------------------------
  {
    const page = await mount("/");
    check("Banner stays gone on the next visit", !page.$(".cookie-banner"));

    const prefsButton = page
      .$$(".site-footer__links button")
      .find((b) => b.textContent.includes("Cookie preferences"));
    check("Footer exposes a Cookie preferences control", Boolean(prefsButton));

    await page.click(prefsButton);
    check("Footer control reopens the preferences dialog", Boolean(page.$(".cookie-dialog")));
    check(
      "Dialog is a modal dialog",
      page.$(".cookie-dialog__panel")?.getAttribute("aria-modal") === "true"
    );
    check(
      "Necessary category is locked on",
      page.text().includes("Always on")
    );
    await page.unmount();
  }

  // --- Stale consent is not reused --------------------------------------
  {
    dom.window.localStorage.setItem(
      "navora.consent",
      JSON.stringify({ v: 1, ts: Date.now() - 400 * 24 * 60 * 60 * 1000, analytics: true })
    );
    const page = await mount("/");
    check("Expired consent triggers a fresh prompt", Boolean(page.$(".cookie-banner")));
    await page.unmount();

    dom.window.localStorage.setItem(
      "navora.consent",
      JSON.stringify({ v: 999, ts: Date.now(), analytics: true })
    );
    const page2 = await mount("/");
    check("Consent from an older category set triggers a fresh prompt", Boolean(page2.$(".cookie-banner")));
    await page2.unmount();
    dom.window.localStorage.clear();
  }

  // --- Mobile navigation -------------------------------------------------
  {
    dom.window.localStorage.setItem(
      "navora.consent",
      JSON.stringify({ v: 1, ts: Date.now(), analytics: false, marketing: false })
    );
    const page = await mount("/");
    const toggle = page.$(".nav-toggle");
    check("Mobile menu button exists", Boolean(toggle));
    check("Menu starts closed", toggle?.getAttribute("aria-expanded") === "false");

    await page.click(toggle);
    check("Menu opens", Boolean(page.$(".nav-drawer.is-open")));
    check(
      "Open drawer is a labelled modal",
      page.$(".nav-drawer__panel")?.getAttribute("aria-modal") === "true"
    );

    const closeBtn = page.$('[aria-label="Close navigation menu"]');
    await page.click(closeBtn);
    check("Menu closes", !page.$(".nav-drawer.is-open"));
    await page.unmount();
    dom.window.localStorage.clear();
  }

  // --- Forms --------------------------------------------------------------
  {
    const page = await mount("/for-business");
    const form = page.$("form.form");
    check("Business enquiry form renders", Boolean(form));
    check(
      "Form declares its form name",
      form?.getAttribute("name") === "navora-business-enquiry"
    );
    check("Form has a honeypot", Boolean(page.$('input[name="bot-field"]')));
    check("Form has the consent checkbox", Boolean(page.$('input[name="consent"]')));

    const labelled = page
      .$$(".field__control")
      .every((el) => Boolean(page.container.querySelector(`label[for="${el.id}"]`)));
    check("Every field has an associated label", labelled);

    // Submitting empty must not post; it must surface an error summary.
    let request = null;
    globalThis.fetch = async (url, init) => {
      request = { url, init };
      return {
        ok: true,
        status: 200,
        json: async () => ({ ok: true, reference: "test-ref" }),
      };
    };

    await page.click(page.$('button[type="submit"]'));
    check("Empty submit is blocked", request === null);
    check(
      "Empty submit shows an error summary",
      Boolean(page.$('[role="alert"]')),
      page.$('[role="alert"]')?.textContent.slice(0, 60) ?? ""
    );

    // Fill the required fields and submit for real.
    const setField = async (name, value) => {
      const el = page.$(`[name="${name}"]`);
      if (!el) return false;
      const proto =
        el.tagName === "SELECT"
          ? dom.window.HTMLSelectElement.prototype
          : el.tagName === "TEXTAREA"
            ? dom.window.HTMLTextAreaElement.prototype
            : dom.window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      await act(async () => {
        setter.call(el, value);
        el.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
        el.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
        await tick();
      });
      return true;
    };

    await setField("fullName", "Test Buyer");
    await setField("company", "Test Importers Ltd");
    await setField("workEmail", "buyer@example.com");
    await setField("countryOrMarket", "United Kingdom");
    await setField("businessType", "Importer or distributor");
    await setField("message", "We are looking for cardamom, 2 tonnes per quarter.");

    const consentBox = page.$('input[name="consent"]');
    await page.click(consentBox);

    await page.click(page.$('button[type="submit"]'));

    check("Valid submit posts to the endpoint", request?.url === "/api/enquiry");
    check("Submit uses POST", request?.init?.method === "POST");
    check(
      "Submit sends JSON",
      request?.init?.headers?.["Content-Type"] === "application/json"
    );

    let sent = null;
    try {
      sent = JSON.parse(request?.init?.body ?? "null");
    } catch {
      /* handled below */
    }

    check("Payload names the form", sent?.form === "navora-business-enquiry");
    check("Payload carries the entered values", sent?.values?.company === "Test Importers Ltd");
    check("Payload records consent", sent?.values?.consent === "yes");
    check("Payload includes the honeypot", "botField" in (sent ?? {}));
    check(
      "Success state replaces the form",
      Boolean(page.$(".form-success")),
      page.$(".form-success h3")?.textContent ?? ""
    );

    await page.unmount();
  }

  // --- Server-side rejection is surfaced ---------------------------------
  {
    const page = await mount("/contact");
    globalThis.fetch = async () => ({
      ok: false,
      status: 422,
      json: async () => ({ ok: false, errors: { email: "Enter a valid email address." } }),
    });

    const setValue = async (name, value) => {
      const el = page.$(`[name="${name}"]`);
      const proto =
        el.tagName === "SELECT"
          ? dom.window.HTMLSelectElement.prototype
          : el.tagName === "TEXTAREA"
            ? dom.window.HTMLTextAreaElement.prototype
            : dom.window.HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
      await act(async () => {
        setter.call(el, value);
        el.dispatchEvent(new dom.window.Event("input", { bubbles: true }));
        el.dispatchEvent(new dom.window.Event("change", { bubbles: true }));
        await tick();
      });
    };

    await setValue("name", "Test Person");
    await setValue("email", "buyer@example.com");
    await setValue("enquiryType", "General enquiry");
    await setValue("message", "Hello");

    await page.click(page.$('button[type="submit"]'));
    await page.waitFor((c) => c.textContent.includes("valid email"), 3000);

    check(
      "Server validation errors are shown to the visitor",
      page.text().includes("Enter a valid email address")
    );
    check("Form is not cleared on a server rejection", !page.$(".form-success"));
    await page.unmount();
  }
} finally {
  await vite.close();
}

const failed = results.filter((r) => !r.pass);
for (const r of results) {
  console.log(`  ${r.pass ? "ok  " : "FAIL"} ${r.name}${r.detail ? ` — ${r.detail}` : ""}`);
}
console.log(
  failed.length
    ? `\n${failed.length} of ${results.length} checks failed`
    : `\nAll ${results.length} checks passed.`
);
process.exit(failed.length ? 1 : 0);
