-- Extensions
create extension if not exists pgcrypto;

-- Keep updated_at current
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'teacher', 'student')),
  full_name text not null,
  email text not null unique,
  phone text,
  status text not null default 'active' check (status in ('active', 'inactive')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Auto-create profile when auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'role', 'student'),
    coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)),
    new.email
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

create or replace function public.user_role(uid uuid)
returns text
language sql
stable
as $$
  select role from public.profiles where id = uid;
$$;

-- Teacher-student assignments
create table if not exists public.teacher_student_assignments (
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (teacher_id, student_id)
);

create or replace function public.validate_teacher_student_assignment()
returns trigger
language plpgsql
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

drop trigger if exists trg_validate_teacher_student_assignment on public.teacher_student_assignments;
create trigger trg_validate_teacher_student_assignment
before insert or update on public.teacher_student_assignments
for each row execute function public.validate_teacher_student_assignment();

-- Sessions
create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subject text not null,
  teacher_id uuid not null references public.profiles(id) on delete restrict,
  start_at timestamptz not null,
  duration_minutes int not null check (duration_minutes > 0),
  description text not null default '',
  status text not null default 'upcoming' check (status in ('upcoming', 'ongoing', 'completed', 'cancelled')),
  meeting_provider text,
  meeting_url text,
  calendar_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger trg_sessions_updated_at
before update on public.sessions
for each row execute function public.set_updated_at();

-- Session enrollments
create table if not exists public.session_students (
  session_id uuid not null references public.sessions(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (session_id, student_id)
);

-- Attendance
create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null check (status in ('present', 'absent', 'late')),
  recorded_by uuid not null references public.profiles(id) on delete restrict,
  recorded_at timestamptz not null default now(),
  unique (session_id, student_id)
);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  audience_role text not null check (audience_role in ('admin', 'teacher', 'student')),
  recipient_user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null check (type in ('info', 'success', 'warning')),
  created_at timestamptz not null default now()
);

create table if not exists public.notification_reads (
  notification_id uuid not null references public.notifications(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  read_at timestamptz not null default now(),
  primary key (notification_id, user_id)
);

-- Google integration tables
create table if not exists public.google_accounts (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  google_sub text unique not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.google_tokens (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  access_token text not null,
  refresh_token text not null,
  scope text,
  token_type text,
  expiry timestamptz,
  updated_at timestamptz not null default now()
);

create trigger trg_google_tokens_updated_at
before update on public.google_tokens
for each row execute function public.set_updated_at();

-- Audit log
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id text,
  payload jsonb,
  created_at timestamptz not null default now()
);

-- Admin RPCs
create or replace function public.admin_assign_students_to_teacher(in_teacher_id uuid, in_student_ids uuid[])
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  sid uuid;
begin
  if public.user_role(auth.uid()) <> 'admin' then
    raise exception 'forbidden';
  end if;
  foreach sid in array in_student_ids loop
    insert into public.teacher_student_assignments (teacher_id, student_id)
    values (in_teacher_id, sid)
    on conflict do nothing;
  end loop;
end;
$$;

create or replace function public.admin_set_user_status(in_user_id uuid, in_status text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.user_role(auth.uid()) <> 'admin' then
    raise exception 'forbidden';
  end if;
  if in_status not in ('active', 'inactive') then
    raise exception 'invalid status';
  end if;
  update public.profiles set status = in_status where id = in_user_id;
end;
$$;

create or replace function public.export_sessions_csv()
returns table(line text)
language sql
security definer
as $$
  select 'id,title,subject,teacher_id,start_at,duration_minutes,status'::text
  union all
  select concat_ws(',', id::text, replace(title, ',', ' '), replace(subject, ',', ' '), teacher_id::text, start_at::text, duration_minutes::text, status)
  from public.sessions
  where public.user_role(auth.uid()) = 'admin';
$$;

-- RLS
alter table public.profiles enable row level security;
alter table public.teacher_student_assignments enable row level security;
alter table public.sessions enable row level security;
alter table public.session_students enable row level security;
alter table public.attendance enable row level security;
alter table public.notifications enable row level security;
alter table public.notification_reads enable row level security;
alter table public.google_accounts enable row level security;
alter table public.google_tokens enable row level security;
alter table public.audit_log enable row level security;

-- profiles
drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
for select using (id = auth.uid());

drop policy if exists profiles_select_admin on public.profiles;
create policy profiles_select_admin on public.profiles
for select using (public.user_role(auth.uid()) = 'admin');

drop policy if exists profiles_select_teacher_students on public.profiles;
create policy profiles_select_teacher_students on public.profiles
for select using (
  public.user_role(auth.uid()) = 'teacher' and (
    exists (select 1 from public.teacher_student_assignments tsa where tsa.teacher_id = auth.uid() and tsa.student_id = profiles.id)
    or exists (
      select 1
      from public.sessions s
      join public.session_students ss on ss.session_id = s.id
      where s.teacher_id = auth.uid() and ss.student_id = profiles.id
    )
  )
);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
for update using (id = auth.uid())
with check (id = auth.uid() and role = public.user_role(auth.uid()));

drop policy if exists profiles_update_admin on public.profiles;
create policy profiles_update_admin on public.profiles
for update using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

-- teacher_student_assignments
drop policy if exists tsa_admin_all on public.teacher_student_assignments;
create policy tsa_admin_all on public.teacher_student_assignments
for all using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

drop policy if exists tsa_teacher_select on public.teacher_student_assignments;
create policy tsa_teacher_select on public.teacher_student_assignments
for select using (teacher_id = auth.uid());

drop policy if exists tsa_student_select on public.teacher_student_assignments;
create policy tsa_student_select on public.teacher_student_assignments
for select using (student_id = auth.uid());

-- sessions
drop policy if exists sessions_admin_all on public.sessions;
create policy sessions_admin_all on public.sessions
for all using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

drop policy if exists sessions_teacher_manage on public.sessions;
create policy sessions_teacher_manage on public.sessions
for all using (teacher_id = auth.uid())
with check (teacher_id = auth.uid());

drop policy if exists sessions_student_read on public.sessions;
create policy sessions_student_read on public.sessions
for select using (
  exists (
    select 1 from public.session_students ss
    where ss.session_id = sessions.id and ss.student_id = auth.uid()
  )
);

-- session_students
drop policy if exists session_students_admin_all on public.session_students;
create policy session_students_admin_all on public.session_students
for all using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

drop policy if exists session_students_teacher_manage on public.session_students;
create policy session_students_teacher_manage on public.session_students
for all using (
  exists (select 1 from public.sessions s where s.id = session_students.session_id and s.teacher_id = auth.uid())
)
with check (
  exists (select 1 from public.sessions s where s.id = session_students.session_id and s.teacher_id = auth.uid())
);

drop policy if exists session_students_student_read on public.session_students;
create policy session_students_student_read on public.session_students
for select using (student_id = auth.uid());

-- attendance
drop policy if exists attendance_admin_all on public.attendance;
create policy attendance_admin_all on public.attendance
for all using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

drop policy if exists attendance_teacher_manage on public.attendance;
create policy attendance_teacher_manage on public.attendance
for all using (
  exists (select 1 from public.sessions s where s.id = attendance.session_id and s.teacher_id = auth.uid())
)
with check (
  exists (select 1 from public.sessions s where s.id = attendance.session_id and s.teacher_id = auth.uid())
  and recorded_by = auth.uid()
);

drop policy if exists attendance_student_read on public.attendance;
create policy attendance_student_read on public.attendance
for select using (student_id = auth.uid());

-- notifications
drop policy if exists notifications_read on public.notifications;
create policy notifications_read on public.notifications
for select
using (
  recipient_user_id = auth.uid()
  or (
    recipient_user_id is null
    and audience_role = public.user_role(auth.uid())
  )
);

drop policy if exists notifications_admin_insert on public.notifications;
create policy notifications_admin_insert on public.notifications
for insert with check (public.user_role(auth.uid()) = 'admin');

drop policy if exists notifications_admin_update on public.notifications;
create policy notifications_admin_update on public.notifications
for update using (public.user_role(auth.uid()) = 'admin')
with check (public.user_role(auth.uid()) = 'admin');

-- notification_reads
drop policy if exists notification_reads_self_all on public.notification_reads;
create policy notification_reads_self_all on public.notification_reads
for all using (user_id = auth.uid())
with check (user_id = auth.uid());

-- google tables
drop policy if exists google_accounts_self on public.google_accounts;
create policy google_accounts_self on public.google_accounts
for all using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists google_tokens_self on public.google_tokens;
create policy google_tokens_self on public.google_tokens
for all using (user_id = auth.uid())
with check (user_id = auth.uid());

-- audit
drop policy if exists audit_admin_read on public.audit_log;
create policy audit_admin_read on public.audit_log
for select using (public.user_role(auth.uid()) = 'admin');

-- Helpful indexes
create index if not exists idx_sessions_teacher_start on public.sessions(teacher_id, start_at);
create index if not exists idx_session_students_student on public.session_students(student_id);
create index if not exists idx_attendance_session on public.attendance(session_id);
create index if not exists idx_tsa_teacher on public.teacher_student_assignments(teacher_id);
create index if not exists idx_notifications_audience_created on public.notifications(audience_role, created_at desc);
