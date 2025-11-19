/*
  Recompute skill_stats for all skills based on current sessions.
*/
do $$
declare
  r record;
begin
  for r in select id from public.skills loop
    perform public.recalc_skill_stats(r.id);
  end loop;
end$$;
