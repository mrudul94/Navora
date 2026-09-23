import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import { ownershipLabels } from "../../content/products";
import { productSheetPath } from "../../lib/downloads";

/**
 * Category-by-category table of the current range, built from the same
 * product list as the grid so it can never disagree with it. A real <table>
 * on purpose: answer engines lift tables as comparisons.
 */
function CategoryComparison({ kicker, heading, lead, filters, products }) {
  const rows = filters
    .filter((filter) => filter.id !== "all" && !filter.matches)
    .map((filter) => ({
      ...filter,
      items: products.filter((product) => product.category === filter.id),
    }))
    .filter((row) => row.items.length > 0);

  if (rows.length === 0) return null;

  return (
    <section className="section section--tight" aria-labelledby="comparison-heading">
      <div className="container">
        <div className="reveal">
          <SectionHeading kicker={kicker} heading={heading} lead={lead} id="comparison-heading" />
        </div>

        <div className="table-wrap reveal reveal--delay-1">
          <table className="table comparison-table">
            <caption className="visually-hidden">{heading}</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Products</th>
                <th scope="col">Type</th>
                <th scope="col">Product sheets</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <th scope="row">{row.label}</th>
                  <td>
                    {row.items.map((product, i) => (
                      <span key={product.slug}>
                        {i > 0 && ", "}
                        <Link to={`/products/${product.slug}`}>{product.name}</Link>
                      </span>
                    ))}
                  </td>
                  <td>
                    {[...new Set(row.items.map((p) => ownershipLabels[p.ownership]).filter(Boolean))].join(
                      ", "
                    )}
                  </td>
                  <td>
                    {row.items.map((product, i) => (
                      <span key={product.slug}>
                        {i > 0 && ", "}
                        <a href={productSheetPath(product.slug)} download>
                          {product.name} (PDF)
                        </a>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default CategoryComparison;
