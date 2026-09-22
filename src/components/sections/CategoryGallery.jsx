import { Link } from "react-router-dom";
import SmartImage from "../common/SmartImage";

/** Category tiles linking through to the pre-filtered Products view. */
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
            sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 215px"
          />
          <span className="category-card__name">{category.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default CategoryGallery;
