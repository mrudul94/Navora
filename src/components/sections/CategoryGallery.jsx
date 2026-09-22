import { Link } from "react-router-dom";
import SmartImage from "../common/SmartImage";

/**
 * The five category photographs, shown large. Each tile links through to the
 * Products page with that category filter already applied.
 */
function CategoryGallery({ categories }) {
  return (
    <div className="category-gallery">
      {categories.map((category) => (
        <Link
          className="category-card"
          key={category.name}
          to={`/products?category=${category.slug}`}
        >
          <SmartImage
            src={category.image}
            alt={category.alt}
            ratio="1-1"
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 220px"
          />
          <span className="category-card__name">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default CategoryGallery;
