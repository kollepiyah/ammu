-- ============================================================================
-- v.1.2.2 · absensi_shift_guru — izinkan TULIS oleh admin_keuangan (staf kantor).
--
-- GEJALA: lewat AMMU Desktop (Electron), sinkron absen Fingerspot SELALU gagal
-- kalau yang login admin_keuangan; dengan super_admin berhasil. Padahal staf
-- kantor yang mengoperasikan PC mesin absen justru ber-peran admin_keuangan.
--
-- AKAR: sinkron menulis dari SISI KLIEN (composables/useFingerprintSync.js ->
-- setOne/mergeOne 'absensi_shift_guru'), memakai sesi pengguna yang login — jadi
-- RLS berlaku penuh. Tabel ini masuk "Archetype B" di 20260622090500_profiles_rls
-- yang mensyaratkan auth_can_akademik() untuk INSERT/UPDATE:
--
--   auth_can_akademik() = role_sistem IN ('super_admin','admin','guru')
--   auth_is_staff()     = role_sistem IN ('super_admin','admin','admin_keuangan','guru')
--
-- admin_keuangan tak ada di daftar pertama -> setiap INSERT ditolak RLS. Yang
-- menipu: penolakan RLS muncul sebagai galat generik, bukan "akses ditolak",
-- sehingga terbaca sebagai "sinkron gagal" dan bukan sebagai soal perizinan.
--
-- PERBAIKAN: khusus tabel INI, tukar syarat tulis ke auth_is_staff(). Selisih
-- kedua helper persis 'admin_keuangan', jadi tak ada peran lain yang ikut
-- kebagian. SENGAJA TIDAK menambahkan admin_keuangan ke auth_can_akademik():
-- helper itu menjaga rapor, nilai, tes kenaikan, dan rekap prestasi — staf
-- keuangan tak berkepentingan di sana, dan melebarkannya = eskalasi hak diam-diam
-- ke belasan tabel akademik.
--
-- Secara domain ini juga wajar: absensi shift guru adalah dasar hitung bisyaroh
-- (keuangan), dan mesin absen dioperasikan dari meja kantor.
--
-- DELETE sengaja TETAP super_admin — menghapus riwayat absen tetap kewenangan
-- tertinggi, sejalan dengan CRUD hapus/koreksi di AbsensiGuruView.
-- ============================================================================
do $$
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'absensi_shift_guru'
  ) then
    raise notice 'absensi_shift_guru belum ada, migrasi dilewati';
    return;
  end if;

  drop policy if exists absensi_shift_guru_ins on public.absensi_shift_guru;
  drop policy if exists absensi_shift_guru_upd on public.absensi_shift_guru;

  create policy absensi_shift_guru_ins on public.absensi_shift_guru
    for insert with check (public.auth_is_staff());

  create policy absensi_shift_guru_upd on public.absensi_shift_guru
    for update using (public.auth_is_staff()) with check (public.auth_is_staff());
end $$;
