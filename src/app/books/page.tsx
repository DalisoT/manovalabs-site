import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animation/reveal";
import { getPublishedBooks, books } from "@/lib/config/books";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books and long-form writing from Richard Tembo — practical guides for Zambian businesses, founders and developers.",
};

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  essay: "Essay",
  manual: "Manual",
  notes: "Notes",
  whitepaper: "Whitepaper",
};

export default function BooksIndexPage() {
  const published = getPublishedBooks();
  const inProgress = books.filter((b) => b.status === "in-progress");
  const drafts = books.filter((b) => b.status === "draft");

  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container>
          <SectionHeading
            eyebrow="Books"
            title="Long-form writing, when the idea is worth more than a blog post."
            description="Practical guides, essays and notes from real work with real businesses. Written for Zambian contexts first."
          />
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          {published.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {published.map((book, i) => (
                <FadeUp key={book.slug} delay={i * 0.05}>
                  <BookCard book={book} />
                </FadeUp>
              ))}
            </div>
          ) : (
            <EmptyState
              heading="No published books yet."
              body="I'm writing. The first one lands when it's ready — not before."
              drafts={drafts.length}
              inProgress={inProgress.length}
            />
          )}

          {inProgress.length > 0 && (
            <div className="mt-16">
              <p className="text-label uppercase tracking-[0.18em] text-text-tertiary mb-4">
                In progress
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {inProgress.map((b) => (
                  <li
                    key={b.slug}
                    className="rounded-md border border-border-subtle bg-bg-surface/40 p-4"
                  >
                    <p className="text-body font-medium text-text-primary">
                      {b.title}
                    </p>
                    {b.subtitle && (
                      <p className="text-body-sm text-text-tertiary mt-1">{b.subtitle}</p>
                    )}
                    <p className="text-label uppercase tracking-wider text-accent mt-3">
                      Writing
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}

function BookCard({ book }: { book: (typeof books)[number] }) {
  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block rounded-lg border border-border-subtle bg-bg-surface/40 overflow-hidden transition-all hover:border-accent/40 hover:bg-bg-elevated/60"
    >
      <div className="aspect-[3/4] relative bg-gradient-to-br from-bg-elevated to-bg-base overflow-hidden flex items-center justify-center">
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={`${book.title} cover`}
            className="h-full w-full object-cover"
          />
        ) : (
          <PlaceholderCover title={book.title} />
        )}
        <Badge variant="accent" className="absolute top-4 left-4 backdrop-blur-sm">
          {CATEGORY_LABELS[book.category] ?? book.category}
        </Badge>
      </div>
      <div className="p-6">
        <h3 className="text-h3 text-text-primary group-hover:text-accent transition-colors">
          {book.title}
        </h3>
        {book.subtitle && (
          <p className="mt-1 text-body-sm text-text-tertiary">
            {book.subtitle}
          </p>
        )}
        <p className="mt-3 text-body text-text-secondary text-pretty">
          {book.summary}
        </p>
        <p className="mt-6 inline-flex items-center gap-2 text-body-sm text-accent">
          Read more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </p>
      </div>
    </Link>
  );
}

function PlaceholderCover({ title }: { title: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6">
      <svg
        viewBox="0 0 240 320"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id={`cov-${title}`} x1="0" y1="0" x2="240" y2="320" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#1B9C7A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#5EE5B8" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect width="240" height="320" fill={`url(#cov-${title})`} />
      </svg>
      <div className="relative text-center">
        <BookOpen className="h-10 w-10 text-accent mx-auto mb-4" aria-hidden />
        <p className="text-label uppercase tracking-[0.18em] text-text-tertiary">
          The Richard Standard
        </p>
        <p className="mt-3 text-body font-semibold text-text-primary max-w-[200px] mx-auto">
          {title}
        </p>
      </div>
    </div>
  );
}

function EmptyState({
  heading,
  body,
  drafts,
  inProgress,
}: {
  heading: string;
  body: string;
  drafts: number;
  inProgress: number;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border-subtle bg-bg-surface/30 p-10 lg:p-16 text-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bg-elevated border border-border-subtle mb-6">
        <BookOpen className="h-6 w-6 text-accent" aria-hidden />
      </span>
      <h2 className="text-display-3 text-text-primary text-balance">
        {heading}
      </h2>
      <p className="mt-4 text-body-lg text-text-secondary text-pretty max-w-xl mx-auto">
        {body}
      </p>
      {(drafts > 0 || inProgress > 0) && (
        <p className="mt-4 text-body-sm text-text-tertiary">
          {inProgress > 0 && `${inProgress} in progress`}
          {inProgress > 0 && drafts > 0 && " · "}
          {drafts > 0 && `${drafts} in draft`}
        </p>
      )}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild href="/start-project">
          Get notified
        </Button>
        <Button asChild variant="outline" href="/services">
          See services instead
        </Button>
      </div>
    </div>
  );
}