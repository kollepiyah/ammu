// useAbsensiSantri — absensi santri sekolah realtime
// Phase 5.17 (v.43.0526) — collection `absensi_santri_sekolah`
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'

const BULAN = [
  'Januari','Februari','Maret','April','Mei','Juni',
  'Juli','Agustus','September','Oktober','November','Desember'
]

export function useAbsensiSantri() {
  const auth = useAuthStore()
  const absensi = ref([])
  const santriRaw = ref([])
  const loading = ref(true)
  const unsubs = []

  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const filterLembaga = ref('')
  const filterKelas = ref('')
  const filterStatus = ref('') // hadir / alfa / sakit / izin

  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem) ||
      s.role === 'guru' // guru juga bisa lihat absensi santri yang dia ampu
    )
  })

  // Filter absensi sesuai bulan/tahun + filter UI
  // v.21.25.0526: helper santri non-mukim (PP/Fullday) — Ma'had exclude
  const santriNonMukim = computed(() => santriRaw.value.filter((s) => s.is_mukim === false || s.is_fullday === true))

  const filteredAbsensi = computed(() => {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    let list = absensi.value.filter((a) => String(a.tanggal || '').substring(0, 7) === ym)
    if (filterStatus.value) {
      list = list.filter((a) => String(a.status || '').toLowerCase() === filterStatus.value.toLowerCase())
    }
    // v.21.25.0526: WAJIB filter ke santri non-mukim only (kyai spec issue #49)
    list = list.filter((a) => {
      const s = santriRaw.value.find((x) => String(x.id) === String(a.santri_id || a.santriId))
      if (!s) return false
      if (s.is_mukim === true && s.is_fullday !== true) return false
      if (filterLembaga.value && s.lembaga_sekolah !== filterLembaga.value && s.lembaga !== filterLembaga.value) return false
      if (filterKelas.value && s.kelas_sekolah !== filterKelas.value && s.kelas !== filterKelas.value) return false
      return true
    })
    return list.sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
  })

  const stats = computed(() => {
    const counts = { hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 }
    for (const a of filteredAbsensi.value) {
      const st = String(a.status || '').toLowerCase()
      if (st === 'hadir' || st === 'h') counts.hadir++
      else if (st === 'alfa' || st === 'a') counts.alfa++
      else if (st === 'sakit' || st === 's') counts.sakit++
      else if (st === 'izin' || st === 'i') counts.izin++
      counts.total++
    }
    return counts
  })

  // Group per santri (rekap)
  const rekapPerSantri = computed(() => {
    const grouped = {}
    for (const a of filteredAbsensi.value) {
      const sid = String(a.santri_id || a.santriId || '')
      if (!grouped[sid]) {
        grouped[sid] = { santri_id: sid, hadir: 0, alfa: 0, sakit: 0, izin: 0, total: 0 }
      }
      const st = String(a.status || '').toLowerCase()
      if (st === 'hadir' || st === 'h') grouped[sid].hadir++
      else if (st === 'alfa' || st === 'a') grouped[sid].alfa++
      else if (st === 'sakit' || st === 's') grouped[sid].sakit++
      else if (st === 'izin' || st === 'i') grouped[sid].izin++
      grouped[sid].total++
    }
    return Object.values(grouped).sort((a, b) => b.hadir - a.hadir)
  })

  function getNamaSantri(id) {
    const s = santriRaw.value.find((x) => String(x.id) === String(id))
    return s ? s.nama : '(unknown)'
  }
  function getSantriInfo(id) {
    return santriRaw.value.find((x) => String(x.id) === String(id))
  }
  function getBulanLabel(m) { return BULAN[m - 1] || '-' }

  onMounted(() => {
    unsubs.push(
      subscribeColl('absensi_santri_sekolah', (docs) => {
        absensi.value = docs
        loading.value = false
      }),
      subscribeColl('santri', (docs) => {
        santriRaw.value = docs
      })
    )
  })
  onUnmounted(() => {
    for (const u of unsubs) { if (u) { try { u() } catch (e) {} } }
  })

  return {
    absensi,
    filteredAbsensi,
    rekapPerSantri,
    santriRaw,
    santriNonMukim,
    loading,
    selectedYear,
    selectedMonth,
    filterLembaga,
    filterKelas,
    filterStatus,
    stats,
    isFullAccess,
    getNamaSantri,
    getSantriInfo,
    getBulanLabel,
    BULAN
  }
}
