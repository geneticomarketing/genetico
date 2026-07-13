export function youtubeIdFromUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]+)/);
  return match?.[1] ?? "";
}

export function youtubeEmbedUrl(id: string, autoplay = false): string {
  const params = autoplay ? "?autoplay=1" : "";
  return `https://www.youtube.com/embed/${id}${params}`;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}
