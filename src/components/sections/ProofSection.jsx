import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import Icon from "../common/Icon";

/**
 * "What you can check for yourself": facts a buyer can verify, each with the
 * place to verify it. Items come from src/content/proof.js and must stay
 * limited to verified facts — never client names, volumes or results.
 *
 * items: [{ icon, title, text, link?: { label, to | href } }]
 */
function ProofSection({ kicker, heading, lead, items, id, warm = false }) {
  return (
    <section className={`section ${warm ? "section--warm" : ""}`.trim()} aria-labelledby={id}>
      <div className="container">
        <div className="reveal">
          <SectionHeading kicker={kicker} heading={heading} lead={lead} id={id} />
        </div>

        <div className="grid grid--3">
          {items.map((item, index) => (
            <article className={`card proof reveal reveal--delay-${(index % 3) + 1}`} key={item.title}>
              <span className="card__icon">
                <Icon name={item.icon} />
              </span>
              <h3 className="card__title">{item.title}</h3>
              <p className="card__text">{item.text}</p>
              {item.link?.to && (
                <Link className="qa__link" to={item.link.to}>
                  {item.link.label}
                  <Icon name="arrowRight" />
                </Link>
              )}
              {item.link?.href && (
                <a
                  className="qa__link"
                  href={item.link.href}
                  {...(item.link.download
                    ? { download: true }
                    : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.link.label}
                  <Icon name={item.link.download ? "download" : "arrowRight"} />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProofSection;
