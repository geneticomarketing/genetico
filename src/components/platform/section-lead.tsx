/**
 * The label, heading and standfirst that open every Platform section.
 *
 * The page uses a left-aligned rule after the label rather than the centred
 * eyebrow the other pages use, which suits sections that then run wide.
 */
export function SectionLead({
  num,
  eyebrow,
  heading,
  description,
  tone = "light",
}: {
  num: string;
  eyebrow: string;
  heading: string;
  description: string;
  /** `dark` inverts the ramp for the clinical-intelligence band. */
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";

  return (
    <>
      <div className="flex items-center gap-4">
        <span
          className={`font-mono-label text-[11px] tracking-[0.2em] uppercase ${
            dark ? "text-[#8FD8FF]" : "text-primary"
          }`}
        >
          {num} · {eyebrow}
        </span>
        <span
          aria-hidden
          className={`block h-px w-[72px] ${dark ? "bg-white/40" : "bg-[#C3D2DC]"}`}
        />
      </div>

      <div className="mid:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] mt-6 grid grid-cols-[minmax(0,1fr)] items-end gap-x-14 gap-y-4">
        <h2
          className={`font-headline m-0 text-[clamp(30px,4vw,48px)] leading-[1.1] tracking-[-0.02em] ${
            dark ? "text-white" : ""
          }`}
        >
          {heading}
        </h2>
        {description ? (
          <p
            className={`m-0 max-w-[34em] text-[14.5px] leading-[1.75] ${
              dark ? "text-[#C6D6E4]" : "text-ink-body"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </>
  );
}
