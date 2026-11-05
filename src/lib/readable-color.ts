/**
 * A text colour an editor picked in the CMS (a blog category, say), darkened
 * just enough to be readable on a white card: WCAG AA asks for 4.5:1 at small
 * sizes. Colours that already pass are returned unchanged, and anything that
 * is not a six-digit hex passes through untouched.
 */
export function readableTextColor(hex: string | null | undefined, minRatio = 4.5): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex?.trim() ?? "");
  if (!match) return hex ?? "";

  let [r, g, b] = [0, 2, 4].map((i) => parseInt(match[1].slice(i, i + 2), 16));
  // Step towards black until the colour reads against white.
  for (let step = 0; step < 40 && contrastOnWhite(r, g, b) < minRatio; step++) {
    [r, g, b] = [r, g, b].map((c) => Math.round(c * 0.94));
  }
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function contrastOnWhite(r: number, g: number, b: number): number {
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return 1.05 / (luminance + 0.05);
}
