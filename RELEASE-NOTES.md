# Catatan Rilis — Ammu Online

Berkas ini untuk **dibaca publik**: salin bagian versi yang dirilis ke badan rilis GitHub.
Rinciannya untuk pengembang ada di `CHANGELOG.md` — jangan disalin ke sana, terlalu teknis.

---

## v.1.4.3 — September 2026

**Perbaikan**

- **Penyaring dan kata pencarian tidak hilang lagi sesudah mengedit.** Di Data Santri dan
  Data Guru, memilih penyaring — atau mengetik nama — lalu menekan **Edit** dan **Simpan**
  dulu selalu mengembalikan daftar ke "tampil semua", sehingga nama yang sedang dikerjakan
  harus dicari ulang dari atas. Sekarang daftarnya kembali persis seperti sebelum diedit,
  termasuk penyaring **Gedung**, **PJ PTPT**, **Kelas-Guru**, dan sub-tab
  **Qiraati/Sekolah** yang sebelumnya memang tak pernah tersimpan sama sekali. Tombol
  **Kelola** juga ikut membawa penyaringnya, tidak lagi membuka daftar kosong.
- **Penyaring baru: Kelas / Jilid / Level** di Data Santri. Pilihannya mengikuti data yang
  memang ada — Jilid 1–6, "Level 3 Juz", kelas Romawi sekolah — dan menyempit sendiri
  mengikuti lembaga yang sedang dipilih.
- **Penyaring Kelas (nama guru) kini bisa dicentang lebih dari satu**, jadi kelas dari
  beberapa guru bisa ditampilkan sekaligus tanpa membuka-tutup penyaring berkali-kali.
- **Nomor versi di kaki layar tidak lagi tertinggal.** Kaki daftar Data Santri sempat
  menampilkan versi Mei 2026 karena nomornya diketik terpisah di tiap halaman; sekarang
  semua layar membaca satu sumber yang ikut naik sendiri tiap rilis.
- **Data tidak lagi diam-diam basi sesudah HP atau laptop ditinggal.** Sambungan langsung
  ke server memang terputus ketika perangkat tidur, berpindah WiFi, atau aplikasi lama
  berada di latar belakang — dan sebelumnya tak ada yang menyambungkannya kembali. Layar
  tetap tampak normal, tetapi isinya beku di keadaan terakhir: pembayaran yang baru masuk
  tak muncul, absensi yang baru disimpan operator lain tak kelihatan, dan satu-satunya obat
  adalah menutup lalu membuka aplikasi. Kini sambungannya dipasang ulang sendiri, dan data
  disegarkan begitu aplikasi dipakai lagi.

---

## v.1.4.2 — September 2026

**Baru**

- **Rekap Riwayat Izin per Orang.** Di halaman Personal, Kepala/PJ/admin kini punya kartu
  yang mengumpulkan seluruh pengajuan izin, sakit, dan cuti **dikelompokkan per guru** —
  lengkap dengan pencarian nama, penyaring tahun, dan hitungan hari yang sudah disetujui.
  Sebelumnya daftar persetujuan hanya memuat yang sedang menunggu, jadi begitu sebuah
  pengajuan diputus, riwayatnya lenyap dari layar.
- **Lampiran bisa dibuka ulang.** Surat dokter atau surat keterangan yang dilampirkan saat
  mengajukan kini tetap bisa dilihat kapan pun lewat rekap itu, bukan cuma sekali waktu
  hendak disetujui.

**Perbaikan**

- **Pengajuan Izin / Sakit / Cuti yang "selalu gagal" kini bisa dikirim.** Pegawai kantor —
  yang akunnya berperan *admin keuangan* — selalu ditolak begitu menekan **Kirim**, sejak
  menu perizinan itu ada. Sebabnya bukan isian yang salah melainkan hak akses yang
  tertinggal di basis data. Sekarang setiap pegawai yang punya shift boleh mengajukan, dan
  staf kantor juga benar-benar bisa ikut menyetujui — tombol Setujui/Tolak miliknya selama
  ini tampil tetapi tak pernah berfungsi.
- **Lampiran surat dokter bisa diunggah.** Melampirkan foto atau PDF pada pengajuan izin
  dulu selalu menggagalkan pengirimannya kecuali yang mengirim seorang admin. Lampiran
  lama tetap bisa dibuka seperti biasa.
- **Tanggapan atas Catatan Supervisi bisa dikirim.** Kotak tanggapan beserta tombol
  "Tandai Diproses" dan "Tandai Selesai" tampil untuk orang yang dicatat, tetapi setiap
  kali ditekan selalu gagal. Catatan dan penilaiannya sendiri tetap tak bisa diubah oleh
  yang bersangkutan — hanya tanggapan dan statusnya.
- **Pesan gagal tak lagi berbahasa mesin.** Kalimat seperti *"new row violates row-level
  security policy"* berganti menjadi keterangan yang bisa dibaca: apakah ini soal hak
  akses, sesi yang kedaluwarsa, atau sambungan internet yang putus — sehingga jelas apakah
  perlu lapor ke admin atau cukup dicoba lagi.
- **Izin yang dibatalkan sendiri tak lagi tertulis "Ditolak".** Guru yang menarik
  pengajuannya sendiri dulu melihat lencana merah "Ditolak" — seolah pimpinan yang
  menolaknya. Sekarang berbunyi **"Dibatalkan"** dengan warna netral. Pengajuan lama ikut
  terbaca benar; tak ada yang perlu diperbaiki manual.
- **Daftar "Sudah disetujui, absensinya belum terisi" bisa dibersihkan.** Ada nama yang
  menetap di sana walaupun absensinya sebenarnya sudah benar, dan tombol Terapkan tak
  pernah bisa mengeluarkannya. Kini baris seperti itu keluar sendiri sesudah diperiksa,
  dan tersedia tombol **Abaikan** untuk menutupnya tanpa mengubah absensi apa pun.

---

## v.1.4.1 — September 2026

**Perbaikan**

- **Bukti pembayaran transfer tak lagi tercetak "TUNAI".** Sebelumnya struk yang dicetak
  untuk kedua kalinya selalu berbunyi tunai walau uangnya masuk lewat transfer — begitu
  juga bukti setor/tarik Uang Saku dan Tabungan, serta kwitansi yang diunduh wali.
  Pembayaran lewat VA BMT bahkan tercatat tunai di seluruh aplikasi. Semuanya kini
  membaca cara bayar dari satu sumber yang sama dengan yang tampil di layar.

- **Riwayat dan Tagihan tak lagi bercerita dua hal berbeda.** Empat jalur yang membuat
  "sudah bayar tapi tagihannya tetap keluar" — dan sebaliknya — sudah ditutup. Untuk
  catatan lama yang terlanjur berselisih tersedia alat baru di **Pengaturan Keuangan ›
  Tagihan › "Cek Riwayat vs Tagihan"**: ia membandingkan rupiah per santri per bulan,
  memilah temuannya, dan membetulkan yang aman dibetulkan dengan sekali tekan.

- **Uang Saku & Tabungan akhirnya punya keterangan cara bayar** — di layar maupun di PDF
  laporan mutasi, lengkap dengan subtotal tunai dan transfer.

- **Shift yang belum dimulai tak lagi dihitung alpa.** Rekap absen pagi hari tak lagi
  menampilkan deretan A merah untuk shift sore yang belum sempat dijalani siapa pun —
  termasuk di kartu kehadiran yang dilihat guru sendiri.

- **Kelas PTPT kembali satu ejaan** (Kelas 1–6). Penyaring kelas di Rekap Prestasi ikut
  dibetulkan: memilih satu kelas tak lagi diam-diam membuang separuh daftarnya.

- **Nama guru tak lagi kosong di Rekap Prestasi**, dan kenaikan lewat Tes Kenaikan tak
  lagi meninggalkan guru lama menempel di santri yang sudah pindah kelas.

- **Angka dasbor dan Rekap Prestasi tak lagi bertengkar** — keduanya kini menunjuk bulan
  yang sama, dan angka yang belum tersimpan tak terbawa saat berganti bulan.

- **Pencarian di Data Santri dan Data Guru tak lagi hilang sesudah menyimpan.**

- **Tooltip grafik kini muncul di HP** (sebelumnya hanya bisa dilihat dari komputer), dan
  kelas PTPT tak lagi terbelah jadi dua batang di grafik maupun KPI dasbor.

- **Ekspor Rekap Prestasi dilengkapi**: tombol ekspor di tab Ranking, kop surat yang benar
  per lembaga, dan PDF yang bisa dipisah per PJ PTPT.

**Perubahan**

- **Bisyaroh kini dihitung dari absensi tanggal 25 bulan sebelumnya sampai tanggal 24
  bulan berjalan** — bukan lagi bulan kalender penuh. Slip terbit tanggal 1–2, sedangkan
  absensi bulan berjalan baru lengkap di akhir bulan; menutup buku tanggal 24 memberi
  jeda sekitar enam hari untuk merapikan absen sebelum uangnya dihitung. Hari 25 sampai
  akhir bulan tidak hilang — ia menjadi pembuka jendela bulan berikutnya. Rentang yang
  dipakai ditulis di slipnya, di layar maupun di kertas.

---

## v.1.4.0 — September 2026

**Perbaikan**

- **Rekap absen bulanan guru jauh lebih ringan.** Membuka halamannya dan membetulkan absen
  dengan klik tak lagi tersendat — paling terasa di HP dan PC yang lebih tua, dan di bulan
  yang gurunya banyak. Dua hal yang diperbaiki: tampilan matriksnya kini dirakit **sekali**
  lalu dipakai ulang (sebelumnya seluruh isi tabel dihitung ulang tiap kali dialog perbaikan
  dibuka atau ditutup), dan aplikasi kini hanya menarik **bulan yang sedang dilihat** dari
  server — sebelumnya seluruh riwayat absensi sejak awal ikut ditarik ulang setiap kali ada
  satu baris absen berubah, di semua perangkat yang sedang membuka halaman itu.

  Angka-angkanya **tidak berubah sama sekali** — huruf di setiap sel, kolom H/T/I-S-C/A,
  serta hasil ekspor Excel dan PDF tetap persis seperti sebelumnya; ini sudah dibandingkan
  satu per satu pada 6.300 kotak. Satu hal kecil yang memang dirapikan: titik oranye
  "belum absen pulang" tak lagi muncul di kotak hari **libur**, yang isinya memang sudah
  bertulis **L**.

**Berubah**

- **Pemberitahuan "pembaruan tersedia" di aplikasi Android dihentikan.** Sejak v.1.2.8
  aplikasi menawarkan unduh APK langsung supaya tak menunggu peninjauan Play Store. Mulai
  sekarang pembaruan **sepenuhnya lewat Google Play Store**, seperti aplikasi lain di ponsel:
  tak ada lagi dialog yang muncul sendiri saat aplikasi dibuka, dan tombol *Cek Pembaruan* di
  halaman Bantuan diganti tautan **Buka Play Store**.

  Alasannya bukan cuma menyederhanakan: APK yang diunduh di luar Play ditandatangani kunci
  yang berbeda, sehingga tidak bisa dipasang menimpa aplikasi yang sudah ada dari Play Store —
  dan itu baru ketahuan setelah berkasnya selesai diunduh.

  Ponsel yang masih memakai versi lama akan berhenti menampilkan tawaran itu dengan sendirinya
  setelah web diperbarui, tanpa perlu memasang apa pun lebih dulu.

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
