<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isAdmin"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses Admin only
      </p>
    </div>

    <template v-else>
      <!-- Header -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-base md:text-lg font-black text-[var(--text-primary)]">
              <i class="fas fa-clipboard-list text-teal-500 mr-2"></i>PSB — Pendaftaran Santri Baru
            </h1>
            <p class="text-xs text-[var(--text-secondary)] mt-0.5">
              Daftar calon santri yang sudah submit formulir online
            </p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div class="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs">
              <span class="text-cyan-700 font-bold">{{ stats.pending }}</span>
              <span class="text-[var(--text-secondary)] ml-1">pending</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
              <span class="text-emerald-700 font-bold">{{ stats.approved }}</span>
              <span class="text-[var(--text-secondary)] ml-1">approved</span>
            </div>
            <div class="px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs">
              <span class="text-rose-700 font-bold">{{ stats.rejected }}</span>
              <span class="text-[var(--text-secondary)] ml-1">rejected</span>
            </div>
          </div>
        </div>
        <!-- Link share form -->
        <div
          class="mt-3 p-3 bg-teal-50 dark:bg-teal-900/30 rounded-xl border border-teal-200 flex items-center gap-3"
        >
          <i class="fas fa-link text-teal-600 text-lg"></i>
          <div class="flex-1 min-w-0">
            <p class="text-[11px] font-bold text-teal-700 dark:text-teal-300 uppercase">
              Link Formulir Public
            </p>
            <code class="text-xs text-slate-700 dark:text-[var(--text-tertiary)] break-all">{{
              publicFormUrl
            }}</code>
          </div>
          <button
            @click="copyLink"
            class="px-3 py-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold rounded-lg transition"
          >
            <i class="fas fa-copy mr-1"></i>Salin
          </button>
        </div>
      </div>

      <!-- v.21.25.0526: PSB Assets — Upload Syarat + Info Pembayaran + ACF per-lembaga (issue #50) -->
      <!-- T16: section-aware (pita PSB Electron) — ?section=syarat|pembayaran fokuskan sel terkait -->
      <details
        v-show="secVisible('syarat') || secVisible('pembayaran')"
        :open="isAssetsFocus || null"
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <summary class="cursor-pointer text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-paperclip text-cyan-500 mr-1"></i>Upload Syarat & Info Pembayaran per
          Lembaga
        </summary>
        <div class="mt-3 space-y-3">
          <select
            v-model="psbAssetLembaga"
            class="px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]"
          >
            <option value="">-- Pilih lembaga --</option>
            <option
              v-for="l in [
                'TPQ Pagi',
                'TPQ Sore',
                'Pra PTPT',
                'PTPT',
                'PPPH',
                'TK A',
                'TK B',
                'SDI',
                'PKBM'
              ]"
              :key="l"
              :value="l"
            >
              {{ l }}
            </option>
          </select>
          <div v-if="psbAssetLembaga" class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-show="secVisible('syarat')">
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Syarat &amp; Ketentuan (teks)</label
              >
              <textarea
                v-model="psbAssetSyarat"
                rows="8"
                placeholder="Ketik / tempel isi Syarat & Ketentuan pendaftaran di sini..."
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] leading-relaxed"
              ></textarea>
            </div>
            <div v-show="secVisible('pembayaran')">
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                >Info Pembayaran (teks)</label
              >
              <textarea
                v-model="psbAssetPembayaran"
                rows="8"
                placeholder="Ketik / tempel Info Pembayaran (rincian biaya, no. rekening, dll)..."
                class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)] leading-relaxed"
              ></textarea>
            </div>
          </div>
          <button
            v-if="psbAssetLembaga"
            @click="savePsbAssets"
            :disabled="savingAssets"
            class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50"
          >
            <i class="fas fa-save mr-1"></i
            >{{ savingAssets ? 'Menyimpan...' : 'Simpan Asset Lembaga' }}
          </button>
        </div>
      </details>

      <!-- T16: blok Riwayat Pendaftaran (filter + daftar) — fokus via ?section=riwayat -->
      <div v-show="secVisible('riwayat')" class="space-y-4">
        <!-- Filter -->
        <div
          class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
        >
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
            <div class="md:col-span-2 relative">
              <i
                class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
              ></i>
              <input
                v-model="search"
                type="text"
                placeholder="Cari nama / wali / WA / No. Pendaftaran..."
                class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <select
              v-model="filterStatus"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Semua status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="enrolled">Enrolled</option>
            </select>
            <select
              v-model="filterLembaga"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">Semua lembaga</option>
              <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
            </select>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-2 mt-2">
            <select
              v-model="filterTahun"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none md:col-span-2"
            >
              <option value="">Semua tahun ajaran</option>
              <option v-for="t in tahunOptions" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>
        </div>

        <!-- Loading / Empty -->
        <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
          <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
          <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat pendaftar...</p>
        </div>
        <div
          v-else-if="filteredPpdb.length === 0"
          class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
        >
          <i class="fas fa-inbox text-[var(--text-tertiary)] text-4xl mb-3"></i>
          <p class="text-sm font-bold text-[var(--text-primary)]">
            {{ search ? 'Tidak ada cocok' : 'Belum ada pendaftar' }}
          </p>
        </div>

        <!-- List -->
        <div v-else class="space-y-2">
          <div
            v-for="p in filteredPpdb"
            :key="p.id"
            :class="['rounded-xl p-3 md:p-4 border shadow-sm', statusBg(p.status)]"
          >
            <div class="flex items-start gap-3">
              <div
                :class="[
                  'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold',
                  p.jk === 'L' ? 'bg-cyan-500' : 'bg-rose-500'
                ]"
              >
                {{ p.jk === 'L' ? 'L' : 'P' }}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-black text-[var(--text-primary)] truncate">
                      <span
                        v-if="p.no_pendaftaran"
                        class="text-[10px] text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded mr-1"
                        >{{ p.no_pendaftaran }}</span
                      >
                      {{ p.nama }}
                    </h3>
                    <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                      {{ p.tempat_lahir || '-' }}, {{ p.tgl_lahir }} · Daftar:
                      {{ fmtDate(p.tanggal_daftar || p.tgl_daftar) }}
                    </p>
                  </div>
                  <span
                    :class="[
                      'text-[9px] px-2 py-0.5 rounded font-black uppercase tracking-wider flex-shrink-0',
                      statusBadge(p.status)
                    ]"
                  >
                    {{ p.status || 'pending' }}
                  </span>
                </div>
                <!-- Detail rows -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-[11px]">
                  <div class="bg-[var(--bg-card)]/60 p-2 rounded">
                    <p class="text-[var(--text-secondary)]">
                      <i class="fas fa-school mr-1"></i>Lembaga Tujuan:
                    </p>
                    <p class="font-bold text-[var(--text-primary)]">
                      {{ p.lembaga_tujuan }} {{ p.is_mukim ? '(Mukim)' : '' }}
                    </p>
                  </div>
                  <div class="bg-[var(--bg-card)]/60 p-2 rounded">
                    <p class="text-[var(--text-secondary)]">
                      <i class="fas fa-user-friends mr-1"></i>Wali / Yang Mendaftarkan:
                    </p>
                    <p class="font-bold text-[var(--text-primary)] truncate">
                      {{ p.yang_mendaftarkan || p.nama_wali || '—' }}
                    </p>
                    <a
                      v-if="p.wa_wali"
                      :href="`https://wa.me/${cleanWa(p.wa_wali)}`"
                      target="_blank"
                      class="text-green-600 hover:underline"
                    >
                      <i class="fab fa-whatsapp mr-1"></i>{{ p.wa_wali }}
                    </a>
                  </div>
                </div>
                <p v-if="p.catatan" class="text-[11px] text-[var(--text-secondary)] mt-2 italic">
                  <i class="fas fa-comment mr-1"></i>{{ p.catatan }}
                </p>
                <!-- Actions -->
                <div class="flex gap-1.5 mt-3 justify-end flex-wrap">
                  <RouterLink
                    :to="`/psb/${p.id}`"
                    class="text-[10px] px-2.5 py-1 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-bold rounded transition"
                  >
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
                    class="text-[10px] px-2.5 py-1 bg-[var(--bg-muted)] hover:bg-slate-200 text-[var(--text-primary)] font-bold rounded transition"
                  >
                    <i class="fas fa-trash mr-1"></i>Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
          <i class="fas fa-circle-info mr-1"></i>{{ filteredPpdb.length }} pendaftar · Vue 3 ·
          v.100.0626
        </p>
      </div>
      <!-- /blok Riwayat -->
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { subscribeColl, updateOne, deleteOne, subscribeDoc, setOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { sortLembagaNames } from '@/utils/santriSort' // v.100 Batch10: urutan canonical dropdown lembaga

// v.100g: fmtDate tak terdefinisi di file ini → render baris pendaftaran lempar
//   "s.fmtDate is not a function" → PpdbAdminView crash → halaman PSB blank.
//   Definisikan lokal (format tanggal daftar dd/mm/yyyy, id-ID).
function fmtDate(v) {
  if (!v) return ''
  try {
    return new Date(v).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch {
    return String(v)
  }
}

const auth = useAuthStore()
const toast = useToast()
const confirmDlg = useConfirm()
const route = useRoute()

// T16 (Batch 5, Electron): pita PSB memecah halaman jadi tombol → ?section=riwayat|syarat|pembayaran.
// Tanpa query (web/Android) tampil PENUH. v-show (bukan v-if) supaya field asset tetap ter-mount.
const focusSection = computed(() => String(route.query.section || ''))
function secVisible(name) {
  return !focusSection.value || focusSection.value === name
}
const isAssetsFocus = computed(
  () => focusSection.value === 'syarat' || focusSection.value === 'pembayaran'
)

// v.21.27.0526: isAdmin computed — admin builtin + super_admin/admin/admin_keuangan role_sistem boleh akses PSB
const isAdmin = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

// v.21.34.0526: Restore missing state — ppdbRaw + stats + filter
const ppdbRaw = ref([])
const loading = ref(true)
const search = ref('')
const filterStatus = ref('')
const filterLembaga = ref('')
const filterTahun = ref('')
let _unsubPpdb = null

const publicFormUrl = computed(() => 'https://ammuonline-psb.web.app')

function copyLink() {
  try {
    navigator.clipboard.writeText(publicFormUrl.value)
    toast.success('Link tersalin')
  } catch {
    toast.warning('Salin manual: ' + publicFormUrl.value)
  }
}

const stats = computed(() => {
  const out = { pending: 0, approved: 0, rejected: 0, enrolled: 0 }
  for (const p of ppdbRaw.value) {
    const s = String(p.status || 'pending').toLowerCase()
    if (out[s] !== undefined) out[s]++
  }
  return out
})

const lembagaOptions = computed(() =>
  // v.100 Batch10: urut canonical lembaga (bukan alfabetis)
  sortLembagaNames([...new Set(ppdbRaw.value.map((p) => p.lembaga_tujuan).filter(Boolean))])
)
const tahunOptions = computed(() =>
  [...new Set(ppdbRaw.value.map((p) => p.tahunAjaran).filter(Boolean))].sort().reverse()
)

const filteredPpdb = computed(() => {
  let list = [...ppdbRaw.value]
  if (filterStatus.value)
    list = list.filter(
      (p) => String(p.status || 'pending').toLowerCase() === filterStatus.value.toLowerCase()
    )
  if (filterLembaga.value) list = list.filter((p) => p.lembaga_tujuan === filterLembaga.value)
  if (filterTahun.value) list = list.filter((p) => p.tahunAjaran === filterTahun.value)
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter(
      (p) =>
        String(p.nama || '')
          .toLowerCase()
          .includes(kw) ||
        String(p.nama_wali || '')
          .toLowerCase()
          .includes(kw) ||
        String(p.wa_wali || '')
          .toLowerCase()
          .includes(kw) ||
        String(p.no_pendaftaran || '')
          .toLowerCase()
          .includes(kw)
    )
  return list.sort((a, b) =>
    String(b.created_at?.seconds || b.no_pendaftaran || '').localeCompare(
      String(a.created_at?.seconds || a.no_pendaftaran || '')
    )
  )
})

function statusBg(s) {
  const st = String(s || 'pending').toLowerCase()
  if (st === 'approved') return 'bg-emerald-50 border-emerald-200'
  if (st === 'rejected') return 'bg-rose-50 border-rose-200'
  if (st === 'enrolled') return 'bg-teal-50 border-teal-200'
  return 'bg-cyan-50 border-cyan-200'
}

// v.100g: helper template yang hilang dari komponen ini → render & aksi PSB admin crash
//   ("s.X is not a function"). Dipulihkan semua: statusBadge, cleanWa, updateStatus, onDelete.
function statusBadge(s) {
  const st = String(s || 'pending').toLowerCase()
  if (st === 'approved') return 'bg-emerald-200 text-emerald-800'
  if (st === 'rejected') return 'bg-rose-200 text-rose-800'
  if (st === 'enrolled') return 'bg-teal-200 text-teal-800'
  return 'bg-cyan-200 text-cyan-800'
}

// Normalisasi nomor WA Indonesia utk link wa.me (0xxxx → 62xxxx).
function cleanWa(wa) {
  let d = String(wa || '').replace(/\D/g, '')
  if (d.startsWith('0')) d = '62' + d.slice(1)
  else if (d.startsWith('8')) d = '62' + d
  return d
}

async function updateStatus(p, status) {
  try {
    await updateOne('psb_pendaftaran', String(p.id), { status })
    toast.success('Status → ' + status)
  } catch (e) {
    toast.error('Gagal ubah status: ' + (e?.message || e))
  }
}

async function onDelete(p) {
  const ok = await confirmDlg({
    title: 'Hapus pendaftar?',
    message: `Hapus data pendaftaran "${p.nama || ''}"? Tindakan ini permanen.`,
    confirmText: 'Hapus',
    cancelText: 'Batal',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne('psb_pendaftaran', String(p.id))
    toast.success('Pendaftar dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e?.message || e))
  }
}

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
  _unsubPpdb = subscribeColl('psb_pendaftaran', (docs) => {
    ppdbRaw.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (_unsubAssets)
    try {
      _unsubAssets()
    } catch {}
  if (_unsubPpdb)
    try {
      _unsubPpdb()
    } catch {}
})

// Watch lembaga selection → load existing assets ke form
import { watch as _watchAssets } from 'vue'
_watchAssets(psbAssetLembaga, (l) => {
  if (!l) {
    psbAssetSyarat.value = ''
    psbAssetPembayaran.value = ''
    return
  }
  const a = psbAssetsAll.value?.[l] || {}
  psbAssetSyarat.value = a.syarat || ''
  psbAssetPembayaran.value = a.pembayaran || ''
})

// v.100g: Syarat & Info Pembayaran kini berupa TEKS (admin ketik di textarea) — bukan
//   upload file/URL lagi. Fungsi upload base64 lama dihapus.
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
