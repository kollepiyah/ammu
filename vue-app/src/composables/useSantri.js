// useSantri — list santri real-time + role-based filter + search
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
// v.21.10.0526: Import LEMBAGA_GROUPS helpers untuk lembaga_refs derivation + canSee scoping
import { getLembagaGroup, canSee } from './useLembaga'
// v.21.86.0527: Sort konsisten lembaga→kelas→nama (berlaku di semua halaman via composable)
import { sortSantri } from '@/utils/santriSort'

// Helper: derive santri.lembaga_refs dari legacy fields
// Santri reguler: 1 ref. Santri mukim: 3 refs (Ma'had + Qiraati + Sekolah).
// Santri fullday: 1 ref + flag is_fullday.
function deriveSantriLembagaRefs(s) {
  if (Array.isArray(s.lembaga_refs) && s.lembaga_refs.length > 0) return s.lembaga_refs
  const refs = []
  if (s.lembaga) {
    refs.push({ group: getLembagaGroup(s.lembaga) || 'qiraati', lembaga: s.lembaga, shift: s.shift_qiraati || null, kelas: s.kelas || null })
  }
  if (s.lembaga_sekolah && s.lembaga_sekolah !== s.lembaga) {
    refs.push({ group: getLembagaGroup(s.lembaga_sekolah) || 'sekolah', lembaga: s.lembaga_sekolah, kelas: s.kelas_sekolah || null })
  }
  if (s.is_mukim) {
    refs.unshift({ group: 'mahad', lembaga: "Ma'had" })
  }
  return refs
}

export function useSantri() {
  const auth = useAuthStore()
  const santriRaw = ref([])
  const guruRaw = ref([])
  const lembagaList = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsubSantri = null
  let unsubGuru = null

  // Search & filter state
  const search = ref('')
  const filterLembaga = ref('')
  const filterKelas = ref('')
  const filterMukim = ref('')
  // v.21.12.0526: + filterStatus (aktif/tidak_aktif/all)
  const filterStatus = ref('aktif')

  // Role-based access
  // v.20.25.0526: include Kepala Lembaga (kyai req — guru dengan jabatan "Kepala" lihat semua santri)
  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    if (s.role === 'admin' || s.id === 'admin') return true
    if (['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)) return true
    // v.86.0526: Kepala Lembaga/PJ/Pengasuh TIDAK lagi full-access global (kyai: "Kepala = lembaganya").
    //   Discope ke SE-GROUP lembaganya di branch scoping (isKepala) di bawah.
    return false
  })

  // Filter santri menurut role + UI filters
  const santri = computed(() => {
    // v.21.12.0526: drop blanket aktif filter — handle via filterStatus below (supaya "Tidak Aktif" bisa dilihat)
    let list = santriRaw.value.filter((s) => !!s)

    // Role filter — v.21.10.0526: pakai canSee untuk Kepala Lembaga scoping (lihat semua di lembaga-nya), guru biasa lihat kelasnya
    if (!isFullAccess.value) {
      const user = auth.sesiAktif
      const myNama = String(user?.guru || user?.nama || '').trim().toLowerCase()
      if (!myNama) return []
      // Kepala Lembaga: filter santri yang lembaga-nya = lembaga kepala-nya (via canSee)
      const jabL = String(user?.jabatan || '').toLowerCase()
      const isKepala = jabL.includes('kepala') || jabL.includes('pj') || jabL.includes('pengasuh')
      const myFamily = getLembagaGroup(user?.lembaga) // 'TPQ' | 'SDI' | ... (keluarga lembaga)
      list = list.filter((s) => {
        // v.86.0526: Kepala/PJ = SE-GROUP lembaganya (kyai). exact-lembaga via canSee +
        //   match keluarga lembaga (getLembagaGroup: TPQ Pagi/Sore/Pra PTPT → 'TPQ').
        if (isKepala) {
          if (canSee(user, s.lembaga) || canSee(user, s.lembaga_sekolah)) return true
          if (myFamily && (getLembagaGroup(s.lembaga) === myFamily || getLembagaGroup(s.lembaga_sekolah) === myFamily)) return true
          return false
        }
        const gp = String(s.guru_pagi || '').trim().toLowerCase()
        const gs = String(s.guru_sore || '').trim().toLowerCase()
        const gOld = String(s.guru || '').trim().toLowerCase()
        const gsek = Array.isArray(s.guru_sekolah)
          ? s.guru_sekolah.map((x) => String(x || '').trim().toLowerCase())
          : []
        return (
          gp === myNama ||
          gs === myNama ||
          (gOld === myNama && !gp && !gs) ||
          gsek.includes(myNama)
        )
      })
    }

    // Search filter
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        (s) =>
          String(s.nama || '').toLowerCase().includes(kw) ||
          String(s.nis || '').toLowerCase().includes(kw) ||
          String(s.wali || '').toLowerCase().includes(kw)
      )
    }

    // Lembaga filter
    if (filterLembaga.value) {
      list = list.filter((s) => s.lembaga === filterLembaga.value)
    }

    // Kelas filter
    if (filterKelas.value) {
      list = list.filter((s) => s.kelas === filterKelas.value || s.kelas_sekolah === filterKelas.value)
    }

    // v.21.12.0526: Ma'had / Fullday / Pulang Pergi
    if (filterMukim.value === 'mukim') list = list.filter((s) => s.is_mukim === true)
    else if (filterMukim.value === 'fullday') list = list.filter((s) => !s.is_mukim && s.is_fullday === true)
    else if (filterMukim.value === 'non-mukim') list = list.filter((s) => !s.is_mukim && !s.is_fullday)

    // v.21.12.0526: Status aktif filter
    if (filterStatus.value === 'aktif') list = list.filter((s) => s.aktif !== false)
    else if (filterStatus.value === 'tidak_aktif') list = list.filter((s) => s.aktif === false)

    // v.21.86.0527: Sort lembaga→kelas→nama (konsisten di semua halaman)
    return sortSantri(list)
  })

  // Stats
  const stats = computed(() => ({
    total: santri.value.length,
    mukim: santri.value.filter((s) => s.is_mukim).length,
    nonMukim: santri.value.filter((s) => !s.is_mukim).length,
    perLembaga: santri.value.reduce((acc, s) => {
      const k = s.lembaga || '—'
      acc[k] = (acc[k] || 0) + 1
      return acc
    }, {})
  }))

  // Helper: dapatkan nama guru pagi/sore terformat
  function getGuruInfo(santriItem) {
    const gp = santriItem.guru_pagi
      ? guruRaw.value.find((g) => g.nama === santriItem.guru_pagi)
      : null
    const gs = santriItem.guru_sore
      ? guruRaw.value.find((g) => g.nama === santriItem.guru_sore)
      : null
    return {
      pagi: gp?.nama || santriItem.guru_pagi || '',
      sore: gs?.nama || santriItem.guru_sore || '',
      old: santriItem.guru || ''
    }
  }

  onMounted(() => {
    // Subscribe santri
    unsubSantri = subscribeColl('santri', (docs) => {
      santriRaw.value = docs
      loading.value = false
    })
    // Subscribe guru (untuk display nama guru pagi/sore)
    unsubGuru = subscribeColl('guru', (docs) => {
      guruRaw.value = docs
    })
  })

  onUnmounted(() => {
    if (unsubSantri) {
      try { unsubSantri() } catch (e) {}
      unsubSantri = null
    }
    if (unsubGuru) {
      try { unsubGuru() } catch (e) {}
      unsubGuru = null
    }
  })

  return {
    santri,
    santriRaw,
    guruRaw,
    lembagaList,
    loading,
    error,
    search,
    filterLembaga,
    filterKelas,
    filterMukim,
    filterStatus,
    stats,
    isFullAccess,
    getGuruInfo,
    // v.21.10.0526: lembaga_refs + rapor list per santri
    deriveSantriLembagaRefs,
    getRapors: (s) => {
      // v.21.112.0527: TPQ Pagi & TK tidak menerbitkan rapor (kebijakan kyai)
      const NO_RAPOR_LEMBAGA = new Set(['tpq pagi', 'tk'])
      const refs = deriveSantriLembagaRefs(s)
      const rapors = []
      const qiraati = refs.find((r) => r.group === 'qiraati' && !NO_RAPOR_LEMBAGA.has(String(r.lembaga || '').toLowerCase()))
      if (qiraati) rapors.push({ jenis: 'qiraati', lembaga: qiraati.lembaga })
      const sekolah = refs.find((r) => r.group === 'sekolah' && !NO_RAPOR_LEMBAGA.has(String(r.lembaga || '').toLowerCase()))
      if (sekolah) rapors.push({ jenis: 'diniyah', lembaga: sekolah.lembaga })
      return rapors
    }
  }
}
