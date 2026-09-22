"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Step1AboutYou } from "@/components/forms/step-1-about-you";
import { Step2Needs } from "@/components/forms/step-2-needs";
import { Step3Description } from "@/components/forms/step-3-description";
import { Step4Budget } from "@/components/forms/step-4-budget";
import { Step5Timeline } from "@/components/forms/step-5-timeline";
import { Step6Contact } from "@/components/forms/step-6-contact";
import { ConfirmationScreen } from "@/components/forms/confirmation-screen";
import { isStepValid } from "@/lib/validation/lead-schema";

export interface WizardState {
  // Step 1
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  // Step 2
  services: string[];
  // Step 3
  description: string;
  businessProblem: string;
  desiredOutcome: string;
  existingSystem: string;
  // Step 4
  budget: string;
  // Step 5
  timeline: string;
  // Step 6
  contactPreference: string;
}

const empty: WizardState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  whatsapp: "",
  location: "",
  services: [],
  description: "",
  businessProblem: "",
  desiredOutcome: "",
  existingSystem: "",
  budget: "",
  timeline: "",
  contactPreference: "",
};

const STEPS = [
  { id: 1, title: "About you" },
  { id: 2, title: "What you need" },
  { id: 3, title: "About the project" },
  { id: 4, title: "Budget" },
  { id: 5, title: "Timeline" },
  { id: 6, title: "Contact preference" },
] as const;

export function ProjectWizard() {
  const [state, setState] = useState<WizardState>(empty);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canContinue = useMemo(() => isStepValid(step, state), [step, state]);
  const canSubmit = useMemo(() => {
    return isStepValid(1, state) && isStepValid(2, state) && state.contactPreference.length > 0;
  }, [state]);

  function patch(partial: Partial<WizardState>) {
    setState((s) => ({ ...s, ...partial }));
  }

  function next() {
    setStep((s) => Math.min(STEPS.length, s + 1));
  }
  function back() {
    setStep((s) => Math.max(1, s - 1));
  }

  async function submit() {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Submission failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <ConfirmationScreen />;
  }

  return (
    <div>
      {/* Stepper */}
      <ol
        aria-label="Progress"
        className="flex flex-wrap items-center gap-2 mb-10"
      >
        {STEPS.map((s, i) => (
          <li
            key={s.id}
            className="flex items-center gap-2"
            aria-current={step === s.id ? "step" : undefined}
          >
            <span
              className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-label ${
                step >= s.id
                  ? "bg-accent text-bg-base"
                  : "bg-bg-elevated border border-border-subtle text-text-tertiary"
              }`}
            >
              {step > s.id ? <CheckCircle2 className="h-4 w-4" /> : s.id}
            </span>
            <span
              className={`text-body-sm ${
                step === s.id ? "text-text-primary" : "text-text-tertiary"
              }`}
            >
              {s.title}
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden className="hidden sm:inline-block h-px w-8 bg-border-subtle mx-2" />
            )}
          </li>
        ))}
      </ol>

      <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6 lg:p-8">
        {step === 1 && <Step1AboutYou state={state} patch={patch} />}
        {step === 2 && <Step2Needs state={state} patch={patch} />}
        {step === 3 && <Step3Description state={state} patch={patch} />}
        {step === 4 && <Step4Budget state={state} patch={patch} />}
        {step === 5 && <Step5Timeline state={state} patch={patch} />}
        {step === 6 && <Step6Contact state={state} patch={patch} />}

        {submitError && (
          <p className="mt-6 rounded-md border border-danger/40 bg-danger/10 p-3 text-body-sm text-danger">
            {submitError}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border-subtle">
          <Button
            variant="ghost"
            onClick={back}
            disabled={step === 1 || submitting}
          >
            Back
          </Button>
          {step < STEPS.length ? (
            <Button onClick={next} disabled={!canContinue}>
              Continue
            </Button>
          ) : (
            <Button onClick={submit} disabled={submitting || !canSubmit}>
              {submitting ? "Sending…" : "Send Project Brief"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}