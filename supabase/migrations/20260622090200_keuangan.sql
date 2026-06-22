-- ============================================================================
-- F2 · 02 KEUANGAN — uang = bigint (BUKAN numeric; PostgREST balikin numeric=string).
-- Tabungan TERPISAH dari Buku Induk (jangan dihitung di kas). Tanggal = text 'YYYY-MM-DD'.
-- ============================================================================

create table public.keuangan_tagihan (
  id         text primary key,
  santri_id  text,
  periode    text,                 -- 'YYYY-MM'
  kategori   text,
  nominal    bigint not null default 0 check (nominal >= 0),
  terbayar   bigint not null default 0 check (terbayar >= 0),
  status     text,
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,  -- applied_transfer_refs, dst
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index keuangan_tagihan_santri_idx  on public.keuangan_tagihan (santri_id);
create index keuangan_tagihan_periode_idx on public.keuangan_tagihan (periode, status);

create table public.keuangan_buku_induk (
  id         text primary key,
  tipe       text not null check (tipe in ('masuk','keluar')),
  sumber     text,                 -- manual|pos_santri|tabungan_santri|tabungan_guru|gaji|hutang|transfer_verified
  nominal    bigint not null check (nominal > 0),
  tanggal    text,
  keterangan text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index keuangan_buku_induk_tanggal_idx on public.keuangan_buku_induk (tanggal);
create index keuangan_buku_induk_sumber_idx  on public.keuangan_buku_induk (sumber);

create table public.keuangan_tabungan_santri (
  id         text primary key,
  santri_id  text,
  jenis      text not null check (jenis in ('setor','tarik')),
  nominal    bigint not null check (nominal > 0),
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index keuangan_tabungan_santri_santri_idx on public.keuangan_tabungan_santri (santri_id);
create index keuangan_tabungan_santri_tgl_idx    on public.keuangan_tabungan_santri (tanggal);

-- Uang saku ma'had/mukim — sama persis dgn tabungan (koleksi terpisah).
create table public.keuangan_uang_saku_santri (
  id         text primary key,
  santri_id  text,
  jenis      text not null check (jenis in ('setor','tarik')),
  nominal    bigint not null check (nominal > 0),
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index keuangan_uang_saku_santri_santri_idx on public.keuangan_uang_saku_santri (santri_id);

create table public.keuangan_gaji (
  id              text primary key,
  guru_id         text,
  periode         text,             -- 'YYYY-MM'
  bisyaroh_pokok  bigint not null default 0 check (bisyaroh_pokok >= 0),
  total_pemasukan bigint not null default 0 check (total_pemasukan >= 0),
  total_potongan  bigint not null default 0 check (total_potongan >= 0),
  tunjangan_list  jsonb not null default '[]'::jsonb,
  potongan_list   jsonb not null default '[]'::jsonb,
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index keuangan_gaji_guru_idx    on public.keuangan_gaji (guru_id);
create index keuangan_gaji_periode_idx on public.keuangan_gaji (periode);

create table public.keuangan_hutang_piutang (
  id         text primary key,
  nominal    bigint check (nominal >= 0),
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.keuangan_pembayaran (
  id         text primary key,
  santri_id  text,
  nominal    bigint check (nominal >= 0),
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index keuangan_pembayaran_santri_idx on public.keuangan_pembayaran (santri_id);

create table public.tabungan_mutasi (
  id         text primary key,
  ref_id     text,
  nominal    bigint,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pembayaran_konfirmasi (
  id              text primary key,
  santri_id       text,
  nominal         bigint check (nominal >= 0),
  status          text,             -- pending | verified | ditolak
  tanggal_transfer text,
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index pembayaran_konfirmasi_status_idx on public.pembayaran_konfirmasi (status);

create table public.pembayaran_transfer_pending (
  id         text primary key,
  santri_id  text,
  nominal    bigint check (nominal >= 0),
  status     text not null default 'pending',
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index pembayaran_transfer_pending_status_idx on public.pembayaran_transfer_pending (status);

create table public.pengaturan_keuangan (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
