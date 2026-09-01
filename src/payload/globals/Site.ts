import type { GlobalConfig } from "payload";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const SiteSettings = withAdminGroup(
  {
    slug: "site-settings",
    label: "Contact details & form",
    admin: {
      description:
        "Used across the whole website: where contact form submissions go, the booking link, and the wording of the “Get in touch” form.",
    },
    fields: [
      { name: "siteName", type: "text", defaultValue: "Genetico", label: "Site name" },
      {
        name: "siteDescription",
        type: "textarea",
        label: "Site description",
        admin: { description: "The default summary shown in Google results and link previews." },
      },
      {
        name: "contactEmail",
        type: "email",
        required: true,
        label: "Contact email",
        admin: { description: "Shown on the site. Where enquiries are sent." },
      },
      { name: "contactEmailCc", type: "email", label: "Copy enquiries to" },
      { name: "newsletterUrl", type: "text", label: "Newsletter sign-up link" },
      { name: "featuredVideoUrl", type: "text", label: "Featured video link" },
      {
        name: "contactRoles",
        type: "array",
        label: "Contact form — “I am a…” options",
        labels: { singular: "Option", plural: "Options" },
        admin: {
          description:
            "The tabs across the top of the contact form. The chosen option is included in the email you receive.",
        },
        fields: [
          {
            name: "id",
            type: "text",
            required: true,
            label: "Internal name",
            admin: { description: "Not shown on the website (e.g. clinician, investor)." },
          },
          { name: "label", type: "text", required: true, label: "Tab text" },
          { name: "description", type: "textarea", label: "Text shown when this tab is selected" },
        ],
      },
      {
        name: "contactForm",
        type: "group",
        label: "Contact form wording",
        fields: [
          { name: "intro", type: "textarea", label: "Intro paragraph" },
          {
            name: "submitLabel",
            type: "text",
            defaultValue: "Send message",
            label: "Submit button text",
          },
          { name: "successMessage", type: "text", label: "Message shown after a successful send" },
          { name: "errorMessage", type: "text", label: "Message shown if sending fails" },
          { name: "privacyNote", type: "textarea", label: "Small print under the button" },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);

export const Navigation = withAdminGroup(
  {
    slug: "navigation",
    label: "Header menu",
    admin: { description: "The menu bar at the top of every page." },
    fields: [
      {
        name: "mainNav",
        type: "array",
        label: "Menu items",
        labels: { singular: "Menu item", plural: "Menu items" },
        admin: { description: "Shown left to right in this order." },
        fields: [
          { name: "label", type: "text", required: true, label: "Menu text" },
          {
            name: "href",
            type: "text",
            label: "Link",
            admin: { description: "Leave empty for the Solutions dropdown." },
          },
          {
            name: "type",
            type: "select",
            options: [
              { label: "Normal link", value: "link" },
              { label: "Solutions dropdown", value: "dropdown" },
            ],
            defaultValue: "link",
            label: "Type",
          },
          {
            name: "isDark",
            type: "checkbox",
            defaultValue: false,
            label: "Dark text",
            admin: { description: "Tick only if this item sits on a light background." },
          },
        ],
      },
      {
        name: "solutionsNav",
        type: "array",
        label: "Solutions dropdown items",
        labels: { singular: "Dropdown item", plural: "Dropdown items" },
        fields: [
          { name: "label", type: "text", required: true, label: "Menu text" },
          { name: "href", type: "text", required: true, label: "Link" },
          { name: "icon", type: "text", label: "Emoji icon" },
        ],
      },
      { name: "ctaLabel", type: "text", defaultValue: "Book a demo", label: "Button text" },
      // { name: "ctaHref", type: "text" },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);

export const Footer = withAdminGroup(
  {
    slug: "footer",
    label: "Footer",
    admin: { description: "The band at the bottom of every page." },
    fields: [
      { name: "tagline", type: "textarea", required: true, label: "Tagline" },
      {
        name: "copyrightText",
        type: "text",
        defaultValue: "Genetico. All rights reserved.",
        label: "Copyright line",
        admin: { description: "The year is added automatically." },
      },
      {
        name: "sectionLabels",
        type: "group",
        fields: [
          { name: "menuHeading", type: "text", defaultValue: "Menu" },
          { name: "solutionsHeading", type: "text", defaultValue: "Solutions" },
        ],
      },
      {
        name: "menuLinks",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
        ],
      },
      {
        name: "solutionsLinks",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
        ],
      },
      {
        name: "socialLinks",
        type: "array",
        fields: [
          { name: "name", type: "text", required: true },
          { name: "href", type: "text", required: true },
          {
            name: "platform",
            type: "select",
            options: ["x", "linkedin", "youtube"],
            required: true,
          },
        ],
      },
      {
        name: "legalLinks",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
        ],
      },
      {
        name: "contactLabel",
        type: "text",
        defaultValue: "Contact Us",
        label: "Contact link text",
      },
      {
        name: "contactHref",
        type: "text",
        label: "Contact link destination",
        admin: {
          description:
            "Leave empty to jump to the contact form on whichever page the visitor is on, falling back to the home page form on pages without one.",
        },
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);
