import { Helmet } from "react-helmet-async";
import { site } from "../../config/site";
import { defaultSeo } from "../../content/seo";
import { breadcrumbList, graph, organization, webPage, website } from "../../lib/structuredData";

/**
 * Per-page document head: title, description, canonical, Open Graph, Twitter
 * card and JSON-LD.
 *
 * `path` produces the canonical URL. Pass `noIndex` for pages that must not be
 * indexed (the 404, and product pages while loading or unknown).
 *
 * Every indexable page publishes the Organization, WebSite and WebPage
 * graph (`pageType` picks a WebPage subtype such as AboutPage). A
 * BreadcrumbList is added from `breadcrumbs` ([{ name, path }] after Home), or
 * derived from `name` for top-level pages. `jsonLd` takes extra schema.org
 * nodes — one object or an array, without "@context".
 */
function Seo({
  title,
  description,
  path,
  name,
  pageType,
  image,
  type = "website",
  breadcrumbs,
  noIndex = false,
  jsonLd,
}) {
  const resolvedTitle = title || defaultSeo.title;
  const resolvedDescription = description || defaultSeo.description;
  const canonical = path ? `${site.origin}${path}` : null;
  const rawImage = image || defaultSeo.image;
  const imageUrl = /^https?:\/\//i.test(rawImage) ? rawImage : `${site.origin}${rawImage}`;

  const trail = breadcrumbs || (name && path && path !== "/" ? [{ name, path }] : null);
  const extra = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  const structuredData = noIndex
    ? null
    : graph([
        organization(),
        website(),
        canonical &&
          webPage({
            type: pageType,
            url: canonical,
            name: resolvedTitle,
            description: resolvedDescription,
            image: imageUrl,
            hasBreadcrumb: Boolean(trail),
          }),
        trail && breadcrumbList([{ name: "Home", path: "/" }, ...trail], canonical),
        ...extra,
      ]);

  return (
    <Helmet prioritizeSeoTags>
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta
        name="robots"
        content={
          noIndex
            ? "noindex, follow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.legalName} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={resolvedTitle} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

export default Seo;
