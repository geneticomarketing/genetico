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
