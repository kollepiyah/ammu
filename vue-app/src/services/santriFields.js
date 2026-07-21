// santriFields.js — v.111: SUMBER TUNGGAL definisi kolom impor/ekspor SANTRI.
//
// Template unduh, kolom ekspor LENGKAP, dan parser impor Excel semuanya
// diturunkan dari SANTRI_FIELDS di bawah. Nambah field master cukup 1 entri di
// array ini → otomatis muncul di ketiga tempat (template + ekspor + impor),
// tak perlu lagi mengubah SantriView di tiga titik terpisah (dulu sumber bug
// "kolom baru lupa dimasukkan template", mis. Gedung & PJ PTPT).
//
// Dipakai oleh: SantriView.vue (downloadTemplateSantri / exportExcel / onImportSantri).
import { toTitleCase, parseMultipleWA } from '@/utils/format'
import { canonLembaga } from '@/composables/useLembaga'
import { usiaKini } from '@/utils/usia'

const _s = (v) => String(v ?? '').trim()

// ---- parser pure (perilaku IDENTIK dgn versi lama SantriView) --------------
export function parseTglDDMMYYYY(v) {
  if (!v) return ''
  // Guard bug epoch Excel — sel tanggal KOSONG sering terbaca SheetJS sebagai
  // Date/serial 0 = 1899-12-30. Tahun < 1901 = mustahil utk data santri.
  if (v instanceof Date) {
    if (isNaN(v.getTime()) || v.getFullYear() < 1901) return ''
    return v.toISOString().slice(0, 10)
  }
  const s = String(v).trim()
  if (!s) return ''
  const m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/)
  if (m) {
    if (Number(m[3]) < 1901) return ''
    return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  }
  if (s.slice(0, 10) === '1899-12-30' || s.slice(0, 10) === '1900-01-00') return ''
  return s
}

export function parseBool(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '')
    .toLowerCase()
    .trim()
  return ['true', 'ya', 'y', '1', 'aktif', 'mukim', 'fullday'].includes(s)
}

// Khusus aktif — default TRUE kalau ambigu/kosong.
export function parseAktif(v) {
  if (v === true) return true
  if (v === false) return false
  const s = String(v || '')
    .toLowerCase()
    .trim()
  const NEG = [
    'false',
    'tidak',
    'no',
    'n',
    '0',
    'tidak aktif',
    'non-aktif',
    'nonaktif',
    'keluar',
    'non aktif'
  ]
  return !NEG.includes(s)
}

// ---- registry field --------------------------------------------------------
// Tiap entri:
//   header     : label kolom (template + ekspor + kunci utama pick impor)
//   aliases    : header alternatif yg diterima saat impor
//   width      : lebar kolom ekspor (default dari panjang header)
//   tpl        : sertakan di template unduh (default true)
//   exp        : (s, i) => nilai sel ekspor dari objek santri
//   imp        : (data, val) => tulis hasil parse ke objek `data` payload impor
//   manual     : true → impor ditangani KHUSUS di view (butuh konteks
//                hasNoIndukCol / dipakai utk matching); loop generik skip.
//                Tetap muncul di template & ekspor.
//   exportOnly : true → hanya kolom ekspor (No urut, Usia auto); tak diimpor.
export const SANTRI_FIELDS = [
  { header: 'No', width: 5, tpl: false, exportOnly: true, exp: (s, i) => i + 1 },
  { header: 'No. Induk', width: 12, manual: true, exp: (s) => s.nis || '' },
  { header: 'NIS', width: 12, manual: true, exp: (s) => s.nis_sekolah || '' },
  {
    header: 'NISN',
    width: 14,
    aliases: ['nisn'],
    exp: (s) => s.nisn || '',
    imp: (d, v) => {
      d.nisn = _s(v)
    }
  },
  {
    header: 'NIK',
    width: 18,
    aliases: ['nik'],
    exp: (s) => s.nik || '',
    imp: (d, v) => {
      d.nik = _s(v)
    }
  },
  { header: 'Nama Santri', width: 26, manual: true, exp: (s) => s.nama || '' },
  {
    header: 'Nama Panggilan',
    width: 14,
    aliases: ['nama_panggilan'],
    exp: (s) => s.nama_panggilan || '',
    imp: (d, v) => {
      d.nama_panggilan = toTitleCase(v)
    }
  },
  {
    header: 'L/P',
    width: 5,
    aliases: ['JK', 'Jenis Kelamin', 'jk'],
    exp: (s) => s.jk || '',
    imp: (d, v) => {
      d.jk = _s(v || 'L')
        .toUpperCase()
        .charAt(0)
    }
  },
  {
    header: 'Tempat Lahir',
    width: 14,
    aliases: ['tempat_lahir'],
    exp: (s) => s.tempat_lahir || '',
    imp: (d, v) => {
      d.tempat_lahir = toTitleCase(v)
    }
  },
  {
    header: 'Tgl Lahir (DD/MM/YYYY)',
    width: 14,
    aliases: ['Tgl Lahir', 'Tanggal Lahir', 'tgl_lahir'],
    exp: (s) => s.tgl_lahir || '',
    imp: (d, v) => {
      d.tgl_lahir = parseTglDDMMYYYY(v)
    }
  },
  {
    header: 'Usia (auto)',
    width: 10,
    tpl: false,
    exportOnly: true,
    exp: (s) => usiaKini(s.tgl_lahir)
  },
  {
    header: 'Tgl Masuk (DD/MM/YYYY)',
    width: 14,
    aliases: ['Tgl Masuk', 'Tanggal Masuk', 'tgl_masuk'],
    exp: (s) => s.tgl_masuk || '',
    imp: (d, v) => {
      d.tgl_masuk = parseTglDDMMYYYY(v)
    }
  },
  {
    header: 'No KK',
    width: 18,
    aliases: ['No. KK', 'no_kk'],
    exp: (s) => s.no_kk || '',
    imp: (d, v) => {
      d.no_kk = _s(v)
    }
  },
  { header: 'Nama Wali', width: 22, manual: true, exp: (s) => s.nama_wali || s.wali || '' },
  {
    header: 'No WA Wali',
    width: 16,
    aliases: ['No WA', 'WA Wali', 'WA', 'wa'],
    exp: (s) => s.wa || '',
    imp: (d, v) => {
      const w = parseMultipleWA(v)
      d.wa = w[0] || ''
      d.wa_2 = w[1] || ''
    }
  },
  { header: 'Lembaga Qiraati', width: 14, manual: true, exp: (s) => s.lembaga || '' },
  { header: 'Kelas Qiraati', width: 12, manual: true, exp: (s) => s.kelas || '' },
  {
    header: 'Juz (PTPT)',
    width: 8,
    aliases: ['Juz', 'juz'],
    exp: (s) => s.juz || '',
    imp: (d, v) => {
      d.juz = _s(v).toUpperCase()
    }
  },
  // v.111: penataan administrasi — Gedung (scope keuangan+akademik) & PJ PTPT
  {
    header: 'Gedung',
    width: 16,
    aliases: ['gedung'],
    exp: (s) => s.gedung || '',
    imp: (d, v) => {
      d.gedung = _s(v)
    }
  },
  {
    header: 'PJ PTPT',
    width: 18,
    aliases: ['PJ Ptpt', 'PJ_PTPT', 'pj_ptpt'],
    note: 'khusus lembaga PTPT',
    exp: (s) => s.pj_ptpt || '',
    imp: (d, v) => {
      d.pj_ptpt = _s(v)
    }
  },
  {
    header: 'Guru Pagi',
    width: 18,
    aliases: ['Guru Kelas Pagi', 'guru_pagi'],
    exp: (s) => s.guru_pagi || '',
    imp: (d, v) => {
      d.guru_pagi = toTitleCase(v)
    }
  },
  {
    header: 'Guru Sore',
    width: 18,
    aliases: ['Guru Kelas Sore', 'guru_sore'],
    exp: (s) => s.guru_sore || '',
    imp: (d, v) => {
      d.guru_sore = toTitleCase(v)
    }
  },
  {
    header: 'Lembaga Sekolah',
    width: 14,
    aliases: ['lembaga_sekolah'],
    exp: (s) => s.lembaga_sekolah || '',
    imp: (d, v) => {
      d.lembaga_sekolah = canonLembaga(v)
    }
  },
  {
    header: 'Kelas Sekolah',
    width: 12,
    aliases: ['kelas_sekolah'],
    exp: (s) => s.kelas_sekolah || '',
    imp: (d, v) => {
      d.kelas_sekolah = _s(v)
    }
  },
  {
    header: 'Guru Sekolah (pisah |)',
    width: 22,
    aliases: ['Guru Sekolah', 'guru_sekolah'],
    exp: (s) => (Array.isArray(s.guru_sekolah) ? s.guru_sekolah.join(' | ') : s.guru_sekolah || ''),
    imp: (d, v) => {
      d.guru_sekolah = _s(v)
        .split('|')
        .map((x) => x.trim())
        .filter(Boolean)
    }
  },
  {
    header: 'Asal Sekolah',
    width: 18,
    aliases: ['asal_sekolah'],
    exp: (s) => s.asal_sekolah || '',
    imp: (d, v) => {
      d.asal_sekolah = toTitleCase(v)
    }
  },
  // ortu — flat + nested (ayah/ibu) selaras form
  {
    header: 'Nama Ayah',
    width: 20,
    aliases: ['nama_ayah'],
    exp: (s) => s.nama_ayah || (s.ayah && s.ayah.nama) || '',
    imp: (d, v) => {
      const t = toTitleCase(v)
      d.nama_ayah = t
      ;(d.ayah ??= {}).nama = t
    }
  },
  {
    header: 'NIK Ayah',
    width: 18,
    aliases: ['nik_ayah'],
    exp: (s) => s.nik_ayah || (s.ayah && s.ayah.nik) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.nik_ayah = t
      ;(d.ayah ??= {}).nik = t
    }
  },
  {
    header: 'Pendidikan Ayah',
    width: 14,
    aliases: ['pendidikan_ayah'],
    exp: (s) => s.pendidikan_ayah || (s.ayah && s.ayah.pendidikan) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.pendidikan_ayah = t
      ;(d.ayah ??= {}).pendidikan = t
    }
  },
  {
    header: 'Pekerjaan Ayah',
    width: 14,
    aliases: ['pekerjaan_ayah'],
    exp: (s) => s.pekerjaan_ayah || (s.ayah && s.ayah.pekerjaan) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.pekerjaan_ayah = t
      ;(d.ayah ??= {}).pekerjaan = t
    }
  },
  {
    header: 'HP Ayah',
    width: 16,
    aliases: ['hp_ayah'],
    exp: (s) => s.hp_ayah || (s.ayah && s.ayah.telp) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.hp_ayah = t
      ;(d.ayah ??= {}).telp = t
    }
  },
  {
    header: 'Nama Ibu',
    width: 20,
    aliases: ['nama_ibu'],
    exp: (s) => s.nama_ibu || (s.ibu && s.ibu.nama) || '',
    imp: (d, v) => {
      const t = toTitleCase(v)
      d.nama_ibu = t
      ;(d.ibu ??= {}).nama = t
    }
  },
  {
    header: 'NIK Ibu',
    width: 18,
    aliases: ['nik_ibu'],
    exp: (s) => s.nik_ibu || (s.ibu && s.ibu.nik) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.nik_ibu = t
      ;(d.ibu ??= {}).nik = t
    }
  },
  {
    header: 'Pendidikan Ibu',
    width: 14,
    aliases: ['pendidikan_ibu'],
    exp: (s) => s.pendidikan_ibu || (s.ibu && s.ibu.pendidikan) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.pendidikan_ibu = t
      ;(d.ibu ??= {}).pendidikan = t
    }
  },
  {
    header: 'Pekerjaan Ibu',
    width: 14,
    aliases: ['pekerjaan_ibu'],
    exp: (s) => s.pekerjaan_ibu || (s.ibu && s.ibu.pekerjaan) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.pekerjaan_ibu = t
      ;(d.ibu ??= {}).pekerjaan = t
    }
  },
  {
    header: 'HP Ibu',
    width: 16,
    aliases: ['hp_ibu'],
    exp: (s) => s.hp_ibu || (s.ibu && s.ibu.telp) || '',
    imp: (d, v) => {
      const t = _s(v)
      d.hp_ibu = t
      ;(d.ibu ??= {}).telp = t
    }
  },
  {
    header: 'Penghasilan Ortu',
    width: 14,
    aliases: ['penghasilan_ortu'],
    exp: (s) => s.penghasilan_ortu || '',
    imp: (d, v) => {
      d.penghasilan_ortu = _s(v)
    }
  },
  {
    header: 'Alamat',
    width: 28,
    aliases: ['alamat'],
    exp: (s) => s.alamat || '',
    imp: (d, v) => {
      d.alamat = _s(v)
    }
  },
  {
    header: 'Dusun/Jalan',
    width: 16,
    aliases: ['Dusun', 'alamat_dusun'],
    exp: (s) => s.alamat_dusun || '',
    imp: (d, v) => {
      d.alamat_dusun = _s(v)
    }
  },
  {
    header: 'RT',
    width: 6,
    aliases: ['alamat_rt'],
    exp: (s) => s.alamat_rt || '',
    imp: (d, v) => {
      d.alamat_rt = _s(v)
    }
  },
  {
    header: 'RW',
    width: 6,
    aliases: ['alamat_rw'],
    exp: (s) => s.alamat_rw || '',
    imp: (d, v) => {
      d.alamat_rw = _s(v)
    }
  },
  {
    header: 'Desa',
    width: 14,
    aliases: ['Desa / Kelurahan', 'alamat_desa'],
    exp: (s) => s.alamat_desa || '',
    imp: (d, v) => {
      d.alamat_desa = _s(v)
    }
  },
  {
    header: 'Kecamatan',
    width: 14,
    aliases: ['alamat_kecamatan'],
    exp: (s) => s.alamat_kecamatan || '',
    imp: (d, v) => {
      d.alamat_kecamatan = _s(v)
    }
  },
  {
    header: 'Kabupaten',
    width: 14,
    aliases: ['alamat_kabupaten'],
    exp: (s) => s.alamat_kabupaten || '',
    imp: (d, v) => {
      d.alamat_kabupaten = _s(v)
    }
  },
  {
    header: 'Provinsi',
    width: 14,
    aliases: ['alamat_provinsi'],
    exp: (s) => s.alamat_provinsi || '',
    imp: (d, v) => {
      d.alamat_provinsi = _s(v)
    }
  },
  {
    header: 'Status Aktif (true/false)',
    width: 12,
    aliases: ['Status Aktif', 'Aktif', 'aktif'],
    exp: (s) => (s.aktif === false ? 'false' : 'true'),
    imp: (d, v) => {
      d.aktif = parseAktif(v)
    }
  },
  {
    header: 'Mukim (true/false)',
    width: 10,
    aliases: ['Mukim', "Ma'had", 'is_mukim'],
    exp: (s) => (s.is_mukim ? 'true' : 'false'),
    imp: (d, v) => {
      d.is_mukim = parseBool(v)
    }
  },
  {
    header: 'Fullday (true/false)',
    width: 10,
    aliases: ['Fullday', 'is_fullday'],
    exp: (s) => (s.is_fullday ? 'true' : 'false'),
    imp: (d, v) => {
      d.is_fullday = parseBool(v)
    }
  },
  {
    header: 'Catatan Riwayat Pribadi (Mukim)',
    width: 26,
    aliases: ['Catatan Riwayat Pribadi', 'catatan_riwayat_pribadi'],
    exp: (s) => s.catatan_riwayat_pribadi || '',
    imp: (d, v) => {
      d.catatan_riwayat_pribadi = _s(v)
    }
  },
  {
    header: 'Tgl Keluar (DD/MM/YYYY)',
    width: 14,
    aliases: ['Tgl Keluar', 'tgl_keluar'],
    exp: (s) => s.tgl_keluar || '',
    imp: (d, v) => {
      d.tgl_keluar = parseTglDDMMYYYY(v)
    }
  },
  {
    header: 'Alasan Keluar',
    width: 18,
    aliases: ['alasan_keluar'],
    exp: (s) => s.alasan_keluar || '',
    imp: (d, v) => {
      d.alasan_keluar = _s(v)
    }
  }
]

// ---- turunan (dipakai view) ------------------------------------------------
const _col = (f) => ({
  key: f.header,
  header: f.header,
  width: f.width || Math.max(12, f.header.length + 2)
})

/** Header baris-1 template unduh (tanpa No / Usia auto). */
export function santriTemplateColumns() {
  return SANTRI_FIELDS.filter((f) => f.tpl !== false).map((f) => ({
    key: f.header,
    header: f.header,
    width: Math.max(12, f.header.length + 2)
  }))
}

/** Definisi kolom ekspor LENGKAP (termasuk No urut + Usia auto). */
export function santriExportColumns() {
  return SANTRI_FIELDS.map(_col)
}

/** Objek 1 baris ekspor (key = header) dari objek santri + indeks (0-based). */
export function santriToExportRow(s, i) {
  const row = {}
  for (const f of SANTRI_FIELDS) row[f.header] = f.exp ? f.exp(s, i) : ''
  return row
}

/** Sel Excel dianggap KOSONG bila null/undefined/spasi saja. `false` dan `0`
 *  BUKAN kosong — itu nilai sungguhan (mis. "Status Aktif" diisi `false`). */
export function selKosong(v) {
  return v === null || v === undefined || String(v).trim() === ''
}

/**
 * Isi objek `data` payload impor dari 1 baris Excel `r`, memakai fungsi `pick`
 * milik view (alias + fallback lowercase). Field `manual`/`exportOnly` di-skip
 * (ditangani khusus di view: nis/nama/lembaga/kelas/wali).
 *
 * ATURAN GABUNG (keputusan Kyai 21 Jul 2026): sel KOSONG di file TIDAK menimpa
 * nilai lama — fieldnya dilewati sama sekali sehingga `mergeOne` mempertahankan
 * isi yang sudah ada. Sel TERISI tetap menimpa seperti biasa.
 *
 * Lahir dari bug nyata: impor file parsial menghapus kolom yang sudah terisi.
 * Dua file untuk santri yang sama — file A (guru ngaji terisi, guru sekolah
 * kosong) lalu file B (kebalikannya) — membuat file B menulis `guru_pagi: ''`
 * yang menimpa isi file A, karena `pick` mengembalikan '' untuk kolom yang tak
 * ada DAN `mergeOne` mengganti primitif. Akibatnya impor terakhir selalu
 * "memenangkan" kolom kosongnya.
 *
 * Efek samping yang disengaja: menghapus isi field lewat impor (mengosongkan
 * sel) TIDAK lagi bisa — kosongkan lewat form santri. Itu pertukaran yang
 * dipilih: kehilangan data diam-diam jauh lebih mahal daripada satu suntingan
 * manual.
 */
export function applyImportFields(data, r, pick) {
  for (const f of SANTRI_FIELDS) {
    if (f.manual || f.exportOnly || !f.imp) continue
    const v = pick(r, f.header, ...(f.aliases || []))
    if (selKosong(v)) continue
    f.imp(data, v)
  }
  return data
}
