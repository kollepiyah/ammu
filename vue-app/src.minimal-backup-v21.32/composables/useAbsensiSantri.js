// useAbsensiSantri — composable absensi santri non-mukim bulanan
// v.21.28.0526 restore — full filter non-mukim + rekap + getNamaSantri
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'

export function useAbsensiSantri() {
  const santriList = ref([])
  const absensiList = ref([])
  const loading = ref(true)
  const error = ref(null)

  const _now = new Date()
  const selectedYear = ref(_now.getFullYear())
  const selectedMonth = ref(_now.getMonth() + 1)
  const selectedLembaga = ref('')
  const selectedKelas = ref('')
  const selectedStatus = ref('')
  const selectedDay = ref(1)
  const statusOptions = ['H', 'A', 'S', 'I']

  let unsubSantri = null
  let unsubAbsensi = null

  // v.21.28.0526: Filter santri non-mukim ONLY (is_mukim===false atau is_fullday===true).
  // Ma'had (is_mukim===true) excluded — pakai Kegiatan Pesantren.
  const santriNonMukim = computed(() =>
    santriList.value.filter(
      (s) => s.aktif !== false && (s.is_mukim === false || s.is_fullday === true)
    )
  )

  // Filter absensi by periode + lembaga + kelas
  const filteredAbsensi = computed(() => {
    let list = absensiList.value.filter((a) => {
      if (!a.tanggal) return false
      const d = a.tanggal instanceof Date ? a.tanggal : new Date(a.tanggal)
      if (isNaN(d.getTime())) return false
      return d.getFullYear() === selectedYear.value && d.getMonth() + 1 === selectedMonth.value
    })
    if (selectedLembaga.value)
      list = list.filter(
        (a) => String(a.lembaga || '').toLowerCase() === selectedLembaga.value.toLowerCase()
      )
    if (selectedKelas.value)
      list = list.filter((a) => String(a.kelas || '') === selectedKelas.value)
    if (selectedStatus.value)
      list = list.filter(
        (a) => String(a.status || '').toUpperCase() === selectedStatus.value.toUpperCase()
      )
    return list
  })

  // Rekap per santri: { santri_id, nama, lembaga, kelas, hadir, alfa, sakit, izin, total }
  const rekapList = computed(() => {
    const map = new Map()
    // Initialize from santri (supaya semua tampil walau belum ada absen)
    for (const s of santriNonMukim.value) {
      const sid = String(s.id)
      if (
        selectedLembaga.value &&
        String(s.lembaga || '').toLowerCase() !== selectedLembaga.value.toLowerCase()
      )
        continue
      if (selectedKelas.value && String(s.kelas || '') !== selectedKelas.value) continue
      map.set(sid, {
        santri_id: sid,
        nama: s.nama || '(unknown)',
        lembaga: s.lembaga || '',
        kelas: s.kelas || '',
        hadir: 0,
        alfa: 0,
        sakit: 0,
        izin: 0,
        total: 0
      })
    }
    // Count from absensi
    for (const a of filteredAbsensi.value) {
      const sid = String(a.santri_id || '')
      if (!sid) continue
      let r = map.get(sid)
      if (!r) {
        // Orphan: santri_id ada di absensi tapi tidak di santriList
        r = {
          santri_id: sid,
          nama: a.nama_cache || '(unknown)',
          lembaga: a.lembaga || '',
          kelas: a.kelas || '',
          hadir: 0,
          alfa: 0,
          sakit: 0,
          izin: 0,
          total: 0
        }
        map.set(sid, r)
      }
      const st = String(a.status || '').toUpperCase()
      if (st === 'H') r.hadir++
      else if (st === 'A') r.alfa++
      else if (st === 'S') r.sakit++
      else if (st === 'I') r.izin++
      r.total++
    }
    return [...map.values()].sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
  })

  // Totals
  const hadirCount = computed(() => rekapList.value.reduce((s, r) => s + r.hadir, 0))
  const alfaCount = computed(() => rekapList.value.reduce((s, r) => s + r.alfa, 0))
  const sakitCount = computed(() => rekapList.value.reduce((s, r) => s + r.sakit, 0))
  const izinCount = computed(() => rekapList.value.reduce((s, r) => s + r.izin, 0))

  // Unique lembaga + kelas (untuk filter dropdown)
  const uniqueLembaga = computed(() =>
    [...new Set(santriNonMukim.value.map((s) => s.lembaga).filter(Boolean))].sort()
  )
  const uniqueKelas = computed(() => {
    const set = new Set()
    for (const s of santriNonMukim.value) {
      if (
        selectedLembaga.value &&
        String(s.lembaga || '').toLowerCase() !== selectedLembaga.value.toLowerCase()
      )
        continue
      if (s.kelas) set.add(s.kelas)
    }
    return [...set].sort()
  })

  function getNamaSantri(id) {
    const s = santriList.value.find((x) => String(x.id) === String(id))
    return s?.nama || '(unknown)'
  }

  onMounted(() => {
    unsubSantri = subscribeColl('santri', (docs) => {
      santriList.value = docs
    })
    unsubAbsensi = subscribeColl('absensi_bulanan', (docs) => {
      absensiList.value = docs
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubSantri) {
      try {
        unsubSantri()
      } catch (e) {}
    }
    if (unsubAbsensi) {
      try {
        unsubAbsensi()
      } catch (e) {}
    }
  })

  return {
    santriList,
    absensiList,
    santriNonMukim,
    filteredAbsensi,
    rekapList,
    loading,
    error,
    selectedYear,
    selectedMonth,
    selectedLembaga,
    selectedKelas,
    selectedStatus,
    selectedDay,
    statusOptions,
    hadirCount,
    alfaCount,
    sakitCount,
    izinCount,
    uniqueLembaga,
    uniqueKelas,
    getNamaSantri
  }
}
