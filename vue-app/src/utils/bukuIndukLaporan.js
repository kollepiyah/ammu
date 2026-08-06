// bukuIndukLaporan — saldo berjalan & baris laporan Buku Induk Keuangan.
//
// Kyai (6 Agu 2026), atas laporan harian "kas umum · SDI · TUNAI" 3 Agu:
//   "ekspor PDF laporan keuangan harian, total saldonya tidak jelas (tidak sesuai
//    perhitungan yg difilter)."
//
// Yang terjadi di berkas itu: 14 transaksi, SEMUANYA masuk, tapi kolom Saldo justru
// MENURUN dari Rp 6.230.000 ke Rp 2.130.000 — sementara baris TOTAL bilang Rp 2.290.000.
// Dua sebab bertumpuk:
//   1. baris dicetak terbaru→terlama, sedangkan saldo dihitung kronologis naik;
//   2. saldonya diambil dari SELURUH ledger (semua lembaga, semua pos, tunai + transfer)
//      dan tak ikut penyaring, jadi selisih antar baris (330rb, 880rb) tak ada
//      hubungannya dengan nominal baris yang tercetak.
//
// Keputusan Kyai: "info saldo sesuai filter yg diekspor, saldo total jika diekspor
// semuanya tanpa filter." Maka saldo berjalan dihitung dari ledger yang SUDAH DISARING
// (pos, lembaga, cara bayar, tipe, pencarian, scope gedung) tapi TIDAK dibatasi periode —
// sehingga:
//   • tanpa penyaring apa pun → angkanya = saldo kas total, persis seperti dulu;
//   • dengan penyaring        → saldo kas untuk irisan itu saja, dan selisih antar baris
//                               sama dengan nominal barisnya.
// Periode sengaja tak ikut menyaring basis: yang dibatasi periode adalah baris yang
// TERCETAK, sedangkan saldo tetap kumulatif sejak transaksi pertama. Itulah yang membuat
// baris SALDO AWAL bermakna.
//
// Semua fungsi PURE — tak menyentuh store, tanggal sistem, atau DOM.

/** Nominal masuk sebuah baris ledger (0 bila baris ini pengeluaran). */
export function nominalMasuk(b) {
  return Number(b?.masuk || (b?.tipe === 'masuk' ? b?.nominal : 0) || 0) || 0
}

/** Nominal keluar sebuah baris ledger (0 bila baris ini pemasukan). */
export function nominalKeluar(b) {
  return Number(b?.keluar || (b?.tipe === 'keluar' ? b?.nominal : 0) || 0) || 0
}

// Urutan kronologis NAIK, id sebagai pemutus seri supaya saldo berjalan deterministik
// (dua transaksi bertanggal sama harus selalu diakumulasi dengan urutan yang sama).
function kronologis(a, b) {
  return (
    String(a?.tanggal || '').localeCompare(String(b?.tanggal || '')) ||
    String(a?.id || '').localeCompare(String(b?.id || ''))
  )
}

/**
 * Saldo berjalan per baris atas SATU ledger (yang sudah disaring pemanggil).
 *
 * @param {object[]} ledger baris buku induk, urutan bebas
 * @returns {Map<string, number>} id baris → saldo kumulatif SETELAH baris itu
 */
export function petaSaldoBerjalan(ledger) {
  const map = new Map()
  let saldo = 0
  for (const b of [...(ledger || [])].sort(kronologis)) {
    saldo += nominalMasuk(b) - nominalKeluar(b)
    map.set(String(b?.id ?? ''), saldo)
  }
  return map
}

/**
 * Saldo AWAL periode: akumulasi seluruh baris ledger yang jatuh SEBELUM `dariTanggal`.
 * Ledger di sini sudah tersaring, jadi angkanya adalah saldo irisan itu — bukan saldo kas
 * seluruh pesantren.
 *
 * @param {object[]} ledger baris tersaring, TANPA batas periode
 * @param {string} dariTanggal 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY' — awal periode laporan
 * @returns {number} 0 bila `dariTanggal` kosong (tak ada periode = tak ada saldo awal)
 */
export function saldoAwalSebelum(ledger, dariTanggal) {
  const batas = String(dariTanggal || '').trim()
  if (!batas) return 0
  let saldo = 0
  for (const b of ledger || []) {
    const tgl = String(b?.tanggal || '').slice(0, batas.length)
    if (!tgl || tgl >= batas) continue
    saldo += nominalMasuk(b) - nominalKeluar(b)
  }
  return saldo
}

/**
 * Baris-baris laporan Buku Induk — dipakai bersama oleh PDF, Excel, dan Google Sheet
 * supaya tak ada dua bentuk laporan yang bisa berbeda diam-diam.
 *
 * Susunannya mengikuti buku kas yang lazim, sehingga angkanya bisa ditelusuri dari atas
 * ke bawah: SALDO AWAL → transaksi kronologis naik → SUBTOTAL per cara bayar → TOTAL,
 * dan pada baris TOTAL kolom Saldo berisi SALDO AKHIR (= saldo awal + masuk − keluar),
 * bukan sekadar selisih periode.
 *
 * @param {object[]} list baris yang tercetak (sudah tersaring + terbatas periode)
 * @param {object} opts
 * @param {number} [opts.saldoAwal=0] saldo sebelum periode, dari saldoAwalSebelum()
 * @param {string} [opts.labelPeriode=''] mis. '3 Agustus 2026' — untuk keterangan baris awal
 * @param {(b:object)=>string} [opts.metodeOf] resolver cara bayar
 * @param {string[]} [opts.metodeOpts=[]] daftar cara bayar untuk baris SUBTOTAL
 * @param {(l:object[])=>object} [opts.ringkasMetodeOf] rekap {metode:{masuk,keluar}}
 * @param {boolean} [opts.pakaiSaldoAwal=true] false = tanpa baris SALDO AWAL (saldo mulai 0)
 */
export function bangunBarisLaporan(list, opts = {}) {
  const {
    saldoAwal = 0,
    labelPeriode = '',
    metodeOf = () => '',
    metodeOpts = [],
    ringkasMetodeOf = null,
    pakaiSaldoAwal = true
  } = opts
  const urut = [...(list || [])].sort(kronologis)
  const awal = pakaiSaldoAwal ? Number(saldoAwal) || 0 : 0
  const rows = []

  if (pakaiSaldoAwal) {
    rows.push({
      no: '',
      tanggal: '',
      no_struk: '',
      keterangan: labelPeriode ? `SALDO AWAL (sebelum ${labelPeriode})` : 'SALDO AWAL',
      kategori: '',
      tipe: '',
      metode: '',
      masuk: 0,
      keluar: 0,
      saldo: awal,
      _ringkas: true
    })
  }

  let totMasuk = 0
  let totKeluar = 0
  let berjalan = awal
  urut.forEach((b, i) => {
    const masuk = nominalMasuk(b)
    const keluar = nominalKeluar(b)
    totMasuk += masuk
    totKeluar += keluar
    berjalan += masuk - keluar
    rows.push({
      no: i + 1,
      tanggal: b.tanggal || '',
      no_struk: b.no_struk || b.trx_id || '',
      keterangan: b.keterangan || b.deskripsi || '',
      kategori: b.kategori || '',
      tipe: b.tipe || (Number(b.masuk) > 0 ? 'Masuk' : 'Keluar'),
      // cara bayar — kasir perlu memisahkan uang laci dari uang rekening
      metode: metodeOf(b),
      masuk,
      keluar,
      saldo: berjalan,
      _ringkas: false
    })
  })

  // Subtotal per cara bayar SEBELUM baris TOTAL — inti laporan harian kas. Kolom saldo
  // di baris ini SENGAJA net per cara bayar (bukan saldo berjalan): yang dicocokkan
  // dengan uang laci adalah selisih masuk-keluar hari itu.
  const rk = ringkasMetodeOf ? ringkasMetodeOf(urut) : null
  if (rk) {
    for (const m of metodeOpts) {
      const r = rk[m]
      if (!r || (r.masuk === 0 && r.keluar === 0)) continue
      rows.push({
        no: '',
        tanggal: '',
        no_struk: '',
        keterangan: `SUBTOTAL ${String(m).toUpperCase()}`,
        kategori: '',
        tipe: '',
        metode: m,
        masuk: r.masuk,
        keluar: r.keluar,
        saldo: r.masuk - r.keluar,
        _ringkas: true
      })
    }
  }

  rows.push({
    no: '',
    tanggal: '',
    no_struk: '',
    keterangan: `TOTAL (${urut.length} transaksi)`,
    kategori: '',
    tipe: '',
    metode: '',
    masuk: totMasuk,
    keluar: totKeluar,
    // SALDO AKHIR, bukan net periode — supaya SALDO AWAL + masuk − keluar bertemu di sini.
    saldo: berjalan,
    _ringkas: true
  })
  return rows
}
