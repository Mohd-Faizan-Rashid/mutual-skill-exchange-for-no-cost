/*
  Minimal seed for a non-empty UI.
  Safe to re-run: uses ON CONFLICT DO NOTHING on skills.id (generated IDs prevent conflict).
*/
insert into public.skills (name, description, category)
values
  ('Web Development', 'Build modern websites and apps', 'Technology'),
  ('Guitar Basics', 'Learn chords, strumming, and songs', 'Music'),
  ('Photography', 'Composition, lighting, and editing', 'Arts'),
  ('Cooking Essentials', 'Knife skills, sauces, and timing', 'Cooking')
on conflict do nothing;
