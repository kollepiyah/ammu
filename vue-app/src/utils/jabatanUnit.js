// jabatanUnit — unit/lembaga tempat sebuah JABATAN bertugas (master/jabatan items[].units).
//
// Dulu unit pegawai DITEBAK heuristik regex di useGuru.deriveGuruLembagaRefs
// (/admin|supervisi|pj/ → 'Yayasan', /keamanan|kebersihan/ → 'Sarana Prasarana').
// Tebakan itu menyetir baris pokok di slip bisyaroh, jadi salah tebak = salah bayar.
// Kini unit jadi DATA yang Kyai atur sendiri di Master Data › Jabatan.
//
// Aturan `units`:
//   []                          → GLOBAL. Jabatan "Guru": bebas bertugas di lembaga mana pun.
//   ['Sarana & Prasarana']      → terikat 1 unit → lembaga guru terisi OTOMATIS.
//   ['TPQ Pagi', 'TPQ Sore']    → pilihan lembaga guru dibatasi ke dua itu.
//
// Daftar unit diambil dari master/lembaga.list — BUKAN konstanta LEMBAGA_GROUPS di
// useLembaga.js: konstanta itu hardcoded dan tak mengenal lembaga yang Kyai tambah
// belakangan (mis. "Majelis Isyraf Tarbawy").

// Nama lembaga dari baris master/lembaga (bentuknya bisa string, {lembaga}, atau {nama}).
export function namaLembaga(l) {
  if (!l) return ''
  return String(typeof l === 'string' ? l : l.lembaga || l.nama || '').trim()
}

const _key = (v) =>
  String(v == null ? '' : v)
    .trim()
    .toLowerCase()

// Bersihkan daftar unit: buang kosong & duplikat, pertahankan urutan.
export function normalizeUnits(raw) {
  const out = []
  const seen = new Set()
  for (const u of Array.isArray(raw) ? raw : []) {
    const nama = namaLembaga(u)
    if (!nama || seen.has(_key(nama))) continue
    seen.add(_key(nama))
    out.push(nama)
  }
  return out
}

// Field guru mana yang menampung unit ini. Dibaca dari master/lembaga `tipe`
// ('Qiraati' | 'Formal' | 'Non Lembaga') — bukan dari konstanta LEMBAGA_GROUPS:
//   'Formal' (sekolah) → lembaga_sekolah;  Qiraati & Non Lembaga → lembaga.
export function fieldForUnit(lembagaList, namaUnit) {
  const k = _key(namaUnit)
  const l = (Array.isArray(lembagaList) ? lembagaList : []).find((x) => _key(namaLembaga(x)) === k)
  return _key(l?.tipe) === 'formal' ? 'lembaga_sekolah' : 'lembaga'
}

// Unit milik 1 jabatan. [] = global (atau jabatan tak dikenal).
export function unitsOfJabatan(jabatanItems, namaJabatan) {
  const k = _key(namaJabatan)
  if (!k) return []
  const it = (Array.isArray(jabatanItems) ? jabatanItems : []).find((x) => x && _key(x.nama) === k)
  return normalizeUnits(it?.units)
}

/**
 * Daftar nama jabatan dari nilai yang bentuknya bisa macam-macam.
 *
 * Kyai 7 Agu 2026: "ada yg punya 3 jabatan". Kolom `jabatan_tambahan` di tabel guru
 * bertipe TEKS dan form lamanya cuma satu `<select>`, jadi maksimal 2 jabatan. Daripada
 * memindah kolom (menyentuh impor, ekspor, dan semua pembaca lama), beberapa jabatan
 * disimpan DIPISAH KOMA di kolom yang sama — nilai lama yang cuma satu nama tetap terbaca
 * apa adanya, jadi tak ada data yang perlu dimigrasi.
 * Array juga diterima: beberapa pembaca lama sudah mengirimnya begitu.
 */
export function pecahJabatan(v) {
  const mentah = Array.isArray(v) ? v : String(v ?? '').split(',')
  const out = []
  for (const x of mentah) {
    const nama = String(x ?? '').trim()
    if (!nama) continue
    if (!out.some((y) => _key(y) === _key(nama))) out.push(nama)
  }
  return out
}

/**
 * Jabatan yang MEMANGKU unit/lembaga tertentu, dari jabatan-jabatan milik guru ini.
 *
 * Kyai 7 Agu 2026: "siti churiyah Kepala PKBM tapi di simulasi terbacanya sebagai guru".
 * Akarnya: tempat tugas di lembaga SEKOLAH diberi jabatan `g.jabatan_sekolah || 'Guru'` —
 * dan `jabatan_sekolah` TIDAK PERNAH diisi di mana pun (satu-satunya kemunculannya di
 * seluruh kode adalah pembacanya sendiri). Jadi semua kepala sekolah terbaca "Guru" di
 * lembaganya sendiri, dan jenis/tunjangan ber-scope jabatan Kepala tak pernah mengenainya.
 *
 * Jawabannya sudah ada di master jabatan: "Kepala PKBM" punya units ["PKBM"]. Jadi kalau
 * salah satu jabatan orang ini memangku unit tsb, ITU jabatannya di sana — bukan 'Guru'.
 * Yang tak memangku unit itu tetap jatuh ke fallback pemanggil.
 *
 * @returns {string} nama jabatan, atau '' bila tak ada yang memangku unit itu.
 */
export function jabatanUntukUnit(jabatanItems, namaJabatanList, unit) {
  const u = _key(unit)
  if (!u) return ''
  for (const nama of namaJabatanList || []) {
    const n = String(nama || '').trim()
    if (!n) continue
    if (unitsOfJabatan(jabatanItems, n).some((x) => _key(x) === u)) return n
  }
  return ''
}

/**
 * Gelar KEPALA yang memangku unit ini — '' bila orang ini bukan kepala di sana.
 *
 * Kyai 7 Agu 2026: "kalau kepala kenapa masih dapat bisyaroh pokok guru. harusnya kan hanya
 * pokok kepala dan JPnya". Jadi di lembaga yang ia PIMPIN, bacaannya cuma Kepala — bacaan
 * 'Guru' dicabut supaya pokok guru tak ikut terbit.
 *
 * ⚠️ Disaring ke kata "kepala", BUKAN sekadar "gelar yang memangku unit". Di master jabatan
 * Kyai, **Wali Kelas** juga terikat unit (SDI & PKBM) — kalau aturannya dipukul rata, tiap
 * wali kelas kehilangan pokok gurunya, persis regresi yang baru saja dikeluhkan.
 * "PJ ..." sengaja TIDAK ikut: PJ Administrasi memangku empat lembaga ngaji sekaligus dan
 * orangnya tetap guru biasa di sana.
 */
export function kepalaUntukUnit(jabatanItems, namaJabatanList, unit) {
  const kepala = (namaJabatanList || []).filter((n) => /kepala/i.test(String(n || '')))
  return jabatanUntukUnit(jabatanItems, kepala, unit)
}

// Gabungan unit dari jabatan utama + jabatan tambahan. Salah satunya global
// (units kosong) → hasilnya ikut global: jangan batasi pilihan lembaga.
export function unitsOfGuru(jabatanItems, jabatanUtama, jabatanTambahan) {
  const nama = [String(jabatanUtama || '').trim(), ...pecahJabatan(jabatanTambahan)].filter(Boolean)
  if (nama.length === 0) return []
  const per = nama.map((n) => unitsOfJabatan(jabatanItems, n))
  if (per.some((u) => u.length === 0)) return []
  return normalizeUnits(per.flat())
}
