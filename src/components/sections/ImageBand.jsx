import SmartImage from "../common/SmartImage";

/** Full-width image band with a single line of copy. */
function ImageBand({ image, imageAlt, line }) {
  return (
    <section className="image-band" aria-label={line}>
      <SmartImage
        src={image}
        alt={imageAlt}
        ratio="21-9"
        sizes="100vw"
        className="image-band__media"
        fallbackLabel=""
      />
      <div className="image-band__overlay">
        <p className="image-band__line">{line}</p>
      </div>
    </section>
  );
}

export default ImageBand;
