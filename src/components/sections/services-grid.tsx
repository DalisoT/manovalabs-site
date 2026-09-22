import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import { services } from "@/lib/config/services";
import { cn } from "@/lib/utils/cn";

export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <SectionHeading
          eyebrow="What we build"
          title="Eight capabilities. One engineering team."
          description="From the first website to a fully automated business platform — the work scales with where your business is going."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeUp key={s.slug} delay={i * 0.04}>
                <Link
                  href={`/services/${s.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface/50 p-6",
                    "transition-all duration-300 hover:border-accent/40 hover:bg-bg-elevated/60 hover:-translate-y-0.5"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border-subtle bg-bg-base text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-text-tertiary transition-all duration-300 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </div>

                  <h3 className="mt-6 text-h3 text-text-primary">
                    {s.shortTitle}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary text-pretty flex-1">
                    {s.tagline}
                  </p>

                  <div className="mt-6 pt-4 border-t border-border-subtle">
                    <p className="text-label uppercase tracking-wider text-text-tertiary">
                      {s.technologies.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-body-sm text-accent hover:text-accent-soft transition-colors"
          >
            See all services
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}