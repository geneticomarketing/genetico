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

export const PublicHealthHero = pageSection(
  "public-health-hero",
  "Public Health — Hero",
  [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    ...imageUploadFields({ uploadLabel: "Hero image" }),
  ],
  ADMIN_GROUPS.solutions,
);

export const PublicHealthImpact = pageSection(
  "public-health-impact",
  "Public Health — Impact",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "features",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
  ADMIN_GROUPS.solutions,
);

export const PublicHealthThreeTier = pageSection(
  "public-health-three-tier",
  "Public Health — Three Tier Model",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "tiers",
      type: "array",
      fields: [
        { name: "bannerLabel", type: "text", required: true },
        {
          name: "happens",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
        {
          name: "dataFlows",
          type: "array",
          fields: [{ name: "item", type: "text", required: true }],
        },
        {
          name: "users",
          type: "array",
          fields: [
            { name: "role", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
  ADMIN_GROUPS.solutions,
);

export const PublicHealthArchitecture = pageSection(
  "public-health-architecture",
  "Public Health — Architecture",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    {
      name: "classifications",
      type: "array",
      fields: [
        { name: "level", type: "text", required: true },
        { name: "timeBadge", type: "text" },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "tags",
          type: "array",
          fields: [{ name: "tag", type: "text", required: true }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.solutions,
);

export const PublicHealthCta = pageSection(
  "public-health-cta",
  "Public Health — CTA",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.solutions,
);
