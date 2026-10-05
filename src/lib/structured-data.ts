import type { ResourcesPageContent } from "@/lib/cms/resources-page-data";
import { CONTACT_EMAIL } from "@/lib/contact";
import { PLATFORM_PATH } from "@/lib/routes";
import { DEFAULT_DESCRIPTION, SITE_NAME, getSiteUrl } from "@/lib/seo";
import { STATIC_PAGE_SEO, ogImagePath, type StaticPageKey } from "@/lib/seo-pages";
import { youtubeIdFromUrl } from "@/lib/youtube";

/**
 * schema.org structured data (JSON-LD) for search engines and AI assistants.
 *
 * Everything here describes one connected graph: the Organization (Genetico)
 * makes the SoftwareApplication (IndiGeneUs.AI), publishes the WebSite, and
 * each page is a WebPage inside that site, with a breadcrumb trail. Nodes
 * refer to each other by `@id`, so the organisation is described once, in the
 * root layout, and every page only adds what is particular to it.
 *
 * Only state facts the site itself states. A claim here that the page does
 * not back up is worse than leaving the property out.
 *
 * Check a page with https://search.google.com/test/rich-results or
 * https://validator.schema.org.
 */

type Node = Record<string, unknown>;

const SOCIAL_PROFILES = [
  "https://www.linkedin.com/company/genetico-in/",
  "https://x.com/genetico_in",
  "https://www.youtube.com/@geneticord",
];

/** What Genetico works on, in the words people search with. */
const TOPICS = [
  "Rare diseases",
  "Genetic disorders",
  "Clinical genetics",
  "Clinical genomics",
  "Genomic electronic medical records",
  "Clinical decision support",
  "Differential diagnosis",
  "Pedigree charting",
  "Phenotyping",
  "Rare disease registries",
  "Real-world evidence",
  "Public health programmes",
  "Artificial intelligence in healthcare",
];

const PLATFORM_FEATURES = [
  "Genomic electronic medical record for clinical genetics",
  "Structured clinical and phenotype data capture",
  "Pedigree charting",
  "AI-assisted differential diagnosis and clinical decision support",
  "Longitudinal patient records",
  "Clinical analytics and dashboards",
  "Rare disease registries and referral tracking",
  "Role-based access control and audit trails",
];

const ids = () => {
  const url = getSiteUrl();
  return {
    url,
    organization: `${url}/#organization`,
    website: `${url}/#website`,
    platform: `${url}${PLATFORM_PATH}#software`,
  };
};

function absolute(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${getSiteUrl()}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;
}

/** Wraps nodes in one document, so a page emits a single script tag. */
export function graph(...nodes: (Node | null | undefined | false)[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}

/* ------------------------------------------------------------------------ */
/* Site-wide: rendered once, by the root layout                              */
/* ------------------------------------------------------------------------ */

export function organizationNode(description?: string | null): Node {
  const id = ids();
  return {
    "@type": "Organization",
    "@id": id.organization,
    name: SITE_NAME,
    url: id.url,
    logo: {
      "@type": "ImageObject",
      url: absolute("/brand/genetico-logo.png"),
      width: 1388,
      height: 402,
    },
    image: absolute(ogImagePath("home")),
    description: description?.trim() || DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    foundingDate: "2018",
    founder: [
      { "@type": "Person", name: "Arjun Gupta", jobTitle: "Founder & CEO" },
      { "@type": "Person", name: "Saurabh Verma", jobTitle: "Co-founder & CTO" },
    ],
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: TOPICS,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
    owns: { "@id": id.platform },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteNode(): Node {
  const id = ids();
  return {
    "@type": "WebSite",
    "@id": id.website,
    name: SITE_NAME,
    url: id.url,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": id.organization },
  };
}

/** IndiGeneUs.AI, the product. Described in full on the platform page, referenced elsewhere. */
export function platformNode(): Node {
  const id = ids();
  return {
    "@type": "SoftwareApplication",
    "@id": id.platform,
    name: "IndiGeneUs.AI",
    url: absolute(PLATFORM_PATH),
    description: STATIC_PAGE_SEO.platform.description,
    applicationCategory: "HealthApplication",
    applicationSubCategory: "Clinical genetics platform",
    operatingSystem: "Web browser",
    featureList: PLATFORM_FEATURES,
    audience: {
      "@type": "Audience",
      audienceType:
        "Clinical geneticists, hospitals and Centres of Excellence, diagnostic laboratories, researchers and public-health programmes",
    },
    creator: { "@id": id.organization },
    publisher: { "@id": id.organization },
  };
}

/* ------------------------------------------------------------------------ */
/* Per page                                                                  */
/* ------------------------------------------------------------------------ */

type Crumb = { name: string; path: string };

export function breadcrumbNode(pageUrl: string, trail: Crumb[]): Node {
  const crumbs: Crumb[] = [{ name: STATIC_PAGE_SEO.home.label, path: "/" }, ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

type WebPageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage";

/**
 * A static page as a WebPage node plus its breadcrumb. `about` names what the
 * page is about — the organisation by default, the platform for product pages.
 */
export function staticPageNodes(
  key: StaticPageKey,
  {
    type = "WebPage",
    about = "organization",
    extra = {},
  }: { type?: WebPageType; about?: "organization" | "platform"; extra?: Node } = {},
): Node[] {
  const id = ids();
  const seo = STATIC_PAGE_SEO[key];
  const url = absolute(seo.path);
  const isHome = key === "home";

  return [
    {
      "@type": type,
      "@id": `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      inLanguage: "en",
      isPartOf: { "@id": id.website },
      about: { "@id": about === "platform" ? id.platform : id.organization },
      primaryImageOfPage: { "@type": "ImageObject", url: absolute(ogImagePath(key)) },
      ...(isHome ? {} : { breadcrumb: { "@id": `${url}#breadcrumb` } }),
      ...extra,
    },
    ...(isHome ? [] : [breadcrumbNode(url, [{ name: seo.label, path: seo.path }])]),
  ];
}

/* ------------------------------------------------------------------------ */
/* Content                                                                   */
/* ------------------------------------------------------------------------ */

/** "31:02" or "1:12:08" → "PT31M2S" / "PT1H12M8S". Empty when it cannot be read. */
export function isoDuration(clock: string): string {
  const parts = clock.split(":").map((part) => Number(part));
  if (!parts.length || parts.length > 3 || parts.some((n) => !Number.isFinite(n))) return "";
  const [h, m, s] =
    parts.length === 3 ? parts : [0, ...(parts.length === 2 ? parts : [0, ...parts])];
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s || (!h && !m) ? `${s}S` : ""}`;
}

/**
 * A YouTube video. Google needs a name, a thumbnail and an upload date to list
 * a video in results, so a video without a publish date is left out (null).
 */
export function videoNode(video: {
  title: string;
  description: string;
  href: string;
  duration: string;
  publishedAt?: string | null;
}): Node | null {
  const videoId = youtubeIdFromUrl(video.href);
  if (!videoId || !video.publishedAt) return null;
  const duration = isoDuration(video.duration);
  return {
    "@type": "VideoObject",
    "@id": `https://www.youtube.com/watch?v=${videoId}`,
    name: video.title,
    description: video.description || video.title,
    thumbnailUrl: [
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    ],
    uploadDate: video.publishedAt,
    ...(duration ? { duration } : {}),
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    url: `https://www.youtube.com/watch?v=${videoId}`,
    inLanguage: /in hindi/i.test(video.description) ? "hi" : "en",
    publisher: { "@id": ids().organization },
  };
}

/** An article published elsewhere (LinkedIn, press). */
export function externalArticleNode(article: {
  title: string;
  href: string;
  publishedAt?: string | null;
}): Node {
  return {
    "@type": "Article",
    "@id": article.href,
    headline: article.title,
    url: article.href,
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    about: { "@id": ids().organization },
  };
}

/** A post on genetico.in/blog. */
export function blogPostingNode(post: {
  title: string;
  description: string;
  path: string;
  author: string;
  datePublished?: string | null;
  dateModified?: string | null;
  image?: string | null;
}): Node {
  const url = absolute(post.path);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    inLanguage: "en",
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": ids().organization },
    ...(post.datePublished ? { datePublished: post.datePublished } : {}),
    ...(post.dateModified || post.datePublished
      ? { dateModified: post.dateModified || post.datePublished }
      : {}),
    image: absolute(post.image || ogImagePath("blog")),
  };
}

/**
 * One Rare Insights edition, as a NewsArticle published by Genetico. Its
 * WebPage node and breadcrumb (Rare Insights › Edition NN) come with it.
 */
export function newsletterEditionNodes(edition: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  /** The edition's own share card. */
  image: string;
  /** The papers and announcements the edition discusses. */
  citations: string[];
}): Node[] {
  const id = ids();
  const url = absolute(edition.path);
  const parent = STATIC_PAGE_SEO.rareInsights;
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: edition.headline,
      description: edition.description,
      inLanguage: "en",
      isPartOf: { "@id": id.website },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "NewsArticle",
      "@id": `${url}#article`,
      headline: edition.headline,
      description: edition.description,
      url,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      inLanguage: "en",
      datePublished: edition.datePublished,
      author: { "@id": id.organization },
      publisher: { "@id": id.organization },
      isPartOf: { "@type": "Periodical", name: "Rare Insights", url: absolute(parent.path) },
      image: absolute(edition.image),
      citation: edition.citations,
    },
    breadcrumbNode(url, [
      { name: parent.label, path: parent.path },
      { name: edition.headline, path: edition.path },
    ]),
  ];
}

/**
 * The Resources page: a CollectionPage whose parts are its videos (with full
 * VideoObject nodes, which is what puts them in Google's video results) and
 * the articles it links to.
 */
export function resourcesNodes(content: ResourcesPageContent): Node[] {
  const films = [
    ...(content.featured ? [content.featured] : []),
    ...content.videos.items,
    ...content.deepDives.items,
  ];
  const videos = films
    .map((film) =>
      videoNode({
        title: film.title,
        description: film.blurb,
        href: film.href,
        duration: film.duration,
        publishedAt: film.published,
      }),
    )
    .filter((node): node is Node => node !== null);
  const articles = content.articles.items.map((article) =>
    externalArticleNode({
      title: article.title,
      href: article.href,
      publishedAt: article.published,
    }),
  );
  const parts = [...videos, ...articles].map((node) => ({ "@id": node["@id"] }));

  return [
    ...staticPageNodes("resources", { type: "CollectionPage", extra: { hasPart: parts } }),
    ...videos,
    ...articles,
  ];
}
