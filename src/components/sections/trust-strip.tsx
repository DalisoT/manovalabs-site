import { Container } from "@/components/layout/container";

/**
 * Positioning strip that sits directly under the hero. Establishes the
 * "serious, modern, Zambian" stance without naming fake clients or claims.
 */
export function TrustStrip() {
  return (
    <section className="border-y border-border-subtle bg-bg-surface/30">
      <Container className="py-10 lg:py-12">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto]">
          <p className="text-body-lg text-text-primary max-w-3xl text-pretty">
            Digital solutions built around the way your business
            <span className="text-accent"> actually works.</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-label uppercase tracking-[0.18em] text-text-tertiary">
            <span>Web</span>
            <Dot />
            <span>AI</span>
            <Dot />
            <span>Automation</span>
            <Dot />
            <span>Systems</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Dot() {
  return <span aria-hidden className="inline-block h-1 w-1 rounded-full bg-border-strong" />;
}