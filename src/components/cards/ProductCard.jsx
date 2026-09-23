import { Link } from "react-router-dom";
import SmartImage from "../common/SmartImage";
import Icon from "../common/Icon";
import StatusBadge from "../common/StatusBadge";
import { ownershipLabels } from "../../content/products";

/**
 * Spec-sheet style product card.
 *
 * The specification rows are driven entirely by what the CMS actually holds.
 * Nothing is invented: if a product has no confirmed origin, forms or minimum
 * order quantity, those rows simply do not render. The Content Pack requires
 * those details to be confirmed per product before publication, so an empty
 * spec block is the correct state until Navora fills it in.
 */

/** Renders a row only when there is a real value behind it. */
function specRows(product) {
  const rows = [];

  const add = (key, value) => {
    if (value === undefined || value === null) return;
    const text = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value).trim();
    if (text) rows.push({ key, value: text });
  };

  add("Format", product.availableForms);
  add("Origin", product.origin);
  add("Grades", product.gradesVarieties);
  add("Packing", product.packaging);
  add("MOQ", product.minimumOrderQuantity);

  return rows.slice(0, 3);
}

/** The action label reflects what the buyer can actually do today. */
function actionFor(ownership) {
  if (ownership === "coming-soon") return "Register early interest";
  if (ownership === "future-category") return "Enquire on roadmap";
  return "Request product information";
}

function ProductCard({ product, className = "" }) {
  const { name, slug, ownership, shortDescription, imageUrl, imageAlt } = product;
  const rows = specRows(product);

  return (
    <article className={`product-card ${className}`.trim()}>
      <div className="product-card__media">
        <span className="product-card__badge">
          <StatusBadge ownership={ownership} />
        </span>
        <SmartImage
          src={imageUrl}
          alt={imageAlt || name}
          ratio="4-3"
          sizes="(max-width: 700px) 100vw, 300px"
        />
      </div>

      <div className="product-card__body">
        <p className="product-card__origin">{ownershipLabels[ownership]}</p>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__text">{shortDescription}</p>

        {rows.length > 0 && (
          <dl className="product-spec">
            {rows.map((row) => (
              <div className="product-spec__row" key={row.key}>
                <dt className="product-spec__key">{row.key}</dt>
                <dd className="product-spec__value">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <div className="product-card__actions">
          <Link
            className={`btn ${
              ownership === "future-category" ? "btn--dark" : "btn--primary"
            } btn--block btn--sm`}
            to={`/products/${slug}`}
          >
            {actionFor(ownership)}
            <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
