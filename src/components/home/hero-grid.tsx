"use client";

import { useEffect, useRef } from "react";

const SPACING = 30;
/** Radius of the pointer's influence, in CSS pixels. */
const REACH = 175;

/**
 * The dot grid behind the hero: a lattice that leans away from the pointer and
 * draws links between the dots it has disturbed.
 *
 * Purely decorative, so it is `aria-hidden` and does nothing at all under
 * reduced motion beyond painting one static frame. It also stops drawing once
 * it scrolls out of view, which is safe here for the same reason — no content
 * depends on it having run.
 */
export function HeroGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let dots: { x: number; y: number; nx: number; ny: number; f: number }[] = [];
    let rect: DOMRect | null = null;
    let onScreen = true;
    let raf = 0;

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    const build = () => {
      rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(width / SPACING) + 1;
      rows = Math.ceil(height / SPACING) + 1;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ x: c * SPACING + 6, y: r * SPACING + 6, nx: 0, ny: 0, f: 0 });
        }
      }
    };

    const draw = (time: number) => {
      if (!dots.length) {
        build();
        if (!dots.length) return;
      }

      ctx.clearRect(0, 0, width, height);
      pointer.x += (pointer.tx - pointer.x) * 0.13;
      pointer.y += (pointer.ty - pointer.y) * 0.13;
      const t = reduced ? 0 : time;

      for (const dot of dots) {
        const wobble = reduced ? 0 : Math.sin((dot.x + dot.y) / 110 + t / 2600) * 0.9;
        const dx = dot.x - pointer.x;
        const dy = dot.y - pointer.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < REACH) {
          const falloff = 1 - distance / REACH;
          dot.f = falloff * falloff;
          const push = dot.f * 7;
          dot.nx = dot.x + (dx / (distance || 1)) * push + wobble;
          dot.ny = dot.y + (dy / (distance || 1)) * push + wobble;
        } else {
          dot.f = 0;
          dot.nx = dot.x + wobble;
          dot.ny = dot.y + wobble;
        }
      }

      // Links, drawn only between dots the pointer has actually reached.
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const dot = dots[i];
          if (!dot || dot.f < 0.05) continue;

          const right = c + 1 < cols ? dots[i + 1] : null;
          const down = r + 1 < rows ? dots[i + cols] : null;

          if (right && right.f > 0.03) {
            ctx.strokeStyle = `rgba(60,67,74,${(Math.min(dot.f, right.f) * 0.09).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(dot.nx, dot.ny);
            ctx.lineTo(right.nx, right.ny);
            ctx.stroke();
          }
          if (down && down.f > 0.03) {
            ctx.strokeStyle = `rgba(60,67,74,${(Math.min(dot.f, down.f) * 0.09).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(dot.nx, dot.ny);
            ctx.lineTo(down.nx, down.ny);
            ctx.stroke();
          }
        }
      }

      // Undisturbed dots share one path; disturbed ones are drawn individually
      // because each takes its own alpha and radius.
      ctx.fillStyle = "rgba(18,22,26,0.13)";
      ctx.beginPath();
      for (const dot of dots) {
        if (dot.f > 0.05) continue;
        ctx.moveTo(dot.nx + 1, dot.ny);
        ctx.arc(dot.nx, dot.ny, 1, 0, Math.PI * 2);
      }
      ctx.fill();

      for (const dot of dots) {
        if (dot.f <= 0.05) continue;
        ctx.fillStyle = `rgba(34,40,46,${(0.12 + dot.f * 0.07).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(dot.nx, dot.ny, 1 + dot.f * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    build();
    draw(0);

    if (reduced) return;

    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.tx = -9999;
      pointer.ty = -9999;
    };
    // The canvas moves with the sticky hero, so its box has to be re-read as
    // the page scrolls or the pointer maps to the wrong dots.
    const onScroll = () => {
      const next = canvas.getBoundingClientRect();
      if (next.width) rect = next;
    };
    const onResize = () => {
      build();
      draw(0);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            build();
            draw(0);
          });
    resizeObserver?.observe(canvas);

    const visibility =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
          });
    visibility?.observe(canvas);

    const loop = (time: number) => {
      if (onScreen) draw(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      visibility?.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 block h-full w-full"
    />
  );
}
