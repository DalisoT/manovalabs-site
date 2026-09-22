import type { LucideIcon } from "lucide-react";
import {
  Globe,
  AppWindow,
  Sparkles,
  Workflow,
  ShoppingCart,
  Database,
  Plug,
  Wrench,
} from "lucide-react";

/**
 * Service catalog. Adding a service here is the only place that needs to
 * change to surface it on the marketing site — components read from this.
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
    slug: "web-development",
    shortTitle: "Web Development",
    title: "Website Development",
    icon: Globe,
    tagline: "Websites that look, load and convert.",
    summary:
      "Business websites, corporate sites, landing pages, portfolios and content-driven marketing sites. Built for speed, search and clarity.",
    benefits: [
      "Responsive design across every breakpoint",
      "Search-engine-ready markup and metadata",
      "Performance budgets baked into the build",
      "Accessibility considered from the first component",
      "Clean CMS integration where content changes often",
    ],
    useCases: [
      "Corporate websites",
      "Marketing landing pages",
      "Service businesses",
      "Portfolios and personal brands",
      "Blog and content sites",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Headless CMS"],
  },
  {
    slug: "web-applications",
    shortTitle: "Web Applications",
    title: "Web Applications",
    icon: AppWindow,
    tagline: "More than a website — a real product.",
    summary:
      "Custom browser-based applications: management systems, booking platforms, dashboards, customer portals, internal tools, education platforms and membership systems.",
    benefits: [
      "Designed around the real workflow",
      "Authentication and role-based access",
      "Dashboards with the metrics that matter",
      "Database design that scales with usage",
      "API-first so other tools can plug in later",
    ],
    useCases: [
      "Operations dashboards",
      "Booking and scheduling platforms",
      "Customer and member portals",
      "Internal team tools",
      "Education and learning platforms",
    ],
    technologies: ["Next.js", "PostgreSQL", "Supabase", "REST APIs", "Server actions"],
  },
  {
    slug: "ai-integration",
    shortTitle: "AI Integration",
    title: "AI Integration",
    icon: Sparkles,
    tagline: "Use AI where it creates measurable value.",
    summary:
      "AI chat assistants, document Q&A, knowledge bases, content workflows, classification, extraction and custom AI workflows — built around real data and real tasks.",
    benefits: [
      "Provider-agnostic — switch engines without rebuilding",
      "Grounded in your documents and knowledge base",
      "Rate-limited, monitored and cost-aware",
      "Human review preserved for sensitive actions",
      "Designed for safe handling of private data",
    ],
    useCases: [
      "AI customer support assistants",
      "Document and policy Q&A",
      "Internal knowledge bases",
      "AI-assisted content workflows",
      "Classification and data extraction",
    ],
    technologies: ["OpenAI-compatible APIs", "Vector databases", "RAG pipelines", "Anthropic", "Google AI"],
  },
  {
    slug: "automation",
    shortTitle: "Business Automation",
    title: "Business Automation",
    icon: Workflow,
    tagline: "Automate the work that drains your team.",
    summary:
      "Lead capture, onboarding, notifications, document processing, reporting, approvals and AI-assisted customer communication — automated with reliability.",
    benefits: [
      "Clear audit trails for every automated action",
      "Graceful degradation if an external system is down",
      "Notifications and escalations wired in from day one",
      "Easy to evolve as the business changes",
      "Manual override always available",
    ],
    useCases: [
      "Lead capture and routing",
      "Customer onboarding sequences",
      "Appointment and reminder workflows",
      "Document processing and approvals",
      "Internal reporting",
    ],
    technologies: ["Workflow engines", "Email APIs", "Webhooks", "Scheduled jobs", "AI-assisted steps"],
  },
  {
    slug: "ecommerce",
    shortTitle: "E-commerce",
    title: "E-commerce",
    icon: ShoppingCart,
    tagline: "Stores that handle real orders, not demos.",
    summary:
      "Online stores, product catalogues, checkout, customer accounts, order management and inventory workflows — built around how Zambian businesses actually operate.",
    benefits: [
      "Local payment provider integration where supported",
      "Inventory that matches reality",
      "Order management the team can actually use",
      "Customer accounts that don't frustrate buyers",
      "Reporting that surfaces what matters",
    ],
    useCases: [
      "Retail product stores",
      "Service-based businesses",
      "B2B order portals",
      "Subscription products",
      "Marketplace and catalogue sites",
    ],
    technologies: ["Next.js", "Payment provider APIs", "PostgreSQL", "Order management", "Email receipts"],
  },
  {
    slug: "business-systems",
    shortTitle: "Business Systems",
    title: "Business Systems",
    icon: Database,
    tagline: "The custom system your operation actually needs.",
    summary:
      "Custom systems combining database, authentication, dashboards, APIs, user roles, reports, automation and AI. Built when off-the-shelf software doesn't fit.",
    benefits: [
      "Designed around your real workflow",
      "Scales as the business grows",
      "Integrates with what you already use",
      "Evolves without a full rebuild",
      "Documentation your team can read",
    ],
    useCases: [
      "School information systems",
      "Loan and lending workflows",
      "Inventory and stock control",
      "Booking platforms",
      "Membership and subscription management",
    ],
    technologies: ["PostgreSQL", "Next.js", "Row-level security", "REST APIs", "Scheduled jobs"],
  },
  {
    slug: "integrations",
    shortTitle: "API & Integrations",
    title: "API & Integrations",
    icon: Plug,
    tagline: "Make your tools talk to each other.",
    summary:
      "Payment, email, AI, CRM, databases and third-party platforms — connected through APIs and webhooks with reliability built in.",
    benefits: [
      "Bidirectional sync where it matters",
      "Error handling and retries",
      "Monitoring for silent failures",
      "Documented for the next developer",
      "Backward compatible when APIs change",
    ],
    useCases: [
      "Payment provider integration",
      "Email and notification systems",
      "WhatsApp business workflows",
      "CRM and pipeline sync",
      "Custom internal APIs",
    ],
    technologies: ["REST APIs", "Webhooks", "OAuth flows", "Background workers", "Message queues"],
  },
];

export const maintenanceService: ServiceDefinition = {
  slug: "maintenance",
  shortTitle: "Maintenance & Support",
  title: "Maintenance & Support",
  icon: Wrench,
  tagline: "Keep what you've built working well.",
  summary:
    "Updates, security patches, bug fixing, performance optimisation, feature additions, monitoring and ongoing technical support — for systems we built or inherited.",
  benefits: [
    "Proactive security updates",
    "Performance monitoring",
    "Clear response times",
    "Predictable monthly cadence",
    "Knowledge retained inside the project",
  ],
  useCases: [
    "Ongoing security maintenance",
    "Feature additions and iterations",
    "Bug investigation and fixing",
    "Performance optimisation",
    "Monitoring and incident response",
  ],
  technologies: ["Dependency auditing", "Performance budgets", "Logging", "Uptime monitoring", "Backups"],
};

export const allServices = [...services, maintenanceService];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return allServices.find((s) => s.slug === slug);
}