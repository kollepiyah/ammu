<template>
  <!-- v.21.80.0526: Sidebar Pesantren Modern — bg-sidebar + olive active + gold accent left border -->
  <aside :class="['bg-[var(--bg-sidebar)] text-[var(--text-primary)] flex-shrink-0 flex flex-col absolute inset-y-0 left-0 transform transition-all duration-300 z-50 shadow-[var(--shadow-lg)] border-r border-[var(--border-subtle)] md:relative overflow-hidden', ui.sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 md:translate-x-0 md:w-0 md:border-0 md:shadow-none']" aria-label="Sidebar navigasi">
    <!-- Logo + nama lembaga + periode hijri -->
    <div class="px-6 pt-8 pb-6 flex flex-col items-center gap-3 relative bg-[var(--color-primary-soft)] border-b border-[var(--border-subtle)]">
      <button @click="ui.closeSidebar()" class="md:hidden absolute top-4 right-4 text-[var(--text-secondary)] hover:text-[var(--color-primary)] text-xl" aria-label="Tutup sidebar">
        <i class="fas fa-times"></i>
      </button>
      <img :src="logoUrl" class="w-24 h-24 object-contain drop-shadow-md hover:scale-105 transition-transform" alt="Logo Mambaul Ulum" @error="onLogoError" />
      <div class="text-center w-full mt-1">
        <h1 class="text-[19px] font-black text-[var(--text-primary)] leading-tight tracking-tight">
          <span class="block">{{ namaLine1 }}</span>
          <span v-if="namaLine2" class="block">{{ namaLine2 }}</span>
        </h1>
        <p class="text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-widest mt-3 bg-[var(--color-accent-soft)] px-3 py-1 rounded-[var(--radius-full)] inline-block truncate border border-[var(--border-subtle)]">
          {{ periodeHijri }}
        </p>
      </div>
    </div>

    <!-- Menu navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar" aria-label="Menu utama">
      <template v-for="(items, group) in groupedMenus" :key="group">
        <p class="text-[10px] font-bold uppercase tracking-widest pl-2 mb-1 mt-4 first:mt-1 flex items-center gap-1.5 text-[var(--text-tertiary)]">
          <i :class="['fas', groupIcon(group), 'text-[11px] opacity-80']"></i>{{ group }}
        </p>
        <button v-for="m in items" :key="m.path" @click="handleClick(m)" :class="[
          'menu-item w-full text-left px-3 py-2.5 rounded-[var(--radius-md)] transition-colors flex items-center gap-3 font-semibold text-[14px] border-l-[3px]',
          isActive(m.path)
            ? 'border-[var(--color-accent)] text-[var(--color-primary)] bg-[var(--color-primary-soft)]'
            : 'border-transparent text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
          !m.available ? 'opacity-55' : ''
        ]" :title="m.available ? '' : 'Halaman ini masih di versi lama, akan dimigrasi'">
          <i :class="['fas', m.icon, 'w-5 text-center text-[15px]', isActive(m.path) ? 'text-[var(--color-accent)]' : 'text-[var(--text-tertiary)]']"></i>
          <span class="flex-1">{{ m.name }}</span>
          <span v-if="!m.available" class="text-[8px] bg-[var(--bg-muted)] text-[var(--text-tertiary)] px-1.5 py-0.5 rounded uppercase tracking-wider border border-[var(--border-subtle)]">Legacy</span>
        </button>
      </template>
    </nav>

    <!-- Footer versi -->
    <div class="px-4 py-4 text-center bg-[var(--color-primary-soft)] border-t border-[var(--border-subtle)]">
      <p class="text-[9px] text-[var(--text-tertiary)] font-bold tracking-widest uppercase">
        © 2026 Mambaul Ulum
      </p>
      <p class="text-[9px] text-[var(--color-accent)] font-bold tracking-widest mt-0.5">
        v.21.80.0526
      </p>
    </div>
  </aside>

  <div v-if="ui.sidebarOpen" @click="ui.closeSidebar()" class="md:hidden fixed inset-0 bg-[var(--bg-overlay)] z-40 backdrop-blur-sm"></div>
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
const namaFull = computed(() => {
  const raw = settings.settings?.txtSidebarTitle || settings.settings?.kopLine1 || 'PONDOK PESANTREN MAMBAUL ULUM'
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

const NAMA_BULAN_HIJRI = ['Muharram','Shafar','Rabiul Awal','Rabiul Akhir','Jumadil Awal','Jumadil Akhir','Rajab',"Sya'ban",'Ramadhan','Syawal',"Dzulqo'dah",'Dzulhijjah']
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
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    ui.closeSidebar()
  }
}
</script>
