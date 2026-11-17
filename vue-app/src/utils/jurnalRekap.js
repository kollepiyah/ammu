// jurnalRekap — rekap Jurnal Pondok Laju selama SATU BULAN.
//
// Kyai 17 Nov 2026: "saya ingin jurnal itu ada rekapannya selama satu bulan, bisa ekspor pdf."
// Tab Riwayat sudah memajang jurnal per kelas per bulan, tapi hanya sebagai daftar sesi — tak
// ada angka yang bisa dibaca sekali lihat (berapa sesi berjalan, kelas mana yang tertinggal,
// sejauh mana bacaannya maju), dan tak bisa dibawa ke kertas.
//
// PURE: masukannya baris `pondok_laju_capaian` apa adanya. Layar dan PDF membaca rekap yang
// SAMA, jadi angka di kertas tak mungkin berbeda dari angka di layar — kelas bug "cermin yang
// berpisah" yang paling sering menggigit di repo ini.
import { teksPosisi, labelSesi } from './pondokLajuSesi'

const URUT_SESI = { tadarus: 0, laju1: 1, laju2: 2 }
const _n = (v) => {
  const x = Number(v)
  return Number.isFinite(x) && x > 0 ? x : 0
}

/** Urut maju: tanggal lalu sesi (Tadarus → Laju 1 → Laju 2) — arah bacaan bertambah. */
function urutMaju(rows) {
  return [...(rows || [])].sort(
    (a, b) =>
      String(a?.tanggal || '').localeCompare(String(b?.tanggal || '')) ||
      (URUT_SESI[a?.sesi] ?? 9) - (URUT_SESI[b?.sesi] ?? 9)
  )
}

/**
 * Satu baris per SESI yang tercatat (tanggal × sesi × kelas) — tulang punggung rincian PDF.
 * `posisi` 'beragam' kalau santri sekelas tak seragam; itu tanda ada yang diisi per anak di
 * luar metode baca-bersama, bukan keadaan normal.
 */
export function sesiJurnalBulan(rows) {
  const peta = new Map()
  for (const r of rows || []) {
    if (!r) continue
    const kelas = String(r.kelas_key || '')
    const key = `${r.tanggal}|${r.sesi}|${kelas}`
    let g = peta.get(key)
    if (!g)
      peta.set(key, (g = { key, tanggal: r.tanggal, sesi: r.sesi, kelasKey: kelas, rows: [] }))
    g.rows.push(r)
  }
  return [...peta.values()]
    .map((g) => {
      const teks = [...new Set(g.rows.map((x) => teksPosisi(x)))]
      const catatan = [...new Set(g.rows.map((x) => String(x.catatan || '').trim()))].filter(
        Boolean
      )
      const pencatat = [...new Set(g.rows.map((x) => String(x.guru_nama || '').trim()))].filter(
        Boolean
      )
      return {
        key: g.key,
        tanggal: g.tanggal,
        sesi: g.sesi,
        sesiLabel: labelSesi(g.sesi),
        kelasKey: g.kelasKey,
        nSantri: new Set(g.rows.map((x) => String(x.santri_id))).size,
        posisi: teks.length === 1 ? teks[0] : 'beragam',
        halaman: _n(g.rows[0]?.halaman),
        catatan: catatan.join(' · '),
        pencatat: pencatat.join(', ')
      }
    })
    .sort(
      (a, b) =>
        String(a.tanggal).localeCompare(String(b.tanggal)) ||
        (URUT_SESI[a.sesi] ?? 9) - (URUT_SESI[b.sesi] ?? 9) ||
        String(a.kelasKey).localeCompare(String(b.kelasKey), 'id')
    )
}

/**
 * Rekap per KELAS: berapa sesi berjalan, berapa hari, dari posisi mana ke mana.
 * `kelasList` hanya untuk melabeli (nama guru & juz); kelas yang bulan itu tak punya satu pun
 * catatan TETAP dimunculkan dengan nol — justru itu yang perlu dilihat Kyai.
 */
export function kelasJurnalBulan(rows, { kelasList = [] } = {}) {
  const perKelas = new Map()
  for (const k of kelasList || []) {
    perKelas.set(k.key, {
      key: k.key,
      guru: k.guru || '',
      juz: k.juz || '',
      nSantriKelas: k.santri?.length || 0,
      rows: []
    })
  }
  for (const r of rows || []) {
    const key = String(r?.kelas_key || '')
    let g = perKelas.get(key)
    if (!g) perKelas.set(key, (g = { key, guru: '', juz: '', nSantriKelas: 0, rows: [] }))
    g.rows.push(r)
  }
  return [...perKelas.values()]
    .map((g) => {
      const maju = urutMaju(g.rows)
      const awal = maju[0] || null
      const akhir = maju[maju.length - 1] || null
      const hal0 = _n(awal?.halaman)
      const hal1 = _n(akhir?.halaman)
      return {
        key: g.key,
        guru: g.guru,
        juz: g.juz,
        nSantriKelas: g.nSantriKelas,
        nSesi: new Set(g.rows.map((r) => `${r.tanggal}|${r.sesi}`)).size,
        nHari: new Set(g.rows.map((r) => r.tanggal)).size,
        nSantriTercatat: new Set(g.rows.map((r) => String(r.santri_id))).size,
        awal: awal ? teksPosisi(awal) : '',
        akhir: akhir ? teksPosisi(akhir) : '',
        tglAwal: awal?.tanggal || '',
        tglAkhir: akhir?.tanggal || '',
        // Kemajuan halaman, 0 kalau salah satu ujungnya tak berhalaman. Mundur dibiarkan
        // negatif — murojaah memang mundur, dan menyembunyikannya malah menipu.
        majuHalaman: hal0 && hal1 ? hal1 - hal0 : 0
      }
    })
    .sort(
      (a, b) =>
        b.nSesi - a.nSesi || String(a.guru || a.key).localeCompare(String(b.guru || b.key), 'id')
    )
}

/**
 * Rekap sebulan: ringkasan + per kelas + per sesi.
 * @param {Array} rows baris `pondok_laju_capaian` satu `periode`
 * @param {object} [opt]
 * @param {Array} [opt.kelasList] hasil `kelasPondokLaju(santri)` — untuk label & kelas nol
 * @param {string} [opt.bulan] 'YYYY-MM' (dibawa apa adanya ke hasil)
 */
export function rekapJurnalBulan(rows, { kelasList = [], bulan = '' } = {}) {
  const sesi = sesiJurnalBulan(rows)
  const kelas = kelasJurnalBulan(rows, { kelasList })
  const perSesiJenis = {}
  for (const s of sesi) perSesiJenis[s.sesi] = (perSesiJenis[s.sesi] || 0) + 1
  return {
    bulan,
    sesi,
    kelas,
    total: {
      nSesi: sesi.length,
      nHari: new Set(sesi.map((s) => s.tanggal)).size,
      nKelasAktif: kelas.filter((k) => k.nSesi > 0).length,
      nKelasKosong: kelas.filter((k) => k.nSesi === 0).length,
      nSantri: new Set((rows || []).map((r) => String(r?.santri_id))).size,
      perSesiJenis
    }
  }
}
