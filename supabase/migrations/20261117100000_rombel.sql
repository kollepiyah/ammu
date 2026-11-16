-- ============================================================================
-- v.1.5.0 — Rombel sebagai ENTITAS (keputusan Kyai, 17 Nov 2026).
--
-- Sampai sekarang "kelas ngaji" tak pernah berupa barang. Ia cuma kunci turunan
-- `guru_pagi||guru_sore` yang dirakit ulang dari tiap baris santri (utils/kelasHitung).
-- Dua keluhan Kyai berakar di situ, dan keduanya tak bisa ditambal per layar:
--
--   1. Santri yang hanya diisi SALAH SATU dari pasangan guru hilang dari guru pasangannya.
--      Siti mengajar pagi, Indah sore, satu rombel. Ahmad ikut sore saja, jadi cuma
--      `guru_sore = Indah` yang terisi — kuncinya `||indah`, BEDA dari `siti||indah`.
--      Ahmad tak pernah muncul di akun Siti, dan ikut memecah hitungan kelas.
--   2. Mengganti guru satu kelas harus santri per santri, sebab tak ada satu barang pun
--      yang bisa diganti gurunya sekali jalan.
--
-- Migrasi ini HANYA membuat tempatnya; ISINYA tidak diisi di sini. Penyusunan rombel dari
-- data santri yang sudah ada dikerjakan di aplikasi lewat fungsi `usulRombelDariSantri`
-- (utils/rombel.js) yang sudah diuji, dengan PRATINJAU dulu sebelum ditulis. Sengaja begitu:
-- aturan peleburan "pasangan sebelah" itu berhati-hati (tak menebak kalau calonnya lebih
-- dari satu), dan menulis ulang aturan yang sama dalam SQL berarti membuat cermin kedua
-- yang pasti berpisah dari aslinya — kelas bug yang sudah beberapa kali menggigit repo ini.
--
-- Pola HYBRID (services/db.js): kolom riil = yang difilter/dicari, sisanya `data`.
--   rombel : 1 baris = 1 rombel. Untuk ngaji, pasangan gurunya ada di kolom riil
--            guru_pagi/guru_sore; untuk sekolah, daftarnya di data->'guru_sekolah'.
--   santri.rombel_id : penunjuk ke rombel. Boleh NULL selama masa peralihan — aplikasi
--            masih bisa mencocokkan lewat pasangan nama guru (lihat rombelSantri()).
--
-- SENGAJA tidak masuk publikasi realtime: rombel jarang berubah dan ditarik sekali saat
--   layar dibuka (hemat egress — lihat insiden kuota Sep 2026).
--
-- Idempoten: aman dijalankan ulang.
-- ============================================================================

create table if not exists public.rombel (
  id         text primary key,
  lembaga    text,                 -- lembaga ngaji / sekolah pemilik rombel
  kategori   text,                 -- 'ngaji' | 'sekolah'
  nama       text,                 -- nama yang diberi Kyai; kosong = pakai label turunan
  guru_pagi  text,                 -- ngaji: slot pagi
  guru_sore  text,                 -- ngaji: slot sore
  aktif      boolean not null default true,
  data       jsonb not null default '{}'::jsonb,  -- { guru_sekolah: [], dibuat_oleh, tgl_buat }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists rombel_lembaga_idx   on public.rombel (lembaga);
create index if not exists rombel_guru_pagi_idx on public.rombel (guru_pagi);
create index if not exists rombel_guru_sore_idx on public.rombel (guru_sore);

-- Penunjuk di santri. NULL = belum ditunjuk; aplikasi jatuh ke pencocokan nama guru.
alter table public.santri add column if not exists rombel_id text;
create index if not exists santri_rombel_idx on public.santri (rombel_id);

-- ── RLS ─────────────────────────────────────────────────────────────────────
-- Dibaca SEMUA yang sudah login: rombel menentukan santri siapa milik guru mana, jadi
-- hampir tiap layar akademik perlu membacanya. Isinya hanya nama guru & nama kelas —
-- tak ada data pribadi santri di sini.
-- Ditulis admin/pengelola atau PJ lembaga yang bersangkutan.
alter table public.rombel enable row level security;

drop policy if exists rombel_sel on public.rombel;
create policy rombel_sel on public.rombel
  for select using (auth.role() = 'authenticated');

drop policy if exists rombel_ins on public.rombel;
create policy rombel_ins on public.rombel
  for insert with check (public.auth_can_manage() or public.auth_is_pj_lembaga(lembaga));

drop policy if exists rombel_upd on public.rombel;
create policy rombel_upd on public.rombel
  for update using (public.auth_can_manage() or public.auth_is_pj_lembaga(lembaga))
  with check (public.auth_can_manage() or public.auth_is_pj_lembaga(lembaga));

drop policy if exists rombel_del on public.rombel;
create policy rombel_del on public.rombel
  for delete using (public.auth_can_manage() or public.auth_is_pj_lembaga(lembaga));
