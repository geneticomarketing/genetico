import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

export const HomeHero = pageSection(
  "home-hero",
  "1. Hero slideshow",
  "The full-screen slideshow at the very top of the home page. Each slide has its own background image, small label, headline and button — the site rotates through them automatically.",
  [
    {
      name: "heroSlides",
      type: "array",
      label: "Slides",
      labels: { singular: "Slide", plural: "Slides" },
      admin: { description: "Drag to reorder. Slides play top to bottom." },
      fields: [
        {
          name: "id",
          type: "text",
          required: true,
          label: "Internal name",
          admin: {
            description:
              "Not shown on the website — a short name so you can tell slides apart (e.g. hospitals, public-health).",
          },
        },
        {
          name: "eyebrow",
          type: "text",
          required: true,
          label: "Small label above the headline",
        },
        { name: "title", type: "text", required: true, label: "Headline" },
        { name: "cta", type: "text", required: true, label: "Button text" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Button link",
          admin: {
            description: "A path on this site such as /platform, or a full https:// address.",
          },
        },
        ...imageUploadFields({
          uploadName: "backgroundImage",
          pathName: "image",
          uploadLabel: "Background image",
          preset: "heroSlide",
          pathDescription:
            "Leave empty unless a developer asked you to use a built-in image path (e.g. /hero/hero-bg.webp).",
        }),
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeWhoWeAre = pageSection(
  "home-who-we-are",
  "2. Who We Are",
  "The introduction paragraphs directly below the slideshow.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the paragraphs" },
    {
      name: "paragraphs",
      type: "array",
      label: "Paragraphs",
      labels: { singular: "Paragraph", plural: "Paragraphs" },
      fields: [
        { name: "text", type: "textarea", required: true, label: "Paragraph text" },
        {
          name: "highlights",
          type: "array",
          label: "Words to highlight in blue",
          labels: { singular: "Phrase", plural: "Phrases" },
          admin: {
            description:
              "Copy an exact phrase from the paragraph above to colour it blue. It must match the paragraph letter for letter, or nothing will be highlighted.",
          },
          fields: [{ name: "phrase", type: "text", required: true, label: "Phrase" }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomePartners = pageSection(
  "home-partners",
  "3. Partners — heading",
  "Heading and description above the scrolling row of partner logos. The logos themselves are edited in “Partner logos” just below. This section also appears on the About page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeSecurity = pageSection(
  "home-security",
  "4. Security & Trust",
  "The dark panel beside the partner logos, with the list of trust and compliance points. This section also appears on the About page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "features",
      type: "array",
      label: "Trust points",
      labels: { singular: "Trust point", plural: "Trust points" },
      fields: [{ name: "text", type: "text", required: true, label: "Text" }],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeEcosystemChallenges = pageSection(
  "home-ecosystem-challenges",
  "5. Ecosystem Challenges — heading",
  "Heading and description above the grid of challenge cards. The cards themselves are edited in “Ecosystem challenge cards” just below.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeEcosystemGaps = pageSection(
  "home-ecosystem-gaps",
  "6. Ecosystem Gaps — heading",
  "Heading and description above the tabbed “gaps” panel. The tabs themselves are edited in “Ecosystem gap tabs” just below.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeNews = pageSection(
  "home-news",
  "7. News & Articles",
  "The news band near the bottom of the home page. Pick which blog posts, videos and articles to feature — everything you can choose here is created on the Resources page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "ctaLabel", type: "text", label: "Link text (e.g. “See all”)" },
    // Retired. The section now builds itself from the Resources page: the featured card is the
    // blog post ticked "Show as the featured post on the home page", and the side list is the most
    // recent resources of any type. The field is kept (hidden) only so the existing database
    // column has something to map to — removing it outright stops `next dev` on an interactive
    // Drizzle prompt. See scripts/drop-home-news-resource-picks.mjs to retire it for good.
    {
      name: "resourcePicks",
      type: "json",
      label: "Featured & sidebar content (retired)",
      admin: { hidden: true },
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeFaqs = pageSection(
  "home-faqs",
  "8. FAQs",
  "The frequently asked questions accordion near the bottom of the home page.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "items",
      type: "array",
      label: "Questions",
      labels: { singular: "FAQ", plural: "FAQs" },
      fields: [
        { name: "question", type: "text", required: true, label: "Question" },
        { name: "answer", type: "textarea", required: true, label: "Answer" },
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeCta = pageSection(
  "home-cta",
  "9. Closing call to action",
  "The last band on the home page, above the footer.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.home,
);
