import { blogHref } from "@/lib/blogs";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";
import { resolveMediaUrl } from "./resolve-media-url";
import type { HomeNewsResourceCollection } from "./resource-collections";
import { resourceRefKey } from "./resource-collections";
import type { NewsResourceItem } from "./types";
import type {
  BlogPost as CmsBlogPost,
  DeepDive as CmsDeepDive,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  ShortVideo as CmsShortVideo,
} from "@/payload-types";

type ResourceDoc =
  | CmsBlogPost
  | CmsFeaturedVideo
  | CmsShortVideo
  | CmsDeepDive
  | CmsExternalArticle;

function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function resourceHref(
  href: string,
  external = isExternalUrl(href),
): Pick<NewsResourceItem, "href" | "external"> {
  return { href, external };
}

function isExternalUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
export function mapDocToNewsResourceItem(
  collection: HomeNewsResourceCollection,
  doc: ResourceDoc,
): NewsResourceItem | null {
  const value = "id" in doc && doc.id != null ? doc.id : null;
  if (value == null) return null;

  switch (collection) {
    case "blog-posts": {
      const blog = doc as CmsBlogPost;
      return {
        id: resourceRefKey({ relationTo: collection, value }),
        collection,
        category: blog.category,
        categoryColor: blog.categoryColor,
        title: blog.title,
        excerpt: blog.excerpt,
        author: blog.author,
        date: formatBlogDate(blog.publishedAt),
        readTime: blog.readTime,
        thumbnail: resolveMediaUrl(blog.thumbnailImage, blog.thumbnail) || "",
        ...resourceHref(blogHref(blog.slug), false),
      };
    }
    case "featured-videos": {
      const video = doc as CmsFeaturedVideo;
      const youtubeId = youtubeIdFromUrl(video.youtubeUrl);
      return {
        id: resourceRefKey({ relationTo: collection, value }),
        collection,
        category: video.tags?.[0]?.tag || "Video",
        title: video.title,
        excerpt: video.description || undefined,
        readTime: video.duration || undefined,
        thumbnail: youtubeId ? youtubeThumbnailUrl(youtubeId) : "",
        ...resourceHref(video.youtubeUrl),
      };
    }
    case "short-videos": {
      const video = doc as CmsShortVideo;
      const youtubeId = youtubeIdFromUrl(video.youtubeUrl);
      return {
        id: resourceRefKey({ relationTo: collection, value }),
        collection,
        category: video.category,
        title: video.title,
        excerpt: video.description || undefined,
        readTime: video.duration || undefined,
        thumbnail: youtubeId ? youtubeThumbnailUrl(youtubeId) : "",
        ...resourceHref(video.youtubeUrl),
      };
    }
    case "deep-dives": {
      const dive = doc as CmsDeepDive;
      const youtubeId = youtubeIdFromUrl(dive.youtubeUrl);
      return {
        id: resourceRefKey({ relationTo: collection, value }),
        collection,
        category: dive.category,
        categoryColor: dive.categoryColor || undefined,
        title: dive.title,
        excerpt: dive.description || undefined,
        readTime: dive.duration || undefined,
        thumbnail: dive.thumbnailGradient || (youtubeId ? youtubeThumbnailUrl(youtubeId) : ""),
        ...resourceHref(dive.youtubeUrl),
      };
    }
    case "external-articles": {
      const article = doc as CmsExternalArticle;
      return {
        id: resourceRefKey({ relationTo: collection, value }),
        collection,
        category: "Article",
        title: article.title,
        thumbnail: "",
        ...resourceHref(article.url),
      };
    }
    default:
      return null;
  }
}

export const HOME_NEWS_SIDEBAR_LIMIT = 4;

export type ResourceGroup = {
  collection: HomeNewsResourceCollection;
  docs: ResourceDoc[];
};

type FeedEntry = {
  collection: HomeNewsResourceCollection;
  item: NewsResourceItem;
  publishedAt: number | null;
  sortOrder: number;
  featuredOnHome: boolean;
};

function timestamp(value: unknown): number | null {
  if (typeof value !== "string" || !value) return null;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function toFeedEntries(groups: ResourceGroup[]): FeedEntry[] {
  const entries: FeedEntry[] = [];

  for (const group of groups) {
    for (const doc of group.docs) {
      const item = mapDocToNewsResourceItem(group.collection, doc);
      if (!item) continue;

      entries.push({
        collection: group.collection,
        item,
        publishedAt: "publishedAt" in doc ? timestamp(doc.publishedAt) : null,
        sortOrder: "sortOrder" in doc && typeof doc.sortOrder === "number" ? doc.sortOrder : 0,
        featuredOnHome: "featuredOnHome" in doc && doc.featuredOnHome === true,
      });
    }
  }

  return entries;
}

/** Newest first. Undated items come after dated ones, then fall back to their manual sort order. */
function byRecency(a: FeedEntry, b: FeedEntry): number {
  if (a.publishedAt !== b.publishedAt) {
    if (a.publishedAt === null) return 1;
    if (b.publishedAt === null) return -1;
    return b.publishedAt - a.publishedAt;
  }
  if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
  return a.item.title.localeCompare(b.item.title);
}

/**
 * Build the home page "Insights" section straight from the Resources page content.
 *
 * Featured card: the blog post ticked "Show as the featured post on the home page"; the newest
 * ticked one if several are, and the newest post of all if none is.
 *
 * Side list: the most recent resources of any type, newest first, excluding whatever is already
 * in the featured card.
 */
export function selectHomeNewsFeed(
  groups: ResourceGroup[],
  sidebarLimit = HOME_NEWS_SIDEBAR_LIMIT,
): { featured: NewsResourceItem | null; sidebar: NewsResourceItem[] } {
  const entries = toFeedEntries(groups);
  const blogPosts = entries.filter((entry) => entry.collection === "blog-posts").sort(byRecency);

  const featuredEntry = blogPosts.find((entry) => entry.featuredOnHome) ?? blogPosts[0] ?? null;

  const sidebar = entries
    .filter((entry) => entry.item.id !== featuredEntry?.item.id)
    .sort(byRecency)
    .slice(0, sidebarLimit)
    .map((entry) => entry.item);

  return { featured: featuredEntry?.item ?? null, sidebar };
}
