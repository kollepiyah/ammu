// Formatting utilities — port dari legacy
const BULAN_ID = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const BULAN_ID_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'
]

/** Format Rupiah. */
export function fmtRp(n) {
  if (n == null || n === '') return 'Rp 0'
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(Number(n) || 0))
}

/** Format tanggal: '15 Mei 2026'. */
export function fmtTgl(d) {
  if (!d) return ''
  const dt = d instanceof Date ? d : new Date(d)
  if (isNaN(dt)) return ''
  return `${dt.getDate()} ${BULAN_ID[dt.getMonth()]} ${dt.getFullYear()}`
}

/** Format tanggal pendek: '15 Mei'. */
export function fmtTglShort(d) {
  if (!d) return ''
  const dt = d instanceof Date ? d : new Date(d)
  if (isNaN(dt)) return ''
  return `${dt.getDate()} ${BULAN_ID_SHORT[dt.getMonth()]}`
}

/** Format jam: '14:30'. */
export function fmtJam(d) {
  if (!d) return ''
  const dt = d instanceof Date ? d : new Date(d)
  if (isNaN(dt)) return ''
  const h = String(dt.getHours()).padStart(2, '0')
  const m = String(dt.getMinutes()).padStart(2, '0')
  return `${h}:${m}`
}

/** Format datetime: '15 Mei 2026, 14:30'. */
export function fmtDateTime(d) {
  if (!d) return ''
  return fmtTgl(d) + ', ' + fmtJam(d)
}

/** Ambil angka dari string '21 (PTPT-A)' → 21. */
export function extractNumber(s) {
  if (s == null) return 0
  const m = String(s).match(/\d+/)
  return m ? Number(m[0]) : 0
}

/**
 * v.100e: Normalisasi nomor juz dari nilai apa pun → string angka saja.
 * 'JUZ 6' | 'Juz 6' | '6' | 6 → '6'. Kosong/'-'/non-angka → ''.
 * Dipakai sebagai SUMBER TUNGGAL tampilan juz supaya tidak dobel "Juz JUZ 6"
 * (kenaikan PTPT menyimpan juz sebagai 'JUZ n', form menyimpan 'n').
 */
export function juzNum(v) {
  if (v == null || v === '' || v === '-') return ''
  const m = String(v).match(/\d+/)
  return m ? m[0] : ''
}

/**
 * v.21.13b.0526: Smart Title Case — capitalize setelah space/koma/titik/dash.
 * Apostrof TIDAK dianggap separator supaya "mu'asyaroh" → "Mu'asyaroh" (bukan "Mu'Asyaroh").
 * Setelah titik (gelar) tetap capitalize: "s.e." → "S.E." / "evi, s.pd." → "Evi, S.Pd."
 */
export function toTitleCase(str) {
  if (!str) return ''
  return String(str).trim().toLowerCase().replace(/(^|[\s,.\-])(\w)/g, (m, sep, c) => sep + c.toUpperCase())
}

/** Hapus gelar dari nama guru ('Ustadz Ahmad' → 'Ahmad'). */
export function getNamaGuruGelar(nama, jk) {
  if (!nama) return ''
  let clean = String(nama)
    .replace(/^Ustadzah\s+/i, '')
    .replace(/^Ustadz\s+/i, '')
  return toTitleCase(clean)
}

/** Format tanggal ke dd/mm/yyyy. */
export function formatTanggal(tglStr) {
  if (!tglStr || tglStr === '-') return '-'
  tglStr = String(tglStr)
  if (tglStr.includes('-') && tglStr.length === 10) {
    const p = tglStr.split('-')
    return `${p[2]}/${p[1]}/${p[0]}`
  }
  const d = new Date(tglStr)
  if (isNaN(d.getTime())) return tglStr
  return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`
}

/** Hitung lama mengajar dari tgl_tugas → "5 tahun 3 bulan 12 hari". */
export function hitungLamaMengajar(tglStr) {
  if (!tglStr || tglStr === '-') return '-'
  const start = new Date(tglStr)
  const now = new Date()
  if (isNaN(start.getTime())) return '-'
  let y = now.getFullYear() - start.getFullYear()
  let m = now.getMonth() - start.getMonth()
  let d = now.getDate() - start.getDate()
  if (d < 0) {
    m--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    d += prevMonth.getDate()
  }
  if (m < 0) {
    y--
    m += 12
  }
  const parts = []
  if (y > 0) parts.push(`${y} tahun`)
  if (m > 0) parts.push(`${m} bulan`)
  if (d > 0 && y === 0) parts.push(`${d} hari`)
  return parts.length ? parts.join(' ') : 'Baru bergabung'
}

/**
 * v.21.13d.0526: Normalize No WA Indonesia — restore leading 0 yang ke-strip Excel.
 * Excel auto-cast "08123..." jadi Number 8123... (leading 0 hilang).
 */
export function normalizeWA(raw) {
  if (raw === null || raw === undefined) return ''
  let s = String(raw).trim().replace(/[^\d]/g, '')
  if (!s) return ''
  // v.99: +62 → 0; jika awalan BUKAN 0 → tambah 0 (kyai req: "no WA auto tambah 0 jika awalan gk ada 0")
  if (s.startsWith('62')) s = '0' + s.slice(2)
  else if (!s.startsWith('0')) s = '0' + s
  return s
}

/**
 * v.21.22b.0526: Parse multi WA — split string oleh / ; , spasi atau newline.
 * Return array of normalized numbers. Nomor pertama biasanya jadi WA utama + username.
 */
export function parseMultipleWA(raw) {
  if (raw === null || raw === undefined) return []
  // v.99: pemisah lebih luas — / ; , | newline, kata "dan", ATAU 2+ spasi. + dedup.
  const parts = String(raw).split(/[\/;,|]+|\n+|\s+dan\s+|\s{2,}/i)
  const result = []
  for (const p of parts) {
    const norm = normalizeWA(p)
    if (norm && norm.length >= 8 && !result.includes(norm)) result.push(norm)
  }
  return result
}

export { BULAN_ID, BULAN_ID_SHORT }
