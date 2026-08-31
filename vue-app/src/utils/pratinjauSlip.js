// pratinjauSlip — meninjau slip bisyaroh satu periode SEBELUM di-generate.
//
// PERMINTAAN KYAI (31 Agu 2026): "untuk bisyaroh saya ingin ada simulasi/review per bulan,
// misal bulan ini dan sudah tertera potongannya dll. sebelum generate slip agar bisa koreksi."
//
// BEDANYA DENGAN "SIMULASI" YANG SUDAH ADA (utils/simulasiBisyaroh): simulasi itu alat
// COBA-COBA TARIF — nominalnya diketik sementara di layar dan semua guru diandaikan hadir
// penuh, gunanya menyusun anggaran. Yang ini kebalikannya: nominal & kehadiran APA ADANYA
// untuk bulan itu, lengkap dengan tunjangan, glondongan, dan potongan — persis angka yang
// akan tercetak. Gunanya menemukan yang keliru selagi masih bisa dibetulkan di Pengaturan.
//
// SUMBER ANGKANYA WAJIB `buildSlipPayload` — fungsi yang SAMA yang dipakai Bulk Generate.
// Util ini sengaja tidak menghitung apa pun sendiri; ia hanya membaca payload yang sudah
// jadi lalu menandai yang perlu dilihat manusia. Kalau ia ikut menghitung, pratinjau bisa
// berkata lain dari yang tersimpan — dan pratinjau yang berbohong lebih berbahaya daripada
// tak ada pratinjau sama sekali.
//
// Semua fungsi PURE.

/**
 * Kode peringatan + kalimatnya. Diurut dari yang paling perlu dilihat lebih dulu:
 * yang menyangkut uang yang SUDAH keluar, lalu yang menyangkut orang tak menerima apa-apa.
 */
export const PERINGATAN = {
  cair: {
    urutan: 1,
    label: 'Sudah dicairkan',
    pesan:
      'Slip periode ini sudah ditandai CAIR. Generate ulang mengubah nominalnya, sedangkan ' +
      'catatan kas keluar di Buku Induk tetap memakai angka lama.'
  },
  potongan_melebihi: {
    urutan: 2,
    label: 'Potongan ≥ bisyaroh',
    pesan: 'Potongan menghabiskan (atau melebihi) seluruh pemasukan — take home nol atau minus.'
  },
  tanpa_pemasukan: {
    urutan: 3,
    label: 'Tak dapat bisyaroh',
    pesan:
      'Tak satu pun jenis bisyaroh/tunjangan mengenai orang ini. Biasanya scope jabatan/' +
      'lembaga/shift-nya belum cocok, atau kolom JK-nya masih kosong.'
  },
  penyesuaian_hilang: {
    urutan: 4,
    label: 'Penyesuaian bulanan akan hilang',
    pesan:
      'Slip tersimpan memuat tunjangan/potongan yang diinput per bulan (lewat Impor Excel). ' +
      'Bulk Generate menghitung ulang dari Jenis Bisyaroh/Tunjangan/Potongan saja, jadi ' +
      'penyesuaian itu TIDAK ikut terbawa. Impor ulang berkas bulanannya sesudah generate.'
  },
  berubah: {
    urutan: 5,
    label: 'Nominal berubah',
    pesan: 'Berbeda dari slip yang sudah tersimpan di periode ini; generate akan menimpanya.'
  }
}

/**
 * Penyesuaian PER BULAN yang menempel di slip tersimpan.
 *
 * v.1.3.7 (Kyai, 31 Agu 2026): "saya input potongan tapi dihitung tunjangan."
 *
 * Yang sebenarnya terjadi: potongannya SUDAH dikurangkan dengan benar (dibuktikan dari
 * angkanya sendiri — slip tersimpan lebih KECIL persis sebesar nominal impor). Yang salah
 * adalah pratinjaunya: ia menghitung ulang TANPA penyesuaian bulanan, lalu melaporkan
 * bedanya sebagai "Nominal berubah **+**Rp360.000". Tanda plus itulah yang terbaca
 * "potongan saya jadi tambahan".
 *
 * Dua hal diperbaiki sekaligus di sini: pratinjau kini MENGENALI penyesuaian yang sudah
 * tersimpan (jadi angkanya cocok dengan slip, bukan selisih semu), dan bedanya diberi nama
 * yang benar — Bulk Generate memang akan MENGHAPUS penyesuaian itu, dan itu peringatan yang
 * jauh lebih berguna daripada "nominal berubah".
 *
 * Cara mengenalinya: baris di slip tersimpan yang labelnya BUKAN milik aturan ber-scope
 * yang berlaku sekarang. Berbasis label karena baris impor lama memang tak bertanda apa pun;
 * yang baru ikut menulis `sumber` sehingga lama-lama tak perlu menebak lagi.
 *
 * @param {object|null} slipLama baris keuangan_gaji periode yang sama.
 * @param {{potongan?:Set<string>|string[], tunjangan?:Set<string>|string[]}} labelScope
 *        label yang DIHASILKAN aturan ber-scope untuk guru ini.
 */
export function penyesuaianTersimpan(slipLama, labelScope = {}) {
  const asSet = (v) => (v instanceof Set ? v : new Set(Array.isArray(v) ? v : []))
  const scopePot = asSet(labelScope.potongan)
  const scopeTunj = asSet(labelScope.tunjangan)
  const kosong = { tunjangan: [], potongan: [], totalTunjangan: 0, totalPotongan: 0, netto: 0 }
  if (!slipLama) return kosong

  const extraPot = (Array.isArray(slipLama.potongan_list) ? slipLama.potongan_list : []).filter(
    (p) => p && (String(p.sumber || '') === 'bulanan' || !scopePot.has(String(p.label || '')))
  )
  const extraTunj = (Array.isArray(slipLama.line_items) ? slipLama.line_items : []).filter(
    (x) =>
      x &&
      x.kategori === 'tunjangan' &&
      (String(x.sumber || '') === 'bulanan' || !scopeTunj.has(String(x.label || '')))
  )
  const totalTunjangan = _sumNominal(extraTunj)
  const totalPotongan = _sumNominal(extraPot)
  return {
    tunjangan: extraTunj.map((x) => ({
      label: String(x.label || 'Tunjangan'),
      nominal: _n(x.nominal)
    })),
    potongan: extraPot.map((p) => ({
      label: String(p.label || 'Potongan'),
      nominal: _n(p.nominal)
    })),
    totalTunjangan,
    totalPotongan,
    // Sumbangan penyesuaian ini pada take home slip tersimpan.
    netto: totalTunjangan - totalPotongan
  }
}

const _n = (v) => Number(v) || 0
const _sumNominal = (arr) => (Array.isArray(arr) ? arr : []).reduce((a, x) => a + _n(x?.nominal), 0)

/**
 * Satu baris pratinjau untuk seorang guru.
 *
 * @param {object} payload hasil `buildSlipPayload` (TIDAK ditulis ke DB).
 * @param {object|null} slipLama baris `keuangan_gaji` periode yang sama bila sudah ada.
 */
export function barisPratinjau(payload, slipLama, penyesuaian) {
  const items = Array.isArray(payload?.line_items) ? payload.line_items : []
  const tunjangan = _sumNominal(items.filter((x) => x.kategori === 'tunjangan'))
  const glondongan = _n(payload?.bonus_glondongan?.total)
  const pemasukan = _n(payload?.total_pemasukan)
  const potongan = _n(payload?.total_potongan)
  const takeHome = _n(payload?.take_home)
  // Sisa pemasukan setelah tunjangan & glondongan = bisyaroh + bonus kehadiran.
  const bisyaroh = pemasukan - tunjangan - glondongan

  const peny = penyesuaian || {
    totalTunjangan: 0,
    totalPotongan: 0,
    netto: 0,
    tunjangan: [],
    potongan: []
  }
  const lamaTakeHome = slipLama ? _n(slipLama.take_home) : null
  const selisih = lamaTakeHome === null ? 0 : takeHome - lamaTakeHome
  // Bagian selisih yang MEMANG karena penyesuaian bulanan lenyap = -netto. Sisanya baru
  // benar-benar "nominal berubah" (tarif/kehadiran/scope bergeser).
  const selisihLain = lamaTakeHome === null ? 0 : selisih + _n(peny.netto)

  const peringatan = []
  if (slipLama && String(slipLama.status_cair || '') === 'cair') peringatan.push('cair')
  if (potongan > 0 && takeHome <= 0) peringatan.push('potongan_melebihi')
  if (pemasukan <= 0) peringatan.push('tanpa_pemasukan')
  if (slipLama && _n(peny.netto) !== 0) peringatan.push('penyesuaian_hilang')
  if (slipLama && selisihLain !== 0) peringatan.push('berubah')
  peringatan.sort((a, b) => PERINGATAN[a].urutan - PERINGATAN[b].urutan)

  return {
    guruId: String(payload?.guru_id ?? ''),
    nama: String(payload?.guru_nama ?? ''),
    lembaga: String(payload?.lembaga ?? ''),
    jabatan: String(payload?.jabatan ?? ''),
    bisyaroh,
    tunjangan,
    glondongan,
    pemasukan,
    potongan,
    takeHome,
    lineItems: items,
    potonganList: Array.isArray(payload?.potongan_list) ? payload.potongan_list : [],
    adaSlipLama: !!slipLama,
    lamaTakeHome,
    selisih,
    selisihLain,
    penyesuaian: peny,
    peringatan
  }
}

/** Total lintas guru + berapa yang perlu dilihat. */
export function ringkasPratinjau(rows) {
  const r = Array.isArray(rows) ? rows : []
  const out = {
    guru: r.length,
    pemasukan: 0,
    potongan: 0,
    takeHome: 0,
    kenaPotongan: 0,
    perluDilihat: 0,
    akanDitimpa: 0,
    sudahCair: 0,
    // v.1.3.7: berapa slip yang penyesuaian bulanannya akan lenyap bila di-generate ulang,
    //   dan berapa rupiah penyesuaian itu seluruhnya (potongan dihitung positif).
    penyesuaianHilang: 0,
    penyesuaianPotongan: 0,
    penyesuaianTunjangan: 0
  }
  for (const b of r) {
    out.pemasukan += _n(b.pemasukan)
    out.potongan += _n(b.potongan)
    out.takeHome += _n(b.takeHome)
    if (_n(b.potongan) > 0) out.kenaPotongan++
    if (b.peringatan?.length) out.perluDilihat++
    if (b.adaSlipLama) out.akanDitimpa++
    if (b.peringatan?.includes('cair')) out.sudahCair++
    if (b.peringatan?.includes('penyesuaian_hilang')) {
      out.penyesuaianHilang++
      out.penyesuaianPotongan += _n(b.penyesuaian?.totalPotongan)
      out.penyesuaianTunjangan += _n(b.penyesuaian?.totalTunjangan)
    }
  }
  return out
}

/**
 * Rekap potongan PER JENIS: berapa orang kena, berapa totalnya, siapa saja.
 *
 * Inilah bentuk yang paling cepat memperlihatkan scope yang meleset — keputusan Kyai
 * 31 Agu 2026 menahan Potongan tetap flat justru karena "salah scope sedikit bisa
 * menghabiskan bisyaroh seseorang". Daftar per-orang menjawabnya sebelum uang terbit,
 * bukan sesudah.
 */
export function rekapPotongan(rows) {
  const per = new Map()
  for (const b of Array.isArray(rows) ? rows : []) {
    for (const p of b.potonganList || []) {
      const label = String(p?.label || 'Potongan')
      if (!per.has(label)) per.set(label, { label, guru: 0, total: 0, nama: [] })
      const r = per.get(label)
      r.guru++
      r.total += _n(p?.nominal)
      r.nama.push(b.nama)
    }
  }
  return [...per.values()].sort((a, b) => b.total - a.total || a.label.localeCompare(b.label, 'id'))
}
