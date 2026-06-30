<template>
  <!-- v.21.84.0527: Sidebar match legacy - cream mint bg, flat menu, left accent active -->
  <aside
    :class="[
      'bg-white dark:bg-slate-900 text-slate-700 dark:text-white flex-shrink-0 flex flex-col fixed inset-y-0 left-0 transform transition-all duration-300 z-50 shadow-xl border-r border-emerald-100 dark:border-white/5 md:relative overflow-hidden',
      ui.sidebarOpen
        ? 'translate-x-0 w-72'
        : '-translate-x-full w-72 md:translate-x-0 md:w-0 md:border-0 md:shadow-none'
    ]"
    aria-label="Sidebar navigasi"
  >
    <div
      class="px-6 pt-8 pb-6 flex flex-col items-center gap-3 relative bg-emerald-50/60 dark:bg-black/20"
      style="padding-top: calc(2rem + env(safe-area-inset-top))"
    >
      <button
        @click="ui.closeSidebar()"
        class="md:hidden absolute top-4 right-4 text-slate-500 hover:text-slate-700 dark:text-white/70 dark:hover:text-white text-xl"
        style="top: calc(1rem + env(safe-area-inset-top))"
        aria-label="Tutup sidebar"
      >
        <i class="fas fa-times"></i>
      </button>
      <img
        :src="logoUrl"
        class="w-24 h-24 object-contain drop-shadow-md hover:scale-105 transition-transform"
        alt="Logo Mambaul Ulum"
        @error="onLogoError"
      />
      <div class="text-center w-full mt-1">
        <h1
          class="text-[19px] font-black text-slate-800 dark:text-white leading-tight tracking-tight"
        >
          <span class="block">{{ namaLine1 }}</span>
          <span v-if="namaLine2" class="block">{{ namaLine2 }}</span>
        </h1>
        <p
          class="text-[10px] text-teal-700 dark:text-teal-300 font-bold uppercase tracking-widest mt-3 bg-teal-100/60 dark:bg-white/10 px-3 py-1 rounded-full inline-block truncate"
        >
          {{ periodeHijri }}
        </p>
      </div>
    </div>

    <nav
      class="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar border-t border-emerald-100 dark:border-white/10"
      aria-label="Menu utama"
    >
      <template v-for="(items, group) in groupedMenus" :key="group">
        <p
          :class="[
            'text-[10px] font-bold uppercase tracking-widest pl-2 mb-1 mt-4 first:mt-1 flex items-center gap-1.5',
            group === 'Keuangan'
              ? 'text-cyan-700 dark:text-cyan-300'
              : 'text-slate-500 dark:text-slate-400'
          ]"
        >
          <i :class="['fas', groupIcon(group), 'text-[11px] opacity-80']"></i>{{ group }}
        </p>
        <button
          v-for="m in items"
          :key="m.path"
          @click="handleClick(m)"
          :class="[
            'menu-item w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center gap-3 font-semibold text-[14px] border-l-[3px]',
            isActive(m.path)
              ? group === 'Keuangan'
                ? 'border-cyan-600 text-cyan-800 bg-cyan-50 dark:border-cyan-400 dark:text-cyan-100 dark:bg-cyan-700/20'
                : 'border-teal-600 text-teal-800 bg-teal-50 dark:border-teal-400 dark:text-white dark:bg-teal-700/30'
              : group === 'Keuangan'
                ? 'border-transparent text-cyan-800 hover:bg-cyan-50 dark:text-cyan-100 dark:hover:bg-cyan-900/20'
                : 'border-transparent text-slate-700 hover:bg-emerald-100/50 dark:text-slate-300 dark:hover:bg-white/5',
            !m.available ? 'opacity-55' : ''
          ]"
          :title="m.available ? '' : 'Halaman ini masih di versi lama, akan dimigrasi'"
        >
          <i
            :class="[
              'fas',
              m.icon,
              'w-5 text-center text-[15px]',
              isActive(m.path)
                ? group === 'Keuangan'
                  ? 'text-cyan-600 dark:text-cyan-300'
                  : 'text-teal-600 dark:text-teal-300'
                : 'text-slate-500 dark:text-slate-400'
            ]"
          ></i>
          <span class="flex-1">{{ m.name }}</span>
          <span
            v-if="!m.available"
            class="text-[8px] bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-white/60 px-1.5 py-0.5 rounded uppercase tracking-wider"
            >Legacy</span
          >
        </button>
      </template>
    </nav>

    <div
      class="px-4 py-4 text-center bg-emerald-50/60 dark:bg-black/20 border-t border-emerald-100 dark:border-white/10"
      style="padding-bottom: calc(1rem + env(safe-area-inset-bottom))"
    >
      <p class="text-[9px] text-slate-500 dark:text-slate-400 font-bold tracking-widest uppercase">
        © 2026 Mambaul Ulum
      </p>
      <p class="text-[9px] text-teal-600 dark:text-teal-400 font-bold tracking-widest mt-0.5">
        v.1.1.2
      </p>
    </div>
  </aside>

  <div
    v-if="ui.sidebarOpen"
    @click="ui.closeSidebar()"
    class="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
  ></div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useUiStore } from '@/stores/ui'
import { useMenus } from '@/composables/useMenus'
import { useToast } from '@/composables/useToast'
import { masehiToHijri, getKalibrasi } from '@/utils/hijri'

const settings = useSettingsStore()
const ui = useUiStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { groupedMenus } = useMenus()

const GROUP_ICONS = {
  Menu: 'fa-th-large',
  Pendidikan: 'fa-graduation-cap',
  Keuangan: 'fa-coins',
  Sistem: 'fa-shield-halved'
}
function groupIcon(group) {
  return GROUP_ICONS[group] || 'fa-folder'
}

function toTitleCase(s) {
  if (!s) return ''
  return s
    .toLowerCase()
    .split(/\s+/)
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')
}
// v.86.0526: prioritas txtSidebarTitle (admin set di Pengaturan Web) > kopLine1 > default
const namaFull = computed(() => {
  const raw =
    settings.settings?.txtSidebarTitle ||
    settings.settings?.kopLine1 ||
    'PONDOK PESANTREN MAMBAUL ULUM'
  return toTitleCase(raw)
})
const namaLine1 = computed(() => {
  const s = namaFull.value
  const m = s.match(/^(Pondok Pesantren|Pesantren|Madrasah|Sekolah|Yayasan)\s+/i)
  return m ? m[1] : s
})
const namaLine2 = computed(() => {
  const s = namaFull.value
  const m = s.match(/^(Pondok Pesantren|Pesantren|Madrasah|Sekolah|Yayasan)\s+/i)
  return m ? s.replace(m[0], '').trim() : ''
})

const logoUrl = computed(() => settings.settings?.logoUrl || '/logo.png')
function onLogoError(e) {
  if (e?.target) e.target.src = '/favicon.svg'
}

const NAMA_BULAN_HIJRI = [
  'Muharram',
  'Shafar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  "Sya'ban",
  'Ramadhan',
  'Syawal',
  "Dzulqo'dah",
  'Dzulhijjah'
]
const periodeHijri = computed(() => {
  const custom = String(settings.settings?.txtPeriode || '').trim()
  if (custom) return custom
  try {
    const h = masehiToHijri(new Date(), getKalibrasi(settings.settings || {}))
    if (!h || !h.month || !h.year) return "Dzulqo'dah 1447"
    return `${NAMA_BULAN_HIJRI[h.month - 1] || '?'} ${h.year}`
  } catch {
    return "Dzulqo'dah 1447"
  }
})

function _parseMenuPath(path) {
  const [pathOnly, queryStr] = String(path || '').split('?')
  const query = {}
  if (queryStr) {
    queryStr.split('&').forEach((p) => {
      const [k, v] = p.split('=')
      if (k) query[k] = decodeURIComponent(v || '')
    })
  }
  return { pathOnly, query }
}

function isActive(path) {
  const { pathOnly, query } = _parseMenuPath(path)
  if (route.path !== pathOnly && !route.path.startsWith(pathOnly + '/')) return false
  if (Object.keys(query).length > 0) {
    return Object.entries(query).every(([k, v]) => String(route.query[k] || '') === v)
  }
  return !route.query.tab
}

function handleClick(menu) {
  if (!menu.available) {
    toast.info(`"${menu.name}" masih di versi lama. Migrasi sedang berlangsung.`)
    return
  }
  const { pathOnly, query } = _parseMenuPath(menu.path)
  router.push({ path: pathOnly, query }).catch(() => {})
  // v.21.84.0527: kyai req — hanya close sidebar di MOBILE setelah klik menu.
  // Desktop tetap open kecuali user explicit klik hamburger.
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    ui.closeSidebar()
  }
}
</script>
