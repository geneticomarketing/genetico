import type { CSSProperties } from "react";

const PLACEHOLDER_COLOR = "#e5e7eb";

const CSS_URL_ESCAPES: Record<string, string> = { "'": "%27", "(": "%28", ")": "%29" };

/** Percent-encode the characters that would terminate a CSS url('…') token early. */
function toCssUrlToken(url: string): string {
  return url.replace(/['()]/g, (char) => CSS_URL_ESCAPES[char]);
}

/**
 * Build the background style for a CMS thumbnail field.
 *
 * The field holds either a CSS gradient (what the hardcoded defaults use) or an image URL — a
 * Supabase upload or a path under /public. An image URL has to become `background-image: url(…)`;
 * handing it to the `background` shorthand renders nothing, which is what an uploaded thumbnail
 * used to do on the blog card and the article page.
 */
export function thumbnailStyle(thumbnail: string): CSSProperties {
  if (!thumbnail) return { backgroundColor: PLACEHOLDER_COLOR };

  if (thumbnail.startsWith("radial-gradient") || thumbnail.startsWith("linear-gradient")) {
    return { background: thumbnail };
  }

  if (thumbnail.startsWith("http") || thumbnail.startsWith("/") || thumbnail.startsWith("data:")) {
    return {
      backgroundImage: `url('${toCssUrlToken(thumbnail)}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }

  return { background: thumbnail };
}
