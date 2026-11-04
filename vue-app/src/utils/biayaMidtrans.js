// biayaMidtrans.js — v.1.4.9 gel. 2: kanal & biaya layanan pembayaran online wali (Midtrans).
//
// Keputusan Kyai, 4 Nov 2026: biaya layanan DITANGGUNG WALI — ditambahkan di atas nominal
// tagihan, jadi yang tercatat untuk tagihan/uang saku tetap utuh. Bank: BRI, BNI, BCA, BSI,
// Mandiri + QRIS. Cermin Deno: supabase/functions/_shared/midtrans.ts (fungsi server
// menghitung ulang sendiri — angka dari layar tak dipercaya). Dijaga
// tests/unit/midtransMirrorEdge.test.js.

// `snap` = nama kanal di Snap `enabled_payments`. Mandiri lewat Bill Payment (echannel).
export const KANAL_MIDTRANS = [
  // `core` = ditampilkan di layar Ammu sendiri lewat Core API (Kyai, 4 Nov 2026: "seperti
  //   Shopee"). BSI tak terdokumentasi di Core API → tetap lewat Snap (jendela Midtrans).
  { id: 'bri', jenis: 'va', snap: 'bri_va', label: 'BRI', core: true },
  { id: 'bni', jenis: 'va', snap: 'bni_va', label: 'BNI', core: true },
  { id: 'bca', jenis: 'va', snap: 'bca_va', label: 'BCA', core: true },
  { id: 'bsi', jenis: 'va', snap: 'bsi_va', label: 'BSI', core: false },
  { id: 'mandiri', jenis: 'va', snap: 'echannel', label: 'Mandiri', core: true },
  { id: 'qris', jenis: 'qris', snap: 'other_qris', label: 'QRIS', core: true }
]

// Tarif Midtrans per 4 Nov 2026: VA Rp4.000 + PPN 11% = Rp4.440 → dibulatkan Rp4.500;
// QRIS MDR 0,7% + PPN 11% ≈ 0,78%. Bisa diubah di Pengaturan Keuangan.
export const BIAYA_VA_BAWAAN = 4500
export const BIAYA_QRIS_PERSEN_BAWAAN = 0.78
export const MIN_BAYAR = { va: 10000, qris: 1000 }
// Batas per transaksi QRIS (Bank Indonesia).
export const MAKS_QRIS = 10000000

export function midtransAktif(settings) {
  return !!settings && settings.midtrans_aktif === true
}

export function cariKanal(id) {
  return KANAL_MIDTRANS.find((k) => k.id === String(id || '')) || null
}

/** Kanal yang dibuka di Pengaturan (`midtrans_kanal`); kosong/tak diatur = semua. */
export function kanalAktif(settings) {
  const pilih = Array.isArray(settings?.midtrans_kanal)
    ? settings.midtrans_kanal.map((x) => String(x))
    : []
  return KANAL_MIDTRANS.filter((k) => !pilih.length || pilih.includes(k.id))
}

function angka(v, bawaan) {
  if (v === '' || v === null || v === undefined) return bawaan
  const n = Number(v)
  return Number.isFinite(n) && n >= 0 ? n : bawaan
}

/**
 * Biaya layanan yang ditambahkan ke tagihan wali. VA = flat. QRIS = persen dari TOTAL yang
 * dibayar (MDR dipotong dari total), jadi dihitung mundur: total = ceil(net / (1 − r)),
 * lalu dibulatkan ke atas per Rp100.
 */
export function hitungBiayaLayanan(net, kanalId, settings) {
  const k = cariKanal(kanalId)
  const n = Math.max(0, Math.round(Number(net) || 0))
  if (!k || n <= 0) return 0
  if (k.jenis === 'va') return Math.round(angka(settings?.midtrans_biaya_va, BIAYA_VA_BAWAAN))
  const p = Math.min(angka(settings?.midtrans_biaya_qris_persen, BIAYA_QRIS_PERSEN_BAWAAN), 50)
  if (p <= 0) return 0
  const total = Math.ceil(n / (1 - p / 100))
  return Math.ceil((total - n) / 100) * 100
}

/** { net, biaya, total, galat } — galat '' bila boleh dibayar lewat kanal itu. */
export function rincianBayar(net, kanalId, settings) {
  const k = cariKanal(kanalId)
  const n = Math.max(0, Math.round(Number(net) || 0))
  const biaya = hitungBiayaLayanan(n, kanalId, settings)
  const total = n + biaya
  let galat = ''
  if (!k) galat = 'Pilih cara bayar.'
  else if (n < MIN_BAYAR[k.jenis])
    galat = `Minimal pembayaran Rp${MIN_BAYAR[k.jenis].toLocaleString('id-ID')}.`
  else if (k.jenis === 'qris' && total > MAKS_QRIS)
    galat = 'QRIS maksimal Rp10.000.000 per transaksi — pakai Virtual Account.'
  return { net: n, biaya, total, galat }
}
