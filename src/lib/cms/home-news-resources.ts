import { blogHref } from "@/lib/blogs";
import { youtubeIdFromUrl, youtubeThumbnailUrl } from "@/lib/youtube";
import { resolveMediaUrl } from "./resolve-media-url";
import type {
  HomeNewsResourceCollection,
  HomeNewsResourcePicks,
  HomeNewsResourceRef,
} from "./resource-collections";
import { HOME_NEWS_RESOURCE_LABELS, resourceRefKey } from "./resource-collections";
import type { NewsResourceItem } from "./types";
import type {
  BlogPost as CmsBlogPost,
  DeepDive as CmsDeepDive,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  ShortVideo as CmsShortVideo,
} from "@/payload-types";

export type ResourceCatalogItem = {
  ref: HomeNewsResourceRef;
  key: string;
  collection: HomeNewsResourceCollection;
  typeLabel: string;
  title: string;
  category: string;
  meta?: string;
};

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
export function toCatalogItem(
  collection: HomeNewsResourceCollection,
  doc: ResourceDoc,
): ResourceCatalogItem | null {
  const value = "id" in doc && doc.id != null ? doc.id : null;
  if (value == null) return null;

  const ref: HomeNewsResourceRef = { relationTo: collection, value };
  const typeLabel = HOME_NEWS_RESOURCE_LABELS[collection];

  switch (collection) {
    case "blog-posts": {
      const blog = doc as CmsBlogPost;
      return {
        ref,
        key: resourceRefKey(ref),
        collection,
        typeLabel,
        title: blog.title,
        category: blog.category,
        meta: blog.readTime,
      };
    }
    case "featured-videos": {
      const video = doc as CmsFeaturedVideo;
      return {
        ref,
        key: resourceRefKey(ref),
        collection,
        typeLabel,
        title: video.title,
        category: video.tags?.[0]?.tag || "Video",
        meta: video.duration || undefined,
      };
    }
    case "short-videos": {
      const video = doc as CmsShortVideo;
      return {
        ref,
        key: resourceRefKey(ref),
        collection,
        typeLabel,
        title: video.title,
        category: video.category,
        meta: video.duration || undefined,
      };
    }
    case "deep-dives": {
      const dive = doc as CmsDeepDive;
      return {
        ref,
        key: resourceRefKey(ref),
        collection,
        typeLabel,
        title: dive.title,
        category: dive.category,
        meta: dive.duration || undefined,
      };
    }
    case "external-articles": {
      const article = doc as CmsExternalArticle;
      return {
        ref,
        key: resourceRefKey(ref),
        collection,
        typeLabel,
        title: article.title,
        category: "Article",
      };
    }
    default:
      return null;
  }
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

export async function resolveHomeNewsResourcePicks(
  picks: HomeNewsResourcePicks | null | undefined,
  fetchDoc: (
    collection: HomeNewsResourceCollection,
    id: number | string,
  ) => Promise<ResourceDoc | null>,
): Promise<{ featured: NewsResourceItem | null; sidebar: NewsResourceItem[] }> {
  const featuredRef = picks?.featured ?? null;
  const sidebarRefs = picks?.sidebar ?? [];

  const featuredDoc = featuredRef
    ? await fetchDoc(featuredRef.relationTo, featuredRef.value)
    : null;
  const featured = featuredDoc
    ? mapDocToNewsResourceItem(featuredRef!.relationTo, featuredDoc)
    : null;

  const sidebar: NewsResourceItem[] = [];
  for (const ref of sidebarRefs.slice(0, 4)) {
    const doc = await fetchDoc(ref.relationTo, ref.value);
    const item = doc ? mapDocToNewsResourceItem(ref.relationTo, doc) : null;
    if (item) sidebar.push(item);
  }

  return { featured, sidebar };
}
