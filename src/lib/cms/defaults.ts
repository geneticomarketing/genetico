/**
 * Built-in copy for the two small pages still on the earlier design, shown
 * when their CMS entries are empty. (Every other page's copy lives in
 * src/content/.)
 */

/** /blog — the heading block above the post list (Resources page → Blogs — heading). */
export const BLOG_LISTING_DEFAULTS = {
  title: "Blogs | Genetico",
  metaDescription:
    "Clinical insights, policy perspectives, and research updates on rare disease diagnosis and genomic medicine from the Genetico team.",
  eyebrow: "Genetico Blogs",
  heading: "Insights on rare disease care, genomics, and health infrastructure",
  description:
    "Perspectives from clinicians, researchers, and the Genetico team on building diagnostic workflows that scale.",
  backLabel: "Back to resources",
  backHref: "/resources",
};

/** /coming-soon (Other pages → Coming soon page). */
export const DEFAULT_UTILITY_PAGES = {
  comingSoon: {
    metaTitle: "Coming Soon | Genetico",
    metaDescription: "This section of Genetico is coming soon.",
    eyebrow: "Coming soon",
    heading: "We're building something new",
    body: "This part of Genetico is still in development. Check back soon for updates on our platform, resources, and more.",
    backLabel: "Back to home",
    backHref: "/",
  },
};
