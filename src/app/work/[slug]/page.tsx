import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animation/reveal";
import { getProject, listProjects } from "@/lib/queries/projects";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await listProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const allProjects = await listProjects();
  const others = allProjects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container>
          <FadeUp>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-body-sm text-text-tertiary hover:text-text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All work
            </Link>

            <p className="text-label uppercase tracking-[0.18em] text-accent">
              {project.category}
            </p>
            <h1 className="mt-3 text-display-1 text-text-primary text-balance">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-body-lg text-text-secondary text-pretty">
              {project.shortDescription}
            </p>
          </FadeUp>
        </Container>
      </section>

      <section className="pb-12">
        <Container>
          <FadeUp delay={0.1}>
            <div className="aspect-[16/8] relative rounded-lg overflow-hidden border border-border-subtle bg-gradient-to-br from-bg-elevated to-bg-base">
              <ProjectHero slug={project.slug} />
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="py-16 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-16">
              <SectionBlock title="Overview">{project.description}</SectionBlock>
              <SectionBlock title="Challenge">{project.challenge}</SectionBlock>
              <SectionBlock title="Approach">{project.approach}</SectionBlock>
              <SectionBlock title="Solution">{project.solution}</SectionBlock>
              <SectionBlock title="Outcome">{project.outcome}</SectionBlock>
            </div>
            <aside className="space-y-8">
              <div>
                <p className="text-label uppercase tracking-wider text-text-tertiary mb-4">
                  Technology
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="outline">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-3">
                  Have a similar project?
                </p>
                <p className="text-body-sm text-text-secondary mb-4">
                  Tell us what you&apos;re working on and we&apos;ll come back
                  with a clear next step.
                </p>
                <Button asChild href="/start-project" fullWidth>
                  Start a conversation
                </Button>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-border-subtle bg-bg-surface/30">
          <Container>
            <p className="text-label uppercase tracking-[0.18em] text-text-tertiary mb-6">
              More work
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/work/${o.slug}`}
                  className="group flex flex-col rounded-lg border border-border-subtle bg-bg-base/60 p-6 hover:border-accent/40 transition-colors"
                >
                  <p className="text-label uppercase tracking-wider text-accent">
                    {o.category}
                  </p>
                  <h3 className="mt-3 text-h3 text-text-primary group-hover:text-accent transition-colors">
                    {o.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-text-secondary text-pretty flex-1">
                    {o.shortDescription}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-body-sm text-accent">
                    View case study
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-label uppercase tracking-[0.18em] text-accent mb-3">
        {title}
      </h3>
      <p className="text-body-lg text-text-primary text-pretty">{children}</p>
    </div>
  );
}

function ProjectHero({ slug }: { slug: string }) {
  return (
    <svg
      viewBox="0 0 320 160"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <pattern id={`hero-${slug}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0v32" fill="none" stroke="var(--border-strong)" strokeWidth="0.5" opacity="0.6" />
        </pattern>
        <radialGradient id={`grad-${slug}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="320" height="160" fill={`url(#hero-${slug})`} />
      <rect width="320" height="160" fill={`url(#grad-${slug})`} />
      <rect width="320" height="160" fill={`url(#hero-${slug})`} />
      {/* Mock app window */}
      <rect x="40" y="30" width="240" height="100" rx="8" fill="var(--bg-elevated)" stroke="var(--border-strong)" strokeWidth="1" />
      <rect x="48" y="40" width="60" height="6" rx="3" fill="var(--accent)" opacity="0.7" />
      <rect x="48" y="52" width="120" height="4" rx="2" fill="var(--text-tertiary)" opacity="0.5" />
      <rect x="48" y="72" width="220" height="6" rx="3" fill="var(--border-strong)" />
      <rect x="48" y="84" width="180" height="6" rx="3" fill="var(--border-strong)" />
      <rect x="48" y="96" width="200" height="6" rx="3" fill="var(--border-strong)" />
      <rect x="48" y="108" width="120" height="14" rx="3" fill="var(--accent)" opacity="0.5" />
    </svg>
  );
}