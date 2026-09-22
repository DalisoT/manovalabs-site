import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section className="py-24 lg:py-32 border-t border-border-subtle relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-fade opacity-50"
      />
      <Container className="relative">
        <div className="rounded-2xl border border-border-subtle bg-bg-surface/60 p-10 lg:p-16 text-center max-w-4xl mx-auto">
          <span className="inline-block text-label uppercase tracking-[0.18em] text-accent mb-4">
            Have a project in mind?
          </span>
          <h2 className="text-display-2 text-text-primary text-balance">
            Let&apos;s build something that works for your business.
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-body-lg text-text-secondary text-pretty">
            Tell us what you&apos;re trying to do. We&apos;ll review it and get
            back to you with a clear next step.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild href="/start-project" size="lg">
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button asChild size="lg" variant="outline" href="/contact">
              Request a Quote
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}