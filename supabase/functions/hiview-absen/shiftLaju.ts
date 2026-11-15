// shiftLaju (Edge) — PORT dari vue-app/src/utils/shiftLaju.js. Shift Pondok Laju yang aktif per
// guru per tanggal: shift Laju 1/2 dari jadwal piket (Tadarus Pagi tetap shift pagi biasa).
// Bila berkas .js berubah, SINKRONKAN berkas ini — dijaga tes shiftLajuMirrorEdge.

import type { SettingsLike } from './shiftMaster.ts'

export const SESI_SHIFT_LAJU = ['laju1', 'laju2']

export function petaShiftSesiLaju(settings: SettingsLike): Record<string, string> {
  // deno-lint-ignore no-explicit-any
  const m = ((settings as any) && (settings as any).pondokLajuShift) || {}
  const out: Record<string, string> = {}
  for (const k of SESI_SHIFT_LAJU) out[k] = String(m[k] || '').trim()
  return out
}

export function idShiftLaju(settings: SettingsLike): Set<string> {
  return new Set(Object.values(petaShiftSesiLaju(settings)).filter(Boolean))
}

export function shiftLajuAktif({
  settings,
  sesiTerjadwal = []
}: {
  settings: SettingsLike
  sesiTerjadwal?: string[]
}): Set<string> {
  const peta = petaShiftSesiLaju(settings)
  const out = new Set<string>()
  for (const s of sesiTerjadwal || []) if (peta[s]) out.add(peta[s])
  return out
}
