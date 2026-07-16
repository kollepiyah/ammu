# Catatan Rilis Android — v.1.1.8 (versionCode 118)

- **versionName:** `v.1.1.8`
- **versionCode:** `118`
- **Paket:** AAB (Google Play — Produksi)
- **Catatan versi:** `vc115` & `vc116` dilewati; `vc117` di-bump tanpa pernah diupload ke
  Play. versionCode Play harus selalu naik & unik — gap diperbolehkan.
  ⚠️ Sebelum upload, **pastikan di Play Console versionCode tertinggi masih < 118**
  (angka yang sudah terpakai tak bisa dipakai ulang).

> Cara pakai: salin blok **"Apa yang Baru"** ke Play Console → Rilis → (pilih track) →
> **Catatan rilis** pada bahasa yang sesuai. Batas Play = 500 karakter per bahasa.

---

## Apa yang Baru — id-ID (Bahasa Indonesia) — paste-ready

```
Versi 1.1.8

Rilis perbaikan & keamanan. Tidak ada fitur baru.

• Keamanan: menutup layanan lama peninggalan sistem sebelumnya yang masih aktif di server.
• Perbaikan penting: perubahan yang gagal disimpan karena hak akses kini memberi pesan error — sebelumnya bisa terlihat "tersimpan" lalu kembali ke nilai lama setelah dimuat ulang.
• Perbaikan: menghapus jabatan terakhir tidak lagi memunculkan kembali daftar jabatan bawaan.
• Perapian pencatatan pembayaran di database (tampilan tidak berubah).
```

---

## What's New — en-US (English default) — paste-ready

```
Version 1.1.8

Maintenance & security release. No new features.

• Security: removed legacy services from the previous system that were still live on the server.
• Important fix: changes rejected by access rules now show an error — previously they could appear "saved" and then revert after a reload.
• Fix: deleting the last job title no longer brings the built-in list back.
• Internal cleanup of how payments are recorded (no visible change).
```

---

## Rincian (internal — tidak untuk Play)

Rilis hasil **audit menyeluruh**. Tanpa fitur baru — menutup 1 kebocoran nyata + membenahi
jalur simpan yang bisa gagal diam-diam. Detail lengkap: `CHANGELOG.md` v.1.1.8.

**Keamanan (commit `350f958`)**

- **56 fungsi → 0.** 19 Cloud Function era-Firestore + 9 extensions BigQuery (37 fungsi) +
  4 fungsi `ext-*` yatim, semuanya dicopot. Terverifikasi `functions:list` & `ext:list` kosong.
- Yang **terbukti bocor** sebelum dicopot: `findUserByLogin` membalas record guru penuh
  (nama, WA, `role_sistem`, `firebase_uid`) **HTTP 200 tanpa auth**, CORS terbuka — jalur
  santri identik; `verifyAdminPassword` = oracle sandi + `?migrate=1` menulis tanpa sandi;
  `stripPlaintextPasswords` = batch update massal, tanpa auth, fallback sandi `'1234'`.
- Firebase kini **Hosting + FCM saja**; blok `functions` dibuang dari `firebase.json`.

**Fix (commit `8abab07`, `3eb27eb`, `cb745dc`, `877d382`)**

- `db.js updateOne` jalur cepat: +`.select(pk)` → UPDATE yang ditolak RLS tak lagi lolos
  sebagai "sukses". 0 baris dibedakan: baris ada = ditolak RLS, baris tak ada = not-found.
- `updateOne` tak lagi UPSERT (kedua jalur konsisten) → tak bisa melahirkan stub row cacat.
  `mergeOne` sengaja tetap boleh membuat baris (ada tes penjaga).
- Kolom `terbayar` = sumber kebenaran (dulu tak pernah diisi → selalu 0). 17 titik pindah
  ke helper `utils/tagihan.js`. `trx.bayar` struk POS TIDAK disentuh (konsep beda: uang
  tunai diserahkan).
- Kelola Jabatan: seed hanya bila dokumen belum ada.

**Catatan build / deploy**

- ⚠️ **WAJIB `supabase db push` DULU** (migrasi `20260715120000` mem-backfill kolom
  `terbayar` dari jsonb), baru build web → `npx cap sync android` → gradle `bundleRelease`.
  Kalau terbalik, tagihan lama sempat terbaca `terbayar = 0`.
- **Verifikasi sesudah push** — `belum_kena` harus **0**:
  ```sql
  select count(*) filter (where terbayar > 0)                              as sudah_terisi,
         count(*) filter (where terbayar = 0 and data->>'bayar' is not null) as belum_kena
  from keuangan_tagihan;
  ```
- **Web:** setelah deploy, set `settings.appVersion` = `v.1.1.8` (sumber tampilan versi di
  web; fallback kode sudah `v.1.1.8`).
- **Uji utama** (belum pernah diuji di app sungguhan — semua perubahan ini menyentuh
  keuangan): 1 transaksi POS beneran (lunas + cicilan), cek tagihan tidak "balik" sesudah
  refresh, dan struk POS masih mencetak angka bayar/kembali dengan benar.
