import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const BlogPosts = withAdminGroup(
  {
    slug: "blog-posts",
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "author", "publishedAt"],
    },
    fields: [
      { name: "slug", type: "text", required: true, unique: true },
      { name: "category", type: "text", required: true },
      { name: "categoryColor", type: "text", required: true, defaultValue: "#024385" },
      { name: "title", type: "text", required: true },
      { name: "excerpt", type: "textarea", required: true },
      { name: "author", type: "text", required: true },
      { name: "publishedAt", type: "date", required: true },
      { name: "readTime", type: "text", required: true },
      ...mediaUploadField({
        name: "thumbnailImage",
        label: "Thumbnail image",
        preset: "cardThumbnail",
        fallbackPathName: "thumbnail",
        fallbackPathDescription:
          "Optional fallback: CSS gradient or static image path if no upload is provided",
      }),
      {
        name: "content",
        type: "array",
        required: true,
        fields: [{ name: "paragraph", type: "textarea", required: true }],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);
