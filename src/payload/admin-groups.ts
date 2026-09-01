/**
 * Sidebar groups in the admin panel — one per page of the website, so an editor
 * picks the page they are looking at, then the section within it.
 */
export const ADMIN_GROUPS = {
  home: "Home page  ·  /",
  about: "About page  ·  /about-us",
  platform: "Platform page  ·  /platform",
  solutions: "Solution pages  ·  /hospital, /life-science",
  publicHealth: "Public Health page  ·  /public-health",
  resources: "Resources page  ·  /resources",
  legal: "Other pages  ·  /blog, /privacy-policy, /coming-soon",
  site: "Site-wide  ·  header, footer, contact",
  media: "Images & files",
  system: "System",
} as const;
