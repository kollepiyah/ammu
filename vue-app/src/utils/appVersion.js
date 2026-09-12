// appVersion.js — SATU sumber nomor versi untuk seluruh layar.
//
// KELUHAN Kyai, 12 Sep 2026: _"halaman data santri dan halaman lain banyak yg masih
// tertulis versi lama"_ — dan memang: kaki daftar Data Santri masih berbunyi
// **v.74.0526**, nomor dari Mei 2026, empat bulan tertinggal.
//
// SEBABNYA bukan seseorang lupa sekali, melainkan bentuknya: nomor versi diketik
// sebagai TEKS di dalam berkas .vue, tersebar di enam layar, dan satu-satunya yang
// menyamakannya adalah ritual manual "naikkan 12 titik versi" saat rilis. Layar yang
// tak masuk daftar ritual itu — Data Santri salah satunya — membeku selamanya di
// nomor saat ia ditulis. Ritual yang mengandalkan ingatan pasti bocor.
//
// `__APP_VERSION__` sudah ada sejak v.1.2.9: Vite menyuntiknya dari
// `vue-app/package.json` saat build (lihat `define` di vue-app/vite.config.js), tapi
// baru LoginView yang memakainya. Berkas ini menjadikannya satu-satunya jalan, sehingga
// menaikkan versi cukup di package.json — layar ikut sendiri, tak bisa ketinggalan.
//
// PRESEDEN `settings.appVersion`: nilai dari basis data (disetel super admin di
// Pengaturan) SENGAJA tetap menang bila diisi — itu jalan darurat kalau Kyai perlu
// menampilkan label lain tanpa rilis ulang. Yang berubah cuma CADANGANNYA: dulu teks
// mati yang bisa basi, kini nomor build yang sedang berjalan.

// `typeof` sengaja dipakai: di vitest berkas ini diimpor tanpa `define` dari Vite,
// jadi __APP_VERSION__ memang tak terdefinisi di sana (dan `typeof` pada pengenal
// yang belum dideklarasikan aman, tidak melempar ReferenceError).
const _mentah = typeof __APP_VERSION__ === 'string' ? __APP_VERSION__ : ''

/** Versi build TANPA awalan, mis. `1.4.2`. Kosong bila tak disuntik (tes/SSR). */
export const APP_VERSION_RAW = _mentah

/** Versi siap tampil, mis. `v.1.4.2`. Kosong bila tak disuntik — pemanggil boleh
 *  menyembunyikan labelnya dengan `v-if` daripada memajang "v." yang menggantung. */
export const APP_VERSION = _mentah ? `v.${_mentah}` : ''

/**
 * Label versi untuk ditampilkan, dengan `settings.appVersion` sebagai penimpa.
 * @param {object} settings isi `settingsStore.settings` (boleh null).
 * @returns {string} mis. `v.1.4.2`
 */
export function labelVersi(settings) {
  const dariDb = String(settings?.appVersion || '').trim()
  return dariDb || APP_VERSION
}
