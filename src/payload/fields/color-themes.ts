/**
 * Named colour themes for the Hospital / Life Science pages.
 *
 * Editors pick a theme by name in the admin panel; the raw colour values live
 * here so nobody has to type a hex code. The values reproduce the palette the
 * pages already shipped with — see `mergeSolutionsContent` in lib/cms/queries.ts
 * for where they are applied.
 */

export const BADGE_THEMES = {
  red: { badgeDot: "#c0392b", badgeBg: "#fce8ea", badgeText: "#b01616" },
  blue: { badgeDot: "#024385", badgeBg: "#e8f4fc", badgeText: "#024385" },
  teal: { badgeDot: "#5fd7cb", badgeBg: "#e6faf8", badgeText: "#0a6b62" },
  slate: { badgeDot: "#7a8fa8", badgeBg: "#eef2f7", badgeText: "#4a5f78" },
} as const;

export type BadgeTheme = keyof typeof BADGE_THEMES;

export const DEFAULT_BADGE_THEME: BadgeTheme = "blue";

/** Order matters: cards with no theme set cycle through these. */
export const BADGE_THEME_CYCLE: BadgeTheme[] = ["red", "blue", "teal", "slate"];

export const badgeThemeOptions = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Teal", value: "teal" },
  { label: "Grey", value: "slate" },
];

export const METRIC_THEMES = {
  red: { ringTrack: "#fce8ea", ringFill: "#c0392b", accent: "#c0392b", positiveIconBg: "#c0392b" },
  green: {
    ringTrack: "#e6faf8",
    ringFill: "#2b7623",
    accent: "#2b7623",
    positiveIconBg: "#2b7623",
  },
  blue: { ringTrack: "#eef4f9", ringFill: "#024385", accent: "#024385", positiveIconBg: "#024385" },
} as const;

export type MetricTheme = keyof typeof METRIC_THEMES;

export const DEFAULT_METRIC_THEME: MetricTheme = "blue";

/** Order matters: metrics with no theme set cycle through these. */
export const METRIC_THEME_CYCLE: MetricTheme[] = ["red", "green", "blue"];

export const metricThemeOptions = [
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
];

export function resolveBadgeTheme(value: string | null | undefined, index: number) {
  const key = (value ?? "") as BadgeTheme;
  return BADGE_THEMES[key] ?? BADGE_THEMES[BADGE_THEME_CYCLE[index % BADGE_THEME_CYCLE.length]];
}

export function resolveMetricTheme(value: string | null | undefined, index: number) {
  const key = (value ?? "") as MetricTheme;
  return METRIC_THEMES[key] ?? METRIC_THEMES[METRIC_THEME_CYCLE[index % METRIC_THEME_CYCLE.length]];
}

/** Stable id from a label, used when an editor has not set one explicitly. */
export function slugifyId(value: string | null | undefined, fallback: string): string {
  const slug = (value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || fallback;
}
