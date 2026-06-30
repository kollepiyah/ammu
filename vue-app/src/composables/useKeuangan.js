// useKeuangan — list tagihan, tabungan, gaji, bisyaroh real-time
// Phase 5.12 (v.37.0526)
// Mirror pattern useSantri/useGuru
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { subscribeColl } from '@/services/db'
import { useCollectionsStore } from '@/stores/collections'
import { useAuthStore } from '@/stores/auth'
import { useGedungScope } from '@/composables/useGedungScope'

export function useKeuangan() {
  const auth = useAuthStore()
  // v.111: raw refs (sebelum scope). Versi ter-scope diekspos sbg computed di bawah.
  const _tagihanRaw = ref([])
  const _tabunganRaw = ref([])
  // v.21.94.0527: tabungan_guru DIHAPUS — tabungan hanya untuk santri (kyai req)
  // v.21.104.0527: keuangan_transaksi dihapus (dead code, koleksi tidak pernah ditulis)
  const bisyaroh = ref([])
  const gaji = ref([])
  const collections = useCollectionsStore()
  const { santri: santriRaw, guru: guruRaw, bukuInduk: _bukuIndukRaw } = storeToRefs(collections)
  const loading = ref(true)
  const error = ref(null)
  const unsubs = []

  // v.111: scope Gedung — admin keuangan ber-gedung hanya lihat tagihan/tabungan/buku-induk
  //   gedungnya. GAJI/BISYAROH TIDAK ter-scope (keputusan kyai: bisyaroh global).
  const { scoped: _gedungScoped, allowSantri: _allowSantri, allowRow: _allowRow } = useGedungScope()
  const tagihan = computed(() =>
    _gedungScoped.value
      ? _tagihanRaw.value.filter((t) => _allowSantri(t.santri_id))
      : _tagihanRaw.value
  )
  const tabunganSantri = computed(() =>
    _gedungScoped.value
      ? _tabunganRaw.value.filter((t) => _allowSantri(t.santri_id))
      : _tabunganRaw.value
  )
  const bukuInduk = computed(() =>
    _gedungScoped.value ? (_bukuIndukRaw.value || []).filter(_allowRow) : _bukuIndukRaw.value
  )

  const isFullAccess = computed(() => {
    const s = auth.sesiAktif
    if (!s) return false
    return (
      s.role === 'admin' ||
      s.id === 'admin' ||
      ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
    )
  })

  const stats = computed(() => {
    const tagihanActive = tagihan.value.filter((t) => !t.lunas)
    const totalTagihan = tagihanActive.reduce((sum, t) => sum + (Number(t.nominal) || 0), 0)
    // v.86.0526 FIX: tabungan = NET (setor - tarik). Doc keuangan_tabungan_santri = transaksi (jenis+nominal),
    //   tidak punya field `saldo`, jadi sum(t.saldo) sebelumnya = 0/salah.
    const totalTabunganSantri = tabunganSantri.value.reduce((sum, t) => {
      const n = Number(t.nominal) || 0
      return sum + (t.jenis === 'tarik' ? -n : n)
    }, 0)
    // v.86.0526 FIX: bisyaroh "bulan ini" = filter ke periode bulan berjalan (sebelumnya sum SEMUA periode).
    const _periodeNow = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    const totalBisyarohBulan = gaji.value
      .filter((g) => String(g.periode || '') === _periodeNow)
      .reduce(
        (sum, g) => sum + (Number(g.bisyaroh_pokok) || 0) + (Number(g.bisyaroh_tambahan) || 0),
        0
      )
    return {
      tagihanCount: tagihanActive.length,
      totalTagihan,
      totalTabunganSantri,
      totalBisyarohBulan
    }
  })

  // Helper lookup nama santri/guru by id
  function getNamaSantri(id) {
    const s = santriRaw.value.find((x) => String(x.id) === String(id))
    return s ? s.nama : '(unknown)'
  }
  function getNamaGuru(id) {
    const g = guruRaw.value.find((x) => String(x.id) === String(id))
    return g ? g.nama : '(unknown)'
  }

  onMounted(() => {
    if (!isFullAccess.value) {
      loading.value = false
      return
    }
    collections.ensure('santri', 'guru', 'keuangan_buku_induk')
    // Subscribe keuangan-specific collections (tagihan/tabungan/gaji)
    unsubs.push(
      subscribeColl('keuangan_tagihan', (docs) => {
        _tagihanRaw.value = docs
        loading.value = false
      }),
      subscribeColl('keuangan_tabungan_santri', (docs) => {
        _tabunganRaw.value = docs
      }),
      subscribeColl('keuangan_gaji', (docs) => {
        gaji.value = docs
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
    tagihan,
    tabunganSantri,
    bisyaroh,
    gaji,
    bukuInduk,
    santriRaw,
    guruRaw,
    loading,
    error,
    stats,
    isFullAccess,
    getNamaSantri,
    getNamaGuru
  }
}
