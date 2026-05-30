<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-base md:text-lg font-black">
            <i class="fas fa-money-check-alt text-cyan-500 mr-2"></i>Pembayaran
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            {{ isSantriOnly ? 'Riwayat & metode pembayaran Anda' : 'Log pembayaran semua santri' }}
          </p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-xs">
          <span class="text-cyan-700 font-bold">{{ fmtRp(totalPembayaran) }}</span>
          <span class="text-[var(--text-secondary)] ml-1">total</span>
        </div>
      </div>
    </div>

    <!-- v.81.0526: 3-tab payment channel selector (santri/wali only) -->
    <div v-if="isSantriOnly" class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm p-2">
      <div class="flex gap-1.5 overflow-x-auto custom-scrollbar">
        <button
          v-for="t in tabsSantri"
          :key="t.id"
          @click="activeTab = t.id"
          :class="[
            'flex-1 whitespace-nowrap px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-black transition cursor-pointer rounded-xl flex items-center justify-center gap-1.5',
            activeTab === t.id
              ? t.activeClass
              : 'text-[var(--text-secondary)] hover:bg-slate-50 dark:hover:bg-slate-700/40'
          ]"
        >
          <i :class="['fas', t.icon, 'text-sm']"></i>{{ t.label }}
        </button>
      </div>
    </div>

    <!-- v.83.0526: Picker anak DIHAPUS di sini — sudah di topbar global (AppHeader).
         selectedAnakId still wired ke store via useWaliChildren composable. -->


    <!-- ============================================================
         TAB: MANUAL — Riwayat pembayaran offline (admin POS) + transfer ter-verifikasi
         ============================================================ -->
    <template v-if="!isSantriOnly || activeTab === 'manual'">
      <!-- Filter (admin) -->
      <div v-if="!isSantriOnly" class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-1 md:grid-cols-3 gap-2">
        <input v-model="search" type="text" placeholder="Cari nama santri..." class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]" />
        <select v-model.number="filterBulan" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <option :value="0">Semua bulan</option>
          <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
        </select>
        <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
          <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
        </select>
      </div>

      <!-- List Riwayat -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center"><i class="fas fa-spinner fa-spin text-cyan-500 text-3xl"></i></div>
      <div v-else-if="filteredItems.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Belum ada pembayaran.</p>
        <p v-if="isSantriOnly" class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
          Pembayaran offline (cash) yang diinput admin akan otomatis muncul di sini.
        </p>
      </div>
      <div v-else class="space-y-2">
        <div v-for="p in filteredItems" :key="p.id" class="bg-[var(--bg-card)] rounded-xl p-3 border border-[var(--border-subtle)] shadow-sm">
          <div class="flex items-center gap-3">
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
              p.sumber === 'transfer_verified' ? 'bg-cyan-100 text-cyan-600' : 'bg-emerald-100 text-emerald-600']">
              <i :class="['fas', p.sumber === 'transfer_verified' ? 'fa-university' : 'fa-check']"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold truncate">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
              <p class="text-[10px] text-[var(--text-secondary)]">
                {{ fmtTgl(p.tanggal) }} · {{ p.catatan || '-' }}
                <span v-if="p.sumber === 'transfer_verified'" class="ml-1 text-cyan-700 font-bold">[Transfer]</span>
                <span v-else class="ml-1 text-emerald-700 font-bold">[Tunai]</span>
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm font-black text-emerald-700">{{ fmtRp(p.nominal) }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ============================================================
         TAB: TRANSFER BANK — info rekening + upload bukti
         ============================================================ -->
    <template v-if="isSantriOnly && activeTab === 'transfer'">
      <!-- Info Rekening -->
      <div class="bg-gradient-to-br from-cyan-600 to-teal-700 dark:from-cyan-800 dark:to-teal-900 rounded-2xl p-5 text-white shadow-lg">
        <p class="text-[10px] font-bold uppercase opacity-80 tracking-wider mb-3">
          <i class="fas fa-university mr-1"></i>Rekening Pondok
        </p>
        <div v-if="rekInfo.bank_nama || rekInfo.bank_nomor">
          <p class="text-lg font-black drop-shadow">{{ rekInfo.bank_nama || '— Bank —' }}</p>
          <p class="text-2xl font-black mt-2 tracking-wider drop-shadow">
            {{ rekInfo.bank_nomor || '— Nomor —' }}
            <button
              v-if="rekInfo.bank_nomor"
              @click="copyToClipboard(rekInfo.bank_nomor)"
              class="ml-2 px-2 py-1 text-xs bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur transition cursor-pointer"
              :title="'Salin nomor rekening'"
            >
              <i class="fas fa-copy"></i>
            </button>
          </p>
          <p class="text-sm font-bold mt-2 opacity-90">
            <i class="fas fa-user mr-1"></i>{{ rekInfo.bank_atasnama || '— Atas Nama —' }}
          </p>
        </div>
        <div v-else class="text-center py-4">
          <i class="fas fa-exclamation-circle text-2xl mb-2 opacity-80"></i>
          <p class="text-sm font-bold">Belum ada rekening yang di-set</p>
          <p class="text-[10px] opacity-80 italic mt-1">Hubungi admin pondok untuk info rekening transfer.</p>
        </div>
      </div>

      <!-- Form Upload Bukti -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-3">
          <i class="fas fa-receipt text-cyan-600 mr-1"></i>Upload Bukti Transfer
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div v-if="waliChildren.length > 1">
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Untuk Santri *</label>
            <select
              v-model="transferForm.santri_id"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            >
              <option value="">— Pilih Anak —</option>
              <option v-for="c in waliChildren" :key="c.id" :value="String(c.id)">{{ c.nama }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Nominal Transfer *</label>
            <input
              v-model.number="transferForm.nominal"
              type="number"
              min="1000"
              step="1000"
              placeholder="Rp"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Tanggal Transfer *</label>
            <input
              v-model="transferForm.tanggal"
              type="date"
              :max="todayISO"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Kategori (opsional)</label>
            <input
              v-model="transferForm.kategori"
              type="text"
              list="kategoriList"
              placeholder="cth: SPP / Syahriah / Tabungan"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <datalist id="kategoriList">
              <option v-for="k in uniqueKategoriTagihan" :key="k" :value="k">{{ k }}</option>
            </datalist>
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Catatan</label>
            <textarea
              v-model="transferForm.catatan"
              rows="2"
              placeholder="Cth: Pembayaran SPP bulan Juni"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
            ></textarea>
          </div>
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase mb-1">Bukti Transfer *</label>
            <input
              type="file"
              accept="image/*,.pdf"
              @change="onPickBukti"
              :disabled="transferForm.uploading"
              class="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border-0 file:bg-cyan-600 file:text-white file:text-xs file:font-bold file:cursor-pointer hover:file:bg-cyan-700"
            />
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-1">
              JPG / PNG / PDF, maks 2 MB. Pastikan foto bukti jelas terbaca.
            </p>
            <div v-if="transferForm.bukti_preview" class="mt-2">
              <img
                v-if="!transferForm.bukti_isPdf"
                :src="transferForm.bukti_preview"
                class="max-h-48 rounded-lg border border-[var(--border-default)]"
                alt="Preview bukti"
              />
              <div v-else class="text-xs text-cyan-700 font-bold">
                <i class="fas fa-file-pdf mr-1"></i>File PDF siap upload
              </div>
            </div>
          </div>
        </div>
        <div v-if="transferForm.error" class="mt-3 text-xs text-rose-600 font-bold bg-rose-50 px-3 py-2 rounded-lg border border-rose-200">
          <i class="fas fa-exclamation-circle mr-1"></i>{{ transferForm.error }}
        </div>
        <div class="mt-4 flex justify-end">
          <button
            @click="submitTransfer"
            :disabled="transferForm.uploading"
            class="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-black rounded-xl text-sm shadow-md transition cursor-pointer"
          >
            <i :class="['fas', transferForm.uploading ? 'fa-spinner fa-spin' : 'fa-paper-plane', 'mr-1']"></i>
            {{ transferForm.uploading ? 'Mengirim...' : 'Submit Bukti' }}
          </button>
        </div>
      </div>

      <!-- List Pending Verifikasi (transfer yang sudah dikirim, menunggu admin verify) -->
      <div v-if="myPendingTransfers.length > 0" class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-sm font-black text-[var(--text-primary)] uppercase mb-3">
          <i class="fas fa-hourglass-half text-amber-600 mr-1"></i>Menunggu Verifikasi
          <span class="text-[10px] text-[var(--text-tertiary)] normal-case ml-1">({{ myPendingTransfers.length }} transfer)</span>
        </h3>
        <div class="space-y-2">
          <div
            v-for="p in myPendingTransfers"
            :key="p.id"
            class="bg-amber-50/40 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3"
          >
            <div class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0">
                <i :class="['fas', p.status === 'rejected' ? 'fa-times' : 'fa-hourglass-half']"></i>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold">{{ p.santri_nama || getNamaSantri(p.santri_id) }}</p>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  {{ fmtTgl(p.tanggal) }} · {{ p.kategori || 'Transfer' }} · {{ p.catatan || '-' }}
                </p>
                <p v-if="p.status === 'rejected' && p.alasan_tolak" class="text-[10px] text-rose-700 italic mt-1">
                  <i class="fas fa-exclamation-circle mr-1"></i>Ditolak: {{ p.alasan_tolak }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-black text-amber-700">{{ fmtRp(p.nominal) }}</p>
                <span :class="['text-[9px] px-2 py-0.5 rounded font-black uppercase mt-1 inline-block',
                  p.status === 'rejected'
                    ? 'bg-rose-100 text-rose-700 border border-rose-200'
                    : 'bg-amber-200 text-amber-800 border border-amber-300']">
                  {{ p.status === 'rejected' ? 'Ditolak' : 'Menunggu' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ============================================================
         TAB: VA ACCOUNT — Maintenance placeholder
         ============================================================ -->
    <template v-if="isSantriOnly && activeTab === 'va'">
      <div class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-amber-300 dark:border-amber-700 shadow-sm text-center">
        <i class="fas fa-tools text-amber-500 text-5xl mb-4"></i>
        <h3 class="text-lg font-black text-[var(--text-primary)] mb-2">
          Sedang Dalam Maintenance
        </h3>
        <p class="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          Fitur pembayaran via <b>Virtual Account</b> belum aktif. Pondok sedang dalam proses
          kerjasama dengan <b>KSP BMT PETA</b> sebagai mitra resmi.
        </p>
        <p class="text-xs text-[var(--text-tertiary)] italic mt-4">
          Untuk sementara silakan pakai jalur <b>Transfer Bank</b> manual.
        </p>
        <div class="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl">
          <i class="fas fa-info-circle text-amber-600"></i>
          <span class="text-xs font-bold text-amber-700 dark:text-amber-300">Coming Soon</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { subscribeColl, setOne } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useWaliChildren } from '@/composables/useWaliChildren'
import { uploadBase64 } from '@/services/storage'
import { fmtRp, fmtTgl } from '@/utils/format'

// v.82.0526: support deep-link dari TagihanView — auto-fill form transfer
const route = useRoute()

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

const pembayaranRaw = ref([])
const santriList = ref([])
const tagihanRaw = ref([])
const pendingRaw = ref([])
const loading = ref(true)
const search = ref('')
const filterBulan = ref(0)
const filterTahun = ref(new Date().getFullYear())
const activeTab = ref('manual')
const selectedAnakId = ref('')
let unsubBayar = null
let unsubSantri = null
let unsubTagihan = null
let unsubPending = null

const isSantriOnly = computed(() => auth.sesiAktif?.role === 'santri')

// v.81.0526: multi-anak detection via WA wali
const { children: waliChildren } = useWaliChildren(santriList)

const tabsSantri = [
  { id: 'manual', label: 'Riwayat', icon: 'fa-receipt', activeClass: 'bg-emerald-600 text-white shadow-md' },
  { id: 'transfer', label: 'Transfer Bank', icon: 'fa-university', activeClass: 'bg-cyan-600 text-white shadow-md' },
  { id: 'va', label: 'VA Account', icon: 'fa-credit-card', activeClass: 'bg-amber-600 text-white shadow-md' }
]

// Settings rekening (dari PengaturanKeuanganView)
const rekInfo = computed(() => {
  const s = settings.settings || {}
  return {
    bank_nama: s.bank_nama || '',
    bank_nomor: s.bank_nomor || '',
    bank_atasnama: s.bank_atasnama || ''
  }
})

const todayISO = computed(() => new Date().toISOString().slice(0, 10))

function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

// Pembayaran ter-confirm (tunai POS + transfer yang sudah di-verify admin)
const allOwnedIds = computed(() => new Set(waliChildren.value.map((c) => String(c.id))))

const filteredItems = computed(() => {
  let list = [...pembayaranRaw.value]
  if (isSantriOnly.value) {
    // filter ke anak-anak yg dimiliki wali (multi-anak)
    list = list.filter((p) => allOwnedIds.value.has(String(p.santri_id)))
    // kalau pilih anak spesifik, narrow ke 1 anak
    if (selectedAnakId.value) {
      list = list.filter((p) => String(p.santri_id) === selectedAnakId.value)
    }
  }
  if (filterBulan.value && filterBulan.value > 0) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return !isNaN(d.getTime()) && d.getFullYear() === filterTahun.value && (d.getMonth() + 1) === filterBulan.value
    })
  } else if (filterTahun.value && !isSantriOnly.value) {
    list = list.filter((p) => {
      const d = new Date(p.tanggal || p.created_at)
      return !isNaN(d.getTime()) && d.getFullYear() === filterTahun.value
    })
  }
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((p) => String(p.santri_nama || getNamaSantri(p.santri_id)).toLowerCase().includes(kw))
  return list.sort((a, b) => String(b.tanggal || '').localeCompare(String(a.tanggal || '')))
})

const totalPembayaran = computed(() => filteredItems.value.reduce((s, p) => s + (Number(p.nominal) || 0), 0))

// Pending transfer pribadi (santri/wali only)
const myPendingTransfers = computed(() => {
  if (!isSantriOnly.value) return []
  return pendingRaw.value
    .filter((p) => allOwnedIds.value.has(String(p.santri_id)))
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')))
})

// Kategori unik dari tagihan (untuk autocomplete)
const uniqueKategoriTagihan = computed(() =>
  [...new Set(tagihanRaw.value.map((t) => t.kategori).filter(Boolean))].sort()
)

// ─── Form Transfer ─────────────────────────────────────────────
const transferForm = ref({
  santri_id: '',
  nominal: 0,
  tanggal: todayISO.value,
  kategori: '',
  catatan: '',
  tagihan_id: '',
  bukti_dataUrl: '',
  bukti_preview: '',
  bukti_isPdf: false,
  uploading: false,
  error: ''
})

function resetTransferForm() {
  transferForm.value = {
    santri_id: waliChildren.value.length === 1 ? String(waliChildren.value[0].id) : '',
    nominal: 0,
    tanggal: todayISO.value,
    kategori: '',
    catatan: '',
    tagihan_id: '',
    bukti_dataUrl: '',
    bukti_preview: '',
    bukti_isPdf: false,
    uploading: false,
    error: ''
  }
}

function onPickBukti(ev) {
  const file = ev.target.files?.[0]
  if (!file) return
  transferForm.value.error = ''
  if (file.size > 2 * 1024 * 1024) {
    transferForm.value.error = 'Ukuran file > 2 MB. Compress dulu.'
    toast.error('Maks 2 MB')
    ev.target.value = ''
    return
  }
  const isPdf = file.type === 'application/pdf'
  if (!file.type.startsWith('image/') && !isPdf) {
    transferForm.value.error = 'File harus JPG / PNG / PDF.'
    toast.error('Tipe file tidak didukung')
    ev.target.value = ''
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    transferForm.value.bukti_dataUrl = String(reader.result || '')
    transferForm.value.bukti_preview = isPdf ? '' : String(reader.result || '')
    transferForm.value.bukti_isPdf = isPdf
  }
  reader.onerror = () => {
    transferForm.value.error = 'Gagal baca file.'
  }
  reader.readAsDataURL(file)
}

async function submitTransfer() {
  const f = transferForm.value
  f.error = ''
  // Validasi
  if (waliChildren.value.length > 1 && !f.santri_id) {
    f.error = 'Pilih anak yang dibayarkan.'
    return
  }
  const santriId = f.santri_id || String(auth.sesiAktif?.id || '')
  if (!santriId) {
    f.error = 'Santri ID tidak terdeteksi.'
    return
  }
  if (!f.nominal || f.nominal < 1000) {
    f.error = 'Nominal minimal Rp 1.000.'
    return
  }
  if (!f.tanggal) {
    f.error = 'Tanggal transfer wajib diisi.'
    return
  }
  if (!f.bukti_dataUrl) {
    f.error = 'Upload bukti transfer dulu.'
    return
  }

  f.uploading = true
  try {
    const santriObj = santriList.value.find((s) => String(s.id) === santriId)
    const id = `trf_${Date.now()}_${santriId}`
    // Upload bukti ke Storage
    const ext = f.bukti_isPdf ? 'pdf' : 'jpg'
    const buktiUrl = await uploadBase64(
      `pembayaran_transfer/${id}.${ext}`,
      f.bukti_dataUrl,
      f.bukti_isPdf ? 'application/pdf' : 'image/jpeg'
    )
    // Simpan ke pembayaran_transfer_pending
    const payload = {
      id,
      santri_id: santriId,
      santri_nama: santriObj?.nama || '',
      lembaga: santriObj?.lembaga || '',
      kelas: santriObj?.kelas || '',
      wali_id: String(auth.sesiAktif?.id || ''),
      wali_wa: String(auth.sesiAktif?.wa || ''),
      nominal: Number(f.nominal) || 0,
      tanggal: f.tanggal,
      kategori: f.kategori || 'Transfer',
      catatan: f.catatan || '',
      bukti_url: buktiUrl,
      tagihan_id: f.tagihan_id || '',  // v.82.0526: link ke tagihan yg dibayar (kalau dari deep-link)
      status: 'pending',
      created_at: new Date().toISOString()
    }
    await setOne('pembayaran_transfer_pending', id, payload)
    toast.success('Bukti transfer terkirim. Menunggu verifikasi admin.')
    resetTransferForm()
  } catch (e) {
    f.error = 'Gagal upload: ' + (e?.message || e)
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    f.uploading = false
  }
}

function copyToClipboard(text) {
  try {
    navigator.clipboard.writeText(text)
    toast.success('Nomor rekening tersalin')
  } catch {
    toast.error('Browser tidak support clipboard')
  }
}

// ─── Subscribe Firestore ───────────────────────────────────────
onMounted(() => {
  // Pembayaran tunai POS + transfer yg sudah verified
  unsubBayar = subscribeColl('keuangan_buku_induk', (docs) => {
    pembayaranRaw.value = (docs || []).filter(
      (r) => r.sumber === 'pos_santri' || r.sumber === 'transfer_verified'
    )
    loading.value = false
  })
  unsubSantri = subscribeColl('santri', (docs) => {
    santriList.value = docs
  })
  unsubTagihan = subscribeColl('keuangan_tagihan', (docs) => {
    tagihanRaw.value = docs || []
  })
  // Pending transfer (untuk santri lihat sendiri, admin lihat semua di view lain)
  unsubPending = subscribeColl('pembayaran_transfer_pending', (docs) => {
    pendingRaw.value = docs || []
  })
  // Initialize default selected anak kalau cuma 1
  setTimeout(() => {
    if (waliChildren.value.length === 1 && !transferForm.value.santri_id) {
      transferForm.value.santri_id = String(waliChildren.value[0].id)
    }
    // v.82.0526: deep-link from TagihanView — auto-fill form transfer
    const q = route.query
    if (q.tab === 'transfer') {
      activeTab.value = 'transfer'
      if (q.santri) transferForm.value.santri_id = String(q.santri)
      if (q.nominal) transferForm.value.nominal = Number(q.nominal) || 0
      if (q.kategori) transferForm.value.kategori = String(q.kategori)
      if (q.tagihan_id) transferForm.value.tagihan_id = String(q.tagihan_id)
      if (q.nominal && q.kategori) {
        transferForm.value.catatan = `Pembayaran ${q.kategori}`
      }
      toast.info('Form transfer auto-fill dari tagihan')
    }
  }, 500)
})
onUnmounted(() => {
  for (const u of [unsubBayar, unsubSantri, unsubTagihan, unsubPending]) {
    if (u) { try { u() } catch (e) {} }
  }
})
</script>
