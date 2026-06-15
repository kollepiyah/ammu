<template>
  <!-- v.48.0526: header cream warm match legacy + border teal accent -->
  <header
    class="bg-white/95 dark:bg-slate-800 backdrop-blur-sm shadow-sm border-b-2 border-teal-600/30 dark:border-slate-700 px-4 md:px-8 py-3 flex justify-between items-center gap-2 md:gap-0 z-30 sticky top-0"
  >
    <!-- v.72.2.0526: Header match legacy — hamburger (always) + leaf logo + "Ammu Online" branding -->
    <div class="flex items-center gap-3">
      <!-- v.21.114.0528: tap target diperbesar w-10 h-10 = 40px (mobile-friendly) -->
      <button
        @click="ui.toggleSidebar()"
        class="w-10 h-10 -ml-1 rounded-lg flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-700/50 text-xl transition cursor-pointer"
        aria-label="Toggle sidebar"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- v.20.5.0526: app name dari settings.txtAppName (sync Pengaturan Web) -->
      <h2 class="text-sm md:text-base font-black text-slate-800 dark:text-white tracking-tight">
        {{ appName }}
      </h2>
      <!-- v.91.0626: indikator koneksi — LED kecil (hijau=online / merah=offline), SELALU tampil -->
      <span
        class="relative inline-flex items-center justify-center w-2.5 h-2.5 flex-shrink-0"
        :title="isOnline ? 'Terhubung ke internet' : 'Tidak ada koneksi internet'"
        role="status"
        :aria-label="isOnline ? 'Status koneksi: online' : 'Status koneksi: offline'"
      >
        <!-- ping halus hanya saat offline (menarik perhatian) -->
        <span
          v-if="!isOnline"
          class="absolute inline-flex w-full h-full rounded-full bg-rose-400/70 animate-ping"
        ></span>
        <!-- LED inti -->
        <span
          class="relative inline-flex w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-800 transition-colors"
          :class="isOnline ? 'bg-emerald-500' : 'bg-rose-500'"
          :style="
            isOnline
              ? 'box-shadow:0 0 5px 1px rgba(16,185,129,0.65)'
              : 'box-shadow:0 0 5px 1px rgba(244,63,94,0.85)'
          "
        ></span>
      </span>
    </div>

    <!-- v.91.0626: Global search (admin/guru) — bar di desktop, ikon di mobile -->
    <GlobalSearch v-if="canSearch" />

    <!-- Kanan: dark toggle + dropdown profil -->
    <div class="flex items-center gap-2">
      <!-- v.86.0526: Wali multi-anak -> dropdown pilih anak; selain itu nama statis -->
      <div v-if="isSantriRole && hasMultiple" class="relative mr-1" ref="childRef">
        <button
          @click="childOpen = !childOpen"
          class="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition cursor-pointer"
          aria-label="Pilih anak"
        >
          <span class="text-right leading-tight hidden sm:block">
            <span
              class="block text-xs font-black text-slate-800 dark:text-white truncate max-w-[130px]"
              >{{ namaUser }}</span
            >
            <span class="block text-[9px] font-bold text-teal-500 uppercase tracking-wider"
              >{{ children.length }} anak · ganti</span
            >
          </span>
          <i class="fas fa-child text-teal-500 sm:hidden"></i>
          <i class="fas fa-chevron-down text-[10px] text-slate-400"></i>
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
            v-if="childOpen"
            class="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50"
          >
            <p class="px-4 py-1.5 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
              Pilih Anak
            </p>
            <button
              v-for="c in children"
              :key="c.id"
              @click="pickChild(c)"
              class="w-full text-left px-4 py-2.5 text-sm font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition cursor-pointer"
              :class="
                String(c.id) === activeId
                  ? 'text-teal-600 dark:text-teal-300'
                  : 'text-slate-700 dark:text-slate-200'
              "
            >
              <span
                class="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-700 text-teal-600 dark:text-teal-200 flex items-center justify-center text-xs font-black flex-shrink-0"
                >{{ (c.nama || '?').charAt(0) }}</span
              >
              <span class="flex-1 min-w-0">
                <span class="block truncate">{{ c.nama }}</span>
                <span class="block text-[10px] text-slate-400 font-medium"
                  >{{ c.lembaga }}{{ c.kelas ? ' · ' + c.kelas : '' }}</span
                >
              </span>
              <i v-if="String(c.id) === activeId" class="fas fa-check text-teal-500"></i>
            </button>
          </div>
        </transition>
      </div>
      <!-- Info nama + role (desktop) — non multi-anak -->
      <div v-else class="text-right hidden md:block mr-2">
        <p class="text-xs font-black text-slate-800 dark:text-white leading-tight">
          {{ namaUser }}
        </p>
        <p
          class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5"
        >
          {{ roleLabel }}
        </p>
      </div>

      <!-- v.21.111.0527: Notif Center — v.91.0626: sembunyi di mobile (pindah ke bottom nav) -->
      <AppNotifBell v-if="!showBottomNav" />

      <!-- v.21.115.0528: tap target w-9 → w-10 (40px) — mobile-friendly per design-tokens -->
      <button
        @click="ui.toggleDark()"
        class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 flex items-center justify-center transition cursor-pointer"
        :title="ui.isDark ? 'Mode Terang' : 'Mode Gelap'"
        aria-label="Toggle dark mode"
      >
        <i :class="['fas', ui.isDark ? 'fa-sun text-cyan-400' : 'fa-moon text-slate-600']"></i>
      </button>

      <!-- Profil avatar dropdown — v.21.115.0528: w-9 → w-10 (40px) -->
      <div class="relative" ref="dropdownRef">
        <button
          @click="dropdownOpen = !dropdownOpen"
          class="w-10 h-10 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 hover:ring-2 hover:ring-teal-300 dark:hover:ring-teal-500 flex items-center justify-center transition cursor-pointer overflow-hidden border border-slate-200 dark:border-slate-600"
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
              <p
                class="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5"
              >
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
// v.86.0526: Wali multi-anak picker
import { useWaliChildren } from '@/composables/useWaliChildren'
// v.91.0626: sembunyikan bell saat bottom nav aktif (notif pindah ke bottom nav)
import { useMobileShell } from '@/composables/useMobileShell'
const { showBottomNav } = useMobileShell()
// v.91.0626: Global search (admin/guru saja)
import GlobalSearch from '@/components/layout/GlobalSearch.vue'
const canSearch = computed(() => ['admin', 'guru'].includes(auth.sesiAktif?.role))

const auth = useAuthStore()
const ui = useUiStore()
const settings = useSettingsStore()
const confirm = useConfirm()
const toast = useToast()
const route = useRoute()
const router = useRouter()

// v.20.58.0526: prioritas txtHeaderBar (admin set "Teks Header Bar") > txtAppName > default
const appName = computed(
  () => settings.settings?.txtHeaderBar || settings.settings?.txtAppName || 'Ammu Online'
)

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

// v.91.0626: status koneksi utk LED indikator di topbar
const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)
function _setOnline() {
  isOnline.value = true
}
function _setOffline() {
  isOnline.value = false
}
// v.91.0626: di app native, navigator.onLine TAK ANDAL di WebView -> pakai @capacitor/network.
let _netHandle = null
async function _initNetwork() {
  try {
    const C = window.Capacitor
    const isNative =
      C && (typeof C.isNativePlatform === 'function' ? C.isNativePlatform() : !!C.isNative)
    if (!isNative) return
    const { Network } = await import('@capacitor/network')
    const st = await Network.getStatus()
    isOnline.value = !!st.connected
    _netHandle = await Network.addListener('networkStatusChange', (s) => {
      isOnline.value = !!s.connected
    })
  } catch (e) {
    /* fallback ke navigator.onLine + event window */
  }
}

// v.86.0526: Wali multi-anak picker — beralih konteks antar anak
const { isSantriRole, children, hasMultiple, activeId, switchTo } = useWaliChildren()
const childOpen = ref(false)
const childRef = ref(null)
function pickChild(c) {
  switchTo(c)
  childOpen.value = false
  toast.success('Beralih ke ' + (c?.nama || 'anak'))
}

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
  if (s.role === 'guru' || s.role === 'admin')
    return getNamaGuruGelar(s.nama, s.jk) || s.nama || s.username || 'Pengguna'
  return s.nama || s.username || '—'
})

const fotoUrl = computed(() => {
  const s = auth.sesiAktif
  if (!s) return ''
  if (s.foto) return s.foto
  // Admin built-in: foto disimpan di settings/web.adminFoto (tak ada di sesiAktif)
  if (s.id === 'admin') return settings.settings?.adminFoto || ''
  return ''
})

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
  if (childRef.value && !childRef.value.contains(e.target)) {
    childOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('online', _setOnline)
  window.addEventListener('offline', _setOffline)
  _initNetwork()
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('online', _setOnline)
  window.removeEventListener('offline', _setOffline)
  try {
    _netHandle && _netHandle.remove && _netHandle.remove()
  } catch (e) {
    /* ignore */
  }
})
</script>
