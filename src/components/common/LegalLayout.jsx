import { site } from "../../config/site";

/**
 * Shared shell for the three legal documents: sticky section index, prose
 * column, and a single review date taken from src/config/site.js so the three
 * pages can never disagree about when they were last reviewed.
 *
 * `sections` is [{ id, title }]; children supply the matching <section id>.
 */
function LegalLayout({ title, intro, sections, children }) {
  return (
    <>
      <section className="page-hero page-hero--noMedia">
        <div className="container page-hero__inner">
          <div>
            <h1>{title}</h1>
            {intro && <p className="page-hero__text">{intro}</p>}
            <div className="legal-meta">
              <span>Last reviewed: {site.legalLastReviewed}</span>
              <span>{site.companyName}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container legal-layout">
          <nav className="legal-toc" aria-label="On this page">
            <h2>On this page</h2>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </nav>

          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}

export default LegalLayout;
