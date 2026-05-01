-- RLS smoke tests (manual SQL runner)
-- Run in Supabase SQL Editor after creating test users and profiles.

-- Example helper:
-- select auth.uid(); -- should reflect current JWT user in SQL editor JWT context

-- 1) Student should read only own profile
-- select * from public.profiles;

-- 2) Teacher should read own + assigned/enrolled students
-- select p.* from public.profiles p order by p.created_at desc;

-- 3) Teacher can upsert attendance only for own sessions
-- insert into public.attendance (session_id, student_id, status, recorded_by)
-- values ('<session_uuid>', '<student_uuid>', 'present', auth.uid())
-- on conflict (session_id, student_id) do update set status = excluded.status;

-- 4) Student cannot update sessions
-- update public.sessions set title = 'should-fail' where id = '<session_uuid>';

-- 5) Admin can assign learners
-- select public.admin_assign_students_to_teacher('<teacher_uuid>', array['<student_uuid>']::uuid[]);
