import SmartImage from "../common/SmartImage";
import Icon from "../common/Icon";
import { isSet, mailHref } from "../../config/site";
import { initialsOf } from "../../config/founders";

/**
 * A founder.
 *
 * Every field is optional in practice: anything still marked REPLACE_ is
 * hidden rather than shown as a placeholder. With no photo, an initials
 * avatar on a green-gold gradient stands in, so the card looks deliberate.
 */
function FounderCard({ founder, compact = false }) {
  const { name, role, location, bio, photo, linkedin, email } = founder;
  const hasPhoto = isSet(photo);

  return (
    <article className={`founder ${compact ? "founder--compact" : ""}`.trim()}>
      <div className="founder__portrait">
        {hasPhoto ? (
          <SmartImage
            src={photo}
            alt={`${name}, ${isSet(role) ? role : "co-founder"} at Navora Global`}
            ratio="4-5"
            sizes={compact ? "(max-width: 700px) 100vw, 260px" : "(max-width: 860px) 100vw, 420px"}
            fallbackLabel={initialsOf(name)}
          />
        ) : (
          <div className="founder__initials" role="img" aria-label={name}>
            <span>{initialsOf(name)}</span>
          </div>
        )}
      </div>

      <div className="founder__body">
        {isSet(role) && <span className="founder__role">{role}</span>}
        <h3 className="founder__name">{name}</h3>

        {isSet(location) && (
          <p className="founder__location">
            <Icon name="pin" />
            <span>{location}</span>
          </p>
        )}

        {!compact && isSet(bio) && <p className="founder__bio">{bio}</p>}

        {(isSet(linkedin) || isSet(email)) && (
          <div className="founder__links">
            {isSet(linkedin) && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="founder__link"
                aria-label={`${name} on LinkedIn`}
              >
                <Icon name="linkedin" />
              </a>
            )}
            {isSet(email) && (
              <a
                href={mailHref(email)}
                className="founder__link"
                aria-label={`Email ${name}`}
              >
                <Icon name="mail" />
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default FounderCard;
