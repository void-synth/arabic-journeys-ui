create table if not exists public.google_oauth_states (
  state text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  callback_path text not null,
  app_url text not null,
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.google_oauth_states enable row level security;

drop policy if exists google_oauth_states_none on public.google_oauth_states;
create policy google_oauth_states_none on public.google_oauth_states
for all
using (false)
with check (false);

create index if not exists idx_google_oauth_states_expires_at on public.google_oauth_states(expires_at);
