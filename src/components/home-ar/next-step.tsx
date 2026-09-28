"use client";

import { useState } from "react";

import { GetInTouch } from "@/components/chrome/get-in-touch";
import { scrollToSection } from "@/components/chrome/page-sections";
import { HOME_AR_NEXT } from "@/content/home-ar";
import type { HomeSectionMeta } from "@/lib/cms/home-content";

/**
 * 07 — the enquiry form, introduced by two groups of routes. A route is a
 * shortcut to the form: it selects that audience's tab and brings the form
 * into view. The highlighted route follows the tab, whichever way it was
 * chosen.
 */
export function NextStep({ section, num }: { section: HomeSectionMeta; num: string }) {
  const content = HOME_AR_NEXT;
  // The routes name their audience by the tab labels held in Site settings.
  const [role, setRole] = useState(HOME_AR_NEXT.groups[0].routes[0].role);

  const pick = (label: string) => {
    setRole(label);
    scrollToSection("lead-form");
  };

  return (
    <GetInTouch
      section={section}
      num={num}
      content={{ heading: content.heading, description: content.description }}
      activeRole={role}
      onActiveRoleChange={setRole}
    >
      <div className="max-w-site mx-auto mt-11 grid [grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[18px] gap-y-7">
        {content.groups.map((group) => (
          <div key={group.label} className="flex min-w-0 flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span className="font-mono-label text-ink-soft flex-none text-[10.5px] tracking-[0.16em] uppercase">
                {group.label}
              </span>
              <span aria-hidden className="bg-rule block h-px flex-1" />
            </div>
            <div className="grid gap-2.5">
              {group.routes.map((route) => {
                const selected = route.role === role;
                return (
                  <button
                    key={route.role}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => pick(route.role)}
                    className={`rounded-card hover:border-primary flex w-full cursor-pointer items-center justify-between gap-4 border px-5 py-4 text-left transition-colors ${
                      selected ? "border-primary bg-primary-tint" : "border-rule bg-white"
                    }`}
                  >
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="font-mono-label text-primary text-[10.5px] tracking-[0.14em] uppercase">
                        {route.label}
                      </span>
                      <span className="text-ink text-[15.5px] font-medium">{route.title}</span>
                      <span className="text-ink-body text-[13.5px] leading-[1.55]">
                        {route.body}
                      </span>
                    </span>
                    <span aria-hidden className="text-primary flex-none text-[15px]">
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </GetInTouch>
  );
}
