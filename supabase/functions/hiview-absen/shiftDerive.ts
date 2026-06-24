// shiftDerive (Edge) — PORT VERBATIM dari vue-app/src/utils/shiftDerive.js.
// Aturan shift = MILIK AMMU (settings); mesin cuma kirim timestamp. Dipakai
// Edge Function hiview-absen agar derivasi shift IDENTIK dengan app + fp_sync.py.
// Bila shiftDerive.js berubah, SINKRONKAN file ini.

export interface GuruLike {
  tipe_pegawai?: string
  shift?: string
  shift_pegawai?: string
  lembaga_sekolah?: string
  [k: string]: unknown
}
export type SettingsLike = Record<string, unknown>
interface SettingKeys {
  mulai: string
  terlambat: string
  selesai: string
  fallback?: string
}

// Prioritas saat 1 jam scan jatuh di >1 window (mis. pagi & pegawai_pagi overlap).
export const SHIFT_PRIORITY = ['pagi', 'pegawai_pagi', 'sekolah', 'sore', 'pegawai_sore']

// Shift mana yang berlaku utk seorang guru/pegawai (gating per tipe & shift).
export function shiftsForGuru(g: GuruLike): Set<string> {
  const tipe = String(g?.tipe_pegawai || 'guru')
    .toLowerCase()
    .trim()
  const hasPegawai = tipe.includes('pegawai')
  const hasGuru = !hasPegawai || tipe.includes('guru')
  const shiftField = String(g?.shift || 'pagi_sore').toLowerCase()
  const hasSekolah = !!(g?.lembaga_sekolah && String(g.lembaga_sekolah).trim())
  const set = new Set<string>()
  if (hasGuru && shiftField.includes('pagi')) set.add('pagi')
  if (hasGuru && shiftField.includes('sore')) set.add('sore')
  if (hasGuru && hasSekolah) set.add('sekolah')
  if (hasPegawai) {
    const sp = String((hasGuru ? g?.shift_pegawai : g?.shift) || 'pagi_sore').toLowerCase()
    if (sp.includes('pagi')) set.add('pegawai_pagi')
    if (sp.includes('sore')) set.add('pegawai_sore')
  }
  return set
}

// Setting-key per shift (mulai/terlambat/selesai). Pegawai punya jam SENDIRI;
// 'fallback' = shift guru yg dipakai bila setelan pegawai dikosongkan.
export function shiftSettingKeys(shift: string): SettingKeys {
  switch (shift) {
    case 'sore':
      return { mulai: 'shiftSoreMulai', terlambat: 'shiftSoreTerlambat', selesai: 'shiftSoreSelesai' }
    case 'sekolah':
      return {
        mulai: 'shiftSekolahMulai',
        terlambat: 'shiftSekolahTerlambat',
        selesai: 'shiftSekolahSelesai'
      }
    case 'pegawai_pagi':
      return {
        mulai: 'shiftPegawaiPagiMulai',
        terlambat: 'shiftPegawaiPagiTerlambat',
        selesai: 'shiftPegawaiPagiSelesai',
        fallback: 'pagi'
      }
    case 'pegawai_sore':
      return {
        mulai: 'shiftPegawaiSoreMulai',
        terlambat: 'shiftPegawaiSoreTerlambat',
        selesai: 'shiftPegawaiSoreSelesai',
        fallback: 'sore'
      }
    default:
      return { mulai: 'shiftPagiMulai', terlambat: 'shiftPagiTerlambat', selesai: 'shiftPagiSelesai' }
  }
}

// Normalisasi 'H:MM' / 'HH.MM' -> 'HH:MM' (zero-pad). null bila tak valid.
export function normHHMM(v: unknown): string | null {
  const s = String(v || '')
    .trim()
    .replace('.', ':')
  if (!s || !s.includes(':')) return null
  const [h, m] = s.split(':')
  const hi = parseInt(h, 10)
  const mi = parseInt(m, 10)
  if (Number.isNaN(hi) || Number.isNaN(mi)) return null
  return String(hi).padStart(2, '0') + ':' + String(mi).padStart(2, '0')
}

// Window jam shift dari settings; pegawai kosong -> fallback ke jam guru pagi/sore.
export function shiftWindow(
  shift: string,
  settings: SettingsLike
): { mulai: string; terlambat: string; selesai: string } {
  const s = settings || {}
  const k = shiftSettingKeys(shift)
  const pick = (kk: SettingKeys) => ({
    mulai: String(s[kk.mulai] || '').trim(),
    terlambat: String(s[kk.terlambat] || '').trim(),
    selesai: String(s[kk.selesai] || '').trim()
  })
  let w = pick(k)
  if (!w.mulai && !w.terlambat && k.fallback) w = pick(shiftSettingKeys(k.fallback))
  return w
}

// Batas terlambat ('HH:MM' ternormalisasi): pakai 'terlambat', else 'mulai'. '' bila tak ada.
export function shiftBatas(shift: string, settings: SettingsLike): string {
  const w = shiftWindow(shift, settings)
  return normHHMM(w.terlambat) || normHHMM(w.mulai) || ''
}

// Derive shift utk jam scan 'HH:MM' + guru + settings. return key shift atau
// null (di luar semua window milik guru). Overlap -> menang SHIFT_PRIORITY.
export function deriveShift(hhmm: string, g: GuruLike, settings: SettingsLike): string | null {
  const t = normHHMM(hhmm)
  if (!t) return null
  const cands: string[] = []
  for (const sh of shiftsForGuru(g)) {
    const w = shiftWindow(sh, settings)
    const mulai = normHHMM(w.mulai)
    const selesai = normHHMM(w.selesai)
    if (mulai && selesai && mulai <= t && t <= selesai) cands.push(sh)
  }
  if (!cands.length) return null
  cands.sort((a, b) => {
    const ia = SHIFT_PRIORITY.indexOf(a)
    const ib = SHIFT_PRIORITY.indexOf(b)
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib)
  })
  return cands[0]
}

// Status hadir/terlambat dari jam scan vs batas shift.
export function statusFor(hhmm: string, shift: string, settings: SettingsLike): string {
  const t = normHHMM(hhmm)
  const batas = shiftBatas(shift, settings)
  return batas && t && t > batas ? 'terlambat' : 'hadir'
}
