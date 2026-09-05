// periodeBisyaroh — JENDELA ABSENSI yang memberi makan satu slip bisyaroh.
//
// KYAI, 5 Sep 2026: "perhitungan bisyaroh dari absen dihitung dari tgl 25 sebelumnya
//   s/d 24 bulan berikutnya (mis: 25 Agustus – 24 September untuk bisyaroh September,
//   terbitnya bisyaroh 1–2 Oktober)."
//
// KENAPA ADA FILE INI. Sampai v.1.4.1 "periode" dipakai untuk DUA hal sekaligus dan
// keduanya kebetulan sama: nama bulan slip ('2026-09') DAN penyaring baris absensi
// (`tanggal.startsWith('2026-09')`). Karena kebetulan itu, aturan penyaringnya tercecer
// jadi empat salinan di dalam BisyarohView — hadir per shift, hadir tepat waktu, hadir
// sekolah (untuk JP), dan daftar tanggal hari efektif. Begitu jendelanya bergeser ke
// 25→24, empat salinan itu harus bergeser BERSAMAAN; kalau satu saja tertinggal, slip
// membayar bonus atas jendela yang berbeda dari yang dipakai menghitung JP-nya, dan
// selisihnya tak akan terlihat di layar mana pun.
//
// Jadi mulai sekarang: `periode` = NAMA BULAN SLIP (tetap 'YYYY-MM', tak berubah — id
// slip, riwayat, filter, dan impor Excel lama semuanya bergantung padanya), sedangkan
// TANGGAL ABSENSI yang boleh dibaca slip itu HANYA lewat fungsi di file ini.
//
// Alasan aturannya sendiri (kenapa bukan bulan kalender): absensi bulan berjalan baru
// lengkap di akhir bulan, sedangkan slip terbit tanggal 1–2. Menutup buku di tanggal 24
// memberi jeda ±6 hari untuk merapikan absen sebelum uangnya dihitung. Sisa hari
// (25–akhir bulan) tidak hilang — ia jadi pembuka jendela bulan BERIKUTNYA.
//
// Semua fungsi PURE. Tanggal masuk & keluar berupa string kalender 'YYYY-MM-DD' dan
// dibandingkan secara leksikografis, jadi tak ada satu pun Date lokal yang bisa
// tergelincir zona waktu (kelas bug yang sudah beberapa kali menggigit repo ini).

/**
 * Tanggal PEMBUKA jendela, di bulan SEBELUM periode. Ditulis sebagai konstanta karena
 * angka 25 & 24 muncul di dua tempat (awal & akhir) dan harus selalu bersebelahan:
 * akhir jendela = sehari sebelum pembuka bulan berikutnya, bukan angka yang berdiri
 * sendiri. Kalau suatu saat Kyai menggesernya (mis. ke 26), cukup ubah di sini.
 */
export const TGL_BUKA_PERIODE = 25

function pad2(n) {
  return String(n).padStart(2, '0')
}

/** '2026-09' → { y: 2026, m: 9 }; null bila bukan periode yang sah. */
function pecahPeriode(periode) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(periode || '').slice(0, 7))
  if (!m) return null
  const bulan = Number(m[2])
  if (bulan < 1 || bulan > 12) return null
  return { y: Number(m[1]), m: bulan }
}

/**
 * Jendela absensi periode → { start, end } ISO INKLUSIF.
 *
 *   '2026-09' → { start: '2026-08-25', end: '2026-09-24' }
 *   '2026-01' → { start: '2025-12-25', end: '2026-01-24' }  (menyeberang tahun)
 *
 * null bila periodenya tak sah — pemanggil menerjemahkannya sebagai "tak ada tanggal",
 * BUKAN "semua tanggal". Membiarkan periode rusak berarti seluruh tabel absensi, dan
 * itu akan membayar bonus kehadiran bertahun-tahun dalam satu slip.
 */
export function rentangPeriodeBisyaroh(periode) {
  const p = pecahPeriode(periode)
  if (!p) return null
  // Bulan sebelumnya; Januari mundur ke Desember tahun lalu.
  const ym = p.m === 1 ? { y: p.y - 1, m: 12 } : { y: p.y, m: p.m - 1 }
  return {
    start: `${ym.y}-${pad2(ym.m)}-${pad2(TGL_BUKA_PERIODE)}`,
    end: `${p.y}-${pad2(p.m)}-${pad2(TGL_BUKA_PERIODE - 1)}`
  }
}

/**
 * Penyaring tanggal untuk satu periode — `(iso) => boolean`.
 *
 * Bentuk fungsi-yang-mengembalikan-fungsi ini disengaja: pemanggilnya menyapu RIBUAN
 * baris absensi per guru, dan menurunkan ulang rentang di dalam loop berarti membayar
 * regex + perakitan string sekali per baris. Turunkan sekali di luar loop, pakai di dalam.
 * Periode tak sah → penyaring yang menolak SEMUANYA (lihat catatan di rentangPeriodeBisyaroh).
 */
export function penyaringPeriodeBisyaroh(periode) {
  const r = rentangPeriodeBisyaroh(periode)
  if (!r) return () => false
  return (iso) => {
    const t = String(iso || '').slice(0, 10)
    return t.length === 10 && t >= r.start && t <= r.end
  }
}

/**
 * Apakah satu baris absensi (tanggal ISO) masuk jendela periode ini?
 * Pengganti langsung `String(a.tanggal).startsWith(periode)` yang tersebar sebelumnya.
 */
export function dalamPeriodeBisyaroh(iso, periode) {
  return penyaringPeriodeBisyaroh(periode)(iso)
}

/**
 * Semua tanggal jendela periode — daftar penuh, TIDAK dipotong "sampai hari ini".
 * Padanan `tanggalBulanPenuh` untuk simulasi plafon (bulan penuh, hadir penuh).
 */
export function tanggalPeriodeBisyaroh(periode) {
  const r = rentangPeriodeBisyaroh(periode)
  if (!r) return []
  return deretTanggal(r.start, r.end)
}

/**
 * Tanggal jendela s/d `hariIni` (inklusif) — dipakai slip SUNGGUHAN.
 *
 * Slip bulan berjalan tak boleh menghitung hari yang belum terjadi: guru akan terlihat
 * "belum hadir" di hari yang bahkan belum datang, dan penyebut "100% tepat waktu"
 * membesar tanpa sebab. Sesudah tanggal 24 lewat, potongan ini tak berpengaruh lagi —
 * jendelanya sudah tertutup penuh, jadi slip yang di-generate ulang bulan depan pun
 * memberi angka yang sama.
 *
 * `hariIni` WAJIB tanggal WIB (utils/format todayJakarta) — `toISOString()` memakai UTC
 * dan memundurkan tanggal pukul 00:00–06:59 WIB.
 */
export function tanggalPeriodeSampai(periode, hariIni) {
  const r = rentangPeriodeBisyaroh(periode)
  if (!r) return []
  const h = String(hariIni || '').slice(0, 10)
  const akhir = h.length === 10 && h < r.end ? h : r.end
  return deretTanggal(r.start, akhir)
}

/**
 * Hari TERAKHIR jendela ('YYYY-MM-DD') — titik ukur yang stabil untuk apa pun yang
 * tak boleh berubah saat slip di-generate ulang bulan depan.
 */
export function akhirPeriodeBisyaroh(periode) {
  return rentangPeriodeBisyaroh(periode)?.end || ''
}

/**
 * Label manusia untuk jendelanya, mis. "25 Agu – 24 Sep 2026". Dipakai di layar supaya
 * Kyai bisa melihat rentang yang SEDANG dihitung, bukan menebaknya dari nama bulan —
 * "Bisyaroh September" yang isinya sebagian Agustus adalah hal pertama yang akan
 * ditanyakan guru saat menerima slipnya.
 */
const BULAN_PENDEK = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des'
]
export function labelPeriodeBisyaroh(periode) {
  const r = rentangPeriodeBisyaroh(periode)
  if (!r) return ''
  const pecah = (iso) => {
    const [y, m, d] = iso.split('-').map(Number)
    return { y, m, d }
  }
  const a = pecah(r.start)
  const b = pecah(r.end)
  const kiri = `${a.d} ${BULAN_PENDEK[a.m - 1]}${a.y === b.y ? '' : ' ' + a.y}`
  return `${kiri} – ${b.d} ${BULAN_PENDEK[b.m - 1]} ${b.y}`
}

/** Deret tanggal kalender inklusif — iterasi di UTC murni supaya bebas zona waktu. */
function deretTanggal(startIso, endIso) {
  if (!startIso || !endIso || startIso > endIso) return []
  const out = []
  const [ys, ms, ds] = startIso.split('-').map(Number)
  const cur = new Date(Date.UTC(ys, ms - 1, ds))
  let guard = 0
  while (guard++ < 400) {
    const iso = `${cur.getUTCFullYear()}-${pad2(cur.getUTCMonth() + 1)}-${pad2(cur.getUTCDate())}`
    if (iso > endIso) break
    out.push(iso)
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
  return out
}
