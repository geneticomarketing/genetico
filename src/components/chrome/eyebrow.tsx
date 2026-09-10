/**
 * The two eyebrow motifs that open every section of the redesign.
 *
 * `Eyebrow` is the centred one: a hairline that fades up into the brand blue,
 * the label, then the same rule mirrored. `SectionLabel` is the left-aligned
 * one used where a section leads with a heading and a number.
 */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-[22px]">
      <span
        aria-hidden
        className="block h-px w-[72px] shrink-0 bg-[image:var(--gradient-hairline)]"
      />
      <span className="font-mono-label text-primary text-center text-[11px] tracking-[0.2em] uppercase">
        {children}
      </span>
      <span
        aria-hidden
        className="block h-px w-[72px] shrink-0 bg-[image:var(--gradient-hairline-flip)]"
      />
    </div>
  );
}

export function SectionLabel({
  num,
  children,
  tone = "light",
}: {
  num: string;
  children: React.ReactNode;
  /** `dark` inverts the ramp for use on the dark band. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <div className="flex items-center gap-3">
      <span
        className={`font-mono-label text-[11px] tracking-[0.2em] ${
          dark ? "text-sky-bright" : "text-primary"
        }`}
      >
        {num}
      </span>
      <span
        aria-hidden
        className={`block h-px w-5 shrink-0 ${dark ? "bg-white/40" : "bg-[#C3D2DC]"}`}
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
