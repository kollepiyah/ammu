<template>
  <!-- v.21.80.0526: Header Pesantren Modern — bg-card + border-subtle + olive/gold accents -->
  <header
    class="bg-[var(--bg-card)] backdrop-blur-sm border-b border-[var(--border-subtle)] shadow-[var(--shadow-sm)] px-4 md:px-8 py-3 flex justify-between items-center z-30 sticky top-0"
  >
    <!-- Kiri: hamburger + app name -->
    <div class="flex items-center gap-3">
      <button
        @click="ui.toggleSidebar()"
        class="text-[var(--text-secondary)] hover:text-[var(--color-primary)] text-xl transition cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <i class="fas fa-bars"></i>
      </button>
      <h2 class="text-sm md:text-base font-black text-[var(--text-primary)] tracking-tight">
        {{ appName }}
      </h2>
    </div>

    <!-- Kanan: nama + role (desktop) + dark toggle + dropdown profil -->
    <div class="flex items-center gap-2">
      <div class="text-right hidden md:block mr-2">
        <p class="text-xs font-black text-[var(--text-primary)] leading-tight">
          {{ namaUser }}
        </p>
        <p class="text-[9px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest mt-0.5">
          {{ roleLabel }}
        </p>
      </div>

      <!-- Dark mode toggle -->
      <button
        @click="ui.toggleDark()"
        class="w-9 h-9 rounded-[var(--radius-full)] bg-[var(--bg-hover)] hover:bg-[var(--color-primary-soft)] flex items-center justify-center transition cursor-pointer border border-[var(--border-subtle)]"
        :title="ui.isDark ? 'Mode Terang' : 'Mode Gelap'"
        aria-label="Toggle dark mode"
      >
        <i :class="['fas', ui.isDark ? 'fa-sun text-[var(--color-accent)]' : 'fa-moon text-[var(--text-secondary)]']"></i>
      </button>

      <!-- Profil avatar dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="w-9 h-9 rounded-[var(--radius-full)] bg-[var(--color-primary-soft)] hover:ring-2 hover:ring-[var(--color-accent)] flex items-center justify-center transition cursor-pointer overflow-hidden border border-[var(--border-subtle)]"
          aria-label="Menu profil"
        >
          <i v-if="!fotoUrl" class="fas fa-user text-[var(--color-primary)]"></i>
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
            class="absolute right-0 top-full mt-2 w-56 bg-[var(--bg-card)] rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] border border-[var(--border-subtle)] py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-[var(--border-subtle)]">
              <p class="text-sm font-black text-[var(--text-primary)] truncate">
                {{ namaUser }}
              </p>
              <p class="text-[10px] text-[var(--text-tertiary)] font-bold uppercase tracking-wider mt-0.5">
                {{ roleLabel }}
              </p>
            </div>
            <button
              @click="goProfil"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2 transition cursor-pointer"
            >
              <i class="fas fa-user-circle text-[var(--color-primary)] w-5"></i>Profil Saya
            </button>
            <button
              @click="goPengaturan"
              v-if="auth.isAdmin"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] hover:bg-[var(--bg-hover)] flex items-center gap-2 transition cursor-pointer"
            >
              <i class="fas fa-cog text-[var(--color-accent)] w-5"></i>Pengaturan
            </button>
            <div class="border-t border-[var(--border-subtle)] my-1"></div>
            <button
              @click="onLogout"
              class="w-full text-left px-4 py-2.5 text-sm font-bold text-[var(--color-danger-text)] hover:bg-[var(--color-danger-soft)] flex items-center gap-2 transition cursor-pointer"
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

const auth = useAuthStore()
const ui = useUiStore()
const settings = useSettingsStore()
const confirm = useConfirm()
const toast = useToast()
const route = useRoute()
const router = useRouter()

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

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    dropdownOpen.value = false
  }
}
onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>
