// absenPulang — "hadir dihitung dari absen pulang" (Kyai 16 Nov 2026).
//
// "Untuk guru sekolah dibacanya ketika scan pulang sekolah … hari sekolah tanpa scan pulang menjadi
// alpa. JP dan bonus kehadiran sekolah hari itu juga tidak dibayar." Shift yang tunduk aturan ini
// ditandai Kyai di Master Shift (`wajib_pulang`). Untuk shift bertanda, baris hadir/terlambat TANPA
// jam pulang di hari yang SUDAH LEWAT dibaca sebagai alpa — di matriks, rekap, JP, dan bonus.
// Hari ini belum dihukum (gurunya masih bisa pulang). Baris di database TIDAK diubah: begitu jam
// pulang menyusul (sinkron/tambal/perbaikan), hadirnya kembali sah dengan sendirinya.
//
// Satu sumber untuk SEMUA pembaca status hadir — jangan menyalin syaratnya ke layar.
import { shiftList } from './shiftMaster'

/** Id shift bertanda "hadir dihitung dari absen pulang". */
export function shiftWajibPulang(settings) {
  return new Set(
    shiftList(settings || {})
      .filter((sh) => sh.wajib_pulang === true)
      .map((sh) => String(sh.id))
  )
}

const _hadir = (st) => st === 'hadir' || st === 'terlambat' || st === 'masuk'

/** Baris ini masuk/hadir di shift wajib-pulang tapi belum punya jam pulang? */
export function tanpaPulang(row, wajib) {
  if (!row || !wajib || !wajib.size) return false
  const st = String(row.status || 'hadir').toLowerCase()
  if (!_hadir(st)) return false
  if (!wajib.has(String(row.shift || '').toLowerCase())) return false
  return !String(row.jam_pulang || '').trim()
}

/**
 * Baris sebagaimana DIHITUNG: tanpa pulang di hari yang sudah lewat → status 'alpa' (+ penanda
 * `_tanpaPulang` untuk keterangan). Selain itu baris dikembalikan apa adanya (objek yang sama).
 */
export function barisEfektif(row, wajib, hariIni) {
  if (!tanpaPulang(row, wajib)) return row
  const tgl = String(row.tanggal || '').slice(0, 10)
  if (hariIni && tgl >= hariIni) return row
  return { ...row, status: 'alpa', _tanpaPulang: true }
}

/** Hadir yang SAH untuk dibayar/dihitung: hadir/terlambat dan (bukan shift wajib-pulang atau sudah pulang). */
export function hadirSah(row, wajib) {
  const st = String(row?.status || 'hadir').toLowerCase()
  if (st !== 'hadir' && st !== 'terlambat') return false
  return !tanpaPulang(row, wajib)
}
