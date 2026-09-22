import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import { Badge } from "@/components/ui/badge";
import { listProjects } from "@/lib/queries/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from MANOVA LABS — real platforms built around real business problems.",
};

export default async function WorkIndexPage() {
  const allProjects = await listProjects();
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24 lg:pb-16">
        <Container>
          <SectionHeading
            eyebrow="Work"
            title="Selected projects."
            description="Real platforms built around real problems. We only publish work we can stand behind."
          />
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {allProjects.map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group block rounded-lg border border-border-subtle bg-bg-surface/40 overflow-hidden transition-all hover:border-accent/40 hover:bg-bg-elevated/60"
                >
                  <div className="aspect-[16/9] relative bg-gradient-to-br from-bg-elevated to-bg-base">
                    <ProjectVisual title={p.title} confidential={p.confidential} />
                    {p.confidential && (
                      <Badge
                        variant="muted"
                        className="absolute top-4 left-4 backdrop-blur-sm"
                      >
                        Confidential
                      </Badge>
                    )}
                    {p.featured && !p.confidential && (
                      <Badge
                        variant="accent"
                        className="absolute top-4 left-4 backdrop-blur-sm"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="p-6 lg:p-8">
                    <p className="text-label uppercase tracking-wider text-accent">
                      {p.category}
                    </p>
                    <h2 className="mt-3 text-display-3 text-text-primary group-hover:text-accent transition-colors">
                      {p.title}
                    </h2>
                    <p className="mt-3 text-body text-text-secondary text-pretty">
                      {p.shortDescription}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.technologies.slice(0, 4).map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-body-sm text-accent">
                      View case study
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

function ProjectVisual({
  title,
  confidential,
}: {
  title: string;
  confidential?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={`w-${title}`} x1="0" y1="0" x2="320" y2="180">
          <stop offset="0" stopColor="#1a1d24" />
          <stop offset="1" stopColor="#12141a" />
        </linearGradient>
        <pattern id={`wp-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="var(--border-strong)" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="180" fill={`url(#w-${title})`} />
      <rect width="320" height="180" fill={`url(#wp-${title})`} />
      <circle cx="80" cy="60" r="40" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
      <circle cx="80" cy="60" r="22" fill="var(--accent)" opacity="0.12" />
      <rect x="220" y="40" width="60" height="60" rx="6" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
      <text x="160" y="125" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="ui-monospace" letterSpacing="0.1em">
        {confidential ? "REDACTED" : title.toUpperCase()}
      </text>
    </svg>
  );
}