# Backend Integration Guide (Supabase + Google)

This project has been wired for Supabase-first backend integration with Google Calendar/Meet edge functions.

## 1) Supabase Project

- Project ref: `qvyzryvcdutahiykymis`
- API URL: `https://qvyzryvcdutahiykymis.supabase.co`
- JS client dependency: `@supabase/supabase-js` (installed)

## 2) Environment Variables

Copy values from `.env.example` into your local environment.

Required frontend vars:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL`

Required edge-function vars in Supabase dashboard:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI`
- `VITE_APP_URL`

## 3) Database Migrations

Migration file created:

- `supabase/migrations/202604250001_initial_backend.sql`

Applied remotely via MCP migration:

- `initial_backend_core`

Schema includes:

- `profiles`
- `teacher_student_assignments`
- `sessions`
- `session_students`
- `attendance`
- `notifications`
- `notification_reads`
- `google_accounts`
- `google_tokens`
- `audit_log`

Also includes:

- auth trigger `handle_new_user`
- RLS policies for all major tables
- admin RPCs:
  - `admin_assign_students_to_teacher`
  - `admin_set_user_status`
  - `export_sessions_csv`

## 4) Edge Functions (deployed)

- `google-oauth-start`
- `google-oauth-callback`
- `google-token-refresh`
- `google-calendar-provision`

These are also stored in-repo under `supabase/functions/*`.

## 5) Frontend Runtime Wiring

### Supabase client

- `src/lib/supabaseClient.ts`

### Auth provider

- `src/lib/auth.tsx`
- Supports:
  - Supabase session hydration
  - email/password login
  - signup with metadata (`full_name`, `role`)
  - logout + local fallback mode

### Data stores now backend-aware (with local fallback)

- `src/lib/sessionStore.ts`
- `src/lib/directoryStore.ts`
- `src/lib/attendanceStore.ts`
- `src/lib/notificationStore.ts`
- `src/lib/teacherAssignmentStore.ts`

Each store:

- Reads/writes Supabase when configured
- Falls back to previous localStorage behavior when unavailable
- Emits the same UI update events used by current pages

### Hooks upgraded for async backend loads

- `src/lib/useStoredSessions.ts`
- `src/lib/useStoredDirectory.ts`
- `src/lib/useStoredNotifications.ts`
- `src/lib/useTeacherAssignments.ts`

## 6) Google UX wiring in app

- Teacher settings has **Connect Google Calendar** action:
  - `src/pages/teacher/TeacherSettings.tsx`
- Session create/update attempts Meet provisioning if meeting link left empty:
  - `src/pages/teacher/SessionForm.tsx`

## 7) Role-scoped dashboard behavior with Supabase user IDs

Teacher/student pages now use `auth.userId` when available (fallback to mock IDs if running without backend data):

- `TeacherDashboard`, `TeacherSessions`, `TeacherAttendance`, `TeacherStudents`, `SessionDetail`, `SessionForm`, `StudentProfile`
- `StudentDashboard`, `StudentSessions`, `StudentSessionDetail`

## 8) Important next operational steps

1. In Supabase Auth settings, ensure email sign-up/sign-in is enabled.
2. Create at least one admin user and set their role in `profiles`.
3. In Google Cloud:
   - Enable Calendar API
   - Configure OAuth consent
   - Add callback URL:  
     `https://qvyzryvcdutahiykymis.supabase.co/functions/v1/google-oauth-callback`
4. Add edge function secrets in Supabase dashboard.
5. Seed initial `profiles`/`sessions` data if you want non-empty dashboards immediately.

