"use client";

import { useEffect, useState } from "react";

import type { ResourceTab } from "@/lib/cms/resources-page-data";

/**
 * The sticky filter row that sits where other pages put the section rail.
 *
 * Each tab shows its own count, so the row doubles as a summary of what the
 * page holds. The progress line underneath is the same one the rail uses.
 */
export function FilterBar({
  tabs,
  active,
  onSelect,
}: {
  tabs: ResourceTab[];
  active: string;
  onSelect: (id: string) => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
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
  }, []);

  return (
    <div className="border-rule sticky top-16 z-[55] border-t border-b bg-white/94 backdrop-blur-[14px]">
      <div className="max-w-site px-edge mx-auto flex h-[52px] items-center gap-1 overflow-x-auto">
        <span
          id="resource-filter-label"
          className="font-mono-label text-ink-soft mr-3.5 flex-none text-[10.5px] tracking-[0.16em] uppercase"
        >
          Browse
        </span>
        <div
          role="group"
          aria-labelledby="resource-filter-label"
          className="flex items-center gap-1"
        >
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect(tab.id)}
                className={`flex flex-none cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary-tint text-primary-deep font-bold"
                    : "text-ink-soft hover:bg-primary-tint hover:text-primary-deep font-normal"
                }`}
              >
                <span>{tab.label}</span>
                <span className="font-mono-label text-[10.5px] tracking-[0.1em] opacity-55">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="bg-rule h-0.5">
        <div className="bg-primary h-0.5" style={{ width: `${progress.toFixed(1)}%` }} />
      </div>
    </div>
  );
}
