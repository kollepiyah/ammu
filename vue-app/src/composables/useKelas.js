// useKelas — derive list kelas dari nested array `lembaga.kelas[]`
// Phase 5.8 (v.36.0526)
// Setiap lembaga punya `kelas: ['I', 'II', ...]`. Kelas adalah flat list dari semua lembaga.
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'

export function useKelas() {
  const auth = useAuthStore()
  const lembagaRaw = ref([])
  const santriRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsubLembaga = null
  let unsubSantri = null

  const search = ref('')
  const filterLembaga = ref('')

  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  // Flat kelas list: [{ lembaga, kelas, santriCount }]
  const kelasItems = computed(() => {
    if (!isFullAccess.value) return []
    const items = []
    for (const l of lembagaRaw.value) {
      const kelasArr = Array.isArray(l.kelas) ? l.kelas : []
      for (const k of kelasArr) {
        items.push({
          lembaga: l.lembaga,
          kelas: k,
          tipe: l.tipe || 'Qiraati'
        })
      }
    }
    // Apply filters
    let filtered = items
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      filtered = filtered.filter(
        (i) =>
          String(i.kelas || '').toLowerCase().includes(kw) ||
          String(i.lembaga || '').toLowerCase().includes(kw)
      )
    }
    if (filterLembaga.value) {
      filtered = filtered.filter((i) => i.lembaga === filterLembaga.value)
    }
    // Sort: lembaga → kelas
    return filtered.sort((a, b) => {
      const la = String(a.lembaga || '')
      const lb = String(b.lembaga || '')
      if (la !== lb) return la.localeCompare(lb, 'id')
      return String(a.kelas || '').localeCompare(String(b.kelas || ''), 'id', { numeric: true })
    })
  })

  // Group by lembaga
  const groupedByLembaga = computed(() => {
    const groups = {}
    for (const item of kelasItems.value) {
      if (!groups[item.lembaga]) groups[item.lembaga] = []
      groups[item.lembaga].push(item)
    }
    return groups
  })

  // Count santri per kelas
  function getSantriCount(lembagaName, kelas) {
    return santriRaw.value.filter(
      (s) =>
        s.aktif !== false &&
        ((s.lembaga === lembagaName && s.kelas === kelas) ||
          (s.lembaga_sekolah === lembagaName && s.kelas_sekolah === kelas))
    ).length
  }

  const stats = computed(() => {
    const totalKelas = kelasItems.value.length
    const lembagaSet = new Set(kelasItems.value.map((i) => i.lembaga))
    return {
      total: totalKelas,
      lembagaCount: lembagaSet.size,
      santriTotal: santriRaw.value.filter((s) => s.aktif !== false).length
    }
  })

  onMounted(() => {
    // v.20.15.0526: master/lembaga doc match legacy
    unsubLembaga = subscribeDoc('master', 'lembaga', (doc) => {
      lembagaRaw.value = Array.isArray(doc?.list) ? doc.list : []
      loading.value = false
    })
    unsubSantri = subscribeColl('santri', (docs) => {
      santriRaw.value = docs
    })
  })

  onUnmounted(() => {
    for (const u of [unsubLembaga, unsubSantri]) {
      if (u) { try { u() } catch (e) {} }
    }
  })

  return {
    kelasItems,
    groupedByLembaga,
    lembagaRaw,
    loading,
    error,
    search,
    filterLembaga,
    stats,
    isFullAccess,
    getSantriCount
  }
}
