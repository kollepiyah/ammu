<template>
  <!-- Kitab & Wirid — daftar per kategori (blueprint §3.5). Sama untuk /umum & /ibadah. Daftar
       ringkas disimpan di HP 6 jam (tanpa realtime), isinya baru ditarik saat bacaan dibuka. -->
  <div class="max-w-xl mx-auto">
    <div class="flex gap-2 px-4 py-3 overflow-x-auto">
      <button
        v-for="k in pilihan"
        :key="k.kunci"
        type="button"
        class="shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer"
        :class="
          kategori === k.kunci
            ? 'bg-teal-600 border-teal-600 text-white'
            : 'border-slate-200 dark:border-slate-700 text-[var(--text-primary)]'
        "
        @click="kategori = k.kunci"
      >
        {{ k.label }}
      </button>
    </div>

    <p
      v-if="loading && !daftar.length"
      class="text-center text-sm text-[var(--text-secondary)] py-10"
    >
      <i class="fas fa-spinner fa-spin mr-1.5"></i>Memuat…
    </p>
    <p v-else-if="!daftar.length" class="text-center text-sm text-[var(--text-secondary)] py-10">
      {{
        galat ? 'Belum bisa memuat. Periksa internet lalu coba lagi.' : 'Belum ada bacaan di sini.'
      }}
    </p>

    <button
      v-for="a in daftar"
      :key="a.id"
      v-haptic
      type="button"
      class="w-full flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 text-left cursor-pointer"
      @click="router.push(`${awalan}/wirid/${a.id}`)"
    >
      <!-- Kyai 26 Nov: daftar cukup judul, tanpa ikon & label kategori (sudah ada chip di atas). -->
      <span class="min-w-0 flex-1 text-sm font-bold text-[var(--text-primary)] truncate">{{
        a.judul
      }}</span>
      <i class="fas fa-chevron-right text-xs text-[var(--text-secondary)]"></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDataTamu } from '@/composables/useDataTamu'
import { ambilDaftarAmalan } from '@/services/amalan'
import { daftarKategoriTampil, susunDaftarAmalan } from '@/utils/amalan'

const router = useRouter()
const route = useRoute()
const awalan = computed(() => (route.path.startsWith('/umum') ? '/umum' : '/ibadah'))
const kategori = ref('semua')
const { data, loading, galat } = useDataTamu('amalan_daftar', ambilDaftarAmalan, {
  umurMs: 6 * 60 * 60 * 1000
})
const pilihan = computed(() => daftarKategoriTampil(data.value || []))
const daftar = computed(() => susunDaftarAmalan(data.value || [], kategori.value))
</script>
