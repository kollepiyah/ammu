-- ============================================================================
-- F2 · 01 CORE — santri, guru, lembaga, master, settings
-- Pola HYBRID: kolom riil utk field yang difilter/sort/RLS; sisanya di `data jsonb`
-- (ayah/ibu/alamat/custom_fields). PK = id text (kompat Firestore). Uang = bigint.
-- TANPA foreign key (mirror Firestore schemaless; hindari friksi impor) — kecuali
-- profiles.id -> auth.users (file 06). Index di kolom *_id utk join.
-- ============================================================================

create table public.santri (
  id              text primary key,
  nis             text,
  nisn            text,
  nik             text,
  nama            text not null,
  jk              text,                          -- 'L' | 'P'
  lembaga         text,                          -- Qiraati (TPQ/Pra PTPT/PTPT/PPPH)
  kelas           text,
  lembaga_sekolah text,                          -- TK/SDI/PKBM/...
  kelas_sekolah   text,
  juz             text,
  wali            text,
  wa              text,                           -- WA wali
  aktif           boolean not null default true,
  is_mukim        boolean not null default false,
  is_fullday      boolean not null default false,
  foto            text,
  data            jsonb   not null default '{}'::jsonb,  -- ayah{}, ibu{}, alamat, guru_pagi/sore, custom_fields, dst
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index santri_lembaga_kelas_idx          on public.santri (lembaga, kelas);
create index santri_lembaga_sekolah_kelas_idx  on public.santri (lembaga_sekolah, kelas_sekolah);
create index santri_aktif_idx                  on public.santri (aktif);
create index santri_nama_trgm_idx              on public.santri using gin (nama extensions.gin_trgm_ops);
create index santri_data_gin_idx               on public.santri using gin (data jsonb_path_ops);

create table public.guru (
  id               text primary key,
  nama             text not null,
  nik              text,
  jk               text,
  jabatan          text,
  jabatan_tambahan text,
  lembaga          text,
  lembaga_sekolah  text,
  tipe_pegawai     text,                          -- guru | pegawai | pegawai_guru
  shift            text,                          -- pagi | sore | pagi_sore
  status           text not null default 'aktif', -- aktif | Tidak Aktif
  username         text,
  wa               text,
  foto             text,
  role_sistem      text not null default 'user',  -- user | guru_biasa | admin | admin_keuangan | super_admin
  id_fingerprint   text,
  data             jsonb not null default '{}'::jsonb,  -- NIG, no_rek_bmt, pendidikan, akses{}, ttd, dst
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index guru_lembaga_idx  on public.guru (lembaga);
create index guru_jabatan_idx  on public.guru (jabatan);
create index guru_status_idx   on public.guru (status);
create index guru_nama_trgm_idx on public.guru using gin (nama extensions.gin_trgm_ops);

create table public.lembaga (
  id         text primary key,
  nama       text,
  urutan     int,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- master/* & settings/* (Firestore doc tunggal ber-array/map) -> tabel key->JSONB
-- supaya bentuk objek tetap utuh (mis. master/jabatan {list,items}, master/lembaga
-- {list:[{kelas_guru}]}, settings/web, settings/general).
create table public.master (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create table public.settings (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
