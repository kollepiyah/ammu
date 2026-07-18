// shiftMaster — daftar shift kerja/mengajar + jamnya (settings.shiftMaster[]).
//
// Sumber tunggal DAFTAR shift. Menggantikan setting-key hardcoded per shift
// (shiftPagiMulai/shiftPagiTerlambat/... dst) yang dulu bikin shift tak bisa ditambah.
// Jam kini tersimpan DI DALAM item master, jadi shiftSettingKeys() tak diperlukan lagi.
//
// KOMPAT: 5 shift bawaan MEMPERTAHANKAN id lama ('pagi','sore','sekolah',
// 'pegawai_pagi','pegawai_sore') dan jamnya tetap DICERMINKAN ke setting-key lama
// saat disimpan (lihat shiftMasterToLegacy) — supaya fp_sync.py (replika Python di
// luar repo) tetap jalan tanpa diubah. Shift BARU tak punya cermin legacy, jadi
// belum dikenali fp_sync.py sampai jalur sync Electron menggantikannya.
//
// Semua fungsi PURE — `settings` di-pass eksplisit (bukan baca store).

// Normalisasi 'H:MM' / 'HH.MM' → 'HH:MM' (zero-pad). null bila tak valid.
// Format 'HH:MM' 24-jam zero-pad bisa dibandingkan langsung secara leksikal.
export function normHHMM(v) {
  const s = String(v || '')
    .trim()
    .replace('.', ':')
  if (!s || !s.includes(':')) return null
  const [h, m] = s.split(':')
  const hi = parseInt(h, 10)
  const mi = parseInt(m, 10)
  if (Number.isNaN(hi) || Number.isNaN(mi)) return null
  return String(hi).padStart(2, '0') + ':' + String(mi).padStart(2, '0')
}

export const SHIFT_UNTUK_OPTIONS = [
  { value: 'guru', label: 'Guru (jadwal mengajar)' },
  { value: 'pegawai', label: 'Pegawai (jadwal kerja)' }
]

// Setting-key lama per shift bawaan. Dipakai 2 arah: seed (baca settings lama)
// & cermin (tulis balik saat simpan, demi fp_sync.py).
const LEGACY_KEYS = {
  pagi: { mulai: 'shiftPagiMulai', terlambat: 'shiftPagiTerlambat', selesai: 'shiftPagiSelesai' },
  sore: { mulai: 'shiftSoreMulai', terlambat: 'shiftSoreTerlambat', selesai: 'shiftSoreSelesai' },
  sekolah: {
    mulai: 'shiftSekolahMulai',
    terlambat: 'shiftSekolahTerlambat',
    selesai: 'shiftSekolahSelesai'
  },
  pegawai_pagi: {
    mulai: 'shiftPegawaiPagiMulai',
    terlambat: 'shiftPegawaiPagiTerlambat',
    selesai: 'shiftPegawaiPagiSelesai'
  },
  pegawai_sore: {
    mulai: 'shiftPegawaiSoreMulai',
    terlambat: 'shiftPegawaiSoreTerlambat',
    selesai: 'shiftPegawaiSoreSelesai'
  }
}

// 5 shift bawaan. `urutan` = prioritas saat 1 jam scan jatuh di >1 window —
// URUTAN INI SENGAJA SAMA dengan konstanta SHIFT_PRIORITY lama.
// `fallback` = shift yang jamnya dipakai bila jam sendiri dikosongkan (pegawai → guru).
// `hadir_ikut` = shift SUMBER yang bila guru hadir di sana, otomatis meng-hadir-kan
// shift ini (guru gabungan: 1 scan pagi → hadir sekolah juga). Default sekolah ← pagi.
export const SHIFT_BAWAAN = [
  { id: 'pagi', label: 'Pagi', untuk: 'guru', urutan: 1, fallback: '' },
  { id: 'pegawai_pagi', label: 'Pegawai Pagi', untuk: 'pegawai', urutan: 2, fallback: 'pagi' },
  { id: 'sekolah', label: 'Sekolah', untuk: 'guru', urutan: 3, fallback: '', hadir_ikut: ['pagi'] },
  { id: 'sore', label: 'Sore', untuk: 'guru', urutan: 4, fallback: '' },
  { id: 'pegawai_sore', label: 'Pegawai Sore', untuk: 'pegawai', urutan: 5, fallback: 'sore' }
]

const BAWAAN_IDS = new Set(SHIFT_BAWAAN.map((s) => s.id))

export function isShiftBawaan(id) {
  return BAWAAN_IDS.has(String(id || ''))
}

// 'Piket Malam' → 'piket_malam'. Id dipakai sbg kunci absensi_shift_guru.shift,
// jadi harus stabil & aman (huruf/angka/underscore).
export function slugShiftId(v) {
  return String(v || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export function normalizeShift(raw) {
  const r = raw || {}
  const id = slugShiftId(r.id || r.label || '')
  const bawaan = BAWAAN_IDS.has(id)
  const def = bawaan ? SHIFT_BAWAAN.find((b) => b.id === id) : null
  // hadir_ikut: array eksplisit (termasuk []) DIHORMATI; bila field absen, pakai seed
  // bawaan (data 'sekolah' lama tanpa field → ['pagi']). Self-reference dibuang.
  // CATATAN: field pulang_default & hadir_ikut ini APP-ONLY — port Deno shiftMaster.ts
  // sengaja tak membawanya (edge hiview hanya butuh derivasi masuk, tak baca keduanya).
  const hadirIkut = (Array.isArray(r.hadir_ikut) ? r.hadir_ikut : def?.hadir_ikut || [])
    .map(slugShiftId)
    .filter((x) => x && x !== id)
  return {
    id,
    label: String(r.label || def?.label || id || '').trim(),
    untuk: String(r.untuk || def?.untuk || 'guru').toLowerCase() === 'pegawai' ? 'pegawai' : 'guru',
    mulai: normHHMM(r.mulai) || '',
    terlambat: normHHMM(r.terlambat) || '',
    selesai: normHHMM(r.selesai) || '',
    // jam pulang default (opsional) utk prefill/isi-massal absen pulang — tak nge-gate hadir.
    pulang_default: normHHMM(r.pulang_default) || '',
    hadir_ikut: [...new Set(hadirIkut)],
    urutan: Number(r.urutan) > 0 ? Number(r.urutan) : 99,
    // fallback milik shift bawaan (pegawai → jam guru) — tak bisa diubah lewat UI.
    fallback: bawaan ? def.fallback || '' : '',
    bawaan
  }
}

function byUrutan(a, b) {
  if (a.urutan !== b.urutan) return a.urutan - b.urutan
  return String(a.id).localeCompare(String(b.id))
}

// Daftar shift aktif. Bila settings.shiftMaster[] belum ada (data lama), SEED dari
// setting-key lama APA ADANYA — termasuk saat kosong. Sengaja TANPA jam default:
// perilaku lama = window kosong → shift tak pernah cocok. Jangan diubah di sini,
// biar derivasi shift data lama tetap identik.
export function shiftList(settings) {
  const s = settings || {}
  const raw = Array.isArray(s.shiftMaster) ? s.shiftMaster : []
  if (raw.length > 0) {
    return raw
      .map(normalizeShift)
      .filter((x) => x.id)
      .sort(byUrutan)
  }
  return SHIFT_BAWAAN.map((b) => {
    const k = LEGACY_KEYS[b.id]
    return normalizeShift({
      ...b,
      mulai: s[k.mulai],
      terlambat: s[k.terlambat],
      selesai: s[k.selesai]
    })
  }).sort(byUrutan)
}

export function shiftById(settings, id) {
  const sid = String(id || '')
  return shiftList(settings).find((x) => x.id === sid) || null
}

export function shiftLabelOf(settings, id) {
  return shiftById(settings, id)?.label || String(id || '-')
}

// Shift yang berlaku utk tipe orang tertentu ('guru' | 'pegawai').
export function shiftsUntuk(settings, untuk) {
  const u = String(untuk || '').toLowerCase()
  return shiftList(settings).filter((x) => x.untuk === u)
}

// Penanda "tak ada shift pagi/sore" utk field lama g.shift/g.shift_pegawai.
// JANGAN dikosongkan: pembaca legacy (fp_sync.py & shiftsForGuruLegacy) menerjemahkan
// string kosong jadi default 'pagi_sore' — itulah asal bug pegawai dapat bonus 2 shift.
// Nilai ini sengaja tak mengandung substring 'pagi'/'sore' sehingga terbaca "tak ada".
export const SHIFT_LEGACY_KOSONG = 'kosong'

// Cermin shift_ids[] → field lama g.shift / g.shift_pegawai, supaya fp_sync.py (replika
// Python yang belum mengenal shift_ids) menurunkan shift yang SAMA. Mengikuti cara baca
// fp_sync: pegawai murni baca g.shift, dual-role baca g.shift_pegawai.
// Batas yang diketahui: hanya 5 shift bawaan yang punya padanan. Shift baru tak tercermin,
// dan 'sekolah' di sisi fp_sync tetap ikut ada/tidaknya lembaga_sekolah.
export function shiftIdsToLegacy(ids, tipePegawai) {
  const set = new Set((Array.isArray(ids) ? ids : []).map(String))
  const tipe = String(tipePegawai || 'guru')
    .toLowerCase()
    .trim()
  const hasPegawai = tipe.includes('pegawai')
  const hasGuru = !hasPegawai || tipe.includes('guru')
  const gabung = (pagi, sore) =>
    pagi && sore ? 'pagi_sore' : pagi ? 'pagi' : sore ? 'sore' : SHIFT_LEGACY_KOSONG
  const sGuru = gabung(set.has('pagi'), set.has('sore'))
  const sPegawai = gabung(set.has('pegawai_pagi'), set.has('pegawai_sore'))
  if (hasGuru && hasPegawai) return { shift: sGuru, shift_pegawai: sPegawai }
  if (hasPegawai) return { shift: sPegawai, shift_pegawai: SHIFT_LEGACY_KOSONG }
  return { shift: sGuru, shift_pegawai: SHIFT_LEGACY_KOSONG }
}

// Cermin balik ke setting-key lama utk 5 shift bawaan (fp_sync.py membacanya).
// Shift baru dilewati — tak punya padanan legacy.
export function shiftMasterToLegacy(list) {
  const out = {}
  for (const sh of Array.isArray(list) ? list : []) {
    const k = LEGACY_KEYS[String(sh?.id || '')]
    if (!k) continue
    out[k.mulai] = sh.mulai || ''
    out[k.terlambat] = sh.terlambat || ''
    out[k.selesai] = sh.selesai || ''
  }
  return out
}
