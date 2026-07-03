"use client";

import "@/lib/motion/apply-safari-scroll-fix";

import { cancelFrame, frame } from "motion/react";
import { useEffect } from "react";

import { isIOS } from "@/lib/motion/platform";

export default function LS() {
  useEffect(() => {
    // Lenis smooth-scroll conflicts with Motion scroll tracking on iOS WebKit.
    // Locomotive stays enabled on desktop; touch devices use native scrolling.
    if (isIOS()) return;

    let instance: {
      destroy: () => void;
      start: () => void;
      resize: () => void;
    } | null = null;
    let cancelled = false;
    let cancelMotionFrame: (() => void) | undefined;

    (async function () {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        if (cancelled) return;

        instance = new LocomotiveScroll({
          autoStart: false,
          initCustomTicker: (render) => {
            function update() {
              render();
            }
            frame.update(update, true);
            cancelMotionFrame = () => cancelFrame(update);
          },
          destroyCustomTicker: () => {
            cancelMotionFrame?.();
          },
        });

        instance.start();
      } catch (err) {
        console.error(err);
      }
    })();

    const onLoad = () => instance?.resize();
    window.addEventListener("load", onLoad);

    return () => {
      cancelled = true;
      window.removeEventListener("load", onLoad);
      cancelMotionFrame?.();
      instance?.destroy();
    };
  }, []);

  return null;
}
