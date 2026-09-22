/**
 * Database types. Keep in sync with migrations.
 */

export type LeadStatus =
  | "new"
  | "contacted"
  | "consultation"
  | "proposal"
  | "won"
  | "lost"
  | "archived";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  location: string | null;
  services: string[];
  description: string | null;
  business_problem: string | null;
  desired_outcome: string | null;
  existing_system: string | null;
  budget: string | null;
  timeline: string | null;
  contact_preference: string | null;
  source: string;
  status: LeadStatus;
  notes: string | null;
  ai_summary: string | null;
  ai_priority: "low" | "medium" | "high" | null;
  ai_category: string | null;
  metadata: Record<string, unknown>;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  short_description: string | null;
  description: string | null;
  challenge: string | null;
  approach: string | null;
  solution: string | null;
  outcome: string | null;
  technologies: string[];
  thumbnail_url: string | null;
  gallery: unknown[];
  featured: boolean;
  public: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string | null;
  role: string | null;
  content: string;
  approved: boolean;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  published: boolean;
  display_order: number;
  created_at: string;
}

export interface Setting {
  key: string;
  value: unknown;
  updated_at: string;
}