-- ============================================================================
-- F2 · 05 PROFILES + RLS (PERAN, bukan tenant) — single-tenant.
-- profiles = identitas peran + akses granular, link ke auth.users(id).
-- Helper SECURITY DEFINER baca profiles (bypass RLS -> tak rekursi).
-- ============================================================================

create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  login_key   text unique,                 -- username/WA/NIS ternormalisasi (= local-part email)
  role        text not null default 'santri',      -- admin | guru | santri (bucket UI lama)
  role_sistem text not null default 'santri',      -- super_admin|admin|admin_keuangan|guru_biasa|user|santri
  supervisi   boolean not null default false,      -- jabatan Direktur/Supervisor (set admin di F5)
  santri_id   text,                        -- link ke santri.id (tanpa FK; mirror Firestore)
  guru_id     text,                        -- link ke guru.id
  akses       jsonb not null default '{}'::jsonb,   -- map granular per-user
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index profiles_santri_idx on public.profiles (santri_id);
create index profiles_guru_idx   on public.profiles (guru_id);

-- Auto-buat profil saat user Auth baru (lazy-create login pertama). Definer -> bypass RLS.
-- F5 menyempurnakan pemetaan peran (admin/guru via login_key -> guru.role_sistem); default santri.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, login_key, role, role_sistem)
  values (new.id, split_part(coalesce(new.email,''), '@', 1), 'santri', 'santri')
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---- Helper peran (SECURITY DEFINER, stable) -------------------------------
create or replace function public.auth_role_sistem()
returns text language sql stable security definer set search_path = public as $$
  select role_sistem from public.profiles where id = auth.uid()
$$;
create or replace function public.auth_is_super()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_role_sistem() = 'super_admin', false)
$$;
create or replace function public.auth_can_manage()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_role_sistem() in ('super_admin','admin'), false)
$$;
create or replace function public.auth_can_keuangan()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_role_sistem() in ('super_admin','admin_keuangan'), false)
$$;
create or replace function public.auth_can_akademik()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_role_sistem() in ('super_admin','admin','guru'), false)
$$;
create or replace function public.auth_is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_role_sistem() in ('super_admin','admin','admin_keuangan','guru'), false)
$$;
create or replace function public.auth_can_supervisi()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.auth_is_super()
    or (select supervisi from public.profiles where id = auth.uid()), false)
$$;

-- ---- Enable RLS di SEMUA tabel public (default-deny) ------------------------
do $$
declare r record;
begin
  for r in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', r.tablename);
  end loop;
end $$;

-- ---- Archetype A: read PUBLIK, write canManage, delete super ----------------
do $$
declare t text;
begin
  foreach t in array array[
    'lembaga','master','posts','beranda_post','kegiatan',
    'kegiatan_pesantren','kegiatan_master','profil_pesantren'
  ] loop
    execute format('create policy %I on public.%I for select using (true)', t||'_sel', t);
    execute format('create policy %I on public.%I for insert with check (public.auth_can_manage())', t||'_ins', t);
    execute format('create policy %I on public.%I for update using (public.auth_can_manage()) with check (public.auth_can_manage())', t||'_upd', t);
    execute format('create policy %I on public.%I for delete using (public.auth_is_super())', t||'_del', t);
  end loop;
end $$;

-- ---- Archetype B: read signedIn, write canAkademik, delete super -----------
do $$
declare t text;
begin
  foreach t in array array[
    'absensi','absensi_guru','absensi_shift_guru','absensi_kegiatan',
    'absensi_santri_sekolah_bulanan','absensi_santri_ngaji_bulanan',
    'rapor_semester','rekap_diniyah','rekap_prestasi','riwayat_prestasi','notif_prestasi',
    'riwayat_kenaikan','tes_kenaikan','izin_guru'
  ] loop
    execute format('create policy %I on public.%I for select using (auth.uid() is not null)', t||'_sel', t);
    execute format('create policy %I on public.%I for insert with check (public.auth_can_akademik())', t||'_ins', t);
    execute format('create policy %I on public.%I for update using (public.auth_can_akademik()) with check (public.auth_can_akademik())', t||'_upd', t);
    execute format('create policy %I on public.%I for delete using (public.auth_is_super())', t||'_del', t);
  end loop;
end $$;

-- ---- Archetype C: read signedIn, write canKeuangan, delete super ----------
do $$
declare t text;
begin
  foreach t in array array[
    'keuangan_tagihan','keuangan_tabungan_santri','keuangan_uang_saku_santri',
    'keuangan_gaji','keuangan_buku_induk','keuangan_hutang_piutang',
    'keuangan_pembayaran','tabungan_mutasi','pengaturan_keuangan'
  ] loop
    execute format('create policy %I on public.%I for select using (auth.uid() is not null)', t||'_sel', t);
    execute format('create policy %I on public.%I for insert with check (public.auth_can_keuangan())', t||'_ins', t);
    execute format('create policy %I on public.%I for update using (public.auth_can_keuangan()) with check (public.auth_can_keuangan())', t||'_upd', t);
    execute format('create policy %I on public.%I for delete using (public.auth_is_super())', t||'_del', t);
  end loop;
end $$;

-- ---- ABSENSI_SANTRI_SEKOLAH (harian mentah): read signedIn, TANPA create/update
-- (server-only, mirror rules `create,update: if false`), delete super ---------
create policy assek_sel on public.absensi_santri_sekolah for select using (auth.uid() is not null);
create policy assek_del on public.absensi_santri_sekolah for delete using (public.auth_is_super());

-- ---- SANTRI: read signedIn, write manage / self-edit, delete super ---------
create policy santri_sel on public.santri for select using (auth.uid() is not null);
create policy santri_ins on public.santri for insert with check (public.auth_can_manage());
create policy santri_upd_manage on public.santri for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy santri_upd_self on public.santri for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.santri_id = santri.id))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.santri_id = santri.id));
create policy santri_del on public.santri for delete using (public.auth_is_super());

-- ---- GURU: idem (self-edit foto/username; field privilese dijaga di app) ----
create policy guru_sel on public.guru for select using (auth.uid() is not null);
create policy guru_ins on public.guru for insert with check (public.auth_can_manage());
create policy guru_upd_manage on public.guru for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy guru_upd_self on public.guru for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.guru_id = guru.id))
  with check (exists (select 1 from public.profiles p where p.id = auth.uid() and p.guru_id = guru.id));
create policy guru_del on public.guru for delete using (public.auth_is_super());

-- ---- SETTINGS: read semua KECUALI 'admin'; write manage; delete super ------
create policy settings_sel on public.settings for select using (key <> 'admin');
create policy settings_ins on public.settings for insert with check (public.auth_can_manage());
create policy settings_upd on public.settings for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy settings_del on public.settings for delete using (public.auth_is_super());

-- ---- PROFILES: baca self/manage; tulis manage saja (cegah eskalasi peran) ---
create policy profiles_sel on public.profiles for select using (id = auth.uid() or public.auth_can_manage());
create policy profiles_ins on public.profiles for insert with check (public.auth_can_manage());
create policy profiles_upd on public.profiles for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy profiles_del on public.profiles for delete using (public.auth_is_super());

-- ---- POST_REACTIONS: read publik, write signedIn ---------------------------
create policy post_reactions_sel on public.post_reactions for select using (true);
create policy post_reactions_rw  on public.post_reactions for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---- KRITIK_SARAN: create ANONIM (form), read/kelola signedIn/manage -------
create policy kritik_sel on public.kritik_saran for select using (auth.uid() is not null);
create policy kritik_ins on public.kritik_saran for insert with check (char_length(coalesce(pesan,'')) between 1 and 2000);
create policy kritik_upd on public.kritik_saran for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy kritik_del on public.kritik_saran for delete using (public.auth_is_super());

-- ---- PSB_PENDAFTARAN: create ANONIM (formulir), kelola manage --------------
create policy psb_sel on public.psb_pendaftaran for select using (auth.uid() is not null);
create policy psb_ins on public.psb_pendaftaran for insert with check (char_length(coalesce(nama,'')) between 1 and 200);
create policy psb_upd on public.psb_pendaftaran for update using (public.auth_can_manage()) with check (public.auth_can_manage());
create policy psb_del on public.psb_pendaftaran for delete using (public.auth_is_super());

-- ---- NOTIF_QUEUE: TANPA read (server-only); tulis staff -------------------
create policy notif_queue_ins on public.notif_queue for insert with check (public.auth_is_staff());
create policy notif_queue_upd on public.notif_queue for update using (public.auth_is_staff()) with check (public.auth_is_staff());
create policy notif_queue_del on public.notif_queue for delete using (public.auth_is_staff());

-- ---- AUDIT_LOG: append-only (read+insert signedIn; tanpa update/delete) -----
create policy audit_sel on public.audit_log for select using (auth.uid() is not null);
create policy audit_ins on public.audit_log for insert with check (auth.uid() is not null);

-- ---- BACKUP_HAPUS: read signedIn, insert staff (tanpa update/delete) --------
create policy backup_sel on public.backup_hapus for select using (auth.uid() is not null);
create policy backup_ins on public.backup_hapus for insert with check (public.auth_is_staff());

-- ---- SCHEDULED_JOBS: read signedIn, tulis staff, delete super --------------
create policy scheduled_sel on public.scheduled_jobs for select using (auth.uid() is not null);
create policy scheduled_ins on public.scheduled_jobs for insert with check (public.auth_is_staff());
create policy scheduled_upd on public.scheduled_jobs for update using (public.auth_is_staff()) with check (public.auth_is_staff());
create policy scheduled_del on public.scheduled_jobs for delete using (public.auth_is_super());

-- ---- USER_NOTIF_STATE: read publik, tulis signedIn -------------------------
create policy user_notif_state_sel on public.user_notif_state for select using (true);
create policy user_notif_state_rw  on public.user_notif_state for all
  using (auth.uid() is not null) with check (auth.uid() is not null);

-- ---- LINK_PREVIEW_CACHE: read publik, tulis server-only (tanpa policy tulis)-
create policy link_preview_sel on public.link_preview_cache for select using (true);

-- ---- PEMBAYARAN_KONFIRMASI: read signedIn, create signedIn, upd/del keuangan
create policy pemb_konf_sel on public.pembayaran_konfirmasi for select using (auth.uid() is not null);
create policy pemb_konf_ins on public.pembayaran_konfirmasi for insert with check (auth.uid() is not null);
create policy pemb_konf_upd on public.pembayaran_konfirmasi for update using (public.auth_can_keuangan()) with check (public.auth_can_keuangan());
create policy pemb_konf_del on public.pembayaran_konfirmasi for delete using (public.auth_can_keuangan());

-- ---- PEMBAYARAN_TRANSFER_PENDING: read signedIn, create signedIn, upd/del keuangan
create policy pemb_pend_sel on public.pembayaran_transfer_pending for select using (auth.uid() is not null);
create policy pemb_pend_ins on public.pembayaran_transfer_pending for insert with check (auth.uid() is not null);
create policy pemb_pend_upd on public.pembayaran_transfer_pending for update using (public.auth_can_keuangan()) with check (public.auth_can_keuangan());
create policy pemb_pend_del on public.pembayaran_transfer_pending for delete using (public.auth_can_keuangan());

-- ---- SUPERVISI_CATATAN: read signedIn, tulis supervisi, delete super -------
create policy supervisi_sel on public.supervisi_catatan for select using (auth.uid() is not null);
create policy supervisi_ins on public.supervisi_catatan for insert with check (public.auth_can_supervisi());
create policy supervisi_upd on public.supervisi_catatan for update using (public.auth_can_supervisi()) with check (public.auth_can_supervisi());
create policy supervisi_del on public.supervisi_catatan for delete using (public.auth_is_super());
