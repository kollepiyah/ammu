<template>
  <div class="min-h-[60vh] grid place-items-center text-center p-6">
    <div>
      <div
        class="w-24 h-24 rounded-3xl grid place-items-center mx-auto mb-5 text-[var(--color-primary)]"
        style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)"
      >
        <i class="fas fa-cube text-4xl"></i>
      </div>
      <h2 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">{{ judul }}</h2>
      <p class="text-sm text-[var(--text-secondary)] mt-2 max-w-sm mx-auto leading-relaxed">
        Modul ini belum tersedia di tampilan desktop. Navigasi tetap aktif — fitur akan ditambahkan menyusul.
      </p>
      <div class="mt-5 flex items-center justify-center gap-2">
        <button
          class="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:opacity-90 transition"
          @click="goHome"
        >
          <i class="fas fa-house mr-1.5"></i> Beranda
        </button>
        <button
          class="px-4 py-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-primary)] text-sm font-semibold hover:bg-[var(--bg-card-elevated)] transition"
          @click="goBack"
        >
          Kembali
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const judul = computed(() => {
  const j = route.params.judul
  return (Array.isArray(j) ? j[0] : j) || 'Modul'
})

function goHome() {
  router.push('/dashboard')
}
function goBack() {
  if (window.history.length > 1) router.back()
  else router.push('/dashboard')
}
</script>
