import { createServerSupabase } from "@/lib/supabase/server";
import { allProjects as fallbackProjects, getProjectBySlug as fallbackGetProjectBySlug, type ProjectDefinition } from "@/lib/config/projects";

/**
 * Live project catalog with graceful fallback. When Supabase env vars are
 * not configured (build/CI without secrets), we fall back to the static
 * catalog in `lib/config/projects.ts`. When Supabase IS configured, the
 * database is the source of truth.
 */

export async function listProjects(): Promise<ProjectDefinition[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return fallbackProjects;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("public", true)
      .order("display_order", { ascending: true });
    if (error || !data) return fallbackProjects;
    return data.map(mapProject);
  } catch {
    return fallbackProjects;
  }
}

export async function getProject(slug: string): Promise<ProjectDefinition | null> {
  const supabase = await createServerSupabase();
  if (!supabase) return fallbackGetProjectBySlug(slug) ?? null;
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("public", true)
      .maybeSingle();
    if (error || !data) return fallbackGetProjectBySlug(slug) ?? null;
    return mapProject(data);
  } catch {
    return fallbackGetProjectBySlug(slug) ?? null;
  }
}

export async function listProjectSlugs(): Promise<string[]> {
  const supabase = await createServerSupabase();
  if (!supabase) return fallbackProjects.map((p) => p.slug);
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("slug")
      .eq("public", true);
    if (error || !data) return fallbackProjects.map((p) => p.slug);
    return data.map((r) => r.slug);
  } catch {
    return fallbackProjects.map((p) => p.slug);
  }
}

interface ProjectRow {
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
  featured: boolean;
  public: boolean;
  display_order: number;
  confidential?: boolean;
  created_at: string;
  updated_at: string;
}

function mapProject(row: ProjectRow): ProjectDefinition {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    shortDescription: row.short_description ?? "",
    description: row.description ?? "",
    challenge: row.challenge ?? "",
    approach: row.approach ?? "",
    solution: row.solution ?? "",
    outcome: row.outcome ?? "",
    technologies: row.technologies ?? [],
    thumbnail: row.thumbnail_url ?? "",
    featured: row.featured,
    confidential: row.confidential ?? false,
  };
}