/** Placeholder card shown while products load. Matches ProductCard's shape. */
function ProductCardSkeleton() {
  return (
    <div className="product-card product-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton--media" />
      <div className="product-card__body">
        <div className="skeleton skeleton--line skeleton--title" />
        <div className="skeleton skeleton--line" />
        <div className="skeleton skeleton--line skeleton--short" />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
