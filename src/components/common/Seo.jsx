import { Helmet } from "react-helmet-async";
import { site } from "../../config/site";
import { defaultSeo } from "../../content/seo";

/**
 * Per-page document head: title, description, canonical, Open Graph, Twitter
 * card and optional JSON-LD.
 *
 * `path` produces the canonical URL. Pass `noIndex` for pages that must not be
 * indexed (the 404, and product pages while loading or unknown).
 */
function Seo({ title, description, path, image, noIndex = false, jsonLd }) {
  const resolvedTitle = title || defaultSeo.title;
  const resolvedDescription = description || defaultSeo.description;
  const canonical = path ? `${site.origin}${path}` : null;
  const imageUrl = `${site.origin}${image || defaultSeo.image}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, follow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={imageUrl} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export default Seo;
