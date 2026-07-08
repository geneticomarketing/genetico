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
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "variant", type: "select", options: ["primary", "secondary"], defaultValue: "primary" },
  ],
};
