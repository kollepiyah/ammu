-- ============================================================================
-- Strip ULANG kunci keuangan dari settings/general & /web (Kyai, 7 Agu 2026)
--
-- Migrasi 20260729130000 sudah memindahkan kunci keuangan sensitif ke row
-- `settings/keuangan` (finance-only) lalu MENGHAPUSNYA dari general & web yang
-- ANON-readable. Diperiksa lewat anon REST 7 Agu 2026: kunci-kunci itu ADA LAGI
-- di `general`, jadi ada yang menulisnya kembali sesudah 29 Jul.
--
-- Isinya bukan data asli, melainkan DEFAULT/KOSONG — sidik jari klien yang tak
-- kenal row `keuangan`, sehingga Pengaturan Keuangan terhidrasi dari fallback
-- hardcoded lalu diterbitkan lagi saat "Simpan Semua":
--     keuTagihanJenis     = [Syahriyah(bulanan), SPP Sekolah, Kebersihan,
--                            Maulid Nabi 1449H]   <- 3 pertama = fallback kode
--     keuTagihanJenisByTA = { '2026/2027': 4 jenis di atas }
--     keu_jenis_tagihan   = 4 label di atas
--     keuBisyarohJenis / bebanMengajar / master_tunjangan / master_potongan = []
--     keuPotonganPos      = tidak ada (kunci itu baru lahir 5 Agu, `f8a6094`)
-- Penulisnya karena itu memakai bundel SEBELUM `c8f408c` (29 Jul 03:33).
--
-- ⚠️ SENGAJA TIDAK menggabungkan isi general ke `keuangan` seperti migrasi 29 Jul.
--    Di sana general memang membawa data asli; SEKARANG ia membawa default kosong,
--    dan menggabungkannya akan MENIMPA config keuangan yang sungguhan.
--
-- Pembaca sah sudah aman: `stores/settings.js` & edge `auto-generate-tagihan`
-- membaca row `keuangan` (edge: general ∪ keuangan, keuangan menang).
-- ============================================================================

do $$
declare
  k         text;
  keu       jsonb;
  disimpan  text[] := '{}';
  dibuang   text[] := '{}';
begin
  select value into keu from public.settings where key = 'keuangan';
  keu := coalesce(keu, '{}'::jsonb);

  foreach k in array array[
    'keuTagihanJenis', 'keuTagihanJenisByTA', 'keu_jenis_tagihan',
    'keuBisyarohJenis', 'bebanMengajar', 'master_tunjangan',
    'master_potongan', 'keuPotonganPos'
  ]
  loop
    -- Hanya buang kalau row `keuangan` MEMANG sudah punya kuncinya. Kalau tidak,
    -- salinan di general bisa jadi satu-satunya yang tersisa — lebih baik ia
    -- tertinggal (dan ketahuan di notice) daripada hilang tanpa jejak.
    -- `jsonb_exists(...)` dipakai, bukan operator `?`, supaya tak pernah tertukar
    -- dengan penanda parameter di klien mana pun yang menjalankan migrasi ini.
    if jsonb_exists(keu, k) then
      update public.settings
         set value = value - k
       where key in ('general', 'web')
         and jsonb_exists(value, k);
      dibuang := dibuang || k;
    else
      disimpan := disimpan || k;
    end if;
  end loop;

  raise notice 'strip keuangan: dibuang dari general/web = %', dibuang;
  if array_length(disimpan, 1) is not null then
    raise notice 'strip keuangan: DIBIARKAN (belum ada di row keuangan) = %', disimpan;
  end if;
end $$;
