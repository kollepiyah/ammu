// Agenda publik (blueprint Ammu publik §3.3 / F4) — penyusun daftar, fungsi murni + tes.
// Masukan: baris kegiatan yang SUDAH lolos kegiatanUntukTamu. Keluaran: kelompok per bulan.

const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]
const BULAN_PENDEK = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MEI',
  'JUN',
  'JUL',
  'AGU',
  'SEP',
  'OKT',
  'NOV',
  'DES'
]

export const SARING_AGENDA = Object.freeze([
  { kunci: 'akan', label: 'Akan datang' },
  { kunci: 'bulan', label: 'Bulan ini' },
  { kunci: 'semua', label: 'Semua' }
])

/** Jenis lencana dari tipe kegiatan: libur (rose), ujian (amber), kegiatan (sky). */
export function jenisAgenda(tipe) {
  const t = String(tipe || 'kegiatan')
  if (t.startsWith('libur')) return 'libur'
  if (t === 'ujian') return 'ujian'
  return 'kegiatan'
}

const tgl = (s) => String(s || '').slice(0, 10)

/**
 * @param {object[]} list baris kegiatan (judul, tgl_mulai, tgl_akhir, tipe, deskripsi)
 * @param {{saring?:'akan'|'bulan'|'semua', hariIni:string}} o hariIni 'YYYY-MM-DD'
 * @returns {{kunci:string, label:string, item:object[]}[]} urut tanggal; "semua" terbaru dulu
 */
export function susunAgenda(list, { saring = 'akan', hariIni }) {
  const bulanIni = tgl(hariIni).slice(0, 7)
  const lolos = (k) => {
    const mulai = tgl(k.tgl_mulai)
    const akhir = tgl(k.tgl_akhir) || mulai
    if (!mulai) return false
    if (saring === 'akan') return akhir >= hariIni
    if (saring === 'bulan') return mulai.slice(0, 7) <= bulanIni && akhir.slice(0, 7) >= bulanIni
    return true
  }
  const item = (list || []).filter(lolos).map((k) => {
    const mulai = tgl(k.tgl_mulai)
    const akhir = tgl(k.tgl_akhir) || mulai
    const [y, m, d] = mulai.split('-').map(Number)
    return {
      id: k.id,
      judul: k.judul || '(tanpa judul)',
      deskripsi: k.deskripsi || '',
      mulai,
      akhir,
      hari: d,
      bulanPendek: BULAN_PENDEK[m - 1] || '',
      jenis: jenisAgenda(k.tipe),
      rentang: akhir !== mulai ? labelRentang(mulai, akhir) : '',
      _kunciBulan: `${y}-${String(m).padStart(2, '0')}`,
      _labelBulan: `${BULAN[m - 1] || ''} ${y}`
    }
  })
  const turun = saring === 'semua'
  item.sort((a, b) => (turun ? b.mulai.localeCompare(a.mulai) : a.mulai.localeCompare(b.mulai)))
  const kelompok = []
  for (const it of item) {
    let g = kelompok[kelompok.length - 1]
    if (!g || g.kunci !== it._kunciBulan) {
      g = { kunci: it._kunciBulan, label: it._labelBulan, item: [] }
      kelompok.push(g)
    }
    g.item.push(it)
  }
  return kelompok
}

/** "26 Nov – 2 Des 2026" */
export function labelRentang(mulai, akhir) {
  const [y1, m1, d1] = mulai.split('-').map(Number)
  const [y2, m2, d2] = akhir.split('-').map(Number)
  const b = (m) => (BULAN[m - 1] || '').slice(0, 3)
  if (y1 === y2 && m1 === m2) return `${d1}–${d2} ${b(m2)} ${y2}`
  if (y1 === y2) return `${d1} ${b(m1)} – ${d2} ${b(m2)} ${y2}`
  return `${d1} ${b(m1)} ${y1} – ${d2} ${b(m2)} ${y2}`
}
