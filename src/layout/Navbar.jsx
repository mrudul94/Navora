import { useCallback, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import { useFocusTrap } from "../lib/useFocusTrap";
import { headerCta, navItems } from "../content/site";
import { site } from "../config/site";

function Wordmark({ onClick }) {
  return (
    <Link to="/" className="brand" onClick={onClick} aria-label={`${site.legalName} home`}>
      <span className="brand__name">{site.wordmark}</span>
      <span className="brand__sub">{site.wordmarkSub}</span>
    </Link>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const { pathname } = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // Close the drawer whenever the route changes. Adjusting state during render
  // (rather than in an effect) avoids a frame where the drawer is still open
  // over the new page.
  const [renderedPath, setRenderedPath] = useState(pathname);
  if (pathname !== renderedPath) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useFocusTrap(drawerRef, open, close);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <Wordmark />

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
            <Wordmark onClick={close} />
            <button
              type="button"
              className="cookie-dialog__close"
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
