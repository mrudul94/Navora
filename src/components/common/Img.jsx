import { useState } from "react";
import Icon from "./Icon";

/**
 * Image with a graceful placeholder.
 *
 * The owner supplies photography after handover (see public/images/README.md).
 * Until a file exists — or if one fails to load — this renders a tinted block
 * at the correct aspect ratio, so layout never collapses and no broken-image
 * icon is ever shown.
 *
 * `illustrative` adds the caption the content pack requires for any image that
 * is not a genuine Navora photograph.
 */
function Img({
  src,
  alt = "",
  ratio = "3-2",
  illustrative = false,
  sizes,
  loading = "lazy",
  className = "",
  captionClassName = "",
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !src || failed;

  const figure = (
    <div className={`img img--ratio-${ratio} ${className}`.trim()}>
      {showPlaceholder ? (
        <div className="img__placeholder">
          <Icon name="image" />
          <span>Image to follow</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );

  if (!illustrative || showPlaceholder) return figure;

  return (
    <figure>
      {figure}
      <figcaption className={`img-caption ${captionClassName}`.trim()}>
        Illustrative image
      </figcaption>
    </figure>
  );
}

export default Img;
