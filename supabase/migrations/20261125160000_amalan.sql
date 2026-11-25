-- Kitab & Wirid (blueprint Ammu publik F7, Kyai 25 Nov 2026: isi berupa TEKS — Arab + terjemahan).
--
-- Satu baris = satu bacaan (wirid, maulid, tahlil, doa). Bagian-bagiannya disimpan berurutan di
-- data.bagian = [{ judul?, arab, latin?, arti?, ulang? }] supaya admin menyunting satu bacaan
-- utuh sekali simpan, dan layar baca cukup SATU permintaan. Kolom riil hanya yang disaring /
-- diurutkan: kategori, urutan, aktif. Daftar publik menarik kolom ringkas saja (tanpa `data`).

create table if not exists public.amalan (
  id text primary key,
  judul text not null,
  kategori text not null default 'wirid',
  urutan integer not null default 0,
  aktif boolean not null default true,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists amalan_kategori_urutan on public.amalan (kategori, urutan);

drop trigger if exists trg_set_updated_at on public.amalan;
create trigger trg_set_updated_at before update on public.amalan
  for each row execute function public.set_updated_at();

grant all on public.amalan to anon, authenticated, service_role;

alter table public.amalan enable row level security;

-- Tamu & pengguna: hanya yang aktif. Pengelola: semua (termasuk draf yang belum diaktifkan).
drop policy if exists amalan_sel on public.amalan;
create policy amalan_sel on public.amalan
  for select using (aktif or public.auth_can_manage());

drop policy if exists amalan_ins on public.amalan;
create policy amalan_ins on public.amalan
  for insert with check (public.auth_can_manage());

drop policy if exists amalan_upd on public.amalan;
create policy amalan_upd on public.amalan
  for update using (public.auth_can_manage()) with check (public.auth_can_manage());

drop policy if exists amalan_del on public.amalan;
create policy amalan_del on public.amalan
  for delete using (public.auth_can_manage());
