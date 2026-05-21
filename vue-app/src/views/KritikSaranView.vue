<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl p-5 text-white shadow-md">
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-comment-dots mr-2"></i>Sampaikan Pesan Anda
      </h1>
      <p class="text-sm text-orange-50 mt-1">
        Pesan Anda akan dibaca langsung oleh admin pondok.
      </p>
    </div>

    <!-- Form Tulis Pesan -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-3">
        <i class="fas fa-edit text-orange-500 mr-1"></i>Tulis Pesan
      </h3>
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Kategori</label>
          <select
            v-model="form.kategori"
            class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-orange-500 outline-none"
          >
            <option value="saran">Saran</option>
            <option value="kritik">Kritik</option>
            <option value="apresiasi">Apresiasi</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Pesan Anda</label>
          <textarea
            v-model="form.pesan"
            rows="4"
            maxlength="1000"
            placeholder="Tulis kritik atau saran Anda..."
            class="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-orange-500 outline-none resize-none"
          ></textarea>
          <p class="text-[10px] text-slate-400 text-right mt-1">{{ form.pesan.length }}/1000 karakter</p>
        </div>
        <button
          type="button"
          @click="onKirim"
          :disabled="isSending || !form.pesan.trim()"
          class="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition"
        >
          <i class="fas fa-paper-plane mr-1"></i>{{ isSending ? 'Mengirim...' : 'Kirim Pesan' }}
        </button>
      </div>
    </div>

    <!-- Admin: list pesan dari semua user (dengan reply button) -->
    <div v-if="isAdmin" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-amber-300 dark:border-amber-700 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black uppercase tracking-wide text-amber-700 dark:text-amber-300">
          <i class="fas fa-inbox mr-1"></i>Pesan Masuk
        </h3>
        <span class="text-[10px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-bold">
          {{ allPesan.length }} pesan
        </span>
      </div>
      <div v-if="allPesan.length === 0" class="text-center text-xs text-slate-400 italic py-6">
        Belum ada pesan masuk.
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="k in allPesan"
          :key="k.id"
          class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-r-xl"
        >
          <div class="flex justify-between items-start gap-2 mb-2">
            <div class="flex-1 min-w-0">
              <p class="text-xs font-black text-slate-700 dark:text-slate-200">
                {{ kategoriIcon(k.kategori) }} {{ k.kategori?.toUpperCase() }}
                <span :class="['ml-1 text-[9px] px-1.5 py-0.5 rounded font-black',
                  k.reply
                    ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300'
                    : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
                ]">
                  {{ k.reply ? 'SUDAH DIBALAS' : 'BELUM DIBALAS' }}
                </span>
              </p>
              <p class="text-[10px] text-slate-500 mt-0.5">
                {{ k.pengirim_nama || '(anonim)' }} ·
                {{ roleLabel(k.pengirim_role) }}
                <span v-if="k.pengirim_lembaga && k.pengirim_lembaga !== '-'">· {{ k.pengirim_lembaga }}</span>
              </p>
            </div>
            <span class="text-[10px] text-slate-500 whitespace-nowrap">{{ fmtDateTime(k.tanggal) }}</span>
          </div>
          <p class="text-sm text-slate-700 dark:text-slate-200 whitespace-pre-line">{{ k.pesan }}</p>
          <!-- Reply block -->
          <div v-if="k.reply" class="mt-3 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-3 rounded-r-lg">
            <p class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase mb-1">
              <i class="fas fa-reply mr-1"></i>Balasan Admin · {{ fmtDateTime(k.reply_at) }}
            </p>
            <p class="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line">{{ k.reply }}</p>
            <p v-if="k.reply_by" class="text-[9px] text-slate-500 mt-1 italic">— {{ k.reply_by }}</p>
          </div>
          <!-- Buttons -->
          <div class="flex gap-2 mt-3 justify-end">
            <button
              type="button"
              @click="onBalas(k)"
              class="text-[10px] text-teal-700 dark:text-teal-300 hover:underline font-bold"
            >
              <i class="fas fa-reply mr-1"></i>{{ k.reply ? 'Edit Balasan' : 'Balas' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Self: pesan saya + reply admin -->
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
      <h3 class="text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-3">
        <i class="fas fa-user-circle mr-1 text-teal-500"></i>Pesan Saya
      </h3>
      <div v-if="myPesan.length === 0" class="text-center text-xs text-slate-400 italic py-4">
        Anda belum mengirim pesan.
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="k in myPesan"
          :key="k.id"
          class="bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-600 p-3 rounded-xl"
        >
          <div class="flex justify-between items-start mb-1">
            <p class="text-xs font-bold text-slate-700 dark:text-slate-200">
              {{ kategoriIcon(k.kategori) }} {{ k.kategori?.toUpperCase() }}
            </p>
            <span class="text-[10px] text-slate-500">{{ fmtDateTime(k.tanggal) }}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-line">{{ k.pesan }}</p>
          <div v-if="k.reply" class="mt-2 bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-2 rounded-r-lg">
            <p class="text-[10px] font-black text-teal-700 dark:text-teal-300 uppercase mb-1">
              <i class="fas fa-reply mr-1"></i>Balasan Admin · {{ fmtDateTime(k.reply_at) }}
            </p>
            <p class="text-xs text-slate-700 dark:text-slate-200 whitespace-pre-line">{{ k.reply }}</p>
          </div>
          <p v-else class="text-[10px] text-slate-400 italic mt-2">
            <i class="fas fa-clock mr-1"></i>Menunggu balasan admin...
          </p>
        </div>
      </div>
    </div>

    <p class="text-center text-[10px] text-slate-400 pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.18 — Kritik &amp; Saran 2-jalur
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, setOne, addOne, updateOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { fmtDateTime } from '@/utils/format'

const auth = useAuthStore()
const toast = useToast()

const kritikSaran = ref([])
let unsub = null

const form = ref({ kategori: 'saran', pesan: '' })
const isSending = ref(false)

const isAdmin = computed(() => {
  const s = auth.sesiAktif
  return s && (s.role === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem))
})

const myPesan = computed(() => {
  const myId = String(auth.sesiAktif?.id || '')
  return kritikSaran.value
    .filter((k) => String(k.pengirim_id) === myId)
    .sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
})

const allPesan = computed(() =>
  [...kritikSaran.value].sort((a, b) => (b.tanggal || '').localeCompare(a.tanggal || ''))
)

function kategoriIcon(k) {
  const icons = { saran: '💡', kritik: '⚠️', apresiasi: '🙏', lainnya: '📝' }
  return icons[k] || '📝'
}
function roleLabel(role) {
  return { admin: 'Admin', guru: 'Guru/Pegawai', santri: 'Santri/Wali' }[role] || 'User'
}

onMounted(() => {
  unsub = subscribeColl('kritik_saran', (docs) => {
    kritikSaran.value = docs
  })
})
onUnmounted(() => {
  if (unsub) { try { unsub() } catch (e) {} }
})

async function onKirim() {
  if (!form.value.pesan.trim()) return
  if (form.value.pesan.length < 5) {
    toast.warning('Pesan minimal 5 karakter')
    return
  }
  isSending.value = true
  try {
    const s = auth.sesiAktif
    const id = 'ks_' + Date.now()
    const data = {
      id,
      kategori: form.value.kategori,
      pesan: form.value.pesan.trim(),
      pengirim_id: s?.id || 'anonim',
      pengirim_nama: s?.nama || 'Anonim',
      pengirim_role: s?.role || 'guest',
      pengirim_lembaga: s?.lembaga || '-',
      tanggal: new Date().toISOString()
    }
    await setOne('kritik_saran', id, data)
    form.value.pesan = ''
    toast.success('Pesan terkirim — admin akan membaca')
  } catch (e) {
    toast.error('Gagal kirim: ' + (e.message || e))
  } finally {
    isSending.value = false
  }
}

async function onBalas(k) {
  const existing = k.reply || ''
  const reply = window.prompt(
    `Balas pesan dari ${k.pengirim_nama || 'User'}:\n\n"${k.pesan?.substring(0, 100)}..."`,
    existing
  )
  if (!reply || !reply.trim()) return
  if (reply.trim().length < 3) {
    toast.warning('Balasan minimal 3 karakter')
    return
  }
  try {
    await updateOne('kritik_saran', k.id, {
      reply: reply.trim(),
      reply_at: new Date().toISOString(),
      reply_by: auth.sesiAktif?.nama || 'Admin'
    })
    toast.success('Balasan terkirim')
  } catch (e) {
    toast.error('Gagal balas: ' + (e.message || e))
  }
}
</script>
