import Seo from "../components/common/Seo";
import Button from "../components/common/Button";
import { pageSeo } from "../content/seo";
import { ctaLabels } from "../content/site";

function NotFound() {
  return (
    <>
      <Seo {...pageSeo.notFound} noIndex />

      <div className="container notfound">
        <span className="notfound__code" aria-hidden="true">
          404
        </span>
        <h1>We could not find that page</h1>
        <p className="lead">
          The page may have been moved or removed. You can explore our current
          product categories, or send us your requirement and we will confirm
          what is available.
        </p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Button to="/products" variant="primary">
            {ctaLabels.exploreProducts}
          </Button>
          <Button to="/for-business" variant="secondary">
            {ctaLabels.becomePartner}
          </Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
