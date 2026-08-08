// v.1.2.6 (Kyai): status santri untuk targeting jenis pembayaran (syahriyah) — sejajar
//   dengan whitelist `lembaga_only`. Non-mukim = bukan mukim & bukan fullday;
//   Ma'had = is_mukim; Fullday = is_fullday. Sumber: field santri is_mukim / is_fullday.
//   MURNI (tanpa I/O) supaya gampang diuji & bisa dicerminkan di edge function (Deno).

export const STATUS_SANTRI_OPTS = [
  { key: 'non_mukim', label: 'Non-mukim' },
  { key: 'mahad', label: "Ma'had" },
  { key: 'fullday', label: 'Fullday' }
]

// v.1.2.x (Kyai): whitelist jenis kelamin untuk jenis pembayaran — sejajar status/lembaga.
//   Nilai cocok ke field santri.jk ('L'=Putra, 'P'=Putri). Kosong = semua.
export const JK_OPTS = [
  { key: 'L', label: 'Putra' },
  { key: 'P', label: 'Putri' }
]

/**
 * Apakah santri `s` cocok dengan whitelist jenis kelamin `jkOnly`?
 *   - whitelist kosong / bukan array → true (berlaku SEMUA jenis kelamin).
 *   - nilai 'L' (Putra) / 'P' (Putri) dicocokkan ke `santri.jk`.
 * @param {Object} s - dokumen santri (dibaca field jk).
 * @param {string[]} jkOnly - subset dari ['L','P'].
 */
export function matchJenisKelamin(s, jkOnly) {
  const wl = Array.isArray(jkOnly) ? jkOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const jk = String((s && s.jk) || '').toUpperCase()
  return wl.map((x) => String(x).toUpperCase()).includes(jk)
}

// Kyai 4 Agu 2026: whitelist SHIFT NGAJI untuk jenis pembayaran — sejajar status/lembaga/JK.
//   Latar: "syahriyah pagi untuk ngaji pagi, syahriyah sore untuk sore". Sebelum ini jenis
//   tak punya cara menyasar shift, sehingga `Syahriyah Qiraati Pagi` DAN `... Sore` terbit
//   ke SEMUA santri (terukur Agustus 2026: 513 + 909 tagihan, tumpang tindih 100%) dan TU
//   menyaringnya manual di POS.
//   CATATAN: nama lembaga "TPQ Pagi"/"TPQ Sore" BUKAN waktu — itu program pembeda usia dini
//   vs di atas 5 tahun (koreksi Kyai). Jadi shift HANYA boleh dibaca dari `shift_ngaji`.
export const SHIFT_NGAJI_OPTS = [
  { key: 'pagi', label: 'Ngaji Pagi' },
  { key: 'sore', label: 'Ngaji Sore' }
]

/**
 * Apakah santri `s` cocok dengan whitelist shift ngaji `shiftOnly`?
 *   - whitelist kosong / bukan array → true (berlaku SEMUA shift).
 *   - `shift_ngaji` santri KOSONG atau ambigu → dianggap ikut KEDUANYA → true.
 *
 * Yang terakhir itu SENGAJA, dan penting: `shift_ngaji` baru terisi 155 dari 524 santri
 * aktif (30%, diukur 3 Agu 2026) dan sisanya akan dikoreksi guru kelas belakangan.
 * Menganggap kosong sebagai "tidak cocok" akan MENGHILANGKAN tagihan ngaji untuk 70%
 * santri — kehilangan pemasukan itu jauh lebih berbahaya daripada tagihan kembar yang
 * sekarang sudah disaring TU. Dengan aturan ini, tagihan otomatis membaik satu per satu
 * seiring data diisi, tanpa ada yang rusak di tengah jalan.
 * Konvensi "kosong = keduanya" sama dengan `parseShiftNgaji()` di services/santriFields.js.
 *
 * @param {Object} s - dokumen santri (dibaca shift_ngaji).
 * @param {string[]} shiftOnly - subset dari ['pagi','sore'].
 */
export function matchShiftNgaji(s, shiftOnly) {
  const wl = Array.isArray(shiftOnly) ? shiftOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const raw = String((s && s.shift_ngaji) || '').toLowerCase()
  const pagi = raw.includes('pagi')
  const sore = raw.includes('sore')
  if (!pagi && !sore) return true // kosong/ambigu = ikut keduanya
  return wl.some((x) => {
    const k = String(x).toLowerCase()
    return (k === 'pagi' && pagi) || (k === 'sore' && sore)
  })
}

// Kyai 8 Agu 2026: "bisa ndak dibuat filter untuk semua santri ngaji yg tidak sekolah
//   disini?" — sasaran yang sering dipakai: santri ngaji MURNI (tak bersekolah di lembaga
//   pondok) versus yang juga bersekolah di sini.
export const SEKOLAH_SINI_OPTS = [
  { key: '', label: 'Semua santri' },
  { key: 'punya', label: 'Sekolah di sini' },
  { key: 'tanpa', label: 'TIDAK sekolah di sini' }
]

/**
 * Apakah santri `s` cocok dengan saringan "sekolah di sini"?
 *   '' / nilai asing → true (tidak menyaring, sejajar whitelist lain yang kosong)
 *   'punya'          → `lembaga_sekolah` terisi
 *   'tanpa'          → `lembaga_sekolah` kosong
 *
 * Penanda tunggalnya `lembaga_sekolah`, dan itu memang dasarnya: field inilah yang dipakai
 * seluruh aplikasi untuk menyatakan "bersekolah di lembaga pondok" (syarat gabungan
 * `punya_sekolah` pun membacanya). Menambah penanda kedua berarti dua sumber kebenaran yang
 * bisa berselisih diam-diam.
 */
export function matchSekolahSini(s, sekolahOnly) {
  const k = String(sekolahOnly ?? '')
    .trim()
    .toLowerCase()
  if (k !== 'punya' && k !== 'tanpa') return true
  const sekolah = String((s && s.lembaga_sekolah) || '').trim()
  return k === 'punya' ? !!sekolah : !sekolah
}

/**
 * Status tinggal (`is_mukim`/`is_fullday`) dari satu baris pendaftaran PSB.
 *
 * Kyai 3-4 Agu 2026: formulir PSB sudah menurunkan kedua flag ini dari pilihan
 * `tipe_santri` (`mahad|pp|fullday`) dan menyimpannya di baris pendaftaran, TAPI konversi
 * PSB→santri dulu tak menyalinnya sama sekali — jadi SEMUA santri hasil PSB jatuh
 * 'non_mukim'. Itu menyetir uang: whitelist `status_only` pada jenis pembayaran dan syarat
 * penggabungan 'fullday' (syahriyah ngaji sore sudah termasuk di syahriyah fullday)
 * dua-duanya bergantung pada flag ini.
 *
 * Flag eksplisit selalu menang; `tipe_santri` hanya CADANGAN untuk baris PSB lama yang
 * belum punya flag-nya. Nilai selain 'mahad'/'fullday' (termasuk 'pp') → non-mukim.
 *
 * @param {Object} p - baris psb_pendaftaran (sudah diratakan `_flatten`).
 * @returns {{is_mukim: boolean, is_fullday: boolean}}
 */
export function statusTinggalDariPsb(p) {
  const tipe = String((p && p.tipe_santri) || '')
    .trim()
    .toLowerCase()
  const punyaMukim = p && p.is_mukim !== undefined && p.is_mukim !== null
  const punyaFullday = p && p.is_fullday !== undefined && p.is_fullday !== null
  return {
    is_mukim: punyaMukim ? p.is_mukim === true : tipe === 'mahad',
    is_fullday: punyaFullday ? p.is_fullday === true : tipe === 'fullday'
  }
}

/**
 * Apakah santri `s` cocok dengan whitelist status `statusOnly`?
 *   - whitelist kosong / bukan array → true (berlaku untuk SEMUA status).
 *   - antar-status bersifat OR (santri masuk bila cocok SALAH SATU status terpilih).
 * @param {Object} s - dokumen santri (dibaca is_mukim & is_fullday).
 * @param {string[]} statusOnly - subset dari ['non_mukim','mahad','fullday'].
 */
export function matchStatusOnly(s, statusOnly) {
  const wl = Array.isArray(statusOnly) ? statusOnly.filter(Boolean) : []
  if (wl.length === 0) return true
  const mukim = !!(s && s.is_mukim)
  const fullday = !!(s && s.is_fullday)
  return wl.some((st) =>
    st === 'mahad'
      ? mukim
      : st === 'fullday'
        ? fullday
        : st === 'non_mukim'
          ? !mukim && !fullday
          : false
  )
}
