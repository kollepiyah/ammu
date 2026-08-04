// syahriyah.js — SATU sumber kebenaran perhitungan syahriyah: nominal + pemecahan komponen.
//
// LATAR (Kyai, 3 Agu 2026): aturan di lapangan tak sesuai model aplikasi.
//   Anak yang sekolah + ngaji PAGI di sini, syahriyah ngajinya SUDAH TERMASUK di syahriyah
//   sekolah — sekarang ia ditagih DUA KALI. Contoh: Ahmad (TPQ Jilid 5 + SDI I) bayar
//   200.000 termasuk ngaji 90.000; Zaidun (PTPT Kelas 3 + SDI II) juga 200.000 tapi komponen
//   ngajinya 100.000 (porsi sekolah 110.000 vs 100.000). Santri FULLDAY sama polanya:
//   Syahriyah Fullday sudah termasuk ngaji SORE.
//
// KEPUTUSAN KYAI yang diwujudkan di sini:
//   K1 komponen ngaji DIPECAH di Buku Induk (wali lihat 1 tagihan; bayarnya jadi 2 baris)
//      supaya laporan per lembaga & Buku Kas per gedung tetap akurat.
//   K2 penentu gabungan OTOMATIS dari data, bisa dikecualikan manual per santri.
//   K3 nominal pilihan pendaftaran = PAKET bernama, tetap boleh nominal bebas per santri.
//   K4 diskon anak guru = PERSEN, penandanya MANUAL (bukan cocok-nama otomatis).
//   K5 total boleh berbeda per PASANGAN (lembaga sekolah x lembaga ngaji).
//   K6 diskon dihitung dari TOTAL, lalu dipecah proporsional ke komponen.
//
// MURNI (tanpa I/O) — supaya (a) bisa diuji unit, (b) bisa dicerminkan ke edge function Deno
// (pola `hiview-absen/shiftDerive.ts` mencerminkan `utils/shiftDerive.js`). Ada TIGA jalur
// generate + POS yang dulu masing-masing menyalin rumusnya sendiri; semuanya harus memanggil
// modul ini, jangan menyalin lagi.
//
// ⚠️ UANG RIIL sejak 1 Agu 2026. Dua invarian yang TIDAK boleh dilanggar:
//   1. Perilaku jenis NON-gabungan harus SAMA PERSIS dengan sebelum modul ini ada — karena
//      itu `nominalDasar()` & `jenisBerlakuUntuk()` mencerminkan `autoGenerate` apa adanya,
//      termasuk pencocokan lembaga yang case-SENSITIVE (lihat catatan di fungsinya).
//   2. Jumlah komponen WAJIB tepat sama dengan nominal tagihan, sampai rupiah terakhir —
//      karena itu porsi jenis target dihitung sebagai SISA, bukan dikalikan sendiri.
import { matchStatusOnly, matchJenisKelamin, matchShiftNgaji } from './statusSantri'

/** Angka > 0 saja; selain itu 0 (cermin `Number(x || 0)` di kode lama). */
function num(v) {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : 0
}
function teks(v) {
  return String(v ?? '').trim()
}
function lower(v) {
  return teks(v).toLowerCase().replace(/\s+/g, ' ')
}

/** Mode gabung per santri: 'auto' (default) | 'gabung' (paksa) | 'pisah' (kecualikan). */
export const GABUNG_MODE = ['auto', 'gabung', 'pisah']
/**
 * Syarat otomatis yang dikenali pada jenis ngaji (field `gabung_syarat`).
 *
 * DUA YANG DISARANKAN lebih dulu, dan alasannya dari data nyata (3 Agu 2026): jenis
 * tagihannya SUDAH memisah pagi/sore sendiri ("Syahriyah Qiraati Pagi" vs "...Sore"),
 * jadi shift tak perlu dicari lagi di data santri — dan memang tak bisa: `shift_ngaji`
 * hanya terisi 155 dari 524 santri aktif (30%), sementara `gedung` (100% terisi) isinya
 * nama tempat ("wetan"/"kulon"), bukan penanda waktu. Dua syarat pertama memakai field
 * yang SELALU ada: `lembaga_sekolah` (439/524) dan `is_fullday` (boolean).
 * Dua syarat terakhir = versi ketat, berguna nanti bila `shift_ngaji` sudah dilengkapi.
 */
export const GABUNG_SYARAT = [
  { key: 'punya_sekolah', label: 'Punya sekolah formal', saran: true },
  { key: 'fullday', label: 'Santri fullday', saran: true },
  // Kyai 4 Agu 2026: "syahriyah pondok itu sudah include Syahriyah Qiraati Pagi & Sore".
  //   Sebelum ini aturan itu TAK BISA dinyatakan: syarat yang ada cuma sekolah & fullday,
  //   sedangkan santri Ma'had bisa dua-duanya bukan → jenis ngaji tetap ditagih SENDIRI di
  //   samping Syahriyah Pondok, alias tertagih dua kali.
  { key: 'mahad', label: "Santri Ma'had (mukim)", saran: true },
  // Satu jenis ngaji kadang perlu menempel ke SEKOLAH untuk santri sekolah DAN ke
  //   SYAHRIYAH PONDOK untuk santri mukim. `gabung_syarat` cuma satu nilai, jadi dua
  //   kondisi berbeda mustahil dinyatakan lewat syarat. Pilihan ini menyerahkan
  //   penyaringan ke jenis TUJUAN: `gabungTargetFor` sudah menuntut
  //   `jenisBerlakuUntuk(target, santri)`, jadi "Syahriyah Pondok" (status_only Ma'had)
  //   hanya menyerap santri mukim dan "Syahriyah SDI" (lembaga_only SDI) hanya anak SDI.
  //   Kandidat PERTAMA yang berlaku yang menang — urutan `gabung_ke` = prioritasnya.
  { key: 'target', label: 'Tanpa syarat tambahan — ikut jenis tujuan' },
  { key: 'sekolah_pagi', label: 'Punya sekolah + shift ngaji pagi' },
  { key: 'fullday_sore', label: 'Fullday + shift ngaji sore' }
]

/**
 * Apakah jenis ini berlaku untuk santri ini (whitelist lembaga + status + jenis kelamin)?
 *
 * CERMIN PERSIS `autoGenerate` (PengaturanKeuanganView) — termasuk pencocokan lembaga
 * `includes()` yang **case-sensitive**. Itu memang rawan (lihat gotcha lembaga_sekolah case),
 * TAPI mengubahnya di sini akan MELEBARKAN sasaran generate dan menerbitkan tagihan yang
 * sebelumnya tak ada. Perbaikan case-insensitive = keputusan terpisah, bukan efek samping.
 */
export function jenisBerlakuUntuk(jenis, santri) {
  if (!jenis || !santri) return false
  const wl = Array.isArray(jenis.lembaga_only) ? jenis.lembaga_only.filter(Boolean) : []
  if (wl.length > 0 && !(wl.includes(santri.lembaga) || wl.includes(santri.lembaga_sekolah)))
    return false
  // Shift ngaji ikut di sini (bukan hanya di pemanggil): kalau tidak, `gabungTargetFor` bisa
  // melipat jenis ngaji yang shift-nya TAK cocok untuk santri itu — nominal ngaji masuk ke
  // tagihan sekolah padahal jenisnya tak berlaku baginya.
  return (
    matchStatusOnly(santri, jenis.status_only) &&
    matchJenisKelamin(santri, jenis.jk_only) &&
    matchShiftNgaji(santri, jenis.shift_only)
  )
}

/**
 * Nominal 4 lapis LAMA: per santri → per kelas → per lembaga → default.
 * Cermin persis urutan & fallback `autoGenerate`, termasuk mencoba sisi ngaji lalu sisi
 * sekolah pada lapis kelas/lembaga. 0 = santri tak ditagih jenis ini.
 */
export function nominalDasar(jenis, santri) {
  if (!jenis || !santri) return 0
  // 1) override bebas per santri (K3: escape hatch, tetap menang atas apa pun)
  const perSantri = num((jenis.nominal_per_santri || {})[teks(santri.id)])
  if (perSantri) return perSantri
  // 2) per kelas — sisi ngaji dulu, lalu sisi sekolah
  const perK = jenis.nominal_per_kelas || {}
  for (const [lemb, kls] of [
    [santri.lembaga, santri.kelas],
    [santri.lembaga_sekolah, santri.kelas_sekolah]
  ]) {
    if (!lemb) continue
    const v = num((perK[lemb] || {})[kls])
    if (v) return v
  }
  // 3) per lembaga
  const perL = jenis.nominal_per_lembaga || {}
  const v3 = num(perL[santri.lembaga]) || num(perL[santri.lembaga_sekolah])
  if (v3) return v3
  // 4) default (`nominal` = alias legacy yang masih dipakai pembaca settings mentah)
  return num(jenis.nominal_default) || num(jenis.nominal)
}

/**
 * Lapis PAKET (K3): santri memilih paket bernama saat pendaftaran, mis. "Peduli 250rb".
 * Cocokkan `santri.paket_syahriyah` ke `jenis.paket[]` — id ATAU label, case-insensitive
 * (nilainya bisa datang dari impor Excel yang diketik manusia).
 */
export function paketNominal(jenis, santri) {
  const pilih = lower(santri?.paket_syahriyah)
  if (!pilih) return 0
  const daftar = Array.isArray(jenis?.paket) ? jenis.paket : []
  const found = daftar.find((p) => lower(p?.id) === pilih || lower(p?.label) === pilih)
  return num(found?.nominal)
}

/**
 * Lapis TARIF KOMBINASI (K5): total per pasangan (lembaga sekolah x lembaga ngaji).
 * Dipakai HANYA saat tagihan gabungan. Pencocokan case-insensitive + mendukung baris/kolom
 * jokermu `*` — sengaja, karena tabel ini BARU (tak ada tagihan lama yang bisa bergeser),
 * dan `*` menghindari Kyai harus mengisi matriks penuh:
 *   nominal_gabungan['SDI']['PTPT'] = 225000   // paling spesifik
 *   nominal_gabungan['*']['PTPT']   = 220000   // semua sekolah + PTPT
 *   nominal_gabungan['SDI']['*']    = 210000   // SDI + ngaji apa pun
 */
export function nominalGabungan(jenisTarget, santri, lembagaNgaji) {
  const tab = jenisTarget?.nominal_gabungan
  if (!tab || typeof tab !== 'object') return 0
  const cariBaris = (key) => {
    const k = lower(key)
    if (!k) return null
    for (const [rk, rv] of Object.entries(tab)) if (lower(rk) === k) return rv || null
    return null
  }
  const cariKolom = (baris, key) => {
    if (!baris || typeof baris !== 'object') return 0
    const k = lower(key)
    if (!k) return 0
    for (const [ck, cv] of Object.entries(baris)) if (lower(ck) === k) return num(cv)
    return 0
  }
  const barisSekolah = cariBaris(santri?.lembaga_sekolah)
  const barisJoker = cariBaris('*')
  return (
    cariKolom(barisSekolah, lembagaNgaji) ||
    cariKolom(barisJoker, lembagaNgaji) ||
    cariKolom(barisSekolah, '*') ||
    cariKolom(barisJoker, '*')
  )
}

/**
 * Apakah syarat gabungan terpenuhi untuk santri ini (K2)?
 *   mode 'pisah'  → selalu tidak (pengecualian manual)
 *   mode 'gabung' → selalu ya (paksa manual, walau syarat otomatis tak terpenuhi)
 *   mode 'auto'   → dari data: sekolah_pagi / fullday_sore
 *
 * `shift_ngaji` (`pagi_sore|pagi|sore`) adalah penanda utama. Nama lembaga dipakai sebagai
 * CADANGAN karena untuk TPQ shift-nya memang ada di namanya ("TPQ Pagi"/"TPQ Sore") dan
 * banyak baris lama `shift_ngaji`-nya kosong. Kalau dua-duanya sunyi → dianggap TIDAK
 * gabung: lebih aman menerbitkan dua tagihan (bisa dikoreksi) daripada komponen ngaji
 * hilang tanpa jejak.
 */
export function syaratGabungTerpenuhi(jenisNgaji, santri) {
  const mode = lower(santri?.syahriyah_gabung) || 'auto'
  if (mode === 'pisah') return false
  if (mode === 'gabung') return true
  const shift = lower(santri?.shift_ngaji)
  const lembagaNgaji = lower(santri?.lembaga)
  const punyaSekolah = !!teks(santri?.lembaga_sekolah)
  const fullday = santri?.is_fullday === true
  const mukim = santri?.is_mukim === true
  // Default 'punya_sekolah': jenisnya sendiri sudah menyatakan pagi/sore, jadi yang perlu
  // diperiksa di santri cuma "apakah dia punya sekolah". Untuk jenis SORE -> Fullday, Kyai
  // WAJIB memilih 'fullday' (UI F2 menjadikannya pilihan wajib).
  switch (teks(jenisNgaji?.gabung_syarat) || 'punya_sekolah') {
    case 'fullday':
      return fullday
    // Kyai: syahriyah pondok sudah termasuk ngaji pagi & sore untuk santri mukim.
    case 'mahad':
      return mukim
    // Penyaringan diserahkan ke jenis tujuan (lihat catatan di GABUNG_SYARAT).
    case 'target':
      return true
    case 'fullday_sore':
      return fullday && (shift.includes('sore') || lembagaNgaji.includes('sore'))
    case 'sekolah_pagi':
      return punyaSekolah && (shift.includes('pagi') || lembagaNgaji.includes('pagi'))
    default:
      return punyaSekolah
  }
}

/**
 * Jenis TARGET tempat `jenis` menempel untuk santri ini, atau null bila ia berdiri sendiri.
 *
 * Menempel hanya bila SEMUA benar: (a) `gabung_ke` menunjuk jenis yang ada, (b) syarat
 * gabungan terpenuhi, (c) jenis target itu MEMANG berlaku untuk santri ini dan nominalnya
 * > 0. Syarat (c) krusial: kalau target tak berlaku (mis. `status_only` mengecualikannya),
 * komponen ngaji akan HILANG TOTAL — santri tak ditagih ngaji sama sekali. Lebih baik
 * jatuh kembali ke tagihan ngaji tersendiri.
 */
export function gabungTargetFor(jenis, santri, jenisList) {
  // `gabung_ke` boleh BEBERAPA kandidat — satu jenis ngaji perlu menempel ke "Syahriyah
  // Sekolah SD" ATAU "TK" ATAU "PKBM" ATAU "Kelas Baca", tergantung sekolah si santri
  // (empat jenis itu memang ada di data nyata). Kandidat pertama yang BERLAKU untuk santri
  // ini yang dipakai — jadi Kyai cukup menyunting satu jenis, bukan empat.
  const kandidat = Array.isArray(jenis?.gabung_ke)
    ? jenis.gabung_ke.map(teks).filter(Boolean)
    : teks(jenis?.gabung_ke)
      ? [teks(jenis.gabung_ke)]
      : []
  if (!kandidat.length) return null
  // Jenis SUMBER harus berlaku untuk santri ini dulu. Tanpa cek ini, jenis yang whitelist-nya
  // TIDAK memuat si santri (mis. "Qiraati Pagi" ber-whitelist TPQ Pagi, santrinya PTPT) tetap
  // dihitung sebagai komponen — porsi sekolah diam-diam dialihkan ke lembaga ngaji yang
  // seharusnya tak menerima apa pun. Ditemukan oleh tes skenario nyata.
  if (!jenisBerlakuUntuk(jenis, santri)) return null
  if (!syaratGabungTerpenuhi(jenis, santri)) return null
  const daftar = Array.isArray(jenisList) ? jenisList : []
  for (const ke of kandidat) {
    const target = daftar.find((j) => teks(j?.id) === ke || lower(j?.label) === lower(ke))
    if (!target || teks(target.id) === teks(jenis.id)) continue // jangan menempel ke diri sendiri
    if (!jenisBerlakuUntuk(target, santri)) continue
    if (!nominalDasar(target, santri) && !nominalGabungan(target, santri, santri?.lembaga)) continue
    return target
  }
  return null
}

/** Persen diskon yang berlaku (K4): hanya untuk santri bertanda `anak_guru`. */
export function diskonPersen(jenisTarget, santri) {
  if (santri?.anak_guru !== true) return 0
  const p = Number(jenisTarget?.diskon_anak_guru)
  if (!Number.isFinite(p) || p <= 0) return 0
  return Math.min(100, p)
}

/**
 * Hitung SATU tagihan untuk (jenis, santri). Ini fungsi yang dipakai semua pemanggil.
 *
 * @returns {null | {
 *   nominal: number,            // yang ditagih (sesudah diskon) — pakai ini untuk baris tagihan
 *   nominal_bruto: number,      // sebelum diskon
 *   diskon_persen: number,
 *   diskon_nominal: number,
 *   gabungan: boolean,
 *   komponen: Array<{jenis_id, label, nominal, pos}>  // KOSONG bila tak ada pemecahan
 * }}
 * null = santri tidak ditagih jenis ini (tak berlaku, nominal 0, atau menempel ke jenis lain).
 *
 * `komponen` sengaja KOSONG untuk tagihan biasa supaya jalur lama (1 baris Buku Induk)
 * tak berubah sedikit pun. Terisi hanya saat ada yang menempel — di situ pemanggil WAJIB
 * menulis satu baris Buku Induk per komponen (K1).
 */
export function hitungTagihan(jenis, santri, jenisList) {
  if (!jenisBerlakuUntuk(jenis, santri)) return null
  if (gabungTargetFor(jenis, santri, jenisList)) return null // ia jadi komponen jenis lain

  // Siapa saja yang menempel ke jenis ini untuk santri ini?
  const daftar = Array.isArray(jenisList) ? jenisList : []
  const nempel = daftar.filter((j) => {
    const t = gabungTargetFor(j, santri, jenisList)
    return t && teks(t.id) === teks(jenis.id)
  })

  // TOTAL bruto: tarif kombinasi hanya berlaku saat memang ada yang menempel (K5).
  let bruto = num((jenis.nominal_per_santri || {})[teks(santri.id)]) || paketNominal(jenis, santri)
  if (!bruto && nempel.length) bruto = nominalGabungan(jenis, santri, santri?.lembaga)
  if (!bruto) bruto = nominalDasar(jenis, santri)
  if (bruto <= 0) return null

  // Diskon dihitung dari TOTAL (K6), lalu dipecah proporsional di bawah.
  const persen = diskonPersen(jenis, santri)
  const neto = persen ? Math.round((bruto * (100 - persen)) / 100) : bruto

  const hasil = {
    nominal: neto,
    nominal_bruto: bruto,
    diskon_persen: persen,
    diskon_nominal: bruto - neto,
    gabungan: nempel.length > 0,
    komponen: []
  }
  if (!nempel.length) return hasil

  // Pecah: tiap yang menempel dapat porsi proporsional; jenis target dapat SISA.
  // Porsi target = SISA (bukan dihitung ulang) supaya jumlahnya SELALU tepat = `neto`.
  let sisa = neto
  const bagian = []
  for (const j of nempel) {
    const kBruto = Math.min(num(nominalDasar(j, santri)), bruto) // clamp: komponen tak boleh > total
    const kNeto = Math.max(0, Math.min(sisa, Math.round((kBruto * neto) / bruto)))
    sisa -= kNeto
    bagian.push({ jenis_id: teks(j.id), label: teks(j.label), nominal: kNeto, pos: teks(j.pos) })
  }
  hasil.komponen = [
    { jenis_id: teks(jenis.id), label: teks(jenis.label), nominal: sisa, pos: teks(jenis.pos) },
    ...bagian
  ]
  return hasil
}

/**
 * Pecah `jumlah` mengikuti proporsi `komponen` — dipakai saat uang yang BENAR-BENAR diterima
 * di POS berbeda dari nominal tagihan (bayar sebagian, atau tagihan sudah dibayar separuh).
 *
 * Entri PERTAMA (porsi jenis target) menerima SISA, persis seperti `hitungTagihan`, supaya
 * jumlah baris Buku Induk SELALU tepat sama dengan uang yang diterima sampai rupiah terakhir.
 * ⚠️ Jangan diganti menjadi `Math.round()` untuk semua entri — pembulatan bisa membuat kas
 * melenceng beberapa rupiah tiap transaksi, dan ini uang riil sejak 1 Agu 2026.
 *
 * @returns Array komponen dengan `nominal` terskala; `[]` = tak perlu dipecah (pemanggil
 *          menulis satu baris seperti jalur lama).
 */
export function pecahProporsional(komponen, jumlah) {
  const daftar = Array.isArray(komponen) ? komponen.filter(Boolean) : []
  const total = Math.round(Number(jumlah) || 0)
  if (daftar.length < 2 || total <= 0) return []
  const dasar = daftar.reduce((s, k) => s + num(k.nominal), 0)
  if (dasar <= 0) return []
  const out = daftar.map((k) => ({ ...k, nominal: 0 }))
  let sisa = total
  for (let i = 1; i < out.length; i++) {
    const v = Math.max(0, Math.min(sisa, Math.round((num(daftar[i].nominal) * total) / dasar)))
    out[i].nominal = v
    sisa -= v
  }
  out[0].nominal = sisa
  return out
}

/**
 * Daftar id jenis yang HARUS DILEWATI saat generate untuk santri ini (karena menempel ke
 * jenis lain). Disediakan terpisah supaya pemanggil bisa menyaring lebih dulu tanpa
 * menghitung nominal dua kali.
 */
export function jenisTergabung(jenisList, santri) {
  const out = new Set()
  for (const j of Array.isArray(jenisList) ? jenisList : []) {
    if (gabungTargetFor(j, santri, jenisList)) out.add(teks(j.id))
  }
  return out
}
