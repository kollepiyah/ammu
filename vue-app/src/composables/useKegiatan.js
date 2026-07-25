// useKegiatan — subscribe kegiatan collection real-time + CRUD
// Port dari legacy db_kegiatan + simpanKegiatan/hapusKegiatan/editKegiatan
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, setOne, deleteOne } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { lembagaScopeMatches } from '@/composables/useLembaga'

// v.1.2.4: apakah AGENDA kegiatan `k` relevan utk user `sesi` menurut scope lembaga.
//   scope kosong = semua; admin/super_admin selalu lihat; lembaga user tak diketahui
//   → tampil (fail-open, jangan sembunyikan). Hanya utk tipe 'kegiatan'; libur/
//   libur_nasional discope terpisah di absensi (tetap tampil di kalender semua).
export function kegiatanKenaLembaga(k, sesi) {
  const scope = Array.isArray(k?.lembaga)
    ? k.lembaga.map((x) => String(x || '').trim()).filter(Boolean)
    : []
  if (!scope.length) return true
  const role = sesi?.role
  const rs = sesi?.role_sistem
  if (role === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(rs)) return true
  const mine = [sesi?.lembaga, sesi?.lembaga_sekolah]
    .map((x) => String(x || '').trim())
    .filter(Boolean)
  if (!mine.length) return true // fail-open
  return scope.some((t) => mine.some((ul) => lembagaScopeMatches(ul, t)))
}

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

  // Filter kegiatan berdasarkan audience + role + (v.1.2.4) scope lembaga agenda
  const kegiatanRelevan = computed(() => {
    const role = auth.sesiAktif?.role
    if (!role) return []
    return kegiatanRaw.value.filter((k) => {
      const aud = k.audience || 'semua'
      const audOk =
        aud === 'semua' ||
        (aud === 'guru' && (role === 'guru' || role === 'admin')) ||
        (aud === 'santri' && (role === 'santri' || role === 'admin')) ||
        role === 'admin'
      if (!audOk) return false
      // v.1.2.4: AGENDA ber-scope lembaga (mis. agenda PTPT hanya utk PTPT). Libur &
      //   libur_nasional TIDAK discope di sini — tetap tampil di kalender semua
      //   lembaga; scope liburnya dipakai logika hari-kerja absensi.
      if ((k.tipe || 'kegiatan') === 'kegiatan' && !kegiatanKenaLembaga(k, auth.sesiAktif))
        return false
      return true
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
      // v.1.2.3: scope lembaga utk libur — [] = SEMUA lembaga (kompat mundur), terisi =
      //   hanya lembaga tsb libur (mis. sekolah libur tapi ngaji tetap masuk).
      lembaga: Array.isArray(data.lembaga) ? data.lembaga.filter(Boolean) : [],
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
