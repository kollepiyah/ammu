// useLembaga — list lembaga real-time + filter + count derived dari guru/santri
// Phase 5.7 (v.35.0526)
// v.20.15.0526: Fix subscription — legacy simpan di master/lembaga doc (.list), bukan koleksi terpisah
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { subscribeDoc } from '@/services/firestore'
import { useCollectionsStore } from '@/stores/collections'
import { useAuthStore } from '@/stores/auth'
// v.100: urutan lembaga canonical = sumber tunggal di utils/santriSort
import { lembagaRank } from '@/utils/santriSort'

// v.21.10.0526: Lembaga hierarchy — group → variants (kyai spec final)
export const LEMBAGA_GROUPS = {
  // Qiraati group
  TPQ: {
    kepala_jabatan: 'Kepala TPQ',
    variants: ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT'],
    group: 'qiraati'
  },
  PTPT: { kepala_jabatan: 'PJ PTPT', variants: ['PTPT'], group: 'qiraati' },
  PPPH: { kepala_jabatan: 'PJ PPPH', variants: ['PPPH'], group: 'qiraati' },
  // Sekolah group
  TK: { kepala_jabatan: 'Kepala TK', variants: ['TK'], group: 'sekolah' },
  SDI: { kepala_jabatan: 'Kepala SDI', variants: ['SDI'], group: 'sekolah' },
  PKBM: { kepala_jabatan: 'Kepala PKBM', variants: ['PKBM'], group: 'sekolah' },
  // Mahad (asrama)
  "Ma'had": { kepala_jabatan: "Kepala Ma'had", variants: ["Ma'had"], group: 'mahad' },
  // Non-lembaga (pegawai non-guru)
  Yayasan: { kepala_jabatan: 'PJ Administrasi', variants: ['Yayasan'], group: 'non-lembaga' },
  'Sarana Prasarana': {
    kepala_jabatan: 'Koordinator Sarana',
    variants: ['Sarana Prasarana'],
    group: 'non-lembaga'
  }
}

// Reverse lookup: nama variant → group key
export const VARIANT_TO_GROUP = (() => {
  const map = {}
  for (const [groupKey, info] of Object.entries(LEMBAGA_GROUPS)) {
    for (const v of info.variants) map[v] = groupKey
  }
  return map
})()

// Helper: detect group (family key, mis. 'TPQ') dari nama lembaga
export function getLembagaGroup(namaLembaga) {
  return VARIANT_TO_GROUP[namaLembaga] || null
}

// v.100 Batch12: semua nama lembaga KANONIK (dari variants LEMBAGA_GROUPS) — sumber tunggal.
export const LEMBAGA_CANON_ALL = (() => {
  const out = []
  for (const info of Object.values(LEMBAGA_GROUPS)) {
    for (const v of info.variants) if (!out.includes(v)) out.push(v)
  }
  return out
})()
function _lkey(s) {
  return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '')
}
// alias umum (tulisan beda) → kanonik. SMP/SMA = sub-tier PKBM → dipetakan ke 'PKBM'.
const _LEMBAGA_ALIAS = {
  p3h: 'PPPH',
  praptpt: 'Pra PTPT',
  smp: 'PKBM',
  sma: 'PKBM',
  sd: 'SDI',
  sdislam: 'SDI',
  mahad: "Ma'had",
  saranaprasarana: 'Sarana Prasarana',
  sarpras: 'Sarana Prasarana'
}
/**
 * v.100 Batch12: auto-deteksi nama lembaga ke bentuk KANONIK app.
 *   "PRA PTPT" / "pra-ptpt" → "Pra PTPT"; "tpq pagi" → "TPQ Pagi"; "SMP" → "PKBM"; dst.
 *   Tak dikenal → kembalikan apa adanya (trim) supaya tak merusak nilai lain.
 */
export function canonLembaga(input) {
  const raw = String(input == null ? '' : input).trim()
  if (!raw) return ''
  const k = _lkey(raw)
  if (!k) return raw
  for (const c of LEMBAGA_CANON_ALL) {
    if (_lkey(c) === k) return c // cocok langsung ke kanonik
  }
  if (_LEMBAGA_ALIAS[k]) return _LEMBAGA_ALIAS[k]
  return raw
}

// v.86.0526: broad group ('qiraati' | 'sekolah' | 'mahad' | 'non-lembaga') dari nama lembaga.
//   Terima variant ('TPQ Sore' → qiraati), family key ('TPQ' → qiraati), atau label broad langsung ('Qiraati').
export function getLembagaBroadGroup(namaLembaga) {
  if (!namaLembaga) return null
  const fam = VARIANT_TO_GROUP[namaLembaga] // family key kalau ini variant
  if (fam && LEMBAGA_GROUPS[fam]) return LEMBAGA_GROUPS[fam].group
  if (LEMBAGA_GROUPS[namaLembaga]) return LEMBAGA_GROUPS[namaLembaga].group // ini family key
  const low = String(namaLembaga).toLowerCase().trim()
  if (['qiraati', 'sekolah', 'mahad', 'non-lembaga'].includes(low)) return low // label broad langsung
  return null
}

// v.86.0526: cek apakah Kepala/PJ (lembaga = userLembaga) berhak melihat target_lembaga.
//   - userLembaga variant/family (mis 'TPQ Sore' / 'TPQ') → scope SE-FAMILY (TPQ Pagi+Sore+Pra PTPT).
//   - userLembaga label broad (mis 'Qiraati') → scope SE-BROAD-GROUP (semua qiraati).
//   Dipakai untuk scoping Kepala Lembaga di Data Santri + view akademik (kyai: "Kepala = lembaganya").
export function lembagaScopeMatches(userLembaga, targetLembaga) {
  if (!userLembaga || !targetLembaga) return false
  if (String(userLembaga).toLowerCase().trim() === String(targetLembaga).toLowerCase().trim()) return true
  const uFam = getLembagaGroup(userLembaga) // family key kalau userLembaga = variant
  if (uFam) return getLembagaGroup(targetLembaga) === uFam // scope se-family
  // userLembaga bukan variant → mungkin label broad ('Qiraati'/'Sekolah') atau family key
  const uBroad = getLembagaBroadGroup(userLembaga)
  if (uBroad) return getLembagaBroadGroup(targetLembaga) === uBroad
  return false
}

// v.21.71.0526: PKBM sub-tier helper — SMP (VII-IX) + SMA (X-XII)
export const PKBM_SUB_TIERS = {
  SMP: ['VII', 'VIII', 'IX'],
  SMA: ['X', 'XI', 'XII']
}

// Get sub-tier (SMP/SMA) dari nama kelas PKBM
// v.99: ROBUST — terima Romawi (VII..XII), Arab (7..12), prefix "Kelas/Kls/Tingkat/SMP/SMA", case-insensitive.
export function getPkbmSubTier(kelas) {
  if (kelas === null || kelas === undefined || kelas === '') return null
  let k = String(kelas).toUpperCase().trim()
  k = k.replace(/^(KELAS|KLS|TINGKAT)\s+/, '').replace(/^(SMP|SMA)\s*[-\s]*/, '').trim()
  const arab = { '7': 'VII', '8': 'VIII', '9': 'IX', '10': 'X', '11': 'XI', '12': 'XII' }
  if (arab[k]) k = arab[k]
  if (PKBM_SUB_TIERS.SMP.includes(k)) return 'SMP'
  if (PKBM_SUB_TIERS.SMA.includes(k)) return 'SMA'
  return null
}

// Label kelas PKBM dengan prefix sub-tier (e.g. "SMP - Kelas VII")
export function formatPkbmKelas(kelas) {
  const tier = getPkbmSubTier(kelas)
  return tier ? tier + ' - Kelas ' + kelas : 'Kelas ' + kelas
}

// Smart label kelas — auto-detect PKBM context. Returns formatted label per lembaga:
//   PKBM + kelas VII-XII → "SMP - Kelas VII" / "SMA - Kelas X"
//   PKBM + kelas lain → "Kelas {x}"
//   Lembaga lain → kelas as-is (e.g. "Jilid 1A", "I", "TK A")
export function formatKelasLabel(lembaga, kelas) {
  if (!kelas) return ''
  if (String(lembaga || '').toUpperCase() === 'PKBM') return formatPkbmKelas(kelas)
  return String(kelas)
}

// v.21.10.0526: Default lembaga seed (match kyai spec — TPQ Pagi/Sore tetap variants, + Ma'had + Sarana Prasarana)
export const DEFAULT_LEMBAGA_SEED = [
  { lembaga: 'Yayasan', group: 'non-lembaga', kelas: [] },
  { lembaga: 'Sarana Prasarana', group: 'non-lembaga', kelas: [] },
  {
    lembaga: 'TPQ Pagi',
    group: 'qiraati',
    tpq_group: 'TPQ',
    shift: 'pagi',
    kelas: [
      'Jilid 1A',
      'Jilid 1B',
      'Jilid 1C',
      'Jilid 2A',
      'Jilid 2B',
      'Jilid 3A',
      'Jilid 3B',
      'Jilid 4A',
      'Jilid 4B',
      'Jilid 5A',
      'Jilid 5B',
      'KPI',
      'Persiapan Khotaman'
    ]
  },
  {
    lembaga: 'TPQ Sore',
    group: 'qiraati',
    tpq_group: 'TPQ',
    shift: 'sore',
    kelas: [
      'Jilid 1A',
      'Jilid 1B',
      'Jilid 1C',
      'Jilid 2A',
      'Jilid 2B',
      'Jilid 3A',
      'Jilid 3B',
      'Jilid 4A',
      'Jilid 4B',
      'Jilid 5A',
      'Jilid 5B',
      'KPI',
      'Persiapan Khotaman'
    ]
  },
  {
    lembaga: 'Pra PTPT',
    group: 'qiraati',
    tpq_group: 'TPQ',
    kelas: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5']
  },
  {
    lembaga: 'PTPT',
    group: 'qiraati',
    kelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6']
  },
  { lembaga: 'PPPH', group: 'qiraati', kelas: ['Level 1', 'Level 2', 'Level 3', 'Level 4'] },
  { lembaga: "Ma'had", group: 'mahad', kelas: [] },
  { lembaga: 'TK', group: 'sekolah', kelas: ['TK A', 'TK B'] },
  { lembaga: 'SDI', group: 'sekolah', kelas: ['I', 'II', 'III', 'IV', 'V', 'VI'] },
  { lembaga: 'PKBM', group: 'sekolah', kelas: ['VII', 'VIII', 'IX', 'X', 'XI', 'XII'] }
]

export function useLembaga() {
  const auth = useAuthStore()
  const collections = useCollectionsStore()
  collections.ensure('guru', 'santri')
  const { guru: guruRaw, santri: santriRaw } = storeToRefs(collections)
  const lembagaRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsubLembaga = null

  const search = ref('')
  const filterTipe = ref('')

  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  const lembaga = computed(() => {
    if (!isFullAccess.value) return []
    let list = lembagaRaw.value.filter(Boolean)

    // Search
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        (l) =>
          String(l.lembaga || '')
            .toLowerCase()
            .includes(kw) ||
          String(l.tipe || '')
            .toLowerCase()
            .includes(kw)
      )
    }
    // Tipe filter (Qiraati / Formal)
    if (filterTipe.value) {
      list = list.filter((l) => (l.tipe || 'Qiraati') === filterTipe.value)
    }

    // Sort: urutan canonical (lembagaRank) → nama
    return list.sort((a, b) => {
      const oa = lembagaRank(a.lembaga)
      const ob = lembagaRank(b.lembaga)
      if (oa !== ob) return oa - ob
      return String(a.lembaga || '').localeCompare(String(b.lembaga || ''), 'id')
    })
  })

  // Count guru/santri per-lembaga
  function getCounts(namaLembaga) {
    const guruCount = guruRaw.value.filter((g) => {
      const aktif =
        String(g.status || 'Aktif')
          .toLowerCase()
          .trim() === 'aktif'
      return aktif && (g.lembaga === namaLembaga || g.lembaga_sekolah === namaLembaga)
    }).length
    const santriCount = santriRaw.value.filter(
      (s) => s.aktif !== false && (s.lembaga === namaLembaga || s.lembaga_sekolah === namaLembaga)
    ).length
    return { guru: guruCount, santri: santriCount }
  }

  const stats = computed(() => ({
    total: lembagaRaw.value.length,
    qiraati: lembagaRaw.value.filter((l) => (l.tipe || 'Qiraati') === 'Qiraati').length,
    formal: lembagaRaw.value.filter((l) => l.tipe === 'Formal').length
  }))

  onMounted(() => {
    // v.20.15.0526: Subscribe master/lembaga doc (legacy schema: { list: [...] })
    // Fallback ke subscribeColl('lembaga') kalau ada koleksi terpisah (Vue legacy override)
    unsubLembaga = subscribeDoc('master', 'lembaga', (doc) => {
      lembagaRaw.value = Array.isArray(doc?.list) ? doc.list : []
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubLembaga) {
      try { unsubLembaga() } catch (e) {}
    }
  })

  return {
    lembaga,
    lembagaRaw,
    loading,
    error,
    search,
    filterTipe,
    stats,
    isFullAccess,
    getCounts
  }
}
