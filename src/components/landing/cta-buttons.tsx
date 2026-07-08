import Link from "next/link";
import type { CtaButton } from "@/lib/cms/types";

export function CtaButtons({
  buttons,
  className = "",
}: {
  buttons: CtaButton[];
  className?: string;
}) {
  if (!buttons.length) return null;

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 sm:gap-4 ${className}`}>
      {buttons.map((button) => {
        const isExternal = button.href.startsWith("http");
        const classNames =
          button.variant === "secondary"
            ? "inline-flex rounded-lg border border-black/15 bg-white px-7 py-3 text-sm font-medium text-black transition-colors hover:bg-black/[0.03]"
            : "bg-brand inline-flex rounded-lg px-7 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(2,67,133,0.35)] transition-colors hover:bg-[#01356b]";

        if (isExternal) {
          return (
            <a
              key={button.label}
              href={button.href}
              target="_blank"
              rel="noopener noreferrer"
              className={classNames}
            >
              {button.label}
            </a>
          );
        }

        return (
          <Link key={button.label} href={button.href} className={classNames}>
            {button.label}
          </Link>
        );
      })}
    </div>
  );
}
