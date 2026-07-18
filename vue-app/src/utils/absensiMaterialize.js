// absensiMaterialize — materialisasi baris hadir OTOMATIS untuk "guru gabungan"
// (Bagian B). Aturan: shift TARGET yang punya `hadir_ikut` (mis. Sekolah ← Pagi)
// otomatis "hadir" bila guru pemiliknya sudah hadir/terlambat di salah satu shift
// SUMBER pada tanggal yang sama — sehingga guru gabungan (Qiraati pagi + sekolah)
// cukup 1x scan pagi.
//
// PENTING (uang aman): ini membuat BARIS FISIK biasa (status 'hadir') → fungsi
// hitung bonus hadirPerShiftGuru TIDAK diubah, hanya membaca baris ini.
// IDEMPOTEN & CREATE-ONLY: baris target yang SUDAH ADA (izin/sakit/manual/auto)
// tak pernah disentuh. WAJIB diberi rows PERIODE PENUH & TAK TERFILTER supaya
// pengecekan "sudah ada" akurat (kalau tidak, bisa menimpa baris tersembunyi).
import { shiftList } from './shiftMaster'
import { shiftsForGuru } from './shiftDerive'

// Hitung baris auto (pure, testable). Mengembalikan array objek baris siap-tulis.
export function hitungBarisAutoGabungan(guruList, absensiRows, settings) {
  const list = shiftList(settings || {})
  const targets = list.filter((s) => Array.isArray(s.hadir_ikut) && s.hadir_ikut.length)
  if (!targets.length) return []

  const guruById = new Map((guruList || []).map((g) => [String(g.id), g]))

  // Index keberadaan baris per (guru|tanggal|shift) — dari SEMUA baris periode.
  const ada = new Set()
  for (const a of absensiRows || []) {
    const gid = String(a.guru_id || a.guruId || '')
    const tgl = String(a.tanggal || '')
    const sh = String(a.shift || '').toLowerCase()
    if (gid && tgl && sh) ada.add(gid + '|' + tgl + '|' + sh)
  }

  const out = []
  // Hanya baris SUMBER ber-status hadir/terlambat yang bisa memicu target.
  for (const a of absensiRows || []) {
    const st = String(a.status || 'hadir').toLowerCase()
    if (st !== 'hadir' && st !== 'terlambat') continue
    const gid = String(a.guru_id || a.guruId || '')
    const tgl = String(a.tanggal || '')
    const srcShift = String(a.shift || '').toLowerCase()
    if (!gid || !tgl || !srcShift) continue
    const g = guruById.get(gid)
    if (!g) continue
    const milik = shiftsForGuru(g, settings || {})
    for (const t of targets) {
      if (!t.hadir_ikut.includes(srcShift)) continue // shift ini bukan sumber utk target t
      if (!milik.has(t.id)) continue // guru tak memiliki shift target → lewati
      const keyT = gid + '|' + tgl + '|' + t.id
      if (ada.has(keyT)) continue // sudah ada baris target — JANGAN sentuh (idempoten)
      ada.add(keyT) // cegah dobel bila >1 shift sumber di hari sama
      out.push({
        id: `shift_${gid}_${tgl}_${t.id}`,
        guru_id: gid,
        guru_nama: a.guru_nama || g.nama || '',
        tanggal: tgl,
        periode: tgl.slice(0, 7),
        jam: a.jam || '',
        jam_pulang: '',
        shift: t.id,
        status: 'hadir', // guru gabungan selalu hadir di shift target (keputusan Q6)
        source: 'auto_gabungan'
      })
    }
  }
  return out
}

// Materialisasi + tulis. setOneFn di-inject (mis. setOne dari services/db) agar util
// tetap bebas dependensi Supabase (mudah diuji). Mengembalikan jumlah baris dibuat.
export async function materialisasiHadirIkut(guruList, absensiRows, settings, setOneFn) {
  const baris = hitungBarisAutoGabungan(guruList, absensiRows, settings)
  for (const r of baris) await setOneFn('absensi_shift_guru', r.id, r)
  return baris.length
}
