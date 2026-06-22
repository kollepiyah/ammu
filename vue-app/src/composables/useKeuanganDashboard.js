// useKeuanganDashboard — data dasbor keuangan untuk shell Ribbon (Home + tab Keuangan).
// Logika DIPORT PERSIS dari KeuanganDashboardView.vue (helper toleran shape + 12 bulan +
// saldo berjalan + breakdown kategori) supaya angka & grafik identik. Sumber data = useKeuangan
// (langganan tunggal lewat collections store) -> tak menambah beban.
import { computed } from 'vue'
import { useKeuangan } from './useKeuangan'
import { fmtRp } from '@/utils/format'

const NAMA_BULAN_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const PALETTE = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#06b6d4', '#84cc16', '#f97316']

function ymOf(val) {
  if (!val) return null
  if (typeof val === 'object') {
    if (typeof val.toDate === 'function') { const d = val.toDate(); return { year: d.getFullYear(), month: d.getMonth() } }
    if (typeof val.seconds === 'number') { const d = new Date(val.seconds * 1000); return { year: d.getFullYear(), month: d.getMonth() } }
    if (val instanceof Date && !isNaN(val)) return { year: val.getFullYear(), month: val.getMonth() }
    return null
  }
  const s = String(val).trim()
  let m = s.match(/^(\d{4})-(\d{1,2})/)
  if (m) return { year: +m[1], month: +m[2] - 1 }
  m = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/)
  if (m) return { year: +m[3], month: +m[2] - 1 }
  const d = new Date(s)
  return isNaN(d) ? null : { year: d.getFullYear(), month: d.getMonth() }
}
function isTabungan(t) {
  const sumber = String(t.sumber || '').toLowerCase()
  return sumber.includes('tabungan') || String(t.kategori || '').toLowerCase() === 'tabungan'
}
function arusOf(t) {
  const tipe = String(t.tipe ?? t.type ?? t.jenis ?? '').toLowerCase().trim()
  const nominal = Number(t.nominal) || 0
  const masukF = Number(t.masuk) || 0
  const keluarF = Number(t.keluar) || 0
  if (['masuk', 'in', 'income', 'pemasukan'].includes(tipe)) return { masuk: nominal || masukF, keluar: 0 }
  if (['keluar', 'out', 'expense', 'pengeluaran'].includes(tipe)) return { masuk: 0, keluar: nominal || keluarF }
  return { masuk: masukF, keluar: keluarF }
}
function fmtTgl(val) {
  const ym = ymOf(val)
  const s = String(val || '').trim()
  const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (m && ym) return `${String(+m[3]).padStart(2, '0')} ${NAMA_BULAN_SHORT[ym.month]} ${ym.year}`
  const m2 = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/)
  if (m2 && ym) return `${String(+m2[1]).padStart(2, '0')} ${NAMA_BULAN_SHORT[ym.month]} ${ym.year}`
  return s || '-'
}

export function useKeuanganDashboard() {
  const { tabunganSantri, gaji, bukuInduk, stats, isFullAccess } = useKeuangan()

  const bukuIndukValid = computed(() =>
    (bukuInduk.value || []).filter((b) => {
      const kat = String(b.kategori || '').toLowerCase()
      const sumber = String(b.sumber || '').toLowerCase()
      if (kat === 'tabungan' || sumber.includes('tabungan')) return false
      return /^\d{4}-\d{2}/.test(String(b.tanggal || '').trim())
    })
  )

  const months12 = computed(() => {
    const now = new Date()
    const arr = []
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
      arr.push({ year: d.getFullYear(), month: d.getMonth(), label: NAMA_BULAN_SHORT[d.getMonth()] + ' ' + String(d.getFullYear()).slice(-2) })
    }
    return arr
  })

  const monthlyData = computed(() =>
    months12.value.map((m) => {
      let masuk = 0
      let keluar = 0
      for (const t of bukuInduk.value || []) {
        if (isTabungan(t)) continue
        const ym = ymOf(t.tanggal)
        if (!ym || ym.year !== m.year || ym.month !== m.month) continue
        const a = arusOf(t)
        masuk += a.masuk
        keluar += a.keluar
      }
      return { ...m, masuk, keluar }
    })
  )

  const bar12 = computed(() => {
    const data = monthlyData.value
    const max = Math.max(1, ...data.map((d) => Math.max(d.masuk, d.keluar)))
    const w = 600 - 50
    const bw = w / data.length
    return data.map((d, i) => ({
      x: 45 + i * bw,
      w: bw - 4,
      yMasuk: 195 - (d.masuk / max) * 180,
      hMasuk: (d.masuk / max) * 180,
      yKeluar: 195 - (d.keluar / max) * 180,
      hKeluar: (d.keluar / max) * 180,
      label: d.label
    }))
  })

  const barGrid = computed(() => {
    const max = Math.max(1, ...monthlyData.value.map((d) => Math.max(d.masuk, d.keluar)))
    const steps = 4
    const arr = []
    for (let i = 0; i <= steps; i++) {
      const v = (max / steps) * (steps - i)
      arr.push({ y: 15 + i * 45, label: 'Rp ' + Math.round(v / 1000) + 'k' })
    }
    return arr
  })

  const saldoData = computed(() => {
    let cum = 0
    const data = monthlyData.value.map((m) => {
      cum += m.masuk - m.keluar
      return { ...m, saldo: cum }
    })
    const min = Math.min(0, ...data.map((d) => d.saldo))
    const max = Math.max(0, ...data.map((d) => d.saldo))
    const range = max - min || 1
    const w = 600 - 60
    const step = data.length > 1 ? w / (data.length - 1) : w
    const yZero = 195 - (-min / range) * 180
    const points = data.map((d, i) => ({ x: 55 + i * step, y: 195 - ((d.saldo - min) / range) * 180, label: d.label }))
    const pathPoints = points.map((p) => `${p.x},${p.y}`).join(' ')
    const fillPoints = `${points[0]?.x || 55},${yZero} ${pathPoints} ${points[points.length - 1]?.x || 595},${yZero}`
    return { points, pathPoints, fillPoints, last: data[data.length - 1]?.saldo || 0, yZero }
  })

  const saldoGrid = computed(() => {
    const cums = monthlyData.value.reduce((acc, m) => { acc.push(acc[acc.length - 1] + m.masuk - m.keluar); return acc }, [0])
    const min = Math.min(0, ...cums)
    const max = Math.max(0, ...cums)
    const range = max - min || 1
    const steps = 4
    const arr = []
    for (let i = 0; i <= steps; i++) arr.push({ y: 15 + i * 45, label: 'Rp ' + Math.round((max - (range / steps) * i) / 1000) + 'k' })
    return arr
  })

  const kategoriBulanIni = computed(() => {
    const now = new Date()
    const groups = {}
    let total = 0
    for (const t of bukuInduk.value || []) {
      if (isTabungan(t)) continue
      const ym = ymOf(t.tanggal)
      if (!ym || ym.year !== now.getFullYear() || ym.month !== now.getMonth()) continue
      const keluar = arusOf(t).keluar
      if (keluar <= 0) continue
      const kat = t.kategori || '(Tanpa Kategori)'
      groups[kat] = (groups[kat] || 0) + keluar
      total += keluar
    }
    return Object.entries(groups)
      .map(([nama, val]) => ({ nama, total: val, pct: total ? Math.round((val / total) * 100) : 0 }))
      .sort((a, b) => b.total - a.total)
  })
  const totalKategori = computed(() => kategoriBulanIni.value.reduce((s, k) => s + k.total, 0))
  const donutSlices = computed(() => {
    const arr = kategoriBulanIni.value
    const total = totalKategori.value || 1
    let ang = -Math.PI / 2
    const cx = 110
    const cy = 110
    const r = 100
    return arr.map((k, i) => {
      const frac = k.total / total
      const a2 = ang + frac * 2 * Math.PI
      const x1 = cx + r * Math.cos(ang)
      const y1 = cy + r * Math.sin(ang)
      const x2 = cx + r * Math.cos(a2)
      const y2 = cy + r * Math.sin(a2)
      const large = frac > 0.5 ? 1 : 0
      const path = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`
      ang = a2
      return { path, color: PALETTE[i % PALETTE.length], nama: k.nama }
    })
  })

  const transaksiTerakhir = computed(() => {
    const arr = (bukuInduk.value || []).filter((t) => !isTabungan(t) && /^\d{4}-\d{2}/.test(String(t.tanggal || '').trim()))
    return arr
      .slice()
      .sort((a, b) => String(b.tanggal).localeCompare(String(a.tanggal)))
      .slice(0, 8)
      .map((t) => {
        const a = arusOf(t)
        const masuk = a.masuk > 0
        return {
          tgl: fmtTgl(t.tanggal),
          ket: t.keterangan || t.uraian || t.ket || t.kategori || '-',
          jenis: masuk ? 'Masuk' : 'Keluar',
          nominal: fmtRp(masuk ? a.masuk : a.keluar)
        }
      })
  })

  return {
    tabunganSantri,
    gaji,
    stats,
    isFullAccess,
    bukuIndukValid,
    monthlyData,
    bar12,
    barGrid,
    saldoData,
    saldoGrid,
    kategoriBulanIni,
    totalKategori,
    donutSlices,
    transaksiTerakhir,
    PALETTE,
    fmtRp
  }
}
