import { Link } from "react-router-dom";
import SectionHeading from "../common/SectionHeading";
import Checklist from "../common/Checklist";
import SourceLinks from "../common/SourceLinks";
import Icon from "../common/Icon";

/**
 * Question-led content blocks: each question heading is followed directly by
 * a one-sentence answer, then optional detail, a checklist, an internal link
 * and dated sources. Unlike FaqSection this is page body, not FAQPage schema.
 *
 * items: [{ question, answer, detail?, points?, link?: { to, label }, sources? }]
 */
function QaSection({ kicker, heading, lead, items, id, warm = false }) {
  return (
    <section className={`section ${warm ? "section--warm" : ""}`.trim()} aria-labelledby={id}>
      <div className="container">
        <div className="reveal">
          <SectionHeading kicker={kicker} heading={heading} lead={lead} id={id} />
        </div>

        <div className="qa-grid">
          {items.map((item, index) => (
            <article
              className={`qa reveal reveal--delay-${(index % 3) + 1}`}
              key={item.question}
            >
              <h3 className="qa__question">{item.question}</h3>
              <p className="faq__short">{item.answer}</p>
              {item.detail && <p className="faq__answer">{item.detail}</p>}
              {item.points?.length > 0 && (
                <div className="qa__points">
                  <Checklist items={item.points} />
                </div>
              )}
              {item.link && (
                <Link className="qa__link" to={item.link.to}>
                  {item.link.label}
                  <Icon name="arrowRight" />
                </Link>
              )}
              <SourceLinks sources={item.sources} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QaSection;
