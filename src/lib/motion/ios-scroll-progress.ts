const NAMED_EDGES = { start: 0, center: 0.5, end: 1 } as const;

function resolveEdge(edge: string, length: number, inset = 0): number {
  let delta = 0;

  if (edge in NAMED_EDGES) {
    edge = String(NAMED_EDGES[edge as keyof typeof NAMED_EDGES]);
  }

  const asNumber = parseFloat(edge);
  if (edge.endsWith("px")) {
    delta = asNumber;
  } else if (edge.endsWith("%")) {
    edge = String(asNumber / 100);
  } else if (edge.endsWith("vw")) {
    delta = (asNumber / 100) * document.documentElement.clientWidth;
  } else if (edge.endsWith("vh")) {
    delta = (asNumber / 100) * window.innerHeight;
  } else if (!Number.isNaN(asNumber) && edge.trim() === String(asNumber)) {
    edge = String(asNumber);
  }

  if (!Number.isNaN(parseFloat(edge))) {
    delta = length * parseFloat(edge);
  }

  return inset + delta;
}

function parseOffsetPair(pair: string): { target: string; container: string } {
  const parts = pair.trim().split(/\s+/);
  if (parts.length === 1) {
    const part = parts[0];
    return {
      target: part in NAMED_EDGES ? part : "start",
      container: part in NAMED_EDGES ? part : part,
    };
  }
  return { target: parts[0], container: parts[1] };
}

/** Viewport Y of the target's top edge when this offset marks progress 0 / 1. */
function viewportAnchorY(
  targetEdge: string,
  containerEdge: string,
  targetHeight: number,
  viewportHeight: number,
): number {
  const containerPoint = resolveEdge(containerEdge, viewportHeight, 0);

  if (targetEdge === "start") return containerPoint;
  if (targetEdge === "center") return containerPoint - targetHeight / 2;
  if (targetEdge === "end") return containerPoint - targetHeight;

  return containerPoint - resolveEdge(targetEdge, targetHeight, 0);
}

/**
 * Maps an element's viewport rect to 0–1 scroll progress using Motion-style offsets.
 * Uses getBoundingClientRect so it works with iOS WebKit + Lenis.
 */
export function computeElementScrollProgress(
  rect: DOMRect,
  offset: string[] = ["start end", "end start"],
): number {
  const viewportHeight = window.innerHeight;
  const start = parseOffsetPair(offset[0] ?? "start end");
  const end = parseOffsetPair(offset[1] ?? "end start");

  const y0 = viewportAnchorY(start.target, start.container, rect.height, viewportHeight);
  const y1 = viewportAnchorY(end.target, end.container, rect.height, viewportHeight);

  if (y0 === y1) return rect.top <= y0 ? 1 : 0;

  const progress = (y0 - rect.top) / (y0 - y1);
  return Math.min(1, Math.max(0, progress));
}
