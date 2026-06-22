# 📸 Screenshot Guide — Ammu Online Play Store

> **Target:** 4-8 screenshot dari running app untuk Play Store listing
> **Spec:** PNG/JPG, **16:9** atau **9:16** ratio, min 320px, max 3840px per sisi, file < 8 MB
> **Recommended:** **1080x1920 (portrait)** atau **1920x1080 (landscape)** — phone size
> **Tablet:** opsional, tapi recommended untuk app edukasi (boost approval rate)

---

## 🎯 Minimum requirement Play Store

- **Phone screenshots:** min 2, max 8
- **7-inch tablet screenshots:** opsional (max 8)
- **10-inch tablet screenshots:** opsional (max 8)

**Catatan v1.0.0:** Cukup **phone screenshots** untuk Internal Testing. Tablet bisa ditambah nanti.

---

## 📋 Recommended Screenshot List (8 buah, sorted by impact)

### #1 — Dashboard utama (hero shot)
- **Halaman:** Dashboard pengurus / guru
- **Apa yang harus terlihat:**
  - Header dengan logo + nama aplikasi
  - Card statistik (jumlah santri, guru, lembaga)
  - Widget kalender pendidikan
  - Widget kegiatan hari ini
- **Kenapa penting:** First impression user di Play Store, harus paling menarik
- **Tips:** Pakai mode terang (light) supaya jelas, pastikan tidak ada data dummy "test123"

### #2 — Input Prestasi Qiraati
- **Halaman:** Input bulanan
- **Apa yang harus terlihat:**
  - Tabel santri dengan kolom Capaian Awal/Akhir/Total
  - Header bulan + tahun + lembaga filter
  - Tombol Simpan & Ekspor
- **Kenapa penting:** Fitur core utama buat guru

### #3 — Rapor Semester / Cetak PDF
- **Halaman:** Rapor semester
- **Apa yang harus terlihat:**
  - Preview rapor santri dengan KOP pondok
  - Tabel nilai per mapel
  - Tombol Cetak PDF
- **Kenapa penting:** Output deliverable, value tinggi untuk wali santri

### #4 — POS Pembayaran (modul keuangan)
- **Halaman:** POS pembayaran santri (`keu-santri`)
- **Apa yang harus terlihat:**
  - Form santri + item pembayaran
  - Total + bayar + kembalian
  - Tombol Proses & Cetak Struk
- **Kenapa penting:** Fitur unik vs kompetitor (kebanyakan app pesantren tidak punya POS)

### #5 — Kalender Pendidikan & Hijriah
- **Halaman:** Kalender kegiatan
- **Apa yang harus terlihat:**
  - List agenda dengan tanggal Masehi + Hijriah
  - Filter bulan
  - Detail kegiatan
- **Kenapa penting:** Showcase fitur kalender Hijri (unique selling point)

### #6 — Feed Beranda + Notifikasi
- **Halaman:** Beranda (`dashboard` dengan post feed)
- **Apa yang harus terlihat:**
  - Postingan profil pesantren dengan gambar
  - Notifikasi push contoh (kalau bisa screenshot push notif)
- **Kenapa penting:** Community feature

### #7 — Mode Gelap (Dark Mode)
- **Halaman:** Apa saja, tapi tunjukkan dengan jelas dark mode aktif
- **Apa yang harus terlihat:**
  - Background gelap (slate-900)
  - Teks terang
  - Logo & icon tetap visible
- **Kenapa penting:** Selling point UX modern

### #8 — Settings / Pengaturan
- **Halaman:** Pengaturan Web
- **Apa yang harus terlihat:**
  - Identitas pondok bisa diubah
  - KOP surat editable
  - Toggle fitur per modul
- **Kenapa penting:** Showcase flexibility / kustomisasi

---

## 🛠️ Cara Capture Screenshot (3 metode)

### Metode A — Browser DevTools (PALING MUDAH)

1. Buka `https://qiraati-rapor.web.app` di **Chrome / Edge**
2. Login sebagai admin (atau akun pengurus)
3. Tekan **F12** → buka DevTools
4. Klik icon **Toggle Device Toolbar** (`Ctrl+Shift+M`)
5. Pilih device: **"Pixel 7"** atau **"iPhone 14 Pro Max"** (resolusi 1080x1920 atau setara)
6. Atur **Device Pixel Ratio** ke 1 (di gear icon settings DevTools)
7. Navigate ke halaman target → atur konten supaya rapi
8. Klik **3-dot menu** di Device Toolbar → **"Capture full size screenshot"**
9. File tersimpan di Downloads, rename ke `screenshot-N-namafitur.png`

### Metode B — HP Android langsung

1. Install app dev di HP (via APK debug build atau buka via browser HP)
2. Buka halaman target
3. Tekan **Power + Volume Down** untuk screenshot
4. Transfer ke PC via USB / Google Drive
5. Rename file

### Metode C — Android Emulator

1. Buka Android Studio → AVD Manager → Pixel 7 Pro emulator
2. Run app (Capacitor: `npx cap run android`)
3. Pakai tombol **camera icon** di sidebar emulator untuk screenshot
4. File tersimpan di `~/Pictures/Screenshots/`

---

## ⚠️ Hal yang HARUS dihindari di screenshot

- ❌ Data dummy / lorem ipsum / "test123" / "abc"
- ❌ Nomor WhatsApp / email user real (privacy issue)
- ❌ Logo aplikasi lain (kompetitor) yang terbawa
- ❌ Notifikasi sistem yang tidak relevan (Telegram, WA, dll) — pakai mode "Do Not Disturb"
- ❌ Status bar dengan baterai 5% atau jam aneh
- ❌ Watermark "DEMO" / "PREVIEW"

### Pre-screenshot cleanup
- Set jam HP / emulator ke waktu wajar (mis. 10:00, 14:30)
- Battery icon penuh (charging atau set emulator)
- Sinyal full bar
- Mode pesawat OFF
- Notifikasi pending DI-DISMISS dulu

---

## 📁 File naming convention

```
playstore-screenshots/
├── 01-dashboard-portrait-1080x1920.png
├── 02-input-prestasi-portrait-1080x1920.png
├── 03-rapor-pdf-portrait-1080x1920.png
├── 04-pos-pembayaran-portrait-1080x1920.png
├── 05-kalender-portrait-1080x1920.png
├── 06-feed-beranda-portrait-1080x1920.png
├── 07-dark-mode-portrait-1080x1920.png
└── 08-pengaturan-portrait-1080x1920.png
```

Setelah semua siap, kyai upload ke `D:\Aplikasi Project\Portal MU\playstore-screenshots\` folder, lalu saya bisa verify dimensi & format.

---

## 🎨 Optional: Frame / mockup styling

Kalau mau extra polish (bukan wajib), ada tool free buat tambah device frame:
- **screenshot.rocks** — drag screenshot ke template Pixel/iPhone frame
- **mockuphone.com** — gratis, banyak device options
- **figma plugins** — kalau punya Figma, plugin "Mockup" sangat bagus

Tapi untuk Internal Testing, **raw screenshots tanpa frame sudah OK**.

---

## 📤 Upload ke Play Console

1. Buka **Play Console → Main store listing → Graphics**
2. Section **Phone screenshots** → drag 4-8 screenshot
3. Drag urutan sesuai prioritas (paling kiri = paling pertama muncul)
4. Save changes
5. Setelah AAB upload + form lain done → Submit untuk review

---

## ✅ Checklist akhir

- [ ] Min 2 phone screenshots ready (recommended 4-8)
- [ ] Semua screenshot resolution ≥ 320px per sisi
- [ ] File size masing-masing < 8 MB
- [ ] Tidak ada data dummy / placeholder
- [ ] Tidak ada notifikasi sistem mengganggu
- [ ] Urutan sesuai impact (dashboard first)
- [ ] Konsisten tema (semua light mode, atau campur 1-2 dark mode)
- [ ] Upload ke `D:\Aplikasi Project\Portal MU\playstore-screenshots\` untuk arsip lokal
