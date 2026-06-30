-- Placement database schema for Supabase (Postgres).
-- Run this in the Supabase SQL editor to create the tables the app reads.
-- The shapes here match src/lib/types.ts exactly, so a plain "select *"
-- returns rows the app can use without any mapping.

-- One profile per signed up user. The "next" workplace is the anchor for
-- every listing they see. Distance is always measured to here.
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_type text not null check (user_type in ('doctor', 'graduate')),
  display_name text not null,
  next_city text not null,
  workplace_name text not null,
  workplace_postcode text not null,
  workplace_lat double precision not null,
  workplace_lng double precision not null,
  move_date date not null,
  budget_min integer not null,
  budget_max integer not null,
  created_at timestamptz not null default now()
);

-- One listings table serves both audiences. Distance is never stored here,
-- it is computed at render time against each user's workplace.
-- Handover is stored as jsonb so it maps straight onto the Handover type,
-- or is null when the listing is not a handover.
create table if not exists listings (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  postcode text not null,
  lat double precision not null,
  lng double precision not null,
  price_pcm integer not null,
  room_type text not null check (room_type in ('single', 'double', 'whole_flat')),
  available_from date not null,
  photo_url text not null,
  description text not null,
  landlord_name text not null,
  handover jsonb,
  created_at timestamptz not null default now()
);

-- Reviews are tagged by audience so the right tags surface to the right user.
-- tags is a jsonb array of { label, audience } objects.
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  author_type text not null check (author_type in ('doctor', 'graduate')),
  rating integer not null check (rating between 1 and 5),
  body text not null,
  tags jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create index if not exists reviews_listing_id_idx on reviews(listing_id);

-- Row level security. Listings and reviews are readable by anyone (the
-- listings screen is the public product). Tighten profile access so a user
-- only reads their own row once auth is wired up.
alter table listings enable row level security;
alter table reviews enable row level security;
alter table profiles enable row level security;

create policy "listings are readable by everyone"
  on listings for select using (true);

create policy "reviews are readable by everyone"
  on reviews for select using (true);

-- Placeholder profile policy for development: readable by everyone.
-- Replace with "auth.uid() = id" once you add Supabase Auth so each user
-- can only read and edit their own profile.
create policy "profiles readable in development"
  on profiles for select using (true);
