// tambalRiwayatPrestasi — menambal RIWAYAT bulanan yang tak pernah tertulis.
//
// v.1.3.8 (Kyai, 2 Sep 2026). Kyai hendak mengosongkan angka prestasi di data santri tiap
// tanggal 25. Itu aman HANYA bila tiap bulan sudah punya salinannya sendiri di
// `riwayat_prestasi` — dan sebagian besar belum:
//
//   InputBulananView TIDAK PERNAH menulis snapshot bulanan sampai v.1.3.8. Bulan-bulan yang
//   guru isi lewat layar itu karena itu hidup HANYA di `santri.prestasi_awal/akhir/total`.
//   Mengosongkan kolom itu berarti angkanya hilang permanen — tak ada riwayat yang
//   menampungnya. RekapPrestasiView sudah menulis snapshot sejak v.100d, jadi yang diisi
//   dari sana aman.
//
// Berkas ini menjawab satu pertanyaan saja, dan menjawabnya TANPA menulis apa pun:
// "kalau kolom prestasi di baris santri ini dikosongkan, ada yang hilang SELAMANYA atau
// tidak?" Penulisannya urusan pemanggil, sesudah Kyai melihat pratinjaunya.
//
// Pertanyaan itu sengaja dirumuskan begitu, dan bukan "angka ini milik bulan apa" seperti
// rancangan pertama. Data sungguhan yang membetulkannya: RekapPrestasiView menulis
// `riwayat_prestasi` tapi TIDAK menulis `catatan_bulanan`, sehingga 237 santri yang justru
// riwayatnya paling lengkap tampak "tanpa jejak bulan" dan nyaris dilaporkan terancam.
//
// BATAS YANG TAK BISA DITEMBUS, dan wajib disampaikan apa adanya: baris santri hanya
// menyimpan SATU set angka — "yang terakhir disimpan". Santri yang diisi Juli lalu Agustus
// sudah kehilangan angka Julinya sejak Agustus ditimpa, jauh sebelum berkas ini ada. Yang
// bisa diselamatkan hanya bulan TERAKHIR. Menebak bulan lain akan mengarang riwayat.
//
// Semua fungsi PURE — tak menyentuh store maupun DB.
import { petaPrestasiPeriode, sudahDinilaiBulan, idRiwayatPrestasi } from './prestasiBulanan'

const _teks = (v) => (v === undefined || v === null ? '' : String(v).trim())

/** Ada angka prestasi di baris santri? Juz & kelas TIDAK dihitung — keduanya keadaan
 *  berjalan yang selalu terisi, jadi memasukkannya membuat semua santri tampak berangka. */
export function punyaAngkaPrestasi(santri) {
  return !!(
    _teks(santri?.prestasi_awal) ||
    _teks(santri?.prestasi_akhir) ||
    _teks(santri?.prestasi_total)
  )
}

/**
 * Bulan TERAKHIR yang tercatat di `catatan_bulanan` santri → 'YYYY-MM'.
 *
 * Inilah penentu "angka ini milik bulan apa". `catatan_bulanan` adalah satu-satunya jejak
 * bulan yang ditinggalkan Input Bulanan (kuncinya 'YYYY_MM', ditulis tiap kali simpan),
 * dan angka di baris santri selalu berasal dari simpanan TERAKHIR.
 *
 * '' bila tak ada jejak sama sekali — dan itu sengaja tidak ditebak. Menaruh angka pada
 * bulan yang salah lebih buruk daripada membiarkannya tak tertambal: yang kedua masih bisa
 * dibetulkan manusia, yang pertama menyamar sebagai data sungguhan.
 */
export function periodeTerakhirCatatan(santri) {
  const cb = santri?.catatan_bulanan
  if (!cb || typeof cb !== 'object' || Array.isArray(cb)) return ''
  let top = ''
  for (const k of Object.keys(cb)) {
    const m = /^(\d{4})[-_](\d{2})$/.exec(String(k))
    if (!m) continue
    const b = Number(m[2])
    if (b < 1 || b > 12) continue
    const iso = `${m[1]}-${m[2]}`
    if (iso > top) top = iso
  }
  return top
}

/**
 * Peta santriId → berapa banyak riwayat BERANGKA yang dia punya (bulan apa pun).
 *
 * Inilah pertanyaan keselamatan yang sebenarnya, dan bukan pertanyaan yang mula-mula saya
 * ajukan. Rancangan pertama memakai `catatan_bulanan` sebagai satu-satunya penentu, lalu
 * data sungguhan menunjukkan lubangnya: **RekapPrestasiView menulis `riwayat_prestasi`
 * tapi TIDAK menulis `catatan_bulanan`**. Santri yang rajin diisi lewat layar itu karena
 * itu tampak "tanpa jejak bulan" padahal riwayatnya justru paling lengkap.
 */
function petaJumlahRiwayat(riwayatRows) {
  const m = new Map()
  for (const r of riwayatRows || []) {
    if (!sudahDinilaiBulan(r)) continue
    const sid = String(r?.santri_id ?? '')
    if (!sid) continue
    m.set(sid, (m.get(sid) || 0) + 1)
  }
  return m
}

/**
 * Periksa seluruh santri → apa yang benar-benar TERANCAM bila angka di data santri dihapus.
 *
 * Pertanyaannya bukan "bulan apa angka ini", melainkan "kalau kolom ini dikosongkan, ada
 * yang hilang selamanya atau tidak". Santri yang sudah punya riwayat berangka aman: rekam
 * jejaknya tersimpan, yang hilang cuma nilai "terakhir" yang memang bisa diisi ulang.
 *
 * @param {Array} santriList baris santri (boleh sudah terscope).
 * @param {Array} riwayatRows seluruh baris `riwayat_prestasi`.
 * @returns {{siap:Array, sudah:number, beresiko:Array, kosong:number, periode:Object}}
 *   siap     — terancam TAPI bulannya diketahui → aman ditambal otomatis
 *   sudah    — sudah punya riwayat berangka; tak disentuh
 *   beresiko — terancam DAN bulannya tak diketahui; TAK ditambal, perlu mata manusia
 *   kosong   — tak punya angka sama sekali
 *   periode  — { [YYYY-MM]: jumlah } sebaran `siap`, untuk pratinjau
 */
export function analisaTambal(santriList, riwayatRows) {
  const siap = []
  const beresiko = []
  let sudah = 0
  let kosong = 0
  const periode = {}
  const jumlahRiwayat = petaJumlahRiwayat(riwayatRows)

  // Peta (santriId → baris) per periode, dibangun sekali per periode yang benar-benar
  // dipakai — daftar riwayat bisa ribuan baris dan menyaringnya per santri akan O(n²).
  const petaPer = new Map()
  const petaUntuk = (p) => {
    if (!petaPer.has(p)) petaPer.set(p, petaPrestasiPeriode(riwayatRows, p))
    return petaPer.get(p)
  }

  for (const s of santriList || []) {
    if (!s || !s.id) continue
    if (!punyaAngkaPrestasi(s)) {
      kosong++
      continue
    }
    const sid = String(s.id)
    const p = periodeTerakhirCatatan(s)

    // Bulan yang diketahui DAN sudah berangka → memang tak ada yang perlu ditambal.
    if (p && sudahDinilaiBulan(petaUntuk(p).get(sid))) {
      sudah++
      continue
    }
    // Tak tahu bulannya, tapi santri ini punya riwayat berangka di bulan lain → rekam
    // jejaknya ada. Menambahkan tambalan di sini justru mengarang bulan.
    if (!p) {
      if (jumlahRiwayat.get(sid) > 0) sudah++
      else beresiko.push(s)
      continue
    }
    siap.push({
      id: idRiwayatPrestasi(sid, p),
      santri: s,
      periode: p,
      awal: _teks(s.prestasi_awal),
      akhir: _teks(s.prestasi_akhir),
      total: _teks(s.prestasi_total),
      juz: _teks(s.juz)
    })
    periode[p] = (periode[p] || 0) + 1
  }

  siap.sort(
    (a, b) =>
      String(b.periode).localeCompare(String(a.periode)) ||
      String(a.santri.nama || '').localeCompare(String(b.santri.nama || ''), 'id')
  )
  return { siap, sudah, beresiko, kosong, periode }
}

/** 'YYYY-MM' → 'Agustus 2026'. Untuk pratinjau. */
const NAMA_BULAN = [
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
export function labelPeriode(p) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(p || ''))
  return m ? `${NAMA_BULAN[Number(m[2]) - 1]} ${m[1]}` : String(p || '')
}
