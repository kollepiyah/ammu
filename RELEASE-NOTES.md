# Catatan Rilis — Ammu Online

Berkas ini untuk **dibaca publik**: salin bagian versi yang dirilis ke badan rilis GitHub.
Rinciannya untuk pengembang ada di `CHANGELOG.md` — jangan disalin ke sana, terlalu teknis.

---

## v.1.3.9 — September 2026

Penerbitan ulang aplikasi Android & Desktop agar membawa pembaruan v.1.3.8 di bawah.
**Tidak ada fitur atau perbaikan baru** — isinya sama persis dengan v.1.3.8.

---

## v.1.3.8 — September 2026

**Baru**

- **Papan peringkat prestasi mulai bersih tiap tanggal 25.** Angka prestasi santri PTPT & PPPH
  dikosongkan otomatis dari server setiap tanggal 25, supaya peringkat bulan baru tidak terbawa
  angka bulan lalu. **Riwayat bulanannya tetap ada** dan bisa dibuka kapan saja lewat pemilih
  bulan di Rekap Prestasi — angkanya diarsipkan lebih dulu, dan santri yang riwayatnya belum
  tersimpan sengaja TIDAK ikut dikosongkan.
- **Guru yang mengajar berpasangan tak lagi dipisah di daftar.** Satu kelas yang dipegang dua
  guru dulu muncul dua kali dengan daftar santri yang sama, sehingga jumlah "guru belum input"
  terlihat lebih banyak dari kenyataannya. Kini tampil satu baris, mis. *"Nur Faizah & Nur Fais
  Zalillah"*.
- **Pemeriksa riwayat bulanan (super admin).** Di menu Rekap Prestasi ada tombol **Periksa
  Riwayat Bulanan** — memeriksa santri mana yang angka prestasinya belum punya riwayat bulanan
  sendiri, jadi ketahuan lebih dulu apa yang akan hilang bila data santri dikosongkan. Hanya
  memeriksa; tak ada yang tersimpan sampai tombol Terapkan ditekan.
- **Daftar guru yang belum mengisi rekap bisa diekspor PDF.** Di halaman *Guru Belum Isi Rekap
  Prestasi* ada tombol **Ekspor PDF** — berkop pondok, lengkap dengan periode dan batas
  waktunya, berisi daftar guru beserta santri yang belum dinilai. Siap dibagikan lewat WA
  tanpa perlu menyalin nama satu per satu.
- **Jadwal Hari mengajar per guru.** Di **Data Guru › sunting guru**, di bawah "Shift Tugas",
  kini ada **Jadwal Hari**. Untuk guru yang tidak masuk penuh Senin–Sabtu, nyalakan
  **"Hari tertentu saja"** pada shift yang bersangkutan lalu matikan hari yang tidak diajar.
  Diatur **per shift**, jadi guru yang sekolahnya tiap hari sedangkan ngajinya hanya tiga hari
  bisa punya dua jadwal berbeda.

  Guru yang memang masuk tiap hari **tidak perlu disentuh sama sekali** — biarkan mati, dan
  tak ada satu angka pun miliknya yang berubah.

**Perbaikan**

- **Kartu "Guru Belum Input" di dasbor kini menagih bulan yang benar.** Dulu ia menagih bulan
  yang sedang berjalan, sehingga setiap tanggal 1 semua guru serentak muncul sebagai "belum
  input" untuk bulan yang memang belum waktunya diisi. Sekarang yang ditagih adalah **rekap
  bulan lalu** — sesuai cara pengisiannya — lengkap dengan **batas tanggal 5**, dan tulisannya
  berubah merah bila sudah lewat batas.
  Dua hal ikut dibetulkan: kartu itu kini **hanya menghitung PTPT & PPPH** (rekap prestasi
  bulanan memang hanya untuk keduanya, jadi guru TPQ Pagi/Sore & Pra PTPT tak lagi tertagih),
  dan guru yang mengisi lewat menu **Rekap Prestasi** akhirnya terbaca sudah mengisi —
  sebelumnya mereka tetap tercantum "belum input" selamanya karena menu itu tak meninggalkan
  penanda yang dicari kartu tersebut. Namanya juga diperjelas jadi
  **"Guru Belum Isi Rekap Prestasi"**.
  Jendela pengisiannya mengikuti kebiasaan yang berlaku: **mulai tanggal 29** bulan yang
  dinilai sampai **tanggal 5** bulan berikutnya — jadi tanggal 29–31 Agustus sudah terhitung
  mengisi Agustus, dan sepanjang September yang ditagih tetap Agustus.
- **Guru yang tidak mengajar setiap hari tak lagi menumpuk Alpa.** Sebelumnya "hari kerja"
  selalu berarti hari kerja lembaga, sehingga guru yang hanya masuk tiga hari sepekan tercatat
  alpa di hari yang memang bukan jadwalnya — sekitar 12 alpa palsu tiap bulan, di Rekap Unit,
  matriks bulanan, ekspor Excel/PDF, dan di kartu kehadirannya sendiri di menu Personal.
  Di matriks bulanan, hari yang bukan jadwal guru kini bertanda titik abu-abu (`·`), berbeda
  dari `L` yang berarti libur lembaga.
- **Bisyaroh guru paruh-waktu tak lagi terpotong.** Masalah yang sama diam-diam ikut memotong
  uang: JP per minggu dibagi ke seluruh hari sekolah, sehingga guru 12 JP yang masuk tiga hari
  hanya dibayar 6 JP — separuh. Bonus tepat waktu pun tak pernah cair, karena kehadirannya
  selalu diukur terhadap hari sekolah penuh sehingga ambang 100% mustahil tercapai.
  ⚠️ **Setelah Jadwal Hari diisi, slip guru paruh-waktu akan naik** — JP per minggu yang sudah
  diatur memang jumlah yang benar, yang keliru selama ini hanya pembaginya. Buka
  **Bisyaroh › Tinjau Dulu** sebelum Bulk Generate untuk melihat selisihnya.

Rilis ini juga membawa seluruh perbaikan **v.1.3.7** di bawah, yang belum sempat tayang.

---

## v.1.3.7 — Agustus 2026

**Perbaikan**

- **Guru yang mengajar di sekolah sekaligus mengaji tak lagi tercatat alpa saat sekolahnya
  libur.** Sebelumnya, kalau sekolah libur tapi ngaji tetap masuk, kolom sekolah guru itu
  tetap dihitung tidak hadir.
  ⚠️ Syaratnya liburnya ditandai untuk **Sekolah** di Kalender Kegiatan, dan shift sekolahnya
  sudah dikenali — lewat kolom **Lembaga Sekolah** di data guru, atau kolom **Khusus Lembaga**
  di Pengaturan › Master Shift.
- **Angka kehadiran di halaman Personal** kini dihitung dengan aturan yang sama persis dengan
  rekap Absensi Guru — dulu keduanya bisa berbeda.
- **Total pada ekspor Buku Induk hanya menghitung periode yang difilter.** Dulu laporan
  bulanan/tahunan memakai saldo kumulatif, jadi baris TOTAL bisa minus gara-gara transaksi
  di luar periode. Posisi kas kumulatifnya tidak hilang — ia turun jadi dua baris keterangan
  "SALDO KAS SEBELUM/SETELAH" di bawah TOTAL. Berlaku untuk PDF, Excel, dan Google Sheet.
- **Usia masuk santri** dihitung dari selisih tanggal lahir ke tanggal masuk. Sebelumnya
  santri yang masuk bulan Januari selalu berbunyi "0 bln".
- **Akun guru: daftar santri tak lagi kosong** di Input Nilai, Rekap Diniyah, dan Absensi
  Santri — termasuk untuk wali kelas sekolah dan kepala/PJ lembaga.
- **Rekap prestasi bulanan mulai kosong tiap bulan.** Sebelumnya membuka bulan baru langsung
  menampilkan angka bulan lalu sebagai isian — sekali disimpan, angka itu resmi jadi angka
  bulan ini. Angka bulan lalu kini tampil abu-abu sebagai petunjuk saja dan tidak ikut
  tersimpan. **Juz dan Kelas tidak ikut dikosongkan** (itu keadaan berjalan santri).
  ⚠️ Bulan-bulan lampau yang dulu belum tercatat per bulan akan tampak kosong di tabel;
  angkanya tidak hilang — tetap ada di data santri dan di submenu Riwayat.
- **Akun guru bisa menyimpan Input Bulanan.** Sesudah daftar santrinya muncul, sebagian guru —
  kepala/PJ lembaga, dan wali kelas dengan data lama — masih ditolak saat menekan Simpan.
  Izin di server kini disamakan dengan yang tampil di layar.

**Baru**

- **Impor Tunjangan/Potongan bulanan ditinjau dulu.** Tombolnya kini "Impor (tinjau dulu)":
  berkasnya dibaca dan dihitung lebih dahulu — tampil nominal per guru, take home hasilnya,
  dan baris yang namanya tak cocok — baru ditekan **Terapkan**.
  ⚠️ Perlu diketahui: **Bulk Generate menghapus penyesuaian bulanan hasil impor**, karena ia
  menghitung ulang dari Jenis Bisyaroh/Tunjangan/Potongan saja. Pratinjau kini
  memperingatkannya. Kalau slip di-generate ulang, impor kembali berkas bulanannya.
- **Pratinjau slip bisyaroh sebelum di-generate.** Di Bulk Generate ada tombol
  **"Tinjau Dulu"**: angka sungguhan bulan yang dipilih — bisyaroh, tunjangan, glondongan, dan
  **potongan** — lengkap dengan rincian per guru dan rekap potongan per jenis. Tidak ada slip
  yang tersimpan sampai tombol Generate ditekan. Yang perlu diperiksa ditandai sendiri: slip
  yang **sudah dicairkan**, potongan yang **menghabiskan** bisyaroh, guru yang **tak dapat
  apa-apa**, dan slip yang **nominalnya berubah** dari yang tersimpan.
- **Nilai glondongan bisa disimpan dulu.** Tombolnya kini dua: **Simpan** (nilai tersimpan,
  blok tetap ada di daftar tugas dan bisa dilanjutkan kapan saja) dan **Selesai** (nilai
  dikirim, blok ditutup, giliran blok berikutnya terbuka). Blok yang masih setengah jalan
  diberi tanda "Tersimpan, belum dikirim".
- **Nomor WA wali santri** kini tampil di kartu tugas guru penyimak glondongan, lengkap dengan
  tombol WhatsApp berisi pesan siap kirim — tak perlu lagi lewat guru kelas.
- **Jenis Potongan bisa disasarkan**, sama seperti Jenis Bisyaroh & Tunjangan: per jabatan,
  lembaga, shift, atau guru tertentu — tak perlu lagi mencentang orang satu per satu.
- **Penyaring laki-laki/perempuan** pada Jenis Bisyaroh, Tunjangan, dan Potongan, sehingga
  "Potongan Seragam Putri" cukup satu baris.
  ⚠️ Penyaring ini membaca kolom **JK** di data guru. Guru yang kolom itu masih kosong tidak
  akan terkena — sengaja, supaya tak ada uang terbit atau terpotong atas data yang tak ada.

**Cara memasang**

- **Android**: unduh `AmmuOnline.apk` di bawah, buka berkasnya, lalu pasang menimpa aplikasi
  yang ada.
- **Desktop**: jalankan `AmmuOnline-Setup-1.3.7.exe`. Windows 7 memakai berkas `Win7`.

### Catatan rilis Play Console (What's new) — 488/500 karakter

```
Perbaikan

• Rekap prestasi bulanan mulai kosong tiap bulan; angka bulan lalu hanya jadi petunjuk abu-abu.
• Guru yang mengajar di sekolah sekaligus mengaji tak lagi tercatat alpa saat sekolahnya libur.
• Akun guru: daftar santri tak lagi kosong dan sudah bisa disimpan di Input Nilai.
• Total ekspor Buku Induk hanya menghitung periode yang difilter.

Baru

• Pratinjau slip bisyaroh sebelum di-generate, lengkap potongannya.
• Nilai glondongan bisa disimpan dulu, lalu ditandai Selesai.
```

---

## v.1.3.6 — Agustus 2026

**Perbaikan**

- **Laporan Keuangan untuk admin yang dibatasi per gedung tak lagi selalu minus.**
  Pemasukannya sudah mengikuti gedung, tapi pengeluarannya diambil dari seluruh slip
  bisyaroh — yang memang dikelola pusat dan tak punya dimensi gedung. Pengeluaran kini
  dihitung dari baris KELUAR di Buku Kas gedung itu sendiri.
- **Grafik Arus Kas, Tagihan, dan Pembayaran** ikut mengikuti gedung admin — daftar santri,
  tagihan, transfer pending, dan riwayat pembayaran semuanya tersaring.
- **Laporan harian Buku Induk = setoran hari itu.** Saat satu tanggal dipilih, saldo mulai
  dari nol sehingga baris TOTAL cocok dengan uang yang benar-benar disetorkan.

**Cara memasang**

- **Android**: unduh `AmmuOnline.apk` di bawah, buka berkasnya, lalu pasang menimpa aplikasi
  yang ada.
- **Desktop**: jalankan `AmmuOnline-Setup-1.3.6.exe`. Windows 7 memakai berkas `Win7`.

⚠️ **Prasyarat:** scope gedung hanya hidup bila akun admin punya field **Gedung**
(Guru → "Gedung (scope Buku Kas)", khusus admin keuangan) **dan** santri punya field Gedung.
Bila kosong, pengguna melihat semua gedung.

### Catatan rilis Play Console (What's new) — 343/500 karakter

```
Perbaikan

• Laporan Keuangan untuk admin yang dibatasi per gedung tak lagi selalu minus; pengeluaran kini diambil dari Buku Kas gedungnya sendiri.
• Grafik Arus Kas, Tagihan, dan Pembayaran ikut mengikuti gedung admin.
• Laporan harian Buku Induk kini menampilkan setoran hari itu saja, sehingga baris Total cocok dengan uang yang disetorkan.
```

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
