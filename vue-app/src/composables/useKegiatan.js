// useKegiatan — subscribe kegiatan collection real-time + CRUD
// Port dari legacy db_kegiatan + simpanKegiatan/hapusKegiatan/editKegiatan
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { collection, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'

export function useKegiatan() {
  const auth = useAuthStore()
  const kegiatanRaw = ref([])
  const loading = ref(true)
  const error = ref(null)
  let unsub = null

  function start() {
    try {
      unsub = onSnapshot(
        collection(db, 'kegiatan'),
        (snap) => {
          kegiatanRaw.value = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
          loading.value = false
        },
        (err) => {
          error.value = err
          loading.value = false
        }
      )
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
    const id = data.id || `kg_${Date.now()}`
    const payload = {
      id,
      judul: data.judul || '',
      tgl_mulai: data.tgl_mulai,
      tgl_akhir: data.tgl_akhir || data.tgl_mulai,
      audience: data.audience || 'semua',
      deskripsi: data.deskripsi || '',
      dibuat_oleh: auth.sesiAktif?.nama || 'Admin',
      timestamp: new Date().toISOString()
    }
    await setDoc(doc(db, 'kegiatan', id), payload)
    return payload
  }

  async function hapusKegiatan(id) {
    await deleteDoc(doc(db, 'kegiatan', id))
  }

  onMounted(start)
  onUnmounted(stop)

  return { kegiatanRaw, kegiatanRelevan, loading, error, simpanKegiatan, hapusKegiatan }
}
