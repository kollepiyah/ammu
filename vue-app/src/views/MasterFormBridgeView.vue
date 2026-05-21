<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-amber-300 dark:border-amber-700 shadow-sm text-center">
      <i class="fas fa-info-circle text-amber-500 text-4xl mb-3"></i>
      <h2 class="text-lg font-black text-slate-800 dark:text-white mb-2">
        Tambah / Edit Data — Form Lengkap di Sistem Lama
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Form CRUD (Santri, Guru, Lembaga) dengan multi-select dropdown guru pengajar,
        shift Pagi/Sore, custom fields ACF, dan validasi kompleks masih live di sistem lama.
        Vue migration form ini di-defer ke Phase 5.13+.
      </p>
      <div class="flex flex-col sm:flex-row gap-2 justify-center">
        <a
          :href="`#legacy-${entity}`"
          @click.prevent="openLegacy(entity)"
          class="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition"
        >
          <i class="fas fa-external-link-alt mr-1"></i>Buka Form Lengkap di Sistem Lama
        </a>
        <router-link
          to="/dashboard"
          class="px-5 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-sm transition"
        >
          <i class="fas fa-home mr-1"></i>Kembali ke Beranda
        </router-link>
      </div>
      <p class="text-[10px] text-slate-400 mt-4">
        <i class="fas fa-circle-info mr-1"></i>Sub-route Vue Phase 5.9 — bridge to legacy
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()
const entity = computed(() => route.params.entity || 'santri')

function openLegacy(ent) {
  // Legacy URL pattern: /#santri /#master-data /#guru
  // Saat kyai klik, harus open legacy index.html (root /), bukan Vue.
  // Karena Vue di hash route, kita perlu redirect ke root tanpa hash.
  const legacyPath = {
    santri: '/?page=master-data&tab=tab-santri',
    guru: '/?page=master-data&tab=tab-guru',
    lembaga: '/?page=master-data'
  }[ent] || '/'
  // Note: legacy app belum baca query param page/tab — saat ini cuma redirect ke root.
  window.location.href = legacyPath
}
</script>
