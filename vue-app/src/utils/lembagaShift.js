// lembagaShift — lembaga mana yang "memiliki" sebuah shift milik seorang guru.
//
// v.1.3.7 (Kyai, 31 Agu 2026): "guru yg ngajar sekolah dan ngaji, padahal sekolahnya
// libur, tapi ngajinya masuk. tapi guru itu di absensi bulanannya masih terhitung absen
// sekolahnya."
//
// AKAR MASALAH. Libur kalender sudah ber-scope lembaga sejak v.1.2.3 (utils/liburScope),
// dan Kalender Kegiatan sendiri menjanjikan: "Pilih mis. 'Sekolah' bila sekolah libur tapi
// ngaji tetap masuk." Yang belum benar adalah pertanyaan di sisi seberangnya — "sel absensi
// (guru × shift) ini milik lembaga apa?" — yang selama ini dijawab tebakan hardcoded di
// dalam view:
//
//     shift === 'sekolah' ? g.lembaga_sekolah || g.lembaga : g.lembaga || g.lembaga_sekolah
//
// Tebakan itu meleset di DUA arah, dan dua-duanya diam-diam:
//   1. `lembaga_sekolah` guru kosong → shift sekolah memakai lembaga NGAJI. Libur sekolah
//      tak mengenainya → hari itu dihitung ALPA (keluhan Kyai). Sebaliknya, libur ngaji
//      justru MEMBEBASKAN shift sekolahnya — alpa yang seharusnya ada malah hilang.
//   2. Shift sekolah buatan sendiri (mis. "SDI Pagi", id-nya bukan 'sekolah') tak pernah
//      dikenali sebagai shift sekolah sama sekali, jadi selalu memakai lembaga ngaji.
//
// SUMBER KEBENARAN yang dipakai sekarang: kolom **"Khusus Lembaga"** milik shift di
// Pengaturan › Master Shift (`shiftMaster[].lembaga[]`) — pernyataan eksplisit Kyai bahwa
// shift ini milik lembaga tsb. Field yang sama sudah dipakai BisyarohView untuk memilih
// shift kehadiran per lembaga, jadi ini menyatukan dua pembaca ke satu deklarasi, bukan
// menambah deklarasi ketiga.
//
// ⚠️ PRASYARAT: shift sekolah yang BUKAN shift bawaan 'sekolah' WAJIB diisi kolom
// "Khusus Lembaga"-nya. Tanpa itu tak ada satu pun data yang menyebut shift itu milik
// sekolah, dan tebakan lama (= lembaga ngaji) adalah satu-satunya yang tersisa.
//
// Semua fungsi PURE — `settings` di-pass eksplisit, tak menyentuh store.
import { shiftById } from './shiftMaster'
import { canonLembaga, lembagaScopeMatches, getLembagaBroadGroup } from '@/composables/useLembaga'

const _canon = (v) => canonLembaga(String(v == null ? '' : v).trim()) || ''

// Label kelompok luas yang dipakai Kalender Kegiatan sbg pilihan scope cepat.
const BROAD_LABEL = { qiraati: 'Qiraati', sekolah: 'Sekolah', mahad: "Ma'had" }

// Daftar lembaga yang dideklarasikan shift ini ("Khusus Lembaga"). [] = tak dideklarasikan.
function scopeShift(shiftId, settings) {
  const sh = shiftById(settings || {}, shiftId)
  const arr = Array.isArray(sh?.lembaga) ? sh.lembaga : []
  return arr.map(_canon).filter(Boolean)
}

/**
 * Label kelompok luas ('Sekolah'/'Qiraati') bila SEMUA nama di `namaList` sekelompok.
 *
 * Ini pengganti terakhir saat lembaga persisnya tak diketahui, dan ia sengaja setengah
 * jalan: libur yang Kyai tandai "Sekolah" (pilihan cepat di Kalender Kegiatan, dan yang
 * paling sering dipakai) AKAN mengenai, sedangkan libur yang ditandai khusus "SDI" TIDAK —
 * karena kita memang tak tahu sekolah mana. Lebih baik ketimbang '' (yang membuat libur
 * sekolah bentuk apa pun luput) dan jauh lebih baik ketimbang meminjam lembaga ngaji.
 */
function labelKelompok(namaList) {
  const grup = (namaList || []).map((n) => getLembagaBroadGroup(n))
  if (!grup.length || grup.some((g) => !g || g !== grup[0])) return ''
  return BROAD_LABEL[grup[0]] || ''
}

/**
 * Lembaga yang KALENDERNYA berlaku untuk sel (guru × shift) ini.
 *
 * Dipakai untuk menilai "tanggal ini libur atau hari kerja". Karena itu ia sengaja
 * memilih DIAM ('') daripada menebak: lembaga yang salah di sini berarti guru dituduh
 * alpa pada hari libur, atau dibebaskan pada hari kerja. '' berarti "tak diketahui" →
 * pemanggil hanya memberlakukan libur GLOBAL (Ahad, libur manual pondok, event kalender
 * tanpa scope), yang memang berlaku untuk siapa pun.
 *
 * @param {object} guru baris guru ({ lembaga, lembaga_sekolah }).
 * @param {string} shiftId id shift (mis. 'pagi' | 'sekolah' | 'sdi_pagi').
 * @param {object} settings settings app (butuh shiftMaster / setting-key lama).
 * @returns {string} nama lembaga kanonik, atau '' bila tak bisa dipastikan.
 */
export function lembagaKalenderShift(guru, shiftId, settings) {
  const ngaji = _canon(guru?.lembaga)
  const sekolah = _canon(guru?.lembaga_sekolah)
  const scope = scopeShift(shiftId, settings)

  if (scope.length) {
    // Shift menyebut lembaganya sendiri. Yang dipakai = lembaga GURU yang masuk scope itu,
    // supaya nama yang dipakai tetap spesifik ('SDI'), bukan label luas ('Sekolah') yang
    // tak cocok dengan event kalender ber-nama-lembaga.
    for (const punya of [sekolah, ngaji]) {
      if (punya && scope.some((sc) => lembagaScopeMatches(sc, punya))) return punya
    }
    // Guru belum mengisi field lembaganya, tapi shiftnya cuma milik satu lembaga —
    // itu sudah cukup menentukan kalendernya. Dipakai beberapa lembaga sekaligus →
    // turun ke label kelompok bila semuanya sekelompok ('SDI'+'TK' → 'Sekolah').
    return scope.length === 1 ? scope[0] : labelKelompok(scope)
  }

  // Shift tanpa deklarasi. Yang DIBUANG di sini adalah saling-jatuh antar-field: shift
  // sekolah TIDAK boleh memakai lembaga ngaji, dan sebaliknya — justru itu yang membuat
  // libur satu sisi bocor ke sisi lain.
  if (String(shiftId || '').toLowerCase() === 'sekolah') {
    // Shift BAWAAN 'sekolah' — bahwa ini shift sekolah sudah pasti (itu arti id-nya);
    // yang tak pasti cuma SEKOLAH MANA saat kolom Lembaga Sekolah guru masih kosong.
    // Karena itu jatuh ke label kelompok, bukan ke '' — libur yang ditandai "Sekolah"
    // tetap mengenainya, libur khusus "SDI" tetap tidak. Inilah yang menjaga perbaikan
    // 31 Agu 2026 tetap bekerja pada guru yang datanya belum dirapikan.
    return sekolah || BROAD_LABEL.sekolah
  }
  return ngaji
}

/**
 * Lembaga untuk LABEL / pengelompokan baris rekap (judul "PTPT", "SDI", …).
 *
 * Beda tugas dengan lembagaKalenderShift, jadi beda pula toleransinya: judul yang
 * sedikit meleset cuma soal tampilan, sedangkan judul KOSONG membuang baris ke keranjang
 * "(Tanpa Lembaga)" dan menyembunyikannya dari penyaring lembaga. Karena itu di sini
 * menebak masih boleh — persis perilaku sebelum v.1.3.7 — dan hasilnya TIDAK PERNAH
 * dipakai untuk menilai libur.
 *
 * @returns {string} nama lembaga kanonik, atau `kosong` bila kedua field guru kosong.
 */
export function lembagaLabelShift(guru, shiftId, settings, kosong = '(Tanpa Lembaga)') {
  const pasti = lembagaKalenderShift(guru, shiftId, settings)
  if (pasti) return pasti
  const ngaji = _canon(guru?.lembaga)
  const sekolah = _canon(guru?.lembaga_sekolah)
  return (
    (String(shiftId || '').toLowerCase() === 'sekolah' ? sekolah || ngaji : ngaji || sekolah) ||
    kosong
  )
}
