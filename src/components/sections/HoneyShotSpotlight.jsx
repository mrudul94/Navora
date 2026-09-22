import SmartImage from "../common/SmartImage";
import Button from "../common/Button";
import Icon from "../common/Icon";

/**
 * Navora's only own-brand product, and the most pitchable asset on the site.
 *
 * Copy comes from the approved product record. "Request Samples" deep-links to
 * the contact form with the enquiry type and product preselected.
 */
function HoneyShotSpotlight({ data }) {
  const sampleHref = `/contact?type=${encodeURIComponent(
    "Navora product enquiry"
  )}&product=${encodeURIComponent("Navora Honey Shot")}`;

  return (
    <section className="section spotlight reveal">
      <div className="container spotlight__inner">
        <div className="spotlight__media">
          <SmartImage
            src={data.image}
            alt={data.imageAlt}
            ratio="4-3"
            sizes="(max-width: 900px) 100vw, 46vw"
            fallbackLabel="Navora Honey Shot"
          />
        </div>

        <div className="spotlight__body">
          <span className="spotlight__eyebrow">{data.eyebrow}</span>
          <h2>{data.heading}</h2>
          <p className="spotlight__sub">{data.subheading}</p>
          <p className="spotlight__text">{data.text}</p>

          <ul className="spotlight__features">
            {data.features.map((feature) => (
              <li key={feature.label}>
                <span className="spotlight__feature-icon">
                  <Icon name={feature.icon} />
                </span>
                <span>{feature.label}</span>
              </li>
            ))}
          </ul>

          <p className="spotlight__soon">
            <Icon name="clock" />
            <span>{data.comingSoon}</span>
          </p>

          <div className="btn-row">
            <Button to={sampleHref} variant="primary">
              Request Samples
            </Button>
            <Button to={`/products/${data.slug}`} variant="secondary">
              View details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HoneyShotSpotlight;
