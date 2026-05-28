<template>
  <div class="relative" data-notif-bell>
    <button
      type="button"
      @click="toggle"
      aria-label="Notifikasi"
      class="relative w-9 h-9 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center transition cursor-pointer"
    >
      <i class="fas fa-bell text-[var(--text-secondary)] text-base"></i>
      <span
        v-if="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-600 text-white text-[9px] font-black flex items-center justify-center shadow"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute right-0 mt-2 w-80 md:w-96 bg-[var(--bg-card)] rounded-2xl shadow-2xl border border-[var(--border-subtle)] z-50 overflow-hidden origin-top-right"
      >
        <div class="px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-sm font-black"><i class="fas fa-bell mr-1.5 text-cyan-600"></i>Notifikasi</h3>
          <button
            v-if="unreadCount > 0"
            @click="markAndClose"
            class="text-[10px] font-bold text-cyan-600 hover:underline"
          >
            Tandai semua dibaca
          </button>
        </div>

        <div class="flex gap-1 px-3 py-2 border-b border-[var(--border-subtle)]">
          <button
            @click="activeTab = 'unread'"
            :class="['flex-1 py-1.5 text-xs font-black rounded-lg transition', activeTab === 'unread' ? 'bg-cyan-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]']"
          >
            Belum dibaca ({{ unreadCount }})
          </button>
          <button
            @click="activeTab = 'all'"
            :class="['flex-1 py-1.5 text-xs font-black rounded-lg transition', activeTab === 'all' ? 'bg-cyan-600 text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-elevated)]']"
          >
            Semua ({{ items.length }})
          </button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto">
          <div v-if="visibleList.length === 0" class="p-8 text-center text-xs text-[var(--text-tertiary)] italic">
            <i class="far fa-bell-slash text-2xl mb-2 block"></i>
            {{ activeTab === 'unread' ? 'Tidak ada notifikasi baru' : 'Belum ada notifikasi' }}
          </div>
          <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
            <button
              v-for="it in visibleList"
              :key="it.id + '-' + it.jenis"
              type="button"
              @click="bukaItem(it)"
              class="w-full text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition flex items-start gap-3"
            >
              <div
                :class="['flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center', colorBg(it.color)]"
              >
                <i :class="['fas text-xs', it.icon || 'fa-bell', colorText(it.color)]"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-black text-[var(--text-primary)] truncate">{{ it.judul }}</p>
                <p v-if="it.body" class="text-[11px] text-[var(--text-secondary)] line-clamp-2">{{ it.body }}</p>
                <p class="text-[10px] text-[var(--text-tertiary)] mt-0.5">{{ fmtRelative(it.ts) }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useNotifications } from '@/composables/useNotifications'

const router = useRouter()
const { items, itemsUnread, unreadCount, markAllRead } = useNotifications()

const open = ref(false)
const activeTab = ref('unread')

const visibleList = computed(() => activeTab.value === 'unread' ? itemsUnread.value : items.value)

function toggle() { open.value = !open.value }

function bukaItem(it) {
  open.value = false
  // Mark all read saat klik item (UX: anggap user sudah lihat)
  markAllRead()
  if (it.link) {
    try { router.push(it.link) } catch { /* ignore */ }
  }
}

function markAndClose() {
  markAllRead()
}

function colorBg(c) {
  switch (c) {
    case 'cyan': return 'bg-cyan-100 dark:bg-cyan-900/40'
    case 'emerald': return 'bg-emerald-100 dark:bg-emerald-900/40'
    case 'amber': return 'bg-amber-100 dark:bg-amber-900/40'
    case 'teal': return 'bg-teal-100 dark:bg-teal-900/40'
    case 'rose': return 'bg-rose-100 dark:bg-rose-900/40'
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
    default: return 'text-slate-700 dark:text-slate-300'
  }
}

function fmtRelative(ts) {
  if (!ts) return '-'
  const diff = Date.now() - ts
  if (diff < 60_000) return 'baru saja'
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)} menit lalu`
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)} jam lalu`
  if (diff < 7 * 86400_000) return `${Math.floor(diff / 86400_000)} hari lalu`
  try {
    return new Date(ts).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return '-' }
}

// Close on outside click
function onDocClick(e) {
  if (!open.value) return
  // Cek apakah click di luar bell
  const el = e.target.closest('[data-notif-bell]')
  if (!el) open.value = false
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
})
</script>
