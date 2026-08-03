-- ============================================================================
-- AUDIT AGU 2026 · Batch 2 — tutup SELECT yang masih `signedIn` (K6-K9) +
-- tolak auto-tautan akun BERPERAN saat lazy-create (K1-a).
--
-- LATAR (terukur 3 Agu 2026): pendaftaran mandiri Supabase Auth masih AKTIF
--   (/auth/v1/settings -> disable_signup:false) dan `authSupabase.loginUnified`
--   mem-`signUp` dengan sandi APA PUN saat akun belum ada. Artinya siapa pun di
--   internet — cukup berbekal anon key yang memang publik — bisa mencetak JWT
--   `authenticated` yang SAH. Konsekuensinya setiap policy `auth.uid() is not
--   null` efektifnya = TERBUKA ANONIM, bukan "terbuka untuk pengguna terdaftar":
--     audit_log               7.334 baris, berisi data_snapshot baris TERHAPUS
--                             (PII santri + baris keuangan), rata-rata 1,6 kB
--     psb_pendaftaran         PII pendaftar (NIK, HP, alamat)
--     kritik_saran            isi aduan semua orang
--     pembayaran_konfirmasi   santri_id + nominal + status semua keluarga
--     pembayaran_transfer_pending  idem
--     backup_hapus            snapshot hapus (tak ada pembacanya di app)
--     user_notif_state        `using (true)` -> 54 baris terbaca ANON, tanpa login
--
-- W1 (20260706120000) sudah menutup tabel per-santri, A2 (20260729120000)
--   tabel finansial agregat — tujuh tabel di atas TERLEWAT dari keduanya.
--
-- ⚠️ JEBAKAN yang dihindari file ini: kebijakan RLS di-OR. Menambah policy
--   SELECT baru TANPA membuang yang lama = TIDAK memperketat apa pun (yang lama
--   tetap mengizinkan). Nama policy lama juga tak seragam (`pemb_konf_sel`,
--   `pemb_pend_sel` — bukan pola `<tabel>_sel`), jadi `drop policy if exists
--   <tabel>_sel` akan diam-diam no-op. Karena itu tiap tabel di bawah dibersihkan
--   dengan MEMBUANG SEMUA policy ber-cmd SELECT dari pg_policies, bukan menebak nama.
--   Policy ber-cmd ALL sengaja TIDAK disentuh (mis. user_notif_state_rw yang
--   menanggung tulis) — cakupan SELECT-nya sudah `signedIn`.
--
-- Pembaca di aplikasi sudah diaudit satu per satu sebelum policy ditulis
--   (lihat komentar tiap blok) supaya tak ada peran yang mati — lihat gotcha
--   "fitur jalan di super_admin, gagal di peran lain = curigai RLS dulu".
-- ============================================================================

-- ---- helper: buang semua policy SELECT pada sebuah tabel -------------------
create or replace function public._drop_select_policies(p_table text)
returns void language plpgsql as $$
declare r record;
begin
  for r in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = p_table and cmd = 'SELECT'
  loop
    execute format('drop policy %I on public.%I', r.policyname, p_table);
  end loop;
end $$;

-- ---- K7 · audit_log: hanya {super_admin, admin} ----------------------------
-- Pembaca: HANYA MasterDataView (rute ber-gate roleSistem super_admin). INSERT
-- dibiarkan `signedIn` — db.js menulis snapshot audit sebelum SETIAP hapus,
-- termasuk hapus oleh guru; mempersempitnya akan mematikan jejak audit.
select public._drop_select_policies('audit_log');
create policy audit_sel on public.audit_log for select using (public.auth_can_manage());

-- ---- K7 · backup_hapus: super_admin saja -----------------------------------
-- Tak ada satu pun pembaca di aplikasi (diverifikasi: 0 getAll/queryColl/
-- subscribeColl). Isinya sejenis audit_log, jadi dikunci paling rapat.
select public._drop_select_policies('backup_hapus');
create policy backup_sel on public.backup_hapus for select using (public.auth_is_super());

-- ---- K6 · pembayaran_konfirmasi & pembayaran_transfer_pending -------------
-- Pola W1: staf lihat semua, wali/santri lihat KELUARGA SENDIRI. WAJIB tetap
-- terbaca wali — PembayaranView & PembayaranPendingView (rute tanpa meta gate)
-- menampilkan status transfer milik sendiri. `santri_id` = kolom riil di kedua
-- tabel (lihat COLS di services/db.js), jadi bisa dipakai langsung.
do $$
declare t text;
begin
  foreach t in array array['pembayaran_konfirmasi', 'pembayaran_transfer_pending'] loop
    perform public._drop_select_policies(t);
    execute format(
      'create policy %I on public.%I for select using (public.auth_is_staff() or public.auth_owns_santri(santri_id::text))',
      t || '_sel', t
    );
  end loop;
end $$;

-- ---- K8 · psb_pendaftaran: {super_admin, admin, admin_keuangan} ------------
-- Pembaca: PpdbAdminView + PpdbDetailView, keduanya rute `meta.admin` = bucket
-- role 'admin' (super_admin/admin/admin_keuangan) -> admin_keuangan HARUS ikut,
-- karena itu `auth_can_manage() OR auth_can_keuangan()` (auth_can_keuangan
-- sengaja tanpa admin). Formulir PSB publik hanya INSERT (psb_ins tak disentuh),
-- diverifikasi PsbFormView tidak pernah membaca tabel ini.
select public._drop_select_policies('psb_pendaftaran');
create policy psb_sel on public.psb_pendaftaran for select
  using (public.auth_can_manage() or public.auth_can_keuangan());

-- ---- K8 · kritik_saran: pengurus semua, pengirim lihat MILIKNYA ------------
-- KritikSaranView memang dibuka semua peran: admin melihat daftar penuh,
-- non-admin melihat `myMsgs` = kiriman sendiri (filter pengirim_id === sesi.id).
-- Jadi klausa own-row WAJIB ada, jika tidak riwayat aduan santri/guru jadi kosong.
-- `pengirim_id` tinggal di ekor jsonb `data` (COLS.kritik_saran = ['pesan']) dan
-- isinya = guru.id / santri.id, dipetakan lewat profiles (cermin pola own-row
-- keuangan_gaji di 20260729120000).
select public._drop_select_policies('kritik_saran');
create policy kritik_sel on public.kritik_saran for select using (
  public.auth_can_manage()
  or public.auth_can_keuangan()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid()
      and nullif(kritik_saran.data->>'pengirim_id', '') is not null
      and (
        p.guru_id = kritik_saran.data->>'pengirim_id'
        or p.santri_id = kritik_saran.data->>'pengirim_id'
      )
  )
);

-- ---- K9 · user_notif_state: tutup baca ANON --------------------------------
-- Dulu `using (true)`. Pembacanya cuma subscribeDoc baris SENDIRI, jadi
-- `signedIn` sudah cukup dan tak ada risiko regresi. Policy `_rw` (cmd ALL,
-- penanggung tulis) sengaja dibiarkan apa adanya.
select public._drop_select_policies('user_notif_state');
create policy user_notif_state_sel on public.user_notif_state for select
  using (auth.uid() is not null);

drop function if exists public._drop_select_policies(text);

-- ============================================================================
-- K1-a · handle_new_user: akun BERPERAN tak boleh lahir dari pendaftaran mandiri
--
-- Terukur 3 Agu: 107 akun auth vs 615 orang aktif -> 508 orang belum pernah
-- login. Untuk mereka `signUp` masih terbuka, dan trigger ini memetakan akun
-- baru itu ke record guru/santri BERIKUT perannya — termasuk admin/keuangan.
-- Efeknya: siapa pun yang tahu username seorang pengurus (RPC `resolve_login`
-- publik = oracle enumerasi) bisa MEREBUT akun itu dengan sandi pilihannya
-- sendiri, dan pemilik aslinya justru terkunci.
--
-- Perbaikan minimal & bedah: tolak HANYA yang berperan (adminmu + guru
-- role_sistem admin/admin_keuangan/super_admin). Santri & guru biasa tetap
-- lazy-create seperti sekarang supaya tak ada yang terkunci sebelum
-- `provision-akun` (K1-b) siap; sisa risikonya dipotong oleh pengetatan SELECT
-- di atas. Penutupan penuh = matikan signup sesudah semua akun dibuat (K1-c).
--
-- JALUR SAH untuk membuat akun pengurus: Admin API (service-role) dengan
--   app_metadata { ammu_provisioned: true }. `app_metadata` dipilih SENGAJA
--   karena klien TIDAK bisa mengisinya lewat signUp (hanya user_metadata yang
--   bisa), jadi penanda ini tak bisa dipalsukan dari luar. K1-b WAJIB
--   mengirimkannya, kalau tidak pembuatan akun pengurus akan ikut tertolak.
-- WORKAROUND manual (Dashboard, tanpa penanda itu): buat guru dengan
--   role_sistem 'user' -> minta ia login sekali (akun lahir) -> BARU naikkan
--   perannya (trigger sync_guru_profile_role ikut memperbarui profiles).
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_key text := split_part(coalesce(new.email, ''), '@', 1);
  m record;
  v_rs text;
  v_role text;
  v_provisioned boolean := coalesce(new.raw_app_meta_data->>'ammu_provisioned', '') = 'true';
begin
  select * into m from public._resolve_authkey(v_key) limit 1;

  -- K1-a: gerbang anti-rebut akun pengurus.
  if not v_provisioned
     and (
       m.source = 'admin'
       or (m.source = 'guru' and m.role_sistem in ('super_admin', 'admin', 'admin_keuangan'))
     )
  then
    raise exception
      'akun pengurus tidak boleh dibuat lewat pendaftaran mandiri — minta super admin membuatkannya'
      using errcode = '42501';
  end if;

  if m.source = 'admin' then
    insert into public.profiles (id, login_key, role, role_sistem, supervisi)
    values (new.id, v_key, 'admin', 'super_admin', true)
    on conflict (id) do nothing;

  elsif m.source = 'guru' then
    v_rs := case m.role_sistem
              when 'super_admin' then 'super_admin'
              when 'admin' then 'admin'
              when 'admin_keuangan' then 'admin_keuangan'
              else 'guru'
            end;
    v_role := case when v_rs in ('admin', 'admin_keuangan', 'super_admin') then 'admin' else 'guru' end;
    insert into public.profiles (id, login_key, role, role_sistem, supervisi, guru_id)
    values (new.id, v_key, v_role, v_rs, coalesce(m.supervisi, false), m.ref_id)
    on conflict (id) do nothing;

  elsif m.source = 'santri' then
    insert into public.profiles (id, login_key, role, role_sistem, santri_id)
    values (new.id, v_key, 'santri', 'santri', m.ref_id)
    on conflict (id) do nothing;

  else
    -- tak match (mis. akun manual / Google belum tertaut) -> default santri tanpa
    -- tautan; buildSesi mengembalikan null sehingga sesi app tak terbentuk.
    insert into public.profiles (id, login_key, role, role_sistem)
    values (new.id, v_key, 'santri', 'santri')
    on conflict (id) do nothing;
  end if;

  return new;
end;
$$;

-- ---- laporan pasca-push: siapa yang kini butuh dibuatkan akun --------------
-- Sekadar RAISE NOTICE (tak pernah menggagalkan push, sekalipun auth.users tak
-- terbaca) supaya Kyai langsung tahu dampak K1-a saat `supabase db push`.
do $$
declare n int; v_list text;
begin
  with kurang as (
    select g.nama,
           coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa)) as kunci,
           g.role_sistem
    from public.guru g
    where g.status is distinct from 'Tidak Aktif'
      and g.role_sistem in ('super_admin', 'admin', 'admin_keuangan')
      and not exists (
        select 1 from auth.users u
        where split_part(coalesce(u.email, ''), '@', 1) =
              coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa))
      )
  )
  select count(*), string_agg(kunci || ' (' || role_sistem || ' — ' || coalesce(nama, '?') || ')', ', ')
    into n, v_list from kurang;

  raise notice '[K1-a] guru BERPERAN yang belum punya akun login: %', n;
  if n > 0 then
    raise notice '[K1-a] DAFTARNYA: %', v_list;
    raise notice '[K1-a] Mereka kini TIDAK bisa mendaftar sendiri. Buatkan lewat provision-akun (K1-b), atau: set role_sistem ke ''user'' -> minta login sekali -> naikkan perannya lagi.';
    raise notice '[K1-a] ⚠️ PERIKSA akun demo Play (demoplay): kalau ikut terdaftar di atas, buatkan akunnya SEBELUM rilis berikutnya — reviewer Play akan gagal login.';
  end if;
exception when others then
  raise notice '[K1-a] daftar guru berperan tanpa akun tak bisa dihitung di sini (%). Cek manual: select ... from auth.users.', sqlerrm;
end $$;
