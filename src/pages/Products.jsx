import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import SectionHeading from "../components/common/SectionHeading";
import EmptyState from "../components/common/EmptyState";
import Icon from "../components/common/Icon";
import ProductCard from "../components/cards/ProductCard";
import ProductCardSkeleton from "../components/cards/ProductCardSkeleton";
import { getProducts } from "../lib/sanity";
import { getPrefetched } from "../lib/prefetch";
import { CATALOGUE_PATH } from "../lib/downloads";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import {
  catalogueCta,
  comparison,
  emptyState,
  filters,
  glance,
  hero,
  heroSummary,
  offerExplained,
  productFaq,
  rangeHeading,
} from "../content/products";
import AtAGlance from "../components/sections/AtAGlance";
import FaqSection from "../components/sections/FaqSection";
import CategoryComparison from "../components/sections/CategoryComparison";
import { faqPage } from "../lib/structuredData";
import QaSection from "../components/sections/QaSection";
import ProofSection from "../components/sections/ProofSection";
import { proofFacts, proofIntro } from "../content/proof";

const validFilters = new Set(filters.map((f) => f.id));

/** Navora's own products lead, then CMS display order. */
function ownBrandFirst(a, b) {
  const rank = (p) => (p.ownership === "navora-brand" ? 0 : 1);
  if (rank(a) !== rank(b)) return rank(a) - rank(b);
  return (a.displayOrder ?? 99) - (b.displayOrder ?? 99);
}

function Products() {
  const [products, setProducts] = useState(() => getPrefetched("products") ?? null);
  const [searchParams, setSearchParams] = useSearchParams();

  const requested = searchParams.get("category");
  const activeFilter = requested && validFilters.has(requested) ? requested : "all";

  const setActiveFilter = (id) => {
    const next = new URLSearchParams(searchParams);
    if (id === "all") next.delete("category");
    else next.set("category", id);
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    let cancelled = false;
    getProducts().then((data) => {
      if (!cancelled) setProducts(data);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    if (!products) return [];
    const sorted = [...products].sort(ownBrandFirst);
    if (activeFilter === "all") return sorted;

    const filter = filters.find((item) => item.id === activeFilter);
    if (filter?.matches === "ownership") {
      return sorted.filter((product) => product.ownership === activeFilter);
    }
    return sorted.filter((product) => product.category === activeFilter);
  }, [products, activeFilter]);

  const loading = products === null;
  const total = products?.length ?? 0;

  return (
    <>
      <Seo {...pageSeo.products} jsonLd={faqPage(productFaq.items)} />

      {/* --- Page header --- */}
      <section className="section section--tight">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="chevronRight" />
            <span aria-current="page">Products</span>
          </nav>

          <span className="tag-pill">B2B sourcing &amp; brand portfolio</span>

          <div className="page-head">
            <h1>{hero.heading}</h1>
            <p className="page-head__summary">{heroSummary}</p>
            <p className="lead">{hero.text}</p>
          </div>

          <div className="btn-row" style={{ marginTop: 0, marginBottom: "var(--sp-5)" }}>
            <Button href={CATALOGUE_PATH} variant="secondary" download>
              <Icon name="download" />
              Download product catalogue (PDF)
            </Button>
          </div>

          {/* Verbatim from the Content Pack: what is provided, without
              claiming any certification Navora has not evidenced. */}
          <div className="notice">
            <Icon name="evidence" />
            <p>
              Product specifications, formats, quantities, certifications and
              availability vary by supplier and destination. Documentation is
              provided according to the product and destination market.
            </p>
          </div>
        </div>
      </section>

      {/* --- At a glance --- */}
      <AtAGlance {...glance} id="products-glance-heading" />

      {/* --- The offer, defined --- */}
      <QaSection {...offerExplained} id="products-offer-heading" />

      {/* --- Catalogue --- */}
      <section className="section section--warm" aria-labelledby="range-heading">
        <div className="container">
          <SectionHeading
            kicker={rangeHeading.kicker}
            heading={rangeHeading.heading}
            id="range-heading"
          />
          <div className="catalogue-bar">
            <div className="filters" role="group" aria-label="Filter products by category">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className="filter-chip"
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                  {filter.id === "all" && !loading ? ` (${total})` : ""}
                </button>
              ))}
            </div>

            <p className="catalogue-bar__count" role="status" aria-live="polite">
              {loading
                ? "Loading products…"
                : `${visible.length} ${visible.length === 1 ? "product" : "products"}`}
            </p>
          </div>

          {loading && (
            <div className="products-grid">
              {Array.from({ length: 8 }, (_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!loading && visible.length === 0 && (
            <EmptyState heading={emptyState.heading} text={emptyState.text}>
              <div className="btn-row" style={{ marginTop: 0 }}>
                <Button variant="secondary" onClick={() => setActiveFilter("all")}>
                  Show all products
                </Button>
                <Button to="/contact" variant="primary">
                  {ctaLabels.requestProductInfo}
                </Button>
              </div>
            </EmptyState>
          )}

          {!loading && visible.length > 0 && (
            <div className="products-grid">
              {visible.map((product, index) => (
                <ProductCard
                  key={product._id || product.slug}
                  product={product}
                  className={`reveal reveal--delay-${(index % 4) + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Category comparison --- */}
      {!loading && <CategoryComparison {...comparison} filters={filters} products={products} />}

      {/* --- What Navora can actually say about assurance --- */}
      <section className="section section--tight">
        <div className="container assurance">
          <div className="assurance__item">
            <h2 className="assurance__title">
              <Icon name="evidence" />
              Documentation on request
            </h2>
            <p className="assurance__text">
              Where relevant, we request available specifications, test reports,
              certifications and business documents for review.
            </p>
          </div>

          <div className="assurance__item">
            <h2 className="assurance__title">
              <Icon name="source" />
              Known source
            </h2>
            <p className="assurance__text">
              We aim to understand who supplies each product, where it comes from
              and what information is available about its production and handling.
            </p>
          </div>

          <div className="assurance__item">
            <h2 className="assurance__title">
              <Icon name="company" />
              UK-registered counterparty
            </h2>
            <p className="assurance__text">
              Navora Global Limited is registered in England and Wales and works
              with an operating partner in Kerala, India.
            </p>
          </div>
        </div>
      </section>

      {/* --- Verifiable facts --- */}
      <ProofSection
        {...proofIntro}
        heading="What you can check before you buy"
        items={[
          proofFacts.catalogue,
          proofFacts.labels,
          proofFacts.documents,
          proofFacts.accuracy,
          proofFacts.registered,
          proofFacts.writtenTerms,
        ]}
        id="products-proof-heading"
        warm
      />

      {/* --- FAQ --- */}
      <FaqSection {...productFaq} id="products-faq-heading" />

      {/* --- Catalogue CTA --- */}
      <section className="section section--tight">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__inner">
              <span className="tag-pill">B2B commercial engagement</span>
              <h2>{catalogueCta.heading}</h2>
              <p>{catalogueCta.text}</p>

              <div className="btn-row">
                <Button to="/contact" variant="onDark" size="lg">
                  {ctaLabels.requestProductInfo}
                </Button>
                <Button to="/for-business" variant="onDarkOutline" size="lg">
                  {ctaLabels.discussRequirements}
                </Button>
                <Button href={CATALOGUE_PATH} variant="onDarkOutline" size="lg" download>
                  <Icon name="download" />
                  Catalogue (PDF)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Accuracy note --- */}
      <section className="section section--tight">
        <div className="container-narrow">
          <SectionHeading
            heading="Specifications and documentation"
            lead="Certification, farming-method and similar claims are published only where Navora holds current evidence relevant to the named product and supplier."
            center
          />
        </div>
      </section>
    </>
  );
}

export default Products;
