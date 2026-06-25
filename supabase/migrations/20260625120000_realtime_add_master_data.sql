-- ============================================================================
-- v.110.0625 · REALTIME — perluas publication supabase_realtime ke master-data
-- + transaksional yang di-subscribe app, supaya edit/tambah/hapus langsung
-- tampil tanpa refresh (pulihkan perilaku onSnapshot Firestore lama).
--
-- WAJIB CERMIN: services/db.js const REALTIME (Set). Tiap entri di sini = entri
-- di sana. Skip audit_log (log append-heavy, realtime boros & tak berguna) dan
-- raw absensi harian (di-query per-tanggal, bukan subscribeColl).
--
-- Idempoten: cek pg_publication_tables dulu (ALTER PUBLICATION ADD TABLE tak
-- punya IF NOT EXISTS — kalau tabel sudah ada di publication, ADD akan error).
-- ============================================================================
do $$
declare t text;
begin
  foreach t in array array[
    -- master data & config
    'santri', 'guru', 'master', 'lembaga', 'settings',
    -- akademik & izin
    'izin_guru', 'rapor_semester', 'rekap_diniyah',
    -- keuangan transaksional
    'keuangan_gaji', 'keuangan_hutang_piutang',
    'keuangan_tabungan_santri', 'keuangan_uang_saku_santri',
    -- konten & PSB
    'kegiatan', 'psb_pendaftaran',
    -- rekap absensi bulanan (bukan raw harian)
    'absensi_santri_ngaji_bulanan', 'absensi_santri_sekolah_bulanan'
  ]
  loop
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
    end if;
  end loop;
end $$;
