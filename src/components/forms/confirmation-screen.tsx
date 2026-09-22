"use client";

import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmationScreen() {
  return (
    <div className="rounded-lg border border-accent/30 bg-accent/5 p-10 lg:p-14 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent mb-6">
        <CheckCircle2 className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="text-display-3 text-text-primary text-balance">
        Project brief received.
      </h2>
      <p className="mt-4 max-w-xl mx-auto text-body-lg text-text-secondary text-pretty">
        Thank you for telling us about your project. MANOVA LABS will review
        the information and get back to you through your selected contact
        channel.
      </p>
      <p className="mt-2 text-body-sm text-text-tertiary">
        Most briefs get a response within one business day.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild href="/work">
          See our work
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Button asChild href="/" variant="outline">
          Back to home
        </Button>
      </div>
    </div>
  );
}