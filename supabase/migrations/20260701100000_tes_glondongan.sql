-- ============================================================================
-- Tes Glondongan (KHUSUS PTPT) — muroja'ah kumulatif oleh guru LAIN (bukan guru
-- kelas santri) + review juz kelas berjalan oleh guru kelas, sebelum tes kenaikan
-- juz. NILAI TAK MASUK RAPOR (murni catatan evaluasi). Nempel ke ajuan tes_kenaikan.
--
-- Model: 1 baris = 1 BLOK penilaian.
--   tipe='glondongan' -> blok 5-juz materi kelas lampau (kelas_asal 1..K-1),
--                        ditugaskan koordinator kelas asal ke 1 guru penguji.
--   tipe='berjalan'   -> juz kelas berjalan di bawah target, dinilai guru kelas santri.
--
-- Pola HYBRID (lihat services/db.js): kolom riil = yang difilter/di-index;
--   sisanya (nilai per-juz, catatan, nama_cache, rentang juz, atribusi) -> `data` jsonb.
--   Bentuk data.nilai = { "<juz>": { tahfizh, istimror, fashohah, tajwid } } (0-90, format PJ).
--
-- RLS = ARCHETYPE B (mirror tes_kenaikan, lihat 20260622090500_profiles_rls.sql):
--   read signedIn, write auth_can_akademik (super/admin/guru), delete super.
-- ============================================================================

create table if not exists public.tes_glondongan (
  id         text primary key,
  ajuan_id   text,                 -- FK logis -> tes_kenaikan.id (ajuan juz target)
  santri_id  text,
  tipe       text,                 -- 'glondongan' | 'berjalan'
  kelas_asal int,                  -- 1..6 (blok materi kelas asal); berjalan = kelas berjalan
  status     text,                 -- 'menunggu' | 'ditugaskan' | 'selesai'
  penguji_id text,                 -- guru penilai (null saat 'menunggu' penugasan)
  periode    text,                 -- 'YYYY-MM' (rekap bisyaroh bulanan)
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists tes_glondongan_santri_idx  on public.tes_glondongan (santri_id);
create index if not exists tes_glondongan_ajuan_idx   on public.tes_glondongan (ajuan_id);
create index if not exists tes_glondongan_penguji_idx on public.tes_glondongan (penguji_id);
create index if not exists tes_glondongan_periode_idx on public.tes_glondongan (periode);
create index if not exists tes_glondongan_queue_idx   on public.tes_glondongan (kelas_asal, status);

-- updated_at auto (loop trigger F2 hanya kena tabel lama; tabel baru pasang manual).
drop trigger if exists trg_set_updated_at on public.tes_glondongan;
create trigger trg_set_updated_at before update on public.tes_glondongan
  for each row execute function public.set_updated_at();

-- Grant ke role PostgREST (RLS tetap gerbang sebenarnya). Mirror grant F2.
grant all on public.tes_glondongan to anon, authenticated, service_role;

-- ---- RLS: Archetype B (read signedIn, write canAkademik, delete super) -------
alter table public.tes_glondongan enable row level security;
drop policy if exists tes_glondongan_sel on public.tes_glondongan;
create policy tes_glondongan_sel on public.tes_glondongan
  for select using (auth.uid() is not null);
drop policy if exists tes_glondongan_ins on public.tes_glondongan;
create policy tes_glondongan_ins on public.tes_glondongan
  for insert with check (public.auth_can_akademik());
drop policy if exists tes_glondongan_upd on public.tes_glondongan;
create policy tes_glondongan_upd on public.tes_glondongan
  for update using (public.auth_can_akademik()) with check (public.auth_can_akademik());
drop policy if exists tes_glondongan_del on public.tes_glondongan;
create policy tes_glondongan_del on public.tes_glondongan
  for delete using (public.auth_is_super());

-- ---- Realtime (idempoten) — status flip tampil tanpa refresh -----------------
-- WAJIB cermin db.js REALTIME set (subscribeColl tak akan live tanpa ini).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'tes_glondongan'
  ) then
    execute 'alter publication supabase_realtime add table public.tes_glondongan';
  end if;
end $$;
