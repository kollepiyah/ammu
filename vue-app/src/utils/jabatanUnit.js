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

// Gabungan unit dari jabatan utama + jabatan tambahan. Salah satunya global
// (units kosong) → hasilnya ikut global: jangan batasi pilihan lembaga.
export function unitsOfGuru(jabatanItems, jabatanUtama, jabatanTambahan) {
  const nama = [jabatanUtama, jabatanTambahan].map((x) => String(x || '').trim()).filter(Boolean)
  if (nama.length === 0) return []
  const per = nama.map((n) => unitsOfJabatan(jabatanItems, n))
  if (per.some((u) => u.length === 0)) return []
  return normalizeUnits(per.flat())
}
