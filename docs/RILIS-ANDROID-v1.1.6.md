# Catatan Rilis Android — v.1.1.6 (versionCode 116)

- **versionName:** `v.1.1.6`
- **versionCode:** `116`
- **Paket:** AAB (Google Play — Produksi)
- **Catatan versi:** `vc115` sengaja dilewati (dicadangkan branch fitur lain yang
  belum dirilis). versionCode Play harus selalu naik & unik — gap diperbolehkan.

> Cara pakai: salin blok **"Apa yang Baru"** ke Play Console → Rilis → (pilih track) →
> **Catatan rilis** pada bahasa yang sesuai. Batas Play = 500 karakter per bahasa.

---

## Apa yang Baru — id-ID (Bahasa Indonesia) — paste-ready

```
Versi 1.1.6

• Menu baru "Uang Kegiatan" & "Uang Buku": rekap saldo tersendiri, input uang masuk/keluar, dan pemasukan bisa otomatis dari pembayaran santri.
• Semua tetap tercatat di Buku Induk (tanpa dobel-hitung).
• Di Pengaturan Keuangan, tiap Jenis Pembayaran bisa ditandai masuk pos Kegiatan atau Buku.
```

---

## What's New — en-US (English default) — paste-ready

```
Version 1.1.6

• New "Activity Fund" & "Book Fund" menus: their own balance recap, manual money in/out, and income can flow automatically from student payments.
• Everything still recorded in the main ledger (no double counting).
• In Finance Settings, each payment type can be tagged to the Activity or Book fund.
```

---

## Rincian (internal — tidak untuk Play)

**Baru di v.1.1.6**

- **Uang Kegiatan & Uang Buku** = "pos/kantong dana" bertag di ledger tunggal
  `keuangan_buku_induk` (field `pos` = `kegiatan` | `buku` | kosong=umum di `data`
  jsonb). Total tetap ikut Buku Induk — pos hanya penyaring + tag.
- **`UangPosView.vue`** — 1 komponen, 2 route (`/uang-kegiatan`, `/uang-buku`) via
  `route.meta.pos`: kartu saldo, tabel transaksi pos, input keluar/masuk manual,
  hapus (super_admin). Scope ikut Buku Induk (`useGedungScope`).
- **Dropdown "Pos Dana"** per Jenis Pembayaran (`keuTagihanJenis[].pos`) di
  PengaturanKeuangan. `PosSantriView.handleSimpan` menandai `pos` baris buku induk
  saat jenis yang dibayar tergolong pos (match by label; cover tagihan+extra+prepay).

**Catatan build / deploy**

- **Tanpa migrasi** untuk rilis ini (pos di kolom `data` jsonb yang sudah ada; RLS &
  realtime `keuangan_buku_induk` sudah mencakup). Cukup: build web →
  `npx cap sync android` → gradle `bundleRelease`.
- Bila digabung dengan rilis lain yang punya migrasi, jalankan `supabase db push`
  sesuai kebutuhan rilis tersebut.
- **Web:** setelah deploy, set `settings.appVersion` = `v.1.1.6` (sumber tampilan
  versi di web; fallback kode sudah `v.1.1.6`).
