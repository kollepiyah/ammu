<template>
  <!-- v.21.84.0527: Kritik & Saran — match legacy (form sesi + admin reply + self-list) -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-comment-dots text-teal-600 mr-2"></i>Kritik &amp; Saran
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        {{ isAdmin ? 'Inbox kritik & saran dari santri/wali/guru' : 'Sampaikan kritik, saran, atau apresiasi Anda' }}
      </p>
    </div>

    <!-- FORM KIRIM (semua user) -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm space-y-3">
      <div>
        <label class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">Kategori</label>
        <select
          v-model="form.kategori"
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="saran">Saran</option>
          <option value="kritik">Kritik</option>
          <option value="apresiasi">Apresiasi</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </div>
      <div>
        <label class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2">Pesan</label>
        <textarea
          v-model="form.pesan"
          rows="4"
          maxlength="1000"
          placeholder="Tuliskan kritik / saran / apresiasi Anda..."
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"
        ></textarea>
        <p class="text-[10px] text-[var(--text-tertiary)] text-right mt-1">{{ form.pesan.length }}/1000 karakter</p>
      </div>
      <button
        @click="kirim"
        :disabled="!form.pesan.trim() || saving"
        class="w-full px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
      >
        <i v-if="saving" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-paper-plane"></i>
        {{ saving ? 'Mengirim...' : 'Kirim Pesan' }}
      </button>
    </div>

    <!-- ADMIN: INBOX semua pesan -->
    <div v-if="isAdmin" class="space-y-3">
      <div class="flex items-center justify-between px-1">
        <h2 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">
          <i class="fas fa-inbox text-teal-600 mr-1.5"></i>Inbox Pesan
        </h2>
        <span class="text-[11px] font-bold text-teal-700 bg-teal-100 dark:bg-teal-900/40 dark:text-teal-300 px-2.5 py-1 rounded-full">
          {{ items.length }} pesan
        </span>
      </div>

      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-[var(--border-subtle)]">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl"></i>
      </div>
      <div
        v-else-if="items.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-comment-slash text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada pesan masuk.</p>
      </div>
      <div v-else class="space-y-2.5">
        <div
          v-for="k in items"
          :key="k.id"
          class="bg-[var(--bg-card)] border-l-4 border-teal-500 rounded-r-xl rounded-l-md p-4 border-y border-r border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex justify-between items-start gap-2 mb-2">
            <div class="min-w-0">
              <p class="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap">
                <span>{{ kategoriIcon(k.kategori) }} {{ (k.kategori || 'lainnya').toUpperCase() }}</span>
                <span
                  :class="[
                    'text-[9px] font-bold px-2 py-0.5 rounded-full',
                    k.reply
                      ? 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
                      : 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300'
                  ]"
                >
                  {{ k.reply ? 'SUDAH DIBALAS' : 'BELUM DIBALAS' }}
                </span>
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                {{ k.pengirim_nama || 'Anonim' }} &middot; {{ roleLabel(k.pengirim_role) }}{{ k.pengirim_lembaga && k.pengirim_lembaga !== '-' ? ' · ' + k.pengirim_lembaga : '' }}
              </p>
            </div>
            <span class="text-[10px] text-[var(--text-tertiary)] whitespace-nowrap">{{ formatTgl(k.tanggal) }}</span>
          </div>
          <p class="text-sm text-[var(--text-primary)] whitespace-pre-line">{{ k.pesan }}</p>

          <div v-if="k.reply" class="mt-3 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-3 rounded-r-lg">
            <p class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase tracking-wide mb-1">
              <i class="fas fa-reply mr-1"></i>Balasan Admin{{ k.reply_at ? ' · ' + formatTgl(k.reply_at) : '' }}
            </p>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">{{ k.reply }}</p>
            <p v-if="k.reply_by" class="text-[9px] text-[var(--text-tertiary)] mt-1 italic">&mdash; {{ k.reply_by }}</p>
          </div>

          <div class="flex gap-3 mt-3 justify-end">
            <button @click="openReply(k)" class="text-[11px] text-teal-700 dark:text-teal-300 hover:underline cursor-pointer font-bold">
              <i class="fas fa-reply mr-1"></i>{{ k.reply ? 'Edit Balasan' : 'Balas' }}
            </button>
            <button @click="deleteItem(k)" class="text-[11px] text-rose-600 hover:underline cursor-pointer font-bold">
              <i class="fas fa-trash mr-1"></i>Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SELF LIST: pesan saya (semua user) -->
    <div class="space-y-3">
      <h2 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider px-1">
        <i class="fas fa-user-circle text-teal-600 mr-1.5"></i>Pesan Saya
      </h2>
      <div
        v-if="myMsgs.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-6 border border-dashed border-[var(--border-default)] text-center"
      >
        <p class="text-sm text-[var(--text-secondary)] italic">Anda belum mengirim pesan.</p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="k in myMsgs"
          :key="k.id"
          class="bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] p-3 rounded-xl"
        >
          <div class="flex justify-between items-start mb-1">
            <p class="text-xs font-bold text-[var(--text-primary)]">{{ kategoriIcon(k.kategori) }} {{ (k.kategori || 'lainnya').toUpperCase() }}</p>
            <span class="text-[10px] text-[var(--text-tertiary)]">{{ formatTgl(k.tanggal) }}</span>
          </div>
          <p class="text-xs text-[var(--text-secondary)] whitespace-pre-line">{{ k.pesan }}</p>
          <div v-if="k.reply" class="mt-2 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-2 rounded-r-lg">
            <p class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase mb-1">
              <i class="fas fa-reply mr-1"></i>Balasan Admin{{ k.reply_at ? ' · ' + formatTgl(k.reply_at) : '' }}
            </p>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">{{ k.reply }}</p>
          </div>
          <p v-else class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
            <i class="fas fa-clock mr-1"></i>Menunggu balasan admin...
          </p>
        </div>
      </div>
    </div>

    <!-- MODAL REPLY (admin) -->
    <div
      v-if="replyOpen"
      class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="closeReply()"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black">
          <i class="fas fa-reply text-teal-600 mr-2"></i>Balas Pesan
        </h3>
        <div class="bg-[var(--bg-muted)] border border-[var(--border-subtle)] p-2.5 rounded-lg text-xs text-[var(--text-secondary)] max-h-24 overflow-y-auto whitespace-pre-line">
          <span class="font-bold">{{ replyTarget?.pengirim_nama || 'Anonim' }}:</span> {{ replyTarget?.pesan }}
        </div>
        <textarea
          v-model="replyText"
          rows="4"
          maxlength="2000"
          placeholder="Tulis balasan untuk pengirim..."
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-teal-500 outline-none resize-none"
        ></textarea>
        <div class="flex gap-2">
          <button
            @click="closeReply()"
            class="flex-1 px-4 py-2.5 bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 text-[var(--text-primary)] font-bold rounded-xl text-sm transition cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="saveReply"
            :disabled="replyText.trim().length < 3 || savingReply"
            class="flex-1 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2"
          >
            <i v-if="savingReply" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-paper-plane"></i>
            {{ savingReply ? 'Mengirim...' : 'Kirim Balasan' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()

const items = ref([])
const loading = ref(true)
const saving = ref(false)
const form = ref({ kategori: 'saran', pesan: '' })
let unsub = null

const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
})

const myId = computed(() => String(auth.sesiAktif?.id || ''))
const myMsgs = computed(() =>
  items.value.filter((k) => String(k.pengirim_id) === myId.value)
)

const KATEGORI_ICON = { saran: '💡', kritik: '📣', apresiasi: '🙏', lainnya: '💬' }
function kategoriIcon(k) {
  return KATEGORI_ICON[k] || '💬'
}

const ROLE_LABELS = { admin: 'Admin', guru: 'Guru/Pegawai', santri: 'Santri/Wali' }
function roleLabel(r) {
  return ROLE_LABELS[r] || 'User'
}

function formatTgl(t) {
  if (!t) return '-'
  try {
    const d = new Date(t)
    if (isNaN(d)) return String(t)
    return d.toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return String(t)
  }
}

async function kirim() {
  if (!form.value.pesan.trim() || saving.value) return
  saving.value = true
  try {
    const sesi = auth.sesiAktif
    const id = `ks_${Date.now()}_${sesi?.id || 'anon'}`
    await setDoc(doc(db, 'kritik_saran', id), {
      id,
      kategori: form.value.kategori,
      pesan: form.value.pesan.trim(),
      tanggal: new Date().toISOString(),
      pengirim_id: String(sesi?.id || ''),
      pengirim_nama: sesi?.nama || sesi?.guru || sesi?.username || 'User',
      pengirim_role: sesi?.role || 'user',
      pengirim_lembaga: sesi?.lembaga || '-',
      status: 'baru',
      created_at: serverTimestamp()
    })
    toast.success('Terkirim! Terima kasih atas masukannya.')
    form.value = { kategori: 'saran', pesan: '' }
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function deleteItem(k) {
  const ok = await confirmDlg({
    title: 'Hapus pesan?',
    message: 'Pesan ini akan dihapus permanen.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await deleteDoc(doc(db, 'kritik_saran', String(k.id)))
    toast.success('Pesan dihapus')
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  }
}

const replyOpen = ref(false)
const replyTarget = ref(null)
const replyText = ref('')
const savingReply = ref(false)

function openReply(k) {
  replyTarget.value = k
  replyText.value = k.reply || ''
  replyOpen.value = true
}

function closeReply() {
  if (savingReply.value) return
  replyOpen.value = false
  replyTarget.value = null
  replyText.value = ''
}

async function saveReply() {
  if (replyText.value.trim().length < 3 || savingReply.value) return
  savingReply.value = true
  try {
    const sesi = auth.sesiAktif
    await setDoc(
      doc(db, 'kritik_saran', String(replyTarget.value.id)),
      {
        reply: replyText.value.trim(),
        reply_at: new Date().toISOString(),
        reply_by: sesi?.nama || sesi?.username || 'Admin'
      },
      { merge: true }
    )
    toast.success('Balasan terkirim')
    closeReply()
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    savingReply.value = false
  }
}

onMounted(() => {
  unsub = subscribeColl('kritik_saran', (docs) => {
    items.value = docs.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) { try { unsub() } catch (e) {} }
})
</script>
