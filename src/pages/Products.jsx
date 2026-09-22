import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import EmptyState from "../components/common/EmptyState";
import ProductCard from "../components/cards/ProductCard";
import ProductCardSkeleton from "../components/cards/ProductCardSkeleton";
import { getProducts } from "../lib/sanity";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import {
  catalogueCta,
  emptyState,
  filters,
  hero,
} from "../content/products";

const validFilters = new Set(filters.map((f) => f.id));

/** Navora's own products lead, then CMS display order. */
function ownBrandFirst(a, b) {
  const rank = (p) => (p.ownership === "navora-brand" ? 0 : 1);
  if (rank(a) !== rank(b)) return rank(a) - rank(b);
  return (a.displayOrder ?? 99) - (b.displayOrder ?? 99);
}

function Products() {
  const [products, setProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // The filter lives in the URL so a category tile on the home page lands
  // pre-filtered, and the view can be shared or bookmarked.
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

  return (
    <>
      <Seo {...pageSeo.products} />

      <PageHero heading={hero.heading} text={hero.text} />

      <section className="section">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter products">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className="filter-chip"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <p className="products-count" role="status" aria-live="polite">
            {loading
              ? "Loading products…"
              : `${visible.length} ${visible.length === 1 ? "product" : "products"}${
                  activeFilter === "all"
                    ? ""
                    : ` in ${filters.find((f) => f.id === activeFilter)?.label}`
                }`}
          </p>

          {loading && (
            <div className="products-grid">
              {Array.from({ length: 6 }, (_, i) => (
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
              {visible.map((product) => (
                <ProductCard key={product._id || product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- Catalogue CTA --- */}
      <section className="section section--tight cta-band">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{catalogueCta.heading}</h2>
            <p>{catalogueCta.text}</p>
          </div>
          <div className="btn-row">
            <Button to="/contact" variant="gold" size="lg">
              {ctaLabels.requestProductInfo}
            </Button>
          </div>
        </div>
      </section>

      {/* --- Assurance note --- */}
      <section className="section section--tight">
        <div className="container-narrow">
          <SectionHeading
            heading="Specifications and documentation"
            lead="Product specifications, formats, quantities, certifications and availability vary by supplier and destination. Certification and farming-method claims are published only where Navora holds current evidence relevant to the named product and supplier."
            center
          />
        </div>
      </section>
    </>
  );
}

export default Products;
