import Icon from "../common/Icon";
import ConfirmValue from "../common/ConfirmValue";

function FounderCard({ founder, className = "" }) {
  const {
    name,
    initials,
    role,
    focus,
    location,
    bio,
    email,
    telephone,
    instagram,
    fallbackEmail,
    fallbackPhone,
    fallbackInstagram,
  } = founder;

  return (
    <article className={`founder-card ${className}`.trim()}>
      <div className="founder-card__header">
        <div className="founder-card__avatar">
          <span className="founder-card__initials">{initials}</span>
        </div>
        <div className="founder-card__identity">
          <span className="founder-card__role tag-pill">{role}</span>
          <h3 className="founder-card__name">{name}</h3>
          <span className="founder-card__focus">
            <Icon name="pin" /> {location} &middot; {focus}
          </span>
        </div>
      </div>

      <p className="founder-card__bio">{bio}</p>

      <div className="founder-card__contacts">
        <div className="founder-contact-item">
          <span className="founder-contact-item__icon">
            <Icon name="mail" />
          </span>
          <div className="founder-contact-item__details">
            <span className="founder-contact-item__label">Direct Email</span>
            <ConfirmValue
              value={email}
              as="email"
              fallback={fallbackEmail}
              className="founder-contact-item__link"
            />
          </div>
        </div>

        <div className="founder-contact-item">
          <span className="founder-contact-item__icon">
            <Icon name="phone" />
          </span>
          <div className="founder-contact-item__details">
            <span className="founder-contact-item__label">Direct Contact</span>
            <ConfirmValue
              value={telephone}
              as="tel"
              fallback={fallbackPhone}
              className="founder-contact-item__link"
            />
          </div>
        </div>

        <div className="founder-contact-item">
          <span className="founder-contact-item__icon">
            <Icon name="instagram" />
          </span>
          <div className="founder-contact-item__details">
            <span className="founder-contact-item__label">Instagram</span>
            <ConfirmValue
              value={instagram}
              as="instagram"
              fallback={fallbackInstagram}
              className="founder-contact-item__link"
            />
          </div>
        </div>
      </div>
    </article>
  );
}

export default FounderCard;
