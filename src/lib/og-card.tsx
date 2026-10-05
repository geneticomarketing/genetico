import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

/**
 * The share card a page shows when its link is posted on LinkedIn, WhatsApp,
 * X or Slack: the Genetico logo, the page's headline, and the site's address.
 *
 * Rendered by `next/og` (Satori), which supports flexbox and a subset of CSS
 * only — no grid, no Tailwind classes. With no font passed it uses its
 * built-in sans, which keeps the route free of font files and network fetches.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

let logo: Promise<string> | null = null;

/** The logo as a data URL, read once per server instance. */
function logoDataUrl(): Promise<string> {
  logo ??= readFile(join(process.cwd(), "public/brand/genetico-logo.png")).then(
    (png) => `data:image/png;base64,${png.toString("base64")}`,
  );
  return logo;
}

export async function renderOgCard({
  eyebrow,
  headline,
}: {
  /** Small label above the headline, e.g. "IndiGeneUs.AI platform". */
  eyebrow: string;
  headline: string;
}): Promise<ImageResponse> {
  const src = await logoDataUrl();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "linear-gradient(135deg, #FFFFFF 0%, #EEF4F8 100%)",
        color: "#0B2540",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori needs a plain <img> */}
      <img src={src} alt="" width={290} height={84} />

      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "#0E8C7A",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            // Page titles stay under ~60 characters; a newsletter lead can run to 130.
            fontSize: headline.length > 100 ? 46 : headline.length > 48 ? 58 : 68,
            lineHeight: 1.12,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {headline}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "2px solid #D6DEE4",
          paddingTop: 26,
          fontSize: 26,
          color: "#3D5468",
        }}
      >
        <span>genetico.in</span>
        <span>IndiGeneUs.AI · Rare and genetic disease care</span>
      </div>
    </div>,
    OG_SIZE,
  );
}
