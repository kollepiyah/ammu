# Catatan Rilis Android — v.1.1.3 (versionCode 113)

- **versionName:** `v.1.1.3`
- **versionCode:** `113`
- **Paket:** AAB (Google Play — Produksi)
- **Versi Play produksi sebelumnya di perangkat user:** vc105 → catatan di bawah merangkum
  highlight sejak itu (Sistem Gedung + Tes Glondongan PTPT + perbaikan template impor).

> Cara pakai: salin blok **"Apa yang Baru"** ke Play Console → Rilis → (pilih track) →
> **Catatan rilis** pada bahasa yang sesuai. Batas Play = 500 karakter per bahasa.

---

## Apa yang Baru — id-ID (Bahasa Indonesia) — paste-ready

```
Versi 1.1.3

• Tes Glondongan PTPT: muroja'ah kumulatif juz kelas lampau — penugasan koordinator, input nilai & catatan per juz, plus bisyaroh per juz yang otomatis masuk slip gaji guru.
• Sistem Gedung: kas & data santri terpisah per unit (mis. TPQ Pagi/Induk); Buku Induk gabungan untuk super admin.
• Penanggung Jawab (PJ) PTPT per santri + filter di Data Santri.
• Kolom Gedung & PJ PTPT kini ada di template impor/ekspor santri.
• Kestabilan sesi login ditingkatkan.
```

---

## What's New — en-US (English default) — paste-ready

```
Version 1.1.3

• Glondongan PTPT assessment: cumulative revision of past-grade juz — coordinator assignment, per-juz scoring & notes, plus per-juz stipend that flows into teacher payslips.
• Building system: separate cash books & student data per unit; combined master book for super admins.
• Per-student PTPT supervisor (PJ) with filtering in Student Data.
• Building & PJ PTPT columns are now in the student import/export template.
• Login session stability improvements.
```

---

## Rincian (internal — tidak untuk Play)

**Fitur utama v.1.1.3 — Tes Glondongan PTPT**

- Santri tes juz → PJ menguji juz tersebut (→ rapor), guru kelas menguji juz kelas berjalan,
  glondongan menguji **semua** juz kelas lampau (blok 5-juz/kelas asal, ditugaskan koordinator
  kelas asal).
- Nilai glondongan & juz berjalan = **catatan evaluasi** (tidak masuk rapor), selalu lulus.
- Bisyaroh per juz: tarif diatur di **Pengaturan Keuangan**, rekap khusus admin, guru melihat
  ringkasannya di slip gaji (snapshot + take-home + receipt/PDF).

**Sudah tercakup sejak vc105 (dibawa serta di build ini)**

- **Sistem Gedung (v.1.1.2)** — scope keuangan & akademik per unit; Buku Kas per gedung,
  Buku Induk gabungan (super admin); uang mengikuti gedung santri; bisyaroh tetap global.
- **PJ PTPT** per santri + filter Gedung/PJ di Data Santri.
- **Fix template impor** — kolom `Gedung` & `PJ PTPT` kini ada di template unduh, terbaca
  saat impor, dan ikut ekspor (registry field santri sebagai sumber tunggal).
- **Auto-recovery sesi "zombie"** — sesi Supabase mati kini otomatis diarahkan ke login,
  tidak lagi menampilkan data kosong.

**Catatan build**

- Tanpa migrasi database untuk Gedung/PJ (disimpan di kolom `data` jsonb).
- Tabel baru `tes_glondongan` perlu `supabase db push` sebelum fitur Glondongan aktif penuh.
