// useAbsensi — list absensi guru + santri realtime
// Phase 5.16/17 (v.39.0526)
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'

const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

export function useAbsensi() {
  const auth = useAuthStore()
  const absensi = ref([])
  const guruRaw = ref([])
  const santriRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  const unsubs = []

  // Filter state
  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const filterGuru = ref('')
  const filterShift = ref('')

  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  // Filter absensi sesuai bulan/tahun + filter UI
  const filteredAbsensi = computed(() => {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    let list = absensi.value.filter((a) => {
      const tgl = String(a.tanggal || '').substring(0, 7) // 'YYYY-MM'
      return tgl === ym
    })
    if (filterGuru.value) {
      list = list.filter((a) => String(a.guru_id || a.guruId) === String(filterGuru.value))
    }
    if (filterShift.value) {
      list = list.filter((a) => String(a.shift || '').toLowerCase() === filterShift.value)
    }
    return list.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
  })

  // Stats per bulan
  const stats = computed(() => {
    const total = filteredAbsensi.value.length
    const pagi = filteredAbsensi.value.filter((a) => a.shift === 'pagi').length
    const sore = filteredAbsensi.value.filter((a) => a.shift === 'sore').length
    const guruSet = new Set(filteredAbsensi.value.map((a) => a.guru_id || a.guruId))
    return { total, pagi, sore, guruActiveCount: guruSet.size }
  })

  // Group absensi by guru utk rekap
  const rekapPerGuru = computed(() => {
    const grouped = {}
    for (const a of filteredAbsensi.value) {
      const gid = String(a.guru_id || a.guruId || '')
      if (!grouped[gid]) {
        grouped[gid] = { guru_id: gid, total: 0, pagi: 0, sore: 0 }
      }
      grouped[gid].total++
      if (a.shift === 'pagi') grouped[gid].pagi++
      if (a.shift === 'sore') grouped[gid].sore++
    }
    return Object.values(grouped).sort((a, b) => b.total - a.total)
  })

  function getNamaGuru(id) {
    const g = guruRaw.value.find((x) => String(x.id) === String(id))
    return g ? g.nama : '(unknown)'
  }
  function getJkGuru(id) {
    const g = guruRaw.value.find((x) => String(x.id) === String(id))
    return g ? g.jk : ''
  }

  function getBulanLabel(m) {
    return BULAN[m - 1] || '-'
  }

  onMounted(() => {
    unsubs.push(
      subscribeColl('absensi', (docs) => {
        absensi.value = docs
        loading.value = false
      }),
      subscribeColl('guru', (docs) => {
        guruRaw.value = docs
      }),
      subscribeColl('santri', (docs) => {
        santriRaw.value = docs
      })
    )
  })

  onUnmounted(() => {
    for (const u of unsubs) {
      if (u) {
        try {
          u()
        } catch (e) {}
      }
    }
  })

  return {
    absensi,
    filteredAbsensi,
    rekapPerGuru,
    guruRaw,
    santriRaw,
    loading,
    error,
    selectedYear,
    selectedMonth,
    filterGuru,
    filterShift,
    stats,
    isFullAccess,
    getNamaGuru,
    getJkGuru,
    getBulanLabel,
    BULAN
  }
}
