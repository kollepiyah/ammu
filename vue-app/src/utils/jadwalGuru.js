// jadwalGuru — HARI mengajar/kerja per (guru × shift): `guru.hari_shift`.
//
// v.1.3.8 (Kyai, 1 Sep 2026): "di satu lembaga ada guru yang masuk tiap hari dan ada
// yang cuma 3 hari, saat ini tidak ada tempat mengaturnya. Jadi guru yg mengajarnya
// tidak full senin-sabtu terhitung punya alpa banyak."
//
// AKAR MASALAH. Sampai perbaikan ini pertanyaan "tanggal ini hari kerja bagi guru ini?"
// dijawab tanpa menengok gurunya sama sekali — hanya Ahad + Kalender Kegiatan (libur
// ber-scope lembaga sejak v.1.2.3). Artinya "hari kerja" selalu berarti hari kerja
// LEMBAGA, dan guru paruh-waktu dituduh alpa pada hari yang memang bukan jadwalnya:
// 3 hari/pekan → ±12 alpa palsu sebulan, tiap bulan, tanpa cara membetulkannya.
//
// Yang rusak bukan hanya angka absensi — penyebut UANG memakai definisi yang sama:
//   · per_jp         jp_minggu ÷ hari aktif LEMBAGA → guru 3 hari dibayar separuh
//   · per_jp_bulanan prorata JP diajar ÷ JP terjadwal; penyebutnya kebanyakan
//   · flat_ambang    % hadir tepat ÷ hari efektif lembaga → ambang 100% mustahil
// Karena itu satu daftar hari ini dipakai bersama absensi DAN bisyaroh; kalau dua sisi
// memakai definisi berbeda, slip dan rekap akan saling menyalahkan.
//
// BENTUK DATA: guru.hari_shift = { [shiftId]: [1,3,5] }, 0=Ahad … 6=Sabtu. Tersimpan
// di kolom `data` jsonb (bukan kolom riil) — lihat COLS di services/db.js, jadi tak
// perlu migrasi. Kuncinya per SHIFT, bukan per guru, karena absensi memang dihitung
// per (guru × shift): guru yang sekolahnya Senin–Sabtu tapi ngajinya 3 hari butuh dua
// jadwal berbeda, dan itu justru guru yang paling sering ada di sini.
//
// TAK DIATUR = PERILAKU LAMA PERSIS. Disengaja, dan wajib dijaga: hampir semua guru
// memang full Senin–Sabtu, dan tak satu pun angka mereka boleh bergeser gara-gara
// fitur ini. Daftar KOSONG juga dibaca "tak diatur" — bukan "tak pernah masuk" —
// supaya centang yang tak sengaja terhapus tidak diam-diam menihilkan absensi dan
// bisyaroh seorang guru. UI yang menahan simpanan kosong ada di GuruFormView.
//
// Semua fungsi PURE — `settings` di-pass eksplisit, tak menyentuh store.
import { canonLembaga } from '@/composables/useLembaga'
import { shiftsForGuru } from './shiftDerive'
import { lembagaKalenderShift } from './lembagaShift'

export const HARI_LABELS = ['Ahad', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

/** Weekday 0..6 dari 'YYYY-MM-DD'. Tengah malam LOKAL — sama dengan isLiburIso &
 *  bebanMengajar, supaya tiga pembaca tak pernah berbeda sehari. */
export function dowOf(iso) {
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d).getDay()
}

/** Daftar hari bersih: bilangan bulat 0..6, unik, terurut. Sampah dibuang. */
export function normHariList(v) {
  if (!Array.isArray(v)) return []
  const set = new Set()
  for (const x of v) {
    const n = Number(x)
    if (Number.isInteger(n) && n >= 0 && n <= 6) set.add(n)
  }
  return [...set].sort((a, b) => a - b)
}

/** Peta jadwal milik seorang guru, ternormalisasi. Kunci kosong dibuang. */
export function jadwalMap(guru) {
  const raw = guru?.hari_shift
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const out = {}
  for (const [k, v] of Object.entries(raw)) {
    const id = String(k || '').trim()
    if (!id) continue
    const hari = normHariList(v)
    if (hari.length) out[id] = hari
  }
  return out
}

/**
 * Hari mengajar guru untuk SATU shift.
 * @returns {number[]|null} `null` = tak diatur → pemanggil WAJIB memakai perilaku lama
 *   (semua hari kerja lembaga). Jangan diterjemahkan jadi [] atau jadi "tiap hari":
 *   bedanya adalah beda antara "ikut aturan lembaga" dan "punya aturan sendiri".
 */
export function hariShiftGuru(guru, shiftId) {
  const h = jadwalMap(guru)[String(shiftId || '').trim()]
  return h && h.length ? h : null
}

/** true bila guru punya jadwal khusus di setidaknya satu shift (utk penanda di daftar). */
export function punyaJadwalKhusus(guru) {
  return Object.keys(jadwalMap(guru)).length > 0
}

/**
 * Apakah guru MASUK pada tanggal ini untuk shift ini?
 *
 * Hanya menjawab soal JADWAL. Libur (Ahad, libur pondok, Kalender Kegiatan) tetap
 * urusan pemanggil — dipisah supaya tak ada dua tempat yang menilai libur.
 *
 * Tak diatur → true (hari kerja lembaga berlaku penuh, persis seperti sebelum 1 Sep 2026).
 */
export function guruMasukPada(guru, shiftId, iso) {
  const hari = hariShiftGuru(guru, shiftId)
  if (!hari) return true
  const d = dowOf(iso)
  return d == null ? true : hari.includes(d)
}

/** Kebalikannya — dipakai view yang perlu membedakan "bukan jadwalnya" dari "libur". */
export function bukanJadwalGuru(guru, shiftId, iso) {
  return !guruMasukPada(guru, shiftId, iso)
}

/**
 * Tanggal-tanggal dalam `tanggalList` yang BUKAN jadwal guru ini (Set of ISO).
 * Dipakai hitungSel: hari di sini boleh kosong tanpa jadi alpa, tapi kalau ternyata
 * ADA barisnya tetap dihitung — guru yang datang di luar jadwal jangan dibuang.
 */
export function tanggalBukanJadwal(guru, shiftId, tanggalList) {
  const out = new Set()
  const hari = hariShiftGuru(guru, shiftId)
  if (!hari) return out
  for (const iso of tanggalList || []) {
    const d = dowOf(iso)
    if (d != null && !hari.includes(d)) out.add(String(iso).slice(0, 10))
  }
  return out
}

/**
 * Hari mengajar guru di satu LEMBAGA — jembatan ke sisi UANG.
 *
 * Beban mengajar berkunci LEMBAGA (`bebanMengajar[].lembaga`) sedangkan jadwal
 * berkunci SHIFT, jadi keduanya disambung lewat `lembagaKalenderShift` — sumber
 * kebenaran yang sama yang dipakai absensi menilai libur (v.1.3.7). Menambah cara
 * ketiga untuk menebak "shift ini milik lembaga apa" justru akan memecah lagi apa
 * yang baru disatukan di sana.
 *
 * Beberapa shift bisa jatuh ke lembaga yang sama (mis. pagi + sore di lembaga ngaji)
 * → harinya DIGABUNG: guru itu memang mengajar di lembaga tsb pada gabungan hari itu.
 *
 * @returns {number[]|null} `null` bila tak ada satu pun shift lembaga ini yang diatur.
 */
export function hariGuruLembaga(guru, lembaga, settings) {
  const target = canonLembaga(String(lembaga || '').trim())
  if (!target) return null
  const s = settings || {}
  const gabung = new Set()
  for (const sh of shiftsForGuru(guru, s)) {
    if (canonLembaga(lembagaKalenderShift(guru, sh, s)) !== target) continue
    const hari = hariShiftGuru(guru, sh)
    // Satu shift di lembaga ini belum diatur = lembaga ini belum punya jadwal khusus.
    // Sengaja tidak "sebagian": penyebut uang yang separuh-jadi lebih berbahaya
    // ketimbang penyebut lama yang setidaknya konsisten.
    if (!hari) return null
    for (const d of hari) gabung.add(d)
  }
  return gabung.size ? [...gabung].sort((a, b) => a - b) : null
}
