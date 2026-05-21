# 🧪 Smoke Test Checklist — Ammu Online Capacitor

> **Tujuan:** Test semua fitur app sebelum release ke Closed/Open Testing.
> **Cara pakai:** Tester run sesuai urutan. Centang `[x]` kalau OK, catat issue di kolom Notes.
> **Frekuensi:** Setiap release baru (versionCode bump).
> **Tester:** Min 3 orang dengan device berbeda (HP Android 10/12/14).

---

## 📱 Info Build

| Item | Value |
|---|---|
| Versi tested | _____________  |
| versionCode | _____________ |
| Tester nama | _____________ |
| Device + Android version | _____________ |
| Tanggal test | _____________ |

---

## A. INSTALL & FIRST LAUNCH (5 items)

- [ ] **A1.** Install dari Play Store Internal Testing — sukses tanpa error
- [ ] **A2.** Splash screen muncul dengan logo kaligrafi + "Powered by Bakafrawi"
- [ ] **A3.** Icon di home screen = kaligrafi Ammu (BUKAN icon "T" default Capacitor)
- [ ] **A4.** Status bar warna teal `#0F766E` solid, tidak overlap dengan header app
- [ ] **A5.** Permission popup muncul (Notification, Storage) — tap **Allow**

---

## B. LOGIN & AUTH (8 items)

- [ ] **B1.** Tap "Masuk dengan WhatsApp" — form muncul, input WA + password
- [ ] **B2.** Login dengan password salah → toast error "Password salah" jelas
- [ ] **B3.** Login built-in admin: username `admin` + password admin → masuk dashboard
- [ ] **B4.** Login guru/pengurus dengan WA terdaftar → masuk dashboard sesuai role
- [ ] **B5.** Centang "Ingat Saya" → close-buka app → tetap login (NO redirect ke login page)
- [ ] **B6.** TIDAK centang "Ingat Saya" → close-buka app → di Capacitor mode **tetap login** (override auto-persist)
- [ ] **B7.** Tap menu sidebar → "Logout" → confirm dialog muncul → tap Logout → balik ke login
- [ ] **B8.** Force close app dari recent apps → buka lagi → **TETAP LOGIN** (tidak redirect ke login)

---

## C. SIDEBAR & NAVIGATION (7 items)

- [ ] **C1.** Tap icon menu (☰) kiri atas → sidebar slide dari kiri
- [ ] **C2.** Sidebar header: logo + "Pondok Pesantren Mambaul Ulum" + badge Hijri "DZULQO'DAH 1447"
- [ ] **C3.** List menu visible dengan KONTRAS jelas (light mode: teks gelap; dark mode: teks terang)
- [ ] **C4.** Tap menu item → halaman pindah + sidebar auto-close
- [ ] **C5.** Tap area di luar sidebar (overlay gelap) → sidebar tutup
- [ ] **C6.** Tap tombol back HP (saat sidebar buka) → sidebar tutup (BUKAN exit app)
- [ ] **C7.** Footer sidebar: `v.0X.0526` + tahun pondok

---

## D. DARK MODE (4 items)

- [ ] **D1.** Tap icon bulan/matahari di header → toggle dark/light mode
- [ ] **D2.** Light mode: BG putih/Azure, teks gelap, sidebar putih
- [ ] **D3.** Dark mode: BG slate-900 gelap, teks terang, sidebar gelap
- [ ] **D4.** Pilihan dark/light persist setelah close-buka app

---

## E. BERANDA (Dashboard) (6 items)

- [ ] **E1.** Header: "Ammu Online" + icon dark mode + foto profil/logo
- [ ] **E2.** Greeting: "Ahlan, [nama lengkap]!" + badge role
- [ ] **E3.** Widget Jam Hijri + Masehi (real-time, update tiap detik)
- [ ] **E4.** Widget Kalender Pendidikan — list 2-3 agenda terdekat dengan tanggal Arabic `٢٨ ذو ٱلقعدة ١٤٤٧`
- [ ] **E5.** Range tanggal kegiatan (mis. "21/05 – 19/05") — di v.01.0526+ harus **Arabic**: `٢١ – ١٩ ذو الحجة ١٤٤٧`
- [ ] **E6.** Ammu Channel feed: list postingan dengan gambar + judul + tanggal

---

## F. DATA SANTRI (CRUD + Ekspor) (10 items)

- [ ] **F1.** Menu **Data Santri** → list santri muncul (data dari Firestore)
- [ ] **F2.** Search box → ketik nama → list filter realtime
- [ ] **F3.** Tap baris santri → modal detail muncul + tombol Edit/Hapus
- [ ] **F4.** Edit santri → ubah field → Simpan → toast "Tersimpan" + list refresh
- [ ] **F5.** Hapus santri → confirm dialog → Hapus → toast + list refresh
- [ ] **F6.** Tap **Form Register Santri** → form muncul, isi semua field
- [ ] **F7.** Submit form register → toast "Tersimpan" + santri muncul di list
- [ ] **F8.** Tombol **Ekspor PDF** → file PDF tersimpan di `/Download/AmmuOnline/` + Share dialog muncul
- [ ] **F9.** Tombol **Ekspor CSV** → file CSV tersimpan
- [ ] **F10.** Tombol **Ekspor Excel** → file XLSX tersimpan (dengan KOP+logo kalau styled)

---

## G. DATA GURU (CRUD + Ekspor) (5 items)

- [ ] **G1.** Menu **Guru/Pegawai** → list guru muncul
- [ ] **G2.** Tap guru → detail + Edit/Hapus
- [ ] **G3.** Tambah guru baru → tersimpan
- [ ] **G4.** Ekspor PDF Guru → file tersimpan + dapat dibuka
- [ ] **G5.** Ekspor Excel Guru → file tersimpan dengan format

---

## H. MASTER DATA (Lembaga / Jabatan / Kelas Sekolah) (8 items)

- [ ] **H1.** Menu **Master Data** → 3 tab: Lembaga, Jabatan, Kelas Sekolah
- [ ] **H2.** Tab Lembaga: list lembaga (PTPT, Diniyah, Formal, dll) muncul
- [ ] **H3.** Tap lembaga → drilldown ke detail kelas + assign guru
- [ ] **H4.** Tab Jabatan: list jabatan, bisa add/edit/hapus
- [ ] **H5.** Tab Kelas Sekolah: list kelas (SD/SMP/SMA/dll), bisa CRUD
- [ ] **H6.** Tombol **Ekspor PDF Lembaga** → file tersimpan
- [ ] **H7.** Tombol **Cetak Admin Santri/Guru** → file tersimpan
- [ ] **H8.** Tombol **Ekspor Excel View** Santri/Guru → file tersimpan

---

## I. INPUT PRESTASI QIRAATI (Bulanan) (6 items)

- [ ] **I1.** Menu **Rekap Prestasi** → halaman input bulanan
- [ ] **I2.** Filter bulan + tahun → tabel santri muncul
- [ ] **I3.** Input nilai (awal, akhir, total, kelas, juz) → auto-save atau klik Simpan
- [ ] **I4.** Tombol **Ekspor PDF Sesuai Format** → file tersimpan dengan KOP rapi
- [ ] **I5.** Tombol **Ekspor Excel Sesuai Format** → file tersimpan (admin: multi-sheet per lembaga, guru: single sheet)
- [ ] **I6.** Cetak PDF: tabel header repeat di setiap halaman, no overlap

---

## J. REKAP DINIYAH (5 items)

- [ ] **J1.** Menu **Rekap Diniyah** → tabel nilai diniyah muncul
- [ ] **J2.** Filter per tahun ajaran + semester
- [ ] **J3.** Input nilai per cell → auto-save
- [ ] **J4.** Tombol **Ekspor PDF** → file tersimpan
- [ ] **J5.** Tombol **Ekspor Excel** → file tersimpan dengan format

---

## K. RAPOR SEMESTER (6 items)

- [ ] **K1.** Menu **Rapor Semester** → list santri muncul
- [ ] **K2.** Pilih lembaga + tahun ajaran + semester → list filter
- [ ] **K3.** Tap santri → form rapor muncul dengan section nilai per kategori
- [ ] **K4.** Input/edit nilai → Simpan
- [ ] **K5.** Tombol **Cetak Rapor PDF** → preview muncul di iframe overlay (Capacitor) atau download (web)
- [ ] **K6.** Tombol **Ekspor PDF** rapor → file tersimpan

---

## L. ABSENSI (5 items)

- [ ] **L1.** Menu **Absensi Guru** → list absensi harian
- [ ] **L2.** Input absensi manual → tersimpan
- [ ] **L3.** Tombol **Ekspor Rekap Absen** → PDF + Excel tersimpan
- [ ] **L4.** Tombol **Cetak Absen Bulanan** → file tersimpan
- [ ] **L5.** **Import Absen Bulanan** dari Excel template → data masuk + toast confirm

---

## M. KALENDER KEGIATAN (4 items)

- [ ] **M1.** Menu **Kalender Kegiatan** → list agenda muncul
- [ ] **M2.** Tambah agenda → modal form → simpan
- [ ] **M3.** Edit agenda → ubah field → simpan
- [ ] **M4.** Hapus agenda → confirm → terhapus

---

## N. KEUANGAN — POS PEMBAYARAN (8 items, butuh role admin_keuangan)

- [ ] **N1.** Menu **POS Santri** → modal POS muncul
- [ ] **N2.** Pilih santri → field santri terisi
- [ ] **N3.** Tambah item (Syahriyah, SPP, dll) + nominal
- [ ] **N4.** Input bayar → kembalian auto-calculate
- [ ] **N5.** Tap **Proses & Cetak Struk** → simpan transaksi + struk muncul
- [ ] **N6.** Struk preview di iframe overlay (Capacitor) → tap Cetak → native print
- [ ] **N7.** Riwayat transaksi → list muncul + filter tanggal
- [ ] **N8.** Ekspor Riwayat PDF/Excel → file tersimpan

---

## O. KEUANGAN — LAINNYA (5 items)

- [ ] **O1.** **Bisyaroh Guru/Pegawai** → list slip gaji, generate per periode
- [ ] **O2.** **Cetak Slip Gaji** → file tersimpan
- [ ] **O3.** **Tabungan Santri** → list + tambah mutasi → tersimpan
- [ ] **O4.** **Hutang Piutang** → list + tambah → tersimpan, ekspor PDF
- [ ] **O5.** **Buku Induk** (arus kas) → auto-update dari semua transaksi, ekspor PDF

---

## P. NAIK KELAS / KARTU KENAIKAN (4 items)

- [ ] **P1.** Menu **Kenaikan/Mutasi** → form kenaikan kelas santri
- [ ] **P2.** Submit kenaikan → tersimpan
- [ ] **P3.** **Cetak Kartu Kenaikan** → PDF tersimpan
- [ ] **P4.** **Ekspor Riwayat Kenaikan** PDF/Excel → file tersimpan

---

## Q. PROFIL USER (4 items)

- [ ] **Q1.** Menu **Profil** → halaman profil personal
- [ ] **Q2.** Edit foto profil → upload sukses
- [ ] **Q3.** Edit tanda tangan → upload sukses
- [ ] **Q4.** Simpan profil → toast confirm

---

## R. PENGATURAN WEB (admin only) (4 items)

- [ ] **R1.** Menu **Pengaturan** → form settings muncul
- [ ] **R2.** Edit nama aplikasi, kop, alamat → Simpan → toast
- [ ] **R3.** Upload logo pesantren → preview muncul → Simpan
- [ ] **R4.** Toggle fitur (Beranda, Kalender, Notif, Kritik) → Simpan → settings persist

---

## S. KRITIK & SARAN (3 items)

- [ ] **S1.** Menu **Kritik & Saran** → list pesan (admin) atau form input (user)
- [ ] **S2.** User: submit kritik baru → tersimpan + admin terima notif
- [ ] **S3.** Admin: reply / hapus pesan

---

## T. NOTIFIKASI (3 items)

- [ ] **T1.** App kirim FCM token saat login (cek di Sentry/Firebase Console)
- [ ] **T2.** Notif test dari Firebase Console → muncul di HP
- [ ] **T3.** Tap notif → buka halaman yang sesuai (deep link)

---

## U. CAPACITOR SPECIFIC (5 items)

- [ ] **U1.** Tombol back HP saat di dashboard → confirm "Tekan back sekali lagi untuk keluar"
- [ ] **U2.** Tombol back saat modal terbuka → close modal (BUKAN exit app)
- [ ] **U3.** Tombol back setelah cetak PDF (iframe overlay) → close iframe overlay
- [ ] **U4.** Pull-to-refresh — TIDAK ada indicator muncul (sudah di-disable di Capacitor)
- [ ] **U5.** Console log via Chrome inspect — no critical error merah

---

## V. EDGE CASES (5 items)

- [ ] **V1.** Mode pesawat (offline) → buka app → halaman cached muncul, toast "Offline mode"
- [ ] **V2.** Reconnect online → data auto-sync
- [ ] **V3.** Login dengan akun santri (jika ada) → akses limited sesuai role
- [ ] **V4.** Login dengan akun guru → akses limited sesuai lembaga
- [ ] **V5.** Buka app pertama kali setelah update version → tidak ada cache lama broken

---

## 📝 BUG REPORT TEMPLATE

Untuk setiap item yang TIDAK pass (`[ ]` tidak di-centang):

```
🐛 BUG #__
Section: [B / C / D / ...]
Item: [B7 / C5 / etc]
Versi: v.0X.0526
Device: [Xiaomi 2504 / Samsung A20 / dll]
Android: [13 / 14 / 15]
Description: [apa yang terjadi]
Steps to reproduce:
  1. ...
  2. ...
Expected: [apa yang seharusnya]
Actual: [apa yang terjadi]
Screenshot: [attach]
Console log: [kalau ada via Chrome inspect]
```

---

## 📊 RINGKASAN

| Section | Pass | Fail | Skip | Total |
|---|---|---|---|---|
| A. Install & First Launch | __/5 | __ | __ | 5 |
| B. Login & Auth | __/8 | __ | __ | 8 |
| C. Sidebar & Navigation | __/7 | __ | __ | 7 |
| D. Dark Mode | __/4 | __ | __ | 4 |
| E. Beranda | __/6 | __ | __ | 6 |
| F. Data Santri | __/10 | __ | __ | 10 |
| G. Data Guru | __/5 | __ | __ | 5 |
| H. Master Data | __/8 | __ | __ | 8 |
| I. Input Prestasi | __/6 | __ | __ | 6 |
| J. Rekap Diniyah | __/5 | __ | __ | 5 |
| K. Rapor Semester | __/6 | __ | __ | 6 |
| L. Absensi | __/5 | __ | __ | 5 |
| M. Kalender Kegiatan | __/4 | __ | __ | 4 |
| N. POS Keuangan | __/8 | __ | __ | 8 |
| O. Keuangan Lain | __/5 | __ | __ | 5 |
| P. Naik Kelas | __/4 | __ | __ | 4 |
| Q. Profil | __/4 | __ | __ | 4 |
| R. Pengaturan | __/4 | __ | __ | 4 |
| S. Kritik & Saran | __/3 | __ | __ | 3 |
| T. Notifikasi | __/3 | __ | __ | 3 |
| U. Capacitor Specific | __/5 | __ | __ | 5 |
| V. Edge Cases | __/5 | __ | __ | 5 |
| **TOTAL** | **__/120** | __ | __ | **120** |

---

## 🎯 PASS RATE TARGET

| Tahap | Target Pass Rate | Action |
|---|---|---|
| Internal Testing | ≥ 80% | Lanjut Closed Alpha |
| Closed Alpha | ≥ 90% | Lanjut Open Beta |
| Open Beta | ≥ 95% | Lanjut Production |
| Production | ≥ 98% | Release ke public |

Pass rate dihitung: `(pass / (total - skip)) * 100%`

---

**Tester:** _______________  **Tanggal:** _______________  **Pass rate:** ____ / 120
