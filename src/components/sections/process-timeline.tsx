import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import { Compass, ClipboardList, Palette, Code2, ShieldCheck, Rocket } from "lucide-react";

const stages = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    description:
      "We learn how your business actually runs. Goals, constraints, customers, real workflows — not just the brief.",
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Plan",
    description:
      "Scope, sequence, technology choices and tradeoffs documented before any code is written.",
  },
  {
    n: "03",
    icon: Palette,
    title: "Design",
    description:
      "Interfaces and flows designed around the user — clear information, low friction, brand-consistent.",
  },
  {
    n: "04",
    icon: Code2,
    title: "Build",
    description:
      "Developed in small, reviewable increments. Integrations wired in as we go — no big-bang reveal.",
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Test",
    description:
      "Functional, responsive, accessibility and security checks before anything is shown to a real user.",
  },
  {
    n: "06",
    icon: Rocket,
    title: "Launch & Evolve",
    description:
      "Deployed, monitored and improved over time. A system is never really finished.",
  },
];

export function ProcessTimeline() {
  return (
    <section className="py-24 lg:py-32 border-t border-border-subtle bg-bg-surface/30">
      <Container>
        <SectionHeading
          eyebrow="Our process"
          title="Six stages. One philosophy."
          description="Build → Automate → Evolve runs through everything we do."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.n} delay={i * 0.06}>
                <div className="relative rounded-lg border border-border-subtle bg-bg-base/60 p-6 h-full">
                  <div className="flex items-center gap-3">
                    <span className="text-label uppercase tracking-wider text-accent font-mono">
                      {s.n}
                    </span>
                    <span className="h-px flex-1 bg-border-subtle" />
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                  </div>
                  <h3 className="mt-5 text-h3 text-text-primary">{s.title}</h3>
                  <p className="mt-2 text-body-sm text-text-secondary text-pretty">
                    {s.description}
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