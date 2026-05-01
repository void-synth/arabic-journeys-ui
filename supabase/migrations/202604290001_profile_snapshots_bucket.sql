insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'profile-snapshots',
  'profile-snapshots',
  true,
  2097152,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists profile_snapshots_insert_own on storage.objects;
create policy profile_snapshots_insert_own on storage.objects
for insert to authenticated
with check (
  bucket_id = 'profile-snapshots'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists profile_snapshots_update_own on storage.objects;
create policy profile_snapshots_update_own on storage.objects
for update to authenticated
using (
  bucket_id = 'profile-snapshots'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'profile-snapshots'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists profile_snapshots_delete_own on storage.objects;
create policy profile_snapshots_delete_own on storage.objects
for delete to authenticated
using (
  bucket_id = 'profile-snapshots'
  and auth.uid()::text = (storage.foldername(name))[1]
);
