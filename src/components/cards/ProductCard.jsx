import { Link } from "react-router-dom";
import SmartImage from "../common/SmartImage";
import Icon from "../common/Icon";
import StatusBadge from "../common/StatusBadge";

/** Product tile used on the Products page and the Home featured strip. */
function ProductCard({ product }) {
  const { name, slug, ownership, shortDescription, imageUrl, imageAlt } = product;

  return (
    <article className="product-card">
      <SmartImage
        src={imageUrl}
        alt={imageAlt || name}
        ratio="4-3"
        sizes="(max-width: 700px) 100vw, 300px"
      />

      <div className="product-card__body">
        <div className="product-card__head">
          <h3 className="product-card__name">{name}</h3>
          <StatusBadge ownership={ownership} />
        </div>

        <p className="product-card__text">{shortDescription}</p>

        <Link className="product-card__cta" to={`/products/${slug}`}>
          View details
          <Icon name="arrowRight" />
          <span className="visually-hidden">for {name}</span>
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;
