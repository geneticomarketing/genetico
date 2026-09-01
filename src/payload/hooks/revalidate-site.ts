import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

import { revalidatePublicSite } from "@/lib/cms/revalidate-site";

function pathsForCollection(slug: string, doc: Record<string, unknown> | undefined) {
  const extra: string[] = [];

  if (slug === "blog-posts" && typeof doc?.slug === "string") {
    extra.push(`/blog/${doc.slug}`);
  }

  if (slug === "legal-pages" && typeof doc?.slug === "string") {
    extra.push(`/${doc.slug}`);
  }

  if (slug === "solution-pages" && typeof doc?.slug === "string") {
    if (doc.slug === "hospital") extra.push("/hospital");
    if (doc.slug === "pharma") extra.push("/life-science");
  }

  return extra;
}

export const revalidateAfterCollectionChange: CollectionAfterChangeHook = ({ collection, doc }) => {
  revalidatePublicSite(pathsForCollection(collection.slug, doc as Record<string, unknown>));
};

export const revalidateAfterCollectionDelete: CollectionAfterDeleteHook = ({ collection, doc }) => {
  revalidatePublicSite(pathsForCollection(collection.slug, doc as Record<string, unknown>));
};

export const revalidateAfterGlobalChange: GlobalAfterChangeHook = ({ global }) => {
  const extra: string[] = [];
  const slug = global.slug;

  if (slug.startsWith("home-")) extra.push("/");
  if (slug.startsWith("about-")) extra.push("/about-us");
  if (slug.startsWith("platform-")) extra.push("/platform");
  if (slug.startsWith("public-health-")) extra.push("/public-health");
  if (slug.startsWith("resources-")) {
    extra.push("/resources");
    extra.push("/blog");
  }
  if (slug === "utility-pages") extra.push("/coming-soon");

  revalidatePublicSite(extra);
};
