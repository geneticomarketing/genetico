import type { Field } from "payload";

type ImageFieldOptions = {
  /** Upload field name in the CMS schema */
  uploadName?: string;
  /** Text fallback field name for static paths */
  pathName?: string;
  pathDescription?: string;
  uploadLabel?: string;
};

/** Upload field paired with an optional static-path fallback. */
export function imageUploadFields({
  uploadName = "image",
  pathName = "imageUrl",
  pathDescription = "Optional fallback path (e.g. /hero/hero-bg.webp) if no upload is provided",
  uploadLabel,
}: ImageFieldOptions = {}): Field[] {
  return [
    {
      name: uploadName,
      type: "upload",
      relationTo: "media",
      label: uploadLabel,
    },
    {
      name: pathName,
      type: "text",
      admin: { description: pathDescription },
    },
  ];
}
