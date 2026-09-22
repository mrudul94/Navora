import { announcement } from "../content/home";

/**
 * Thin bar above the header. Both lines restate the Content Pack's positioning
 * statement — no offer, no claim, nothing time-limited.
 */
function AnnounceBar() {
  return (
    <div className="announce">
      <p className="container announce__inner">
        <span className="announce__dot" aria-hidden="true" />
        <span>{announcement.primary}</span>
        <span className="announce__sep" aria-hidden="true">
          &middot;
        </span>
        <span className="announce__item--secondary">{announcement.secondary}</span>
        <span className="announce__dot" aria-hidden="true" />
      </p>
    </div>
  );
}

export default AnnounceBar;
