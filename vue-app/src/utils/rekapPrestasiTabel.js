// rekapPrestasiTabel — SUMBER TUNGGAL bentuk tabel Rekap Prestasi bulanan:
// barisnya, urutannya, pengelompokannya per guru, dan pemisahannya per PJ PTPT.
//
// Kyai, 4 Sep 2026, dua permintaan yang jatuh di tempat yang sama:
//   · *"untuk ekspor PDF rekap prestasi bulanan, saya ingin bisa dipisah per PJ PTPT. dan
//     format tabelnya ekspornya berisi: No, Nama Santri, Kelas PTPT, Juz, Awal Bulan,
//     Akhir Bulan, Total Capaian, Nama Guru. dan diurutkan dari yg terbanyak total
//     capaiannya kemudian dari juz yg tertinggi."*
//   · *"di menu rekap prestasi, nama guru kosong padahal semua santri PTPT sudah punya
//     guru. dan di rekap kelompokkan per guru."*
//
// KENAPA NAMA GURUNYA KOSONG. Layar itu membaca `santri.guru` — field TUNGGAL peninggalan
// sebelum ada pasangan pagi/sore. Sejak v.1.1.9 pengampu yang sebenarnya tersimpan di
// `guru_pagi`/`guru_sore`, dan `guru` cuma cermin yang boleh ketinggalan; di PTPT ia
// memang sering kosong. Jadi bukan datanya yang hilang — pembacanya yang menengok kolom
// yang salah. Aturan "siapa pengampu satu santri" TIDAK ditulis ulang di sini: ia diambil
// dari `pasanganSantri`/`labelPasanganRingkas` (utils/pasanganGuru), yang sudah jadi
// sumber tunggal sejak kartu dasbor "Guru Belum Input".
//
// KENAPA PENGELOMPOKANNYA DULU BERANTAKAN. Grup lama dibentuk RUN-LENGTH: daftar diurut
// lembaga→kelas→usia, lalu tiap kali `lembaga|kelas|guru` berganti dibuka grup baru.
// Karena urutannya tak pernah menyertakan guru, satu guru pecah jadi belasan grup dan
// judul grup berulang-ulang — persis yang tampak di layar Kyai. Sekarang santri
// dikumpulkan ke petanya dulu, baru grupnya diurutkan.
//
// Semua fungsi PURE: tak menyentuh store, DB, maupun Vue.
import { extractNumber } from './format'
import { pasanganSantri, kunciPasangan, labelPasanganRingkas } from './pasanganGuru'
import { labelJenjang } from './jenjangQiraati'
import { lembagaRank, kelasRank } from './santriSort'

/** Judul kolom ekspor — urutan & nama persis permintaan Kyai (4 Sep 2026). */
export const KOLOM_REKAP_PRESTASI = [
  { key: 'no', header: 'No', lebar: 26, lebarXlsx: 6 },
  { key: 'nama', header: 'Nama Santri', lebar: 150, lebarXlsx: 30 },
  { key: 'kelas', header: 'Kelas PTPT', lebar: 70, lebarXlsx: 12 },
  { key: 'juz', header: 'Juz', lebar: 45, lebarXlsx: 8 },
  { key: 'awal', header: 'Awal Bulan', lebar: 62, lebarXlsx: 12 },
  { key: 'akhir', header: 'Akhir Bulan', lebar: 62, lebarXlsx: 12 },
  { key: 'total', header: 'Total Capaian', lebar: 70, lebarXlsx: 14 },
  { key: 'guru', header: 'Nama Guru', lebar: 150, lebarXlsx: 30 }
]

const _txt = (v) => (v === undefined || v === null ? '' : String(v).trim())

/** Label PJ untuk yang tak terpetakan. Dipakai judul bagian & nama berkas. */
export const TANPA_PJ = 'Tanpa PJ'

/**
 * Pengampu satu santri sebagai teks siap tampil ('Bu A & Bu B', atau nama tunggal).
 * '' hanya bila santri itu memang tak punya guru sama sekali di ketiga fieldnya.
 */
export function guruSantri(s) {
  return labelPasanganRingkas(pasanganSantri(s))
}

/**
 * Satu baris tabel rekap.
 *
 * @param {object} s        baris santri.
 * @param {object} [opts]
 * @param {object} [opts.nilai]       angka BULAN TERPILIH { awal, akhir, total, juz } —
 *   biarkan kosong dan baris santri yang dipakai. Sengaja di-pass, bukan diambil sendiri:
 *   grid boleh punya suntingan yang belum tersimpan, dan ekspor wajib mengikutinya.
 * @param {Array}  [opts.lembagaList] master/lembaga, untuk label kelas kanonik.
 * @param {string} [opts.pj]          nama PJ efektif santri ini ('' = tak terpetakan).
 */
export function barisRekapPrestasi(s, opts = {}) {
  const { nilai = {}, lembagaList = [], pj = '' } = opts
  const lembaga = _txt(s?.lembaga)
  const isPtpt = lembaga.toLowerCase() === 'ptpt'
  const awal = _txt(nilai.awal !== undefined ? nilai.awal : s?.prestasi_awal)
  const akhir = _txt(nilai.akhir !== undefined ? nilai.akhir : s?.prestasi_akhir)
  const juz = _txt(nilai.juz !== undefined ? nilai.juz : s?.juz)
  // PTPT: total SELALU turunan akhir − awal (cermin grid & simpanRekap). Lembaga lain
  // mengisinya manual, jadi angkanya dipakai apa adanya.
  const totalTeks = _txt(nilai.total !== undefined ? nilai.total : s?.prestasi_total)
  const totalNum = isPtpt
    ? Math.max(0, extractNumber(akhir) - extractNumber(awal))
    : extractNumber(totalTeks)
  return {
    id: String(s?.id ?? ''),
    nama: _txt(s?.nama),
    jk: _txt(s?.jk),
    lembaga,
    kelas: labelJenjang(lembaga, s?.kelas, lembagaList),
    juz: extractNumber(juz) ? String(extractNumber(juz)) : '',
    juzNum: extractNumber(juz),
    awal,
    akhir,
    total: isPtpt ? (totalNum > 0 ? `${totalNum} Hal` : '') : totalTeks,
    totalNum,
    guru: guruSantri(s),
    kunciGuru: kunciPasangan(pasanganSantri(s)),
    pj: _txt(pj)
  }
}

/**
 * Urutan yang Kyai minta: total capaian TERBANYAK dulu, lalu JUZ TERTINGGI.
 *
 * Tie-breaker ketiga = nama A–Z. Bukan hiasan: tanpa pembanding terakhir yang stabil,
 * dua santri yang total & juz-nya sama akan bertukar posisi tiap kali daftar dirakit
 * ulang, dan PDF yang dicetak dua kali di hari yang sama jadi tak sama isinya.
 */
export function urutkanRekapPrestasi(rows) {
  return [...(rows || [])].sort(
    (a, b) =>
      (b.totalNum || 0) - (a.totalNum || 0) ||
      (b.juzNum || 0) - (a.juzNum || 0) ||
      String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
  )
}

/**
 * Kelompokkan per GURU (pasangan), tiap kelompok terurut sesuai aturan di atas.
 * Kelompok tanpa guru dikumpulkan jadi SATU di paling bawah — bukan dibuang: santri PTPT
 * tanpa pengampu justru yang paling perlu terlihat.
 *
 * Urutan kelompok: lembaga → kelas terendah yang diampunya → nama guru. Kelas dipakai
 * supaya guru kelas 1 tak terselip di antara guru kelas 6 hanya karena namanya berawalan A.
 */
export function kelompokPerGuru(rows, opts = {}) {
  // `urut`: 'capaian' (default, untuk ekspor & cetak) atau 'tetap' (urutan masuk).
  //
  // Grid isian WAJIB memakai 'tetap'. Kalau barisnya diurut capaian di layar input,
  // barisnya melompat sendiri tiap kali sebuah angka diketik — santri yang sedang diisi
  // pindah tempat di tengah pengetikan. Urutan capaian itu permintaan untuk EKSPOR
  // ("diurutkan dari yg terbanyak total capaiannya"), bukan untuk mengisi.
  const urut = opts.urut === 'tetap' ? (x) => [...x] : urutkanRekapPrestasi
  const per = new Map()
  for (const r of rows || []) {
    const key = r.kunciGuru || '￿' // tanpa guru → selalu di ujung
    let g = per.get(key)
    if (!g) {
      g = {
        key,
        guru: r.guru || '',
        lembaga: r.lembaga || '',
        kelas: r.kelas || '',
        _rankLembaga: lembagaRank(r.lembaga),
        _rankKelas: kelasRank(r.kelas),
        rows: []
      }
      per.set(key, g)
    }
    // Kelompok bisa memuat lebih dari satu kelas (satu rombel campur jenjang memang
    // lazim di sini) — yang dipakai mengurutkan & memberi judul adalah yang TERENDAH.
    const rk = kelasRank(r.kelas)
    if (rk < g._rankKelas) {
      g._rankKelas = rk
      g.kelas = r.kelas || ''
    }
    g.rows.push(r)
  }
  return [...per.values()]
    .map((g) => ({ ...g, rows: urut(g.rows), jumlah: g.rows.length }))
    .sort(
      (a, b) =>
        (a.guru ? 0 : 1) - (b.guru ? 0 : 1) ||
        a._rankLembaga - b._rankLembaga ||
        a._rankKelas - b._rankKelas ||
        String(a.guru || '').localeCompare(String(b.guru || ''), 'id')
    )
}

/**
 * Pisahkan per PJ PTPT — satu bagian per PJ, tiap bagian sudah berkelompok per guru.
 * Santri yang PJ-nya tak terpetakan masuk satu bagian `TANPA_PJ` di paling akhir.
 */
export function kelompokPerPj(rows) {
  const per = new Map()
  for (const r of rows || []) {
    const key = r.pj || TANPA_PJ
    if (!per.has(key)) per.set(key, [])
    per.get(key).push(r)
  }
  return [...per.entries()]
    .map(([pj, list]) => ({
      pj,
      jumlah: list.length,
      rows: urutkanRekapPrestasi(list),
      grup: kelompokPerGuru(list)
    }))
    .sort(
      (a, b) =>
        (a.pj === TANPA_PJ ? 1 : 0) - (b.pj === TANPA_PJ ? 1 : 0) || a.pj.localeCompare(b.pj, 'id')
    )
}

/** Daftar nama PJ yang benar-benar ada di baris-baris ini (untuk isi dropdown). */
export function daftarPj(rows) {
  const set = new Set()
  for (const r of rows || []) if (r.pj) set.add(r.pj)
  return [...set].sort((a, b) => a.localeCompare(b, 'id'))
}

/**
 * Baris siap-cetak: penomoran ulang mulai 1 + nilai kosong jadi '-'.
 * Nomornya sengaja diberikan DI SINI, bukan saat baris dibentuk — kalau tidak, memisah
 * per PJ akan mewarisi nomor daftar gabungan dan tiap PDF mulai dari angka acak.
 */
export function barisCetak(rows) {
  return (rows || []).map((r, i) => ({
    no: i + 1,
    nama: r.nama || '-',
    kelas: r.kelas || '-',
    juz: r.juz || '-',
    awal: r.awal || '-',
    akhir: r.akhir || '-',
    total: r.total || '-',
    guru: r.guru || '-'
  }))
}
