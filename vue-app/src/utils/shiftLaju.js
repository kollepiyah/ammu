// shiftLaju — shift Pondok Laju yang aktif per guru per TANGGAL (Kyai 16 Nov 2026).
//
// "Ketika saya menjadwalkan guru ini dapat jadwal Laju 1 / Laju 2, otomatis ada shift yang
// diaktifkan pada hari itu untuk guru itu." Shift tiap sesi dipilih Kyai: settings.pondokLajuShift
// = { laju1, laju2 } (id Master Shift). Belum dipilih → tak ada yang berubah.
// Tadarus Pagi SENGAJA tak ikut: absennya tetap shift pagi guru kelas, tak ada yang berubah (Kyai).
// Laju 2 boleh "hadir ikut" shift sore lewat Master Shift (absensiMaterialize) — cukup satu scan.
//
// Dipakai deriveShift (`tambahan`) di semua penulis absen, materialisasi hadir-ikut, dan matriks
// rekap absen guru. CERMIN Deno: supabase/functions/hiview-absen/shiftLaju.ts — tes shiftLajuMirrorEdge.

export const SESI_SHIFT_LAJU = ['laju1', 'laju2']

/** { laju1, laju2 } → id shift ('' = belum dipilih). */
export function petaShiftSesiLaju(settings) {
  const m = (settings && settings.pondokLajuShift) || {}
  const out = {}
  for (const k of SESI_SHIFT_LAJU) out[k] = String(m[k] || '').trim()
  return out
}

/** Id shift Pondok Laju yang sudah dipilih Kyai. */
export function idShiftLaju(settings) {
  return new Set(Object.values(petaShiftSesiLaju(settings)).filter(Boolean))
}

/**
 * Shift Pondok Laju yang aktif untuk SATU guru pada SATU tanggal.
 * @param {object} p
 * @param {object} p.settings
 * @param {string[]} [p.sesiTerjadwal] sesi piket guru itu hari itu ('laju1' | 'laju2')
 * @returns {Set<string>}
 */
export function shiftLajuAktif({ settings, sesiTerjadwal = [] }) {
  const peta = petaShiftSesiLaju(settings)
  const out = new Set()
  for (const s of sesiTerjadwal || []) if (peta[s]) out.add(peta[s])
  return out
}

/**
 * Penentu `(guru, tanggal) => Set<shiftId>` untuk banyak guru & tanggal sekaligus (sinkron
 * Desktop, tambal HiView, materialisasi, matriks). Tanpa shift terpilih → selalu Set kosong.
 * @param {object} p
 * @param {object} p.settings
 * @param {Array} p.jadwal baris pondok_laju_jadwal { tanggal, sesi, guru_id }
 */
export function penentuShiftLaju({ settings, jadwal = [] }) {
  if (!idShiftLaju(settings).size) return () => new Set()
  const per = new Map()
  for (const r of jadwal || []) {
    const k = `${String(r?.guru_id ?? '')}|${String(r?.tanggal || '').slice(0, 10)}`
    if (!per.has(k)) per.set(k, [])
    per.get(k).push(r.sesi)
  }
  return (g, tanggal) =>
    shiftLajuAktif({
      settings,
      sesiTerjadwal: per.get(`${String(g?.id ?? '')}|${String(tanggal || '').slice(0, 10)}`) || []
    })
}
