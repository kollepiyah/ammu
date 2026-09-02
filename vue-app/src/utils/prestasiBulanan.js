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

// ── v.1.3.8 · SIKLUS PENGISIAN & LEMBAGA YANG TERKENA ────────────────────────
//
// Kyai, 1 Sep 2026: "rekap prestasi itu adalah hasil dari bulan lalu, dan mengisinya
// adalah bulan lalu. misal sekarang september yg diisi adalah bulan agustus. nanti akhir
// september mengisi rekap prestasi september, dan maksimal pengisian adalah paling lambat
// tgl 5 setiap awal bulan."
//
// Ini menyingkap dua kekeliruan di kartu dasbor "Guru Belum Input", yang keduanya membuat
// angkanya nyaris tak berarti:
//   1. Ia menagih BULAN BERJALAN. Tiap tanggal 1, seluruh guru serentak dinyatakan "belum
//      input" untuk bulan yang memang belum boleh diisi siapa pun — sementara pekerjaan
//      yang benar-benar jatuh tempo (bulan LALU, batas tanggal 5) tak terpantau sama sekali.
//   2. Ia mencakup SEMUA lembaga ngaji, padahal rekap prestasi bulanan hanya milik PTPT &
//      PPPH sejak v.1.2.3 — TPQ Pagi/Sore & Pra PTPT ikut tertagih tanpa dasar.

/** Lembaga yang punya rekap prestasi bulanan. Sumber tunggal — dibaca RekapPrestasiView
 *  (daftar tombol + penyaring) DAN kartu dasbor, supaya keduanya tak bisa berbeda. */
export const LEMBAGA_PRESTASI_BULANAN = ['PTPT', 'PPPH']

/** Jendela pengisian DIBUKA tanggal 29 pada bulan yang dinilai sendiri. */
export const TGL_BUKA_REKAP = 29

/** Batas akhir pengisian: tanggal 5 pada bulan BERIKUTNYA dari periode yang diisi. */
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
 * Tanggal jendela pengisian DIBUKA untuk bulan itu — TGL_BUKA_REKAP, dijepit ke hari
 * terakhir bulan tsb. Februari 28 hari tak punya tanggal 29, dan tanpa penjepitan ini
 * jendela Februari tak akan pernah terbuka: rekapnya diam-diam terlewat setahun sekali.
 */
export function tglBukaRekap(tahun, bulan) {
  return Math.min(TGL_BUKA_REKAP, _hariDalamBulan(tahun, bulan))
}

/**
 * Periode yang SEDANG dikerjakan pada tanggal `todayIso`.
 *
 * Kyai (2 Sep 2026): "rekap prestasi itu diisi akhir bulan sampai tgl 5 awal bulan. tapi
 * datanya berasal dari bulan sebelumnya. misal sekarang tgl 2 september, guru mengisi rekap
 * mulai tgl 29 agustus-5 sept, isinya data dari agustus."
 *
 * Jadi jendelanya MENYEBERANGI pergantian bulan: 29 Agu s/d 5 Sep, isinya Agustus.
 *   tanggal >= 29  -> bulan BERJALAN (jendelanya baru dibuka; 29 Agu = mengisi Agustus)
 *   tanggal 1..28  -> bulan LALU     (2 Sep = masih mengisi Agustus)
 *
 * Sasaran TIDAK berpindah begitu lewat tanggal 5 — 10 Sep tetap Agustus, hanya berstatus
 * TERLAMBAT. Memindahkan sasaran di tanggal 6 akan menyembunyikan pekerjaan yang justru
 * belum selesai, persis kebalikan dari guna kartu ini.
 */
export function periodeRekapBerjalan(todayIso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(todayIso || '').slice(0, 10))
  if (!m) return ''
  const y = Number(m[1])
  const b = Number(m[2])
  const d = Number(m[3])
  if (b < 1 || b > 12) return ''
  const bulanIni = periodePrestasi(b, y)
  return d >= tglBukaRekap(y, b) ? bulanIni : periodeSebelumnya(bulanIni)
}

/** Tanggal jatuh tempo periode itu ('2026-08' -> '2026-09-05'). '' bila periode tak sah. */
export function batasRekap(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || ''))
  if (!m) return ''
  const y = Number(m[1])
  const b = Number(m[2])
  if (b < 1 || b > 12) return ''
  const ny = b === 12 ? y + 1 : y
  const nb = b === 12 ? 1 : b + 1
  return `${ny}-${String(nb).padStart(2, '0')}-${String(TGL_BATAS_REKAP).padStart(2, '0')}`
}

/** Sudah lewat batas? Dipakai kartu dasbor membedakan "belum jatuh tempo" dari "telat". */
export function rekapTerlambat(periode, todayIso) {
  const batas = batasRekap(periode)
  const hari = String(todayIso || '').slice(0, 10)
  return !!batas && /^\d{4}-\d{2}-\d{2}$/.test(hari) && hari > batas
}
