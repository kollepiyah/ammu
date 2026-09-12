// pesanGalatDb.js — terjemahkan galat Supabase/PostgREST menjadi kalimat yang
// berguna bagi penggunanya, bukan bagi Postgres.
//
// SEBABNYA (12 Sep 2026): seorang guru melaporkan "izin di aplikasi selalu gagal"
// disertai tangkapan layar bertuliskan
//
//     Gagal: new row violates row-level security policy for table "izin_guru"
//
// Kalimat itu benar secara teknis dan tak berguna secara manusia: bagi guru ia
// terbaca seperti aplikasi rusak, jadi yang sampai ke Kyai hanyalah "gagal" —
// tanpa petunjuk bahwa sebabnya PERAN AKUN, yang cuma admin bisa perbaiki.
// Kelas kebutaan ini sudah dicatat 23 Jul 2026 di
// 20260723130000_absensi_shift_guru_staff_write.sql: _"Yang menipu: penolakan RLS
// muncul sebagai galat generik, bukan 'akses ditolak', sehingga terbaca sebagai
// 'sinkron gagal' dan bukan sebagai soal perizinan."_ Dua kali tertipu oleh pesan
// yang sama sudah cukup.
//
// PURE: tak menyentuh store, toast, maupun jaringan — hanya (galat, konteks) →
// string. Tesnya di tests/unit/pesanGalatDb.test.js.

// Nama tabel di dalam pesan Postgres: ... policy for table "izin_guru"
const RE_TABEL_RLS = /row-level security policy(?: for table)?\s*"?([a-zA-Z0-9_.]+)"?/
// Storage-api memakai kalimat yang SAMA tanpa nama tabel, jadi deteksinya terpisah.
const RE_RLS = /row-level security/i
const RE_JARINGAN = /failed to fetch|networkerror|network request failed|load failed|err_internet/i
const RE_SESI = /jwt|token is expired|invalid claim|not authenticated/i

/** Ambil pesan mentah dari bentuk galat apa pun (Error, objek PostgREST, string). */
function _mentah(err) {
  if (!err) return ''
  if (typeof err === 'string') return err
  return String(err.message || err.error_description || err.error || err.details || '')
}

/** Kode galat: PostgREST/Postgres (`code`) atau storage-api (`statusCode`). */
function _kode(err) {
  if (!err || typeof err === 'string') return ''
  return String(err.code || err.statusCode || '')
}

/**
 * Terjemahkan galat penyimpanan ke kalimat Indonesia yang bisa ditindaklanjuti.
 *
 * @param {unknown} err galat dari services/db.js, storage.js, atau supabase-js
 * @param {{aksi?: string, peran?: string}} opts
 *   `aksi`  — frasa kerja untuk melengkapi kalimat, mis. "mengirim pengajuan izin".
 *   `peran` — `role_sistem` sesi yang login; ikut disebut pada galat RLS supaya
 *             satu tangkapan layar cukup untuk mendiagnosis, tanpa membuka DB.
 * @returns {string} kalimat siap tampil di toast (tanpa awalan "Gagal:").
 */
export function pesanGalatDb(err, opts = {}) {
  const aksi = String(opts.aksi || '').trim() || 'menyimpan data'
  const peran = String(opts.peran || '').trim()
  const pesan = _mentah(err)
  const kode = _kode(err)

  // --- Ditolak RLS: soal HAK, bukan soal isian. Ini yang paling sering salah baca.
  if (kode === '42501' || RE_RLS.test(pesan)) {
    // Trigger penjaga milik kita sendiri (`raise exception 'forbidden: …'`) memakai
    // errcode yang sama, tapi kalimatnya SUDAH berbahasa Indonesia dan menjelaskan
    // batasnya — bukan cuma menolak. Pakai apa adanya, jangan ditimpa kalimat umum.
    const sendiri = pesan.match(/forbidden:\s*(.+)$/i)
    if (sendiri) return `Akses ditolak — ${sendiri[1].trim()}`
    const tabel = (pesan.match(RE_TABEL_RLS) || [])[1] || ''
    const sebutPeran = peran ? ` Peran akun Anda: ${peran}.` : ''
    const sebutTabel = tabel ? ` [${tabel}]` : ''
    return (
      `Akses ditolak — akun Anda belum diizinkan ${aksi}.` +
      `${sebutPeran} Tunjukkan pesan ini ke admin.${sebutTabel}`
    )
  }

  // --- Sesi kedaluwarsa: pengguna bisa menyelesaikannya sendiri.
  if (kode === '401' || RE_SESI.test(pesan)) {
    return `Sesi login sudah kedaluwarsa. Keluar lalu masuk lagi, kemudian ulangi ${aksi}.`
  }

  // --- Jaringan: jangan menyuruh menghubungi admin untuk sinyal yang putus.
  if (RE_JARINGAN.test(pesan)) {
    return `Gagal ${aksi} — sambungan ke server terputus. Periksa internet lalu coba lagi.`
  }

  // --- Bentrok kunci unik (klik ganda / id yang sama dikirim dua kali).
  if (kode === '23505') {
    return `Data ini sepertinya sudah terkirim sebelumnya. Muat ulang halaman dan periksa dulu sebelum mengulang ${aksi}.`
  }

  // --- Sisanya: apa adanya. Menyembunyikan yang tak dikenali = membuat Kyai buta.
  return `Gagal ${aksi}: ${pesan || 'penyebabnya tak terbaca.'}`
}
