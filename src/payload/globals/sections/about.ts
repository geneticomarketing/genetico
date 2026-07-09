import type { Field, GlobalConfig } from "payload";

import { ctaButtonsField } from "../../fields/link";
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

export const AboutHero = pageSection(
  "about-hero",
  "Hero",
  [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    {
      name: "labels",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
  ],
  ADMIN_GROUPS.about,
);

export const AboutVision = pageSection(
  "about-vision",
  "Vision",
  [{ name: "heading", type: "text" }],
  ADMIN_GROUPS.about,
);

export const AboutFoundations = pageSection(
  "about-foundations",
  "Foundations",
  [
    {
      name: "items",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
  ADMIN_GROUPS.about,
);

export const AboutLeadership = pageSection(
  "about-leadership",
  "Leadership",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "subtitle", type: "textarea" },
  ],
  ADMIN_GROUPS.about,
);

export const AboutGrants = pageSection(
  "about-grants",
  "Grants & Awards",
  [
    { name: "eyebrow", type: "text" },
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.about,
);

export const AboutCta = pageSection(
  "about-cta",
  "CTA",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.about,
);
