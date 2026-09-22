import { Link } from "react-router-dom";
import LogoMark from "../components/common/LogoMark";
import Icon from "../components/common/Icon";
import { footer } from "../content/site";
import {
  site,
  isSet,
  mailHref,
  telHref,
  whatsappHref,
  registrationLine,
} from "../config/site";
import { openPreferences } from "../lib/consent";

function Footer() {
  const registration = registrationLine();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <span className="brand brand--footer">
              <LogoMark size={38} tone="dark" />
              <span className="brand__text">
                <span className="brand__name">{site.wordmark}</span>
                <span className="brand__sub">{site.wordmarkSub}</span>
              </span>
            </span>

            <p className="site-footer__blurb">{footer.description}</p>

            <div className="site-footer__contact">
              {isSet(site.email) && (
                <a href={mailHref(site.email)}>
                  <Icon name="mail" />
                  <span>{site.email}</span>
                </a>
              )}
              {isSet(site.phoneUK) && (
                <a href={telHref(site.phoneUK)}>
                  <Icon name="phone" />
                  <span>{site.phoneUK}</span>
                </a>
              )}
              {isSet(site.whatsapp) && (
                <a
                  href={whatsappHref(site.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {isSet(site.linkedin) && (
              <a
                className="site-footer__social"
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.companyName} on LinkedIn`}
              >
                <Icon name="linkedin" />
              </a>
            )}
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

                {/* Required: a way to reopen cookie preferences after the
                    banner has been dismissed. */}
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
            <span>{site.companyName}</span>
            {registration && <span>{registration}</span>}
            {isSet(site.registeredOffice) && <span>{site.registeredOffice}</span>}
          </div>

          <span>
            © {site.copyrightYear} {site.companyName}. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
