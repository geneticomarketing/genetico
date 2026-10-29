/**
 * The "Coming soon" tag for parts of IndiGeneUs.AI that are built but not yet
 * live — registry, cohort and public-health views (confirmed 2026-10-29).
 *
 * Goes on the mock-up or card that shows such a feature, so a reader never
 * takes it for something they could use today. Drawn as the mock-ups'
 * "Illustrative" tag is, with an amber dot to tell the two apart.
 */
export function ComingSoonTag({
  tone = "light",
  className = "",
}: {
  /** "dark" on the navy bands and dark product windows. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <span
      className={`font-mono-label inline-flex items-center gap-[7px] rounded-full px-2.5 py-[5px] text-[10px] tracking-[0.16em] whitespace-nowrap uppercase ${
        dark ? "bg-white/8 text-sky-bright" : "bg-[#FBF3E2] text-[#8A5A08]"
      } ${className}`}
    >
      <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-[#D39B2A]" />
      Coming soon
    </span>
  );
}
