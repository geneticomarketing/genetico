/**
 * Hairlines between the four figures: one column below `nav`, a 2x2 divided by
 * rules above it — so what a cell carries depends on where it lands in both.
 */
function factCell(i: number) {
  const stacked = i > 0 ? "border-t border-t-rule-light" : "";
  const column =
    i % 2 === 1
      ? "nav:border-l nav:border-l-rule-light nav:pl-[clamp(18px,2.4vw,32px)]"
      : "nav:pr-[clamp(18px,2.4vw,32px)]";
  // Only the bottom row keeps a top rule once the cells are side by side.
  const topRule = i > 1 ? "" : "nav:border-t-0";
  return `py-4 nav:py-[18px] ${stacked} ${column} ${topRule}`;
}

/**
 * The scale of rare disease: a 10×10 dot grid drawing the share that is
 * genetic, four figures beside it, and a source note underneath. Shared by the
 * home previews that carry it.
 */
export function FactsPanel({
  dotGrid,
  facts,
  note,
  className = "",
}: {
  /** `filled` of the hundred dots are drawn in brand blue. */
  dotGrid: { filled: number; caption: string };
  facts: { figure: string; label: string }[];
  note: string;
  className?: string;
}) {
  return (
    <div
      className={`border-rule rounded-card bg-sheet-soft border px-[clamp(18px,2.4vw,28px)] py-6 ${className}`}
    >
      <div className="nav:grid-cols-[auto_minmax(0,1fr)] nav:gap-[clamp(28px,4vw,56px)] grid items-center gap-7">
        <div className="flex min-w-0 flex-col gap-3">
          <div aria-hidden className="grid w-full max-w-[190px] grid-cols-10 gap-1">
            {Array.from({ length: 100 }, (_, i) => (
              <span
                key={i}
                className={`block w-full rounded-full pb-[100%] ${
                  i < dotGrid.filled ? "bg-primary" : "bg-[#DCE4EA]"
                }`}
              />
            ))}
          </div>
          <p className="text-ink-soft m-0 max-w-[210px] text-[12.5px] leading-[1.55]">
            {dotGrid.caption}
          </p>
        </div>

        <dl className="nav:grid-cols-2 m-0 grid grid-cols-1 gap-0">
          {facts.map((fact, i) => (
            <div key={fact.label} className={`flex min-w-0 flex-col gap-[9px] ${factCell(i)}`}>
              <dt className="font-mono-label text-primary text-[clamp(26px,2.8vw,34px)] leading-none">
                {fact.figure}
              </dt>
              <dd className="text-ink-body m-0 text-[13.5px] leading-[1.55]">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <p className="border-rule-light text-ink-soft m-0 mt-5 border-t pt-4 text-xs leading-[1.6]">
        {note}
      </p>
    </div>
  );
}
