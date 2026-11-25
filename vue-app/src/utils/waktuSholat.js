// Jadwal sholat — SATU sumber kebenaran (blueprint Ammu publik §4.1). Fungsi murni, tanpa
// pustaka luar: posisi matahari ala almanak (presisi ±0,01°), lalu sudut & ihtiyath per metode.
// Metode Kemenag diverifikasi terhadap jadwal resmi Kab. Sidoarjo (12 tanggal, 4 musim) di
// tests/unit/waktuSholat.test.js — semua selisih ≤ 1 menit. Falakiyah NU BELUM ada: data
// pembanding LFNU belum didapat, dan sudutnya tak boleh ditebak.

const D2R = Math.PI / 180
const R2D = 180 / Math.PI
const sin = (d) => Math.sin(d * D2R)
const cos = (d) => Math.cos(d * D2R)
const tan = (d) => Math.tan(d * D2R)
const asin = (x) => Math.asin(x) * R2D
const acos = (x) => Math.acos(Math.max(-1, Math.min(1, x))) * R2D
const atan2 = (y, x) => Math.atan2(y, x) * R2D
const acot = (x) => Math.atan(1 / x) * R2D
const putar = (a, b) => a - b * Math.floor(a / b)

/** Koordinat pesantren (Jl. Kol. Sugiono, Panjunan, Waru, Sidoarjo) — cadangan bila lokasi HP tak ada. */
export const LOKASI_PESANTREN = Object.freeze({
  lat: -7.352,
  lon: 112.729,
  nama: 'Pesantren Mambaul Ulum, Waru',
  desa: 'Panjunan',
  kecamatan: 'Waru',
  kabupaten: 'Sidoarjo'
})

/** Nama tempat ringkas (desa → kecamatan → nama) untuk kartu Beranda. */
export function namaTempatPendek(l) {
  return (l && (l.desa || l.kecamatan || l.nama)) || 'Lokasi HP'
}
/** "Panjunan, Waru" — desa & kecamatan untuk layar Jadwal Sholat. */
export function namaTempatPanjang(l) {
  if (!l) return 'Lokasi HP'
  const bagian = [l.desa, l.kecamatan].filter(Boolean)
  if (!bagian.length) return l.kabupaten || l.nama || 'Lokasi HP'
  return bagian.join(', ')
}

/**
 * Metode perhitungan. `ihtiyath` (menit) ditambahkan lalu dibulatkan ke ATAS (terbit: ke
 * bawah) — pola Kemenag: jadwal tak pernah lebih awal dari waktu sebenarnya.
 * `isyaMenit` = Isya sekian menit sesudah Maghrib (Umm al-Qura), mengganti sudut Isya.
 */
export const METODE = Object.freeze({
  kemenag: {
    kunci: 'kemenag',
    label: 'Kemenag RI',
    keterangan: 'Subuh 20°, Isya 18°, ihtiyath 2 menit (Dzuhur 3)',
    subuh: 20,
    isya: 18,
    terbit: 1.0, // 16' jari-jari + 34' refraksi + kerendahan ufuk ±10 m (dikalibrasi ke jadwal resmi)
    dhuha: 4.5,
    imsakMenit: 10,
    ihtiyath: { subuh: 2, terbit: -2, dhuha: 2, dzuhur: 3, ashar: 2, maghrib: 2, isya: 2 },
    bulat: 'ihtiyath'
  },
  ummulqura: {
    kunci: 'ummulqura',
    label: 'Umm al-Qura (Makkah)',
    keterangan: 'Subuh 18,5°, Isya 90 menit sesudah Maghrib',
    subuh: 18.5,
    isyaMenit: 90,
    terbit: 0.8333,
    dhuha: 4.5,
    imsakMenit: 10,
    ihtiyath: { subuh: 0, terbit: 0, dhuha: 0, dzuhur: 0, ashar: 0, maghrib: 0, isya: 0 },
    bulat: 'terdekat'
  }
})
export const METODE_BAWAAN = 'kemenag'

export const NAMA_WAKTU = Object.freeze({
  imsak: 'Imsak',
  subuh: 'Subuh',
  terbit: 'Terbit',
  dhuha: 'Dhuha',
  dzuhur: 'Dzuhur',
  ashar: 'Ashar',
  maghrib: 'Maghrib',
  isya: 'Isya'
})
/** Lima waktu wajib — yang disorot sebagai "berikutnya". */
export const WAKTU_WAJIB = Object.freeze(['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'])
const URUTAN = ['imsak', 'subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya']

function julian(y, m, d) {
  if (m <= 2) {
    y -= 1
    m += 12
  }
  const A = Math.floor(y / 100)
  const B = 2 - A + Math.floor(A / 4)
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5
}

/** Deklinasi & perata waktu (jam) untuk hari Julian `jd`. */
function posisiMatahari(jd) {
  const D = jd - 2451545.0
  const g = putar(357.529 + 0.98560028 * D, 360)
  const q = putar(280.459 + 0.98564736 * D, 360)
  const L = putar(q + 1.915 * sin(g) + 0.02 * sin(2 * g), 360)
  const e = 23.439 - 0.00000036 * D
  const RA = putar(atan2(cos(e) * sin(L), cos(L)) / 15, 24)
  let eqt = q / 15 - RA
  if (eqt > 12) eqt -= 24
  if (eqt < -12) eqt += 24
  return { decl: asin(sin(e) * sin(L)), eqt }
}

function keMenit(jam, ihtiyath, bulat) {
  const v = jam * 60 + ihtiyath
  if (bulat === 'terdekat') return Math.round(v)
  return ihtiyath < 0 ? Math.floor(v) : Math.ceil(v)
}

export function formatMenit(m) {
  const n = putar(Math.round(m), 1440)
  return `${String(Math.floor(n / 60)).padStart(2, '0')}:${String(n % 60).padStart(2, '0')}`
}

/**
 * Hitung jadwal sehari.
 * @param {{tanggal:string, lat:number, lon:number, tz?:number, metode?:string}} o
 *   tanggal 'YYYY-MM-DD'; tz = selisih jam dari UTC (WIB = 7).
 * @returns {{metode:string, menit:Object<string,number>, jam:Object<string,string>}}
 *   menit = menit sejak tengah malam waktu setempat; jam = 'HH:MM'.
 */
export function hitungWaktuSholat({ tanggal, lat, lon, tz = 7, metode = METODE_BAWAAN }) {
  const M = METODE[metode] || METODE[METODE_BAWAAN]
  const [y, m, d] = String(tanggal).split('-').map(Number)
  const jd0 = julian(y, m, d) - lon / (15 * 24)
  const pada = (jam) => posisiMatahari(jd0 + jam / 24)
  const tengahHari = (jam) => 12 - pada(jam).eqt
  // Sudut jam (jam) saat matahari berada `turun` derajat di bawah ufuk.
  const sudutJam = (turun, jam) => {
    const { decl } = pada(jam)
    return acos((-sin(turun) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15
  }
  // Ashar Syafi'i: bayangan = 1× tinggi benda + bayangan saat istiwa'.
  const turunAshar = (jam) => -acot(1 + tan(Math.abs(lat - pada(jam).decl)))

  // Dua putaran: posisi matahari dihitung ulang pada perkiraan waktunya sendiri.
  let t = { subuh: 5, terbit: 6, dhuha: 6.5, dzuhur: 12, ashar: 15, maghrib: 18, isya: 19 }
  for (let i = 0; i < 2; i++) {
    t = {
      subuh: tengahHari(t.subuh) - sudutJam(M.subuh, t.subuh),
      terbit: tengahHari(t.terbit) - sudutJam(M.terbit, t.terbit),
      dhuha: tengahHari(t.dhuha) - sudutJam(-M.dhuha, t.dhuha),
      dzuhur: tengahHari(t.dzuhur),
      ashar: tengahHari(t.ashar) + sudutJam(turunAshar(t.ashar), t.ashar),
      maghrib: tengahHari(t.maghrib) + sudutJam(M.terbit, t.maghrib),
      isya: M.isyaMenit
        ? tengahHari(t.maghrib) + sudutJam(M.terbit, t.maghrib) + M.isyaMenit / 60
        : tengahHari(t.isya) + sudutJam(M.isya, t.isya)
    }
  }
  const geser = tz - lon / 15
  const menit = {}
  for (const k of Object.keys(t)) menit[k] = keMenit(t[k] + geser, M.ihtiyath[k] || 0, M.bulat)
  menit.imsak = menit.subuh - M.imsakMenit

  const jam = {}
  for (const k of URUTAN) jam[k] = formatMenit(menit[k])
  return { metode: M.kunci, menit, jam }
}

/**
 * Waktu wajib berikutnya dari `menitSekarang` (menit sejak tengah malam). Sesudah Isya →
 * Subuh esok (`besok` = true; pemanggil memberi jadwal esok bila ada, kalau tidak dipakai Subuh hari ini).
 */
export function waktuBerikutnya(jadwal, menitSekarang, jadwalBesok = null) {
  for (const k of WAKTU_WAJIB) {
    const m = jadwal.menit[k]
    if (m > menitSekarang) return { kunci: k, menit: m, sisa: m - menitSekarang, besok: false }
  }
  const m = (jadwalBesok || jadwal).menit.subuh
  return { kunci: 'subuh', menit: m, sisa: m + 1440 - menitSekarang, besok: true }
}

/** "1 j 30 m" / "12 m" — sisa waktu ringkas. */
export function formatSisa(menit) {
  const n = Math.max(0, Math.round(menit))
  const j = Math.floor(n / 60)
  const m = n % 60
  return j ? `${j} j ${m} m` : `${m} m`
}

/** Jarak dua titik (km, haversine) — dipakai memutuskan lokasi perlu diperbarui (> ±10 km). */
export function jarakKm(a, b) {
  const dLat = (b.lat - a.lat) * D2R
  const dLon = (b.lon - a.lon) * D2R
  const h = Math.sin(dLat / 2) ** 2 + cos(a.lat) * cos(b.lat) * Math.sin(dLon / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

/** Detik dari `kini` (Date) sampai waktu `berikutnya` (hasil waktuBerikutnya) — untuk hitung mundur. */
export function detikMenuju(berikutnya, kini) {
  const t = new Date(kini)
  t.setHours(0, 0, 0, 0)
  t.setMinutes(berikutnya.menit + (berikutnya.besok ? 1440 : 0))
  return Math.max(0, Math.round((t.getTime() - kini.getTime()) / 1000))
}

/** 3432 → "− 00 : 57 : 12" (gaya hitung mundur NU Online). */
export function formatHitungMundur(detik) {
  const n = Math.max(0, Math.floor(detik))
  const p = (x) => String(x).padStart(2, '0')
  return `− ${p(Math.floor(n / 3600))} : ${p(Math.floor((n % 3600) / 60))} : ${p(n % 60)}`
}
