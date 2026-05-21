// useLembaga — list lembaga real-time + filter + count derived dari guru/santri
// Phase 5.7 (v.35.0526)
// v.20.15.0526: Fix subscription — legacy simpan di master/lembaga doc (.list), bukan koleksi terpisah
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'

// v.21.10.0526: Lembaga hierarchy — group → variants (kyai spec final)
export const LEMBAGA_GROUPS = {
  // Qiraati group
  TPQ: { kepala_jabatan: 'Kepala TPQ', variants: ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT'], group: 'qiraati' },
  PTPT: { kepala_jabatan: 'PJ PTPT', variants: ['PTPT'], group: 'qiraati' },
  PPPH: { kepala_jabatan: 'PJ PPPH', variants: ['PPPH'], group: 'qiraati' },
  // Sekolah group
  TK: { kepala_jabatan: 'Kepala TK', variants: ['TK A', 'TK B'], group: 'sekolah' },
  SDI: { kepala_jabatan: 'Kepala SDI', variants: ['SDI'], group: 'sekolah' },
  PKBM: { kepala_jabatan: 'Kepala PKBM', variants: ['PKBM'], group: 'sekolah' },
  // Mahad (asrama)
  "Ma'had": { kepala_jabatan: "Kepala Ma'had", variants: ["Ma'had"], group: 'mahad' },
  // Non-lembaga (pegawai non-guru)
  Yayasan: { kepala_jabatan: 'PJ Administrasi', variants: ['Yayasan'], group: 'non-lembaga' },
  'Sarana Prasarana': { kepala_jabatan: 'Koordinator Sarana', variants: ['Sarana Prasarana'], group: 'non-lembaga' }
}

// Reverse lookup: nama variant → group key
export const VARIANT_TO_GROUP = (() => {
  const map = {}
  for (const [groupKey, info] of Object.entries(LEMBAGA_GROUPS)) {
    for (const v of info.variants) map[v] = groupKey
  }
  return map
})()

// Helper: detect group dari nama lembaga
export function getLembagaGroup(namaLembaga) {
  return VARIANT_TO_GROUP[namaLembaga] || null
}

// Helper: visibility scoping — admin/super_admin bypass, kepala lembaga see all, guru see kelas dia
export function canSee(user, target_lembaga, target_kelas = null) {
  if (!user) return false
  // Override: admin/super_admin
  if (['admin', 'super_admin'].includes(user.role_sistem)) return true
  if (user.id === 'admin') return true
  // Kepala Lembaga: semua data di lembaga-nya
  const refs = user.lembaga_refs || []
  for (const ref of refs) {
    if (ref.jabatan === 'Kepala Lembaga' && (ref.lembaga === target_lembaga || ref.group === getLembagaGroup(target_lembaga))) {
      return true
    }
    // Guru biasa: hanya kelas yang dia ajar
    if (ref.lembaga === target_lembaga) {
      if (!target_kelas) return true
      if ((ref.kelas_diajar || []).includes(target_kelas)) return true
    }
  }
  // Legacy back-compat: kalau guru.lembaga match
  if (user.lembaga === target_lembaga && !target_kelas) return true
  return false
}

// v.21.10.0526: Default lembaga seed (match kyai spec — TPQ Pagi/Sore tetap variants, + Ma'had + Sarana Prasarana)
export const DEFAULT_LEMBAGA_SEED = [
  { lembaga: 'Yayasan', group: 'non-lembaga', kelas: [] },
  { lembaga: 'Sarana Prasarana', group: 'non-lembaga', kelas: [] },
  { lembaga: 'TPQ Pagi', group: 'qiraati', tpq_group: 'TPQ', shift: 'pagi', kelas: ['Jilid 1', 'Jilid 2', 'Jilid 3', 'Jilid 4', 'Jilid 5', 'KPI', 'Persiapan Khotaman'] },
  { lembaga: 'TPQ Sore', group: 'qiraati', tpq_group: 'TPQ', shift: 'sore', kelas: ['Jilid 1', 'Jilid 2', 'Jilid 3', 'Jilid 4', 'Jilid 5', 'KPI', 'Persiapan Khotaman'] },
  { lembaga: 'Pra PTPT', group: 'qiraati', tpq_group: 'TPQ', kelas: ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'] },
  { lembaga: 'PTPT', group: 'qiraati', kelas: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'] },
  { lembaga: 'PPPH', group: 'qiraati', kelas: [] },
  { lembaga: "Ma'had", group: 'mahad', kelas: [] },
  { lembaga: 'TK A', group: 'sekolah', tk_group: 'TK', kelas: [] },
  { lembaga: 'TK B', group: 'sekolah', tk_group: 'TK', kelas: [] },
  { lembaga: 'SDI', group: 'sekolah', kelas: ['I', 'II', 'III', 'IV', 'V', 'VI'] },
  { lembaga: 'PKBM', group: 'sekolah', kelas: ['VII', 'VIII', 'IX', 'X', 'XI', 'XII'] }
]

const LEMBAGA_ORDER = {
  Yayasan: 0,
  'TPQ Pagi': 1,
  'TPQ Sore': 2,
  'Pra PTPT': 3,
  PTPT: 4,
  PPPH: 5,
  "Ma'had": 6,
  TK: 7,
  'TK A': 8,
  'TK B': 9,
  SDI: 10,
  PKBM: 11,
  'Sarana Prasarana': 12
}

export function useLembaga() {
  const auth = useAuthStore()
  const lembagaRaw = ref([])
  const guruRaw = ref([])
  const santriRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsubLembaga = null
  let unsubGuru = null
  let unsubSantri = null

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
          String(l.lembaga || '').toLowerCase().includes(kw) ||
          String(l.tipe || '').toLowerCase().includes(kw)
      )
    }
    // Tipe filter (Qiraati / Formal)
    if (filterTipe.value) {
      list = list.filter((l) => (l.tipe || 'Qiraati') === filterTipe.value)
    }

    // Sort: predefined order → nama
    return list.sort((a, b) => {
      const oa = LEMBAGA_ORDER[a.lembaga] !== undefined ? LEMBAGA_ORDER[a.lembaga] : 99
      const ob = LEMBAGA_ORDER[b.lembaga] !== undefined ? LEMBAGA_ORDER[b.lembaga] : 99
      if (oa !== ob) return oa - ob
      return String(a.lembaga || '').localeCompare(String(b.lembaga || ''), 'id')
    })
  })

  // Count guru/santri per-lembaga
  function getCounts(namaLembaga) {
    const guruCount = guruRaw.value.filter((g) => {
      const aktif = String(g.status || 'Aktif').toLowerCase().trim() === 'aktif'
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
    unsubGuru = subscribeColl('guru', (docs) => {
      guruRaw.value = docs
    })
    unsubSantri = subscribeColl('santri', (docs) => {
      santriRaw.value = docs
    })
  })

  onUnmounted(() => {
    for (const u of [unsubLembaga, unsubGuru, unsubSantri]) {
      if (u) { try { u() } catch (e) {} }
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
