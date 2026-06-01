<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import * as authService from '@/services/auth'

// v.86.0526: full match legacy login — Google + Ingat Saya + Lupa Sandi + Copyright luar card
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// v.86.0526: BG login dari settings (Pengaturan Web → Background Layar).
// Force load settings di mount supaya BG image tersedia sebelum render (App.vue load async)
onMounted(() => {
  if (!settings.settings?.bgImage) {
    settings.load().catch(() => {})
  }
})
// Field name fallback: bgImage (Vue settings), bg_login (legacy), bg_img, bgUrl
// v.21.114.0528: drop teal solid overlay → bg image full visible + backdrop-blur overlay separate
const bgStyle = computed(() => {
  const s = settings.settings || {}
  const bg = s.bgImage || s.bg_login || s.bg_img || s.bgUrl || '/bg-pesantren.webp'
  return `background: url('${bg}') center/cover no-repeat;`
})

// v.21.115.0528: URL download app native (Android/iOS/Desktop)
// Bisa di-override dari Pengaturan Web (settings.downloadAndroid, downloadIos, downloadDesktop)
// Default ke GitHub Releases latest — admin tinggal ganti owner/repo
const downloadAndroidUrl = computed(() =>
  settings.settings?.downloadAndroid ||
  'https://github.com/lexanoisgroup3/ammuonline/releases/latest/download/AmmuOnline.apk'
)
const downloadIosUrl = computed(() =>
  settings.settings?.downloadIos ||
  'https://github.com/lexanoisgroup3/ammuonline/releases/latest/download/AmmuOnline.ipa'
)
const downloadDesktopUrl = computed(() =>
  settings.settings?.downloadDesktop ||
  'https://github.com/lexanoisgroup3/ammuonline/releases/latest/download/AmmuOnline-Setup.exe'
)

// v.86.0526: Tampilkan download section HANYA di web browser
const isWebOnly = computed(() => {
  if (typeof window === 'undefined') return false
  const isCap = window.Capacitor?.isNativePlatform?.() === true
  const isElectron = window.location?.protocol === 'file:' || /Electron/i.test(navigator?.userAgent || '')
  return !isCap && !isElectron
})

const username = ref('')
const password = ref('')
const isSubmitting = ref(false)
const loginError = ref('')
const showPassword = ref(false)
const ingatSaya = ref(true) // default tetap login di perangkat ini

async function handleLogin() {
  if (!username.value || !password.value) {
    toast.error('Username dan kata sandi wajib diisi')
    return
  }
  isSubmitting.value = true
  loginError.value = ''
  try {
    await auth.login(username.value.trim(), password.value, ingatSaya.value)
    toast.success('Login berhasil')
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } catch (e) {
    loginError.value = e.message || 'Login gagal'
    toast.error(e.message || 'Login gagal')
  } finally {
    isSubmitting.value = false
  }
}

async function handleGoogleLogin() {
  if (isSubmitting.value) return
  isSubmitting.value = true
  try {
    const cred = await authService.loginWithGoogle()
    if (cred?.user) {
      await auth.loadSesiFromUser(cred.user)
      toast.success('Login Google berhasil')
      const redirect = route.query.redirect || '/dashboard'
      router.push(redirect)
    }
  } catch (e) {
    const msg = e?.message || 'Login Google gagal'
    if (e?.code === 'auth/popup-closed-by-user' || e?.code === 'auth/cancelled-popup-request') {
      // Silently ignore — user closed popup
    } else {
      toast.error(msg)
    }
  } finally {
    isSubmitting.value = false
  }
}

// v.21.24b.0526: Lupa Sandi proper modal (legacy parity)
const showLupaSandi = ref(false)
function handleLupaSandi() {
  showLupaSandi.value = true
}
// Ambil nomor WA admin dari settings (fallback ke contact umum kalau belum di-setup)
const adminWaPondok = computed(() => {
  const s = settings.settings || {}
  return s.adminWa || s.contactWa || s.waAdmin || ''
})
function bukaWaAdmin() {
  const wa = String(adminWaPondok.value || '').replace(/[^0-9]/g, '').replace(/^0/, '62')
  if (!wa) {
    toast.warning('Nomor WA Admin belum di-setup di Pengaturan Web')
    return
  }
  const msg = encodeURIComponent("Assalamu'alaikum Admin Pondok, saya lupa sandi akun Portal Ammu Online. Mohon bantu reset sandi. Terima kasih.")
  window.open(`https://wa.me/${wa}?text=${msg}`, '_blank')
}
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 relative"
    :style="bgStyle"
  >
    <!-- v.86.0526: backdrop-blur overlay — lebih gelap di dark mode -->
    <div class="absolute inset-0 backdrop-blur-md bg-teal-900/30 dark:bg-slate-900/60 pointer-events-none z-0" aria-hidden="true"></div>

    <!-- CARD LOGIN — v.86.0526: dark mode card slate-800 + border teal-400 -->
    <div
      class="w-full max-w-sm bg-[#F9F6EE] dark:bg-slate-800 rounded-3xl shadow-2xl border-t-8 border-teal-600 dark:border-teal-400 overflow-hidden relative z-10"
    >
      <!-- Header (logo + nama) -->
      <div class="px-6 pt-7 pb-4 text-center">
        <img
          src="/logo.png"
          alt="Logo Mambaul Ulum"
          class="w-20 h-20 mx-auto mb-2 object-contain drop-shadow-xl"
        />
        <h2 class="text-xl font-extrabold text-[var(--text-primary)] tracking-tight">
          Portal Mambaul Ulum
        </h2>
        <p class="text-[10px] text-teal-700 mt-0.5 font-bold uppercase tracking-widest">
          Generasi Qurani Pewaris Negeri
        </p>
      </div>

      <!-- Form -->
      <div class="px-6 pb-2 space-y-3">
        <!-- Login dengan Google -->
        <button
          type="button"
          @click="handleGoogleLogin"
          :disabled="isSubmitting"
          class="w-full bg-[var(--bg-card)] border border-[var(--border-default)] hover:bg-[var(--bg-card-elevated)] disabled:opacity-50 text-[var(--text-primary)] font-bold py-2.5 rounded-xl shadow-sm cursor-pointer flex justify-center items-center gap-2 transition text-sm"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span>Login dengan Google</span>
        </button>

        <!-- Divider ATAU -->
        <div class="flex items-center gap-2 my-1">
          <div class="flex-1 h-px bg-slate-300"></div>
          <span class="text-[9px] text-[var(--text-tertiary)] font-bold uppercase tracking-widest">atau</span>
          <div class="flex-1 h-px bg-slate-300"></div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-3" autocomplete="on">
          <!-- Username -->
          <div>
            <label class="block text-[9px] font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wide">
              Username
            </label>
            <div class="relative">
              <i class="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
              <input
                v-model="username"
                type="text"
                placeholder="Masukkan username"
                autocomplete="username"
                required
                class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
            </div>
          </div>

          <!-- Password + eye toggle -->
          <div>
            <label class="block text-[9px] font-bold text-[var(--text-primary)] mb-1 uppercase tracking-wide">
              Kata Sandi
            </label>
            <div class="relative">
              <i class="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"></i>
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan sandi..."
                autocomplete="current-password"
                required
                class="w-full pl-9 pr-10 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition cursor-pointer"
                :aria-label="showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'"
                tabindex="-1"
              >
                <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye', 'text-xs']"></i>
              </button>
            </div>
          </div>

          <!-- N3: error login inline (sandi salah dll) -->
          <p v-if="loginError" class="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
            <i class="fas fa-circle-exclamation"></i>{{ loginError }}
          </p>

          <!-- Ingat Saya checkbox -->
          <div class="flex items-center gap-2 mt-1">
            <input
              id="login-ingat-saya"
              v-model="ingatSaya"
              type="checkbox"
              class="w-4 h-4 cursor-pointer accent-teal-600"
            />
            <label for="login-ingat-saya" class="text-[10px] font-bold text-[var(--text-primary)] cursor-pointer">
              Ingat Saya (tetap login di perangkat ini)
            </label>
          </div>

          <!-- Tombol MASUK -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full mt-2 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-black rounded-xl text-sm shadow-lg transition tracking-widest cursor-pointer flex justify-center items-center gap-2"
          >
            <i class="fas fa-sign-in-alt"></i>
            <span>{{ isSubmitting ? 'MEMPROSES...' : 'MASUK' }}</span>
          </button>
        </form>

        <!-- Lupa Sandi link -->
        <div class="flex justify-end items-center text-[10px]">
          <button
            type="button"
            @click="handleLupaSandi"
            class="text-cyan-600 hover:text-cyan-800 font-bold cursor-pointer underline"
          >
            Lupa Sandi?
          </button>
        </div>
      </div>

      <!-- Footer Bakafrawi (dalam card) — v.20.4: ukuran match legacy (h-7 ≈ 28px) -->
      <div class="px-6 py-4 mt-2 border-t border-[var(--border-subtle)] text-center bg-[var(--bg-card)]/40">
        <p class="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest font-bold mb-1.5">
          Powered By
        </p>
        <img
          src="/bakafrawi-logo.png"
          alt="Bakafrawi Project"
          class="h-7 w-auto max-w-[140px] mx-auto opacity-95 object-contain"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
        />
        <p class="text-xs font-black text-teal-700 tracking-wide mt-0.5" style="display: none">
          Bakafrawi Project
        </p>
      </div>
    </div>

    <!-- v.21.24b.0526: Modal Lupa Sandi -->
    <div v-if="showLupaSandi" class="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showLupaSandi = false">
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button @click="showLupaSandi = false" class="absolute top-3 right-3 text-[var(--text-tertiary)] hover:text-rose-600 text-lg cursor-pointer">
          <i class="fas fa-times"></i>
        </button>
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-cyan-100 flex items-center justify-center">
            <i class="fas fa-key text-cyan-600 text-2xl"></i>
          </div>
          <h3 class="text-lg font-black text-[var(--text-primary)] mb-1">Lupa Sandi?</h3>
          <p class="text-xs text-[var(--text-secondary)] mb-4">Sandi hanya dapat di-reset oleh Admin Pondok.</p>
        </div>
        <div class="bg-cyan-50 border-2 border-cyan-200 rounded-xl p-3 text-xs text-[var(--text-primary)] space-y-1.5">
          <p><i class="fas fa-info-circle text-cyan-600 mr-1"></i><b>Langkah:</b></p>
          <ol class="list-decimal ml-5 space-y-1">
            <li>Hubungi Admin Pondok via WhatsApp/langsung</li>
            <li>Sebutkan nama lengkap + lembaga + status (santri/guru/pegawai)</li>
            <li>Admin akan reset sandi ke <b>1234</b></li>
            <li>Login dengan sandi baru, lalu ganti sandi di menu Profil</li>
          </ol>
        </div>
        <div class="mt-4 flex gap-2">
          <button v-if="adminWaPondok" @click="bukaWaAdmin" class="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold py-2.5 rounded-xl text-sm cursor-pointer transition">
            <i class="fab fa-whatsapp mr-1"></i>Hubungi Admin via WA
          </button>
          <button @click="showLupaSandi = false" class="flex-1 bg-slate-200 hover:bg-slate-300 text-[var(--text-primary)] font-bold py-2.5 rounded-xl text-sm cursor-pointer transition">
            <i class="fas fa-check mr-1"></i>Mengerti
          </button>
        </div>
      </div>
    </div>

    <!-- v.86.0526: Download section — Android + Desktop only (iOS pakai PWA Add-to-Home).
         Hide di Capacitor (Android native) + Electron (Desktop) karena sudah di-app native. -->
    <div v-if="isWebOnly" class="relative z-10 mt-4 max-w-[280px] w-full">
      <div class="bg-white/8 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/15">
        <p class="text-[9px] text-white/80 font-bold uppercase tracking-[0.15em] text-center mb-1.5">
          <i class="fas fa-download mr-1 text-[8px]"></i>Unduh Aplikasi
        </p>
        <div class="grid grid-cols-2 gap-2">
          <a
            :href="downloadAndroidUrl"
            target="_blank"
            rel="noopener"
            aria-label="Unduh APK Android"
            class="flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-gradient-to-br from-emerald-500/80 to-teal-600/80 hover:from-emerald-400 hover:to-teal-500 border border-emerald-300/30 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <i class="fab fa-android text-white text-sm group-hover:scale-110 transition"></i>
            <span class="text-[10px] text-white font-bold tracking-wide">Android</span>
          </a>
          <a
            :href="downloadDesktopUrl"
            target="_blank"
            rel="noopener"
            aria-label="Unduh installer Desktop"
            class="flex items-center justify-center gap-1.5 py-1.5 rounded-md bg-gradient-to-br from-cyan-500/80 to-sky-600/80 hover:from-cyan-400 hover:to-sky-500 border border-cyan-300/30 shadow-sm hover:shadow-md transition cursor-pointer group"
          >
            <i class="fas fa-desktop text-white text-sm group-hover:scale-110 transition"></i>
            <span class="text-[10px] text-white font-bold tracking-wide">Desktop</span>
          </a>
        </div>
        <p class="text-[8px] text-white/60 text-center mt-1.5 italic">
          <i class="fab fa-apple mr-0.5"></i>iOS: gunakan PWA — Tambah ke Layar Utama
        </p>
      </div>
    </div>

    <!-- Copyright + versi DI LUAR CARD (match legacy) -->
    <div class="relative z-10 mt-3 text-center px-4">
      <p class="text-[11px] text-white/90 font-bold uppercase tracking-wider drop-shadow">
        © {{ new Date().getFullYear() }} Pondok Pesantren Mambaul Ulum
      </p>
      <p class="text-[11px] text-white/80 font-bold tracking-widest mt-1 drop-shadow">
        v.07.0626
      </p>
    </div>
  </div>
</template>
