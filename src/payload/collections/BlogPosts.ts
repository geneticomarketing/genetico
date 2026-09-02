import type { CollectionConfig } from "payload";
import { mediaUploadField } from "../fields/image";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const BlogPosts = withAdminGroup(
  {
    slug: "blog-posts",
    labels: { singular: "Blog post", plural: "Blog posts" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["title", "category", "author", "publishedAt"],
      description:
        "Blog articles. They appear on the Resources page, on the /blog listing, and can be featured in the home page news section.",
    },
    fields: [
      { name: "title", type: "text", required: true, label: "Title" },
      {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
        label: "Web address",
        admin: {
          description:
            "The last part of the link, e.g. rare-disease-policy gives /blog/rare-disease-policy. Lowercase letters, numbers and hyphens only. Changing this breaks existing links.",
        },
      },
      { name: "excerpt", type: "textarea", required: true, label: "Summary" },
      { name: "author", type: "text", required: true, label: "Author" },
      { name: "publishedAt", type: "date", required: true, label: "Publish date" },
      {
        name: "featuredOnHome",
        type: "checkbox",
        defaultValue: false,
        label: "Show as the featured post on the home page",
        admin: {
          description:
            "Tick this to put the post in the large card on the left of the home page “Insights” section. If no post is ticked, the newest post is used. If several are ticked, the newest of those wins.",
        },
      },
      { name: "readTime", type: "text", required: true, label: "Reading time (e.g. 6 min read)" },
      { name: "category", type: "text", required: true, label: "Category label" },
      {
        name: "categoryColor",
        type: "text",
        required: true,
        defaultValue: "#024385",
        label: "Category colour",
        admin: {
          description:
            "A hex colour for the category label. Genetico blue is #024385; amber is #d97706.",
        },
      },
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
        label: "Article body",
        labels: { singular: "Paragraph", plural: "Paragraphs" },
        admin: { description: "Add one paragraph per row. Drag to reorder." },
        fields: [{ name: "paragraph", type: "textarea", required: true, label: "Paragraph" }],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.resources,
);
