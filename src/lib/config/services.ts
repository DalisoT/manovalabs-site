import type { LucideIcon } from "lucide-react";
import {
  Compass,
  GraduationCap,
  Code2,
  Wrench,
  Briefcase,
  Sparkles,
} from "lucide-react";

/**
 * Service catalog for The Richard Standard.
 * Adding or changing a service is a one-file edit — components read from here.
 *
 * Voice: first-person. These are things Richard does, not things "we" do.
 */
export interface ServiceDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  benefits: string[];
  useCases: string[];
  technologies: string[];
}

export const services: ServiceDefinition[] = [
  {
    slug: "consulting",
    shortTitle: "Consulting & Strategy",
    title: "Consulting & Strategy",
    icon: Compass,
    tagline: "Practical advice for the business you're actually running.",
    summary:
      "I work with small and growing businesses, schools, NGOs and SMEs across Zambia to figure out what technology and AI they actually need — and what they can safely ignore. No jargon, no boilerplate recommendations.",
    benefits: [
      "Honest assessment of what your business actually needs",
      "Clear, written recommendations you can act on",
      "A plan that fits your team, budget and timeline",
      "Vendor-neutral advice (I don't resell anything)",
      "Sessions that produce a deliverable, not a slide deck",
    ],
    useCases: [
      "Digital strategy review for an SME",
      "Tooling and system audit for a school or NGO",
      "AI readiness assessment for a non-technical team",
      "Tech due-diligence before a major purchase or pivot",
      "Fractional CTO / technical advisor engagements",
    ],
    technologies: ["Strategy", "Tooling audits", "AI readiness", "Process design", "Vendor selection"],
  },
  {
    slug: "training",
    shortTitle: "Training & Mentoring",
    title: "Training, Teaching & Mentoring",
    icon: GraduationCap,
    tagline: "AI and tech skills, taught the way I'd want to be taught.",
    summary:
      "I run 1-on-1 sessions, small workshops and longer mentoring engagements for non-technical founders, junior developers and teams that want to actually understand the tools they're using. Plain language, real examples, no hand-waving.",
    benefits: [
      "Sessions tailored to your skill level and goals",
      "Real examples from Zambian business contexts",
      "Recording and notes you keep after every session",
      "Follow-up by message for the duration of the engagement",
      "Honest about what tools are and aren't worth learning",
    ],
    useCases: [
      "1-on-1 AI for founders and small teams",
      "Workshops for non-technical staff (AI, tools, automation)",
      "Mentoring junior developers into mid-level work",
      "Career coaching for self-taught developers",
      "Custom training curricula for organisations",
    ],
    technologies: ["AI tools", "No-code automation", "Prompting", "Web fundamentals", "Career development"],
  },
  {
    slug: "web-development",
    shortTitle: "Web Development",
    title: "Web Development",
    icon: Code2,
    tagline: "Selected website and web app projects, taken on when they fit.",
    summary:
      "I still take on focused web and web-app work when it lines up with my availability and the project is something I can stand behind. Modern stacks, real outcomes, no agency-style retainers.",
    benefits: [
      "Modern stack: Next.js, TypeScript, Supabase, Tailwind",
      "Mobile-first, accessible, fast on real connections",
      "SEO and performance treated as features, not polish",
      "Supabase / Postgres for data when you actually need it",
      "Honest scoping — I'll tell you if you don't need a custom build",
    ],
    useCases: [
      "Marketing sites for SMEs and personal brands",
      "Web applications with a real workflow behind them",
      "Internal tools and dashboards for small teams",
      "PWA / offline-first apps for low-connectivity contexts",
      "Landing pages and product launch sites",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
  },
  {
    slug: "ai-integration",
    shortTitle: "AI Solutions",
    title: "AI Solutions & Integration",
    icon: Sparkles,
    tagline: "AI where it actually earns its place.",
    summary:
      "I help you figure out where AI genuinely helps your work — and where it doesn't. When AI is the right answer, I build it. When it isn't, I tell you that too. Embeddings, RAG, agents, custom AI workflows.",
    benefits: [
      "Honest scoping of what AI can and can't do for you",
      "Grounded in your actual data, not marketing hype",
      "Provider-agnostic — switch engines without rebuilding",
      "Safe handling of private information",
      "Rate-limited, monitored, cost-aware from day one",
    ],
    useCases: [
      "AI assistants grounded in your documents and policies",
      "Customer support AI with safe handoff to humans",
      "AI-assisted content and document workflows",
      "AI classification, extraction, and routing",
      "Internal knowledge bases you can actually trust",
    ],
    technologies: ["OpenAI-compatible APIs", "Vector databases", "RAG", "Anthropic", "Google AI"],
  },
  {
    slug: "automation",
    shortTitle: "Business Automation",
    title: "Business Automation",
    icon: Briefcase,
    tagline: "Automate the work that drains your team.",
    summary:
      "If a repetitive business process can be structured, it can probably be automated. I work with you to map the workflow, identify what to automate, and build it without breaking what already works.",
    benefits: [
      "Workflow mapping before any code is written",
      "Notifications, approvals and reporting built in",
      "Easy to evolve as the business changes",
      "Manual override always available",
      "Clear audit trails for every automated action",
    ],
    useCases: [
      "Lead capture and routing",
      "Customer onboarding sequences",
      "Appointment and reminder workflows",
      "Document processing and approvals",
      "Internal reporting and dashboards",
    ],
    technologies: ["Workflow engines", "Email APIs", "Webhooks", "Scheduled jobs", "AI-assisted steps"],
  },
];

export const supportService: ServiceDefinition = {
  slug: "support",
  shortTitle: "Ongoing Support",
  title: "Ongoing Support & Maintenance",
  icon: Wrench,
  tagline: "For projects I've already built or scoped.",
  summary:
    "Updates, security patches, performance tuning and feature additions for systems I built or am responsible for. Bounded engagements, predictable monthly cadence.",
  benefits: [
    "Predictable response times",
    "Knowledge retained inside the project",
    "Proactive security and dependency updates",
    "Performance and uptime monitoring",
    "Direct line to the person who built it",
  ],
  useCases: [
    "Ongoing maintenance for an existing project",
    "Security and dependency updates",
    "Performance tuning and monitoring",
    "Small feature additions and iterations",
    "Ad-hoc troubleshooting",
  ],
  technologies: ["Dependency auditing", "Performance budgets", "Uptime monitoring", "Logging", "Backups"],
};

export const allServices = [...services, supportService];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return allServices.find((s) => s.slug === slug);
}