// vue-app/src/utils/rekapBulanan.js
// Port dari legacy _rekapPraPTPTBulanan (line 23300) + logic rekap() (line 27695).
// Auto-compute Total Prestasi Bulanan per lembaga:
//   - TPQ:     manual (return null → caller pakai s.prestasi_total)
//   - PPPH:    manual (return null)
//   - PTPT:    Total = akhir - awal (halaman)
//   - Pra PTPT: count khotam dari riwayat_kenaikan bulan ini × multiplier

import { extractNumber } from './format'
import { getSchemaLembaga } from './raporSchema'

/**
 * Hitung rekap Pra PTPT bulanan dari santri.riwayat_kenaikan.
 * @param {Object} santri  - santri object dengan field riwayat_kenaikan[]
 * @param {string} periodeYYYYMM  - mis "2026-05"
 * @param {Object} settings - settings.value
 * @returns {{ totalKhotam:number, breakdown:Array, display:string }}
 */
export function rekapPraPTPTBulanan(santri, periodeYYYYMM, settings) {
  if (!santri || !Array.isArray(santri.riwayat_kenaikan)) {
    return { totalKhotam: 0, breakdown: [], display: '-' }
  }
  const schema = getSchemaLembaga('Pra PTPT', settings)
  if (!schema || !schema.perLevel) return { totalKhotam: 0, breakdown: [], display: '-' }

  // Filter riwayat: tanggal in target month + ke_lembaga = Pra PTPT
  const inMonth = santri.riwayat_kenaikan.filter((r) => {
    const tgl = String(r.tanggal || '')
    if (!tgl.startsWith(periodeYYYYMM)) return false
    const keLemb = String(r.ke_lembaga || '').toLowerCase()
    return keLemb.includes('pra ptpt')
  })
  if (inMonth.length === 0) return { totalKhotam: 0, breakdown: [], display: '-' }

  // Count per level + khotam_ke
  const map = {}
  inMonth.forEach((r) => {
    const keKls = String(r.ke_kelas || '').toLowerCase()
    const kkr = String(r.khotam_ke || '').toUpperCase()
    if (!kkr) return
    const lvl = (schema.levels || []).find((l) => {
      const lab = String(l.label || '').toLowerCase()
      const baca = String(l.levelBaca || '').toLowerCase()
      return keKls.includes(lab) || keKls.includes(baca)
    })
    if (!lvl) return
    const kh = (lvl.khotamList || []).find((k) =>
      String(k.id)
        .toUpperCase()
        .endsWith('_' + kkr)
    )
    if (!kh) return
    const key = `${lvl.id}|${kh.id}`
    if (!map[key]) {
      map[key] = {
        levelLabel: lvl.label,
        khotam_ke: kkr,
        count: 0,
        multiplier: kh.multiplier || 2
      }
    }
    map[key].count += 1
  })
  const breakdown = Object.values(map).map((b) => ({ ...b, total: b.count * b.multiplier }))
  const totalKhotam = breakdown.reduce((a, b) => a + b.total, 0)
  const display = totalKhotam > 0 ? `${totalKhotam}x` : '-'
  return { totalKhotam, breakdown, display }
}

/**
 * Hitung total PTPT = akhir - awal (halaman).
 * @param {string|number} awal
 * @param {string|number} akhir
 * @returns {{ totNum:number, display:string }}
 */
export function totalPTPT(awal, akhir) {
  const aw = extractNumber(awal)
  const ak = extractNumber(akhir)
  const totNum = ak - aw > 0 ? ak - aw : 0
  const display = totNum > 0 ? totNum + ' Hal' : ''
  return { totNum, display }
}

/**
 * Warna cell total PTPT sesuai range (legacy line 27681).
 */
export function getKelasWarnaPTPT(totalNum) {
  if (totalNum > 0 && totalNum < 5) return 'bg-red-100 text-red-900 border-red-400'
  if (totalNum >= 5 && totalNum < 10) return 'bg-yellow-100 text-yellow-900 border-yellow-400'
  if (totalNum >= 10) return 'bg-green-100 text-green-900 border-green-500'
  return 'bg-slate-100 text-blue-900 border-slate-300'
}

/**
 * dispatcher Total per lembaga.
 * @returns {Object} { kind: 'auto'|'manual', display:string, readonly:boolean, colorClass?:string }
 */
export function hitungTotalPrestasi(santri, lembaga, awal, akhir, periodeYYYYMM, settings) {
  if (lembaga === 'PTPT') {
    const { totNum, display } = totalPTPT(awal, akhir)
    return {
      kind: 'auto',
      display,
      readonly: true,
      colorClass: getKelasWarnaPTPT(totNum)
    }
  }
  if (lembaga === 'Pra PTPT') {
    const rk = rekapPraPTPTBulanan(santri, periodeYYYYMM, settings)
    return {
      kind: 'auto',
      display: rk.display,
      readonly: true,
      colorClass: 'bg-amber-50 text-amber-900 border-amber-300',
      breakdown: rk.breakdown
    }
  }
  // TPQ / TPQ Pagi / TPQ Sore / PPPH → manual
  return {
    kind: 'manual',
    display: santri.prestasi_total || '',
    readonly: false,
    colorClass: 'bg-white text-blue-900 border-slate-400'
  }
}
