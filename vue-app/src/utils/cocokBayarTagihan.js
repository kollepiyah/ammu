// cocokBayarTagihan — mencocokkan BUKU INDUK (uang yang benar-benar masuk) dengan
// KEUANGAN_TAGIHAN (berapa yang tercatat lunas). Semua fungsi PURE.
//
// KYAI, 5 Sep 2026: "di riwayat keuangan ada tagihan yg sudah di bayar, tapi di tagihan
//   santri itu masih ada" dan "ada yg belum bayar tapi di riwayat tertulis di bayar."
//
// KENAPA DUA DAFTAR ITU BISA BERSELISIH. Uang santri dicatat di DUA tabel yang ditulis
// TERPISAH dan TANPA transaksi bersama:
//
//   keuangan_buku_induk  — baris uang masuk (yang tampil di Riwayat)
//   keuangan_tagihan     — berapa tagihan itu sudah terbayar (yang tampil di Tagihan)
//
// Empat jalur yang terbukti bisa membuat keduanya berpisah, dan semuanya PERNAH terjadi
// menurut kode yang ada:
//
//   1. BAYAR DI MUKA. Sebelum baris tagihannya terbit, POS menulis pembayaran ke buku
//      induk saja (`tagihan_id` kosong) — memang disengaja. Tapi saat tagihan bulan itu
//      akhirnya di-generate, ia lahir dengan `terbayar: 0`: generator hanya memeriksa
//      tagihan kembar, tak pernah menengok buku induk. Uangnya sudah masuk, tagihannya
//      terbit lagi sebagai tunggakan.
//   2. TAGIHAN GAGAL DIPERBARUI. Baris buku induk ditulis lebih dulu, update tagihan
//      menyusul di `.catch()`/`try` yang cuma memberi toast atau console.warn. Kalau
//      update itu ditolak (RLS, baris hilang), uangnya tercatat, tagihannya tidak.
//   3. TRANSFER TAK TERTAUT. Wali transfer tanpa memilih tagihan → admin verifikasi →
//      baris buku induk terbit, tapi tak ada tagihan yang dikurangi sama sekali.
//   4. BARIS BUKU INDUK DIHAPUS / DIINPUT MANUAL. Menghapus transaksi POS sengaja TIDAK
//      me-revert tagihan (tertulis di layarnya), dan input manual Buku Induk tak
//      menyentuh tagihan mana pun. Dua-duanya membuat selisih ke arah sebaliknya.
//
// Alat ini TIDAK menebak sebabnya satu per satu — ia membandingkan ANGKA: berapa rupiah
// yang buku induk catat untuk satu (santri × jenis × periode), dan berapa yang tagihan
// itu akui sudah terbayar. Selisih ke dua arah dilaporkan terpisah, karena artinya beda:
//
//   kurangTercatat  uang ADA di riwayat, tagihan belum mengakuinya  → tunggakan palsu
//   lebihTercatat   tagihan mengaku terbayar, uangnya TAK ADA di riwayat
//
// Sengaja hanya MELAPORKAN. Menambal otomatis berarti menulis angka uang atas dasar
// pencocokan heuristik; keputusan itu milik Kyai, sesudah melihat barisnya satu per satu.

import { terbayarDari, statusTagihan } from './tagihan'
import { periodeKode } from './periodeTagihan'

/** Sumber baris buku induk yang BERARTI "santri membayar". Bisyaroh, kas manual
 *  yayasan, dan pos dana tanpa santri tak boleh ikut — mereka bukan pelunas tagihan. */
export const SUMBER_BAYAR_SANTRI = ['pos_santri', 'transfer_verified', 'bmt_va']

/** Normalisasi label jenis jadi kunci banding. Sama dengan yang dipakai matriks POS. */
export function jenisKunci(v) {
  return String(v ?? '')
    .toLowerCase()
    .trim()
}

/**
 * Kode periode 'YYYY-MM' sebuah baris (tagihan ATAU buku induk).
 *
 * Tiga sumber, berurut dari yang paling bisa dipercaya: kolom `periode_kode` yang ditulis
 * POS, teks `periode` ('Juli 2026' / '2026-07'), lalu `jatuh_tempo`. '' berarti "tak bisa
 * dinilai" — baris seperti itu DILEWATI, tak pernah dicocokkan dengan tebakan.
 */
export function kodePeriodeBaris(row) {
  if (!row) return ''
  const langsung = periodeKode(row.periode_kode)
  if (langsung) return langsung
  const teks = periodeKode(row.periode)
  if (teks) return teks
  // Periode TAHUNAN. `periodeKode` sengaja menolaknya — gerbang "mulai tagih" memang soal
  //   bulan — tapi di sini justru perlu: tagihan tahunan (uang gedung, seragam) juga bisa
  //   dibayar di muka, dan kalau ia tak punya kunci, pembayarannya tak akan pernah cocok.
  //   Dua ejaan yang benar-benar dipakai disamakan: POS menulis 'TA2026' di `periode_kode`,
  //   sedangkan tagihannya berperiode 'TA 2026/2027'.
  const ta = String(row.periode_kode || row.periode || '').match(/^TA\s*(\d{4})/i)
  if (ta) return `TA${ta[1]}`
  const jt = String(row.jatuh_tempo || '').match(/^(\d{4})-(\d{2})/)
  return jt ? `${jt[1]}-${jt[2]}` : ''
}

/** Jenis sebuah TAGIHAN. */
export function jenisTagihan(t) {
  return jenisKunci(t?.kategori || t?.jenis_label || t?.jenis || t?.jenis_id)
}

/**
 * Jenis INDUK sebuah baris buku induk.
 *
 * Tagihan gabungan (mis. "sekolah sudah termasuk ngaji") dipecah jadi beberapa baris buku
 * induk, dan tiap pecahan memakai label KOMPONEN-nya sendiri ('SPP Sekolah', 'Ngaji') —
 * bukan nama tagihan induknya. Tanpa mengembalikan induknya, pembayaran gabungan tak akan
 * pernah cocok dengan tagihannya dan alat ini akan melaporkan seluruh santri gabungan
 * sebagai selisih.
 *
 * Baris BARU membawa `induk_jenis`. Baris LAMA tidak — tapi keterangannya dirakit dengan
 * pola tetap `… — bagian dari <induk>`, jadi induknya masih bisa dibaca dari sana. Itu
 * satu-satunya jejak yang dimiliki data lama; dipakai sebagai cadangan, bukan sebagai
 * sumber utama.
 */
export function jenisBarisBuku(b) {
  const induk = jenisKunci(b?.induk_jenis)
  if (induk) return induk
  const m = String(b?.keterangan || '').match(/bagian dari\s+([^—|]+)/i)
  if (m) return jenisKunci(m[1])
  return jenisKunci(b?.kategori || b?.jenis)
}

/**
 * Alokasi EKSPLISIT sebuah baris buku induk → [{ tagihanId, nominal }].
 *
 * Dua bentuk, dua penulis:
 *   · `tagihan_id`  — POS Santri (v.1.4.2): satu baris melunasi satu tagihan.
 *   · `alokasi[]`   — RPC VA BMT (v.1.4.2): SATU transfer bisa melunasi beberapa tagihan
 *                     sekaligus, jadi rinciannya disimpan per tagihan.
 *
 * Baris yang punya alokasi eksplisit TIDAK ikut dijumlahkan lewat (santri × jenis ×
 * periode) — kalau ikut, uangnya terhitung DUA KALI dan tagihan yang sehat akan
 * dilaporkan sebagai "lebih tercatat".
 *
 * Kenapa ini penting untuk VA: baris `bmt_va` tak punya `kategori` maupun `periode_kode`
 * sama sekali, jadi tanpa jalur ini ia tak masuk hitungan mana pun — dan tagihan yang
 * separuh dibayar POS lalu dilunasi VA akan tampak "lebih tercatat" padahal benar.
 */
export function alokasiEksplisit(b) {
  const out = []
  const langsung = String(b?.tagihan_id || '').trim()
  if (langsung) out.push({ tagihanId: langsung, nominal: Number(b?.nominal || 0) })
  const rinci = Array.isArray(b?.alokasi) ? b.alokasi : b?.data?.alokasi
  for (const a of Array.isArray(rinci) ? rinci : []) {
    const id = String(a?.tagihan_id || '').trim()
    const nom = Number(a?.nominal || 0)
    if (id && nom > 0) out.push({ tagihanId: id, nominal: nom })
  }
  return out
}

/** Peta tagihan_id → { total, baris[] } dari alokasi eksplisit. */
export function petaBayarPerTagihan(bukuInduk, sumberSah = SUMBER_BAYAR_SANTRI) {
  const sah = new Set(sumberSah.map(String))
  const peta = new Map()
  for (const b of bukuInduk || []) {
    if (!b) continue
    if (!sah.has(String(b.sumber || ''))) continue
    if (String(b.tipe || 'masuk') !== 'masuk') continue
    for (const a of alokasiEksplisit(b)) {
      const ada = peta.get(a.tagihanId) || { total: 0, baris: [] }
      ada.total += a.nominal
      if (!ada.baris.includes(b)) ada.baris.push(b)
      peta.set(a.tagihanId, ada)
    }
  }
  return peta
}

/** Kunci sel: satu (santri × jenis × periode). */
export function kunciSel(santriId, jenis, kode) {
  return `${String(santriId ?? '')}|${jenisKunci(jenis)}|${String(kode ?? '')}`
}

/**
 * Peta kunci sel → { total, baris[] } dari baris buku induk.
 *
 * Hanya baris MASUK bersumber pembayaran santri, ber-santri_id, dan yang periodenya bisa
 * dibaca. Baris tanpa periode (mis. "Item lain" ketikan kasir) TIDAK bisa ditautkan ke
 * tagihan mana pun secara jujur, jadi dibiarkan di luar pemeriksaan.
 */
export function petaBayarPerSel(bukuInduk, sumberSah = SUMBER_BAYAR_SANTRI) {
  const sah = new Set(sumberSah.map(String))
  const peta = new Map()
  for (const b of bukuInduk || []) {
    if (!b) continue
    if (!sah.has(String(b.sumber || ''))) continue
    if (String(b.tipe || 'masuk') !== 'masuk') continue
    // Sudah tertaut ke tagihan tertentu → dihitung di petaBayarPerTagihan, bukan di sini.
    //   Menghitungnya dua kali membuat tagihan sehat dilaporkan "lebih tercatat".
    if (alokasiEksplisit(b).length) continue
    const sid = String(b.santri_id ?? b?.data?.santri_id ?? '')
    if (!sid) continue
    const kode = kodePeriodeBaris(b)
    if (!kode) continue
    const k = kunciSel(sid, jenisBarisBuku(b), kode)
    const ada = peta.get(k) || { total: 0, baris: [] }
    ada.total += Number(b.nominal || 0)
    ada.baris.push(b)
    peta.set(k, ada)
  }
  return peta
}

/** Selisih dianggap nyata mulai dari 1 rupiah; di bawah itu pembulatan.
 *  0.5 = ambang yang sama dengan statusTagihan (nominal bigint, input bisa pecahan). */
const AMBANG = 0.5

/**
 * Pemeriksaan utama.
 *
 * @param {Array} tagihanList  baris keuangan_tagihan
 * @param {Array} bukuInduk    baris keuangan_buku_induk
 * @param {object} [opsi]
 * @param {Array}  [opsi.transferPending] baris pembayaran_transfer_pending — untuk mencari
 *   baris buku induk `bi_trf_*` yang transfer aslinya TIDAK berstatus 'verified'
 *   (ditolak / terhapus). Baris seperti itu = uang di riwayat yang tak pernah sah.
 * @param {Map|object} [opsi.namaSantri] id → nama, untuk melabeli temuan.
 *
 * @returns {{kurangTercatat:Array, lebihTercatat:Array, statusMeleset:Array,
 *   transferYatim:Array, bayarTanpaTagihan:Array, ringkas:object}}
 */
export function periksaKecocokanBayar(tagihanList, bukuInduk, opsi = {}) {
  const peta = petaBayarPerSel(bukuInduk)
  const petaId = petaBayarPerTagihan(bukuInduk)
  const nama = (id) => {
    const n = opsi.namaSantri
    if (!n) return ''
    return (n instanceof Map ? n.get(String(id)) : n[String(id)]) || ''
  }

  const kurangTercatat = []
  const lebihTercatat = []
  const statusMeleset = []
  const terpakai = new Set()

  for (const t of tagihanList || []) {
    if (!t) continue
    const sid = String(t.santri_id ?? '')
    const kode = kodePeriodeBaris(t)
    const nominal = Number(t.nominal || 0)
    const terbayar = terbayarDari(t)

    // Status kolom vs status hasil hitung. Dua-duanya dipakai layar yang berbeda —
    //   daftar tunggakan POS & notifikasi menyaring lewat KOLOM, sedangkan Tagihan &
    //   Pembayaran menghitung SISA. Selama keduanya berselisih, satu layar akan bilang
    //   lunas sementara layar lain menagih.
    const statusKolom = String(t.status || '').toLowerCase()
    const statusHitung = statusTagihan(nominal, terbayar)
    if (statusKolom && statusKolom !== statusHitung) {
      statusMeleset.push({
        tagihan: t,
        santriId: sid,
        nama: t.santri_nama || nama(sid),
        nominal,
        terbayar,
        statusKolom,
        statusHitung
      })
    }

    // Uang untuk tagihan ini datang lewat DUA jalur yang tak boleh bertumpuk: alokasi
    //   eksplisit (POS ber-`tagihan_id`, VA BMT ber-`alokasi[]`) dan bucket
    //   (santri × jenis × periode) untuk baris lama yang tak menyebut tagihannya.
    const lewatId = petaId.get(String(t.id || ''))
    const k = sid && kode ? kunciSel(sid, jenisTagihan(t), kode) : ''
    const lewatSel = k ? peta.get(k) : null
    if (!lewatId && !lewatSel) continue
    if (k && lewatSel) terpakai.add(k)
    const diRiwayat = (lewatId?.total || 0) + (lewatSel?.total || 0)
    const barisSemua = [...(lewatId?.baris || []), ...(lewatSel?.baris || [])]

    const selisih = diRiwayat - terbayar
    const temuan = {
      tagihan: t,
      santriId: sid,
      nama: t.santri_nama || nama(sid),
      jenis: t.kategori || t.jenis || '',
      periode: t.periode || kode,
      kode,
      nominal,
      terbayar,
      diRiwayat,
      selisih: Math.abs(selisih),
      barisBuku: barisSemua.map((b) => b.id).filter(Boolean),
      // Angka yang SEHARUSNYA tercatat bila temuan ini ditambal. Tak pernah melebihi
      //   nominal tagihan: kelebihan bayar bukan urusan alat ini dan menuliskannya akan
      //   membuat tagihan tampak "lebih" di laporan.
      usulTerbayar: Math.min(Math.max(terbayar, diRiwayat), nominal || diRiwayat)
    }
    if (selisih > AMBANG) kurangTercatat.push(temuan)
    else if (selisih < -AMBANG) lebihTercatat.push(temuan)
  }

  // Uang yang periodenya jelas tapi TAK punya tagihan sama sekali. Sebagian besar sah
  //   (bayar di muka sebelum tagihannya terbit — memang begitu rancangannya), jadi ini
  //   bukan "temuan salah" melainkan daftar yang harus dilindungi: begitu tagihan periode
  //   itu di-generate, merekalah yang akan berubah jadi tunggakan palsu.
  const bayarTanpaTagihan = []
  for (const [k, v] of peta) {
    if (terpakai.has(k)) continue
    const [sid, jenis, kode] = k.split('|')
    bayarTanpaTagihan.push({
      santriId: sid,
      nama: v.baris[0]?.santri_nama || nama(sid),
      jenis,
      kode,
      diRiwayat: v.total,
      barisBuku: v.baris.map((b) => b.id).filter(Boolean)
    })
  }

  // Baris `bi_trf_*` yang transfer aslinya tidak (lagi) verified — uang di riwayat yang
  //   tak pernah sah. Terjadi bila verifikasi berhenti di tengah (baris buku induk sudah
  //   ditulis, penetapan status 'verified' gagal) lalu transfernya ditolak: penolakan
  //   tidak pernah menghapus baris buku induk yang terlanjur lahir.
  const transferYatim = []
  if (Array.isArray(opsi.transferPending)) {
    const statusRef = new Map(
      opsi.transferPending.map((p) => [String(p?.id), String(p?.status || '')])
    )
    for (const b of bukuInduk || []) {
      if (String(b?.sumber || '') !== 'transfer_verified') continue
      const ref = String(b.transfer_ref_id || '')
      if (!ref) continue
      const st = statusRef.get(ref)
      if (st === 'verified') continue
      transferYatim.push({
        barisId: b.id,
        santriId: String(b.santri_id ?? ''),
        nama: b.santri_nama || nama(b.santri_id),
        nominal: Number(b.nominal || 0),
        tanggal: b.tanggal || '',
        refStatus: st || '(transfer sudah tak ada)'
      })
    }
  }

  const jumlahRp = (arr, kunci) => arr.reduce((s, x) => s + Number(x[kunci] || 0), 0)
  return {
    kurangTercatat,
    lebihTercatat,
    statusMeleset,
    transferYatim,
    bayarTanpaTagihan,
    ringkas: {
      tagihanDiperiksa: (tagihanList || []).length,
      barisBukuDipakai: peta.size,
      kurangTercatat: kurangTercatat.length,
      kurangTercatatRp: jumlahRp(kurangTercatat, 'selisih'),
      lebihTercatat: lebihTercatat.length,
      lebihTercatatRp: jumlahRp(lebihTercatat, 'selisih'),
      statusMeleset: statusMeleset.length,
      transferYatim: transferYatim.length,
      transferYatimRp: jumlahRp(transferYatim, 'nominal'),
      bayarTanpaTagihan: bayarTanpaTagihan.length,
      bayarTanpaTagihanRp: jumlahRp(bayarTanpaTagihan, 'diRiwayat')
    }
  }
}

/**
 * Muatan tulis untuk menambal SATU temuan `kurangTercatat`.
 *
 * Yang ditulis hanya `terbayar` + `status` + jejaknya. Nominal tagihan TIDAK disentuh, dan
 * tak ada baris buku induk yang dibuat — uangnya memang sudah tercatat di sana; yang
 * kurang cuma pengakuan di sisi tagihan.
 */
export function payloadTambalKurang(temuan, stamp) {
  const terbayar = Number(temuan?.usulTerbayar || 0)
  return {
    terbayar,
    status: statusTagihan(Number(temuan?.nominal || 0), terbayar),
    rekon_at: stamp,
    rekon_sebab: 'cocok buku induk',
    rekon_dari: Number(temuan?.terbayar || 0)
  }
}

/** Muatan tulis untuk menyelaraskan KOLOM status dengan sisa hasil hitung. */
export function payloadSelaraskanStatus(temuan) {
  return { status: temuan?.statusHitung || 'belum' }
}
