import type { ArrayField, Field } from "payload";

/**
 * Small builders for the plain-copy fields most page sections are made of,
 * so each section definition reads as a list of what the editor sees.
 */

export const text = (name: string, label: string, description?: string): Field => ({
  name,
  type: "text",
  label,
  ...(description ? { admin: { description } } : {}),
});

export const textarea = (name: string, label: string, description?: string): Field => ({
  name,
  type: "textarea",
  label,
  ...(description ? { admin: { description } } : {}),
});

/**
 * The two labels every numbered section carries: the small one above its
 * heading, and its name in the section menu that follows the page as you
 * scroll (and in the mobile menu). The number itself is automatic.
 */
export const sectionLabels: Field[] = [
  text(
    "eyebrow",
    "Small label above the heading",
    "Shown after the section number, e.g. “01 — Why Genetico exists”.",
  ),
  text(
    "menuLabel",
    "Name in the section menu",
    "Keep it short: it appears in the bar that follows the page as you scroll, and in the mobile menu.",
  ),
];

/** A repeating list of items, with the singular/plural names the editor sees. */
export function list(
  name: string,
  label: string,
  singular: string,
  fields: Field[],
  options: { min?: number; max?: number; description?: string } = {},
): ArrayField {
  const { min, max, description } = options;
  const fixed = min !== undefined && min === max;
  return {
    name,
    type: "array",
    label,
    labels: { singular, plural: label },
    ...(min !== undefined ? { minRows: min } : {}),
    ...(max !== undefined ? { maxRows: max } : {}),
    admin: {
      description:
        description ??
        (fixed
          ? `Exactly ${min}, in the order they appear. Drag to reorder.`
          : "Shown in this order. Drag to reorder."),
    },
    fields,
  };
}

/** An optional photo that replaces the built-in one when uploaded. */
export const photo = (name: string, label: string, description: string): Field => ({
  name,
  type: "upload",
  relationTo: "media",
  label,
  admin: {
    description: `${description} Leave empty to keep the current photo.`,
  },
});
