import type { Listing, RankedListing, UserProfile } from './types';

// Distance ranking is the heart of Placement. Listings are ordered by how
// close they are to the user's specific workplace, never the city centre.
//
// For now this uses the haversine formula, which gives straight line miles
// between two points. It needs no API key, so the listings screen ranks
// correctly out of the box.
//
// When you are ready for real travel distance (the spec suggests the Google
// Maps Distance Matrix API or Mapbox), replace the body of rankListings with
// a call to that service. Nothing else in the app needs to change, because
// every component reads listing.distance_miles and does not care how it was
// produced. That is the seam.

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function haversineMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

// Measure every listing against the user's saved workplace, then sort closest
// first. Returns a new array, does not mutate the input.
export function rankListings(
  listings: Listing[],
  profile: UserProfile,
): RankedListing[] {
  return listings
    .map((listing) => ({
      ...listing,
      distance_miles: haversineMiles(
        profile.workplace_lat,
        profile.workplace_lng,
        listing.lat,
        listing.lng,
      ),
    }))
    .sort((a, b) => a.distance_miles - b.distance_miles);
}

export function formatMiles(miles: number): string {
  return `${miles.toFixed(1)} miles`;
}
