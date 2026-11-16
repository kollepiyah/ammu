-- ============================================================================
-- Kenapa scan yang MASUK tetap tidak jadi kehadiran — pemeriksaan jam, bukan ID.
--
-- Kyai 16 Nov 2026. Cek silang ID sudah menutup kemungkinan nomor tertukar: HiView
-- dan Fingerspot memakai nomor yang sama, dan semua nomor dikenal Ammu. Yang tersisa
-- adalah JAM: ekspor AllReport Oktober menunjukkan 16 guru menempel puluhan kali tapi
-- jam kerjanya dihitung 0:00 oleh mesin, sebab jendela shift mesin sempit
-- (Pagi 06:00-09:00, Sore 15:00-17:00). Kalau jendela di Ammu juga tak memuat jam
-- datang mereka, scan-nya tercatat `luar_window` dan tak pernah jadi kehadiran.
--
-- Semua kueri HANYA MEMBACA. Jalankan di Supabase -> SQL Editor, satu blok sekali
-- jalan, lalu kirimkan hasilnya.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1) Siapa yang paling sering ditolak `luar_window`, dan jam berapa dia datang
--    `jam_tersering` adalah jam yang paling sering muncul pada scan yang ditolak.
--    Kalau seorang guru selalu datang pada jam yang sama dan selalu ditolak,
--    yang perlu digeser jendela shiftnya, bukan gurunya.
-- ----------------------------------------------------------------------------
with tolak as (
  select
    l.employee_no,
    coalesce(nullif(l.data->>'guru_nama', ''), g.nama, '(tak dikenal)') as nama,
    l.tanggal,
    nullif(l.data->>'jam', '')                                         as jam
  from public.hiview_scan_log l
  left join public.guru g on g.id = l.guru_id
  where l.hasil = 'luar_window'
)
select
  nama,
  employee_no,
  count(*)                                                  as kali_ditolak,
  min(jam)                                                  as jam_paling_pagi,
  max(jam)                                                  as jam_paling_sore,
  mode() within group (order by substring(jam from 1 for 2)) as jam_tersering,
  min(tanggal)                                              as sejak,
  max(tanggal)                                              as terakhir
from tolak
group by nama, employee_no
order by count(*) desc;


-- ----------------------------------------------------------------------------
-- 2) Sebaran jam: yang DITERIMA vs yang DITOLAK
--    Membandingkan keduanya memperlihatkan di mana persis tepi jendela berada dan
--    seberapa jauh meleset. Jam dengan `ditolak` besar tapi `diterima` nol adalah
--    jam yang sama sekali tak tercakup jendela mana pun.
-- ----------------------------------------------------------------------------
select
  substring(nullif(l.data->>'jam', '') from 1 for 2)                     as jam,
  count(*) filter (where l.hasil in ('diterima', 'pulang'))              as diterima,
  count(*) filter (where l.hasil = 'luar_window')                        as ditolak,
  count(distinct l.employee_no) filter (where l.hasil = 'luar_window')   as orang_ditolak
from public.hiview_scan_log l
where nullif(l.data->>'jam', '') is not null
group by 1
order by 1;


-- ----------------------------------------------------------------------------
-- 3) Contoh baris mentah yang ditolak, 40 terakhir
--    Untuk memastikan tafsiran di atas — `catatan` menyebut sendiri alasan mesin.
-- ----------------------------------------------------------------------------
select
  l.tanggal,
  l.data->>'jam'                                     as jam,
  coalesce(nullif(l.data->>'guru_nama', ''), '(-)')  as nama,
  l.employee_no,
  l.data->>'shift'                                   as shift_terbaca,
  l.data->>'catatan'                                 as catatan
from public.hiview_scan_log l
where l.hasil = 'luar_window'
order by l.tanggal desc, l.data->>'jam' desc
limit 40;


-- ----------------------------------------------------------------------------
-- 4) Ringkasan semua nasib scan, 60 hari terakhir
--    Supaya terlihat seberapa besar porsi `luar_window` dibanding yang diterima,
--    dan apakah ada nasib lain yang lebih sering tanpa kita sadari.
-- ----------------------------------------------------------------------------
select
  l.hasil,
  count(*)                        as jumlah,
  count(distinct l.employee_no)   as orang,
  min(l.tanggal)                  as sejak,
  max(l.tanggal)                  as terakhir
from public.hiview_scan_log l
where l.tanggal >= to_char(current_date - 60, 'YYYY-MM-DD')
group by l.hasil
order by count(*) desc;


-- ----------------------------------------------------------------------------
-- 5) Denyut pengiriman mesin per bulan
--    Kueri (4) di CEK-ID-MESIN.sql menghitung 30.792 scan sepanjang 88 hari,
--    padahal 60 hari terakhir hanya ~5.400. Selisih sebesar itu harus dijelaskan:
--    apakah dulu memang jauh lebih ramai, atau ada rentang yang scannya berhenti.
--    Baris ber-`tanggal` kosong dikumpulkan sebagai '(tanpa tanggal)'.
-- ----------------------------------------------------------------------------
select
  coalesce(nullif(substring(l.tanggal from 1 for 7), ''), '(tanpa tanggal)') as bulan,
  count(*)                                                       as jumlah_scan,
  count(distinct l.employee_no)                                  as orang,
  count(distinct nullif(l.tanggal, ''))                          as hari_ada_scan,
  count(*) filter (where l.hasil in ('diterima', 'pulang'))      as jadi_kehadiran,
  count(*) filter (where l.hasil = 'duplikat')                   as duplikat,
  count(*) filter (where l.hasil = 'luar_window')                as luar_window
from public.hiview_scan_log l
group by 1
order by 1;


-- ----------------------------------------------------------------------------
-- 6) Guru AKTIF yang scan-nya tak pernah jadi kehadiran dalam 30 hari terakhir
--    Inilah daftar "absen saya tidak terbaca" yang sesungguhnya. Kolom
--    `scan_terakhir` membedakan dua sebab yang tindakannya jauh berbeda:
--      - kosong  -> orangnya memang tak pernah menempel / belum terdaftar di mesin
--      - terisi  -> mesin mengirim, tapi Ammu menolaknya; `hasil_terakhir` sebabnya
-- ----------------------------------------------------------------------------
with jejak as (
  select
    trim(l.employee_no)                                      as pin,
    max(l.tanggal)                                           as scan_terakhir,
    max(l.tanggal) filter (
      where l.hasil in ('diterima', 'pulang')
    )                                                        as hadir_terakhir,
    (array_agg(l.hasil order by l.tanggal desc, l.created_at desc))[1] as hasil_terakhir,
    count(*)                                                 as jumlah_scan
  from public.hiview_scan_log l
  where l.tanggal >= to_char(current_date - 30, 'YYYY-MM-DD')
  group by trim(l.employee_no)
)
select
  g.nama,
  trim(coalesce(g.id_fingerprint, ''))  as pin,
  g.lembaga,
  g.shift,
  coalesce(j.scan_terakhir, '')         as scan_terakhir,
  coalesce(j.hasil_terakhir, '')        as hasil_terakhir,
  coalesce(j.jumlah_scan, 0)            as scan_30_hari
from public.guru g
left join jejak j on j.pin = trim(coalesce(g.id_fingerprint, ''))
                 and trim(coalesce(g.id_fingerprint, '')) <> ''
where lower(coalesce(nullif(trim(coalesce(g.status, '')), ''), 'Aktif')) <> 'nonaktif'
  and j.hadir_terakhir is null
order by coalesce(j.jumlah_scan, 0) desc, g.nama;
