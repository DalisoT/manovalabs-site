import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. SERVER-ONLY. Bypasses RLS for trusted
 * server-side operations (e.g. lead capture).
 *
 * NEVER expose this client or the SUPABASE_SERVICE_ROLE_KEY to the
 * browser. Never import this file from a `"use client"` module.
 */
export function createAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}