/* ============================================================
   Ammu Online — Desktop (Electron) redesign
   Data layer. Everything the ribbon + views render from.
   Exposed on window.AMMU
   ============================================================ */
window.AMMU = (function () {
  const LOGO = "https://ammuonline.web.app/logo.png";

  const user = {
    name: "Rahman Fanani",
    role: "ADMINISTRATOR",
    avatar:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Crect width='128' height='128' rx='28' fill='%230f766e'/%3E%3Ctext x='64' y='87' font-size='54' fill='white' text-anchor='middle' font-family='Segoe UI, sans-serif' font-weight='700'%3ERF%3C/text%3E%3C/svg%3E",
  };

  const stats = {
    totalGuru: 120,
    totalSantri: 2500,
    totalStaf: 45,
    // donut: program / kejuruan distribution
    donut: [
      { label: "Kejuruan", value: 38, color: "#0f766e" },
      { label: "S1", value: 24, color: "#f59e0b" },
      { label: "Wirausaha", value: 22, color: "#ef6c4d" },
      { label: "Tahfidz", value: 16, color: "#3b82f6" },
    ],
    // line: pendaftaran trend
    trend: [
      { year: "2021", value: 120 },
      { year: "2022", value: 165 },
      { year: "2023", value: 150 },
      { year: "2024", value: 205 },
      { year: "2025", value: 230 },
      { year: "2026", value: 248 },
    ],
  };

  const events = [
    { d: "17", mon: "JUN", title: "Tahun Baru Hijriyah 1448 H", date: "17 Jun 2026", tone: "teal" },
    { d: "17", mon: "AGT", title: "Hari Kemerdekaan RI", date: "17 Agt 2026", tone: "red" },
    { d: "05", mon: "SEP", title: "Maulid Nabi Muhammad ﷺ", date: "05 Sep 2026", tone: "amber" },
    { d: "15", mon: "DES", title: "Ujian Akhir Semester", date: "15–20 Des 2026", tone: "blue" },
    { d: "20", mon: "DES", title: "Pembagian Rapor Ganjil", date: "20 Des 2026", tone: "teal" },
  ];

  const posts = [
    {
      title: "Tes",
      kind: "post",
      excerpt: "Postingan uji coba kanal Al Manshur.",
      author: "Rahman Fanani",
      date: "8 Juni 2026, 12.44",
      thumb: "#0f766e",
    },
    {
      title: "Dokumentasi Penyembelihan Hewan Qurban Hari ke-1",
      kind: "photo",
      excerpt: "Galeri kegiatan Idul Adha 1447 H di lingkungan pesantren.",
      author: "Rahman Fanani",
      date: "8 Juni 2026, 12.40",
      thumb: "#b45309",
    },
    {
      title: "Dokumentasi Ziarah Wali Songo",
      kind: "photo",
      excerpt: "Perjalanan ziarah santri kelas akhir ke makam Wali Songo.",
      author: "Rahman Fanani",
      date: "8 Juni 2026, 09.10",
      thumb: "#0e7490",
    },
    {
      title: "Seminar Pendidikan Agama Islam",
      kind: "audio",
      excerpt: "Rekaman seminar bersama Ustadz tamu, tema akhlak digital.",
      author: "Rahman Fanani",
      date: "7 Juni 2026, 16.00",
      thumb: "#7c3aed",
    },
    {
      title: "Kajian Kitab Kuning Mingguan",
      kind: "book",
      excerpt: "Materi kajian rutin Ahad pagi, kitab Ta'lim Muta'allim.",
      author: "Rahman Fanani",
      date: "7 Agt 2026, 06.30",
      thumb: "#15803d",
    },
    {
      title: "Pengumuman Jadwal Ujian",
      kind: "doc",
      excerpt: "Jadwal resmi Ujian Akhir Semester Ganjil tahun ajaran berjalan.",
      author: "Tata Usaha",
      date: "6 Juni 2026, 10.00",
      thumb: "#475569",
    },
  ];

  const santri = [
    { nis: "24.0312", nama: "Ahmad Fauzan", kelas: "XII IPA", program: "Tahfidz", asrama: "Al-Ghazali", status: "Aktif" },
    { nis: "24.0287", nama: "Bilal Ramadhan", kelas: "XI TKJ", program: "Kejuruan", asrama: "Ibnu Sina", status: "Aktif" },
    { nis: "23.0190", nama: "Hanif Maulana", kelas: "XII IPS", program: "S1 Persiapan", asrama: "Al-Farabi", status: "Aktif" },
    { nis: "24.0341", nama: "Ridho Pratama", kelas: "X MM", program: "Kejuruan", asrama: "Ibnu Sina", status: "Izin" },
    { nis: "22.0118", nama: "Yusuf Abdullah", kelas: "XII IPA", program: "Tahfidz", asrama: "Al-Ghazali", status: "Aktif" },
    { nis: "24.0356", nama: "Zaki Mubarak", kelas: "XI IPS", program: "Wirausaha", asrama: "Al-Farabi", status: "Aktif" },
    { nis: "23.0204", nama: "Faris Hidayat", kelas: "XII TKJ", program: "Kejuruan", asrama: "Ibnu Sina", status: "Sakit" },
    { nis: "24.0299", nama: "Naufal Akbar", kelas: "X IPA", program: "Tahfidz", asrama: "Al-Ghazali", status: "Aktif" },
  ];

  const supervisi = [
    { tgl: "03 Jun 2026", guru: "Ust. Imron Rosyadi", mapel: "Nahwu", kelas: "XI TKJ", nilai: "A", catatan: "Pengelolaan kelas sangat baik" },
    { tgl: "04 Jun 2026", guru: "Ust. Salman Alfa", mapel: "Fiqih", kelas: "XII IPA", nilai: "A-", catatan: "Perlu variasi metode" },
    { tgl: "05 Jun 2026", guru: "Usth. Laila N.", mapel: "Bahasa Arab", kelas: "X MM", nilai: "B+", catatan: "Tingkatkan media ajar" },
    { tgl: "06 Jun 2026", guru: "Ust. Hadi P.", mapel: "Matematika", kelas: "XI IPS", nilai: "A", catatan: "Sesuai RPP" },
    { tgl: "07 Jun 2026", guru: "Ust. Daffa R.", mapel: "TKJ Praktik", kelas: "XII TKJ", nilai: "A", catatan: "Lab tertata, siswa aktif" },
  ];

  const education = {
    kpi: [
      { icon: "users", value: "431", label: "Total Santri" },
      { icon: "user", value: "30", label: "Total Guru/Pegawai" },
      { icon: "mosque", value: "8", label: "Lembaga Aktif" },
      { icon: "grid", value: "2", label: "Kelas Total" },
    ],
    lembaga: [
      { nama: "TPQ PAGI", kelas: 0, santri: 43, guru: 8 },
      { nama: "TPQ SORE", kelas: 0, santri: 10, guru: 3 },
      { nama: "PRA PTPT", kelas: 0, santri: 187, guru: 7 },
      { nama: "PTPT", kelas: 2, santri: 185, guru: 6 },
      { nama: "PPPH", kelas: 0, santri: 6, guru: 0 },
      { nama: "TK", kelas: 0, santri: 58, guru: 3 },
      { nama: "SDI", kelas: 0, santri: 193, guru: 6 },
      { nama: "PKBM", kelas: 0, santri: 74, guru: 0 },
    ],
  };

  const finance = {
    // sample figures so the redesign charts read as a live dashboard
    summary: [
      { icon: "file", label: "Tagihan Aktif", count: "128", value: "Rp 96 jt", tone: "red" },
      { icon: "save", label: "Tabungan Santri", count: "431", value: "Rp 214 jt", tone: "teal" },
      { icon: "doc", label: "Slip Bisyaroh", count: "30", value: "Rp 42 jt", tone: "blue" },
      { icon: "book", label: "Buku Induk", count: "431", value: "entri", tone: "amber" },
    ],
    months: ["Jul'25", "Agu'25", "Sep'25", "Okt'25", "Nov'25", "Des'25", "Jan'26", "Feb'26", "Mar'26", "Apr'26", "Mei'26", "Jun'26"],
    pemasukan: [310, 295, 330, 340, 360, 355, 348, 372, 380, 365, 395, 412],
    pengeluaran: [270, 285, 260, 300, 290, 310, 295, 288, 312, 300, 296, 287],
    transaksi: [
      { tgl: "08 Jun 2026", ket: "Pembayaran SPP — Ahmad Fauzan (XII IPA)", jenis: "Masuk", nominal: "Rp 350.000" },
      { tgl: "07 Jun 2026", ket: "Bisyaroh Guru — Periode Juni", jenis: "Keluar", nominal: "Rp 12.400.000" },
      { tgl: "07 Jun 2026", ket: "Setoran Tabungan Santri — Kelas XI", jenis: "Masuk", nominal: "Rp 1.250.000" },
      { tgl: "06 Jun 2026", ket: "Pembelian ATK & Operasional", jenis: "Keluar", nominal: "Rp 2.150.000" },
      { tgl: "06 Jun 2026", ket: "Pembayaran SPP — Kolektif Kelas XII", jenis: "Masuk", nominal: "Rp 8.400.000" },
      { tgl: "05 Jun 2026", ket: "Pemeliharaan Sarana Asrama", jenis: "Keluar", nominal: "Rp 3.700.000" },
    ],
  };

  // ---- Ribbon definition -------------------------------------------------
  // item.type: large | small | clock | greeting | toggle
  // item.view: which content view to open when clicked
  const tabs = [
    {
      id: "home",
      name: "Home",
      groups: [
        {
          label: "Postingan",
          items: [
            { type: "large", icon: "edit", label: "Buat\nPostingan", view: "buat", accent: true },
            { type: "large", icon: "broadcast", label: "Kelola\nSaluran", view: "saluran" },
          ],
        },
        { label: "Waktu & Kalender", items: [{ type: "clock" }] },
        {
          label: "Akses Akademik",
          items: [
            { type: "large", icon: "chart-pie", label: "Dasbor\nStatistik", view: "statistik" },
            { type: "large", icon: "calendar", label: "Kalender\nKegiatan", view: "kalender" },
            { type: "small", icon: "user", label: "Profil Saya", view: "personal" },
            { type: "small", icon: "clipboard", label: "Data Supervisi", view: "supervisi" },
            { type: "small", icon: "users", label: "Data Santri", view: "santri" },
          ],
        },
        {
          label: "Tampilan",
          items: [
            { type: "toggle", icon: "theme", label: "Tema", action: "theme" },
            { type: "toggle", icon: "ribbon", label: "Ribbon", action: "ribbon" },
            { type: "small", icon: "refresh", label: "Muat Ulang", action: "refresh" },
          ],
        },
        { label: "Profil & Data", items: [{ type: "greeting" }] },
      ],
    },
    {
      id: "pendidikan",
      name: "Pendidikan",
      groups: [
        {
          label: "Data Induk",
          items: [
            { type: "large", icon: "users", label: "Data\nSantri", view: "santri", accent: true },
            { type: "large", icon: "user", label: "Data\nGuru", view: "placeholder:Data Guru" },
            { type: "small", icon: "user", label: "Data Staf", view: "placeholder:Data Staf" },
            { type: "small", icon: "shield", label: "Asrama", view: "placeholder:Data Asrama" },
          ],
        },
        {
          label: "Akademik",
          items: [
            { type: "large", icon: "book", label: "Kelas &\nMapel", view: "placeholder:Kelas & Mata Pelajaran" },
            { type: "small", icon: "calendar", label: "Jadwal Pelajaran", view: "placeholder:Jadwal Pelajaran" },
            { type: "small", icon: "trophy", label: "Nilai / Rapor", view: "placeholder:Nilai & Rapor" },
            { type: "small", icon: "check", label: "Absensi", view: "placeholder:Absensi Santri" },
          ],
        },
        {
          label: "Kalender",
          items: [
            { type: "large", icon: "calendar-days", label: "Kalender\nPendidikan", view: "kalender" },
            { type: "small", icon: "calendar", label: "Tahun Ajaran", view: "placeholder:Tahun Ajaran" },
            { type: "small", icon: "clock", label: "Semester", view: "placeholder:Pengaturan Semester" },
          ],
        },
        {
          label: "Laporan",
          items: [
            { type: "large", icon: "printer", label: "Cetak\nRapor", view: "placeholder:Cetak Rapor" },
            { type: "small", icon: "chart-line", label: "Rekap Nilai", view: "statistik" },
            { type: "small", icon: "download", label: "Ekspor Data", view: "placeholder:Ekspor Data" },
          ],
        },
      ],
    },
    {
      id: "keuangan",
      name: "Keuangan",
      groups: [
        {
          label: "Tagihan & SPP",
          items: [
            { type: "large", icon: "file", label: "Tagihan\nAktif", view: "keuangan", accent: true },
            { type: "large", icon: "edit", label: "Buat\nTagihan", view: "placeholder:Buat Tagihan" },
            { type: "small", icon: "download", label: "Pembayaran SPP", view: "keuangan" },
            { type: "small", icon: "bell", label: "Tunggakan", view: "placeholder:Tunggakan SPP" },
          ],
        },
        {
          label: "Tabungan",
          items: [
            { type: "large", icon: "save", label: "Tabungan\nSantri", view: "keuangan" },
            { type: "small", icon: "download", label: "Setoran", view: "placeholder:Setoran Tabungan" },
            { type: "small", icon: "send", label: "Penarikan", view: "placeholder:Penarikan Tabungan" },
            { type: "small", icon: "refresh", label: "Mutasi", view: "placeholder:Mutasi Tabungan" },
          ],
        },
        {
          label: "Bisyaroh",
          items: [
            { type: "large", icon: "doc", label: "Slip\nBisyaroh", view: "keuangan" },
            { type: "small", icon: "user", label: "Honor Guru", view: "placeholder:Honor Guru" },
            { type: "small", icon: "printer", label: "Cetak Slip", view: "placeholder:Cetak Slip Bisyaroh" },
          ],
        },
        {
          label: "Buku & Laporan",
          items: [
            { type: "large", icon: "book", label: "Buku\nInduk", view: "keuangan" },
            { type: "small", icon: "chart-line", label: "Laporan Keuangan", view: "keuangan" },
            { type: "small", icon: "download", label: "Pemasukan", view: "keuangan" },
            { type: "small", icon: "send", label: "Pengeluaran", view: "keuangan" },
          ],
        },
      ],
    },
    {
      id: "saluran",
      name: "Saluran",
      groups: [
        {
          label: "Postingan",
          items: [
            { type: "large", icon: "edit", label: "Buat\nPostingan", view: "buat", accent: true },
            { type: "large", icon: "broadcast", label: "Kelola\nSaluran", view: "saluran" },
          ],
        },
        {
          label: "Jenis Konten",
          items: [
            { type: "small", icon: "megaphone", label: "Pengumuman", view: "buat" },
            { type: "small", icon: "image", label: "Dokumentasi", view: "buat" },
            { type: "small", icon: "book", label: "Kajian", view: "buat" },
            { type: "small", icon: "file", label: "Dokumen", view: "buat" },
          ],
        },
        {
          label: "Kanal",
          items: [
            { type: "large", icon: "broadcast", label: "Al Manshur\nChannel", view: "saluran" },
            { type: "small", icon: "archive", label: "Arsip", view: "placeholder:Arsip Saluran" },
            { type: "small", icon: "users", label: "Anggota", view: "placeholder:Anggota Saluran" },
          ],
        },
        {
          label: "Moderasi",
          items: [
            { type: "small", icon: "comment", label: "Komentar", view: "placeholder:Moderasi Komentar" },
            { type: "small", icon: "bell", label: "Laporan", view: "placeholder:Laporan Konten" },
            { type: "small", icon: "shield", label: "Izin Posting", view: "placeholder:Hak Akses Posting" },
          ],
        },
      ],
    },
    {
      id: "personal",
      name: "Personal",
      groups: [
        {
          label: "Akun",
          items: [
            { type: "large", icon: "user", label: "Profil\nSaya", view: "personal", accent: true },
            { type: "small", icon: "lock", label: "Ganti Sandi", view: "placeholder:Ganti Kata Sandi" },
            { type: "small", icon: "shield", label: "Keamanan", view: "placeholder:Keamanan Akun" },
          ],
        },
        {
          label: "Aktivitas",
          items: [
            { type: "large", icon: "bell", label: "Notifikasi", view: "placeholder:Notifikasi" },
            { type: "small", icon: "comment", label: "Pesan", view: "placeholder:Kotak Pesan" },
            { type: "small", icon: "check", label: "Tugas Saya", view: "placeholder:Tugas Saya" },
          ],
        },
        {
          label: "Preferensi",
          items: [
            { type: "toggle", icon: "theme", label: "Tema", action: "theme" },
            { type: "small", icon: "language", label: "Bahasa", view: "placeholder:Bahasa" },
            { type: "small", icon: "ribbon", label: "Tata Letak", action: "ribbon" },
          ],
        },
        {
          label: "Sesi",
          items: [{ type: "large", icon: "logout", label: "Keluar", view: "placeholder:Keluar dari Akun" }],
        },
      ],
    },
    {
      id: "supervisi",
      name: "Supervisi",
      groups: [
        {
          label: "Supervisi",
          items: [
            { type: "large", icon: "clipboard", label: "Data\nSupervisi", view: "supervisi", accent: true },
            { type: "large", icon: "edit", label: "Buat\nLaporan", view: "placeholder:Buat Laporan Supervisi" },
          ],
        },
        {
          label: "Evaluasi",
          items: [
            { type: "small", icon: "calendar", label: "Jadwal Supervisi", view: "placeholder:Jadwal Supervisi" },
            { type: "small", icon: "trophy", label: "Penilaian", view: "supervisi" },
            { type: "small", icon: "comment", label: "Catatan", view: "supervisi" },
          ],
        },
        {
          label: "Analitik",
          items: [
            { type: "large", icon: "chart-line", label: "Statistik\nSupervisi", view: "statistik" },
            { type: "small", icon: "chart-pie", label: "Distribusi", view: "statistik" },
            { type: "small", icon: "download", label: "Ekspor", view: "placeholder:Ekspor Supervisi" },
          ],
        },
      ],
    },
    {
      id: "bantuan",
      name: "Bantuan",
      groups: [
        {
          label: "Bantuan",
          items: [
            { type: "large", icon: "help", label: "Pusat\nBantuan", view: "bantuan", accent: true },
            { type: "large", icon: "book", label: "Panduan\nPengguna", view: "bantuan" },
          ],
        },
        {
          label: "Informasi",
          items: [
            { type: "small", icon: "info", label: "Tentang Aplikasi", view: "bantuan" },
            { type: "small", icon: "file", label: "Catatan Rilis", view: "bantuan" },
            { type: "small", icon: "shield", label: "Lisensi", view: "bantuan" },
          ],
        },
        {
          label: "Kontak",
          items: [
            { type: "large", icon: "comment", label: "Hubungi\nAdmin", view: "bantuan" },
            { type: "small", icon: "bell", label: "Lapor Bug", view: "bantuan" },
          ],
        },
        {
          label: "Pembaruan",
          items: [{ type: "large", icon: "refresh", label: "Cek\nPembaruan", view: "bantuan" }],
        },
      ],
    },
  ];

  const backstage = [
    { id: "beranda", icon: "home", label: "Beranda" },
    { id: "baru", icon: "plus", label: "Postingan Baru" },
    { id: "buka", icon: "folder", label: "Buka Arsip" },
    { id: "info", icon: "info", label: "Info" },
    { sep: true },
    { id: "akun", icon: "user", label: "Akun" },
    { id: "pengaturan", icon: "gear", label: "Pengaturan" },
    { id: "tentang", icon: "help", label: "Tentang" },
    { id: "keluar", icon: "logout", label: "Keluar" },
  ];

  return { LOGO, user, stats, education, finance, events, posts, santri, supervisi, tabs, backstage };
})();
