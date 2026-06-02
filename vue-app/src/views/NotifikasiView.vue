<template>
  <div class="p-3 md:p-5 max-w-2xl mx-auto">
    <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
      <!-- Header + aksi -->
      <div class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2">
        <h2 class="text-base font-black text-[var(--text-primary)]">
          <i class="fas fa-bell mr-1.5 text-cyan-600"></i>Notifikasi
        </h2>
        <div class="flex gap-3">
          <button
            v-if="unreadCount > 0"
            @click="markAllRead"
            class="text-[11px] font-bold text-cyan-600 hover:underline"
          >
            <i class="fas fa-check mr-0.5"></i>Tandai dibaca
          </button>
          <button
            v-if="items.length > 0"
            @click="clearAll"
            class="text-[11px] font-bold text-rose-600 hover:underline"
            title="Sembunyikan semua notifikasi saat ini"
          >
            <i class="fas fa-broom mr-0.5"></i>Bersihkan
          </button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-1 px-3 py-2 border-b border-[var(--border-subtle)]">
        <button
          @click="activeTab = 'unread'"
          :class="['flex-1 py-2 text-xs font-black rounded-lg transition', activeTab === 'unread' ? 'bg-cyan-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]']"
        >
          Belum dibaca ({{ unreadCount }})
        </button>
        <button
          @click="activeTab = 'all'"
          :class="['flex-1 py-2 text-xs font-black rounded-lg transition', activeTab === 'all' ? 'bg-cyan-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]']"
        >
          Semua ({{ items.length }})
        </button>
      </div>

      <!-- List -->
      <div v-if="visibleList.length === 0" class="p-12 text-center text-sm text-[var(--text-tertiary)] italic">
        <i class="far fa-bell-slash text-3xl mb-2 block"></i>
        {{ activeTab === 'unread' ? 'Tidak ada notifikasi baru' : 'Belum ada notifikasi' }}
      </div>
      <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
        <button
          v-for="it in visibleList"
          :key="it.id + '-' + it.jenis"
          type="button"
          @click="bukaItem(it)"
          class="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition flex items-start gap-3"
        >
          <img
            v-if="it.thumbnail"
            :src="it.thumbnail"
            alt=""
            class="flex-shrink-0 w-11 h-11 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
            @error="$event.target.style.display = 'none'"
          />
          <div
            v-else
            :class="['flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center', colorBg(it.color)]"
          >
            <i :class="['fas text-base', it.icon || 'fa-bell', colorText(it.color)]"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-black text-[var(--text-primary)]">{{ it.judul }}</p>
            <p v-if="it.body" class="text-xs text-[var(--text-secondary)] line-clamp-2 mt-0.5">{{ it.body }}</p>
            <p class="text-[11px] text-[var(--text-tertiary)] mt-1">{{ fmtRelative(it.ts) }}</p>
          </div>
          <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs mt-1"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { items, itemsUnread, unreadCount, markAllRead, clearAll } = useNotifications()

const activeTab = ref('unread')
const visibleList = computed(() => (activeTab.value === 'unread' ? itemsUnread.value : items.value))

function bukaItem(it) {
  markAllRead()
  if (it.link) {
    try {
      router.push(it.link)
    } catch {
      /* ignore */
    }
  }
}

function colorBg(c) {
  switch (c) {
    case 'cyan': return 'bg-cyan-100 dark:bg-cyan-900/40'
    case 'emerald': return 'bg-emerald-100 dark:bg-emerald-900/40'
    case 'amber': return 'bg-amber-100 dark:bg-amber-900/40'
    case 'teal': return 'bg-teal-100 dark:bg-teal-900/40'
    case 'rose': return 'bg-rose-100 dark:bg-rose-900/40'
    case 'blue': return 'bg-blue-100 dark:bg-blue-900/40'
    default: return 'bg-slate-100 dark:bg-slate-800'
  }
}
function colorText(c) {
  switch (c) {
    case 'cyan': return 'text-cyan-700 dark:text-cyan-300'
    case 'emerald': return 'text-emerald-700 dark:text-emerald-300'
    case 'amber': return 'text-amber-700 dark:text-amber-300'
    case 'teal': return 'text-teal-700 dark:text-teal-300'
    case 'rose': return 'text-rose-700 dark:text-rose-300'
    case 'blue': return 'text-blue-700 dark:text-blue-300'
    default: return 'text-slate-700 dark:text-slate-300'
  }
}
function fmtRelative(ts) {
  if (!ts) return '-'
  const diff = Date.now() - ts
  if (diff < 60000) return 'baru saja'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`
  if (diff < 7 * 86400000) return `${Math.floor(diff / 86400000)} hari lalu`
  try {
    return new Date(ts).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch {
    return '-'
  }
}
</script>
