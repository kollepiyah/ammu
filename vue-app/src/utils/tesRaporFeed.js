// v.100d Fase 3: petakan NILAI TES → sel rapor (data_nilai koleksi `rapor_semester`).
//   Nilai = milik posisi yang DISELESAIKAN (kelas_asal / juz_asal), bukan target naik.
//   Dipakai saat Lulus (TesKenaikanView) → setDoc merge ke rapor periode berjalan (prefill editable).
//   Key format selaras builder editor RaporView:
//     PTPT     : kj__juz_<n>__<fieldId>
//     PPPH     : ppph__lvl_<n>__<fieldId>
//     Pra PTPT : pra__lvl_<n>__kh_<ROM>__<fieldId>
//     TPQ jilid: jilid__<row>__<fieldId>   (row mis. "2A")
//     TPQ KPI  : imtas__<fieldId> / khotaman__<fieldId>
import { extractNumber } from './format'

// Periode rapor berjalan — SAMAKAN dgn default RaporView (TA "Y-Y+1"; bulan <6=Genap, else Ganjil).
export function currentRaporPeriode(now = new Date()) {
  const y = now.getFullYear()
  const tahunAjaran = `${y}-${y + 1}`
  const semester = now.getMonth() < 6 ? 'Genap' : 'Ganjil'
  const periodKey = `${tahunAjaran}_${semester}`.replace(/[^a-zA-Z0-9_]/g, '_')
  return { tahunAjaran, semester, periodKey }
}

function _num(s) { const m = String(s == null ? '' : s).match(/(\d+)/); return m ? m[1] : '' }

/**
 * Bangun partial `data_nilai` dari nilai tes. Return objek {key:val} atau null bila tak terpetakan.
 * @param {Object} tes - { lembaga, kelas_asal, juz_asal, target }
 * @param {Object} nilai - { aspekKey: angka }
 */
export function buildTesRaporFeed(tes, nilai) {
  if (!tes || !nilai || !Object.keys(nilai).length) return null
  const lmb = String(tes.lembaga || '').trim()
  const dn = {}
  const put = (key, aspekKey) => {
    const v = nilai[aspekKey]
    if (v !== undefined && v !== null && v !== '') dn[key] = v
  }

  if (lmb === 'PTPT') {
    const juz = extractNumber(tes.juz_asal) || _num(tes.juz_asal)
    if (!juz) return null
    const base = `kj__juz_${juz}`
    put(`${base}__fashohah`, 'fashohah')
    put(`${base}__tajwid`, 'tajwid')
    put(`${base}__kelancaran`, 'tahfizh') // field id rapor 'kelancaran' kini berlabel Tahfizh
    put(`${base}__istimror`, 'istimror')
  } else if (lmb === 'PPPH' || lmb === 'P3H') {
    const n = _num(tes.kelas_asal)
    if (!n) return null
    const base = `ppph__lvl_${n}`
    // v.101: PPPH aspek Al-Qur'an ke-3 = Tartil (bukan Tajwid). Pencapaian = manual (tidak di-feed dari tes).
    ;['tahfizh', 'fashohah', 'tartil', 'ketepatan_matan', 'pemahaman_sanad'].forEach((a) => put(`${base}__${a}`, a))
  } else if (lmb === 'Pra PTPT') {
    const n = _num(tes.kelas_asal)
    const rom = String(tes.target || '').replace(/khotam\s*/i, '').trim().toUpperCase()
    if (!n || !rom) return null
    const base = `pra__lvl_${n}__kh_${rom}`
    put(`${base}__fashohah`, 'fashohah')
    put(`${base}__tartil`, 'tartil')
    put(`${base}__tahfizh_juz_30`, 'tahfizh_juz30') // id rapor pakai underscore
    put(`${base}__ghorib`, 'ghorib')
    put(`${base}__tajwid`, 'tajwid')
    put(`${base}__doa_harian`, 'doa_harian')
  } else if (lmb === 'TPQ Pagi' || lmb === 'TPQ Sore' || lmb === 'TPQ') {
    const ka = String(tes.kelas_asal || '').toUpperCase()
    const isKpi = /KPI|IMTAS|KHOTAM|PERSIAPAN|\bPK\b/.test(ka)
    if (isKpi) {
      const sec = /KHOTAM/.test(ka) ? 'khotaman' : 'imtas'
      ;['fashohah', 'tartil', 'ghorib', 'tajwid', 'doa_harian', 'surat_pendek'].forEach((a) => put(`${sec}__${a}`, a))
    } else {
      const m = String(tes.kelas_asal || '').match(/(\d[A-C])/i)
      const row = m ? m[1].toUpperCase() : ''
      if (!row) return null
      // rapor jilid hanya punya Doa Harian + Surat Pendek (sesuai skema)
      put(`jilid__${row}__doa_harian`, 'doa_harian')
      put(`jilid__${row}__surat_pendek`, 'surat_pendek')
    }
  } else {
    return null
  }

  return Object.keys(dn).length ? dn : null
}
