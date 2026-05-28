<template>
  <!-- v.48.0526: header cream warm match legacy + border teal accent -->
  <header
    class="bg-white/95 dark:bg-slate-800 backdrop-blur-sm shadow-sm border-b-2 border-teal-600/30 dark:border-slate-700 px-4 md:px-8 py-3 flex justify-between items-center z-30 sticky top-0"
  >
    <!-- v.72.2.0526: Header match legacy — hamburger (always) + leaf logo + "Ammu Online" branding -->
    <div class="flex items-center gap-3">
      <button
        @click="ui.toggleSidebar()"
        class="text-slate-500 dark:text-slate-300 hover:text-teal-600 text-xl transition cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- v.20.5.0526: app name dari settings.txtAppName (sync Pengaturan Web) -->
      <h2 class="text-sm md:text-base font-black text-slate-800 dark:text-white tracking-tight">
        {{ appName }}
      </h2>
    </div>

    <!-- Kanan: dark toggle + dropdown profil -->
    <div class="flex items-center gap-2">
      <!-- Info nama + role (desktop) -->
      <div class="text-right hidden md:block mr-2">
        <p class="text-xs font-black text-slate-800 dark:text-white leading-tight">
          {{ namaUser }}
        </p>
        <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
          {{ roleLabel }}
        </p>
      </div>

      <!-- v.21.111.0527: Notif Center -->
      <AppNotifBell />

      <!-- Dark mode toggle -->
      <button
        @click="ui.toggleDark()"
        class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
        :title="ui.isDark ? 'Mode Terang' : 'Mode Gelap'"
        aria-label="Toggle dark mode"
      >
        <i :class="['fas', ui.isDark ? 'fa-sun text-cyan-400' : 'fa-moon text-slate-600']"></i>
      </button>

      <!-- Profil avatar dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 hover:ring-2 hover:ring-teal-300 dark:hover:ring-teal-500 flex items-center justify-center transition cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-600"
          aria-label="Menu profil"
        >
          <i v-if="!fotoUrl" class="fas fa-user text-teal-600 dark:text-teal-200"></i>
          <img v-else :src="fotoUrl" alt="Foto profil" class="w-full h-full object-cover" />
        </button>

        <transition
          enter-active-class="transition duration-150"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition duration-100"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="dropdownOpen"
            class="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
              <p class="text-sm font-black text-slate-800 dark:text-white truncate">
                {{ namaUser }}
              </p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                {{ roleLabel }}
              </p>
            </div>
            <button
              @click="goProfil"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition cursor-pointer"
            >
              <i class="fas fa-user-circle text-teal-500 w-5"></i>Profil Saya
            </button>
            <button
              @click="goPengaturan"
              v-if="auth.isAdmin"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition cursor-pointer"
            >
              <i class="fas fa-cog text-cyan-500 w-5"></i>Pengaturan
            </button>
            <div class="border-t border-slate-100 dark:border-slate-700 my-1"></div>
            <!-- v.65.0526: link Versi Lama dihapus — full Vue migrate (Naik Kelas, POS, Rapor bridge sudah di Vue) -->
            <!-- Kalau perlu akses legacy darurat, buka /legacy/ langsung via URL bar -->
            <button
              @click="onLogout"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-700 dark:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 flex items-center gap-2 transition cursor-pointer"
            >
              <i class="fas fa-sign-out-alt w-5"></i>Keluar
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { useSettingsStore } from '@/stores/settings'
import { useConfirm } from '@/composables/useConfirm'
import { useToast } from '@/composables/useToast'
import { getNamaGuruGelar } from '@/utils/format'
// v.21.111.0527: Notif Center bell
import AppNotifBell from '@/components/layout/AppNotifBell.vue'

const auth = useAuthStore()
const ui = useUiStore()
const settings = useSettingsStore()
const confirm = useConfirm()
const toast = useToast()
const route = useRoute()
const router = useRouter()

// v.20.58.0526: prioritas txtHeaderBar (admin set "Teks Header Bar") > txtAppName > default
const appName = computed(() => settings.settings?.txtHeaderBar || settings.settings?.txtAppName || 'Ammu Online')

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const ROLE_LABELS = {
  admin: 'Administrator',
  guru: 'Guru/Pegawai',
  santri: 'Santri/Wali'
}
const roleLabel = computed(() => ROLE_LABELS[auth.sesiAktif?.role] || '—')

const namaUser = computed(() => {
  const s = auth.sesiAktif
  if (!s) return 'User'
  // v.20.74.1.0526: guru-promoted-to-admin pakai nama asli, hanya built-in admin = 'Administrator'
  if (s.id === 'admin') return 'Administrator'
  if (s.role === 'guru' || s.role === 'admin') return getNamaGuruGelar(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
  return s.nama || s.username || '—'
})

const fotoUrl = computed(() => auth.sesiAktif?.foto || '')

const PAGE_TITLES = {
  '/dashboard': 'Beranda',
  '/profil': 'Profil Saya',
  '/pengaturan-web': 'Pengaturan Sistem',
  '/login': 'Masuk'
}
const pageTitle = computed(() => PAGE_TITLES[route.path] || 'Ammu Online')

function goProfil() {
  dropdownOpen.value = false
  router.push('/profil')
}
function goPengaturan() {
  dropdownOpen.value = false
  router.push('/pengaturan-web')
}
async function onLogout() {
  dropdownOpen.value = false
  // v.20.6.0526: konfirmasi keluar/tidak (match legacy)
  const ok = await confirm({
    title: 'Keluar dari aplikasi?',
    message: 'Anda akan diarahkan ke halaman login.',
    confirmText: 'Keluar',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  await auth.logout()
  toast.success('Berhasil keluar')
  router.push('/login')
}

// Close dropdown on outside click
function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
