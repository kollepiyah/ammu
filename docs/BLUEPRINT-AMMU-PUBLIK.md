# Blueprint — Ammu Online Publik (Beranda tanpa login + Portal)

Disusun 25 Nov 2026 dari sesi diskusi dengan Kyai. **Belum ada kode yang dikerjakan.**
Dokumen ini pegangan untuk sesi-sesi pelaksana berikutnya: baca seluruhnya dulu, lalu
kerjakan per fase. Kalau isi dokumen ini bertentangan dengan kode, percayai kode dan
catat koreksinya di sini.

---

## 1. Tujuan

Ammu Online di Android menjadi **satu aplikasi dengan dua wilayah**:

- **Wilayah publik (tanpa login)** untuk santri, alumni, dan wali santri: jam & Hijriah,
  jadwal sholat + adzan, kiblat, Al-Qur'an (mushaf lembaga), wirid/doa/maulid, agenda,
  Al Manshur Channel. **Bukan** untuk umum seluas NU Online.
- **Portal (login)** — isi dan tampilan **sama persis seperti sekarang**. Tidak ada layar
  internal yang dirombak.

Aturan yang sudah diputuskan Kyai:

| Hal | Keputusan |
|---|---|
| Teknologi | **Tetap Vue + Capacitor.** Tidak menulis ulang ke Kotlin. Native hanya sebagai **plugin kecil** (adzan, imersif, widget, biometrik) |
| Gaya UI | Ikuti `DESIGN-SYSTEM-RULES.md` + gaya yang ada (teal `#0F766E`, Plus Jakarta Sans, Scheherazade New untuk Arab, kartu `rounded-2xl` border slate, Font Awesome). Layar setelah login **tidak berubah** |
| Menu bawah publik | **Beranda · Channel · Kalender · Portal · Pengaturan** |
| Menu cepat Beranda | **Kiblat · Al-Qur'an · Agenda · Wirid** |
| Jam & Hijriah | Kartu jam teal **dipindah** dari dashboard setelah login ke Beranda publik, dibuat **ringkas satu baris**. Di dashboard setelah login kartu itu **dihapus** (K4) |
| Dashboard setelah login | Di bawah kartu sapaan "Ahlan …" ditambah **baris 4 ikon: Al-Qur'an · Kitab/Wirid · Kiblat · Jadwal Sholat** (Agenda tidak, sudah ada Kalender di menu bawah). Untuk **semua peran**, hanya di **Android & PWA** — web biasa dan Electron tidak. Orang yang sudah login **tidak perlu pindah** ke wilayah publik (K3) |
| Kalender | Kalender yang sekarang **dibiarkan, tidak diubah**. Acuan Hijriah = **NU** |
| Penyimpanan berkas besar | **Cloudflare R2** (Kyai sudah punya akun). Bukan Firebase Storage (mati: tunggakan tagihan, 402), bukan Supabase Storage (egress sempit) |
| Login | Tetap **username (= nomor, bisa diubah manual) + Google**. Tidak ada email. Ditambah **buka dengan sidik jari / Face ID** setelah login pertama |
| Layar baca | Al-Qur'an, Kitab, Wirid, Doa bisa **layar penuh** |

---

## 2. Fakta kode yang menjadi pijakan (dicek 25 Nov 2026)

- **Proyek Android aktif = `vue-app/android`** (Capacitor 8, JDK 21). `android/` di akar
  adalah warisan (vc70, mode remote) — **jangan disentuh**. `scripts/build-aab.cjs` membangun
  `vue-app/dist` lalu `cap sync` → tampilan **dibundel di APK**. Akibatnya: setiap perubahan
  tampilan HP butuh **rebuild AAB** (dijalankan Kyai), bukan hanya `firebase:deploy`.
- Plugin Capacitor yang sudah ada (`vue-app/package.json`): app, filesystem, haptics,
  keyboard, **local-notifications**, network, push-notifications, share, splash-screen,
  **status-bar**, firebase app-check. **Belum ada**: geolocation, biometrik, keep-awake.
- Plugin native buatan sendiri sudah ada: `WidgetBridgePlugin.java` (`@CapacitorPlugin(name = "WidgetBridge")`)
  + widget `JamHijriWidget`, `KalenderWidget`, `TugasWidget` di
  `vue-app/android/app/src/main/java/app/ammu/id/widgets/`. **Tambahkan plugin baru di
  sini (pola yang sama), jangan buat proyek plugin terpisah.**
- **Jebakan widget:** `DashboardJamHijri.vue` memanggil `pushWidgetData({ hijri, … })` saat
  dipasang. Kalau kartu jam dipindah ke Beranda publik, **sinkron widget harus ikut pindah**,
  kalau tidak widget Hijriah berhenti diperbarui.
- Rute: `vue-app/src/router/index.js`. `{ path: '/', redirect: '/dashboard' }`; penjaga
  `beforeEach` meloloskan `meta.public` / `PUBLIC_PATHS`. Nama rute `beranda` **sudah dipakai**
  (`BerandaDesktopView`) — rute publik baru pakai awalan lain, mis. `/umum/...`.
- Menu bawah internal: `components/layout/BottomNav.vue` (5 tab per peran) — **tidak diubah**.
- Agenda = koleksi **`kegiatan`** (field `tipe: 'kegiatan' | libur`), diatur di
  `KalenderKegiatanView.vue`, dibaca `DashboardKalender.vue` lewat `subscribeColl`.
- Channel = koleksi **`beranda_post`** (`DashboardPosts.vue`, `PostsView.vue`).
- Hijriah: `utils/hijri.js` (`masehiToHijri`, `formatHijri`, `kalibrasiOffset`) +
  `RibbonStatusBar.vue` (`islamic-umalqura`).
- Tema gelap: `stores/ui.js` (`toggleDark`, `localStorage 'portalMu_darkMode'`) — baru dua
  keadaan.
- `settings` (kecuali admin/keuangan) dan `master` terbaca anon (lihat memori
  firebase-storage-mati). **Dicek 25 Nov (F1):** `kegiatan` dan `beranda_post` sudah
  `select using (true)` sejak migrasi `20260622090500_profiles_rls.sql` — **seluruh isi kedua
  tabel terbaca siapa pun yang memegang kunci anon**, termasuk agenda khusus guru/santri.
  Penyaringan tamu di F1 (`kegiatanUntukTamu`) hanya soal tampilan; bila agenda internal
  dianggap rahasia, F4 perlu memperketat RLS + VIEW publik.

---

## 3. Rancangan layar (hasil mock-up yang disetujui)

### 3.1 Beranda publik
Urutan dari atas:
1. **Bilah atas**: logo + "Ammu Online / Mambaul Ulum"; kanan: chip **Masuk** (ikon sidik
   jari bila biometrik aktif).
2. **Kartu jam ringkas** (gradien teal `#0F766E → #134E4A`, pola berlian `#5EEAD4` 10%):
   kiri Hijriah Arab + "Selasa, 24 Nov 2026"; kanan jam besar + detik kecil. Satu baris,
   tidak memanjang.
3. **Kartu jadwal sholat**: judul + lokasi; "Berikutnya: Ashar 14:50 · dalam 1 j 30 m";
   lima waktu (Subuh, Dzuhur, Ashar, Maghrib, Isya), waktu berikutnya disorot teal.
4. **Menu cepat 4 ikon**: Kiblat, Al-Qur'an, Agenda, Wirid.
5. **Al Manshur Channel**: deret kartu geser + "Lihat semua" (→ tab Channel).

### 3.2 Tab lain
- **Channel**: daftar `beranda_post` (YouTube/Instagram/manual), baca saja.
- **Kalender**: kalender yang sekarang, apa adanya.
- **Portal**: belum login → layar masuk; sudah login → **aplikasi lama** (dashboard +
  BottomNav internal), dengan dua perubahan saja: kartu jam dihapus, dan baris ikon ibadah
  ditambahkan (lihat 3.7). **Tidak ada tombol pulang ke wilayah publik** — fitur ibadah sudah
  bisa dibuka dari dashboard. Tombol kembali Android di dashboard tetap seperti sekarang.
  Sesi tetap tersimpan (tidak keluar otomatis); Keluar tetap di tempatnya sekarang + di
  Pengaturan publik → Akun.
- **Pengaturan publik** (rute baru, bukan `PengaturanView` admin):
  - *Ibadah*: Metode perhitungan (Falakiyah NU · Kemenag RI · Umm al-Qura), Lokasi otomatis
    (sakelar + "diperbarui 08.15" + tombol perbarui / pilih kota manual), Adzan (suara:
    bedug / kentongan / adzan; sakelar per waktu), Layar tetap menyala saat membaca.
  - *Tampilan*: Tema **Terang / Gelap / Otomatis**; Widget Android (petunjuk pasang).
  - *Akun*: Buka dengan sidik jari/Face ID; Masuk ke Portal / Keluar.

### 3.3 Agenda (dari menu cepat)
Daftar saja, **tanpa kalender**. Penyaring: Akan datang · Bulan ini · Semua. Dikelompokkan per
bulan; blok tanggal (libur = rose, lainnya teal); lencana Libur (rose) / Ujian (amber) /
Kegiatan (sky). **Hanya agenda yang ditandai admin "tampil di publik".**

### 3.4 Al-Qur'an
- Mushaf **milik lembaga** (dengan tanda wakaf khusus), sumber **PDF dari Kyai**, ditampilkan
  sebagai **gambar per halaman**.
- Bilah atas: nama surah · Juz · "Halaman n dari N" · penanda. Penggeser halaman.
- Kontrol bawah: **Surah · Juz · Halaman · Terakhir** (lanjut baca).
- Geser kiri-kanan pindah halaman **arah mushaf** (berikutnya ke kiri); **cubit untuk zoom**.
- Daftar surah/juz = indeks JSON kecil (surah → halaman awal) dibundel di aplikasi.

### 3.5 Kitab & Wirid
- Daftar per kategori: Semua · Wirid · Maulid · Tahlil · Doa; ditambah **Tasbih digital**.
- Layar baca: Arab besar (Scheherazade New), **A− / A+**, sakelar **Latin** dan **Arti**,
  Sebelumnya/Berikutnya per bagian, penanda.
- Isi diatur admin di **Master Data** (aturan Kyai: data induk di Master Data, bukan menu
  pita baru) — tambah amalan tanpa rilis aplikasi.

### 3.6 Mode layar penuh (Al-Qur'an, Kitab, Wirid, Doa)
- Ketuk tengah layar = sembunyi/tampil bilah atas + kontrol.
- **Imersif**: status bar & navigasi sistem disembunyikan, muncul lagi dengan geser tepi.
- Layar tetap menyala selama membaca (bisa dimatikan di Pengaturan).
- Tombol/gestur kembali keluar seperti biasa. Isi **tidak boleh tertutup lubang kamera**
  (safe-area/cutout). Mode tegak saja di tahap awal.
- Dibuat **sekali** sebagai composable bersama (mis. `composables/useModeBaca.js`), dipakai
  keempat layar — jangan disalin per layar.

### 3.7 Baris ikon ibadah di dashboard setelah login (keputusan 25 Nov 2026)
- Letak: tepat di bawah kartu sapaan "Ahlan …", menggantikan kartu jam yang dihapus.
- Isi: **Al-Qur'an · Kitab/Wirid · Kiblat · Jadwal Sholat** (4 ikon). Agenda sengaja tidak
  ada: orang yang login sudah punya Kalender di menu bawah.
- Berlaku untuk **semua peran**. Tampil hanya bila berjalan di **Android (Capacitor native)
  atau PWA terpasang** (`display-mode: standalone`); web biasa dan Electron tidak.
  Penentu platform dibuat **satu fungsi** (mis. `utils/platform.js`), jangan ditulis ulang
  per komponen.
- Ikon membuka **layar yang sama** dengan wilayah publik (satu komponen per layar). Baris ikon
  sendiri juga satu komponen bersama dengan menu cepat Beranda publik, isinya lewat prop/daftar.
- Layar Jadwal Sholat punya ikon roda gigi ke **pengaturan ibadah** (metode, lokasi, adzan)
  supaya yang sudah login tidak perlu ke Pengaturan publik.
- **Koreksi (F1):** `RibbonStatusBar` hanya ada di Electron. Di Android/PWA yang sudah login,
  jam & Hijriah tidak lagi tampil di dashboard (jam ada di bilah status HP, Hijriah di widget
  dan Beranda publik). Web & Electron tetap memakai kartu jam karena tak punya baris ikon.
- **Wajib:** sinkron widget (`pushWidgetData`) dipindah ke tempat yang selalu jalan
  (mis. `App.vue`/composable global), bukan di kartu jam mana pun.

---

## 4. Rancangan teknis

### 4.1 Jadwal sholat (sumber kebenaran tunggal)
- Fungsi pure `utils/waktuSholat.js` + tes vitest. Masukan: tanggal, lintang, bujur,
  zona waktu, metode. Keluaran: imsak, subuh, terbit, dhuha, dzuhur, ashar, maghrib, isya.
- Pustaka: `adhan` (adhan-js) **atau** rumus sendiri — pilih setelah membaca dokumentasinya.
  Metode:
  - **Umm al-Qura**: metode bawaan pustaka.
  - **Kemenag RI**: kustom (Subuh 20°, Isya 18°, Ashar Syafi'i) + **ihtiyath**.
  - **Falakiyah NU** (bawaan): kustom ala LFNU + ihtiyath.
- **WAJIB verifikasi, jangan menebak sudut/ihtiyath**: cocokkan dengan jadwal resmi Kemenag
  (Bimas Islam) untuk kabupaten pesantren dan jadwal LFNU / NU Online, minimal 3 tanggal
  berbeda musim. Target selisih **≤ 1 menit**. Simpan tabel pembanding itu sebagai tes.
- **Dikerjakan 25 Nov (F2):** rumus sendiri tanpa pustaka. Kemenag cocok dengan jadwal resmi
  Kab. Sidoarjo (12 tanggal, ≤1 menit). **Falakiyah NU belum dibuat** — butuh tabel jadwal
  LFNU/NU Online untuk Sidoarjo/Surabaya (min. 3 tanggal beda musim) dari Kyai; jadwalsholat.nu.or.id
  menolak akses otomatis (429). Begitu ada, tambahkan entri di `METODE` + baris tes.
  Lokasi memakai `navigator.geolocation` (WebView Capacitor), **bukan** `@capacitor/geolocation`
  — tak perlu plugin baru.
- Lokasi: `@capacitor/geolocation` (izin **perkiraan/coarse** cukup). Ditolak → koordinat
  pesantren. **Perbarui otomatis** saat aplikasi dibuka/kembali dari latar: kalau pindah
  > ±10 km, hitung ulang + jadwalkan ulang adzan. **Tanpa lokasi latar belakang** (kebijakan
  Play berat).

### 4.2 Adzan
- Tahap awal: `@capacitor/local-notifications` (sudah terpasang). Satu **kanal notifikasi per
  suara** (bedug, kentongan, adzan) karena suara kanal Android tak bisa diubah setelah dibuat.
- Jadwalkan ±7 hari ke depan (5 waktu × 7 = 35), jadwal ulang saat aplikasi dibuka, ganti
  metode/lokasi, dan setelah HP dinyalakan ulang (cek perilaku plugin).
- **Risiko yang harus diuji di HP asli**: suara adzan panjang terpotong, HP merek tertentu
  (Xiaomi/Oppo/Vivo) membunuh alarm, izin alarm tepat (`SCHEDULE_EXACT_ALARM` /
  `USE_EXACT_ALARM` — cek kebijakan Play terbaru). Kalau gagal → plugin native kecil
  (AlarmManager + layanan latar) di `vue-app/android/.../`.
- Berkas suara (bedug, kentongan, adzan) **disediakan Kyai** — pastikan boleh dipakai.

### 4.3 Hijriah acuan NU
- Tahap ini: **pakai yang sekarang** (`utils/hijri.js` + `kalibrasiOffset`). Kalender tidak
  diubah.
- Tahap lanjutan (opsional, bila selisih sehari mengganggu): tabel "awal bulan Hijriah per
  tahun" diisi admin dari **Almanak/Taqwim LFNU PBNU** di Master Data; perhitungan jadi
  cadangan bila tabel kosong.

### 4.4 Agenda publik
- Migrasi: kolom/field **`publik boolean default false`** pada `kegiatan` (cek dulu bentuk
  tabelnya: kolom biasa atau di dalam jsonb `data` — ingat memori "baris rata vs mentah").
- Kotak centang **"Tampilkan di publik"** di form `KalenderKegiatanView.vue`.
- Akses anon **hanya** baris `publik = true` dan **hanya kolom aman** (judul, tanggal, jam,
  tempat, tipe). Lebih aman lewat VIEW/RPC khusus daripada membuka tabel.

### 4.5 Channel publik
- Baca `beranda_post` sebagai anon. Cek RLS dulu; kalau ada post internal, perlu penanda
  publik yang sama seperti agenda.

### 4.6 Egress Supabase (Free Plan 5 GB — pernah jebol Sep 2026)
- Layar publik **tidak memakai `subscribeColl`/realtime**. Ambil sekali, simpan di HP
  (cache), segarkan saat ditarik turun atau sekali sehari.
- Gambar besar (mushaf, wirid bergambar) **tidak lewat Supabase** → R2.

### 4.7 Al-Qur'an di Cloudflare R2
1. Kyai menyerahkan PDF → **ukur dulu** (MB, jumlah halaman).
2. Skrip lokal `scripts/` (sekali jalan): PDF → WebP per halaman (lebar ±1080 px), nama
   `001.webp …`. Cek tanda wakaf tetap tajam saat di-zoom.
3. Unggah ke bucket R2 (Kyai lewat dasbor/wrangler, karena mushaf jarang berubah).
   Pakai **domain sendiri** (subdomain), bukan `r2.dev` (dibatasi, tidak untuk produksi).
   Atur header cache panjang + CORS.
4. Tambahkan domain R2 ke **CSP** aplikasi (ingat kasus CSP snap.js Midtrans).
5. Aplikasi: unduh halaman saat dibuka, simpan via `@capacitor/filesystem`; opsi
   "Unduh semua untuk dibaca offline" di layar Al-Qur'an.
6. **Cek legal**: penerbitan mushaf (termasuk digital) di Indonesia lazimnya butuh
   **tanda tashih LPMQ Kemenag**. Pastikan mushaf lembaga sudah/perlu ditashih sebelum
   dipublikasikan di aplikasi.

### 4.8 Kitab & Wirid
- Data: tabel `amalan` (judul, kategori, urutan) + `amalan_bagian` (amalan_id, urutan,
  arab, latin, arti, gambar_url opsional). RLS: anon baca, admin tulis.
- Admin CRUD di **Master Data**. Teks Arab disimpan Unicode dengan harakat lengkap.
- Bergantung keputusan **K1** (teks atau gambar).

### 4.9 Login ringkas + biometrik
- Layar masuk: **username/nomor + sandi** dan **tombol Google**. Tidak ada email.
- Biometrik: plugin Capacitor 8 yang kompatibel (calon: `@aparajita/capacitor-biometric-auth`,
  `@capgo/capacitor-native-biometric` — cek dukungan Cap 8 dulu). Alur: login pertama
  biasa → tawarkan "Aktifkan sidik jari" → simpan token sesi di penyimpanan aman
  (Android Keystore) yang dibuka biometrik → pembukaan berikutnya cukup biometrik.
- Pastikan sesi tidak kedaluwarsa cepat; `signOut` tetap scope local (sejak v.1.5.0).

### 4.10 Layar penuh
- Status bar: `@capacitor/status-bar` (sudah ada) `hide()`.
- Navigasi sistem: method baru di plugin native sendiri (`WindowInsetsControllerCompat`,
  perilaku *swipe to show*) — tambahkan ke plugin yang sudah ada atau plugin baru kecil.
- Layar menyala: `@capacitor-community/keep-awake` (cek Cap 8) atau flag
  `FLAG_KEEP_SCREEN_ON` lewat plugin sendiri.

### 4.11 Widget jadwal sholat
- Widget baru `JadwalSholatWidget.java` meniru pola `JamHijriWidget`. JS menghitung jadwal
  7 hari dan mengirimnya lewat `WidgetBridge`; widget memilih hari ini & waktu berikutnya
  tanpa perlu aplikasi terbuka.

### 4.12 Platform
- Wilayah publik untuk **Android (dan web HP)**. **Electron/desktop admin langsung ke Portal**
  seperti sekarang (cek `useDesktopShell().isElectron`).

---

## 5. Keputusan yang masih terbuka (tanyakan Kyai sebelum fase terkait)

| # | Pertanyaan | Saran | Fase |
|---|---|---|---|
| K1 | ~~Wirid/maulid/doa: teks atau gambar?~~ **Dijawab 25 Nov:** **teks** (Arab rapi + terjemahan) | Teks; harakat wajib diperiksa | F7 |
| K2 | Ukuran & jumlah halaman PDF mushaf; sudah bertashih LPMQ? **25 Nov:** mushaf *Waqaf Ibtida'* masih disusun Kyai (PDF), isi Al-Qur'an & Kitab/Wirid **menyusul** — F1 jalan tanpa menunggu, ikonnya "segera hadir" dulu | Ukur dulu; konversi WebP (skrip F6) | F6 |
| K3 | ~~Dari Portal kembali ke wilayah publik lewat mana?~~ **Dijawab 25 Nov:** tidak perlu jalan pulang; fitur ibadah dibuka dari baris ikon di dashboard (3.7). Sesi tetap tersimpan | — | F1 |
| K4 | ~~Kartu jam dihapus dari dashboard atau tampil di keduanya?~~ **Dijawab 25 Nov:** dihapus dari dashboard, diganti baris ikon; sinkron widget pindah ke tempat global | — | F1 |
| K5 | Rekaman suara bedug, kentongan, adzan — dari mana? | Kyai sediakan berkas sendiri | F3 |
| K6 | Domain untuk R2 (subdomain apa)? | Subdomain milik lembaga | F6 |

---

## 6. Urutan kerja (fase)

Setiap fase = satu sesi/branch, selesai dengan tes + commit + CHANGELOG. **F1 dulu**, sesudah
itu F2, F4, F6, F7, F9 **saling lepas** dan bisa dikerjakan sejajar di worktree masing-masing
(file yang disentuh berbeda). F3 butuh F2. F8 dipakai F6/F7 (bisa dikerjakan di dalam F6
lalu dipakai F7). F10 butuh F2.

| Fase | Isi | Butuh | Yang dijalankan Kyai |
|---|---|---|---|
| **F0** | Persiapan: jawab K1–K6, serahkan PDF & berkas suara, buat bucket R2 | — | Buat bucket + domain R2 |
| **F1** ✅ 25 Nov (v.1.5.3 gel. 3) | Kerangka publik: rute `/umum/*` (`meta.public`), shell + bottom nav 5 tab, `/` → beranda publik di Android, Electron tetap ke Portal, tab Portal → login/dashboard, pindah kartu jam ringkas + sinkron widget global, hapus kartu jam dari dashboard + baris ikon ibadah (3.7; ikon yang layarnya belum jadi tampil "segera hadir" atau disembunyikan), Pengaturan publik (tema Terang/Gelap/Otomatis di `stores/ui.js`) | — | AAB |
| **F2** ✅ 25 Nov (v.1.5.5; NU belum) | `utils/waktuSholat.js` + tes pembanding resmi, geolocation + perbarui otomatis, kartu jadwal, pengaturan metode & lokasi, kompas kiblat (sensor arah) | F1 | AAB |
| **F3** | Adzan (kanal suara, penjadwalan, jadwal ulang) + uji HP asli; plugin native bila perlu | F2 | AAB |
| **F4** | Agenda publik: migrasi `publik`, akses anon aman, centang di form admin, layar Agenda | F1 | `supabase db push`, deploy web, AAB |
| **F5** | Tab Channel publik (+ penanda publik bila perlu) | F1 | (db push bila ada migrasi), AAB |
| **F6** | Al-Qur'an: skrip PDF→WebP, R2 + CSP, indeks surah/juz, pembaca + cache offline + zoom + geser + terakhir dibaca, **mode layar penuh (F8) dibuat di sini** | F1, K2, K6 | Unggah ke R2, AAB |
| **F8** | Mode layar penuh `useModeBaca` (3.6, 4.10) — **dikerjakan di dalam F6**, dipakai ulang F7 | F1 | (ikut AAB F6) |
| **F7** | Kitab & Wirid: tabel + RLS, CRUD Master Data, daftar + layar baca + Tasbih, pakai `useModeBaca` | F1, F8, K1 | `supabase db push`, deploy web, AAB |
| **F9** | Login ringkas + biometrik | F1 | AAB |
| **F10** | Widget jadwal sholat | F2 | AAB |
| **F11** | Rilis: naik versi sesuai konvensi, CHANGELOG, catatan rilis, **Data safety Play** (lokasi perkiraan, notifikasi), cek izin alarm, akun uji peninjau | semua | AAB + unggah Play, deploy web |

Perintah Kyai yang mungkin perlu (hanya bila fase menyentuhnya):

```bash
npx supabase db push
```

```bash
npm run firebase:deploy
```

```bash
npm run build:aab
```

---

## 7. Cara menguji

- **Fungsi pure** (`waktuSholat`, pemilah agenda, indeks surah): vitest.
- **Tampilan publik** bisa dicek di dev server **tanpa login** (justru lebih mudah dari layar
  internal). Tetap pasang **penjaga tulis** — layar publik tidak boleh menulis ke produksi.
- **Wajib HP asli**: adzan (termasuk HP Xiaomi/Oppo bila ada), biometrik, imersif + lubang
  kamera, widget, lokasi otomatis, cache offline mushaf, mode gelap.
- Bekerja di worktree: ikuti memori "uji di worktree Ammu" (junction `node_modules`, PGlite
  untuk SQL, jebakan CRLF prettier, **deploy hanya dari checkout utama**).

---

## 8. Hal yang sengaja TIDAK dikerjakan

- Menulis ulang ke Kotlin / native penuh.
- Mengubah layar internal setelah login (selain menghapus kartu jam + menambah baris ikon
  ibadah di dashboard, dan centang "tampil di publik" di form agenda).
- Fitur NU Online yang butuh redaksi besar: artikel, NUpedia, video, donasi, terjemah/tafsir
  Al-Qur'an.
- Lokasi latar belakang, Firebase Storage berbayar.
