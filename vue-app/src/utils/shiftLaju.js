// shiftLaju — shift Pondok Laju yang aktif per guru per TANGGAL (Kyai 16 Nov 2026).
//
// "Ketika saya menjadwalkan guru ini dapat jadwal Laju 1 / Laju 2, otomatis ada shift yang
// diaktifkan pada hari itu untuk guru itu" — dan Tadarus Pagi otomatis milik guru kelas Pondok
// Laju setiap hari (kecuali Ahad). Shift tiap sesi dipilih Kyai: settings.pondokLajuShift =
// { tadarus, laju1, laju2 } (id Master Shift). Belum dipilih → tak ada yang berubah.
//
// Dipakai deriveShift (`tambahan`) di semua penulis absen dan oleh matriks rekap absen guru.
// CERMIN Deno: supabase/functions/hiview-absen/shiftLaju.ts — jaga lewat tes shiftLajuMirrorEdge.
import { isSantriPondokLaju, guruKelasLaju } from './pondokLaju'

export const SESI_SHIFT_LAJU = ['tadarus', 'laju1', 'laju2']

const _norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

/** { tadarus, laju1, laju2 } → id shift ('' = belum dipilih). */
export function petaShiftSesiLaju(settings) {
  const m = (settings && settings.pondokLajuShift) || {}
  const out = {}
  for (const k of SESI_SHIFT_LAJU) out[k] = String(m[k] || '').trim()
  return out
}

/**
 * Tanggal mulai berlaku ('YYYY-MM-DD', '' = tanpa batas). Tadarus Pagi aktif setiap hari, jadi
 * tanpa batas ini menyalakan pengaturan di tengah bulan mengalpakan semua guru kelas untuk
 * hari-hari SEBELUM programnya berjalan. Laju tak perlu — ia hanya aktif di tanggal terjadwal.
 */
export function mulaiShiftLaju(settings) {
  const v = String((settings && settings.pondokLajuShift && settings.pondokLajuShift.mulai) || '')
  return /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : ''
}

/** Id shift Pondok Laju yang sudah dipilih Kyai. */
export function idShiftLaju(settings) {
  return new Set(Object.values(petaShiftSesiLaju(settings)).filter(Boolean))
}

/** Nama guru kelas Pondok Laju (dinormalkan) dari daftar santri. */
export function guruKelasLajuSet(santriList) {
  const out = new Set()
  for (const s of santriList || []) {
    if (!s || s.aktif === false || !isSantriPondokLaju(s)) continue
    const n = _norm(guruKelasLaju(s))
    if (n) out.add(n)
  }
  return out
}

function _ahad(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''))
  return !!m && new Date(Date.UTC(+m[1], +m[2] - 1, +m[3])).getUTCDay() === 0
}

/**
 * Shift Pondok Laju yang aktif untuk SATU guru pada SATU tanggal.
 * @param {object} p
 * @param {object} p.settings
 * @param {string} p.tanggal 'YYYY-MM-DD'
 * @param {string[]} [p.sesiTerjadwal] sesi piket guru itu hari itu ('laju1' | 'laju2')
 * @param {boolean} [p.guruKelas] guru kelas Pondok Laju → Tadarus Pagi (kecuali Ahad)
 * @returns {Set<string>}
 */
export function shiftLajuAktif({ settings, tanggal, sesiTerjadwal = [], guruKelas = false }) {
  const peta = petaShiftSesiLaju(settings)
  const out = new Set()
  for (const s of sesiTerjadwal || []) if (s !== 'tadarus' && peta[s]) out.add(peta[s])
  const mulai = mulaiShiftLaju(settings)
  if (guruKelas && peta.tadarus && !_ahad(tanggal) && (!mulai || String(tanggal) >= mulai))
    out.add(peta.tadarus)
  return out
}

/**
 * Penentu `(guru, tanggal) => Set<shiftId>` untuk banyak guru & tanggal sekaligus (sinkron
 * Desktop, tambal HiView, matriks). Tanpa shift terpilih → selalu Set kosong.
 * @param {object} p
 * @param {object} p.settings
 * @param {Array} p.jadwal baris pondok_laju_jadwal { tanggal, sesi, guru_id }
 * @param {Array} p.santriList untuk mengenali guru kelas Pondok Laju
 */
export function penentuShiftLaju({ settings, jadwal = [], santriList = [] }) {
  if (!idShiftLaju(settings).size) return () => new Set()
  const kelas = guruKelasLajuSet(santriList)
  const per = new Map()
  for (const r of jadwal || []) {
    const k = `${String(r?.guru_id ?? '')}|${String(r?.tanggal || '').slice(0, 10)}`
    if (!per.has(k)) per.set(k, [])
    per.get(k).push(r.sesi)
  }
  return (g, tanggal) =>
    shiftLajuAktif({
      settings,
      tanggal,
      sesiTerjadwal: per.get(`${String(g?.id ?? '')}|${String(tanggal || '').slice(0, 10)}`) || [],
      guruKelas: kelas.has(_norm(g?.nama))
    })
}
