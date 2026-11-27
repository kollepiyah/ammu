// useIbadah — setelan & lokasi untuk Jadwal Sholat dan Kiblat (blueprint Ammu publik F2).
// State tunggal se-aplikasi, disimpan di HP (localStorage) — TANPA Supabase sama sekali:
// jadwal dihitung di HP dari koordinat, jadi fitur ini nol egress dan jalan tanpa internet.
// Lokasi lewat navigator.geolocation (WebView Capacitor meneruskan izinnya ke Android);
// tak pernah di latar belakang (blueprint §4.1).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  hitungWaktuSholat,
  waktuBerikutnya,
  jarakKm,
  LOKASI_PESANTREN,
  METODE,
  METODE_BAWAAN
} from '@/utils/waktuSholat'
import { cariNamaTempat } from '@/services/namaTempat'

const KUNCI = 'ammu_ibadah'
// Lokasi baru dianggap "pindah" bila bergeser lebih dari ini (blueprint: ±10 km).
const AMBANG_PINDAH_KM = 10
// Pembaruan otomatis paling sering sekali per jangka ini (saat app dibuka / kembali dari latar).
const JEDA_OTOMATIS_MS = 30 * 60 * 1000

/** Kota pilihan manual — titik acuan kabupaten/kota (cukup untuk jadwal ±1 menit). */
export const DAFTAR_KOTA = Object.freeze([
  {
    nama: 'Waru (Pesantren)',
    lat: LOKASI_PESANTREN.lat,
    lon: LOKASI_PESANTREN.lon,
    desa: LOKASI_PESANTREN.desa,
    kecamatan: LOKASI_PESANTREN.kecamatan,
    kabupaten: LOKASI_PESANTREN.kabupaten
  },
  { nama: 'Sidoarjo', lat: -7.45, lon: 112.717 },
  { nama: 'Surabaya', lat: -7.2575, lon: 112.7521 },
  { nama: 'Gresik', lat: -7.1566, lon: 112.6555 },
  { nama: 'Mojokerto', lat: -7.4722, lon: 112.4338 },
  { nama: 'Pasuruan', lat: -7.6453, lon: 112.9075 },
  { nama: 'Malang', lat: -7.9666, lon: 112.6326 },
  { nama: 'Lamongan', lat: -7.1167, lon: 112.4167 },
  { nama: 'Jombang', lat: -7.5459, lon: 112.2335 },
  { nama: 'Bangkalan', lat: -7.0455, lon: 112.7351 },
  { nama: 'Kediri', lat: -7.8166, lon: 112.0119 },
  { nama: 'Jember', lat: -8.1724, lon: 113.6995 },
  { nama: 'Banyuwangi', lat: -8.2191, lon: 114.3691 },
  { nama: 'Semarang', lat: -6.9932, lon: 110.4203 },
  { nama: 'Yogyakarta', lat: -7.7956, lon: 110.3695 },
  { nama: 'Jakarta', lat: -6.1754, lon: 106.8272 }
])

function muat() {
  try {
    const o = JSON.parse(localStorage.getItem(KUNCI) || '{}') || {}
    return o && typeof o === 'object' ? o : {}
  } catch {
    return {}
  }
}

const awal = muat()
// Metode hanya diingat bila DIPILIH pengguna; selebihnya ikut bawaan (kini Falakiyah NU). Simpanan
// lama tanpa penanda ini menyimpan 'kemenag' diam-diam — ikut bawaan yang baru.
let metodeDipilih = !!awal.metodeDipilih && !!METODE[awal.metode]
const metode = ref(metodeDipilih ? awal.metode : METODE_BAWAAN)
const otomatis = ref(awal.otomatis !== false)
const lokasi = ref(
  awal.lokasi && Number.isFinite(awal.lokasi.lat) && Number.isFinite(awal.lokasi.lon)
    ? // Titik pesantren tersimpan versi lama belum bernama desa — lengkapi dari sumbernya.
      awal.lokasi.sumber === 'pesantren'
      ? { ...awal.lokasi, ...LOKASI_PESANTREN }
      : awal.lokasi
    : { ...LOKASI_PESANTREN, sumber: 'pesantren', diperbarui: '' }
)
const memuatLokasi = ref(false)
const galatLokasi = ref('')
const sekarang = ref(new Date())
let _pemakai = 0
let _detak = null
let _pendengar = null

function simpan() {
  try {
    localStorage.setItem(
      KUNCI,
      JSON.stringify({
        metode: metode.value,
        metodeDipilih,
        otomatis: otomatis.value,
        lokasi: lokasi.value
      })
    )
  } catch {
    /* penyimpanan penuh/terkunci — setelan tetap berlaku se-sesi */
  }
}

function tersedia() {
  return typeof navigator !== 'undefined' && !!navigator.geolocation
}

/** Izin lokasi sudah diberikan? (tanpa memunculkan dialog). null = tak bisa diketahui. */
async function izinSudahAda() {
  try {
    const r = await navigator.permissions?.query?.({ name: 'geolocation' })
    if (!r) return null
    if (r.state === 'granted') return true
    if (r.state === 'denied') return false
    // Di Android WebView (Capacitor), permissions.query sering tetap mengembalikan 'prompt'
    // meski izin lokasi sudah pernah diberikan ke OS. Bila sebelumnya sudah pernah mendapat
    // lokasi GPS, izinkan penyegaran otomatis tanpa memblokir; tamu baru tetap tidak diganggu.
    const isNative =
      typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.() === true
    if (isNative && lokasi.value.sumber === 'gps') return true
    return false
  } catch {
    return null
  }
}

/**
 * Minta lokasi HP. `paksa` = pengguna menekan tombol (boleh memunculkan dialog izin).
 * Tanpa paksa hanya jalan bila izin SUDAH ada — Beranda tak boleh tiba-tiba meminta izin.
 */
async function perbaruiLokasi({ paksa = false } = {}) {
  if (!tersedia() || memuatLokasi.value) return false
  if (!paksa) {
    if (!otomatis.value) return false
    if (lokasi.value.sumber === 'kota') return false
    const izin = await izinSudahAda()
    if (izin === false) return false
    const t = Date.parse(lokasi.value.diperbarui || '')
    if (lokasi.value.sumber === 'gps' && t && Date.now() - t < JEDA_OTOMATIS_MS) return false
    // Selagi menunggu izin, layar lain bisa sudah memulai pembacaan.
    if (memuatLokasi.value) return false
  }
  memuatLokasi.value = true
  galatLokasi.value = ''
  try {
    const pos = await new Promise((ok, gagal) =>
      navigator.geolocation.getCurrentPosition(ok, gagal, {
        enableHighAccuracy: false, // izin "perkiraan" cukup untuk jadwal & kiblat
        timeout: 20000,
        maximumAge: 10 * 60 * 1000
      })
    )
    const baru = {
      lat: Math.round(pos.coords.latitude * 1e4) / 1e4,
      lon: Math.round(pos.coords.longitude * 1e4) / 1e4
    }
    const lama = lokasi.value
    const pindah = lama.sumber !== 'gps' || jarakKm(lama, baru) > AMBANG_PINDAH_KM
    lokasi.value = {
      ...(pindah ? baru : { lat: lama.lat, lon: lama.lon }),
      nama: 'Lokasi HP',
      // Nama desa ikut koordinat: dipertahankan selama tak pindah, ditanya ulang bila pindah.
      desa: pindah ? '' : lama.desa || '',
      kecamatan: pindah ? '' : lama.kecamatan || '',
      kabupaten: pindah ? '' : lama.kabupaten || '',
      sumber: 'gps',
      diperbarui: new Date().toISOString()
    }
    if (paksa) otomatis.value = true
    simpan()
    lengkapiNamaTempat()
    return true
  } catch (e) {
    // 1 = izin ditolak, 2 = tak tersedia (GPS mati), 3 = waktu habis. Ditolak → sakelar
    // otomatis dimatikan supaya layar tak terus-menerus meminta izin yang sama.
    if (e?.code === 1) {
      otomatis.value = false
      simpan()
    }
    galatLokasi.value =
      e?.code === 1
        ? 'Izin lokasi ditolak. Jadwal memakai lokasi terakhir/pesantren.'
        : 'Lokasi belum terbaca. Pastikan GPS/Lokasi HP menyala.'
    return false
  } finally {
    memuatLokasi.value = false
  }
}

/** Lokasi HP tanpa nama → tanyakan nama desa/kecamatan (sekali; jawaban disimpan per titik). */
let _mencariNama = false
async function lengkapiNamaTempat() {
  const l = lokasi.value
  if (l.sumber !== 'gps' || l.desa || l.kecamatan || _mencariNama) return
  _mencariNama = true
  try {
    const n = await cariNamaTempat(l.lat, l.lon)
    // Lokasi bisa sudah berganti selagi menunggu jawaban — jangan tempel nama ke titik lain.
    if (n && lokasi.value.lat === l.lat && lokasi.value.lon === l.lon) {
      lokasi.value = { ...lokasi.value, ...n }
      simpan()
    }
  } finally {
    _mencariNama = false
  }
}

function setMetode(k) {
  if (!METODE[k]) return
  metode.value = k
  metodeDipilih = true
  simpan()
}
function setOtomatis(v) {
  otomatis.value = !!v
  simpan()
  if (otomatis.value) perbaruiLokasi({ paksa: true })
}
function pilihKota(kota) {
  if (!kota) return
  otomatis.value = false
  galatLokasi.value = ''
  lokasi.value = {
    lat: kota.lat,
    lon: kota.lon,
    nama: kota.nama,
    desa: kota.desa || '',
    kecamatan: kota.kecamatan || '',
    kabupaten: kota.kabupaten || '',
    sumber: 'kota',
    diperbarui: new Date().toISOString()
  }
  simpan()
}

function tz(d) {
  return -d.getTimezoneOffset() / 60
}
function isoLokal(d) {
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
}

/** Jadwal untuk tanggal 'YYYY-MM-DD' pada lokasi & metode aktif. */
function jadwalTanggal(tanggal) {
  const [y, m, d] = tanggal.split('-').map(Number)
  return hitungWaktuSholat({
    tanggal,
    lat: lokasi.value.lat,
    lon: lokasi.value.lon,
    tz: tz(new Date(y, m - 1, d, 12)),
    metode: metode.value
  })
}

export function useIbadah({ otomatisSaatDibuka = true } = {}) {
  // Tanggal & zona dari jam HP: jadwal mengikuti tempat HP berada, bukan WIB tetap.
  const hariIni = computed(() => isoLokal(sekarang.value))
  const jadwal = computed(() => jadwalTanggal(hariIni.value))
  const jadwalBesok = computed(() => {
    const b = new Date(sekarang.value)
    b.setDate(b.getDate() + 1)
    return jadwalTanggal(isoLokal(b))
  })
  const menitSekarang = computed(() => sekarang.value.getHours() * 60 + sekarang.value.getMinutes())
  const berikutnya = computed(() =>
    waktuBerikutnya(jadwal.value, menitSekarang.value, jadwalBesok.value)
  )

  onMounted(() => {
    _pemakai++
    if (!_detak) {
      _detak = setInterval(() => (sekarang.value = new Date()), 20000)
      // Kembali dari latar → jam & (bila izin ada) lokasi disegarkan.
      _pendengar = () => {
        if (document.hidden) return
        sekarang.value = new Date()
        perbaruiLokasi()
      }
      document.addEventListener('visibilitychange', _pendengar)
    }
    sekarang.value = new Date()
    if (otomatisSaatDibuka) perbaruiLokasi()
    lengkapiNamaTempat() // lokasi HP lama (sebelum ada nama desa)
  })
  onUnmounted(() => {
    _pemakai = Math.max(0, _pemakai - 1)
    if (_pemakai === 0 && _detak) {
      clearInterval(_detak)
      _detak = null
      document.removeEventListener('visibilitychange', _pendengar)
      _pendengar = null
    }
  })

  return {
    metode,
    otomatis,
    lokasi,
    memuatLokasi,
    galatLokasi,
    sekarang,
    hariIni,
    jadwal,
    berikutnya,
    menitSekarang,
    jadwalTanggal,
    perbaruiLokasi,
    setMetode,
    setOtomatis,
    pilihKota,
    geolokasiTersedia: tersedia()
  }
}
