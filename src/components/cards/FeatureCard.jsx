import Icon from "../common/Icon";

/** Icon + heading + body. Used by What we offer, Who we work with, Our approach. */
function FeatureCard({ icon, heading, text }) {
  return (
    <article className="card">
      {icon && (
        <span className="card__icon">
          <Icon name={icon} />
        </span>
      )}
      <h3 className="card__title">{heading}</h3>
      <p className="card__text">{text}</p>
    </article>
  );
}

export default FeatureCard;
