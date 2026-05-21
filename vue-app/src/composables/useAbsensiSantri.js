// v.21.27.0526 recovery stub — useAbsensiSantri composable
// Original file truncated by Windows mount; this is minimal valid placeholder.
import { ref, computed } from 'vue'

export function useAbsensiSantri() {
  const santriList = ref([])
  const absensiList = ref([])
  const rekapList = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const selectedLembaga = ref('')
  const selectedKelas = ref('')
  const selectedStatus = ref('')
  const selectedDay = ref(1)

  const hadirCount = computed(() => rekapList.value.reduce((s, r) => s + (r.hadir || 0), 0))
  const alfaCount = computed(() => rekapList.value.reduce((s, r) => s + (r.alfa || 0), 0))
  const sakitCount = computed(() => rekapList.value.reduce((s, r) => s + (r.sakit || 0), 0))
  const izinCount = computed(() => rekapList.value.reduce((s, r) => s + (r.izin || 0), 0))

  const uniqueLembaga = computed(() => [...new Set(santriList.value.map(s => s.lembaga).filter(Boolean))])
  const uniqueKelas = computed(() => [...new Set(santriList.value.map(s => s.kelas).filter(Boolean))])

  function getNamaSantri(id) {
    const s = santriList.value.find(x => String(x.id) === String(id))
    return s?.nama || '(unknown)'
  }

  return {
    santriList, absensiList, rekapList, loading, error,
    selectedYear, selectedMonth, selectedLembaga, selectedKelas, selectedStatus, selectedDay,
    statusOptions: ['H','A','S','I'],
    hadirCount, alfaCount, sakitCount, izinCount,
    uniqueLembaga, uniqueKelas,
    getNamaSantri
  }
}
