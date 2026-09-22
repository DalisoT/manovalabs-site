import type { Metadata } from "next";
import { Mail, MessageCircle, MapPin, ArrowUpRight, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig, whatsappLink } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with MANOVA LABS — WhatsApp, email or a quick message using the contact form.",
};

export default function ContactPage() {
  return (
    <>
      <section className="pt-16 pb-12 lg:pt-24">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Let's start a conversation."
            description="Use whichever channel is easiest for you. We respond to every genuine enquiry."
          />
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <ContactForm />

            <aside className="space-y-4">
              <ContactChannel
                icon={MessageCircle}
                label="WhatsApp"
                href={whatsappLink()}
                value={siteConfig.whatsapp ? `+${siteConfig.whatsapp}` : "Add your WhatsApp number"}
                external
                disabled={!siteConfig.whatsapp}
              />
              <ContactChannel
                icon={Mail}
                label="Email"
                href={`mailto:${siteConfig.email}`}
                value={siteConfig.email}
                external
              />
              <ContactChannel
                icon={MapPin}
                label="Location"
                href={null}
                value={siteConfig.location}
              />
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactChannel({
  icon: Icon,
  label,
  href,
  value,
  external,
  disabled,
}: {
  icon: LucideIcon;
  label: string;
  href: string | null;
  value: string;
  external?: boolean;
  disabled?: boolean;
}) {
  const body = (
    <>
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-subtle bg-bg-base text-accent">
        <Icon className="h-4 w-4" aria-hidden />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-label uppercase tracking-wider text-text-tertiary">
          {label}
        </span>
        <span className="block text-body text-text-primary truncate">
          {value}
        </span>
      </span>
      {external && !disabled && (
        <ArrowUpRight className="h-4 w-4 text-text-tertiary" aria-hidden />
      )}
    </>
  );

  if (!href || disabled) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-surface/40 p-4 opacity-70">
        {body}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-surface/40 p-4 hover:border-accent/40 hover:bg-bg-elevated/60 transition-colors"
    >
      {body}
    </a>
  );
}