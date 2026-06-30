import type { Listing, UserProfile } from './types';

// IMPORTANT: every listing and review below is ILLUSTRATIVE placeholder data,
// not a real property or a real person. It exists so the listings screen has
// something to render before the database is connected. The reviews are
// examples of the kind of thing the platform will hold, not testimonials.
// Replace all of this with live Supabase data via the seed file and signups.

// The signed in user. Until real auth and the signup flow are built, the app
// treats this person as the logged in user. They are a doctor rotating into
// Manchester, so the whole view is anchored to Manchester Royal Infirmary.
// To preview the graduate colourway and office ranking, swap this for
// MOCK_GRADUATE_PROFILE below.
export const MOCK_DOCTOR_PROFILE: UserProfile = {
  id: 'mock-doctor-1',
  user_type: 'doctor',
  display_name: 'Sam',
  next_city: 'Manchester',
  workplace_name: 'Manchester Royal Infirmary',
  workplace_postcode: 'M13 9WL',
  workplace_lat: 53.4624,
  workplace_lng: -2.2256,
  move_date: '2027-08-04',
  budget_min: 600,
  budget_max: 1100,
};

// Provided so you can see the graduate (purple) view. Office is Spinningfields.
export const MOCK_GRADUATE_PROFILE: UserProfile = {
  id: 'mock-grad-1',
  user_type: 'graduate',
  display_name: 'Alex',
  next_city: 'Manchester',
  workplace_name: 'Deansgate office',
  workplace_postcode: 'M3 3EB',
  workplace_lat: 53.4794,
  workplace_lng: -2.2517,
  move_date: '2027-09-01',
  budget_min: 700,
  budget_max: 1300,
};

// Switch this to MOCK_GRADUATE_PROFILE to preview the graduate colourway.
export const MOCK_CURRENT_PROFILE: UserProfile = MOCK_DOCTOR_PROFILE;

function img(seed: string): string {
  // Stable, obviously-placeholder room photos. Swap for real listing photos
  // (Supabase Storage) later.
  return `https://picsum.photos/seed/${seed}/800/600`;
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 'l-001',
    address: 'Room in 3 bed flat, Hathersage Road',
    postcode: 'M13 0FW',
    lat: 53.4585,
    lng: -2.2208,
    price_pcm: 720,
    room_type: 'double',
    available_from: '2027-07-28',
    photo_url: img('hathersage'),
    description:
      'Double room a short walk from the hospital. Quiet street, good blinds, washer dryer in the flat. Current tenant is a surgical FY1 rotating out in August.',
    landlord_name: 'Priya',
    handover: {
      available: true,
      outgoing_tenant_name: 'Jess',
      rotation_detail: 'FY1, General Surgery',
      available_from: '2027-08-02',
      recommendation:
        'Did my whole FY1 here. The blackout blinds are a lifesaver after nights and the landlord never minded me sleeping odd hours. Bus to the front door takes ten minutes if it is raining.',
    },
    reviews: [
      {
        id: 'r-001',
        author_type: 'doctor',
        rating: 5,
        body: 'Slept fine after a run of nights, the room genuinely goes dark. Landlord understood the shift pattern from day one.',
        tags: [
          { label: 'Quiet after nights', audience: 'doctor' },
          { label: 'Blackout blinds', audience: 'doctor' },
          { label: 'Landlord understands shift patterns', audience: 'doctor' },
        ],
        created_at: '2026-02-11',
      },
    ],
  },
  {
    id: 'l-002',
    address: 'Single room, Plymouth Grove',
    postcode: 'M13 0AF',
    lat: 53.4609,
    lng: -2.2143,
    price_pcm: 640,
    room_type: 'single',
    available_from: '2027-08-01',
    photo_url: img('plymouth'),
    description:
      'Affordable single in a friendly house share. Two of the current housemates are doctors at the MRI. Cycle storage in the yard.',
    landlord_name: 'Tom',
    handover: null,
    reviews: [
      {
        id: 'r-002',
        author_type: 'doctor',
        rating: 4,
        body: 'Great if you cycle, the route in avoids the main road almost the whole way. Walls are a little thin but housemates are sound.',
        tags: [
          { label: 'Good cycle route to hospital', audience: 'doctor' },
          { label: 'Housemates on schemes', audience: 'shared' },
        ],
        created_at: '2026-01-20',
      },
    ],
  },
  {
    id: 'l-003',
    address: 'Double room with parking, Victoria Park',
    postcode: 'M14 5RU',
    lat: 53.4538,
    lng: -2.2125,
    price_pcm: 850,
    room_type: 'double',
    available_from: '2027-08-10',
    photo_url: img('victoriapark'),
    description:
      'Large double in a quiet conservation area. Off street parking included, which is rare this close in. Suits someone driving to on call shifts.',
    landlord_name: 'Margaret',
    handover: {
      available: true,
      outgoing_tenant_name: 'Daniel',
      rotation_detail: 'FY2, Acute Medicine',
      available_from: '2027-08-12',
      recommendation:
        'The parking is the whole reason I stayed two years. Being able to drive in for a twilight shift and park outside the house at 3am is worth a lot. Margaret is a brilliant landlord.',
    },
    reviews: [
      {
        id: 'r-003',
        author_type: 'doctor',
        rating: 5,
        body: 'Parking outside the door changed my life on nights. Area is calm and green.',
        tags: [
          { label: 'Parking available', audience: 'doctor' },
          { label: 'Quiet after nights', audience: 'doctor' },
        ],
        created_at: '2025-12-03',
      },
    ],
  },
  {
    id: 'l-004',
    address: 'Whole one bed flat, Brunswick',
    postcode: 'M13 9UY',
    lat: 53.4651,
    lng: -2.2231,
    price_pcm: 1050,
    room_type: 'whole_flat',
    available_from: '2027-07-20',
    photo_url: img('brunswick'),
    description:
      'Self contained one bed for someone who wants their own space. Closest option to the hospital on the list. Modern build, fast broadband.',
    landlord_name: 'Lettings Co',
    handover: null,
    reviews: [
      {
        id: 'r-004',
        author_type: 'graduate',
        rating: 4,
        body: 'Broadband is genuinely fast, worked from home with no issues. Walkable to the centre too.',
        tags: [
          { label: 'Fast wifi', audience: 'graduate' },
          { label: 'Easy commute', audience: 'graduate' },
        ],
        created_at: '2026-03-01',
      },
    ],
  },
  {
    id: 'l-005',
    address: 'Room in 4 bed, Fallowfield',
    postcode: 'M14 6XS',
    lat: 53.4421,
    lng: -2.2189,
    price_pcm: 600,
    room_type: 'single',
    available_from: '2027-08-05',
    photo_url: img('fallowfield'),
    description:
      'Budget friendly room a bit further out, on a direct bus route to the hospital. Lively area, lots of food nearby.',
    landlord_name: 'Karim',
    handover: null,
    reviews: [
      {
        id: 'r-005',
        author_type: 'doctor',
        rating: 3,
        body: 'Cheap and the bus is reliable, but it can be noisy at weekends. Fine if you are a heavy sleeper.',
        tags: [{ label: 'Good transport links', audience: 'shared' }],
        created_at: '2026-02-28',
      },
    ],
  },
  {
    id: 'l-006',
    address: 'Double room, Rusholme',
    postcode: 'M14 5SU',
    lat: 53.4503,
    lng: -2.2261,
    price_pcm: 700,
    room_type: 'double',
    available_from: '2027-07-30',
    photo_url: img('rusholme'),
    description:
      'Comfortable double in a settled house share. Short walk to the hospital and to the curry mile. Landlord is flexible on the start date.',
    landlord_name: 'Sofia',
    handover: {
      available: true,
      outgoing_tenant_name: 'Aisha',
      rotation_detail: 'FY1, Paediatrics',
      available_from: '2027-07-30',
      recommendation:
        'Loved living here. The walk in clears your head before a shift and the house is genuinely quiet in the daytime so you can sleep after nights. Sofia let me move in a week early with no fuss.',
    },
    reviews: [
      {
        id: 'r-006',
        author_type: 'doctor',
        rating: 5,
        body: 'Ten minute walk to the wards and it actually goes quiet in the day. Landlord flexible on dates when my rotation moved.',
        tags: [
          { label: 'Quiet after nights', audience: 'doctor' },
          { label: 'Landlord flexible on dates', audience: 'graduate' },
        ],
        created_at: '2026-01-09',
      },
    ],
  },
];
