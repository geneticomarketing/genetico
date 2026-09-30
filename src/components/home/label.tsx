/**
 * The home page's section eyebrow: number, a short rule, then the label.
 *
 * The same motif as the shared `SectionLabel`, drawn to this design's
 * measurements — a 24px rule and, on the dark bands, a lighter rule and label.
 */
export function Label({
  num,
  children,
  tone = "light",
}: {
  num: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono-label text-[11px] tracking-[0.2em] ${dark ? "text-sky-bright" : "text-primary"}`}
      >
        {num}
      </span>
      <span
        aria-hidden
        className={`block h-px w-6 shrink-0 ${dark ? "bg-white/35" : "bg-[#C3D2DC]"}`}
      />
      <span
        className={`font-mono-label text-[11px] tracking-[0.2em] uppercase ${
          dark ? "text-sky" : "text-ink-soft"
        }`}
      >
        {children}
      </span>
    </div>
  );
}

/** Section heading at the design's H2 size. */
export const H2 =
  "font-headline m-0 text-[clamp(38px,5.2vw,68px)] leading-[1.04] font-normal tracking-[-0.022em] text-balance";

/** Lead paragraph under a heading. */
export const LEAD = "m-0 max-w-[600px] text-lg leading-[1.75] text-pretty";

/** Section box: gutters, the standard vertical rhythm, and the jump offset. */
export const SECTION = "px-edge py-[clamp(96px,12vw,168px)] scroll-mt-32";

/** A small mono label. */
export const MONO = "font-mono-label text-[10.5px] tracking-[0.16em] uppercase";
