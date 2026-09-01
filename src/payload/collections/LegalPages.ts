import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const LegalPages = withAdminGroup(
  {
    slug: "legal-pages",
    labels: { singular: "Legal page", plural: "Legal pages" },
    admin: {
      useAsTitle: "title",
      defaultColumns: ["slug", "title", "lastUpdated"],
      description:
        "Long-form legal pages such as the privacy policy. The web address comes from the “slug” field — privacy-policy becomes /privacy-policy.",
    },
    fields: [
      {
        name: "slug",
        type: "text",
        required: true,
        unique: true,
      },
      { name: "title", type: "text", required: true },
      { name: "metaDescription", type: "textarea" },
      { name: "lastUpdated", type: "date", required: true },
      {
        name: "sections",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          { name: "body", type: "richText", editor: lexicalEditor() },
          {
            name: "bullets",
            type: "array",
            fields: [{ name: "item", type: "text", required: true }],
          },
        ],
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.legal,
);
