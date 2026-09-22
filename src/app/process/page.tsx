import type { Metadata } from "next";
import { Compass, ClipboardList, Palette, Code2, ShieldCheck, Rocket } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animation/reveal";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How MANOVA LABS works: six stages from discovery to launch and evolution.",
};

const stages = [
  {
    n: "01",
    icon: Compass,
    title: "Discover",
    description:
      "We learn how your business actually runs. Goals, constraints, customers, real workflows — not just the brief.",
    detail: [
      "Stakeholder conversations",
      "Workflow mapping",
      "Constraints and success criteria",
    ],
  },
  {
    n: "02",
    icon: ClipboardList,
    title: "Plan",
    description:
      "Scope, sequence, technology choices and tradeoffs documented before any code is written.",
    detail: [
      "Architecture overview",
      "Milestones and deliverables",
      "Risk and dependency review",
    ],
  },
  {
    n: "03",
    icon: Palette,
    title: "Design",
    description:
      "Interfaces and flows designed around the user — clear information, low friction, brand-consistent.",
    detail: [
      "Wireframes and flows",
      "Visual design system",
      "Component library",
    ],
  },
  {
    n: "04",
    icon: Code2,
    title: "Build",
    description:
      "Developed in small, reviewable increments. Integrations wired in as we go — no big-bang reveal.",
    detail: [
      "Incremental releases",
      "Continuous review",
      "Integrations and data flows",
    ],
  },
  {
    n: "05",
    icon: ShieldCheck,
    title: "Test",
    description:
      "Functional, responsive, accessibility and security checks before anything is shown to a real user.",
    detail: [
      "End-to-end testing",
      "Performance budgets",
      "Security review",
    ],
  },
  {
    n: "06",
    icon: Rocket,
    title: "Launch & Evolve",
    description:
      "Deployed, monitored and improved over time. A system is never really finished.",
    detail: [
      "Phased deployment",
      "Monitoring and feedback",
      "Continuous improvement",
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="Six stages. Built around Build. Automate. Evolve."
            description="A predictable path from idea to live system — without the theatre."
            align="center"
          />
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <ol className="grid gap-6 lg:grid-cols-2">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.n} delay={i * 0.05}>
                  <li className="relative h-full rounded-lg border border-border-subtle bg-bg-surface/40 p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border-subtle bg-bg-base text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="text-display-3 font-mono text-bg-elevated">
                        {s.n}
                      </span>
                    </div>
                    <h2 className="mt-8 text-display-3 text-text-primary">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-body text-text-secondary text-pretty">
                      {s.description}
                    </p>
                    <ul className="mt-6 pt-4 border-t border-border-subtle space-y-2">
                      {s.detail.map((d) => (
                        <li
                          key={d}
                          className="text-body-sm text-text-tertiary flex gap-2"
                        >
                          <span
                            aria-hidden
                            className="mt-2 inline-block h-1 w-1 rounded-full bg-accent shrink-0"
                          />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </li>
                </FadeUp>
              );
            })}
          </ol>
        </Container>
      </section>

      <section className="py-20 lg:py-28 border-t border-border-subtle">
        <Container className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-display-3 text-text-primary text-balance">
              Ready to start the discovery?
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary text-pretty">
              Tell us what you&apos;re working on. We&apos;ll come back with a
              clear next step.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" href="/start-project">
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button asChild size="lg" variant="outline" href="/contact">
                Talk to MANOVA
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}