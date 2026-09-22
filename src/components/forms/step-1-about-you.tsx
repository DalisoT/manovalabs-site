"use client";

import { Input, Label } from "@/components/ui/input";
import type { WizardState } from "@/components/forms/project-wizard";

interface Props {
  state: WizardState;
  patch: (p: Partial<WizardState>) => void;
}

export function Step1AboutYou({ state, patch }: Props) {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-h3 text-text-primary">About you</h2>
        <p className="mt-1 text-body-sm text-text-tertiary">
          The basics so we know who we&apos;re talking to.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="w-name" required>Name</Label>
          <Input
            id="w-name"
            value={state.name}
            onChange={(e) => patch({ name: e.target.value })}
            autoComplete="name"
          />
        </div>
        <div>
          <Label htmlFor="w-company">Company / Organisation</Label>
          <Input
            id="w-company"
            value={state.company}
            onChange={(e) => patch({ company: e.target.value })}
            autoComplete="organization"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="w-email" required>Email</Label>
          <Input
            id="w-email"
            type="email"
            value={state.email}
            onChange={(e) => patch({ email: e.target.value })}
            autoComplete="email"
          />
        </div>
        <div>
          <Label htmlFor="w-phone">Phone</Label>
          <Input
            id="w-phone"
            type="tel"
            value={state.phone}
            onChange={(e) => patch({ phone: e.target.value })}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="w-whatsapp">WhatsApp</Label>
          <Input
            id="w-whatsapp"
            type="tel"
            value={state.whatsapp}
            onChange={(e) => patch({ whatsapp: e.target.value })}
            autoComplete="tel"
          />
        </div>
        <div>
          <Label htmlFor="w-location">Location</Label>
          <Input
            id="w-location"
            value={state.location}
            onChange={(e) => patch({ location: e.target.value })}
            autoComplete="address-level2"
            placeholder="City, country"
          />
        </div>
      </div>
    </div>
  );
}