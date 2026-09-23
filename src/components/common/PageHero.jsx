import SmartImage from "./SmartImage";
import { renderStaggeredWords } from "./TextReveal";

/**
 * Standard page header: label, H1, lead, optional CTAs and optional media.
 * Without `image` it falls back to a single-column, text-only layout.
 */
function PageHero({ label, heading, text, image, imageAlt, illustrative, children }) {
  const hasMedia = Boolean(image);

  return (
    <section className={`page-hero ${hasMedia ? "" : "page-hero--noMedia"}`.trim()}>
      <div className="container page-hero__inner">
        <div className="page-hero__content reveal-text is-visible">
          {label && <span className="tag-pill page-hero__label kicker">{label}</span>}
          <h1 className="page-hero__title reveal-heading">{renderStaggeredWords(heading)}</h1>
          {text && <p className="page-hero__text reveal-paragraph">{text}</p>}
          {children && <div className="btn-row hero__animate-cta">{children}</div>}
        </div>

        {hasMedia && (
          <div className="page-hero__media">
            <SmartImage
              src={image}
              alt={imageAlt}
              ratio="4-3"
              illustrative={illustrative}
              priority
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
