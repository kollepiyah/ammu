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
// Keputusan Kyai (31 Agu 2026), setelah tambalan 6 & 14 Agu masih menyisakan angka minus:
//   "pastikan hasil ekspor nominal totalnya hanya hari itu (atau sesuai yg difilter),
//    bukan diambil dari semua buku induk yg akhirnya terhitung minus."
//
// Maka SATU aturan untuk semua periode — harian, bulanan, tahunan:
//   • kolom Saldo selalu MULAI NOL pada baris pertama yang tercetak, jadi ia saldo
//     berjalan periode itu dan selisih antar baris persis sama dengan nominal barisnya;
//   • baris TOTAL = masuk − keluar periode yang difilter. Inilah "nominal total" yang
//     dicocokkan dengan uang setoran, dan ia TAK BISA lagi ikut minus gara-gara transaksi
//     di luar periode;
//   • posisi kas kumulatif tidak dibuang, tapi turun ke dua baris INFO di bawah TOTAL
//     (SALDO KAS SEBELUM / SETELAH periode) yang dihitung dari ledger tersaring TANPA
//     batas periode. Ia keterangan, bukan bagian dari total.
//
// Dengan begitu "saldo total jika diekspor semuanya tanpa filter" (keputusan 6 Agu) tetap
// terpenuhi: tanpa penyaring, baris INFO "SETELAH" itu memang saldo kas seluruhnya.
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
 * Susunannya bisa ditelusuri dari atas ke bawah:
 *   transaksi kronologis naik (saldo berjalan MULAI NOL)
 *   → SUBTOTAL per cara bayar
 *   → TOTAL  (masuk, keluar, dan pada kolom Saldo: masuk − keluar periode ini)
 *   → INFO SALDO KAS SEBELUM / SETELAH periode  (opsional, sekadar keterangan)
 *
 * Baris INFO sengaja DI BAWAH total dan berlabel sendiri: posisi kas kumulatif tak boleh
 * lagi bercampur ke angka yang dicocokkan dengan uang setoran (keputusan Kyai 31 Agu 2026).
 *
 * @param {object[]} list baris yang tercetak (sudah tersaring + terbatas periode)
 * @param {object} opts
 * @param {number} [opts.saldoAwal=0] saldo kas sebelum periode, dari saldoAwalSebelum()
 * @param {string} [opts.labelPeriode=''] mis. '3 Agustus 2026' — dipakai baris INFO
 * @param {(b:object)=>string} [opts.metodeOf] resolver cara bayar
 * @param {string[]} [opts.metodeOpts=[]] daftar cara bayar untuk baris SUBTOTAL
 * @param {(l:object[])=>object} [opts.ringkasMetodeOf] rekap {metode:{masuk,keluar}}
 * @param {boolean} [opts.infoSaldoKas=true] false = tanpa dua baris INFO saldo kas
 */
export function bangunBarisLaporan(list, opts = {}) {
  const {
    saldoAwal = 0,
    labelPeriode = '',
    metodeOf = () => '',
    metodeOpts = [],
    ringkasMetodeOf = null,
    infoSaldoKas = true
  } = opts
  const urut = [...(list || [])].sort(kronologis)
  const rows = []
  const barisRingkas = (
    keterangan,
    { masuk = 0, keluar = 0, saldo = 0, metode = '', info = false } = {}
  ) => ({
    no: '',
    tanggal: '',
    no_struk: '',
    keterangan,
    kategori: '',
    tipe: '',
    metode,
    masuk,
    keluar,
    saldo,
    _ringkas: true,
    // `_info` = keterangan posisi kas, BUKAN bagian dari total periode. Konsumen boleh
    //   memberinya gaya sendiri; yang penting ia tak pernah ikut dijumlahkan.
    _info: info
  })

  let totMasuk = 0
  let totKeluar = 0
  // Saldo berjalan periode ini — sengaja mulai NOL, bukan dari saldo kas kumulatif.
  let berjalan = 0
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
  // di baris ini net per cara bayar: yang dicocokkan dengan uang laci adalah selisih
  // masuk-keluar periode itu.
  const rk = ringkasMetodeOf ? ringkasMetodeOf(urut) : null
  if (rk) {
    for (const m of metodeOpts) {
      const r = rk[m]
      if (!r || (r.masuk === 0 && r.keluar === 0)) continue
      rows.push(
        barisRingkas(`SUBTOTAL ${String(m).toUpperCase()}`, {
          metode: m,
          masuk: r.masuk,
          keluar: r.keluar,
          saldo: r.masuk - r.keluar
        })
      )
    }
  }

  rows.push(
    barisRingkas(`TOTAL (${urut.length} transaksi)`, {
      masuk: totMasuk,
      keluar: totKeluar,
      // Selisih periode yang difilter — BUKAN posisi kas sejak transaksi pertama.
      saldo: totMasuk - totKeluar
    })
  )

  // Keterangan posisi kas. Dihitung dari ledger tersaring tanpa batas periode, jadi ia
  // menjawab "kas irisan ini ada berapa" tanpa pernah menyentuh baris TOTAL di atas.
  if (infoSaldoKas) {
    const awal = Number(saldoAwal) || 0
    const suffix = labelPeriode ? ` ${labelPeriode}` : ' PERIODE INI'
    rows.push(barisRingkas(`INFO — SALDO KAS SEBELUM${suffix}`, { saldo: awal, info: true }))
    rows.push(
      barisRingkas(`INFO — SALDO KAS SETELAH${suffix}`, {
        saldo: awal + totMasuk - totKeluar,
        info: true
      })
    )
  }
  return rows
}
