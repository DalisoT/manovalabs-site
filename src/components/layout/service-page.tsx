import type { ReactNode } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/animation/reveal";
import { FadeIn } from "@/components/animation/reveal";
import { type ServiceDefinition } from "@/lib/config/services";
import { allServices } from "@/lib/config/services";

export interface ServicePageProps {
  service: ServiceDefinition;
  children?: ReactNode;
}

/**
 * Shared template used by every /services/[slug] page. Centralises hero,
 * benefits, use cases, technology and CTA so the seven pages stay
 * consistent without per-page duplication.
 */
export function ServicePage({ service, children }: ServicePageProps) {
  const Icon = service.icon;
  const others = allServices.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
        <div aria-hidden className="absolute inset-0 grid-bg opacity-30" />
        <Container className="relative">
          <FadeIn>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-body-sm text-text-tertiary hover:text-text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All services
            </Link>
          </FadeIn>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-border-subtle bg-bg-surface text-accent">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-label uppercase tracking-[0.18em] text-text-tertiary">
                    Service
                  </span>
                </div>

                <h1 className="mt-6 text-display-2 text-text-primary text-balance">
                  {service.title}
                </h1>
                <p className="mt-5 text-body-lg text-text-secondary text-pretty max-w-2xl">
                  {service.summary}
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <Button asChild href="/start-project" size="lg">
                    Start a Project
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button asChild href="/contact" variant="outline" size="lg">
                    Request a Quote
                  </Button>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <div className="rounded-lg border border-border-subtle bg-bg-surface/60 p-6 lg:p-8">
                <p className="text-label uppercase tracking-wider text-accent mb-4">
                  Tagline
                </p>
                <p className="text-h3 text-text-primary text-pretty">
                  {service.tagline}
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </section>

      {children}

      {/* Benefits */}
      <section className="py-20 lg:py-24 border-t border-border-subtle">
        <Container>
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            What you get
          </p>
          <h2 className="text-display-3 text-text-primary text-balance max-w-2xl">
            Practical benefits, not vague promises.
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.benefits.map((b) => (
              <li
                key={b}
                className="rounded-md border border-border-subtle bg-bg-surface/40 p-5 text-body text-text-primary flex gap-3"
              >
                <span
                  aria-hidden
                  className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0"
                />
                {b}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Use cases */}
      <section className="py-20 lg:py-24 border-t border-border-subtle bg-bg-surface/30">
        <Container>
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            Where it fits
          </p>
          <h2 className="text-display-3 text-text-primary text-balance max-w-2xl">
            Common ways teams use this service.
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {service.useCases.map((uc) => (
              <Badge key={uc} variant="outline" className="text-body-sm font-normal">
                {uc}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-20 lg:py-24 border-t border-border-subtle">
        <Container>
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            Technology
          </p>
          <h2 className="text-display-3 text-text-primary text-balance max-w-2xl">
            Tools we reach for.
          </h2>
          <p className="mt-4 max-w-2xl text-body text-text-secondary text-pretty">
            The exact stack is chosen to fit your context — these are the tools
            we reach for first.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {service.technologies.map((t) => (
              <Badge key={t} variant="muted" className="text-body-sm font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 border-t border-border-subtle">
        <Container className="text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-display-3 text-text-primary text-balance">
              Have something similar in mind?
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary text-pretty">
              Start a project brief and we&apos;ll review it before getting back
              to you.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild href="/start-project" size="lg">
                Start a Project
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button asChild href="/contact" size="lg" variant="outline">
                Talk to MANOVA
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="py-16 lg:py-20 border-t border-border-subtle bg-bg-surface/30">
        <Container>
          <p className="text-label uppercase tracking-[0.18em] text-text-tertiary mb-6">
            Related services
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((s) => {
              const OtherIcon = s.icon;
              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex items-start gap-3 rounded-md border border-border-subtle bg-bg-base/60 p-4 hover:border-accent/40 transition-colors"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-subtle bg-bg-surface text-accent">
                    <OtherIcon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="flex-1">
                    <span className="block text-body-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                      {s.shortTitle}
                    </span>
                    <span className="block text-body-sm text-text-tertiary mt-0.5">
                      {s.tagline}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}