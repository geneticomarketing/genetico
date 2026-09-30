import Link from "next/link";

/** The 404 page's body, shared by the site's not-found page and the global one. */
export function NotFoundView() {
  return (
    <main className="px-edge font-body text-ink flex min-h-[70vh] flex-1 flex-col items-center justify-center gap-5 bg-white py-24 text-center">
      <span className="font-mono-label text-primary text-[11px] tracking-[0.2em] uppercase">
        404 · Page not found
      </span>
      <h1 className="font-headline m-0 max-w-[640px] text-[clamp(34px,5vw,56px)] leading-[1.06] font-normal tracking-[-0.02em]">
        This page does not exist.
      </h1>
      <p className="text-ink-body m-0 max-w-[480px] text-base leading-[1.7]">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="bg-primary-deep hover:bg-primary mt-2 rounded-[10px] px-6 py-3 text-[15px] font-bold text-white transition-colors hover:text-white"
      >
        Go to the home page
      </Link>
    </main>
  );
}
