/**
 * Initial project catalog. Once Supabase is wired (Phase 4) these will be
 * replaced by live data fetched server-side. Until then we keep them in
 * code so the homepage and /work can render without a database.
 */
export interface ProjectDefinition {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  description: string;
  challenge: string;
  approach: string;
  solution: string;
  outcome: string;
  technologies: string[];
  thumbnail: string;
  featured: boolean;
  confidential?: boolean;
}

export const projects: ProjectDefinition[] = [
  {
    slug: "zed-quiz",
    title: "Zed Quiz",
    category: "Education Technology · Web Application",
    shortDescription:
      "A Zambian-focused learning and assessment platform built around quizzes, educational content and interactive revision.",
    description:
      "Zed Quiz is a learning and assessment platform designed for Zambian students. It combines curated educational content, structured quizzes and interactive learning workflows that work for both classroom and self-study contexts.",
    challenge:
      "Most existing assessment tools are built around curricula from elsewhere. A platform designed for the local context needed to balance structured learning with flexible practice, while keeping the experience fast on modest devices and connections.",
    approach:
      "We designed around the real revision experience — short focused sessions, clear feedback and progress visibility. Content was modelled in a way that supports growth into more advanced question formats over time, without re-platforming.",
    solution:
      "A web-based application with role-based access for students, teachers and administrators. Question banks, quiz sessions, AI-assisted marking for free-text responses, and analytics that help both learners and educators understand progress.",
    outcome:
      "Platform delivered with the core revision and assessment loop working end-to-end. Continued iteration on features, content and integrations based on real classroom use.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "AI"],
    thumbnail: "/images/projects/zed-quiz.svg",
    featured: true,
  },
  {
    slug: "ruthex",
    title: "Ruthex",
    category: "Financial Technology · Business Platform",
    shortDescription:
      "A digital platform concept built to demonstrate how modern technology can support financial and lending workflows.",
    description:
      "Ruthex is a digital platform concept designed around the operational realities of a lending business. It explores how a focused technology foundation can support customer onboarding, application review, decisioning and reporting in a structured, auditable way.",
    challenge:
      "Lending operations need structure, traceability and a customer experience that doesn't feel like paperwork. Generic tools tend to either be too rigid or too loose for the regulatory and operational realities of the business.",
    approach:
      "Modelled the workflow end-to-end — from the first customer touchpoint through application, review, decision and ongoing servicing. Each step was mapped to the data and integrations a real lending operation would need, without claiming operational metrics.",
    solution:
      "A platform concept covering customer-facing flows, internal review dashboards, role-based access, reporting surfaces and integration points with payment providers and identity services. Designed to be developed further when requirements are confirmed.",
    outcome:
      "A clear technical foundation ready for a real engagement. No operational metrics are claimed because none have been measured.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Payments", "Dashboards"],
    thumbnail: "/images/projects/ruthex.svg",
    featured: true,
  },
];

export const confidentialProjects = [
  {
    slug: "confidential-restricted",
    title: "Confidential / Restricted Project",
    category: "Professional · Restricted",
    shortDescription:
      "Custom digital information and training solution developed for a restricted professional environment.",
    description:
      "A bespoke digital platform developed for a restricted professional environment. Details of the engagement, environment and operational use are intentionally not disclosed.",
    challenge:
      "The client required a self-contained digital solution tailored to a sensitive operational context, with strict controls on information access.",
    approach:
      "Engaged with the client within agreed confidentiality boundaries. Designed and built a focused system that addressed the agreed functional scope without exposing operational detail externally.",
    solution:
      "A working digital platform delivered against the agreed scope. Specific features, technologies and outcomes are not publicly documented.",
    outcome:
      "Delivered within the agreed engagement. No public performance or adoption claims are made.",
    technologies: ["Custom stack"],
    thumbnail: "/images/projects/confidential.svg",
    featured: false,
    confidential: true,
  },
];

export const allProjects = [...projects, ...confidentialProjects];

export function getProjectBySlug(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}