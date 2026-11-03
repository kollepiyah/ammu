// v.100: Scope guru terpusat — sumber tunggal untuk membedakan "guru Qiraati" vs "guru Sekolah".
//   Dipakai NaikKelasView (kenaikan), RekapPrestasiView (rekap), SantriView (data santri).
//   Deteksi berbasis ASSIGNMENT santri (paling andal, konsisten dgn scoping nama-match yang ada):
//     - Qiraati  : guru muncul sbg guru_pagi / guru_sore / guru (ngaji) di santri.
//     - Sekolah  : guru muncul di guru_sekolah[] (wali kelas sekolah) di santri.
//   Tipe guru (kyai): 1) Qiraati+Sekolah, 2) Qiraati saja, 3) Sekolah saja.
import { LEMBAGA_GROUPS, getLembagaGroup, getLembagaBroadGroup } from '@/composables/useLembaga'

// v.1.4.8: spasi ganda dirapatkan — "Siti  Aminah" (ketikan/impor) harus cocok dengan
//   "Siti Aminah" di sesi. Tanpa ini santri hilang dari akun gurunya tanpa sebab yang terlihat.
function _lower(v) {
  return String(v || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

// v.1.2.3 — Apakah jabatan orang ini KEPALA/PJ/PENGASUH dari lembaga `lembagaName`?
//   Diperiksa dari NAMA lembaga yang DISEBUT jabatan/jabatan_tambahan ("Kepala SDI" →
//   SDI). BEDA dari isPjLembaga (glondongan.js) yang MENGGERBANG field `lembaga` orang =
//   lembaga yang ditanya: gerbang itu benar utk lembaga NGAJI, tapi salah utk kepala
//   SEKOLAH — sebab field `lembaga` kepala sekolah = lembaga NGAJI-nya (tempat ia
//   mengajar), sedang sekolah yang dipimpinnya ada di `lembaga_sekolah`. Jadi Kepala SDI
//   yang juga guru ngaji PTPT: headsLembaga(dia,'SDI')=true, headsLembaga(dia,'PTPT')=false.
export function headsLembaga(sesi, lembagaName) {
  if (!lembagaName) return false
  for (const j of [sesi?.jabatan, sesi?.jabatan_tambahan]) {
    const m = _lower(j).match(/^(kepala|pj|pengasuh)\s+(.+)$/)
    if (m && _naungi(m[2], lembagaName)) return true
  }
  return false
}

// v.1.4.8: nama kanonik (huruf besar-kecil seperti di LEMBAGA_GROUPS) dari nama apa pun.
function _kanon(nama) {
  const low = _lower(nama)
  for (const [kel, info] of Object.entries(LEMBAGA_GROUPS)) {
    if (_lower(kel) === low) return kel
    for (const v of info.variants) if (_lower(v) === low) return v
  }
  return String(nama || '').trim()
}

/**
 * v.1.4.8 — Lembaga yang disebut jabatan (`dipimpin`, mis. "tpq") menaungi `target`?
 *
 * BUG yang ditutup: headsLembaga mengecilkan nama dari jabatan ("Kepala TPQ" → "tpq") lalu
 * menyerahkannya ke lembagaScopeMatches, yang mencari keluarga lembaga dengan kunci PEKA
 * huruf besar. "tpq" tak dikenali, jadi Kepala TPQ tak pernah dianggap memimpin TPQ Pagi /
 * TPQ Sore / Pra PTPT — yang cocok hanya jabatan yang kebetulan sama persis dengan nama
 * lembaga santrinya ("Kepala SDI" ↔ SDI).
 *
 * Bukan sekadar menormalkan lalu memanggil lembagaScopeMatches: di sana kunci KELUARGA
 * ("TPQ") dibaca sebagai label luas Qiraati, sehingga Kepala TPQ akan ikut memimpin PTPT &
 * PPPH. Di sini keluarga hanya menaungi anggotanya; label luas (Qiraati/Sekolah) tetap luas.
 */
function _naungi(dipimpin, target) {
  const a = _kanon(dipimpin)
  const t = _kanon(target)
  if (!a || !t) return false
  if (_lower(a) === _lower(t)) return true
  const kelTarget = getLembagaGroup(t)
  if (LEMBAGA_GROUPS[a]) return kelTarget === a // kunci keluarga, mis. "TPQ"
  const kelA = getLembagaGroup(a)
  if (kelA) return kelTarget === kelA // varian → se-keluarga
  const luas = getLembagaBroadGroup(a) // label luas, mis. "Qiraati"
  return !!luas && getLembagaBroadGroup(t) === luas
}

// Santri ini diampu guru `nama` sebagai guru NGAJI (Qiraati)?
// v.1.4.8: field lama `guru` hanya berlaku bila guru_pagi & guru_sore KOSONG — aturan yang
//   sama dengan kelasHitung (legacy → pagi) dan Data Santri. Field itu tak selalu ikut
//   dikosongkan saat santri pindah guru (impor/penugasan kelas hanya menulis yang terisi),
//   jadi dulu guru LAMA tetap melihat santri yang sudah pindah di Rapor & Absensi.
export function ownsNgaji(s, nama) {
  const gn = _lower(nama)
  if (!gn || !s) return false
  const gp = _lower(s.guru_pagi)
  const gs = _lower(s.guru_sore)
  if (gp || gs) return gp === gn || gs === gn
  return _lower(s.guru) === gn
}

// Santri ini diampu guru `nama` sebagai WALI KELAS SEKOLAH?
export function ownsSekolah(s, nama) {
  const gn = _lower(nama)
  if (!gn || !s) return false
  const arr = Array.isArray(s.guru_sekolah)
    ? s.guru_sekolah
    : s.guru_sekolah
      ? [s.guru_sekolah]
      : []
  return arr.some((g) => _lower(g) === gn)
}

/**
 * v.1.2.8 — Scope layar QIRAATI (rekap prestasi & sejenisnya) untuk satu sesi.
 * Return { adminPenuh, kepala, lihat(santri), edit(santri) }.
 *
 * BUG yang ditutup (Kyai, 5 Agu 2026): akun "Kepala SDI" yang juga guru ngaji PTPT
 * melihat SELURUH santri SDI di rekap prestasi PTPT — mestinya cuma kelas ampuannya.
 * Dua sebab bertumpuk di RekapPrestasiView:
 *   1) isFullFilterRole() menganggap SETIAP kepala sebagai admin-penuh, sehingga
 *      penyaring "santri ampuan" (ownsNgaji/ownsSekolah) tak pernah dijalankan;
 *   2) penyaring kepala memakai `sesi.lembaga`, yaitu lembaga tempat ia MENGAJAR
 *      ngaji — bukan lembaga yang ia PIMPIN. Untuk kepala sekolah keduanya beda:
 *      yang dipimpin ada di jabatan ("Kepala SDI"), lihat headsLembaga.
 *
 * Sisi yang benar di layar qiraati: kewenangan PENUH hanya milik kepala lembaga
 * NGAJI-nya (headsLembaga vs santri.lembaga). Kepala SEKOLAH tetap boleh MELIHAT
 * santri kelas sekolahnya (read-only, fitur v.100b) tapi tak berkuasa atas nilai
 * qiraati — wilayahnya di Rekap Diniyah.
 *
 * admin_keuangan SENGAJA tidak dihitung admin penuh: rekap akademik bukan
 * wilayahnya, dan ia tak punya santri ampuan sehingga daftarnya kosong.
 */
export function scopeQiraati(sesi, opts = {}) {
  const nama = sesi?.guru || sesi?.nama || ''
  const adminPenuh =
    !!sesi && (sesi.id === 'admin' || ['super_admin', 'admin'].includes(sesi.role_sistem))
  const jab = `${_lower(sesi?.jabatan)} ${_lower(sesi?.jabatan_tambahan)}`
  const kepala = !adminPenuh && /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(jab)
  // v.1.4.8: PJ PTPT hanya santri yang PJ efektifnya dia (opts.pjSantri, lihat scopeSantri).
  //   Tanpa opts perilaku lama (seluruh PTPT) — pemanggil yang daftarnya sudah ter-scope
  //   useSantri (santriBisaDiajukanTes) tak perlu memberinya.
  const batasPj = typeof opts.pjSantri === 'function' && !adminPenuh && isPjPtptJabatan(sesi)
  const namaN = _lower(nama)
  const pimpinNgaji = (s) => {
    if (!headsLembaga(sesi, s?.lembaga)) return false
    if (batasPj && _lower(s?.lembaga) === 'ptpt')
      return !!namaN && _lower(opts.pjSantri(s)) === namaN
    return true
  }
  return {
    adminPenuh,
    kepala,
    lihat(s) {
      if (adminPenuh) return true
      if (kepala && pimpinNgaji(s)) return true
      return ownsNgaji(s, nama) || ownsSekolah(s, nama)
    },
    edit(s) {
      if (adminPenuh) return true
      if (kepala && pimpinNgaji(s)) return true
      return ownsNgaji(s, nama)
    }
  }
}

/**
 * v.1.4.8 — Jabatannya PERSIS "PJ PTPT" / "Kepala PTPT" (jabatan atau jabatan tambahan)?
 *
 * Sengaja TANPA gerbang field `lembaga` milik isPjLembaga (glondongan.js). Di sini predikat
 * ini MEMBATASI (PJ hanya melihat santri ampuannya), bukan memberi hak. Dengan gerbang itu,
 * PJ yang field lembaganya bukan "PTPT" (mis. ia mengajar di Pra PTPT) lolos dari
 * pembatasan lalu — lewat headsLembaga yang cukup membaca jabatan — melihat SELURUH santri
 * PTPT. Gelar luas seperti "Kepala Qiraati" tidak termasuk: ia memang membawahi semua PTPT.
 */
export function isPjPtptJabatan(sesi) {
  for (const j of [sesi?.jabatan, sesi?.jabatan_tambahan]) {
    if (/^(kepala|pj) ptpt$/.test(_lower(j))) return true
  }
  return false
}

/**
 * v.1.4.8 — Scope SANTRI satu sesi, dipisah per SISI. Sumber tunggal untuk Data Santri,
 * Rapor, Absensi Santri, dan antrian Tes Kenaikan.
 *
 * Keluhan Kyai (3 Nov 2026) yang ditutup:
 *   - "Di akun PJ masih tampil semua santri PTPT, harusnya santrinya sendiri sesuai PJ."
 *     Rapor & Absensi menyaring kepala dengan `sesi.lembaga` (lembaga tempat ia MENGAJAR)
 *     se-lembaga penuh, tanpa mengenal pembagian santri per PJ; Data Santri mengenalnya
 *     tapi jatuh ke "semua PTPT" begitu ampuan PJ itu terhitung 0.
 *   - "Di akun kepala sekolah yg juga guru ngaji masih campur antara santri kelasnya dan
 *     santri lembaga naungannya." Rapor & Absensi menurunkan scope kepala dari
 *     `sesi.lembaga` — untuk kepala SEKOLAH itu lembaga ngajinya — sehingga Kepala SDI yang
 *     mengajar PTPT melihat SELURUH PTPT, dan SDI-nya sendiri justru kosong.
 *
 * Aturan:
 *   qiraati(s): ia guru ngaji santri ini, ATAU jabatannya memimpin lembaga ngaji santri ini
 *               (headsLembaga). Khusus PTPT: PJ PTPT hanya santri yang PJ efektifnya = dia.
 *   sekolah(s): ia wali kelas sekolah santri ini, ATAU jabatannya memimpin sekolahnya.
 *   Admin penuh (super_admin / admin) melihat semua; admin_keuangan TIDAK (ia discope
 *   seperti guru di menu pendidikan sejak v.1.2.6).
 *
 * @param {object} sesi auth.sesiAktif
 * @param {{pjSantri?: (s:object)=>string}} [opts] nama PJ efektif santri PTPT — dari
 *   buatPetaPjSantri (guru pengajar → PJ; cadangan label `pj_ptpt`). Tanpa opts: label saja.
 */
export function scopeSantri(sesi, opts = {}) {
  const nama = sesi?.guru || sesi?.nama || ''
  const namaN = _lower(nama)
  const adminPenuh =
    !!sesi &&
    sesi.role_sistem !== 'admin_keuangan' &&
    (sesi.id === 'admin' ||
      sesi.role === 'admin' ||
      ['super_admin', 'admin'].includes(sesi.role_sistem))
  const pjPtpt = !adminPenuh && isPjPtptJabatan(sesi)
  const pjDari = typeof opts.pjSantri === 'function' ? opts.pjSantri : (s) => s?.pj_ptpt
  const pimpinNgaji = (s) => {
    if (!headsLembaga(sesi, s?.lembaga)) return false
    if (pjPtpt && _lower(s?.lembaga) === 'ptpt') return !!namaN && _lower(pjDari(s)) === namaN
    return true
  }
  const qiraati = (s) => !!s && (adminPenuh || ownsNgaji(s, nama) || pimpinNgaji(s))
  const sekolah = (s) =>
    !!s && (adminPenuh || ownsSekolah(s, nama) || headsLembaga(sesi, s.lembaga_sekolah))
  return { adminPenuh, pjPtpt, qiraati, sekolah, lihat: (s) => qiraati(s) || sekolah(s) }
}

// Tipe guru dari daftar santri: { qiraati:bool, sekolah:bool }. dual = keduanya true.
export function deteksiTipeGuru(santriList, nama) {
  const gn = _lower(nama)
  let qiraati = false,
    sekolah = false
  if (!gn) return { qiraati, sekolah }
  for (const s of santriList || []) {
    if (!qiraati && ownsNgaji(s, gn)) qiraati = true
    if (!sekolah && ownsSekolah(s, gn)) sekolah = true
    if (qiraati && sekolah) break
  }
  return { qiraati, sekolah }
}

/**
 * v.1.2.0 — Guru masih AKTIF? Sumber tunggal penyaring status guru.
 *
 * Nilai `status` yang benar-benar tersimpan hanya dua ragam:
 *   'Aktif' (form guru) / 'aktif' (impor Excel)  -> aktif
 *   'Tidak Aktif'                                -> nonaktif
 * Kosong/undefined dianggap AKTIF (data lama sebelum kolom status ada).
 *
 * DUA BUG yang lahir dari tak adanya sumber tunggal ini (Kyai 22 Jul 2026,
 * "nama guru data lama selalu muncul di dropdown pilih guru pengajar"):
 *   1. NaikKelasView.guruOptions & TesKenaikanView.guruOptionsFor menyaring
 *      LEMBAGA saja, status tak dicek sama sekali.
 *   2. CeremonialView memakai `status !== 'Non-Aktif'` — string itu TAK PERNAH
 *      ditulis siapa pun, jadi penyaringnya tak pernah membuang apa-apa.
 * Perbandingan WAJIB case-insensitive: form menulis 'Aktif', impor menulis 'aktif'.
 */
export function isGuruAktif(g) {
  return _lower(g?.status || 'Aktif') === 'aktif'
}

/** Saring daftar guru ke yang aktif saja. */
export function guruAktifSaja(list) {
  return (list || []).filter(isGuruAktif)
}

/**
 * v.1.2.0 — Santri ini SUDAH punya guru untuk kategori tsb?
 *   'ngaji'   : guru_pagi / guru_sore / guru (field lama pra-pasangan)
 *   'sekolah' : guru_sekolah[] terisi
 *
 * Dipakai layar Assign Guru Kelas untuk menyembunyikan santri yang sudah terurus
 * (Kyai 22 Jul 2026). Pengecekan WAJIB per-kategori: kalau dicampur, santri yang
 * punya guru ngaji tak akan pernah bisa di-assign guru sekolah — dan karena hampir
 * semua santri punya guru ngaji, daftar sekolah akan kosong melompong.
 */
export function punyaGuruKategori(s, kategori) {
  if (kategori === 'sekolah') {
    const gs = Array.isArray(s?.guru_sekolah)
      ? s.guru_sekolah
      : s?.guru_sekolah
        ? [s.guru_sekolah]
        : []
    return gs.some((x) => _lower(x))
  }
  return !!(_lower(s?.guru_pagi) || _lower(s?.guru_sore) || _lower(s?.guru))
}
