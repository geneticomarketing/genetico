import { toPublicMediaUrl } from "./storage-url";

type MediaValue = string | number | { url?: string | null } | null | undefined;

export function resolveMediaUrl(upload: MediaValue, fallbackPath?: string | null): string {
  if (upload && typeof upload === "object" && upload.url) {
    return toPublicMediaUrl(upload.url);
  }

  if (fallbackPath) return toPublicMediaUrl(fallbackPath);
  return "";
}
