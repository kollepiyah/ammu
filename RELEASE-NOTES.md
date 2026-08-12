# Catatan Rilis — Ammu Online

Berkas ini untuk **dibaca publik**: salin bagian versi yang dirilis ke badan rilis GitHub.
Rinciannya untuk pengembang ada di `CHANGELOG.md` — jangan disalin ke sana, terlalu teknis.

---

## v.1.3.5 — Agustus 2026

**Baru: Tes Sekolah**

- Menu **Tes Kenaikan** kini punya dua sisi: **Qiraati** dan **Sekolah**. Sisi Sekolah untuk
  materi sekolah yang perlu diuji **guru tertentu** — bukan kepala sekolah.
- **Wali kelas** mencentang santrinya lalu mengajukan sekaligus, sama seperti tab Ajukan
  Qiraati. **Guru penguji** yang ditunjuk menilai antreannya: nilai angka, lulus/belum, dan
  catatan.
- Hasilnya tampil di **Capaian Prestasi** santri dan di riwayat guru kelasnya. Nilai rapor
  sekolah tetap diinput wali kelas seperti biasa di luar aplikasi.
- Materi tesnya ditambah admin di **Master Data › Lembaga › Materi Tes**. Selama daftar itu
  masih kosong, sisi Sekolah belum bisa dipakai.

**Perbaikan**

- **Login Google di Android sekarang jalan.** Sebelumnya hanya bisa di web; di aplikasi
  Android halaman izin Google tak pernah bisa kembali ke aplikasi.
- Kalau akun Google belum ditautkan, layar login kini **menjelaskan sebabnya** — dulu diam
  saja dan seolah tidak terjadi apa-apa. Tombol **Tautkan Akun Google** di Profil juga
  diperbaiki.
- Tombol **"Kelola daftar shift"** di form data guru tak lagi melempar ke Beranda.
- **Tanggal kenaikan & mutasi tak lagi mundur sehari** bila diproses dini hari.
- **Pengaturan Keuangan lebih ringan dibuka**, terasa di HP kelas bawah.

**Cara memasang**

- **Android**: unduh `AmmuOnline.apk` di bawah, buka berkasnya, lalu pasang menimpa aplikasi
  yang ada.
- **Desktop**: jalankan `AmmuOnline-Setup-1.3.5.exe`. Windows 7 memakai berkas `Win7`.

### Catatan rilis Play Console (What's new) — 489/500 karakter

Salin PERSIS blok di bawah ke Play Console → Release → **What's new** (id-ID). Batas Play
500 karakter; teks di atas terlalu panjang untuk ditempel apa adanya. Tanpa "Tautkan
Google" & celah keamanan auth — dua-duanya tak berarti bagi pengguna awam.

```
Baru: Tes Sekolah

• Menu Tes Kenaikan kini punya dua sisi: Qiraati dan Sekolah.
• Wali kelas cukup mencentang santrinya lalu mengajukan sekaligus.
• Guru penguji memberi nilai, status lulus, dan catatan.
• Hasilnya muncul di Capaian Prestasi santri.

Perbaikan

• Login dengan Google kini berfungsi di Android.
• Tombol "Kelola daftar shift" tak lagi kembali ke Beranda.
• Tanggal kenaikan & mutasi tak lagi mundur sehari bila diproses dini hari.
• Pengaturan Keuangan lebih cepat dibuka.
```

---

## v.1.3.4 — Agustus 2026

**Keuangan**

- **Saringan "sekolah di lembaga pondok"** — menyasar santri ngaji yang **tidak** bersekolah
  di sini (atau sebaliknya), baik saat membuat Tagihan Khusus maupun sebagai setelan tetap
  pada Jenis Pembayaran. Jenis yang sudah ada tidak berubah.
- **Rapikan Tagihan Gabungan** (Pengaturan Keuangan → Tagihan). Menemukan tagihan ngaji yang
  nominalnya sudah termasuk di syahriyah sekolah/pondok tetapi masih tercatat _belum bayar_,
  lalu menghapusnya setelah diperiksa. Yang sudah ada pembayarannya tidak disentuh.
- **Generate Tagihan Khusus menampilkan pratinjau sasaran** — sebaran per lembaga, total
  rupiah, dan daftar nama — sebelum tagihan benar-benar terbit. Sesudah terbit, sasaran tidak
  bisa disunting.

**Cara memasang**

- **Android**: unduh `AmmuOnline.apk` di bawah, buka berkasnya, lalu pasang menimpa aplikasi
  yang ada.
- **Desktop**: jalankan `AmmuOnline-Setup-1.3.4.exe`. Windows 7 memakai berkas `Win7`.

---

## v.1.3.3 — Agustus 2026

**Bisyaroh**

- Kepala lembaga menerima bisyaroh pokok kepala saja di lembaga yang ia pimpin; jam
  mengajarnya tetap dibayar per JP. Bisyaroh ngaji tetap diterima seperti biasa.
- Simulasi Bisyaroh bisa diekspor ke PDF — rekap per jenis sekaligus rincian per orang.

**Keuangan**

- Simulasi Pemasukan Bulanan: perkiraan uang masuk sebulan dari jenis bulanan saja.
