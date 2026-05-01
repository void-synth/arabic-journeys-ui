-- Platform settings (admin-managed)
create table if not exists public.platform_settings (
  id boolean primary key default true,
  platform_name text not null default 'ArabicLearn',
  support_email text not null default 'support@arabiclearn.com',
  max_students_per_session int not null default 20 check (max_students_per_session between 1 and 200),
  updated_at timestamptz not null default now()
);

create trigger trg_platform_settings_updated_at
before update on public.platform_settings
for each row execute function public.set_updated_at();

insert into public.platform_settings (id)
values (true)
on conflict (id) do nothing;

alter table public.platform_settings enable row level security;

drop policy if exists platform_settings_admin_read on public.platform_settings;
create policy platform_settings_admin_read on public.platform_settings
for select using (public.user_role(auth.uid()) = 'admin');

drop policy if exists platform_settings_admin_update on public.platform_settings;
create policy platform_settings_admin_update on public.platform_settings
for update using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

-- Admin reset helper (demo reset from dashboard settings)
create or replace function public.admin_reset_demo_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.user_role(auth.uid()) <> 'admin' then
    raise exception 'forbidden';
  end if;
  delete from public.notification_reads;
  delete from public.notifications;
  delete from public.attendance;
  delete from public.session_students;
  delete from public.sessions;
  delete from public.teacher_student_assignments;
end;
$$;

-- Audit trigger support
create or replace function public.write_audit_log()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  actor uuid := auth.uid();
  target text;
begin
  target := coalesce((to_jsonb(new) ->> 'id'), (to_jsonb(old) ->> 'id'));
  insert into public.audit_log (actor_user_id, action, target_table, target_id, payload)
  values (
    actor,
    tg_op,
    tg_table_name,
    target,
    case
      when tg_op = 'DELETE' then to_jsonb(old)
      else to_jsonb(new)
    end
  );
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_audit_profiles on public.profiles;
create trigger trg_audit_profiles
after update on public.profiles
for each row execute function public.write_audit_log();

drop trigger if exists trg_audit_sessions on public.sessions;
create trigger trg_audit_sessions
after insert or update or delete on public.sessions
for each row execute function public.write_audit_log();

drop trigger if exists trg_audit_attendance on public.attendance;
create trigger trg_audit_attendance
after insert or update or delete on public.attendance
for each row execute function public.write_audit_log();

drop trigger if exists trg_audit_assignments on public.teacher_student_assignments;
create trigger trg_audit_assignments
after insert or delete on public.teacher_student_assignments
for each row execute function public.write_audit_log();
