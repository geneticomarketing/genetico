import type { Metadata } from "next";

export const SITE_NAME = "Genetico";
export const SITE_TAGLINE = "IndiGeneUs.AI";

export const DEFAULT_DESCRIPTION =
  "IndiGeneUs.AI structures complex clinical workflows, captures patient data in a standardized format, and enables AI-assisted clinical decision-making for rare and genetic disorders.";

export const DEFAULT_KEYWORDS = [
  "Genetico",
  "IndiGeneUs.AI",
  "rare disease",
  "genetic disorders",
  "clinical genomics",
  "AI clinical decision support",
  "rare disease diagnosis",
  "genetic medicine",
  "clinical workflows",
  "public health",
  "life sciences",
];

/** The home page's share card (app/og/[page]/route.tsx); pages pass their own. */
export const DEFAULT_OG_IMAGE = "/og/home";

/** The canonical origin, used by the sitemap, robots.txt, canonical tags and Open Graph URLs. */
export const CANONICAL_ORIGIN = "https://genetico.in";

export function getSiteUrl(): string {
  // Deliberately not VERCEL_URL or VERCEL_PROJECT_PRODUCTION_URL: those name a
  // *.vercel.app host, and every canonical URL must point at genetico.in no
  // matter which host served the page. NEXT_PUBLIC_SITE_URL overrides it.
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

  if (!configured) return CANONICAL_ORIGIN;

  return configured.startsWith("http") ? configured.replace(/\/$/, "") : `https://${configured}`;
}

type CreatePageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  ogImage?: string | null;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  keywords = DEFAULT_KEYWORDS,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: CreatePageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const canonicalUrl = `${getSiteUrl()}${canonicalPath}`;

  const openGraphImages = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: `${title} — ${SITE_NAME}` }]
    : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description,
      images: openGraphImages,
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
      ...(type === "article" && modifiedTime ? { modifiedTime } : {}),
      ...(type === "article" && authors?.length ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      creator: "@genetico_in",
      site: "@genetico_in",
    },
  };
}

export function createRootMetadata(siteDescription?: string | null): Metadata {
  const description = siteDescription?.trim() || DEFAULT_DESCRIPTION;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: `${SITE_NAME} — ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: DEFAULT_KEYWORDS,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: getSiteUrl() }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: getSiteUrl(),
      siteName: SITE_NAME,
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description,
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — AI-powered rare disease care platform`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description,
      images: [DEFAULT_OG_IMAGE],
      creator: "@genetico_in",
      site: "@genetico_in",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: getSiteUrl(),
    },
    icons: {
      icon: [{ url: "/favicon.ico", sizes: "any" }],
      shortcut: "/favicon.ico",
    },
  };
}
