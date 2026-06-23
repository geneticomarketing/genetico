"use client";
import { useEffect } from "react";
export default function LS() {
  useEffect(() => {
    let instance: { destroy: () => void } | null = null;
    let cancelled = false;
    (async function () {
      try {
        const L = (await import("locomotive-scroll")).default;
        if (cancelled) return;
        instance = new L();
      } catch (err) {
        console.error(err);
      }
    })();
    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, []);

  return <></>;
}
