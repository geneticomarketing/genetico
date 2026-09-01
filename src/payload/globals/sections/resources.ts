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

export const ResourcesFilterTabs = pageSection(
  "resources-filter-tabs",
  "2. Filter tabs",
  "The row of filter buttons below the hero. “All” should stay first. The other tabs only work with these exact words: Featured, Videos, Articles, Blogs.",
  [
    {
      name: "filterTabs",
      type: "array",
      label: "Tabs",
      labels: { singular: "Tab", plural: "Tabs" },
      fields: [{ name: "label", type: "text", required: true, label: "Tab text" }],
    },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesVideosSection = pageSection(
  "resources-videos-section",
  "4. Short videos — heading",
  "Heading above the horizontal row of short video cards. The videos themselves are edited in “Short videos” just below.",
  [{ name: "heading", type: "text", label: "Heading" }],
  ADMIN_GROUPS.resources,
);

export const ResourcesDeepDivesSection = pageSection(
  "resources-deep-dives-section",
  "5. Deep Dives — heading",
  "Heading above the long-form video sections. The videos themselves are edited in “Deep dives” just below.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "seeAllLabel", type: "text", label: "Link text (e.g. “See all”)" },
    { name: "seeAllHref", type: "text", label: "Link destination" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesArticlesSection = pageSection(
  "resources-articles-section",
  "6. Articles — heading",
  "Heading above the list of external article links. The links themselves are edited in “External articles” just below.",
  [{ name: "heading", type: "text", label: "Heading" }],
  ADMIN_GROUPS.resources,
);

export const ResourcesBlogsSection = pageSection(
  "resources-blogs-section",
  "7. Blogs — heading",
  "Heading above the blog cards at the bottom of the Resources page. The posts themselves are edited in “Blog posts” just below.",
  [
    { name: "heading", type: "text", label: "Heading" },
    { name: "seeAllLabel", type: "text", label: "Link text (e.g. “See all”)" },
    { name: "seeAllHref", type: "text", label: "Link destination" },
  ],
  ADMIN_GROUPS.resources,
);

export const ResourcesNewsletter = pageSection(
  "resources-newsletter",
  "8. Newsletter call to action",
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
