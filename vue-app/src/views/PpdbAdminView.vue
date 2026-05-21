<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div v-if="!isAdmin" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Admin only</p>
    </div>

    <template v-else>
      <!-- Header -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-clipboard-list text-teal-500 mr-2"></i>PSB — Pendaftaran Santri Baru
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">Daftar calon santri yang sudah submit formulir online</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs">
              <span class="text-amber-700 font-bold">{{ stats.pending }}</span>
              <span class="text-slate-500 ml-1">pending</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
              <span class="text-emerald-700 font-bold">{{ stats.approved }}</span>
              <span class="text-slate-500 ml-1">approved</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs">
              <span class="text-rose-700 font-bold">{{ stats.rejected }}</span>
              <span class="text-slate-500 ml-1">rejected</span>
            </div>
          </div>
        </div>
        <!-- Link share form -->
        <div class="mt-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-200 flex items-center gap-3">
          <i class="fas fa-link text-teal-600 text-lg"></i>
          <div class="flex-1 min-w-0">
            <p class="text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase">Link Formulir Public</p>
            <code class="text-xs text-slate-700 dark:text-slate-300 break-all">{{ publicFormUrl }}</code>
          </div>
          <button @click="copyLink" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg transition">
            <i class="fas fa-copy mr-1"></i>Salin
          </button>
        </div>
      </div>

      <!-- v.21.25.0526: PSB Assets — Upload Syarat + Info Pembayaran + ACF per-lembaga (issue #50) -->
      <details class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <summary class="cursor-pointer text-sm font-black text-slate-800 dark:text-white">
          <i class="fas fa-paperclip text-amber-500 mr-1"></i>Upload Syarat & Info Pembayaran per Lembaga
        </summary>
        <div class="mt-3 space-y-3">
          <select v-model="psbAssetLembaga" class="px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white">
            <option value="">-- Pilih lembaga --</option>
            <option v-for="l in ['TPQ Pagi','TPQ Sore','Pra PTPT','PTPT','PPPH','TK A','TK B','SDI','PKBM']" :key="l" :value="l">{{ l }}</option>
          </select>
          <div v-if="psbAssetLembaga" class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">Syarat & Ketentuan (URL atau base64)</label>
              <input v-model="psbAssetSyarat" type="text" placeholder="https://... atau data:image/png;base64,..." class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white" />
              <input type="file" accept="image/*,application/pdf" @change="onUploadSyarat" class="mt-1 text-xs" />
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">Info Pembayaran (URL atau base64)</label>
              <input v-model="psbAssetPembayaran" type="text" placeholder="https://... atau data:image/png;base64,..." class="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 bg-white" />
              <input type="file" accept="image/*,application/pdf" @change="onUploadPembayaran" class="mt-1 text-xs" />
            </div>
          </div>
          <button v-if="psbAssetLembaga" @click="savePsbAssets" :disabled="savingAssets" class="px-3 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50">
            <i class="fas fa-save mr-1"></i>{{ savingAssets ? 'Menyimpan...' : 'Simpan Asset Lembaga' }}
          </button>
        </div>
      </details>

      <!-- Filter -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div class="md:col-span-2 relative">
            <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input
              v-model="search"
              type="text"
              placeholder="Cari nama / wali / WA / No. Pendaftaran..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <select v-model="filterStatus" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="enrolled">Enrolled</option>
          </select>
          <select v-model="filterLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="">Semua lembaga</option>
            <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
          <select v-model="filterTahun" class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-teal-500 outline-none md:col-span-2">
            <option value="">Semua tahun ajaran</option>
            <option v-for="t in tahunOptions" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
      </div>

      <!-- Loading / Empty -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat pendaftar...</p>
      </div>
      <div v-else-if="filteredPpdb.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center">
        <i class="fas fa-inbox text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700">{{ search ? 'Tidak ada cocok' : 'Belum ada pendaftar' }}</p>
      </div>

      <!-- List -->
      <div v-else class="space-y-2">
        <div
          v-for="p in filteredPpdb"
          :key="p.id"
          :class="['rounded-xl p-3 md:p-4 border shadow-sm', statusBg(p.status)]"
        >
          <div class="flex items-start gap-3">
            <div :class="[
              'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold',
              p.jk === 'L' ? 'bg-cyan-500' : 'bg-pink-500'
            ]">
              {{ p.jk === 'L' ? 'L' : 'P' }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-black text-slate-800 truncate">
                    <span v-if="p.no_pendaftaran" class="text-[10px] text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded mr-1">{{ p.no_pendaftaran }}</span>
                    {{ p.nama }}
                  </h3>
                  <p class="text-[11px] text-slate-500 mt-0.5">
                    {{ p.tempat_lahir || '-' }}, {{ p.tgl_lahir }} · Daftar: {{ fmtDate(p.tanggal_daftar || p.tgl_daftar) }}
                  </p>
                </div>
                <span :class="['text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0', statusBadge(p.status)]">
                  {{ p.status || 'pending' }}
                </span>
              </div>
              <!-- Detail rows -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-[11px]">
                <div class="bg-white/60 p-2 rounded">
                  <p class="text-slate-500"><i class="fas fa-school mr-1"></i>Lembaga Tujuan:</p>
                  <p class="font-bold text-slate-800">{{ p.lembaga_tujuan }} {{ p.is_mukim ? '(Mukim)' : '' }}</p>
                </div>
                <div class="bg-white/60 p-2 rounded">
                  <p class="text-slate-500"><i class="fas fa-user-friends mr-1"></i>Wali / Yang Mendaftarkan:</p>
                  <p class="font-bold text-slate-800 truncate">{{ p.yang_mendaftarkan || p.nama_wali || '—' }}</p>
                  <a v-if="p.wa_wali" :href="`https://wa.me/${cleanWa(p.wa_wali)}`" target="_blank" class="text-green-600 hover:underline">
                    <i class="fab fa-whatsapp mr-1"></i>{{ p.wa_wali }}
                  </a>
                </div>
              </div>
              <p v-if="p.catatan" class="text-[11px] text-slate-600 mt-2 italic">
                <i class="fas fa-comment mr-1"></i>{{ p.catatan }}
              </p>
              <!-- Actions -->
              <div class="flex gap-1.5 mt-3 justify-end flex-wrap">
                <RouterLink :to="`/psb/${p.id}`" class="text-[10px] px-2.5 py-1 bg-sky-100 hover:bg-sky-200 text-sky-700 font-bold rounded transition">
                  <i class="fas fa-eye mr-1"></i>Lihat
                </RouterLink>
                <button
                  v-if="p.status !== 'approved'"
                  @click="updateStatus(p, 'approved')"
                  class="text-[10px] px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-bold rounded transition"
                >
                  <i class="fas fa-check mr-1"></i>Approve
                </button>
                <button
                  v-if="p.status !== 'rejected'"
                  @click="updateStatus(p, 'rejected')"
                  class="text-[10px] px-2.5 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold rounded transition"
                >
                  <i class="fas fa-times mr-1"></i>Reject
                </button>
                <button
                  @click="onDelete(p)"
                  class="text-[10px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded transition"
                >
                  <i class="fas fa-trash mr-1"></i>Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-slate-400 pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filteredPpdb.length }} pendaftar · Vue 3 · v.20.59.0526
      </p>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { subscribeColl, updateOne, deleteOne, subscribeDoc, setOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const auth = useAuthStore()
const toast = useToast()

// v.21.27.0526: isAdmin computed — admin builtin + super_admin/admin/admin_keuangan role_sistem boleh akses PSB
const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
})

// v.21.25.0526: PSB Assets per-lembaga upload (issue #50)
const psbAssetsAll = ref({})
const psbAssetLembaga = ref('')
const psbAssetSyarat = ref('')
const psbAssetPembayaran = ref('')
const savingAssets = ref(false)

let _unsubAssets = null
onMounted(() => {
  _unsubAssets = subscribeDoc('settings', 'psb_assets', (data) => {
    psbAssetsAll.value = data || {}
  })
})
onUnmounted(() => { if (_unsubAssets) try { _unsubAssets() } catch {} })

// Watch lembaga selection → load existing assets ke form
import { watch as _watchAssets } from 'vue'
_watchAssets(psbAssetLembaga, (l) => {
  if (!l) { psbAssetSyarat.value = ''; psbAssetPembayaran.value = ''; return }
  const a = psbAssetsAll.value?.[l] || {}
  psbAssetSyarat.value = a.syarat || ''
  psbAssetPembayaran.value = a.pembayaran || ''
})

function _fileToBase64(file) {
  return new Promise((res, rej) => {
    const r = new FileReader()
    r.onload = () => res(r.result)
    r.onerror = rej
    r.readAsDataURL(file)
  })
}
async function onUploadSyarat(e) {
  const f = e.target.files?.[0]
  if (!f) return
  if (f.size > 1024 * 1024) { toast.warning('Max 1MB'); return }
  psbAssetSyarat.value = await _fileToBase64(f)
}
async function onUploadPembayaran(e) {
  const f = e.target.files?.[0]
  if (!f) return
  if (f.size > 1024 * 1024) { toast.warning('Max 1MB'); return }
  psbAssetPembayaran.value = await _fileToBase64(f)
}
async function savePsbAssets() {
  if (!psbAssetLembaga.value) return
  savingAssets.value = true
  try {
    const merged = { ...(psbAssetsAll.value || {}) }
    merged[psbAssetLembaga.value] = {
      syarat: psbAssetSyarat.value || '',
      pembayaran: psbAssetPembayaran.value || ''
    }
    await setOne('settings', 'psb_assets', merged)
    toast.success('Berhasil simpan asset PSB lembaga ' + psbAssetLembaga.value)
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    savingAssets.value = false
  }
}
</script>
