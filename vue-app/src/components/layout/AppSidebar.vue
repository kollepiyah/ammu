<template>
  <!-- v.21.84.0527: Sidebar match legacy - cream mint bg, flat menu, left accent active -->
  <aside
    :class="[
      'bg-white dark:bg-slate-900 text-slate-700 dark:text-white flex-shrink-0 flex flex-col fixed inset-y-0 left-0 transform transition-all duration-300 z-50 shadow-xl border-r border-emerald-100 dark:border-white/5 overflow-hidden',
      isDrawer ? '' : 'md:relative',
      ui.sidebarOpen
        ? 'translate-x-0 w-72'
        : isDrawer
          ? '-translate-x-full w-72'
          : '-translate-x-full w-72 md:translate-x-0 md:w-0 md:border-0 md:shadow-none'
    ]"
    :style="isDrawer ? { paddingLeft: 'env(safe-area-inset-left, 0px)' } : null"
    aria-label="Sidebar navigasi"
  >
    <div
      :class="[
        'flex relative bg-emerald-50/60 dark:bg-black/20',
        isCompactLandscape
          ? 'px-4 py-3 flex-row items-center gap-3'
          : 'px-6 pt-8 pb-6 flex-col items-center gap-3'
      ]"
      :style="
        isCompactLandscape
          ? { paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }
          : { paddingTop: 'calc(2rem + env(safe-area-inset-top))' }
      "
    >
      <button
        v-if="isDrawer"
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-700 dark:text-white/70 dark:hover:text-white text-lg cursor-pointer"
        :style="{ top: 'calc(0.75rem + env(safe-area-inset-top))' }"
        aria-label="Tutup sidebar"
        @click="ui.closeSidebar()"
      >
        <i class="fas fa-times"></i>
      </button>
      <img
        :src="logoUrl"
        :class="[
          'object-contain drop-shadow-md transition-transform shrink-0',
          isCompactLandscape ? 'w-11 h-11' : 'w-24 h-24 hover:scale-105'
        ]"
        alt="Logo Mambaul Ulum"
        @error="onLogoError"
      />
      <div :class="isCompactLandscape ? 'text-left min-w-0 pr-7' : 'text-center w-full mt-1'">
        <h1
          :class="[
            'font-black text-slate-800 dark:text-white leading-tight tracking-tight',
            isCompactLandscape ? 'text-sm truncate' : 'text-[19px]'
          ]"
        >
          <span :class="isCompactLandscape ? 'inline mr-1' : 'block'">{{ namaLine1 }}</span>
          <span v-if="namaLine2" :class="isCompactLandscape ? 'inline' : 'block'">{{
            namaLine2
          }}</span>
        </h1>
        <p
          :class="[
            'text-[10px] text-teal-700 dark:text-teal-300 font-bold uppercase tracking-widest bg-teal-100/60 dark:bg-white/10 px-2.5 py-0.5 rounded-full inline-block truncate',
            isCompactLandscape ? 'mt-1' : 'mt-3 px-3 py-1'
          ]"
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
          :class="[
            'menu-item w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 flex items-center gap-3 font-semibold text-[14px] border-l-[3px]',
            isActive(m.path)
              ? group === 'Keuangan'
                ? 'border-cyan-600 text-cyan-800 bg-cyan-50/90 shadow-sm dark:border-cyan-400 dark:text-cyan-100 dark:bg-cyan-500/15'
                : 'border-teal-600 text-teal-800 bg-teal-50/90 shadow-sm dark:border-teal-400 dark:text-white dark:bg-teal-500/20'
              : group === 'Keuangan'
                ? 'border-transparent text-cyan-800 hover:bg-cyan-50/70 dark:text-cyan-200 dark:hover:bg-cyan-500/10'
                : 'border-transparent text-slate-700 hover:bg-emerald-50/80 dark:text-slate-200 dark:hover:bg-white/5',
            !m.available ? 'opacity-55' : ''
          ]"
          :title="m.available ? '' : 'Halaman ini masih di versi lama, akan dimigrasi'"
          @click="handleClick(m)"
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
      <p
        v-if="versiApp"
        class="text-[9px] text-teal-600 dark:text-teal-400 font-bold tracking-widest mt-0.5"
      >
        {{ versiApp }}
      </p>
    </div>
  </aside>

  <div
    v-if="ui.sidebarOpen && isDrawer"
    class="fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
    @click="ui.closeSidebar()"
  ></div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
// v.1.4.2: SATU sumber nomor versi (lihat utils/appVersion.js) — label yang diketik
//   tangan di layar sudah terbukti membeku (kaki Data Santri tertinggal di v.74.0526).
import { labelVersi } from '@/utils/appVersion'
import { useUiStore } from '@/stores/ui'
import { useMenus } from '@/composables/useMenus'
import { useMobileShell } from '@/composables/useMobileShell'
import { useToast } from '@/composables/useToast'
import { masehiToHijri, getKalibrasi, NAMA_BULAN_HIJRI } from '@/utils/hijri'

const settings = useSettingsStore()
const versiApp = computed(() => labelVersi(settings.settings))
const ui = useUiStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()
const { groupedMenus } = useMenus()
const { isMobile, isCompactLandscape, showBottomNav } = useMobileShell()
// Di HP & tablet Android/PWA (portrait maupun landscape), sidebar selalu drawer melayang agar
// konsisten dengan BottomNav & top bar hijau (tidak menabrak status bar hijau di sisi kiri).
const isDrawer = computed(() => showBottomNav.value || isMobile.value || isCompactLandscape.value)

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
  // v.21.84.0527: kyai req — tutup sidebar otomatis di HP (portrait maupun landscape) setelah klik menu.
  // Desktop tetap open kecuali user explicit klik hamburger.
  if (isDrawer.value) {
    ui.closeSidebar()
  }
}
</script>
