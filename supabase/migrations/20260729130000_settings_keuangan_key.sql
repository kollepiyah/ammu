-- ============================================================================
-- A1 (audit 29 Jul 2026) — Pindahkan config KEUANGAN SENSITIF keluar dari
-- settings/general (& /web) yang ANON-readable, ke key baru settings/keuangan
-- yang HANYA {super_admin, admin, admin_keuangan}.
--
-- MASALAH: settings_sel = `key <> 'admin'` → siapa pun tanpa login `GET
-- /rest/v1/settings?key=eq.general` membaca tarif syahriyah, nominal_per_santri,
-- TARIF BISYAROH/GAJI (keuBisyarohJenis), beban mengajar. general WAJIB tetap
-- anon (PSB publik `PsbFormView` & branding login membacanya), jadi solusinya =
-- pisahkan kunci sensitif ke row `keuangan` ber-auth.
--
-- Kunci yang dipindah: keuTagihanJenis, keuTagihanJenisByTA, keu_jenis_tagihan,
--   keuBisyarohJenis, bebanMengajar, master_tunjangan, master_potongan.
--   Pembacanya semua surface keuangan/admin (POS, Bisyaroh, Pengaturan) via store
--   yang kini me-merge key `keuangan`; auto-generate-tagihan (edge, service-role)
--   membaca key `keuangan` — WAJIB REDEPLOY.
-- SENGAJA TAK dipindah: keu_glondongan_per_juz (dibaca GlondonganView = surface
--   guru/koordinator PTPT; sekadar 1 angka tarif, bukan map ber-PII).
-- ============================================================================

-- ---- 1) SELECT: admin=tertutup, keuangan=finance-only, sisanya publik --------
drop policy if exists settings_sel on public.settings;
create policy settings_sel on public.settings for select using (
  case
    when key = 'admin'    then false
    when key = 'keuangan' then (public.auth_can_manage() or public.auth_can_keuangan())
    else true
  end
);
-- (INSERT/UPDATE tetap dari 20260714120000: auth_can_manage OR (auth_can_keuangan
--  AND key<>'admin') → admin_keuangan boleh tulis key 'keuangan'. DELETE=super.)

-- ---- 2) Pindahkan data yang SUDAH ADA dari general → keuangan, lalu strip ----
do $$
declare g jsonb;
begin
  select value into g from public.settings where key = 'general';
  if g is not null then
    insert into public.settings (key, value)
    values ('keuangan', coalesce((
      select jsonb_object_agg(k, g->k)
      from unnest(array[
        'keuTagihanJenis','keuTagihanJenisByTA','keu_jenis_tagihan',
        'keuBisyarohJenis','bebanMengajar','master_tunjangan','master_potongan'
      ]) k
      where g ? k
    ), '{}'::jsonb))
    on conflict (key) do update
      set value = coalesce(public.settings.value, '{}'::jsonb) || excluded.value;
  end if;

  update public.settings
     set value = value
       - 'keuTagihanJenis' - 'keuTagihanJenisByTA' - 'keu_jenis_tagihan'
       - 'keuBisyarohJenis' - 'bebanMengajar' - 'master_tunjangan' - 'master_potongan'
   where key in ('general', 'web');
end $$;
