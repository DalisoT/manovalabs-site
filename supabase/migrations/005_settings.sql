-- =========================================================================
-- 005_settings.sql
-- Singleton key/value store for site-wide runtime settings.
-- =========================================================================

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);