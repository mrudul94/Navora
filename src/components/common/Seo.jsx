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
  ogImage,
  ogImageAlt,
}) {
  const resolvedTitle = title || defaultSeo.title;
  const resolvedDescription = description || defaultSeo.description;
  const canonical = path ? `${site.origin}${path}` : null;
  const absolute = (url) => (/^https?:\/\//i.test(url) ? url : `${site.origin}${url}`);
  const rawImage = image || defaultSeo.image;
  const imageUrl = absolute(rawImage);

  // Social share card. Kept apart from `imageUrl` so a page's share image
  // never changes its structured data. A page `image` (products) wins; the
  // local cards (`ogImage`, the default) are all 1200x630 JPEG, so their size
  // is declared and previews render on the first share.
  const localCard = !image;
  const shareUrl = image ? imageUrl : absolute(ogImage || defaultSeo.image);
  const shareAlt = ogImageAlt || (image || ogImage ? resolvedTitle : defaultSeo.imageAlt);

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
      <meta property="og:image" content={shareUrl} />
      {localCard && <meta property="og:image:type" content={defaultSeo.imageType} />}
      {localCard && <meta property="og:image:width" content={String(defaultSeo.imageWidth)} />}
      {localCard && <meta property="og:image:height" content={String(defaultSeo.imageHeight)} />}
      <meta property="og:image:alt" content={shareAlt} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:locale" content="en_GB" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={shareUrl} />
      <meta name="twitter:image:alt" content={shareAlt} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

export default Seo;
