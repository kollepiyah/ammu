// Nama desa/kecamatan dari koordinat (Kyai 25 Nov 2026: kartu Beranda menampilkan desa).
// GPS hanya memberi koordinat, jadi namanya ditanyakan ke layanan peta: OpenStreetMap
// (Nominatim — sampai tingkat desa), cadangan BigDataCloud (sampai kecamatan). Koordinat
// DIBULATKAN 0,005° (±500 m) sebelum dikirim, ditanya hanya saat lokasi berpindah, dan
// jawabannya disimpan di HP per titik bulat — HP yang diam tak bertanya lagi.
// Gagal apa pun → null; jadwal & kiblat tetap jalan, hanya namanya yang kosong.

const KUNCI = 'ammu_nama_tempat'
const MAKS_SIMPAN = 30

const bulat = (x) => Math.round(x * 200) / 200

function muat() {
  try {
    return JSON.parse(localStorage.getItem(KUNCI) || '{}') || {}
  } catch {
    return {}
  }
}
function simpan(peta) {
  try {
    const kunci = Object.keys(peta)
    // Batasi jumlah titik tersimpan: buang yang paling lama.
    while (kunci.length > MAKS_SIMPAN) delete peta[kunci.shift()]
    localStorage.setItem(KUNCI, JSON.stringify(peta))
  } catch {
    /* penyimpanan penuh — lain kali bertanya lagi */
  }
}

/** Bentuk jawaban Nominatim → { desa, kecamatan, kabupaten } (Indonesia: municipality = kecamatan). */
export function uraiNominatim(addr) {
  if (!addr || typeof addr !== 'object') return null
  const desa = addr.village || addr.suburb || addr.hamlet || addr.neighbourhood || ''
  const kecamatan = addr.municipality || addr.city_district || addr.town || ''
  const kabupaten = String(addr.county || addr.city || '').replace(/^(Kabupaten|Kota)\s+/i, '')
  if (!desa && !kecamatan && !kabupaten) return null
  return { desa, kecamatan, kabupaten }
}

/** Bentuk jawaban BigDataCloud → { desa:'', kecamatan, kabupaten } (adminLevel 6 = kecamatan, 5 = kab/kota). */
export function uraiBigDataCloud(j) {
  const adm = j?.localityInfo?.administrative || []
  const level = (n) => adm.find((a) => a.adminLevel === n)?.name || ''
  const kecamatan = level(6) || j?.locality || ''
  const kabupaten = level(5) || j?.city || ''
  if (!kecamatan && !kabupaten) return null
  return { desa: '', kecamatan, kabupaten }
}

async function ambilJson(url, ms = 8000) {
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null
  const t = ctl ? setTimeout(() => ctl.abort(), ms) : null
  try {
    const r = await fetch(url, { signal: ctl?.signal, headers: { Accept: 'application/json' } })
    if (!r.ok) return null
    return await r.json()
  } catch {
    return null
  } finally {
    if (t) clearTimeout(t)
  }
}

/** Nama tempat untuk koordinat, atau null. */
export async function cariNamaTempat(lat, lon) {
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null
  const bLat = bulat(lat)
  const bLon = bulat(lon)
  const kunci = `${bLat},${bLon}`
  const peta = muat()
  if (peta[kunci]) return peta[kunci]

  let hasil = uraiNominatim(
    (
      await ambilJson(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=14&accept-language=id&lat=${bLat}&lon=${bLon}`
      )
    )?.address
  )
  if (!hasil) {
    hasil = uraiBigDataCloud(
      await ambilJson(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?localityLanguage=id&latitude=${bLat}&longitude=${bLon}`
      )
    )
  }
  if (hasil) {
    peta[kunci] = hasil
    simpan(peta)
  }
  return hasil
}
