-- =========================================================================
-- seed.sql
-- Initial seed data: Zed Quiz + Ruthex + a confidential restricted project.
-- Run after 001-006 are applied.
-- =========================================================================

insert into public.projects
  (slug, title, category, short_description, description, challenge,
   approach, solution, outcome, technologies, featured, public, display_order)
values
  (
    'zed-quiz',
    'Zed Quiz',
    'Education Technology · Web Application',
    'A Zambian-focused learning and assessment platform built around quizzes, educational content and interactive revision.',
    'Zed Quiz is a learning and assessment platform designed for Zambian students. It combines curated educational content, structured quizzes and interactive learning workflows that work for both classroom and self-study contexts.',
    'Most existing assessment tools are built around curricula from elsewhere. A platform designed for the local context needed to balance structured learning with flexible practice, while keeping the experience fast on modest devices and connections.',
    'Designed around the real revision experience — short focused sessions, clear feedback and progress visibility. Content modelled in a way that supports growth into more advanced question formats over time, without re-platforming.',
    'A web-based application with role-based access for students, teachers and administrators. Question banks, quiz sessions, AI-assisted marking for free-text responses, and analytics that help both learners and educators understand progress.',
    'Platform delivered with the core revision and assessment loop working end-to-end. Continued iteration on features, content and integrations based on real classroom use.',
    array['Next.js','React','TypeScript','Supabase','PostgreSQL','AI'],
    true, true, 1
  ),
  (
    'ruthex',
    'Ruthex',
    'Financial Technology · Business Platform',
    'A digital platform concept built to demonstrate how modern technology can support financial and lending workflows.',
    'Ruthex is a digital platform concept designed around the operational realities of a lending business. It explores how a focused technology foundation can support customer onboarding, application review, decisioning and reporting in a structured, auditable way.',
    'Lending operations need structure, traceability and a customer experience that does not feel like paperwork. Generic tools tend to either be too rigid or too loose for the regulatory and operational realities of the business.',
    'Modelled the workflow end-to-end — from the first customer touchpoint through application, review, decision and ongoing servicing. Each step was mapped to the data and integrations a real lending operation would need, without claiming operational metrics.',
    'A platform concept covering customer-facing flows, internal review dashboards, role-based access, reporting surfaces and integration points with payment providers and identity services. Designed to be developed further when requirements are confirmed.',
    'A clear technical foundation ready for a real engagement. No operational metrics are claimed because none have been measured.',
    array['Next.js','TypeScript','PostgreSQL','Payments','Dashboards'],
    true, true, 2
  ),
  (
    'confidential-restricted',
    'Confidential / Restricted Project',
    'Professional · Restricted',
    'Custom digital information and training solution developed for a restricted professional environment.',
    'A bespoke digital platform developed for a restricted professional environment. Details of the engagement, environment and operational use are intentionally not disclosed.',
    'The client required a self-contained digital solution tailored to a sensitive operational context, with strict controls on information access.',
    'Engaged with the client within agreed confidentiality boundaries. Designed and built a focused system that addressed the agreed functional scope without exposing operational detail externally.',
    'A working digital platform delivered against the agreed scope. Specific features, technologies and outcomes are not publicly documented.',
    'Delivered within the agreed engagement. No public performance or adoption claims are made.',
    array['Custom stack'],
    false, true, 3
  );

update public.projects
  set confidential = true
  where slug = 'confidential-restricted';