import { Hammer, Workflow, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";

const pillars = [
  {
    n: "01",
    icon: Hammer,
    title: "Build",
    description:
      "We design and develop websites, applications and digital systems around the way your business operates — not the other way around.",
    detail: "Websites · Web apps · Dashboards · E-commerce · Custom platforms",
  },
  {
    n: "02",
    icon: Workflow,
    title: "Automate",
    description:
      "We connect tools, structure workflows and apply AI where it removes real work — so your team focuses on the things that need a human.",
    detail: "Lead capture · Approvals · Notifications · Document processing · AI workflows",
  },
  {
    n: "03",
    icon: Sparkles,
    title: "Evolve",
    description:
      "Systems aren't finished at launch. We iterate, improve and extend as your business grows — without rebuilding from scratch.",
    detail: "Optimisation · Feature growth · Maintenance · Performance · Security",
  },
];

export function Pillars() {
  return (
    <section className="py-24 lg:py-32 border-t border-border-subtle bg-bg-surface/30">
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="Build. Automate. Evolve."
          description="The same philosophy that runs MANOVA LABS — applied to every engagement."
          align="center"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeUp key={p.n} delay={i * 0.1}>
                <div className="relative rounded-lg border border-border-subtle bg-bg-base/60 p-8 h-full overflow-hidden">
                  <div className="absolute -top-px -right-px text-[120px] font-semibold text-bg-elevated leading-none select-none">
                    {p.n}
                  </div>
                  <div className="relative">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle bg-bg-surface text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-6 text-display-3 text-text-primary">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-body text-text-secondary text-pretty">
                      {p.description}
                    </p>
                    <p className="mt-6 pt-4 border-t border-border-subtle text-label uppercase tracking-wider text-text-tertiary">
                      {p.detail}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </section>
  );
}