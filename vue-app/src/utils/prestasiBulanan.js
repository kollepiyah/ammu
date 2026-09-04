// prestasiBulanan — angka prestasi santri MILIK SEBUAH BULAN.
//
// v.1.3.7 (Kyai, 31 Agu 2026): "untuk rekap prestasi bulanan, kenapa tidak tereset setiap
// bulan, bulan agustus masih terinput rekapan bulan lalu. harusnya kosong."
//
// AKAR MASALAH. Angka prestasi hidup di DUA tempat dengan arti yang berbeda, dan layar
// bulanan selama ini membaca yang salah:
//
//   • `santri.prestasi_awal / prestasi_akhir / prestasi_total` — SATU set per santri,
//     tanpa dimensi bulan. Isinya "angka terakhir yang pernah disimpan". Dipakai Data
//     Santri, profil, dan ekspor.
//   • `riwayat_prestasi` (id `rp_<santriId>_<YYYY-MM>`) — SNAPSHOT per bulan, sudah ada
//     sejak v.100d dan sudah ditulis RekapPrestasiView, tapi tak pernah DIBACA balik
//     untuk mengisi gridnya.
//
// Karena grid mengisi dirinya dari baris santri, memilih bulan lain tak mengubah apa pun:
// Agustus menampilkan angka Juli, dan lebih buruk lagi ia menampilkannya sebagai ISIAN —
// sekali disimpan, angka Juli resmi jadi angka Agustus. Statistik "sudah dinilai" ikut
// berbohong: bulan yang belum disentuh siapa pun terhitung sudah dinilai.
//
// ATURAN SEKARANG (sumber tunggal, dipakai RekapPrestasiView & InputBulananView):
//   awal / akhir / total  = HANYA dari snapshot bulan itu. Belum ada → **kosong**.
//                           Tak pernah jatuh ke baris santri: itulah jatuh yang bikin
//                           angka bulan lalu menyamar jadi angka bulan ini.
//   juz / kelas           = keadaan BERJALAN santri, bukan ukuran bulanan. Snapshot dulu
//                           (kalau bulan itu memang mencatatnya), lalu baris santri.
//                           Mengosongkannya justru salah — juz & kelas tak "reset" tiap
//                           bulan, santri tak kembali ke Juz 1 setiap tanggal 1.
//
// Semua fungsi PURE — tak menyentuh store maupun DB.

/** 'YYYY-MM' dari bulan 1..12 + tahun. '' bila tak masuk akal. */
export function periodePrestasi(bulan, tahun) {
  const b = Number(bulan)
  const y = Number(tahun)
  if (!Number.isFinite(b) || !Number.isFinite(y) || b < 1 || b > 12 || y < 1900) return ''
  return `${y}-${String(b).padStart(2, '0')}`
}

/** Periode sebelum `periode` ('2026-01' → '2025-12'). '' bila periode tak sah. */
export function periodeSebelumnya(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || ''))
  if (!m) return ''
  const y = Number(m[1])
  const b = Number(m[2])
  if (b < 1 || b > 12) return ''
  return b === 1 ? periodePrestasi(12, y - 1) : periodePrestasi(b - 1, y)
}

/**
 * Id baris snapshot. Bentuknya DIKUNCI di sini karena ia dipakai dua penulis
 * (RekapPrestasiView & InputBulananView) — kalau salah satu mengarang bentuk sendiri,
 * bulan yang sama akan punya dua baris dan yang tampil tergantung urutan baca.
 */
export function idRiwayatPrestasi(santriId, periode) {
  return `rp_${String(santriId ?? '')}_${String(periode ?? '')}`
}

/** Map<santriId, baris snapshot> untuk 1 periode. Baris terbaru menang bila kembar. */
export function petaPrestasiPeriode(rows, periode) {
  const p = String(periode || '')
  const map = new Map()
  if (!p) return map
  for (const r of rows || []) {
    if (String(r?.periode || '') !== p) continue
    const sid = String(r.santri_id ?? '')
    if (!sid) continue
    const ada = map.get(sid)
    if (!ada || String(r.updatedAt || '') >= String(ada.updatedAt || '')) map.set(sid, r)
  }
  return map
}

const _teks = (v) => (v === undefined || v === null ? '' : String(v))

/**
 * Nilai yang harus TAMPIL di grid untuk bulan terpilih.
 * @param {object|null} snap baris riwayat_prestasi bulan itu (null = belum ada).
 * @param {object} santri baris santri (untuk juz/kelas yang sifatnya berjalan).
 */
export function nilaiPrestasiBulan(snap, santri) {
  return {
    // Ukuran BULANAN — kosong bila bulan itu belum diisi.
    awal: _teks(snap?.awal),
    akhir: _teks(snap?.akhir),
    total: _teks(snap?.total),
    // Keadaan BERJALAN — ikut santri bila bulan itu tak mencatatnya sendiri.
    juz: _teks(snap?.juz) || _teks(santri?.juz),
    kelas: _teks(snap?.kelas) || _teks(santri?.kelas),
    kelas_sekolah: _teks(santri?.kelas_sekolah)
  }
}

/**
 * Angka bulan LALU untuk ditaruh sebagai placeholder — petunjuk, bukan isian.
 *
 * Mengosongkan grid itu yang Kyai minta, tapi mengosongkannya tanpa jejak berarti
 * penginput kehilangan titik tolak: untuk PTPT, "Awal Bulan" ini pada dasarnya adalah
 * "Akhir Bulan" yang lalu. Karena itu petunjuk `awal` mengambil `akhir` bulan lalu —
 * bukan `awal`-nya, yang justru angka dua bulan berjalan.
 *
 * Kalau bulan lalu belum bersnapshot (mis. data sebelum snapshot bulanan ada), jatuh ke
 * baris santri — di situlah "angka terakhir yang pernah disimpan" tersimpan. Ini AMAN
 * karena hasilnya hanya jadi placeholder: tak ikut tersimpan, tak ikut dihitung.
 */
export function petunjukBulanLalu(snapSebelum, santri) {
  const akhirLalu = _teks(snapSebelum?.akhir) || _teks(santri?.prestasi_akhir)
  return {
    awal: akhirLalu,
    akhir: akhirLalu,
    total: _teks(snapSebelum?.total) || _teks(santri?.prestasi_total)
  }
}

/**
 * Bentuk baris snapshot yang DITULIS ke `riwayat_prestasi`.
 *
 * Satu bentuk untuk semua penulis. RekapPrestasiView sudah menulisnya sejak v.100d;
 * InputBulananView dulu TIDAK — ia cuma menimpa baris santri, sehingga angka yang
 * diinput guru di sana tak pernah menjadi milik bulan mana pun. Itulah sebabnya angka
 * yang sama bisa muncul di bulan berikutnya: tak ada bulan yang mengklaimnya.
 */
export function payloadRiwayatPrestasi({
  santri,
  periode,
  bulanLabel = '',
  awal = '',
  akhir = '',
  total = '',
  juz = ''
} = {}) {
  const id = idRiwayatPrestasi(santri?.id, periode)
  return {
    id,
    santri_id: String(santri?.id ?? ''),
    santri_nama: _teks(santri?.nama),
    lembaga: _teks(santri?.lembaga),
    kelas: _teks(santri?.kelas),
    periode: String(periode ?? ''),
    bulan_label: String(bulanLabel || ''),
    awal: _teks(awal),
    akhir: _teks(akhir),
    total: _teks(total),
    juz: _teks(juz),
    updatedAt: new Date().toISOString()
  }
}

/**
 * Apakah bulan ini benar-benar sudah dinilai? Dasar hitungan "sudah/belum dinilai".
 * Sengaja hanya melihat ukuran bulanan — juz & kelas selalu terisi, jadi memasukkannya
 * akan membuat SEMUA santri terhitung "sudah dinilai" di bulan yang masih kosong.
 */
export function sudahDinilaiBulan(nilai) {
  return !!(_teks(nilai?.awal) || _teks(nilai?.akhir) || _teks(nilai?.total))
}

// ── v.1.4.1 · SIKLUS PENGISIAN & LEMBAGA YANG TERKENA ────────────────────────
//
// Kyai, 4 Sep 2026 — menutup ambiguitas yang tersisa dari v.1.3.8: *"rekap prestasi
// bulanan, Bulan September. Isinya adalah rekapan dari awal agustus sampai akhir agustus.
// guru mengisinya dari akhir bulan sampai batasnya tgl 5 september. di filter saya
// membukanya di September, bukan di agustus. di agustus harusnya data bulan lalu (bulan
// agustus, rekap dari Juli)."*
//
// PENAMAAN PERIODE — di sinilah satu-satunya sumber kekeliruannya, jadi ditulis eksplisit:
//
//     periode  = BULAN LAPORAN (bulan saat rekap itu dikerjakan & diberi nama)
//     isinya   = capaian bulan SEBELUMNYA
//
//   'Rekap September 2026' → dikerjakan 29 Agu s/d 5 Sep, isinya capaian Agustus.
//   'Rekap Agustus 2026'   → dikerjakan 29 Jul s/d 5 Agu, isinya capaian Juli.
//
// v.1.3.8 memakai penamaan KEBALIKANNYA (periode = bulan data), dan itulah bug yang tak
// kelihatan: RekapPrestasiView sejak v.100d menulis snapshot ber-periode BULAN LAPORAN
// (nilai dropdown di layar — 'September'), sedangkan kartu dasbor "Guru Belum Input"
// mencari bulan DATA ('Agustus') lewat periodeRekapBerjalan(). Dua bucket berbeda untuk
// satu pekerjaan yang sama: guru yang sudah rapi mengisi rekap September tetap tercantum
// "belum input", dan tak ada satu pun layar yang menunjukkan sebabnya.
//
// Yang berubah hanya DUA fungsi di bawah — keduanya bergeser satu bulan ke depan supaya
// sepakat dengan apa yang SUDAH tertulis di DB sejak v.100d. Bentuk baris snapshot,
// id-nya, dan seluruh data yang sudah tersimpan TIDAK tersentuh: tak ada migrasi data.

/** Lembaga yang punya rekap prestasi bulanan. Sumber tunggal — dibaca RekapPrestasiView
 *  (daftar tombol + penyaring) DAN kartu dasbor, supaya keduanya tak bisa berbeda. */
export const LEMBAGA_PRESTASI_BULANAN = ['PTPT', 'PPPH']

/** Jendela pengisian DIBUKA tanggal 29 pada bulan SEBELUM bulan laporan. */
export const TGL_BUKA_REKAP = 29

/** Batas akhir pengisian: tanggal 5 pada bulan laporan itu sendiri. */
export const TGL_BATAS_REKAP = 5

const _lkey = (v) =>
  String(v == null ? '' : v)
    .trim()
    .toLowerCase()

export function punyaPrestasiBulanan(lembaga) {
  const k = _lkey(lembaga)
  return !!k && LEMBAGA_PRESTASI_BULANAN.some((l) => _lkey(l) === k)
}

/** Hari dalam bulan (1..12). Dipakai menjepit tanggal buka di bulan pendek. */
function _hariDalamBulan(tahun, bulan) {
  return new Date(tahun, bulan, 0).getDate()
}

/**
 * Tanggal jendela pengisian DIBUKA di bulan itu — TGL_BUKA_REKAP, dijepit ke hari
 * terakhir bulan tsb. Februari 28 hari tak punya tanggal 29, dan tanpa penjepitan ini
 * jendela yang seharusnya dibuka Februari tak akan pernah terbuka: rekapnya diam-diam
 * terlewat setahun sekali.
 *
 * CATATAN ARGUMEN: yang di-pass adalah bulan tempat jendelanya DIBUKA (bulan sebelum
 * bulan laporan), bukan bulan laporannya. Untuk tanggal buka sebuah periode laporan,
 * pakai `tglBukaRekapPeriode`.
 */
export function tglBukaRekap(tahun, bulan) {
  return Math.min(TGL_BUKA_REKAP, _hariDalamBulan(tahun, bulan))
}

/** Periode sesudah `periode` ('2026-12' → '2027-01'). '' bila periode tak sah. */
export function periodeBerikutnya(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || ''))
  if (!m) return ''
  const y = Number(m[1])
  const b = Number(m[2])
  if (b < 1 || b > 12) return ''
  return b === 12 ? periodePrestasi(1, y + 1) : periodePrestasi(b + 1, y)
}

/**
 * Bulan DATA sebuah periode laporan ('2026-09' → '2026-08').
 *
 * Dipisah jadi fungsinya sendiri walau isinya cuma `periodeSebelumnya`, karena yang
 * dipertaruhkan bukan aritmetikanya melainkan ARTINYA: tiap layar yang menyebut "Rekap
 * September" wajib bisa menerangkan bahwa angkanya milik Agustus, dan satu-satunya cara
 * menjaga kalimat itu tak menyimpang adalah menyediakan namanya di sini.
 */
export function periodeDataRekap(periode) {
  return periodeSebelumnya(periode)
}

/**
 * Periode LAPORAN yang SEDANG dikerjakan pada tanggal `todayIso`.
 *
 *   tanggal >= 29  -> bulan BERIKUTNYA (29 Agu = mulai mengerjakan rekap SEPTEMBER)
 *   tanggal 1..28  -> bulan BERJALAN   (2 Sep = masih rekap September)
 *
 * Sasaran TIDAK berpindah begitu lewat tanggal 5 — 10 Sep tetap rekap September, hanya
 * berstatus TERLAMBAT. Memindahkan sasaran di tanggal 6 akan menyembunyikan pekerjaan
 * yang justru belum selesai, persis kebalikan dari guna kartu dasbor ini.
 */
export function periodeRekapBerjalan(todayIso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(todayIso || '').slice(0, 10))
  if (!m) return ''
  const y = Number(m[1])
  const b = Number(m[2])
  const d = Number(m[3])
  if (b < 1 || b > 12) return ''
  const bulanIni = periodePrestasi(b, y)
  return d >= tglBukaRekap(y, b) ? periodeBerikutnya(bulanIni) : bulanIni
}

/**
 * Tanggal jendela periode laporan itu DIBUKA ('2026-09' → '2026-08-29').
 * Dijepit ke hari terakhir bulan pembuka: rekap Maret dibuka 28 Feb di tahun biasa.
 */
export function tglBukaRekapPeriode(periode) {
  const sebelum = periodeSebelumnya(periode)
  const m = /^(\d{4})-(\d{2})$/.exec(sebelum)
  if (!m) return ''
  return `${sebelum}-${String(tglBukaRekap(Number(m[1]), Number(m[2]))).padStart(2, '0')}`
}

/** Tanggal jatuh tempo periode laporan itu ('2026-09' -> '2026-09-05'). '' bila tak sah. */
export function batasRekap(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || ''))
  if (!m) return ''
  const b = Number(m[2])
  if (b < 1 || b > 12) return ''
  return `${m[1]}-${m[2]}-${String(TGL_BATAS_REKAP).padStart(2, '0')}`
}

/** Sudah lewat batas? Dipakai kartu dasbor membedakan "belum jatuh tempo" dari "telat". */
export function rekapTerlambat(periode, todayIso) {
  const batas = batasRekap(periode)
  const hari = String(todayIso || '').slice(0, 10)
  return !!batas && /^\d{4}-\d{2}-\d{2}$/.test(hari) && hari > batas
}

const NAMA_BULAN_REKAP = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

/** 'September 2026' dari '2026-09'. String apa adanya bila periodenya tak sah. */
export function labelBulanPeriode(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || ''))
  if (!m) return String(periode || '')
  const b = Number(m[2])
  if (b < 1 || b > 12) return String(periode || '')
  return `${NAMA_BULAN_REKAP[b - 1]} ${m[1]}`
}

/**
 * Kalimat lengkap yang dipakai tiap layar penyebut periode rekap:
 * 'September 2026 (data Agustus 2026)'. Ada supaya nama bulan tak pernah lagi muncul
 * sendirian tanpa bulan datanya — itulah yang Kyai sebut "masih ambigu".
 */
export function labelPeriodeRekap(periode) {
  const lap = labelBulanPeriode(periode)
  if (!/^\d{4}-\d{2}$/.test(String(periode || ''))) return lap
  return `${lap} (data ${labelBulanPeriode(periodeDataRekap(periode))})`
}

// ── v.1.4.1 · DETEKSI SNAPSHOT YANG MENDARAT DI BULAN SEBELAH ────────────────
//
// Kyai, 4 Sep 2026: *"guru2 katanya banyak yg sudah isi, tapi di rekap kok banyak yg belum
// diisi."*
//
// Sampai v.1.4.0, dropdown bulan di RekapPrestasiView terbuka pada BULAN KALENDER
// (`_now.getMonth()`). Padahal jendela pengisian menyeberangi pergantian bulan: guru yang
// membuka layar tanggal **29–31 Agustus** melihat "Agustus" dan menyimpan ke '2026-08',
// sedangkan rekan yang membuka **1–5 September** melihat "September" dan menyimpan ke
// '2026-09'. **Satu pekerjaan yang sama, dua bucket** — semata karena hari keberapa ia
// sempat membukanya. Yang membuka layar di bulan September lalu melihat separuh daftarnya
// kosong tak punya cara apa pun menebak ke mana isian rekannya pergi.
//
// Fungsi ini menghitung berapa yang tersangkut di bucket sebelah, dan menghitungnya dengan
// pembeda yang benar: **kapan barisnya DITULIS**, bukan sekadar "ada isian di bulan lalu".
// Tanpa pembeda itu angkanya tak berarti apa-apa — siklus bulan lalu yang berjalan normal
// pun meninggalkan isian di periode sebelumnya untuk hampir semua santri.
//
// Baris periode P-1 yang `updatedAt`-nya jatuh pada atau sesudah tanggal jendela P dibuka
// (29 bulan P-1) hanya bisa lahir dari sesi pengisian siklus P.
//
// Fungsi ini TIDAK memindahkan apa pun. Memindahkannya perlu keputusan Kyai: bucket P-1
// juga menampung rekap P-1 yang sah, dan menebak-nebak di sana berarti menimpa pekerjaan
// yang benar dengan pekerjaan yang lain.

/**
 * Baris snapshot periode SEBELUMNYA yang sebenarnya milik siklus `periode`.
 *
 * @param {Array}  rows    baris `riwayat_prestasi` mentah.
 * @param {string} periode periode laporan yang sedang dibuka ('2026-09').
 * @param {Set|Array} [idSantri] batasi ke santri tertentu (mis. yang sedang tampil).
 * @returns {{ jumlah:number, periodeSebelum:string, sejak:string, santriIds:string[] }}
 */
export function snapshotSalahJendela(rows, periode, idSantri) {
  const sebelum = periodeSebelumnya(periode)
  const sejak = tglBukaRekapPeriode(periode) // '2026-08-29'
  const kosong = { jumlah: 0, periodeSebelum: sebelum, sejak, santriIds: [] }
  if (!sebelum || !sejak) return kosong
  const batas = idSantri ? new Set([...idSantri].map((x) => String(x))) : null
  const ids = new Set()
  for (const r of rows || []) {
    if (String(r?.periode || '') !== sebelum) continue
    const sid = String(r?.santri_id ?? '')
    if (!sid) continue
    if (batas && !batas.has(sid)) continue
    if (!sudahDinilaiBulan(r)) continue
    // `updatedAt` ISO UTC; dibandingkan sebagai teks tanggalnya saja (10 huruf pertama).
    // Baris tanpa updatedAt TIDAK dihitung: tanpa waktu tulis, tak ada dasar menuduhnya
    // salah bucket — dan menuduh berarti mengusulkan pemindahan yang bisa keliru.
    const hari = String(r?.updatedAt || '').slice(0, 10)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(hari)) continue
    if (hari >= sejak) ids.add(sid)
  }
  return { jumlah: ids.size, periodeSebelum: sebelum, sejak, santriIds: [...ids] }
}
