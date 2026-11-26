// Judul singkat top bar (Kyai 26 Nov 2026): di Android/PWA top bar lengkap (nama aplikasi + foto
// profil) hanya di Beranda; halaman lain cukup ☰ · judul · cari, seperti NU Online. Satu peta
// untuk AppLayout & PublikLayout — fungsi murni + tes.

/** Halaman yang memakai top bar LENGKAP. */
const BERANDA = new Set(['/', '/umum', '/dashboard', '/beranda'])

// Awalan jalur → judul. Dicocokkan per segmen dari yang terpanjang, jadi '/pembayaran/kode/x'
// memakai '/pembayaran/kode' sebelum '/pembayaran'.
const JUDUL = {
  '/umum/channel': 'Channel',
  '/umum/kalender': 'Kalender',
  '/umum/pengaturan': 'Pengaturan',
  '/umum/tentang': 'Tentang',
  '/umum/sholat': 'Jadwal Sholat',
  '/umum/kiblat': 'Kiblat',
  '/umum/agenda': 'Agenda',
  '/umum/wirid': 'Wirid',
  '/ibadah/sholat': 'Jadwal Sholat',
  '/ibadah/kiblat': 'Kiblat',
  '/ibadah/wirid': 'Wirid',
  '/bantuan': 'Bantuan',
  '/laporan': 'Laporan',
  '/modul': 'Modul',
  '/profil': 'Pengaturan',
  '/notifikasi': 'Notifikasi',
  '/santri': 'Data Santri',
  '/guru': 'Guru & Pegawai',
  '/lembaga': 'Lembaga',
  '/master-data': 'Master Data',
  '/master-data/wirid': 'Edit Wirid',
  '/kelas': 'Kelas',
  '/rombel': 'Rombel',
  '/mapel-lembaga': 'Mapel',
  '/pengaturan-desktop': 'Pengaturan',
  '/mesin-absensi': 'Mesin Absensi',
  '/impor-kalender': 'Impor Kalender',
  '/master-form': 'Master Data',
  '/field-schema': 'Skema Kolom',
  '/keuangan': 'Keuangan',
  '/keuangan-desktop': 'Keuangan',
  '/tagihan': 'Tagihan',
  '/pembayaran': 'Pembayaran',
  '/pembayaran/kode': 'Kode Bayar',
  '/pembayaran-pending': 'Pembayaran Tertunda',
  '/pos-santri': 'POS Santri',
  '/pos-riwayat': 'Riwayat POS',
  '/riwayat-santri': 'Riwayat Santri',
  '/tabungan': 'Tabungan',
  '/uang-saku': 'Uang Saku',
  '/bisyaroh': 'Bisyaroh',
  '/rapor': 'Rapor',
  '/naik-kelas': 'Naik Kelas',
  '/tes-kenaikan': 'Tes Kenaikan',
  '/tes-sekolah': 'Tes Sekolah',
  '/glondongan': 'Glondongan',
  '/ceremonial': 'Ceremonial',
  '/pondok-laju': 'Pondok Laju',
  '/absensi-guru': 'Absensi Guru',
  '/absensi-santri': 'Absensi Santri',
  '/posts': 'Postingan',
  '/buku-induk': 'Buku Induk',
  '/uang-kegiatan': 'Uang Kegiatan',
  '/uang-buku': 'Uang Buku',
  '/tabungan-wajib': 'Tabungan Wajib',
  '/hutang-piutang': 'Hutang Piutang',
  '/laporan-keuangan': 'Laporan Keuangan',
  '/psb': 'PSB',
  '/kritik-saran': 'Kritik & Saran',
  '/pengaduan': 'Pengaduan',
  '/pengaturan-web': 'Pengaturan Sistem',
  '/keu-pengaturan': 'Pengaturan Keuangan',
  '/kegiatan-pesantren': 'Kegiatan',
  '/kalender': 'Kalender',
  '/statistik': 'Statistik',
  '/input-bulanan': 'Input Bulanan',
  '/rekap-prestasi': 'Rekap Prestasi',
  '/rekap-diniyah': 'Rekap Diniyah',
  '/impor-supabase': 'Impor Data',
  '/capaian-prestasi': 'Capaian Prestasi',
  '/personal': 'Personal',
  '/perizinan': 'Perizinan',
  '/supervisi': 'Supervisi'
}

/** true = Beranda (top bar lengkap). */
export function halamanBeranda(path) {
  const p = String(path || '/').replace(/\/+$/, '') || '/'
  return BERANDA.has(p)
}

/** Judul singkat untuk jalur; '' bila tak dikenal (pemanggil memakai nama aplikasi). */
export function judulHalaman(path) {
  const seg = String(path || '')
    .split('?')[0]
    .split('/')
    .filter(Boolean)
  for (let n = seg.length; n > 0; n--) {
    const j = JUDUL['/' + seg.slice(0, n).join('/')]
    if (j) return j
  }
  return ''
}
