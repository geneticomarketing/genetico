import type { CollectionConfig } from "payload";
import { toPublicMediaUrl } from "@/lib/cms/storage-url";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const Media = withAdminGroup(
  {
    slug: "media",
    access: {
      read: () => true,
    },
    hooks: {
      afterRead: [
        ({ doc }) => {
          if (!doc) return doc;

          return {
            ...doc,
            ...(typeof doc.url === "string" ? { url: toPublicMediaUrl(doc.url) } : {}),
            ...(typeof doc.thumbnailURL === "string"
              ? { thumbnailURL: toPublicMediaUrl(doc.thumbnailURL) }
              : {}),
          };
        },
      ],
    },
    upload: {
      staticDir: "media",
      mimeTypes: ["image/*", "video/*", "application/pdf"],
    },
    admin: {
      useAsTitle: "alt",
      description:
        "Every image and file used on the website. Upload here first, then pick the image from the page section that needs it.",
    },
    fields: [
      {
        name: "alt",
        type: "text",
        required: true,
        label: "Image description",
        admin: {
          description:
            "Describe the image for accessibility. When uploading, use a descriptive file name (e.g. hero-bg.webp, partner-birac-logo.png).",
        },
      },
    ],
  } satisfies CollectionConfig,
  ADMIN_GROUPS.media,
);
