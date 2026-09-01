import type { Field } from "payload";

export const linkField = (name = "link"): Field => ({
  name,
  type: "group",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
  ],
});

export const navLinkField: Field = {
  name: "links",
  type: "array",
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "icon", type: "text" },
    { name: "isDark", type: "checkbox", defaultValue: false },
  ],
};

export const ctaButtonsField: Field = {
  name: "buttons",
  type: "array",
  label: "Buttons",
  labels: { singular: "Button", plural: "Buttons" },
  admin: { description: "Usually one or two. The first button is the more prominent one." },
  fields: [
    { name: "label", type: "text", required: true, label: "Button text" },
    {
      name: "href",
      type: "text",
      required: true,
      label: "Button link",
      admin: {
        description:
          "A path on this site such as /platform or /#get-in-touch, or a full https:// address.",
      },
    },
    {
      name: "variant",
      type: "select",
      options: [
        { label: "Solid (filled blue)", value: "primary" },
        { label: "Outline", value: "secondary" },
      ],
      defaultValue: "primary",
      enumName: "cta_buttons_variant",
      label: "Style",
    },
  ],
};
