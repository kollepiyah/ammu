<template>
  <div class="p-3 space-y-4 max-w-xl mx-auto">
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center"
    >
      <img src="/logo.png" alt="Logo Mambaul Ulum" class="w-20 h-20 mx-auto object-contain" />
      <h2 class="mt-3 text-lg font-black text-[var(--text-primary)]">Ammu Online</h2>
      <p class="text-xs text-[var(--text-secondary)]">{{ versi }}</p>
      <p class="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
        Sistem informasi Pondok Pesantren Mambaul Ulum untuk santri, wali, guru, dan pengurus.
      </p>
    </div>

    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-slate-200 dark:border-slate-700 divide-y divide-slate-200 dark:divide-slate-700"
    >
      <a
        v-for="t in TAUTAN"
        :key="t.label"
        :href="t.url"
        target="_blank"
        rel="noopener"
        class="flex items-center gap-3 px-4 py-3"
      >
        <i :class="['fas w-5 text-center text-teal-600', t.ikon]"></i>
        <span class="flex-1 text-sm font-bold text-[var(--text-primary)]">{{ t.label }}</span>
        <i class="fas fa-arrow-up-right-from-square text-[10px] text-[var(--text-tertiary)]"></i>
      </a>
    </div>

    <p class="text-center text-[11px] text-[var(--text-tertiary)]">
      © {{ new Date().getFullYear() }} Pondok Pesantren Mambaul Ulum · Bakafrawi Project
    </p>
  </div>
</template>

<script setup>
import { APP_VERSION } from '@/utils/appVersion'
import { URL_PRIVASI } from '@/composables/useUnduhan'
import { URL_PLAYSTORE } from '@/utils/unduhan'

const versi = 'Versi ' + String(APP_VERSION || '').replace(/^v\.?/i, '')
const TAUTAN = [
  { label: 'Kebijakan Privasi', url: URL_PRIVASI, ikon: 'fa-shield-halved' },
  { label: 'Beri nilai di Play Store', url: URL_PLAYSTORE, ikon: 'fa-star' }
]
</script>
