"use client";

import type { WizardState } from "@/components/forms/project-wizard";
import { cn } from "@/lib/utils/cn";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

const OPTIONS = [
  { value: "not-sure", label: "Not sure yet", desc: "Help us scope before discussing pricing." },
  { value: "under-5k", label: "Under K5,000", desc: "Tight scope; we may suggest a phased approach." },
  { value: "5-10k", label: "K5,000 – K10,000", desc: "Small business website or basic system." },
  { value: "10-25k", label: "K10,000 – K25,000", desc: "Substantial build with integrations." },
  { value: "25k+", label: "K25,000+", desc: "Larger platform or multi-stage project." },
  { value: "discuss", label: "Prefer to discuss", desc: "Let's talk before putting a number on it." },
];

export function Step4Budget({ state, patch }: Props) {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">Budget expectation</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          This is an initial estimate, not a binding quotation. Every project
          is scoped before pricing is discussed.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const active = state.budget === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => patch({ budget: opt.value })}
                aria-pressed={active}
                className={cn(
                  "w-full text-left rounded-md border p-4 transition-all",
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