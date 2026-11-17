# Catatan Rilis Play Store — v.1.5.0 (versionCode 150)

Dibuat 18 Nov 2026 atas permintaan Kyai. Fitur baru disebut singkat saja; yang dijelaskan
perbaikan bug-nya.

> **Batas Google Play: 500 karakter** untuk kolom "Apa yang baru". Teks di bagian A sudah
> dihitung dan muat. Kalau diubah, hitung ulang — Play memotong diam-diam kalau lebih.

---

## A. Siap tempel ke Play Console ("Apa yang baru di versi ini")

```
Pondok Laju: jadwal piket, jurnal sekelas, bisyaroh per sesi. Kelas kini Master Data (Rombel).
Kartu & widget "Tugas Saya" di beranda.

Perbaikan:
• Absensi santri tampak "tersimpan" padahal belum
• Guru tercatat alpa padahal sudah scan (satu ID mesin dipakai dua guru)
• Rekap Unit menghitung alpa sebagai hadir
• Santri bisa naik tanpa lolos simakan PJ
• Nama bergelar/berpetik merusak penyaring, daftar & PDF
• Keluar di satu HP ikut mengeluarkan perangkat lain
```

---

## B. Versi panjang — untuk pengumuman ke guru (WhatsApp/grup), bukan untuk Play

**Ammu Online v.1.5.0**

**Yang baru**

- **Pondok Laju** — program santri PTPT dengan jam tambahan sesudah sekolah: jadwal piket
  (Tadarus Pagi / Laju 1 / Laju 2), jurnal bacaan yang diisi sekali untuk sekelas, rekap jurnal
  sebulan beserta ekspor PDF, dan bisyaroh dihitung per sesi yang dihadiri.
- **Rombel jadi Master Data Kelas** — kelas dibuat dulu, santrinya dicentang. Guru pasangan
  pagi–sore akhirnya saling melihat santrinya, dan mengganti guru sekelas cukup sekali.
- **Kartu "Tugas Saya" di beranda + widget layar utama Android** — piket, tes yang menunggu
  dinilai, dan jurnal yang belum diisi, tampil tanpa membuka menu satu per satu.
- **Prestasi & peringkat** — Top 10 santri, peringkat guru, isian prestasi sekali per kelas.
- **Tes & glondongan satu kelas** — ajukan dan nilai sekelas sekaligus.
- **Status santri lebih jelas** — Non-mukim, Fullday, Ma'had, Pondok Laju, lengkap dengan
  penyaringnya di Data Santri.
- **Hadir dihitung dari absen pulang** untuk guru sekolah.

**Perbaikan**

1. **Absensi santri mengaku "tersimpan" padahal tak menulis apa pun.** Saat daftar santri
   kosong, layar tetap menampilkan pesan berhasil — guru mengira absen sudah masuk, padahal
   tidak. Sekarang ditolak dengan sebabnya.
2. **Guru tercatat alpa padahal sudah menempel di mesin.** Bila satu ID mesin terpakai dua guru
   (termasuk guru nonaktif), scan ditolak diam-diam. Sekarang guru aktif yang menang, ID ganda
   ditandai, dan formulir menolak ID yang sudah dipakai guru aktif lain.
3. **Rekap Unit menghitung "alpa" sebagai hadir.** Angka rekap sempat lebih besar dari
   kenyataannya.
4. **Santri bisa naik tanpa lolos simakan PJ.** Gerbang PJ pada glondongan tak pernah mengunci
   sejak Juli — ajuan yang blok glondongannya belum selesai tetap bisa diteruskan.
5. **Nama bergelar atau berpetik merusak daftar.** Nama seperti "…, S.Pd., Gr." memuat koma dan
   "Ma'rifatin" memuat petik: penyaring Kelas-Guru bisa jadi kosong, nama tertulis
   "Siti Ma'Rifatin", dan PDF tak terkelompok. Data lama ikut dirapikan.
6. **Satu kelas tampil dua kali di penyaring** karena ejaan kelas berbeda ('1' dan 'Kelas 1'),
   sehingga memilih satu menyembunyikan santri ejaan lainnya.
7. **PDF Data Santri & Data Kelas** — kolom Juz muncul, daftar dikelompokkan per kelas, judul
   kelas rapi.
8. **Keluar di satu perangkat ikut mengeluarkan perangkat lain.** Sekarang keluar hanya berlaku
   di perangkat itu.
9. **Ekspor & penyaring PJ PTPT membawa kelas milik PJ lain.** PJ yang disetel per kelas kini
   yang menentukan.

---

## C. Pengingat sebelum menekan "Rilis"

- `versionCode` **150**, `versionName` **v.1.5.0** (sudah terpasang di
  `vue-app/android/app/build.gradle`).
- Web, migrasi, dan ketiga edge function **sudah tayang** sejak 17 Nov 2026.
- AAB dibuat dengan `npm run build:aab` (bukan `build:apk` — itu untuk tester/sideload).
- Uji di HP dulu sesudah dipasang: login, fingerprint, notifikasi, dan **widget "Tugas Saya"**
  (widget baru di rilis ini, belum pernah muncul di perangkat mana pun).
