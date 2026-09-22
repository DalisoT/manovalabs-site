import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeUp } from "@/components/animation/reveal";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/config/projects";

export function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-14">
          <SectionHeading
            eyebrow="Selected work"
            title="Real platforms. Real problems."
            description="Two projects that show how we approach education and financial technology — without inventing claims."
          />
          <Link
            href="/work"
            className="hidden lg:inline-flex items-center gap-2 text-body-sm text-accent hover:text-accent-soft transition-colors"
          >
            See all work
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {featured.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.1}>
              <Link
                href={`/work/${p.slug}`}
                className="group block rounded-lg border border-border-subtle bg-bg-surface/40 overflow-hidden transition-all duration-300 hover:border-accent/40 hover:bg-bg-elevated/60"
              >
                <div className="aspect-[16/10] relative bg-gradient-to-br from-bg-elevated to-bg-base overflow-hidden">
                  <ProjectThumb title={p.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent" />
                  <Badge
                    variant="accent"
                    className="absolute top-4 left-4 backdrop-blur-sm"
                  >
                    Featured
                  </Badge>
                </div>
                <div className="p-6 lg:p-8">
                  <p className="text-label uppercase tracking-wider text-accent">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-display-3 text-text-primary group-hover:text-accent transition-colors">
                    {p.title}
                  </h3>
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
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <div className="mt-10 lg:hidden text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-body-sm text-accent hover:text-accent-soft transition-colors"
          >
            See all work
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Container>
    </section>
  );
}

function ProjectThumb({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`bg-${title}`} x1="0" y1="0" x2="320" y2="200">
            <stop offset="0" stopColor="#1a1d24" />
            <stop offset="1" stopColor="#12141a" />
          </linearGradient>
          <pattern
            id={`p-${title}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="var(--border-strong)" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="320" height="200" fill={`url(#bg-${title})`} />
        <rect width="320" height="200" fill={`url(#p-${title})`} />
        {/* Abstract geometry */}
        <circle cx="80" cy="60" r="40" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />
        <circle cx="80" cy="60" r="22" fill="var(--accent)" opacity="0.15" />
        <rect x="220" y="40" width="60" height="60" rx="6" fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="160" x2="280" y2="160" stroke="var(--border-strong)" strokeWidth="0.5" />
        <text x="160" y="140" textAnchor="middle" fill="var(--text-tertiary)" fontSize="12" fontFamily="ui-monospace" letterSpacing="0.1em">
          {title.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}