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
  berubah: {
    urutan: 4,
    label: 'Nominal berubah',
    pesan: 'Berbeda dari slip yang sudah tersimpan di periode ini; generate akan menimpanya.'
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
export function barisPratinjau(payload, slipLama) {
  const items = Array.isArray(payload?.line_items) ? payload.line_items : []
  const tunjangan = _sumNominal(items.filter((x) => x.kategori === 'tunjangan'))
  const glondongan = _n(payload?.bonus_glondongan?.total)
  const pemasukan = _n(payload?.total_pemasukan)
  const potongan = _n(payload?.total_potongan)
  const takeHome = _n(payload?.take_home)
  // Sisa pemasukan setelah tunjangan & glondongan = bisyaroh + bonus kehadiran.
  const bisyaroh = pemasukan - tunjangan - glondongan

  const lamaTakeHome = slipLama ? _n(slipLama.take_home) : null
  const selisih = lamaTakeHome === null ? 0 : takeHome - lamaTakeHome

  const peringatan = []
  if (slipLama && String(slipLama.status_cair || '') === 'cair') peringatan.push('cair')
  if (potongan > 0 && takeHome <= 0) peringatan.push('potongan_melebihi')
  if (pemasukan <= 0) peringatan.push('tanpa_pemasukan')
  if (slipLama && selisih !== 0) peringatan.push('berubah')
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
    sudahCair: 0
  }
  for (const b of r) {
    out.pemasukan += _n(b.pemasukan)
    out.potongan += _n(b.potongan)
    out.takeHome += _n(b.takeHome)
    if (_n(b.potongan) > 0) out.kenaPotongan++
    if (b.peringatan?.length) out.perluDilihat++
    if (b.adaSlipLama) out.akanDitimpa++
    if (b.peringatan?.includes('cair')) out.sudahCair++
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
