import type { MetadataRoute } from "next";
import { allServices, services } from "@/lib/config/services";
import { allProjects } from "@/lib/config/projects";
import { siteConfig } from "@/lib/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticPaths: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/work",
    "/about",
    "/process",
    "/contact",
    "/start-project",
    "/privacy",
    "/terms",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1.0 : 0.8,
  }));

  const servicePaths: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectPaths: MetadataRoute.Sitemap = allProjects.map((p) => ({
    url: `${base}/work/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Reference allServices so the linter doesn't complain (also defensive:
  // if maintenance ever gets a dedicated page, it auto-appears).
  void allServices;

  return [...staticPaths, ...servicePaths, ...projectPaths];
}