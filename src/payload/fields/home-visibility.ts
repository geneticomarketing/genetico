import type { Field } from "payload";

/**
 * The fields that let a resource appear on the home page.
 *
 * The home page's proof strip does not curate its own list — it shows
 * whichever resources are ticked here, so the Resources page stays the single
 * place any of this content is edited. Same idea as the blog posts' existing
 * home checkbox, generalised to every kind of resource.
 */

export const showOnHomeField: Field = {
  name: "showOnHome",
  type: "checkbox",
  defaultValue: false,
  label: "Show on the home page",
  admin: {
    description:
      "The home page's “In use across the ecosystem” section shows one large item and three smaller ones beside it. Tick this to offer this item; if more are ticked than fit, the ones lowest in “Order on the page” are used.",
    position: "sidebar",
  },
};

export const homeTitleField: Field = {
  name: "homeTitle",
  type: "text",
  label: "Shorter title for the home page",
  admin: {
    description:
      "Optional. The cards on the home page are narrower than on this page, so a long title can crowd them. Leave empty to use the title above.",
  },
};

/** Both fields, for collections that carry the full pair. */
export const homeVisibilityFields: Field[] = [showOnHomeField, homeTitleField];

/**
 * What `publishedAt` is for, now that the home page no longer sorts by it.
 *
 * The old "Insights" section listed the newest resources of any type. The
 * redesigned home page picks by checkbox instead, so the date is back to
 * meaning what it says.
 */
export const PUBLISHED_AT_DESCRIPTION =
  "When this was published. Shown on the Resources page and used to order items that have one.";
