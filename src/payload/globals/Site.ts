import type { GlobalConfig } from "payload";
import { ctaButtonsField } from "../fields/link";
import { ADMIN_GROUPS } from "../admin-groups";
import { withAdminGroup } from "../with-admin-group";

export const SiteSettings = withAdminGroup(
  {
    slug: "site-settings",
    label: "Site Settings",
    fields: [
      { name: "siteName", type: "text", defaultValue: "Genetico" },
      { name: "siteDescription", type: "textarea" },
      { name: "contactEmail", type: "email", required: true },
      { name: "contactEmailCc", type: "email" },
      { name: "calendlyUrl", type: "text" },
      { name: "newsletterUrl", type: "text" },
      { name: "featuredVideoUrl", type: "text" },
      {
        name: "contactRoles",
        type: "array",
        label: "Contact Form Roles",
        fields: [
          { name: "id", type: "text", required: true },
          { name: "label", type: "text", required: true },
          { name: "description", type: "textarea" },
        ],
      },
      {
        name: "contactForm",
        type: "group",
        fields: [
          { name: "intro", type: "textarea" },
          { name: "submitLabel", type: "text", defaultValue: "Send message" },
          { name: "successMessage", type: "text" },
          { name: "errorMessage", type: "text" },
          { name: "privacyNote", type: "textarea" },
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);

export const Navigation = withAdminGroup(
  {
    slug: "navigation",
    label: "Navigation",
    fields: [
      {
        name: "mainNav",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text" },
          { name: "type", type: "select", options: ["link", "dropdown"], defaultValue: "link" },
          { name: "isDark", type: "checkbox", defaultValue: false },
        ],
      },
      {
        name: "solutionsNav",
        type: "array",
        label: "Solutions Dropdown Links",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true },
          { name: "icon", type: "text" },
        ],
      },
      { name: "ctaLabel", type: "text", defaultValue: "Book a demo" },
      { name: "ctaHref", type: "text" },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);

export const Footer = withAdminGroup(
  {
    slug: "footer",
    label: "Footer",
    fields: [
      { name: "tagline", type: "textarea", required: true },
      { name: "copyrightText", type: "text", defaultValue: "Genetico. All rights reserved." },
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
      { name: "contactLabel", type: "text", defaultValue: "Contact Us" },
      { name: "contactHref", type: "text" },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.site,
);

export const HomePage = withAdminGroup(
  {
    slug: "home-page",
    label: "Page Content",
    fields: [
      {
        name: "heroSlides",
        type: "array",
        fields: [
          { name: "id", type: "text", required: true },
          { name: "title", type: "text", required: true },
          { name: "body", type: "textarea", required: true },
          { name: "cta", type: "text", required: true },
          { name: "href", type: "text", required: true },
          { name: "image", type: "text", required: true },
        ],
      },
      {
        name: "whoWeAre",
        type: "group",
        fields: [
          { name: "eyebrow", type: "text" },
          {
            name: "paragraphs",
            type: "array",
            fields: [
              { name: "text", type: "textarea", required: true },
              { name: "highlight", type: "text" },
            ],
          },
        ],
      },
      {
        name: "ecosystemChallenges",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
        ],
      },
      {
        name: "ecosystemGaps",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
        ],
      },
      {
        name: "partners",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
        ],
      },
      {
        name: "security",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          {
            name: "features",
            type: "array",
            fields: [{ name: "text", type: "text", required: true }],
          },
        ],
      },
      {
        name: "news",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          { name: "ctaLabel", type: "text" },
          { name: "ctaHref", type: "text" },
        ],
      },
      {
        name: "cta",
        type: "group",
        fields: [
          { name: "heading", type: "text" },
          { name: "description", type: "textarea" },
          ctaButtonsField,
        ],
      },
    ],
  } satisfies GlobalConfig,
  ADMIN_GROUPS.home,
);
