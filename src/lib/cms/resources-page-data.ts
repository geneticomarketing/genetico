import { blogHref } from "@/lib/blogs";
import { getCollection, getSectionGlobal } from "@/lib/cms/queries";
import { NEWSLETTER_URL } from "@/lib/contact";
import { BLOG_PATH } from "@/lib/routes";
import type {
  BlogPost as CmsBlogPost,
  DeepDive as CmsDeepDive,
  ExternalArticle as CmsExternalArticle,
  FeaturedVideo as CmsFeaturedVideo,
  ShortVideo as CmsShortVideo,
} from "@/payload-types";

/**
 * The Resources page, shaped the way its sections consume it.
 *
 * The tab row is derived rather than edited: a tab exists for each section
 * that has something in it, and counts its own items. The old editable list
 * let an editor write a label that matched none of the four words the filter
 * understood, and then filtered nothing with no clue why.
 */

export type ResourceSectionHeading = {
  /** Small mono label above the rule. */
  label: string;
  /** The section's own heading. */
  title: string;
  description: string;
};

export type FeaturedFilm = {
  kicker: string;
  title: string;
  blurb: string;
  duration: string;
  source: string;
  href: string;
};

export type VideoCard = {
  id: string;
  category: string;
  title: string;
  blurb: string;
  duration: string;
  source: string;
  href: string;
};

export type DeepDiveCard = VideoCard & { tags: string[] };

export type ArticleRow = {
  id: string;
  title: string;
  meta: string;
  href: string;
};

export type BlogCard = {
  id: string;
  category: string;
  title: string;
  blurb: string;
  meta: string;
  href: string;
};

/** One filter tab: the sections it reveals, and how many items those hold. */
export type ResourceTab = {
  id: string;
  label: string;
  count: number;
  /** Section ids this tab shows. Empty means every section. */
  sections: string[];
};

export type ResourcesPageContent = {
  hero: { eyebrow: string; title: string; description: string; meta: string[] };
  tabs: ResourceTab[];
  featured: FeaturedFilm | null;
  videos: { heading: ResourceSectionHeading; items: VideoCard[] };
  deepDives: { heading: ResourceSectionHeading; items: DeepDiveCard[]; seeAll?: string };
  articles: { heading: ResourceSectionHeading; items: ArticleRow[] };
  blogs: {
    heading: ResourceSectionHeading;
    items: BlogCard[];
    seeAllLabel: string;
    seeAllHref: string;
  };
  subscribe: { eyebrow: string; title: string; description: string; label: string; href: string };
};

function text(value: string | null | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function heading(
  global: { heading?: string | null; title?: string | null; description?: string | null } | null,
  fallback: ResourceSectionHeading,
): ResourceSectionHeading {
  return {
    label: text(global?.heading, fallback.label),
    title: text(global?.title, fallback.title),
    description: text(global?.description, fallback.description),
  };
}

function formatDate(iso?: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function getResourcesPageContent(): Promise<ResourcesPageContent> {
  const [
    hero,
    videosSection,
    deepSection,
    articlesSection,
    blogsSection,
    newsletter,
    featuredVideos,
    shortVideos,
    deepDives,
    externalArticles,
    blogPosts,
  ] = await Promise.all([
    getSectionGlobal("resources-hero"),
    getSectionGlobal("resources-videos-section"),
    getSectionGlobal("resources-deep-dives-section"),
    getSectionGlobal("resources-articles-section"),
    getSectionGlobal("resources-blogs-section"),
    getSectionGlobal("resources-newsletter"),
    getCollection<CmsFeaturedVideo>("featured-videos", []),
    getCollection<CmsShortVideo>("short-videos", []),
    getCollection<CmsDeepDive>("deep-dives", []),
    getCollection<CmsExternalArticle>("external-articles", []),
    getCollection<CmsBlogPost>("blog-posts", []),
  ]);

  const film = featuredVideos.find((doc) => doc.featured) ?? featuredVideos[0] ?? null;

  const featured: FeaturedFilm | null = film
    ? {
        kicker: text(film.kicker, "Featured"),
        title: film.title,
        blurb: text(film.description, ""),
        duration: text(film.duration, ""),
        source: text(film.source, ""),
        href: film.youtubeUrl,
      }
    : null;

  const videos: VideoCard[] = shortVideos.map((doc) => ({
    id: `short-videos:${doc.id}`,
    category: doc.category,
    title: doc.title,
    blurb: text(doc.description, ""),
    duration: text(doc.duration, ""),
    source: "",
    href: doc.youtubeUrl,
  }));

  const dives: DeepDiveCard[] = deepDives.map((doc) => ({
    id: `deep-dives:${doc.id}`,
    category: doc.category,
    title: doc.title,
    blurb: text(doc.description, ""),
    duration: text(doc.duration, ""),
    source: text(doc.sourceLabel, ""),
    href: doc.youtubeUrl,
    tags: (doc.tags ?? [])
      .map((entry) => entry.tag?.trim())
      .filter((tag): tag is string => Boolean(tag)),
  }));

  const articles: ArticleRow[] = externalArticles.map((doc) => ({
    id: `external-articles:${doc.id}`,
    title: doc.title,
    meta: formatDate(doc.publishedAt),
    href: doc.url,
  }));

  const blogs: BlogCard[] = blogPosts.map((doc) => ({
    id: `blog-posts:${doc.id}`,
    category: doc.category,
    title: doc.title,
    blurb: text(doc.excerpt, ""),
    meta: [doc.author, formatDate(doc.publishedAt), doc.readTime].filter(Boolean).join(" · "),
    href: blogHref(doc.slug),
  }));

  // One tab per section that has something in it. "All" counts everything,
  // including the featured film.
  const total = (featured ? 1 : 0) + videos.length + dives.length + articles.length + blogs.length;
  const onVideo = (featured ? 1 : 0) + videos.length + dives.length;

  const tabs: ResourceTab[] = [
    { id: "all", label: "All", count: total, sections: [] },
    {
      id: "videos",
      label: "Videos",
      count: (featured ? 1 : 0) + videos.length,
      sections: ["featured", "videos"],
    },
    { id: "deep-dives", label: "Deep dives", count: dives.length, sections: ["deep-dives"] },
    { id: "articles", label: "Articles", count: articles.length, sections: ["articles"] },
    { id: "blogs", label: "Blogs", count: blogs.length, sections: ["blogs"] },
  ].filter((tab) => tab.count > 0);

  return {
    hero: {
      eyebrow: text(hero?.title, "Resources"),
      title: text(hero?.subtitle, "Clinical insights, updates, and learning from Genetico"),
      description: text(hero?.description, ""),
      meta: [
        `${total} ${total === 1 ? "resource" : "resources"}${onVideo ? ` · ${onVideo} on video` : ""}`,
      ],
    },
    tabs,
    featured,
    videos: {
      heading: heading(videosSection, {
        label: "Videos",
        title: "Short walkthroughs",
        description: "Under ten minutes each — how the workflow actually runs.",
      }),
      items: videos,
    },
    deepDives: {
      heading: heading(deepSection, {
        label: "Deep dives",
        title: "Feature-length sessions",
        description: "Full panels and conference recordings, unedited.",
      }),
      items: dives,
    },
    articles: {
      heading: heading(articlesSection, {
        label: "Articles",
        title: "Positions and commentary",
        description: "Where Indian rare disease policy and practice actually stand.",
      }),
      items: articles,
    },
    blogs: {
      heading: heading(blogsSection, {
        label: "Blogs",
        title: "From the team",
        description: "Notes from the clinicians and engineers building the platform.",
      }),
      items: blogs,
      seeAllLabel: text(blogsSection?.seeAllLabel, "See all"),
      seeAllHref: text(blogsSection?.seeAllHref, BLOG_PATH),
    },
    subscribe: {
      eyebrow: "Stay updated",
      title: text(newsletter?.heading, "New clinical insights, monthly"),
      description: text(
        newsletter?.description,
        "Research updates, product developments, and rare disease policy — sent once a month, no more.",
      ),
      label: text(newsletter?.buttonLabel, "Subscribe to updates"),
      href: text(newsletter?.buttonHref, NEWSLETTER_URL),
    },
  };
}
