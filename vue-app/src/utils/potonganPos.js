// potonganPos — potongan/diskon yang dipilih KASIR di POS, per BARIS transaksi.
//
// Kyai (5 Agu 2026): "untuk potongan diskon syahriyah (per item) jangan di data santri dan
// jenis syahriyah. tapi di POS saja setiap transaksi tinggal pilih diskon/potongannya",
// lalu menegaskan "untuk diskon tadi per jenis ya bukan total".
//
// Bedanya dengan diskon lama (anak_guru x diskon_anak_guru di Jenis Pembayaran): yang lama
// lahir OTOMATIS saat tagihan dibuat, dari dua tempat yang harus cocok, dan diam-diam ikut
// ke cron bulanan. Yang ini dipilih sadar oleh kasir saat uang diterima, menempel pada satu
// baris, dan tercatat bersama transaksinya.
//
// Master daftarnya disimpan di settings/keuangan kunci `keuPotonganPos` (finance-only —
// jangan pindah ke general/web yang anon-readable).

const _num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}
const _teks = (v) => String(v ?? '').trim()

/** Satu baris master potongan yang sah, atau null kalau tak layak pakai. */
function _satu(p, i) {
  if (!p) return null
  const label = _teks(p.label || p.nama)
  if (!label) return null
  const tipe = _teks(p.tipe).toLowerCase() === 'nominal' ? 'nominal' : 'persen'
  const nilai = Math.max(0, _num(p.nilai))
  if (nilai <= 0) return null
  return {
    id: _teks(p.id) || `pot_${i}`,
    label,
    tipe,
    // Persen di atas 100 tak punya arti — potongan tak boleh melebihi tagihannya sendiri.
    nilai: tipe === 'persen' ? Math.min(100, nilai) : nilai,
    aktif: p.aktif !== false
  }
}

/**
 * Bersihkan master potongan dari settings. Baris tanpa label / bernilai 0 dibuang supaya
 * daftar di POS tak berisi pilihan yang tak melakukan apa-apa.
 */
export function normalisasiPotongan(list) {
  if (!Array.isArray(list)) return []
  const out = []
  const dipakai = new Set()
  for (let i = 0; i < list.length; i++) {
    const p = _satu(list[i], i)
    if (!p) continue
    // id kembar membuat baris keranjang mengambil potongan yang salah — yang belakangan
    //   diberi id turunan, bukan dibuang (datanya tetap milik Kyai).
    let id = p.id
    let n = 1
    while (dipakai.has(id)) id = `${p.id}_${n++}`
    dipakai.add(id)
    out.push({ ...p, id })
  }
  return out
}

/** Hanya yang aktif — inilah yang ditawarkan ke kasir. */
export function potonganAktif(list) {
  return normalisasiPotongan(list).filter((p) => p.aktif)
}

/**
 * Nominal potongan untuk satu baris.
 *
 * Selalu dibatasi 0..bruto: potongan yang melebihi tagihannya akan membuat baris bernilai
 * negatif, dan itu berarti kas mengeluarkan uang pada transaksi penerimaan — kesalahan yang
 * baru ketahuan saat tutup buku.
 */
export function hitungPotongan(potongan, bruto) {
  const b = Math.max(0, _num(bruto))
  if (!potongan || !b) return 0
  const tipe = _teks(potongan.tipe).toLowerCase() === 'nominal' ? 'nominal' : 'persen'
  const nilai = Math.max(0, _num(potongan.nilai))
  if (nilai <= 0) return 0
  const kasar = tipe === 'persen' ? Math.round((b * Math.min(100, nilai)) / 100) : Math.round(nilai)
  return Math.min(b, kasar)
}

/**
 * Terapkan potongan ke satu baris keranjang.
 * @returns {{bruto:number, potongan:number, neto:number, label:string}}
 */
export function terapkanPotongan(bruto, potongan) {
  const b = Math.max(0, _num(bruto))
  const pot = hitungPotongan(potongan, b)
  return {
    bruto: b,
    potongan: pot,
    neto: b - pot,
    label: pot > 0 ? _teks(potongan?.label) : ''
  }
}

/**
 * Baris ini lunas? Potongan IKUT dihitung sebagai penutup tagihan (keputusan Kyai): tagihan
 * 300rb dengan potongan 150rb dan uang 150rb = LUNAS, bukan menyisakan tunggakan 150rb.
 * Tanpa aturan ini, tiap potongan melahirkan tunggakan palsu di daftar tagihan.
 *
 * `penuh` 0 = baris tanpa tagihan (bayar manual/di muka) — selalu dianggap tuntas.
 */
export function lunasDenganPotongan(penuh, dibayarLama, dibayarKini, potongan) {
  const p = _num(penuh)
  if (p <= 0) return true
  return _num(dibayarLama) + _num(dibayarKini) + _num(potongan) >= p - 0.5
}
