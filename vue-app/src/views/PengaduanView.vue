<template>
  <!-- Layanan Pengaduan — channel formal (terpisah dari Kritik & Saran).
       Form terbuka semua user; inbox + tindak-lanjut HANYA super/admin/KORLAP. -->
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div
      v-if="!isDesktop"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black">
        <i class="fas fa-triangle-exclamation text-amber-600 mr-2"></i>Layanan Pengaduan
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        {{
          canManage
            ? 'Inbox pengaduan — tindak lanjuti & pantau statusnya'
            : 'Sampaikan pengaduan Anda secara aman & rahasia'
        }}
      </p>
    </div>

    <!-- FORM KIRIM (semua user) -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm space-y-3"
    >
      <div>
        <label
          class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2"
          >Kategori</label
        >
        <select
          v-model="form.kategori"
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-amber-500 outline-none"
        >
          <option v-for="k in KATEGORI" :key="k.v" :value="k.v">{{ k.icon }} {{ k.label }}</option>
        </select>
      </div>
      <div>
        <label
          class="block text-[11px] font-black text-[var(--text-primary)] uppercase tracking-wider mb-2"
          >Isi Pengaduan</label
        >
        <textarea
          v-model="form.pesan"
          rows="4"
          maxlength="2000"
          placeholder="Jelaskan pengaduan Anda sejelas mungkin (lokasi, waktu, kejadian)..."
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-amber-500 outline-none resize-none"
        ></textarea>
        <p class="text-[10px] text-[var(--text-tertiary)] text-right mt-1">
          {{ form.pesan.length }}/2000 karakter
        </p>
      </div>
      <button
        :disabled="!form.pesan.trim() || saving"
        class="w-full px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-2"
        @click="kirim"
      >
        <i v-if="saving" class="fas fa-spinner fa-spin"></i>
        <i v-else class="fas fa-paper-plane"></i>
        {{ saving ? 'Mengirim...' : 'Kirim Pengaduan' }}
      </button>
    </div>

    <!-- ADMIN/KORLAP: INBOX semua pengaduan -->
    <div v-if="canManage" class="space-y-3">
      <div class="flex items-center justify-between px-1 gap-2 flex-wrap">
        <h2 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">
          <i class="fas fa-inbox text-amber-600 mr-1.5"></i>Inbox Pengaduan
        </h2>
        <span
          class="text-[11px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-900/40 dark:text-amber-300 px-2.5 py-1 rounded-full"
        >
          {{ items.length }} total
        </span>
      </div>

      <!-- Filter status -->
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="f in FILTER_TABS"
          :key="f.key"
          :class="[
            'text-[11px] font-bold px-3 py-1.5 rounded-full border transition cursor-pointer',
            filterStatus === f.key
              ? 'bg-amber-600 text-white border-amber-600'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--bg-card-elevated)]'
          ]"
          @click="filterStatus = f.key"
        >
          {{ f.label }} ({{ countByStatus(f.key) }})
        </button>
      </div>

      <div
        v-if="loading"
        class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-[var(--border-subtle)]"
      >
        <i class="fas fa-spinner fa-spin text-amber-500 text-3xl"></i>
      </div>
      <div
        v-else-if="inboxItems.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-clipboard-check text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">
          Tak ada pengaduan pada filter ini.
        </p>
      </div>
      <div v-else class="space-y-2.5">
        <div
          v-for="k in inboxItems"
          :key="k.id"
          class="bg-[var(--bg-card)] border-l-4 border-amber-500 rounded-r-xl rounded-l-md p-4 border-y border-r border-[var(--border-subtle)] shadow-sm"
        >
          <div class="flex justify-between items-start gap-2 mb-2">
            <div class="min-w-0">
              <p
                class="text-xs font-black text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap"
              >
                <span>{{ kategoriIcon(k.kategori) }} {{ kategoriLabel(k.kategori) }}</span>
                <span
                  :class="['text-[9px] font-bold px-2 py-0.5 rounded-full', statusCls(k.status)]"
                >
                  {{ statusLabel(k.status) }}
                </span>
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                {{ k.pengirim_nama || 'Anonim' }} &middot; {{ roleLabel(k.pengirim_role)
                }}{{
                  k.pengirim_lembaga && k.pengirim_lembaga !== '-' ? ' · ' + k.pengirim_lembaga : ''
                }}
              </p>
            </div>
            <span class="text-[10px] text-[var(--text-tertiary)] whitespace-nowrap">{{
              formatTgl(k.tanggal)
            }}</span>
          </div>
          <p class="text-sm text-[var(--text-primary)] whitespace-pre-line">{{ k.pesan }}</p>

          <!-- Tanggapan / tindak lanjut -->
          <div
            v-if="k.reply"
            class="mt-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-3 rounded-r-lg"
          >
            <p
              class="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-wide mb-1"
            >
              <i class="fas fa-reply mr-1"></i>Tindak Lanjut{{
                k.reply_at ? ' · ' + formatTgl(k.reply_at) : ''
              }}
            </p>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">{{ k.reply }}</p>
            <p v-if="k.reply_by" class="text-[9px] text-[var(--text-tertiary)] mt-1 italic">
              &mdash; {{ k.reply_by }}
            </p>
          </div>

          <!-- Aksi: ubah status + tanggapi + hapus -->
          <div class="flex gap-2 mt-3 items-center justify-end flex-wrap">
            <select
              :value="k.status || 'baru'"
              class="text-[11px] px-2 py-1 rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
              @change="setStatus(k, $event.target.value)"
            >
              <option v-for="s in STATUS" :key="s.key" :value="s.key">Status: {{ s.label }}</option>
            </select>
            <button
              class="text-[11px] text-amber-700 dark:text-amber-300 hover:underline cursor-pointer font-bold"
              @click="openReply(k)"
            >
              <i class="fas fa-reply mr-1"></i
              >{{ k.reply ? 'Edit Tindak Lanjut' : 'Tindak Lanjut' }}
            </button>
            <button
              class="text-[11px] text-rose-600 hover:underline cursor-pointer font-bold"
              @click="deleteItem(k)"
            >
              <i class="fas fa-trash mr-1"></i>Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SELF LIST: pengaduan saya (semua user) -->
    <div class="space-y-3">
      <h2 class="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider px-1">
        <i class="fas fa-user-shield text-amber-600 mr-1.5"></i>Pengaduan Saya
      </h2>
      <div
        v-if="myMsgs.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-6 border border-dashed border-[var(--border-default)] text-center"
      >
        <p class="text-sm text-[var(--text-secondary)] italic">Anda belum mengirim pengaduan.</p>
      </div>
      <div v-else class="space-y-2">
        <div
          v-for="k in myMsgs"
          :key="k.id"
          class="bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)] p-3 rounded-xl"
        >
          <div class="flex justify-between items-start mb-1 gap-2">
            <p
              class="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 flex-wrap"
            >
              <span>{{ kategoriIcon(k.kategori) }} {{ kategoriLabel(k.kategori) }}</span>
              <span :class="['text-[9px] font-bold px-2 py-0.5 rounded-full', statusCls(k.status)]">
                {{ statusLabel(k.status) }}
              </span>
            </p>
            <span class="text-[10px] text-[var(--text-tertiary)] whitespace-nowrap">{{
              formatTgl(k.tanggal)
            }}</span>
          </div>
          <p class="text-xs text-[var(--text-secondary)] whitespace-pre-line">{{ k.pesan }}</p>
          <div
            v-if="k.reply"
            class="mt-2 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-2 rounded-r-lg"
          >
            <p class="text-[10px] font-black text-amber-700 dark:text-amber-300 uppercase mb-1">
              <i class="fas fa-reply mr-1"></i>Tindak Lanjut{{
                k.reply_at ? ' · ' + formatTgl(k.reply_at) : ''
              }}
            </p>
            <p class="text-xs text-[var(--text-primary)] whitespace-pre-line">{{ k.reply }}</p>
          </div>
          <p v-else class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
            <i class="fas fa-clock mr-1"></i>Menunggu tindak lanjut...
          </p>
        </div>
      </div>
    </div>

    <!-- MODAL TINDAK LANJUT (admin/KORLAP) -->
    <div
      v-if="replyOpen"
      class="fixed inset-0 z-50 bg-slate-900/70 flex items-center justify-center p-4 backdrop-blur-sm"
      @click.self="closeReply()"
    >
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full p-5 space-y-3">
        <h3 class="text-base font-black">
          <i class="fas fa-reply text-amber-600 mr-2"></i>Tindak Lanjut Pengaduan
        </h3>
        <div
          class="bg-[var(--bg-muted)] border border-[var(--border-subtle)] p-2.5 rounded-lg text-xs text-[var(--text-secondary)] max-h-24 overflow-y-auto whitespace-pre-line"
        >
          <span class="font-bold">{{ replyTarget?.pengirim_nama || 'Anonim' }}:</span>
          {{ replyTarget?.pesan }}
        </div>
        <textarea
          v-model="replyText"
          rows="4"
          maxlength="2000"
          placeholder="Tulis tindak lanjut / tanggapan resmi..."
          class="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] focus:ring-2 focus:ring-amber-500 outline-none resize-none"
        ></textarea>
        <div class="flex gap-2">
          <button
            class="flex-1 px-4 py-2.5 bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 text-[var(--text-primary)] font-bold rounded-xl text-sm transition cursor-pointer"
            @click="closeReply()"
          >
            Batal
          </button>
          <button
            :disabled="replyText.trim().length < 3 || savingReply"
            class="flex-1 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm transition cursor-pointer flex items-center justify-center gap-2"
            @click="saveReply"
          >
            <i v-if="savingReply" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-paper-plane"></i>
            {{ savingReply ? 'Menyimpan...' : 'Simpan Tindak Lanjut' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, setOne, mergeOne, deleteOne, serverTimestamp } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useDesktopShell } from '@/composables/useDesktopShell'

const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()
const { isElectron: isDesktop } = useDesktopShell()

const items = ref([])
const loading = ref(true)
const saving = ref(false)
const form = ref({ kategori: 'fasilitas', pesan: '' })
const filterStatus = ref('semua')
let unsub = null

// Baca/kelola inbox: super/admin selalu; KORLAP (Koordinator Lapangan) via jabatan.
const canManage = computed(() => auth.cekHakAkses('akses_pengaduan'))

const myUid = computed(() => String(auth.fbUser?.id || auth.sesiAktif?.supabase_uid || ''))
const myId = computed(() => String(auth.sesiAktif?.id || ''))
const myMsgs = computed(() =>
  items.value.filter(
    (k) => String(k.pengirim_id) === myId.value || String(k.pengirim_uid || '') === myUid.value
  )
)

const KATEGORI = [
  { v: 'fasilitas', label: 'Fasilitas & Sarana', icon: '🏫' },
  { v: 'kebersihan', label: 'Kebersihan', icon: '🧹' },
  { v: 'keamanan', label: 'Keamanan', icon: '🛡️' },
  { v: 'pelayanan', label: 'Pelayanan', icon: '🤝' },
  { v: 'akademik', label: 'Akademik', icon: '📚' },
  { v: 'lainnya', label: 'Lainnya', icon: '💬' }
]
function kategoriIcon(k) {
  return (KATEGORI.find((x) => x.v === k) || {}).icon || '💬'
}
function kategoriLabel(k) {
  return (KATEGORI.find((x) => x.v === k) || {}).label || 'Lainnya'
}

const STATUS = [
  {
    key: 'baru',
    label: 'Baru',
    cls: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  },
  {
    key: 'diproses',
    label: 'Diproses',
    cls: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
  },
  {
    key: 'selesai',
    label: 'Selesai',
    cls: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
  }
]
function statusLabel(s) {
  return (STATUS.find((x) => x.key === (s || 'baru')) || STATUS[0]).label
}
function statusCls(s) {
  return (STATUS.find((x) => x.key === (s || 'baru')) || STATUS[0]).cls
}

const FILTER_TABS = [
  { key: 'semua', label: 'Semua' },
  ...STATUS.map((s) => ({ key: s.key, label: s.label }))
]
function countByStatus(key) {
  if (key === 'semua') return items.value.length
  return items.value.filter((k) => (k.status || 'baru') === key).length
}
const inboxItems = computed(() => {
  if (filterStatus.value === 'semua') return items.value
  return items.value.filter((k) => (k.status || 'baru') === filterStatus.value)
})

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
    const id = `pgd_${Date.now()}_${sesi?.id || 'anon'}`
    await setOne('pengaduan', id, {
      id,
      kategori: form.value.kategori,
      pesan: form.value.pesan.trim(),
      tanggal: new Date().toISOString(),
      pengirim_id: String(sesi?.id || ''),
      // pengirim_uid = auth.uid() → dipakai RLS self-read (lihat migrasi pengaduan)
      pengirim_uid: myUid.value,
      pengirim_nama: sesi?.nama || sesi?.guru || sesi?.username || 'User',
      pengirim_role: sesi?.role || 'user',
      pengirim_lembaga: sesi?.lembaga || '-',
      status: 'baru',
      created_at: serverTimestamp()
    })
    toast.success('Pengaduan terkirim. Terima kasih, akan kami tindak lanjuti.')
    form.value = { kategori: 'fasilitas', pesan: '' }
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function setStatus(k, status) {
  if (!status || status === (k.status || 'baru')) return
  try {
    const sesi = auth.sesiAktif
    await mergeOne('pengaduan', String(k.id), {
      status,
      status_at: new Date().toISOString(),
      status_by: sesi?.nama || sesi?.username || 'Petugas'
    })
    toast.success('Status → ' + statusLabel(status))
  } catch (e) {
    toast.error('Gagal ubah status: ' + (e?.message || e))
  }
}

async function deleteItem(k) {
  const ok = await confirmDlg({
    title: 'Hapus pengaduan?',
    message: 'Pengaduan ini akan dihapus permanen.',
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('pengaduan', String(k.id), { sesi: auth.sesiAktif })
    toast.success('Pengaduan dihapus')
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
    const patch = {
      reply: replyText.value.trim(),
      reply_at: new Date().toISOString(),
      reply_by: sesi?.nama || sesi?.username || 'Petugas'
    }
    // Tindak lanjut ditulis → status minimal 'diproses' (kalau masih 'baru').
    if ((replyTarget.value.status || 'baru') === 'baru') patch.status = 'diproses'
    await mergeOne('pengaduan', String(replyTarget.value.id), patch)
    toast.success('Tindak lanjut tersimpan')
    closeReply()
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    savingReply.value = false
  }
}

onMounted(() => {
  unsub = subscribeColl('pengaduan', (docs) => {
    items.value = docs.sort((a, b) =>
      String(b.tanggal || '').localeCompare(String(a.tanggal || ''))
    )
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsub) {
    try {
      unsub()
    } catch (e) {}
  }
})
</script>
