export const HOME_NEWS_RESOURCE_COLLECTIONS = [
  "blog-posts",
  "featured-videos",
  "short-videos",
  "deep-dives",
  "external-articles",
] as const;

export type HomeNewsResourceCollection = (typeof HOME_NEWS_RESOURCE_COLLECTIONS)[number];

export const HOME_NEWS_RESOURCE_LABELS: Record<HomeNewsResourceCollection, string> = {
  "blog-posts": "Blog",
  "featured-videos": "Featured video",
  "short-videos": "Short video",
  "deep-dives": "Deep dive",
  "external-articles": "Article",
};

export type HomeNewsResourceRef = {
  relationTo: HomeNewsResourceCollection;
  value: number | string;
};

export type HomeNewsResourcePicks = {
  featured?: HomeNewsResourceRef | null;
  sidebar?: HomeNewsResourceRef[];
};

export function resourceRefKey(ref: HomeNewsResourceRef): string {
  return `${ref.relationTo}:${ref.value}`;
}
