import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animation/reveal";
import { allBooks, getBookBySlug } from "@/lib/config/books";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return allBooks.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const book = getBookBySlug(params.slug);
  if (!book) return { title: "Book not found" };
  return {
    title: book.title,
    description: book.summary,
  };
}

const CATEGORY_LABELS: Record<string, string> = {
  guide: "Guide",
  essay: "Essay",
  manual: "Manual",
  notes: "Notes",
  whitepaper: "Whitepaper",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  "in-progress": "In progress",
  published: "Published",
};

export default function BookDetailPage({ params }: PageProps) {
  const book = getBookBySlug(params.slug);
  if (!book) notFound();

  const others = allBooks.filter((b) => b.slug !== book.slug).slice(0, 2);

  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container>
          <FadeUp>
            <Link
              href="/books"
              className="inline-flex items-center gap-2 text-body-sm text-text-tertiary hover:text-text-primary transition-colors mb-10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              All books
            </Link>

            <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
              <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-border-subtle bg-gradient-to-br from-bg-elevated to-bg-base flex items-center justify-center">
                {book.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.cover}
                    alt={`${book.title} cover`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6">
                    <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" aria-hidden />
                    <p className="text-label uppercase tracking-[0.18em] text-text-tertiary">
                      The Richard Standard
                    </p>
                    <p className="mt-3 text-body font-semibold text-text-primary">
                      {book.title}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="accent">
                    {CATEGORY_LABELS[book.category] ?? book.category}
                  </Badge>
                  <Badge
                    variant={
                      book.status === "published"
                        ? "default"
                        : book.status === "in-progress"
                        ? "outline"
                        : "muted"
                    }
                  >
                    {STATUS_LABELS[book.status] ?? book.status}
                  </Badge>
                </div>

                <h1 className="text-display-2 text-text-primary text-balance">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="mt-3 text-body-lg text-text-tertiary text-pretty">
                    {book.subtitle}
                  </p>
                )}
                <p className="mt-5 text-body-lg text-text-secondary text-pretty">
                  {book.description}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  {book.status === "published" ? (
                    book.buyLinks && book.buyLinks.length > 0 ? (
                      book.buyLinks.map((link) => (
                        <Button
                          key={link.href}
                          asChild
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noreferrer" : undefined}
                        >
                          {link.label}
                          <ArrowRight className="h-4 w-4" aria-hidden />
                        </Button>
                      ))
                    ) : (
                      <Button asChild href="/start-project">
                        Get a copy
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </Button>
                    )
                  ) : (
                    <Button asChild href="/start-project">
                      Get notified when it&apos;s ready
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </section>

      <section className="py-16 lg:py-20 border-t border-border-subtle">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-h2 text-text-primary mb-3">About this book</h2>
              <p className="text-body-lg text-text-secondary text-pretty">
                {book.description}
              </p>

              {book.topics.length > 0 && (
                <div className="mt-8">
                  <p className="text-label uppercase tracking-wider text-text-tertiary mb-3">
                    Topics covered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {book.topics.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {book.audience && (
                <div className="mt-8">
                  <p className="text-label uppercase tracking-wider text-text-tertiary mb-2">
                    Who it&apos;s for
                  </p>
                  <p className="text-body text-text-secondary text-pretty">
                    {book.audience}
                  </p>
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-4">
                  At a glance
                </p>
                <dl className="space-y-3 text-body-sm">
                  {book.lengthMinutes && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-tertiary">Length</dt>
                      <dd className="text-text-primary text-right">
                        ~{book.lengthMinutes} min read
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-text-tertiary">Format</dt>
                    <dd className="text-text-primary text-right">
                      {book.formats.map((f) =>
                        f === "ebook" ? "Ebook" : f === "pdf" ? "PDF" : "Print"
                      ).join(" · ")}
                    </dd>
                  </div>
                  {book.publishedAt && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-tertiary">Published</dt>
                      <dd className="text-text-primary text-right">
                        {new Date(book.publishedAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "long",
                        })}
                      </dd>
                    </div>
                  )}
                  {book.price?.ebook !== undefined && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-tertiary">Ebook</dt>
                      <dd className="text-text-primary text-right">
                        {book.price.currency} {book.price.ebook}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {others.length > 0 && (
        <section className="py-16 lg:py-20 border-t border-border-subtle bg-bg-surface/30">
          <Container>
            <p className="text-label uppercase tracking-[0.18em] text-text-tertiary mb-6">
              More writing
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/books/${o.slug}`}
                  className="group flex flex-col rounded-lg border border-border-subtle bg-bg-base/60 p-6 hover:border-accent/40 transition-colors"
                >
                  <p className="text-label uppercase tracking-wider text-accent">
                    {CATEGORY_LABELS[o.category] ?? o.category}
                  </p>
                  <h3 className="mt-3 text-h3 text-text-primary group-hover:text-accent transition-colors">
                    {o.title}
                  </h3>
                  {o.subtitle && (
                    <p className="mt-2 text-body-sm text-text-tertiary">
                      {o.subtitle}
                    </p>
                  )}
                  <p className="mt-4 inline-flex items-center gap-2 text-body-sm text-accent">
                    Read more
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