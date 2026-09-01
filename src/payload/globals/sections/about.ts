import { ctaButtonsField } from "../../fields/link";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

export const AboutHero = pageSection(
  "about-hero",
  "1. Hero",
  "The top of the About page. The headline is split across two lines — see the help text on each field.",
  [
    {
      name: "titleLine1",
      type: "text",
      required: true,
      label: "Headline — first line",
      admin: { description: "Example: Building Infrastructure" },
    },
    {
      name: "titleLine2",
      type: "text",
      label: "Headline — second line",
      admin: {
        description:
          "The plain words at the start of the second line, before the blue words. Example: For",
      },
    },
    {
      name: "titleHighlight",
      type: "text",
      label: "Headline — words in blue",
      admin: {
        description: "The end of the second line, shown in blue. Example: Rare Disease Care",
      },
    },
    { name: "subtitle", type: "textarea", label: "Paragraph below the headline" },
    { name: "ctaLabel", type: "text", label: "Button text" },
    {
      name: "ctaHref",
      type: "text",
      label: "Button link",
      admin: { description: "A path on this site such as /platform, or a full https:// address." },
    },
    {
      name: "labels",
      type: "array",
      label: "Tags under the button",
      labels: { singular: "Tag", plural: "Tags" },
      fields: [{ name: "label", type: "text", required: true, label: "Tag text" }],
    },
  ],
  ADMIN_GROUPS.about,
);

export const AboutVision = pageSection(
  "about-vision",
  "2. Vision statement",
  "The large single-sentence statement directly below the hero.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the statement" },
    { name: "heading", type: "text", label: "Statement" },
  ],
  ADMIN_GROUPS.about,
);

export const AboutFoundations = pageSection(
  "about-foundations",
  "3. Foundations",
  "The numbered list of foundation points below the vision statement. Numbering is added automatically in the order you list them here.",
  [
    {
      name: "items",
      type: "array",
      label: "Foundation points",
      labels: { singular: "Point", plural: "Points" },
      fields: [
        { name: "title", type: "text", required: true, label: "Title" },
        { name: "body", type: "textarea", required: true, label: "Description" },
      ],
    },
  ],
  ADMIN_GROUPS.about,
);

export const AboutLeadership = pageSection(
  "about-leadership",
  "4. Leadership — heading",
  "Heading and intro above the leadership carousel. The people themselves are edited in “Team members” just below.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "subtitle", type: "textarea", label: "Intro paragraph" },
  ],
  ADMIN_GROUPS.about,
);

export const AboutGrants = pageSection(
  "about-grants",
  "5. Grants & Awards — heading",
  "Heading and intro above the recognition timeline. The entries themselves are edited in “Grants & awards” just below.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Intro paragraph" },
  ],
  ADMIN_GROUPS.about,
);

export const AboutCta = pageSection(
  "about-cta",
  "7. Closing call to action",
  "The last band on the About page, above the footer. (Section 6 — the partner logos and Security & Trust panel — is shared with the home page and is edited under “Home page”.)",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.about,
);
