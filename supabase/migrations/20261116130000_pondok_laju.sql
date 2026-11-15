-- ============================================================================
-- v.1.5.0 — Pondok Laju tahap 5: jadwal piket Laju & capaian bacaan (Kyai, 15–16 Nov 2026).
--
-- Sesudah sekolah santri Pondok Laju membaca dalam tiga sesi berurutan: Tadarus Pagi (guru
-- kelas, tanpa jadwal), Laju 1, Laju 2 — satu rantai bacaan yang bersambung. Laju 1/2
-- disimak guru PIKET bergilir (satu guru per kelas per sesi) yang disusun Admin Pondok
-- Laju / PJ / admin, sebulan sekaligus. Yang dicatat hanya POSISI AKHIR (juz, halaman,
-- surah, ayat) per santri per sesi; wali boleh melihat capaian anaknya. Bisyaroh piket
-- dihitung per sesi terjadwal yang gurunya hadir di shift Pondok Laju (di aplikasi).
--
-- Dua tabel baru, pola HYBRID (services/db.js): kolom riil = yang difilter, sisanya `data`.
--   pondok_laju_jadwal  : 1 baris = 1 (tanggal, sesi, kelas) → guru piket.
--       id = '<tanggal>_<sesi>_<kunci kelas>', data = { kelas_key, kelas_guru, guru_nama,
--       dibuat_oleh, tgl_buat }
--   pondok_laju_capaian : 1 baris = 1 (tanggal, sesi, santri) → posisi akhir.
--       id = '<tanggal>_<sesi>_<santri_id>', data = { juz, halaman, surah, ayat, catatan,
--       kelas_key, santri_nama, guru_nama, dicatat_at }
--
-- SENGAJA tidak masuk publikasi realtime: aplikasi menarik per tanggal/bulan yang dibuka
--   (hemat egress — lihat insiden kuota Sep 2026). Tambah di sini DAN di db.js REALTIME
--   kalau suatu saat perlu live.
--
-- Idempoten: aman dijalankan ulang.
-- ============================================================================

create table if not exists public.pondok_laju_jadwal (
  id         text primary key,
  tanggal    text,                 -- 'YYYY-MM-DD'
  sesi       text,                 -- 'laju1' | 'laju2'
  guru_id    text,                 -- guru piket
  periode    text,                 -- 'YYYY-MM'
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists pondok_laju_jadwal_tanggal_idx on public.pondok_laju_jadwal (tanggal);
create index if not exists pondok_laju_jadwal_periode_idx on public.pondok_laju_jadwal (periode);
create index if not exists pondok_laju_jadwal_guru_idx    on public.pondok_laju_jadwal (guru_id);

create table if not exists public.pondok_laju_capaian (
  id         text primary key,
  tanggal    text,                 -- 'YYYY-MM-DD'
  sesi       text,                 -- 'tadarus' | 'laju1' | 'laju2'
  santri_id  text,
  guru_id    text,                 -- pencatat
  periode    text,                 -- 'YYYY-MM'
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists pondok_laju_capaian_tanggal_idx on public.pondok_laju_capaian (tanggal);
create index if not exists pondok_laju_capaian_santri_idx  on public.pondok_laju_capaian (santri_id, tanggal);
create index if not exists pondok_laju_capaian_periode_idx on public.pondok_laju_capaian (periode);

drop trigger if exists trg_set_updated_at on public.pondok_laju_jadwal;
create trigger trg_set_updated_at before update on public.pondok_laju_jadwal
  for each row execute function public.set_updated_at();
drop trigger if exists trg_set_updated_at on public.pondok_laju_capaian;
create trigger trg_set_updated_at before update on public.pondok_laju_capaian
  for each row execute function public.set_updated_at();

grant all on public.pondok_laju_jadwal  to anon, authenticated, service_role;
grant all on public.pondok_laju_capaian to anon, authenticated, service_role;

-- Guru yang login = Admin Pondok Laju? Peran khusus seperti koordinator glondongan:
--   master (key='lembaga') -> value->'list' -> item PTPT -> admin_pondok_laju = [guruId,…].
--   Cermin utils/pondokLajuSesi.adminPondokLaju().
create or replace function public.auth_is_admin_pondok_laju()
returns boolean language sql stable security definer set search_path = public as $$
  select public.auth_guru_id() is not null and exists (
    select 1
    from public.master m
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(m.value->'list') = 'array' then m.value->'list' else '[]'::jsonb end
    ) as l(obj)
    cross join lateral jsonb_array_elements_text(
      case when jsonb_typeof(l.obj->'admin_pondok_laju') = 'array'
           then l.obj->'admin_pondok_laju' else '[]'::jsonb end
    ) as g(guru_id)
    where m.key = 'lembaga'
      and upper(btrim(coalesce(l.obj->>'lembaga', l.obj->>'nama', ''))) = 'PTPT'
      and btrim(g.guru_id) = public.auth_guru_id()
  )
$$;
grant execute on function public.auth_is_admin_pondok_laju() to authenticated;

-- ---- RLS jadwal: staff membaca; penyusun = admin/super, PJ PTPT, Admin Pondok Laju ----
alter table public.pondok_laju_jadwal enable row level security;
drop policy if exists pondok_laju_jadwal_sel on public.pondok_laju_jadwal;
create policy pondok_laju_jadwal_sel on public.pondok_laju_jadwal
  for select using (public.auth_is_staff());
drop policy if exists pondok_laju_jadwal_ins on public.pondok_laju_jadwal;
create policy pondok_laju_jadwal_ins on public.pondok_laju_jadwal
  for insert with check (public.auth_can_manage() or public.auth_is_pj_lembaga('PTPT')
                         or public.auth_is_admin_pondok_laju());
drop policy if exists pondok_laju_jadwal_upd on public.pondok_laju_jadwal;
create policy pondok_laju_jadwal_upd on public.pondok_laju_jadwal
  for update using (public.auth_can_manage() or public.auth_is_pj_lembaga('PTPT')
                    or public.auth_is_admin_pondok_laju())
  with check (public.auth_can_manage() or public.auth_is_pj_lembaga('PTPT')
              or public.auth_is_admin_pondok_laju());
drop policy if exists pondok_laju_jadwal_del on public.pondok_laju_jadwal;
create policy pondok_laju_jadwal_del on public.pondok_laju_jadwal
  for delete using (public.auth_can_manage() or public.auth_is_pj_lembaga('PTPT')
                    or public.auth_is_admin_pondok_laju());

-- ---- RLS capaian: staff semua, wali/santri hanya keluarga sendiri (cermin W1) ----------
--   Tulis = guru/admin (siapa yang boleh mencatat kelas mana ditegakkan di UI: guru kelas
--   untuk Tadarus Pagi, guru terjadwal untuk Laju — sama dengan pola tes_glondongan).
alter table public.pondok_laju_capaian enable row level security;
drop policy if exists pondok_laju_capaian_sel on public.pondok_laju_capaian;
create policy pondok_laju_capaian_sel on public.pondok_laju_capaian
  for select using (public.auth_is_staff() or public.auth_owns_santri(santri_id));
drop policy if exists pondok_laju_capaian_ins on public.pondok_laju_capaian;
create policy pondok_laju_capaian_ins on public.pondok_laju_capaian
  for insert with check (public.auth_can_akademik());
drop policy if exists pondok_laju_capaian_upd on public.pondok_laju_capaian;
create policy pondok_laju_capaian_upd on public.pondok_laju_capaian
  for update using (public.auth_can_akademik()) with check (public.auth_can_akademik());
drop policy if exists pondok_laju_capaian_del on public.pondok_laju_capaian;
create policy pondok_laju_capaian_del on public.pondok_laju_capaian
  for delete using (public.auth_can_manage());
