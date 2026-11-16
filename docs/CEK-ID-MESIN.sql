-- ============================================================================
-- Cek silang ID Fingerprint: Ammu  <->  mesin HiView
--
-- Kyai 16 Nov 2026. Berkas ekspor dari mesin (recordList_*.csv) dan dari aplikasi
-- Fingerspot (finger.db / local.db) ternyata TERENKRIPSI, jadi daftar ID di mesin
-- tak bisa dibaca dari sana. Tapi kita tak perlu berkas itu: setiap scan yang
-- masuk sudah mencatat `employee_no` mentah dari mesin di `hiview_scan_log`.
-- Dari log itulah peta "ID yang nyata-nyata ada di mesin" bisa disusun ulang.
--
-- SEMUA kueri di bawah HANYA MEMBACA (SELECT). Jalankan di Supabase -> SQL Editor,
-- satu blok sekali jalan, lalu kirimkan hasilnya.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) ID yang DIPAKAI DI MESIN tapi TAK DIKENAL Ammu
--    Inilah tersangka utama "absen saya tidak terbaca": orangnya scan, mesin
--    berbunyi, tapi nomor yang dikirim mesin tak ada di Data Guru -> dicatat
--    `pin_tak_dikenal` dan tak pernah jadi kehadiran.
-- ----------------------------------------------------------------------------
select
  l.employee_no                                as id_di_mesin,
  count(*)                                     as jumlah_scan,
  min(l.tanggal)                               as scan_pertama,
  max(l.tanggal)                               as scan_terakhir,
  string_agg(distinct l.hasil, ', ')           as hasil_yang_tercatat
from public.hiview_scan_log l
where l.employee_no <> ''
  and not exists (
    select 1 from public.guru g
    where trim(coalesce(g.id_fingerprint, '')) = trim(l.employee_no)
  )
group by l.employee_no
order by count(*) desc;


-- ----------------------------------------------------------------------------
-- 2) Guru AKTIF yang ID-nya TAK PERNAH muncul di log mesin
--    Dua kemungkinan, dan keduanya perlu tindakan:
--      a. ID di Ammu BEDA dengan ID orang itu di mesin  -> cocokkan dgn hasil (1)
--      b. orangnya memang belum pernah scan di mesin HiView
--    Guru tanpa ID ikut muncul (id_mesin kosong) supaya sekalian terdata.
-- ----------------------------------------------------------------------------
select
  g.nama,
  trim(coalesce(g.id_fingerprint, ''))         as id_di_ammu,
  g.jabatan,
  g.lembaga,
  g.shift
from public.guru g
where lower(coalesce(nullif(trim(coalesce(g.status, '')), ''), 'Aktif')) <> 'nonaktif'
  and not exists (
    select 1 from public.hiview_scan_log l
    where trim(l.employee_no) = trim(coalesce(g.id_fingerprint, ''))
      and trim(coalesce(g.id_fingerprint, '')) <> ''
  )
order by (trim(coalesce(g.id_fingerprint, '')) = '') desc, g.nama;


-- ----------------------------------------------------------------------------
-- 3) Guru yang scan-nya MASUK tapi sering DITOLAK
--    Bukan soal ID lagi, tapi soal jam/shift: scan di luar jendela absen, atau
--    ganda. Berguna untuk memisahkan keluhan "tak terbaca" yang sebabnya shift.
-- ----------------------------------------------------------------------------
select
  coalesce(g.nama, '(ID tak dikenal)')         as nama,
  l.employee_no,
  l.hasil,
  count(*)                                     as jumlah,
  max(l.tanggal)                               as terakhir
from public.hiview_scan_log l
left join public.guru g
  on trim(coalesce(g.id_fingerprint, '')) = trim(l.employee_no)
where l.hasil in ('luar_window', 'duplikat', 'waktu_tak_terbaca', 'pin_tak_dikenal', 'id_ganda')
group by 1, 2, 3
order by count(*) desc
limit 100;


-- ----------------------------------------------------------------------------
-- 4) Ringkasan: berapa hari terakhir log ini memuat data
--    Supaya kita tahu kueri (1) & (2) menyimpulkan dari rentang waktu yang cukup.
-- ----------------------------------------------------------------------------
select
  min(tanggal)                                 as tanggal_terawal,
  max(tanggal)                                 as tanggal_terakhir,
  count(distinct tanggal)                      as jumlah_hari,
  count(distinct employee_no)                  as jumlah_id_berbeda,
  count(*)                                     as jumlah_scan
from public.hiview_scan_log;
