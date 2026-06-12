<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 class="text-base md:text-lg font-black">
            <i class="fas fa-file-export text-cyan-500 mr-2"></i>Ekspor Riwayat Santri
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Cetak PDF rentang bulan: Tagihan + Pembayaran + Tabungan
          </p>
        </div>
      </div>
    </div>

    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-dashed border-[var(--border-default)]"
    >
      <i class="fas fa-lock text-rose-500 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-[var(--text-primary)]">Akses terbatas</p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Hanya admin / admin keuangan yang bisa mengakses ekspor ini.
      </p>
    </div>

    <template v-else>
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3">
        <div>
          <p class="text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1.5 tracking-wider">
            <i class="fas fa-calendar-alt mr-1"></i>Rentang Periode
          </p>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
            <select
              v-model.number="bulanDari"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option v-for="(b, i) in BULAN" :key="`d-${i}`" :value="i + 1">{{ b }}</option>
            </select>
            <select
              v-model.number="tahunDari"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option v-for="y in tahunOptions" :key="`yd-${y}`" :value="y">{{ y }}</option>
            </select>
            <select
              v-model.number="bulanSampai"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option v-for="(b, i) in BULAN" :key="`s-${i}`" :value="i + 1">{{ b }}</option>
            </select>
            <select
              v-model.number="tahunSampai"
              class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option v-for="y in tahunOptions" :key="`ys-${y}`" :value="y">{{ y }}</option>
            </select>
          </div>
          <div class="flex items-center gap-2 mt-2 flex-wrap">
            <button type="button" @click="setPresetBulanIni" class="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200">Bulan ini</button>
            <button type="button" @click="setPresetSemester" class="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200">Semester ini</button>
            <button type="button" @click="setPresetSetahun" class="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200">1 tahun ({{ tahunSampai }})</button>
            <span class="text-[10px] text-[var(--text-tertiary)] font-bold ml-auto">{{ rangeLabel }}</span>
          </div>
        </div>

        <div class="pt-3 border-t border-[var(--border-subtle)]">
          <p class="text-[10px] uppercase font-black text-[var(--text-secondary)] mb-1.5 tracking-wider">
            <i class="fas fa-user mr-1"></i>Filter Santri
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
            <select v-model="selectedLembaga" class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="">Semua lembaga</option>
              <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
            </select>
            <input v-model="search" type="text" placeholder="Cari nama / No. Induk..." class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <p class="text-[10px] text-[var(--text-tertiary)] font-bold mt-1.5">{{ filteredSantri.length }} santri ditemukan</p>
        </div>
      </div>

      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-2"></i>
        <p class="text-xs text-[var(--text-secondary)] font-bold">Memuat data...</p>
      </div>
      <div v-else-if="filteredSantri.length === 0" class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center">
        <i class="fas fa-search text-[var(--text-tertiary)] text-3xl mb-2"></i>
        <p class="text-sm text-[var(--text-secondary)] italic">Tidak ada santri yang cocok</p>
      </div>
      <div v-else class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden">
        <div class="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
          <div v-for="s in filteredSantri" :key="s.id" class="p-3 md:p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 flex items-center gap-3">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center">
              <i class="fas fa-user"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-[var(--text-secondary)] truncate">No. Induk {{ s.nis || s.id }} · {{ s.lembaga || '-' }} · {{ s.kelas || '-' }}</p>
            </div>
            <!-- v.21.115.0528: standardize per design-tokens — Cetak PDF cyan -->
            <button type="button" :disabled="busyId === s.id" @click="cetakRiwayat(s)" aria-label="Cetak PDF riwayat santri" class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer">
              <i :class="['fas', busyId === s.id ? 'fa-spinner fa-spin' : 'fa-file-pdf']"></i>
              {{ busyId === s.id ? 'Memproses...' : 'Cetak PDF' }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="lastDebug" class="bg-[var(--bg-card-elevated)] rounded-xl p-3 text-[10px] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
        <p class="font-black mb-1"><i class="fas fa-info-circle mr-1"></i>Hasil ekspor terakhir:</p>
        <p>Tagihan: <b>{{ lastDebug.tagihan }}</b> · POS: <b>{{ lastDebug.pembayaran }}</b> · Tabungan: <b>{{ lastDebug.tabungan }}</b></p>
        <p v-if="lastDebug.tagihan === 0 && lastDebug.pembayaran === 0 && lastDebug.tabungan === 0" class="text-rose-600 mt-1">
          Tidak ada data di rentang ini. Cek tanggal record atau coba periode lebih lebar (klik "1 tahun").
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
// v.21.102.0527 — Ekspor riwayat per santri rentang bulan-tahun.
// Tidak pakai Firestore where() — fetch semua + filter di client supaya
// kompat dgn santri_id (bisa string atau number di data lama).
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { subscribeColl } from '@/services/firestore'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { sortSantri } from '@/utils/santriSort'
import { cetakRiwayatSantriPdf, buildKopFromSettings } from '@/utils/riwayatSantriPdf'

const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin','admin','admin_keuangan'].includes(s.role_sistem)
})

const santriRaw = ref([])
const loading = ref(true)
let unsubSantri = null

const now = new Date()
const tahunDari = ref(now.getFullYear())
const tahunSampai = ref(now.getFullYear())
const bulanDari = ref(1)
const bulanSampai = ref(12)

const selectedLembaga = ref('')
const search = ref('')
const busyId = ref('')
const lastDebug = ref(null)

const lembagaOptions = computed(() => {
  const set = new Set()
  for (const s of santriRaw.value) {
    if (s.lembaga) set.add(s.lembaga)
    if (s.lembaga_sekolah) set.add(s.lembaga_sekolah)
  }
  return Array.from(set).filter(Boolean).sort()
})

const tahunOptions = computed(() => {
  const cur = new Date().getFullYear()
  const out = []
  for (let y = cur + 1; y >= cur - 5; y--) out.push(y)
  return out
})

const filteredSantri = computed(() => {
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  if (selectedLembaga.value) {
    list = list.filter((s) => s.lembaga === selectedLembaga.value || s.lembaga_sekolah === selectedLembaga.value)
  }
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter((s) => String(s.nama || '').toLowerCase().includes(kw) || String(s.nis || '').toLowerCase().includes(kw))
  }
  return sortSantri(list)
})

function pad2(n) { return String(n).padStart(2, '0') }
function lastDayOfMonth(y, m) { return new Date(y, m, 0).getDate() }

const dariStr = computed(() => `${tahunDari.value}-${pad2(bulanDari.value)}-01`)
const sampaiStr = computed(() => `${tahunSampai.value}-${pad2(bulanSampai.value)}-${pad2(lastDayOfMonth(tahunSampai.value, bulanSampai.value))}`)

const rangeLabel = computed(() => `${BULAN[bulanDari.value - 1]} ${tahunDari.value} → ${BULAN[bulanSampai.value - 1]} ${tahunSampai.value}`)

function setPresetBulanIni() {
  const d = new Date()
  tahunDari.value = d.getFullYear()
  tahunSampai.value = d.getFullYear()
  bulanDari.value = d.getMonth() + 1
  bulanSampai.value = d.getMonth() + 1
}
function setPresetSemester() {
  const d = new Date()
  tahunDari.value = d.getFullYear()
  tahunSampai.value = d.getFullYear()
  if (d.getMonth() + 1 <= 6) { bulanDari.value = 1; bulanSampai.value = 6 }
  else { bulanDari.value = 7; bulanSampai.value = 12 }
}
function setPresetSetahun() {
  bulanDari.value = 1
  bulanSampai.value = 12
  tahunDari.value = tahunSampai.value
}

onMounted(() => {
  unsubSantri = subscribeColl('santri', (docs) => { santriRaw.value = docs; loading.value = false })
})
onUnmounted(() => {
  if (unsubSantri) { try { unsubSantri() } catch { /* ignore */ } }
})

function validateRange() {
  const a = new Date(dariStr.value)
  const b = new Date(sampaiStr.value)
  if (a > b) { toast.warning('Rentang tidak valid: "Dari" lebih besar dari "Sampai"'); return false }
  return true
}

async function cetakRiwayat(s) {
  if (!s || busyId.value) return
  if (!validateRange()) return
  busyId.value = s.id
  lastDebug.value = null
  try {
    const [tgSnap, biSnap, tbSnap] = await Promise.all([
      getDocs(collection(db, 'keuangan_tagihan')),
      getDocs(collection(db, 'keuangan_buku_induk')),
      getDocs(collection(db, 'keuangan_tabungan_santri'))
    ])
    const tagihan = tgSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const pembayaran = biSnap.docs.map((d) => ({ id: d.id, ...d.data() })).filter((r) => r.sumber === 'pos_santri')
    const tabungan = tbSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const kop = buildKopFromSettings(settings.settings || {})
    const { stats } = await cetakRiwayatSantriPdf({
      santri: s, dari: dariStr.value, sampai: sampaiStr.value,
      tagihan, pembayaran, tabungan, kop
    })
    lastDebug.value = stats
    if (stats.tagihan + stats.pembayaran + stats.tabungan === 0) {
      toast.warning(`PDF dibuat tapi kosong — tidak ada data untuk ${s.nama} di periode ini`)
    } else {
      toast.success(`PDF ${s.nama} — ${stats.tagihan} tagihan, ${stats.pembayaran} POS, ${stats.tabungan} mutasi`)
    }
  } catch (e) {
    console.error('[cetakRiwayatSantri]', e)
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    busyId.value = ''
  }
}
</script>
