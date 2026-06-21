-- ============================================================================
-- F2 · 03 AKADEMIK — absensi, rapor, rekap, prestasi, kenaikan, tes, izin, supervisi.
-- Kolom indeks (santri_id/guru_id/periode/lembaga/tanggal) + sisanya `data jsonb`.
-- ============================================================================

create table public.absensi (
  id         text primary key,
  santri_id  text,
  tanggal    text,
  lembaga    text,
  kelas      text,
  status     text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_santri_idx  on public.absensi (santri_id);
create index absensi_tanggal_idx on public.absensi (tanggal);
create index absensi_lk_idx      on public.absensi (lembaga, kelas);

create table public.absensi_guru (
  id         text primary key,
  guru_id    text,
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_guru_guru_idx    on public.absensi_guru (guru_id);
create index absensi_guru_tanggal_idx on public.absensi_guru (tanggal);

create table public.absensi_shift_guru (
  id         text primary key,
  guru_id    text,
  periode    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_shift_guru_guru_idx on public.absensi_shift_guru (guru_id, periode);

create table public.absensi_kegiatan (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.absensi_santri_sekolah (
  id         text primary key,
  santri_id  text,
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_santri_sekolah_santri_idx on public.absensi_santri_sekolah (santri_id);

create table public.absensi_santri_sekolah_bulanan (
  id         text primary key,
  santri_id  text,
  periode    text,              -- 'YYYY-MM'
  sakit      int not null default 0 check (sakit >= 0),
  izin       int not null default 0 check (izin  >= 0),
  alpa       int not null default 0 check (alpa  >= 0),
  hadir      int not null default 0 check (hadir >= 0),
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_santri_sekolah_bulanan_idx on public.absensi_santri_sekolah_bulanan (santri_id, periode);

create table public.absensi_santri_ngaji_bulanan (
  id         text primary key,
  santri_id  text,
  periode    text,
  sakit      int not null default 0 check (sakit >= 0),
  izin       int not null default 0 check (izin  >= 0),
  alpa       int not null default 0 check (alpa  >= 0),
  hadir      int not null default 0 check (hadir >= 0),
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index absensi_santri_ngaji_bulanan_idx on public.absensi_santri_ngaji_bulanan (santri_id, periode);

create table public.rapor_semester (
  id            text primary key,
  santri_id     text,
  lembaga       text,
  semester      text,
  tahun_ajaran  text,
  data          jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index rapor_semester_santri_idx  on public.rapor_semester (santri_id);
create index rapor_semester_lembaga_idx on public.rapor_semester (lembaga, semester);

create table public.rekap_diniyah (
  id         text primary key,
  santri_id  text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index rekap_diniyah_santri_idx on public.rekap_diniyah (santri_id);

create table public.rekap_prestasi (
  id         text primary key,
  santri_id  text,
  lembaga    text,
  kelas      text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index rekap_prestasi_santri_idx  on public.rekap_prestasi (santri_id);
create index rekap_prestasi_lembaga_idx on public.rekap_prestasi (lembaga, kelas);

create table public.riwayat_prestasi (
  id         text primary key,
  santri_id  text,
  periode    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index riwayat_prestasi_santri_idx  on public.riwayat_prestasi (santri_id);
create index riwayat_prestasi_periode_idx on public.riwayat_prestasi (periode);

create table public.notif_prestasi (
  id         text primary key,
  santri_id  text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index notif_prestasi_santri_idx on public.notif_prestasi (santri_id);

create table public.riwayat_kenaikan (
  id         text primary key,
  santri_id  text,
  tanggal    text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index riwayat_kenaikan_santri_idx on public.riwayat_kenaikan (santri_id);

create table public.tes_kenaikan (
  id         text primary key,
  santri_id  text,
  lembaga    text,
  status     text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tes_kenaikan_santri_idx on public.tes_kenaikan (santri_id);
create index tes_kenaikan_status_idx on public.tes_kenaikan (status);

create table public.izin_guru (
  id         text primary key,
  guru_id    text,
  status     text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index izin_guru_guru_idx on public.izin_guru (guru_id);

create table public.supervisi_catatan (
  id          text primary key,
  target_type text,               -- guru | lembaga
  target_id   text,
  judul       text,
  catatan     text,
  data        jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index supervisi_catatan_target_idx on public.supervisi_catatan (target_type, target_id);
