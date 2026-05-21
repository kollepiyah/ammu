<template>
  <div class="p-4 md:p-6 max-w-6xl mx-auto">
    <!-- Loading state -->
    <div v-if="loading" class="flex items-center justify-center py-20">
      <div class="text-center">
        <i class="fas fa-spinner fa-spin text-4xl text-teal-500 mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat profil...</p>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-else-if="error"
      class="bg-rose-50 border-2 border-dashed border-rose-300 p-6 rounded-2xl text-center"
    >
      <i class="fas fa-exclamation-triangle text-rose-500 text-3xl mb-2"></i>
      <p class="text-sm font-bold text-rose-800 mb-2">Gagal memuat profil</p>
      <p class="text-xs text-rose-600">{{ error }}</p>
      <button
        @click="loadProfil"
        class="mt-3 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg cursor-pointer"
      >
        <i class="fas fa-redo mr-1"></i>Coba Lagi
      </button>
    </div>

    <!-- v.20.11.0526: Built-in admin only kalau id='admin' (ammuadmin). Guru promoted super_admin = render ProfilGuru -->
    <ProfilAdmin v-else-if="isBuiltInAdmin && !guru && !santri" />

    <!-- Role: Guru (atau guru yang promoted super_admin / admin_keuangan) -->
    <ProfilGuru v-else-if="guru" :guru="guru" />

    <!-- Role: Santri -->
    <ProfilSantri v-else-if="role === 'santri' && santri" :santri="santri" />

    <!-- Fallback: no data found for this user -->
    <div
      v-else
      class="bg-slate-50 border-2 border-dashed border-slate-300 p-6 rounded-2xl text-center"
    >
      <i class="fas fa-user-slash text-slate-400 text-3xl mb-2"></i>
      <p class="text-sm font-bold text-slate-700">Data profil tidak ditemukan</p>
      <p class="text-xs text-slate-500 mt-1">
        Akun ini ({{ sesi?.role || '?' }}) belum terkonfigurasi penuh. Hubungi admin pondok.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { getOne } from '@/services/firestore'
import ProfilAdmin from './profil/ProfilAdmin.vue'
import ProfilGuru from './profil/ProfilGuru.vue'
import ProfilSantri from './profil/ProfilSantri.vue'

const auth = useAuthStore()
const sesi = computed(() => auth.sesiAktif)
const role = computed(() => sesi.value?.role || null)
// v.20.11.0526: built-in admin = id 'admin' DAN auth_method 'admin-builtin' (bukan guru promoted super_admin)
const isBuiltInAdmin = computed(() =>
  sesi.value?.id === 'admin' || sesi.value?.auth_method === 'admin-builtin'
)

const guru = ref(null)
const santri = ref(null)
const loading = ref(true)
const error = ref(null)

async function loadProfil() {
  loading.value = true
  error.value = null
  guru.value = null
  santri.value = null
  try {
    const s = sesi.value
    if (!s?.id) {
      error.value = 'Sesi tidak valid'
      return
    }
    // v.20.11.0526: built-in admin built-in = skip lookup
    if (isBuiltInAdmin.value) {
      return
    }
    // v.20.11.0526: kalau ada firebase_uid atau id !== 'admin' → ini guru/santri (termasuk super_admin promoted)
    // Cek source dari sesi data — kalau punya field guru/jabatan = guru
    const isGuru = s.role === 'guru' || s.guru || s.jabatan || s.role_sistem === 'super_admin' || s.role_sistem === 'admin' || s.role_sistem === 'admin_keuangan'
    if (isGuru) {
      const g = await getOne('guru', String(s.id))
      if (g) guru.value = g
      else error.value = `Data guru ID ${s.id} tidak ditemukan`
      return
    }
    if (s.role === 'santri') {
      const sa = await getOne('santri', String(s.id))
      if (sa) santri.value = sa
      else error.value = `Data santri ID ${s.id} tidak ditemukan`
      return
    }
    error.value = `Role "${s.role}" belum didukung di halaman profil`
  } catch (e) {
    error.value = e.message || String(e)
    // eslint-disable-next-line no-console
    console.error('[ProfilView] load error:', e)
  } finally {
    loading.value = false
  }
}

onMounted(loadProfil)
// Reload kalau sesiAktif berubah (logout/login tanpa unmount)
watch(
  () => sesi.value?.id,
  (id, oldId) => {
    if (id && id !== oldId) loadProfil()
  }
)
</script>
