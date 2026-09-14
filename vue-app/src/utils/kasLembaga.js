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
//
// KAS TUNGGAL (Kyai, 14 Sep 2026): "kalau bisyaroh dibebankan ke lembaga pasti ada lembaga
//   yg minus, karena setiap unit itu saling mensubsidi satu sama lain" dan "selama ini
//   secara operasional itu kas tunggal, dan jika lembaga membutuhkan baru mengajukan ke
//   yayasan". Jadi lembaga di berkas ini LABEL SUMBER DANA untuk laporan, BUKAN kas yang
//   terpisah: saldonya cuma satu (kas yayasan), dan tak ada layar yang boleh menampilkan
//   "saldo lembaga". Dulu kartu "Kas per lembaga" menampilkan saldo tiap lembaga, sehingga
//   semua pengeluaran tanpa label — seluruh bisyaroh & operasional — menumpuk di kartu
//   "Kas Induk / Yayasan" yang terbaca kosong/minus, padahal uangnya ada di kas yang sama.
//   Keranjang tanpa label itu kini bernama "Umum / Yayasan" (LABEL_KAS_UMUM).

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
 * Kas yang BUKAN baris master/lembaga.
 *
 * Kyai 4 Agu 2026: "belum ada, untuk lembaga TPQ (TPQ mencakup TPQ Pagi/TPQ Sore/
 *   Pra PTPT/PTPT/PPPH), Fullday, dan Ma'had (Uang Makan, Syahriyah Pondok)".
 *   Ketiganya memang TAK BISA dipilih sebelum ini: pilihan "Masuk Kas Lembaga" diambil
 *   dari master/lembaga, dan di master (terverifikasi 4 Agu) tidak ada baris "TPQ"
 *   payung, tidak ada "Fullday", dan **tidak ada "Ma'had"** — Fullday & Ma'had itu
 *   STATUS santri (`is_fullday`/`is_mukim`), bukan lembaga, sedangkan "TPQ" payung
 *   hanya ada sebagai konsep di LEMBAGA_GROUPS.
 *
 * ⚠️ Ini daftar PILIHAN yang ditawarkan, BUKAN logika deteksi. Bedanya penting: daftar
 *   nama untuk MEMUTUSKAN sesuatu ("ini sekolah?") sudah dibuang dari v100_lembagaFix
 *   karena membuat sekolah sah "Kelas Baca" hendak dikosongkan. Daftar di sini cuma
 *   menambah opsi — tak pernah menolak, mengubah, atau menghapus apa pun, dan Kyai
 *   tetap bisa memilih baris master mana saja. Menambah kas baru = tambah satu entri.
 */
export const KAS_LEMBAGA_EKSTRA = [
  { nama: 'TPQ', ket: 'Gabungan TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH' },
  { nama: 'Fullday', ket: 'Program fullday (status santri, bukan lembaga)' },
  { nama: "Ma'had", ket: 'Asrama — uang makan & syahriyah pondok' }
]

/**
 * Daftar pilihan "Masuk Kas Lembaga": nama dari master + kas ekstra di atas.
 *
 * @param {Array} lembagaList baris master/lembaga
 * @param {string} terpakai nilai yang SEDANG dipakai. Disertakan walau tak dikenal —
 *   tanpa ini `<select>` yang nilainya di luar daftar tampil kosong lalu MENGHAPUS
 *   setelan Kyai tanpa suara saat disimpan (mis. nilai masuk lewat impor/SQL).
 * @returns {Array<{nama, ket}>} urut: master dulu (apa adanya), lalu kas ekstra.
 */
export function opsiKasLembaga(lembagaList, terpakai = '') {
  const out = []
  const sudah = new Set()
  const tambah = (nama, ket) => {
    const n = String(nama || '').trim()
    const k = kunciLembaga(n)
    if (!n || sudah.has(k)) return
    sudah.add(k)
    out.push({ nama: n, ket: ket || '' })
  }
  for (const l of Array.isArray(lembagaList) ? lembagaList : []) {
    tambah(l?.lembaga || l?.nama)
  }
  for (const e of KAS_LEMBAGA_EKSTRA) tambah(e.nama, e.ket)
  tambah(terpakai, 'setelan lama')
  return out
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
 * Lembaga kas satu baris `keuangan_buku_induk`. '' = Umum / Yayasan (tanpa label lembaga).
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
 * ⚠️ Kas tunggal: `saldo` di sini hanya selisih masuk − keluar BARIS BERLABEL lembaga itu,
 *   bukan uang yang dimiliki lembaga. Kartu kas (Buku Induk, pos dana) menampilkan
 *   `masuk`-nya. Tabungan memakai `saldo` dengan sah — itu titipan santri, bukan kas yayasan.
 *
 * @param {Array} rows baris kas (sudah tersaring periode/metode oleh pemanggil)
 * @param {Function} resolver (row) => nama lembaga ('' = Umum / Yayasan)
 * @returns {Array<{lembaga,kunci,masuk,keluar,saldo,jumlah}>} lembaga berurut nama
 *   (locale id), Umum / Yayasan SELALU paling akhir — ia keranjang sisa, bukan lembaga.
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

/** Nama keranjang baris kas TANPA label lembaga. Satu sumber — dulu tiap layar menulis
 *  sendiri "Kas Induk" / "Kas Induk / Yayasan" / "Kas Induk / belum ditentukan". */
export const LABEL_KAS_UMUM = 'Umum / Yayasan'

/** Nama tampilan lembaga sebuah baris/rekap kas: kosong → "Umum / Yayasan". */
export function labelKasLembaga(nama) {
  return String(nama == null ? '' : nama).trim() || LABEL_KAS_UMUM
}

/**
 * Jumlah sekumpulan baris kas sebagai SATU kas — kas tunggal, tanpa dipecah lembaga.
 *
 * Rumus per barisnya arahNominal (cermin `stats` Buku Induk), jadi untuk baris yang sama
 * `masuk`/`keluar`/`jumlah`-nya PERSIS jumlah seluruh kartu ringkasKasLembaga: kartu
 * pemasukan per lembaga dan saldo kas yayasan tak bisa berselisih diam-diam.
 *
 * @returns {{masuk:number, keluar:number, selisih:number, jumlah:number}} `selisih` =
 *   masuk − keluar baris yang diberikan; ia mutasi, BUKAN posisi kas.
 */
export function jumlahKas(rows = []) {
  let masuk = 0
  let keluar = 0
  let jumlah = 0
  for (const r of Array.isArray(rows) ? rows : []) {
    const a = arahNominal(r)
    masuk += a.masuk
    keluar += a.keluar
    jumlah++
  }
  return { masuk, keluar, selisih: masuk - keluar, jumlah }
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

/**
 * v.1.2.8 — Ringkas mutasi tabungan/uang saku jadi { setor, tarik, saldo, jumlah }.
 * Dipakai laporan PDF mutasi (TabunganView).
 *
 * WAJIB memakai konvensi yang SAMA dengan ringkasTabunganLembaga di atas: 'setor' =
 * masuk, SELAIN ITU keluar. Kalau di sini dibalik menjadi "'tarik' = keluar, selain
 * itu masuk", baris berjenis kosong/salah ketik akan dihitung MASUK di PDF tapi KELUAR
 * di kartu rekap per lembaga — dua angka berbeda untuk hari yang sama, di satu layar,
 * tanpa satu pun galat. Itu jenis selisih yang paling mahal dicari di kas.
 */
export function ringkasSetorTarik(mutasi = []) {
  let setor = 0
  let tarik = 0
  let jumlah = 0
  for (const m of Array.isArray(mutasi) ? mutasi : []) {
    if (!m) continue
    const nominal = Number(m.nominal) || 0
    if (String(m.jenis || '').toLowerCase() === 'setor') setor += nominal
    else tarik += nominal
    jumlah++
  }
  return { setor, tarik, saldo: setor - tarik, jumlah }
}

/** Apakah baris mutasi ini SETORAN? Sumber tunggal supaya laporan & rekap tak berselisih. */
export function mutasiSetor(m) {
  return String(m?.jenis || '').toLowerCase() === 'setor'
}

/**
 * Urutan kronologis mutasi: tanggal, lalu waktu catat (atau id). SATU pembanding untuk
 * buku besar santri di layar DAN saldo di slip cetak ulang — kalau keduanya mengurutkan
 * sendiri-sendiri, mutasi bertanggal sama bisa punya saldo berbeda di layar dan di kertas.
 */
export function bandingMutasi(a, b) {
  const ta = String(a?.tanggal || '')
  const tb = String(b?.tanggal || '')
  if (ta !== tb) return ta < tb ? -1 : 1
  const ka = String(a?.createdAt || a?.id || '')
  const kb = String(b?.createdAt || b?.id || '')
  return ka === kb ? 0 : ka < kb ? -1 : 1
}

/**
 * Saldo santri TEPAT SESUDAH mutasi `m` — yang pantas tercetak sebagai "Saldo Akhir" di
 * slip setor/tarik.
 *
 * Kyai, 14 Sep 2026: "di uang saku dan POS dan yg lain, saya ingin admin keu bisa print
 *   ulang struk." Slip Tabungan/Uang Saku dulu selalu mencetak saldo HARI INI, jadi slip
 *   setoran 3 Agustus yang dicetak ulang pertengahan September menulis saldo September —
 *   kertasnya tak cocok lagi dengan kertas yang dipegang wali. Konvensinya sama dengan
 *   buku besar di layar (mutasiSetor: 'setor' = masuk, selain itu keluar).
 *
 * `m` yang belum ada di daftar (baru disimpan, langganan realtime belum tiba) dihitung
 * pada tempatnya menurut tanggal — tanpa ini slip yang dicetak sesaat sesudah Simpan
 * belum memuat setoran yang sedang dicetak itu sendiri.
 */
export function saldoSetelahMutasi(mutasiList, m) {
  const sid = String(m?.santri_id ?? m?.santriId ?? '')
  if (!sid) return 0
  const idM = String(m?.id ?? '')
  const milik = (Array.isArray(mutasiList) ? mutasiList : []).filter(
    (x) => x && String(x.santri_id ?? x.santriId ?? '') === sid
  )
  const ada = idM && milik.some((x) => String(x.id) === idM)
  const urut = (ada ? milik : [...milik, m]).slice().sort(bandingMutasi)
  let saldo = 0
  for (const x of urut) {
    const nominal = Number(x.nominal) || 0
    saldo += mutasiSetor(x) ? nominal : -nominal
    if (x === m || (idM && String(x.id) === idM)) return saldo
  }
  return saldo
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
