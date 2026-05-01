-- Hardening pass: advisor-driven function and index fixes
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.user_role(uid uuid)
returns text
language sql
stable
set search_path = public
as $$
  select role from public.profiles where id = uid;
$$;

create or replace function public.validate_teacher_student_assignment()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  teacher_role text;
  student_role text;
begin
  select role into teacher_role from public.profiles where id = new.teacher_id;
  select role into student_role from public.profiles where id = new.student_id;
  if teacher_role is distinct from 'teacher' then
    raise exception 'teacher_id must reference a teacher profile';
  end if;
  if student_role is distinct from 'student' then
    raise exception 'student_id must reference a student profile';
  end if;
  return new;
end;
$$;

create or replace function public.export_sessions_csv()
returns table(line text)
language sql
security definer
set search_path = public
as $$
  select 'id,title,subject,teacher_id,start_at,duration_minutes,status'::text
  union all
  select concat_ws(',', id::text, replace(title, ',', ' '), replace(subject, ',', ' '), teacher_id::text, start_at::text, duration_minutes::text, status)
  from public.sessions
  where public.user_role(auth.uid()) = 'admin';
$$;

create index if not exists idx_attendance_recorded_by on public.attendance(recorded_by);
create index if not exists idx_attendance_student_id on public.attendance(student_id);
create index if not exists idx_audit_actor_user on public.audit_log(actor_user_id);
create index if not exists idx_notification_reads_user_id on public.notification_reads(user_id);
create index if not exists idx_notifications_recipient_user_id on public.notifications(recipient_user_id);
create index if not exists idx_tsa_student_id on public.teacher_student_assignments(student_id);
