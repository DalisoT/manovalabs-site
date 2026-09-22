import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing your use of the MANOVA LABS website.",
};

export default function TermsPage() {
  return (
    <Container className="py-20 lg:py-28 max-w-3xl">
      <p className="text-label uppercase tracking-[0.18em] text-accent">
        Legal
      </p>
      <h1 className="mt-3 text-display-2 text-text-primary text-balance">
        Terms of Use
      </h1>
      <p className="mt-3 text-body-sm text-text-tertiary">
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-12 space-y-8 text-body text-text-secondary">
        <Section title="1. Acceptance">
          <p>
            By accessing this website you agree to be bound by these terms.
            If you do not agree, please do not use the site.
          </p>
        </Section>

        <Section title="2. Use of the site">
          <p>
            You agree to use this site lawfully and not to attempt to disrupt
            its operation, reverse engineer its non-public components, or
            misuse any of its features (including automated scraping at a
            rate that would impair service).
          </p>
        </Section>

        <Section title="3. Intellectual property">
          <p>
            All content on this site — including text, graphics, code,
            logos and project descriptions — is owned by MANOVA LABS or
            used with permission. You may not reproduce it without our
            written consent.
          </p>
        </Section>

        <Section title="4. No warranty">
          <p>
            This site is provided &ldquo;as is&rdquo;. While we make
            reasonable efforts to keep information accurate and current,
            we make no guarantees about completeness or fitness for any
            particular purpose.
          </p>
        </Section>

        <Section title="5. Quotes and engagements">
          <p>
            Information on this site does not constitute a binding offer.
            Any engagement with MANOVA LABS is governed by a separate
            written agreement.
          </p>
        </Section>

        <Section title="6. Limitation of liability">
          <p>
            To the fullest extent permitted by law, MANOVA LABS is not
            liable for any indirect, incidental or consequential damages
            arising from use of the site.
          </p>
        </Section>

        <Section title="7. Governing law">
          <p>
            These terms are governed by the laws of the Republic of Zambia.
            Disputes will be resolved in the appropriate Zambian courts.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            Questions about these terms can be sent via the form on our
            Contact page.
          </p>
          <p className="text-text-tertiary">
            This placeholder is intended to be reviewed and customised by
            qualified legal counsel before being relied upon.
          </p>
        </Section>
      </div>
    </Container>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-h3 text-text-primary">{title}</h2>
      <div className="mt-3 space-y-3 text-body text-text-secondary [&_p]:text-pretty">
        {children}
      </div>
    </section>
  );
}