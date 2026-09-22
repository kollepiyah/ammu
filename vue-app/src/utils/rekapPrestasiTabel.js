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

// ─────────────────────────────────────────────────────────────────────────────
// v.1.4.5 · Target per PJ + tabel PER KELAS (per guru). Kyai, 22 Sep 2026:
//   *"saya ingin dikelompokkan perkelas (perguru) dan diurutkan dari total capaian
//   terbanyak. saya ingin setiap kelas itu tabelnya terpisah dg kelas lain, dan ada
//   keterangan rata2 capaian (persen). jadi berapa persen santri kelas tersebut memenuhi
//   target. Target setiap PJ berbeda."*
//
// Penyebut persentase = SEMUA santri di kelas itu, termasuk yang angkanya belum diisi —
// persis kalimat Kyai ("berapa persen santri kelas tersebut"). Yang belum diisi tidak
// disembunyikan: ia dihitung terpisah dan disebut di ringkasan, supaya persentase rendah
// karena data kosong tak terbaca sebagai prestasi rendah.
// ─────────────────────────────────────────────────────────────────────────────

/** Kolom tambahan saat PJ punya target: status tiap santri terhadap target itu. */
export const KOLOM_KETERANGAN = {
  key: 'keterangan',
  header: 'Keterangan',
  lebar: 85,
  lebarXlsx: 18
}

/** Angka bulan ini sudah diisi? PTPT butuh awal & akhir; lembaga lain cukup totalnya. */
export function sudahDiisi(r) {
  if (!r) return false
  if (_txt(r.lembaga).toLowerCase() === 'ptpt') return !!(_txt(r.awal) && _txt(r.akhir))
  return !!_txt(r.total)
}

/**
 * Status capaian satu baris terhadap target PJ-nya:
 * 'tercapai' (≥ target) · 'minimal' (≥ minimal) · 'kurang' · 'kosong' (belum diisi) ·
 * '' bila PJ-nya tak punya target.
 */
export function statusCapaian(r, target) {
  if (!target || !(target.target > 0)) return ''
  if (!sudahDiisi(r)) return 'kosong'
  const n = r.totalNum || 0
  if (n >= target.target) return 'tercapai'
  if (target.minimal > 0 && n >= target.minimal) return 'minimal'
  return 'kurang'
}

/** Teks status untuk kolom Keterangan. Tanpa batas minimal, 'kurang' = belum tercapai. */
export function labelStatus(status, target) {
  switch (status) {
    case 'tercapai':
      return 'Tercapai'
    case 'minimal':
      return 'Memenuhi minimal'
    case 'kurang':
      return target && target.minimal > 0 ? 'Di bawah minimal' : 'Belum tercapai'
    case 'kosong':
      return 'Belum diisi'
    default:
      return ''
  }
}

const _persen = (n, dari) => (dari > 0 ? (n / dari) * 100 : 0)

/**
 * Ringkasan satu kelompok (kelas atau seluruh PJ) terhadap target.
 * `capaiMinimal` MENCAKUP yang sudah tercapai — "memenuhi minimal" = paling sedikit minimal.
 * null untuk `capaiMinimal`/`persenMinimal` bila PJ tak memasang batas minimal.
 */
export function ringkasanCapaian(rows, target) {
  const list = rows || []
  const jumlah = list.length
  const status = list.map((r) => statusCapaian(r, target))
  const totalHal = list.reduce((s, r) => s + (r.totalNum || 0), 0)
  const rataRata = jumlah ? totalHal / jumlah : 0
  const capaiTarget = status.filter((s) => s === 'tercapai').length
  const adaMinimal = !!(target && target.minimal > 0)
  const capaiMinimal = adaMinimal
    ? status.filter((s) => s === 'tercapai' || s === 'minimal').length
    : null
  return {
    jumlah,
    belumDiisi: status.filter((s) => s === 'kosong').length,
    totalHal,
    rataRata,
    persenRataTarget: target && target.target > 0 ? _persen(rataRata, target.target) : null,
    capaiTarget,
    persenTarget: _persen(capaiTarget, jumlah),
    capaiMinimal,
    persenMinimal: adaMinimal ? _persen(capaiMinimal, jumlah) : null
  }
}

const _angka = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 })
/** 66.666 → '66,7' — koma desimal, paling banyak satu angka di belakangnya. */
export const fmtAngka = (x) => _angka.format(Number(x) || 0)

/** 'Target 40 hal/bulan · minimal 20 hal' */
export function teksTarget(target) {
  if (!target || !(target.target > 0)) return ''
  return (
    `Target ${target.target} hal/bulan` +
    (target.minimal > 0 ? ` · minimal ${target.minimal} hal` : '')
  )
}

/**
 * Ringkasan sebagai teks siap cetak: `utama` = persentase yang Kyai tanyakan (memenuhi
 * target), `rinci` = minimal, rata-rata, dan jumlah yang belum diisi.
 * Sengaja tanpa simbol '≥': font standar jsPDF (WinAnsi) tak memilikinya dan mencetaknya
 * sebagai huruf acak.
 */
export function teksRingkasan(rk, target) {
  if (!rk || !target) return { utama: '', rinci: '' }
  const utama =
    `Memenuhi target ${target.target} hal: ${rk.capaiTarget} dari ${rk.jumlah} santri` +
    ` — ${fmtAngka(rk.persenTarget)}%`
  const rinci = []
  if (rk.capaiMinimal !== null) {
    rinci.push(
      `Memenuhi minimal ${target.minimal} hal: ${rk.capaiMinimal} dari ${rk.jumlah} santri` +
        ` (${fmtAngka(rk.persenMinimal)}%)`
    )
  }
  rinci.push(
    `Rata-rata capaian: ${fmtAngka(rk.rataRata)} hal (${fmtAngka(rk.persenRataTarget)}% dari target)`
  )
  if (rk.belumDiisi) rinci.push(`Belum diisi: ${rk.belumDiisi} santri`)
  return { utama, rinci: rinci.join(' · ') }
}

/** Ringkasan satu PJ dalam satu baris (di bawah judul bagian PJ). */
export function teksRingkasanPj(rk, target) {
  if (!rk || !target) return ''
  const bag = [
    `Keseluruhan: ${rk.capaiTarget} dari ${rk.jumlah} santri memenuhi target (${fmtAngka(rk.persenTarget)}%)`
  ]
  if (rk.capaiMinimal !== null) {
    bag.push(`${rk.capaiMinimal} memenuhi minimal (${fmtAngka(rk.persenMinimal)}%)`)
  }
  bag.push(`rata-rata ${fmtAngka(rk.rataRata)} hal`)
  return bag.join(' · ')
}

/**
 * Label kelas sebuah kelompok guru. Satu rombel boleh campur jenjang, jadi semua kelasnya
 * disebut: 'Kelas 1' · 'Kelas 1 & 2' · 'Kelas 1, 2 & 3'. Label di luar pola 'Kelas N'
 * (jilid/level lembaga lain) digabung apa adanya.
 */
export function labelKelasKelompok(rows) {
  const kelas = [...new Set((rows || []).map((r) => _txt(r.kelas)).filter(Boolean))].sort(
    (a, b) => kelasRank(a) - kelasRank(b) || a.localeCompare(b, 'id')
  )
  if (kelas.length <= 1) return kelas[0] || ''
  if (kelas.every((k) => /^kelas\s+\S+$/i.test(k))) {
    const no = kelas.map((k) => k.replace(/^kelas\s+/i, ''))
    return `Kelas ${no.slice(0, -1).join(', ')} & ${no[no.length - 1]}`
  }
  return kelas.join(', ')
}

/** Judul tabel satu kelompok: 'Kelas 1 & 2 — Dewi Musrifah, S.Pd. (5 santri)'. */
export function judulKelompok(g) {
  const guru = g?.guru || 'Tanpa guru'
  const kelas = g?.kelasLabel || ''
  return `${kelas ? kelas + ' — ' : ''}${guru} (${g?.jumlah ?? 0} santri)`
}

/**
 * Susunan ekspor PDF: bagian per PJ → tabel per kelas (guru) → baris terurut capaian.
 *
 * @param {Array} rows  baris dari barisRekapPrestasi (dengan `pj`).
 * @param {object} [opts]
 * @param {string}   [opts.pjTerpilih]  PJ di penyaring ('' = semua, dipisah per PJ).
 * @param {Function} [opts.targetUntuk] (namaPj) => {target, minimal} | null.
 */
export function susunBagianEkspor(rows, opts = {}) {
  const { pjTerpilih = '', targetUntuk = () => null } = opts
  const list = rows || []
  if (!list.length) return []
  const bagian = (pj, isi) => {
    const target = pj && pj !== TANPA_PJ ? targetUntuk(pj) || null : null
    return {
      pj,
      target,
      jumlah: isi.length,
      ringkasan: target ? ringkasanCapaian(isi, target) : null,
      grup: kelompokPerGuru(isi).map((g) => ({
        key: g.key,
        guru: g.guru,
        kelasLabel: labelKelasKelompok(g.rows),
        jumlah: g.jumlah,
        rows: g.rows,
        ringkasan: target ? ringkasanCapaian(g.rows, target) : null
      }))
    }
  }
  // PJ tertentu terpilih → satu bagian saja (penyaring sudah menyaring barisnya).
  if (pjTerpilih) return [bagian(pjTerpilih, list)]
  const perPj = kelompokPerPj(list)
  // Tak ada peta PJ sama sekali (mis. lembaga PPPH) → jangan paksakan bagian palsu.
  if (perPj.length === 1 && perPj[0].pj === TANPA_PJ) return [bagian('', perPj[0].rows)]
  return perPj.map((b) => bagian(b.pj, b.rows))
}

/**
 * Baris siap-cetak: penomoran ulang mulai 1 + nilai kosong jadi '-'.
 * Nomornya sengaja diberikan DI SINI, bukan saat baris dibentuk — kalau tidak, memisah
 * per PJ akan mewarisi nomor daftar gabungan dan tiap PDF mulai dari angka acak.
 * v.1.4.5: dengan `target`, tiap baris membawa `keterangan` + `status` (untuk warna sel).
 */
export function barisCetak(rows, opts = {}) {
  const { target = null } = opts
  return (rows || []).map((r, i) => {
    const out = {
      no: i + 1,
      nama: r.nama || '-',
      kelas: r.kelas || '-',
      juz: r.juz || '-',
      awal: r.awal || '-',
      akhir: r.akhir || '-',
      total: r.total || '-',
      guru: r.guru || '-'
    }
    if (target) {
      out.status = statusCapaian(r, target)
      out.keterangan = labelStatus(out.status, target) || '-'
    }
    return out
  })
}
