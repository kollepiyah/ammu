// useKegiatan — subscribe kegiatan collection real-time + CRUD
// Port dari legacy db_kegiatan + simpanKegiatan/hapusKegiatan/editKegiatan
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, setOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'

export function useKegiatan() {
  const auth = useAuthStore()
  const kegiatanRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsub = null

  function start() {
    try {
      unsub = subscribeColl('kegiatan', (docs) => {
        kegiatanRaw.value = docs
        loading.value = false
      })
    } catch (err) {
      error.value = err
      loading.value = false
    }
  }

  function stop() {
    if (unsub) {
      unsub()
      unsub = null
    }
  }

  // Filter kegiatan berdasarkan audience + role user
  const kegiatanRelevan = computed(() => {
    const role = auth.sesiAktif?.role
    if (!role) return []
    return kegiatanRaw.value.filter((k) => {
      const aud = k.audience || 'semua'
      if (aud === 'semua') return true
      if (aud === 'guru' && (role === 'guru' || role === 'admin')) return true
      if (aud === 'santri' && (role === 'santri' || role === 'admin')) return true
      return role === 'admin'
    })
  })

  async function simpanKegiatan(data) {
    // v.110.0626: fallback id + suffix acak → cegah tabrakan bila dipanggil massal tanpa id eksplisit
    const id = data.id || `kg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const payload = {
      id,
      judul: data.judul || '',
      tgl_mulai: data.tgl_mulai,
      tgl_akhir: data.tgl_akhir || data.tgl_mulai,
      audience: data.audience || 'semua',
      deskripsi: data.deskripsi || '',
      // v.21.114.0528: tipe untuk bedakan kegiatan/libur/libur_nasional
      tipe: data.tipe || 'kegiatan',
      dibuat_oleh: auth.sesiAktif?.nama || 'Admin',
      timestamp: new Date().toISOString()
    }
    await setOne('kegiatan', id, payload)
    return payload
  }

  async function hapusKegiatan(id) {
    await deleteOne('kegiatan', id, { sesi: auth.sesiAktif })
  }

  onMounted(start)
  onUnmounted(stop)

  return { kegiatanRaw, kegiatanRelevan, loading, error, simpanKegiatan, hapusKegiatan }
}
