"use client";

import { Check } from "lucide-react";
import type { WizardState } from "@/components/forms/project-wizard";
import { cn } from "@/lib/utils/cn";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

const OPTIONS: { value: string; label: string; desc: string }[] = [
  { value: "consulting", label: "Consulting / Strategy", desc: "Help figuring out what to build, buy or skip." },
  { value: "training", label: "Training / Mentoring", desc: "1-on-1, workshops, mentoring for your team." },
  { value: "ai", label: "AI Work", desc: "Custom AI features, integrations, AI workflows." },
  { value: "automation", label: "Business Automation", desc: "Workflows, notifications, reporting, approvals." },
  { value: "web-development", label: "Web Development", desc: "A website or web app, taken on when it fits." },
  { value: "web-app", label: "Web Application", desc: "Dashboards, portals, internal tools." },
  { value: "ecommerce", label: "E-commerce", desc: "Store, checkout, order management." },
  { value: "system", label: "Custom System", desc: "Internal business system, database, dashboard." },
  { value: "speaking", label: "Speaking / Writing", desc: "Talks, workshops, articles, content." },
  { value: "other", label: "Other", desc: "Something not on the list." },
];

export function Step2Needs({ state, patch }: Props) {
  function toggle(value: string) {
    const next = state.services.includes(value)
      ? state.services.filter((v) => v !== value)
      : [...state.services, value];
    patch({ services: next });
  }

  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">What do you need?</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          Pick one or more — we&apos;ll scope around what you select.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {OPTIONS.map((opt) => {
          const active = state.services.includes(opt.value);
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => toggle(opt.value)}
                aria-pressed={active}
                className={cn(
                  "w-full text-left rounded-md border p-4 transition-all",
                  active
                    ? "border-accent bg-accent/10"
                    : "border-border-subtle bg-bg-base/40 hover:border-border-strong"
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="text-body-sm font-medium text-text-primary">
                    {opt.label}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 items-center justify-center rounded-full border",
                      active
                        ? "bg-accent border-accent text-bg-base"
                        : "border-border-strong text-transparent"
                    )}
                    aria-hidden
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </div>
                <p className="mt-2 text-body-sm text-text-tertiary">
                  {opt.desc}
                </p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}