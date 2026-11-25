<template>
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <section
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <i class="fas fa-palette text-teal-600"></i>Tampilan
      </h3>
      <p class="text-xs text-[var(--text-secondary)] mb-2">Tema</p>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="t in PILIHAN_TEMA"
          :key="t.mode"
          type="button"
          class="py-2 rounded-xl text-xs font-bold border transition cursor-pointer"
          :class="
            ui.temaMode === t.mode
              ? 'bg-teal-600 border-teal-600 text-white'
              : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
          "
          @click="ui.setTemaMode(t.mode)"
        >
          <i :class="['fas mr-1', t.ikon]"></i>{{ t.label }}
        </button>
      </div>
      <p v-if="isAndroid" class="text-[11px] text-[var(--text-secondary)] mt-3 leading-relaxed">
        <i class="fas fa-mobile-screen mr-1 text-teal-600"></i>Widget Android: tekan lama layar
        utama HP → <b>Widget</b> → cari <b>Ammu Online</b>, lalu seret widget Jam Hijriah atau
        Kalender ke layar.
      </p>
    </section>

    <section
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <i class="fas fa-mosque text-teal-600"></i>Ibadah
      </h3>
      <p class="text-xs text-[var(--text-secondary)]">
        Metode jadwal sholat, lokasi, dan suara adzan segera hadir, insyaAllah.
      </p>
    </section>

    <section
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <i class="fas fa-user-shield text-teal-600"></i>Akun
      </h3>
      <template v-if="auth.isLoggedIn">
        <p class="text-xs text-[var(--text-secondary)] mb-3">
          Masuk sebagai <b class="text-[var(--text-primary)]">{{ auth.sesiAktif?.nama }}</b>
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer bg-teal-600 text-white"
            @click="router.push('/dashboard')"
          >
            <i class="fas fa-building-columns mr-1.5"></i>Buka Portal
          </button>
          <button
            type="button"
            class="flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer border border-rose-200 text-rose-700 dark:border-rose-800 dark:text-rose-300"
            @click="keluar"
          >
            <i class="fas fa-right-from-bracket mr-1.5"></i>Keluar
          </button>
        </div>
      </template>
      <button
        v-else
        type="button"
        class="flex-1 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer bg-teal-600 text-white w-full"
        @click="router.push('/login')"
      >
        <i class="fas fa-right-to-bracket mr-1.5"></i>Masuk ke Portal
      </button>
    </section>

    <!-- Kyai 25 Nov 2026: tombol unduh pindah dari layar masuk PWA ke sini. -->
    <section
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3 flex items-center gap-2">
        <i class="fas fa-download text-teal-600"></i>Unduh Aplikasi
      </h3>
      <div class="space-y-2">
        <a
          v-for="u in daftarUnduh"
          :key="u.label"
          :href="u.url"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 transition"
        >
          <i :class="[u.ikon, 'text-lg w-5 text-center', u.warna]"></i>
          <span class="flex-1 min-w-0">
            <span class="block text-xs font-bold text-[var(--text-primary)]">{{ u.label }}</span>
            <span class="block text-[10px] text-[var(--text-secondary)]">{{ u.ket }}</span>
          </span>
          <i class="fas fa-arrow-up-right-from-square text-[10px] text-[var(--text-tertiary)]"></i>
        </a>
      </div>
    </section>

    <section
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-2 flex items-center gap-2">
        <i class="fas fa-circle-info text-teal-600"></i>Tentang
      </h3>
      <p class="text-xs text-[var(--text-secondary)] leading-relaxed">
        Ammu Online — sistem informasi Pondok Pesantren Mambaul Ulum untuk santri, wali, guru, dan
        pengurus.
      </p>
      <a
        :href="URL_PRIVASI"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-teal-700 dark:text-teal-300"
      >
        <i class="fas fa-shield-halved"></i>Kebijakan Privasi
      </a>
    </section>

    <p class="text-center text-[10px] text-[var(--text-secondary)]">{{ versiApp }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUnduhan, URL_PRIVASI } from '@/composables/useUnduhan'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'
import { useConfirm } from '@/composables/useConfirm'
import { useToast } from '@/composables/useToast'
import { isNativeAndroid } from '@/composables/useWidgetSync'
import { APP_VERSION } from '@/utils/appVersion'

const PILIHAN_TEMA = [
  { mode: 'terang', label: 'Terang', ikon: 'fa-sun' },
  { mode: 'gelap', label: 'Gelap', ikon: 'fa-moon' },
  { mode: 'otomatis', label: 'Otomatis', ikon: 'fa-circle-half-stroke' }
]

const router = useRouter()
const ui = useUiStore()
const auth = useAuthStore()
const confirm = useConfirm()
const toast = useToast()
const isAndroid = isNativeAndroid()
const versiApp = 'Ammu Online ' + (APP_VERSION || '')

const { androidUrl, desktopUrl, desktopWin7Url } = useUnduhan()
// Di aplikasi Android sendiri tautan Play Store tak berguna -> hanya installer Windows.
const daftarUnduh = computed(() =>
  [
    !isAndroid && {
      label: 'Android',
      ket: 'Google Play Store',
      url: androidUrl,
      ikon: 'fab fa-google-play',
      warna: 'text-emerald-600'
    },
    {
      label: 'Windows 10/11',
      ket: 'Aplikasi desktop',
      url: desktopUrl.value,
      ikon: 'fab fa-windows',
      warna: 'text-sky-600'
    },
    {
      label: 'Windows 7',
      ket: 'Aplikasi desktop (versi lama)',
      url: desktopWin7Url.value,
      ikon: 'fab fa-windows',
      warna: 'text-amber-600'
    }
  ].filter(Boolean)
)

async function keluar() {
  const ok = await confirm({
    title: 'Keluar dari akun?',
    message: 'Anda tetap bisa memakai Beranda tanpa login.',
    confirmText: 'Keluar',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  await auth.logout()
  toast.success('Berhasil keluar')
}
</script>
