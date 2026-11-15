// shiftLaju (Edge) — PORT dari vue-app/src/utils/shiftLaju.js (+ isSantriPondokLaju &
// guruKelasLaju dari utils/pondokLaju.js). Shift Pondok Laju yang aktif per guru per tanggal:
// shift Laju 1/2 dari jadwal piket, Tadarus Pagi untuk guru kelas Pondok Laju (kecuali Ahad).
// Bila berkas .js berubah, SINKRONKAN berkas ini — dijaga tes shiftLajuMirrorEdge.

import type { SettingsLike } from './shiftMaster.ts'

export const SESI_SHIFT_LAJU = ['tadarus', 'laju1', 'laju2']

const _norm = (v: unknown) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

export function petaShiftSesiLaju(settings: SettingsLike): Record<string, string> {
  // deno-lint-ignore no-explicit-any
  const m = ((settings as any) && (settings as any).pondokLajuShift) || {}
  const out: Record<string, string> = {}
  for (const k of SESI_SHIFT_LAJU) out[k] = String(m[k] || '').trim()
  return out
}

export function mulaiShiftLaju(settings: SettingsLike): string {
  // deno-lint-ignore no-explicit-any
  const v = String(((settings as any)?.pondokLajuShift?.mulai as string) || '')
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ''
}

export function idShiftLaju(settings: SettingsLike): Set<string> {
  return new Set(Object.values(petaShiftSesiLaju(settings)).filter(Boolean))
}

// deno-lint-ignore no-explicit-any
function isSantriPondokLaju(s: any): boolean {
  return s?.is_pondok_laju === true && !s?.is_mukim
}
// deno-lint-ignore no-explicit-any
function guruKelasLaju(s: any): string {
  return String(s?.guru_pagi || s?.guru || s?.guru_sore || '').trim()
}

// deno-lint-ignore no-explicit-any
export function guruKelasLajuSet(santriList: any[]): Set<string> {
  const out = new Set<string>()
  for (const s of santriList || []) {
    if (!s || s.aktif === false || !isSantriPondokLaju(s)) continue
    const n = _norm(guruKelasLaju(s))
    if (n) out.add(n)
  }
  return out
}

function _ahad(iso: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''))
  return !!m && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay() === 0
}

export function shiftLajuAktif({
  settings,
  tanggal,
  sesiTerjadwal = [],
  guruKelas = false
}: {
  settings: SettingsLike
  tanggal: string
  sesiTerjadwal?: string[]
  guruKelas?: boolean
}): Set<string> {
  const peta = petaShiftSesiLaju(settings)
  const out = new Set<string>()
  for (const s of sesiTerjadwal || []) if (s !== 'tadarus' && peta[s]) out.add(peta[s])
  const mulai = mulaiShiftLaju(settings)
  if (guruKelas && peta.tadarus && !_ahad(tanggal) && (!mulai || String(tanggal) >= mulai))
    out.add(peta.tadarus)
  return out
}

/** Nama guru (dinormalkan) cocok dengan salah satu guru kelas Pondok Laju? */
export function namaCocok(nama: unknown, kelas: Set<string>): boolean {
  return kelas.has(_norm(nama))
}
