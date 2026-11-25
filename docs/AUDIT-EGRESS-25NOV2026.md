# Audit Egress PostgREST — 25 Nov 2026

Permintaan Kyai (25 Nov): siklus 21 Nov–21 Des berjalan ±100–225 MB/hari (90% PostgREST),
proyeksi 4,5–6 GB melawan kuota Free Plan 5 GB. **Dokumen ini laporan temuan — belum ada
perbaikan yang dikerjakan.** Perbaikan menunggu persetujuan Kyai.

## Sumber data

- Log gateway Supabase (`edge_logs`) 24 jam: 24 Nov 17.00 WIB – 25 Nov 17.00 WIB,
  **70.464 permintaan**. Jumlah baris tiap jawaban dibaca dari header `content_range`.
- `pg_stat_statements` sejak **21 Sep 2026** (65 hari) untuk memastikan pola itu menahun,
  bukan kebetulan sehari.
- Ukuran rata-rata baris per tabel (`length(row_to_json(..))`).
- Byte REST **tidak tercatat** di log (header `content_length` kosong untuk jawaban
  terkompresi), jadi angka MB di bawah adalah **perkiraan**: baris × ukuran rata-rata, dengan
  anggapan gzip ±6× untuk jawaban besar dan tanpa kompresi untuk jawaban satu baris. Hasil
  perkiraannya (±210 MB/hari) cocok dengan angka dasbor Kyai, jadi urutannya bisa dipercaya.

## Temuan, urut dari yang terbesar

### 1. Sinkron Fingerspot di PC kantor memeriksa ulang ±490 baris absensi SATU PER SATU tiap 5 menit — ±45 MB/hari (±20%), murni sia-sia

- `absensi_shift_guru` = **43.821 GET** dalam 24 jam (**62% dari seluruh permintaan**), 42.827
  di antaranya dari **satu IP** (PC kantor, Ammu Desktop) antara 06.45–11.28 WIB.
- Polanya `?select=*&id=eq.shift_<guru>_<tanggal>_<shift>` — 489 baris yang **sama** ditanya
  ulang ±88 kali masing-masing.
- Sejak 21 Sep: **1.142.666 kali** (±17.600/hari rata-rata). Ini bocoran menahun.
- Penyebab (`vue-app/src/composables/useFingerprintSync.js`):
  1. Tiap sinkron membaca scan **14 hari** ke belakang, lalu untuk SETIAP (guru, tanggal,
     shift) memanggil `getOne('absensi_shift_guru', docId)` — satu permintaan per baris —
     lalu sekali lagi per baris di tahap "pulang". ±760 permintaan per sinkron.
  2. Jadwal sinkron otomatis di PC itu tampaknya disetel ke **5 menit** (minimum; bawaannya
     30). 42.827 ÷ 760 ≈ 56 sinkron dalam 4,7 jam = tiap ±5 menit.
  3. Tidak ada pemeriksaan "apakah ada scan baru sejak sinkron terakhir" — walau mesin tak
     menerima scan apa pun, 760 permintaan tetap jalan.
  4. Tiap sinkron juga `getAll('guru')` penuh (89 baris × 1,2 KB).
- Jawaban satu baris tak terkompresi, dan tiap jawaban membawa ±0,6 KB header — jadi baris
  395 B menjadi ±1 KB per permintaan.

**Usul perbaikan (P1):**
- Ganti tanya-per-baris dengan **satu tarikan borongan** untuk rentang tanggal itu, hanya
  kolom yang dipakai (`id`, `status`, `jam`, `jam_pulang`) → ±760 permintaan jadi 1, ±40 KB.
- **Lewati sinkron** bila att_log tak berubah sejak sinkron terakhir (jumlah scan + scan
  terbaru + tanggal hari ini sama) → 0 permintaan saat mesin diam.
- Guru diambil dari store koleksi yang sudah ada, bukan `getAll` tiap putaran.
- Perkiraan hemat: **±45 MB/hari**.
- **Bisa diringankan HARI INI tanpa rilis:** di PC kantor, Mesin Absensi → interval sinkron
  otomatis dikembalikan ke **30 menit** → beban turun ±6×.

### 2. Tabel `santri` ditarik penuh tiap aplikasi dibuka — ±55 MB/hari (±25%)

- 259 tarikan penuh (`?select=*`, 549 baris × 2,3 KB = 1,26 MB mentah) dari 70 IP dalam
  sehari; 171 di antaranya dari aplikasi Android. Sejak 21 Sep: 11.453 tarikan penuh.
- Dipicu `collections.ensure('santri', …)` oleh pencarian global, `useSantri`, `useLembaga`,
  `useGedungScope`, `tugasSaya`, dll. Satu kali per sesi aplikasi (sudah dipusatkan), tapi
  **setiap membuka aplikasi = unduh ulang seluruh santri**, walau tak satu baris pun berubah.
- Pemulihan sesudah latar sudah hemat (v.1.5.1: daftar id + baris berubah saja — 163 kali
  sehari, kecil). Yang belum hemat justru **tarikan awal**.

**Usul perbaikan (P2) — paling besar dampaknya, juga paling hati-hati:**
- Simpan salinan tabel besar di HP (IndexedDB, dikunci per pengguna + penyaring), lalu
  **tarikan awal memakai jalur SEGAR yang sudah ada** (daftar id + baris yang `updated_at`-nya
  berubah) bila salinan ada. Berlaku untuk tabel di `SEGAR_DELTA` yang sudah terbukti punya
  trigger `set_updated_at` — santri, guru, tes_glondongan, tes_kenaikan, keuangan_buku_induk,
  keuangan_tagihan, kegiatan.
- Perkiraan hemat (bersama temuan 3 & 4): **±80–110 MB/hari**.
- Risiko: salinan basi bila trigger hilang / RLS berubah. Penjaga: versi skema salinan,
  kedaluwarsa paksa (mis. 7 hari → tarik penuh), dibuang saat keluar akun.

### 3. Layar Glondongan / Tes Kenaikan menarik kedua tabel tes PENUH — ±40 MB/hari (±20%)

- `tes_glondongan` 167 tarikan penuh (1.045 baris × 1 KB), `tes_kenaikan` 157 tarikan penuh,
  ±80% dari Android, 36 IP. Sejak 21 Sep: 15.958 tarikan penuh glondongan.
- Lonceng notifikasi SUDAH disaring di server sejak v.1.5.1 — sumbernya kini layar:
  `useGlondongan` (`subscribeColl('tes_glondongan')` tanpa penyaring + `tes_kenaikan` penuh
  **hanya untuk mengambil daftar id**) dan `useTesKenaikan` (keduanya penuh).
- **Usul (P3):** P2 di atas sudah menutup sebagian besar. Tambahan murah: `useGlondongan`
  cukup menarik kolom `id` tes_kenaikan (butuh opsi `kolom` di `subscribeColl`).

### 4. Keuangan: buku induk & tagihan penuh di 3–4 PC kasir — ±35 MB/hari (±15%)

- `keuangan_buku_induk` 6.750 baris (4,7 MB mentah) ±25 tarikan penuh/hari;
  `keuangan_tagihan` 6.560 baris (3,6 MB) ±31 tarikan penuh/hari; 3–4 IP (PC keuangan).
- Tertutup oleh P2 (tabel itu di `SEGAR_DELTA`).

### 5. Lain-lain (kecil, ±10%)

| Sumber | Sehari | Catatan |
|---|---|---|
| `settings` general+web+keuangan | ±455 buka × 75 KB mentah | `general` & `web` **cermin isi yang sama** (22,8 KB masing-masing) — tarik satu saja bisa hemat ±1/3 |
| `master?key=eq.lembaga` | 936 × 9,7 KB | wajar |
| `kegiatan` penuh | 557 × 31 KB | kecil; ikut P2 |
| `guru` penuh | 328 × 110 KB | ikut P2 |
| `notif_queue` (cron dispatch-push tiap menit) | 1.438 × ±0,7 KB | **±1 MB/hari — bukan masalah**, tak perlu diubah |
| Pondok Laju (`capaian`/`jadwal`) | ±1.300 permintaan kecil | wajar |

## Ringkasan dampak

| Langkah | Hemat/hari (perk.) | Butuh rilis |
|---|---|---|
| Setel interval sinkron PC kantor ke 30 menit | ±35 MB | **tidak** (setelan PC) |
| P1 sinkron Fingerspot borongan + lewati bila diam | ±45 MB | Electron |
| P2 salinan lokal + tarikan awal SEGAR | ±80–110 MB | web + AAB + Electron |
| P3 kolom id saja di Glondongan | ±5 MB | web + AAB |

Sesudah P1 + P2: perkiraan **±50–80 MB/hari → ±1,5–2,5 GB per siklus**, jauh di bawah 5 GB.

## Catatan untuk sesi pelaksana

- P1 aman & berdiri sendiri; urutan kerja yang disarankan: P1 → P2 → P3.
- P2 menyentuh `services/db.js` `subscribeColl` — ingat insiden 14–17 Sep (lihat komentar
  di db.js) dan tes `tests/unit/dbRealtime*.test.js`; tambahkan tes salinan lokal.
- Kueri log yang dipakai: `edge_logs`, kelompokkan `request.path` + `request.search`, jumlah
  baris dari `response.headers.content_range`.
