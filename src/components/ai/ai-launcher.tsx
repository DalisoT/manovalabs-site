"use client";

import { useState } from "react";
import { Sparkles, X as CloseIcon } from "lucide-react";
import { ManovaAI } from "@/components/ai/manova-ai";
import { track } from "@/lib/utils/analytics";
import { cn } from "@/lib/utils/cn";

/**
 * Floating launcher that makes MANOVA AI available site-wide.
 * Renders only on client to avoid SSR mismatches.
 */
export function AILauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          track("ai_open", { source: "launcher" });
        }}
        aria-label="Open MANOVA AI"
        aria-expanded={open}
        className={cn(
          "fixed bottom-4 right-4 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg-base shadow-accent-glow transition-all hover:bg-accent-soft hover:scale-[1.04] active:scale-95",
          open && "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <Sparkles className="h-6 w-6" aria-hidden />
        <span aria-hidden className="absolute inset-0 rounded-full bg-accent animate-pulse-soft opacity-30" />
      </button>

      {open && (
        <button
          type="button"
          aria-label="Close MANOVA AI"
          onClick={() => setOpen(false)}
          className="fixed bottom-[calc(50%+1rem)] right-4 z-[75] hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full glass text-text-secondary hover:text-text-primary"
        >
          <CloseIcon className="h-4 w-4" aria-hidden />
        </button>
      )}

      <ManovaAI open={open} onOpenChange={setOpen} />
    </>
  );
}