import { BLOG_LISTING_DEFAULTS, DEFAULT_UTILITY_PAGES } from "./defaults";
import { getGlobal, getSectionGlobal } from "./queries";

/**
 * Loaders for the smaller pages that keep the earlier design: the blog
 * listing's heading block, the coming-soon page and the legal pages. Each
 * falls back to its built-in copy when the CMS has nothing stored.
 */

/** The heading block above the /blog listing (Resources page → 6. Blogs — heading). */
export async function getBlogListing() {
  const stored = await getSectionGlobal("resources-blog-listing");
  const defaults = BLOG_LISTING_DEFAULTS;
  return {
    title: stored?.title || defaults.title,
    metaDescription: stored?.metaDescription || defaults.metaDescription,
    eyebrow: stored?.eyebrow || defaults.eyebrow,
    heading: stored?.heading || defaults.heading,
    description: stored?.description || defaults.description,
    backLabel: stored?.backLabel || defaults.backLabel,
    backHref: stored?.backHref || defaults.backHref,
  };
}

/** The coming-soon page (Other pages → Coming soon page). */
export async function getUtilityPagesData() {
  return getGlobal("utility-pages", DEFAULT_UTILITY_PAGES);
}

/** A legal page by its slug, e.g. "privacy-policy" (Other pages → Legal pages). */
export async function getLegalPageBySlug(slug: string) {
  const payload = await import("./get-payload").then((m) => m.getPayloadClient());
  if (!payload) return null;
  try {
    const { docs } = await payload.find({
      collection: "legal-pages",
      where: { slug: { equals: slug } },
      limit: 1,
    });
    return docs[0] || null;
  } catch {
    return null;
  }
}
