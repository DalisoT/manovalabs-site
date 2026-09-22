import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "MANOVA LABS is a Zambia-based technology company building modern digital systems for businesses across Zambia.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="About"
            title="MANOVA LABS builds digital systems that help businesses operate, communicate and grow."
            description="A Zambia-based technology company working across web, software, AI, automation, data and integrations."
          />
        </Container>
      </section>

      <section className="py-12 lg:py-16 border-t border-border-subtle">
        <Container className="max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6 text-body-lg text-text-secondary text-pretty">
              <p>
                MANOVA LABS exists because too many businesses still run on
                tools that don&apos;t fit how they actually work. We design
                and build the websites, web applications, AI features and
                business systems that close that gap.
              </p>
              <p>
                Every engagement starts with the business problem — not the
                technology. We use modern stacks (TypeScript, server
                components, row-level security, AI integration) where they
                serve the outcome, and boring tools where boring is the right
                answer.
              </p>
              <p>
                We work with small businesses, established companies,
                financial and lending institutions, schools, churches,
                clinics, hotels, restaurants, online businesses, individuals,
                NGOs and startups across {siteConfig.location}.
              </p>
            </div>
            <aside className="space-y-6">
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-3">
                  Operating from
                </p>
                <p className="text-h4 text-text-primary">{siteConfig.location}</p>
                <p className="mt-2 text-body-sm text-text-tertiary">
                  Working with clients locally and internationally.
                </p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-3">
                  Philosophy
                </p>
                <p className="text-body text-text-primary">
                  Build. Automate. Evolve.
                </p>
                <p className="mt-2 text-body-sm text-text-tertiary">
                  Every system we deliver is designed to be built cleanly,
                  automated where it makes sense, and evolved as the business
                  changes.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-subtle">
        <Container className="max-w-4xl">
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            Founder
          </p>
          <h2 className="text-display-3 text-text-primary text-balance">
            Richard Tembo
          </h2>
          <p className="mt-2 text-body-lg text-text-secondary">
            Founder &amp; Technology Developer
          </p>
          <p className="mt-8 text-body-lg text-text-secondary text-pretty">
            Richard leads engineering at MANOVA LABS. He works directly on
            every engagement — from the first scoping conversation through
            architecture, implementation and ongoing iteration. MANOVA LABS
            is intentionally founder-led so the work stays personal and the
            decisions stay close to the build.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild href="/start-project">
              Start a project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button asChild variant="outline" href="/contact">
              Talk to MANOVA
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-subtle bg-bg-surface/30">
        <Container className="max-w-4xl">
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            What we don&apos;t do
          </p>
          <h2 className="text-display-3 text-text-primary text-balance">
            We&apos;d rather be honest than impressive.
          </h2>
          <ul className="mt-10 space-y-4 text-body text-text-secondary">
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                We don&apos;t fabricate clients, testimonials, awards or
                case-study statistics. Every claim on this site is real.
              </span>
            </li>
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                We don&apos;t promise prices or delivery dates up front.
                Every project is scoped before any commitment is made.
              </span>
            </li>
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                We don&apos;t pretend AI does more than it does. When AI
                helps, we say so. When it doesn&apos;t, we recommend
                something simpler.
              </span>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
}