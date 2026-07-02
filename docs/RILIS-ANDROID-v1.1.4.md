# Catatan Rilis Android — v.1.1.4 (versionCode 114)

- **versionName:** `v.1.1.4`
- **versionCode:** `114`
- **Paket:** AAB (Google Play — Produksi)
- **Versi Play produksi sebelumnya di perangkat user:** vc105 → catatan di bawah
  merangkum highlight sejak itu (Gedung + Glondongan PTPT + No. Induk tetap +
  pisah login santri/wali & guru/pegawai). AAB vc113 tidak jadi dibuat → langsung vc114.

> Cara pakai: salin blok **"Apa yang Baru"** ke Play Console → Rilis → (pilih track) →
> **Catatan rilis** pada bahasa yang sesuai. Batas Play = 500 karakter per bahasa.

---

## Apa yang Baru — id-ID (Bahasa Indonesia) — paste-ready

```
Versi 1.1.4

• Login lebih pas: pilih tab "Santri/Wali" atau "Guru/Pegawai" — satu nomor WA bisa dipakai wali sekaligus guru tanpa bentrok. Wali beberapa anak bisa ganti anak lewat dropdown.
• No. Induk santri kini tetap; santri baru & impor lanjut nomor (tak lagi diacak ulang).
• Kolom Gedung & PJ PTPT ada di template impor/ekspor santri.
• Tes Glondongan PTPT: muroja'ah kumulatif juz + bisyaroh per juz masuk slip gaji.
• Sistem Gedung: kas & data santri terpisah per unit.
```

---

## What's New — en-US (English default) — paste-ready

```
Version 1.1.4

• Clearer login: pick "Student/Parent" or "Teacher/Staff" — one WhatsApp number works for a parent who is also a teacher. Parents of several children switch via a dropdown.
• Student IDs are now fixed; new & imported students continue the sequence (no reshuffling).
• Building & PTPT-supervisor columns added to the student import/export template.
• Glondongan PTPT: cumulative juz revision + per-juz stipend in payslips.
• Building system: separate cash & data per unit.
```

---

## Rincian (internal — tidak untuk Play)

**Baru di v.1.1.4**

- **Pisah jalur login** santri/wali vs guru/pegawai (`resolve_login` param sumber) —
  atasi 1 WA dipakai guru yang juga wali. Melengkapi dropdown "ganti anak"
  (`useWaliChildren`) yang sudah ada.
- **No. Induk TETAP** — pasca impor tak reshuffle; santri baru/impor lanjut nomor
  (max+1); impor tak menimpa No. Induk lama dgn kosong.
- **Kolom Gedung & PJ PTPT** di template impor/ekspor (registry `santriFields`).

**Terbawa sejak vc105**

- **Tes Glondongan PTPT** (v.1.1.3) — muroja'ah kumulatif juz kelas lampau, penugasan
  koordinator, nilai & catatan per juz, bisyaroh per juz ke slip gaji.
- **Sistem Gedung** (v.1.1.2) — scope keuangan & akademik per unit; Buku Induk gabungan
  (super admin); bisyaroh tetap global.
- **PJ PTPT** per santri + filter di Data Santri.
- **Auto-recovery sesi "zombie"** — sesi Supabase mati diarahkan ke login.

**Catatan build / deploy**

- **Urutan WAJIB:** `supabase db push` DULU (RPC `resolve_login` baru + tabel
  `tes_glondongan`), baru build web → `npx cap sync android` → gradle `bundleRelease`.
- Perubahan RPC aman-mundur (client lama tetap jalan lewat named-arg default).
- Gedung/PJ tanpa migrasi tambahan (kolom `data` jsonb).
