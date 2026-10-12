import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/config/site";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Richard Tembo — Zambia-based consultant, trainer and developer helping small businesses use technology and AI practically.",
};

export default function AboutPage() {
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container className="max-w-4xl">
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            About
          </p>
          <h1 className="text-display-2 text-text-primary text-balance">
            I help Zambian businesses use technology and AI — practically.
          </h1>
          <p className="mt-6 text-body-lg text-text-secondary text-pretty max-w-3xl">
            I&apos;m {siteConfig.founderName}. I consult, train, mentor and
            occasionally build. Based in {siteConfig.location}, working with
            people who want real outcomes from real tools.
          </p>
        </Container>
      </section>

      <section className="py-12 lg:py-16 border-t border-border-subtle">
        <Container className="max-w-4xl">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-6 text-body-lg text-text-secondary text-pretty">
              {/* TODO (Richard): Replace this placeholder bio with your real
                  story. Suggested structure: who you are, what you&apos;ve
                  done, what you believe, why someone should trust you.
                  Keep it human — corporate bio-speak defeats the purpose. */}
              <p>
                For over a decade I&apos;ve been building websites, web
                applications and digital systems. I&apos;ve worked with small
                businesses, established companies, schools, NGOs and
                founders. Along the way I noticed a pattern: most people
                don&apos;t need more technology — they need clearer thinking
                about which technology actually helps.
              </p>
              <p>
                That&apos;s what <span className="text-text-primary">{siteConfig.name}</span> is
                for. I work with you to figure out what to build, what to
                buy, what to skip, and how to make sure the team that has
                to live with the result actually understands it. Then I
                either train your team, build it with them, or hand them a
                plan they can execute without me.
              </p>
              <p>
                I&apos;m not a consultancy that sells slide decks. I&apos;m
                not a dev shop that takes six months to ship a landing
                page. I sit in the middle: someone who can teach you the
                concepts, write the code when needed, and stay honest about
                when the right answer is &ldquo;don&apos;t build anything —
                change the process first&rdquo;.
              </p>
            </div>
            <aside className="space-y-6">
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-3">
                  Based in
                </p>
                <p className="text-h4 text-text-primary">{siteConfig.location}</p>
                <p className="mt-2 text-body-sm text-text-tertiary">
                  Working with clients locally. Travel for the right engagement.
                </p>
              </div>
              <div className="rounded-lg border border-border-subtle bg-bg-surface/40 p-6">
                <p className="text-label uppercase tracking-wider text-accent mb-3">
                  How I work
                </p>
                <ul className="space-y-2 text-body-sm text-text-secondary">
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>Vendor-neutral — I don&apos;t resell anything.</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>Bounded engagements with clear deliverables.</span>
                  </li>
                  <li className="flex gap-2">
                    <span aria-hidden className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>Honest about when the answer is &ldquo;don&apos;t build&rdquo;.</span>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-subtle">
        <Container className="max-w-4xl">
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            How I think
          </p>
          <h2 className="text-display-3 text-text-primary text-balance">
            {siteConfig.tagline}
          </h2>
          <p className="mt-4 text-body-lg text-text-secondary max-w-3xl text-pretty">
            The same philosophy that runs the work. Build what&apos;s worth
            building. Automate the parts that drain your team. Evolve the
            system as the business changes.
          </p>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-subtle bg-bg-surface/30">
        <Container className="max-w-4xl">
          <p className="text-label uppercase tracking-[0.18em] text-accent mb-3">
            What I won&apos;t do
          </p>
          <h2 className="text-display-3 text-text-primary text-balance">
            Honesty over impressive.
          </h2>
          <ul className="mt-10 space-y-4 text-body text-text-secondary">
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                I won&apos;t fabricate client lists, testimonials or case
                study stats. Every claim on this site is real.
              </span>
            </li>
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                I won&apos;t promise fixed prices or delivery dates up
                front. Every engagement is scoped before any commitment.
              </span>
            </li>
            <li className="flex gap-3">
              <Badge variant="muted" className="shrink-0 mt-0.5">No</Badge>
              <span>
                I won&apos;t pretend AI does more than it does. When AI
                helps, I say so. When it doesn&apos;t, I recommend
                something simpler.
              </span>
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-16 lg:py-24 border-t border-border-subtle">
        <Container className="max-w-4xl">
          <div className="rounded-2xl border border-border-subtle bg-bg-surface/60 p-10 lg:p-14 text-center">
            <span className="inline-block text-label uppercase tracking-[0.18em] text-accent mb-4">
              Working together
            </span>
            <h2 className="text-display-3 text-text-primary text-balance">
              Have a project, a question, or just a hunch?
            </h2>
            <p className="mt-4 text-body-lg text-text-secondary text-pretty max-w-2xl mx-auto">
              I respond to every genuine message. Tell me a bit about what
              you&apos;re working on and I&apos;ll come back with whether
              I&apos;m the right person to help — and if I&apos;m not, who
              might be.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild href="/start-project" size="lg">
                Start a conversation
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
              <Button asChild variant="outline" size="lg" href="/services">
                See what I do
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}