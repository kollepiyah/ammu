-- ============================================================================
-- F2 · 04 KONTEN & SISTEM — posts, beranda_post, reactions, kegiatan, PSB,
-- kritik_saran, notif_queue, audit_log, backup_hapus, scheduled_jobs,
-- user_notif_state, link_preview_cache, profil_pesantren.
-- ============================================================================

create table public.posts (
  id         text primary key,
  judul      text,
  isi        text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.beranda_post (
  id         text primary key,
  judul      text,
  isi        text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Gabungan 2 subkoleksi reactions (beranda_post + posts) jadi 1 tabel.
create table public.post_reactions (
  post_id    text not null,
  post_type  text not null,        -- 'beranda_post' | 'posts'
  user_id    text not null,
  emoji      text,
  created_at timestamptz not null default now(),
  primary key (post_id, post_type, user_id)
);
create index post_reactions_post_idx on public.post_reactions (post_type, post_id);

create table public.kegiatan (
  id         text primary key,
  judul      text,
  tgl_mulai  text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index kegiatan_tgl_idx on public.kegiatan (tgl_mulai);

create table public.kegiatan_pesantren (
  id         text primary key,
  judul      text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.kegiatan_master (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profil_pesantren (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.kritik_saran (
  id         text primary key,
  pesan      text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.psb_pendaftaran (
  id         text primary key,
  nama       text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index psb_pendaftaran_created_idx on public.psb_pendaftaran (created_at);

create table public.notif_queue (
  id         text primary key,
  judul      text,
  pesan      text,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_log (
  id         text primary key,
  aksi       text,
  collection text,
  doc_id     text,
  user_id    text,
  data       jsonb not null default '{}'::jsonb,   -- data_snapshot, alasan, user_nama, dst
  created_at timestamptz not null default now()
);
create index audit_log_created_idx    on public.audit_log (created_at);
create index audit_log_collection_idx on public.audit_log (collection);

create table public.backup_hapus (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.scheduled_jobs (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Per-user notif state (last_seen per kategori) — id = user id.
create table public.user_notif_state (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.link_preview_cache (
  id         text primary key,      -- url / hash
  data       jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
