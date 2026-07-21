-- ============================================================================
-- Layanan Pengaduan — channel pengaduan formal TERPISAH dari kritik_saran.
-- Dibaca: Admin / Super_admin / KORLAP (Koordinator Lapangan). Pengirim (santri/
-- wali/guru) hanya lihat pengaduannya sendiri. Ada tindak-lanjut status + balasan.
--
-- Pola HYBRID (lihat services/db.js): kolom riil `pesan` (dipakai guard RLS
-- panjang, cermin kritik_saran); sisanya -> `data` jsonb:
--   { kategori, pengirim_id, pengirim_uid, pengirim_nama, pengirim_role,
--     pengirim_lembaga, status(baru|diproses|selesai), tindak_lanjut,
--     reply, reply_at, reply_by }
--   `pengirim_uid` = auth.uid() pengirim → dipakai RLS self-read.
--
-- KORLAP first-class di RLS: flag boolean profiles.pengaduan (cermin
-- profiles.supervisi), di-set otomatis dari guru.jabatan/jabatan_tambahan lewat
-- perluasan trigger sync_guru_profile_role (lihat 20260622094000_*).
-- ============================================================================

-- ---- KORLAP flag di profiles (cermin kolom `supervisi`) ---------------------
alter table public.profiles add column if not exists pengaduan boolean not null default false;

-- Helper RLS: boleh kelola/baca-semua pengaduan = super/admin ATAU KORLAP.
create or replace function public.auth_can_pengaduan()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_can_manage()
    or (select pengaduan from public.profiles where id = auth.uid()), false)
$$;

-- ---- Perluas sync_guru_profile_role: ikut set profiles.pengaduan dari jabatan
-- Fungsi lama (migration 094000) hanya sinkron role_sistem/role. Redefine agar
-- KORLAP (jabatan / jabatan_tambahan mengandung "koordinator lapangan"/"korlap")
-- otomatis nyalakan profiles.pengaduan. Trigger juga di-fire saat jabatan berubah.
create or replace function public.sync_guru_profile_role()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare v_rs text; v_role text; v_korlap boolean;
begin
  v_rs := case new.role_sistem
            when 'super_admin' then 'super_admin'
            when 'admin' then 'admin'
            when 'admin_keuangan' then 'admin_keuangan'
            else 'guru'
          end;
  v_role := case when v_rs in ('admin','admin_keuangan','super_admin') then 'admin' else 'guru' end;
  v_korlap := (coalesce(new.jabatan, '') ~* 'koordinator lapangan|korlap'
            or coalesce(new.jabatan_tambahan, '') ~* 'koordinator lapangan|korlap');
  update public.profiles
    set role_sistem = v_rs, role = v_role, pengaduan = v_korlap
    where guru_id = new.id;
  return new;
end $$;

drop trigger if exists trg_sync_guru_profile_role on public.guru;
create trigger trg_sync_guru_profile_role
  after update on public.guru
  for each row
  when (new.role_sistem      is distinct from old.role_sistem
     or new.jabatan          is distinct from old.jabatan
     or new.jabatan_tambahan is distinct from old.jabatan_tambahan)
  execute function public.sync_guru_profile_role();

-- Backfill: nyalakan pengaduan utk profil guru yang jabatannya sudah KORLAP.
update public.profiles p
set pengaduan = k.is_korlap
from (
  select g.id,
    (coalesce(g.jabatan, '') ~* 'koordinator lapangan|korlap'
     or coalesce(g.jabatan_tambahan, '') ~* 'koordinator lapangan|korlap') as is_korlap
  from public.guru g
) k
where p.guru_id = k.id
  and p.pengaduan is distinct from k.is_korlap;

-- ---- Tabel pengaduan (mirror kritik_saran) ---------------------------------
create table if not exists public.pengaduan (
  id         text primary key,
  pesan      text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists pengaduan_created_idx on public.pengaduan (created_at);

-- updated_at auto (tabel baru pasang trigger manual, sama tes_glondongan).
drop trigger if exists trg_set_updated_at on public.pengaduan;
create trigger trg_set_updated_at before update on public.pengaduan
  for each row execute function public.set_updated_at();

-- Grant ke role PostgREST (RLS tetap gerbang sebenarnya).
grant all on public.pengaduan to anon, authenticated, service_role;

-- ---- RLS: privacy-aware (lebih ketat dari kritik_saran) --------------------
--   insert : signedIn + guard panjang pesan 1..2000
--   select : staff/KORLAP lihat semua; pengirim lihat miliknya sendiri
--   update : staff/KORLAP (disposisi status + balas)
--   delete : super
alter table public.pengaduan enable row level security;
drop policy if exists pengaduan_sel on public.pengaduan;
create policy pengaduan_sel on public.pengaduan
  for select using (
    public.auth_can_pengaduan()
    or (data->>'pengirim_uid') = auth.uid()::text
  );
drop policy if exists pengaduan_ins on public.pengaduan;
create policy pengaduan_ins on public.pengaduan
  for insert with check (
    auth.uid() is not null
    and char_length(coalesce(pesan, '')) between 1 and 2000
  );
drop policy if exists pengaduan_upd on public.pengaduan;
create policy pengaduan_upd on public.pengaduan
  for update using (public.auth_can_pengaduan()) with check (public.auth_can_pengaduan());
drop policy if exists pengaduan_del on public.pengaduan;
create policy pengaduan_del on public.pengaduan
  for delete using (public.auth_is_super());

-- ---- Realtime (idempoten) — inbox update tanpa refresh ---------------------
-- WAJIB cermin db.js REALTIME set (subscribeColl tak live tanpa ini).
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'pengaduan'
  ) then
    execute 'alter publication supabase_realtime add table public.pengaduan';
  end if;
end $$;
