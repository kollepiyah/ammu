# AUDIT CRUD Super Admin — v.104.0526

**Tanggal:** 12 Mei 2026
**Versi:** v.104.0526
**Auditor:** Otomatis via grep + manual review

---

## A. Fungsi `cekHakAkses(fitur)` — Hasil Audit

Function di `public/index.html` line ~13791. Super Admin = `sesiAktif.id === 'admin'` ATAU `sesiAktif.role_sistem === 'super_admin'`.

Status semua fitur untuk Super Admin:

| Fitur | Super Admin | Admin Terbatas | Guru | User |
|---|---|---|---|---|
| post_beranda | TRUE | TRUE | FALSE | FALSE |
| kelola_kegiatan | TRUE | TRUE | FALSE | FALSE |
| baca_kritik_saran | TRUE | TRUE | FALSE | FALSE |
| edit_tentang_kami | TRUE | TRUE | FALSE | FALSE |
| kirim_notifikasi | TRUE | TRUE | FALSE | FALSE |
| kelola_guru | TRUE | TRUE | FALSE | FALSE |
| kelola_santri | TRUE | TRUE | TRUE (role=guru) | FALSE |
| kelola_master | TRUE | TRUE | FALSE | FALSE |
| edit_pengaturan_web | TRUE | TRUE | FALSE | FALSE |
| post_profil_pesantren | TRUE | TRUE | FALSE | FALSE |
| reset_sandi_guru | TRUE | FALSE | FALSE | FALSE |
| akses_keuangan | TRUE | FALSE | FALSE | FALSE |
| edit_transaksi_keuangan | TRUE | FALSE | FALSE | FALSE |

Kesimpulan: Super Admin mendapat akses ke SEMUA fitur (no missing case). Logic `cekHakAkses` aman.

---

## B. Checklist Test Manual CRUD

User login sebagai Rahman Fanani (Super Admin, sesiAktif.id='admin'), hard refresh dulu sebelum test.

### B.1 Master Data — Santri

- [ ] Tambah santri baru (form di Data Santri admin)
- [ ] Edit santri existing (klik tombol Edit di list)
- [ ] Hapus santri (konfirmasi Swal muncul)
- [ ] Toggle aktif/non-aktif santri
- [ ] Import Excel santri (template + parser)
- [ ] Ekspor PDF/Excel data santri
- [ ] Reset sandi santri

### B.2 Master Data — Guru / Pegawai

- [ ] Tambah guru baru
- [ ] Edit guru existing
- [ ] Hapus guru
- [ ] Set tipe_pegawai (ngaji / sekolah / ngaji_sekolah)
- [ ] Set lembaga_sekolah untuk guru sekolah
- [ ] Reset sandi guru (Super Admin only)
- [ ] Import/Export data guru

### B.3 Master Data — Lembaga

- [ ] Tambah lembaga baru (Qiraati / Formal / Non Lembaga)
- [ ] Edit lembaga (nama, kelas list, kop, tipe)
- [ ] Hapus lembaga (konfirmasi double)
- [ ] Upload kop_logo lembaga ke Storage
- [ ] Submenu per lembaga work (Kelas/Jilid, Rapor, Rekap, Absen Bulanan, Pengaturan)

### B.4 Mutasi / Kenaikan Santri

- [ ] Buka modal Mutasi → form lengkap
- [ ] Field "Khotam Ke?" muncul kalau lembaga = Pra PTPT (v.103+)
- [ ] Simpan mutasi → `riwayat_kenaikan` tersimpan structured + `riwayat` legacy
- [ ] Tanggal khotam auto-fill di rapor setelah mutasi (v.103.3 fix)

### B.5 Rapor Semester

- [ ] Buka rapor lembaga (Diniyah / TPQ / Pra PTPT / PTPT / P3H)
- [ ] Pilih santri → form rapor terbuka
- [ ] Schema perKelas (Diniyah) render correct
- [ ] Schema perLevel (Pra PTPT, v.103) render correct
- [ ] Schema sections (TPQ) render correct
- [ ] Input nilai → save → Firestore tersimpan
- [ ] Edit schema lembaga via UI editor
- [ ] Cetak rapor PDF (TTD layout v.94, kop fix v.101, Catatan box v.103.1)

### B.6 Absen Bulanan (v.102)

- [ ] Submenu Absen Bulanan muncul di Qiraati + Formal lembaga
- [ ] Input bulanan per santri (Hadir/Sakit/Izin/Alpa)
- [ ] Save batch → Firestore collection `absensi_santri_sekolah_bulanan`
- [ ] Download template Excel
- [ ] Import Excel → load ke buffer
- [ ] Filter kelas valid (santri "salah lembaga" ter-skip, v.103.2)
- [ ] Auto-fill rapor dari aggregate bulanan (saat buka rapor)

### B.7 Keuangan — Buku Induk

- [ ] Akses menu Keuangan (super_admin only)
- [ ] Catat transaksi manual
- [ ] Edit transaksi (Super Admin only, dengan alasan audit)
- [ ] Hapus transaksi (sesuai rules: sumber in ['manual', 'gaji', 'pos_santri', 'tabungan_santri', 'tabungan_guru', 'hutang'])

### B.8 Keuangan — Bisyaroh (Gaji Guru)

- [ ] Input bisyaroh guru via datalist autocomplete
- [ ] Filter Tipe Pegawai (Semua / Ngaji / Sekolah / Keduanya) — v.104 fix: filter Sekolah cek `lembaga_sekolah` non-empty
- [ ] Preview slip
- [ ] Save bisyaroh
- [ ] Edit/Hapus slip bisyaroh existing
- [ ] Cetak slip + PDF
- [ ] Re-trigger datalist saat klik tombol filter

### B.9 Keuangan — Pembayaran (Tagihan Santri)

- [ ] Input pembayaran santri
- [ ] Riwayat pembayaran
- [ ] Cetak struk
- [ ] Push Notif pembayaran (kalau enabled)

### B.10 Tabungan Santri

- [ ] Setor / Tarik via modal mutasi
- [ ] Quick input (datalist autocomplete v.97)
- [ ] Riwayat per santri
- [ ] Cetak bukti tabungan
- [ ] Ekspor PDF all tabungan

### B.11 Hutang

- [ ] Tambah pinjaman
- [ ] Pembayaran cicilan
- [ ] Riwayat per kreditor

### B.12 Pengaturan Web

- [ ] Edit kop pesantren (line 1-4)
- [ ] Upload logo pesantren / Qiraati ke Storage
- [ ] Edit aturan predikat
- [ ] Edit schema rapor per lembaga (TPQ / Diniyah perKelas / Pra PTPT perLevel / PTPT / P3H)
- [ ] Edit warna tema
- [ ] Upload BG rapor TPQ / Diniyah

### B.13 Beranda / Profil Pesantren

- [ ] Post pengumuman beranda
- [ ] Edit profil pesantren (Tentang Kami)
- [ ] Kelola kegiatan
- [ ] Baca kritik & saran user

### B.14 Notifikasi

- [ ] Kirim notifikasi push ke role tertentu
- [ ] Schedule notifikasi

---

## C. Catatan untuk Patch Lanjutan

- **Belum diintegrasikan:** display detail breakdown `_rekapPraPTPTBulanan` di Rekap Prestasi Bulanan (saat ini cuma display total `"Xx"` + tooltip). Kalau user mau detail breakdown per khotam di UI utama, perlu patch tambahan.
- **Validasi unique khotam_ke per level per santri** belum ada (saat ini bisa input "Khotam I" ganda di level yang sama).
- **Migration data harian → bulanan** (`absensi_santri_sekolah` → `absensi_santri_sekolah_bulanan`): user bisa hapus data lama via `_hapusAbsenHarianLama()` di console F12 setelah verify migrasi sukses.
- **Editor schema Pra PTPT perLevel saved custom**: `getSchemaLembaga` sudah handle (kalau saved.perLevel === true → pakai saved, else force default). User bisa custom 5+ level via editor + save → persist.

---

## D. Bukti Audit (Grep Count)

| Pattern | Count |
|---|---|
| `cekHakAkses(` | 100 (sudah include semua call sites + definition) |
| `sesiAktif.role === 'admin'` | banyak (legacy check role lama) |
| `role_sistem === 'super_admin'` | dipakai di cekHakAkses & beberapa UI |
| `sesiAktif.id === 'admin'` | dipakai di cekHakAkses & validasi sesi |

Semua call site `cekHakAkses` mendapat hasil `TRUE` untuk Super Admin karena `cekHakAkses` itself selalu return true untuk Super Admin (case-by-case di switch statement).

---

## E. Action Items Setelah Audit

1. User test manual sesuai checklist B.1 - B.14
2. Kalau ada tombol/menu yang tidak bekerja untuk Super Admin (return error/permission denied), kasih tahu Claude untuk fix
3. Setelah semua pass, tutup audit ini sebagai "complete"
