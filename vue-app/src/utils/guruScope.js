// v.100: Scope guru terpusat — sumber tunggal untuk membedakan "guru Qiraati" vs "guru Sekolah".
//   Dipakai NaikKelasView (kenaikan), RekapPrestasiView (rekap), SantriView (data santri).
//   Deteksi berbasis ASSIGNMENT santri (paling andal, konsisten dgn scoping nama-match yang ada):
//     - Qiraati  : guru muncul sbg guru_pagi / guru_sore / guru (ngaji) di santri.
//     - Sekolah  : guru muncul di guru_sekolah[] (wali kelas sekolah) di santri.
//   Tipe guru (kyai): 1) Qiraati+Sekolah, 2) Qiraati saja, 3) Sekolah saja.
import { lembagaScopeMatches } from '@/composables/useLembaga'

function _lower(v) {
  return String(v || '')
    .toLowerCase()
    .trim()
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
    if (m && lembagaScopeMatches(m[2], lembagaName)) return true
  }
  return false
}

// Santri ini diampu guru `nama` sebagai guru NGAJI (Qiraati)?
export function ownsNgaji(s, nama) {
  const gn = _lower(nama)
  if (!gn || !s) return false
  return _lower(s.guru_pagi) === gn || _lower(s.guru_sore) === gn || _lower(s.guru) === gn
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
export function scopeQiraati(sesi) {
  const nama = sesi?.guru || sesi?.nama || ''
  const adminPenuh =
    !!sesi && (sesi.id === 'admin' || ['super_admin', 'admin'].includes(sesi.role_sistem))
  const jab = `${_lower(sesi?.jabatan)} ${_lower(sesi?.jabatan_tambahan)}`
  const kepala = !adminPenuh && /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(jab)
  const pimpinNgaji = (s) => headsLembaga(sesi, s?.lembaga)
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
