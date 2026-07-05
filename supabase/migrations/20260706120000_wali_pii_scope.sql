-- ============================================================================
-- W1 (audit 6 Jul) — Ketatkan SELECT tabel PER-SANTRI: wali/santri hanya boleh
-- baca data KELUARGA SENDIRI (anak sendiri + saudara se-WA). Staff (super/admin/
-- admin_keuangan/guru) tetap baca SEMUA (tak ada regresi utk guru/pegawai).
--
-- MASALAH: policy lama `*_sel = auth.uid() is not null` (signedIn) → setiap user
-- login, TERMASUK WALI, bisa `GET /rest/v1/santri?select=*` & baca PII semua
-- santri (NIK, WA/NIK ortu, alamat) + keuangan semua keluarga. UI membatasi
-- (useWaliChildren), RLS tidak.
--
-- ⚠️ KAPAN APPLY: SETELAH data santri diimpor & ADA akun santri utk uji — BUKAN
--   sebelum sosialisasi guru/pegawai 8 Jul (audiens itu staff, tak terpengaruh).
--   WAJIB uji dgn 1 akun wali: (a) lihat anak sendiri + saudara se-WA OK,
--   (b) TAK bisa lihat santri lain, (c) app santri (profil/tagihan/rapor/capaian)
--   tetap jalan, (d) realtime santri-role hanya kirim baris keluarga.
--   Staff (guru/admin) harus tetap lihat semua.
--
-- Basis "keluarga" = sama dgn app (useWaliChildren): _digits(wa) cocok. Guard
-- fan-out PUSH sendiri sudah lebih ketat (NIK/nama ayah cocok, lihat dispatch-push).
-- ============================================================================

-- Apakah santri `p_santri_id` = milik user login (diri sendiri ATAU saudara se-WA)?
create or replace function public.auth_owns_santri(p_santri_id text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    -- diri sendiri (akun santri yang login)
    select 1 from public.profiles p
    where p.id = auth.uid() and p.santri_id = p_santri_id
  ) or exists (
    -- saudara: santri lain yang berbagi no WA wali dengan anak yang login
    select 1
    from public.profiles p
    join public.santri me  on me.id  = p.santri_id
    join public.santri tgt on tgt.id = p_santri_id
    where p.id = auth.uid()
      and public._digits(me.wa) <> ''
      and public._digits(me.wa) = public._digits(tgt.wa)
  )
$$;
grant execute on function public.auth_owns_santri(text) to authenticated;

-- ---- 1) santri + tabel per-santri (punya santri_id): staff=semua, wali=keluarga --
do $$
declare t text; col text;
begin
  foreach t in array array[
    'santri',
    'absensi','absensi_santri_sekolah','absensi_santri_sekolah_bulanan',
    'absensi_santri_ngaji_bulanan','rapor_semester','rekap_diniyah',
    'rekap_prestasi','riwayat_prestasi','notif_prestasi','riwayat_kenaikan',
    'tes_kenaikan','tes_glondongan',
    'keuangan_tagihan','keuangan_tabungan_santri','keuangan_uang_saku_santri',
    'keuangan_pembayaran'
  ] loop
    col := case when t = 'santri' then 'id' else 'santri_id' end;
    execute format('drop policy if exists %I on public.%I', t || '_sel', t);
    execute format(
      'create policy %I on public.%I for select using (public.auth_is_staff() or public.auth_owns_santri(%I::text))',
      t || '_sel', t, col
    );
  end loop;
end $$;

-- ---- 2) tabel guru/agregat (tanpa santri_id): santri-role TAK perlu → staff-only --
-- (guru attendance/leave, gaji, buku induk pondok, mutasi, config keuangan)
do $$
declare t text;
begin
  foreach t in array array[
    'absensi_guru','absensi_shift_guru','izin_guru',
    'keuangan_gaji','keuangan_buku_induk','keuangan_hutang_piutang',
    'tabungan_mutasi','pengaturan_keuangan'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_sel', t);
    execute format('create policy %I on public.%I for select using (public.auth_is_staff())', t || '_sel', t);
  end loop;
end $$;

-- CATATAN: guru_sel dibiarkan signedIn (data guru = nama/jabatan/WA, dipakai
--   picker & direktori lintas-app; bukan PII sensitif santri). Bila mau ketatkan
--   juga, tambahkan di batch (2) — TAPI cek dulu app tak butuh baca guru lain.
