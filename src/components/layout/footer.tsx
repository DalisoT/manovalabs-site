import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { currentYear } from "@/lib/utils/format";
import { siteConfig, whatsappLink } from "@/lib/config/site";
import { Mail, MessageCircle } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from "@/components/shared/brand-icons";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-base mt-32">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md overflow-hidden">
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} logo`}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-label uppercase text-text-tertiary tracking-[0.18em]">
                  Manova
                </span>
                <span className="text-body font-semibold text-text-primary">
                  LABS
                </span>
              </div>
            </div>
            <p className="mt-5 text-body text-text-secondary max-w-sm text-pretty">
              {siteConfig.tagline}. Building modern websites, applications and
              AI-powered digital systems for businesses across {siteConfig.location}.
            </p>

            {siteConfig.whatsapp && (
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-body-sm text-accent hover:text-accent-soft transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
            )}
          </div>

          <FooterColumn
            title="Services"
            links={[
              { label: "Web Development", href: "/services/web-development" },
              { label: "Web Applications", href: "/services/web-applications" },
              { label: "AI Integration", href: "/services/ai-integration" },
              { label: "Business Automation", href: "/services/automation" },
              { label: "E-commerce", href: "/services/ecommerce" },
              { label: "Business Systems", href: "/services/business-systems" },
            ]}
          />

          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Work", href: "/work" },
              { label: "Process", href: "/process" },
              { label: "Contact", href: "/contact" },
              { label: "Start a Project", href: "/start-project" },
            ]}
          />

          <div>
            <h4 className="text-label uppercase tracking-wider text-text-tertiary mb-4">
              Connect
            </h4>
            <ul className="space-y-3 text-body-sm">
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <Mail className="h-4 w-4" aria-hidden />
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {siteConfig.whatsapp && (
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <div className="mt-5 flex items-center gap-2">
              {siteConfig.social.github && (
                <SocialIcon href={siteConfig.social.github} label="GitHub">
                  <GithubIcon className="h-4 w-4" />
                </SocialIcon>
              )}
              {siteConfig.social.linkedin && (
                <SocialIcon href={siteConfig.social.linkedin} label="LinkedIn">
                  <LinkedinIcon className="h-4 w-4" />
                </SocialIcon>
              )}
              {siteConfig.social.facebook && (
                <SocialIcon href={siteConfig.social.facebook} label="Facebook">
                  <FacebookIcon className="h-4 w-4" />
                </SocialIcon>
              )}
              {siteConfig.social.instagram && (
                <SocialIcon href={siteConfig.social.instagram} label="Instagram">
                  <InstagramIcon className="h-4 w-4" />
                </SocialIcon>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-border-subtle flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-body-sm text-text-tertiary">
          <p>
            © {currentYear()} {siteConfig.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-text-primary transition-colors">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-text-primary transition-colors">
                Terms
              </Link>
            </li>
            <li className="text-text-muted">{siteConfig.location}</li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-label uppercase tracking-wider text-text-tertiary mb-4">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-body-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle text-text-secondary hover:text-accent hover:border-accent/40 transition-colors"
    >
      {children}
    </a>
  );
}