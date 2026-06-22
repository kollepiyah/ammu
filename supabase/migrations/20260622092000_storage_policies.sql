-- Storage RLS — izin TULIS + BACA objek.
--
-- ⚠️ GOTCHA PENTING (terbukti 22 Jun):
-- 1) Upload Supabase Storage BUTUH policy INSERT **DAN** SELECT di storage.objects —
--    storage-api melakukan INSERT...RETURNING (baca-balik baris baru) saat upload.
--    Tanpa SELECT policy, upload gagal dgn pesan menyesatkan "new row violates RLS".
-- 2) `supabase db push` TIDAK bisa membuat policy di storage.objects (schema `storage`
--    milik supabase_storage_admin) — migrasi "Finished" tapi policy TAK terbuat.
--    >>> JALANKAN ISI FILE INI MANUAL via Dashboard → SQL Editor (privilege cukup). <<<
--    File ini dokumentasi state yang benar (mis. untuk DB reset).
--
-- Bucket (lihat services/storage.js): photo (profil/ttd/post), psb (transfer/PDF lembaga),
-- branding (logo/bg, admin-only).

-- Idempoten: hapus dulu.
do $$
declare b text;
begin
  foreach b in array array[
    'photo_sel','photo_ins','photo_upd','photo_del',
    'psb_sel','psb_ins','psb_upd','psb_del',
    'branding_sel','branding_ins','branding_upd','branding_del'
  ] loop
    execute format('drop policy if exists %I on storage.objects', b);
  end loop;
end $$;

-- PHOTO — authenticated baca + tulis.
create policy photo_sel on storage.objects for select to authenticated using (bucket_id='photo');
create policy photo_ins on storage.objects for insert to authenticated with check (bucket_id='photo');
create policy photo_upd on storage.objects for update to authenticated using (bucket_id='photo') with check (bucket_id='photo');
create policy photo_del on storage.objects for delete to authenticated using (bucket_id='photo');

-- PSB — authenticated baca + tulis.
create policy psb_sel on storage.objects for select to authenticated using (bucket_id='psb');
create policy psb_ins on storage.objects for insert to authenticated with check (bucket_id='psb');
create policy psb_upd on storage.objects for update to authenticated using (bucket_id='psb') with check (bucket_id='psb');
create policy psb_del on storage.objects for delete to authenticated using (bucket_id='psb');

-- BRANDING — baca semua authenticated, tulis admin saja.
create policy branding_sel on storage.objects for select to authenticated using (bucket_id='branding');
create policy branding_ins on storage.objects for insert to authenticated with check (bucket_id='branding' and public.auth_can_manage());
create policy branding_upd on storage.objects for update to authenticated using (bucket_id='branding' and public.auth_can_manage()) with check (bucket_id='branding' and public.auth_can_manage());
create policy branding_del on storage.objects for delete to authenticated using (bucket_id='branding' and public.auth_can_manage());
