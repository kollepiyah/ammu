# Catatan Rilis Android — v.1.1.7 (versionCode 117)

- **versionName:** `v.1.1.7`
- **versionCode:** `117`
- **Paket:** AAB (Google Play — Produksi)
- **Catatan versi:** `vc115` & `vc116` dilewati (belum pernah diupload ke Play).
  versionCode Play harus selalu naik & unik — gap diperbolehkan.

> Cara pakai: salin blok **"Apa yang Baru"** ke Play Console → Rilis → (pilih track) →
> **Catatan rilis** pada bahasa yang sesuai. Batas Play = 500 karakter per bahasa.

---

## Apa yang Baru — id-ID (Bahasa Indonesia) — paste-ready

```
Versi 1.1.7

• Menu baru "Uang Kegiatan" & "Uang Buku": rekap saldo tersendiri, input uang masuk/keluar, dan pemasukan bisa otomatis dari pembayaran santri.
• Semua tetap tercatat di Buku Induk (tanpa dobel-hitung).
• Jenis Pembayaran & Generate Tagihan bisa ditandai pos Kegiatan/Buku.
• Kategori Tabungan kini bisa diatur sendiri (tambah/ubah/hapus).
• Perbaikan: Pengaturan Keuangan tak lagi balik ke default setelah refresh; bendahara bisa menyimpan pengaturan.
```

---

## What's New — en-US (English default) — paste-ready

```
Version 1.1.7

• New "Activity Fund" & "Book Fund" menus: their own balance recap, manual money in/out, and income can flow automatically from student payments.
• Everything still recorded in the main ledger (no double counting).
• Payment types & bill generation can be tagged to the Activity/Book fund.
• Savings categories are now customizable (add/edit/remove).
• Fixes: Finance Settings no longer revert to default after refresh; treasurer can save settings.
```

---

## Rincian (internal — tidak untuk Play)

**Baru di v.1.1.7**

- **Uang Kegiatan & Uang Buku** = "pos/kantong dana" bertag di ledger tunggal
  `keuangan_buku_induk` (field `pos` di `data` jsonb). Total tetap ikut Buku Induk.
- `UangPosView.vue` (1 komponen, 2 route) + dropdown **Pos Dana** di Jenis Pembayaran
  & Generate Tagihan Khusus (tagihan menyimpan pos → dibawa saat bayar).
- **Editor Kategori Tabungan** (Pengaturan Keuangan → tab Kategori) → `keuTabunganKategori`
  (dipakai TabunganView, auto-isi nominal dari `nominal_default`).

**Fix**

- **Pengaturan Keuangan balik ke default setelah refresh** — `onMounted` kini `await
  settingsStore.load()` sebelum derive form (main.js hanya subscribe, fetch async).
- **Bendahara `admin_keuangan` gagal simpan settings** (RLS tolak diam-diam) — migration
  `20260714120000_settings_write_keuangan.sql`.

**Catatan build / deploy**

- **WAJIB `supabase db push` DULU** (migration RLS `settings`), baru build web →
  `npx cap sync android` → gradle `bundleRelease`. Fitur pos & editor kategori tanpa
  migrasi tambahan (pakai `data` jsonb yang sudah ada).
- **Web:** setelah deploy, set `settings.appVersion` = `v.1.1.7` (sumber tampilan versi
  di web; fallback kode sudah `v.1.1.7`).
