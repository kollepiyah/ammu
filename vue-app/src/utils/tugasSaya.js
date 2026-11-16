// v.1.5.0 (gelombang 3) — "Tugas Saya": SATU sumber daftar tugas seorang guru.
//
// Daftar yang sama dipakai TIGA tempat: kartu beranda, halaman Tugas, dan widget home
// screen Android. Kalau penyusunannya disalin ke tiap tampilan, ketiganya pasti berpisah
// isi — kelas bug "cermin" yang sudah beberapa kali menggigit (lihat shift guru).
//
// Karena itu fungsi di sini PURE: tanggal hari ini DIKIRIM pemanggil, bukan dibaca dari
// jam mesin, supaya hasilnya bisa diuji dan tak berubah sendiri saat lewat tengah malam.
import { labelSesi } from '@/utils/pondokLajuSesi'

// Judul laci kedua. Kyai menolak kata "tunggakan" (terdengar seperti punya utang), jadi
// kata ini disimpan SATU tempat — ganti di sini, ketiga tampilan ikut.
export const LABEL_PERLU = 'Perlu Dikerjakan'
export const LABEL_TERJADWAL = 'Terjadwal'

/**
 * Metadata tiap jenis tugas. Warna dan tujuan ketukan diputuskan DI SINI, bukan di
 * komponen, supaya kartu beranda dan halaman Tugas tak memakai warna/rute yang berbeda.
 */
export const JENIS_TUGAS = {
  piket_laju: { label: 'Piket Pondok Laju', warna: 'emerald', rute: '/pondok-laju' },
  seremonial: { label: 'Seremonial PTPT', warna: 'violet', rute: '/ceremonial' },
  capaian_laju: { label: 'Capaian Pondok Laju', warna: 'amber', rute: '/pondok-laju' },
  glondongan: { label: 'Tes Glondongan', warna: 'sky', rute: '/glondongan' },
  tes_sekolah: { label: 'Tes Sekolah', warna: 'cyan', rute: '/capaian-prestasi' },
  input_bulanan: { label: 'Input Bulanan', warna: 'rose', rute: '/input-bulanan' },
  izin_guru: { label: 'Izin Guru', warna: 'orange', rute: '/perizinan' }
}

const KELOMPOK_TERJADWAL = ['hari_ini', 'besok', 'minggu_ini']

/**
 * Geser tanggal 'YYYY-MM-DD' sebanyak n hari.
 * Sengaja lewat UTC: `new Date('2026-11-16')` di mesin WIB bisa mundur sehari.
 */
export function geserHari(tanggal, n) {
  const p = String(tanggal || '').split('-')
  if (p.length !== 3) return ''
  const d = new Date(Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2])))
  if (Number.isNaN(d.getTime())) return ''
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** 'lewat' | 'hari_ini' | 'besok' | 'minggu_ini' | 'nanti' | '' (tanggal tak terbaca) */
export function kelompokTanggal(tanggal, hariIni, horizonHari = 7) {
  const t = String(tanggal || '')
  const h = String(hariIni || '')
  if (t.length !== 10 || h.length !== 10) return ''
  if (t < h) return 'lewat'
  if (t === h) return 'hari_ini'
  if (t === geserHari(h, 1)) return 'besok'
  const batas = geserHari(h, horizonHari)
  return batas && t <= batas ? 'minggu_ini' : 'nanti'
}

function tambahPerlu(keranjang, item) {
  if (!keranjang.some((x) => x.id === item.id)) keranjang.push(item)
}

/**
 * Susun daftar tugas seorang guru dari baris-baris mentah tiap sumber.
 *
 * Pemanggil yang menarik datanya (komposabel/edge function); fungsi ini hanya menyaring
 * dan merapikan. Semua larik boleh kosong — guru tanpa tugas adalah keadaan NORMAL dan
 * harus menghasilkan daftar kosong, bukan galat.
 *
 * @param {object} opt
 * @param {string} opt.guruId        id guru yang sedang dilihat
 * @param {string} opt.hariIni       'YYYY-MM-DD' (pakai todayJakarta() dari pemanggil)
 * @param {number} [opt.horizonHari] berapa hari ke depan dianggap "terjadwal" (default 7)
 * @param {Array}  [opt.jadwalLaju]  baris pondok_laju_jadwal
 * @param {Array}  [opt.capaianLaju] baris pondok_laju_capaian (untuk tahu mana yang kosong)
 * @param {Array}  [opt.seremonial]  baris ceremonial_ptpt
 * @param {Array}  [opt.glondongan]  baris tes_glondongan
 * @param {Array}  [opt.tesSekolah]  baris tes_sekolah
 * @param {Array}  [opt.izinMenunggu] baris izin_guru yang SUDAH disaring "menunggu" oleh pemanggil
 * @param {number} [opt.inputBulananBelum] jumlah kelas/lembaga yang belum diinput bulan ini
 * @param {boolean}[opt.sebagaiPj]   true kalau guru ini PJ (izin orang lain jadi tugasnya)
 * @returns {{terjadwal:Array, perlu:Array, total:number}}
 */
export function susunTugasSaya(opt = {}) {
  const {
    guruId,
    hariIni,
    horizonHari = 7,
    jadwalLaju = [],
    capaianLaju = [],
    seremonial = [],
    glondongan = [],
    tesSekolah = [],
    izinMenunggu = [],
    inputBulananBelum = 0,
    sebagaiPj = false
  } = opt

  const me = String(guruId ?? '')
  const terjadwal = []
  const perlu = []
  if (!me || String(hariIni || '').length !== 10) return { terjadwal, perlu, total: 0 }

  // --- 1. Piket Pondok Laju yang akan datang ---
  for (const r of jadwalLaju) {
    if (String(r?.guru_id ?? '') !== me) continue
    const tgl = String(r?.tanggal || '')
    const k = kelompokTanggal(tgl, hariIni, horizonHari)
    if (!KELOMPOK_TERJADWAL.includes(k)) continue
    const d = r?.data || r || {}
    terjadwal.push({
      id: `piket|${tgl}|${r?.sesi || ''}|${d.kelas_key || ''}`,
      jenis: 'piket_laju',
      judul: `Piket ${labelSesi(r?.sesi)}`,
      detail: String(d.kelas_guru || d.kelas_key || ''),
      tanggal: tgl,
      jam: '',
      kelompok: k,
      rute: JENIS_TUGAS.piket_laju.rute
    })
  }

  // --- 2. Piket yang sudah lewat tapi capaiannya belum diisi ---
  // Kunci capaian sengaja tanggal|sesi saja: satu baris capaian apa pun berarti guru itu
  // sudah membuka dan mengisi sesi tersebut.
  const sudahIsi = new Set(
    capaianLaju
      .filter((c) => String(c?.guru_id ?? '') === me)
      .map((c) => `${String(c?.tanggal || '')}|${String(c?.sesi || '')}`)
  )
  const batasMundur = geserHari(hariIni, -horizonHari)
  for (const r of jadwalLaju) {
    if (String(r?.guru_id ?? '') !== me) continue
    const tgl = String(r?.tanggal || '')
    if (tgl.length !== 10 || tgl >= hariIni || (batasMundur && tgl < batasMundur)) continue
    const sesi = String(r?.sesi || '')
    if (sudahIsi.has(`${tgl}|${sesi}`)) continue
    tambahPerlu(perlu, {
      id: `capaian|${tgl}|${sesi}`,
      jenis: 'capaian_laju',
      judul: `Capaian ${labelSesi(sesi)} belum diisi`,
      detail: tgl,
      tanggal: tgl,
      jam: '',
      kelompok: 'lewat',
      rute: JENIS_TUGAS.capaian_laju.rute
    })
  }

  // --- 3. Seremonial PTPT tempat guru ini jadi penyimak ---
  for (const r of seremonial) {
    const d = r?.data || {}
    const ikut =
      Array.isArray(d.penyimak_guru) && d.penyimak_guru.some((g) => String(g?.id ?? '') === me)
    if (!ikut) continue
    if (r?.status && String(r.status) !== 'terjadwal') continue
    const tgl = String(r?.tanggal || '')
    const k = kelompokTanggal(tgl, hariIni, horizonHari)
    if (!KELOMPOK_TERJADWAL.includes(k)) continue
    const jml = Array.isArray(d.peserta) ? d.peserta.length : 0
    terjadwal.push({
      id: `seremonial|${r?.id || tgl}`,
      jenis: 'seremonial',
      judul: String(d.judul || JENIS_TUGAS.seremonial.label),
      detail: [jml ? `${jml} santri` : '', String(d.tempat || '')].filter(Boolean).join(' · '),
      tanggal: tgl,
      jam: String(r?.jam_mulai || ''),
      kelompok: k,
      rute: JENIS_TUGAS.seremonial.rute
    })
  }

  // --- 4. Penugasan tanpa tanggal: diringkas SATU baris per jenis, bukan satu per berkas,
  //        supaya kartu beranda tak tenggelam oleh 20 baris tes. ---
  const nGlondongan = glondongan.filter(
    (r) => String(r?.penguji_id ?? '') === me && String(r?.status || '') !== 'selesai'
  ).length
  if (nGlondongan) {
    perlu.push({
      id: 'glondongan',
      jenis: 'glondongan',
      judul: JENIS_TUGAS.glondongan.label,
      detail: `${nGlondongan} blok belum dinilai`,
      jumlah: nGlondongan,
      tanggal: '',
      jam: '',
      kelompok: '',
      rute: JENIS_TUGAS.glondongan.rute
    })
  }

  const nTesSekolah = tesSekolah.filter(
    (r) => String(r?.penguji_id ?? '') === me && String(r?.status || '') !== 'selesai'
  ).length
  if (nTesSekolah) {
    perlu.push({
      id: 'tes_sekolah',
      jenis: 'tes_sekolah',
      judul: JENIS_TUGAS.tes_sekolah.label,
      detail: `${nTesSekolah} ajuan belum dinilai`,
      jumlah: nTesSekolah,
      tanggal: '',
      jam: '',
      kelompok: '',
      rute: JENIS_TUGAS.tes_sekolah.rute
    })
  }

  const nInput = Number(inputBulananBelum) || 0
  if (nInput > 0) {
    perlu.push({
      id: 'input_bulanan',
      jenis: 'input_bulanan',
      judul: JENIS_TUGAS.input_bulanan.label,
      detail: `${nInput} kelas belum diinput bulan ini`,
      jumlah: nInput,
      tanggal: '',
      jam: '',
      kelompok: '',
      rute: JENIS_TUGAS.input_bulanan.rute
    })
  }

  // Izin orang lain hanya jadi tugas kalau guru ini memang yang menyetujui.
  if (sebagaiPj && izinMenunggu.length) {
    perlu.push({
      id: 'izin_guru',
      jenis: 'izin_guru',
      judul: 'Izin menunggu persetujuan',
      detail: `${izinMenunggu.length} pengajuan`,
      jumlah: izinMenunggu.length,
      tanggal: '',
      jam: '',
      kelompok: '',
      rute: JENIS_TUGAS.izin_guru.rute
    })
  }

  terjadwal.sort(
    (a, b) =>
      a.tanggal.localeCompare(b.tanggal) ||
      String(a.jam).localeCompare(String(b.jam)) ||
      a.jenis.localeCompare(b.jenis)
  )
  perlu.sort((a, b) => String(b.tanggal).localeCompare(String(a.tanggal)))

  return { terjadwal, perlu, total: terjadwal.length + perlu.length }
}

/**
 * Bentuk ringkas untuk widget Android — disimpan sebagai JSON di SharedPreferences.
 *
 * Kunci sengaja satu huruf: isinya ikut setiap kali beranda dibuka, dan widget Android
 * membacanya mentah. Tanggal tetap dibawa supaya widget bisa MENYARING SENDIRI saat
 * menggambar; kalau guru lama tak membuka aplikasi, widget jadi kosong — bukan salah.
 * `n` = jenis, dipakai widget untuk warna titik — bukan untuk memutuskan apa pun.
 */
export function ringkasUntukWidget(hasil, maks = 3) {
  const semua = [...(hasil?.terjadwal || []), ...(hasil?.perlu || [])]
  return semua.slice(0, maks).map((t) => ({
    t: t.tanggal || '',
    j: t.jam || '',
    h: t.judul || '',
    d: t.detail || '',
    n: t.jenis || ''
  }))
}
