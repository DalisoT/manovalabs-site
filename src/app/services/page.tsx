import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import { allServices } from "@/lib/config/services";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, web applications, AI integration, business automation, e-commerce, business systems and integrations — built by MANOVA LABS for businesses across Zambia.",
};

export default function ServicesIndexPage() {
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Eight capabilities. One team. Built around your business."
            description="Each service is delivered by the same small engineering team — so the work stays consistent from the first conversation to the final release."
          />
          <div className="mt-10">
            <Button asChild href="/start-project" size="lg">
              Start a Project
            </Button>
          </div>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s, i) => {
              const Icon = s.icon;
              return (
                <FadeUp key={s.slug} delay={i * 0.04}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex flex-col h-full rounded-lg border border-border-subtle bg-bg-surface/40 p-6 hover:border-accent/40 hover:bg-bg-elevated/60 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle bg-bg-base text-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-text-tertiary group-hover:text-accent transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                    <h2 className="mt-6 text-h3 text-text-primary">
                      {s.title}
                    </h2>
                    <p className="mt-2 text-body-sm text-text-secondary text-pretty flex-1">
                      {s.tagline}
                    </p>
                    <p className="mt-6 pt-4 border-t border-border-subtle text-label uppercase tracking-wider text-text-tertiary">
                      {s.technologies.slice(0, 3).join(" · ")}
                    </p>
                  </Link>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}