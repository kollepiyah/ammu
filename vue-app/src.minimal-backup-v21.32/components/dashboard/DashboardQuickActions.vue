<script setup>
// v.20.8.0526: Quick Actions = SEMUA menu sidebar yang accessible role (icon-only).
// Desktop: row penuh (no empty space), mobile: scroll horizontal.
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useMenus } from '@/composables/useMenus'

const router = useRouter()
const { menus } = useMenus()

// Mapping path → gradient (kalau path tidak ada di map, fallback ke teal)
const PATH_GRADIENT = {
  '/dashboard': 'from-slate-500 to-slate-700',
  '/statistik': 'from-violet-500 to-violet-700',
  '/kalender': 'from-orange-500 to-orange-700',
  '/profil': 'from-fuchsia-500 to-fuchsia-700',
  '/santri': 'from-cyan-500 to-cyan-700',
  '/guru': 'from-purple-500 to-purple-700',
  '/naik-kelas': 'from-teal-500 to-teal-700',
  '/rekap-prestasi': 'from-emerald-500 to-emerald-700',
  '/rapor': 'from-amber-500 to-amber-700',
  '/absensi-guru': 'from-blue-500 to-blue-700',
  '/kegiatan-pesantren': 'from-rose-500 to-rose-700',
  '/master-data': 'from-indigo-500 to-indigo-700',
  '/psb': 'from-pink-500 to-fuchsia-700',
  '/keuangan': 'from-emerald-500 to-emerald-700',
  '/pos-santri': 'from-teal-500 to-teal-700',
  '/bisyaroh': 'from-amber-500 to-amber-700',
  '/tabungan': 'from-pink-500 to-pink-700',
  '/tagihan': 'from-red-500 to-red-700',
  '/buku-induk': 'from-indigo-500 to-indigo-700',
  '/hutang-piutang': 'from-yellow-500 to-yellow-700',
  '/keu-pengaturan': 'from-slate-500 to-slate-700',
  '/posts': 'from-sky-500 to-sky-700',
  '/kritik-saran': 'from-lime-500 to-lime-700',
  '/pengaturan-web': 'from-gray-500 to-gray-700'
}

// Tailwind safelist hint untuk JIT compiler:
// from-indigo-500 to-indigo-700 from-teal-500 to-teal-700 from-cyan-500 to-cyan-700
// from-emerald-500 to-emerald-700 from-amber-500 to-amber-700 from-purple-500 to-purple-700
// from-blue-500 to-blue-700 from-rose-500 to-rose-700 from-pink-500 to-fuchsia-700
// from-slate-500 to-slate-700 from-violet-500 to-violet-700 from-orange-500 to-orange-700
// from-fuchsia-500 to-fuchsia-700 from-red-500 to-red-700 from-yellow-500 to-yellow-700
// from-sky-500 to-sky-700 from-lime-500 to-lime-700 from-gray-500 to-gray-700 from-pink-500 to-pink-700

// Skip Beranda (sudah dilihat sekarang) + Profil (di dropdown header)
const SKIP_PATHS = ['/dashboard', '/profil']

const actions = computed(() => {
  return menus.value
    .filter((m) => m.available && !SKIP_PATHS.includes(m.path))
    .map((m) => ({
      icon: m.icon,
      label: m.name,
      gradient: PATH_GRADIENT[m.path] || 'from-teal-500 to-teal-700',
      to: m.path
    }))
})

function go(to) {
  if (to.startsWith('/legacy/')) {
    window.location.href = to
    return
  }
  router.push(to)
}
</script>

<template>
  <!-- v.20.62.0526: Quick Actions slider horizontal (no wrap) — kyai req: gak nampil sampai 3 baris di desktop -->
  <div
    class="flex gap-2 md:gap-2.5 overflow-x-auto pb-1 justify-start snap-x snap-mandatory scrollbar-thin"
  >
    <button
      v-for="act in actions"
      :key="act.to"
      @click="go(act.to)"
      :class="[
        'group flex items-center justify-center snap-start',
        'w-10 h-10 md:w-11 md:h-11',
        'bg-gradient-to-br',
        act.gradient,
        'rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:scale-105 active:translate-y-0',
        'transition-all duration-200 ease-out cursor-pointer flex-shrink-0'
      ]"
      :title="act.label"
      :aria-label="act.label"
    >
      <i :class="['fas', act.icon, 'text-sm text-white drop-shadow']"></i>
    </button>
  </div>
</template>
