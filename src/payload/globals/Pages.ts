import type { GlobalConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const UtilityPages = withAdminGroup(
  {
    slug: "utility-pages",
    label: "Coming Soon Page",
    fields: [
      {
        name: "comingSoon",
        type: "group",
        fields: [
          { name: "metaTitle", type: "text" },
          { name: "metaDescription", type: "textarea" },
          { name: "eyebrow", type: "text" },
          { name: "heading", type: "text" },
          { name: "body", type: "textarea" },
          { name: "backLabel", type: "text" },
          { name: "backHref", type: "text" },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.legal,
);
