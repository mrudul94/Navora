import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Icon from "../components/common/Icon";
import { useFocusTrap } from "../lib/useFocusTrap";
import { categories, noOptionalCookiesInUse } from "../config/cookies";
import {
  deniedConsent,
  getConsent,
  grantedConsent,
  needsConsentChoice,
  onOpenPreferences,
  setConsent,
} from "../lib/consent";

/** Stored consent only changes through this component, so nothing to subscribe to. */
const subscribeNever = () => () => {};

/**
 * Cookie banner and preferences dialog.
 *
 * Accept and Reject are equally prominent by design: under UK PECR guidance,
 * refusing non-essential cookies must be as easy as accepting them. Do not
 * restyle one to lead the other.
 */
function CookieConsent() {
  // Pages are prerendered without access to storage. The server snapshot
  // (false) is used for the prerender and for hydration, then React re-reads
  // storage on the client — so the HTML and first client render always agree.
  const needsChoice = useSyncExternalStore(subscribeNever, needsConsentChoice, () => false);
  const [dismissed, setDismissed] = useState(false);
  const showBanner = needsChoice && !dismissed;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState(deniedConsent);

  const dialogRef = useRef(null);
  const titleId = useId();

  // The footer button and the Cookie Notice page reopen the panel through here.
  useEffect(
    () =>
      onOpenPreferences(() => {
        setDraft(getConsent() ?? deniedConsent());
        setDialogOpen(true);
      }),
    []
  );

  const closeDialog = useCallback(() => setDialogOpen(false), []);
  useFocusTrap(dialogRef, dialogOpen, closeDialog);

  const commit = (prefs) => {
    setConsent(prefs);
    setDismissed(true);
    setDialogOpen(false);
  };

  const openPanel = () => {
    setDraft(getConsent() ?? deniedConsent());
    setDialogOpen(true);
  };

  return (
    <>
      {showBanner && !dialogOpen && (
        <div
          className="cookie-banner"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="cookie-banner__copy">
            <p className="cookie-banner__title">Cookies on this website</p>
            <p className="cookie-banner__text">
              {noOptionalCookiesInUse
                ? "We use only strictly necessary storage: a record of this choice, and security cookies set by our hosting provider. We do not use analytics or marketing cookies. "
                : "We use strictly necessary cookies to make this site work, and would like to set optional cookies to help us improve it. "}
              Read our <Link to="/cookie-notice">Cookie Notice</Link>.
            </p>
          </div>

          <div className="cookie-banner__actions">
            <Button variant="secondary" onClick={openPanel}>
              Manage
            </Button>
            <Button variant="secondary" onClick={() => commit(deniedConsent())}>
              Reject all
            </Button>
            <Button variant="primary" onClick={() => commit(grantedConsent())}>
              Accept all
            </Button>
          </div>
        </div>
      )}

      {dialogOpen && (
        <div className="cookie-dialog">
          <div
            className="cookie-dialog__backdrop"
            onClick={closeDialog}
            aria-hidden="true"
          />

          <div
            className="cookie-dialog__panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={dialogRef}
            tabIndex={-1}
          >
            <div className="cookie-dialog__head">
              <div>
                <h2 id={titleId}>Cookie preferences</h2>
                <p className="cookie-banner__text" style={{ marginTop: "8px" }}>
                  Choose which categories you allow. You can change this at any
                  time from the link in the footer.
                </p>
              </div>
              <button
                type="button"
                className="cookie-dialog__close"
                onClick={closeDialog}
                aria-label="Close cookie preferences"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="cookie-dialog__body">
              {categories.map((category) => (
                <section className="consent-group" key={category.id}>
                  <div className="consent-group__head">
                    <h3 className="consent-group__name">{category.name}</h3>

                    {category.required ? (
                      <span className="consent-group__locked">Always on</span>
                    ) : (
                      <span className="switch">
                        <input
                          type="checkbox"
                          id={`${titleId}-${category.id}`}
                          checked={Boolean(draft[category.id])}
                          onChange={(event) =>
                            setDraft((prev) => ({
                              ...prev,
                              [category.id]: event.target.checked,
                            }))
                          }
                        />
                        <span className="switch__track" />
                        <span className="visually-hidden">
                          <label htmlFor={`${titleId}-${category.id}`}>
                            Allow {category.name.toLowerCase()} cookies
                          </label>
                        </span>
                      </span>
                    )}
                  </div>

                  <p className="consent-group__text">{category.description}</p>

                  {category.items.length === 0 && !category.required && (
                    <p className="consent-group__text" style={{ marginTop: "8px" }}>
                      <strong>None in use at present.</strong>
                    </p>
                  )}
                </section>
              ))}
            </div>

            <div className="cookie-dialog__foot">
              <Button variant="secondary" onClick={() => commit(deniedConsent())}>
                Reject all
              </Button>
              <Button variant="secondary" onClick={() => commit(grantedConsent())}>
                Accept all
              </Button>
              <Button variant="primary" onClick={() => commit(draft)}>
                Save preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CookieConsent;
