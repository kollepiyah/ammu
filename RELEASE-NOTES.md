# Catatan Rilis — Ammu Online

Berkas ini untuk **dibaca publik**: salin bagian versi yang dirilis ke badan rilis GitHub.
Rinciannya untuk pengembang ada di `CHANGELOG.md` — jangan disalin ke sana, terlalu teknis.

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
