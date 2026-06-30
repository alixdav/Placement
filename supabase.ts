import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Returns a Supabase client only when the environment is configured.
// If the keys are missing (for example before you have set up a project),
// this returns null and the data layer falls back to the illustrative
// mock data. That means the app always renders, with or without a backend.

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!cached) {
    cached = createClient(url, anonKey);
  }
  return cached;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
