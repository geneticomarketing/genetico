import type { GlobalConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const UtilityPages = withAdminGroup(
  {
    slug: "utility-pages",
    label: "Coming soon page  ·  /coming-soon",
    admin: {
      description:
        "A placeholder page used for links that are not live yet. Nothing links to it from the main menu.",
    },
    fields: [
      {
        name: "comingSoon",
        type: "group",
        label: "Coming soon page",
        fields: [
          { name: "eyebrow", type: "text", label: "Small label above the heading" },
          { name: "heading", type: "text", label: "Heading" },
          { name: "body", type: "textarea", label: "Paragraph" },
          { name: "backLabel", type: "text", label: "Back button text" },
          { name: "backHref", type: "text", label: "Back button link" },
          {
            name: "metaTitle",
            type: "text",
            label: "Browser tab title",
            admin: { description: "Shown in the browser tab and in Google results." },
          },
          {
            name: "metaDescription",
            type: "textarea",
            label: "Search engine description",
          },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.legal,
);
