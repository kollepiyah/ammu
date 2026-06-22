// v.21.114.0528 — Libur Nasional Indonesia (fixed-date + Hijriyah-based approximations).
//
// Fixed-date holidays (sama tiap tahun)
// Hijriyah-based (Idul Fitri, Idul Adha, Tahun Baru Hijriyah, Maulid, Isra Mi'raj):
//   tanggal Masehi berubah tiap tahun. Untuk seed default, gunakan tanggal pemerintah RI
//   yang ditetapkan tiap tahun di SKB 3 Menteri. Karena ini berubah, default kita
//   include nama saja, admin bisa edit tanggalnya di Kalender Kegiatan.
//
// Output: array of { tgl_mulai, tgl_akhir, judul, deskripsi }
// Untuk dipakai di Kalender Kegiatan dengan tipe='libur_nasional'.

const FIXED_HOLIDAYS = [
  { md: '01-01', judul: 'Tahun Baru Masehi' },
  { md: '02-14', judul: 'Hari Valentine', skipDefault: true }, // bukan libur nasional
  { md: '05-01', judul: 'Hari Buruh Internasional' },
  { md: '06-01', judul: 'Hari Lahir Pancasila' },
  { md: '08-17', judul: 'Hari Kemerdekaan RI' },
  { md: '12-25', judul: 'Hari Raya Natal' }
]

// Approximate Hijriyah-based holidays for years 2024–2028 (SKB 3 Menteri historical + projected)
// Admin should verify and adjust per official government decree.
const HIJRI_BASED = {
  2024: [
    { tgl: '2024-02-08', judul: 'Isra Mi\'raj Nabi Muhammad SAW' },
    { tgl: '2024-03-11', judul: 'Hari Suci Nyepi' },
    { tgl: '2024-03-29', judul: 'Wafat Isa Al-Masih' },
    { tgl: '2024-04-10', judul: 'Hari Raya Idul Fitri 1445 H', endTgl: '2024-04-11' },
    { tgl: '2024-05-09', judul: 'Kenaikan Isa Al-Masih' },
    { tgl: '2024-05-23', judul: 'Hari Raya Waisak' },
    { tgl: '2024-06-17', judul: 'Hari Raya Idul Adha 1445 H' },
    { tgl: '2024-07-07', judul: 'Tahun Baru Hijriyah 1446 H' },
    { tgl: '2024-09-16', judul: 'Maulid Nabi Muhammad SAW' }
  ],
  2025: [
    { tgl: '2025-01-27', judul: 'Isra Mi\'raj Nabi Muhammad SAW' },
    { tgl: '2025-01-29', judul: 'Tahun Baru Imlek' },
    { tgl: '2025-03-29', judul: 'Hari Suci Nyepi' },
    { tgl: '2025-03-31', judul: 'Hari Raya Idul Fitri 1446 H', endTgl: '2025-04-01' },
    { tgl: '2025-04-18', judul: 'Wafat Isa Al-Masih' },
    { tgl: '2025-05-12', judul: 'Hari Raya Waisak' },
    { tgl: '2025-05-29', judul: 'Kenaikan Isa Al-Masih' },
    { tgl: '2025-06-06', judul: 'Hari Raya Idul Adha 1446 H' },
    { tgl: '2025-06-27', judul: 'Tahun Baru Hijriyah 1447 H' },
    { tgl: '2025-09-05', judul: 'Maulid Nabi Muhammad SAW' }
  ],
  2026: [
    { tgl: '2026-01-16', judul: 'Isra Mi\'raj Nabi Muhammad SAW' },
    { tgl: '2026-02-17', judul: 'Tahun Baru Imlek' },
    { tgl: '2026-03-19', judul: 'Hari Suci Nyepi' },
    { tgl: '2026-03-20', judul: 'Hari Raya Idul Fitri 1447 H', endTgl: '2026-03-21' },
    { tgl: '2026-04-03', judul: 'Wafat Isa Al-Masih' },
    { tgl: '2026-05-01', judul: 'Hari Raya Waisak' },
    { tgl: '2026-05-14', judul: 'Kenaikan Isa Al-Masih' },
    { tgl: '2026-05-27', judul: 'Hari Raya Idul Adha 1447 H' },
    { tgl: '2026-06-17', judul: 'Tahun Baru Hijriyah 1448 H' },
    { tgl: '2026-08-26', judul: 'Maulid Nabi Muhammad SAW' }
  ],
  2027: [
    { tgl: '2027-01-05', judul: 'Isra Mi\'raj Nabi Muhammad SAW' },
    { tgl: '2027-02-06', judul: 'Tahun Baru Imlek' },
    { tgl: '2027-03-08', judul: 'Hari Suci Nyepi' },
    { tgl: '2027-03-09', judul: 'Hari Raya Idul Fitri 1448 H', endTgl: '2027-03-10' },
    { tgl: '2027-03-26', judul: 'Wafat Isa Al-Masih' },
    { tgl: '2027-05-06', judul: 'Hari Raya Waisak' },
    { tgl: '2027-05-16', judul: 'Hari Raya Idul Adha 1448 H' },
    { tgl: '2027-06-06', judul: 'Tahun Baru Hijriyah 1449 H' },
    { tgl: '2027-08-15', judul: 'Maulid Nabi Muhammad SAW' }
  ]
}

/**
 * Get libur nasional list untuk tahun tertentu.
 * @param {number} year
 * @returns {Array<{tgl_mulai, tgl_akhir, judul, deskripsi}>}
 */
export function getLiburNasional(year) {
  const arr = []
  // Fixed
  for (const fx of FIXED_HOLIDAYS) {
    if (fx.skipDefault) continue
    const tgl = `${year}-${fx.md}`
    arr.push({
      tgl_mulai: tgl,
      tgl_akhir: tgl,
      judul: fx.judul,
      deskripsi: 'Hari libur nasional Indonesia',
      audience: 'semua',
      tipe: 'libur_nasional'
    })
  }
  // Hijri-based
  const hijri = HIJRI_BASED[year] || []
  for (const h of hijri) {
    arr.push({
      tgl_mulai: h.tgl,
      tgl_akhir: h.endTgl || h.tgl,
      judul: h.judul,
      deskripsi: 'Hari libur nasional Indonesia (jadwal SKB / perkiraan, mohon verifikasi)',
      audience: 'semua',
      tipe: 'libur_nasional'
    })
  }
  return arr
}

/**
 * Expand event libur (with tgl_mulai-tgl_akhir) ke set of date strings YYYY-MM-DD.
 */
export function expandLiburDates(events) {
  const set = new Set()
  for (const e of events || []) {
    if (e.tipe !== 'libur' && e.tipe !== 'libur_nasional') continue
    const start = e.tgl_mulai
    const end = e.tgl_akhir || e.tgl_mulai
    if (!start) continue
    const sd = new Date(start)
    const ed = new Date(end)
    if (isNaN(sd.getTime()) || isNaN(ed.getTime())) continue
    const cur = new Date(sd)
    while (cur <= ed) {
      const y = cur.getFullYear()
      const m = String(cur.getMonth() + 1).padStart(2, '0')
      const d = String(cur.getDate()).padStart(2, '0')
      set.add(`${y}-${m}-${d}`)
      cur.setDate(cur.getDate() + 1)
    }
  }
  return set
}
