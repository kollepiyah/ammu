// kasLembaga — SUMBER TUNGGAL "baris kas ini masuk kas lembaga mana?".
//
// Kyai (4 Agu 2026): "pencatatan kas per lembaga itu sendiri-sendiri sesuai LABEL
//   PEMBAYARAN". Jadi penentunya jenis pembayaran, BUKAN tempat santri sekolah:
//   satu santri bisa membayar syahriyah SDI dan uang buku TPQ di transaksi yang
//   sama, dan uangnya harus jatuh ke dua kas berbeda. Bahan bakunya sudah ada —
//   tagihan gabungan dipecah per komponen di Buku Induk (K1), jadi kategori tiap
//   BARIS = jenis pembayarannya sendiri.
//
// Dimensi ini BEDA dari `gedung` ("wetan"/"kulon", lihat utils/gedung.js) yang
//   menyaring per lokasi pencatat. Keduanya berdiri sendiri.
//
// Penentu kas lembaga per sumber baris:
//   pembayaran (POS/tagihan) -> `kas_lembaga` pada jenis pembayaran
//   kas manual              -> pilihan operator, tersimpan di baris (`lembaga`)
//   tabungan                -> lembaga santrinya (tabungan tak punya label bayar)
//
// TIDAK ada baris lama yang ditulis ulang: baris tanpa tag `lembaga` diturunkan
//   saat DIBACA dari kategorinya. Uang riil sejak 1 Agu 2026 — nol mutasi data.

/** Kunci perbandingan nama lembaga: abai huruf besar/kecil, spasi tepi & spasi ganda.
 *  WAJIB dipakai di KEDUA sisi setiap perbandingan — sekolah kustom ditulis
 *  campur ("Kelas Baca") dan pernah bikin filter lembaga kosong tanpa suara. */
export function kunciLembaga(v) {
  return String(v == null ? '' : v)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
}

/** Kunci perbandingan label jenis pembayaran (aturan sama dengan nama lembaga). */
export function kunciJenis(v) {
  return kunciLembaga(v)
}

/**
 * Peta label jenis pembayaran -> nama lembaga kas.
 *
 * `kas_lembaga` kosong TAPI `lembaga_only` tepat satu -> pakai yang satu itu.
 *   Jenis seperti "Syahriyah SDI" yang whitelist-nya cuma SDI sudah menyatakan
 *   kasnya tanpa ambiguitas, jadi laporan langsung benar sebelum Kyai mengisi
 *   apa pun. Ini fallback saat DIBACA — konfigurasi Kyai tidak pernah ditulisi
 *   diam-diam, sehingga tebakan ini tak bisa mengeras jadi data.
 *
 * @param {Array} jenisList settings.keuTagihanJenis
 * @returns {Map<string,string>} kunciJenis(label) -> nama lembaga (apa adanya)
 */
export function petaKasLembaga(jenisList = []) {
  const peta = new Map()
  for (const j of Array.isArray(jenisList) ? jenisList : []) {
    const label = kunciJenis(j?.label || j?.nama || j?.id)
    if (!label) continue
    let lemb = String(j?.kas_lembaga || '').trim()
    if (!lemb) {
      const wl = (Array.isArray(j?.lembaga_only) ? j.lembaga_only : [])
        .map((x) => String(x || '').trim())
        .filter(Boolean)
      if (wl.length === 1) lemb = wl[0]
    }
    if (lemb) peta.set(label, lemb)
  }
  return peta
}

/**
 * Lembaga kas satu baris `keuangan_buku_induk`. '' = Kas Induk (belum berlembaga).
 *
 * Urutan baca — tag di baris DULU, turunan belakangan:
 *   1. `row.lembaga` — ditulis POS & kas manual sejak v.1.2.6. Ini fakta yang
 *      dicatat saat uangnya diterima, jadi ia menang walau konfigurasi jenis
 *      berubah belakangan (laporan bulan lalu tak boleh ikut bergeser).
 *   2. `row.kategori` -> peta jenis. Untuk baris hasil pecahan K1, kategori =
 *      label komponennya, jadi porsi ngaji & porsi sekolah pergi ke kas masing-masing.
 *   3. `row.induk_jenis` -> peta jenis. Jejak "baris ini bagian dari tagihan apa";
 *      dipakai bila label komponen tak terdaftar sebagai jenis.
 */
export function kasLembagaBaris(row, peta) {
  if (!row) return ''
  const tag = String(row.lembaga || '').trim()
  if (tag) return tag
  const m = peta instanceof Map ? peta : new Map()
  return m.get(kunciJenis(row.kategori)) || m.get(kunciJenis(row.induk_jenis)) || ''
}

/**
 * Lembaga kas satu baris tabungan. Tabungan tak punya label pembayaran, jadi
 *   ikut lembaga santrinya (keputusan Kyai 4 Agu). Ngaji dulu, sekolah sebagai
 *   cadangan — santri yang hanya sekolah `lembaga`-nya kosong.
 *
 * @param {Object} row baris tabungan (butuh santri_id)
 * @param {Map<string,string>} petaSantri santri_id -> nama lembaga
 */
export function kasLembagaTabungan(row, petaSantri) {
  if (!row) return ''
  const m = petaSantri instanceof Map ? petaSantri : new Map()
  return m.get(String(row.santri_id ?? '')) || ''
}

/** Masuk/keluar satu baris kas. Cermin PERSIS `stats` di BukuIndukView: `tipe`
 *  yang menentukan arah, nominalnya dari kolom arah itu dengan cadangan `nominal`
 *  (baris lama tak selalu punya masuk/keluar terpisah). */
export function arahNominal(row) {
  const masuk =
    row?.tipe === 'masuk' || Number(row?.masuk) > 0 ? Number(row?.masuk || row?.nominal) || 0 : 0
  const keluar =
    row?.tipe === 'keluar' || Number(row?.keluar) > 0 ? Number(row?.keluar || row?.nominal) || 0 : 0
  return { masuk, keluar }
}

/**
 * Rekap kas per lembaga atas sekumpulan baris.
 *
 * @param {Array} rows baris kas (sudah tersaring periode/metode oleh pemanggil)
 * @param {Function} resolver (row) => nama lembaga ('' = Kas Induk)
 * @returns {Array<{lembaga,kunci,masuk,keluar,saldo,jumlah}>} lembaga berurut nama
 *   (locale id), Kas Induk SELALU paling akhir — ia keranjang sisa, bukan lembaga.
 */
export function ringkasKasLembaga(rows = [], resolver) {
  const fn = typeof resolver === 'function' ? resolver : () => ''
  const per = new Map()
  for (const r of Array.isArray(rows) ? rows : []) {
    const nama = String(fn(r) || '').trim()
    const kunci = kunciLembaga(nama)
    if (!per.has(kunci)) per.set(kunci, { lembaga: nama, kunci, masuk: 0, keluar: 0, jumlah: 0 })
    const agg = per.get(kunci)
    const { masuk, keluar } = arahNominal(r)
    agg.masuk += masuk
    agg.keluar += keluar
    agg.jumlah += 1
  }
  return [...per.values()]
    .map((a) => ({ ...a, saldo: a.masuk - a.keluar }))
    .sort((a, b) => {
      if (!a.kunci !== !b.kunci) return a.kunci ? -1 : 1
      return a.lembaga.localeCompare(b.lembaga, 'id')
    })
}

/**
 * Rekap tabungan per lembaga dari baris MUTASI (`jenis` = 'setor' | 'tarik').
 *   setor = masuk, tarik = keluar → `saldo` hasilnya = setor − tarik.
 * Bentuk keluarannya sama dengan ringkasKasLembaga supaya kartu & filter di
 *   TabunganView bisa memakai komponen yang sama dengan Buku Induk.
 */
export function ringkasTabunganLembaga(mutasi = [], petaSantri) {
  const rows = (Array.isArray(mutasi) ? mutasi : []).map((m) => ({
    tipe: String(m?.jenis || '').toLowerCase() === 'setor' ? 'masuk' : 'keluar',
    nominal: Number(m?.nominal) || 0,
    santri_id: m?.santri_id ?? m?.santriId
  }))
  return ringkasKasLembaga(rows, (r) => kasLembagaTabungan(r, petaSantri))
}

/** Peta santri_id -> lembaga (ngaji, cadangan sekolah) untuk kasLembagaTabungan. */
export function petaLembagaSantri(santriList = []) {
  const m = new Map()
  for (const s of Array.isArray(santriList) ? santriList : []) {
    if (!s || s.id == null) continue
    const lemb = String(s.lembaga || '').trim() || String(s.lembaga_sekolah || '').trim()
    m.set(String(s.id), lemb)
  }
  return m
}
