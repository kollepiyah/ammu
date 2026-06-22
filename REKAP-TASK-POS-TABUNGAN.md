# Rekap Task — POS & Struk Tabungan

> Dibuat 06 Jun 2026. Belum dikerjakan — rekap saja (kyai minta hemat limit).
> Saat sesi baru: baca `PROJECT-KNOWLEDGE-BASE.md` dulu, lalu kerjakan 1 file per batch + verifikasi (lihat aturan §8).

## Task 1 — Struk tabungan: label "Nasabah" tanpa kurung
**Permintaan:** Di struk tabungan, "Nasabah (Penyetor)" / "Nasabah (Penarik)" → cukup **"Nasabah"**.

Lokasi yang harus diubah:
- `vue-app/src/utils/strukBuilder.js`
  - ~baris 550 (PDF): `'Nasabah (Penyetor),' : 'Nasabah (Penarik),'` → `'Nasabah,'`
  - ~baris 658 (HTML thermal): `'Nasabah (Penyetor),' : 'Nasabah (Penarik),'` → `'Nasabah,'`
- `vue-app/src/utils/escpImage.js`
  - ~baris 242 `signLeftLabel`: idem → `'Nasabah,'`
- Cek juga `vue-app/src/utils/receiptHtml.js` (muncul di hasil grep, pastikan tidak ada label kembar).

Catatan: label POS (transaksi penjualan) pakai "Penyetor," — itu BUKAN bagian struk tabungan, jangan diubah kecuali kyai minta.

## Task 2 — POS: tambah metode bayar
**Permintaan:** POS sekarang hanya Tunai (transfer cuma via app walisantri). Tambah pilihan metode bayar di pop up transaksi POS.

Lokasi: `vue-app/src/components/pos/ModalPOS.vue`
- Bagian uang bayar saat ini: `quickCash()` ~baris 169; tombol "Uang pas/+50rb/+100rb/+200rb" ~baris 306-309.
- Yang perlu: selector metode (mis. Tunai / Transfer / QRIS), simpan `metode_bayar` di payload submit (~baris 178-216).
- Hilir: tampilkan metode di struk (`strukBuilder.js`) & riwayat (`RiwayatPosView.vue`); simpan ke `keuangan_buku_induk`.

## Task 3 — POS: bayar tagihan beberapa bulan ke depan
**Permintaan:** Sekarang POS hanya bayar tagihan bulan berjalan. Mau bisa bayar maju (mis. Juni bayar s/d Agustus).

Lokasi: `vue-app/src/components/pos/ModalPOS.vue` (prop `pendingTagihan` ~baris 15, `tagihanRows` ~baris 72-103).
- Sumber data tagihan: `vue-app/src/views/PosSantriView.vue` + composable `useKeuangan.js`.
- Yang perlu:
  1. Ambil/generate tagihan bulan-bulan mendatang (yang belum dibuat) sesuai jenis tagihan rutin santri.
  2. UI di pop up: pilih rentang / jumlah bulan ke depan.
  3. Tulis ke `keuangan_tagihan` (status lunas) + `keuangan_buku_induk` per bulan.
- Hati-hati idempotensi: jangan dobel-buat tagihan yang sudah ada.

---
**Urutan saran:** Task 1 (paling kecil & aman) → Task 2 → Task 3 (paling besar, sentuh data tagihan).
