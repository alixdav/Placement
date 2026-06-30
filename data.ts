import type { Listing, UserProfile } from './types';
import { getSupabase } from './supabase';
import {
  MOCK_CURRENT_PROFILE,
  MOCK_LISTINGS,
} from './mock-data';

// This file is the one place the app talks to its data source. Every screen
// calls these functions and never touches Supabase or the mock data directly.
//
// If Supabase is configured (env vars present), it reads live data.
// If not, it returns the illustrative mock data so the screen always renders.
//
// When you build signup and auth, replace getCurrentProfile with a real
// lookup of the logged in user. Nothing else has to change.

export async function getCurrentProfile(): Promise<UserProfile> {
  const supabase = getSupabase();

  if (!supabase) {
    return MOCK_CURRENT_PROFILE;
  }

  // TODO when auth exists: get the logged in user id from the session and
  // select their row. For now we read the first profile so a connected
  // database still renders something sensible.
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  if (error || !data) {
    return MOCK_CURRENT_PROFILE;
  }

  return data as UserProfile;
}

export async function getListings(): Promise<Listing[]> {
  const supabase = getSupabase();

  if (!supabase) {
    return MOCK_LISTINGS;
  }

  // Listings come back with their reviews nested. Distance is NOT selected
  // here, it is computed at render time against the current user's workplace
  // (see src/lib/distance.ts).
  const { data, error } = await supabase
    .from('listings')
    .select('*, reviews(*)');

  if (error || !data) {
    return MOCK_LISTINGS;
  }

  return data as Listing[];
}
