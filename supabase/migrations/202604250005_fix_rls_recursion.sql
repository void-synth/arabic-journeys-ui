-- Fix recursive RLS dependencies between sessions and session_students.
-- Policies now rely on security-definer helper functions to avoid
-- policy->table->policy infinite recursion.

create or replace function public.is_session_teacher(in_session_id uuid, in_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.sessions s
    where s.id = in_session_id
      and s.teacher_id = in_user_id
  );
$$;

create or replace function public.is_student_in_session(in_session_id uuid, in_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.session_students ss
    where ss.session_id = in_session_id
      and ss.student_id = in_user_id
  );
$$;

revoke all on function public.is_session_teacher(uuid, uuid) from public;
revoke all on function public.is_student_in_session(uuid, uuid) from public;
grant execute on function public.is_session_teacher(uuid, uuid) to authenticated;
grant execute on function public.is_student_in_session(uuid, uuid) to authenticated;

drop policy if exists sessions_student_read on public.sessions;
create policy sessions_student_read on public.sessions
for select using (public.is_student_in_session(sessions.id, auth.uid()));

drop policy if exists session_students_teacher_manage on public.session_students;
create policy session_students_teacher_manage on public.session_students
for all using (public.is_session_teacher(session_students.session_id, auth.uid()))
with check (public.is_session_teacher(session_students.session_id, auth.uid()));

drop policy if exists attendance_teacher_manage on public.attendance;
create policy attendance_teacher_manage on public.attendance
for all using (public.is_session_teacher(attendance.session_id, auth.uid()))
with check (
  public.is_session_teacher(attendance.session_id, auth.uid())
  and recorded_by = auth.uid()
);
