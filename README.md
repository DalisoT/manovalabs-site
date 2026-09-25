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

## Deploying to Cloudflare Pages

This project is configured to deploy via **Cloudflare Pages using `@opennextjs/cloudflare`** (Workers runtime).

### Build & deploy commands

| Command | What it does |
|---|---|
| `npm run cf:build` | Build the OpenNext worker bundle into `.open-next/` |
| `npm run cf:deploy` | Deploy the bundle via `wrangler` |
| `npm run cf:preview` | Local preview of the worker bundle |
| `npm run clean:dev` | Wipe `.next/`, `node_modules/.cache/`, and `.open-next/` |

### Cloudflare Pages dashboard setup

1. **Connect repo:** Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → connect to `DalisoT/manovalabs-site`.

2. **Build settings:**
 - **Build command:** `npm run cf:build`
 - **Build output directory:** `.open-next`
 - **Root directory:** *(leave blank)*
 - **Environment variables:** *(see below)*
 - **Compatibility flags:** `nodejs_compat` *(already set in wrangler.jsonc, but Cloudflare Pages sometimes overrides)*

3. **Environment variables** to set in the dashboard (Settings → Environment variables):

| Variable | Required | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Set to your production domain before the first build (used at build time for metadata + OG tags) |
| `NEXT_PUBLIC_SUPABASE_URL` | optional | If you wire Supabase; site works without it |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | optional | |
| `SUPABASE_SERVICE_ROLE_KEY` | optional | **Server-only** — used by `/api/leads` |
| `OPENAI_API_KEY` | optional | If you wire MANOVA AI |
| `OPENAI_BASE_URL` | optional | Defaults to `https://api.minimax.chat/v1` (MiniMax) |
| `OPENAI_MODEL` | optional | Default `gpt-4o-mini` |
| `AI_PROVIDER` | optional | Default `openai` |
| `AI_RATE_LIMIT_PER_HOUR` | optional | Default `30` |

4. **First deploy:** push to `main`. Cloudflare builds with `npm run cf:build` and publishes the worker. URL will be `manovalabs-site.<account>.workers.dev` (or your custom domain once attached).

### Why `--dangerouslyUseUnsupportedNextVersion`?

OpenNext 1.20.6's whitelist only accepts Next.js majors released within the last ~2 years. We're on Next.js 14.2.15 (which has a known security advisory — see "Known issues" below). The flag bypasses the whitelist check; the build still works.

### Local smoke test

Skip it on Windows. OpenNext prints "WARN not fully compatible with Windows — use WSL" and the build step hangs. Push to Cloudflare — their Linux Node 24 environment handles it cleanly.

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