/**
 * The hub-and-spoke diagram and the impact icons on the Public Health page.
 *
 * Kept in code rather than the CMS: these are SVG path data, and the CMS
 * conventions rule out putting geometry or colour in front of an editor.
 * The three classification keys below are what tie the list on the left of
 * the architecture section to the parts of the diagram on the right.
 */

/** Which part of the diagram a hospital classification highlights. */
export type ArchKey = "hub" | "c" | "d";

/** 24×24 stroke icons for the impact rows, in order. */
export const IMPACT_ICONS = [
  "M6 5h13M6 12h13M6 19h13M9 5v14",
  "M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z",
  "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  "M12 3l8 3v6c0 4.4-3.3 8.3-8 9-4.7-.7-8-4.6-8-9V6l8-3z",
];

/** The legend under the hero diagram. */
export const DIAGRAM_LEGEND = [
  { label: "National hub", kind: "hub" as const },
  { label: "Centre of Excellence", kind: "coe" as const },
  { label: "District health centre", kind: "district" as const },
];

/** Which way information travels, stated under the architecture diagram. */
export const FLOW_NOTES = [
  { arrow: "↑", text: "Structured reporting flows up to the national registry" },
  { arrow: "↓", text: "Referral guidance and policy updates flow down" },
];
