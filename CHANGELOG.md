# Changelog

Semua perubahan penting Portal Mambaul Ulum tercatat di sini.

Format: [Keep a Changelog](https://keepachangelog.com/id/1.1.0/)
Versioning: semver `v.MAJOR.MINOR.PATCH` sejak v.1.1.x (mis: `v.1.2.7`); versionCode Android
naik satu tiap rilis. Entri lama memakai skema lama `v.{nomor-urut}.{MMDDtahunmu}` (mis: `v.108.0527`).

---

## [Unreleased]

⚠️ **Perubahan kode di bawah lahir SESUDAH artefak v.1.3.1 dibangun Kyai.** Rilis berikutnya
WAJIB `v.1.3.2` / `vc132` — jangan membangun ulang vc131, itu mengulang jebakan "satu label
versi, dua isi".

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

### Planned

- **Tujuan pembaruan Android ikut data, bukan teks tetap** (v.1.3.2). `apkUrl` di
  `public/app-version.json` sudah boleh diarahkan ke
  `https://play.google.com/store/apps/details?id=app.ammu.id` tanpa menyentuh kode — Capacitor
  meneruskannya ke browser sistem dan Android membukanya di aplikasi Play. Yang belum ikut
  pindah cuma **kalimat dialognya**, yang masih berbunyi "Berkas akan diunduh lewat peramban…"
  (`composables/useAndroidUpdate.js`). Kenali tujuan Play lalu ganti teks + label tombol jadi
  "Buka Play Store", supaya perpindahan APK ↔ Play selamanya cukup menyunting JSON.
  ⚠️ `apkUrlSah()` menolak selain `https://`, jadi `market://` bukan pilihan.
- Capacitor Android first build + sideload APK
- Capacitor iOS setup
- Tauri Desktop scaffold
- Phase 1 palette migration: `bg-blue-600/700` action button → `bg-teal-600/700` (~62 occurrences)
- DOMPurify integration untuk template literal innerHTML yang inject user data
- Console.log cleanup (37 occurrences di production)

---

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
