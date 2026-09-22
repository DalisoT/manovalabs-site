"use client";

import { useEffect, useState } from "react";

/**
 * A subtle, performant background visual: faint grid + radial glow.
 * Used in the hero. No animation unless visible.
 */
export function AnimatedBackground() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[800px] max-w-[100vw] rounded-full bg-radial-fade opacity-70" />
      {!reduceMotion && (
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[600px] w-[800px] max-w-[100vw] rounded-full bg-radial-fade opacity-40 animate-pulse-soft" />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-base) 0%, transparent 25%, transparent 75%, var(--bg-base) 100%)",
        }}
      />
    </div>
  );
}