"use client";

import type { WizardState } from "@/components/forms/project-wizard";
import { cn } from "@/lib/utils/cn";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

const OPTIONS = [
  { value: "asap", label: "ASAP", desc: "Time-sensitive. Let's move." },
  { value: "1-month", label: "Within 1 month", desc: "Working toward an upcoming launch." },
  { value: "1-3-months", label: "1 – 3 months", desc: "Comfortable runway." },
  { value: "3-6-months", label: "3 – 6 months", desc: "Planning ahead." },
  { value: "flexible", label: "Flexible", desc: "When it's right." },
];

export function Step5Timeline({ state, patch }: Props) {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">Timeline</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          When would you like this to be live?
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((opt) => {
          const active = state.timeline === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => patch({ timeline: opt.value })}
                aria-pressed={active}
                className={cn(
                  "w-full text-left rounded-md border p-4 transition-all h-full",
                  active
                    ? "border-accent bg-accent/10"
                    : "border-border-subtle bg-bg-base/40 hover:border-border-strong"
                )}
              >
                <span className="block text-body-sm font-medium text-text-primary">
                  {opt.label}
                </span>
                <span className="block mt-1 text-body-sm text-text-tertiary">
                  {opt.desc}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}