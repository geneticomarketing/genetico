import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection } from "./section";

export const ResourcesHero = pageSection(
  "resources-hero",
  "1. Hero",
  "The top of the Resources page.",
  [
    { name: "title", type: "text", required: true, label: "Headline" },
    { name: "subtitle", type: "textarea", label: "Paragraph below the headline" },
    { name: "description", type: "textarea", label: "Supporting text (optional)" },
    ...imageUploadFields({ uploadLabel: "Background image", preset: "pageHero" }),
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesVideosSection = pageSection(
  "resources-videos-section",
  "3. Short videos — heading",
  "Heading above the horizontal row of short video cards. The videos themselves are edited in “Short videos” just below.",
  [
    {
      name: "heading",
      type: "text",
      label: "Small label above the rule",
      admin: { description: "A short word or two, e.g. Videos." },
    },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "One line below the heading" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesDeepDivesSection = pageSection(
  "resources-deep-dives-section",
  "4. Deep dives — heading",
  "Heading above the long-form video sections. The videos themselves are edited in “Deep dives” just below.",
  [
    {
      name: "heading",
      type: "text",
      label: "Small label above the rule",
      admin: { description: "A short word or two, e.g. Deep Dives." },
    },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "One line below the heading" },
    { name: "seeAllLabel", type: "text", label: "Link text (e.g. “See all”)" },
    { name: "seeAllHref", type: "text", label: "Link destination" },
    // Retired: this held the large heading, which is now `title` so that every
    // section on the page is described the same way.
    { name: "subtitle", type: "text", admin: { hidden: true } },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesArticlesSection = pageSection(
  "resources-articles-section",
  "5. Articles — heading",
  "Heading above the list of external article links. The links themselves are edited in “External articles” just below.",
  [
    {
      name: "heading",
      type: "text",
      label: "Small label above the rule",
      admin: { description: "A short word or two, e.g. Videos." },
    },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "One line below the heading" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesBlogsSection = pageSection(
  "resources-blogs-section",
  "6. Blogs — heading",
  "Heading above the blog cards at the bottom of the Resources page. The posts themselves are edited in “Blog posts” just below.",
  [
    {
      name: "heading",
      type: "text",
      label: "Small label above the rule",
      admin: { description: "A short word or two, e.g. Blogs." },
    },
    { name: "title", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "One line below the heading" },
    { name: "seeAllLabel", type: "text", label: "Link text (e.g. “See all”)" },
    { name: "seeAllHref", type: "text", label: "Link destination" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesNewsletter = pageSection(
  "resources-newsletter",
  "7. Newsletter call to action",
  "The last band on the Resources page, above the footer. It introduces the Rare Insights newsletter: one button opens its archive, the other the sign-up page.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    {
      name: "archiveButtonLabel",
      type: "text",
      label: "Archive button text",
      admin: { description: "The filled button, e.g. “Browse all editions”." },
    },
    {
      name: "archiveButtonHref",
      type: "text",
      label: "Archive button link",
      admin: { description: "Usually /rare-insights" },
    },
    { name: "buttonLabel", type: "text", label: "Sign-up button text" },
    { name: "buttonHref", type: "text", label: "Sign-up button link (opens in a new tab)" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesBlogListing = pageSection(
  "resources-blog-listing",
  "Blog listing page  ·  /blog",
  "A separate page that lists every blog post, reached from “See all” on the Resources page. This section controls only its header — the posts come from “Blog posts”.",
  [
    { name: "eyebrow", type: "text", label: "Small label above the heading" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Paragraph below the heading" },
    { name: "backLabel", type: "text", label: "Back link text" },
    { name: "backHref", type: "text", label: "Back link destination" },
    {
      name: "title",
      type: "text",
      label: "Browser tab title",
      admin: { description: "Shown in the browser tab and in Google results." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      label: "Search engine description",
      admin: { description: "The grey summary line under the page title in Google results." },
    },
  ],
  ADMIN_GROUPS.legal,
);
