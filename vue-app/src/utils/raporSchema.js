export const DEFAULT_SCHEMA_TPQ = {
  sections: [
    {
      id: 'jilid',
      title: 'Jilid',
      rows: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'],
      fields: [
        { id: 'tgl_khotam', label: 'Tgl Khotam Jilid', type: 'date' },
        { id: 'doa_harian', label: 'Doa Harian', type: 'text' },
        { id: 'surat_pendek', label: 'Surat Pendek', type: 'text' },
        { id: 'adab', label: 'Adab', type: 'number' },
        { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
      ]
    }
  ]
}
export const DEFAULT_SCHEMA_KOSONG = { sections: [] }
export const DEFAULT_DINIYAH_MAPEL = [
  { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
  { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
  { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 },
  { id: 'tarikh', nama: 'TARIKH', kkm: 80 },
  { id: 'b_arab', nama: 'BAHASA ARAB', kkm: 80 },
  { id: 'tahajji', nama: 'TAHAJJI', kkm: 80 },
  { id: 'praktek_ibadah', nama: 'PRAKTEK IBADAH', kkm: 80 },
  { id: 'aswaja', nama: 'Aswaja/Ke-NU-an', kkm: 80 }
]
export const DEFAULT_DINIYAH_JENJANG = [
  'TK A',
  'TK B',
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII'
]
export const DEFAULT_SCHEMA_DINIYAH_PER_KELAS = {
  perKelas: true,
  jenjang: DEFAULT_DINIYAH_JENJANG.map((k) => ({
    kelas: k,
    mapel: JSON.parse(JSON.stringify(DEFAULT_DINIYAH_MAPEL))
  }))
}
export const DEFAULT_SCHEMA_PTPT = {
  tableLayout: 'kelasJuz',
  rows: (() => {
    const out = []
    for (let kls = 1; kls <= 6; kls++) {
      const start = (kls - 1) * 5 + 1
      for (let j = start; j <= start + 4; j++) out.push({ kelas: 'Kelas ' + kls, juz: 'Juz ' + j })
    }
    return out
  })(),
  fields: [
    { id: 'tgl_khotam', label: 'Tanggal Khotam', type: 'date' },
    { id: 'bacaan_fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
    { id: 'bacaan_tartil', label: 'Tartil', type: 'number', group: 'Kualitas Bacaan' },
    // v.100d (kyai): tukar urutan + 'Kelancaran' jadi 'Tahfizh' (id tetap → data lama aman)
    { id: 'hafalan_kelancaran', label: 'Tahfizh', type: 'number', group: 'Kualitas Hafalan' },
    { id: 'hafalan_istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
    { id: 'adab', label: 'Adab', type: 'number' },
    { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
  ]
}
export const DEFAULT_PRA_PTPT_FIELDS = [
  { id: 'fashohah', label: 'Fashohah', group: 'Kualitas Bacaan' },
  { id: 'tartil', label: 'Tartil', group: 'Kualitas Bacaan' },
  { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
  { id: 'ghorib', label: 'Ghorib' },
  { id: 'tajwid', label: 'Tajwid' },
  { id: 'doa_harian', label: "Do'a Harian" },
  { id: 'adab', label: 'Adab' }
]
const _romawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI']
function _buildKhotamList(jumlah, multiplier) {
  const out = []
  for (let i = 0; i < jumlah; i++) {
    const rom = _romawi[i] || String(i + 1)
    out.push({ id: 'khotam_' + rom, labelKhotam: 'Khotam ' + rom, multiplier })
  }
  return out
}
export const DEFAULT_SCHEMA_PRA_PTPT = {
  perLevel: true,
  fieldsNilai: JSON.parse(JSON.stringify(DEFAULT_PRA_PTPT_FIELDS)),
  levels: [
    {
      id: 'lvl_1',
      label: 'Level 1',
      levelBaca: 'Setengah Juz',
      khotamList: _buildKhotamList(3, 2)
    },
    { id: 'lvl_2', label: 'Level 2', levelBaca: '1 Juz', khotamList: _buildKhotamList(3, 2) },
    {
      id: 'lvl_3',
      label: 'Level 3',
      levelBaca: '1 Setengah Juz',
      khotamList: _buildKhotamList(3, 2)
    },
    { id: 'lvl_4', label: 'Level 4', levelBaca: '2 Juz', khotamList: _buildKhotamList(3, 3) },
    { id: 'lvl_5', label: 'Level 5', levelBaca: '3 Juz', khotamList: _buildKhotamList(11, 3) }
  ]
}
export function _slugMapelDiniyah(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}
export function getSchemaLembaga(lembaga, settings, lembagaSekolah = null) {
  const all = (settings && settings.raporSchemas) || {}
  if (lembaga === 'Pra PTPT') {
    const saved = all[lembaga]
    if (saved && saved.perLevel === true) return JSON.parse(JSON.stringify(saved))
    return JSON.parse(JSON.stringify(DEFAULT_SCHEMA_PRA_PTPT))
  }
  if (lembaga === 'Diniyah' && lembagaSekolah) {
    if (all[lembagaSekolah]) return JSON.parse(JSON.stringify(all[lembagaSekolah]))
    const compoundKey = 'Diniyah_' + lembagaSekolah
    if (all[compoundKey]) return JSON.parse(JSON.stringify(all[compoundKey]))
  }
  if (all[lembaga]) return JSON.parse(JSON.stringify(all[lembaga]))
  if (lembaga === 'TPQ Pagi' || lembaga === 'TPQ Sore') {
    if (all['TPQ']) return JSON.parse(JSON.stringify(all['TPQ']))
  }
  if (lembaga === 'TPQ' || lembaga === 'TPQ Pagi' || lembaga === 'TPQ Sore') {
    return JSON.parse(JSON.stringify(DEFAULT_SCHEMA_TPQ))
  }
  if (lembaga === 'Diniyah') {
    if (lembagaSekolah === 'SDI')
      return {
        perKelas: true,
        jenjang: ['I', 'II', 'III', 'IV', 'V', 'VI'].map((k) => ({
          kelas: k,
          mapel: JSON.parse(JSON.stringify(DEFAULT_DINIYAH_MAPEL))
        }))
      }
    if (lembagaSekolah === 'SMP')
      return {
        perKelas: true,
        jenjang: ['VII', 'VIII', 'IX'].map((k) => ({
          kelas: k,
          mapel: JSON.parse(JSON.stringify(DEFAULT_DINIYAH_MAPEL))
        }))
      }
    if (lembagaSekolah === 'SMA')
      return {
        perKelas: true,
        jenjang: ['X', 'XI', 'XII'].map((k) => ({
          kelas: k,
          mapel: JSON.parse(JSON.stringify(DEFAULT_DINIYAH_MAPEL))
        }))
      }
    return JSON.parse(JSON.stringify(DEFAULT_SCHEMA_DINIYAH_PER_KELAS))
  }
  if (lembaga === 'PTPT') return JSON.parse(JSON.stringify(DEFAULT_SCHEMA_PTPT))
  return JSON.parse(JSON.stringify(DEFAULT_SCHEMA_KOSONG))
}
