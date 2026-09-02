import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const FeaturedVideos = withAdminGroup(
  {
    slug: "featured-videos",
    labels: { singular: "Featured video", plural: "3. Featured video" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "featured", "sortOrder"],
      description:
        "The large video panel near the top of the Resources page. Only the first entry is shown, so keep one here.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      {
        name: "youtubeUrl",
        type: "text",
        required: true,
        label: "YouTube link",
        admin: {
          description:
            "Paste the link from YouTube's Share button, e.g. https://youtu.be/abc123. Shorts and normal videos both work.",
        },
      },
      { name: "duration", type: "text", label: "Length (e.g. 4:12)" },
      { name: "articleLink", type: "text", label: "Related article link (optional)" },
      {
        name: "tags",
        type: "array",
        fields: [{ name: "tag", type: "text", required: true }],
      },
      { name: "featured", type: "checkbox", defaultValue: false, label: "Featured" },
      {
        name: "publishedAt",
        type: "date",
        label: "Publish date",
        admin: {
          description:
            "When this was published. The home page “Insights” section lists the four most recent resources of any type, newest first, using this date. Items with no date are listed after those that have one.",
        },
      },
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const ShortVideos = withAdminGroup(
  {
    slug: "short-videos",
    labels: { singular: "Short video", plural: "Short videos" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "sortOrder"],
      description: "The horizontal row of small video cards on the Resources page.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "category", type: "text", required: true, label: "Category label" },
      {
        name: "youtubeUrl",
        type: "text",
        required: true,
        label: "YouTube link",
        admin: {
          description:
            "Paste the link from YouTube's Share button, e.g. https://youtu.be/abc123. Shorts and normal videos both work.",
        },
      },
      { name: "duration", type: "text", label: "Length (e.g. 4:12)" },
      {
        name: "publishedAt",
        type: "date",
        label: "Publish date",
        admin: {
          description:
            "When this was published. The home page “Insights” section lists the four most recent resources of any type, newest first, using this date. Items with no date are listed after those that have one.",
        },
      },
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const ExternalArticles = withAdminGroup(
  {
    slug: "external-articles",
    labels: { singular: "External article", plural: "External articles" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "sortOrder"],
      description:
        "Links out to articles published elsewhere (LinkedIn, press). Shown in the “Articles” section of the Resources page.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Title" },
      {
        name: "url",
        type: "text",
        required: true,
        label: "Article link",
        admin: { description: "Full address, starting with https://" },
      },
      {
        name: "publishedAt",
        type: "date",
        label: "Publish date",
        admin: {
          description:
            "When this was published. The home page “Insights” section lists the four most recent resources of any type, newest first, using this date. Items with no date are listed after those that have one.",
        },
      },
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const DeepDives = withAdminGroup(
  {
    slug: "deep-dives",
    labels: { singular: "Deep dive", plural: "Deep dives" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "sortOrder"],
      description:
        "Long-form video sessions on the Resources page. Each one gets a full-width panel that alternates left and right.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Title" },
      { name: "description", type: "textarea", label: "Description" },
      { name: "category", type: "text", required: true, label: "Category label" },
      {
        name: "categoryColor",
        type: "text",
        admin: { description: "Hex color for the category label (e.g. #d97706)" },
      },
      {
        name: "youtubeUrl",
        type: "text",
        required: true,
        label: "YouTube link",
        admin: {
          description:
            "Paste the link from YouTube's Share button, e.g. https://youtu.be/abc123. Shorts and normal videos both work.",
        },
      },
      { name: "duration", type: "text", label: "Length (e.g. 4:12)" },
      {
        name: "sourceLabel",
        type: "text",
        admin: {
          description:
            "Event or source shown on the video panel (e.g. Global Rare Disease Summit · Geneva)",
        },
      },
      {
        name: "thumbnailGradient",
        type: "textarea",
        admin: {
          description:
            "Optional CSS background gradient for the video panel. Leave empty to use the YouTube thumbnail.",
        },
      },
      {
        name: "tags",
        type: "array",
        fields: [{ name: "tag", type: "text", required: true }],
      },
      {
        name: "videoLeft",
        type: "checkbox",
        admin: {
          description:
            "Place the video on the left side. Leave unchecked to alternate automatically by sort order.",
        },
      },
      {
        name: "publishedAt",
        type: "date",
        label: "Publish date",
        admin: {
          description:
            "When this was published. The home page “Insights” section lists the four most recent resources of any type, newest first, using this date. Items with no date are listed after those that have one.",
        },
      },
      {
        name: "sortOrder",
        type: "number",
        defaultValue: 0,
        label: "Order on the page",
        admin: {
          description: "Lower numbers appear first. Use 10, 20, 30 so you can slot items in later.",
          position: "sidebar",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);
