import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import {
  Boxes,
  Zap,
  Brain,
  Cog,
  Layers,
  MapPin,
} from "lucide-react";

const reasons = [
  {
    icon: Boxes,
    title: "Custom, not template",
    body: "Every system is built around your workflow — not adapted from a generic template.",
  },
  {
    icon: Layers,
    title: "Modern stack",
    body: "TypeScript, server components, row-level security, proper testing. Boring where it should be, modern where it matters.",
  },
  {
    icon: Brain,
    title: "AI-ready by default",
    body: "We design data, content and access so AI features can be added when they make sense — not retrofitted.",
  },
  {
    icon: Cog,
    title: "Automation built in",
    body: "Notifications, approvals and reporting are part of the system from day one, not bolt-ons.",
  },
  {
    icon: Zap,
    title: "Performance budgeted",
    body: "Fast pages, fast interactions, small bundles. Performance treated as a feature, not a polish step.",
  },
  {
    icon: MapPin,
    title: "Zambia-focused context",
    body: "Payment options, network realities and business patterns considered in the design — not discovered in QA.",
  },
];

export function WhyManova() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="Why MANOVA"
          title="Modern technology, locally grounded."
          description="We bring serious engineering without the overhead of a big consultancy."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <FadeUp key={r.title} delay={i * 0.05}>
                <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6 h-full">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-bg-base text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 text-h4 text-text-primary">{r.title}</h3>
                  <p className="mt-2 text-body-sm text-text-secondary text-pretty">
                    {r.body}
                  </p>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}