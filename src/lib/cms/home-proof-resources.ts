import { blogHref } from "@/lib/blogs";
import { getCollection } from "@/lib/cms/queries";
import { RESOURCES_PATH } from "@/lib/routes";
import type {
  BlogPost as CmsBlogPost,
  DeepDive as CmsDeepDive,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  ShortVideo as CmsShortVideo,
} from "@/payload-types";

/**
 * The home page's proof strip, built from the Resources page.
 *
 * Nothing here is curated on the home page itself. An editor ticks "Show on
 * the home page" against a resource and it appears; the Resources page stays
 * the only place any of this content is written. That is the same rule the
 * blog posts' home checkbox already followed, widened to every resource type.
 *
 * Deliberately not sorted by publish date: only the blog posts carry one, so
 * a date sort would put four blogs in a strip that is meant to lead with
 * video. `sortOrder` is set on every collection and is what the editor
 * already uses to arrange the Resources page, so the strip follows it.
 */

/** How many items sit beside the featured card. */
const CLIP_LIMIT = 3;

export type ProofResource = {
  /** Stable key: collection and row id. */
  id: string;
  /** Kind and length, e.g. "Deep dive · 45:22". */
  meta: string;
  title: string;
  href: string;
  /** Longer form, used by the featured card where there is room. */
  fullTitle: string;
  blurb: string;
  duration: string;
};

export type ProofFeed = {
  featured: ProofResource | null;
  clips: ProofResource[];
};

type Flagged = {
  id?: number | string | null;
  showOnHome?: boolean | null;
  homeTitle?: string | null;
  sortOrder?: number | null;
};

/** Kind label shown before the duration. */
const KIND_LABEL = {
  "featured-videos": "Film",
  "short-videos": "Video",
  "deep-dives": "Deep dive",
  "external-articles": "Article",
  "blog-posts": "Blog",
} as const;

type ResourceKind = keyof typeof KIND_LABEL;

function meta(kind: ResourceKind, duration: string, readTime?: string | null): string {
  const trailing = duration || readTime || "";
  return trailing ? `${KIND_LABEL[kind]} · ${trailing}` : KIND_LABEL[kind];
}

function pick<T extends Flagged>(docs: T[]): T[] {
  return docs
    .filter((doc) => doc.showOnHome && doc.id != null)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

function toResource(
  kind: ResourceKind,
  doc: Flagged & { title: string; description?: string | null },
  href: string,
  duration = "",
  readTime?: string | null,
): ProofResource {
  const short = doc.homeTitle?.trim();
  return {
    id: `${kind}:${doc.id}`,
    meta: meta(kind, duration, readTime),
    title: short || doc.title,
    fullTitle: doc.title,
    blurb: doc.description?.trim() || "",
    duration,
    href,
  };
}

/**
 * Reads every resource collection and returns the ones offered to the home
 * page: a featured item, then up to three beside it.
 *
 * The featured card prefers a featured video, since it is the only shape the
 * design gives a large still and a play button. Failing that it takes
 * whatever is first, so ticking a single article still fills the section
 * rather than leaving a hole.
 */
export async function getProofFeed(): Promise<ProofFeed> {
  const [featuredVideos, shortVideos, deepDives, articles, blogs] = await Promise.all([
    getCollection<CmsFeaturedVideo>("featured-videos", []),
    getCollection<CmsShortVideo>("short-videos", []),
    getCollection<CmsDeepDive>("deep-dives", []),
    getCollection<CmsExternalArticle>("external-articles", []),
    getCollection<CmsBlogPost>("blog-posts", []),
  ]);

  const films = pick(featuredVideos).map((doc) =>
    toResource("featured-videos", doc, doc.youtubeUrl, doc.duration ?? ""),
  );
  const clips = [
    ...pick(shortVideos).map((doc) =>
      toResource("short-videos", doc, doc.youtubeUrl, doc.duration ?? ""),
    ),
    ...pick(deepDives).map((doc) =>
      toResource("deep-dives", doc, doc.youtubeUrl, doc.duration ?? ""),
    ),
    ...pick(articles).map((doc) => toResource("external-articles", doc, doc.url)),
    ...pick(blogs).map((doc) =>
      toResource("blog-posts", doc, blogHref(doc.slug), "", doc.readTime),
    ),
  ];

  const featured = films[0] ?? clips[0] ?? null;
  const rest = (featured && films[0] ? clips : clips.slice(1)).filter(
    (clip) => clip.id !== featured?.id,
  );

  return { featured, clips: rest.slice(0, CLIP_LIMIT) };
}

/** Where the strip's "all resources" link points. */
export const ALL_RESOURCES_HREF = RESOURCES_PATH;
