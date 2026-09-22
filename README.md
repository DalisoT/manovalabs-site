# MANOVA LABS — Website

Production website for [MANOVA LABS](https://manovalabs.com) — a Zambia-based technology company building modern websites, web applications, AI-powered solutions and automated digital systems.

**Tagline:** Build. Automate. Evolve.

---

## Stack

- **Framework:** Next.js 14 (App Router) + React 18 + TypeScript
- **Styling:** Tailwind CSS with a custom dark "premium technology" design system
- **Database:** Supabase / PostgreSQL with Row Level Security
- **AI:** Provider-agnostic (`MiniMax` by default, OpenAI / Anthropic / Google interchangeable)
- **Email & WhatsApp:** Optional, graceful no-ops until configured
- **Deployment:** Vercel

---

## Local development

```bash
# 1. Install
npm install

# 2. Copy environment template
cp .env.example .env.local
# then fill in values for the integrations you want to use

# 3. Run
npm run dev
# open http://localhost:3000
```

The site runs **without any env vars configured** — Supabase and AI both degrade to graceful fallbacks. This lets you preview the entire site locally before wiring up external services.

---

## Scripts

```bash
npm run dev      # Start the dev server
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint
```

---

## Project structure

```
src/
├── app/                     # Next.js App Router routes
│   ├── (homepage)          # Composed from sections/
│   ├── services/[slug]/    # 7 service pages from one template
│   ├── work/[slug]/        # Dynamic case studies
│   ├── api/                # /api/leads, /api/ai/chat
│   ├── sitemap.ts          # Auto-generated sitemap
│   └── robots.ts           # Auto-generated robots.txt
│
├── components/
│   ├── layout/             # Navbar, Footer, Container, ServicePage template
│   ├── sections/           # Homepage sections (Hero, Pillars, etc.)
│   ├── ui/                 # Primitives (Button, Card, Input, Accordion, …)
│   ├── forms/              # Project wizard (7 steps) + contact form
│   ├── ai/                 # ManovaAI chat panel + floating launcher
│   ├── animation/          # Framer Motion reveal helpers
│   ├── shared/             # SectionHeading, brand icons, CTAs
│   └── seo/                # JSON-LD structured data
│
├── lib/
│   ├── config/             # Site config, services catalog, projects catalog
│   ├── supabase/           # Browser / server / admin clients
│   ├── ai/                 # Provider abstraction + OpenAI/Anthropic/Google
│   ├── validation/         # zod schemas (lead intake)
│   ├── whatsapp/           # Optional WhatsApp Business notifier
│   └── utils/              # cn(), format(), analytics(), slugify()
│
├── hooks/                  # useReducedMotion, useMediaQuery
└── types/                  # Shared TypeScript types

supabase/
└── migrations/             # 001–006 SQL + seed.sql
```

---

## Environment variables

All documented in [`.env.example`](.env.example). Quick reference:

| Group | Purpose |
|---|---|
| `NEXT_PUBLIC_*` | Site URL, contact info, social URLs — exposed to the client |
| `NEXT_PUBLIC_SUPABASE_*` | Supabase anon key — read-only public access |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server-only** — bypasses RLS for lead capture |
| `OPENAI_*` | AI provider config (works with MiniMax via `OPENAI_BASE_URL`) |
| `ANTHROPIC_*`, `GOOGLE_AI_*` | Alternative AI providers (selected via `AI_PROVIDER`) |
| `WHATSAPP_API_*` | Optional WhatsApp Business notifications |
| `RESEND_*` | Optional email notifications (skipped in this build — see below) |

The build intentionally does **not** require email credentials. Leads save to Supabase; notifications are off until you wire them up.

---

## Database setup

1. Create a Supabase project.
2. Run the migrations in order, then the seed:

   ```bash
   # In the Supabase SQL editor, or via supabase-cli:
   psql "$DATABASE_URL" -f supabase/migrations/001_leads.sql
   psql "$DATABASE_URL" -f supabase/migrations/002_projects.sql
   psql "$DATABASE_URL" -f supabase/migrations/003_testimonials.sql
   psql "$DATABASE_URL" -f supabase/migrations/004_faqs.sql
   psql "$DATABASE_URL" -f supabase/migrations/005_settings.sql
   psql "$DATABASE_URL" -f supabase/migrations/006_rls.sql
   psql "$DATABASE_URL" -f supabase/seed.sql
   ```

3. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to your `.env.local` (and to Vercel project env vars for production).

When Supabase is configured, the `/work` index and case-study pages read from the database with the static `lib/config/projects.ts` catalog as fallback.

---

## AI setup (MiniMax by default)

The `lib/ai/openai.ts` provider speaks the OpenAI protocol. To use **MiniMax**, set:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=<your minimax api key>
OPENAI_BASE_URL=https://api.minimax.chat/v1
OPENAI_MODEL=<model name, e.g. abab6.5s-chat>
```

You can swap to Anthropic or Google Gemini by setting `AI_PROVIDER=anthropic` (or `google`) and filling in the corresponding `*_API_KEY`.

If no provider is configured, `/api/ai/chat` returns 503 and the assistant UI shows a graceful fallback message. The site still works.

### Safety guarantees built into the AI layer

- System prompt instructs the assistant to never invent clients, prices or capabilities
- All chat requests are **rate-limited per IP** (`AI_RATE_LIMIT_PER_HOUR`, default 30/hr)
- API keys are read only on the server — never bundled to the client
- Output length is capped per request

---

## Deploying to Vercel

1. Push the repo to GitHub (see "Pushing to GitHub" below).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. In **Settings → Environment Variables**, add every variable from `.env.example` that you want active.
4. Vercel auto-detects Next.js. No build command changes needed.
5. Deploy.

The site works as a static export for everything except `/api/*` and `/work/[slug]` (those remain dynamic when Supabase is configured).

---

## Content rules (important)

This site is engineered to never fabricate:

- Clients
- Testimonials
- Awards / certifications
- Years-in-business claims
- Revenue / scale metrics
- Project outcomes

Every claim is verifiable. Anything pending review is held back from the live site rather than published as a placeholder.

---

## What's intentionally not in this repo

- An admin dashboard (planned; not yet shipped)
- Email notification wiring (deferred — leads persist without it)
- A real booking calendar integration (placeholder link to `/contact`)
- Custom illustrations (uses refined inline SVG instead)

These are tracked and easy to add when needed.

---

## License

© 2026 MANOVA LABS. All rights reserved.