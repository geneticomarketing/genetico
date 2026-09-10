import { ctaButtonsField } from "../../fields/link";
import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection, retiredSection } from "./section";

export const HomeHero = pageSection(
  "home-hero",
  "1. Hero",
  "The top of the home page: the headline, the paragraph under it, the two buttons, and the scrolling row of institution names.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the headline" },
    {
      name: "headline",
      type: "text",
      label: "Headline",
      admin: {
        description:
          "The part of the headline that never changes. The rotating words below finish the sentence, and a full stop is added automatically — so leave this without one.",
      },
    },
    {
      name: "rotatingWords",
      type: "array",
      label: "Rotating words at the end of the headline",
      labels: { singular: "Word", plural: "Words" },
      admin: {
        description:
          "Each word appears in turn, about every three seconds. One word on its own simply stays put.",
      },
      fields: [{ name: "word", type: "text", required: true, label: "Word" }],
    },
    { name: "blurb", type: "textarea", label: "Paragraph below the headline" },
    {
      name: "blurbShort",
      type: "textarea",
      label: "Shorter paragraph for phones",
      admin: {
        description:
          "Shown instead of the paragraph above on narrow screens, where the longer one crowds the page. Leave empty to use the same text on every screen.",
      },
    },
    ctaButtonsField,
    { name: "trustedByLabel", type: "text", label: "Label above the scrolling names" },
    {
      name: "credentials",
      type: "array",
      label: "Institution names",
      labels: { singular: "Name", plural: "Names" },
      admin: { description: "Text only — these scroll past under the buttons. Drag to reorder." },
      fields: [{ name: "name", type: "text", required: true, label: "Name" }],
    },
    // Retired with the 2026 redesign: the hero is one statement now, not a
    // slideshow. The four slides stay in the database by decision — deleting
    // the field here would also stop `next dev` on an interactive Drizzle
    // prompt until the column were dropped by hand.
    {
      name: "heroSlides",
      type: "array",
      label: "Slides (retired)",
      admin: { hidden: true },
      fields: [
        { name: "id", type: "text", required: true },
        { name: "eyebrow", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "cta", type: "text", required: true },
        { name: "href", type: "text", required: true },
        ...imageUploadFields({
          uploadName: "backgroundImage",
          pathName: "image",
          uploadLabel: "Background image",
          preset: "heroSlide",
        }),
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeAudience = pageSection(
  "home-audience",
  "2. Who it's for",
  "The three cards directly below the hero, one per kind of visitor. Each card links to that audience's own page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Text beside the heading" },
    {
      name: "doors",
      type: "array",
      label: "Cards",
      labels: { singular: "Card", plural: "Cards" },
      admin: { description: "Drag to reorder. Three cards fit the row; more will wrap." },
      fields: [
        { name: "kicker", type: "text", required: true, label: "Small label above the title" },
        { name: "title", type: "text", required: true, label: "Card title" },
        { name: "blurb", type: "textarea", required: true, label: "Description" },
        {
          name: "points",
          type: "array",
          label: "Bullet points",
          labels: { singular: "Point", plural: "Points" },
          fields: [{ name: "text", type: "text", required: true, label: "Text" }],
        },
        { name: "ctaLabel", type: "text", required: true, label: "Link text" },
        {
          name: "href",
          type: "text",
          required: true,
          label: "Link",
          admin: { description: "A path on this site, such as /hospital." },
        },
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomePlatformGlance = pageSection(
  "home-platform-glance",
  "3. Platform in one glance",
  "The four-panel block explaining the platform, and the button below it.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Text below the heading" },
    {
      name: "layers",
      type: "array",
      label: "Panels",
      labels: { singular: "Panel", plural: "Panels" },
      admin: {
        description:
          "Drag to reorder — the numbers 01, 02, 03 are added automatically and follow this order. Four panels fit the row.",
      },
      fields: [
        { name: "title", type: "text", required: true, label: "Panel title" },
        { name: "body", type: "textarea", required: true, label: "Description" },
        { name: "tag", type: "text", required: true, label: "Small label at the bottom" },
      ],
    },
    { name: "ctaLabel", type: "text", label: "Button text" },
    {
      name: "ctaHref",
      type: "text",
      label: "Button link",
      admin: { description: "A path on this site, such as /platform." },
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeProof = pageSection(
  "home-proof",
  "4. Proof — heading and featured items",
  "The section showing who already uses Genetico: the heading, the large featured case study, and the three smaller items beside it. The scrolling logos come from “Partner logos” just below.",
  [
    { name: "heading", type: "text", label: "Heading" },
    {
      name: "featured",
      type: "group",
      label: "Wording around the featured item",
      admin: {
        description:
          "Which item appears here is decided on the Resources page — tick “Show on the home page” against it. Its title, description, length, link and the small label above the title all come with it. These fields are the wording wrapped around it.",
      },
      fields: [
        { name: "badge", type: "text", label: "Label on the image (e.g. “Now showing”)" },
        // Retired: the small label belongs to the resource, so that the
        // featured card reads the same here and on the Resources page.
        { name: "kicker", type: "text", admin: { hidden: true } },
        {
          name: "before",
          type: "text",
          label: "“Before” figure",
          admin: { description: "Shown struck through, e.g. 3 weeks. Leave both empty to hide." },
        },
        {
          name: "after",
          type: "text",
          label: "“After” figure",
          admin: { description: "Shown in blue beside it, e.g. 4 days." },
        },
        { name: "ctaLabel", type: "text", label: "Link text" },
        // Retired: these now come from the resource itself, so that the home
        // page and the Resources page cannot drift apart.
        { name: "duration", type: "text", admin: { hidden: true } },
        { name: "heading", type: "text", admin: { hidden: true } },
        { name: "blurb", type: "textarea", admin: { hidden: true } },
        { name: "href", type: "text", admin: { hidden: true } },
      ],
    },
    // Retired: the three items beside the featured one are whichever
    // resources are ticked for the home page, in their Resources-page order.
    {
      name: "clips",
      type: "array",
      label: "Items beside the case study (retired)",
      admin: { hidden: true },
      fields: [
        { name: "meta", type: "text" },
        { name: "title", type: "text" },
        { name: "href", type: "text" },
      ],
    },
    { name: "allResourcesLabel", type: "text", label: "Text on the “all resources” link" },
    { name: "allResourcesHref", type: "text", label: "“All resources” link" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeSecurity = pageSection(
  "home-security",
  "5. Security & Compliance",
  "The dark band near the bottom of the home page listing the trust and compliance points. These points also appear on the About page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Text beside the heading" },
    {
      name: "features",
      type: "array",
      label: "Trust points",
      labels: { singular: "Trust point", plural: "Trust points" },
      admin: { description: "Numbered automatically in this order. Drag to reorder." },
      fields: [{ name: "text", type: "text", required: true, label: "Text" }],
    },
  ],
  ADMIN_GROUPS.home,
);

export const HomeFaqs = pageSection(
  "home-faqs",
  "6. FAQs",
  "The frequently asked questions on the home page. This is the only place the site answers them — the footer and other pages link here.",
  [
    {
      name: "showSection",
      type: "checkbox",
      defaultValue: true,
      label: "Show this section on the page",
      admin: {
        description:
          "Untick to hide the questions entirely. The numbered list at the top of the page renumbers itself, so there is no gap.",
      },
    },
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
  "7. Get in touch",
  "The last section on the home page: the closing heading, the two buttons, and the enquiry form. The form's tabs and wording are edited under “Contact details & form”.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Text below the heading" },
    ctaButtonsField,
  ],
  ADMIN_GROUPS.home,
);

/* ── Retired with the 2026 redesign ────────────────────────────────────────
   Hidden from the sidebar, kept in the config, rows left in the database.

   Keeping them was a deliberate call: the copy is client-written and may be
   wanted again as the other six pages are redesigned. Deleting the field
   definitions before dropping the columns would also stop `next dev` on an
   interactive Drizzle prompt, so removal is a two-step job for later, not a
   tidy-up to do in passing. */

export const HomeWhoWeAre = retiredSection(
  "home-who-we-are",
  "Who We Are",
  "No longer shown. The redesigned home page opens straight into the three audience cards. The paragraphs are kept here in case the About page wants them.",
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
          fields: [{ name: "phrase", type: "text", required: true }],
        },
      ],
    },
  ],
  ADMIN_GROUPS.home,
);

/**
 * Not retired — moved.
 *
 * The redesigned home page carries its own proof heading, so this global now
 * only renders on the About page. It follows its content into the About group
 * rather than staying hidden under Home, which would leave the About page's
 * heading with nowhere to edit it.
 */
export const HomePartners = pageSection(
  "home-partners",
  "6. Partners — heading",
  "Heading and description above the row of partner logos on the About page. The logos themselves are edited under “Partner logos” on the Home page.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
  ],
  ADMIN_GROUPS.about,
);

export const HomeEcosystemChallenges = retiredSection(
  "home-ecosystem-challenges",
  "Ecosystem Challenges — heading",
  "No longer shown. The redesigned home page has no challenges grid.",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeEcosystemGaps = retiredSection(
  "home-ecosystem-gaps",
  "Ecosystem Gaps — heading",
  "No longer shown. The redesigned home page has no gaps panel.",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
  ],
  ADMIN_GROUPS.home,
);

export const HomeNews = retiredSection(
  "home-news",
  "News & Articles",
  "No longer shown. The proof section now carries the featured case study and the items beside it.",
  [
    { name: "heading", type: "text" },
    { name: "description", type: "textarea" },
    { name: "ctaLabel", type: "text" },
    { name: "resourcePicks", type: "json" },
  ],
  ADMIN_GROUPS.home,
);
