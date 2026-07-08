import type { CollectionConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const NewsArticles = withAdminGroup(
  {
    slug: "news-articles",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "tag", "author", "publishedAt", "featured"],
    },
    fields: [
      { name: "title", type: "text", required: true },
      { name: "excerpt", type: "textarea" },
      { name: "tag", type: "text" },
      { name: "author", type: "text" },
      { name: "publishedAt", type: "date" },
      { name: "readTime", type: "text" },
      { name: "href", type: "text" },
      { name: "featured", type: "checkbox", defaultValue: false },
      { name: "image", type: "upload", relationTo: "media", label: "Image" },
      {
        name: "imageUrl",
        type: "text",
        admin: { description: "Optional fallback static image path if no upload is provided" },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
