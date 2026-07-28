-- ============================================================================
-- A2 (audit 29 Jul 2026) — Ketatkan SELECT tabel FINANSIAL.
--
-- MASALAH: wali_pii_scope (20260706120000) menutup santri/wali dari tabel
-- keuangan agregat, TAPI menyisakan SELECT = auth_is_staff() yang MEMUAT `guru`.
-- Akibatnya guru biasa `GET /rest/v1/keuangan_gaji?select=*` bisa membaca
-- bisyaroh/gaji SEMUA rekan, dan `keuangan_buku_induk` = seluruh arus kas pondok.
-- UI menutup (menu "Bisyaroh Guru/Pegawai" butuh akses keuangan), RLS tidak.
--
-- PRINSIP: {super_admin, admin, admin_keuangan} = lihat SEMUA (dashboard admin +
--   notifikasi + kelola keuangan). Guru = HANYA slip bisyaroh SENDIRI (own row).
--   Set {super,admin,admin_keuangan} = auth_can_manage() OR auth_can_keuangan()
--   (auth_can_keuangan sengaja TANPA admin → OR auth_can_manage untuk sertakan admin).
--
-- FITUR GURU YANG SAH (dipertahankan): "Slip Bisyaroh" (PersonalView + useNotifications
--   role==='guru') membaca keuangan_gaji BARIS MILIKNYA → own-row via profiles.guru_id.
-- AMAN: keuangan_buku_induk/hutang_piutang tak dibaca surface guru; tabungan_mutasi &
--   pengaturan_keuangan (tabel) tak dibaca kode mana pun (config nyata di settings).
--   Tabungan wali/santri pakai keuangan_tabungan_santri/uang_saku (sudah discope W1).
-- ============================================================================

-- ---- keuangan_gaji: staff-keuangan lihat semua; guru lihat SLIP SENDIRI ------
drop policy if exists keuangan_gaji_sel on public.keuangan_gaji;
create policy keuangan_gaji_sel on public.keuangan_gaji for select using (
  public.auth_can_manage() or public.auth_can_keuangan()
  or exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.guru_id = keuangan_gaji.guru_id
  )
);

-- ---- buku induk / hutang-piutang / mutasi tabungan / config keuangan ---------
-- {super_admin, admin, admin_keuangan} saja (guru & santri/wali TIDAK).
do $$
declare t text;
begin
  foreach t in array array[
    'keuangan_buku_induk','keuangan_hutang_piutang','tabungan_mutasi','pengaturan_keuangan'
  ] loop
    execute format('drop policy if exists %I on public.%I', t || '_sel', t);
    execute format(
      'create policy %I on public.%I for select using (public.auth_can_manage() or public.auth_can_keuangan())',
      t || '_sel', t
    );
  end loop;
end $$;
