-- ============================================================================
-- F7 · 08 PUSH & CRON — port subsistem notifikasi + scheduled jobs dari
-- Firebase Cloud Functions ke Supabase.
--
-- ISI (semua aman & TANPA secret — secret/cron-http di runbook deploy):
--   1. _rupiah / _enqueue_notif  — helper format & antri notif.
--   2. 7 trigger AUTO-ENQUEUE  — port onBerandaPostCreated / onTagihanCreated /
--      onPembayaranVerified / onKenaikanCreated / onPrestasiCreated /
--      onTesKenaikanCreated / onTesKenaikanDecided. INSERT ke notif_queue;
--      dikirim oleh Edge Function dispatch-push (lihat runbook).
--   3. cleanup_audit_log()  — hapus audit_log > 90 hari (pengganti cleanupAuditLog).
--   4. admin_target_auth_uid(collection, docId)  — dipakai Edge Function
--      reset-user-password: GUARD super_admin + resolve auth.users.id target.
--
-- Pemicu push (dispatch-push tiap menit) + auto-generate-tagihan harian +
-- jadwal cleanup_audit_log = pg_cron + pg_net + Vault. Karena butuh URL+key
-- (secret) & fungsi ter-deploy, dipasang MANUAL via docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md
-- (JANGAN commit service-role key ke migration).
-- ============================================================================

-- ---- helper -----------------------------------------------------------------
create or replace function public._rupiah(n bigint)
returns text language sql immutable as $$
  select replace(to_char(coalesce(n, 0), 'FM999,999,999,999,999'), ',', '.')
$$;

-- Antri 1 notif (SECURITY DEFINER -> bypass RLS notif_queue saat trigger dari
-- user non-staff). target = jsonb string ('semua') ATAU objek {type,id|nama|wa}.
create or replace function public._enqueue_notif(
  p_judul text, p_pesan text, p_target jsonb, p_link text, p_sender text
) returns void language sql security definer set search_path = public as $$
  insert into public.notif_queue (id, judul, pesan, data)
  values (
    'ntf_' || replace(gen_random_uuid()::text, '-', ''),
    p_judul, p_pesan,
    jsonb_build_object(
      'target', p_target, 'link', p_link, 'sender', p_sender,
      'status', 'pending',
      'timestamp', to_char(now() at time zone 'utc', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
    )
  );
$$;

-- ---- 1) beranda_post baru -> broadcast SEMUA --------------------------------
create or replace function public.tg_beranda_post_notif()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  perform public._enqueue_notif(
    case when coalesce(new.judul,'') <> '' then 'Pengumuman: ' || new.judul else 'Pengumuman Baru' end,
    left(coalesce(nullif(new.isi,''), new.judul, ''), 140),
    to_jsonb('semua'::text),
    '/posts',
    coalesce(new.data->>'author', new.data->>'penulis', 'Admin')
  );
  return new;
end $$;
drop trigger if exists trg_beranda_post_notif on public.beranda_post;
create trigger trg_beranda_post_notif after insert on public.beranda_post
  for each row execute function public.tg_beranda_post_notif();

-- ---- 2) keuangan_tagihan INDIVIDUAL baru -> wali ----------------------------
-- Skip bulk (auto_generate/generate_khusus) & yang lahir lunas.
create or replace function public.tg_tagihan_notif()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_sumber text := coalesce(new.data->>'sumber','');
begin
  if new.santri_id is null then return new; end if;
  if v_sumber in ('auto_generate','generate_khusus') then return new; end if;
  if lower(coalesce(new.status,'')) = 'lunas' then return new; end if;
  perform public._enqueue_notif(
    'Tagihan Baru',
    concat_ws(' · ',
      nullif(new.data->>'santri_nama',''),
      coalesce(nullif(new.kategori,''),'Tagihan') || coalesce(' · ' || nullif(new.periode,''), ''),
      'Rp ' || public._rupiah(new.nominal)),
    jsonb_build_object('type','santri','id', new.santri_id::text),
    '/tagihan', 'Sistem'
  );
  return new;
end $$;
drop trigger if exists trg_tagihan_notif on public.keuangan_tagihan;
create trigger trg_tagihan_notif after insert on public.keuangan_tagihan
  for each row execute function public.tg_tagihan_notif();

-- ---- 3) pembayaran_transfer_pending -> 'verified' -> wali --------------------
create or replace function public.tg_pembayaran_verified_notif()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status <> 'verified' or old.status is not distinct from new.status then return new; end if;
  if new.santri_id is null then return new; end if;
  perform public._enqueue_notif(
    'Pembayaran Terverifikasi',
    concat_ws(' · ',
      nullif(new.data->>'santri_nama',''),
      coalesce(nullif(new.data->>'kategori',''),'Pembayaran') || ' Rp ' || public._rupiah(new.nominal)
        || ' sudah diverifikasi. Terima kasih.'),
    jsonb_build_object('type','santri','id', new.santri_id::text),
    '/tagihan', 'Admin'
  );
  return new;
end $$;
drop trigger if exists trg_pembayaran_verified_notif on public.pembayaran_transfer_pending;
create trigger trg_pembayaran_verified_notif after update on public.pembayaran_transfer_pending
  for each row execute function public.tg_pembayaran_verified_notif();

-- ---- 4) riwayat_kenaikan baru -> wali ---------------------------------------
create or replace function public.tg_kenaikan_notif()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_tujuan text := trim(concat_ws(' ', new.data->>'ke_lembaga', new.data->>'ke_kelas'));
        v_nm text := coalesce(nullif(new.data->>'santri_nama',''),'Ananda');
begin
  if new.santri_id is null then return new; end if;
  perform public._enqueue_notif(
    'Selamat, Naik Tingkat! 🎉',
    case when v_tujuan <> '' then v_nm || ' naik ke ' || v_tujuan || '.'
         else v_nm || ' telah naik tingkat. Selamat!' end,
    jsonb_build_object('type','santri','id', new.santri_id::text),
    '/capaian-prestasi', 'Pondok'
  );
  return new;
end $$;
drop trigger if exists trg_kenaikan_notif on public.riwayat_kenaikan;
create trigger trg_kenaikan_notif after insert on public.riwayat_kenaikan
  for each row execute function public.tg_kenaikan_notif();

-- ---- 5) notif_prestasi baru -> wali (1/bulan via doc id) --------------------
create or replace function public.tg_prestasi_notif()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_nm text := coalesce(nullif(new.data->>'santri_nama',''),'Ananda');
        v_tot text := trim(coalesce(new.data->>'total',''));
begin
  if new.santri_id is null then return new; end if;
  perform public._enqueue_notif(
    'Prestasi Diperbarui',
    case when v_tot <> '' then v_nm || ' · nilai prestasi bulan ini: ' || v_tot
         else v_nm || ' · rekap prestasi bulan ini sudah dinilai.' end,
    jsonb_build_object('type','santri','id', new.santri_id::text),
    '/capaian-prestasi', 'Pondok'
  );
  return new;
end $$;
drop trigger if exists trg_prestasi_notif on public.notif_prestasi;
create trigger trg_prestasi_notif after insert on public.notif_prestasi
  for each row execute function public.tg_prestasi_notif();

-- ---- 6) tes_kenaikan diajukan -> Kepala/PJ lembaga --------------------------
create or replace function public.tg_tes_diajukan_notif()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_kepala text := coalesce(new.data->>'kepala_nama','');
        v_nm text := coalesce(nullif(new.data->>'nama_cache',''),'Santri');
begin
  if new.status <> 'diajukan' or v_kepala = '' then return new; end if;
  perform public._enqueue_notif(
    'Ajuan Tes Kenaikan',
    v_nm || ' diajukan tes'
      || coalesce(' ke ' || nullif(new.data->>'target',''), '')
      || coalesce(' oleh ' || nullif(new.data->>'guru_nama',''), '') || '.',
    jsonb_build_object('type','guru','nama', v_kepala),
    '/tes-kenaikan', 'Pondok'
  );
  return new;
end $$;
drop trigger if exists trg_tes_diajukan_notif on public.tes_kenaikan;
create trigger trg_tes_diajukan_notif after insert on public.tes_kenaikan
  for each row execute function public.tg_tes_diajukan_notif();

-- ---- 7) tes_kenaikan diputuskan -> LULUS: wali+guru / tidak: guru -----------
create or replace function public.tg_tes_decided_notif()
returns trigger language plpgsql security definer set search_path = public as $$
declare v_nm text := coalesce(nullif(new.data->>'nama_cache',''),'Ananda');
        v_tgt text := coalesce(nullif(new.data->>'target',''),'tingkat berikutnya');
        v_guru text := coalesce(new.data->>'guru_nama','');
        v_lbl text;
begin
  if old.status is not distinct from new.status or coalesce(new.data->>'penguji','') = '' then
    return new;
  end if;
  if new.status = 'lulus' then
    if new.santri_id is not null then
      perform public._enqueue_notif('Lulus Tes Kenaikan! 🎉',
        v_nm || ' dinyatakan LULUS dan siap naik ke ' || v_tgt || '.',
        jsonb_build_object('type','santri','id', new.santri_id::text), '/capaian-prestasi', 'Pondok');
    end if;
    if v_guru <> '' then
      perform public._enqueue_notif('Hasil Tes: Lulus',
        v_nm || ' LULUS — siap naik ke ' || v_tgt || '.',
        jsonb_build_object('type','guru','nama', v_guru), '/tes-kenaikan', 'Pondok');
    end if;
  elsif new.status in ('tidak_lulus','ditolak') and v_guru <> '' then
    v_lbl := case when new.status = 'tidak_lulus' then 'Belum lulus' else 'Ditolak' end;
    perform public._enqueue_notif('Hasil Tes: ' || v_lbl,
      v_nm || ' → ' || v_lbl || coalesce(' · ' || nullif(new.data->>'catatan_hasil',''), '') || '.',
      jsonb_build_object('type','guru','nama', v_guru), '/tes-kenaikan', 'Pondok');
  end if;
  return new;
end $$;
drop trigger if exists trg_tes_decided_notif on public.tes_kenaikan;
create trigger trg_tes_decided_notif after update on public.tes_kenaikan
  for each row execute function public.tg_tes_decided_notif();

-- ---- cleanup_audit_log: hapus > 90 hari (pengganti cleanupAuditLog) ----------
create or replace function public.cleanup_audit_log()
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  delete from public.audit_log where created_at < now() - interval '90 days';
  get diagnostics n = row_count;
  return n;
end $$;

-- ---- admin_target_auth_uid: GUARD super + resolve auth uid target ------------
-- Dipakai Edge Function reset-user-password. auth_key kanonik dihitung dari
-- record (guru: username|wa, santri: nis|wa) -> email <key>@ammu.local -> uid.
create or replace function public.admin_target_auth_uid(p_collection text, p_doc_id text)
returns uuid language plpgsql stable security definer set search_path = public, auth as $$
declare v_key text; v_email text; v_uid uuid;
begin
  if not public.auth_is_super() then
    raise exception 'forbidden';
  end if;
  if p_collection = 'guru' then
    select coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa))
      into v_key from public.guru g where g.id = p_doc_id;
  elsif p_collection = 'santri' then
    select coalesce(nullif(public._digits(s.nis), ''), public._digits(s.wa))
      into v_key from public.santri s where s.id = p_doc_id;
  else
    raise exception 'bad-input';
  end if;
  if v_key is null then raise exception 'not-found'; end if;
  if v_key = '' then return null; end if;
  v_email := v_key || '@ammu.local';
  select id into v_uid from auth.users where email = v_email limit 1;
  return v_uid; -- null = akun belum ada (lazy-create saat login)
end $$;
revoke all on function public.admin_target_auth_uid(text, text) from public, anon;
grant execute on function public.admin_target_auth_uid(text, text) to authenticated;
