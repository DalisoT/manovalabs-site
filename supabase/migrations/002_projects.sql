-- =========================================================================
-- 002_projects.sql
-- Public-facing case studies. Anon can read where public = true.
-- =========================================================================

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,

  short_description text,
  challenge text,
  approach text,
  solution text,
  outcome text,

  technologies text[] not null default '{}',
  thumbnail_url text,
  gallery jsonb not null default '[]'::jsonb,

  featured boolean not null default false,
  public boolean not null default true,
  display_order int not null default 0,
  confidential boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index projects_slug_idx on public.projects (slug);
create index projects_public_featured_idx
  on public.projects (public, featured, display_order);