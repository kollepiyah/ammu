// useStatistikDashboard — KPI pendidikan + rincian per-lembaga untuk shell Ribbon (Home).
// Logika DIPORT PERSIS dari StatistikView.vue (kelasCount canonical guru×lembaga×kelas +
// statistikLembaga dgn split PKBM->SMP/SMA) supaya angka identik dengan halaman Dashboard Statistik.
// Sumber data ter-scope sama (useStatistikScope) -> Kepala/PJ ikut scope lembaganya.
import { computed } from 'vue'
import { useStatistikScope } from './useStatistikScope'
import { useGuru } from './useGuru'
import { useLembaga, getPkbmSubTier } from './useLembaga'

const URUTAN_LEMBAGA = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH', 'TK', 'SDI', 'SMP', 'SMA', 'PKBM']
const isGuruAktif = (status) => !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())
function isSekolahLembaga(nama) {
  const n = String(nama || '').toUpperCase()
  return ['TK', 'SDI', 'MI', 'MTS', 'MA', 'SMP', 'SMA', 'PKBM'].some((s) => n.includes(s))
}

export function useStatistikDashboard() {
  const { isAdminMode, scopedSantriAll } = useStatistikScope()
  const { guruRaw } = useGuru()
  const { lembagaRaw } = useLembaga()

  const santriAktif = computed(() => scopedSantriAll.value.filter((s) => s.aktif !== false).length)
  const guruAktif = computed(() => guruRaw.value.filter((g) => isGuruAktif(g.status)).length)

  const lembagaCount = computed(() => {
    if ((lembagaRaw.value || []).length > 0) return lembagaRaw.value.length
    const set = new Set()
    for (const s of scopedSantriAll.value) {
      if (s.aktif !== false && s.lembaga) set.add(String(s.lembaga).toUpperCase().trim())
    }
    return set.size
  })

  // Kelas = DISTINCT (guru × lembaga × kelas) dari santri aktif yg sudah punya guru (canonical kyai).
  const kelasCount = computed(() => {
    const set = new Set()
    for (const s of scopedSantriAll.value) {
      if (s.aktif === false) continue
      const lembNgaji = String(s.lembaga || '').trim().toLowerCase()
      const kelasNgaji = String(s.kelas || '').trim().toLowerCase()
      if (lembNgaji && kelasNgaji) {
        for (const g of [s.guru_pagi, s.guru_sore, s.guru].map((x) => String(x || '').trim().toLowerCase()).filter(Boolean)) {
          set.add(`${g}|${lembNgaji}|${kelasNgaji}`)
        }
      }
      const lembSek = String(s.lembaga_sekolah || '').trim().toLowerCase()
      const kelasSek = String(s.kelas_sekolah || '').trim().toLowerCase()
      if (lembSek && kelasSek) {
        for (const g of (Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []).map((x) => String(x || '').trim().toLowerCase()).filter(Boolean)) {
          set.add(`${g}|${lembSek}|${kelasSek}`)
        }
      }
    }
    return set.size
  })

  const kpi = computed(() => [
    { icon: 'users', value: santriAktif.value, label: 'Total Santri' },
    { icon: 'user', value: guruAktif.value, label: 'Total Guru/Pegawai' },
    { icon: 'mosque', value: lembagaCount.value, label: 'Lembaga Aktif' },
    { icon: 'grid', value: kelasCount.value, label: 'Kelas Total' }
  ])

  const statistikLembaga = computed(() => {
    if (!isAdminMode.value) return []
    const lembList = (lembagaRaw.value || []).filter((l) => Array.isArray(l.kelas) && l.kelas.length > 0)
    const buildPkbmTier = (tier) => {
      const sl = scopedSantriAll.value.filter((s) => {
        if (s.aktif === false) return false
        const isPk =
          String(s.lembaga_sekolah || '').trim().toUpperCase() === 'PKBM' ||
          String(s.lembaga || '').trim().toUpperCase() === 'PKBM'
        return isPk && getPkbmSubTier(s.kelas_sekolah) === tier
      })
      const kg = new Set()
      const gset = new Set()
      for (const s of sl) {
        const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
        for (const g of Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []) {
          const t = String(g || '').trim().toLowerCase()
          if (t) {
            gset.add(t)
            if (kls) kg.add(t + '|' + kls)
          }
        }
      }
      return { nama: tier, kelas: kg.size, santri: sl.length, guru: gset.size }
    }
    return lembList
      .map((l) => {
        const nama = l.lembaga || l.nama
        const namaNorm = String(nama || '').trim().toLowerCase()
        const isSekolah = isSekolahLembaga(nama)
        const matchLemb = (val) => String(val || '').trim().toLowerCase() === namaNorm
        const santriList = scopedSantriAll.value.filter((s) => (matchLemb(s.lembaga) || matchLemb(s.lembaga_sekolah)) && s.aktif !== false)
        const kelasGuruSet = new Set()
        for (const s of santriList) {
          if (isSekolah) {
            const kls = String(s.kelas_sekolah || '').trim().toLowerCase()
            for (const g of Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []) {
              const t = String(g || '').trim().toLowerCase()
              if (t && kls) kelasGuruSet.add(t + '|' + kls)
            }
          } else {
            const kls = String(s.kelas || '').trim().toLowerCase()
            const gp = String(s.guru_pagi || '').trim().toLowerCase()
            const gs = String(s.guru_sore || '').trim().toLowerCase()
            if (gp && kls) kelasGuruSet.add(gp + '|' + kls)
            if (gs && kls) kelasGuruSet.add(gs + '|' + kls)
          }
        }
        const guruCount = guruRaw.value.filter((g) => (matchLemb(g.lembaga) || matchLemb(g.lembaga_sekolah)) && isGuruAktif(g.status)).length
        return { nama, kelas: kelasGuruSet.size, santri: santriList.length, guru: guruCount }
      })
      .flatMap((row) => (String(row.nama).trim().toLowerCase() === 'pkbm' ? [buildPkbmTier('SMP'), buildPkbmTier('SMA')] : [row]))
      .sort((a, b) => {
        const ia = URUTAN_LEMBAGA.indexOf(a.nama)
        const ib = URUTAN_LEMBAGA.indexOf(b.nama)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      })
  })

  return { isAdminMode, kpi, statistikLembaga, santriAktif, guruAktif, lembagaCount, kelasCount }
}
