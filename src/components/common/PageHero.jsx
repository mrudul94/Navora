import Img from "./Img";

/**
 * Standard page header: label, H1, lead, optional CTAs and optional media.
 * Without `image` it falls back to a single-column, text-only layout.
 */
function PageHero({ label, heading, text, image, imageAlt, illustrative, children }) {
  const hasMedia = Boolean(image);

  return (
    <section className={`page-hero ${hasMedia ? "" : "page-hero--noMedia"}`.trim()}>
      <div className="container page-hero__inner">
        <div>
          {label && <span className="page-hero__label">{label}</span>}
          <h1>{heading}</h1>
          {text && <p className="page-hero__text">{text}</p>}
          {children && <div className="btn-row">{children}</div>}
        </div>

        {hasMedia && (
          <div className="page-hero__media">
            <Img
              src={image}
              alt={imageAlt}
              ratio="4-3"
              illustrative={illustrative}
              loading="eager"
              sizes="(max-width: 860px) 100vw, 45vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default PageHero;
