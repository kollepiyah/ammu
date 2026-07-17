// shiftMaster (Edge) — PORT dari vue-app/src/utils/shiftMaster.js.
// Bila shiftMaster.js berubah, SINKRONKAN file ini.
//
// Hanya bagian yang dipakai DERIVASI shift yang diport. Fungsi sisi-UI
// (shiftIdsToLegacy, shiftMasterToLegacy, shiftsUntuk, shiftById, shiftLabelOf,
// isShiftBawaan) sengaja TIDAK diport — Edge tak memakainya.

export type SettingsLike = Record<string, unknown>

export interface ShiftItem {
  id: string
  label: string
  untuk: string
  mulai: string
  terlambat: string
  selesai: string
  urutan: number
  fallback: string
  bawaan: boolean
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

// Setting-key lama per shift bawaan — dipakai SEED bila settings.shiftMaster belum ada.
const LEGACY_KEYS: Record<string, { mulai: string; terlambat: string; selesai: string }> = {
  pagi: { mulai: 'shiftPagiMulai', terlambat: 'shiftPagiTerlambat', selesai: 'shiftPagiSelesai' },
  sore: { mulai: 'shiftSoreMulai', terlambat: 'shiftSoreTerlambat', selesai: 'shiftSoreSelesai' },
  sekolah: {
    mulai: 'shiftSekolahMulai',
    terlambat: 'shiftSekolahTerlambat',
    selesai: 'shiftSekolahSelesai'
  },
  pegawai_pagi: {
    mulai: 'shiftPegawaiPagiMulai',
    terlambat: 'shiftPegawaiPagiTerlambat',
    selesai: 'shiftPegawaiPagiSelesai'
  },
  pegawai_sore: {
    mulai: 'shiftPegawaiSoreMulai',
    terlambat: 'shiftPegawaiSoreTerlambat',
    selesai: 'shiftPegawaiSoreSelesai'
  }
}

// `urutan` bawaan SENGAJA sama dengan konstanta SHIFT_PRIORITY lama.
export const SHIFT_BAWAAN = [
  { id: 'pagi', label: 'Pagi', untuk: 'guru', urutan: 1, fallback: '' },
  { id: 'pegawai_pagi', label: 'Pegawai Pagi', untuk: 'pegawai', urutan: 2, fallback: 'pagi' },
  { id: 'sekolah', label: 'Sekolah', untuk: 'guru', urutan: 3, fallback: '' },
  { id: 'sore', label: 'Sore', untuk: 'guru', urutan: 4, fallback: '' },
  { id: 'pegawai_sore', label: 'Pegawai Sore', untuk: 'pegawai', urutan: 5, fallback: 'sore' }
]

const BAWAAN_IDS = new Set(SHIFT_BAWAAN.map((s) => s.id))

export function slugShiftId(v: unknown): string {
  return String(v || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

// deno-lint-ignore no-explicit-any
export function normalizeShift(raw: any): ShiftItem {
  const r = raw || {}
  const id = slugShiftId(r.id || r.label || '')
  const bawaan = BAWAAN_IDS.has(id)
  const def = bawaan ? SHIFT_BAWAAN.find((b) => b.id === id) : null
  return {
    id,
    label: String(r.label || def?.label || id || '').trim(),
    untuk: String(r.untuk || def?.untuk || 'guru').toLowerCase() === 'pegawai' ? 'pegawai' : 'guru',
    mulai: normHHMM(r.mulai) || '',
    terlambat: normHHMM(r.terlambat) || '',
    selesai: normHHMM(r.selesai) || '',
    urutan: Number(r.urutan) > 0 ? Number(r.urutan) : 99,
    fallback: bawaan ? def!.fallback || '' : '',
    bawaan
  }
}

function byUrutan(a: ShiftItem, b: ShiftItem): number {
  if (a.urutan !== b.urutan) return a.urutan - b.urutan
  return String(a.id).localeCompare(String(b.id))
}

// Daftar shift aktif. settings.shiftMaster belum ada (data lama) → SEED dari setting-key
// lama APA ADANYA, sengaja tanpa jam default (window kosong = shift tak pernah cocok,
// persis perilaku lama).
export function shiftList(settings: SettingsLike): ShiftItem[] {
  const s = settings || {}
  const raw = Array.isArray(s.shiftMaster) ? s.shiftMaster : []
  if (raw.length > 0) {
    return raw
      .map(normalizeShift)
      .filter((x: ShiftItem) => x.id)
      .sort(byUrutan)
  }
  return SHIFT_BAWAAN.map((b) => {
    const k = LEGACY_KEYS[b.id]
    return normalizeShift({
      ...b,
      mulai: s[k.mulai],
      terlambat: s[k.terlambat],
      selesai: s[k.selesai]
    })
  }).sort(byUrutan)
}
