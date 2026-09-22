import type { Metadata } from "next";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MANOVA LABS handles personal information collected through this website.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-20 lg:py-28 max-w-3xl">
      <p className="text-label uppercase tracking-[0.18em] text-accent">
        Legal
      </p>
      <h1 className="mt-3 text-display-2 text-text-primary text-balance">
        Privacy Policy
      </h1>
      <p className="mt-3 text-body-sm text-text-tertiary">
        Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="prose-manova mt-12 space-y-8 text-body text-text-secondary">
        <Section title="1. Who we are">
          <p>
            MANOVA LABS (&ldquo;we&rdquo;, &ldquo;our&rdquo;) operates the
            website manovalabs.com and related services. We are based in
            Zambia and provide digital products and engineering services.
          </p>
        </Section>

        <Section title="2. What information we collect">
          <p>When you interact with our site, we may collect:</p>
          <ul>
            <li>Information you submit via forms (name, email, phone, project details).</li>
            <li>Technical information (browser, device, pages visited, IP).</li>
            <li>Cookies and analytics, where applicable.</li>
          </ul>
        </Section>

        <Section title="3. How we use it">
          <ul>
            <li>To respond to your enquiry or project brief.</li>
            <li>To deliver and improve our services.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p>
            We do not sell your personal information. We do not share it
            except with service providers acting on our behalf (e.g.
            hosting, email delivery, analytics) and where required by law.
          </p>
        </Section>

        <Section title="4. AI assistant">
          <p>
            Our website includes an AI assistant (MANOVA AI). Conversations
            with the assistant are processed by a third-party AI service
            to generate responses. Do not share sensitive personal
            information with the assistant. The assistant is trained to
            redirect complex or sensitive requests to our team.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            We use cookies and similar technologies only as needed for
            essential site operation and (with consent where required) for
            analytics.
          </p>
        </Section>

        <Section title="6. Your rights">
          <p>
            You can request access to or deletion of your personal data by
            contacting us via the channels listed on our Contact page.
          </p>
        </Section>

        <Section title="7. Changes">
          <p>
            We may update this policy from time to time. Material changes
            will be reflected with a revised &ldquo;Last updated&rdquo; date.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            For privacy questions, contact us via the form on our Contact
            page or by email.
          </p>
          <p className="text-text-tertiary">
            This placeholder policy is intended to be reviewed and
            customised by qualified legal counsel before being relied upon.
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
      <div className="mt-3 space-y-3 text-body text-text-secondary [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:text-body [&_p]:text-pretty">
        {children}
      </div>
    </section>
  );
}