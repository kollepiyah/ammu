// useStatistikDashboard — KPI pendidikan + rincian per-lembaga untuk shell Ribbon (Home).
// Logika DIPORT PERSIS dari StatistikView.vue (kelasCount + statistikLembaga dgn split
// PKBM->SMP/SMA) supaya angka identik dengan halaman Dashboard Statistik.
// v.1.1.9: hitungan kelas pindah ke utils/kelasHitung.js (1 rombel per pasangan guru).
// Sumber data ter-scope sama (useStatistikScope) -> Kepala/PJ ikut scope lembaganya.
import { computed } from 'vue'
import { useStatistikScope } from './useStatistikScope'
import { useGuru } from './useGuru'
import { useLembaga, getPkbmSubTier, isSekolahLembaga } from './useLembaga'
import { hitungKelas, hitungKelasLembaga } from '@/utils/kelasHitung'

const URUTAN_LEMBAGA = [
  'TPQ Pagi',
  'TPQ Sore',
  'Pra PTPT',
  'PTPT',
  'PPPH',
  'TK',
  'SDI',
  'SMP',
  'SMA',
  'PKBM'
]
const isGuruAktif = (status) =>
  !status || ['aktif', 'tetap', 'kontrak'].includes(String(status).toLowerCase())

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

  // v.1.1.9: kelas = 1 ROMBEL per (pasangan) guru — pagi+sore sepasang = 1 kelas.
  //   Definisi & kunci di utils/kelasHitung.js (sumber tunggal).
  const kelasCount = computed(() => hitungKelas(scopedSantriAll.value))

  const kpi = computed(() => [
    { icon: 'users', value: santriAktif.value, label: 'Total Santri' },
    { icon: 'user', value: guruAktif.value, label: 'Total Guru/Pegawai' },
    { icon: 'mosque', value: lembagaCount.value, label: 'Lembaga Aktif' },
    { icon: 'grid', value: kelasCount.value, label: 'Kelas Total' }
  ])

  const statistikLembaga = computed(() => {
    if (!isAdminMode.value) return []
    const lembList = (lembagaRaw.value || []).filter(
      (l) => Array.isArray(l.kelas) && l.kelas.length > 0
    )
    const buildPkbmTier = (tier) => {
      const sl = scopedSantriAll.value.filter((s) => {
        if (s.aktif === false) return false
        const isPk =
          String(s.lembaga_sekolah || '')
            .trim()
            .toUpperCase() === 'PKBM' ||
          String(s.lembaga || '')
            .trim()
            .toUpperCase() === 'PKBM'
        return isPk && getPkbmSubTier(s.kelas_sekolah) === tier
      })
      const gset = new Set()
      for (const s of sl) {
        for (const g of Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []) {
          const t = String(g || '')
            .trim()
            .toLowerCase()
          if (t) gset.add(t)
        }
      }
      return {
        nama: tier,
        kelas: hitungKelasLembaga(sl, 'sekolah'),
        santri: sl.length,
        guru: gset.size
      }
    }
    return lembList
      .map((l) => {
        const nama = l.lembaga || l.nama
        const namaNorm = String(nama || '')
          .trim()
          .toLowerCase()
        // v.1.2.1: baca tipe/group dari master (bukan cocok-substring nama) — sekolah
        //   yang Kyai tambah sendiri kini ikut terhitung, dan "Ma'had" tak lagi
        //   salah dianggap sekolah karena mengandung "MA".
        const isSekolah = isSekolahLembaga(nama, lembagaRaw.value)
        const matchLemb = (val) =>
          String(val || '')
            .trim()
            .toLowerCase() === namaNorm
        const santriList = scopedSantriAll.value.filter(
          (s) => (matchLemb(s.lembaga) || matchLemb(s.lembaga_sekolah)) && s.aktif !== false
        )
        // v.1.1.9: pasangan guru_pagi+guru_sore = 1 kelas (dulu terhitung 2).
        const kelas = hitungKelasLembaga(santriList, isSekolah ? 'sekolah' : 'qiraati')
        const guruCount = guruRaw.value.filter(
          (g) => (matchLemb(g.lembaga) || matchLemb(g.lembaga_sekolah)) && isGuruAktif(g.status)
        ).length
        return { nama, kelas, santri: santriList.length, guru: guruCount }
      })
      .flatMap((row) =>
        String(row.nama).trim().toLowerCase() === 'pkbm'
          ? [buildPkbmTier('SMP'), buildPkbmTier('SMA')]
          : [row]
      )
      .sort((a, b) => {
        const ia = URUTAN_LEMBAGA.indexOf(a.nama)
        const ib = URUTAN_LEMBAGA.indexOf(b.nama)
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      })
  })

  return { isAdminMode, kpi, statistikLembaga, santriAktif, guruAktif, lembagaCount, kelasCount }
}
