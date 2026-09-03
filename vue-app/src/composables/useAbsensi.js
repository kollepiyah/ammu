// useAbsensi — list absensi shift guru (koleksi absensi_shift_guru) realtime
// Phase 5.16/17 (v.39.0526). v.110: sumber dibetulkan absensi -> absensi_shift_guru
// (view tulis ke absensi_shift_guru; fingerprint/izin/manual semua ke sana) + filterStatus.
//
// v.1.4.0 (Kyai, 3 Sep 2026: "akses edit rekap absen bulanan guru terasa lambat ketika
// saya edit manual"): langganan kini BER-JENDELA TANGGAL. Sebelumnya `subscribeColl`
// dipanggil tanpa penyaring sama sekali — artinya SELURUH riwayat absensi sejak tabel
// ini lahir ditarik ulang, 1.000 baris per permintaan secara berurutan, SETIAP KALI ada
// satu baris berubah di mana pun (realtime memang menarik ulang set penuh; lihat
// RT_DEBOUNCE_MS di services/db). Menyimpan satu perbaikan manual karena itu membayar
// puluhan bolak-balik jaringan untuk data bulan-bulan yang tak sedang dilihat siapa pun.
//
// Jendelanya disuntik pemanggil (`opts.jendela`, sebuah getter) karena hanya view yang
// tahu periode apa saja yang sedang hidup di layarnya. Tak diberi = perilaku lama persis
// (tanpa penyaring), supaya pemanggil lain tak ikut berubah diam-diam.
//
// ⚠ Penyaringnya memakai `tanggal` yang tinggal di dalam kolom `data` jsonb. Kolom RIIL
// `periode` sengaja TIDAK dipakai walau ia terindeks (guru_id, periode): tiga jalur tulis
// — perbaikan manual, input harian, dan impor Excel fingerprint — tak pernah mengisinya,
// jadi menyaring dengannya akan MEMBUANG baris tanpa suara. Lihat CHANGELOG v.1.4.0.
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { subscribeColl } from '@/services/db'
import { useCollectionsStore } from '@/stores/collections'
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

/**
 * @param {object} [opts]
 * @param {() => ({start:string, end:string}|null)} [opts.jendela] rentang ISO yang perlu
 *   ditarik. Dipanggil ulang setiap kali sumbernya berubah (bulan/minggu digeser).
 */
export function useAbsensi(opts = {}) {
  const auth = useAuthStore()
  const collections = useCollectionsStore()
  // v.1.4.0: 'santri' TIDAK lagi di-ensure di sini. Layar absensi guru tak menyentuh
  //   satu baris santri pun, tapi ensure ini membuat siapa pun yang membuka Absensi Guru
  //   lebih dulu ikut menarik SELURUH tabel santri (tabel terbesar di aplikasi) sebelum
  //   layarnya sempat tampil. `santriRaw` tetap diekspor dan tetap terisi begitu layar
  //   lain yang memang butuh me-ensure-nya — store-nya memang dipakai bersama.
  collections.ensure('guru')
  const { guru: guruRaw, santri: santriRaw } = storeToRefs(collections)
  const absensi = ref([])
  const loading = ref(true)
  const error = ref(null)
  const unsubs = []

  // Filter state
  const selectedYear = ref(new Date().getFullYear())
  const selectedMonth = ref(new Date().getMonth() + 1)
  const filterGuru = ref('')
  const filterShift = ref('')
  const filterStatus = ref('')

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
    if (filterStatus.value) {
      list = list.filter((a) => String(a.status || 'hadir').toLowerCase() === filterStatus.value)
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

  // Langganan absensi dipasang ulang saat jendelanya bergeser. Data LAMA sengaja tidak
  // dikosongkan dulu supaya tak ada kedipan kosong sebelum data baru tiba — pola yang
  // sama dengan `reloadActive()` di stores/collections.
  let lepasAbsensi = null
  const jendela = opts.jendela ? computed(() => opts.jendela()) : null

  function pasangLangganan() {
    if (lepasAbsensi) {
      try {
        lepasAbsensi()
      } catch (e) {
        /* noop */
      }
      lepasAbsensi = null
    }
    const w = jendela ? jendela.value : null
    const filters =
      w && w.start && w.end
        ? [
            ['tanggal', '>=', w.start],
            ['tanggal', '<=', w.end]
          ]
        : []
    lepasAbsensi = subscribeColl(
      'absensi_shift_guru',
      (docs) => {
        absensi.value = docs
        loading.value = false
      },
      filters
    )
  }

  onMounted(() => {
    pasangLangganan()
    if (jendela) {
      unsubs.push(
        watch(
          () => {
            const w = jendela.value
            // Dibandingkan sebagai STRING: computed-nya membuat objek baru tiap kali
            // sumbernya disentuh, jadi membandingkan objeknya akan memasang ulang
            // langganan walau rentangnya tak bergeser sedikit pun.
            return w ? `${w.start}..${w.end}` : ''
          },
          () => pasangLangganan()
        )
      )
    }
  })

  onUnmounted(() => {
    if (lepasAbsensi) {
      try {
        lepasAbsensi()
      } catch (e) {
        /* noop */
      }
      lepasAbsensi = null
    }
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
    filterStatus,
    stats,
    isFullAccess,
    getNamaGuru,
    getJkGuru,
    getBulanLabel,
    BULAN
  }
}
