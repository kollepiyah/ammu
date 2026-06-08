# Handoff: Ammu Online — Redesign Desktop (Electron) bergaya Ribbon MS Office

> Paket ini berisi **prototipe desain** (HTML/CSS/JS) untuk antarmuka desktop aplikasi
> **Ammu Online — Pondok Pesantren Mambaul Ulum**. Tujuan handoff: **menerapkan ulang
> desain ini ke dalam codebase aplikasi yang sebenarnya** (mis. Electron + React/Vue/
> vanilla), memakai pola, komponen, dan state management yang sudah ada di sana — **bukan**
> menempel HTML ini apa adanya.

---

## 1. Overview

Redesign mengubah Ammu Online (saat ini web app sidebar + topbar) menjadi aplikasi
**desktop Electron** dengan **antarmuka pita / ribbon ala Microsoft Office** (Word/Excel):
title bar Windows 11, Quick Access Toolbar, deretan tab (File, Home, Pendidikan,
Keuangan, Saluran, Personal, Supervisi, Bantuan), pita berisi grup tombol, layar
**Backstage** untuk menu File, status bar, serta tema **terang (Colorful)** & **gelap**.

## 2. Fidelity

**High-fidelity (hifi).** Warna, tipografi, spasi, dan interaksi sudah final. Recreate
sepiksel mungkin memakai library/komponen yang sudah ada di codebase. Token desain ada
di bagian §9.

## 3. Tech & arsitektur prototipe (acuan, bukan wajib)

- React 18 (UMD) + Babel standalone, JSX inline.
- Stylesheet tunggal `app/ammu.css` memakai **CSS custom properties** untuk tema.
- Tema & varian dikendalikan lewat atribut pada elemen root `.app`:
  - `data-theme="light" | "dark"`
  - `data-ribbon="classic" | "simple"` (pita multi-baris vs satu baris/Fluent)
  - `style="--accent: #0f766e"` (warna aksen brand)
- Data dummy terpisah di `app/ammu-data.js` (window.AMMU) — **mudah dipetakan ke API asli.**

> Di app asli: ganti React-UMD→build tooling yang dipakai (Vite/webpack), pindahkan
> `--accent`/`data-theme` ke theme provider, dan ganti `window.AMMU` dengan data dari
> backend Firebase kalian.

## 4. Layout global (window shell)

Urutan vertikal di dalam `.app` (flex column, tinggi penuh viewport):

1. **Title bar** (40px, latar = warna aksen pada tema terang / abu gelap pada tema gelap)
   - Kiri: ikon app (logo) → QAT mini (Save, Undo, Redo, ▾).
   - Tengah: search box "Cari santri, guru, atau perintah…".
   - Kanan: toggle tema (🌙/☀), lonceng notifikasi (badge angka), kartu user
     (avatar + nama + peran), lalu window controls **Minimize / Maximize / Close**
     (Close hover = merah #e81123).
2. **Tab bar** (40px, latar sama dgn title bar): tombol **File** (kotak aksen gelap) +
   tab teks. Tab aktif "naik" ke warna body pita. Kanan: tombol **Bagikan**.
3. **Ribbon** (tinggi ~108px klasik): grup-grup tombol dipisah garis tipis; tiap grup
   punya label kecil di bawah.
4. **Content** (flex:1, scroll): halaman per-view.
5. **Status bar** (26px, latar = aksen/abu): indikator online, "Tersambung · Mambaul
   Ulum", tanggal hijriah; kanan: jumlah santri/guru, versi, zoom 100%.

Window ditampilkan sebagai jendela mengambang membulat (radius 10px) di atas wallpaper
hijau; saat **Maximize** menjadi full-bleed (radius 0, 100vw×100vh).

## 5. Tabs & isi Ribbon

Setiap tab menampilkan grup pita yang berbeda; menekan tombol pita membuka view di area
konten. Menekan **nama tab** juga membuka view default tab tsb.

| Tab | View default | Grup pita (tombol) |
|-----|--------------|--------------------|
| **File** | Backstage | (lihat §7) |
| **Home** | `beranda` | Postingan (Buat Postingan, Kelola Saluran) · Waktu & Kalender (widget jam live) · Akses Akademik (Dasbor Statistik, Kalender Kegiatan, Profil Saya, Data Supervisi, Data Santri) · Tampilan (toggle Tema, toggle Ribbon, Muat Ulang) · Profil & Data (kartu sapaan) |
| **Pendidikan** | `santri` | Data Induk (Data Santri, Data Guru, Data Staf, Asrama) · Akademik (Kelas & Mapel, Jadwal, Nilai/Rapor, Absensi) · Kalender (Kalender Pendidikan, Tahun Ajaran, Semester) · Laporan (Cetak Rapor, Rekap Nilai, Ekspor) |
| **Keuangan** | `keuangan` | Tagihan & SPP (Tagihan Aktif, Buat Tagihan, Pembayaran SPP, Tunggakan) · Tabungan (Tabungan Santri, Setoran, Penarikan, Mutasi) · Bisyaroh (Slip Bisyaroh, Honor Guru, Cetak Slip) · Buku & Laporan (Buku Induk, Laporan Keuangan, Pemasukan, Pengeluaran) |
| **Saluran** | `saluran` | Postingan · Jenis Konten (Pengumuman, Dokumentasi, Kajian, Dokumen) · Kanal (Al Manshur Channel, Arsip, Anggota) · Moderasi |
| **Personal** | `personal` | Akun (Profil Saya, Ganti Sandi, Keamanan) · Aktivitas (Notifikasi, Pesan, Tugas) · Preferensi (Tema, Bahasa, Tata Letak) · Sesi (Keluar) |
| **Supervisi** | `supervisi` | Supervisi (Data Supervisi, Buat Laporan) · Evaluasi · Analitik |
| **Bantuan** | `bantuan` | Bantuan · Informasi · Kontak · Pembaruan |

## 6. Views (area konten)

- **`beranda` (Home) — HANYA dua dasbor statistik:**
  - **Dasbor Statistik Pendidikan:** 4 kartu KPI gradien (Total Santri **431**,
    Total Guru/Pegawai **30**, Lembaga Aktif **8**, Kelas Total **2**) + kartu
    **Statistik Lembaga** = grid 8 lembaga (TPQ PAGI, TPQ SORE, PRA PTPT, PTPT, PPPH,
    TK, SDI, PKBM), tiap lembaga 3 sel kecil **Kelas / Santri / Guru**.
  - **Dasbor Statistik Keuangan:** 4 kartu ringkasan (Tagihan Aktif, Tabungan Santri,
    Slip Bisyaroh, Buku Induk) + grafik **Pemasukan vs Pengeluaran (12 bulan)** (bar
    berpasangan hijau/merah) + **Saldo Berjalan Bulanan** (line + area).
- **`keuangan`** — versi penuh dasbor keuangan: 4 kartu ringkasan, 2 grafik, dan tabel
  **Transaksi Terakhir** (Tanggal, Keterangan, Jenis [pill Masuk/Keluar], Nominal).
- **`statistik`** — Distribusi Program (donut) + Tren Pendaftaran (line) + 3 stat card.
- **`santri`** — tabel Data Santri (NIS, Nama, Kelas, Program, Asrama, Status[pill]).
- **`supervisi`** — tabel hasil supervisi (Tanggal, Guru, Mapel, Kelas, Nilai, Catatan).
- **`kalender`** — daftar agenda dengan kotak tanggal berwarna.
- **`saluran`** — feed Al Manshur Channel (kartu postingan thumbnail+meta).
- **`buat`** — editor postingan (toolbar ikon + judul + body contentEditable + footer).
- **`personal`** — kartu profil + tabel Informasi Akun.
- **`bantuan`** — grid 6 kartu bantuan.
- **`placeholder:<Judul>`** — view kosong bertanda untuk modul yang belum dibangun
  (navigasi tetap aktif). Daftar modul placeholder ada di `ammu-data.js`.

## 7. Backstage (menu File)

Overlay penuh: rail kiri warna aksen (Beranda, Postingan Baru, Buka Arsip, Info | Akun,
Pengaturan, Tentang, Keluar) + panel kanan. "Postingan Baru/Buka Arsip" tampil grid
tile; "Info"/"Tentang" tampil daftar baris key-value. Tombol "Kembali" menutup overlay.

## 8. Interaksi & state

State minimal (di komponen root `App`):
- `tabId` — tab aktif → menentukan pita.
- `view` — view konten aktif.
- `theme` ('light'|'dark'), `ribbon` ('classic'|'simple'), `accent` (hex) — persisten
  (di prototipe lewat panel Tweaks; di app pakai store/preferensi pengguna).
- `maximized` (bool), `backstage` (bool).
- Klik tab → set `tabId` + `view = DEFAULT_VIEW[tabId]`.
- Klik tombol pita → buka `item.view`, atau jalankan `item.action`
  (`theme`/`ribbon`/`refresh`).
- Jam & tanggal hijriah = live (update tiap detik).
- Tidak ada animasi masuk berbasis keyframe opacity (lihat §11).

## 9. Design tokens

**Warna aksen brand:** `#0f766e` (teal-700, = `theme-color` web app). Varian: `#15803d`,
`#2563eb`, `#4f46e5`, `#b45309`.

**Tema terang (Colorful):**
`--app-bg:#f4f5f3` · `--surface:#fff` · `--surface-2:#f7f8f6` · pita strip = aksen ·
`--ribbon-body:#f7f8f6` · `--ribbon-border:#e2e5e0` · `--text:#1d2125` ·
`--text-dim:#687078` · `--card:#fff` · `--card-border:#e6e8e3` · `--content-bg:#eef0ec` ·
`--divider:#e6e8e3`.

**Tema gelap:**
`--app-bg:#1b1a19` · `--surface:#262523` · `--strip:#2b2a28` · `--ribbon-body:#201f1e` ·
`--ribbon-border:#3a3836` · `--text:#e9e7e3` · `--text-dim:#a29e98` · `--card:#262523` ·
`--card-border:#3a3836` · `--content-bg:#1b1a19`.

**Status (pill):** Aktif/Masuk `#15803d` on `#16a34a`@16% · Izin `#b45309` ·
Sakit/Keluar `#dc2626`. KPI gradien teal: `linear-gradient(140deg,#0f766e,#0a4f46)`;
gradien sekunder cyan: `#0ea5b7→#0c7c98`. Bar Pemasukan = aksen, Pengeluaran = `#ef4d5a`.

**Tipografi:** UI = `"Segoe UI Variable Text","Segoe UI",system-ui` (otentik Windows).
Angka Arab/Hijriah = `"Amiri", serif`. Skala: judul view 20px/700 · KPI 34px/800 ·
angka keuangan 30px/800 · body 14px · label kecil 10–12px.

**Radius:** window 10px · kartu 12–14px · tombol 6–10px · pill 20px.
**Bayangan kartu:** `0 1px 2px rgba(20,30,28,.06), 0 1px 3px rgba(20,30,28,.05)` (terang).

## 10. Aset

- **Logo:** `https://ammuonline.web.app/logo.png` (dipakai untuk ikon app & Tentang).
- **Avatar:** SVG data-URI berinisial (placeholder) — ganti dengan foto user asli.
- **Ikon:** set garis kustom (SVG 24×24, stroke 1.7) di `app/ammu-icons.jsx`. Boleh
  diganti dengan icon set yang sudah dipakai codebase (mis. Lucide/Heroicons) selama
  bobot/gaya serupa.
- Tidak ada emoji. Tidak ada gambar selain logo.

## 11. Catatan penting implementasi

- **Angka keuangan = contoh** agar grafik terlihat hidup. Petakan ke data asli kalian
  (Tagihan, Tabungan, Bisyaroh, Buku Induk, arus kas 12 bulan, saldo berjalan).
- **Angka pendidikan** (431/30/8/2 + breakdown lembaga) diambil persis dari dasbor
  asli kalian — verifikasi sumbernya.
- **Hindari animasi masuk berbasis `opacity:0→1` keyframe** kalau target environment
  bisa membekukan timeline animasi (mis. render headless). Buat state dasar selalu
  terlihat; animasi hanya sebagai pengayaan.
- Pertahankan tinggi sentuh tombol ≥ standar desktop; pita harus bisa di-scroll
  horizontal saat sempit.

## 12. Daftar file di paket ini

- `Ammu Online Desktop.html` — entry; memuat semua skrip + `app/ammu.css`.
- `app/ammu.css` — seluruh styling + token tema.
- `app/ammu-data.js` — data dummy + definisi tab/pita/backstage (`window.AMMU`).
- `app/ammu-icons.jsx` — komponen `Icon` (peta path SVG).
- `app/ammu-ribbon.jsx` — Ribbon, grup, tombol, widget jam & sapaan.
- `app/ammu-views.jsx` — semua view konten + grafik (donut/line/bar).
- `app/ammu-backstage.jsx` — layar Backstage (File).
- `app/ammu-app.jsx` — shell window + state + panel Tweaks (root).
- `tweaks-panel.jsx` — panel kontrol varian (khusus prototipe; tak perlu diport).

Buka `Ammu Online Desktop.html` di browser untuk melihat acuan interaktif.
