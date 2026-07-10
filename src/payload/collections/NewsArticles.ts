import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
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
      ...mediaUploadField({
        name: "image",
        label: "Image",
        preset: "newsThumbnail",
        fallbackPathName: "imageUrl",
      }),
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.home,
);
