// batalBayarTagihan — pembayaran santri yang DIHAPUS ikut mengembalikan tagihannya.
// Semua fungsi PURE (tanpa I/O). Penulisannya ada di services/hapusBarisKas.js.
//
// KYAI, 14 Sep 2026, meneruskan laporan admin keuangan:
//   "riwayat transaksi yg dibatalkan/dihapus oleh admin karena kekeliruan input admin,
//    tapi di POS santrinya terbaca lunas. padahal tadi sudah dihapus"
//
// SEBABNYA. Uang santri hidup di DUA tabel (lihat utils/cocokBayarTagihan):
//
//   keuangan_buku_induk  — baris uang (Riwayat POS, Buku Induk, Uang POS)
//   keuangan_tagihan     — `terbayar` + `status` (matriks POS, Tagihan, notifikasi wali)
//
// Membayar di POS menulis KEDUANYA. Menghapus — dari Riwayat POS, Buku Induk, maupun
// Uang Kegiatan/Buku — hanya menghapus yang PERTAMA; dialognya sendiri terang-terangan
// menulis "Tagihan yg ter-lunaskan TIDAK otomatis di-revert". Matriks POS membaca
// `terbayar` dari tagihan, jadi selnya tetap hijau "lunas" untuk uang yang sudah tak ada
// di mana pun: wali tak ditagih lagi, kas tak pernah menerimanya, dan tak satu layar pun
// berbunyi. Alat "Cek Riwayat vs Tagihan" memang menangkapnya (lunas tanpa jejak / lebih
// tercatat), tapi sengaja tak menambalnya — dari angka saja ia tak bisa tahu sebabnya.
// Di sini sebabnya DIKETAHUI: barisnya baru saja dihapus.
//
// Berkas ini memegang DUA SISI dari satu angka, dan itu disengaja:
//   · saat BAYAR — berapa yang ditambahkan satu baris ke `terbayar`
//     (pelunasanItem, bagiTambahTagihan → kolom `tagihan_tambah` di baris buku induk);
//   · saat HAPUS — berapa yang dikurangkan kembali (tambahanBaris, rencanaBatalBayar).
// Ditulis di dua berkas, cepat atau lambat keduanya berbeda pendapat — kelas bug yang
// paling sering menggigit repo ini.

import {
  alokasiEksplisit,
  jenisBarisBuku,
  kodePeriodeBaris,
  jenisTagihan,
  kunciSel,
  SUMBER_BAYAR_SANTRI
} from './cocokBayarTagihan'
import { terbayarDari, statusTagihan } from './tagihan'
import { lunasDenganPotongan } from './potonganPos'

/** Selisih di bawah ini = pembulatan. Ambang yang sama dengan statusTagihan. */
const AMBANG = 0.5

const _num = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}
const _teks = (v) => String(v ?? '').trim()

// ── Sisi BAYAR ───────────────────────────────────────────────────────────────

/**
 * Akibat satu item keranjang POS pada tagihannya — rumus yang dipakai PosSantriView
 * untuk MENULIS tagihan, dipindah ke sini supaya sisi hapus membaca angka yang sama.
 *
 * `tambah` bisa LEBIH besar dari uangnya (potongan ikut menutup tagihan, keputusan Kyai
 * 5 Agu 2026) atau LEBIH kecil (kasir membulatkan ke atas, sementara tagihan yang lunas
 * dijepit ke nominal penuhnya). Karena itu "uang di baris" tak bisa dipakai sebagai
 * angka yang dikurangkan saat baris itu dihapus.
 *
 * @param {object} item butir payload.items dari ModalPOS
 * @returns {{ lunas:boolean, terbayar:number, tambah:number }}
 */
export function pelunasanItem(item) {
  const penuh = _num(item?.nominal_penuh)
  const lama = _num(item?.dibayar_lama)
  const kini = _num(item?.nominal)
  const lunas = lunasDenganPotongan(penuh, lama, kini, _num(item?.potongan_nominal))
  const baru = lama + kini
  const terbayar = lunas ? penuh || baru : baru
  return { lunas, terbayar, tambah: Math.max(0, terbayar - lama) }
}

/**
 * Bagi `tambah` satu item ke baris-baris buku induk yang BENAR-BENAR ditulis untuknya
 * (tagihan gabungan dipecah per komponen, K1). Tiap baris mendapat uangnya sendiri;
 * selisihnya — potongan, atau pembulatan kasir — ditanggung baris paling depan, tanpa
 * ada yang negatif. Jumlahnya selalu `tambah`, jadi menghapus seluruh baris satu
 * transaksi mengembalikan tagihan TEPAT ke angka sebelum dibayar, dan menghapus satu
 * baris pecahan saja mengembalikan bagian baris itu saja.
 *
 * @param {number[]} nominalBaris uang tiap baris, urut sesuai penulisan
 * @param {number} tambah pelunasanItem().tambah
 * @returns {number[]} sepanjang nominalBaris
 */
export function bagiTambahTagihan(nominalBaris, tambah) {
  const out = (Array.isArray(nominalBaris) ? nominalBaris : []).map((x) => Math.max(0, _num(x)))
  if (!out.length) return out
  let sisa = Math.max(0, _num(tambah)) - out.reduce((a, b) => a + b, 0)
  if (sisa >= 0) {
    out[0] += sisa
    return out
  }
  for (let i = 0; i < out.length && sisa < 0; i++) {
    const ambil = Math.min(out[i], -sisa)
    out[i] -= ambil
    sisa += ambil
  }
  return out
}

// ── Sisi HAPUS ───────────────────────────────────────────────────────────────

/**
 * Baris ini PEMBAYARAN santri? Kas manual, bisyaroh, dan pengeluaran tak pernah melunasi
 * tagihan, jadi menghapusnya tak boleh menyentuh tagihan mana pun. Penyaringnya sama
 * dengan pencocok Riwayat vs Tagihan — satu definisi "baris bayar santri".
 */
export function barisBayarSantri(b) {
  if (!b) return false
  if (!SUMBER_BAYAR_SANTRI.includes(_teks(b.sumber))) return false
  return _teks(b.tipe || 'masuk') === 'masuk'
}

/**
 * Berapa yang DULU ditambahkan baris ini ke `terbayar` tagihannya.
 *
 * Baris sejak v.1.4.3 membawa angka pastinya di `tagihan_tambah`. Baris lama ditaksir
 * uang + potongan — tepat untuk semua kasus kecuali kasir membulatkan ke atas, dan
 * kelebihan taksiran itu dijepit rencanaBatalBayar: tak pernah di bawah nol, tak pernah
 * di bawah uang yang masih tercatat untuk tagihan itu.
 */
export function tambahanBaris(b) {
  const pasti = b?.tagihan_tambah
  if (pasti !== undefined && pasti !== null && pasti !== '') {
    const n = Number(pasti)
    if (Number.isFinite(n) && n >= 0) return n
  }
  return Math.max(0, _num(b?.nominal)) + Math.max(0, _num(b?.potongan_nominal))
}

function _tambahKe(peta, kunci, nilai) {
  if (!peta.has(kunci)) peta.set(kunci, [])
  peta.get(kunci).push(nilai)
}

/** Indeks tagihan untuk tautanBaris — dibangun sekali per rencana. Tagihan kembar per id
 *  (hasil dua query santri_id teks + angka) cukup dihitung sekali. */
export function indeksTagihan(tagihanList) {
  const byId = new Map()
  const bySel = new Map()
  const byTransfer = new Map()
  const byPrabayar = new Map()
  for (const t of Array.isArray(tagihanList) ? tagihanList : []) {
    if (!t || t.id == null || byId.has(String(t.id))) continue
    byId.set(String(t.id), t)
    const sid = _teks(t.santri_id)
    const kode = kodePeriodeBaris(t)
    if (sid && kode) _tambahKe(bySel, kunciSel(sid, jenisTagihan(t), kode), t)
    for (const ref of Array.isArray(t.applied_transfer_refs) ? t.applied_transfer_refs : []) {
      _tambahKe(byTransfer, String(ref), t)
    }
    for (const id of Array.isArray(t.prabayar_dari) ? t.prabayar_dari : []) {
      _tambahKe(byPrabayar, String(id), t)
    }
  }
  return { byId, bySel, byTransfer, byPrabayar }
}

/**
 * Tagihan yang dilunasi satu baris buku induk, dan berapa rupiah untuk masing-masing.
 * Dari jalur yang paling pasti:
 *
 *   1. `tagihan_id`             POS Santri sejak v.1.4.1
 *   2. `alokasi[]`              RPC VA BMT — satu transfer bisa melunasi beberapa tagihan
 *   3. `applied_transfer_refs`  tagihan yang dinaikkan verifikasi transfer baris ini
 *   4. `prabayar_dari`          tagihan yang LAHIR sudah terbayar oleh baris ini (bayar
 *                               di muka, lalu tagihannya di-generate)
 *   5. sel santri × jenis × periode — baris POS lama yang tak menyebut tagihannya. HANYA
 *      bila tepat satu tagihan cocok; dua atau lebih = `ambigu`, tak ada yang ditebak.
 *
 * Begitu satu jalur menemukan tautan, jalur di bawahnya tak dicoba — kalau ikut dicoba,
 * satu rupiah bisa dikurangkan dua kali dari tagihan yang sama.
 *
 * @returns {{ tautan: Array<{tagihanId:string, jumlah:number, cara:string}>, ambigu:boolean }}
 */
export function tautanBaris(b, indeks) {
  const hasil = { tautan: [], ambigu: false }
  if (!barisBayarSantri(b) || !indeks) return hasil

  const langsung = _teks(b.tagihan_id)
  alokasiEksplisit(b).forEach((a, i) => {
    // alokasiEksplisit menaruh `tagihan_id` paling depan; baris POS menyimpan angka
    //   pastinya sendiri, alokasi VA BMT sudah berupa angka pasti per tagihan.
    const lewatId = i === 0 && !!langsung && a.tagihanId === langsung
    hasil.tautan.push({
      tagihanId: a.tagihanId,
      jumlah: lewatId ? tambahanBaris(b) : Math.max(0, _num(a.nominal)),
      cara: lewatId ? 'tagihan_id' : 'alokasi'
    })
  })
  if (hasil.tautan.length) return hasil

  const ref = _teks(b.transfer_ref_id)
  if (ref && indeks.byTransfer.has(ref)) {
    // Verifikasi transfer menambahkan nominal transfer apa adanya (PembayaranPendingView).
    for (const t of indeks.byTransfer.get(ref)) {
      hasil.tautan.push({
        tagihanId: String(t.id),
        jumlah: Math.max(0, _num(b.nominal)),
        cara: 'transfer'
      })
    }
    return hasil
  }

  const id = _teks(b.id)
  if (id && indeks.byPrabayar.has(id)) {
    // Generator menjumlahkan UANG baris saat mengisi terbayar awal — tanpa potongan.
    for (const t of indeks.byPrabayar.get(id)) {
      hasil.tautan.push({
        tagihanId: String(t.id),
        jumlah: Math.max(0, _num(b.nominal)),
        cara: 'prabayar'
      })
    }
    return hasil
  }

  const sid = _teks(b.santri_id ?? b?.data?.santri_id)
  const kode = kodePeriodeBaris(b)
  if (!sid || !kode) return hasil
  const calon = indeks.bySel.get(kunciSel(sid, jenisBarisBuku(b), kode)) || []
  if (calon.length === 1) {
    hasil.tautan.push({ tagihanId: String(calon[0].id), jumlah: tambahanBaris(b), cara: 'sel' })
  } else if (calon.length > 1) {
    hasil.ambigu = true
  }
  return hasil
}

function _sudahBatal(t) {
  return new Set((Array.isArray(t?.batal_baris) ? t.batal_baris : []).map(String))
}

/**
 * Rencana mengembalikan tagihan untuk baris-baris yang (akan) DIHAPUS.
 *
 * Aturan angkanya:
 *   terbayar baru = terbayar lama − tambahan baris yang dihapus,
 *   TETAPI tak pernah di bawah uang yang MASIH tercatat untuk tagihan itu (`tersisa`),
 *   dan tak pernah di bawah nol.
 *
 * Lantai kedua itulah yang membuat penghapusan baris KEMBAR aman: dua baris untuk satu
 * pembayaran → yang satu dihapus → tagihannya tetap lunas, karena baris yang tersisa
 * masih menopangnya. Tanpa lantai itu, merapikan dobel = menagih ulang wali yang sudah
 * membayar.
 *
 * Baris yang pernah dikembalikan (tercatat di `batal_baris` tagihannya) dilewati, jadi
 * hapus yang DIULANG — mis. koneksi putus sesudah tagihan dikembalikan tapi sebelum
 * barisnya terhapus — tak mengurangi dua kali.
 *
 * @param {object} p
 * @param {Array}  p.dihapus    baris buku induk yang dihapus
 * @param {Array}  [p.tersisa]  baris buku induk lain yang TETAP ada (minimal milik santri
 *                              yang sama) — dasar lantai di atas
 * @param {Array}  p.tagihan    baris keuangan_tagihan yang mungkin tertaut
 * @param {string} [p.stamp]    ISO — jejak `batal_at`
 * @param {string} [p.operator] nama — jejak `batal_oleh`
 * @returns {{ rencana:Array, ambigu:Array, tanpaTautan:Array, tagihanHilang:Array,
 *   adaBayar:boolean }}
 */
export function rencanaBatalBayar({
  dihapus = [],
  tersisa = [],
  tagihan = [],
  stamp = '',
  operator = ''
} = {}) {
  const indeks = indeksTagihan(tagihan)
  const daftar = Array.isArray(dihapus) ? dihapus : []
  const idDihapus = new Set(daftar.map((b) => _teks(b?.id)).filter(Boolean))

  const kurang = new Map()
  const ambigu = []
  const tanpaTautan = []
  const tagihanHilang = []
  let adaBayar = false
  for (const b of daftar) {
    if (!barisBayarSantri(b)) continue
    adaBayar = true
    const { tautan, ambigu: ragu } = tautanBaris(b, indeks)
    if (ragu) {
      ambigu.push(b)
      continue
    }
    if (!tautan.length) {
      // Bayar di muka yang belum bertagihan, atau transfer tanpa tagihan. Normal: tak ada
      //   tagihan yang pernah dinaikkan baris ini.
      tanpaTautan.push(b)
      continue
    }
    const idB = _teks(b.id)
    for (const l of tautan) {
      const t = indeks.byId.get(l.tagihanId)
      if (!t) {
        tagihanHilang.push({ baris: b, tagihanId: l.tagihanId })
        continue
      }
      if (idB && _sudahBatal(t).has(idB)) continue
      const agg = kurang.get(l.tagihanId) || {
        jumlah: 0,
        baris: [],
        refs: [],
        potongan: false,
        nama: ''
      }
      agg.jumlah += l.jumlah
      if (idB && !agg.baris.includes(idB)) agg.baris.push(idB)
      if (l.cara === 'transfer') agg.refs.push(_teks(b.transfer_ref_id))
      if (_num(b.potongan_nominal) > 0) agg.potongan = true
      if (!agg.nama) agg.nama = _teks(b.santri_nama)
      kurang.set(l.tagihanId, agg)
    }
  }

  const dukung = new Map()
  for (const b of Array.isArray(tersisa) ? tersisa : []) {
    const idB = _teks(b?.id)
    if (!b || (idB && idDihapus.has(idB)) || !barisBayarSantri(b)) continue
    for (const l of tautanBaris(b, indeks).tautan) {
      if (!kurang.has(l.tagihanId)) continue
      // Baris yang tagihannya SUDAH dikembalikan tapi barisnya masih ada (hapus gagal di
      //   tengah jalan) tak lagi menopang apa pun.
      if (idB && _sudahBatal(indeks.byId.get(l.tagihanId)).has(idB)) continue
      dukung.set(l.tagihanId, (dukung.get(l.tagihanId) || 0) + l.jumlah)
    }
  }

  const rencana = []
  for (const [tagihanId, agg] of kurang) {
    const t = indeks.byId.get(tagihanId)
    const nominal = _num(t.nominal)
    const terbayarLama = terbayarDari(t)
    const lantai = Math.min(dukung.get(tagihanId) || 0, terbayarLama)
    const terbayarBaru = Math.max(lantai, terbayarLama - agg.jumlah, 0)
    // Tak ada yang berubah — tagihan belum pernah dinaikkan, atau masih ditopang baris lain.
    if (terbayarBaru >= terbayarLama - AMBANG) continue
    const statusBaru = statusTagihan(nominal, terbayarBaru)
    rencana.push({
      tagihanId,
      tagihan: t,
      santriId: _teks(t.santri_id),
      nama: _teks(t.santri_nama) || agg.nama,
      jenis: _teks(t.kategori || t.jenis_label),
      periode: _teks(t.periode) || kodePeriodeBaris(t),
      nominal,
      terbayarLama,
      terbayarBaru,
      statusLama: _teks(t.status).toLowerCase() || statusTagihan(nominal, terbayarLama),
      statusBaru,
      baris: agg.baris,
      payload: payloadBatalBayar(t, {
        terbayarBaru,
        statusBaru,
        baris: agg.baris,
        refs: agg.refs,
        potongan: agg.potongan,
        stamp,
        operator
      })
    })
  }
  rencana.sort(
    (a, b) =>
      a.nama.localeCompare(b.nama, 'id') || String(a.periode).localeCompare(String(b.periode))
  )
  return { rencana, ambigu, tanpaTautan, tagihanHilang, adaBayar }
}

/**
 * Muatan tulis untuk SATU tagihan yang dikembalikan. Yang disentuh hanya angka terbayar,
 * status, dan jejaknya — nominal tagihan tak pernah berubah.
 */
export function payloadBatalBayar(
  t,
  {
    terbayarBaru = 0,
    statusBaru = '',
    baris = [],
    refs = [],
    potongan = false,
    stamp = '',
    operator = ''
  } = {}
) {
  const status = statusBaru || statusTagihan(_num(t?.nominal), terbayarBaru)
  const lama = Array.isArray(t?.batal_baris) ? t.batal_baris.map(String) : []
  const p = {
    terbayar: terbayarBaru,
    status,
    batal_baris: [...new Set([...lama, ...baris.map(String)])],
    batal_at: stamp || null,
    batal_oleh: operator || '',
    batal_dari: terbayarDari(t)
  }
  // Tagihan yang tak lagi lunas tak boleh membawa tanggal lunasnya.
  if (status !== 'lunas' && t?.tanggal_lunas) p.tanggal_lunas = null
  if (terbayarBaru <= 0) {
    if (t?.dibayar_via) p.dibayar_via = ''
    if (t?.operator_pelunasan) p.operator_pelunasan = ''
  }
  // Ekor jsonb lama. terbayarDari() jatuh ke `bayar`/`dibayar` saat kolomnya 0 — tanpa
  //   dua baris ini, tagihan yang dikembalikan ke nol tetap tampak terbayar.
  for (const k of ['bayar', 'dibayar']) {
    if (t && t[k] != null && t[k] !== '' && _num(t[k]) !== terbayarBaru) p[k] = terbayarBaru
  }
  // Potongan dicatat di tagihan oleh transaksi yang memakainya; transaksinya hilang,
  //   potongannya ikut hilang.
  if (potongan && (_num(t?.potongan_nominal) > 0 || _teks(t?.potongan_label))) {
    p.potongan_nominal = 0
    p.potongan_label = ''
  }
  // Tanpa ini, transfer yang sama tak akan pernah bisa diakui lagi: penjaga dobel-hitung
  //   di verifikasi transfer melewati tagihan yang sudah memuat ref-nya.
  if (refs.length && Array.isArray(t?.applied_transfer_refs)) {
    const buang = new Set(refs.map(String))
    p.applied_transfer_refs = t.applied_transfer_refs.filter((r) => !buang.has(String(r)))
  }
  return p
}

const _rp = (n) => 'Rp ' + Math.round(_num(n)).toLocaleString('id-ID')

/**
 * Kalimat untuk dialog konfirmasi hapus. Yang menghapus harus melihat tagihan MANA yang
 * akan kembali menagih SEBELUM menekan OK, bukan sesudahnya. '' bila tak ada baris
 * pembayaran santri di antara yang dihapus (kas manual dsb.).
 */
export function ringkasRencanaBatal(hasil, { batas = 8 } = {}) {
  if (!hasil?.adaBayar) return ''
  const r = hasil.rencana || []
  const baris = []
  if (r.length) {
    baris.push(`Tagihan yang ikut dikembalikan (${r.length}):`)
    for (const x of r.slice(0, batas)) {
      const siapa = x.nama ? `${x.nama} — ` : ''
      const apa = [x.jenis, x.periode].filter(Boolean).join(' ')
      baris.push(
        `• ${siapa}${apa}: terbayar ${_rp(x.terbayarLama)} → ${_rp(x.terbayarBaru)} (${x.statusBaru})`
      )
    }
    if (r.length > batas) baris.push(`…dan ${r.length - batas} tagihan lagi`)
  } else {
    baris.push(
      'Tidak ada tagihan yang berubah (bayar di muka, atau tagihannya masih ditopang baris lain).'
    )
  }
  const ragu = (hasil.ambigu || []).length
  if (ragu) {
    baris.push(
      `⚠ ${ragu} baris cocok dengan lebih dari satu tagihan — tagihannya TIDAK diubah. ` +
        'Periksa lewat Pengaturan Keuangan › Cek Riwayat vs Tagihan.'
    )
  }
  return baris.join('\n')
}

/**
 * Satu pesan toast dari hasil services/hapusBarisKas. Kegagalan disebut lebih dulu dan
 * tak pernah disamarkan jadi "berhasil".
 *
 * @returns {{ tipe:'success'|'warning'|'error', teks:string } | null}
 */
export function pesanHasilHapus(r) {
  if (!r) return null
  const barisOk = r.barisOk || 0
  const kembali = r.tagihanOk || 0
  const ekor = kembali ? ` · ${kembali} tagihan dikembalikan` : ''
  const gagalTagihan = r.tagihanGagal || []
  if (gagalTagihan.length) {
    const tertahan = (r.barisTertahan || []).length
    return {
      tipe: 'error',
      teks:
        `${gagalTagihan.length} tagihan GAGAL dikembalikan (${gagalTagihan[0].pesan}), jadi ` +
        `${tertahan} baris transaksinya TIDAK dihapus. ${barisOk} baris lain terhapus${ekor}.`
    }
  }
  const gagalBaris = r.barisGagal || []
  if (gagalBaris.length) {
    return {
      tipe: 'warning',
      teks:
        `${barisOk} baris dihapus, ${gagalBaris.length} gagal (${gagalBaris[0].pesan})${ekor}. ` +
        'Ulangi hapus untuk baris yang gagal — tagihannya tak akan dikurangi dua kali.'
    }
  }
  return { tipe: 'success', teks: `${barisOk} baris dihapus${ekor}.` }
}

/**
 * Baris buku induk yang PERNAH dihapus, dibaca kembali dari salinan `audit_log`
 * (services/db.deleteOne selalu menyalinnya lebih dulu). Dipakai memulihkan tagihan yang
 * terlanjur ditinggal lunas oleh penghapusan SEBELUM v.1.4.3.
 *
 * @param {Array} auditRows baris audit_log (aksi 'delete', collection 'keuangan_buku_induk')
 * @param {Iterable<string>} [idMasihAda] id yang sekarang ADA lagi di buku induk — sudah
 *   dipulihkan, jadi bukan lagi baris terhapus
 * @returns {Array} snapshot baris + `_hapus: { auditId, waktu, oleh, alasan }`; satu per
 *   id (penghapusan terakhir yang menang)
 */
export function barisDariAuditHapus(auditRows, idMasihAda = []) {
  const ada = new Set([...(idMasihAda || [])].map(String))
  const per = new Map()
  for (const a of Array.isArray(auditRows) ? auditRows : []) {
    if (!a) continue
    if (_teks(a.collection) && _teks(a.collection) !== 'keuangan_buku_induk') continue
    if (_teks(a.aksi) && _teks(a.aksi) !== 'delete') continue
    let snap = a.data_snapshot
    if (typeof snap === 'string') {
      try {
        snap = JSON.parse(snap)
      } catch {
        snap = null
      }
    }
    if (!snap || typeof snap !== 'object') continue
    const id = _teks(snap.id || a.doc_id)
    if (!id || ada.has(id)) continue
    const waktu = _teks(a.timestamp || a.created_at)
    const lama = per.get(id)
    if (lama && lama._hapus.waktu >= waktu) continue
    per.set(id, {
      ...snap,
      id,
      _hapus: { auditId: _teks(a.id), waktu, oleh: _teks(a.user_nama), alasan: _teks(a.alasan) }
    })
  }
  return [...per.values()]
}
