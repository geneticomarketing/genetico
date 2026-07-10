import type { Field } from "payload";

export const IMAGE_UPLOAD_PRESETS = {
  heroSlide: {
    size: "1920 × 1080 px (16:9). WebP or JPG, ideally under 500 KB.",
    fileName: "hero-bg.webp, hero-dna.jpg",
  },
  pageHero: {
    size: "1600 × 900 px or wider (16:9). WebP, PNG, or JPG, under 600 KB.",
    fileName: "platform-hero.webp, public-health-hero.png",
  },
  featureIllustration: {
    size: "800 × 600 px or similar. SVG, PNG, or WebP with a transparent background if needed.",
    fileName: "hpo-extraction.svg, ocr-digitization.png",
  },
  headshot: {
    size: "400 × 400 px or larger square crop. JPG or WebP, under 200 KB.",
    fileName: "arjun-gupta.jpg, dr-rohit-sadanand.webp",
  },
  partnerLogo: {
    size: "400 × 120 px or similar wide logo. PNG or SVG with a transparent background.",
    fileName: "partner-birac-logo.png, partner-amity-logo.svg",
  },
  newsThumbnail: {
    size: "1200 × 675 px (16:9). JPG or WebP, under 350 KB.",
    fileName: "news-aiims-feature.jpg",
  },
  cardThumbnail: {
    size: "800 × 450 px (16:9). JPG, WebP, or PNG, under 250 KB.",
    fileName: "blog-rare-disease-policy.webp",
  },
  smallIcon: {
    size: "128 × 128 px or smaller. PNG or SVG with a transparent background.",
    fileName: "grant-birac-icon.png, ecosystem-clinicians-icon.svg",
  },
} as const;

export type ImageUploadPreset = keyof typeof IMAGE_UPLOAD_PRESETS;

export function imageUploadDescription(
  preset: ImageUploadPreset,
  extra?: string,
): string {
  const { size, fileName } = IMAGE_UPLOAD_PRESETS[preset];
  const base = `Recommended size: ${size} Use a descriptive file name such as ${fileName}. Stick to lowercase letters, numbers, and hyphens.`;
  return extra ? `${base} ${extra}` : base;
}

type ImageFieldOptions = {
  /** Upload field name in the CMS schema */
  uploadName?: string;
  /** Text fallback field name for static paths */
  pathName?: string;
  pathDescription?: string;
  uploadLabel?: string;
  /** Preset guidance for recommended dimensions and file naming */
  preset?: ImageUploadPreset;
  /** Override the upload helper text shown in the admin panel */
  uploadDescription?: string;
};

type MediaUploadFieldOptions = {
  name: string;
  label?: string;
  preset?: ImageUploadPreset;
  uploadDescription?: string;
  fallbackPathName?: string;
  fallbackPathDescription?: string;
};

/** Upload field paired with an optional static-path fallback. */
export function imageUploadFields({
  uploadName = "image",
  pathName = "imageUrl",
  pathDescription = "Optional fallback path (e.g. /hero/hero-bg.webp) if no upload is provided",
  uploadLabel,
  preset,
  uploadDescription,
}: ImageFieldOptions = {}): Field[] {
  const description =
    uploadDescription ?? (preset ? imageUploadDescription(preset) : undefined);

  return [
    {
      name: uploadName,
      type: "upload",
      relationTo: "media",
      label: uploadLabel,
      admin: description ? { description } : undefined,
    },
    {
      name: pathName,
      type: "text",
      admin: { description: pathDescription },
    },
  ];
}

/** Single media upload field with optional fallback path and upload guidance. */
export function mediaUploadField({
  name,
  label,
  preset,
  uploadDescription,
  fallbackPathName,
  fallbackPathDescription = "Optional fallback static path if no upload is provided",
}: MediaUploadFieldOptions): Field[] {
  const description =
    uploadDescription ?? (preset ? imageUploadDescription(preset) : undefined);

  const fields: Field[] = [
    {
      name,
      type: "upload",
      relationTo: "media",
      label,
      admin: description ? { description } : undefined,
    },
  ];

  if (fallbackPathName) {
    fields.push({
      name: fallbackPathName,
      type: "text",
      admin: { description: fallbackPathDescription },
    });
  }

  return fields;
}
