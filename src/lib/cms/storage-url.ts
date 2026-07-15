const MEDIA_COLLECTION_PREFIX = "media";

console.log(process.env.S3_BUCKET);

export function isS3StorageConfigured(): boolean {
  return Boolean(
    process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY &&
    process.env.S3_ENDPOINT,
  );
}

/** Public Supabase Storage base, e.g. https://xxx.supabase.co/storage/v1/object/public/bucket */
export function getSupabasePublicStorageBase(): string | null {
  const explicit = process.env.S3_PUBLIC_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const endpoint = process.env.S3_ENDPOINT?.trim();
  const bucket = process.env.S3_BUCKET?.trim();
  if (!endpoint || !bucket) return null;

  const origin = endpoint.match(/^(https?:\/\/[^/]+)/)?.[1];
  if (!origin) return null;

  return `${origin}/storage/v1/object/public/${bucket}`;
}

export function extractPayloadMediaFilename(url: string): string | null {
  const match = url.match(/\/api\/media\/file\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function buildPublicMediaUrl(
  filename: string,
  prefix = MEDIA_COLLECTION_PREFIX,
): string | null {
  const publicBase = getSupabasePublicStorageBase();
  if (!publicBase || !filename) return null;

  const encodedFilename = filename
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  const objectPrefix = prefix.replace(/^\/|\/$/g, "");
  return objectPrefix
    ? `${publicBase}/${objectPrefix}/${encodedFilename}`
    : `${publicBase}/${encodedFilename}`;
}

/** Rewrite Payload / S3 API media URLs to direct public object URLs when using Supabase Storage. */
export function toPublicMediaUrl(url: string): string {
  if (!url) return url;

  if (url.includes("/storage/v1/object/public/")) return url;

  const filename = extractPayloadMediaFilename(url);
  if (filename) {
    const publicUrl = buildPublicMediaUrl(filename);
    if (publicUrl) return publicUrl;
  }

  const bucket = process.env.S3_BUCKET?.trim();
  const endpoint = process.env.S3_ENDPOINT?.trim();
  const publicBase = getSupabasePublicStorageBase();

  if (bucket && endpoint && publicBase && url.startsWith(endpoint)) {
    const remainder = url.split(/[?#]/)[0].slice(endpoint.length).replace(/^\//, "");
    if (remainder.startsWith(`${bucket}/`)) {
      const objectKey = decodeURIComponent(remainder.slice(bucket.length + 1));
      return `${publicBase}/${objectKey}`;
    }
  }

  return url;
}

export function getSupabaseStorageHostname(): string | null {
  const base = getSupabasePublicStorageBase() ?? process.env.S3_ENDPOINT?.trim();
  if (!base) return null;
  return base.match(/^(?:https?:\/\/)?([^/]+)/)?.[1] ?? null;
}
