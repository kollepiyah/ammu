// bucketStorage.js — rute "prefix path → bucket Supabase", sebagai fungsi PURE
// yang bisa ditest. Sebelum v.1.4.2 aturan ini hidup sebagai `_bucketFor` privat
// di services/storage.js, tak terjangkau tes — dan di situlah ia menyimpang diam-diam
// (lihat catatan izin_lampiran di bawah).
//
// Hanya ada TIGA bucket (dibuat manual di Dashboard Supabase, lihat
// services/supabaseStorage.js), dan yang membedakannya bukan cuma nama folder
// melainkan SIAPA YANG BOLEH MENULIS — ditegakkan RLS di storage.objects
// (supabase/migrations/20260622092000_storage_policies.sql):
//
//   photo    · tulis: authenticated  → foto profil, tanda tangan, gambar post
//   psb      · tulis: authenticated  → dokumen (PDF/foto) pendaftaran & unggahan pengguna
//   branding · tulis: auth_can_manage() = super_admin/admin SAJA → logo, kop, bg rapor
//
// `branding` adalah DEFAULT-nya, dan itu jebakan: sebuah prefix baru yang lupa
// didaftarkan otomatis mendarat di rak yang hanya admin boleh menulis.

// Bucket yang INSERT-nya dibatasi auth_can_manage() (super_admin/admin). Dipakai
// tes cermin untuk memastikan tak ada prefix milik pengguna biasa yang tersesat
// ke sini; nilainya dibandingkan langsung dengan migrasi storage policy.
export const BUCKET_TULIS_ADMIN = Object.freeze(['branding'])

/**
 * Tentukan bucket dari prefix path unggahan.
 * @param {string} path path relatif di dalam bucket, mis. `profil_foto/guru_7_123.jpg`
 * @returns {'photo'|'psb'|'branding'}
 */
export function bucketUntukPath(path) {
  const p = String(path || '')
  if (/^(profil_foto|tanda_tangan|beranda_post|posts?|foto)\b/.test(p)) return 'photo'
  // `izin_lampiran` DITAMBAHKAN v.1.4.2 — sebelumnya ia tak cocok baris mana pun
  // sehingga jatuh ke default `branding` yang admin-only. Akibatnya: setiap guru
  // atau pegawai yang melampirkan surat dokter pada pengajuan Izin/Sakit/Cuti
  // ditolak RLS, dengan pesan yang justru menyesatkan — storage-api membalas
  // "new row violates row-level security policy", persis bunyi penolakan tabel,
  // sehingga terbaca seolah pengajuannya yang bermasalah. (Gotcha ini sudah
  // ditulis di kepala 20260622092000_storage_policies.sql; kami tetap terpeleset.)
  // Rumahnya `psb` karena itulah bucket DOKUMEN: satu-satunya yang sudah terbukti
  // menerima PDF dari pengguna biasa (`pembayaran_transfer/*.pdf` bukti transfer
  // wali, `lembaga/<id>/*.pdf`), sedangkan `photo` hanya pernah menerima gambar.
  // Lampiran LAMA tetap terbaca: yang tersimpan di baris izin adalah URL penuh,
  // dan `branding` boleh DIBACA semua akun yang login — jadi tak ada migrasi file.
  if (/^(pembayaran_transfer|psb|lembaga\/|dokumen|izin_lampiran)\b/.test(p)) return 'psb'
  return 'branding'
}
