import type { ArchKey } from "@/content/public-health-diagram";

/**
 * The hub-and-spoke diagram: a national hub, the Centres of Excellence that
 * orbit it, and the district centres beyond them.
 *
 * Drawn twice on the page — once beside the hero as a plain illustration, and
 * once in the architecture section where it responds to the classification
 * list beside it. `lit` is which classification is being pointed at, so the
 * diagram can foreground that part and fade the rest.
 *
 * The dashes travel and the hub pulses only when motion is allowed; both are
 * behind `motion-safe`, so CSS decides rather than JS.
 */
export function HubDiagram({
  lit = null,
  interactive = false,
}: {
  lit?: ArchKey | null;
  /** The architecture copy responds to the list; the hero copy does not. */
  interactive?: boolean;
}) {
  const dim = (key: ArchKey | ArchKey[]) => {
    if (!interactive || !lit) return undefined;
    const keys = Array.isArray(key) ? key : [key];
    return keys.includes(lit) ? 1 : 0.4;
  };

  const hubLit = interactive && (lit === "hub" || lit === "c");
  const spokeLit = interactive && lit === "d";

  // The district label sits high to leave room for the class line under it,
  // and centres in the circle where that line is not drawn.
  const dLabelY = (cy: number) => (interactive ? cy - 3 : cy + 4);

  return (
    <svg
      viewBox="0 0 480 420"
      role="img"
      aria-label="Hub and spoke model: a national hub connected to Centre of Excellence spokes, which connect on to district health centres"
      className="mx-auto block h-auto w-full max-w-[500px] overflow-visible"
    >
      <path
        d="M258 34 Q 452 210 258 386"
        fill="none"
        stroke="#C9D8E4"
        strokeWidth="1"
        strokeDasharray="5 7"
        className="motion-safe:animate-[dash-flow_1.8s_linear_infinite]"
      />

      {interactive ? (
        <circle
          cx="158"
          cy="210"
          r="56"
          fill="none"
          stroke="#0B4C86"
          strokeWidth="1.5"
          className="opacity-0 [transform-box:fill-box] [transform-origin:center] motion-safe:animate-[pulse-ring_3.2s_ease-out_infinite]"
        />
      ) : null}

      <g
        fill="none"
        strokeWidth="1.2"
        stroke={hubLit ? "#0B4C86" : "#B9CBD9"}
        className="transition-[stroke] duration-300"
      >
        <path d="M158 158 L252 96" />
        <path d="M158 210 L272 210" />
        <path d="M158 262 L252 324" />
      </g>

      <g
        fill="none"
        strokeWidth="1"
        strokeDasharray="4 6"
        stroke={spokeLit ? "#0B4C86" : "#C3D2DC"}
        className={`transition-[stroke] duration-300 ${
          // Only the architecture copy runs these; beside the hero the single
          // travelling arc is enough, and three more moving dashes there would
          // compete with the headline.
          interactive ? "motion-safe:animate-[dash-flow_1.8s_linear_infinite]" : ""
        }`}
      >
        <path d="M290 84 L378 56" />
        <path d="M306 210 L400 210" />
        <path d="M290 336 L376 350" />
      </g>

      <circle
        cx="158"
        cy="210"
        r="76"
        fill="#EDF3F9"
        className="transition-opacity duration-300"
        opacity={interactive && lit ? (lit === "hub" ? 1 : 0.3) : 0.8}
      />
      <circle
        cx="158"
        cy="210"
        r="56"
        fill={interactive && lit === "hub" ? "#073B68" : "#0B4C86"}
        className="transition-[fill] duration-300"
      />
      <text
        x="158"
        y="203"
        textAnchor="middle"
        fontFamily="var(--font-mono-label)"
        fontSize="11.5"
        letterSpacing="1.4"
        fill="#ffffff"
      >
        HUB A/B
      </text>
      <text x="158" y="221" textAnchor="middle" fontSize="12" fill="#BDDCF5">
        NPRD
      </text>
      <text x="158" y="238" textAnchor="middle" fontSize="10.5" fill="#8FC6EF">
        National registry
      </text>

      <g className="transition-opacity duration-300" opacity={dim(["c", "hub"])}>
        {[
          { cx: 272, cy: 90 },
          { cx: 290, cy: 210 },
          { cx: 272, cy: 330 },
        ].map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="34"
              fill="#ffffff"
              stroke="#0B4C86"
              strokeWidth="1.3"
            />
            <text
              x={node.cx}
              y={node.cy - 3}
              textAnchor="middle"
              fontFamily="var(--font-mono-label)"
              fontSize="10"
              letterSpacing="1"
              fill="#0B4C86"
            >
              SPOKE C
            </text>
            <text x={node.cx} y={node.cy + 12} textAnchor="middle" fontSize="10.5" fill="#6E767D">
              {interactive ? "Class C" : "CoE"}
            </text>
          </g>
        ))}
      </g>

      <g className="transition-opacity duration-300" opacity={dim("d")}>
        {[
          { cx: 404, cy: 48 },
          { cx: 428, cy: 210 },
          { cx: 402, cy: 358 },
        ].map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="26"
              fill="#F6F9FA"
              stroke="#C3D2DC"
              strokeWidth="1"
            />
            <text
              x={node.cx}
              y={dLabelY(node.cy)}
              textAnchor="middle"
              fontFamily="var(--font-mono-label)"
              fontSize="9.5"
              letterSpacing="0.8"
              fill="#3C434A"
            >
              SPOKE D
            </text>
            {interactive ? (
              <text x={node.cx} y={node.cy + 10} textAnchor="middle" fontSize="9.5" fill="#6E767D">
                Class D
              </text>
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}
