-- =========================================================================
-- 003_testimonials.sql
-- Only approved testimonials are visible publicly.
-- =========================================================================

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text,
  role text,
  content text not null,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index testimonials_approved_idx
  on public.testimonials (approved, created_at desc);