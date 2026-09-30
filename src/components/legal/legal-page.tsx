import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { getLegalPageBySlug } from "@/lib/cms/page-data";
import { CONTACT_EMAIL, CONTACT_MAILTO } from "@/lib/contact";
import { createPageMetadata } from "@/lib/seo";

/**
 * The legal pages (/privacy-policy, /cookie-policy): a title, a "last
 * updated" date and numbered sections, all edited in the CMS under
 * Other pages → Legal pages. Each page keeps its own copy in code as a
 * fallback, used only if its CMS record is missing.
 */

export type LegalSection = {
  title: string;
  body: string[];
  list?: string[];
  /** Print the contact email under this section's text. */
  contact?: boolean;
};

export type LegalFallback = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

/** Plain paragraphs from a Lexical rich-text value. */
function richTextToParagraphs(body: unknown): string[] {
  const root = (body as { root?: { children?: unknown[] } } | null)?.root;
  if (!root?.children?.length) return [];

  return root.children.flatMap((node) => {
    const record = node as { type?: string; children?: { text?: string }[] };
    if (record?.type !== "paragraph" || !record.children?.length) return [];
    const text = record.children
      .map((child) => child.text ?? "")
      .join("")
      .trim();
    return text ? [text] : [];
  });
}

export async function legalPageMetadata(
  slug: string,
  seo: { title: string; description: string; path: string },
): Promise<Metadata> {
  const page = await getLegalPageBySlug(slug);
  return createPageMetadata({
    title: page?.title ?? seo.title,
    description: page?.metaDescription ?? seo.description,
    path: seo.path,
  });
}

export async function LegalPage({ slug, fallback }: { slug: string; fallback: LegalFallback }) {
  const page = await getLegalPageBySlug(slug);

  const sections: LegalSection[] = page?.sections?.length
    ? page.sections.map((section) => ({
        title: section.title,
        body: richTextToParagraphs(section.body),
        list: section.bullets?.map((item) => item.item).filter(Boolean),
        contact: section.title.toLowerCase().includes("contact"),
      }))
    : fallback.sections;

  const lastUpdated = new Date(page?.lastUpdated ?? fallback.lastUpdated).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" },
  );

  return (
    <main className="px-gutter pt-page pb-section relative flex flex-1 flex-col">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[min(100vw,640px)] w-[min(100vw,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(95,215,203,0.08)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back to home
        </Link>

        <p className="t-eyebrow text-accent mb-4">Legal</p>
        <h1 className="t-heading text-balance text-white">{page?.title ?? fallback.title}</h1>
        <p className="mt-4 text-sm text-white/45">Last updated: {lastUpdated}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-medium text-white">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
              {section.contact ? (
                <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                  <a
                    href={CONTACT_MAILTO}
                    className="text-accent underline-offset-2 transition-colors hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              ) : null}
              {section.list?.map((item) => (
                <p
                  key={item}
                  className="mt-3 pl-4 text-sm leading-relaxed text-white/60 sm:text-base"
                >
                  <span aria-hidden className="mr-2 text-white/30">
                    •
                  </span>
                  {item}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
