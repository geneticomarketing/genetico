import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const FeaturedVideos = withAdminGroup(
  {
    slug: "featured-videos",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "featured", "sortOrder"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "youtubeUrl", type: "text", required: true },
      { name: "duration", type: "text" },
      { name: "articleLink", type: "text" },
      {
        name: "tags",
        type: "array",
        fields: [{ name: "tag", type: "text", required: true }],
      },
      { name: "featured", type: "checkbox", defaultValue: false },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const ShortVideos = withAdminGroup(
  {
    slug: "short-videos",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "sortOrder"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "category", type: "text", required: true },
      { name: "youtubeUrl", type: "text", required: true },
      { name: "duration", type: "text" },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const ExternalArticles = withAdminGroup(
  {
    slug: "external-articles",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "sortOrder"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "url", type: "text", required: true },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);

export const DeepDives = withAdminGroup(
  {
    slug: "deep-dives",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "sortOrder"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "description", type: "textarea" },
      { name: "category", type: "text", required: true },
      {
        name: "categoryColor",
        type: "text",
        admin: { description: "Hex color for the category label (e.g. #d97706)" },
      },
      { name: "youtubeUrl", type: "text", required: true },
      { name: "duration", type: "text" },
      {
        name: "sourceLabel",
        type: "text",
        admin: { description: "Event or source shown on the video panel (e.g. Global Rare Disease Summit · Geneva)" },
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
          description: "Place the video on the left side. Leave unchecked to alternate automatically by sort order.",
        },
      },
      { name: "sortOrder", type: "number", defaultValue: 0 },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);
