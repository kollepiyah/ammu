// v.64.0526: Port default schema Kartu Kenaikan dari legacy index.html line 23459+
// Schema per lembaga: { itemHeader, kelasList: [{ id, label, items: [{id,label}], ceremonial: bool }] }

function _buildJuzList(start, end) {
  const arr = []
  for (let i = start; i <= end; i++) {
    arr.push({ id: 'juz_' + i, label: 'Juz ' + i })
  }
  return arr
}

export const DEFAULT_KARTU_KENAIKAN_PTPT = {
  itemHeader: 'Juz',
  kelasList: [
    { id: 'kelas_1', label: 'Kelas 1', items: _buildJuzList(1, 5), ceremonial: true },
    { id: 'kelas_2', label: 'Kelas 2', items: _buildJuzList(6, 10), ceremonial: true },
    { id: 'kelas_3', label: 'Kelas 3', items: _buildJuzList(11, 15), ceremonial: true },
    { id: 'kelas_4', label: 'Kelas 4', items: _buildJuzList(16, 20), ceremonial: true },
    { id: 'kelas_5', label: 'Kelas 5', items: _buildJuzList(21, 25), ceremonial: true },
    { id: 'kelas_6', label: 'Kelas 6', items: _buildJuzList(26, 30), ceremonial: true }
  ]
}

export const DEFAULT_KARTU_KENAIKAN_TPQ = {
  itemHeader: 'Jilid',
  kelasList: [
    { id: 'jilid_1', label: 'Jilid 1', items: [{ id: '1A', label: '1A' }, { id: '1B', label: '1B' }], ceremonial: false },
    { id: 'jilid_2', label: 'Jilid 2', items: [{ id: '2A', label: '2A' }, { id: '2B', label: '2B' }], ceremonial: false },
    { id: 'jilid_3', label: 'Jilid 3', items: [{ id: '3A', label: '3A' }, { id: '3B', label: '3B' }], ceremonial: false },
    { id: 'jilid_4', label: 'Jilid 4', items: [{ id: '4A', label: '4A' }, { id: '4B', label: '4B' }], ceremonial: false },
    { id: 'jilid_5', label: 'Jilid 5', items: [{ id: '5A', label: '5A' }, { id: '5B', label: '5B' }], ceremonial: false },
    { id: 'kpi', label: 'KPI', items: [{ id: 'kpi_1', label: 'IMTAS' }], ceremonial: false }
  ]
}

export const DEFAULT_KARTU_KENAIKAN_PRA_PTPT = {
  itemHeader: 'Khotam',
  kelasList: [
    { id: 'lvl_1', label: 'Level 1 (½ Juz)', items: [{ id: 'kh_I', label: 'I' }, { id: 'kh_II', label: 'II' }, { id: 'kh_III', label: 'III' }], ceremonial: false },
    { id: 'lvl_2', label: 'Level 2 (1 Juz)', items: [{ id: 'kh_I', label: 'I' }, { id: 'kh_II', label: 'II' }, { id: 'kh_III', label: 'III' }], ceremonial: false },
    { id: 'lvl_3', label: 'Level 3 (1½ Juz)', items: [{ id: 'kh_I', label: 'I' }, { id: 'kh_II', label: 'II' }, { id: 'kh_III', label: 'III' }], ceremonial: false },
    { id: 'lvl_4', label: 'Level 4 (2 Juz)', items: [{ id: 'kh_I', label: 'I' }, { id: 'kh_II', label: 'II' }, { id: 'kh_III', label: 'III' }], ceremonial: false },
    { id: 'lvl_5', label: 'Level 5 (3 Juz)', items: [{ id: 'kh_I', label: 'I' }, { id: 'kh_II', label: 'II' }, { id: 'kh_III', label: 'III' }, { id: 'kh_IV', label: 'IV' }, { id: 'kh_V', label: 'V' }], ceremonial: false }
  ]
}

// v.72.11.0526: P3H rename → PPPH
export const DEFAULT_KARTU_KENAIKAN_PPPH = {
  itemHeader: 'Tahap',
  kelasList: [
    { id: 'thp_1', label: 'Tahap 1', items: [{ id: 't1', label: '1' }, { id: 't2', label: '2' }], ceremonial: false }
  ]
}
// Backward compat alias
export const DEFAULT_KARTU_KENAIKAN_P3H = DEFAULT_KARTU_KENAIKAN_PPPH

/**
 * Get schema kartu kenaikan untuk lembaga tertentu.
 * Cek dulu di settings.kartuKenaikanSchema[lembaga] (override admin),
 * fallback ke default per lembaga.
 *
 * @param {string} lembaga - 'TPQ Pagi' | 'TPQ Sore' | 'Pra PTPT' | 'PTPT' | 'PPPH'
 * @param {Object} settings - settings object dari useSettingsStore
 * @returns {Object} { itemHeader, kelasList }
 */
export function getKartuKenaikanSchema(lembaga, settings) {
  const all = settings?.kartuKenaikanSchema || {}
  if (all[lembaga]) return JSON.parse(JSON.stringify(all[lembaga]))
  if (lembaga === 'PTPT') return JSON.parse(JSON.stringify(DEFAULT_KARTU_KENAIKAN_PTPT))
  if (lembaga === 'TPQ' || lembaga === 'TPQ Pagi' || lembaga === 'TPQ Sore') return JSON.parse(JSON.stringify(DEFAULT_KARTU_KENAIKAN_TPQ))
  if (lembaga === 'Pra PTPT') return JSON.parse(JSON.stringify(DEFAULT_KARTU_KENAIKAN_PRA_PTPT))
  if (lembaga === 'PPPH' || lembaga === 'P3H') return JSON.parse(JSON.stringify(DEFAULT_KARTU_KENAIKAN_PPPH))
  return { itemHeader: 'Item', kelasList: [] }
}

/**
 * Get KOP header untuk kartu kenaikan per lembaga (judul, subjudul, alamat).
 * Fallback ke settings global (kopLine1-4 atau judul utama).
 */
export function getKopKartuLembaga(lembaga, settings) {
  const kkKop = settings?.kartuKenaikanKop?.[lembaga] || {}
  return {
    judul: kkKop.judul || 'KONTROL KENAIKAN ' + (lembaga === 'TPQ' ? 'JILID' : 'KELAS'),
    subjudul: kkKop.subjudul || settings?.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM',
    alamat: kkKop.alamat || settings?.alamat || ''
  }
}

// v.72.11.0526: Urutan baru per kyai spec — TPQ Pagi → TPQ Sore → Pra PTPT → PTPT → PPPH
export const LEMBAGA_KENAIKAN_LIST = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']
