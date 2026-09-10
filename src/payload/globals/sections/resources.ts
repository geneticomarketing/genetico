import { imageUploadFields } from "../../fields/image";
import { ADMIN_GROUPS } from "../../admin-groups";
import { pageSection, retiredSection } from "./section";

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

/**
 * Retired: the tabs are derived, not typed.
 *
 * The old field let an editor write any label, but a tab only did anything
 * if it matched one of four exact words — a tab called "Films" filtered
 * nothing and gave no hint why. The page now builds one tab per section that
 * has content, counts the items itself, and hides a tab whose section is
 * empty, so the row cannot get out of step with the page.
 */
export const ResourcesFilterTabs = retiredSection(
  "resources-filter-tabs",
  "Filter tabs",
  "No longer edited here. The row of filter buttons is built from the sections below that have content in them, and each tab counts its own items.",
  [
    {
      name: "filterTabs",
      type: "array",
      fields: [{ name: "label", type: "text", required: true }],
    },
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
  "The last band on the Resources page, above the footer.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "description", type: "textarea", label: "Description" },
    { name: "buttonLabel", type: "text", label: "Button text" },
    { name: "buttonHref", type: "text", label: "Button link (opens in a new tab)" },
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
