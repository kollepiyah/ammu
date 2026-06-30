// useSantri — list santri real-time + role-based filter + search
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionsStore } from '@/stores/collections'
import { useAuthStore } from '@/stores/auth'
// v.21.10.0526: Import LEMBAGA_GROUPS helpers untuk lembaga_refs derivation + lembagaScopeMatches scoping
import { getLembagaGroup, lembagaScopeMatches, getPkbmSubTier } from './useLembaga'
// v.21.86.0527: Sort konsisten lembaga→kelas→nama (berlaku di semua halaman via composable)
import { sortSantri } from '@/utils/santriSort'
// v.111: scope Gedung (akademik per gedung + filter Pra PTPT/PTPT)
import { isGedungScoped, gedungOf } from '@/utils/gedung'

// Helper: derive santri.lembaga_refs dari legacy fields
// Santri reguler: 1 ref. Santri mukim: 3 refs (Ma'had + Qiraati + Sekolah).
// Santri fullday: 1 ref + flag is_fullday.
function deriveSantriLembagaRefs(s) {
  if (Array.isArray(s.lembaga_refs) && s.lembaga_refs.length > 0) return s.lembaga_refs
  const refs = []
  if (s.lembaga) {
    refs.push({
      group: getLembagaGroup(s.lembaga) || 'qiraati',
      lembaga: s.lembaga,
      shift: s.shift_qiraati || null,
      kelas: s.kelas || null
    })
  }
  if (s.lembaga_sekolah && s.lembaga_sekolah !== s.lembaga) {
    refs.push({
      group: getLembagaGroup(s.lembaga_sekolah) || 'sekolah',
      lembaga: s.lembaga_sekolah,
      kelas: s.kelas_sekolah || null
    })
  }
  if (s.is_mukim) {
    refs.unshift({ group: 'mahad', lembaga: "Ma'had" })
  }
  return refs
}

export function useSantri() {
  const auth = useAuthStore()
  const collections = useCollectionsStore()
  collections.ensure('santri', 'guru')
  const { santri: santriRaw, guru: guruRaw } = storeToRefs(collections)
  const lembagaList = ref([])
  const loading = computed(() => !collections.isLoaded('santri'))
  const error = ref(null)

  // Search & filter state
  const search = ref('')
  const filterLembaga = ref('')
  const filterKelas = ref('')
  const filterMukim = ref('')
  // v.21.12.0526: + filterStatus (aktif/tidak_aktif/all)
  const filterStatus = ref('aktif')
  // v.111: filter Gedung & PJ PTPT (pisah Pra PTPT per gedung & PTPT per PJ — "gak campur")
  const filterGedung = ref('')
  const filterPjPtpt = ref('')

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

    // Role filter — v.21.10.0526: pakai lembagaScopeMatches untuk Kepala Lembaga scoping (lihat semua di lembaga-nya), guru biasa lihat kelasnya
    if (!isFullAccess.value) {
      const user = auth.sesiAktif
      const myNama = String(user?.guru || user?.nama || '')
        .trim()
        .toLowerCase()
      if (!myNama) return []
      // Kepala Lembaga: filter santri yang lembaga-nya = lembaga kepala-nya (via lembagaScopeMatches)
      const jabL = String(user?.jabatan || '').toLowerCase()
      const isKepala = jabL.includes('kepala') || jabL.includes('pj') || jabL.includes('pengasuh')
      list = list.filter((s) => {
        // v.86.0526: Kepala/PJ = se-lembaganya (kyai "se-group"). lembagaScopeMatches handle
        //   variant/family (TPQ Sore→TPQ Pagi/Sore/Pra PTPT) MAUPUN label broad ('Qiraati'→semua qiraati).
        if (isKepala) {
          return (
            lembagaScopeMatches(user?.lembaga, s.lembaga) ||
            lembagaScopeMatches(user?.lembaga, s.lembaga_sekolah)
          )
        }
        const gp = String(s.guru_pagi || '')
          .trim()
          .toLowerCase()
        const gs = String(s.guru_sore || '')
          .trim()
          .toLowerCase()
        const gOld = String(s.guru || '')
          .trim()
          .toLowerCase()
        const gsek = Array.isArray(s.guru_sekolah)
          ? s.guru_sekolah.map((x) =>
              String(x || '')
                .trim()
                .toLowerCase()
            )
          : []
        return (
          gp === myNama || gs === myNama || (gOld === myNama && !gp && !gs) || gsek.includes(myNama)
        )
      })
    }

    // v.111: auto-scope Gedung — user ber-gedung (admin keuangan) hanya lihat santri gedungnya
    if (isGedungScoped(auth.sesiAktif)) {
      const myG = gedungOf(auth.sesiAktif)
      list = list.filter((s) => String(s.gedung || '').trim() === myG)
    }

    // Search filter
    const kw = search.value.trim().toLowerCase()
    if (kw) {
      list = list.filter(
        (s) =>
          String(s.nama || '')
            .toLowerCase()
            .includes(kw) ||
          String(s.nis || '')
            .toLowerCase()
            .includes(kw) ||
          String(s.wali || '')
            .toLowerCase()
            .includes(kw)
      )
    }

    // Lembaga filter — v.97.0626: cocokkan lembaga NGAJI ATAU lembaga SEKOLAH (formal)
    // v.99: SMP/SMA = sub-jenjang PKBM (turunan kelas). Pilihan filter "SMP"/"SMA" → santri PKBM per jenjang.
    if (filterLembaga.value) {
      const fl = filterLembaga.value
      if (fl === 'SMP' || fl === 'SMA') {
        list = list.filter((s) => {
          const isPkbm =
            String(s.lembaga_sekolah || '').toUpperCase() === 'PKBM' ||
            String(s.lembaga || '').toUpperCase() === 'PKBM'
          return (
            isPkbm && getPkbmSubTier(String(s.kelas_sekolah || s.kelas || '').toUpperCase()) === fl
          )
        })
      } else {
        list = list.filter((s) => s.lembaga === fl || s.lembaga_sekolah === fl)
      }
    }

    // Kelas filter
    if (filterKelas.value) {
      list = list.filter(
        (s) => s.kelas === filterKelas.value || s.kelas_sekolah === filterKelas.value
      )
    }

    // v.111: filter Gedung (manual) + PJ PTPT — pisah Pra PTPT/PTPT yang tercampur
    if (filterGedung.value) {
      list = list.filter((s) => String(s.gedung || '').trim() === filterGedung.value)
    }
    if (filterPjPtpt.value) {
      list = list.filter((s) => String(s.pj_ptpt || '').trim() === filterPjPtpt.value)
    }

    // v.21.12.0526: Ma'had / Fullday / Pulang Pergi
    if (filterMukim.value === 'mukim') list = list.filter((s) => s.is_mukim === true)
    else if (filterMukim.value === 'fullday')
      list = list.filter((s) => !s.is_mukim && s.is_fullday === true)
    else if (filterMukim.value === 'non-mukim')
      list = list.filter((s) => !s.is_mukim && !s.is_fullday)

    // v.21.12.0526: Status aktif filter
    if (filterStatus.value === 'aktif') list = list.filter((s) => s.aktif !== false)
    else if (filterStatus.value === 'tidak_aktif') list = list.filter((s) => s.aktif === false)

    // v.110.0625: Data Santri ikut aturan global — lembaga → kelas → USIA (muda→tua) → nama
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
    filterGedung,
    filterPjPtpt,
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
      const qiraati = refs.find(
        (r) => r.group === 'qiraati' && !NO_RAPOR_LEMBAGA.has(String(r.lembaga || '').toLowerCase())
      )
      if (qiraati) rapors.push({ jenis: 'qiraati', lembaga: qiraati.lembaga })
      const sekolah = refs.find(
        (r) => r.group === 'sekolah' && !NO_RAPOR_LEMBAGA.has(String(r.lembaga || '').toLowerCase())
      )
      if (sekolah) rapors.push({ jenis: 'diniyah', lembaga: sekolah.lembaga })
      return rapors
    }
  }
}
