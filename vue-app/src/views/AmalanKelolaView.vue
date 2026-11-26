<script setup>
// Kelola Kitab & Wirid — Master Data > Kitab & Wirid (Kyai 25 Nov 2026: data induk di Master
// Data, bukan menu pita baru). Sejak 26 Nov 2026 di sini hanya DAFTAR; tambah/ubah dibuka di
// halaman editor sendiri (/master-data/wirid/:id, AmalanEditorView) supaya nyaman.
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import { ambilSemuaAmalan } from '@/services/amalan'
import { labelKategori, susunDaftarAmalan, babAmalan } from '@/utils/amalan'

const router = useRouter()
const toast = useToast()
const daftar = ref([])
const memuat = ref(true)

const terurut = computed(() => susunDaftarAmalan(daftar.value, 'semua'))

async function muat() {
  memuat.value = true
  try {
    daftar.value = await ambilSemuaAmalan()
  } catch (e) {
    toast.error('Gagal memuat: ' + (e?.message || e))
  } finally {
    memuat.value = false
  }
}
onMounted(muat)

function buka(a = null) {
  router.push(`/master-data/wirid/${encodeURIComponent(a?.id || 'baru')}`)
}
</script>

<template>
  <div class="space-y-4">
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 mb-3">
        <div>
          <h3 class="text-sm font-black text-[var(--text-primary)]">
            <i class="fas fa-book-open text-teal-600 mr-1.5"></i>Kitab & Wirid
          </h3>
          <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
            Bacaan yang tampil di menu Wirid aplikasi (Beranda & Portal). Draf tak terlihat
            pengguna.
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 px-3 py-2 rounded-xl text-xs font-bold bg-teal-600 text-white cursor-pointer"
          @click="buka()"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </div>

      <p v-if="memuat" class="text-xs text-[var(--text-secondary)] py-4 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </p>
      <p v-else-if="!terurut.length" class="text-xs text-[var(--text-secondary)] py-4 text-center">
        Belum ada bacaan. Tekan <b>Tambah</b> untuk mengisi yang pertama.
      </p>
      <button
        v-for="a in terurut"
        :key="a.id"
        type="button"
        class="w-full flex items-center gap-3 py-2.5 border-b last:border-b-0 border-slate-100 dark:border-slate-800 text-left cursor-pointer"
        @click="buka(a)"
      >
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-bold text-[var(--text-primary)] truncate">{{
            a.judul
          }}</span>
          <span class="block text-[11px] text-[var(--text-secondary)]">
            {{ labelKategori(a.kategori) }} · urutan {{ a.urutan || 0 }} · {{ babAmalan(a).length }}
            {{ a.bentuk === 'berbab' ? 'bab' : 'halaman' }}
          </span>
        </span>
        <span
          v-if="a.aktif === false"
          class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >Draf</span
        >
        <i class="fas fa-pen text-xs text-[var(--text-secondary)]"></i>
      </button>
    </div>
  </div>
</template>
