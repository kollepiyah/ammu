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
import { shiftsForGuru, shiftWindow } from './shiftDerive'
// v.1.5.0: sumber "hadir ikut" harus hadir SAH (shift wajib-pulang butuh jam pulang).
import { shiftWajibPulang, hadirSah } from './absenPulang'

// Hitung baris auto (pure, testable). Mengembalikan array objek baris siap-tulis.
// v.1.5.0 (Kyai 16 Nov 2026): `shiftHarian(g, tgl)` opsional — shift yang dimiliki guru HANYA hari
//   itu (Pondok Laju). "Guru yang mendapat jadwal Laju 2, absen shift sorenya otomatis ikut Laju 2":
//   Kyai mengisi "hadir ikut" shift Laju 2 = shift sore, dan ini berlaku pada tanggal terjadwal saja.
export function hitungBarisAutoGabungan(guruList, absensiRows, settings, shiftHarian) {
  const list = shiftList(settings || {})
  const targets = list.filter((s) => Array.isArray(s.hadir_ikut) && s.hadir_ikut.length)
  if (!targets.length) return []

  const guruById = new Map((guruList || []).map((g) => [String(g.id), g]))

  // Index keberadaan baris per (guru|tanggal|shift) — dari SEMUA baris periode.
  const ada = new Set()
  const adaBaris = new Map()
  for (const a of absensiRows || []) {
    const gid = String(a.guru_id || a.guruId || '')
    const tgl = String(a.tanggal || '')
    const sh = String(a.shift || '').toLowerCase()
    if (gid && tgl && sh) {
      ada.add(gid + '|' + tgl + '|' + sh)
      adaBaris.set(gid + '|' + tgl + '|' + sh, a)
    }
  }
  const wajib = shiftWajibPulang(settings)

  const out = []
  const disusul = new Set()
  // Hanya baris SUMBER yang hadir SAH (hadir/terlambat; shift wajib-pulang → sudah pulang).
  for (const a of absensiRows || []) {
    if (!hadirSah(a, wajib)) continue
    const gid = String(a.guru_id || a.guruId || '')
    const tgl = String(a.tanggal || '')
    const srcShift = String(a.shift || '').toLowerCase()
    if (!gid || !tgl || !srcShift) continue
    const g = guruById.get(gid)
    if (!g) continue
    const milik = shiftsForGuru(g, settings || {})
    if (typeof shiftHarian === 'function') for (const id of shiftHarian(g, tgl) || []) milik.add(id)
    for (const t of targets) {
      if (!t.hadir_ikut.includes(srcShift)) continue // shift ini bukan sumber utk target t
      if (!milik.has(t.id)) continue // guru tak memiliki shift target → lewati
      const keyT = gid + '|' + tgl + '|' + t.id
      const pulangSumber = String(a.jam_pulang || '').trim()
      if (ada.has(keyT)) {
        // v.1.5.0: baris otomatis yang lahir SEBELUM sumbernya pulang menyusul jam pulangnya —
        //   tanpa itu shift target wajib-pulang (mis. Sekolah ikut Pagi) jadi alpa. Hanya baris
        //   buatan sistem ('auto_gabungan') yang disentuh; baris lain tetap tak pernah ditimpa.
        const lama = adaBaris.get(keyT)
        if (
          lama &&
          String(lama.source || '') === 'auto_gabungan' &&
          pulangSumber &&
          !String(lama.jam_pulang || '').trim() &&
          !disusul.has(keyT)
        ) {
          disusul.add(keyT)
          out.push({ ...lama, jam_pulang: pulangSumber })
        }
        continue // sudah ada baris target — selain susulan pulang, JANGAN sentuh (idempoten)
      }
      ada.add(keyT) // cegah dobel bila >1 shift sumber di hari sama
      out.push({
        id: `shift_${gid}_${tgl}_${t.id}`,
        guru_id: gid,
        guru_nama: a.guru_nama || g.nama || '',
        tanggal: tgl,
        periode: tgl.slice(0, 7),
        jam: a.jam || '',
        // v.1.5.0: ikut jam pulang sumbernya — hadir ikut = hadir pada jam yang sama.
        jam_pulang: pulangSumber,
        shift: t.id,
        status: 'hadir', // guru gabungan selalu hadir di shift target (keputusan Q6)
        source: 'auto_gabungan'
      })
    }
  }
  return out
}

const _menit = (hhmm) => {
  const m = /^(\d{1,2}):(\d{2})/.exec(String(hhmm || '').trim())
  return m ? Number(m[1]) * 60 + Number(m[2]) : null
}

/**
 * v.1.5.0 (Kyai 16 Nov 2026): hadir Laju dari JAM PULANG. "Guru sudah scan pagi ketika masuk,
 * setelah Laju 1 dia pulang … yang scan pulang pada waktu itu dihitung hadir Laju 1." Untuk tiap
 * shift Pondok Laju yang aktif bagi guru pada tanggal itu (`shiftHarian`), bila ia belum punya
 * baris di shift itu tapi punya jam pulang (di shift mana pun) yang jatuh di jam shift Laju
 * tersebut (Master Shift, termasuk toleransi) → baris hadir otomatis 'auto_pulang_laju'.
 */
export function hitungBarisLajuDariPulang(guruList, absensiRows, settings, shiftHarian) {
  if (typeof shiftHarian !== 'function') return []
  const guruById = new Map((guruList || []).map((g) => [String(g.id), g]))
  const ada = new Set()
  const perHari = new Map()
  for (const a of absensiRows || []) {
    const gid = String(a.guru_id || a.guruId || '')
    const tgl = String(a.tanggal || '').slice(0, 10)
    const sh = String(a.shift || '').toLowerCase()
    if (!gid || !tgl) continue
    if (sh) ada.add(gid + '|' + tgl + '|' + sh)
    const k = gid + '|' + tgl
    if (!perHari.has(k)) perHari.set(k, [])
    perHari.get(k).push(a)
  }
  const out = []
  for (const [k, rows] of perHari) {
    const [gid, tgl] = k.split('|')
    const g = guruById.get(gid)
    if (!g) continue
    for (const L of shiftHarian(g, tgl) || []) {
      if (ada.has(gid + '|' + tgl + '|' + L)) continue
      const w = shiftWindow(L, settings || {})
      const dari = _menit(w.mulai)
      const sampai = _menit(w.selesai)
      if (dari == null || sampai == null) continue
      const lo = dari - (Number(w.tolAwal) || 0)
      const hi = sampai + (Number(w.tolTelat) || 0)
      let pulang = ''
      for (const r of rows) {
        const st = String(r.status || 'hadir').toLowerCase()
        if (st !== 'hadir' && st !== 'terlambat') continue
        const jp = String(r.jam_pulang || '').trim()
        const m = _menit(jp)
        if (m == null || m < lo || m > hi) continue
        if (!pulang || jp > pulang) pulang = jp
      }
      if (!pulang) continue
      ada.add(gid + '|' + tgl + '|' + L)
      out.push({
        id: `shift_${gid}_${tgl}_${L}`,
        guru_id: gid,
        guru_nama: g.nama || '',
        tanggal: tgl,
        periode: tgl.slice(0, 7),
        jam: pulang,
        jam_pulang: pulang,
        shift: L,
        status: 'hadir',
        source: 'auto_pulang_laju'
      })
    }
  }
  return out
}

// Materialisasi + tulis. setOneFn di-inject (mis. setOne dari services/db) agar util
// tetap bebas dependensi Supabase (mudah diuji). Mengembalikan jumlah baris dibuat/disusul.
// v.1.5.0: + hadir Laju dari jam pulang (hitungBarisLajuDariPulang) bila `shiftHarian` diberikan.
export async function materialisasiHadirIkut(
  guruList,
  absensiRows,
  settings,
  setOneFn,
  shiftHarian
) {
  const gabungan = hitungBarisAutoGabungan(guruList, absensiRows, settings, shiftHarian)
  const sudah = new Set(gabungan.map((r) => r.id))
  const laju = hitungBarisLajuDariPulang(guruList, absensiRows, settings, shiftHarian).filter(
    (r) => !sudah.has(r.id)
  )
  const baris = [...gabungan, ...laju]
  for (const r of baris) await setOneFn('absensi_shift_guru', r.id, r)
  return baris.length
}
