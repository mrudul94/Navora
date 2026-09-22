import { Link } from "react-router-dom";
import ConfirmValue from "../components/common/ConfirmValue";
import { footer } from "../content/site";
import { site, isPlaceholder } from "../config/site";
import { openPreferences } from "../lib/consent";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <span className="brand">
              <span className="brand__name">{site.wordmark}</span>
              <span className="brand__sub">{site.wordmarkSub}</span>
            </span>

            <p className="site-footer__blurb">{footer.description}</p>

            <div className="site-footer__contact">
              <ConfirmValue value={site.email} as="email" />
              {!isPlaceholder(site.telephone) && (
                <ConfirmValue value={site.telephone} as="tel" />
              )}
            </div>
          </div>

          {footer.columns.map((column) => (
            <div key={column.heading}>
              <h2>{column.heading}</h2>
              <nav className="site-footer__links" aria-label={column.heading}>
                {column.links.map((link) => (
                  <Link key={link.path} to={link.path}>
                    {link.label}
                  </Link>
                ))}

                {/* Required by the content pack: a way to reopen cookie
                    preferences after the banner has been dismissed. */}
                {column.heading === "Legal" && (
                  <button type="button" onClick={openPreferences}>
                    Cookie preferences
                  </button>
                )}
              </nav>
            </div>
          ))}
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__company">
            <span>{site.legalName}</span>
            <span>
              Registered in {site.jurisdiction}
              {!isPlaceholder(site.companyNumber) && ` · No. ${site.companyNumber}`}
            </span>
            {!isPlaceholder(site.registeredOffice) && (
              <span>{site.registeredOffice}</span>
            )}
          </div>

          <span>
            © {site.copyrightYear} {site.legalName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
