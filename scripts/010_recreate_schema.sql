/*
  Recreate the entire schema for Skill Swap - Peer Learning Platform
  - Drops old objects (tables, functions, triggers, policies, storage buckets) if present
  - Creates optimized tables, enums, indexes, RLS, and triggers
  - Sets up storage buckets: avatars, skill-images
  IMPORTANT:
  - Run this script with sufficient privileges (Supabase SQL) in Production DB.
  - This operation is destructive; all prior data in these tables will be lost.
*/

begin;

-- Extensions
create extension if not exists pgcrypto;      -- gen_random_uuid()
create extension if not exists pg_trgm;       -- GIN search on text

-- DROP existing triggers/functions first (to avoid dependency issues)
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user() cascade;
drop function if exists public.set_updated_at() cascade;
drop function if exists public.recalc_skill_stats(uuid) cascade;
drop function if exists public.maintain_skill_stats() cascade;

-- DROP objects in dependency-safe order
drop table if exists public.skill_stats cascade;
drop table if exists public.messages cascade;
drop table if exists public.sessions cascade;
drop table if exists public.matches cascade;
drop table if exists public.user_skills cascade;
drop table if exists public.achievements cascade;
drop table if exists public.skills cascade;
drop table if exists public.profiles cascade;

-- DROP types
do $$
begin
  if exists (select 1 from pg_type where typname = 'proficiency_level_enum') then
    drop type proficiency_level_enum;
  end if;
  if exists (select 1 from pg_type where typname = 'skill_type_enum') then
    drop type skill_type_enum;
  end if;
  if exists (select 1 from pg_type where typname = 'session_status_enum') then
    drop type session_status_enum;
  end if;
  if exists (select 1 from pg_type where typname = 'match_status_enum') then
    drop type match_status_enum;
  end if;
end$$;

-- Enums
create type proficiency_level_enum as enum ('beginner','intermediate','advanced','expert');
create type skill_type_enum         as enum ('learn','teach');
create type session_status_enum     as enum ('scheduled','completed','cancelled');
create type match_status_enum       as enum ('pending','accepted','rejected','completed','cancelled');

-- Tables
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url   text,
  location     text,
  bio          text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create table public.skills (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  category    text,
  image_url   text,
  created_by  uuid references auth.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table public.user_skills (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users(id) on delete cascade,
  skill_id          uuid not null references public.skills(id) on delete cascade,
  skill_type        skill_type_enum not null,
  proficiency_level proficiency_level_enum,
  availability      text,
  hourly_rate       numeric(10,2),
  created_at        timestamptz not null default now(),
  unique (user_id, skill_id, skill_type)
);

create table public.matches (
  id         uuid primary key default gen_random_uuid(),
  learner_id uuid not null references auth.users(id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  skill_id   uuid not null references public.skills(id) on delete cascade,
  status     match_status_enum not null default 'pending',
  message    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id           uuid primary key default gen_random_uuid(),
  match_id     uuid not null references public.matches(id) on delete cascade,
  sender_id    uuid not null references auth.users(id) on delete cascade,
  content      text not null,
  message_type text not null default 'text',
  created_at   timestamptz not null default now()
);

create table public.sessions (
  id               uuid primary key default gen_random_uuid(),
  match_id         uuid not null references public.matches(id) on delete cascade,
  scheduled_at     timestamptz,
  duration_minutes integer,
  status           session_status_enum not null default 'scheduled',
  rating           integer check (rating between 1 and 5),
  notes            text,
  feedback         text,
  created_at       timestamptz not null default now()
);

create table public.achievements (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  title      text not null,
  description text,
  badge_type  text,
  earned_at   timestamptz not null default now()
);

-- Aggregation table, maintained via triggers
create table public.skill_stats (
  skill_id        uuid primary key references public.skills(id) on delete cascade,
  session_count   integer not null default 0,
  avg_rating      numeric(3,2) not null default 0,
  last_session_at timestamptz
);

-- Indexes for performance (search + lookups)
create index if not exists idx_skills_name_trgm on public.skills using gin (name gin_trgm_ops);
create index if not exists idx_skills_desc_trgm on public.skills using gin (description gin_trgm_ops);
create index if not exists idx_user_skills_user on public.user_skills (user_id);
create index if not exists idx_user_skills_skill on public.user_skills (skill_id);
create index if not exists idx_matches_teacher on public.matches (teacher_id);
create index if not exists idx_matches_learner on public.matches (learner_id);
create index if not exists idx_messages_match_created on public.messages (match_id, created_at desc);
create index if not exists idx_sessions_match_created on public.sessions (match_id, created_at desc);

-- Utility triggers/functions
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end$$;

create trigger trg_matches_set_updated
before update on public.matches
for each row
execute function public.set_updated_at();

-- Auto-create profile on new auth user
create or replace function public.handle_new_user()
returns trigger
security definer
set search_path = public
language plpgsql as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(split_part(new.email,'@',1),'User'));
  return new;
end$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Aggregation recalculation for skill_stats
create or replace function public.recalc_skill_stats(p_skill_id uuid)
returns void language plpgsql as $$
declare
  v_count integer;
  v_avg   numeric(3,2);
  v_last  timestamptz;
begin
  select
    coalesce(count(*),0),
    coalesce(avg(s.rating)::numeric(3,2),0),
    max(s.created_at)
  into v_count, v_avg, v_last
  from public.sessions s
  join public.matches m on m.id = s.match_id
  where m.skill_id = p_skill_id
    and s.status = 'completed'
    and s.rating is not null;

  insert into public.skill_stats (skill_id, session_count, avg_rating, last_session_at)
  values (p_skill_id, v_count, v_avg, v_last)
  on conflict (skill_id)
  do update set
    session_count = excluded.session_count,
    avg_rating = excluded.avg_rating,
    last_session_at = excluded.last_session_at;
end$$;

create or replace function public.maintain_skill_stats()
returns trigger language plpgsql as $$
declare
  v_match_id uuid;
  v_skill_id uuid;
begin
  v_match_id := coalesce(new.match_id, old.match_id);
  if v_match_id is null then
    return null;
  end if;
  select skill_id into v_skill_id from public.matches where id = v_match_id;
  if v_skill_id is not null then
    perform public.recalc_skill_stats(v_skill_id);
  end if;
  return null;
end$$;

create trigger trg_sessions_maintain_stats
after insert or update or delete on public.sessions
for each row
execute function public.maintain_skill_stats();

-- RLS
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.user_skills enable row level security;
alter table public.matches enable row level security;
alter table public.messages enable row level security;
alter table public.sessions enable row level security;
alter table public.achievements enable row level security;
alter table public.skill_stats enable row level security;

-- Profiles: anyone can read; user updates own row
drop policy if exists profiles_read_all on public.profiles;
create policy profiles_read_all on public.profiles for select using (true);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

-- Skills: public read; create by any authenticated; update/delete only by creator
drop policy if exists skills_read_all on public.skills;
create policy skills_read_all on public.skills for select using (true);

drop policy if exists skills_insert on public.skills;
create policy skills_insert on public.skills
for insert with check (auth.role() = 'authenticated');

drop policy if exists skills_update_own on public.skills;
create policy skills_update_own on public.skills
for update using (created_by = auth.uid()) with check (created_by = auth.uid());

drop policy if exists skills_delete_own on public.skills;
create policy skills_delete_own on public.skills
for delete using (created_by = auth.uid());

-- User skills: read all; write own
drop policy if exists user_skills_read_all on public.user_skills;
create policy user_skills_read_all on public.user_skills for select using (true);

drop policy if exists user_skills_write_own on public.user_skills;
create policy user_skills_write_own on public.user_skills
for insert with check (user_id = auth.uid());

drop policy if exists user_skills_update_own on public.user_skills;
create policy user_skills_update_own on public.user_skills
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists user_skills_delete_own on public.user_skills;
create policy user_skills_delete_own on public.user_skills
for delete using (user_id = auth.uid());

-- Matches: participants can read/write
drop policy if exists matches_read on public.matches;
create policy matches_read on public.matches
for select using (auth.uid() in (learner_id, teacher_id));

drop policy if exists matches_write on public.matches;
create policy matches_write on public.matches
for insert with check (auth.uid() in (learner_id, teacher_id));

drop policy if exists matches_update_participants on public.matches;
create policy matches_update_participants on public.matches
for update using (auth.uid() in (learner_id, teacher_id))
with check (auth.uid() in (learner_id, teacher_id));

-- Messages: only participants; sender must be auth user
drop policy if exists messages_read on public.messages;
create policy messages_read on public.messages
for select using (
  auth.uid() = sender_id or
  exists (select 1 from public.matches m
          where m.id = messages.match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
);

drop policy if exists messages_insert on public.messages;
create policy messages_insert on public.messages
for insert with check (
  auth.uid() = sender_id and
  exists (select 1 from public.matches m
          where m.id = match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
);

-- Sessions: participants can read/write
drop policy if exists sessions_read on public.sessions;
create policy sessions_read on public.sessions
for select using (
  exists (select 1 from public.matches m
          where m.id = sessions.match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
);

drop policy if exists sessions_write on public.sessions;
create policy sessions_write on public.sessions
for insert with check (
  exists (select 1 from public.matches m
          where m.id = match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
);

drop policy if exists sessions_update on public.sessions;
create policy sessions_update on public.sessions
for update using (
  exists (select 1 from public.matches m
          where m.id = sessions.match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
)
with check (
  exists (select 1 from public.matches m
          where m.id = sessions.match_id
            and auth.uid() in (m.learner_id, m.teacher_id))
);

-- Achievements: user can read/write own
drop policy if exists achievements_read_own on public.achievements;
create policy achievements_read_own on public.achievements
for select using (user_id = auth.uid());

drop policy if exists achievements_write_own on public.achievements;
create policy achievements_write_own on public.achievements
for insert with check (user_id = auth.uid());

drop policy if exists achievements_update_own on public.achievements;
create policy achievements_update_own on public.achievements
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- skill_stats: allow public read (aggregated, safe)
drop policy if exists skill_stats_read_all on public.skill_stats;
create policy skill_stats_read_all on public.skill_stats
for select using (true);

-- STORAGE BUCKETS (avatars, skill-images)
-- Create buckets if they don't exist
insert into storage.buckets (id, name, public)
values ('avatars','avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('skill-images','skill-images', true)
on conflict (id) do nothing;

-- Storage policies: public read, authenticated write; restrict updates/deletes to object owner
-- Avatars
drop policy if exists avatars_read on storage.objects;
create policy avatars_read
on storage.objects for select
using (bucket_id = 'avatars');

drop policy if exists avatars_insert on storage.objects;
create policy avatars_insert
on storage.objects for insert
with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

drop policy if exists avatars_update_owner on storage.objects;
create policy avatars_update_owner
on storage.objects for update
using (bucket_id = 'avatars' and owner = auth.uid())
with check (bucket_id = 'avatars' and owner = auth.uid());

drop policy if exists avatars_delete_owner on storage.objects;
create policy avatars_delete_owner
on storage.objects for delete
using (bucket_id = 'avatars' and owner = auth.uid());

-- Skill images
drop policy if exists skill_images_read on storage.objects;
create policy skill_images_read
on storage.objects for select
using (bucket_id = 'skill-images');

drop policy if exists skill_images_insert on storage.objects;
create policy skill_images_insert
on storage.objects for insert
with check (bucket_id = 'skill-images' and auth.role() = 'authenticated');

drop policy if exists skill_images_update_owner on storage.objects;
create policy skill_images_update_owner
on storage.objects for update
using (bucket_id = 'skill-images' and owner = auth.uid())
with check (bucket_id = 'skill-images' and owner = auth.uid());

drop policy if exists skill_images_delete_owner on storage.objects;
create policy skill_images_delete_owner
on storage.objects for delete
using (bucket_id = 'skill-images' and owner = auth.uid());

commit;
