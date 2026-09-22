/**
 * Centralized site configuration. All copy that may change lives here so we
 * don't hard-code branding into individual components.
 */

export const siteConfig = {
  name: "MANOVA LABS",
  shortName: "MANOVA",
  tagline: "Build. Automate. Evolve.",
  description:
    "MANOVA LABS builds modern websites, web applications, AI-powered solutions and automated digital systems that help businesses work smarter.",
  location: "Zambia",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "hello@manovalabs.com",
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
    "Hello MANOVA LABS, I'd like to discuss a digital project.",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "",
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://manovalabs.com",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export function whatsappLink(message?: string) {
  if (!siteConfig.whatsapp) return "#";
  const text = encodeURIComponent(message ?? siteConfig.whatsappDefaultMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${text}`;
}