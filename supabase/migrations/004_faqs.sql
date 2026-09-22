-- =========================================================================
-- 004_faqs.sql
-- Public FAQs gated by `published`.
-- =========================================================================

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  published boolean not null default false,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index faqs_published_idx
  on public.faqs (published, display_order);