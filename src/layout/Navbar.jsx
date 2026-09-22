import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import LogoMark from "../components/common/LogoMark";
import { useFocusTrap } from "../lib/useFocusTrap";
import { headerCta, navItems } from "../content/site";
import { site } from "../config/site";

function Brand({ onClick, tone }) {
  return (
    <Link
      to="/"
      className="brand"
      onClick={onClick}
      aria-label={`${site.legalName} home`}
    >
      <LogoMark size={36} tone={tone} />
      <span className="brand__text">
        <span className="brand__name">{site.wordmark}</span>
        <span className="brand__sub">Indian origins &middot; Global opportunities</span>
      </span>
    </Link>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // Close the drawer on navigation. Adjusting during render avoids a frame
  // where the drawer is still open over the new page.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useFocusTrap(drawerRef, open, close);

  // A hairline and shadow once scrolled, so content cannot bleed through.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`.trim()}>
      <div className="container site-header__row">
        <Brand />

        <nav className="site-nav" aria-label="Main">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                isActive ? "site-nav__link is-active" : "site-nav__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Both halves are factual: the company is UK-registered and works
            with an operating partner in Kerala. */}
        <span className="header-pill">UK Registered &middot; Kerala Partnered</span>

        <div className="site-header__cta">
          <Button to={headerCta.path} variant="primary" size="sm">
            {headerCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="nav-drawer"
        >
          <Icon name="menu" />
        </button>
      </div>

      <div id="nav-drawer" className={`nav-drawer ${open ? "is-open" : ""}`.trim()}>
        <div className="nav-drawer__backdrop" onClick={close} aria-hidden="true" />

        <div
          className="nav-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          ref={drawerRef}
          tabIndex={-1}
        >
          <div className="nav-drawer__head">
            <Brand onClick={close} />
            <button
              type="button"
              className="drawer-close"
              onClick={close}
              aria-label="Close navigation menu"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav className="nav-drawer__links" aria-label="Mobile">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive ? "nav-drawer__link is-active" : "nav-drawer__link"
                }
                onClick={close}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Button
            to={headerCta.path}
            variant="primary"
            block
            className="nav-drawer__cta"
            onClick={close}
          >
            {headerCta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
