import { revalidatePath } from "next/cache";

const PUBLIC_PAGE_PATHS = [
  "/",
  "/about-us",
  "/platform",
  "/hospital",
  "/life-science",
  "/public-health",
  "/resources",
  "/blog",
  "/coming-soon",
  "/privacy-policy",
] as const;

/** Bust Next.js static caches so CMS edits appear on the live site. */
export function revalidatePublicSite(extraPaths: string[] = []) {
  revalidatePath("/", "layout");

  for (const path of PUBLIC_PAGE_PATHS) {
    revalidatePath(path);
  }

  for (const path of extraPaths) {
    if (path) revalidatePath(path);
  }
}
