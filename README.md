# Placement

Verified housing for junior doctors and graduate scheme workers, ranked by
distance to their workplace. This repository is the start of the real product,
beginning with its most important screen: the personalised, distance ranked
listings page.

Built on the stack from the product spec: Next.js, Supabase, Vercel.

---

## What is built so far

The listings screen, end to end and personalised:

- Listings ranked by distance to the logged in user's specific workplace, the
  hospital for a doctor, the office for a graduate. Never the city centre.
- The doctor (green) and graduate (purple) colourways, chosen automatically
  from the user's profile. No toggle is shown.
- Doctor review tags (quiet after nights, blackout blinds, parking, and so on),
  ordered so the current user's tags surface first.
- The handover model surfaced on each relevant listing, showing the outgoing
  tenant, their rotation and their personal recommendation.
- The context bar (city, workplace, move date, budget) below the nav.

It runs immediately on illustrative placeholder data, and switches to live
Supabase data with no code changes the moment you add your keys.

---

## See it running

You need Node.js 18.17 or newer installed.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in a browser. It redirects to /listings.

It will work straight away on the placeholder data, no database or keys needed.

### Putting it online

The simplest route, matching your spec:

1. Push this folder to a new GitHub repository.
2. Go to vercel.com, import that repository, and click Deploy.

That gives you a live URL you can share with your doctor contacts to test the
screen. No configuration is required for the placeholder version.

---

## Switching from placeholder to live data

1. Create a project at supabase.com.
2. In the Supabase SQL editor, run `supabase/schema.sql`, then optionally
   `supabase/seed.sql` for some illustrative rows.
3. Copy `.env.local.example` to `.env.local` and paste in your Supabase URL and
   anon key (Supabase shows both under Project Settings, API).
4. Restart `npm run dev`.

The app now reads live data. The "illustrative placeholder" notice disappears
on its own once the keys are present.

---

## How it is structured (for whoever grows it next)

```
src/
  app/
    listings/page.tsx   The listings screen (a Server Component)
    layout.tsx          Brand fonts and page shell
    page.tsx            Home, redirects to /listings
  components/           Logo, ContextBar, ListingCard, ReviewTags, HandoverPanel
  lib/
    types.ts            The data shapes, mirroring the database
    data.ts             THE SEAM. Reads Supabase if configured, else mock data
    distance.ts         Distance ranking (haversine now, swap in a maps API later)
    supabase.ts         Supabase client, null when not configured
    mock-data.ts        Illustrative placeholder listings and profile
supabase/
  schema.sql            Create the tables
  seed.sql              Illustrative rows
```

Two seams are worth knowing about, because they are where the next work plugs
in without disturbing anything else:

- **`src/lib/data.ts`** is the only place the app talks to a data source. When
  you build signup and auth, change `getCurrentProfile` to look up the logged
  in user. Nothing in the components changes.
- **`src/lib/distance.ts`** ranks by straight line distance for now, so the
  screen works with no API key. When you want real travel distance, replace the
  body of `rankListings` with a call to Google Maps Distance Matrix or Mapbox.
  Every component reads `listing.distance_miles` and does not care how it was
  measured.

---

## What comes next (from the product spec, in build order)

1. Signup and verification. Doctor via GMC number, graduate via work email.
   Note: there is no free public GMC API. The workable route is the GMC
   register download licence (around £815 a year), imported and checked
   locally. Worth confirming before you design this flow.
2. Listing creation for landlords.
3. The handover request flow (request, confirm, handover document).
4. Email notifications (signup, new listing nearby, rotation reminder).
5. Review submission.

---

## A note on the placeholder content

Every listing, review and recommendation in `mock-data.ts` and `seed.sql` is
illustrative. None of it is a real property, person or testimonial. It exists
only so the screen has something to show before real listings arrive. Clear it
out before launch.
