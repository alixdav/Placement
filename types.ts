// Core data shapes for Placement.
// These mirror the listings database described in the product spec:
// one listings table, personalised at render time to the logged in user.

export type UserType = 'doctor' | 'graduate';

export type RoomType = 'single' | 'double' | 'whole_flat';

// A review tag carries who it is relevant to, so a doctor sees doctor tags
// first and a graduate sees graduate tags first. Shared tags show to both.
export type ReviewAudience = 'doctor' | 'graduate' | 'shared';

export interface ReviewTag {
  label: string;
  audience: ReviewAudience;
}

export interface Review {
  id: string;
  author_type: UserType;
  rating: number; // 1 to 5
  body: string;
  tags: ReviewTag[];
  created_at: string; // ISO date
}

// Handover is the defining feature: the outgoing tenant passes the room,
// a personal recommendation and local knowledge to the person rotating in.
export interface Handover {
  available: boolean;
  outgoing_tenant_name: string;
  rotation_detail: string; // e.g. "FY1, General Surgery"
  available_from: string;  // ISO date
  recommendation: string;
}

export interface Listing {
  id: string;
  address: string;
  postcode: string;
  // Coordinates are stored so distance can be computed at render time.
  // In production these are geocoded from the postcode on listing creation.
  lat: number;
  lng: number;
  price_pcm: number; // price per calendar month, GBP
  room_type: RoomType;
  available_from: string; // ISO date
  photo_url: string;
  description: string;
  landlord_name: string;
  handover: Handover | null;
  reviews: Review[];
}

// The logged in user's saved profile. The "next" workplace is the anchor
// point for every listing they see. Distance is always measured to here.
export interface UserProfile {
  id: string;
  user_type: UserType;
  display_name: string;
  // Where they are rotating TO. This drives the whole listings view.
  next_city: string;
  workplace_name: string; // hospital for doctors, office for graduates
  workplace_postcode: string;
  workplace_lat: number;
  workplace_lng: number;
  move_date: string; // ISO date
  budget_min: number;
  budget_max: number;
}

// A listing once it has been measured against the current user's workplace.
export interface RankedListing extends Listing {
  distance_miles: number;
}
