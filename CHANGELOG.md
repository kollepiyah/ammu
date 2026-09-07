# Changelog

Semua perubahan penting Portal Mambaul Ulum tercatat di sini.

Format: [Keep a Changelog](https://keepachangelog.com/id/1.1.0/)
Versioning: semver `v.MAJOR.MINOR.PATCH` sejak v.1.1.x (mis: `v.1.2.7`); versionCode Android
naik satu tiap rilis. Entri lama memakai skema lama `v.{nomor-urut}.{MMDDtahunmu}` (mis: `v.108.0527`).

---

## [Unreleased]

### Planned

- Capacitor Android first build + sideload APK
- Capacitor iOS setup
- Tauri Desktop scaffold
- Phase 1 palette migration: `bg-blue-600/700` action button → `bg-teal-600/700` (~62 occurrences)
- DOMPurify integration untuk template literal innerHTML yang inject user data

---

## [v.1.4.3 — belum dirilis] — 2026-09-07 — Bukti pembayaran berhenti berbohong "TUNAI"

⚠️ **Frontend murni.** Tak ada migrasi baru. Menumpuk di atas v.1.4.1 & v.1.4.2 yang
migrasinya MASIH belum di-`supabase db push`.

### Konteks: kenapa keluhannya tetap sama sesudah v.1.4.2 tayang

Admin keuangan mengulang keluhan yang sama (Kyai, 7 Sep 2026). Yang perlu dipisah:

**Web v.1.4.2 SUDAH tayang** sejak 5 Sep 2026 pk. 16.25 (`assets/index-CVlTMiGe.js` di
`ammuonline.web.app` — dan Android memuat URL yang sama lewat Capacitor, jadi tak perlu
rilis Play). Yang belum: `git push` (5 commit menumpuk di `main` lokal) dan karena itu
kedua migrasi Supabase juga belum ter-apply.

Jadi keluhannya bertahan karena **dua sebab yang berbeda**, bukan karena perbaikannya
tak sampai:

1. **Perbaikan v.1.4.2 menutup PABRIKnya, bukan barang yang sudah terlanjur cacat.**
   Empat jalur yang membuat Riwayat & Tagihan berpisah memang sudah ditutup, tapi baris
   yang SUDAH berselisih sebelum 5 Sep tetap berselisih — tak ada yang membetulkannya
   sendiri. Nama-nama yang disebut admin (Amira Fatimatuz Zahra, Nafatin Niswah, Akifah
   Nuris Sholihah, tagihan buku) adalah baris lama. Alatnya sudah ada dan menunggu
   dijalankan: **Pengaturan Keuangan › Tagihan › "Cek Riwayat vs Tagihan"**.
   "Riwayat sudah bayar tapi tagihan belum lunas" = **Kurang tercatat** (bisa ditambal
   sekali tekan). "Tagihan lunas tapi di riwayat pos belum ada" = **Lebih tercatat** —
   sengaja TIDAK ditambal otomatis, karena menurunkan `terbayar` berarti menagih ulang
   orang yang mungkin memang sudah membayar; yang ini harus diputuskan orang.

2. **Keluhan soal struk memang BELUM PERNAH diperbaiki.** v.1.4.2 menambah cara bayar di
   layar, di daftar riwayat wali, dan di PDF laporan mutasi — tapi tak satu pun menyentuh
   BUKTI yang dicetak. Itu isi rilis ini.

### Fixed

- **Struk cetak-ulang tak lagi berubah jadi "TUNAI"** (v.1.4.3). Admin keuangan:
  _"bukti transaksi anak yg transfer kalo diprint yg ke2 kali ini jadi bukti pembayaran
  tunai."_

  Persis begitu, dan sebabnya bukan di pencetaknya. Semua pembangun struk membaca
  `trx.metode` dengan cadangan `|| 'TUNAI'`. Cetakan PERTAMA berangkat dari objek yang
  dirakit `PosSantriView` sesaat sesudah transaksi — di sana `metode` ada. Cetakan KEDUA
  dirakit ulang dari baris buku induk yang tersimpan, dan **dua perakit itu lupa membawa
  `metode`**: `toTrx()` di `RiwayatPosView` dan `cetakUlangStruk()` di `BukuIndukView`.
  Field yang hilang jatuh ke cadangan, dan cadangannya berbunyi "TUNAI" — bukan "—", jadi
  tak ada yang terlihat salah.

  Yang membuatnya sulit dipercaya oleh yang melihat: badge cara bayar **di daftar** kedua
  halaman itu sudah benar sejak v.1.2.6. Layar bilang "Transfer", kertas bilang "TUNAI",
  dan keduanya membaca baris yang sama.

- **Bukti setor/tarik Uang Saku & Tabungan tak lagi selalu "TUNAI"** (v.1.4.3). Admin
  keuangan: _"transaksi uang saku yg transfer, di buktinya tercatat TUNAi."_

  Di sini bahkan tak ada cadangan yang bisa disalahkan: ketiga pencetak slip tabungan
  **menuliskan `'TUNAI'` sebagai teks tetap** — `cetakSlipTabunganPdf`,
  `buildSlipTabunganHtml`, dan `tabData` di `escpImage` (jalur cetak-LANGSUNG ESC/P, yang
  justru paling sering dipakai kasir). Wajar untuk kode yang lahir sebelum mutasi tabungan
  punya field `metode` sama sekali — field itu baru ada di v.1.4.2, dan slipnya tak ikut
  menyusul. Ketiganya kini memanggil `utils/metodeBayar`.

- **Kwitansi yang diunduh WALI ikut berbohong** (v.1.4.3, ketemu sambil memeriksa).
  v.1.4.2 membetulkan label `[Tunai]`/`[Transfer]` di daftar Riwayat wali, tapi
  `buildTrxFromGroup()` — yang merakit bukti untuk dilihat & diunduh — masih menyimpulkan
  sendiri: `sumber === 'transfer_verified' ? 'TRANSFER' : 'TUNAI'`. Layar wali betul,
  kwitansinya tidak. Persis pola yang sama dengan dua di atas.

- **VA BMT disimpulkan "Tunai" di SELURUH aplikasi — ejaan `sumber` terbalik** (v.1.4.3).
  Ini yang paling perlu diingat. `utils/metodeBayar` menyimpulkan transfer dari daftar
  `sumber`, dan daftarnya memuat `'va_bmt'`. Nilai yang **benar-benar ditulis** RPC
  `apply_bmt_payment` ke kolom `sumber` adalah **`'bmt_va'`** (huruf terbalik —
  `20260905120000_bmt_alokasi_utuh.sql:211`; `utils/cocokBayarTagihan` sudah memakai ejaan
  yang benar). Ejaan yang salah tak pernah cocok dengan satu baris pun, jadi tiap
  pembayaran VA BMT jatuh ke default 'Tunai': badge Uang Saku, badge Buku Induk, kolom
  Cara Bayar di PDF laporan, subtotal TUNAI/TRANSFER laporan harian — **dan perbaikan
  label riwayat wali v.1.4.2 yang justru mengaku membetulkan VA BMT**.

  Lolos dari 28 tes hijau karena tesnya sendiri mengabadikan ejaan yang salah
  (`expect(metodeTransaksi({ sumber: 'va_bmt' })).toBe('Transfer')`) — tes yang menjaga
  nilai yang tak pernah ada. Sekarang ada tes untuk `'bmt_va'`; jangan dihapus. Ejaan
  terbaliknya ditahan sebagai alias: ia tak cocok dengan apa pun, jadi mencabutnya hanya
  memindah risiko ke penulis lain yang belum ketahuan.

---

## [v.1.4.2 — belum dirilis] — 2026-09-05 — Bisyaroh tutup buku tanggal 24, dan shift yang belum dibuka tak lagi merah

⚠️ **KOREKSI 7 Sep 2026: web-nya SUDAH TAYANG** sejak 5 Sep 2026 pk. 16.25 (deploy
Firebase langsung; `git push`-nya yang gagal, sehingga commitnya menumpuk di `main` lokal
dan kedua migrasi Supabase belum ter-apply). Yang di bawah ini ditulis sebelum itu.

⚠️ **Belum dirilis, dan MENUMPUK di atas v.1.4.1 yang juga belum dirilis.** Titik versi
tetap `1.4.0` (keputusan Kyai, 4 Sep 2026 — belum naik ke Play). Kedua entri ini akan
terbit bersama, dan **`npx supabase db push` tetap DULUAN, baru web** — urutan v.1.4.1
(`20260904120000_arsip_prestasi_periode_laporan.sql`) masih berlaku, plus satu migrasi baru
milik v.1.4.2: `20260905120000_bmt_alokasi_utuh.sql`.

Migrasi v.1.4.2 itu **frontend-agnostik** — tak ada kode app yang bergantung padanya, jadi
urutannya terhadap deploy web bebas. Sisanya frontend murni.

### Changed

- **Bisyaroh dihitung dari absensi tgl 25 s/d 24, bukan lagi bulan kalender** (v.1.4.2).
  Kyai, 5 Sep 2026: _"perhitungan bisyaroh dari absen dihitung dari tgl 25 sebelumnya
  – 24 bulan berikutnya (mis: 25 Agustus – 24 September untuk bisyaroh September,
  terbitnya bisyaroh 1–2 Oktober)."_

  Alasannya jelas begitu tanggal terbitnya disebut: slip keluar tanggal 1–2, sedangkan
  absensi bulan berjalan baru lengkap di akhir bulan. Menutup buku tanggal 24 memberi
  jeda ±6 hari untuk merapikan absen sebelum uangnya dihitung. Hari 25–akhir bulan tidak
  hilang — ia jadi pembuka jendela bulan BERIKUTNYA.

  Yang menarik, sampai sekarang **"periode" dipakai untuk dua hal sekaligus** dan
  keduanya kebetulan sama: nama bulan slip (`'2026-09'`) DAN penyaring baris absensi
  (`tanggal.startsWith('2026-09')`). Karena kebetulan itu, penyaringnya tercecer jadi
  **empat salinan** di dalam `BisyarohView` — hadir per shift, hadir tepat waktu, hadir
  sekolah (dasar JP), dan daftar hari efektif. Menggeser jendelanya berarti keempatnya
  harus bergeser BERSAMAAN; kalau satu tertinggal, slip membayar bonus atas jendela yang
  berbeda dari yang dipakai menghitung JP-nya, dan selisihnya tak muncul di layar mana pun.

  Karena itu aturannya dipindah utuh ke `utils/periodeBisyaroh` (murni + 26 tes) dan
  keempat pembaca tadi kini memanggilnya. `periode` sendiri TIDAK berubah bentuk —
  tetap `'YYYY-MM'`, karena id slip, riwayat, penyaring, dan Impor Excel bulanan
  semuanya bergantung padanya. Yang berubah cuma: tanggal absensi mana yang boleh
  dibaca slip itu.

  Ikut bergeser dengan sengaja: **materialisasi "hadir sekolah" guru gabungan** (kalau
  ia tertinggal di bulan kalender, baris tanggal 25–31 bulan sebelumnya tak pernah
  dibuat dan bonus di pratinjau lebih kecil dari yang akhirnya tersimpan) dan
  **simulasi plafon** (kalau plafon dihitung atas bulan kalender sementara yang dibayar
  jendela 25→24, anggaran yang Kyai susun tak lagi seatap dengan tagihannya — jumlah
  hari efektifnya memang bisa berbeda: bisyaroh Maret hanya 28 hari, September 31).

  Yang sengaja **TIDAK** ikut bergeser: **titik ukur masa pengabdian** tetap akhir bulan
  kalender. Jendela 25→24 itu aturan tentang absensi — kapan kehadiran ditutup bukunya.
  Masa pengabdian bukan kehadiran: ia menjawab "bulan apa yang sedang dibayar", dan bulan
  yang dibayar tetap bulan penuh. Menariknya ke tanggal 24 akan menunda tunjangan guru
  yang genap setahun pada tanggal 25–31 selama sebulan, tanpa ada yang meminta.

  Sekalian dibetulkan satu bug diam yang tersangkut di fungsi yang sama: pembatas "s/d
  hari ini" memakai `new Date().toISOString()` = **UTC**, yang memundurkan tanggal pukul
  00:00–06:59 WIB. Slip yang dibuka dini hari kehilangan satu hari kerja penuh dari
  penyebut "100% tepat waktu" dan dari JP yang diajar. Kini `todayJakarta()`.

  Rentangnya **ditulis di layar dan di kertas**: dua spanduk di halaman Bisyaroh (Per Guru
  & Bulk) dan satu baris baru **"Absensi: 25 Agu – 24 Sep 2026"** di slip HTML maupun PDF.
  "Periode September" yang bonus kehadirannya menghitung akhir Agustus akan terbaca
  sebagai salah hitung oleh guru yang menerimanya — jawabannya tak boleh cuma ada di
  dalam kode.

### Fixed

- **Shift yang belum dimulai tak lagi dihitung alpa** (v.1.4.2). Kyai, 5 Sep 2026:
  _"shift yg belum dimulai jangan dihitung alpa."_

  Alpa selama ini disimpulkan dari perbandingan **TANGGAL** saja (`iso <= hariIni`).
  Tanggal tak punya jam, jadi begitu hari ini dimulai, SELURUH shift hari itu langsung
  dianggap "sudah lewat" — termasuk shift Sore yang baru buka pukul 15:30. Akibatnya tiap
  pagi rekap absen menampilkan sebaris `A` merah untuk shift yang belum sempat dijalani
  siapa pun, dan angkanya baru betul sesudah maghrib.

  Bukan sekadar salah tampil: kolom A yang sama dibaca **Excel, PDF, dan kartu "kehadiran
  saya" milik guru** — jadi guru melihat dirinya alpa atas shift yang belum dimulai.

  Aturannya sekarang di `utils/shiftBerjalan` (murni + 18 tes): tanggal lampau tetap boleh
  alpa, tanggal depan tetap tidak, dan **HARI INI baru boleh alpa sesudah jam MULAI shift**.
  Batasnya sengaja `mulai`, bukan `selesai` — yang dikeluhkan Kyai adalah shift yang belum
  dimulai; sesudah shift berjalan, sel kosong memang pantas merah dan akan terhapus sendiri
  begitu scan-nya masuk. Shift yang jam mulainya belum diatur berperilaku persis seperti
  sebelumnya: menebak jam untuk shift tanpa jam = membebaskan alpa yang seharusnya ada.

  Ada **tiga** tempat yang masing-masing menyimpulkan alpa sendiri (rekap per lembaga,
  matriks bulanan, kartu guru di Personal) — persis kelas bug "cermin yang berpisah" yang
  berulang di repo ini. Ketiganya kini memanggil satu predikat yang sama, jadi kartu guru
  mustahil berselisih dengan layar admin. Perlakuannya dibuat identik dengan pembebasan
  jadwal hari (v.1.3.8): yang digugurkan **HUKUMANNYA, bukan tanggalnya** — guru yang
  terlanjur scan lebih awal (toleransi awal) tetap terhitung hadir. Dan `'alpa'` yang
  **ditandai Kyai sendiri** tetap dihitung walau shift belum dibuka: itu penilaian manusia,
  bukan simpulan sistem, dan menahannya akan membuat huruf `A` di sel berselisih dengan
  angka di kolom A pada baris yang sama.

  Kinerja dijaga: yang didenyutkan semenit sekali di `AbsensiGuruView` bukan jam mentah,
  melainkan **kunci daftar shift yang belum dibuka** (`'sore|pegawai_sore'`). Menetapkan
  nilai yang sama ke sebuah ref tak memicu apa pun di Vue, jadi matriks 6.000 sel hanya
  dirakit ulang pada saat sebuah shift memang dibuka — beberapa kali sehari, bukan 1.440.

### Fixed — keuangan

- **Riwayat dan Tagihan tak lagi bercerita dua hal berbeda** (v.1.4.2). Kyai, 5 Sep 2026:
  _"di riwayat keuangan ada tagihan yg sudah di bayar, tapi di tagihan santri itu masih
  ada"_ dan _"ada yg belum bayar tapi di riwayat tertulis di bayar."_

  Bukan satu bug, melainkan bentuk penyimpanannya. Uang santri hidup di **dua tabel yang
  ditulis terpisah dan tanpa transaksi bersama**: `keuangan_buku_induk` (yang tampil di
  Riwayat) dan `keuangan_tagihan` (yang tampil di Tagihan). Setiap jalur pembayaran
  menulis keduanya berurutan, dan tiap kali langkah kedua gagal — atau tak pernah ada —
  keduanya berpisah tanpa satu pun pesan. **Empat pabriknya ditutup:**

  1. **Bayar di muka melahirkan tunggakan palsu.** Membayar bulan yang tagihannya belum
     terbit memang SENGAJA tak membuat baris tagihan (aturan Kyai: yang sudah lunas jangan
     masuk daftar tagihan) — pembayarannya cukup duduk di Buku Induk dengan `periode_kode`.
     Tapi ketika bulan itu tiba, generator melahirkan tagihannya dengan `terbayar: 0`: ia
     hanya memeriksa tagihan KEMBAR, tak pernah menengok Buku Induk. Uang sudah diterima,
     tagihannya terbit lagi. **Inilah yang paling mungkin Kyai lihat.** Kedua generator
     (bulanan otomatis & Generate Khusus) kini membuka tagihan baru dengan angka yang sudah
     tercatat — termasuk di pratinjau, supaya yang ditinjau memang yang akan terbit.
  2. **Update tagihan gagal diam-diam.** Di verifikasi transfer, baris Buku Induk ditulis
     DULUAN dan update tagihannya menyusul di `try` yang cuma `console.warn` — pesan yang
     tak pernah dibaca siapa pun. Sekarang jadi toast merah yang menyebut sebabnya dan ke
     mana harus membetulkannya, dan sebabnya ikut ditempel di baris transfer.
  3. **Transfer yang DITOLAK meninggalkan uangnya di Riwayat.** Verifikasi menulis baris
     `bi_trf_*` lebih dulu dan menetapkan status 'verified' TERAKHIR — urutan itu disengaja
     supaya bisa diulang bila ada write yang ditolak. Sisi buruknya: verifikasi yang
     berhenti di tengah meninggalkan baris yang sudah lahir, dan penolakan tak pernah
     membersihkannya. Uang yang tak pernah sah tetap duduk di Riwayat — **persis "belum
     bayar tapi di riwayat tertulis dibayar"**. Penolakan kini menghapusnya (disalin ke
     `audit_log` dulu).
  4. **Pembayaran gabungan tak bisa dicocokkan kembali.** Tagihan gabungan dipecah di Buku
     Induk memakai label KOMPONEN ('SPP Sekolah', 'Ngaji'), bukan nama tagihan induknya —
     jadi tak ada cara jujur menautkannya kembali ke tagihan 'Syahriyah'. Baris POS kini
     membawa `tagihan_id` + `induk_jenis`; baris LAMA masih terbaca lewat pola tetap
     `— bagian dari <induk>` di keterangannya.

  **Alat baru: Pengaturan Keuangan › Tagihan → "Cek Riwayat vs Tagihan".** Membandingkan
  rupiah yang Buku Induk catat untuk tiap (santri × jenis × periode) dengan yang diakui
  tagihannya, lalu memilah temuannya:

  | Kelompok | Artinya |
  |---|---|
  | Kurang tercatat | uang ADA di Riwayat, tagihan belum mengakuinya → tunggakan palsu |
  | Lebih tercatat | tagihan mengaku terbayar, uangnya TAK ADA di Riwayat |
  | Status meleset | kolom `status` ≠ sisa hasil hitung |
  | Transfer yatim | baris `bi_trf_*` yang transfernya ditolak/hilang |
  | Bayar di muka | sah, tapi calon tunggakan palsu bulan depan |

  "Kurang tercatat" dan "Status meleset" bisa dibetulkan sekali tekan (super admin, dengan
  konfirmasi + `audit_log`); yang ditulis HANYA `terbayar` + `status` — nominal tagihan tak
  disentuh dan tak ada uang baru yang dicatat. **"Lebih tercatat" sengaja TIDAK ditambal
  otomatis**: menurunkan angka terbayar berarti menagih ulang orang yang mungkin sudah
  membayar lewat jalur lama. Aturannya di `utils/cocokBayarTagihan` (murni + 28 tes).

  **"Status meleset" perlu disebut sendiri** karena ia sudah lama ada dan tak kelihatan:
  daftar tunggakan POS dan notifikasi wali menyaring lewat KOLOM `status`, sedangkan layar
  Tagihan & Pembayaran menghitung SISA dari `terbayar`. Selama keduanya berselisih, satu
  layar bilang lunas sementara layar lain menagih — dan tak ada yang salah menurut kodenya
  masing-masing.

- **Uang Saku & Tabungan akhirnya punya cara bayar** (v.1.4.2). Kyai, 5 Sep 2026: _"uang
  buku dan uang saku tidak ada keterangan transfer/tunai untuk ekspor pdf."_

  Benar, dan lebih dalam dari sekadar kolom PDF: mutasi Tabungan/Uang Saku **tak pernah
  punya field `metode` sama sekali** — Buku Induk, POS, dan pos dana sudah sejak v.1.2.6.
  Sekarang ada pemilih Cara Bayar di form mutasi (baru & edit), badge di daftar layar, dan
  kolom **Cara Bayar** + baris SUBTOTAL TUNAI/TRANSFER di PDF laporan mutasi. Baris LAMA
  tanpa field itu tetap disimpulkan 'Tunai' oleh `utils/metodeBayar` — sama persis dengan
  Buku Induk, jadi tak ada laporan lama yang berubah artinya.

  Untuk **Uang Buku** (dan Uang Kegiatan / Tabungan Wajib) PDF-nya sebenarnya SUDAH memuat
  kolom Cara Bayar sejak v.1.2.6 — yang tak ada adalah penandanya **di layar**, jadi tak
  bisa dicocokkan dengan laci tanpa mencetak dulu. Badge-nya ditambahkan.

  Ketemu satu lagi sambil memeriksa: **Riwayat pembayaran wali menulis "[Tunai]" untuk apa
  pun yang bukan `transfer_verified`** — label itu diturunkan sendiri di dalam template,
  bukan lewat `utils/metodeBayar`. Jadi transaksi POS yang kasirnya memilih **Transfer**,
  dan pembayaran VA BMT, tercetak "Tunai" di layar yang dibaca wali. Kini lewat sumber yang
  sama dengan Buku Induk dan laporan PDF.

### Fixed — VA BMT

- **Tak ada lagi rupiah VA yang bisa hilang** (v.1.4.2, migrasi
  `20260905120000_bmt_alokasi_utuh.sql`).

  **Koreksi catatan sebelumnya di entri ini:** sempat tertulis bahwa RPC
  `apply_bmt_payment` menulis pelunasan ke ekor jsonb `data.bayar` dan tak pernah menyentuh
  kolom `terbayar`. **Itu keliru** — yang terbaca adalah versi lama
  (`20260629110000_bmt_va_uangsaku.sql`); migrasi `20260715120000_tagihan_terbayar_backfill.sql`
  sudah menulis ulang fungsi itu memakai kolom riil sejak 15 Jul 2026. Peringatan "jangan
  menyalakan VA BMT" karena itu **dicabut**.

  Memeriksanya ulang memunculkan tiga lubang yang memang masih ada, dan ketiganya berakhir
  pada satu akibat yang sama: **uang MASUK ke buku induk tapi tidak diterima siapa pun.**

  1. **Item keranjang menunjuk tagihan yang sudah tidak ada.** Keranjang VA dibuat wali,
     lalu tagihannya dihapus atau di-generate ulang (id-nya berubah) sebelum uangnya
     datang — bisa berhari-hari, karena dananya menunggu di rekening BMT. `UPDATE`-nya
     cocok 0 baris, tapi totalnya tetap ditambah seolah berhasil: tak masuk tagihan mana
     pun, tak masuk uang saku, dan hasil RPC-nya melaporkan angka yang tak terjadi.
  2. **Jumlah item < total keranjang.** Cabang keranjang tak punya penadah sisa seperti
     cabang waterfall punya, jadi selisih berapa pun langsung lenyap. `total` dan `items`
     dikirim klien sebagai dua field terpisah — RPC tak boleh mempercayai aritmetika klien
     untuk urusan uang.
  3. **Waterfall menyaring lewat LABEL `status`, bukan angka.** Tagihan yang labelnya
     terlanjur `lunas` padahal `terbayar < nominal` (persis kelas bug "status meleset" yang
     ditemukan hari ini) akan dilewati, dan uangnya lari ke uang saku sementara
     tunggakannya masih berdiri.

  Sekarang fungsinya memberi **tiga jaminan**: (a) `tagihan + uang_saku` selalu berjumlah
  tepat `p_nominal` — sisa yang tak tersalur ke tagihan SELALU ditadah uang saku, di kedua
  cabang; (b) tiap item dijepit ke sisa yang belum teralokasi, jadi keranjang cacat tak
  bisa menciptakan uang; (c) yang dilaporkan hanya baris yang BENAR-BENAR berubah
  (`GET DIAGNOSTICS`), dan rincian alokasi per tagihan ikut disimpan di baris buku induk
  (`data.alokasi`) — tanpa itu satu baris VA yang melunasi tiga tagihan tak bisa ditelusuri.

  Uang saku dipilih sebagai penadah karena ia satu-satunya kantong santri yang bisa ditarik
  atau dipakai membayar kemudian. Membiarkan sisanya menguap berarti wali membayar sesuatu
  yang tak pernah diterima siapa pun, dan tak ada satu layar pun yang akan menunjukkannya.

  Idempotensinya tidak berubah: guard `keuangan_va_inbox.ref` (primary key) dan
  `applied_transfer_refs` per tagihan tetap seperti semula.

### Removed

- **Tombol "Tinjau & pindahkan ke Rekap" di Rekap Prestasi** (v.1.4.2). Kyai, 5 Sep 2026:
  _"di rekap yg tombol pindahkan nilai hapus saja, yg penting perhitungan sudah sesuai."_

  Tombol, dialog pratinjaunya, dan `utils/pindahJendelaRekap` (+ tesnya) dihapus. Alat itu
  lahir v.1.4.1 untuk membereskan isian yang tersangkut di bucket bulan sebelah; sesudah
  dropdown periodenya dibetulkan pada versi yang sama, isian BARU mendarat di bucket yang
  benar dengan sendirinya — yang tersisa cuma peninggalan versi lama, dan Kyai sudah
  menjalankan pemindahannya sekali pada 4 Sep 2026.

- **Spanduk "N santri isiannya tersimpan di Rekap <bulan lalu>"** (v.1.4.2). Kyai, 5 Sep
  2026, menyusul permintaan di atas: _"ini sekalian hilangkan."_

  Spanduk itu lahir v.1.4.1 untuk satu keadaan yang **sudah lewat**. Sampai v.1.4.0 dropdown
  periode terbuka pada BULAN KALENDER sedangkan jendela pengisian menyeberangi pergantian
  bulan, jadi guru yang mengisi tanggal 29–31 menyimpan ke bulan sebelumnya. Dropdown-nya
  sudah dibetulkan di v.1.4.1 — isian BARU mendarat di bucket yang benar dengan sendirinya —
  dan pemindahan peninggalan lamanya sudah Kyai jalankan 4 Sep 2026. Yang tersisa hanyalah
  spanduk yang mengabarkan kejadian lama, muncul lagi tiap siklus, dan sesudah tombolnya
  dihapus tak ada lagi yang bisa dilakukan atasnya.

  `snapshotSalahJendela` (utils/prestasiBulanan) + tesnya ikut dihapus — tak ada lagi
  pembacanya. Kalau suatu saat keluhan "guru sudah isi tapi di rekap kosong" muncul lagi,
  **jangan membangun ulang spanduknya lebih dulu**: periksa apakah ada yang masih mengisi
  lewat jalur lama. Spanduk itu gejala, bukan sebabnya.

---

## [v.1.4.1 — belum dirilis] — 2026-09-04 — Satu ejaan kelas, satu nama bulan, dan guru yang tak lagi hilang

⚠️ **URUTAN DEPLOY — TIDAK frontend-murni.** `npx supabase db push` **wajib duluan**
(`20260904120000_arsip_prestasi_periode_laporan.sql`), baru deploy web, lalu AAB & Electron.
Migrasinya menyentuh fungsi arsip tanggal 25; kalau web tayang lebih dulu, arsip bulan itu
mendarat di bucket periode yang lama.

⚠️ **Titik versi SENGAJA tetap `1.4.0`** — keputusan Kyai, 4 Sep 2026: _"versi tetap 1.4.0
dulu saja, karena belum naik ke play."_ Kelima berkas versi + 8 label UI TIDAK disentuh; entri
ini murni catatan pekerjaannya. Naikkan ke `1.4.1` (lihat daftar TITIK VERSI di catatan
v.1.4.0) hanya kalau Kyai sudah siap mengunggahnya ke Play.

### Fixed

- **Kelas PTPT tak lagi punya dua ejaan** (v.1.4.1). Kyai, 4 Sep 2026: _"kelas/jilid di PTPT
  tidak konsisten, ada yg 1-6 ada yg kelas 1-kelas 6. yg benar Kelas 1-6."_

  Sebabnya dua sumber label yang dua-duanya sah dan dua-duanya dipakai menulis:
  `master/lembaga.kelas_list` PTPT berisi **angka telanjang** `'1'..'6'` (itu yang mendarat di
  `santri.kelas` lewat dropdown Master Data & Tes Kenaikan), sedangkan `JENJANG_CADANGAN.ptpt`
  dan kartu kenaikan memakai `'Kelas 1'..'Kelas 6'` (itu yang mendarat lewat NaikKelasView,
  impor, dan data lama). Secara logika tak ada yang rusak — `indexJenjang` memang sengaja
  menyamakan `'Kelas 3' ≡ '3'` — yang rusak justru yang terbaca Kyai: satu daftar memuat dua
  ejaan untuk satu kelas.

  Aturannya sekarang di `utils/jenjangQiraati.labelJenjang()`: **angka telanjang bukan sebuah
  label**; kalau label master hanya angka, dipakai label daftar cadangan pada INDEX yang sama.
  Lembaga yang label masternya memang bernama (`'Level ½ Juz'` di Pra PTPT) **tidak tersentuh**
  — master tetap menang di sana. `labelKelasPra` yang dulu hidup di dalam `TesKenaikanView`
  ikut pindah ke sini, jadi PTPT sekalian ikut dirapikan (dulu fungsi lokal itu hanya mengurus
  Pra PTPT). Dikunci `tests/unit/labelJenjang.test.js`.

  Penyaring kelas di Rekap Prestasi ikut diperbaiki: dulu membandingkan string **persis**, jadi
  memilih `Kelas 1` diam-diam membuang santri yang kelasnya tersimpan sebagai `1` — separuh
  daftar hilang tanpa pesan apa pun. Kini lewat `kelasSama()`.

  Baris lama **tidak** diubah dan memang tak perlu: setiap pembacanya kini lewat `labelJenjang`.
  Kenaikan menyimpan bentuk kanoniknya, jadi data baru tak menambah ejaan ketiga.

- **Nama guru kosong di Rekap Prestasi** (v.1.4.1). Kyai, 4 Sep 2026: _"di menu rekap prestasi,
  nama guru kosong padahal semua santri PTPT sudah punya guru. dan di rekap kelompokkan per
  guru."_

  Layar itu membaca `santri.guru` — field **tunggal** peninggalan sebelum ada pasangan
  pagi/sore. Sejak v.1.1.9 pengampu yang sebenarnya tersimpan di `guru_pagi`/`guru_sore`, dan
  `guru` cuma cermin yang boleh ketinggalan; di PTPT ia memang sering kosong. Jadi bukan
  datanya yang hilang — **pembacanya menengok kolom yang salah**.

  Pengelompokannya juga berantakan karena sebab yang berdiri sendiri: grup lama dibentuk
  **run-length** atas daftar yang diurut lembaga→kelas→usia. Karena guru tak pernah ikut
  mengurutkan, satu guru pecah jadi belasan grup dan judulnya berulang-ulang — persis yang
  tampak di tangkapan layar Kyai. Sekarang santri dikumpulkan ke petanya dulu, baru grupnya
  diurutkan (lembaga → kelas terendah yang diampu → nama guru), dan santri **tanpa** guru
  dikumpulkan jadi satu kelompok di paling bawah — bukan dibuang: justru merekalah yang paling
  perlu terlihat.

  Aturannya di `utils/rekapPrestasiTabel` (murni + 30 tes). "Siapa pengampu satu santri" TIDAK
  ditulis ulang di sana — diambil dari `pasanganSantri`/`labelPasanganRingkas`, yang sudah jadi
  sumber tunggal sejak kartu dasbor "Guru Belum Input". Cetak HTML ikut memakai judul & urutan
  yang sama, jadi kertas dan layar tak bisa berbeda.

- **Kenaikan lewat Tes Kenaikan tak lagi meninggalkan guru lama** (v.1.4.1). Kyai, 4 Sep 2026:
  _"jika PJ/kepala/superadmin menaikkan, jika kelasnya pindah, di field pilih guru harusnya
  gurunya sudah berpasangan seperti field yg lain, jadi bukan satu2. dan buat tidak bisa
  disimpan jika nama guru belum diisi."_

  Yang diperbaiki bukan cuma bentuk isiannya. Kotak teks lama hanya mengisi `naikForm.guru` —
  field tunggal itu lagi — sedangkan `guru_pagi`/`guru_sore` dibiarkan **nilai lama**. Padahal
  seluruh penyaring ampuan, statistik kelas, dan daftar rekap membaca pasangannya duluan.
  Akibatnya "pindah guru" lewat layar ini praktis **tak berefek**: santri tetap terhitung di
  kelas guru lama, dan di Rekap Prestasi ia tampil tanpa nama guru. Ini bug yang **sama persis**
  dengan yang sudah ditutup di NaikKelasView pada v.1.1.9 — layar ini terlewat.

  Sekarang: pemilih **pasangan** (satu baris = satu kelas, dua nama sekaligus) + mode "Atur
  sendiri" yang mengisi pasangan otomatis dari peta co-occurrence pagi↔sore — cermin
  NaikKelasView, memakai `utils/pasanganGuru` yang sama. Pasangannya ikut tersimpan
  (`buildKenaikanQiraatiPayload` sudah mendukungnya sejak v.1.1.9, cuma tak pernah diberi).

  Tombol **Lulus & Naikkan terkunci** selama guru belum dipilih, dan pindah lembaga tujuan
  mengosongkan pilihan guru (membiarkannya berarti menyimpan guru dari lembaga yang sudah
  ditinggalkan). Santri yang naik tanpa guru hilang dari daftar ampuan siapa pun — tak muncul
  di rekap, tak tertagih ke siapa pun, dan baru ketahuan berbulan-bulan kemudian.

- **Pencarian di Data Santri/Guru tak lagi hilang sesudah menyimpan** (v.1.4.1). Kyai, 4 Sep
  2026: _"jika setelah tulis nama kemudian cari, lalu edit data, setelah simpan selalu reset
  halamannya. maksudnya namanya tadi hilang, dan tergeser ke bawah, jadi kalau ingin ketik nama
  lain masih perlu scroll keatas."_

  **Tiga sebab, tiga-tiganya ditutup.**
  1. **Alamat kembalinya dikarang ulang.** Daftar sudah menyimpan penyaringnya di query URL
     sejak v.107 (`?q=ahmad&lembaga=PTPT`), tapi tombol Simpan memanggil
     `router.push('/master-data?tab=santri')` — alamat kosong tanpa satu pun penyaring tadi.
     Form kini dititipi `?kembali=<fullPath daftar>` dan memakainya. Nilainya **divalidasi**
     (`utils/navKembali`): hanya jalur internal yang diterima, karena `kembali` datang dari URL
     dan tanpa penjagaan tombol Simpan bisa dipakai melempar penggunanya ke situs orang.
  2. **`tab` ikut terhapus.** Daftar Santri/Guru juga tayang **di dalam** Master Data, dan
     penulisan query-nya merakit ulang dari nol — jadi `tab=santri` hilang tiap kali kotak cari
     diketik, dan Master Data melompat ke tab lain.
  3. **Tak pernah ada `scrollBehavior`.** Halaman berikutnya terbuka pada posisi gulir halaman
     sebelumnya. Yang digulir `<main id="app-scroll">` di AppLayout, **bukan** window: root
     aplikasi `h-screen + overflow-hidden`, jadi `scrollBehavior` bawaan yang menggulir window
     tak akan berpengaruh apa pun. Perubahan **query saja** sengaja tidak menggulir — kalau
     ikut, layar melompat ke atas di setiap huruf yang diketik.

- **Rekap Prestasi & kartu dasbor tak lagi menunjuk bulan yang berbeda** (v.1.4.1). Kyai, 4 Sep
  2026: _"rekap prestasi bulanan, Bulan September. Isinya adalah rekapan dari awal agustus
  sampai akhir agustus … di filter saya membukanya di September, bukan di agustus. di agustus
  harusnya data bulan lalu (bulan agustus, rekap dari Juli)."_

  Penamaan yang berlaku sekarang, ditulis eksplisit karena inilah satu-satunya sumber
  kekeliruannya:

  > **`periode` = BULAN LAPORAN** (bulan saat rekap dikerjakan & diberi nama) —
  > **isinya capaian bulan SEBELUMNYA.**

  v.1.3.8 memakai penamaan **kebalikannya**, dan itulah bug yang tak kelihatan:
  RekapPrestasiView sejak v.100d menulis snapshot ber-periode bulan laporan (`'2026-09'`, nilai
  dropdown di layarnya), sedangkan kartu dasbor "Guru Belum Input" mencari bulan **data**
  (`'2026-08'`) lewat `periodeRekapBerjalan()`. **Dua bucket berbeda untuk satu pekerjaan yang
  sama**: guru yang sudah rapi mengisi tetap tercantum "belum input", dan tak ada satu pun layar
  yang menunjukkan sebabnya.

  Yang bergeser hanya `periodeRekapBerjalan()` & `batasRekap()` — keduanya maju satu bulan
  supaya sepakat dengan apa yang **sudah** tertulis di DB sejak v.100d. **Tak ada migrasi
  data.** Batasnya kini tanggal 5 di bulan laporan itu sendiri (rekap September → 5 September),
  jendelanya dibuka tanggal 29 bulan sebelumnya, dan penjepitan bulan pendek tetap ada (rekap
  Maret dibuka 28 Feb di tahun biasa).

  Sekalian: nama bulan **tak boleh lagi tampil sendirian**. `labelPeriodeRekap()` selalu
  menyebut bulan datanya — _"September 2026 (data Agustus 2026)"_ — dan dipakai kartu dasbor,
  halaman Guru Belum Input, serta PDF-nya. Layar Rekap Prestasi juga membuka diri pada periode
  laporan yang sedang jadi giliran; dulu `_now.getMonth()` polos: benar sepanjang tanggal 1–28,
  tapi salah justru di hari-hari jendela baru dibuka (29–31), ketika layar itu paling dibutuhkan.

  **Sisi server ikut digeser** (`20260904120000_arsip_prestasi_periode_laporan.sql`). Fungsi
  arsip tanggal 25 mengarsipkan ke `bulan lalu`; padahal angka yang menempel di baris santri
  pada 25 September adalah isi rekap **September**. Akibatnya angka Agustus tercatat sebagai
  angka Juli, sementara papan peringkat tetap dikosongkan — jejaknya ada, di bulan yang keliru.
  Baris riwayat lama **dibiarkan apa adanya**: memindahkannya berarti menebak bulan yang
  dimaksud penulisnya, dan tebakan itu tak bisa dibatalkan.

- **Angka rekap tak lagi terbawa saat ganti bulan** (v.1.4.1). Suntingan yang belum tersimpan
  di grid Rekap Prestasi milik **satu periode saja**, tapi `edits` tak pernah dikosongkan waktu
  dropdown bulan dipindah. Karena `getEdit` mengutamakan `edits`, angka bulan lama menutupi
  snapshot bulan yang baru dibuka **dan ikut tersimpan ke sana** begitu Simpan ditekan. Kelas
  bug yang sama dengan v.1.3.7, versi lokalnya.

- **Angka dasbor tak lagi bertengkar dengan angka Rekap Prestasi** (v.1.4.1). Kyai, 4 Sep
  2026: _"coba cek, di dasbor dg yg di rekap beda. guru2 katanya banyak yg sudah isi, tapi di
  rekap kok banyak yg belum diisi."_ — dasbor **241/297 dinilai**, Rekap September
  **74/297**.

  Keduanya "benar", tapi menjawab pertanyaan yang **berbeda**, dan tak satu pun menyebutkan
  pertanyaannya:

  |                                  | sumbernya                               | artinya                           |
  | -------------------------------- | --------------------------------------- | --------------------------------- |
  | Kartu **Top Santri PTPT & PPPH** | `santri.prestasi_awal/akhir`            | pernah dinilai **kapan pun**      |
  | **Rekap Prestasi**               | snapshot `riwayat_prestasi` periode itu | sudah dinilai **untuk rekap ini** |

  Baris santri hanya menyimpan SATU set angka tanpa dimensi bulan, dan ia tak pernah kosong
  sendiri — hanya fungsi arsip tanggal 25 yang mengosongkannya (dan jadwal pg_cron-nya
  dipasang manual; kalau belum, ia tak pernah kosong sama sekali). Jadi angkanya
  **akumulatif**: santri yang diisi Juni masih terhitung "dinilai" di September, selamanya.
  Ini persis kelas bug v.1.3.7 — dulu ditutup di RekapPrestasiView, tapi **tak pernah sampai
  ke kartu dasbor**.

  Sekarang `DistribusiPrestasi` (jumlah dinilai, band Kurang/Cukup/Bagus, Top 5, dan
  ekspor PDF/Excel-nya) membaca snapshot **periode rekap berjalan** lewat
  `useStatistikScope.nilaiRekapSantri()` — sumber yang sama dengan Rekap Prestasi dan kartu
  "Guru Belum Input". Judul kartunya kini **mencantumkan periodenya**; tanpa itu
  "241/297 dinilai" tak punya cara dibaca selain "bulan ini".

- **Isian rekap yang tersangkut di bucket bulan sebelah kini terlihat** (v.1.4.1). Bagian
  kedua dari keluhan yang sama — _"guru2 katanya banyak yg sudah isi"_ — dan ini **bukan**
  soal dasbor.

  Sampai v.1.4.0, dropdown bulan di Rekap Prestasi terbuka pada **bulan kalender**
  (`_now.getMonth()`). Padahal jendela pengisian menyeberangi pergantian bulan: guru yang
  membuka layar **29–31 Agustus** melihat "Agustus" dan menyimpan ke `'2026-08'`, sedangkan
  rekannya yang membuka **1–5 September** melihat "September" dan menyimpan ke `'2026-09'`.
  **Satu pekerjaan yang sama, dua bucket** — semata karena hari keberapa ia sempat
  membukanya. Yang membuka di bulan September lalu melihat separuh daftarnya kosong tak punya
  cara apa pun menebak ke mana isian rekannya pergi.

  `snapshotSalahJendela()` menghitungnya, dan menghitungnya dengan pembeda yang benar:
  **kapan barisnya DITULIS** (`updatedAt` ≥ tanggal jendela dibuka), bukan sekadar "ada
  isian di bulan lalu" — tanpa pembeda itu, siklus bulan lalu yang berjalan normal pun ikut
  terhitung dan angkanya tak berarti apa-apa. Baris tanpa `updatedAt` **tidak** dituduh.

  Hasilnya tampil sebagai spanduk kuning di layar Rekap Prestasi, lengkap dengan sejak
  tanggal berapa dan ke bucket mana. ⚠️ **Sengaja hanya dilaporkan, tidak dipindah otomatis**:
  bucket sebelah juga menampung rekap bulan itu yang sah, dan memindahkannya berarti berisiko
  menimpa pekerjaan yang benar dengan pekerjaan yang lain. Keputusan memindah ada di Kyai.

  Default dropdown-nya sendiri sudah diperbaiki (lihat butir periode di atas), jadi siklus
  berikutnya tak akan terpecah lagi.

- **Isian yang tersangkut kini bisa DIPINDAHKAN, dengan pratinjau** (v.1.4.1). Kyai, 4 Sep
  2026, menegaskan aturannya: _"guru yg mengisi dari tgl 29 agustus - september itu adalah
  data september."_ Jadi baris yang tersangkut di bucket Agustus memang milik rekap
  September, dan harus pindah.

  `utils/pindahJendelaRekap.rencanaPindahJendela()` menyusun rencananya — **murni, tak
  menulis apa pun** (pola yang sama dengan `tambalRiwayatPrestasi`, dan alasannya sama:
  ini menyentuh riwayat yang sudah tersimpan). Tombol **"Tinjau & pindahkan"** di spanduk
  kuning membuka pratinjau berisi jumlah, daftar santri, angkanya, dan tanggal tulisnya;
  tak ada satu baris pun berubah sebelum tombol konfirmasi ditekan. Hanya super_admin.

  **Tiga penjaga yang membuat rencananya tak bisa merusak:**
  1. pembedanya **waktu tulis** (`updatedAt` ≥ 29 bulan sebelumnya), bukan "ada isian di
     bulan lalu" — tanpa ini seluruh rekap Agustus yang sah ikut terbawa;
  2. baris **tanpa `updatedAt`** tak pernah ikut — tanpa waktu tulis tak ada dasar
     menuduhnya salah bucket;
  3. baris tujuan yang **sudah berangka tak pernah ditimpa** — dilaporkan sebagai _bentrok_
     supaya Kyai tahu, bukan diselesaikan diam-diam.

  Penerapannya **tulis dulu, baru hapus**. Urutan itu penting: kalau penulisan gagal, baris
  asal masih utuh dan tak ada angka yang lenyap. Penghapusannya lewat `deleteOne`, yang
  menyalin baris ke `audit_log` lebih dulu (v.91.0626) — jadi pemindahan ini bisa
  ditelusuri. `santri.prestasi_*` **tidak** disentuh.

  ⚠️ **Satu hal yang tak bisa dipulihkan, dan disampaikan apa adanya:** santri yang punya
  rekap Agustus sah (diisi 29 Jul–5 Agu) LALU diisi lagi 29–31 Agustus sudah kehilangan
  angka pertamanya saat itu juga — id barisnya sama, jadi isian kedua menimpanya. Yang
  tersisa memang hanya angka siklus September. Memindahkannya tak menghilangkan apa pun yang
  masih ada, tapi rekap Agustus santri itu akan kosong sesudahnya.

- **Tooltip grafik tak pernah muncul di HP** (v.1.4.1). Kyai, 4 Sep 2026: _"saat diklik dari
  hp kok gk muncul keterangannya ya, kalau di pc muncul."_

  Sebabnya **bukan** touch event yang hilang — Chart.js v4 sudah mendengarkan `touchstart` &
  `touchmove` secara bawaan. Yang menghalangi setelan bawaan `interaction.intersect` =
  **true**: tooltip hanya muncul kalau titik sentuh jatuh **persis di dalam** batang/titiknya.

  Di layar PC itu tak terasa — kursor mouse setajam 1 piksel. Di HP tidak: ujung jari
  mendarat sebagai satu titik yang meleset beberapa piksel, batangnya sempit (10 kategori
  dalam ±340 px), dan yang nilainya 1–2 **tingginya cuma beberapa piksel**. Jadi justru
  batang terkecil — yang paling perlu dibaca angkanya — yang paling mustahil disentuh.

  `utils/chartSentuh.opsiChart()`: `intersect: false` + `mode: 'index'` (doughnut/pie pakai
  `'nearest'`), plus tooltip berfont 12 px dengan padding lebih lega supaya terbaca di
  genggaman. Menyentuh **di mana saja pada kolomnya** sudah cukup, dan tooltipnya sekalian
  menampilkan seluruh dataset kolom itu (Lulus + Belum Lulus sekaligus). Di PC juga terasa
  lebih enak — tak perlu lagi membidik batang setipis rambut.

  Dipasang di **semua** grafik: `AdminStatsCharts` (3), `TrenCapaianChart`, `LaporanView`
  (4), `PersonalView`. Setelan pemanggil selalu menang, jadi `callbacks` format Rupiah di
  grafik arus kas tetap utuh — itu yang paling gampang ikut terhapus, dan itu yang dikunci
  tesnya. `tests/unit/chartSentuh.test.js` juga **membaca keempat berkas** dan menolak kalau
  ada objek opsi yang tak lewat `opsiChart` — grafik ke-5 tak bisa lahir tanpa setelan ini.

- **Kelas PTPT terbelah dua batang di grafik & KPI dasbor** (v.1.4.1). Terlihat di tangkapan
  layar Kyai: satu kartu **PTPT** dengan sumbu X memuat `1 2 3 4 5 6` **dan**
  `Kelas 1 … Kelas 4` sekaligus — dua ejaan untuk lembaga yang sama, jadi satu kelas
  terhitung sebagai dua batang terpisah.

  Perbaikan label `labelJenjang` sebelumnya baru menyentuh Rekap Prestasi & Tes Kenaikan;
  dasbor terlewat. Kini ikut: **Kenaikan Tes per Lembaga** (kelas dikanonikkan sebelum jadi
  kunci, lalu diurut `kelasRank` — bukan alfabet, supaya 'Kelas 10' tak nyelip sesudah
  'Kelas 1'), **Rincian Kelas** di KPI Jumlah Kelas, dan kolom Kelas/Juz pada ekspor
  PDF/Excel **Top Santri**.

- **Tab Ranking tak punya tombol ekspor sama sekali** (v.1.4.1). Kyai, 4 Sep 2026: *"di
  halaman ini belum ada tombol ekspor pdf."* Cetak/PDF/Excel/Google Sheet dulu hanya ada di
  tab Input Bulanan — padahal justru di tab Ranking ekspornya paling masuk akal: PDF-nya
  memang sudah diurut capaian terbanyak lalu juz tertinggi, jadi berkasnya persis daftar
  peringkat yang sedang dilihat, hanya lengkap sampai santri terakhir (bukan cuma Top 5).
  Fungsinya DIPAKAI ULANG apa adanya, bukan disalin — kartu di layar dan berkas cetak tak
  boleh bisa berbeda isinya. Bloknya dibungkus `<template v-else-if>` supaya rantai
  v-if/v-else-if antar-mode tetap utuh; dengan `v-if` polos, daftar peringkat akan ikut
  tampil bersamaan dengan pesan "Tidak ada santri Qiraati yang cocok".

- **Kop ekspor Rekap Prestasi tak pernah benar** (v.1.4.1). Kyai, 4 Sep 2026: *"sudah oke,
  tinggal kopnya saja."* **Dua** kesalahan sekaligus, dan yang pertama menutupi yang kedua.

  1. Keempat ekspor layar ini (PDF, Excel, Google Sheet, Cetak) membaca
     `settings.savedSettings` — nama store aplikasi **HTML legacy**. Di store Pinia ia tak
     pernah ada (`stores/settings.js` baris 1 menyebutnya begitu), jadi hasilnya selalu
     `undefined` lalu jatuh ke `{}`. Kop yang tercetak karena itu SELALU teks cadangan
     bawaan `buildKopFromSettings`: tanpa logo, tanpa alamat, tanpa kontak — dan itu tak
     pernah tampak sebagai galat, hanya sebagai kop yang "kurang lengkap".
  2. Rekap Prestasi itu dokumen **per lembaga** (judulnya pun menyebut PTPT), jadi kop-nya
     milik lembaga itu, bukan kop pondok. Keluhan yang **persis sama** sudah Kyai
     sampaikan 5 Agu 2026 untuk ekspor Top Santri.

  `utils/pdfBuilder.buildKopLembaga()` kini jadi sumber tunggal aturan itu — `kop_logo` /
  `kop_line1..4` di baris `master/lembaga`, jatuh ke kop pondok **per-field** bila
  lembaganya belum mengisi. Per-field, bukan per-objek: PPPH yang hanya mengisi satu baris
  tak boleh membuat alamat & kontaknya raib. `DistribusiPrestasi` ikut memakainya (salinan
  lokalnya dibuang) supaya tak lahir salinan keempat. Dikunci
  `tests/unit/kopLembaga.test.js`.

  ⚠️ `line5` sengaja TIDAK bisa di-override lembaga — tak ada field-nya di master, dan
  mengarangnya membuat baris kop terakhir berubah arti tergantung lembaga.

### Added

- **Ekspor PDF Rekap Prestasi bisa dipisah per PJ PTPT** (v.1.4.1). Kyai, 4 Sep 2026: _"untuk
  ekspor PDF rekap prestasi bulanan, saya ingin bisa dipisah per PJ PTPT. dan format tabelnya
  ekspornya berisi: No, Nama Santri, Kelas PTPT, Juz, Awal Bulan, Akhir Bulan, Total Capaian,
  Nama Guru. dan diurutkan dari yg terbanyak total capaiannya kemudian dari juz yg tertinggi."_

  Penyaring **PJ PTPT** baru di layar (PJ efektif diturunkan dari guru pengajarnya lewat peta
  `pj_guru`, sama seperti Data Santri — bukan label per-santri yang harus dirawat manual).
  Dibiarkan **"Semua PJ"**, PDF-nya sendiri yang dipisah: satu berkas, satu **bagian per PJ**,
  tiap bagian mulai di halaman baru dengan kop, judul PJ, dan **penomoran yang mulai dari 1
  lagi** — jadi tiap PJ tinggal mencabut halamannya. Memilih satu PJ menghasilkan berkas berisi
  PJ itu saja.

  Kolom & urutannya tidak ditulis di dalam view: dua-duanya dari `utils/rekapPrestasiTabel`,
  supaya PDF, cetak, dan layar mustahil berselisih. Pembanding terakhirnya nama A–Z — bukan
  hiasan: tanpa itu, dua santri yang total & juz-nya sama bertukar posisi tiap kali daftar
  dirakit ulang, dan PDF yang dicetak dua kali di hari yang sama jadi tak sama isinya.

  ⚠️ **Grid isian sengaja TIDAK ikut diurut capaian** (`kelompokPerGuru(rows, { urut: 'tetap' })`).
  Kalau ikut, baris melompat sendiri tiap kali sebuah angka diketik — santri yang sedang diisi
  pindah tempat di tengah pengetikan. Urutan capaian itu permintaan untuk **ekspor**, bukan
  untuk mengisi.

### Catatan teknis

- Util baru: `utils/rekapPrestasiTabel.js`, `utils/navKembali.js`,
  `utils/pindahJendelaRekap.js`, `utils/chartSentuh.js`; tambahan di
  `utils/jenjangQiraati.js` (`labelJenjang`, `jenjangLembagaLabel`, `kelasSama`),
  `utils/prestasiBulanan.js` (`periodeBerikutnya`, `periodeDataRekap`, `tglBukaRekapPeriode`,
  `labelBulanPeriode`, `labelPeriodeRekap`, `snapshotSalahJendela`), dan
  `utils/pdfBuilder.js` (`buildKopLembaga`).
- Tes baru: `rekapPrestasiTabel` (30), `labelJenjang` (17), `navKembali` (12),
  `snapshotSalahJendela` (11), `pindahJendelaRekap` (13), `chartSentuh` (12),
  `kopLembaga` (11); `rekapPrestasiSiklus` ditulis ulang (33). Total suite
  **1.266 tes, 89 berkas — hijau**.
- `usePjGuru()` kini ikut membagikan `lembagaList`. Dokumennya sudah dilangganani di sana, jadi
  pemanggil yang butuh `kelas_list` tak perlu membuka langganan **kedua** ke dokumen yang sama.

---

## [v.1.4.0] — 2026-09-03 — Rekap absen bulanan yang ringan + pembaruan Android lewat Play saja

⚠️ **URUTAN DEPLOY — frontend murni.** Tanpa migrasi DB, tanpa edge function. Deploy web dari
direktori utama (butuh `vue-app/.env.local`), lalu **AAB vc140** dan **Electron 1.4.0**.

⚠️ **AAB vc139 masih ditinjau Play saat rilis ini dikerjakan.** Nomor versi dinaikkan ke 1.4.0
atas keputusan Kyai (3 Sep 2026). Kalau vc140 diunggah sebelum vc139 selesai ditinjau, rilis
yang sedang berjalan itu harus dibatalkan lebih dulu di Play Console — Play tak memproses dua
rilis produksi sekaligus.

⚠️ **`public/app-version.json` sekarang bermuatan `apkUrl` KOSONG, dan itu disengaja.** Ia
satu-satunya rem untuk aplikasi **vc139 ke bawah** yang masih membawa cek-pembaruan-otomatis di
dalam dirinya: `putusanPembaruan()` menilai muatan tanpa apkUrl sebagai `belum-siap`, dan cek
otomatis memang diam untuk putusan itu. Mengisinya lagi = notifikasi APK hidup kembali di semua
HP yang belum sempat memperbarui lewat Play. `versionCode`/`versionName`-nya TETAP dinaikkan
bersama rilis supaya berkas itu tak berbohong tentang versi web yang sedang tayang.

### Changed

- **Pemberitahuan pembaruan Android dihentikan — Play Store jadi satu-satunya jalur**
  (v.1.4.0). Kyai, 3 Sep 2026: _"matikan notif pembaruan untuk android, cukup update via
  playstore saja."_

  Yang dicabut:
  - `App.vue` — `useAndroidUpdate().cekOtomatis()` di `onMounted` **dihapus**. Tak ada lagi
    dialog yang muncul sendiri beberapa detik sesudah aplikasi dibuka.
  - `BantuanView.vue` — tombol **Cek Pembaruan** / **Unduh APK** / **Semua versi** (GitHub
    Releases) diganti satu tautan **Buka Play Store**. Teksnya ikut berubah: tak lagi
    menjanjikan "tanpa menunggu peninjauan Play".
  - `utils/unduhan.js` — `URL_PLAYSTORE` baru (`app.ammu.id`, cermin `applicationId` di
    `vue-app/android/app/build.gradle`), supaya id aplikasi tak tersalin ke dalam view.

  `composables/useAndroidUpdate.js` **sengaja TIDAK dihapus**: mesinnya utuh dan masih dijaga
  `tests/unit/putusanPembaruan.test.js`, jadi kalau suatu hari peninjauan Play kembali terlalu
  lama, menghidupkannya cukup memanggil `cekOtomatis()` lagi. Yang dibuang hanya pemanggilnya.
  Berkasnya kini berkepala peringatan "DIPARKIR SEJAK v.1.4.0".

  **Kenapa jalur APK ditutup, bukan sekadar diarahkan ke Play** (rencana lama di [Unreleased]
  yang kini tersalip): APK di luar Play ditandatangani kunci yang berbeda dari kunci Play,
  sehingga tak bisa dipasang menimpa aplikasi yang sudah ada — dan itu baru ketahuan setelah
  berkasnya selesai diunduh. Berdampingan dengan Play, jalur itu lebih sering menjebak daripada
  menolong.

  ⚠️ Yang **TIDAK** ikut berubah: tautan unduh Android di **layar login**
  (`LoginView` → `urlApk()`, masih APK GitHub). Itu tautan **pasang**, bukan **pembaruan**, dan
  Kyai sudah bisa menimpanya tanpa rilis lewat setelan `downloadAndroid` di Pengaturan Web.
  Kalau kelak ingin ikut pindah, ganti fallback-nya jadi `URL_PLAYSTORE`.

### Fixed

- **Rekap absen bulanan guru tak lagi tersendat saat diperbaiki manual** (v.1.4.0). Kyai,
  3 Sep 2026: _"akses edit rekap absen bulanan guru terasa lambat ketika saya edit manual."_

  **Dua sebab yang berdiri sendiri, dua-duanya ditutup.**

  **(1) Matriksnya dirakit ulang tiap render, bukan tiap data berubah.** Template memanggil
  tujuh fungsi per baris — `cellText`, `cellClass`, `cellTitle`, `pulangPending`, `countStatus`
  ×3, `countAlpha` — dan masing-masing menurunkan ULANG tiga hal yang sama untuk sel yang
  sama: lembaga kalender (`lembagaKalenderShift` → `shiftById` → `shiftList`, yang me-map,
  menormalisasi, **dan mengurutkan** seluruh master shift **tiap kali dipanggil**), libur, dan
  jadwal mengajar. Fungsi di dalam template tak bisa di-cache Vue: ia jalan lagi setiap
  komponen render — termasuk render yang tak menyentuh matriks sama sekali. Satu perbaikan
  manual memicu **empat** render (dialog dibuka → tombol jadi "Menyimpan…" → data masuk →
  dialog ditutup), jadi biayanya dibayar empat kali.

  Diukur pada 120 guru × 30 hari (≈200 baris, 6.000 sel): **117 ms** turunan JS per render →
  **6,3 ms** bila diturunkan sekali. Itu baru sisi JS, belum diff DOM 6.000 sel.

  Sekarang: satu computed `matriksBulanan` memakai **`utils/absensiMatriks`** (murni + 20 tes)
  yang memutuskan sekali per sel lalu memakai keputusan itu untuk teks, warna, tooltip, **dan**
  kolom H/T/I-S-C/A. Barisnya diberi **`v-memo="[row]"`**, jadi selama objek barisnya tak
  berganti Vue melewati seluruh subpohonnya — buka/tutup dialog tak lagi menyeret ribuan sel.
  ⚠️ `v-memo` **wajib** duduk di elemen `v-for` **terluar**; dipasang di `<td>` sebelah dalam,
  Vue memakai satu slot cache untuk seluruh baris dan hasilnya bisa tertukar antar-guru
  (`vue/valid-v-memo` menangkap ini).

  Efek samping yang menyenangkan: tiga salinan aturan "libur? bukan jadwal? sudah lewat?" yang
  dulu tersebar di `cellText`/`cellClass`/`cellTitle` jadi satu. Huruf sel dan kolom rekap kini
  **mustahil** berselisih — begitu juga ekspor Excel/Sheet/PDF, yang kini membaca larik yang
  sama, bukan memanggil ulang fungsi selnya.

  **Dibuktikan setara, bukan diasumsikan.** Keluaran matriks baru dibandingkan sel demi sel
  dengan salinan persis fungsi lama pada 150 guru × 30 hari (**6.300 sel**, memakai utils
  asli: `lembagaKalenderShift`, `guruMasukPada`, `liburScope`, termasuk guru tanpa lembaga,
  shift buatan sendiri, dan jadwal hari kosong). Hasil: **teks 0 beda, warna 0 beda, tooltip
  0 beda, kolom H/T/I-S-C/A 0 beda**, dan `bisaPerbaiki` persis sama dengan dua penolakan
  lama (libur / belum lewat).

  Satu-satunya selisih — **242 sel, semuanya sel LIBUR** — diubah dengan sengaja: penanda
  oranye "belum absen pulang". Dulu `pulangPending` tak pernah menengok libur, jadi titik itu
  tetap menempel di sel yang bertulis 'L' dan bertooltip "Libur" — penanda yang membantah sel
  yang ditempelinya. Sekarang ia mengikuti selnya. Tak ada keterangan yang hilang: baris di
  hari libur memang sudah tak tampil di matriks sejak v.1.2.3. Dikunci
  `tests/unit/absensiMatriks.test.js`.

  "Hari ini" ikut jadi reaktif (`hariIniWib`, denyut 60 detik). Dulu `todayJakarta()` terbawa
  tiap render; sebagai computed ia akan menahan tanggal kemarin pada layar yang ditinggal
  terbuka melewati tengah malam — sel hari yang baru lewat tak berhuruf 'A' dan tak bisa
  diklik. Sengaja **bukan** `useClock` (berdetak tiap detik = matriks dirakit ulang tiap
  detik); menetapkan nilai yang sama ke ref tak memicu apa pun, jadi denyut ini benar-benar
  menyentuh matriks satu kali sehari.

  **(2) Setiap penyimpanan menarik ulang SELURUH tabel absensi.** `useAbsensi` memanggil
  `subscribeColl('absensi_shift_guru', …)` **tanpa penyaring**. Realtime di repo ini memang
  menarik ulang set penuh tiap ada perubahan (cermin `onSnapshot`; lihat `RT_DEBOUNCE_MS`), dan
  `_pageAll` mengambilnya **1.000 baris per permintaan, berurutan**. Dengan ±200 baris per
  hari-kerja, satu bulan ≈5.000 baris — riwayat sejak Mei 2026 karena itu puluhan ribu baris,
  alias puluhan bolak-balik jaringan **setiap kali satu sel dibetulkan**, di **semua** perangkat
  yang sedang membuka halaman itu.

  `useAbsensi` sekarang menerima **jendela tanggal** (`opts.jendela`, sebuah getter). Tak diberi
  = perilaku lama persis, jadi pemanggil lain tak berubah diam-diam. `AbsensiGuruView` memberi
  gabungan **bulan terpilih ∪ minggu rekap** lewat `gabungRentang()` baru di
  `utils/absensiRekap` (+ 9 tes) — rentang mingguan ikut disertakan walau modenya sedang
  'bulanan', supaya berpindah mode tak perlu menarik data lagi.
  ⚠️ Kalau jendela ini keliru menyempit, **rekap per-lembaga mingguan diam-diam jadi NOL**:
  tak ada galat, tak ada baris merah, cuma angka yang salah. Itulah yang dijaga
  `tests/unit/gabungRentang.test.js`.

  `useAbsensi` juga berhenti mem-`ensure('santri')`. Layar absensi guru tak menyentuh satu baris
  santri pun, tapi ensure itu membuat siapa pun yang membuka Absensi Guru lebih dulu ikut
  menarik SELURUH tabel santri sebelum layarnya sempat tampil.

- **Kolom `periode` di `absensi_shift_guru` tak lagi bolong pada tiga jalur tulis** (v.1.4.0).
  `periode` ('YYYY-MM') adalah kolom **riil** dan bagian dari index `(guru_id, periode)`, tapi
  hanya diisi oleh sinkron fingerprint, izin, materialisasi gabungan, dan rederive shift.
  **Tidak** diisi oleh: perbaikan manual (`payloadPerbaikanAbsen`), Input Harian (`saveHarian`),
  dan impor Excel fingerprint. Ketiganya kini mengisinya.

  Ini ditemukan justru karena index itu tampak seperti jalan pintas yang benar untuk jendela
  bulanan di atas — dan bukan: menyaring dengan `periode` akan **MEMBUANG baris tanpa suara**.
  Karena itu jendelanya memakai `tanggal` (di dalam `data` jsonb) sampai baris lama ditambal.

  ⚠️ **Baris LAMA masih kosong.** Backfill sekali jalan (aman, idempoten, tak menyentuh angka
  apa pun) — jalankan lewat SQL Editor kalau suatu saat index itu mau dipakai:

  ```sql
  update public.absensi_shift_guru
     set periode = substring(data->>'tanggal' from 1 for 7)
   where periode is null
     and data->>'tanggal' ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';
  ```

  Sengaja **tidak** dijadikan migrasi supaya rilis ini tetap frontend murni.

---

## [v.1.3.9] — 2026-09-02 — Penerbitan ulang artefak (isi sama dengan v.1.3.8)

**TIDAK ADA perubahan fungsional.** Ini kenaikan versi murni supaya artefak native bisa
diunggah ulang membawa kode web terbaru: **AAB vc139** dan **Electron 1.3.9**. Seluruh isinya
sudah diuraikan di v.1.3.8 di bawah — jangan dicari perubahan baru di sini, memang tak ada.

⚠️ **Tanpa migrasi DB, tanpa edge function.** Migrasi `20260902120000_arsip_prestasi_bulanan`
sudah dijalankan pada v.1.3.8 (2 Sep) dan **tidak perlu diulang**.

⚠️ Yang perlu diperiksa sekali, dan tak ikut naik versi: **jadwal pg_cron
`arsip-prestasi-bulanan`**. Ia dipasang manual, bukan lewat migrasi — kalau terlewat, fungsi
arsip tanggal 25 ada tapi tak pernah jalan, dan baru ketahuan sebulan kemudian.
Cek: `select jobname, schedule, active from cron.job where jobname = 'arsip-prestasi-bulanan';`

Komentar kode untuk pekerjaan 1–2 Sep sengaja TETAP ber-tag `v.1.3.8` — itu versi saat
pekerjaannya benar-benar dilakukan, dan menggesernya akan mengaburkan jejaknya.

---

## [v.1.3.8] — 2026-09-01 — Jadwal hari mengajar per guru (alpa palsu + bisyaroh guru paruh-waktu)

⚠️ **URUTAN DEPLOY — dua langkah** (berubah 2 Sep: rilis ini TAK lagi frontend murni):

1. `npx supabase db push` — **satu migrasi baru** (`20260902120000_arsip_prestasi_bulanan`,
   fungsi arsip+kosongkan prestasi tanggal 25). Tanpa edge function.
2. Deploy web dari **direktori utama** (butuh `vue-app/.env.local`), lalu **AAB vc138** dan
   **Electron 1.3.8**.

⚠️ **Jadwal cron-nya TIDAK ikut migrasi** — dipasang manual sekali lewat SQL Editor, sama
seperti `cleanup-audit-log-daily`. Perintahnya di `docs/SUPABASE-EDGE-FUNCTIONS-DEPLOY.md`.
Tanpa langkah itu fungsinya ada tapi tak pernah jalan.

Field `guru.data.hari_shift` (jadwal hari mengajar) tetap tanpa migrasi — menumpang kolom
`data` jsonb yang sudah ada.

⚠️ Rilis ini **memuat juga gelombang kedua v.1.3.7** yang belum sempat tayang (pratinjau slip
bisyaroh, rekap prestasi bulanan, glondongan simpan/selesai, libur ber-lembaga di absensi).
Prasyarat kolom **"Khusus Lembaga"** dan penyaring **L/P** di catatan v.1.3.7 di bawah karena
itu **tetap berlaku** — baca dua peringatan itu sebelum menyimpulkan ada yang tak jalan.

⚠️ **Nominal slip guru paruh-waktu akan NAIK** begitu Jadwal Hari-nya diisi (lihat di bawah).
Buka **Bisyaroh › Pratinjau** sebelum Bulk Generate supaya selisihnya terlihat lebih dulu.

### Fixed

- **Kartu "Guru Belum Input" menagih bulan yang benar, lembaga yang benar, lewat penanda yang
  benar** (v.1.3.8). Kyai, 1 Sep 2026: "dashbor guru yg belum input/rekap data masih pakai yg
  lama (TPQ-Pra PTPT) masih terbaca. harusnya rekap prestasi hanya untuk PTPT dan PPPH" —
  lalu, yang menyingkap masalah sebenarnya: "rekap prestasi itu adalah hasil dari bulan lalu,
  dan mengisinya adalah bulan lalu. misal sekarang september yg diisi adalah bulan agustus …
  maksimal pengisian paling lambat tgl 5 setiap awal bulan."

  Kartu itu ternyata salah di **tiga** lapis sekaligus, dan gabungannya membuat angkanya
  nyaris tak bermakna:
  1. **Periodenya bulan BERJALAN.** Tiap tanggal 1, seluruh guru serentak dinyatakan "belum
     input" untuk bulan yang memang belum boleh diisi siapa pun — sementara pekerjaan yang
     sungguh jatuh tempo (bulan lalu, batas tanggal 5) tak terpantau sama sekali.
  2. **Cakupannya semua lembaga ngaji.** Rekap prestasi bulanan hanya milik PTPT & PPPH sejak
     v.1.2.3, jadi guru TPQ Pagi/Sore & Pra PTPT ikut tertagih tanpa dasar.
  3. **Penandanya `catatan_bulanan`** — yang hanya ditulis Input Bulanan. RekapPrestasiView,
     justru layar yang dipakai PTPT & PPPH, **tak pernah menulisnya**; guru yang sudah rapi
     mengisi di sana tetap tercantum "belum input" selamanya.

  Sekarang: periode = bulan lalu, cakupan = PTPT & PPPH, penanda = snapshot
  `riwayat_prestasi` (`catatan_bulanan` tetap diterima sebagai penanda kedua — Input Bulanan
  baru menulis snapshot sejak v.1.3.8, dan menagih ulang pekerjaan yang sudah dikerjakan lebih
  buruk daripada melewatkan satu-dua yang belum). Kartu & halaman detailnya kini menampilkan
  batas "5 September" dan berubah merah bila lewat. Daftar `['PTPT','PPPH']` naik ke
  `utils/prestasiBulanan` supaya RekapPrestasiView dan kartu dasbor memakai satu daftar yang
  sama — dua salinan yang bisa berbeda persis itulah asal keluhan pertama Kyai.

  Judulnya ikut diperbaiki jadi **"Guru Belum Isi Rekap Prestasi"**; "Belum Input Data Santri"
  membuatnya tertukar dengan Input Bulanan, yang cakupannya memang lain.

  **Susulan 2 Sep 2026** — Kyai memperjelas ujung AWAL jendelanya: "rekap prestasi itu diisi
  akhir bulan sampai tgl 5 awal bulan … guru mengisi rekap mulai tgl 29 agustus-5 sept, isinya
  data dari agustus." Jendelanya karena itu MENYEBERANGI pergantian bulan, dan aturan
  "selalu bulan lalu" salah di ujung itu: tanggal 29–31 Agustus yang dikerjakan **Agustus**,
  bukan Juli. Sekarang: tanggal ≥ 29 → bulan berjalan, tanggal 1–28 → bulan lalu. Tanggal
  bukanya dijepit ke hari terakhir bulan — tanpa itu **Februari 28 hari tak pernah membuka
  jendelanya** dan rekapnya diam-diam terlewat setahun sekali.

- **Daftar "belum isi rekap" tak lagi memecah guru sepasang** (v.1.3.8). Kyai, 2 Sep 2026:
  "untuk guru yg sepasang jangan dipisah daftarnya." Daftarnya dulu satu baris per NAMA, jadi
  satu kelas berpasangan muncul **dua kali dengan daftar santri yang sama persis** — terbaca
  seolah dua guru berbeda yang lalai, dan jumlahnya ikut dobel. Di data sungguhan angkanya
  turun dari _27 guru · 186 santri_ menjadi _19 guru · 120 santri_. Pengelompokannya
  diturunkan dari `utils/pasanganGuru` — sumber yang sama dengan dropdown kenaikan kelas,
  termasuk asumsi "field `guru` lama = guru pagi" — supaya tak jadi salinan aturan ketiga.
  Label daftar sengaja TANPA akhiran "(pagi)"/"(sore)" seperti di dropdown: PTPT & PPPH satu
  guru per santri, jadi akhiran itu akan muncul di hampir semua baris tanpa pernah ada
  pasangannya.

### Added

- **Papan peringkat prestasi dikosongkan otomatis tiap tanggal 25** (v.1.3.8). Kyai, 2 Sep 2026:
  "untuk top rangking prestasi santri setiap tgl 25 setiap bulan dikosongi bisa ya, tapi riwayat
  yg bulan lalu tetap ada" — lalu, memilih cara kerjanya: "otomatis dari server saja yg penting
  data bulan lalu masuk riwayat. ini khusus rekap prestasi ya."

  Fungsi DB `arsip_prestasi_bulanan()` + jadwal pg_cron. **Di server, bukan di aplikasi**: kalau
  dijalankan aplikasi, ia hanya terjadi bila ada yang KEBETULAN membuka aplikasi pada tanggal 25
  — dan siapa pun yang membukanya bisa memicu penghapusan massal.

  Urutannya tak boleh dibalik, dan itulah inti keamanannya: **(1) arsip** angka baris santri ke
  `riwayat_prestasi` bulan lalu (riwayat yang sudah berangka TIDAK PERNAH ditimpa), lalu
  **(2) kosongkan — hanya untuk santri yang bulan lalunya sudah ada di riwayat.** Syarat pada
  langkah 2 itu yang membuat janji Kyai bukan sekadar harapan: santri yang gagal terarsip tidak
  ikut dikosongkan, angkanya tetap utuh untuk dibereskan manusia. Hasilnya dicatat ke
  `audit_log`, dan `tersisa_tak_dikosongkan` melaporkan berapa yang sengaja dilewati.

  Cakupan **PTPT & PPPH** saja (arti "khusus rekap prestasi"), dan hanya santri **aktif** —
  angka alumni adalah catatan sejarah, bukan papan peringkat yang perlu direset.

  Syarat "tanggal 25" dijaga **di dalam fungsinya** memakai tanggal WIB, bukan di ekspresi cron;
  cron Supabase berjalan UTC, dan beda 7 jam itu akan jadi salah-hari yang senyap. Batas jujur
  yang perlu diketahui: baris santri tak menyimpan bulan, jadi bulan sasaran **diturunkan** (=
  bulan lalu) — benar untuk angka siklus kemarin, bisa meleset untuk angka basi. Karena itu
  baris hasilnya ditandai `"sumber": "arsip_otomatis"` dan tak pernah menyamar sebagai isian guru.

  Mematikan: `select cron.unschedule('arsip-prestasi-bulanan');`
  Uji tanpa menunggu tanggal 25: `select public.arsip_prestasi_bulanan(true);`

- **Penambalan riwayat bulanan** (v.1.3.8). Kyai berencana mengosongkan angka prestasi di data
  santri tiap tanggal 25, lalu bertanya: "riwayat yg bulan lalu masih ada kan ya?" Jawabannya
  aman **hanya** untuk bulan yang sudah bersnapshot — dan Input Bulanan tak pernah menulis
  snapshot sampai v.1.3.8. Tombol **Periksa Riwayat Bulanan** (super admin, di Rekap Prestasi)
  memeriksa seluruh santri lebih dulu: berapa yang sudah aman, berapa yang angkanya akan hilang
  selamanya, dan berapa yang bisa ditambal otomatis. Tak ada yang tersimpan sampai Terapkan
  ditekan, dan riwayat yang sudah berangka tak pernah ditimpa.

  Rancangan pertamanya **keliru dan data sungguhan yang membetulkannya**: ia memakai
  `catatan_bulanan` sebagai satu-satunya penentu bulan, sehingga 237 santri dilaporkan "tak ada
  bulannya" — padahal `RekapPrestasiView` menulis `riwayat_prestasi` **tanpa** menulis
  `catatan_bulanan`, jadi justru merekalah yang riwayatnya paling lengkap. Pertanyaan yang
  ditanyakan diperbaiki dari "angka ini milik bulan apa" menjadi "kalau kolom ini dikosongkan,
  ada yang hilang selamanya atau tidak". Hasil sesungguhnya: **233 sudah aman, 4 terancam,
  0 perlu ditambal.**

- **Ekspor PDF daftar guru yang belum mengisi rekap** (v.1.3.8). Kyai, 2 Sep 2026: "untuk guru
  yg belum input/rekap data bisa saya ekspor pdf, untuk dishare siapa saja yg belum isi data."
  Tombol **Ekspor PDF** di halaman Guru Belum Isi Rekap Prestasi, berkop resmi pondok, memuat
  periode + tenggat di judulnya. Isinya **satu baris per santri** (No, Guru, Santri, Lembaga,
  Kelas), bukan satu baris per guru: yang ditanya penerima pesan selalu "santri saya yang
  mana", dan daftar nama di dalam satu sel akan terpotong begitu jumlahnya belasan. Nama guru
  sengaja diulang tiap baris supaya potongan tangkapan layar mana pun tetap terbaca sendiri.

- **Guru yang tak mengajar tiap hari tak lagi dianggap alpa — dan bisyarohnya tak lagi
  terpotong** (v.1.3.8). Kyai, 1 Sep 2026: "di satu lembaga ada guru yang masuk tiap hari dan
  ada yang cuma 3 hari, saat ini tidak ada tempat mengaturnya. Jadi guru yg mengajarnya tidak
  full senin-sabtu terhitung punya alpa banyak." Benar: pertanyaan "tanggal ini hari kerja bagi
  guru ini?" selama ini dijawab **tanpa menengok gurunya sama sekali** — hanya Ahad + Kalender
  Kegiatan — sehingga "hari kerja" selalu berarti hari kerja LEMBAGA. Guru 3 hari/pekan karena
  itu memanen ±12 alpa palsu tiap bulan di Rekap Unit, matriks bulanan, ekspor Excel/PDF, dan
  di kartu kehadirannya sendiri (menu Personal).

  Yang tak terlihat dari layar absensi: **penyebut uang memakai definisi yang sama**, jadi tiga
  cara hitung ikut meleset. (1) `× JP diajar` — JP/minggu dibagi ke hari aktif lembaga, guru 12
  JP yang masuk 3 hari dihitung 2 JP × 3 hari = 6 JP, **dibayar separuh**. (2) `JP bulanan
prorata` — penyebut "JP terjadwal" kebanyakan. (3) `Bonus tepat waktu` (flat ber-ambang) —
  persen hadir diukur terhadap hari efektif lembaga, guru 3 hari mentok ±50% sehingga ambang
  100% **tak pernah tercapai dan bonusnya tak pernah cair**. Yang sejak dulu aman: `× kehadiran`,
  `× tepat waktu`, dan `per shift` — ketiganya menghitung baris hadir yang benar-benar ada.

  Sekarang ada **Form Guru › Jadwal Hari**: per shift yang dicentang, nyalakan "Hari tertentu
  saja" lalu matikan hari yang tak diajar. Per SHIFT, bukan per guru — guru yang sekolahnya
  Senin–Sabtu tapi ngajinya 3 hari butuh dua jadwal berbeda, dan absensi memang dihitung per
  (guru × shift). Tersimpan di `guru.data.hari_shift` (tanpa migrasi). Satu fungsi murni baru,
  `utils/jadwalGuru`, dipakai bersama enam titik penghitung tadi supaya definisi "hari kerja
  guru ini" cuma ada di satu tempat.

  ⚠️ **Nominal slip guru paruh-waktu akan NAIK** setelah jadwalnya diisi — Kyai menegaskan
  JP/minggu yang sudah diatur memang JP sepekan yang sebenarnya, jadi yang selama ini keliru
  hanyalah pembaginya: 12 ÷ 3 hari = 4 JP/hari × 3 hari hadir = 12 JP utuh, bukan 6.

  Yang **sengaja tidak berubah**: guru tanpa jadwal khusus (mayoritas, yang memang full
  Senin–Sabtu) tak bergeser satu angka pun — daftar hari yang kosong dibaca "belum diatur",
  bukan "tak pernah masuk". Hari di luar jadwal yang ternyata **ada** baris absensinya tetap
  dihitung hadir: yang digugurkan hanya hukumannya, bukan tanggalnya, supaya guru yang datang
  di luar jadwal tak kehilangan bisyaroh `× kehadiran`-nya. Di matriks bulanan hari seperti itu
  bertanda `·` abu-abu, dibedakan dari `L` (libur lembaga).

---

## [v.1.3.7] — 2026-08-31 — Total ekspor ikut filter + potongan ber-scope + libur sekolah + glondongan

⚠️ **URUTAN DEPLOY — dua langkah:**

1. `npx supabase db push` — **satu migrasi baru** (`20260831120000_santri_upd_kepala_lembaga`,
   hak simpan akun guru). **WAJIB DULUAN**: tanpa ini kepala/PJ lembaga tetap bertemu pesan
   "ditolak RLS" walau webnya sudah baru. Tanpa edge function.
2. Deploy web dari **direktori utama** (butuh `vue-app/.env.local`), lalu **AAB vc137** dan
   **Electron 1.3.7**.

⚠️ **Prasyarat yang mudah terlupa:** penyaring **L/P** pada Jenis Bisyaroh/Tunjangan/Potongan
membaca kolom **JK** di data guru. Guru yang kolom itu masih kosong TIDAK akan terkena jenis
yang memakai penyaring tsb — sengaja, supaya tak ada uang terbit atau terpotong atas data yang
tak ada. Periksa Data Guru sebelum memakai penyaring ini.

⚠️ **Prasyarat kedua:** perbaikan libur absensi di bawah membaca "shift ini milik lembaga apa"
dari kolom **"Khusus Lembaga"** shift (Pengaturan › Master Shift) atau dari field **Lembaga
Sekolah** guru. Shift sekolah **buatan sendiri** (id-nya bukan `sekolah`) yang kolom "Khusus
Lembaga"-nya masih kosong tetap tak dikenali sebagai shift sekolah — tak ada satu pun data yang
menyebutnya begitu. Isi salah satu dari keduanya sebelum menyimpulkan perbaikannya tak jalan.

### Fixed

- **Rekap prestasi bulanan tak lagi membawa angka bulan lalu** (v.1.3.7). Kyai, 31 Agu 2026:
  "kenapa tidak tereset setiap bulan, bulan agustus masih terinput rekapan bulan lalu. harusnya
  kosong." Angka prestasi hidup di dua tempat dengan arti berbeda: `santri.prestasi_awal/akhir/
total` — SATU set per santri, tanpa dimensi bulan, isinya "angka terakhir yang pernah
  disimpan" — dan `riwayat_prestasi` (`rp_<santriId>_<YYYY-MM>`), snapshot per bulan yang sudah
  ada sejak v.100d tapi **tak pernah dibaca balik**. Kedua layar bulanan mengisi dirinya dari
  yang pertama, jadi memilih bulan lain tak mengubah apa pun — dan angka bulan lalu muncul
  sebagai **isian**, bukan sekadar tampilan: sekali ditekan Simpan, angka Juli resmi jadi angka
  Agustus. Statistik "sudah dinilai" ikut berbohong, bulan yang belum disentuh siapa pun
  terhitung sudah dinilai. Sekarang sumbernya snapshot bulan terpilih (`utils/prestasiBulanan`);
  belum ada → **kosong**. Yang **tidak** ikut dikosongkan: **Juz & Kelas** — itu keadaan
  berjalan, bukan ukuran bulanan; santri tak kembali ke Juz 1 tiap tanggal 1. Sebagai ganti
  angka yang hilang dari kotak isian, angka bulan lalu tampil sebagai **placeholder abu-abu**
  (untuk PTPT, "Awal" memakai "Akhir" bulan lalu) — petunjuk yang tak ikut tersimpan dan tak
  ikut dihitung. Dua penjaga menyertainya: menyunting bulan **lampau** tak lagi mencerminkan
  angkanya ke baris santri (mengoreksi Juni di bulan Agustus tak boleh memundurkan angka
  berjalan), dan Input Bulanan hanya mencerminkan isian yang **tidak kosong** — sejak formnya
  mulai kosong tiap bulan, menyimpan perubahan catatan saja akan menghapus angka terakhir
  santri kalau kolom prestasinya ikut ditulis apa adanya. **Input Bulanan kini ikut menulis
  snapshot bulanannya** — dulu ia hanya menimpa baris santri, sehingga angka yang diinput guru
  di sana tak pernah menjadi milik bulan mana pun; itulah sebabnya ia otomatis "muncul lagi"
  bulan berikutnya. ⚠️ Bulan-bulan lampau yang snapshot-nya memang tak pernah tertulis akan
  tampak kosong di grid; angkanya tak hilang — ia tetap ada di baris santri dan di submenu
  Riwayat.
- **Akun guru: pesan galat "ditolak RLS" saat menyimpan Input Bulanan** (v.1.3.7). Lanjutan
  langsung dari tambalan "daftar santri kosong" di bawah, dan sekaligus akibatnya: tambalan itu
  melebarkan **apa yang terlihat**, tapi **apa yang boleh disimpan** tertinggal di database.
  Input Bulanan menulis LANGSUNG ke tabel `santri`, sedangkan UPDATE tabel itu hanya punya
  `santri_upd_manage` (admin), `santri_upd_self`, `santri_upd_pengampu`, dan `santri_upd_pj_ptpt`.
  Dua celah yang tersisa dan dua-duanya berakhir sebagai galat di layar guru: **(1) kepala/PJ
  lembaga** — `headsLembaga()` membuat mereka melihat santri lembaganya, sementara
  `auth_is_pengampu` tak mengenal jabatan sama sekali; **(2) `guru_sekolah` yang tersimpan
  sebagai TEKS tunggal** (baris lama) — diterima `ownsSekolah()` di UI, dibuang policy-nya yang
  hanya mengenal larik. Yang kedua murni bug: aturannya memang sama, SQL-nya saja yang gagal
  pada data lama. Ditanyakan ke Kyai 31 Agu 2026 dan diputuskan **melebarkan izin DB** (bukan
  menyembunyikan lagi daftarnya), mengikuti pola `santri_upd_pj_ptpt` 4 Agu: kebijakan baru
  MENCERMINKAN gerbang UI. ⚠️ Grainnya **baris, bukan kolom** — sama seperti seluruh kebijakan
  santri lain — jadi kepala/PJ lembaga secara teknis bisa menyunting field santri lembaganya
  yang lain (mis. lewat Kenaikan), bukan cuma kolom Input Bulanan. Peta "lembaga → kelompok"
  yang mau tak mau tersalin ke SQL dijaga `tests/unit/lembagaKelompokCermin.test.js`: menambah
  lembaga di `LEMBAGA_GROUPS` tanpa menyunting migrasinya membuat tes MERAH, bukan membuat
  seorang kepala lembaga bertemu "ditolak RLS" berbulan-bulan kemudian.
- **Guru "sekolah + ngaji" tak lagi dituduh alpa saat sekolahnya libur** (v.1.3.7). Kyai,
  31 Agu 2026: "guru yg ngajar sekolah dan ngaji, padahal sekolahnya libur, tapi ngajinya masuk.
  tapi guru itu di absensi bulanannya masih terhitung absen sekolahnya." Libur kalender sudah
  ber-scope lembaga sejak v.1.2.3, dan form Kalender Kegiatan sendiri menjanjikan _"pilih mis.
  'Sekolah' bila sekolah libur tapi ngaji tetap masuk"_. Yang belum benar sisi seberangnya:
  pertanyaan "sel absensi (guru × shift) ini milik lembaga apa?" dijawab **tebakan hardcoded** di
  dalam view — `shift === 'sekolah' ? lembaga_sekolah || lembaga : lembaga || lembaga_sekolah`.
  Tebakan itu meleset dua arah dan dua-duanya diam: (a) guru yang field **Lembaga Sekolah**-nya
  kosong membuat shift SEKOLAH-nya memakai lembaga **NGAJI**, sehingga libur sekolah tak
  mengenainya (→ alpa palsu, keluhan Kyai) sementara libur ngaji justru membebaskannya (→ alpa
  yang malah hilang); (b) shift sekolah **buatan sendiri** (mis. "SDI Pagi") tak pernah dikenali
  sebagai shift sekolah sama sekali. Aturannya kini satu, di `utils/lembagaShift`, dan sumbernya
  **deklarasi** bukan tebakan: kolom "Khusus Lembaga" milik shift — field yang sama yang sudah
  dipakai BisyarohView memilih shift kehadiran per lembaga. Saling-jatuh antar-field dibuang:
  shift sekolah tak boleh meminjam lembaga ngaji, dan sebaliknya. Bila sekolah persisnya memang
  belum terdata, sel itu turun ke label kelompok **"Sekolah"** — libur yang ditandai "Sekolah"
  tetap mengenainya, libur yang ditandai khusus "SDI" tidak (menebak sekolah mana = membebaskan
  atau meng-alpa-kan orang atas data yang tak ada). Salinan aturan yang sama di **Personal**
  (KPI kehadiran pribadi guru) ikut disatukan ke sumber itu — dulu ia salah dengan cara persis
  sama, jadi angka Alpa di dua layar bisa berbeda dari sebab yang sama.
- **Ekspor Buku Induk: baris TOTAL hanya periode yang difilter** (v.1.3.7). Kyai, 31 Agu 2026:
  "pastikan hasil ekspor nominal totalnya hanya hari itu (atau sesuai yg difilter), bukan diambil
  dari semua buku induk yg akhirnya terhitung minus." Tambalan 6 Agu (saldo ikut penyaring) dan
  14 Agu (harian mulai nol) masih menyisakan periode **bulanan/tahunan** memakai SALDO AWAL
  kumulatif, sehingga baris TOTAL bisa minus gara-gara transaksi di luar periode. Sekarang satu
  aturan untuk semua periode: kolom Saldo selalu **mulai nol** pada baris pertama yang tercetak,
  dan baris TOTAL = masuk − keluar periode itu. Posisi kas kumulatif tidak dibuang — ia turun jadi
  dua baris keterangan di bawah TOTAL (`INFO — SALDO KAS SEBELUM/SETELAH <periode>`), dihitung dari
  ledger tersaring tanpa batas periode, jadi janji 6 Agu ("saldo total jika diekspor semuanya tanpa
  filter") tetap terpenuhi. Berlaku serentak untuk PDF, Excel, dan Google Sheet — ketiganya lewat
  `buildExportRows`. Kartu saldo di layar disusun ulang mengikuti urutan baca kertasnya.
- **"Usia Masuk" santri salah hitung** (v.1.3.7). Kyai: "perhitungan usia masuk tidak sesuai jika
  dihitung dari tgl lahir (tidak akurat)." `composables/useSantriForm.js` menyimpan salinan rumus
  umurnya sendiri, dan salinan itu mengisi bulan dengan **bulan tanggal acuan apa adanya**
  (`m = r.getMonth()`) alih-alih selisih bulan, tanpa koreksi tanggal — santri lahir 20 Nov 2015
  yang masuk 5 Jul 2020 tercatat "5 thn 6 bln", padahal 4th 7bln; tanggal masuk bulan Januari
  selalu berbunyi "0 bln". Salinan itu dihapus; form kini memakai `utils/usia` (`usiaKini` /
  `usiaPada`), satu-satunya rumus umur di aplikasi — bebas geser zona waktu dan menerima format
  lama `DD/MM/YYYY`. Kolom usia di **Input Bulanan** juga dihitung hidup dari `tgl_lahir`, bukan
  dari kolom `usia` simpanan yang membeku di tahun santri terakhir disunting.
- **Akun guru: daftar santri kosong di Input Nilai & Absensi** (v.1.3.7). Aturan "santri ampuan
  guru" ternyata disalin di empat berkas dan salinannya sudah berpisah diam-diam:
  **Input Bulanan** tak pernah memeriksa `guru_sekolah[]` (wali kelas sekolah melihat daftar
  kosong), tak mengenali kepala/PJ lembaga, memakai `sesi.nama` saja alih-alih
  `sesi.guru || sesi.nama`, dan sisanya mencocokkan `guru_id`/`guru_pagi_id`/`guru_sore_id` —
  field yang memang tak pernah ada di baris santri; **Rekap Diniyah** memakai `Array.includes`
  yang peka huruf besar dan hanya jalan bila `guru_sekolah` berbentuk larik; **Absensi Santri**
  menganggap `guru_sekolah` selalu larik, sehingga baris lama yang menyimpannya sebagai teks
  tunggal ikut hilang. Ketiganya kini memakai `utils/guruScope` (`ownsNgaji`, `ownsSekolah`,
  `headsLembaga`) — sumber tunggal yang sama dengan `useSantri` dan policy RLS
  `santri_upd_pengampu`, sehingga "yang kelihatan = yang boleh disimpan".

### Added

- **Impor Tunjangan/Potongan bulanan kini ditinjau dulu, dan pratinjau berhenti salah
  menamai potongan impor** (v.1.3.7). Kyai, 31 Agu 2026: "impor potongan juga ada pratinjau
  dulu. dan itu perbaiki saya input potongan tapi dihitung tunjangan." **Potongannya sebenarnya
  sudah benar** — dibuktikan angkanya sendiri: slip tersimpan lebih KECIL persis sebesar
  nominal impor (Hj. Nujumun Nada Rp1.403.000 → Rp1.043.000 atas potongan Rp360.000). Yang
  salah pratinjau yang baru dipasang di atas: ia menghitung ulang **tanpa** penyesuaian
  bulanan, lalu melaporkan bedanya sebagai _"Nominal berubah **+**Rp360.000"_ — tanda plus
  yang wajar dibaca "potongan saya jadi tambahan". Sekarang pratinjau MENGENALI penyesuaian
  per bulan yang menempel di slip tersimpan (baris impor baru ikut ditandai `sumber:'bulanan'`;
  baris lama dikenali lewat label yang bukan milik jenis ber-scope), dan menamainya apa
  adanya: **"Penyesuaian bulanan akan hilang · potongan Rp360.000"**, plus rincian per baris
  saat dibentangkan dan satu spanduk ringkas di atas daftar. Ini sekaligus mengungkap bahaya
  yang selama ini tak terlihat: **Bulk Generate memang menghapus penyesuaian bulanan** karena
  ia menghitung ulang dari jenis ber-scope saja — kalau slip di-generate ulang, potongan hasil
  impor lenyap dan take home naik kembali. Sisa selisih yang BUKAN karena penyesuaian tetap
  dinamai "Nominal berubah", jadi dua sebab yang berbeda tak lagi tercampur. **Impor Excel-nya
  sendiri kini bertahap**: tombolnya berbunyi "Impor (tinjau dulu)" — berkas dibaca &
  dihitung, hasilnya tampil per guru (nominal yang Kyai ketik, take home hasilnya, dan siapa
  yang namanya tak cocok), baru tombol **Terapkan**. `confirm()` bawaan peramban yang cuma
  menyebut jumlah baris diganti; pratinjau & penerapan memakai satu fungsi `extraImpor` yang
  sama supaya keduanya mustahil menghitung beda.
- **Pratinjau slip bisyaroh sebelum di-generate** (v.1.3.7). Kyai: "untuk bisyaroh saya ingin
  ada simulasi/review per bulan, misal bulan ini dan sudah tertera potongannya dll. sebelum
  generate slip agar bisa koreksi." Sub-tab **Simulasi** yang sudah ada menjawab pertanyaan
  lain — ia alat coba-coba TARIF dengan andaian semua hadir penuh, untuk menyusun anggaran.
  Yang ini kebalikannya: angka **sungguhan** bulan terpilih (kehadiran, tunjangan, glondongan,
  potongan apa adanya), muncul sebagai tombol **"Tinjau Dulu"** tepat di atas tombol Generate.
  Sumber angkanya `buildSlipPayload` — fungsi yang SAMA yang dipakai Generate — jadi yang
  ditinjau memang yang akan tersimpan; tak satu baris pun ditulis ke `keuangan_gaji`. Tiap guru
  bisa dibentangkan untuk melihat rincian line item & potongannya, dan ada **rekap potongan per
  jenis** (berapa orang kena, berapa totalnya, siapa saja) — bentuk tercepat melihat scope yang
  meleset, yang justru alasan Potongan sengaja ditahan flat 31 Agu 2026. Empat penanda otomatis,
  terurut dari yang menyangkut uang yang sudah keluar: **Sudah dicairkan** (generate ulang
  mengubah nominal yang sudah dibayar sementara catatan kas keluar di Buku Induk tetap angka
  lama), **Potongan ≥ bisyaroh**, **Tak dapat bisyaroh** (biasanya scope belum cocok atau kolom
  JK masih kosong), dan **Nominal berubah** beserta selisihnya terhadap slip tersimpan.
  Pratinjau ditandai basi begitu periodenya berganti, dan dibuang setelah Generate benar-benar
  dijalankan.
- **Nilai glondongan bisa disimpan dulu, "Selesai" jadi tombol tersendiri** (v.1.3.7). Kyai:
  "input nilai glondongan ada fitur simpan (artinya tidak langsung terkirim) jadi tambah tombol
  baru misal 'Selesai' yg berarti sudah diinput semua." Satu-satunya tombol sebelumnya adalah
  **"Simpan & Selesai"** — sekali diklik, baris langsung berstatus `selesai`. Padahal satu blok
  glondongan = 5 juz × 4 aspek yang disimak beberapa kali duduk; penyimak yang baru menilai dua
  juz tak punya tempat menaruh angkanya selain kertas, dan hilang begitu aplikasi tertutup.
  Sekarang **Simpan** menulis angka & catatan apa adanya **tanpa menyentuh status** (blok tetap
  di "Tugas Menilai Saya", diberi chip _"Tersimpan, belum dikirim"_), dan **Selesai** yang
  menutup blok. Draft tak bisa bocor jadi apa pun: gerbang PJ, Rekap Penyimak, dan bisyaroh
  glondongan semuanya mensyaratkan status `selesai`, sedangkan "penyimak sedang sibuk"
  mensyaratkan `ditugaskan` — ketiganya diuji (`tests/unit/draftGlondongan.test.js`). Menekan
  **Selesai** saat masih ada juz yang belum lengkap tetap boleh, tapi memunculkan konfirmasi yang
  menyebut juz mana — sebab sesudah itu blok keluar dari daftar tugas dan giliran blok berikutnya
  terbuka.
- **No WA wali santri di kartu tugas penyimak glondongan** (v.1.3.7). Kyai: "no wa wali muncul di
  guru penyimak glondongan." Ini melunasi sisa permintaan 21 Jul 2026 — _"no WA penyimak, guru
  kelas, dan santri"_ — yang dulu dikerjakan dua pertiganya saja. Selama ini penyimak yang mau
  menjadwalkan simakan harus menitip pesan lewat guru kelas, padahal yang mengantar santri datang
  adalah walinya. Tombol WA-nya membawa teks siap-pakai (`pesanWaliGlondongan` di
  `utils/pesanWa`, satu tempat kalau Kyai mau mengubah wording). Barisnya tetap tampil walau
  nomornya kosong, berbunyi "(no WA wali belum diisi)" — supaya yang terbaca "data walinya belum
  diisi", bukan "fiturnya tak jalan". Nomor cadangan `wa_2` sengaja tak ikut: seluruh aplikasi
  (tagihan, tes, prestasi) hanya memakai `wa`.
- **Jenis Potongan ber-scope + penyaring laki-laki/perempuan** (v.1.3.7). Kyai: "untuk potongan
  tambahkan filter seperti jenis bisyaroh dan tunjangan. dan tambahkan filter laki2 atau
  perempuan." `master_potongan` lama hanya {nama, nominal, guru_ids} — satu-satunya cara menyasar
  sekelompok orang adalah mencentang mereka satu per satu, dan daftar centang itu basi tiap ada
  guru masuk/keluar. Potongan kini memakai **mesin scope yang sama** dengan Jenis Bisyaroh &
  Tunjangan (jabatan, lembaga, shift, guru tertentu) di kunci baru `settings.keuPotonganJenis`,
  lengkap dengan kartu, dialog, dan Excel Template/Impor sendiri (kolom scope ikut, supaya impor
  balik tak memangkasnya diam-diam). Sengaja **flat per bulan saja**: potongan berkelipatan belum
  pernah diminta, dan salah scope pada sisi pengurang adalah kesalahan yang paling mahal.
  Selama kunci baru belum pernah disimpan, isinya diturunkan dari `master_potongan` lama sehingga
  slip tak berubah sebelum Pengaturan disentuh.
- **Penyaring jenis kelamin (L/P) pada scope jenis bisyaroh, tunjangan, dan potongan** (v.1.3.7).
  Kriteria `scope.jk` baru: kosong = tak menyaring; `['P']` = perempuan saja. Di-AND dengan
  kriteria lain, jadi "Potongan Seragam Putri" cukup satu baris. Guru yang kolom L/P-nya belum
  diisi **tidak** ikut saat penyaring ini dipakai — menebak jenis kelamin berarti memotong atau
  membayar uang atas data yang tak ada. Ikut tercetak di kolom tabel Jenis Bisyaroh dan di
  Excel Template/Impor kedua daftar.

---

## [v.1.3.6] — 2026-08-14 — Scope gedung admin keuangan + laporan harian mulai nol

⚠️ **URUTAN DEPLOY:** frontend murni — **tanpa migrasi DB, tanpa edge function**. Deploy web
dari **direktori utama** (butuh `vue-app/.env.local`), lalu **AAB vc136** dan **Electron 1.3.6**.
_Web sudah di-deploy Kyai 14 Agu sebelum bump ini; artefak Android/Electron menyusul._

### Fixed

- **Laporan Keuangan admin ber-gedung tak lagi minus.** Pemasukan sudah ter-scope gedung sejak
  v.111, tetapi pengeluarannya diambil dari **seluruh slip bisyaroh** — dan bisyaroh memang
  global tanpa dimensi gedung — sehingga Saldo Bersih selalu defisit. Untuk admin ber-gedung,
  pengeluaran kini dihitung dari baris **KELUAR di Buku Kas gedungnya** (buku induk ter-scope,
  tabungan dikecualikan); baris bisyaroh tak bertag gedung sehingga otomatis tak ikut.
  `keuangan_gaji` tak dilanggani sama sekali saat ter-scope. Super_admin tak berubah.
- **Grafik Arus Kas** (`AdminStatsCharts`) melanggani `keuangan_buku_induk` mentah; kini
  disaring `allowRow` seperti Buku Kas.
- **Tagihan & Pembayaran** ikut scope gedung: daftar santri, tagihan, pending transfer, dan
  riwayat pembayaran disaring lewat computed di atas ref mentah, jadi tak ada titik baca yang
  terlewat. Sesi tak ter-scope (super_admin, santri, wali) tak berubah.
- **Kartu Slip Bisyaroh** di kedua dasbor kini berketerangan "semua gedung"; angkanya sengaja
  tetap global karena bisyaroh dikelola pusat.

### Changed

- **Laporan harian Buku Induk = setoran hari itu.** Saat satu tanggal dipilih, ekspor melewatkan
  baris SALDO AWAL dan memulai saldo berjalan dari **nol**, sehingga baris TOTAL = masuk − keluar
  hari itu dan cocok dengan uang yang disetorkan. Berlaku untuk PDF, Excel, dan Google Sheet
  sekaligus (ketiganya lewat `buildExportRows`). Periode bulanan/tahunan **tidak berubah** — tetap
  kumulatif sesuai keputusan 6 Agu. Judul PDF berawalan "SETORAN HARIAN"; layar mode harian
  menampilkan "Setoran hari ini" dan menandai saldo kumulatif sebagai info yang tidak tercetak.

⚠️ **Prasyarat yang mudah terlupa:** scope gedung hanya hidup bila **akun admin punya field
Gedung** (Guru → "Gedung (scope Buku Kas)", hanya untuk `role_sistem=admin_keuangan`) **dan
santri punya field Gedung**. Bila kosong, `isGedungScoped` false → pengguna melihat semua gedung,
dengan gejala yang persis sama dengan bug di atas.

---

## [v.1.3.5] — 2026-08-12 — Tes Sekolah + login Google Android + tambalan audit

⚠️ **URUTAN DEPLOY:**

1. `supabase db push` — **dua migrasi baru** (`20260812120000` keamanan auth,
   `20260812130000` tabel `tes_sekolah`). _Sudah dijalankan 12 Agu._
2. **Supabase Dashboard → Auth → URL Configuration → Redirect URLs**: tambahkan
   `app.ammu.id://auth-callback`. **WAJIB**, kalau tidak login Google Android tetap mati.
3. Deploy web dari **direktori utama**, lalu **AAB vc135** dan **Electron 1.3.5**.

Untuk Android, unggah `AmmuOnline.apk` ke rilis GitHub **lebih dulu**, baru deploy web.

📄 Teks ringkas untuk badan rilis GitHub ada di **`RELEASE-NOTES.md`**.

### Added (Baru)

- **Tes Sekolah** — menu Tes Kenaikan kini punya dua sisi, `Qiraati | Sekolah`. Materi
  sekolah yang perlu diuji **guru tertentu** (ditunjuk admin per materi, bukan kepala
  sekolah). Wali kelas mengajukan santrinya lewat daftar bercentang persis seperti tab
  Ajukan Qiraati; guru penguji menilai antreannya. Hasil = nilai + Lulus/Belum + catatan.
  Saklar "Sekolah" **hanya muncul** untuk admin, guru penguji, atau wali kelas sekolah.
- **Master Materi Tes** — Master Data › Lembaga › Materi Tes (super_admin). Materi diikat
  ke lembaga sekolah + kelas, punya daftar penguji, nilai maksimal, dan batas lulus.
  **Daftarnya mulai kosong** — sebelum diisi, tak ada yang bisa diajukan.
- **Catatan Tes Sekolah di akun santri** — blok baru di Capaian Prestasi.
  Ammu tak punya rapor sekolah (rapor di sini hanya Qiraati & Diniyah), jadi inilah muara
  hasilnya di dalam aplikasi; nilai rapor sekolah tetap diinput wali kelas di luar app.

### Fixed (Perbaikan)

- 🔴 **Celah pengambilalihan akun lewat login Google.** `handle_new_user` mencocokkan
  local-part email ke `guru.username`/WA/NIS — pada login Google local-part itu
  dikendalikan penyerang, sehingga `<username-guru>@gmail.com` langsung mendapat akun guru
  tersebut. Pencocokan kini hanya untuk email internal `@ammu.local`.
- **Login Google mati di Android** (jalan di web/PWA). Dua sebab: `redirectTo` jadi
  `https://localhost/` yang hanya berarti di dalam WebView, dan Google menolak alur consent
  di WebView tertanam. Kini memakai deep link `app.ammu.id://auth-callback` + intent-filter
  baru, halaman izin dibuka di browser sistem, kodenya masuk lewat `appUrlOpen`.
- **Login Google gagal senyap.** Akun tak tertaut dipulangkan ke `/login` tanpa satu pun
  pesan. Kini muncul peringatan tegas; sesi Supabase yatim ikut dibuang. Tombol "Tautkan
  Google" di Profil yang selalu berbunyi "terhubung: undefined" juga dibenahi.
- **Tombol "Kelola daftar shift"** di form guru melempar ke Beranda — `to="/pengaturan"`
  tak pernah cocok route mana pun (yang benar `/pengaturan-web`), jadi jatuh ke catch-all.
- **Tanggal mundur sehari di WIB.** `tgl_naik` + kartu kenaikan + baris riwayat dan
  `tgl_keluar` mutasi memakai `toISOString()`; kenaikan yang diproses 00:00–06:59 WIB
  tercatat mundur. Periode notif prestasi juga — dan periode itu ikut jadi ID dokumen,
  jadi rekap tanggal 1 dini hari menimpa notif bulan sebelumnya.

### Changed (Berubah)

- **Pengaturan Keuangan lebih ringan.** Empat layar menarik SELURUH tabel `santri` lalu
  menyaring di klien; kini disaring di server (`aktif` kolom riil ber-index). Terasa di HP
  kelas bawah. `periksaTagihanGabungan` sengaja tetap menarik penuh — ia mengindeks seluruh
  tagihan dan ikut memeriksa yang sudah dibayar.
- Console.log cleanup (37 occurrences) — selesai, dicoret dari Unreleased.

---

## [v.1.3.4] — 2026-08-08 — Merapikan tagihan menggantung + pratinjau sasaran

⚠️ **URUTAN DEPLOY — dua langkah:**

1. `supabase functions deploy auto-generate-tagihan` — **WAJIB**, cermin whitelist berubah.
2. Deploy web dari **direktori utama**, lalu **AAB vc134** dan **Electron 1.3.4**.

TANPA migrasi DB. Untuk Android, unggah `AmmuOnline.apk` ke rilis GitHub
**lebih dulu**, baru deploy web.

📄 Teks ringkas untuk badan rilis GitHub ada di **`RELEASE-NOTES.md`** — catatan di bawah
ini terlalu rinci untuk dibaca publik.

### Added (Baru)

- **Saringan "sekolah di lembaga pondok".** Kyai: _"bisa ndak dibuat filter untuk semua santri
  ngaji yg tidak sekolah disini?"_ Bisa, dan kini ada di **dua** tempat: pilihan sasaran di
  **Generate Tagihan Khusus** (Semua / Sekolah di sini / TIDAK sekolah di sini — berlaku di
  atas cara pilih mana pun), dan sebagai **whitelist permanen** pada Jenis Pembayaran
  sehingga **cron bulanan ikut patuh**, bukan cuma tombol Generate.
  Penandanya field **Lembaga Sekolah** di data santri — satu sumber, sama dengan yang dibaca
  syarat penggabungan; penanda kedua hanya akan jadi dua kebenaran yang berselisih diam-diam.
  **Kosong = tidak menyaring**, jadi seluruh jenis yang sudah ada berperilaku persis seperti
  sebelumnya — tak ada satu pun yang perlu disunting.
  ⚠️ **Jangan dipasang pada jenis yang sudah punya "Gabung ke".** Penggabungan menuntut
  jenisnya _berlaku_ untuk santri itu, jadi menyaringnya "tidak sekolah di sini" justru
  **mematikan penggabungan** bagi santri yang bersekolah — komponen ngajinya hilang dari
  pemecahan Buku Induk, bukan sekadar tak ditagih. Dialognya memperingatkan sendiri saat
  keduanya dipasang bersamaan, dan ada tes yang mengunci perilaku itu.
  ⚠️ **Wajib `supabase functions deploy auto-generate-tagihan`** — aturan whitelist dicerminkan
  di edge; tanpa redeploy, tombol Generate sudah patuh sementara cron malam hari belum, dan
  selisihnya baru ketahuan berhari-hari kemudian.

- **Rapikan Tagihan Gabungan** (Pengaturan Keuangan → Tagihan). Kyai: _"tagihan qiraati pagi
  yg sudah digabung dengan syahriyah TK-SDI-PKBM ... kenapa tadi saya cek akun santri,
  tagihannya masih muncul sebagai belum bayar?"_ Sebabnya: penggabungan hanya mengatur
  tagihan yang **akan** terbit. Tagihan ngaji yang terlanjur terbit **sebelum** "Gabung ke"
  disetel tetap duduk di database, dan wali melihatnya sebagai tunggakan yang tak mungkin ia
  bayar dua kali.
  Alat ini **memeriksa dulu, menghapus belakangan**, dan memilah jadi tiga:
  **Aman dihapus** (belum dibayar **dan** tagihan tujuannya sudah memuat komponennya),
  **Sudah ada bayar** (tak disentuh — menghapusnya menghilangkan jejak uang yang benar-benar
  diterima), dan **Perlu diperbaiki dulu** (nominal tagihan tujuannya masih **di bawah**
  tarif gabungan yang berlaku — menghapus di situ berarti menghilangkan pemasukan yang
  **sah**). Penentu kelompok ketiga itu **angka**, bukan ada-tidaknya jejak komponen:
  tagihan yang terbit sebelum gabungan disetel memang tak menyimpan jejak, tapi bila
  nominalnya sudah setara tarif gabungan — apalagi sudah **lunas** — porsi ngajinya jelas
  ada di dalamnya dan tagihan ngajinya boleh dihapus. Yang dihapus hanya kelompok pertama, hanya oleh **super admin**, dengan
  jumlah dan nilainya terlihat lebih dulu serta tercatat di audit log.
  ⚠️ **Tidak** ditandai "lunas": uangnya memang tak pernah masuk lewat baris itu, dan
  menandainya lunas akan memunculkan pemasukan hantu di Buku Induk. Tagihannya dihapus —
  ia memang tak seharusnya pernah ada.
  Kelompok keempat menyusul dari temuan Kyai berikutnya (kasus Zaydan): **Jenisnya tak
  berlaku** — tagihan yang jenisnya masih terdaftar tetapi **whitelist**-nya
  (lembaga/status/JK/shift) tak lagi memuat santri itu, mis. tagihan _Qiraati Pagi_ pada
  santri yang ngajinya _Sore_. Itulah yang di POS bertanda **"di luar daftar"**. Ini bukan
  kasus gabungan sehingga pemilahan pertama melewatinya, dan tagihannya menggantung
  selamanya sebagai tunggakan yang tak pernah bisa dibayar benar. Punya tombol hapusnya
  **sendiri**, sebab sebagian bisa saja tagihan **sah dari masa lalu** — santri pindah
  lembaga/shift sesudah tagihannya terbit.

- **Generate Tagihan Khusus kini menampilkan pratinjau sasaran.** Kyai: tagihan _Maulid
  Nabi_ terlanjur terbit ke lembaga yang salah — dan sesudah terbit **sasarannya tak bisa
  disunting**, sebab tiap baris berdiri sendiri dan tak lagi ingat batch-nya; satu-satunya
  jalan pulang adalah menghapus lalu generate ulang. Karena itu penjagaannya dipindah ke
  depan: sebelum menekan Generate kini terlihat **sebaran per lembaga (ngaji / sekolah)**
  beserta jumlah santri dan nilainya, **total rupiah**, peringatan bila ada santri
  bernominal **Rp 0**, dan **30 nama pertama** untuk dicocokkan. Angka "N santri" saja tak
  cukup — 77 santri terasa masuk akal baik saat sasarannya benar maupun saat keliru.
  Kotak konfirmasinya pun ikut menyebut total, sebaran, dan peringatan bahwa sasaran tak
  bisa disunting sesudah terbit.

## [v.1.3.3] — 2026-08-08 — Hak kepala lembaga + dua simulasi

⚠️ **TANPA migrasi DB, TANPA edge function** — cukup deploy web dari **direktori utama**,
lalu **AAB vc133** dan **Electron 1.3.3**. Untuk Android, unggah `AmmuOnline.apk` ke rilis
GitHub **lebih dulu**, baru deploy web: `app-version.json` yang tayang langsung menawarkan
vc133, dan berkas yang belum ada berujung 404 di HP.

⚠️ **Nominal slip bisa BERUBAH untuk para kepala** — itu memang maksudnya. Sesudah deploy,
buka Simulasi dan cocokkan tiga orang sebelum menerbitkan slip: seorang **kepala** (pokok
guru di lembaga yang ia pimpin harus hilang, pokok guru ngaji tetap ada), seorang **wali
kelas** (harus tak berubah sama sekali), dan seorang **guru biasa** (juga tak berubah).

### Added (Baru)

- **Simulasi Pemasukan menampilkan tagihan GABUNGAN.** Kyai: _"untuk tagihan santri yg
  digabung, mis: syahriyah TK-SD-PKBM gabung dengan qiraati pagi ... apakah sudah
  dihitung?"_ Sudah sejak awal — jenis yang menempel mengembalikan `null` sehingga tak
  pernah dihitung sebagai baris sendiri. Tapi dari layar itu **tak kelihatan**, dan "sudah
  benar" yang tak bisa dilihat sama tak menenangkannya dengan "belum benar". Kini ada kolom
  **Gabungan**: berapa tagihan yang isinya lebih dari satu jenis, beserta **nilai komponen
  yang menempel** di dalamnya — nilai itu **sudah termasuk** di subtotal, bukan tambahan.
  Kalau angkanya **nol** padahal semestinya ada, muncul peringatan bahwa **Gabung ke** pada
  jenis ngajinya belum disetel. Perlu diingat: satu jenis ngaji tetap bisa punya barisnya
  sendiri untuk santri yang **tak** bersekolah — dua baris muncul bersamaan itu wajar, bukan
  tanda gabungannya gagal.

- **Ekspor PDF Simulasi Bisyaroh.** Satu berkas berisi dua tabel — rekap **per jenis** lalu
  rincian **per guru/pegawai** — persis yang tampil di layar, termasuk **nominal coba-coba**
  yang sedang diketik. Kalau yang diekspor nominal tersimpan, berkasnya justru jadi jebakan:
  dibawa ke rapat sebagai "hasil simulasi" padahal angkanya bukan yang barusan dilihat.
  Judul dan catatan kakinya menyebut **PLAFON** beserta andaiannya, sebab berkas ini akan
  beredar lepas dari layarnya dan angka batas-atas gampang terbaca sebagai tagihan berjalan.
- **Simulasi Pemasukan Bulanan** (Pengaturan Keuangan → Tagihan). Pasangan dari simulasi
  plafon bisyaroh: yang itu memperkirakan uang **keluar** sebulan, ini uang **masuk**.
  **Hanya jenis bulanan** — yang tahunan (Daftar Ulang, Seragam) dan manual (infaq
  insidental) sengaja tak dihitung, sebab memasukkannya membuat angka bulanan tampak jauh
  lebih besar dari yang benar-benar masuk tiap bulan, dan kekeliruan itu baru ketahuan saat
  kas tekor. Memakai **tarif yang sedang tampil di layar**, jadi Kyai bisa mengubah nominal
  lalu Hitung Ulang tanpa menyimpan apa pun. Perhitungannya lewat `hitungTagihan` — mesin
  yang sama dengan Generate Tagihan & POS — jadi paket, tarif per santri/kelas/lembaga, dan
  **pelipatan** (jenis yang menempel ke jenis lain) ikut terhitung tanpa ada yang dobel.
  Penyaring santrinya pun sama dengan Generate (aktif + scope gedung), supaya simulasi tak
  menjanjikan pemasukan dari santri yang takkan pernah ditagih. Ada ekspor PDF-nya juga.

### Fixed (Perbaikan)

- **Tempat tugas guru: satu aturan, dan aturannya MENAMBAH — bukan mengganti.** Tiga
  keluhan Kyai berurutan bermuara ke satu tempat yang sama:
  1. _"Kepala PKBM tapi di simulasi terbacanya sebagai guru"_ — tempat tugas di lembaga
     **sekolah** diberi jabatan `jabatan_sekolah || 'Guru'`, dan `jabatan_sekolah` **tak
     pernah diisi di mana pun**; satu-satunya kemunculannya di seluruh kode adalah
     pembacanya sendiri. Jadi **setiap** kepala sekolah terbaca "Guru" di lembaganya, dan
     jenis/tunjangan ber-scope jabatan Kepala tak pernah mengenainya.
  2. _"kepala yg juga guru ngaji, bisyaroh ngajinya tidak terbaca"_ — kebalikannya: lembaga
     **ngaji** dicap `jabatan` apa adanya, jadi gelar seperti "Kepala PKBM" ikut tertempel di
     PTPT dan jenis ngaji ber-scope jabatan **"Guru"** meleset.
  3. _"kok tambah rancu, bisyaroh pokok yg tadinya ada sekarang gk ada"_ — akibat dua
     perbaikan di atas yang sempat **mengganti** bacaan jabatan: begitu kepala berhenti
     terbaca "Guru" di sekolahnya, **"Bisyaroh Pokok Guru SDI" yang flat ikut lenyap**. Di
     master jabatan Kyai **14 dari 15 jabatan terikat unit**, jadi mengganti bacaan memutus
     banyak jenis sekaligus.

  4. _"kalau kepala kenapa masih dapat bisyaroh pokok guru"_ — di lembaga yang ia **pimpin**,
     bacaan "Guru" memang harus dicabut. Jam mengajarnya tetap dibayar lewat **per JP**
     (lembaganya datang dari Beban Mengajar), jadi bacaan itu tak diperlukan di sana.

  Aturannya sekarang: bacaan jabatan di sebuah lembaga hanya **ditambah**, tak pernah
  diganti — **kecuali** di lembaga yang orang itu **pimpin sebagai Kepala**, yang dibaca
  Kepala saja. Penyaringnya sengaja kata **"kepala"**, bukan "gelar apa pun yang terikat
  unit": di master jabatan Kyai **Wali Kelas** juga terikat SDI & PKBM, dan aturan yang
  dipukul rata akan mencabut pokok guru tiap wali kelas. "PJ …" juga tak ikut — PJ
  Administrasi memangku empat lembaga ngaji sekaligus sementara orangnya guru biasa di sana. Bacaan lama tetap utuh; yang kurang ditambahkan — gelar yang **memangku unit
  itu** di lembaga sekolah, dan bacaan **"Guru"** di lembaga ngaji bagi orang yang gelarnya
  milik unit lain. Kepala **di lembaganya sendiri** sengaja **tidak** ditambahi bacaan
  "Guru", supaya pokok kepala dan pokok guru tak sama-sama terbit untuk orang yang sama.
  Tiap gelar juga **berjangkar di unitnya sendiri**, jadi kepala yang lembaga sekolahnya
  kosong tetap diakui kepala.

  Menambah aman karena **satu jenis menerbitkan paling banyak satu baris** betapa pun banyak
  tempat tugas yang cocok — jadi ref tambahan tak pernah bisa membayar dobel. Penurunan
  tempat tugas ini kini punya tesnya sendiri (`tests/unit/guruLembagaRefs.test.js`), memakai
  master jabatan Kyai sebagai contoh.

## [v.1.3.2] — 2026-08-07 — Bisyaroh sekolah per JP per bulan + tugas lintas-lembaga

⚠️ **TANPA migrasi DB, TANPA edge function** — cukup deploy web dari **direktori utama**,
lalu **AAB vc132** dan **Electron 1.3.2** bila perlu sampai ke HP dan PC. Untuk Android,
unggah `AmmuOnline.apk` ke rilis GitHub **lebih dulu**, baru deploy web: `app-version.json`
yang tayang langsung menawarkan vc132, dan berkas yang belum ada akan berujung 404 di HP.

⚠️ **Setelah deploy, Kyai perlu menyetel dua hal** — perubahan di bawah tak mengubah nominal
apa pun dengan sendirinya:

1. Jenis bisyaroh sekolah dipindah ke cara hitung **"× JP/minggu (bulanan)"**.
2. Guru yang mengajar di lembaga kedua diberi barisnya di menu **Beban Mengajar**.

### Added (Baru)

- **Cara hitung bisyaroh sekolah baru: "× JP/minggu (bulanan)".** Kyai, membaca simulasi:
  "ini rumus JPnya kok gk sesuai ya" — dan memang tarifnya selama ini diperlakukan **per JP
  per pertemuan**. Dengan `× JP diajar`, 30 JP/minggu × Rp 20.000 keluar **Rp 2.400.000**
  sebulan: JP mingguan disebar ke hari aktif lalu dikalikan tiap hari guru masuk, sehingga di
  bulan berisi 24 hari efektif hasilnya tepat 4× lipat. Yang dimaksud Rp 600.000. Cara hitung
  baru memakai **JP mingguan apa adanya** sebagai pengali, dan kehadiran tetap memotong —
  lewat **prorata** (JP diajar ÷ JP terjadwal), jadi yang masuk penuh dapat utuh dan yang
  bolong dipotong sesuai porsinya. Guru tanpa jadwal di lembaga itu dapat **nol**, bukan
  utuh. Cara hitung lama **tidak diubah dan tidak dihapus**: slip yang sudah terbit tak boleh
  berubah sendiri, jadi Kyai yang memindahkan jenisnya lewat Pengaturan.

### Fixed (Perbaikan)

- **Jabatan Tambahan kini boleh lebih dari satu.** Kyai: "ada yg punya 3 jabatan" — dulu
  formnya satu dropdown, jadi seorang guru maksimal punya **dua** jabatan, dan slot itu kerap
  habis hanya untuk memunculkan lembaga tempat ia mengajar. Sekarang dipilih dengan klik
  (boleh beberapa), dan **tiap jabatan membawa unit/lembaganya sendiri** — jadi tunjangan
  berbasis jabatan serta scope Jenis Bisyaroh ikut mengenai semuanya. Disimpan **dipisah
  koma di kolom yang sama**, sehingga data lama yang berisi satu nama tetap terbaca apa
  adanya: tak ada migrasi, tak ada yang perlu diisi ulang.
- **Jam mengajar di lembaga kedua akhirnya terbayar.** Kyai: "ada Kepala SDI yg juga punya
  jam mengajar di PKBM, gimana caranya biar sesuai". Dulu lembaga tempat mengajar hanya bisa
  datang dari **tempat tugas** — Lembaga utama, Lembaga sekolah (satu slot), dan Jabatan
  Tambahan — jadi Kepala SDI yang juga mengajar di PKBM tak punya "tempat tugas" PKBM, dan
  jenis bisyaroh ber-scope PKBM tak mengenainya sama sekali. Satu-satunya jalan keluar adalah
  **mengarang jabatan tambahan** hanya supaya lembaganya muncul. Untuk bayaran per JP, bukti
  mengajar yang sebenarnya ada di menu **Beban Mengajar**: kalau ada baris (guru, lembaga,
  JP/minggu), ia memang mengajar di sana — dan itulah yang sekarang dipakai.
  Sekalian: jenis per JP yang scope lembaganya dikosongkan kini menerbitkan **satu baris per
  lembaga** yang diajar, masing-masing dengan JP lembaganya sendiri. Dulu hanya lembaga
  pertama yang terbayar dan sisanya hilang tanpa jejak. Scope **jabatan** tetap menyaring,
  hanya tak lagi wajib seiring-ref dengan lembaganya — sebab lembaganya memang tak lagi
  berasal dari ref.
- **Tunjangan akhirnya ikut dihitung di Simulasi Plafon.** Kyai: "tunjangan kok gak masuk di
  simulasi ya?" — memang tidak, dan itu cacat sejak tunjangan pindah ke daftarnya sendiri.
  Plafon yang tak menghitung tunjangan bukan sekadar kurang lengkap: ia **mengecilkan**
  anggaran, padahal alat itu dipakai justru untuk memutuskan nominal — dan sejak bonus tepat
  waktu ikut pindah ke tunjangan, selisihnya makin jauh. Sekarang Jenis Tunjangan tampil di
  tabel yang sama (berlencana **TUNJANGAN**), nominalnya bisa dicoba-coba seperti jenis
  bisyaroh, dan ikut masuk rincian per guru/pegawai. Karena andaiannya hadir penuh, tunjangan
  berprestasi selalu dianggap lolos — itu memang arti plafon.
  ⚠️ Nominal coba-coba kini berkunci **kelompok + id**: dua daftar terpisah boleh punya id
  yang sama ("bonus_tepat_waktu" di keduanya wajar), dan tanpa itu keduanya menyatu jadi satu
  baris dengan subtotal bercampur.

## [v.1.3.1] — 2026-08-07 — Tunjangan berkategori + rincian simulasi per orang

⚠️ **TANPA migrasi DB, TANPA edge function** — cukup deploy web dari **direktori utama**,
lalu **AAB vc131** dan **Electron 1.3.1** bila perbaikan ini perlu sampai ke HP dan PC.

⚠️ **Kenapa langsung 1.3.1 dan bukan membangun ulang 1.3.0:** label v.1.3.0/vc130 sudah
terpakai untuk dua isi berbeda — bundel bump `74e6274`, lalu rebuild 7 Agu yang membawa tiga
commit sesudahnya. Electron 1.3.0 sudah terbit di GitHub sehingga versi yang sama tak akan
ditawarkan sebagai pembaruan, dan Play menolak versionCode kembar.

✅ Tiga entri pertama di bawah (**simulasi per orang**, **POS Nonbulanan**, **config
keuangan**) sudah ikut terbang di rebuild 7 Agu itu — dicatat di sini supaya punya nomor
versi, bukan karena baru.

### Added (Baru)

- **Simulasi Plafon Bisyaroh kini merinci per guru/pegawai.** Total plafon menjawab
  "sebulan keluar berapa"; begitu tarif calon diketik, pertanyaan berikutnya selalu
  "kalau segitu, si Fulan terima berapa?" — dan angka itulah yang dibawa ke rundingan,
  bukan totalnya. Tabel kedua di sub-tab Simulasi memakai nominal coba-coba yang sama:
  tiap baris bisa dibentangkan untuk melihat jenis yang mengenainya beserta pengali
  (mis. `26 × Rp 3.000`), bisa dicari per nama, dan yang bernilai Rp 0 bisa disembunyikan
  — meski daftar itu sendiri berguna, sebab nol berarti **tak ada jenis bisyaroh yang
  cocok** dengan jabatan/lembaga/shift orang tersebut. Jumlah seluruh baris per orang
  **selalu sama persis** dengan total per jenis (dijaga tes): keduanya membaca satu mesin
  yang sama, bukan dua hitungan yang kebetulan mirip.

- **Tunjangan bisyaroh kini punya kategori, seperti Jenis Bisyaroh.** Model lamanya cuma
  nama + nominal + daftar orang, jadi tiap kategori harus diketik per guru dan diperbarui
  tangan tiap tahun bertambah. Kartu baru **Jenis Tunjangan** memakai mesin scope yang sama
  dengan Jenis Bisyaroh (jabatan × lembaga × shift × orang) — nominal ditentukan **jabatan
  dan lembaga**, bukan diketik per orang — ditambah dua cara hitung dan satu syarat baru:
  - **Tunjangan jabatan** — mis. "Tunjangan Kepala Lembaga": flat, scope jabatan.
  - **× tahun pengabdian** — nominal dikali jumlah tahun penuh mengabdi, terbit **tiap
    bulan** dan naik sendiri saat tahunnya bertambah, tanpa disunting.
  - **Minimal masa pengabdian** — isi 5 untuk "khusus yang mengabdi di atas 5 tahun".
    Berlaku untuk **semua** cara hitung, bukan cuma yang kelipatan.
  - **Bila tepat waktu ≥ ambang** — tunjangan berprestasi. Dinilai dari hadir **tepat waktu
    ÷ hari efektif**, jadi izin/sakit/cuti ikut memotong; ambangnya bisa diturunkan dari
    100% kalau terasa terlalu keras.
    Bonus tepat waktu memang **masuk tunjangan** sekarang (keputusan Kyai), bukan pos bonus
    tersendiri. Selama daftar barunya belum pernah disimpan, isinya diturunkan otomatis dari
    Master Tunjangan lama — **slip tak berubah sedikit pun** sebelum Kyai menyentuh Pengaturan.
- **Data guru: "Tanggal Tugas" lama kini bernama "Tgl. Syahadah", dan ada field baru
  "Tgl. Tugas".** Yang lama tetap jadi dasar penomoran NIG (kuncinya sengaja tak diubah
  supaya berkas impor lama tetap mendarat di tempat yang benar) dan **boleh kosong** untuk
  yang belum bersyahadah. Yang baru = awal mengabdi, satu-satunya dasar masa pengabdian dan
  tunjangannya; **kosong berarti tunjangan pengabdian tak terbit** — masa kerja tidak pernah
  ditebak dari tanggal syahadah, sebab menebaknya berarti menerbitkan uang atas angka karangan.

### Fixed (Perbaikan)

- **POS: tagihan bulanan tak lagi terdampar di daftar "Nonbulanan".** Kyai: "syahriyah
  yang sudah diatur bulanan tapi di POS munculnya non bulanan". Setelan frekuensinya tak
  salah — penggolongan di layar POS-lah yang salah: tagihan yang **jenisnya tak ada lagi
  di daftar aktif** semuanya ditumpuk ke bagian "Nonbulanan", termasuk yang periodenya
  jelas-jelas satu bulan. Jenis bisa hilang dari daftar aktif tanpa tagihannya ikut
  hilang — ia dibuat **menempel** ke jenis lain (mis. Syahriyah Qiraati Pagi kini termasuk
  di Syahriyah Pondok), **whitelist**-nya (lembaga/status/JK/shift) tak lagi memuat santri
  itu, atau **labelnya diganti** sementara tagihan lama tetap memakai nama lama. Kini yang
  menentukan adalah **periodenya**, bukan terdaftar atau tidaknya jenis itu: periode berupa
  bulan T.A. berjalan → masuk matriks Bulanan di kolom bulannya sendiri, bertanda
  **"di luar daftar"**. Bulan lain sengaja dibiarkan kosong, **tidak** disintesis — jenis
  itu memang tak punya tarif yang berlaku untuk santri ini, dan mengarang sel merah baru
  sama saja menerbitkan tagihan di layar.

### Security (Keamanan)

- **Config keuangan tak bisa lagi bocor — atau tertimpa — lewat salinan di row publik.**
  Migrasi 29 Jul memindahkan tarif syahriyah/bisyaroh, beban mengajar, tunjangan &
  potongan ke `settings/keuangan` (hanya super admin / admin keuangan) lalu menghapusnya
  dari `settings/general` & `/web` yang **terbaca tanpa login**. Diperiksa 7 Agu 2026:
  kunci-kunci itu **ada lagi** di `general` — berisi setelan **bawaan kosong**, sidik jari
  aplikasi lawas yang tak kenal row `keuangan`: layarnya menampilkan fallback, lalu satu
  klik "Simpan Semua" menerbitkannya sebagai config. Tiga lapis perbaikan:
  - **Migrasi `20260807170000`** membuang kunci itu lagi dari `general`/`web` — dan
    **tidak** menggabungkan isinya ke `keuangan` seperti migrasi 29 Jul, sebab kali ini
    yang dibawa `general` adalah default kosong yang justru akan menimpa config asli.
  - **Store membuang** kunci keuangan dari data `general`/`web` sebelum di-merge, bukan
    sekadar mengalahkannya lewat urutan. Sebelumnya, sekali saja row `keuangan` gagal atau
    telat terbaca, POS & Bisyaroh memakai daftar jenis **default** — tarif salah di layar
    kasir, dan itu uang riil. Kini row `keuangan` satu-satunya sumber; peran yang tak
    berhak membacanya mendapat kunci **absen**, bukan salinan basi.
  - **Menyimpan hal lain tak lagi menulis ulang config keuangan.** `save()` di store dulu
    menyetor seluruh salinan di memori, jadi menyimpan logo dari perangkat yang snapshot-nya
    basi bisa memundurkan jenis pembayaran tanpa jejak; kini hanya kunci yang benar-benar
    disunting yang ditulis.

### Fixed (Perbaikan) — Pengaturan Keuangan

- **Pengaturan Keuangan menolak menyimpan kalau config di server tak terbaca.** Halaman ini
  menyimpan SELURUH daftar jenis sekaligus, jadi bila ia terhidrasi saat row `keuangan`
  gagal terbaca (sesi kedaluwarsa, jaringan, peran, atau aplikasi lawas), yang tampil adalah
  fallback bawaan — dan "Simpan Semua" menerbitkannya sebagai config sungguhan. Sekarang ada
  **spanduk merah di puncak halaman** (muncul sebelum ada yang sempat disunting) dan
  `simpan()` memeriksa ulang ke server tepat sebelum menulis, lalu **membatalkan** bila:
  server tak terbaca; halaman dimuat tanpa config; atau server memuat jenis yang **tak
  pernah tampil** di layar ini — pertanda perangkat lain menyimpan lebih dulu, dan
  menyimpan akan menghapus jenis itu tanpa Kyai pernah melihatnya.

## [v.1.3.0] — 2026-08-07 — Simulasi plafon bisyaroh + Input Harian bisa pilih tanggal

Naik **MINOR**, bukan patch: dua kemampuan baru, bukan sekadar perbaikan.

⚠️ **TANPA migrasi DB, TANPA edge function** — cukup deploy web dari **direktori utama**.
Lalu **AAB vc130** dan **Electron 1.3.0** bila perbaikan ini perlu sampai ke HP dan PC:
aplikasi Android memuat bundel webnya sendiri, jadi deploy web saja tak menjangkaunya.

### Added (Baru)

- **Simulasi Plafon Bisyaroh** — sub-tab tersendiri di halaman Bisyaroh. Nominal bisyaroh sedang ditinjau
  ulang, dan sebelumnya tak ada cara melihat dampak biayanya selain menyimpan setelan
  lalu menerbitkan slip — yaitu mengubah data sungguhan hanya untuk bertanya "kalau
  tarifnya sekian, sebulan keluar berapa?". Kini tarif bisa diketik sementara di layar
  dan totalnya langsung terlihat per jenis maupun keseluruhan, **tanpa menulis apa pun**
  — tak ke Pengaturan, tak ke slip. Andaiannya **hadir penuh** (semua guru hadir dan
  tepat waktu di tiap hari efektif), jadi angkanya **plafon**: batas atas untuk menyusun
  anggaran, bukan tebakan realisasi. Perhitungannya memakai ulang mesin yang sama dengan
  slip sungguhan, supaya aturan scope dan cara hitung tak pernah berpisah diam-diam.
- **Input Absensi Harian bisa memilih tanggal.** Formnya dulu terkunci di hari ini
  (`todayJakarta()` mati, tanpa pemilih tanggal), jadi satu-satunya cara mengoreksi hari
  yang sudah lewat adalah memutar lewat tab Impor Fingerprint dengan berkas Excel — tak
  wajar untuk pekerjaan sesering ini. Kini ada pemilih tanggal dengan batas atas hari
  ini; **mengisi masa depan ditolak untuk siapa pun** (absennya belum terjadi), dan
  **mundur ke hari lampau dibatasi super admin**, sejalan dengan kebijakan hapus absen.
  Saat tanggal lampau dipilih muncul spanduk peringatan supaya tak ada yang mengisi
  kemarin sambil mengira sedang mengisi hari ini.
  ⚠️ Simpanan harian menimpa penuh baris yang sudah ada, jadi sebelum menulis baris
  tanggal itu diambil dulu dari database dan tabrakannya dirinci di konfirmasi (nama,
  shift, status & jam lama) — dengan peringatan lebih keras bila ada **izin/sakit/cuti**
  yang keterangannya akan hilang. Kalau pemeriksaan itu sendiri gagal, penyimpanan
  **dibatalkan**, bukan diteruskan. Penjagaan seketat ini karena baris absensi memberi
  makan bisyaroh: menimpa izin yang sudah disetujui bukan salah tampilan, tapi salah uang.

---

## [v.1.2.9] — 2026-08-06 — Tiga laporan Kyai + tolakan Play berulang + unduhan Desktop

⚠️ **URUTAN DEPLOY — tiga langkah, jangan ada yang dilewat:**

1. `supabase db push` — tabel jejak `hiview_scan_log`.
2. `supabase functions deploy hiview-absen --no-verify-jwt`.
3. Deploy web **dari direktori utama** (worktree tak punya `vue-app/.env.local`).

Lalu **AAB vc129** dan **Electron 1.2.9** (`npm run electron:release`).

⚠️ **AAB vc129 WAJIB kalau mau penolakan Play berhenti.** Perbaikan login lintas-tab ada
di bundel web yang ikut AAB; yang sedang ditinjau Google sekarang masih vc128, jadi
deploy web saja tak mengubah apa pun di Play. Sesudah AAB naik, ganti teks **Detail
login** ke versi vc129+ di `PLAYSTORE-LISTING.md` §9 ("either tab works").

⚠️ **Electron: tiap PC masih perlu SATU KALI pasang manual** (`app-update.yml` lama di
dalam pemasangan yang ada masih memverifikasi tanda tangan). Tautan unduhnya baru benar
mulai rilis ini.

Setelah deploy Kyai perlu **mengisi toleransi scan** di Pengaturan → Master Shift
(defaultnya 0 = perilaku lama, jadi tak ada yang berubah sampai diisi).

### Tiga laporan Kyai (6 Agu 2026)

#### Fixed (Perbaikan)

- **Guru yang sudah scan tapi absennya tak masuk.** `deriveShift` hanya menerima scan yang
  jatuh **persis** di `mulai`..`selesai`. Dengan window nyata pagi 06:00–12:00, guru yang
  ceklok 05:45 (datang lebih awal) atau 17:30 (jauh setelah shift sore bubar) **tidak jadi
  baris absen sama sekali** — hilang diam-diam sebagai angka "luar jam shift", lalu ikut
  hilang dari bonus kehadiran. Master Shift kini punya dua angka per shift: **boleh scan
  lebih awal** (menit sebelum `mulai`, tetap dihitung _hadir_) dan **masih masuk setelah
  selesai** (menit sesudah `selesai`, dihitung _terlambat_). Derivasinya jadi dua lintasan —
  window inti dulu, toleransi belakangan — sehingga menyetel toleransi **tak pernah**
  memindahkan absen yang selama ini sudah benar. Dialognya memperlihatkan window efektif
  dan memperingatkan bila window melar sampai menyentuh jam shift lain. Cermin Deno
  (mesin HiView) ikut diubah, dijaga tes pembanding 43.200 titik jam.
  _Batas:_ `fp_sync.py` (jalur Revo lama) tak mengenal dua angka ini — jalur itu wajib
  lewat sync Ammu Desktop.
- **Kolom Saldo di laporan buku induk tak sesuai filter.** Di laporan harian "kas umum ·
  SDI · TUNAI" 3 Agu, 14 transaksi semuanya _masuk_ tapi kolom Saldo justru **menurun**
  dari Rp 6.230.000 ke Rp 2.130.000 sementara TOTAL bilang Rp 2.290.000. Sebabnya: baris
  dicetak terbaru→terlama sedangkan saldo diakumulasi kronologis naik, dan saldonya diambil
  dari **seluruh** ledger (semua lembaga, semua pos, tunai + transfer) tanpa ikut penyaring.
  Saldo berjalan kini dihitung dari ledger yang sudah tersaring tapi tak dibatasi periode —
  tanpa penyaring hasilnya sama persis dengan angka lama, dengan penyaring selisih antar
  baris sama dengan nominal barisnya. Laporan bersusun **SALDO AWAL → transaksi kronologis
  naik → SUBTOTAL cara bayar → TOTAL** (kolom saldonya = saldo akhir). Kartu "Saldo Akhir"
  di layar ternyata berisi masuk − keluar periode saja; namanya dijujurkan jadi **"Selisih
  Periode"**, dan saldo awal/akhir sesungguhnya tampil di barisnya sendiri memakai angka
  yang sama dengan PDF.

#### Added (Baru)

- **Tab "Jejak Mesin" di Absensi Guru.** Edge `hiview-absen` membuang event di banyak titik
  dan setiap pembuangan hanya jadi `console.log` yang tak bisa dibuka siapa pun di
  pesantren — dari layar absensi, "mesin tak mengirim" dan "server menolak" terlihat sama
  persis. Tabel `hiview_scan_log` kini merekam tiap scan + hasil keputusannya (`diterima` /
  `pulang` / `luar_window` / `pin_tak_dikenal` / `izin_sakit` / `duplikat` / `bukan_absen` /
  `waktu_tak_terbaca`). Tanggal yang **kosong sama sekali** = mesin memang tak mengirim,
  jadi yang diperiksa jaringan mesin, bukan data guru. Menulis jejak tak pernah boleh
  menggagalkan absennya; heartbeat mesin sengaja tak dicatat. RLS: baca = staf, hapus =
  super_admin, tanpa policy tulis sama sekali (hanya edge yang boleh mengisi).
- **Uang Saku: semua santri ma'had langsung tampil.** Daftar saldo dulu lahir sepenuhnya
  dari mutasi, jadi santri yang belum pernah setor tak punya baris — satu-satunya jalan
  menyetorkan uangnya lewat tombol Input Mutasi lalu mengetik namanya. Kini daftarnya
  di-seed dari santri ma'had (kriteria sama persis dengan dropdown modal) dengan tombol
  Setor/Tarik di tiap baris. Urutannya nama A–Z khusus mode uang saku supaya posisinya
  tetap; saldo Rp 0 diredupkan.
- **Tandai ulang Pos Dana untuk transaksi lama.** Filter Pos lahir 5 Agu, jadi transaksi
  sebelumnya tak bertag dan Tabungan Wajib/Uang Buku lama ikut terbaca sebagai Kas Umum
  (terlihat di berkas 3 Agu itu juga). Banner super_admin di Buku Induk merinci per pos
  sebelum dijalankan, memakai jalur penandaan yang sama dengan POS, dan hanya menyentuh
  baris yang belum bertag.

### Tolakan Play berulang + unduhan Desktop 404 (6 Agu 2026)

Keduanya **murni frontend** — tanpa migrasi DB, tanpa edge function. Ikut deploy web
bersama batch di atas. ⚠️ Perbaikan login baru menolong peninjau Play setelah **AAB
baru diunggah**; yang sedang ditinjau sekarang masih vc128.

#### Fixed (Perbaikan)

- **Update Play ditolak berulang "Kredensial login salah".** Isian Detail login sudah
  benar dan sudah dikirim untuk ditinjau, tapi tetap ditolak. Rantai akunnya diuji
  langsung ke server dan seluruhnya hijau (`resolve_login` ketemu & aktif → sandi
  diterima HTTP 200 → profil super_admin → baris guru Aktif), begitu pula bundel di
  dalam APK Play-signed vc128: URL + anon key Supabase tertanam, dan login
  `demoplay`/`1234` berhasil sampai dashboard. Yang tersisa cuma jalan masuknya —
  layar login mengirim tab terpilih sebagai penyaring, sehingga **tab yang keliru
  menghasilkan "tidak ditemukan" untuk akun yang jelas ada**
  (`resolve_login('demoplay','santri')` = kosong). Instruksi tab di kolom Detail login
  sudah dipasang sejak 23 Juli dan tetap ditolak — wajar, pemeriksa otomatis Play
  membaca kolom username/sandi, bukan kolom instruksi. Kini kalau jalur terpilih tak
  menemukan apa pun, aplikasi **mengulang tanpa penyaring jalur**. Cadangan itu tak
  pernah menimpa hasil yang ketemu, jadi pemisahan satu nomor WA milik guru yang
  sekaligus wali santri — alasan tab ini ada — tetap utuh. Peran tetap dibangun
  server-side dari `profiles`, bukan dari tab yang diklik.
- **Tombol unduh Desktop membuka halaman GitHub 404.** Sejak v.1.2.8 nama installer
  memuat versi (`AmmuOnline-Setup-1.2.8.exe`) supaya cache updater & blockmap rilis
  lama tak bertabrakan, tapi tautan di layar login masih menunjuk nama tanpa versi
  yang sejak itu tak pernah ada. Ironisnya inilah pintu "pasang manual sekali" yang
  dijanjikan perbaikan auto-update 5 Agu — dan justru pintu itu yang mati.
  Auto-update sendiri tak terdampak (updater membaca `latest.yml`). Nama berkas kini
  dirangkai dari versi app, dijaga tes yang membandingkannya dengan pola
  `artifactName` nyata di konfigurasi electron-builder. Setelan
  `downloadDesktop`/`downloadDesktopWin7` di Pengaturan Web tetap menang, jadi Kyai
  bisa membetulkan tanpa rilis ulang.

#### Housekeeping

- Versi app disuntik saat build (`__APP_VERSION__` dari `vue-app/package.json`) —
  satu titik bump manual berkurang: teks versi di footer login dulu diketik ulang.
- `downloadIos` dibuang: cuma dideklarasikan, tak pernah dipakai, dan `AmmuOnline.ipa`
  tak pernah ada di satu rilis pun.
- `.gitignore` mengabaikan `*.apk`/`*.aab` — `AmmuOnline.apk` (~6 MB) tergeletak di
  akar repo tanpa penjaga.

---

## [v.1.2.8] — 2026-08-05 — Enam laporan Kyai: izin, absensi, scope rekap, HP low-end, pembaruan APK/Electron, PDF tabungan

Rilis **perbaikan** dari enam laporan Kyai (5 Agu 2026), plus satu permintaan tambahan.
**TANPA migrasi DB** dan **tanpa edge function baru** — seluruhnya frontend + konfigurasi
build.

⚠️ **URUTAN DEPLOY:**

1. Deploy web **dari direktori utama** (worktree tak punya `vue-app/.env.local`).
2. Rebuild **AAB vc128** — wajib, karena perbaikan "tampilan terlalu zoom" ada di kode
   native (`MainActivity`), bukan di bundle web.
3. Rebuild **Electron 1.2.8** (`npm run electron:release`).

⚠️ **ELECTRON — tiap PC perlu SATU KALI pasang manual.** Akar "auto-update tak bisa di
beberapa PC" adalah `win.publisherName` di config: electron-builder menuliskannya ke
`app-update.yml`, lalu electron-updater memverifikasi tanda tangan Authenticode installer
dan menolak berkas yang tak bersertifikat. PC yang sekarang terpasang membawa
`app-update.yml` LAMA di dalam dirinya, jadi ia masih akan menolak sekali lagi — sesudah
1.2.8 terpasang manual, auto-update jalan permanen. Kalau updater di PC itu gagal, kini ia
menampilkan sebabnya + tombol "Buka Halaman Unduhan".

**Yang perlu Kyai kerjakan setelah rilis (untuk pembaruan APK di luar Play):** unduh
**"Signed, universal APK"** dari Play Console → App bundle explorer → Downloads, unggah ke
rilis GitHub sebagai `AmmuOnline.apk`. **Wajib APK dari Play Console, bukan build lokal** —
build lokal ditandatangani kunci berbeda dari kunci Play, jadi tak bisa dipasang menimpa
aplikasi yang sudah ada dari Play ("App not installed"). `vue-app/public/app-version.json`
sudah menunjuk `releases/latest/download/AmmuOnline.apk` dan sudah berisi vc128.

### Fixed (Perbaikan)

- **Perizinan yang disetujui tak lagi luput dari absensi.** Izin 4 Agu berstatus
  "Disetujui" tapi kolom IZIN tetap 0 dan hari itu tetap ALPA. Akarnya bukan absensinya,
  tapi deret tanggalnya: pola `new Date(tgl + 'T00:00:00')` + `toISOString()` memundurkan
  tanggal **satu hari** di WIB, jadi baris ditulis ke 3 Agu — dan karena 3 Agu sudah punya
  baris "hadir", penulisannya justru **dilewati**, sehingga tak ada baris izin sama sekali.
  Sumber tunggal baru `rentangTanggal()` bekerja pada string kalender + iterasi UTC murni,
  jadi zona lokal tak pernah ikut campur. Baris izin kini juga mengisi kolom `periode`.
  **Pemulihan data:** panel **"Sudah disetujui, absensinya belum terisi"** di Persetujuan
  Perizinan — menyaring pengajuan yang kena bug ini dan hilang sendiri setelah diterapkan.
- **"Hari ini" tak lagi mundur sebelum jam 07.00 WIB** di penghitung Alpa dan tanggal
  default form pengajuan (keduanya masih memakai UTC).
- **Guru yang absennya hilang sekarang bisa ditunjuk namanya.** Sinkron fingerprint
  membuang scan yang tak jatuh di window shift dan hanya melaporkannya sebagai satu angka
  "luar jam shift" — padahal angka itu campur aduk: mayoritas normal (ceklok pulang),
  sebagian kecil justru absen yang hilang total. Panel Mesin Absensi kini punya tabel
  **"Scan terbaca tapi TIDAK jadi absen"** (nama · tanggal · jam scan · shift guru · sebab)
  yang hanya memuat hari **tanpa satu pun baris masuk**, dengan sebabnya dibedakan: shift
  guru kosong (konfigurasi → "Perbaiki Shift") vs jam di luar window shift.
- **Rekap Prestasi: Kepala SDI yang juga guru ngaji PTPT tak lagi melihat semua santri.**
  Dua sebab bertumpuk: `isFullFilterRole` memperlakukan setiap kepala sebagai admin-penuh
  (sehingga penyaring "santri ampuan" tak pernah jalan), dan penyaringnya memakai
  `sesi.lembaga` — untuk kepala sekolah itu kolom yang salah, sebab `lembaga` = tempat ia
  **mengajar** ngaji sedang yang ia **pimpin** disebut jabatannya. Sumber tunggal baru
  `scopeQiraati()`: kuasa penuh hanya di lembaga **ngaji** yang dipimpin; kepala sekolah
  tetap boleh melihat santri kelas sekolahnya tapi read-only (nilai qiraati bukan
  wilayahnya). Data Santri sudah memakai pola ini sejak v.1.2.3.
- **Tampilan "terlalu zoom" di HP low-end.** HP itu disetel Ukuran Font besar, dan WebView
  menurunkan skala font sistem ke halaman — karena tata letak Ammu berbasis teks,
  pembesaran itu mendorong tinggi baris & memaksa pembungkusan, sehingga terbaca sebagai
  "ke-zoom". `MainActivity` kini **membatasi** `textZoom` di 115% (bukan mengunci 100%:
  yang menaikkan ukuran font sering justru orang yang membutuhkan teks besar — batas ini
  menahan tata letak tetap utuh sambil tetap memberi sebagian pembesaran yang diminta),
  dan CSS memakai `text-size-adjust: 100%`. Ukuran Tampilan (density) perangkat & zoom
  pinch **tidak** disentuh — itu preferensi sah seluruh perangkat.
- **Auto-update Electron.** `win.publisherName` dibuang (lihat peringatan di atas) dan
  `artifactName` kini memuat versi, supaya cache & blockmap rilis lama tak bertabrakan.
  Status "sudah versi terbaru" di PC berversi skema lama (110.0.626) tak lagi ditelan apa
  adanya: semver menilai 110 > 1.2.x sehingga PC itu **tak akan pernah** ditawari update —
  sekarang ia diberi tahu dan diarahkan memasang manual.
- **Tanggal mutasi tabungan/uang saku** ikut pindah ke WIB — setoran subuh dulu tercatat di
  tanggal sebelumnya, yang langsung merusak laporan harian dan penomoran No. Bukti.

#### Susulan — ditemukan sesudah deploy pertama 5 Agu (perlu **deploy web ulang**)

- **Pemberitahuan pembaruan APK sebenarnya belum jalan sama sekali.** Di dalam APK,
  halaman disajikan Capacitor dari `https://localhost`, jadi pembacaan
  `app-version.json` di hosting itu **lintas-origin** — dan hosting tak mengirim
  `Access-Control-Allow-Origin` (diuji langsung: header itu memang tak ada, dan
  `CapacitorHttp` tidak diaktifkan sehingga `fetch` tunduk CORS seperti peramban biasa).
  WebView menolak responsnya, `fetch` melempar, lalu galatnya ditelan pemeriksaan
  otomatis — fitur mati tanpa jejak. `firebase.json` kini mengirim
  `Access-Control-Allow-Origin: *` + `Cache-Control: no-cache` untuk `/app-version.json`.
  **Cukup deploy hosting** — APK vc128 yang sudah dibangun langsung ikut hidup.
- **`apkUrl` wajib `https://`.** Berkas versinya milik sendiri, tapi ia menentukan URL yang
  dibuka aplikasi: kalau berkas itu pernah disusupi, `javascript:` berarti eksekusi kode di
  dalam WebView dan `http:` berarti APK yang bisa ditukar di jalan.
- **Rebuild Electron gagal total** sesudah 1.2.8 rilis: catatan `publisherName` dititipkan
  sebagai kunci di dalam `build.win`, dan electron-builder 24 menolak properti tak dikenal
  (`ValidationError`) sebelum build mulai. Catatannya dipindah ke root `package.json` yang
  tak ikut divalidasi.
- **Tanggal transaksi keuangan & absensi guru pakai WIB.** Pola UTC yang sama masih tersisa
  di Tagihan (tanggal bayar, cek jatuh tempo), Pembayaran, Pembayaran Pending (baris Buku
  Induk), Hutang/Piutang, Uang Pos, **jalur impor mutasi Tabungan** (terlewat waktu
  setor/tarik diperbaiki), dan `AbsensiGuru.saveHarian()` — yang terakhir menaruh absen
  shift subuh di tanggal kemarin sehingga menggeser hitungan bisyaroh. Penjaga regresi
  `tests/unit/tanggalTransaksiWib.test.js` menjaga 10 berkas itu tak kembali ke pola UTC.

### Added (Baru)

- **Laporan PDF mutasi Tabungan / Uang Saku** (Kyai: "belum ada ekspor PDF harian untuk
  admin keuangan"). Mengikuti filter aktif (tahun/bulan/tanggal/lembaga), urut kronologis,
  ditutup baris JUMLAH + SALDO BERSIH; kolom No · Tanggal · No. Bukti · Santri · Kas
  Lembaga · Setor · Tarik · Catatan. Tombol **"Hari Ini"** menyetel filter ke tanggal WIB
  sekali klik. Yang sudah ada sebelumnya (`exportPdf`) adalah rekap **saldo** per santri
  dan mengabaikan tanggal — bukan yang dibutuhkan untuk tutup kas harian.
- **Panel "Semua Mutasi" terbuka untuk admin keuangan** (baca + cetak). Sebelumnya
  super_admin-saja, dan karena seluruh kontrol tanggal harian hidup di dalamnya, admin
  keuangan tak punya jalan sama sekali ke laporan harian. **Ubah/hapus mutasi tetap
  super_admin.**
- **Pembaruan APK di luar Play Store** — `public/app-version.json` sebagai sumber "versi
  terbaru" (ikut ter-deploy bersama web, jadi selalu seusia web yang tayang) + tawaran
  unduh otomatis di aplikasi Android (~6 detik sesudah app dibuka) + blok **"Aplikasi
  Android"** di Bantuan → Tentang: **Unduh APK** di web, **Cek Pembaruan** di aplikasi.
  Pilihan "Lewati versi ini" disimpan per-versionCode, jadi versi berikutnya tetap
  ditawarkan. Ini **bukan** auto-update seperti Electron: Android tak mengizinkan aplikasi
  non-sistem memasang APK sendiri — yang hilang adalah penantian peninjauan Play.

### Performance

- **Langganan data disaring di server.** `subscribeColl` sudah menerima parameter penyaring
  sejak awal, tapi dari 78 pemanggilannya **nol** yang memakainya — semuanya menarik tabel
  penuh lalu menyaring di klien, jadi halaman pribadi mengunduh data seluruh pondok demi
  menampilkan satu orang. Yang disaring sekarang: Profil guru (`absensi_shift_guru` +
  `keuangan_gaji` → `guru_id`), Capaian anak (`rekap_prestasi` → `santri_id`), dan
  notifikasi (buku induk / tagihan / kenaikan / prestasi → `santri_id`; slip → `guru_id`).
  Peran **admin** berhenti berlangganan lima tabel besar yang datanya tak pernah dipakai
  (fungsi notifikasinya memang `return []` untuk non-santri/non-guru).
- Jalur persetujuan izin kini mengambil absensi guru pengaju lewat satu query kecil, bukan
  dari langganan tabel penuh — dan **melempar** kalau query itu gagal, sebab tanpa daftar
  yang benar penjaga "sudah hadir" akan lolos dan menimpa baris hadir guru lain.

### Tests

580 → **591 tes** (11 berkas baru/diperbarui): `rentangTanggal` (zona WIB dipaksa aktif +
bukti pola lama memang mundur), `scanTanpaAbsen`, `scopeQiraati`, `subscribeCollFilter`,
`putusanPembaruan`, `versiSkemaLama`, `ringkasSetorTarik` (termasuk penjaga eksplisit bahwa
total PDF == total kartu rekap per lembaga, bahkan untuk baris berjenis cacat).

---

## [v.1.2.7] — 2026-08-04 — Syahriyah gabungan + kas per lembaga + laporan PDF harian

Dua blok pekerjaan: **syahriyah gabungan** (3–4 Agu) dan **kas per lembaga + laporan harian**
(4 Agu), plus tiga perbaikan bug yang dilaporkan Kyai.

⚠️ **URUTAN DEPLOY — tiga langkah, jangan ada yang dilewat:**

1. `supabase db push` — satu migrasi baru `20260804120000_santri_upd_pj_ptpt.sql` (kebijakan
   RLS saja: tanpa perubahan skema, tanpa menyentuh baris data). Tanpa ini akun PJ PTPT tetap
   ditolak saat meluluskan santri.
2. `supabase functions deploy auto-generate-tagihan` — **kalau belum diredeploy sejak
   syahriyah gabungan masuk.** Tanpa itu cron harian memakai rumus lama dan hasilnya berbeda
   dari tombol Generate. Tak ada perubahan edge baru di blok kas per lembaga.
3. Deploy web **dari direktori utama** (worktree tak punya `vue-app/.env.local`).

Sesudahnya: rebuild AAB **vc127** + Electron **1.2.7**. Electron 1.2.7 > 1.2.6, jadi PC yang
sudah pasang 1.2.6 kali ini **ditawari auto-update** (tak perlu pasang NSIS manual seperti
rilis lalu).

**Yang perlu Kyai isi setelah deploy:** kolom **"Masuk Kas Lembaga"** di Pengaturan Keuangan →
Jenis Pembayaran, dan `gabung_ke`/paket/diskon anak guru — sebelum diisi, kedua mekanisme
sudah hidup tapi nominal & penggolongan kasnya belum berubah.

### Syahriyah gabungan + paket + diskon anak guru

Aturan syahriyah di lapangan: anak yang **sekolah + ngaji** di sini, syahriyah ngajinya
**sudah termasuk** di syahriyah sekolah (santri **fullday** sama polanya dengan ngaji sore) —
sebelum ini ia ditagih **dua kali**. Contoh Kyai: Ahmad (TPQ Jilid 5 + SDI I) bayar 200.000
termasuk ngaji 90.000; Zaidun (PTPT Kelas 3 + SDI II) juga 200.000 tapi komponen ngajinya
100.000. **TANPA migrasi DB** (semua field baru di ekor jsonb).

#### Added (Baru)

- **Penggabungan syahriyah** — jenis ngaji bisa disetel "digabung ke jenis lain" (boleh
  beberapa kandidat: SD/TK/PKBM/Kelas Baca — kandidat pertama yang berlaku menang) dengan
  syarat otomatis **Punya sekolah formal** / **Santri fullday** (versi ketat
  `sekolah_pagi`/`fullday_sore` tersedia bila `shift_ngaji` sudah lengkap). Wali melihat
  **satu** tagihan; saat dibayar, Buku Induk mencatat **satu baris per komponen** supaya
  laporan per lembaga tetap akurat.
- **Paket nominal bernama** + **diskon anak guru (persen)** per jenis pembayaran. Penanda
  anak guru & pilihan paket diisi manual di data santri (ikut template unduh/ekspor/impor).
- **Pengecualian manual per santri** — "Gabung Syahriyah: Otomatis / Selalu digabung /
  Jangan digabung" di form santri + kolom impornya.
- **Whitelist shift ngaji (pagi/sore)** pada jenis pembayaran — akar tagihan ngaji kembar.
  Santri yang `shift_ngaji`-nya belum diisi dianggap ikut **keduanya** (baru 30% terisi;
  menganggapnya "tak cocok" akan menghilangkan tagihan ngaji sebagian besar santri).
- **Pratinjau Generate** — tabel santri · bruto · diskon · ditagih · rincian komponen,
  bisa diperiksa **sebelum** tagihan terbit.
- **Rincian di kartu tagihan & struk** — "termasuk Syahriyah Qiraati Pagi Rp 90.000" dan
  baris diskon bila ada.

#### Changed (Perubahan)

- Rumus nominal jadi **satu sumber** (`utils/syahriyah.js`) untuk keempat jalur: tombol
  Generate, cron edge function, Generate Tagihan Khusus, dan POS. Sebelumnya empat salinan
  yang bisa menyimpang. Cermin Deno dijaga tes yang menjalankan kasus sama di kedua berkas.
- **Sel POS = tagihan hasil generate.** POS dulu punya rumus 3 lapis sendiri sehingga
  `nominal_per_santri` tak terbaca dan nominalnya bisa berbeda untuk santri yang sama.

#### Fixed (Perbaikan)

- **Konversi PSB → santri kini membawa status tinggal** (`is_mukim`/`is_fullday`). Formulir
  PSB sudah menyimpannya, tapi konversinya tak menyalin — jadi **setiap** santri hasil PSB
  jatuh "non-mukim", padahal whitelist status & syarat gabung fullday bergantung penuh pada
  flag itu. Hanya berlaku untuk konversi berikutnya; santri PSB lama perlu dikoreksi lewat
  form/impor.
- **Cron mengisi kolom riil `terbayar`** (bukan hanya `data.bayar` legacy).
- **Generate Tagihan Khusus kini membaca paket santri** (dulu hanya 3 lapis nominal).

### Kas per lembaga + laporan PDF harian + perbaikan Migrasi Lembaga & pita Electron

#### Added (Baru)

- **Kas per lembaga.** Jenis pembayaran punya pilihan **"Masuk Kas Lembaga"**; Buku Induk,
  Uang Kegiatan/Uang Buku, dan Tabungan masing-masing dapat penyaring **Lembaga** + kartu
  saldo/masuk/keluar per lembaga (klik kartu = saring). Penentunya **label pembayaran**, jadi
  satu tagihan gabungan yang dipecah per komponen jatuh ke kas masing-masing lembaga.
  Kas manual menunjuk lembaganya sendiri di form; tabungan ikut lembaga santri.
  **Nol mutasi data** — baris lama diturunkan saat dibaca, bukan ditulis ulang.
- **Laporan PDF harian per lembaga** untuk POS · Buku Induk · Uang Buku · Uang Kegiatan,
  plus **berkas TERPISAH untuk Tunai dan Transfer** (kebutuhan pengecekan manual harian).
  Judul & nama berkas ikut tanggal + lembaga + metode. Tanpa pustaka baru (jsPDF lazy).
- **Filter harian** di Uang Kegiatan/Uang Buku (dulu hanya tahun/bulan) + pilihan
  **Cara Bayar** pada input manualnya — tanpa itu semua entri manual tersimpul "Tunai"
  sehingga PDF Transfer selalu kosong.
- **Kas TPQ / Fullday / Ma'had bisa dipilih.** Pilihan "Masuk Kas Lembaga" dulu hanya
  dari master/lembaga, dan di master tidak ada baris **TPQ** payung, **Fullday**, maupun
  **Ma'had** (dua terakhir itu status santri, bukan lembaga) — ketiga kas itu mustahil
  dipilih. Kini tersedia, dengan keterangan cakupan (TPQ = TPQ Pagi/Sore, Pra PTPT, PTPT,
  PPPH). Beberapa lembaga boleh **berbagi satu kas** — mis. Kelas Baca diarahkan ke kas
  TPQ Pagi; itu setelan, bukan kode.
- **Syarat penggabungan "Santri Ma'had"** + **"ikut jenis tujuan"** pada jenis pembayaran.
  Aturan Kyai "syahriyah pondok sudah termasuk Syahriyah Qiraati Pagi & Sore" sebelumnya
  tak bisa dinyatakan: syarat yang ada hanya sekolah & fullday, sedangkan santri Ma'had
  bisa bukan keduanya — jadi ngajinya tetap terbit sendiri di samping Syahriyah Pondok,
  alias **tertagih dua kali**. Pilihan "ikut jenis tujuan" ada karena satu jenis ngaji
  kadang harus menempel ke sekolah untuk santri sekolah DAN ke Syahriyah Pondok untuk
  santri mukim, sementara syaratnya cuma bisa satu nilai. Nominal **belum berubah** sampai
  Kyai mengisi setelan penggabungannya.

#### Fixed (Perbaikan)

- 🔴 **Migrasi Lembaga (Salah Impor) tak lagi mengosongkan sekolah yang SAH.** Aturan (B)
  memakai daftar nama hardcoded warisan v.100 (`tk/sdi/pkbm/smp/sma`), sehingga sekolah
  tambahan **"Kelas Baca"** (tipe Formal) muncul sebagai **34 temuan siap dikosongkan** —
  menekan Terapkan akan menghapus `lembaga_sekolah` **dan** `kelas_sekolah` 34 santri.
  Sekarang menilai lewat `isSekolahLembaga` (baca `tipe:'Formal'` dari master). Kalau daftar
  master belum termuat, aturan (B) menghasilkan **nol** temuan — bukan jatuh ke daftar lama.
  Nama yang tak dikenal juga dibiarkan: satu typo lolos lebih baik daripada satu sekolah hilang.
- **Electron: tombol aksi halaman kadang tidak muncul** (Input Manual/Transaksi di Buku Induk,
  Tabungan, Uang Pos, Tagihan). Pita "Aksi Halaman" dilayani satu singleton, dan `onUnmounted`
  Vue berjalan **sesudah** `setup` halaman baru — jadi pindah halaman = halaman baru mendaftar,
  lalu halaman lama menghapusnya. Kini hanya pendaftar terakhir yang boleh mengosongkan.
  Halaman pertama yang dibuka memang selalu aman; yang kena adalah pindah antar halaman.
- **Laporan POS lengkap per periode.** Halaman Riwayat POS dulu memuat "400 baris
  terakhir" tanpa filter tanggal, sehingga laporan periode lama diam-diam tak lengkap.
  Kini yang dimuat adalah **periode terpilih** dari database, tanpa batas baris; rentangnya
  eksklusif di batas atas supaya baris yang `tanggal`-nya menyimpan jam ikut terambil.
  Default bulan = **bulan berjalan** (dulu "semua bulan") agar bukaan pertama tetap ringan.
- **Aturan (C) Migrasi Lembaga lepas dari nama yang dikunci** — sisi ngaji = lembaga
  bertipe Qiraati yang namanya menyebut "pagi"; sisi sekolah wajib sekolah formal menurut
  master. Hasil untuk data sekarang **persis sama** — daftar jenjang pagi sengaja tidak
  digeneralisasi ke semua sekolah formal, karena patch-nya mengosongkan data.
- 🔴 **Scope Gedung bolong di Riwayat POS.** Halaman ini satu-satunya view keuangan yang
  tak pernah dipasangi scope gedung (Buku Induk & Uang Pos sudah sejak v.111) — admin
  gedung bisa melihat, **menghapus**, dan mencetak PDF transaksi gedung lain. Kini
  disaring di satu tempat sehingga daftar struk, rekap per lembaga, laporan PDF, tombol
  hapus, dan angka "baris termuat" semuanya ikut; subjudulnya menyebut "Hanya gedung X".
- **Hitungan & total mengikuti penyaring yang aktif.** Di Riwayat POS, jumlah transaksi
  dan totalnya dulu tak melihat filter lembaga (memilih TPQ mengubah jumlah baris kas
  saja). Total kini = jumlah baris kas yang tersaring, dan labelnya menyebut kasnya
  ("Total kas TPQ") — satu transaksi bisa berisi komponen dua lembaga, jadi total
  transaksi ≠ total kas satu lembaga. Badge tab **Antrian Tes** juga ikut penyaring
  (dulu dari daftar mentah, jadi 3 kartu terlihat tapi tab menulis 40).
- **PJ PTPT bisa memproses kelulusan santri tes.** Tombol LULUS menulis baris `santri`
  (kenaikan) sebelum menulis `tes_kenaikan`, dan UPDATE `santri` hanya terbuka untuk admin,
  santri ybs, dan **guru pengampu** — sementara hak PJ diturunkan dari field lain
  (`santri.pj_ptpt`). Ditambah kebijakan `santri_upd_pj_ptpt` yang mencerminkan gerbang UI.
  Karena itu Tolak/Belum Lulus selalu jalan; hanya LULUS yang gagal.

---

## [v.1.2.6] — 2026-07-27 — Filter status santri di syahriyah + scope admin keuangan

Rilis perbaikan. **TANPA migrasi DB.** ⚠️ Butuh **redeploy edge function** (bukan cuma web):
`supabase functions deploy auto-generate-tagihan --no-verify-jwt`.

### Added (Baru)

- **Filter status santri di Jenis Syahriyah** — tiap jenis pembayaran kini bisa ditargetkan
  ke status santri (**Non-mukim / Ma'had / Fullday**), sejajar dengan whitelist lembaga.
  Kosong = semua status. Berlaku di generate tagihan manual, **cron auto-generate** (edge
  function), dan pilihan jenis di **POS Santri**. Sumber: field `is_mukim` / `is_fullday`.

### Changed (Perubahan)

- **Admin Keuangan yang merangkap guru ngaji** kini di menu Pendidikan hanya melihat santri
  **KELASNYA** (qiraati/sekolah), bukan semua santri — sebelumnya keliru dapat akses penuh
  karena ber-role 'admin'. Data keuangan tak terpengaruh (jalur `useKeuangan` terpisah).
- **Tes Kenaikan**: admin keuangan tak lagi jadi penguji/lihat-semua. Yang merangkap guru
  ngaji tetap bisa **mengajukan tes untuk santri kelasnya sendiri** (jalur pengaju ter-scope).

## [v.1.2.5] — 2026-07-26 — Tanggal lulus/naik bisa diatur di Antrian Tes + status "Dibatalkan"

Rilis perbaikan kecil. **TANPA migrasi DB** (murni frontend; kolom `tes_kenaikan.status`
sudah bertipe `text` tanpa constraint) — cukup deploy web + rebuild AAB/Electron.

### Added (Baru)

- **Tanggal lulus/naik dapat diatur** di Antrian Tes Kenaikan (super_admin/Kepala/PJ).
  Field tanggal muncul di kartu antrian **dan** di modal "Lulus & Naikkan" (tersinkron),
  default hari ini, bisa dimundurkan bila tes benar terjadi di tanggal lampau. Tanggal ini
  menyetir **cap kartu kenaikan, riwayat, `tgl_naik`, `tgl_hasil`, masa tempuh juz**, dan
  **periode rapor** (nilai tes mendarat di semester sesuai tanggal, bukan selalu semester
  berjalan). Hanya berlaku untuk keputusan **Lulus**; Belum Lulus/Tolak tetap waktu sekarang.

### Changed (Perubahan)

- **Ajuan yang dibatalkan pengaju** kini berstatus **"Dibatalkan"** (bukan lagi "Ditolak") —
  dibedakan dari penolakan penguji: label netral, tak memicu notifikasi "Ditolak" ke pengaju,
  dan tak ikut dihitung di statistik/% kelulusan Rekap.

## [v.1.2.4] — 2026-07-25 — Shift ngaji santri, hitung kelas pagi-saja, filter kelas-guru, agenda kalender

Rilis perbaikan + fitur. **TANPA migrasi DB** (murni frontend) — cukup deploy web.

### Added (Baru)

- **Shift Ngaji santri** (Pagi & Sore / Pagi saja / Sore saja) di Form Santri & dialog Edit
  Kelas + kolom impor/ekspor. Chip "Pagi saja"/"Sore saja" muncul di kartu Data Santri.
- **Filter "Kelas (Guru)"** di Data Santri — pilih rombel (pasangan guru, mis. "Lailatul &
  Azuma · 12 santri") untuk memantau per kelas; menyempit otomatis ke lembaga terpilih.
- **Agenda kegiatan ber-scope lembaga** di Kalender (seperti jenis libur) — agenda yang
  ditandai lembaga hanya tampil & dinotifikasi ke lembaga tersebut.

### Fixed (Perbaikan)

- **Perhitungan kelas**: santri yang hanya ikut pagi/sore (guru sisi lain sengaja dikosongkan)
  tak lagi terpisah menjadi kelas 1-santri sendiri — kini menempel ke kelas pasangan yang
  berbagi gurunya (`1 kelas = pasangan guru`). Berlaku di KPI Kelas Total & detail lembaga.
- **Agenda kegiatan tak muncul di notifikasi** — dulu Notif hanya memproses tipe "libur";
  kini agenda (tipe "kegiatan") ikut muncul sesuai audience & scope lembaga.

---

## [v.1.2.3] — 2026-07-25 — Shift kustom, libur per lembaga, KPI absen, bonus tepat waktu

Rilis perbaikan + fitur. **TANPA migrasi DB** (murni frontend) — cukup deploy web.

### Added (Baru)

- **Impor shift kustom via NOMOR** di Data Guru (kolom `Shift (nomor, pisah |)`, mis. `1|4`);
  kolom kosong = shift_ids TIDAK disentuh. Tombol **"Perbaiki Shift"** (super_admin, Absensi
  Guru) membetulkan baris absen yang shift-nya bukan milik guru (hitung ulang dari jam scan).
- **Libur per lembaga** di Kalender Kegiatan (mis. sekolah libur tapi ngaji tetap masuk) —
  memengaruhi rekap alpa absen guru & bisyaroh per_jp.
- Hitungan bisyaroh **"× tepat waktu"** (`per_tepat`) — hanya hadir tepat waktu (buang
  terlambat), untuk Bonus Tepat Waktu.
- **KPI absen pribadi** di Personal: Tepat Waktu · Terlambat · Cuti + % Tepat Waktu / %
  Kehadiran + grafik **Kehadiran per Bulan** (8 bulan terakhir).

### Fixed (Perbaikan)

- Form guru **pegawai murni** (jabatan ber-unit Yayasan, mis. Admin Keuangan) tak bisa
  disimpan karena validasi lembaga salah (`butuhLembaga` → `isPengajar`) → `shift_ids`
  pegawai jadi kosong.
- Impor guru dulu MENGHAPUS `shift_ids` kustom; kini kolom nomor kosong tak menyentuhnya.
- **Kepala sekolah + guru ngaji**: Data Santri kini terpisah sub-tab Qiraati / Sekolah
  (dulu tercampur karena sisi Sekolah dicocokkan ke lembaga ngaji akun).
- Izin/cuti: approver **tak bisa menyetujui izinnya sendiri** (otomatis naik ke atasan).

### Changed (Perubahan)

- **Rekap prestasi bulanan** kini HANYA lembaga **PTPT & PPPH** (TPQ Pagi/Sore/Pra PTPT tak
  perlu prestasi bulanan).

---

## [v.1.2.2] — 2026-07-22 — Absen pulang per shift, penugasan glondongan, rekap penyimak

Rilis perbaikan + fitur. **Ada 1 migrasi DB** (`20260722120000_auth_is_pj_lembaga_ketat`) —
jalankan `supabase db push` SEBELUM deploy web. Edge Function `hiview-absen` WAJIB
di-redeploy (`supabase functions deploy hiview-absen --no-verify-jwt`).

### Fixed (Perbaikan)

- **Ceklok pulang sebelum shift bubar akhirnya tercatat.** Riwayat absen menulis "belum
  pulang" padahal gurunya sudah scan pulang. Sebabnya window jam MASUK sebuah shift
  membentang `mulai`..`selesai` (sengaja lebar supaya yang telat tetap tercatat hadir),
  jadi scan pulang yang terjadi sebelum shift bubar masih jatuh di dalam window shift-nya
  sendiri — kalah dari scan terawal lalu dibuang diam-diam. Pass pulang pun mensyaratkan
  "pulang harus setelah shift bubar", sehingga pulang lebih awal tak pernah tercatat.
  Aturan baru (`utils/shiftDerive.pilihShiftPulang`): pulang menempel ke shift yang PALING
  BELAKANGAN dimasuki, minimal 30 menit sesudah jam masuknya (penjaga anti scan-dobel).
  Berlaku di sync Ammu Desktop (Fingerspot Revo) maupun Edge Function HiView.
- **Kepala lembaga lain tak lagi terbaca sebagai PJ PTPT.** Aturan lama cuma mencari kata
  `kepala|pj|pengasuh` di jabatan lalu mencocokkan field lembaga — sehingga guru berjabatan
  **"Kepala SDI"** yang ditempatkan di PTPT ikut terdaftar sebagai PJ PTPT di tab Peran.
  Sekarang jabatannya wajib MENYEBUT lembaganya (`PJ PTPT` / `Kepala PTPT`). Diperketat
  sampai level RLS (`auth_is_pj_lembaga`), dan murni mempersempit — tak ada PJ sah yang
  kehilangan akses.

- **Dropdown "Kelas/tingkat tujuan" & "Khotam ke" di Lulus & Naikkan tampil kosong.** Kedua
  daftar itu hardcoded dan sudah tak cocok dengan data: Master Data menulis `Level ½ Juz` …
  `Level 3 Juz` (PTPT `1`..`6`) sedangkan kode menawarkan `Level 1`..`Level 5`
  (`Kelas 1`..`Kelas 6`), dan khotam dipatok I..V padahal Level 3 Juz punya I..IX. Daftar
  kini dibaca dari `master/lembaga.kelas_list` + kartu kenaikan; daftar lama tinggal jadi
  cadangan bila Master Data kosong. **Catatan: Naik Kelas (menu terpisah) masih memakai
  daftar hardcoded yang sama** — belum disentuh karena di luar lingkup laporan.
- **Kartu kenaikan Pra PTPT tak pernah tercap.** Label jenjang di Master Data
  (`Level 3 Juz`) berbeda bentuk dari label kartu (`Level 5 (3 Juz)`), sehingga pencarian
  blok kartu selalu gagal dan capnya dilewatkan diam-diam. Ditambah pencocokan cadangan
  lewat urutan/index (hanya jalan bila pencocokan label gagal dan jumlah jenjangnya sama).

### Added (Fitur baru)

- **Santri yang menamatkan jenjang terakhir naik ke lembaga berikutnya.** Rantai qiraati
  TPQ Pagi/Sore → Pra PTPT → PTPT → PPPH. Syaratnya dua, bukan satu: kelas asalnya jenjang
  terakhir lembaga itu **dan** target tesnya item terakhir jenjang itu — jadi `Level 3 Juz`
  - `Khotam IX` pindah ke PTPT, sedangkan `Level 3 Juz` + `Khotam V` tetap di Pra PTPT.
    Dialog Lulus & Naikkan kini punya pilihan **Lembaga tujuan** (bisa dikoreksi), penegasan
    saat berpindah lembaga, dan pilihan **PJ PTPT** saat tujuannya PTPT.
- **Penugasan glondongan menyembunyikan penyimak yang masih bertugas.** Guru yang masih
  memegang blok ber-status "ditugaskan" tak lagi muncul di dropdown penugasan, lengkap
  dengan keterangan berapa nama yang disembunyikan. Tombol "tampilkan semua guru PTPT"
  kini selalu tersedia sebagai jalan keluar — di mode itu yang sibuk ikut tampil dengan
  label "sedang menyimak N blok", jadi dobel-tugas tak pernah terjadi diam-diam.
- **Tab Rekap Penyimak Glondongan** — seperti Rekap Bisyaroh tapi tanpa nominal, sehingga
  koordinator & PJ boleh melihatnya. Kolom Penyimak / Blok / Juz / Santri, filter bulan,
  ekspor PDF.
- **Ekspor PDF di Rekap Bisyaroh Glondongan.** Kolom Santri ikut ditambahkan ke tabel
  layarnya supaya layar & PDF sinkron; total santri dihitung unik.

---

## [v.1.2.1] — 2026-07-22 — Lembaga sekolah baru dikenali; penyaring guru & lembaga jadi satu sumber

Rilis perbaikan. Tanpa migrasi DB, tanpa perubahan skema.

### Fixed (Perbaikan)

- **Lembaga sekolah yang baru ditambah akhirnya terdeteksi sekolah.** Aplikasi mencocokkan
  NAMA lembaga ke daftar hardcoded `['TK','SDI','MI','MTS','MA','SMP','SMA','PKBM']`, padahal
  penanda yang diisi di Master Data adalah tipe **"Formal (Sekolah)"**. Akibatnya lembaga di
  luar daftar itu tak pernah muncul di dropdown Lembaga Sekolah (form guru & santri), tak
  terhitung di statistik, dan tak ada di pilihan Kenaikan / Mutasi / Assign Guru Kelas.
  Deteksi kini membaca Master Data dulu: `tipe` → `group` → konstanta sebagai cadangan.
- **Ma'had tak lagi salah dihitung sekolah** di statistik — pencocokan lama berbasis
  substring, dan `"MA'HAD"` mengandung `"MA"`.

### Android

- **Target Android 16 (API 36).** Google Play menolak update aplikasi yang target API-nya
  lebih lama dari 1 tahun; tenggatnya 31 Agustus 2026 dan AMMU masih di API 35. Capacitor
  8.4.2 sebenarnya sudah default ke 36 — yang menahan di 35 justru `variables.gradle`
  proyek. Tiga perubahan perilaku Android 16 yang ikut menyala sudah diperiksa dan tak ada
  yang perlu ditambal: edge-to-edge (sudah dipasang penuh sejak v.1.1.x, tak ada
  `windowOptOutEdgeToEdgeEnforcement`), predictive back (`@capacitor/app` memakai
  `OnBackPressedDispatcher` AndroidX, bukan `onBackPressed()` lawas), dan pengabaian kunci
  orientasi di layar besar (manifest memang tak pernah mengunci orientasi).
  versionCode tetap 121 — vc121 belum pernah diupload, jadi tak perlu nomor baru.

### Changed (Penyederhanaan)

- **Beban Mengajar Sekolah cukup diisi JP per minggu per guru.** Dulu satu baris = satu
  mapel + daftar hari + JP per pertemuan, sehingga seorang guru bisa perlu 6–8 baris. Kini
  satu baris = guru + sekolah + total JP sepekan. JP dibagi rata ke **Hari Aktif Sekolah**
  (pengaturan baru, sekali per sekolah) sehingga pemotongan saat guru tak masuk tetap jalan.
- **Bug ikutan: baris yang diinput manual selalu bisyarohnya Rp 0.** Dialog "Tambah" punya
  pilihan hari, tapi fungsi simpannya menjatuhkan field itu — JP mingguan jadi `jp × 0`.
  Hanya baris hasil Impor Excel yang selamat. Hilang sendiri karena kolom hari dibuang.

### Changed (Konsolidasi)

- Penyaring status guru `String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'` yang
  tersalin di 7 tempat kini menunjuk satu sumber `isGuruAktif` / `guruAktifSaja`. Duplikasi
  inilah yang dulu melahirkan bug Ceremonial (`status !== 'Non-Aktif'` — string yang tak
  pernah ditulis siapa pun, jadi penyaringnya tak pernah bekerja berbulan-bulan).
- Deteksi lembaga qiraati/sekolah dipusatkan ke `groupOfLembaga` / `isSekolahLembaga` /
  `sekolahTierList` di `composables/useLembaga.js`.
- 30 tes baru mengunci keduanya, termasuk bukti kesetaraan sebelum/sesudah untuk jalur
  bisyaroh dan untuk daftar kenaikan sekolah.

### Belum dikerjakan

- **Rekap Diniyah** masih terkunci ke `['SDI','PKBM']` di 4 tempat. "Diniyah" bukan sinonim
  "sekolah" (TK sekolah tapi tak menerbitkan Diniyah) dan Master Data belum punya penanda
  "lembaga ini menerbitkan rapor Diniyah" — butuh keputusan, bukan sekadar konsolidasi.

---

## [v.1.2.0] — 2026-07-21 — PTPT: scope PJ, urutan glondongan, notifikasi & perbaikan impor

Rilis fitur PTPT + sejumlah bug senyap yang ditemukan sambil jalan. Tanpa migrasi DB
kecuali satu: tabel `pengaduan` (fitur lama yang ternyata tak pernah masuk `main`).

### Added (Fitur baru)

- **PJ PTPT hanya melihat santri ampuannya** di Tes Kenaikan, Glondongan, dan Ceremonial
  (label `santri.pj_ptpt`). PJ kini lebih dari satu orang. super_admin tetap melihat semua;
  koordinator tetap per kategori mukim; peran boleh menumpuk (haknya digabung).
- **Masa tempuh antar-juz PTPT** — hari efektif lembaga (kalender minus Jumat minus libur
  Kalender Kegiatan) antara lulus juz sebelumnya dan juz ini. Tampil untuk guru kelas
  (tab Status Ajuan) dan PJ (tab Riwayat), serta per juz di kartu kenaikan.
- **Tab Peran Glondongan** — dua daftar terpisah, Koordinator (yang menugaskan) dan
  **Penyimak** (yang boleh ditugaskan menyimak), masing-masing per cakupan Ma'had /
  Selain Ma'had / Keduanya. Dropdown penguji kini disaring ke penyimak kategori santrinya;
  sebelumnya siapa pun guru PTPT aktif bisa ditunjuk tanpa pembatas.
- **Glondongan dikerjakan berurutan** dari kelas asal terkecil; review juz berjalan menunggu
  semua glondongan selesai.
- **Kontak di tempat yang tepat** — WA penyimak & guru kelas di menu Glondongan; WA wali &
  penyimak glondongan di kartu ajuan milik guru pengaju.
- **Notifikasi** ke santri yang dijadwal glondongan, serta ke penyimak guru, penyimak santri,
  dan peserta ceremonial (+ tombol kirim ulang bila jadwal berubah).
- **Santri boleh dijadwal di beberapa sesi ceremonial** (kelas 2 memang dipecah 2 sesi).
- **1 kelas Qiraati = sepasang guru** (pagi & sore) di form naik kelas — dropdownnya kini
  menampilkan dua nama sekaligus sebagai satu pilihan.
- Ekspor PDF kelas per lembaga menampilkan sisi ngaji **dan** sekolah sekaligus (lembaga,
  kelas, juz, guru).
- **Layanan Pengaduan** dipasang ulang ke `main` — fitur 6 Jul yang ternyata tak pernah
  di-merge sehingga tak pernah ter-deploy.

### Fixed (Perbaikan)

- **Impor santri tak lagi menghapus kolom yang sudah terisi.** Kolom kosong di file kini
  dilewati, bukan menimpa dengan string kosong. Ikut tertutup dua kehilangan data senyap:
  kolom L/P kosong dulu mengubah **semua santri jadi laki-laki**, dan Status Aktif kosong
  **menghidupkan kembali** santri yang sudah dinonaktifkan.
- **NIS Dinas tak lagi menimpa No. Induk** yang digenerate aplikasi. Heuristik lama menebak
  kolom `NIS` sebagai nomor pondok bila file tak punya kolom `No. Induk`.
- **Kartu kenaikan PTPT tak lagi bergeser satu kolom.** Lulus tes juz 10 dulu mencap kolom
  Juz 11 (juz tujuan). Sekarang mencap juz yang benar-benar lulus, di blok kelas yang benar.
- **Juz terakhir tiap kelas tak lagi terpotong** di editor kartu — input tanggal punya lebar
  minimum bawaan browser dan pembungkusnya memotong diam-diam tanpa scrollbar.
- **Pindah guru saat naik kelas kini berefek.** Dulu hanya field `guru` yang ditulis,
  sedangkan statistik & filter ampuan membaca `guru_pagi`/`guru_sore`.
- **Push glondongan tak pernah terkirim.** Target `{type:'guru', id}` tak dikenali
  `dispatch-push` yang hanya menerima `nama`, jadi tiap penugasan berakhir
  `failed: No tokens` tanpa ada yang tahu.
- **Baris glondongan yatim** setelah tes dihapus — `ajuan_id` hanya FK logis tanpa cascade.
  Selain namanya nyangkut, baris yatim berstatus selesai **masih ikut terhitung bisyaroh**.

### Changed (Perubahan)

- Pilihan "jenis kenaikan" dihapus dari tab Ajukan — kelas PTPT turun otomatis dari juz.
  Record lama berjenis `kelas` tetap terbaca.

---

## [v.1.1.8] — 2026-07-15 — Audit: tutup kebocoran era-Firestore + benahi jalur simpan

Rilis hasil audit menyeluruh. Tidak ada fitur baru — isinya menutup satu kebocoran
data yang nyata dan membenahi jalur simpan yang bisa gagal diam-diam.

### Security (Keamanan)

- **Cloud Functions & extensions era-Firestore DICOPOT** (56 fungsi → 0). Sisa migrasi
  Supabase yang ternyata masih ter-deploy — dan sebagian bocor:
  - `findUserByLogin` membalas record guru penuh (nama, WA, jabatan, `role_sistem`,
    `firebase_uid`) **tanpa autentikasi apa pun**, CORS terbuka. Jalur santri identik.
    Bonus: full-collection scan tanpa limit pada input tak-cocok = vektor biaya/DoS anonim.
  - `verifyAdminPassword` = oracle brute-force sandi tanpa rate-limit; `?migrate=1` menulis
    ke Firestore tanpa sandi sama sekali.
  - `stripPlaintextPasswords` = batch update massal, tanpa auth, sandi fallback `'1234'`.
  - Ikut mati: 2 cron yang masih menulis ke Firestore yatim tiap bulan, dan 9 extensions
    BigQuery (37 fungsi) yang sumbernya Firestore mati. Dataset BigQuery historis aman.
- `firebase.json` tak lagi mendaftarkan `functions` → `firebase deploy` polos tak bisa
  membangkitkannya kembali. Firebase kini **Hosting + FCM saja**.

### Fixed (Perbaikan)

- **Simpan yang ditolak RLS tak lagi lolos sebagai "sukses".** PostgREST tak memberi error
  saat RLS menolak UPDATE (cuma 204/0 baris), dan jalur cepat `db.js updateOne` tak
  memeriksanya — jadi UI bilang tersimpan, lalu data tampak "balik" sesudah refresh.
  Ironisnya pemanggil sudah siap menangani gagal, tapi justru menghitungnya sebagai sukses
  (mis. generator NIS, ubah status guru, batalkan tagihan VA).
- **`updateOne` tak lagi meng-UPSERT baris tak-ada** → tak bisa lagi melahirkan stub row
  cacat. Kedua jalur (kolom riil & jsonb) kini berperilaku sama; `mergeOne` sengaja tetap
  boleh membuat baris (kontraknya cermin `setDoc(merge:true)`).
- **Kolom `terbayar` jadi sumber kebenaran** — sebelumnya tak pernah diisi siapa pun (semua
  menulis `bayar`/`dibayar` ke jsonb), jadi selalu 0 dan laporan SQL yang mempercayainya
  akan diam-diam salah. Tampilan aplikasi tidak berubah.
- **Kelola Jabatan**: menghapus jabatan terakhir tak lagi memunculkan (dan menulis balik)
  17 jabatan default, sehingga daftar yang sengaja dikosongkan tidak tertimpa.
- `.husky/pre-commit` tak lagi memblokir **penghapusan** file sensitif (yang berbahaya itu
  menambah, bukan membuang).

### Notes (Catatan Rilis)

- ⚠️ **`supabase db push` WAJIB dijalankan LEBIH DULU**, sebelum deploy web/Electron —
  migrasi `20260715120000` mem-backfill kolom `terbayar` dari jsonb. Kalau terbalik,
  tagihan lama sempat terbaca `terbayar = 0` (helper punya fallback, tapi jangan diandalkan).
- `bayar`/`dibayar` lama di jsonb sengaja TIDAK dihapus — jaring pengaman untuk Electron
  yang masih memuat snapshot bundle lama. Bersihkan di rilis berikutnya.
- Uji tumbuh 53 → 76 (pertama kalinya `db.js` punya tes).

---

## [v.1.1.7] — 2026-07-14 — Uang Kegiatan & Uang Buku + Editor Keuangan

Dua pos dana baru di Keuangan: **Uang Kegiatan** dan **Uang Buku**. Masing-masing
punya rekap saldo tersendiri + input keluar/masuk manual, dan pemasukannya bisa
otomatis dari pembayaran POS — namun semua tetap tercatat & terhitung di Buku Induk.

### Added (Fitur Baru)

- **Menu "Uang Kegiatan" & "Uang Buku"** — rekap "pos/kantong dana" di atas ledger
  Buku Induk. Tiap pos punya kartu saldo (masuk/keluar/saldo), tabel transaksi, dan
  input keluar/masuk manual. Satu komponen (`UangPosView`) dipakai dua route.
- **"Pos Dana" per Jenis Pembayaran** (Pengaturan Keuangan → Jenis Pembayaran) —
  tandai sebuah jenis sebagai Kas Umum / Uang Kegiatan / Uang Buku. Saat dibayar via
  POS, pemasukannya otomatis masuk rekap pos terkait.
- **Pos Dana juga di Generate Tagihan Khusus** — dropdown Pos Dana (auto dari jenis),
  tersimpan di tagihan; saat dibayar otomatis masuk rekap posnya (walau kategori manual).
- **Editor Kategori Tabungan** (Pengaturan Keuangan → tab Kategori) — tambah/hapus/
  rename kategori tabungan + nominal default (dipakai menu Tabungan → Input Mutasi).

### Changed (Perubahan)

- Pembayaran POS kini ikut menandai `pos` pada baris Buku Induk bila jenisnya
  tergolong Uang Kegiatan/Buku (tanpa dobel-hitung; total tetap di Buku Induk).
- Versi semua platform → `v.1.1.7` / `versionCode 117` (vc115 & vc116 dilewati — belum
  pernah dirilis ke Play).

### Fixed (Perbaikan)

- **Pengaturan Keuangan "balik ke default setelah refresh"** — form dimuat sebelum
  store settings selesai fetch dari DB (`onMounted` tak `await settingsStore.load()`),
  jadi refresh langsung di halaman ini menampilkan nilai basi walau data sudah
  tersimpan. Kini await load dulu (samakan dengan halaman Pengaturan lain).
- **Bendahara (`admin_keuangan`) gagal simpan pengaturan diam-diam** — RLS tabel
  `settings` hanya mengizinkan super_admin/admin menulis (UPDATE ditolak → 0 baris,
  tanpa error). Ditambah izin `auth_can_keuangan()` (kecuali key `admin`) via migration
  `20260714120000_settings_write_keuangan.sql`.

### Catatan

- Fitur Uang Kegiatan/Buku: pos disimpan di kolom `data` jsonb `keuangan_buku_induk`
  yang sudah ada (tanpa tabel baru). Scope pos ikut Buku Induk (per-gedung).
- **Deploy:** ada 1 migration RLS `settings` (fix bendahara) → jalankan
  `supabase db push` DULU, baru deploy web. Rebuild AAB/Electron untuk bawa fix load
  ke native/desktop.

---

## [v.1.1.4] — 2026-07-02 — Pisah Login Santri/Wali & No. Induk Tetap

Perbaikan administrasi & pengalaman login: identitas No. Induk santri dikunci
(tak lagi acak ulang), template impor lengkap, dan layar login memisahkan jalur
santri/wali dari guru/pegawai untuk mengatasi 1 nomor WA yang dipakai keduanya.

### Added (Fitur Baru)

- **Toggle login "Santri / Wali" vs "Guru / Pegawai"** — 1 nomor WA bisa dipakai
  guru yang juga wali santri. Sebelumnya WA selalu masuk ke akun guru (prioritas)
  sehingga akun anak tak terjangkau; kini wali pilih tab "Santri/Wali" lalu ketik
  WA/No. Induk → masuk sisi santri, dan dropdown "ganti anak" (multi-anak) yang
  sudah ada bisa dipakai. Pilihan tab diingat per perangkat.
- **Kolom `Gedung` & `PJ PTPT` di template impor/ekspor santri** — via registry
  `services/santriFields.js` (sumber tunggal kolom template/ekspor/impor).

### Changed (Perubahan)

- **No. Induk santri jadi TETAP** — pasca impor tidak lagi reshuffle SEMUA nomor.
  Santri yang sudah punya No. Induk dibiarkan; hanya santri baru (impor/form) yang
  diberi nomor **melanjutkan** dari No. tertinggi (max+1), urut tgl lahir tertua.
  Impor juga tidak menimpa No. Induk lama dengan sel kosong.
- Versi semua platform → `v.1.1.4` / `versionCode 114`.

### Catatan

- Login: perubahan RPC `resolve_login` (param sumber) — **`supabase db push` DULU,
  baru deploy web** (client baru butuh RPC 2-argumen; aman-mundur untuk client lama).
- Tool manual "Generate No. Induk" (Master Data, super admin) tetap bisa reshuffle
  penuh secara opt-in (preview + konfirmasi), bukan otomatis.

---

## [v.1.1.3] — 2026-07-02 — Tes Glondongan PTPT

Menambah alur penilaian **Tes Glondongan PTPT**: muroja'ah kumulatif juz kelas lampau
sebelum santri naik juz, terpisah dari tes juz berjalan. Sekaligus menyamakan versi semua
platform (web/PWA/Electron/Android) ke `v.1.1.3` dan menambal kolom template impor santri.

### Added (Fitur Baru)

- **Tes Glondongan PTPT** — saat santri mengajukan tes juz, baris glondongan otomatis
  dibuat: PJ menguji juz tersebut (→ rapor), guru kelas menguji juz kelas berjalan, dan
  glondongan menguji **semua** juz kelas lampau (blok 5-juz per kelas asal, ditugaskan
  **koordinator kelas asal**). Tabel baru `tes_glondongan`.
- **Tab Penugasan / Tugas Menilai / Catatan** — koordinator meng-assign penilai; penilai
  input nilai per juz (format PJ) + catatan evaluasi per santri.
- **Bisyaroh glondongan per juz** — tarif `keu_glondongan_per_juz` di **Pengaturan Keuangan**
  (tab Bisyaroh), **Rekap Bisyaroh** (Σ juz selesai × tarif) untuk admin keuangan/super admin,
  dan integrasi ke **slip gaji** guru (snapshot + take-home + receipt/PDF).
- **Kolom `Gedung` & `PJ PTPT` di template impor/ekspor santri** — sebelumnya field ada di
  form tapi ketinggalan di template. Ditambah `services/santriFields.js` sebagai **sumber
  tunggal** definisi kolom (template + ekspor + impor) → field baru cukup 1 entri, otomatis
  terdeteksi di ketiga tempat.

### Changed (Perubahan)

- **Versi semua platform disamakan** ke `v.1.1.3` / `versionCode 113` (web, PWA, Electron,
  Android, dan lockfile root/vue yang sebelumnya masih skema lama `99.0626`/`110.0626`).
- Nilai glondongan & juz berjalan = **catatan evaluasi** (tidak masuk rapor), selalu lulus;
  hanya juz yang diuji PJ yang masuk rapor.

### Catatan

- Tabel `tes_glondongan` perlu `supabase db push` sebelum fitur Glondongan aktif penuh.
- Bisyaroh glondongan bersifat **global** (tidak ter-scope gedung), konsisten dgn kebijakan gaji.

---

## [v.1.1.2] — 2026-06-30 — Sistem "Gedung" (Pemisahan Keuangan & Akademik per Unit)

Memecah administrasi keuangan & akademik menjadi beberapa **Gedung** (unit), sehingga
2 admin keuangan yang berbeda tempat bisa pegang kas & laporan sendiri tanpa tercampur,
dan santri Pra PTPT/PTPT tidak lagi campur antar kelompok. Tanpa migrasi DB.

### Added (Fitur Baru)

- **Dimensi "Gedung"** — penanda unit per santri (field `gedung`, diisi manual atau lewat
  template impor) yang menyetir scope keuangan **dan** akademik. Master Gedung dikelola di
  **Master Data → Gedung** (default: _Gedung TPQ Pagi_ & _Gedung Induk_, bisa ditambah).
- **PJ PTPT** — field penanggung jawab PTPT per santri (khusus PTPT, ada di template impor) →
  tiap PJ bisa memfilter santrinya.
- **Buku Kas per gedung** — tiap admin keuangan hanya melihat & input kas gedungnya;
  **Buku Induk** (gabungan seluruh gedung) khusus **super admin**.
- **Filter Gedung & PJ PTPT** di Data Santri — memisahkan Pra PTPT (Usia Dini vs lainnya)
  & PTPT per PJ agar tidak tercampur.
- **Assign gedung ke akun admin keuangan** (Data Guru → role Admin Keuangan); kosong = lihat semua.

### Changed (Perubahan)

- **Keuangan ter-scope per gedung** — POS Santri, Tabungan, Uang Saku, Verifikasi Transfer,
  Riwayat Santri, Generate Tagihan, Dashboard & Laporan Keuangan otomatis tersaring ke gedung
  admin keuangan yang login.
- **Uang ikut gedung santri** (online = offline) — pembayaran/tabungan selalu masuk kas yang benar.
- **Data Santri (akademik) ter-scope per gedung** untuk akun ber-gedung.
- **Bisyaroh / gaji guru tetap GLOBAL** (tidak ter-scope) — sesuai kebijakan.
- Versi aplikasi web dinaikkan `v.1.1.1` → `v.1.1.2` (sekaligus menyamakan git dengan rilis live).

### Fixed (Perbaikan)

- **Data guru/santri kosong padahal "seolah login"** — auto-recovery sesi Supabase "zombie":
  saat token (refresh) mati, app kini otomatis membersihkan sesi basi & mengarahkan ke halaman
  login ("Sesi berakhir — silakan masuk kembali") alih-alih menampilkan data kosong. Sebelumnya
  harus logout/login atau hard refresh manual.

### Catatan

- Super admin & akun admin keuangan **tanpa gedung** tetap melihat semua data (tidak ada yang hilang).
- Field `gedung`/`pj_ptpt` disimpan di kolom `data` jsonb → **tanpa migrasi database**.
- View akademik lain (Rekap/Rapor/Absensi/Naik Kelas) belum ikut auto-scope gedung; pemisahan
  Pra PTPT tetap tersedia via filter Gedung di Data Santri.

---

## [v.109.23.0515] — 2026-05-14 — Font Elegant + Icon Maskable Polish

**SW_VERSION:** `v312-0515-elmessiri-spectral`

Cycle besar v.109.1 → v.109.23, ringkas dari 23 micro-release jadi 1 entry README-friendly.

### UX / Visual (JamHijri widget)

- **v.109.13** — Fix tanggal Hijri: dari Latin transliteration (`28 Zulkaidah 1447 H`) → Arabic native (`٢٨ ذُو ٱلْقَعْدَة ١٤٤٧`) via `NAMA_BULAN_ARAB` array + `toArabicDigit()`
- **v.109.14** — Restructure layout: hapus icon mosque + label "HARI INI", pindah hari (KAMIS) ke atas
- **v.109.21** — Badge KAMIS dengan BG tipis transparent (pill style), spacing breathable
- **v.109.23** — Font elegant:
  - **El Messiri** untuk tanggal Hijri Arabic (modern naskh smooth)
  - **Spectral italic** untuk tanggal Masehi + jam digital (serif transitional)
  - **Manrope 600** untuk label/badge (less bold dari sebelumnya)

### UI Profil & Header

- **v.109.14** — Profile dropdown di pojok kanan atas (avatar bulat → menu "Pengaturan Profil" + "Logout")
  - Click-outside auto-close + ESC keyboard handler
  - ARIA `aria-haspopup`, `aria-expanded`, `role="menu"` accessibility

### Bug Fixes (Critical)

- **v.109.1 — v.109.4** — Swal modal freeze investigation & fix:
  - LAZY INIT `_toastMixinInstance` + retry mechanism + CSS hard override
  - Logout button replace Swal dengan custom DOM modal (zero Swal dependency)
- **v.109.15** — Replace `cetakStrukPOS` Swal dengan custom DOM modal (sama pattern logout)
- **v.109.16** — Fix logo KOP PDF cache race:
  - `tambahKopPDF` → async function dengan `await _cacheImgUrl()` on-demand
  - 9 caller PDF eksport function diubah jadi async + await

### Performance / Console Clean

- **v.109.15** — Console warnings cleanup:
  - Hapus Sentry CDN script tag (fix 403 error)
  - Hapus preload `bg-pesantren.jpg` (fix "preloaded-not-used" warning)

### App Icon Overhaul

- **v.109.17** — Logo app baru: generate 12 icon size dari `logo-baru.png` (2598×2598 transparent) via `tools/regenerate-icons.py`:
  - favicon.ico multi-resolution (16+32+48)
  - PWA standard: 192, 512 (transparent any-purpose)
  - PWA maskable: 192, 512 (gradient teal + safe zone)
  - Apple touch icon: 180
  - TWA: 192, 512
  - Logo splash: 512
- **v.109.19** — Maskable icon gradient elegant teal (`#14b8a6` → `#0c4e49` diagonal)
- **v.109.20** — Kaligrafi recolor putih untuk maskable (kontras tinggi dgn BG teal)

### Tooling

- **v.109.x** — `tools/regenerate-icons.py` — script Python untuk regenerate semua icon dari 1 source PNG (preserve aspect ratio, gradient maskable, white recolor opsional)
- **v.108.x cont.** — `auto-deploy.ps1` improvements:
  - Auto-detect Vue widget source changes → rebuild bundle
  - Integrity gate index.html (size + tail `</html>`)
  - CRLF warning suppression
  - GitHub PAT + Firebase CI Token via `.agent-credentials.env`

### Cumulative metrics (vs v.108.51)

| Metric                        | v.108.51 | v.109.23 | Δ                          |
| ----------------------------- | -------- | -------- | -------------------------- |
| index.html size               | ~1.79 MB | ~1.85 MB | +60 KB                     |
| LOC                           | ~37k     | ~43.5k   | +6.5k                      |
| Function count                | ~600     | 658      | +58                        |
| Custom DOM modals (Swal-free) | 0        | 2        | +2 (logout, cetakStrukPOS) |

### Skipped (deferred ke v.110.x)

- B3 Palette teal-emerald continuation (`bg-blue-*` 84 occurrences sisa)
- Refactor monolith index.html (43k LOC) → Vue 3 + Vite (roadmap besar 5-6 bulan)
- Phase 6 Capacitor Android wrapper (briefing siap di `AGENT-BRIEFING-PHASE-6.md`)
- Phase 7 Tauri Desktop wrapper (briefing siap di `AGENT-BRIEFING-PHASE-7.md`)
- W3/W4/W5 Vue widget default ON staged rollout
- W6 ModalPOS Vue widget migration

---

## [v.108.51.0513] — 2026-05-13 — B2 Tightening + Toast Compact

**Commit:** `82ef813`
**SW_VERSION:** `v249-0513-toast-compact`

### Security (B2 — Firestore Rules tightening)

- Migrate `allow write: if true` → `allow write: if request.auth != null` untuk semua collection (master, settings, guru, santri, dll)
- READ tetap public untuk login lookup compatibility (lazy migration flow butuh anonymous read)
- `kritik_saran` CREATE tetap allow anonymous (feedback form)
- Default deny untuk collection yang tidak tercantum
- Backup rules lama disimpan: `firestore.rules.bak.v.108.43`
- Validasi tipe field per-koleksi tetap dipertahankan (string/number/length bounds)

### UX (Toast notification refinement)

- LAZY INIT `_toastMixinInstance` (fix Swal defer load saat first toast)
- Hapus `mouseenter` handler (penyebab timer stuck → not auto-dismiss)
- Ukuran lebih kompak: 220px min-width (sebelumnya 280), padding 10px (sebelumnya 14)
- Font 12px, icon 26px (lebih kecil agar tidak menutup konten)
- Progress bar timer 2px teal-emerald gradient
- Hide `#global-loader` saat Swal active (anti shadow bocor di iOS)
- Dark mode support

### Skipped (deferred ke versi mendatang)

- B3 Palette teal-emerald continuation (file truncation berulang 4x — pakai `/tmp` pattern di sesi berikut)
- Custom modal Swal styling (sempat bikin OK button stuck → revert ke default Swal)

### Bugfix

- `sw.js` null bytes (332 byte) — penyebab husky prettier reject
- `.gitignore`: tambah pola `*.bak.*` + `commit-msg.txt`

---

## [v.108.42.0513] — 2026-05-13 — Firebase Auth Hybrid Migration (B0 + B1 + UX)

**Commit:** `f7e0254`
**SW_VERSION:** `v241-0513-toast-notif`

### B0 — Recovery hotfixes

- Restore truncated `index.html` (3x kejadian) via git HEAD stitching
- `sw.js` missing closing parenthesis fix
- `_preCacheLogos` helper (pre-cache logo URLs untuk jsPDF/cetak)
- `_imgUrlCache` + `_cacheImgUrl` (dataURL cache, hindari fetch ulang saat cetak)
- Menu admin `role_sistem` support (admin biasa & super_admin)

### B1 — Firebase Auth Hybrid Migration (5 phases)

- **P1.** Lazy migration login flow: Auth-first, Firestore fallback bila user belum diprovision
- **P2.** Auto-provision Auth on new user creation (via secondary Firebase app supaya tidak ganggu session admin)
- **P2.1.** Client rate-limit 5 attempts / 5 minutes + 2s cooldown — anti `auth/too-many-requests`
- **P2.2.** Internal password padding `mu_auth_` prefix — bypass min-6-char Firebase rule (legacy user bisa pakai password 4 char)
- **P3.** Self-edit password sync ke Firebase Auth (admin/guru/santri profile edit)

### New helper functions

- `buildAuthEmail(input)` — sanitize username/WA → `<sanitized>@portal-mu.local`
- `_toAuthPassword(pass)` — padding helper untuk Firebase Auth (handle legacy short password)
- `_provisionAuthForUser(user, source)` — silent migration handler, idempotent
- `_signInWithLegacy(...)` — fallback path saat Auth user belum exist

### UX Improvements

- Toast notification bottom-right mobile-style (sebelumnya 194 swal popup → silent toast)
- Inline login button cooldown spinner (no modal)
- Login page bocor fix: CSS ULTRA-NUKE + JS force hide `app-view` saat unauthenticated
- Defensive error path: force hide app-view + `signOut()` on `initApp` catch

### Security

- `escapeHtml()` di dropdown guru options (XSS prevention)
- `cekHakAkses()` guards di 9 destructive functions

### Infrastructure

- Husky pre-commit hook (block credentials commit: `*.env`, `*.keystore`, `*.pem`, dll)
- Iframely API integration untuk social media link preview (Cloud Function)
- Firebase Functions v2 + Secret Manager migration

---

## [v.108.0527] — 2026-05-27 — Clean Restore

### Restored

- Baseline `public/index.html` restored dari `backup v.107/` setelah recovery dari Firebase Hosting Releases
- File v.24.0526 (broken) di-backup ke `backups/v24-broken-pre-restore/`

### Added

- `README.md` proper dengan Quick Start, struktur project, deployment guide, security notes
- `CHANGELOG.md` (this file)
- `docs/archive/` untuk dokumentasi handover lama

### Changed

- `SW_VERSION` → `v201-0527-v108-clean-restore`
- Project structure cleanup:
  - 9 file dokumentasi lama (HANDOVER, AUDIT, WAKE-UP, PROMPT-NEXT-CHAT, TWA-MIGRATION-GUIDE) dipindah ke `docs/archive/`
  - `portal-mu-v2/` rename ke `_archive-portal-mu-v2/` (preserved Vue 3 attempt)
  - `files/` (duplicate v.30) pindah ke `backups/old-files-v30/`

### Removed

- `.backups-corrupt/` (artifact corrupt v.18)
- `cloud-functions-index.js` (duplicate dari `functions/`)
- `tailwind.config.reference.js` (duplicate config)
- `Al Manshur Project/` (empty folder, unknown origin)
- `_tmp_*` files (artifacts dari sesi gagal)

---

## [v.107.1.0526] — 2026-05-12 — Final Patch Pre-TWA

### Added

- ACF (Advanced Custom Fields) Lite untuk Santri/Guru/Lembaga
- Riwayat Kenaikan submenu di Master Data Mutasi
- Kartu Kenaikan visual + cetak PDF (PTPT 6 kelas × 5 juz + ceremonial)
- KOP Kartu Kenaikan per Lembaga (PTPT/TPQ/Pra PTPT/P3H)
- Editor schema kartu kenaikan per lembaga
- Eksport PDF Lembaga + Riwayat Kenaikan
- ACF di Excel/CSV export santri + guru
- `eksporCSVSantri` function baru (sebelumnya tombol broken)
- Validasi unique khotam_ke per level santri Pra PTPT
- Backup schema kartu warning saat ID berubah

### Fixed

- Bug ACF tidak muncul saat edit santri
- Logo bg hitam di semua kop (rapor, rekap, kartu)
- Search input padding overlap dengan icon
- Dark mode topbar contrast (background, text, placeholder, icon)
- Kartu PDF margin 1.5cm A4 + 1 kelas per row
- Text riwayat: "Naik" vs "Dipindah" kondisional (sebelumnya "Naik/Dipindah" hardcoded)
- File truncation issue saat patch besar (recovered 2x)

### Changed

- Tab Pengaturan Kenaikan → card per Lembaga
- Field ACF dengan opsi Required (wajib isi)
- Kelola Field UI: counter, nomor urut, tombol reorder up/down

---

## [v.107.0526] — 2026-05-12 — Pra PTPT perLevel Schema

### Added

- `DEFAULT_SCHEMA_PRA_PTPT` (perLevel: 5 level × 23 khotam = 60 target)
- Field "Khotam ke?" di modal mutasi (dropdown I-XI)
- `simpanMutasi` simpan ke `santri.riwayat_kenaikan` (structured)
- Render form rapor + cetak rapor perLevel
- Editor schema perLevel (tab per level + nested khotam)
- Helper `_rekapPraPTPTBulanan(santriId, periode)`
- Auto-fill Tgl Khotam di rapor dari riwayat_kenaikan
- Auto-force perLevel di `getSchemaLembaga` untuk Pra PTPT

### Fixed

- Filter santri di Absen Bulanan validate kelas vs lembaga.kelas (santri kelas KPI tidak masuk Pra PTPT)
- autoFillTanggalKhotam legacy fallback (parse santri.riwayat pre-v.103)
- Kotak Catatan rapor overweight (padding-bottom .page 95mm → 65mm)

---

## [v.106.0526] — 2026-05-12 — ACF Lite + Riwayat Kenaikan

### Added

- Text riwayat: "Naik" (lembaga sama) vs "Dipindah" (lembaga beda)
- ACF Lite helper system (`_renderCustomFieldsForm`, `_collectCustomFieldsValues`)
- ACF section di form Santri
- Submenu Riwayat Kenaikan dengan list santri Qiraati + tombol Lihat Kartu
- Schema kartu kenaikan default untuk PTPT/TPQ/Pra PTPT/P3H
- Modal Kartu Kenaikan visual (matrix kelas × items + ceremonial)
- Modal Editor Schema Kartu

### Fixed

- File truncation saat batch patch besar (recovered via backup pattern)

---

## [v.105.0526] — 2026-05-11 — TWA Ready + Performance

### Added

- `TWA-MIGRATION-GUIDE.md` (panduan 6 fase: keystore → assetlinks → PWABuilder → sideload → Play Store)
- Lazy-load library berat (jsPDF, ExcelJS, html2canvas) dengan `fetchpriority="low"`
- `_ensureLib(name, url)` helper untuk dynamic script loading
- Defer `_preCacheLogos` via `requestIdleCallback` (improve LCP)
- Manifest.json optimized untuk PWA + TWA

### Performance

- LCP target turun dari 42s → ~10-15s
- File index.html optimized untuk first paint

---

## [v.104.0526] — 2026-05-11 — Audit + Bonus Fixes

### Added

- `AUDIT-CRUD-v104.md` (checklist hak akses Super Admin per modul)
- Backward compat `autoFillTanggalKenaikan` untuk semua lembaga (TPQ sections, Diniyah perKelas, Pra PTPT perLevel)

### Fixed

- Filter Bisyaroh "Sekolah" cek `lembaga_sekolah` non-empty (sebelumnya hanya `tipe_pegawai`)

---

## [v.103.0526] — 2026-05-11 — Pra PTPT Schema (initial)

### Added

- Schema Pra PTPT dengan struktur perLevel (initial implementation)
- Modal Kenaikan field "Khotam ke?"
- Editor schema perLevel + cetak rapor perLevel

---

## [v.102.0526] — 2026-05-11 — Refactor Absensi Bulanan

### Changed

- Absensi santri lembaga: HARIAN → BULANAN
- Collection baru: `absensi_santri_sekolah_bulanan` (auto-aggregate per santri per bulan)
- Submenu "Absen Bulanan" di semua lembaga Qiraati + Formal

### Deprecated

- Collection `absensi_santri_sekolah` (data harian) — replace dengan bulanan
- Helper `_hapusAbsenHarianLama()` di console untuk cleanup data lama

### Added

- Excel template export + import untuk absen bulanan
- Auto-fill rapor.absensi dari aggregate bulanan saat buka rapor

---

## [v.101.0526] — 2026-05-11 — Editor Schema Qiraati

### Added

- Editor schema sections-based untuk Pra PTPT / PTPT / P3H
- Tombol "Copy from TPQ" untuk quick start schema
- Fix kop rapor whitespace (conditional render baris kosong)
- Compact rapor Qiraati TPQ (cell padding 4-5px → 3px)

---

## [v.100.0526] — 2026-05-11 — Editor Schema Diniyah perKelas

### Added

- Editor schema Diniyah dengan struktur `perKelas` (14 jenjang × 8 mapel × KKM)
- UI tab per jenjang TK A-XII
- Tambah/Hapus jenjang + mapel via UI

### Fixed

- Critical: `window._schemaEdit` exposure (inline handler `onchange` silent fail tanpa ini)

---

## Versi Sebelumnya (v.85 → v.99)

Riwayat detail lihat `docs/archive/HANDOVER-v99.md`.

Highlights:

- v.99: Quick filter Bisyaroh datalist + strip 134 emoji
- v.98: Firestore rules update (allow delete BI untuk semua sumber)
- v.97: Tabungan santri quick input
- v.95: Hapus tab Tabungan Guru + rename GAJI → BISYAROH, TAGIHAN → PEMBAYARAN
- v.94: TTD layout absolute (Guru kiri / Wali tengah / Kepala kanan)
- v.92: Schema Diniyah perKelas baru (14 jenjang × 8 mapel × KKM 80)
- v.89: Critical hotfix `window._raporState = _raporState`
- v.85: Initial baseline tracked dengan format `v.{NN}.{MMYY}`

---

[Unreleased]: https://github.com/USER/REPO/compare/v.108.0527...HEAD
[v.108.0527]: https://github.com/USER/REPO/releases/tag/v.108.0527
