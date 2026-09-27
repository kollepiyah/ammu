// scanMesin — aturan bersama "deretan scan mesin → baris absensi_shift_guru".
//
// v.1.4.6 gel. 3 (27 Sep 2026): mesin HiView berhenti mengirim sejak 24 Sep 17:44 WIB, dan
// setiap guru yang scan di sana tercatat alpa. Hari yang terlewat hanya bisa ditambal dari
// berkas ekspor mesin — dan berkas itu HARUS diproses dengan aturan yang sama dengan kiriman
// langsung: shift dari jam scan, terlambat dari batas shift, jam pulang dari scan berikutnya.
// Aturan itu sudah ada di sinkron Fingerspot Revo (composables/useFingerprintSync, cermin
// edge function hiview-absen). Pengelompokannya dipindah ke sini apa adanya supaya dua
// pemakai membaca SATU salinan — kalau disalin, suatu saat tambal HiView memilih jam masuk
// yang berbeda dari sinkron Revo, dan selisihnya baru ketahuan di slip bisyaroh.
//
// Yang SENGAJA berbeda hanya kebijakan tulisnya:
//   · sinkron Revo (useFingerprintSync) MENIMPA baris yang ada, kecuali izin/sakit;
//   · tambal (rencanaTambalScan) hanya MENGISI slot yang masih kosong — lihat alasannya di sana.
//
// Semua fungsi PURE: tanpa Supabase, tanpa store.

import { deriveShift, statusFor, shiftsForGuru, pilihShiftPulang } from './shiftDerive'
import { hitungBarisAutoGabungan } from './absensiMaterialize'

/** Timestamp 'YYYY-MM-DD HH:MM[:SS]' (WIB lokal, tanpa zona) → { date, hhmm, full }. */
export function pisahWaktuScan(ts) {
  const m = String(ts || '')
    .trim()
    .match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}):(\d{2})/)
  if (!m) return null
  return { date: m[1], hhmm: m[2] + ':' + m[3], full: String(ts).trim() }
}

/**
 * Diagnosa "absen guru X tidak masuk" (Kyai, 5 Agu 2026).
 *
 * Scan yang tak jatuh di window shift mana pun dibuang dari pass MASUK. Selama itu
 * cuma dihitung sebagai angka `luar`, tak ada cara tahu guru mana yang absennya
 * hilang. Fungsi ini menyaring kasus yang BENAR-BENAR bermasalah: (pin, tanggal)
 * yang punya scan di luar window TAPI nol baris masuk — sebab tanpa baris masuk,
 * jam_pulang pun tak punya tempat menempel, jadi harinya kosong sama sekali.
 *
 * (pin, tanggal) yang punya baris masuk TIDAK dilaporkan: di sana scan "di luar
 * window" itu normal — itu ceklok pulang.
 *
 * @param {object} luarPer  pin|date -> { nama, guru, date, times[] }
 * @param {string[]} aggKeys kunci pass masuk, bentuk 'pin|date|shift'
 * @param {(guru:object)=>string[]} shiftsOf resolver shift milik guru
 * @param {number} batas maksimal baris yang dikembalikan
 * @returns {{ daftar: object[], lebih: number }}
 */
export function hitungScanTanpaAbsen(luarPer, aggKeys, shiftsOf, batas = 100) {
  const adaMasuk = new Set()
  for (const key of aggKeys || []) {
    const p = String(key).split('|')
    if (p.length >= 2) adaMasuk.add(p[0] + '|' + p[1])
  }
  const daftar = Object.keys(luarPer || {})
    .filter((lk) => !adaMasuk.has(lk))
    .map((lk) => {
      const v = luarPer[lk]
      const shiftGuru = [...(shiftsOf(v.guru) || [])]
      return {
        nama: v.nama,
        tanggal: v.date,
        jam: [...v.times].sort(),
        shiftGuru,
        // Shift kosong = sebabnya PASTI konfigurasi guru, bukan jam mesin.
        sebab: shiftGuru.length ? 'jam di luar window shift' : 'guru belum punya shift'
      }
    })
    .sort(
      (a, b) => String(a.tanggal).localeCompare(String(b.tanggal)) || a.nama.localeCompare(b.nama)
    )
  return { daftar: daftar.slice(0, batas), lebih: Math.max(0, daftar.length - batas) }
}

/**
 * Kelompokkan scan mentah: per (pin, tanggal, shift) scan TERAWAL = jam masuk. SEMUA scan
 * lain hari itu jadi kandidat PULANG per (pin, tanggal) — baik yang di luar window masuk
 * MAUPUN yang masih di dalam window shift-nya sendiri (pulang sebelum shift bubar). Dulu yang
 * kedua dibuang diam-diam, itulah asal baris "belum pulang" padahal gurunya sudah ceklok
 * pulang (Kyai, 22 Jul 2026).
 *
 * @param {Array<{device_pin:string, timestamp:string}>} scans timestamp WIB 'YYYY-MM-DD HH:MM:SS'
 * @param {Array<object>} guruList semua guru — PIN dicocokkan ke `id_fingerprint`
 * @param {object} settings
 * @returns {{ agg: object, pulangScans: object, takKenal: Set<string>, luar: number,
 *   luarPer: object }}
 */
export function kelompokkanScan(scans, guruList, settings) {
  const byPin = {}
  for (const g of guruList || []) {
    const pin = String(g.id_fingerprint || '').trim()
    if (pin) byPin[pin] = g
  }
  const agg = {}
  const pulangScans = {} // pin|date -> { g, date, times:[hhmm] }
  const takKenal = new Set()
  let luar = 0
  // Diagnosa "absen guru X tidak masuk" (Kyai, 5 Agu 2026): scan yang tak jatuh di window
  //   shift mana pun dulu cuma jadi ANGKA `luar`. Sekarang dicatat per (pin, tanggal).
  const luarPer = {} // pin|date -> { nama, guru, date, times:[hhmm] }
  const catatKandidatPulang = (pin, g, date, hhmm) => {
    const pk = pin + '|' + date
    if (!pulangScans[pk]) pulangScans[pk] = { g, date, times: [] }
    pulangScans[pk].times.push(hhmm)
  }
  for (const r of scans || []) {
    const pin = String(r.device_pin || '').trim()
    const parts = pisahWaktuScan(r.timestamp)
    if (!pin || !parts) continue
    const g = byPin[pin]
    if (!g) {
      takKenal.add(pin)
      continue
    }
    const sh = deriveShift(parts.hhmm, g, settings)
    if (!sh) {
      luar++
      const lk = pin + '|' + parts.date
      if (!luarPer[lk]) luarPer[lk] = { nama: g.nama || pin, guru: g, date: parts.date, times: [] }
      luarPer[lk].times.push(parts.hhmm)
      catatKandidatPulang(pin, g, parts.date, parts.hhmm)
      continue
    }
    const key = pin + '|' + parts.date + '|' + sh
    if (!(key in agg)) {
      agg[key] = { g, sh, date: parts.date, hhmm: parts.hhmm, full: parts.full }
      continue
    }
    if (parts.full < agg[key].full) {
      // scan ini lebih awal → jadi jam masuk; yang lama turun jadi kandidat pulang.
      catatKandidatPulang(pin, g, parts.date, agg[key].hhmm)
      agg[key] = { g, sh, date: parts.date, hhmm: parts.hhmm, full: parts.full }
    } else {
      catatKandidatPulang(pin, g, parts.date, parts.hhmm)
    }
  }
  return { agg, pulangScans, takKenal, luar, luarPer }
}

/** Id baris absensi_shift_guru — bentuk yang sama di SEMUA penulis (mesin, impor, manual). */
export function idBarisShift(guruId, tanggal, shift) {
  return 'shift_' + guruId + '_' + tanggal + '_' + shift
}

/**
 * Pisahkan scan menurut rentang tanggal yang mau ditambal.
 * Scan bertanggal SESUDAH hari ini disisihkan tersendiri: jam mesin yang melompat ke depan
 * akan melahirkan kehadiran di hari yang belum terjadi.
 *
 * @returns {{ dipakai: object[], luarRentang: number, masaDepan: number }}
 */
export function saringScan(scans, { dari = '', sampai = '', hariIni = '' } = {}) {
  const dipakai = []
  let luarRentang = 0
  let masaDepan = 0
  for (const s of scans || []) {
    const p = pisahWaktuScan(s.timestamp)
    if (!p) continue
    if (hariIni && p.date > hariIni) {
      masaDepan++
      continue
    }
    if ((dari && p.date < dari) || (sampai && p.date > sampai)) {
      luarRentang++
      continue
    }
    dipakai.push(s)
  }
  return { dipakai, luarRentang, masaDepan }
}

/**
 * Rencana TAMBAL dari scan yang sudah dikelompokkan: buat baris yang BELUM ada saja.
 *
 * Beda dengan sinkron Revo yang menimpa (kecuali izin/sakit). Berkas ekspor dipakai untuk
 * menambal hari yang terlewat, dan hari itu hampir pasti sudah disentuh tangan: Kyai
 * memperbaiki sel satu per satu, izin/cuti sudah diajukan, dan mesin kedua (Revo) mengisi
 * sebagian. Menimpa semua itu berarti keputusan manusia kalah oleh berkas — jadi baris yang
 * sudah ada DIBIARKAN, apa pun sumbernya, dan dilaporkan supaya bisa diperiksa.
 *
 * Yang tetap dikerjakan seperti kiriman langsung:
 *   · jam pulang (pilihShiftPulang, MAX) — menempel ke baris baru (langsung di isinya) atau ke
 *     baris lama berstatus hadir/terlambat yang jam pulangnya kosong / lebih awal. Itu HANYA
 *     mencatat — status & jam masuknya tak disentuh;
 *   · baris "hadir sekolah" guru gabungan (hadir_ikut) untuk baris baru — aturan yang sama
 *     dengan materialisasi di layar (utils/absensiMaterialize), supaya matriks langsung utuh.
 *
 * Aman diulang: jalan kedua atas berkas yang sama tak menghasilkan apa pun.
 *
 * @param {object} p
 * @param {object} p.kelompok hasil kelompokkanScan
 * @param {Array<object>} p.ada baris absensi_shift_guru yang sudah ada (bentuk aplikasi) —
 *   WAJIB mencakup semua tanggal di kelompok, supaya "sudah ada" tak salah dinilai
 * @param {Array<object>} p.guruAktif untuk baris guru gabungan
 * @param {object} p.settings
 * @param {string} p.sumber `source` baris baru (mis. 'hiview_impor')
 * @param {string} p.waktu ISO saat impor (`imported_at`)
 * @returns {{ baru: object[], pulang: object[], gabungan: object[], lewat: object[],
 *   perTanggal: Record<string, {baru:number, pulang:number, gabungan:number, lewat:number}> }}
 */
export function rencanaTambalScan({ kelompok, ada, guruAktif, settings, sumber, waktu }) {
  const adaById = new Map()
  for (const r of ada || []) if (r && r.id) adaById.set(String(r.id), r)
  const baruById = new Map()
  const lewat = []
  const perTanggal = {}
  const hitung = (tgl, k) => {
    if (!perTanggal[tgl]) perTanggal[tgl] = { baru: 0, pulang: 0, gabungan: 0, lewat: 0 }
    perTanggal[tgl][k]++
  }

  for (const a of Object.values(kelompok?.agg || {})) {
    const id = idBarisShift(a.g.id, a.date, a.sh)
    const lama = adaById.get(id)
    if (lama) {
      lewat.push({
        id,
        nama: a.g.nama || '',
        tanggal: a.date,
        shift: a.sh,
        jamScan: a.hhmm,
        status: String(lama.status || ''),
        sumber: String(lama.source || '')
      })
      hitung(a.date, 'lewat')
      continue
    }
    baruById.set(id, {
      id,
      guru_id: String(a.g.id),
      guru_nama: a.g.nama || '',
      tanggal: a.date,
      periode: a.date.slice(0, 7),
      jam: a.hhmm,
      shift: a.sh,
      status: statusFor(a.hhmm, a.sh, settings),
      source: sumber,
      imported_at: waktu
    })
    hitung(a.date, 'baru')
  }

  // ── Jam pulang: sama dengan pass PULANG sinkron Revo & catatPulang edge function.
  const pulang = []
  for (const { g, date, times } of Object.values(kelompok?.pulangScans || {})) {
    const shiftRows = {}
    const barisMasuk = []
    for (const sh of shiftsForGuru(g, settings)) {
      const id = idBarisShift(g.id, date, sh)
      const row = baruById.get(id) || adaById.get(id)
      if (!row) continue
      shiftRows[sh] = { id, row, baru: baruById.has(id) }
      barisMasuk.push({ shift: sh, jam: String(row.jam || ''), status: row.status })
    }
    const perShiftMax = {}
    for (const hhmm of times) {
      for (const sh of pilihShiftPulang(hhmm, barisMasuk, settings)) {
        if (!shiftRows[sh]) continue
        if (!perShiftMax[sh] || hhmm > perShiftMax[sh]) perShiftMax[sh] = hhmm
      }
    }
    for (const [sh, jamPulang] of Object.entries(perShiftMax)) {
      const { id, row, baru } = shiftRows[sh]
      const exPulang = String(row.jam_pulang || '')
      if (exPulang && exPulang >= jamPulang) continue // sudah ada pulang lebih akhir
      if (baru) {
        row.jam_pulang = jamPulang
        continue
      }
      pulang.push({ id, nama: g.nama || '', tanggal: date, shift: sh, jam_pulang: jamPulang })
      hitung(date, 'pulang')
    }
  }

  // ── Guru gabungan: hanya untuk (guru, tanggal) yang barisnya baru lahir dari berkas ini —
  //   sisanya urusan materialisasi di layar, bukan impor.
  const baru = [...baruById.values()]
  const lahir = new Set(baru.map((r) => r.guru_id + '|' + r.tanggal))
  const gabungan = hitungBarisAutoGabungan(guruAktif, [...(ada || []), ...baru], settings).filter(
    (r) => lahir.has(String(r.guru_id) + '|' + r.tanggal) && !adaById.has(r.id)
  )
  for (const r of gabungan) hitung(r.tanggal, 'gabungan')

  return { baru, pulang, gabungan, lewat, perTanggal }
}
