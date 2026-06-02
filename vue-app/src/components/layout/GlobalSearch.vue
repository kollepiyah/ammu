<template>
  <div class="relative flex md:flex-1 md:max-w-md md:mx-3 justify-end" data-global-search>
    <!-- Desktop: bar memanjang -->
    <div
      class="hidden md:flex items-center w-full bg-[var(--bg-muted)] rounded-xl px-3 h-9 border border-transparent focus-within:border-teal-400 transition"
    >
      <i class="fas fa-search text-[var(--text-tertiary)] text-sm mr-2"></i>
      <input
        v-model="q"
        @focus="open = true"
        type="search"
        placeholder="Cari santri atau guru..."
        class="flex-1 bg-transparent text-sm outline-none text-[var(--text-primary)] min-w-0"
        aria-label="Cari santri atau guru"
      />
    </div>

    <!-- Mobile: ikon -->
    <button
      class="md:hidden w-10 h-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
      @click="openMobile"
      aria-label="Cari"
    >
      <i class="fas fa-search text-[var(--text-secondary)] text-base"></i>
    </button>

    <!-- Desktop: dropdown hasil -->
    <div
      v-if="open && q.trim() && !mobileOpen"
      class="hidden md:block absolute top-11 left-0 right-0 bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] z-50 overflow-hidden max-h-[70vh] overflow-y-auto"
    >
      <div v-if="santriHits.length === 0 && guruHits.length === 0" class="p-6 text-center text-xs text-[var(--text-tertiary)] italic">
        Tidak ada hasil untuk "{{ q }}".
      </div>
      <template v-else>
        <div v-if="santriHits.length" class="py-1">
          <p class="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-[var(--text-tertiary)]">Santri · {{ santriHits.length }}</p>
          <button v-for="s in santriHits" :key="'s' + s.id" @click="goSantri(s)" class="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/30 flex items-center gap-3 transition cursor-pointer">
            <span class="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-black flex-shrink-0">{{ initial(s.nama) }}</span>
            <span class="flex-1 min-w-0"><span class="block text-sm font-bold truncate">{{ s.nama }}</span><span class="block text-[11px] text-[var(--text-secondary)] truncate">{{ metaSantri(s) }}</span></span>
            <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
          </button>
        </div>
        <div v-if="guruHits.length" class="py-1 border-t border-[var(--border-subtle)]">
          <p class="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-[var(--text-tertiary)]">Guru · {{ guruHits.length }}</p>
          <button v-for="g in guruHits" :key="'g' + g.id" @click="goGuru(g)" class="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-900/30 flex items-center gap-3 transition cursor-pointer">
            <span class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-black flex-shrink-0">{{ initial(g.nama) }}</span>
            <span class="flex-1 min-w-0"><span class="block text-sm font-bold truncate">{{ g.nama }}</span><span class="block text-[11px] text-[var(--text-secondary)] truncate">Guru/Pegawai · {{ g.lembaga || '-' }}</span></span>
            <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
          </button>
        </div>
      </template>
    </div>

    <!-- Mobile: overlay penuh -->
    <Teleport to="body">
      <div v-if="mobileOpen" class="md:hidden fixed inset-0 z-[100] bg-[var(--bg-page)] flex flex-col">
        <div class="flex items-center gap-2 p-3 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <i class="fas fa-search text-[var(--text-tertiary)]"></i>
          <input ref="mobileInput" v-model="q" type="search" placeholder="Cari santri atau guru..." class="flex-1 bg-transparent text-base outline-none text-[var(--text-primary)] min-w-0" aria-label="Cari" />
          <button @click="mobileOpen = false" class="text-sm font-bold text-cyan-700 dark:text-cyan-300 px-2">Batal</button>
        </div>
        <div class="flex-1 overflow-y-auto">
          <div v-if="!q.trim()" class="p-8 text-center text-xs text-[var(--text-tertiary)] italic">Ketik nama santri atau guru…</div>
          <div v-else-if="santriHits.length === 0 && guruHits.length === 0" class="p-8 text-center text-xs text-[var(--text-tertiary)] italic">Tidak ada hasil untuk "{{ q }}".</div>
          <template v-else>
            <div v-if="santriHits.length">
              <p class="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-[var(--text-tertiary)]">Santri · {{ santriHits.length }}</p>
              <button v-for="s in santriHits" :key="'ms' + s.id" @click="goSantri(s)" class="w-full text-left px-4 py-3 border-b border-[var(--border-subtle)] flex items-center gap-3 cursor-pointer">
                <span class="w-9 h-9 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center text-xs font-black flex-shrink-0">{{ initial(s.nama) }}</span>
                <span class="flex-1 min-w-0"><span class="block text-sm font-bold truncate">{{ s.nama }}</span><span class="block text-[11px] text-[var(--text-secondary)] truncate">{{ metaSantri(s) }}</span></span>
                <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
              </button>
            </div>
            <div v-if="guruHits.length">
              <p class="px-4 pt-3 pb-1 text-[10px] font-black uppercase tracking-wider text-[var(--text-tertiary)]">Guru · {{ guruHits.length }}</p>
              <button v-for="g in guruHits" :key="'mg' + g.id" @click="goGuru(g)" class="w-full text-left px-4 py-3 border-b border-[var(--border-subtle)] flex items-center gap-3 cursor-pointer">
                <span class="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-black flex-shrink-0">{{ initial(g.nama) }}</span>
                <span class="flex-1 min-w-0"><span class="block text-sm font-bold truncate">{{ g.nama }}</span><span class="block text-[11px] text-[var(--text-secondary)] truncate">Guru/Pegawai · {{ g.lembaga || '-' }}</span></span>
                <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
              </button>
            </div>
          </template>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSantri } from '@/composables/useSantri'
import { useGuru } from '@/composables/useGuru'

const router = useRouter()
const { santriRaw } = useSantri()
const { guruRaw } = useGuru()

const q = ref('')
const open = ref(false)
const mobileOpen = ref(false)
const mobileInput = ref(null)
const LIMIT = 6

const kw = computed(() => q.value.trim().toLowerCase())
const santriHits = computed(() => {
  if (!kw.value) return []
  return (santriRaw.value || [])
    .filter((s) => {
      const n = String(s.nama || '').toLowerCase()
      const nis = String(s.nis || '').toLowerCase()
      return n.includes(kw.value) || (nis && nis.includes(kw.value))
    })
    .slice(0, LIMIT)
})
const guruHits = computed(() => {
  if (!kw.value) return []
  return (guruRaw.value || [])
    .filter((g) => String(g.nama || '').toLowerCase().includes(kw.value))
    .slice(0, LIMIT)
})

function initial(nama) {
  return String(nama || '?').trim().charAt(0).toUpperCase()
}
function metaSantri(s) {
  const lmb = s.lembaga || s.lembaga_sekolah || '-'
  const kelas = s.kelas || s.kelas_sekolah
  return lmb + (kelas ? ' · Kelas ' + kelas : '')
}
function reset() {
  q.value = ''
  open.value = false
  mobileOpen.value = false
}
function goSantri(s) {
  reset()
  router.push('/profil/santri/' + s.id)
}
function goGuru(g) {
  reset()
  router.push('/profil/guru/' + g.id)
}
async function openMobile() {
  mobileOpen.value = true
  await nextTick()
  try { mobileInput.value?.focus() } catch {}
}

function onDocClick(e) {
  if (!open.value) return
  if (!e.target.closest('[data-global-search]')) open.value = false
}
onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>
