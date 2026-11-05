export function youtubeIdFromUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return match?.[1] ?? "";
}

/**
 * A CSS `background-image` stack for a video's own still.
 *
 * Three layers, painted front to back: the high-resolution thumbnail, the
 * small one, then a plain ground. `maxresdefault` only exists for videos
 * uploaded above 720p and 404s otherwise — when it does, the layer beneath
 * simply shows through, so a card never renders as a broken image. The ground
 * covers anything that is not a YouTube link at all.
 */
export function youtubeThumbnailStack(url: string | null | undefined, ground: string): string {
  const id = url ? youtubeIdFromUrl(url) : "";
  if (!id) return ground;

  return [
    `url("https://img.youtube.com/vi/${id}/maxresdefault.jpg")`,
    `url("https://img.youtube.com/vi/${id}/mqdefault.jpg")`,
    ground,
  ].join(", ");
}
