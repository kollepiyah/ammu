// v.100: Logika TES KENAIKAN QIRAATI (pure helpers — jenis ajuan + opsi target per lembaga).
//   Aturan domain (kyai):
//     - Pra PTPT  : TANPA tes → dikecualikan total.
//     - TPQ Pagi/Sore : Naik Jilid (sub-level 1A→1B→1C→2A…).
//     - PTPT      : 2 model → Naik Juz (Juz n→n+1) & Naik Kelas (Kelas n→n+1, hanya bila santri
//                   di juz TERAKHIR kelasnya = setelah ceremonial).
//     - PPPH      : Naik Level (Arba'in→Riyadhus→Bukhari→Muslim).
//   Opsi target diturunkan dari schema kartu kenaikan (utils/kenaikan.js) → tak hardcode ganda.
import { getKartuKenaikanSchema } from './kenaikan'

// Lembaga NGAJI yang ikut fitur tes (Pra PTPT sengaja TIDAK termasuk).
export const TES_LEMBAGA = ['TPQ Pagi', 'TPQ Sore', 'PTPT', 'PPPH']

// Santri layak diajukan tes? (lembaga ngaji ikut tes + masih aktif)
export function isEligibleForTes(s) {
  if (!s || s.aktif === false) return false
  return TES_LEMBAGA.includes(String(s.lembaga || '').trim())
}

// Jenis ajuan yang tersedia untuk satu lembaga. [] = lembaga tak ikut tes.
export function tesJenisOptions(lembaga) {
  const l = String(lembaga || '').trim()
  if (l === 'TPQ Pagi' || l === 'TPQ Sore') return [{ value: 'jilid', label: 'Naik Jilid' }]
  if (l === 'PTPT')
    return [
      { value: 'juz', label: 'Naik Juz' },
      { value: 'kelas', label: 'Naik Kelas (setelah ceremonial)' }
    ]
  if (l === 'PPPH') return [{ value: 'level', label: 'Naik Level' }]
  return []
}

// PTPT: Kelas N = Juz (5N-4)..5N → juz terakhir kelas = kelipatan 5 (5,10,15,20,25).
//   Naik Kelas hanya boleh diajukan bila santri sudah di juz terakhir kelasnya (ceremonial).
export function juzNum(s) {
  const m = String(s?.juz || '').match(/\d+/)
  return m ? parseInt(m[0], 10) : NaN
}
export function canNaikKelasPtpt(s) {
  const j = juzNum(s)
  return Number.isFinite(j) && j > 0 && j < 30 && j % 5 === 0
}

// Flatten semua item sub-level dari schema (dipakai jenis 'jilid': 1A,1B,1C,2A…).
function flattenItems(lembaga, settings) {
  const sch = getKartuKenaikanSchema(lembaga, settings)
  const out = []
  for (const k of sch.kelasList || []) for (const it of k.items || []) out.push(String(it.label || it.id))
  return out
}
// Label kelas/level dari schema (dipakai jenis 'kelas' & 'level').
function kelasLabels(lembaga, settings) {
  const sch = getKartuKenaikanSchema(lembaga, settings)
  return (sch.kelasList || []).map((k) => String(k.label || k.id))
}

// Daftar opsi target (string label) untuk dropdown — selalu lengkap; guru bisa override default.
export function tesTargetOptions(santri, jenis, settings) {
  const l = String(santri?.lembaga || '').trim()
  if (jenis === 'jilid') return flattenItems(l || 'TPQ', settings)
  if (jenis === 'juz') return Array.from({ length: 30 }, (_, i) => 'Juz ' + (i + 1))
  if (jenis === 'kelas') return kelasLabels('PTPT', settings)
  if (jenis === 'level') return kelasLabels('PPPH', settings)
  return []
}

// Tebakan target default (best-effort) berdasar posisi santri sekarang. '' bila tak bisa ditebak.
export function tesTargetDefault(santri, jenis, settings) {
  const opts = tesTargetOptions(santri, jenis, settings)
  if (!opts.length) return ''
  if (jenis === 'juz') {
    const j = juzNum(santri)
    return Number.isFinite(j) && j < 30 ? 'Juz ' + (j + 1) : ''
  }
  if (jenis === 'kelas') {
    // Kelas berikutnya dari kelas santri sekarang (cari label yang cocok, ambil next).
    const cur = String(santri?.kelas || '').trim().toLowerCase()
    const idx = opts.findIndex((o) => o.toLowerCase() === cur)
    if (idx >= 0 && idx < opts.length - 1) return opts[idx + 1]
    // fallback: dari juz → kelas berikutnya (juz 5 = kelas 1 → Kelas 2)
    const j = juzNum(santri)
    if (Number.isFinite(j) && j % 5 === 0) {
      const nextKelasNo = j / 5 + 1
      const hit = opts.find((o) => o.toLowerCase().includes(String(nextKelasNo)))
      if (hit) return hit
    }
    return ''
  }
  // jilid / level: cari posisi santri.kelas di list → ambil berikutnya
  const cur = String(santri?.kelas || '').trim().toLowerCase()
  const idx = opts.findIndex((o) => o.toLowerCase() === cur)
  if (idx >= 0 && idx < opts.length - 1) return opts[idx + 1]
  return ''
}

// Label ramah status untuk UI.
export const STATUS_LABEL = {
  diajukan: 'Menunggu tes',
  lulus: 'Lulus — siap naik',
  tidak_lulus: 'Belum lulus',
  ditolak: 'Ditolak'
}
