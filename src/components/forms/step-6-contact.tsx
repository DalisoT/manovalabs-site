"use client";

import type { WizardState } from "@/components/forms/project-wizard";
import { cn } from "@/lib/utils/cn";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

const OPTIONS = [
  { value: "whatsapp", label: "WhatsApp", desc: "Fastest for back-and-forth." },
  { value: "phone", label: "Phone call", desc: "When there's a lot to talk through." },
  { value: "email", label: "Email", desc: "Async and written record." },
  { value: "video", label: "Video consultation", desc: "Scheduled online meeting." },
];

export function Step6Contact({ state, patch }: Props) {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">Contact preference</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          How would you like us to get back to you?
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const active = state.contactPreference === opt.value;
          return (
            <li key={opt.value}>
              <button
                type="button"
                onClick={() => patch({ contactPreference: opt.value })}
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

      <p className="text-body-sm text-text-tertiary pt-4 border-t border-border-subtle">
        Ready? Hit <span className="text-text-primary font-medium">Send Project Brief</span> below.
        We&apos;ll review it and come back to you through the channel you picked.
      </p>
    </div>
  );
}