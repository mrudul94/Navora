import { useEffect, useMemo, useState } from "react";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import PageHero from "../components/common/PageHero";
import SectionHeading from "../components/common/SectionHeading";
import EmptyState from "../components/common/EmptyState";
import ProductCard from "../components/cards/ProductCard";
import { getProducts } from "../lib/sanity";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";
import {
  catalogueCta,
  emptyState,
  filters,
  hero,
} from "../content/products";

function Products() {
  const [products, setProducts] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

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
    if (activeFilter === "all") return products;

    const filter = filters.find((item) => item.id === activeFilter);

    if (filter?.matches === "ownership") {
      return products.filter((product) => product.ownership === activeFilter);
    }

    return products.filter((product) => product.category === activeFilter);
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

          <p className="products-count" role="status">
            {loading
              ? "Loading products…"
              : `Showing ${visible.length} ${
                  visible.length === 1 ? "product" : "products"
                }`}
          </p>

          {!loading && visible.length === 0 && (
            <EmptyState heading={emptyState.heading} text={emptyState.text}>
              <Button to="/contact" variant="primary">
                {ctaLabels.requestProductInfo}
              </Button>
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
            <Button to="/contact" variant="onDark" size="lg">
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
