// CERMIN Deno dari `vue-app/src/utils/tugasSaya.js`.
//
// Dua-duanya menjawab pertanyaan yang sama: apa tugas seorang guru hari-hari ini. Yang .js
// dipakai kartu beranda dan widget saat app dibuka; yang .ts ini dipakai widget Android saat
// ia menarik sendiri secara berkala. Kalau keduanya menyimpang, widget bisa menampilkan
// daftar yang berbeda dari kartu beranda pada menit yang sama — dan tak ada yang menyadarinya.
//
// Dijaga `tests/unit/tugasSayaMirrorEdge.test.js`: kasus yang sama dijalankan di KEDUA
// implementasi dan hasilnya wajib identik. Menambah aturan di satu sisi tanpa sisi lain
// akan membuat tes itu merah.
//
// `labelSesi` sengaja disalin apa adanya di sini (bukan diimpor) supaya fungsi ini berdiri
// sendiri di Deno — isinya cuma tiga baris dan ikut dijaga tes cermin.

const SESI_LAJU = [
  { key: 'tadarus', label: 'Tadarus Pagi' },
  { key: 'laju1', label: 'Laju 1' },
  { key: 'laju2', label: 'Laju 2' }
]

export function labelSesi(key: string): string {
  return SESI_LAJU.find((s) => s.key === key)?.label || String(key || '')
}

export const LABEL_PERLU = 'Perlu Dikerjakan'
export const LABEL_TERJADWAL = 'Terjadwal'

export const JENIS_TUGAS: Record<string, { label: string; warna: string; rute: string }> = {
  piket_laju: { label: 'Piket Pondok Laju', warna: 'emerald', rute: '/pondok-laju' },
  seremonial: { label: 'Seremonial PTPT', warna: 'violet', rute: '/ceremonial' },
  capaian_laju: { label: 'Capaian Pondok Laju', warna: 'amber', rute: '/pondok-laju' },
  glondongan: { label: 'Tes Glondongan', warna: 'sky', rute: '/glondongan' },
  tes_sekolah: { label: 'Tes Sekolah', warna: 'cyan', rute: '/capaian-prestasi' },
  input_bulanan: { label: 'Input Bulanan', warna: 'rose', rute: '/input-bulanan' },
  izin_guru: { label: 'Izin Guru', warna: 'orange', rute: '/perizinan' }
}

const KELOMPOK_TERJADWAL = ['hari_ini', 'besok', 'minggu_ini']

export function geserHari(tanggal: string, n: number): string {
  const p = String(tanggal || '').split('-')
  if (p.length !== 3) return ''
  const d = new Date(Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2])))
  if (Number.isNaN(d.getTime())) return ''
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

export function kelompokTanggal(tanggal: string, hariIni: string, horizonHari = 7): string {
  const t = String(tanggal || '')
  const h = String(hariIni || '')
  if (t.length !== 10 || h.length !== 10) return ''
  if (t < h) return 'lewat'
  if (t === h) return 'hari_ini'
  if (t === geserHari(h, 1)) return 'besok'
  const batas = geserHari(h, horizonHari)
  return batas && t <= batas ? 'minggu_ini' : 'nanti'
}

// deno-lint-ignore no-explicit-any
type Baris = any

function tambahPerlu(keranjang: Baris[], item: Baris) {
  if (!keranjang.some((x) => x.id === item.id)) keranjang.push(item)
}

export function susunTugasSaya(opt: Baris = {}): {
  terjadwal: Baris[]
  perlu: Baris[]
  total: number
} {
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
  const terjadwal: Baris[] = []
  const perlu: Baris[] = []
  if (!me || String(hariIni || '').length !== 10) return { terjadwal, perlu, total: 0 }

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

  const sudahIsi = new Set(
    capaianLaju
      .filter((c: Baris) => String(c?.guru_id ?? '') === me)
      .map((c: Baris) => `${String(c?.tanggal || '')}|${String(c?.sesi || '')}`)
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

  for (const r of seremonial) {
    const d = r?.data || {}
    const ikut =
      Array.isArray(d.penyimak_guru) &&
      d.penyimak_guru.some((g: Baris) => String(g?.id ?? '') === me)
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

  const nGlondongan = glondongan.filter(
    (r: Baris) => String(r?.penguji_id ?? '') === me && String(r?.status || '') !== 'selesai'
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
    (r: Baris) => String(r?.penguji_id ?? '') === me && String(r?.status || '') !== 'selesai'
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

export function ringkasUntukWidget(hasil: Baris, maks = 3): Baris[] {
  const semua = [...(hasil?.terjadwal || []), ...(hasil?.perlu || [])]
  return semua.slice(0, maks).map((t: Baris) => ({
    t: t.tanggal || '',
    j: t.jam || '',
    h: t.judul || '',
    d: t.detail || '',
    n: t.jenis || ''
  }))
}
