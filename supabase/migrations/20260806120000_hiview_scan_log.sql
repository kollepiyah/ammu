-- ============================================================================
-- v.1.2.8 · hiview_scan_log — jejak setiap scan yang masuk dari mesin HiView.
--
-- Kyai (6 Agu 2026): "ada guru yg sudah scan tapi datanya tidak terkirim ke
-- aplikasi. padahal ID finger sudah benar."
--
-- MASALAHNYA BUKAN CUMA ATURAN SHIFT — tapi tak ada cara membuktikan apa pun.
-- Edge function hiview-absen membuang event di SEMBILAN titik (bukan major 5,
-- employeeNo kosong, dateTime tak terbaca, PIN tak terdaftar, di luar window
-- shift, baris izin/sakit, scan duplikat, dst) dan setiap pembuangan itu hanya
-- jadi console.log yang tak seorang pun di pesantren bisa buka. Dari sisi Kyai,
-- scan yang gagal dan scan yang tak pernah sampai TERLIHAT SAMA PERSIS.
--
-- Tabel ini merekam apa adanya: siapa, jam berapa, dan apa yang fungsi putuskan.
-- Dengan begitu "tidak terkirim" bisa dipisah jadi tiga kemungkinan yang berbeda
-- penanganannya — mesin tak mengirim (tabel kosong), fungsi menolak (ada barisnya
-- + sebabnya), atau tertulis tapi salah shift.
--
-- Jalur Fingerspot Revo TIDAK butuh ini: sync Ammu Desktop sudah punya tabel
-- diagnosanya sendiri di layar (MesinAbsensiView).
--
-- MENULIS: hanya edge function (service-role, bypass RLS). Sengaja TANPA policy
-- insert/update — tak ada sesi pengguna yang boleh mengarang jejak mesin.
-- MEMBACA: staf (auth_is_staff) — orang yang sama yang mengurus absensi.
-- MENGHAPUS: super_admin, untuk memangkas log lama.
-- ============================================================================
create table if not exists public.hiview_scan_log (
  id          text primary key,
  -- 'YYYY-MM-DD' waktu WIB (bukan UTC) — panel diagnosa menyaring per hari, dan
  -- tanggal UTC akan mundur sehari untuk scan sebelum pukul 07:00 WIB.
  tanggal     text,
  employee_no text,
  guru_id     text,
  -- diterima | pulang | luar_window | pin_tak_dikenal | izin_sakit | duplikat |
  -- bukan_absen | waktu_tak_terbaca  (lihat HASIL di hiview-absen/index.ts)
  hasil       text,
  data        jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now()
);

create index if not exists hiview_scan_log_tgl_idx on public.hiview_scan_log (tanggal desc);
create index if not exists hiview_scan_log_emp_idx on public.hiview_scan_log (employee_no);

alter table public.hiview_scan_log enable row level security;

drop policy if exists hiview_scan_log_sel on public.hiview_scan_log;
drop policy if exists hiview_scan_log_del on public.hiview_scan_log;

create policy hiview_scan_log_sel on public.hiview_scan_log
  for select using (public.auth_is_staff());

create policy hiview_scan_log_del on public.hiview_scan_log
  for delete using (public.auth_is_super());
