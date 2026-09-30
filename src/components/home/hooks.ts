"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type RefObject } from "react";

/**
 * Behaviour shared by the home page's interactive sections.
 *
 * Nothing here decides whether content is *visible* — every section paints in
 * full without JavaScript. These only drive what moves: which step is lit,
 * how far a demo has run, where a scrubbed section has got to.
 */

/** The width at which scroll-scrubbed sections take over from click-to-select. */
export const WIDE_QUERY = "(min-width: 1040px)";
const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  };
}

/** A media query's current answer; `false` while rendering on the server. */
export function useMedia(query: string): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const useReducedMotion = () => useMedia(REDUCED_QUERY);

/** Whether any part of the element is on screen. Used only to pause work. */
export function useOnScreen(ref: RefObject<Element | null>): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return on;
}

const TICK_MS = 80;

/**
 * Milliseconds of animation time, advancing in 80ms ticks only while `running`
 * and the tab is showing — the design's clock, which pauses the hero demo and
 * the roadmap's auto-cycle whenever nobody can see them.
 */
export function useClock(running: boolean): number {
  const [clock, setClock] = useState(0);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setClock((t) => t + TICK_MS);
    }, TICK_MS);
    return () => window.clearInterval(id);
  }, [running]);
  return clock;
}

/**
 * Progress through a scroll-scrubbed section.
 *
 * The track holds a sticky child and a tall spacer; scrolling through the
 * track's extra height walks `steps` steps. Returns a float in [0, steps):
 * its whole part is the active step, its fraction how far through that step.
 * Inert (always 0) when `enabled` is false — below 1040px the sections are
 * plain click-to-select and the sticky and spacer are not rendered.
 *
 *   progress = clamp((stickyTop − track.top) / (track.height − sticky.height)) × steps
 */
export function useScrub(
  track: RefObject<HTMLElement | null>,
  steps: number,
  enabled: boolean,
): { pos: number; scrubTo: (i: number) => void } {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = track.current;
      const sticky = el?.firstElementChild as HTMLElement | null;
      if (!el || !sticky) return;
      const r = el.getBoundingClientRect();
      const top0 = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = r.height - sticky.offsetHeight;
      const next = range > 0 ? Math.max(0, Math.min(0.9999, (top0 - r.top) / range)) * steps : 0;
      setPos((prev) => (Math.abs(prev - next) > 0.008 ? next : prev));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [track, steps, enabled]);

  /** Scroll to the middle of step `i`. */
  const scrubTo = useCallback(
    (i: number) => {
      const el = track.current;
      const sticky = el?.firstElementChild as HTMLElement | null;
      if (!el || !sticky) return;
      const r = el.getBoundingClientRect();
      const top0 = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = r.height - sticky.offsetHeight;
      const reduced = window.matchMedia(REDUCED_QUERY).matches;
      window.scrollTo({
        top: window.scrollY + r.top - top0 + ((i + 0.5) / steps) * range,
        behavior: reduced ? "auto" : "smooth",
      });
    },
    [track, steps],
  );

  return { pos: enabled ? pos : 0, scrubTo };
}

/**
 * Run `draw(time)` every frame while the canvas is on screen, sizing its
 * backing store to the element at the device's pixel ratio (capped at 2).
 * Under reduced motion it draws once per size, at time 0.
 */
export function useCanvasLoop(
  canvas: RefObject<HTMLCanvasElement | null>,
  draw: (ctx: CanvasRenderingContext2D, size: number, time: number) => void,
) {
  const reduced = useReducedMotion();
  const onScreen = useOnScreen(canvas);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let drawnAt = "";
    const frame = (time: number) => {
      const size = c.clientWidth;
      if (size) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const px = Math.round(size * dpr);
        if (c.width !== px) {
          c.width = px;
          c.height = px;
        }
        const key = `${size}`;
        if (!reduced || drawnAt !== key) {
          drawnAt = key;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, size, size);
          draw(ctx, size, reduced ? 0 : time);
        }
      }
      if (!reduced && onScreen) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [canvas, draw, reduced, onScreen]);
}
