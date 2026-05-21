<template>
  <!-- v.21.10.0526: BisyarohView line items per lembaga_refs (slip gaji dinamis) -->
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div v-if="!isAdmin && !isGuruOnly" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center">
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <!-- ====== ADMIN MODE ====== -->
    <template v-else-if="isAdmin">
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
          <i class="fas fa-money-check-alt text-emerald-600 mr-2"></i>Bisyaroh Guru/Pegawai
        </h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Generate slip bisyaroh bulanan, terhubung dengan absensi & bisyaroh pokok.</p>
        <div class="flex gap-2 border-b border-slate-200 dark:border-slate-700 mt-4 overflow-x-auto">
          <button @click="tab = 'generate'" :class="['px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap cursor-pointer transition', tab === 'generate' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-emerald-700']">
            <i class="fas fa-file-invoice-dollar mr-1"></i>Generate Slip Bisyaroh
          </button>
          <button @click="tab = 'riwayat'" :class="['px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 whitespace-nowrap cursor-pointer transition', tab === 'riwayat' ? 'border-emerald-500 text-emerald-700' : 'border-transparent text-slate-500 hover:text-emerald-700']">
            <i class="fas fa-history mr-1"></i>Riwayat Slip
          </button>
        </div>
      </div>

      <!-- TAB GENERATE -->
      <div v-if="tab === 'generate'" class="space-y-4">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1">
          <button @click="genMode = 'single'" :class="['flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer', genMode === 'single' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-emerald-50']"><i class="fas fa-user mr-1"></i>Per Guru</button>
          <button @click="genMode = 'bulk'" :class="['flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer', genMode === 'bulk' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:bg-emerald-50']"><i class="fas fa-users mr-1"></i>Bulk Generate</button>
        </div>

        <!-- PER GURU -->
        <div v-if="genMode === 'single'" class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Filter Tipe Pegawai</p>
            <div class="flex gap-2 flex-wrap">
              <button v-for="t in TIPE_OPTIONS" :key="t.value" @click="filterTipe = t.value" :class="['px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition', filterTipe === t.value ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300']">{{ t.label }}</button>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block tracking-wider">Pilih Guru/Pegawai</label>
              <input v-model="search" type="text" placeholder="Ketik nama guru..." class="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block tracking-wider">Bulan</label>
              <select v-model.number="filterBulan" class="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
                <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i + 1">{{ b }}</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block tracking-wider">Tahun</label>
              <input v-model.number="filterTahun" type="number" min="2024" max="2030" class="w-full text-sm px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white" />
            </div>
          </div>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Daftar Guru — {{ guruFiltered.length }} pegawai</p>
            <div v-if="guruFiltered.length === 0" class="py-6 text-center text-xs text-slate-400 italic">Tidak ada guru sesuai filter.</div>
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto">
              <button v-for="g in guruFiltered" :key="g.id" @click="pickGuru(g)" :class="['text-left px-3 py-2 rounded-lg border-2 cursor-pointer transition', pickedGuru?.id === g.id ? 'bg-emerald-50 border-emerald-500 text-emerald-900' : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-emerald-50']">
                <p class="font-bold text-sm">{{ g.nama }}</p>
                <p class="text-[10px] text-slate-500">{{ g.lembaga || '-' }} · {{ guruTipeLabel(g) }}</p>
              </button>
            </div>
          </div>
          <div v-if="pickedGuru" class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-200">
            <div class="flex items-center justify-between flex-wrap gap-2 mb-3">
              <p class="text-xs font-black text-emerald-800 uppercase">Input Bisyaroh — {{ pickedGuru.nama }} · Periode {{ NAMA_BULAN[filterBulan - 1] }} {{ filterTahun }}</p>
              <span class="text-[9px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded uppercase">v.21.10 line items</span>
            </div>
            <!-- v.21.10.0526: Line items per lembaga_refs (dinamis sesuai role guru) -->
            <div class="space-y-1.5">
              <div v-for="(item, idx) in formBisyaroh.line_items" :key="idx" class="grid grid-cols-[1fr_140px_30px] gap-2 items-center bg-white rounded-lg px-3 py-2 border border-emerald-200">
                <div>
                  <p class="text-xs font-bold text-slate-800">{{ item.label }}</p>
                  <p class="text-[10px] text-slate-500">{{ item.lembaga || '—' }} · <span class="font-bold uppercase">{{ item.kategori }}</span></p>
                </div>
                <input v-model.number="item.nominal" type="number" min="0" class="text-sm px-2 py-1.5 border border-slate-300 rounded-lg bg-white text-right" />
                <button @click="formBisyaroh.line_items.splice(idx, 1)" class="text-rose-500 hover:text-rose-700 text-xs" title="Hapus line item">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button @click="addManualLineItem" class="text-[10px] font-bold text-emerald-700 hover:text-emerald-900 px-2 py-1">
                <i class="fas fa-plus mr-1"></i>Tambah Line Item Manual
              </button>
              <div class="grid grid-cols-[1fr_140px_30px] gap-2 items-center bg-rose-50 rounded-lg px-3 py-2 border border-rose-200">
                <div>
                  <p class="text-xs font-bold text-rose-700">Potongan (Sakit/Izin/Alpa)</p>
                  <p class="text-[10px] text-rose-500">Slip-level (dikurangi dari total)</p>
                </div>
                <input v-model.number="formBisyaroh.total_potongan" type="number" min="0" class="text-sm px-2 py-1.5 border border-rose-300 rounded-lg bg-white text-right" />
                <span></span>
              </div>
            </div>
            <div class="mt-3 flex items-center justify-between gap-3 flex-wrap">
              <p class="text-sm font-black text-emerald-900">Take Home: <span class="text-lg">{{ fmtRp(takeHomeCalc) }}</span></p>
              <button @click="simpanBisyaroh" :disabled="isSaving" class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-5 py-2 rounded-lg shadow disabled:opacity-50 cursor-pointer">
                <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : 'Simpan Slip' }}
              </button>
            </div>
          </div>
        </div>

        <!-- BULK GENERATE v.20.28 -->
        <div v-else class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <p class="text-sm font-black text-slate-800 dark:text-white"><i class="fas fa-users text-emerald-600 mr-2"></i>Bulk Generate Slip Bisyaroh</p>
          <p class="text-xs text-slate-500">Generate slip untuk SEMUA guru aktif sekaligus berdasar bisyaroh pokok di Pengaturan Keuangan ({{ NAMA_BULAN[filterBulan - 1] }} {{ filterTahun }}).</p>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-wider">Generate untuk:</p>
            <div class="flex gap-2 flex-wrap">
              <button v-for="t in TIPE_OPTIONS" :key="'bulk-' + t.value" @click="bulkFilterTipe = t.value" :class="['px-3 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition', bulkFilterTipe === t.value ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300']">{{ t.label }}</button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div><label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Bulan</label><select v-model.number="filterBulan" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"><option v-for="(b, i) in NAMA_BULAN" :key="'bbulk-' + b" :value="i + 1">{{ b }}</option></select></div>
            <div><label class="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Tahun</label><input v-model.number="filterTahun" type="number" min="2024" max="2030" class="w-full text-sm px-3 py-2 border border-slate-300 rounded-lg bg-slate-50" /></div>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border border-emerald-200">
            <p class="text-xs text-emerald-800"><i class="fas fa-info-circle mr-1"></i>Target: <b>{{ bulkTargetGuru.length }} guru</b> akan di-generate slip-nya. Nominal pokok/sekolah dari Pengaturan Keuangan → Bisyaroh Pokok per Guru. Yang sudah punya slip periode ini akan di-OVERWRITE.</p>
          </div>
          <button @click="bulkGenerateBisyaroh" :disabled="isBulkGenerating || bulkTargetGuru.length === 0" class="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-black py-3 rounded-xl shadow-md disabled:opacity-50 cursor-pointer transition">
            <i :class="['fas', isBulkGenerating ? 'fa-spinner fa-spin' : 'fa-bolt', 'mr-2']"></i>
            {{ isBulkGenerating ? `Generating ${bulkProgress}/${bulkTargetGuru.length}...` : `Generate Slip untuk ${bulkTargetGuru.length} Guru` }}
          </button>
          <div v-if="bulkLog.length > 0" class="mt-3 max-h-40 overflow-y-auto bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2 text-[10px] font-mono space-y-0.5">
            <p v-for="(line, idx) in bulkLog" :key="idx" :class="line.startsWith('OK') ? 'text-emerald-700' : line.startsWith('ER') ? 'text-rose-700' : 'text-slate-600'">{{ line }}</p>
          </div>
        </div>
      </div>

      <!-- TAB RIWAYAT -->
      <div v-else class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div class="px-4 md:px-5 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between flex-wrap gap-2">
          <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest"><i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Slip Bisyaroh</h3>
          <div class="flex gap-2 items-center">
            <input v-model="searchRiwayat" type="text" placeholder="Cari nama..." class="text-xs px-3 py-1.5 border border-slate-300 rounded-lg" />
            <select v-model="filterPeriode" class="text-xs px-3 py-1.5 border border-slate-300 rounded-lg">
              <option value="">Semua periode</option>
              <option v-for="p in uniquePeriode" :key="p" :value="p">{{ p }}</option>
            </select>
            <span class="text-[10px] text-slate-400 font-bold">{{ filteredGaji.length }} slip · {{ totalTakeFmt }}</span>
          </div>
        </div>
        <div v-if="loading" class="p-10 text-center"><i class="fas fa-spinner fa-spin text-emerald-500 text-2xl"></i></div>
        <div v-else-if="filteredGaji.length === 0" class="p-10 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada slip.</p></div>
        <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="g in filteredGaji" :key="g.id" class="p-3 md:p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30">
            <div class="flex items-center gap-3 flex-wrap">
              <div class="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center"><i class="fas fa-receipt"></i></div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ getNamaGuruGelar(g.guru_nama || guruNamaById(g.guru_id)) }}</p>
                <p class="text-[10px] text-slate-500">{{ g.lembaga || '-' }} · {{ g.jabatan || 'Guru' }}</p>
              </div>
              <span class="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">{{ g.periode }}</span>
              <button @click="kirimSlipWa(g)" title="Kirim slip via WhatsApp" class="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition cursor-pointer"><i class="fab fa-whatsapp mr-1"></i>Kirim</button>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-xs">
              <div class="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2"><p class="text-[9px] text-slate-500">Pokok</p><p class="font-black">{{ fmtRp(g.bisyaroh_pokok) }}</p></div>
              <div class="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2"><p class="text-[9px] text-slate-500">Sekolah</p><p class="font-black">{{ fmtRp(g.bisyaroh_sekolah) }}</p></div>
              <div class="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2"><p class="text-[9px] text-slate-500">Tambahan</p><p class="font-black">{{ fmtRp(g.bisyaroh_tambahan) }}</p></div>
              <div class="bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-2 border border-emerald-200"><p class="text-[9px] text-emerald-700 font-bold">Take Home</p><p class="font-black text-emerald-800">{{ fmtRp(g.take_home || ((Number(g.bisyaroh_pokok)||0) + (Number(g.bisyaroh_sekolah)||0) + (Number(g.bisyaroh_tambahan)||0) - (Number(g.total_potongan)||0))) }}</p></div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ====== GURU MODE ====== -->
    <template v-else>
      <div class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h2 class="text-base md:text-lg font-black text-slate-800 dark:text-white"><i class="fas fa-receipt text-amber-600 mr-2"></i>Slip Bisyaroh Saya</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Slip bisyaroh per bulan (read-only).</p>
      </div>
      <div v-if="loading" class="text-center py-8"><i class="fas fa-spinner fa-spin text-emerald-500 text-2xl"></i></div>
      <div v-else-if="filteredGaji.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"><i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i><p class="text-sm text-slate-500 italic">Belum ada slip untuk Anda.</p></div>
      <div v-else class="space-y-2">
        <div v-for="g in filteredGaji" :key="g.id" class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-2"><p class="text-sm font-bold text-slate-800 dark:text-white">Periode {{ g.periode }}</p><span class="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">Take Home {{ fmtRp(g.take_home) }}</span></div>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <div><p class="text-[9px] text-slate-500">Pokok</p><p class="font-bold">{{ fmtRp(g.bisyaroh_pokok) }}</p></div>
            <div><p class="text-[9px] text-slate-500">Sekolah</p><p class="font-bold">{{ fmtRp(g.bisyaroh_sekolah) }}</p></div>
            <div><p class="text-[9px] text-slate-500">Tambahan</p><p class="font-bold">{{ fmtRp(g.bisyaroh_tambahan) }}</p></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useKeuangan } from '@/composables/useKeuangan'
import { useAuthStore } from '@/stores/auth'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'
import { useSettingsStore } from '@/stores/settings'
import { fmtRp, getNamaGuruGelar } from '@/utils/format'

const { gaji, loading } = useKeuangan()
// v.21.10.0526: deriveGuruLembagaRefs untuk auto-generate line items per ref
const { guruRaw, deriveGuruLembagaRefs } = useGuru()
const auth = useAuthStore()
const toast = useToast()
const settingsStore = useSettingsStore()

const isAdmin = computed(() => {
  const rs = auth.sesiAktif?.role_sistem
  return rs === 'admin' || rs === 'super_admin' || rs === 'admin_keuangan' || auth.sesiAktif?.id === 'admin'
})
const isGuruOnly = computed(() => !isAdmin.value && auth.sesiAktif?.role === 'guru')

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const _now = new Date()
const filterBulan = ref(_now.getMonth() + 1)
const filterTahun = ref(_now.getFullYear())

const tab = ref('generate')
const genMode = ref('single')
const TIPE_OPTIONS = [
  { value: 'semua', label: 'Semua' },
  { value: 'ngaji', label: 'Guru Ngaji' },
  { value: 'sekolah', label: 'Guru Sekolah' },
  { value: 'ngaji_sekolah', label: '+ Keduanya' }
]
const filterTipe = ref('semua')
const search = ref('')

function guruTipeLabel(g) {
  const ngaji = !!(g.lembaga && g.lembaga !== 'Yayasan' && !g.is_sekolah)
  const sekolah = !!(g.is_sekolah || g.lembaga_sekolah || (g.shift || '').toLowerCase().includes('sekolah'))
  if (ngaji && sekolah) return 'NGAJI+SEKOLAH'
  if (ngaji) return 'NGAJI'
  if (sekolah) return 'SEKOLAH'
  return '-'
}

const guruFiltered = computed(() => {
  let list = (guruRaw.value || []).filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
  const kw = search.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.nama || '').toLowerCase().includes(kw))
  if (filterTipe.value !== 'semua') {
    list = list.filter((g) => {
      const ngaji = !!(g.lembaga && g.lembaga !== 'Yayasan')
      const sekolah = !!(g.is_sekolah || g.lembaga_sekolah)
      if (filterTipe.value === 'ngaji') return ngaji && !sekolah
      if (filterTipe.value === 'sekolah') return sekolah && !ngaji
      if (filterTipe.value === 'ngaji_sekolah') return ngaji && sekolah
      return true
    })
  }
  return list.sort((a, b) => String(a.nama).localeCompare(String(b.nama)))
})

const pickedGuru = ref(null)
// v.21.10.0526: line_items model — array per lembaga_ref + total_potongan slip-level
const formBisyaroh = ref({ line_items: [], total_potongan: 0 })

// Helper: build default line items dari guru.lembaga_refs
function buildLineItemsFromRefs(g) {
  const refs = deriveGuruLembagaRefs(g) || []
  const items = []
  for (const r of refs) {
    let kategori = 'ngaji'
    let label = `Bisyaroh Ngaji (${r.lembaga})`
    if (r.group === 'sekolah') { kategori = 'sekolah'; label = `Bisyaroh Sekolah (${r.lembaga})` }
    else if (r.group === 'mahad') { kategori = 'mahad'; label = `Bisyaroh Ma'had` }
    else if (r.group === 'non-lembaga') { kategori = 'admin'; label = `Bisyaroh ${r.lembaga}${r.jabatan_di_sini ? ' — ' + r.jabatan_di_sini : ''}` }
    items.push({ kategori, lembaga: r.lembaga || '-', label, nominal: 0 })
  }
  // Fallback: kalau tidak ada lembaga_refs sama sekali, tampilkan 1 row generic
  if (items.length === 0) {
    items.push({ kategori: 'ngaji', lembaga: g.lembaga || '-', label: 'Bisyaroh Pokok', nominal: 0 })
  }
  return items
}

function pickGuru(g) {
  pickedGuru.value = g
  const periode = `${filterTahun.value}-${String(filterBulan.value).padStart(2, '0')}`
  const existing = gaji.value.find((x) => String(x.guru_id) === String(g.id) && x.periode === periode)
  if (existing && Array.isArray(existing.line_items) && existing.line_items.length > 0) {
    // New format (v.21.10+)
    formBisyaroh.value = {
      line_items: existing.line_items.map((it) => ({
        kategori: it.kategori || 'ngaji',
        lembaga: it.lembaga || '-',
        label: it.label || 'Bisyaroh',
        nominal: Number(it.nominal || 0)
      })),
      total_potongan: Number(existing.total_potongan || 0)
    }
  } else if (existing) {
    // Back-compat: derive line_items dari guru.lembaga_refs + map legacy bisyaroh_pokok/sekolah/tambahan
    const items = buildLineItemsFromRefs(g)
    const ngajiItem = items.find((i) => i.kategori === 'ngaji' || i.kategori === 'mahad')
    if (ngajiItem) ngajiItem.nominal = Number(existing.bisyaroh_pokok || 0)
    const sekolahItem = items.find((i) => i.kategori === 'sekolah')
    if (sekolahItem) sekolahItem.nominal = Number(existing.bisyaroh_sekolah || 0)
    if (Number(existing.bisyaroh_tambahan || 0) > 0) {
      items.push({ kategori: 'tambahan', lembaga: '-', label: 'Tambahan Shift (OP+OS)', nominal: Number(existing.bisyaroh_tambahan) })
    }
    formBisyaroh.value = {
      line_items: items,
      total_potongan: Number(existing.total_potongan || 0)
    }
  } else {
    // New slip — derive default dari guru.lembaga_refs
    formBisyaroh.value = {
      line_items: buildLineItemsFromRefs(g),
      total_potongan: 0
    }
  }
}

function addManualLineItem() {
  formBisyaroh.value.line_items.push({
    kategori: 'tambahan',
    lembaga: '-',
    label: 'Tambahan Manual',
    nominal: 0
  })
}

const takeHomeCalc = computed(() => {
  const sum = (formBisyaroh.value.line_items || []).reduce((s, it) => s + (Number(it.nominal) || 0), 0)
  return sum - (Number(formBisyaroh.value.total_potongan) || 0)
})
const isSaving = ref(false)

async function simpanBisyaroh() {
  if (!pickedGuru.value) return
  isSaving.value = true
  try {
    const periode = `${filterTahun.value}-${String(filterBulan.value).padStart(2, '0')}`
    const id = `gaji_${pickedGuru.value.id}_${periode}`
    const items = (formBisyaroh.value.line_items || []).map((i) => ({
      kategori: i.kategori || 'ngaji',
      lembaga: i.lembaga || '-',
      label: i.label || 'Bisyaroh',
      nominal: Number(i.nominal) || 0
    }))
    // v.21.10.0526: Aggregate untuk back-compat (riwayat lama masih pakai bisyaroh_pokok/sekolah/tambahan)
    const bisyaroh_pokok = items
      .filter((i) => i.kategori === 'ngaji' || i.kategori === 'mahad')
      .reduce((s, i) => s + i.nominal, 0)
    const bisyaroh_sekolah = items
      .filter((i) => i.kategori === 'sekolah')
      .reduce((s, i) => s + i.nominal, 0)
    const bisyaroh_tambahan = items
      .filter((i) => i.kategori === 'tambahan' || i.kategori === 'admin')
      .reduce((s, i) => s + i.nominal, 0)
    const total_potongan = Number(formBisyaroh.value.total_potongan) || 0
    const total_pemasukan = bisyaroh_pokok + bisyaroh_sekolah + bisyaroh_tambahan
    await setDoc(doc(db, 'keuangan_gaji', id), {
      id,
      guru_id: Number(pickedGuru.value.id) || pickedGuru.value.id,
      guru_nama: pickedGuru.value.nama,
      lembaga: pickedGuru.value.lembaga || '',
      jabatan: pickedGuru.value.jabatan || '',
      periode,
      // v.21.10.0526: line_items adalah source of truth baru
      line_items: items,
      // Aggregated fields (back-compat dgn riwayat slip lama)
      bisyaroh_pokok,
      bisyaroh_sekolah,
      bisyaroh_tambahan,
      total_pemasukan,
      total_potongan,
      take_home: total_pemasukan - total_potongan,
      tunjangan_list: [],
      potongan_list: [],
      updated_at: serverTimestamp()
    })
    toast.success(`Slip bisyaroh ${pickedGuru.value.nama} tersimpan`)
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}

// === Riwayat ===
const searchRiwayat = ref('')
const filterPeriode = ref('')
function guruNamaById(id) {
  const g = (guruRaw.value || []).find((x) => String(x.id) === String(id))
  return g?.nama || '(unknown)'
}
const filteredGaji = computed(() => {
  let list = [...gaji.value]
  if (isGuruOnly.value) {
    const sesi = auth.sesiAktif
    const myGuru = (guruRaw.value || []).find((g) => String(g.id) === String(sesi?.id)) ||
      (guruRaw.value || []).find((g) => String(g.nama || '').toLowerCase() === String(sesi?.nama || '').toLowerCase())
    const myId = myGuru?.id
    if (myId !== undefined) list = list.filter((g) => String(g.guru_id) === String(myId))
    else list = []
  }
  if (filterPeriode.value) list = list.filter((g) => g.periode === filterPeriode.value)
  const kw = (isAdmin.value ? searchRiwayat.value : '').trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.guru_nama || guruNamaById(g.guru_id)).toLowerCase().includes(kw))
  return list.sort((a, b) => (b.periode || '').localeCompare(a.periode || ''))
})
const uniquePeriode = computed(() => {
  const set = new Set()
  for (const g of gaji.value) if (g.periode) set.add(g.periode)
  return [...set].sort().reverse()
})
const totalTakeFmt = computed(() =>
  fmtRp(filteredGaji.value.reduce((sum, g) => sum + (Number(g.take_home) || 0), 0))
)

// === BULK GENERATE v.20.28.0526 ===
const bulkFilterTipe = ref('semua')
const isBulkGenerating = ref(false)
const bulkProgress = ref(0)
const bulkLog = ref([])

const bulkTargetGuru = computed(() => {
  let list = (guruRaw.value || []).filter((g) => String(g.status || 'Aktif').toLowerCase() === 'aktif')
  if (bulkFilterTipe.value !== 'semua') {
    list = list.filter((g) => {
      const ngaji = !!(g.lembaga && g.lembaga !== 'Yayasan')
      const sekolah = !!(g.is_sekolah || g.lembaga_sekolah)
      if (bulkFilterTipe.value === 'ngaji') return ngaji && !sekolah
      if (bulkFilterTipe.value === 'sekolah') return sekolah && !ngaji
      if (bulkFilterTipe.value === 'ngaji_sekolah') return ngaji && sekolah
      return true
    })
  }
  return list
})

async function bulkGenerateBisyaroh() {
  if (!confirm(`Generate slip bisyaroh untuk ${bulkTargetGuru.value.length} guru? Slip yang sudah ada di periode ini akan di-OVERWRITE.`)) return
  isBulkGenerating.value = true
  bulkProgress.value = 0
  bulkLog.value = []
  const periode = `${filterTahun.value}-${String(filterBulan.value).padStart(2, '0')}`
  const settings = settingsStore.settings || {}
  const bisyarohPokokMap = settings.keu_bisyaroh_pokok || {}
  const bisyarohSekolahMap = settings.keu_bisyaroh_sekolah || {}

  try {
    for (const guru of bulkTargetGuru.value) {
      try {
        const id = `gaji_${guru.id}_${periode}`
        const bisyaroh_pokok = Number(bisyarohPokokMap[guru.id] || 0)
        const bisyaroh_sekolah = Number(bisyarohSekolahMap[guru.id] || 0)
        const total_pemasukan = bisyaroh_pokok + bisyaroh_sekolah
        await setDoc(doc(db, 'keuangan_gaji', id), {
          id,
          guru_id: Number(guru.id) || guru.id,
          guru_nama: guru.nama,
          lembaga: guru.lembaga || '',
          jabatan: guru.jabatan || '',
          periode,
          bisyaroh_pokok,
          bisyaroh_sekolah,
          bisyaroh_tambahan: 0,
          total_pemasukan,
          total_potongan: 0,
          take_home: total_pemasukan,
          tunjangan_list: [],
          potongan_list: [],
          generated_via: 'bulk',
          updated_at: serverTimestamp()
        })
        bulkLog.value.push(`OK ${guru.nama} -> ${fmtRp(total_pemasukan)}`)
      } catch (e) {
        bulkLog.value.push(`ER ${guru.nama} -> ${e.message}`)
      }
      bulkProgress.value++
    }
    toast.success(`Bulk generate selesai: ${bulkProgress.value}/${bulkTargetGuru.value.length} slip`)
  } catch (e) {
    toast.error('Bulk generate gagal: ' + (e.message || e))
  } finally {
    isBulkGenerating.value = false
  }
}

// === Kirim WA (placeholder future) ===
function kirimSlipWa(g) {
  const guru = (guruRaw.value || []).find((x) => String(x.id) === String(g.guru_id))
  const wa = guru?.wa || guru?.nomor_wa || guru?.no_wa || ''
  if (!wa) {
    toast.warning('Nomor WA guru belum diisi di profil')
    return
  }
  const phone = String(wa).replace(/[^0-9]/g, '').replace(/^0/, '62')
  const msg = [
    `*Slip Bisyaroh* — ${g.guru_nama || guru?.nama}`,
    `Periode: ${g.periode}`,
    `Bisyaroh Pokok: ${fmtRp(g.bisyaroh_pokok)}`,
    `Bisyaroh Sekolah: ${fmtRp(g.bisyaroh_sekolah)}`,
    `Tambahan Shift: ${fmtRp(g.bisyaroh_tambahan)}`,
    `Potongan: ${fmtRp(g.total_potongan)}`,
    `*Take Home: ${fmtRp(g.take_home)}*`,
    '',
    'Barakallah, terima kasih atas dedikasinya.'
  ].join('\n')
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
  window.open(url, '_blank')
}
</script>
