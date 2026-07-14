-- 20260714120000 · RLS FIX — izinkan admin_keuangan (bendahara) menyimpan pengaturan.
--
-- BUG: Menu "Pengaturan Keuangan" terbuka utk admin_keuangan (perm app 'akses_keuangan'),
-- tapi pengaturan disimpan ke tabel `settings` (key='general' + 'web'), yang policy
-- INSERT/UPDATE-nya = auth_can_manage() (super_admin / admin SAJA). admin_keuangan DITOLAK
-- → PostgREST UPDATE 0 baris TANPA error → app kira "tersimpan" padahal DB tak berubah →
-- refresh balik ke nilai lama (gejala: "setiap input nominal, setelah simpan kembali ke default").
--
-- FIX: tambahkan auth_can_keuangan() ke policy INSERT/UPDATE `settings`, KECUALI key 'admin'
-- (konfig/kredensial admin tetap hanya super_admin/admin). SELECT (key<>'admin') & DELETE
-- (super_admin) TIDAK diubah.

drop policy if exists settings_ins on public.settings;
create policy settings_ins on public.settings for insert
  with check (
    public.auth_can_manage()
    or (public.auth_can_keuangan() and key <> 'admin')
  );

drop policy if exists settings_upd on public.settings;
create policy settings_upd on public.settings for update
  using (
    public.auth_can_manage()
    or (public.auth_can_keuangan() and key <> 'admin')
  )
  with check (
    public.auth_can_manage()
    or (public.auth_can_keuangan() and key <> 'admin')
  );
