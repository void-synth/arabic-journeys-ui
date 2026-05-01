alter table public.profiles
  add column if not exists student_onboarding jsonb;

comment on column public.profiles.student_onboarding is 'Optional mirror of client student onboarding wizard state (JSON).';
