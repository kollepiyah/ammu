-- ============================================================================
-- F9 · ANALITIK — port laporan agregat BigQuery → RPC SQL Supabase.
-- Mengganti Cloud Function `analyticsQuery` (di-stub saat F8). Satu dispatcher
-- `analytics_query(report, params)` -> jsonb array (bentuk row identik konsumen
-- LaporanView.vue). SECURITY DEFINER + gate auth_can_manage() (Laporan = admin/
-- super_admin only, mirror useMenus + router meta.admin). Agregat saja, TANPA PII.
-- Uang = bigint; agregat jsonb dikembalikan sbg JSON number (bukan numeric-string).
-- ============================================================================

create or replace function public.analytics_query(report text, params jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  yr     text := coalesce(nullif(params->>'year',''), extract(year from now())::text);
  result jsonb;
begin
  -- Gate: hanya super_admin / admin (sesuai akses menu Laporan).
  if not public.auth_can_manage() then
    raise exception 'forbidden: analytics requires admin' using errcode = '42501';
  end if;

  case report
    -- ===== SANTRI =====
    when 'santri_per_lembaga' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by value desc), '[]'::jsonb)
        into result
      from (
        select coalesce(nullif(lembaga,''), '(Tanpa Lembaga)') as label, count(*) as value
        from santri where aktif group by 1
      ) q;

    when 'santri_mukim' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by label), '[]'::jsonb)
        into result
      from (
        select case when is_mukim then 'Mukim' else 'Non-mukim' end as label, count(*) as value
        from santri where aktif group by 1
      ) q;

    -- ===== KEUANGAN ===== (Buku Induk kas; tabungan TERPISAH, tak dihitung)
    when 'keuangan_ringkas' then
      select jsonb_build_array(jsonb_build_object(
        'masuk',  coalesce(sum(nominal) filter (where tipe = 'masuk'),  0),
        'keluar', coalesce(sum(nominal) filter (where tipe = 'keluar'), 0)
      )) into result
      from keuangan_buku_induk;

    when 'keuangan_bulanan' then
      select coalesce(jsonb_agg(jsonb_build_object('bulan', bulan, 'masuk', masuk, 'keluar', keluar) order by bulan), '[]'::jsonb)
        into result
      from (
        select substring(tanggal from 1 for 7) as bulan,
               coalesce(sum(nominal) filter (where tipe = 'masuk'),  0) as masuk,
               coalesce(sum(nominal) filter (where tipe = 'keluar'), 0) as keluar
        from keuangan_buku_induk
        where tanggal like yr || '-%'
        group by 1
      ) q;

    -- ===== AKADEMIK =====
    when 'akademik_tes_status' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by value desc), '[]'::jsonb)
        into result
      from (
        select coalesce(nullif(status,''), '(Tanpa Status)') as label, count(*) as value
        from tes_kenaikan group by 1
      ) q;

    when 'akademik_rapor_per_lembaga' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by value desc), '[]'::jsonb)
        into result
      from (
        select coalesce(nullif(lembaga,''), '(Tanpa Lembaga)') as label, count(*) as value
        from rapor_semester group by 1
      ) q;

    -- ===== ABSENSI ===== (rollup bulanan precomputed: hadir/sakit/izin/alpa)
    when 'absensi_ngaji_bulanan' then
      select coalesce(jsonb_agg(jsonb_build_object('bulan', bulan, 'hadir', hadir, 'sakit', sakit, 'izin', izin, 'alpa', alpa) order by bulan), '[]'::jsonb)
        into result
      from (
        select periode as bulan,
               coalesce(sum(hadir),0) hadir, coalesce(sum(sakit),0) sakit,
               coalesce(sum(izin),0)  izin,  coalesce(sum(alpa),0)  alpa
        from absensi_santri_ngaji_bulanan
        where periode like yr || '-%'
        group by periode
      ) q;

    when 'absensi_sekolah_bulanan' then
      select coalesce(jsonb_agg(jsonb_build_object('bulan', bulan, 'hadir', hadir, 'sakit', sakit, 'izin', izin, 'alpa', alpa) order by bulan), '[]'::jsonb)
        into result
      from (
        select periode as bulan,
               coalesce(sum(hadir),0) hadir, coalesce(sum(sakit),0) sakit,
               coalesce(sum(izin),0)  izin,  coalesce(sum(alpa),0)  alpa
        from absensi_santri_sekolah_bulanan
        where periode like yr || '-%'
        group by periode
      ) q;

    -- ===== PEGAWAI =====
    when 'pegawai_per_lembaga' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by value desc), '[]'::jsonb)
        into result
      from (
        select coalesce(nullif(lembaga,''), '(Tanpa Lembaga)') as label, count(*) as value
        from guru where status = 'aktif' group by 1
      ) q;

    when 'pegawai_per_jabatan' then
      select coalesce(jsonb_agg(jsonb_build_object('label', label, 'value', value) order by value desc), '[]'::jsonb)
        into result
      from (
        select coalesce(nullif(jabatan,''), '(Tanpa Jabatan)') as label, count(*) as value
        from guru where status = 'aktif' group by 1
      ) q;

    -- Bisyaroh bersih (take-home). Mirror formula BisyarohView: take_home bila ada,
    -- else pokok + sekolah + tambahan - potongan. pokok/potongan = kolom riil;
    -- sekolah/tambahan/take_home di `data` jsonb (cast numeric, aman desimal/null).
    when 'pegawai_gaji_bulanan' then
      select coalesce(jsonb_agg(jsonb_build_object('bulan', bulan, 'bersih', bersih) order by bulan), '[]'::jsonb)
        into result
      from (
        select periode as bulan,
          sum(
            coalesce(
              nullif(data->>'take_home','')::numeric,
              bisyaroh_pokok
              + coalesce(nullif(data->>'bisyaroh_sekolah','')::numeric, 0)
              + coalesce(nullif(data->>'bisyaroh_tambahan','')::numeric, 0)
              - total_potongan
            )
          ) as bersih
        from keuangan_gaji
        where periode like yr || '-%'
        group by periode
      ) q;

    else
      raise exception 'unknown analytics report: %', report;
  end case;

  return coalesce(result, '[]'::jsonb);
end;
$$;

grant execute on function public.analytics_query(text, jsonb) to authenticated;
