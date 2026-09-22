"use client";

import { Textarea, Label, FieldHint } from "@/components/ui/input";
import type { WizardState } from "@/components/forms/project-wizard";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

export function Step3Description({ state, patch }: Props) {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">Tell us about the project</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          The more honest the picture, the better the response.
        </p>
      </header>

      <div>
        <Label htmlFor="w-description">Project description</Label>
        <Textarea
          id="w-description"
          rows={4}
          value={state.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="What are you trying to build?"
        />
      </div>

      <div>
        <Label htmlFor="w-problem">Business problem</Label>
        <Textarea
          id="w-problem"
          rows={4}
          value={state.businessProblem}
          onChange={(e) => patch({ businessProblem: e.target.value })}
          placeholder="What's not working today that this project should fix?"
        />
      </div>

      <div>
        <Label htmlFor="w-outcome">Desired outcome</Label>
        <Textarea
          id="w-outcome"
          rows={3}
          value={state.desiredOutcome}
          onChange={(e) => patch({ desiredOutcome: e.target.value })}
          placeholder="What does success look like?"
        />
      </div>

      <div>
        <Label htmlFor="w-existing">Existing website / system</Label>
        <Textarea
          id="w-existing"
          rows={3}
          value={state.existingSystem}
          onChange={(e) => patch({ existingSystem: e.target.value })}
          placeholder="Anything we should know about what already exists?"
        />
        <FieldHint>Optional, but helps us start from reality.</FieldHint>
      </div>
    </div>
  );
}