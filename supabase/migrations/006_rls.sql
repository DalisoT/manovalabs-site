-- =========================================================================
-- 006_rls.sql
-- Row Level Security. Public read for non-sensitive content. Leads are
-- server-only — no anon policies.
-- =========================================================================

alter table public.leads         enable row level security;
alter table public.projects      enable row level security;
alter table public.testimonials  enable row level security;
alter table public.faqs          enable row level security;
alter table public.settings      enable row level security;

-- projects: public read where public=true
create policy "projects_public_read"
  on public.projects for select
  using (public = true);

-- testimonials: public read where approved
create policy "testimonials_public_read"
  on public.testimonials for select
  using (approved = true);

-- faqs: public read where published
create policy "faqs_public_read"
  on public.faqs for select
  using (published = true);

-- settings: public read (intended for non-secret runtime config)
create policy "settings_public_read"
  on public.settings for select
  using (true);

-- leads: NO policies for anon. All access goes through the service-role
-- client (`src/lib/supabase/admin.ts`). Anon can neither read nor write.