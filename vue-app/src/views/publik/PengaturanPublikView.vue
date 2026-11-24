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

    <p class="text-center text-[10px] text-[var(--text-secondary)]">{{ versiApp }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
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
