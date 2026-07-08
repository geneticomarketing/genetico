import { youtubeEmbedUrl } from "@/lib/youtube";

/** Permissions required by YouTube embeds; includes unload to avoid Chrome policy violations. */
export const YOUTUBE_EMBED_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; unload";

type YoutubeEmbedProps = {
  id: string;
  title: string;
  autoplay?: boolean;
  className?: string;
};

export function YoutubeEmbed({ id, title, autoplay = false, className }: YoutubeEmbedProps) {
  return (
    <iframe
      src={youtubeEmbedUrl(id, autoplay)}
      title={title}
      allow={YOUTUBE_EMBED_ALLOW}
      allowFullScreen
      loading="lazy"
      className={className}
    />
  );
}
