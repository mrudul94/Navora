import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import Img from "../components/common/Img";
import Icon from "../components/common/Icon";
import StatusBadge from "../components/common/StatusBadge";
import EmptyState from "../components/common/EmptyState";
import SectionHeading from "../components/common/SectionHeading";
import { getProductBySlug } from "../lib/sanity";
import { site } from "../config/site";
import { ctaLabels } from "../content/site";
import { detailCopy, ownershipLabels, specLabels } from "../content/products";

/** Renders a specification row only when there is a real value for it. */
function SpecRow({ label, value }) {
  if (value === undefined || value === null) return null;

  const list = Array.isArray(value) ? value.filter(Boolean) : null;
  if (list && list.length === 0) return null;
  if (!list && !String(value).trim()) return null;

  return (
    <div className="spec-row">
      <dt className="spec-row__label">{label}</dt>
      <dd className="spec-row__value">
        {list ? (
          <span className="tag-list">
            {list.map((item) => (
              <span className="tag" key={item}>
                {item}
              </span>
            ))}
          </span>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(undefined); // undefined = loading

  // Reset to the loading state during render when the slug changes, so a
  // previous product is never shown briefly under a new URL.
  const [renderedSlug, setRenderedSlug] = useState(slug);
  if (slug !== renderedSlug) {
    setRenderedSlug(slug);
    setProduct(undefined);
  }

  useEffect(() => {
    let cancelled = false;

    getProductBySlug(slug).then((data) => {
      if (!cancelled) setProduct(data);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // --- Loading -----------------------------------------------------------
  if (product === undefined) {
    return (
      <>
        <Seo
          title="Loading product | Navora Global"
          description="Loading product information."
          noIndex
        />
        <section className="section">
          <div className="container">
            <p className="lead" role="status">
              Loading product information…
            </p>
          </div>
        </section>
      </>
    );
  }

  // --- Unknown slug ------------------------------------------------------
  if (product === null) {
    return (
      <>
        <Seo
          title="Product not found | Navora Global"
          description="This product could not be found."
          noIndex
        />
        <section className="section">
          <div className="container">
            <EmptyState
              heading="We could not find that product"
              text="It may have been renamed or removed. Browse the current categories, or send us your requirement and we will confirm what is available."
            >
              <div className="btn-row" style={{ marginTop: 0 }}>
                <Button to="/products" variant="primary">
                  {ctaLabels.exploreProducts}
                </Button>
                <Button to="/contact" variant="secondary">
                  {ctaLabels.discussRequirements}
                </Button>
              </div>
            </EmptyState>
          </div>
        </section>
      </>
    );
  }

  // --- Product -----------------------------------------------------------
  const {
    name,
    subheading,
    description,
    shortDescription,
    ownership,
    imageUrl,
    imageAlt,
    imageIsIllustrative,
    gallery,
    certifications,
    documentation,
  } = product;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: shortDescription || description,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(product.origin ? { countryOfOrigin: product.origin } : {}),
    brand: {
      "@type": "Brand",
      name: ownership === "navora-brand" ? "Navora" : "Supplier product",
    },
  };

  return (
    <>
      <Seo
        title={`${name} | Navora Global`}
        description={shortDescription || description}
        path={`/products/${product.slug}`}
        image={imageUrl}
        jsonLd={jsonLd}
      />

      <section className="section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <Icon name="chevronRight" />
            <Link to="/products">Products</Link>
            <Icon name="chevronRight" />
            <span aria-current="page">{name}</span>
          </nav>

          <div className="product-detail__top">
            <div className="product-detail__gallery">
              <Img
                src={imageUrl}
                alt={imageAlt || name}
                ratio="4-3"
                illustrative={imageIsIllustrative}
                loading="eager"
                sizes="(max-width: 900px) 100vw, 42vw"
              />

              {Array.isArray(gallery) &&
                gallery.filter(Boolean).map((item) => (
                  <Img
                    key={item.url}
                    src={item.url}
                    alt={item.alt || name}
                    ratio="4-3"
                    illustrative={item.isIllustrative}
                    sizes="(max-width: 900px) 100vw, 42vw"
                  />
                ))}
            </div>

            <div>
              <div className="product-detail__heading">
                <h1>{name}</h1>
                <StatusBadge ownership={ownership} />
              </div>

              {subheading && <p className="product-detail__sub">{subheading}</p>}

              <p className="product-detail__desc">{description || shortDescription}</p>

              <dl className="spec-list">
                <SpecRow label={specLabels.origin} value={product.origin} />
                <SpecRow
                  label={specLabels.availableForms}
                  value={product.availableForms}
                />
                <SpecRow
                  label={specLabels.gradesVarieties}
                  value={product.gradesVarieties}
                />
                <SpecRow label={specLabels.packaging} value={product.packaging} />
                <SpecRow
                  label={specLabels.minimumOrderQuantity}
                  value={product.minimumOrderQuantity}
                />
                <SpecRow
                  label={specLabels.shelfLifeStorage}
                  value={product.shelfLifeStorage}
                />
                <SpecRow label={specLabels.markets} value={product.markets} />
              </dl>

              <div className="btn-row">
                <Button to="/contact" variant="primary" size="lg">
                  {ctaLabels.requestProductInfo}
                </Button>
                <Button to="/for-business" variant="secondary" size="lg">
                  {ctaLabels.discussRequirements}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Certifications and documentation --- */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid grid--2">
            <article className="card">
              <h2 className="card__title">{detailCopy.certificationsHeading}</h2>
              {Array.isArray(certifications) && certifications.length > 0 ? (
                <ul className="checklist">
                  {certifications.map((certification) => (
                    <li key={certification.name}>
                      <Icon name="verified" />
                      <span>
                        <strong>{certification.name}</strong>
                        {certification.scope && ` — ${certification.scope}`}
                        {certification.evidenceUrl && (
                          <>
                            {" "}
                            <a
                              href={certification.evidenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View evidence
                            </a>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="card__text">{detailCopy.certificationsEmpty}</p>
              )}
            </article>

            <article className="card">
              <h2 className="card__title">{detailCopy.documentationHeading}</h2>
              {Array.isArray(documentation) && documentation.length > 0 ? (
                <ul className="checklist">
                  {documentation.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="card__text">{detailCopy.documentationEmpty}</p>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* --- Enquiry --- */}
      <section className="section section--tight cta-band">
        <div className="container cta-band__inner">
          <div className="cta-band__copy">
            <h2>{detailCopy.enquiryHeading}</h2>
            <p>{detailCopy.enquiryText}</p>
          </div>
          <div className="btn-row">
            <Button to="/contact" variant="onDark" size="lg">
              {ctaLabels.requestProductInfo}
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container-narrow">
          <SectionHeading
            heading={`${ownershipLabels[ownership] || "Product"} — what that means`}
            lead={
              ownership === "navora-brand"
                ? `${name} is developed and marketed under the Navora brand by ${site.legalName}.`
                : ownership === "supplier-product"
                  ? `${name} is sourced through Navora's supplier relationships in India. Navora is not the manufacturer.`
                  : ownership === "coming-soon"
                    ? `${name} is in development. Register a business enquiry and we will share launch information when it is confirmed.`
                    : `${name} is a future category planned as Navora expands its verified supplier and logistics network.`
            }
            center
          />
        </div>
      </section>
    </>
  );
}

export default ProductDetail;
