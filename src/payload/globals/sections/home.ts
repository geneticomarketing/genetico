import type { Field, GlobalConfig } from "payload";

import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { withAdminGroup } from "../../with-admin-group";
function pageSection(
  slug: string,
  label: string,
  fields: Field[],
  group: (typeof ADMIN_GROUPS)[keyof typeof ADMIN_GROUPS],
): GlobalConfig {
  return withAdminGroup({ slug, label, fields }, group);
}

export const HomeHero = pageSection(
  "home-hero",
  "Hero",
  [
    {
      name: "heroSlides",
      type: "array",
      fields: [
        { name: "id", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
        { name: "cta", type: "text", required: true },
        { name: "href", type: "text", required: true },
        ...imageUploadFields({
          uploadName: "backgroundImage",
          pathName: "image",
          uploadLabel: "Background image",
          preset: "heroSlide",
          pathDescription:
            "Fallback static image path if no upload is provided (e.g. /hero/hero-bg.webp)",
        }),
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeWhoWeAre = pageSection(
  "home-who-we-are",
  "Who We Are",
  [
    { name: "eyebrow", type: "text" },
    {
      name: "paragraphs",
      type: "array",
      fields: [
        { name: "text", type: "textarea", required: true },
        {
          name: "highlights",
          type: "array",
          label: "Highlighted phrases",
          admin: {
            description:
              "Add exact phrases from the paragraph above to highlight in blue on the website",
          },
          fields: [{ name: "phrase", type: "text", required: true }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeEcosystemChallenges = pageSection(
  "home-ecosystem-challenges",
  "Ecosystem Challenges",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeEcosystemGaps = pageSection(
  "home-ecosystem-gaps",
  "Ecosystem Gaps",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.home,
);

export const HomePartners = pageSection(
  "home-partners",
  "Partners",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeSecurity = pageSection(
  "home-security",
  "Security & Trust",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "features",
      type: "array",
      fields: [{ name: "text", type: "text", required: true }],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeNews = pageSection(
  "home-news",
  "News",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    // { name: "ctaHref", type: "text" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeCta = pageSection(
  "home-cta",
  "CTA",
  [{ name: "heading", type: "text" }, { name: "description", type: "textarea" }, ctaButtonsField],
  ADMIN_GROUPS.home,
);
