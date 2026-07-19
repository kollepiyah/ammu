-- ============================================================================
-- Ceremonial PTPT — setiap santri PTPT yang mau naik kelas melewati ceremonial.
-- Menu "Ceremonial PTPT" menjadwal WAKTU + PENYIMAK GURU + PENYIMAK SANTRI.
--
-- Model: 1 baris = 1 SESI (shift) ceremonial, bukan 1 santri.
--   Kelas 1 cukup 1 sesi (1 guru penyimak + beberapa santri peserta);
--   kelas 2 dipecah 2 sesi. Karena itu peserta & penyimak = ARRAY di `data`.
--
-- Kandidat peserta datang dari santri PTPT yang sudah LULUS tes PJ
--   (tes_kenaikan.status='lulus'), boleh ditambah manual. `tgl_lulus_pj`
--   di-cache dari tes_kenaikan.tgl_hasil supaya jadwal bisa menampilkannya
--   tanpa join (permintaan Kyai poin 2).
--
-- Pola HYBRID (lihat services/db.js): kolom riil = yang difilter/di-index;
--   sisanya -> `data` jsonb.
--   data = { judul, jam_selesai, tempat, catatan,
--            peserta:[{santri_id,nama,kelas,juz,ajuan_id,tgl_lulus_pj}],
--            penyimak_guru:[{id,nama}], penyimak_santri:[{id,nama}],
--            dibuat_oleh, tgl_buat }
--
-- RLS = ARCHETYPE B (mirror tes_glondongan): read signedIn, write
--   auth_can_akademik (super/admin/guru), delete super.
--   CATATAN: pembatasan "penjadwal = super_admin + PJ PTPT" ditegakkan di UI
--   (useCeremonial.canKelola), SAMA seperti canAssign pada glondongan — jabatan
--   PJ ada di tabel guru, tak praktis dijadikan predikat RLS.
-- ============================================================================

create table if not exists public.ceremonial_ptpt (
  id         text primary key,
  tanggal    text,                 -- 'YYYY-MM-DD'
  jam_mulai  text,                 -- 'HH:MM'
  status     text,                 -- 'terjadwal' | 'selesai' | 'batal'
  periode    text,                 -- 'YYYY-MM' (filter/rekap bulanan)
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists ceremonial_ptpt_tanggal_idx on public.ceremonial_ptpt (tanggal);
create index if not exists ceremonial_ptpt_periode_idx on public.ceremonial_ptpt (periode);
create index if not exists ceremonial_ptpt_status_idx  on public.ceremonial_ptpt (status);

-- updated_at auto (loop trigger F2 hanya kena tabel lama; tabel baru pasang manual).
drop trigger if exists trg_set_updated_at on public.ceremonial_ptpt;
create trigger trg_set_updated_at before update on public.ceremonial_ptpt
  for each row execute function public.set_updated_at();

-- Grant ke role PostgREST (RLS tetap gerbang sebenarnya).
grant all on public.ceremonial_ptpt to anon, authenticated, service_role;

-- ---- RLS: Archetype B --------------------------------------------------------
alter table public.ceremonial_ptpt enable row level security;
drop policy if exists ceremonial_ptpt_sel on public.ceremonial_ptpt;
create policy ceremonial_ptpt_sel on public.ceremonial_ptpt
  for select using (auth.uid() is not null);
drop policy if exists ceremonial_ptpt_ins on public.ceremonial_ptpt;
create policy ceremonial_ptpt_ins on public.ceremonial_ptpt
  for insert with check (public.auth_can_akademik());
drop policy if exists ceremonial_ptpt_upd on public.ceremonial_ptpt;
create policy ceremonial_ptpt_upd on public.ceremonial_ptpt
  for update using (public.auth_can_akademik()) with check (public.auth_can_akademik());
drop policy if exists ceremonial_ptpt_del on public.ceremonial_ptpt;
create policy ceremonial_ptpt_del on public.ceremonial_ptpt
  for delete using (public.auth_is_super());

-- ---- Realtime (idempoten) ----------------------------------------------------
-- WAJIB cermin db.js REALTIME set (subscribeColl tak live tanpa ini).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'ceremonial_ptpt'
  ) then
    execute 'alter publication supabase_realtime add table public.ceremonial_ptpt';
  end if;
end $$;
