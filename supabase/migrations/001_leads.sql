-- =========================================================================
-- 001_leads.sql
-- Lead capture table. Server-only writes (service role). Anon cannot read.
-- =========================================================================

create type public.lead_status as enum (
  'new',
  'contacted',
  'consultation',
  'proposal',
  'won',
  'lost',
  'archived'
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  name text not null,
  company text,
  email text not null,
  phone text,
  whatsapp text,
  location text,

  services text[] not null default '{}',

  description text,
  business_problem text,
  desired_outcome text,
  existing_system text,

  budget text,
  timeline text,
  contact_preference text,

  source text not null default 'website',
  status public.lead_status not null default 'new',
  notes text,

  -- AI classification (best-effort; nullable if AI didn't run or failed)
  ai_summary text,
  ai_priority text, -- 'low' | 'medium' | 'high'
  ai_category text,

  metadata jsonb not null default '{}'::jsonb
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_email_idx on public.leads (lower(email));