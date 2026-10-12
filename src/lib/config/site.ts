/**
 * Centralized site configuration. All copy that may change lives here so we
 * don't hard-code branding into individual components.
 *
 * TODO (Richard): Replace placeholder bio, real social URLs, real domain,
 * real phone, real WhatsApp. Everything in this file is the single source of
 * truth — every component reads from here.
 */

export const siteConfig = {
  name: "The Richard Standard",
  shortName: "Richard Tembo",
  tagline: "Build. Automate. Evolve.",
  description:
    "Richard Tembo helps Zambian businesses use technology, AI and digital systems to actually work better. Consulting, training, mentoring and selected build work.",
  founderName: "Richard Tembo",
  founderRole: "Founder · Consultant · Educator",
  location: "Zambia",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "richard@therichardstandard.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
    "Hello Richard, I'd like to talk about how you could help with a project.",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  social: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
  },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://therichardstandard.com",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Books", href: "/books" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message?: string) {
  if (!siteConfig.whatsapp) return "#";
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}