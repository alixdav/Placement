-- Illustrative seed data for Placement. Everything here is placeholder, not a
-- real property or person. Run after schema.sql to see the listings screen
-- working against a live database. Delete before going to production.

-- A doctor profile anchored to Manchester Royal Infirmary.
insert into profiles
  (user_type, display_name, next_city, workplace_name, workplace_postcode,
   workplace_lat, workplace_lng, move_date, budget_min, budget_max)
values
  ('doctor', 'Sam', 'Manchester', 'Manchester Royal Infirmary', 'M13 9WL',
   53.4624, -2.2256, '2027-08-04', 600, 1100);

-- Three illustrative listings. Add more as needed.
insert into listings
  (id, address, postcode, lat, lng, price_pcm, room_type, available_from,
   photo_url, description, landlord_name, handover)
values
  ('11111111-1111-1111-1111-111111111111',
   'Room in 3 bed flat, Hathersage Road', 'M13 0FW', 53.4585, -2.2208, 720,
   'double', '2027-07-28', 'https://picsum.photos/seed/hathersage/800/600',
   'Double room a short walk from the hospital. Quiet street, good blinds.',
   'Priya',
   '{"available": true, "outgoing_tenant_name": "Jess", "rotation_detail": "FY1, General Surgery", "available_from": "2027-08-02", "recommendation": "Did my whole FY1 here. The blackout blinds are a lifesaver after nights."}'),
  ('22222222-2222-2222-2222-222222222222',
   'Double room with parking, Victoria Park', 'M14 5RU', 53.4538, -2.2125, 850,
   'double', '2027-08-10', 'https://picsum.photos/seed/victoriapark/800/600',
   'Large double in a quiet area. Off street parking included, rare this close in.',
   'Margaret',
   '{"available": true, "outgoing_tenant_name": "Daniel", "rotation_detail": "FY2, Acute Medicine", "available_from": "2027-08-12", "recommendation": "The parking is the whole reason I stayed two years."}'),
  ('33333333-3333-3333-3333-333333333333',
   'Single room, Plymouth Grove', 'M13 0AF', 53.4609, -2.2143, 640,
   'single', '2027-08-01', 'https://picsum.photos/seed/plymouth/800/600',
   'Affordable single in a friendly house share. Cycle storage in the yard.',
   'Tom', null);

insert into reviews (listing_id, author_type, rating, body, tags)
values
  ('11111111-1111-1111-1111-111111111111', 'doctor', 5,
   'Slept fine after a run of nights, the room genuinely goes dark.',
   '[{"label": "Quiet after nights", "audience": "doctor"}, {"label": "Blackout blinds", "audience": "doctor"}]'),
  ('22222222-2222-2222-2222-222222222222', 'doctor', 5,
   'Parking outside the door changed my life on nights.',
   '[{"label": "Parking available", "audience": "doctor"}]'),
  ('33333333-3333-3333-3333-333333333333', 'doctor', 4,
   'Great if you cycle, the route in avoids the main road almost the whole way.',
   '[{"label": "Good cycle route to hospital", "audience": "doctor"}]');
