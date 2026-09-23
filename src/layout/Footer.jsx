import { Link } from "react-router-dom";
import ConfirmValue from "../components/common/ConfirmValue";
import Icon from "../components/common/Icon";
import { footer } from "../content/site";
import { site, isPlaceholder } from "../config/site";
import { openPreferences } from "../lib/consent";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top Grid: Brand & 3 navigation columns */}
        <div className="site-footer__grid">
          {/* Col 1: Brand & Identity */}
          <div className="site-footer__brand-col">
            <Link to="/" className="brand brand--logo" aria-label="Navora Global Home">
              <img
                src="/logo.png"
                alt="Navora Global Limited"
                className="brand__logo-img brand__logo-img--footer"
                width="200"
                height="96"
              />
            </Link>

            <p className="site-footer__blurb">{footer.description}</p>

            <div className="site-footer__contact">
              {!isPlaceholder(site.email) ? (
                <div className="site-footer__contact-item">
                  <Icon name="mail" />
                  <ConfirmValue value={site.email} as="email" />
                </div>
              ) : (
                <Link to="/contact" className="site-footer__enquire-link">
                  <span>Enquire via business contact form</span>
                  <Icon name="arrowRight" />
                </Link>
              )}
              {!isPlaceholder(site.telephone) && (
                <div className="site-footer__contact-item">
                  <Icon name="phone" />
                  <ConfirmValue value={site.telephone} as="tel" />
                </div>
              )}
            </div>

            {/* Trade Architecture Badge */}
            <div className="footer-panel">
              <p className="footer-panel__title">
                <Icon name="company" />
                <span>Trade &amp; Origin Architecture</span>
              </p>
              <p className="footer-panel__text">
                UK-registered company with an operating partner and producer network in Kerala, India.
              </p>
            </div>
          </div>

          {/* Col 2, 3, 4: Nav Columns */}
          {footer.columns.map((column) => (
            <div key={column.heading} className="site-footer__col">
              <h2 className="site-footer__heading">{column.heading}</h2>
              <nav className="site-footer__links" aria-label={column.heading}>
                {column.links.map((link) => (
                  <Link key={link.path} to={link.path} className="site-footer__link">
                    {link.label}
                  </Link>
                ))}

                {/* Required by Content Pack: Cookie preferences modal opener */}
                {column.heading === "Legal" && (
                  <button
                    type="button"
                    onClick={openPreferences}
                    className="site-footer__pref-btn"
                  >
                    Cookie preferences
                  </button>
                )}
              </nav>
            </div>
          ))}
        </div>

        {/* Middle Metadata Strip */}
        <div className="site-footer__meta-strip">
          <div className="site-footer__legal-facts">
            <span className="site-footer__fact">
              <strong>{site.legalName}</strong>
            </span>
            <span className="site-footer__fact-sep">&middot;</span>
            <span className="site-footer__fact">
              Registered in {site.jurisdiction}
              {!isPlaceholder(site.companyNumber) && ` (Company No. ${site.companyNumber})`}
            </span>
            <span className="site-footer__fact-sep">&middot;</span>
            <span className="site-footer__fact">
              Operating Partner: {site.keralaPartnerLocation}
            </span>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Skaylon Credit */}
        <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            &copy; {site.copyrightYear || new Date().getFullYear()} {site.legalName}. All rights reserved.
          </div>

          <div className="site-footer__credit">
            <span>Site by </span>
            <a
              href="https://skaylon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__credit-link"
              title="Designed & Developed by Skaylon"
            >
              Skaylon
              <span className="site-footer__credit-dot" aria-hidden="true"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
