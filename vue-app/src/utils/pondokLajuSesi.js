// Pondok Laju tahap 5 (Kyai, 15–16 Nov 2026) — aturan MURNI jadwal piket & capaian bacaan.
//
// Urutan sesi sesudah sekolah: Tadarus Pagi (guru kelas, tanpa jadwal, tanpa bisyaroh) →
// Laju 1 → Laju 2. Ketiganya SATU rantai bacaan: tiap sesi melanjutkan posisi sesi sebelumnya.
// Laju 1/2 disimak guru piket bergilir, satu guru per kelas per sesi. Kelas Pondok Laju =
// guru kelasnya (guru pagi = guru sore). Yang dicatat hanya POSISI AKHIR per santri.
// Bisyaroh piket per sesi, HANYA bila guru terjadwal itu hadir (scan) di shift Pondok Laju.
import { guruKelasLaju, isSantriPondokLaju } from './pondokLaju'
import { juzNum } from './format'
import { isPjLembaga } from './glondongan'

export const SESI_LAJU = [
  { key: 'tadarus', label: 'Tadarus Pagi', piket: false },
  { key: 'laju1', label: 'Laju 1', piket: true },
  { key: 'laju2', label: 'Laju 2', piket: true }
]
export const SESI_PIKET = SESI_LAJU.filter((s) => s.piket).map((s) => s.key)
const _RANK = Object.fromEntries(SESI_LAJU.map((s, i) => [s.key, i]))

export function labelSesi(key) {
  return SESI_LAJU.find((s) => s.key === key)?.label || String(key || '')
}

const _norm = (v) =>
  String(v ?? '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')

/** Kunci kelas Pondok Laju = nama guru kelas (dinormalkan). */
export function kunciKelasLaju(s) {
  return _norm(guruKelasLaju(s)) || '-'
}

/** Potongan aman untuk id baris (huruf/angka/strip). */
export function slugKelas(key) {
  return (
    String(key || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'tanpa-guru'
  )
}

/**
 * Kelas Pondok Laju aktif, dikelompokkan per guru kelas.
 * `juz` = juz terbanyak di kelas itu (Kyai menyamakan juz sekelas; sisanya tanda belum disamakan).
 * @returns {Array<{key, guru, juz, santri: Array}>} urut nama guru.
 */
export function kelasPondokLaju(santriList) {
  const peta = new Map()
  for (const s of santriList || []) {
    if (!s || s.aktif === false || !isSantriPondokLaju(s)) continue
    const key = kunciKelasLaju(s)
    let k = peta.get(key)
    if (!k) peta.set(key, (k = { key, guru: guruKelasLaju(s), santri: [], _juz: {} }))
    k.santri.push(s)
    const j = juzNum(s.juz)
    if (j) k._juz[j] = (k._juz[j] || 0) + 1
  }
  return [...peta.values()]
    .map(({ _juz, ...k }) => ({
      ...k,
      juz:
        Object.entries(_juz).sort((a, b) => b[1] - a[1] || Number(a[0]) - Number(b[0]))[0]?.[0] ||
        '',
      santri: k.santri.sort((a, b) =>
        String(a.nama || '').localeCompare(String(b.nama || ''), 'id')
      )
    }))
    .sort((a, b) => a.guru.localeCompare(b.guru, 'id'))
}

/**
 * Kyai 16 Nov 2026: guru berlabel "Pondok Laju" = guru kelas santri Pondok Laju (bukan guru
 * piket — jadwal berganti tiap bulan). Satu sumber dengan daftar kelas di menu Pondok Laju.
 * @returns {(g: object) => boolean}
 */
export function penandaGuruKelasLaju(santriList) {
  const nama = new Set(kelasPondokLaju(santriList).map((k) => _norm(k.guru)))
  nama.delete('')
  return (g) => nama.has(_norm(g?.nama))
}

// ── Mushaf Usmani Indonesia (604 halaman) ────────────────────────────────────
// Kyai 15 Nov: juz 1 berakhir di hal. 21, juz 2 mulai hal. 22; tiap juz berikutnya 20 halaman,
// juz 30 sampai hal. 604.
export const HALAMAN_MUSHAF = 604

export function rentangHalamanJuz(juz) {
  const n = Number(juz)
  if (!Number.isInteger(n) || n < 1 || n > 30) return null
  if (n === 1) return { awal: 1, akhir: 21 }
  return { awal: 20 * n - 18, akhir: n === 30 ? HALAMAN_MUSHAF : 20 * n + 1 }
}

export function juzDariHalaman(hal) {
  const h = Number(hal)
  if (!Number.isInteger(h) || h < 1 || h > HALAMAN_MUSHAF) return 0
  if (h <= 21) return 1
  return Math.min(30, Math.floor((h - 2) / 20) + 1)
}

// 114 surah: [nama, jumlah ayat] — nomor surah = indeks + 1 (jumlah ayat seluruhnya 6236).
export const SURAH = [
  ['Al-Fatihah', 7],
  ['Al-Baqarah', 286],
  ['Ali Imran', 200],
  ['An-Nisa', 176],
  ['Al-Maidah', 120],
  ['Al-An’am', 165],
  ['Al-A’raf', 206],
  ['Al-Anfal', 75],
  ['At-Taubah', 129],
  ['Yunus', 109],
  ['Hud', 123],
  ['Yusuf', 111],
  ['Ar-Ra’d', 43],
  ['Ibrahim', 52],
  ['Al-Hijr', 99],
  ['An-Nahl', 128],
  ['Al-Isra', 111],
  ['Al-Kahf', 110],
  ['Maryam', 98],
  ['Taha', 135],
  ['Al-Anbiya', 112],
  ['Al-Hajj', 78],
  ['Al-Mu’minun', 118],
  ['An-Nur', 64],
  ['Al-Furqan', 77],
  ['Asy-Syu’ara', 227],
  ['An-Naml', 93],
  ['Al-Qasas', 88],
  ['Al-Ankabut', 69],
  ['Ar-Rum', 60],
  ['Luqman', 34],
  ['As-Sajdah', 30],
  ['Al-Ahzab', 73],
  ['Saba', 54],
  ['Fatir', 45],
  ['Yasin', 83],
  ['As-Saffat', 182],
  ['Sad', 88],
  ['Az-Zumar', 75],
  ['Gafir', 85],
  ['Fussilat', 54],
  ['Asy-Syura', 53],
  ['Az-Zukhruf', 89],
  ['Ad-Dukhan', 59],
  ['Al-Jasiyah', 37],
  ['Al-Ahqaf', 35],
  ['Muhammad', 38],
  ['Al-Fath', 29],
  ['Al-Hujurat', 18],
  ['Qaf', 45],
  ['Az-Zariyat', 60],
  ['At-Tur', 49],
  ['An-Najm', 62],
  ['Al-Qamar', 55],
  ['Ar-Rahman', 78],
  ['Al-Waqi’ah', 96],
  ['Al-Hadid', 29],
  ['Al-Mujadalah', 22],
  ['Al-Hasyr', 24],
  ['Al-Mumtahanah', 13],
  ['As-Saff', 14],
  ['Al-Jumu’ah', 11],
  ['Al-Munafiqun', 11],
  ['At-Tagabun', 18],
  ['At-Talaq', 12],
  ['At-Tahrim', 12],
  ['Al-Mulk', 30],
  ['Al-Qalam', 52],
  ['Al-Haqqah', 52],
  ['Al-Ma’arij', 44],
  ['Nuh', 28],
  ['Al-Jinn', 28],
  ['Al-Muzzammil', 20],
  ['Al-Muddassir', 56],
  ['Al-Qiyamah', 40],
  ['Al-Insan', 31],
  ['Al-Mursalat', 50],
  ['An-Naba', 40],
  ['An-Nazi’at', 46],
  ['Abasa', 42],
  ['At-Takwir', 29],
  ['Al-Infitar', 19],
  ['Al-Mutaffifin', 36],
  ['Al-Insyiqaq', 25],
  ['Al-Buruj', 22],
  ['At-Tariq', 17],
  ['Al-A’la', 19],
  ['Al-Gasyiyah', 26],
  ['Al-Fajr', 30],
  ['Al-Balad', 20],
  ['Asy-Syams', 15],
  ['Al-Lail', 21],
  ['Ad-Duha', 11],
  ['Asy-Syarh', 8],
  ['At-Tin', 8],
  ['Al-Alaq', 19],
  ['Al-Qadr', 5],
  ['Al-Bayyinah', 8],
  ['Az-Zalzalah', 8],
  ['Al-Adiyat', 11],
  ['Al-Qari’ah', 11],
  ['At-Takasur', 8],
  ['Al-Asr', 3],
  ['Al-Humazah', 9],
  ['Al-Fil', 5],
  ['Quraisy', 4],
  ['Al-Ma’un', 7],
  ['Al-Kausar', 3],
  ['Al-Kafirun', 6],
  ['An-Nasr', 3],
  ['Al-Lahab', 5],
  ['Al-Ikhlas', 4],
  ['Al-Falaq', 5],
  ['An-Nas', 6]
]

export function namaSurah(no) {
  return SURAH[Number(no) - 1]?.[0] || ''
}
export function jumlahAyat(no) {
  return SURAH[Number(no) - 1]?.[1] || 0
}

const _int = (v) => {
  const t = String(v ?? '').trim()
  return /^\d+$/.test(t) ? Number(t) : NaN
}

/**
 * Pesan galat satu posisi bacaan; [] = sah. Juz & halaman wajib; surah & ayat boleh kosong,
 * tapi ayat butuh surah dan tak boleh melebihi jumlah ayat surahnya.
 */
export function validasiPosisi(p) {
  const err = []
  const juz = _int(p?.juz)
  const hal = _int(p?.halaman)
  if (!(juz >= 1 && juz <= 30)) err.push('Juz harus 1–30')
  if (!(hal >= 1 && hal <= HALAMAN_MUSHAF)) err.push(`Halaman harus 1–${HALAMAN_MUSHAF}`)
  else if (juz >= 1 && juz <= 30) {
    const r = rentangHalamanJuz(juz)
    if (hal < r.awal || hal > r.akhir) err.push(`Halaman juz ${juz} adalah ${r.awal}–${r.akhir}`)
  }
  const adaSurah = String(p?.surah ?? '').trim() !== ''
  const adaAyat = String(p?.ayat ?? '').trim() !== ''
  const surah = _int(p?.surah)
  if (adaSurah && !(surah >= 1 && surah <= 114)) err.push('Surah tidak dikenal')
  if (adaAyat) {
    const ayat = _int(p?.ayat)
    if (!adaSurah) err.push('Pilih surah dulu sebelum ayat')
    else if (surah >= 1 && surah <= 114 && !(ayat >= 1 && ayat <= jumlahAyat(surah)))
      err.push(`Ayat ${namaSurah(surah)} 1–${jumlahAyat(surah)}`)
  }
  return err
}

/** Teks ringkas satu posisi: "Juz 7 · hal. 130 · Al-Baqarah 200". */
export function teksPosisi(p) {
  if (!p) return ''
  const bag = []
  if (p.juz) bag.push(`Juz ${p.juz}`)
  if (p.halaman) bag.push(`hal. ${p.halaman}`)
  if (p.surah) bag.push(`${namaSurah(p.surah)}${p.ayat ? ' ' + p.ayat : ''}`)
  return bag.join(' · ')
}

// ── Rantai posisi: Tadarus Pagi → Laju 1 → Laju 2 → hari berikutnya ─────────
function _banding(a, b) {
  return (
    String(a.tanggal || '').localeCompare(String(b.tanggal || '')) ||
    (_RANK[a.sesi] ?? 9) - (_RANK[b.sesi] ?? 9)
  )
}

/** Posisi terakhir santri SEBELUM (tanggal, sesi) — isian awal sesi ini. null bila belum ada. */
export function posisiSebelum(rows, santriId, tanggal, sesi) {
  const batas = { tanggal, sesi }
  let best = null
  for (const r of rows || []) {
    if (String(r?.santri_id) !== String(santriId)) continue
    if (_banding(r, batas) >= 0) continue
    if (!best || _banding(r, best) > 0) best = r
  }
  return best
}

/** Map santriId → baris capaian terakhir (untuk ringkasan & tampilan wali). */
export function posisiTerakhirPerSantri(rows) {
  const out = new Map()
  for (const r of rows || []) {
    const k = String(r?.santri_id ?? '')
    if (!k) continue
    const cur = out.get(k)
    if (!cur || _banding(r, cur) > 0) out.set(k, r)
  }
  return out
}

/** Urutkan baris capaian dari yang TERBARU. */
export function urutTerbaru(rows) {
  return [...(rows || [])].sort((a, b) => _banding(b, a))
}

// ── Jadwal piket ─────────────────────────────────────────────────────────────
export function idJadwal(tanggal, sesi, kelasKey) {
  return `${tanggal}_${sesi}_${slugKelas(kelasKey)}`
}
export function idCapaian(tanggal, sesi, santriId) {
  return `${tanggal}_${sesi}_${santriId}`
}

/** Tanggal satu bulan 'YYYY-MM' tanpa hari libur mingguan (bawaan Ahad, cermin hariEfektif). */
export function tanggalBulan(ym, liburMingguan = [0]) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(ym || ''))
  if (!m) return []
  const y = Number(m[1])
  const mo = Number(m[2])
  const hari = new Date(Date.UTC(y, mo, 0)).getUTCDate()
  const out = []
  for (let d = 1; d <= hari; d++) {
    const dow = new Date(Date.UTC(y, mo - 1, d)).getUTCDay()
    if (liburMingguan.includes(dow)) continue
    out.push(`${ym}-${String(d).padStart(2, '0')}`)
  }
  return out
}

/**
 * Tanggal yang dibuka pertama di tab Jadwal: hari ini bila termasuk `daftar` (tanpa Ahad),
 * selain itu tanggal kerja berikutnya; bulan yang sudah lewat → tanggal terakhirnya.
 */
export function tanggalAwalJadwal(daftar, hariIni) {
  const d = daftar || []
  if (!d.length) return ''
  return d.find((t) => t >= String(hariIni || '')) || d[d.length - 1]
}

/** Guru yang memegang dua kelas atau lebih di (tanggal, sesi) yang sama — peringatan jadwal. */
export function bentrokJadwal(rows) {
  const peta = new Map()
  for (const r of rows || []) {
    if (!r?.guru_id) continue
    const k = `${r.tanggal}|${r.sesi}|${r.guru_id}`
    peta.set(k, (peta.get(k) || 0) + 1)
  }
  return [...peta.entries()]
    .filter(([, n]) => n > 1)
    .map(([k, n]) => {
      const [tanggal, sesi, guru_id] = k.split('|')
      return { tanggal, sesi, guru_id, kelas: n }
    })
}

// ── Peran ────────────────────────────────────────────────────────────────────
/** Admin Pondok Laju = master/lembaga PTPT `admin_pondok_laju` [guruId] (cermin RLS). */
export function adminPondokLaju(lembagaList) {
  const o = (lembagaList || []).find((l) => (l?.lembaga || l?.nama) === 'PTPT')
  const arr = Array.isArray(o?.admin_pondok_laju) ? o.admin_pondok_laju : []
  return [...new Set(arr.map((x) => String(x)).filter(Boolean))]
}

/**
 * Daftar tetap Guru Piket Laju = master/lembaga PTPT `guru_piket_laju` [guruId].
 * Kyai 24 Nov 2026: pemilih jadwal jangan memuat 60 nama — guru piket di atas, sisanya di bawah.
 */
export function guruPiketLaju(lembagaList) {
  const o = (lembagaList || []).find((l) => (l?.lembaga || l?.nama) === 'PTPT')
  const arr = Array.isArray(o?.guru_piket_laju) ? o.guru_piket_laju : []
  return [...new Set(arr.map((x) => String(x)).filter(Boolean))]
}

/**
 * Bagi pilihan guru jadi dua kelompok: guru piket (daftar tetap) dan pengajar lain.
 * Daftar kosong = belum disetel → semua masuk `piket` supaya pemilih tak pernah kosong.
 * @returns {{ piket: Array, lain: Array }}
 */
export function kelompokPilihanGuru(guruList, daftarPiket) {
  const ids = new Set((daftarPiket || []).map(String))
  const semua = guruList || []
  if (!ids.size) return { piket: semua, lain: [] }
  return {
    piket: semua.filter((g) => ids.has(String(g.id))),
    lain: semua.filter((g) => !ids.has(String(g.id)))
  }
}

/** Boleh menyusun jadwal? super/admin, PJ PTPT, atau Admin Pondok Laju — subset policy RLS. */
export function bolehSusunJadwal(sesi, lembagaList) {
  if (!sesi) return false
  if (sesi.id === 'admin' || ['super_admin', 'admin'].includes(sesi.role_sistem)) return true
  if (isPjLembaga(sesi, 'PTPT')) return true
  return adminPondokLaju(lembagaList).includes(String(sesi.id ?? ''))
}

// ── Bisyaroh piket ───────────────────────────────────────────────────────────
// Kyai 16 Nov 2026: guru yang punya shift sekolah "dari SD sampai PKBM" TIDAK dibayar Laju 1 —
//   jam itu sudah terbayar sebagai jam pelajaran sekolah. Dikenali dari Master Shift: shift guru
//   yang kolom Khusus Lembaga-nya memuat SDI/PKBM (bukan dari id shift — id sudah dinamai ulang).
//   TK & Kelas Baca tidak termasuk. Laju 2 tetap dibayar.
export const LEMBAGA_SEKOLAH_TANPA_LAJU1 = ['SDI', 'PKBM']

/**
 * Sesi yang tak dibayar untuk guru ini: ['laju1'] bila ia punya shift sekolah SD–PKBM, selain itu [].
 * @param {Iterable} shiftIdsGuru shiftsForGuru(g, settings).
 * @param {Array} daftarShift shiftList(settings) — tiap shift { id, lembaga: [] }.
 */
export function sesiTakDibayarGuru(shiftIdsGuru, daftarShift) {
  const punya = new Set([...(shiftIdsGuru || [])].map((x) => String(x)))
  const sekolah = new Set(LEMBAGA_SEKOLAH_TANPA_LAJU1)
  const kena = (daftarShift || []).some(
    (sh) =>
      punya.has(String(sh?.id)) &&
      (Array.isArray(sh?.lembaga) ? sh.lembaga : []).some((l) =>
        sekolah.has(
          String(l || '')
            .trim()
            .toUpperCase()
        )
      )
  )
  return kena ? ['laju1'] : []
}

/**
 * Sesi Laju yang DIBAYAR satu guru. Per tanggal: dibayar = min(sesi terjadwal yang boleh dibayar,
 * shift Pondok Laju yang ia hadiri hari itu). Hadir = status hadir/terlambat di shift yang dipilih
 * Kyai (`shiftIds`, dari scope Jenis Bisyaroh). Tanpa shift terpilih tak ada yang terbayar —
 * aturan Kyai: bisyaroh hanya bila guru absen di shift Pondok Laju. `sesiTakDibayar` (dari
 * sesiTakDibayarGuru) tetap terjadwal & tercatat, hanya tak dibayar.
 * v.1.5.0: bila `shiftSesi` ({ laju1, laju2 } dari Pondok Laju → Pengaturan) terisi, tiap sesi
 *   dibayar TEPAT bila ia hadir di shift sesi itu (Laju 1 ↔ shift Laju 1); sesi tanpa shift tak
 *   dibayar. Tanpa `shiftSesi` berlaku aturan cadangan min(terjadwal, shift dihadiri).
 * @returns {{ terjadwal, berbayar, dibayar, rincian: Array<{tanggal, sesi: Array, hadir, dibayar}> }}
 */
export function sesiLajuTerbayar({
  jadwal = [],
  absensi = [],
  guruId,
  dalamPeriode = () => true,
  shiftIds = [],
  sesiTakDibayar = [],
  shiftSesi = null
} = {}) {
  const takDibayar = new Set(sesiTakDibayar || [])
  const peta = {}
  for (const k of SESI_PIKET) {
    const id = String(shiftSesi?.[k] || '')
      .trim()
      .toLowerCase()
    if (id) peta[k] = id
  }
  const pakaiPeta = Object.keys(peta).length > 0
  if (pakaiPeta) shiftIds = Object.values(peta)
  const gid = String(guruId ?? '')
  const ids = new Set([...(shiftIds || [])].map((x) => String(x).toLowerCase()))
  const perTgl = new Map()
  for (const r of jadwal) {
    if (String(r?.guru_id ?? '') !== gid) continue
    const t = String(r.tanggal || '').slice(0, 10)
    if (!t || !dalamPeriode(t)) continue
    if (!perTgl.has(t)) perTgl.set(t, [])
    perTgl.get(t).push(r.sesi)
  }
  const hadirTgl = new Map()
  if (ids.size) {
    for (const a of absensi) {
      if (String(a?.guru_id ?? '') !== gid) continue
      const st = String(a.status || '').toLowerCase()
      if (st !== 'hadir' && st !== 'terlambat') continue
      const sh = String(a.shift || '').toLowerCase()
      if (!ids.has(sh)) continue
      const t = String(a.tanggal || '').slice(0, 10)
      if (!hadirTgl.has(t)) hadirTgl.set(t, new Set())
      hadirTgl.get(t).add(sh)
    }
  }
  let terjadwal = 0
  let berbayar = 0
  let dibayar = 0
  const rincian = []
  for (const [t, sesi] of [...perTgl.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
    const hadirSet = hadirTgl.get(t) || new Set()
    const hadir = hadirSet.size
    const boleh = sesi.filter((s) => !takDibayar.has(s)).length
    const bayar = pakaiPeta
      ? sesi.filter((s) => !takDibayar.has(s) && peta[s] && hadirSet.has(peta[s])).length
      : Math.min(boleh, hadir)
    terjadwal += sesi.length
    berbayar += boleh
    dibayar += bayar
    rincian.push({ tanggal: t, sesi, hadir, dibayar: bayar })
  }
  return { terjadwal, berbayar, dibayar, rincian }
}

const _HARI = ['Ahad', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const _BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
/** 'YYYY-MM-DD' → "Sel, 17 Nov" (dihitung UTC: tanggalnya sudah tanggal WIB, jangan digeser). */
export function fmtTanggalPendek(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || '').slice(0, 10))
  if (!m) return '-'
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
  return `${_HARI[d.getUTCDay()]}, ${+m[3]} ${_BLN[+m[2] - 1]}`
}

/**
 * kartuJurnalHari — kartu Jurnal apa saja yang muncul untuk SATU tanggal.
 *
 * Kyai 17 Nov 2026: tab Jurnal tak lagi memakai dropdown sesi & kelas; yang dipajang adalah
 * jadwalnya sendiri. Aturan "siapa melihat kartu apa" ditaruh di sini, bukan di layar, supaya
 * bisa diuji dan tak berpisah dari jalur lain yang membaca jadwal yang sama.
 *
 * Tiga sumber kartu, dalam urutan ini:
 *  1. Tadarus Pagi — TANPA jadwal: yang mencatat guru kelasnya sendiri (Kyai 16 Nov), jadi
 *     kartunya muncul kalau `guruNama` memang guru salah satu kelas Pondok Laju.
 *  2. Baris jadwal Laju 1 / Laju 2. Guru biasa hanya miliknya; `semuaKelas` (admin penuh /
 *     penyusun jadwal) melihat seluruh jadwal hari itu supaya jurnal terlupa bisa ditambal
 *     tanpa meminjam akun guru.
 *  3. `manual` — kartu tambahan yang dipilih sendiri admin/PJ untuk kelas di luar jadwal.
 *
 * @param {object} p
 * @param {Array} p.jadwal baris `pondok_laju_jadwal` tanggal itu
 * @param {Array} p.kelasList hasil `kelasPondokLaju(santri)`
 * @param {string} p.guruId id sesi yang login
 * @param {string} p.guruNama nama sesi yang login (pencocokan guru kelas lewat NAMA)
 * @param {boolean} [p.semuaKelas=false]
 * @param {Array} [p.manual=[]] `[{ sesi, kelasKey }]`
 * @returns {Array<{key: string, sesi: string, kelas: object, piketGuruId: string, piketNama: string}>}
 */
export function kartuJurnalHari({
  jadwal = [],
  kelasList = [],
  guruId = '',
  guruNama = '',
  semuaKelas = false,
  manual = []
} = {}) {
  const peta = new Map((kelasList || []).map((k) => [k.key, k]))
  const out = []
  const sudah = new Set()
  const tambah = (sesi, kelas, piketGuruId, piketNama) => {
    if (!sesi || !kelas) return
    const key = `${sesi}|${kelas.key}`
    if (sudah.has(key)) return // satu kelas × sesi cukup satu kartu
    sudah.add(key)
    out.push({
      key,
      sesi,
      kelas,
      piketGuruId: String(piketGuruId || ''),
      piketNama: String(piketNama || '')
    })
  }

  // Tadarus Pagi tak punya piket — sengaja tanpa `piketGuruId`, supaya kartunya tak
  // berlabel "piket <nama saya>" yang menyesatkan.
  const kelasSaya = (kelasList || []).find((k) => k.key === _norm(guruNama))
  if (kelasSaya) tambah('tadarus', kelasSaya, '', '')

  for (const r of jadwal || []) {
    if (!r || r.sesi === 'tadarus') continue
    if (!semuaKelas && String(r.guru_id) !== String(guruId)) continue
    tambah(r.sesi, peta.get(r.kelas_key), r.guru_id, r.guru_nama || r.data?.guru_nama || '')
  }

  for (const m of manual || []) tambah(m?.sesi, peta.get(m?.kelasKey), '', '')

  const urut = { tadarus: 0, laju1: 1, laju2: 2 }
  return out.sort(
    (a, b) =>
      (urut[a.sesi] ?? 9) - (urut[b.sesi] ?? 9) ||
      String(a.kelas.guru || '').localeCompare(String(b.kelas.guru || ''), 'id')
  )
}
