# Audit Fitur Keuangan — Portal MU (v.21.103.0527)

Tanggal: 27 Mei 2026
Cakupan: BukuInduk, Bisyaroh, Tabungan, Tagihan, POS Santri, Riwayat POS,
Pengaturan Keuangan, Laporan Keuangan, Hutang Piutang, Pembayaran, Riwayat Santri.

## ✅ Sudah konsisten

- **POS → Buku Induk flow**: tiap item ditulis sbg record `keuangan_buku_induk`
  dgn `sumber:'pos_santri'`, `tipe:'masuk'`, `trx_id` shared utk grouping;
  auto-update tagihan jadi `partial`/`lunas` (toleransi 0.5).
- **Buku Induk exclude tabungan**: filter defensif `kategori/sumber === 'tabungan'`.
- **ModalPOS preset filter**: `lembaga_only` whitelist + 3-lapis lookup nominal
  (per_kelas → per_lembaga → default).
- **Pengaturan Keuangan round-trip**: `keuTagihanJenis` load/save lengkap.
- **Bonus Kehadiran snapshot**: `bonus_kehadiran` di-snapshot saat save Bisyaroh
  (hadir + tarif + total) — historical accurate meski tarif berubah.
- **Super_admin gating CRUD**: edit/hapus + bulk delete di BukuInduk, Tabungan,
  Bisyaroh, Tagihan, RiwayatPos lewat `isSuperAdmin(sesiAktif)`.
- **Reprint struk** di BukuInduk pakai `trx_id` query.
- **Hutang Piutang** self-contained, tidak nyangkut buku induk.

## ⚠️ Issue

### HIGH

1. **PembayaranView (santri view) selalu kosong** — POS tulis ke
   `keuangan_buku_induk`, tapi `Pembayaran Saya` subscribe `keuangan_pembayaran`.
   Santri yg bayar lewat POS tidak akan melihat riwayatnya.

2. **Schema tagihan mismatch antara TagihanView dan POS** —
   - TagihanView write: `kategori`, `nominal`, `bayar` (tanpa `status`)
   - POS write/read: `kategori`, `nominal`, `bayar`, `status` ('belum'/'partial'/'lunas')
   - Firestore rules `keuangan_tagihan`: require `jenis_id`, `nominal_total`,
     `nominal_terbayar`, `status` — TIDAK match app code (rules akan reject
     create baru kalau rules ketat).
   - Akibat: tagihan dari TagihanView tanpa `status` tidak akan deteksi sbg
     tunggakan saat POS open santri.

3. **Type `santri_id`/`guru_id`: rules `is number`, app kirim string** —
   - Rules: `keuangan_tagihan.santri_id is number`,
     `keuangan_tabungan_santri.santri_id is number`,
     `keuangan_gaji.guru_id is number`.
   - App: `setDoc({ santri_id: modalSantriId.value })` = string.
   - Akibat: create kemungkinan tertolak rules untuk id santri non-numeric;
     query `where('santri_id','==',string)` miss.
   - Sudah di-mitigasi di RiwayatSantriView via filter client-side string-tolerant.

4. **`keuangan_transaksi` dead code** — koleksi dideklarasikan di rules
   (immutable, no_struk, items list) tapi app tidak pernah menulis ke sini.
   `useKeuangan.js` masih subscribe — boros traffic.

### MED

5. **Tabungan modal `kategori` reuse `keuTagihanJenis`** — list "Syahriyah, SPP,
   Kebersihan" muncul saat input mutasi tabungan, padahal POS sengaja
   exclude 'tabungan' dari preset. Confusing.

6. **Bulk Generate Bisyaroh kehilangan `bonus_kehadiran`** — slip dari bulk
   tidak punya snapshot bonus; saat edit, take_home tidak match dgn manual mode.

7. **Saldo BukuInduk vs LaporanKeuangan beda definisi** —
   - BukuInduk: hanya dari `keuangan_buku_induk` exclude tabungan
   - Laporan: pemasukan = `keuangan_pembayaran` + setor tabungan; pengeluaran =
     bisyaroh take_home + tarik tabungan
   - Tabungan ikut di Laporan padahal di BukuInduk excluded.

8. **`isNgaji`/`isSekolah` deteksi inkonsisten di Bisyaroh** — label
   `guruTipeLabel` cek `!g.is_sekolah`, filter `filteredGuru` tidak cek itu.
   Bisa salah klasifikasi guru pegawai_guru.

9. **`Generate Bulan Ini` (Syahriyah)** panggil `window.autoGenerateSyahriyahManual`
   yg tidak ada di Vue → tombol tidak fungsional.

10. **HutangPiutangView no super_admin gating** — semua admin bisa edit/hapus.

### LOW

11. **`createdAt` vs `created_at`** — POS pakai `createdAt`, Tagihan pakai
    `created_at`. Inkonsisten naming.

12. **`master_tunjangan`/`master_potongan` idle** — settings ada tapi tidak
    di-apply ke slip Bisyaroh (`tunjangan_list`/`potongan_list` selalu kosong).

13. **Datalist autocomplete TabunganView** — match exact lowercase nama;
    nama duplikat ambil yg pertama silent.

14. **RiwayatPos delete tidak revert tagihan** — UX warning ada di confirm,
    tapi tidak ada undo flow. Bisa orphan-kan tagihan.

15. **Bulk delete tanpa audit log** — super_admin hapus banyak record tanpa
    trace. Koleksi `audit_log` ada di rules tapi tidak dipakai.

## 💡 Saran fix prioritas

**Quick win** (tidak butuh migrasi data):
- Fix #1: PembayaranView baca `keuangan_buku_induk` filter santri_id+sumber=pos_santri.
- Fix #3: Relax rules `santri_id is number` → `santri_id is string` (data ada
  yang sudah string).
- Fix #9: Hapus tombol Generate Bulan Ini atau implement di Vue.
- Fix #11: Pilih `createdAt` global, sweep.

**Refactor sedang**:
- Fix #2: Standardize schema tagihan ke {kategori, nominal, bayar, status}
  (selaras app); update rules.
- Fix #4: Hapus subscribe `keuangan_transaksi`.
- Fix #5: Buat setting kategori tabungan terpisah.
- Fix #6: Bulk Generate Bisyaroh include bonus_kehadiran snapshot.

**Improvement**:
- Fix #7: Unify Buku Induk sbg SSOT keuangan.
- Fix #15: Tulis audit_log untuk delete bulk.
- Fix #10: Gating HutangPiutang.

Lihat detail tiap issue di laporan ini + file path/line yang relevan.
