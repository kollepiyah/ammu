-- ============================================================================
-- v.1.4.2 · izin_guru — Perizinan & Cuti boleh ditulis SELURUH pegawai, bukan
-- hanya yang berperan akademik.
--
-- GEJALA (keluhan seorang guru kepada Kyai lewat WA, 12 Sep 2026, berikut
-- tangkapan layarnya): _"Maaf gus, setiap kali saya mencoba mengunakan izin di
-- aplikasi selalu gagal. Knp geh?"_ — formulirnya terisi benar (jenis, tanggal,
-- shift "Pegawai Pagi", keterangan "sakit"), tapi toast merahnya berbunyi
--
--     new row violates row-level security policy for table "izin_guru"
--
-- Jadi bukan salah isian dan bukan jaringan: barisnya DITOLAK RLS sebelum
-- sempat tersimpan. Karena penolakannya berbasis PERAN, bukan data, ia terjadi
-- pada SETIAP percobaan orang yang sama — persis "selalu gagal" yang dikeluhkan.
--
-- AKAR: `izin_guru` ikut "Archetype B" di 20260622090500_profiles_rls.sql —
-- satu loop yang memasang kebijakan sama untuk selusin tabel akademik:
--
--   auth_can_akademik() = role_sistem IN ('super_admin','admin','guru')
--   auth_is_staff()     = role_sistem IN ('super_admin','admin','admin_keuangan','guru')
--
-- Selisih kedua helper itu PERSIS 'admin_keuangan', peran yang dipakai staf
-- kantor (lihat 20260723130000_absensi_shift_guru_staff_write.sql: "staf kantor
-- yang mengoperasikan PC mesin absen justru ber-peran admin_keuangan").
-- Pegawai yang memegang peran itu TAK PERNAH bisa mengajukan izin — sejak fitur
-- ini lahir (v.100d), tanpa pernah ketahuan, sebab yang menguji fitur ini selalu
-- super_admin/admin yang lolos gerbangnya.
--
-- Perizinan & Cuti memang bukan fitur akademik. Ia tak menyentuh rapor, nilai,
-- tes kenaikan, atau rekap prestasi — yang dijaga auth_can_akademik(). Isinya
-- "saya tidak masuk hari ini", kebutuhan SETIAP orang yang punya shift, termasuk
-- staf kantor yang justru namanya ada di daftar absensi shift `pegawai_pagi` /
-- `pegawai_sore`. Menempatkannya di rak akademik adalah salah rak sejak awal.
--
-- DUA ARAH yang ikut sembuh (keduanya "terlihat di layar tapi ditolak DB",
-- kelas bug yang sama dengan laporan Kyai 31 Agu 2026 soal Input Bulanan):
--
--   1. PENGAJU — `ajukan()` (INSERT) dan `batal()` (UPDATE) di
--      composables/useIzinGuru.js. Tombol "Ajukan" & "Batalkan" tampil untuk
--      siapa pun yang membuka halaman Personal.
--   2. PENYETUJU — `isApprover` di composable yang sama memuat isAdminKeuangan,
--      jadi staf keuangan MELIHAT antrian persetujuan beserta tombol Setujui /
--      Tolak, tetapi `updateOne('izin_guru', …)` miliknya selalu ditolak. Yang
--      ditulis `setujui()` sesudahnya — `absensi_shift_guru` — sudah dilebarkan
--      ke auth_is_staff() pada 23 Jul 2026; tinggal tabel ini yang tertinggal.
--
-- PERBAIKAN: khusus tabel INI, tukar syarat tulis ke auth_is_staff() — pola dan
-- alasan yang sama persis dengan absensi_shift_guru. SENGAJA TIDAK menambahkan
-- 'admin_keuangan' ke auth_can_akademik(): helper itu menjaga belasan tabel
-- akademik, dan melebarkannya = eskalasi hak diam-diam ke semuanya.
--
-- BATAS YANG TETAP: santri/wali (role_sistem 'santri') tetap tak bisa menulis
-- izin_guru, sebagaimana mestinya. DELETE juga TETAP super_admin — menghapus
-- jejak perizinan adalah kewenangan tertinggi, sejalan dengan tabel absensi.
--
-- CATATAN kalau kelak masih ada yang mengeluh hal serupa: galat RLS berarti
-- `profiles.role_sistem` orang itu di luar keempat peran auth_is_staff(). Satu
-- kemungkinan tersisa adalah profil yang tak tertaut (role_sistem 'santri'
-- padahal guru_id terisi) — itu soal PROVISI AKUN, bukan kebijakan tabel ini.
-- Sejak v.1.4.2 toast-nya tak lagi bahasa Postgres: ia menyebut peran akunnya,
-- jadi satu tangkapan layar sudah cukup untuk membedakan kedua sebab itu
-- (lihat vue-app/src/utils/pesanGalatDb.js).
-- ============================================================================
do $$
begin
  if not exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'izin_guru'
  ) then
    raise notice 'izin_guru belum ada, migrasi dilewati';
    return;
  end if;

  drop policy if exists izin_guru_ins on public.izin_guru;
  drop policy if exists izin_guru_upd on public.izin_guru;

  create policy izin_guru_ins on public.izin_guru
    for insert with check (public.auth_is_staff());

  create policy izin_guru_upd on public.izin_guru
    for update using (public.auth_is_staff()) with check (public.auth_is_staff());
end $$;
