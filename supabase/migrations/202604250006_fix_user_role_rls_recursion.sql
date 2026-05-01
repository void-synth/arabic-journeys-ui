-- Prevent RLS recursion/timeouts when policies call public.user_role(auth.uid()).
-- user_role must bypass RLS on profiles to avoid recursive policy evaluation.

create or replace function public.user_role(uid uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select p.role
  from public.profiles p
  where p.id = uid
  limit 1;
$$;

revoke all on function public.user_role(uuid) from public;
grant execute on function public.user_role(uuid) to authenticated;
grant execute on function public.user_role(uuid) to service_role;
