<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
            <i class="fas fa-piggy-bank text-emerald-500 mr-2"></i>Tabungan Santri
          </h1>
          <p class="text-xs text-slate-500 mt-0.5">Saldo + mutasi tabungan per santri</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <div class="px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs">
            <span class="text-emerald-700 font-bold">{{ totalSaldoFmt }}</span>
            <span class="text-slate-500 ml-1">total saldo</span>
          </div>
          <button
            v-if="isFullAccess"
            @click="openModalNew"
            class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"
          >
            <i class="fas fa-plus mr-1"></i>Input Mutasi
          </button>
        </div>
      </div>
    </div>

    <!-- Search -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm relative"
    >
      <i class="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama santri..."
        class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-emerald-500 outline-none"
      />
    </div>

    <!-- Orphan tool -->
    <div
      v-if="isFullAccess && orphanStats.count > 0"
      class="bg-rose-50 border border-rose-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-2"
    >
      <p class="text-xs font-bold text-rose-800">
        <i class="fas fa-exclamation-triangle mr-1"></i>{{ orphanStats.count }} mutasi orphan ({{
          fmtRp(orphanStats.totalSaldo)
        }})
      </p>
      <button
        @click="cleanupOrphan"
        :disabled="orphanCleaning"
        class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-2 py-1 rounded"
      >
        <i :class="['fas', orphanCleaning ? 'fa-spinner fa-spin' : 'fa-broom', 'mr-1']"></i>Hapus
        Orphan
      </button>
    </div>

    <!-- List -->
    <div v-if="loading" class="bg-white rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-emerald-500 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500">Memuat...</p>
    </div>
    <div
      v-else-if="filteredItems.length === 0"
      class="bg-white rounded-2xl p-10 border border-dashed border-slate-300 text-center"
    >
      <i class="fas fa-wallet text-slate-300 text-3xl mb-2"></i>
      <p class="text-sm text-slate-500 italic">Belum ada mutasi tabungan.</p>
    </div>
    <div v-else class="space-y-2">
      <div
        v-for="t in filteredItems"
        :key="t.santri_id"
        class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-emerald-200 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"
          >
            <i class="fas fa-user-graduate"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 truncate">
              {{
                getNamaSantri(t.santri_id) !== '(unknown)'
                  ? getNamaSantri(t.santri_id)
                  : t.nama_cache || `(orphan ID: ${t.santri_id})`
              }}
            </p>
            <p class="text-[10px] text-slate-500">
              Mutasi terakhir: {{ t.terakhir ? fmtTgl(t.terakhir) : '-' }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-lg font-black text-emerald-700">{{ fmtRp(t.saldo) }}</p>
            <p class="text-[9px] text-slate-500 uppercase">Saldo</p>
          </div>
          <button
            v-if="isFullAccess"
            @click="openModalMutasi(t.santri_id)"
            class="text-emerald-500 hover:bg-emerald-50 p-2 rounded"
          >
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal Input Mutasi -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4"
      @click.self="modalOpen = false"
    >
      <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-5">
        <h3 class="text-base font-black mb-3">
          <i class="fas fa-plus-circle text-emerald-500 mr-1"></i>Input Mutasi Tabungan
        </h3>
        <div class="space-y-2">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Santri</label>
            <select
              v-model="modalSantriId"
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            >
              <option value="">-- Pilih santri --</option>
              <option v-for="s in santriList" :key="s.id" :value="s.id">
                {{ s.nama }} ({{ s.lembaga }})
              </option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">Jenis</label>
              <select
                v-model="modalJenis"
                class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="setor">Setor</option>
                <option value="tarik">Tarik</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-500 mb-1">Kategori</label>
              <select
                v-model="modalKategori"
                class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="tabungan">Tabungan</option>
                <option value="syahriyah">Syahriyah</option>
                <option value="lain">Lain-lain</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Nominal</label>
            <input
              v-model.number="modalNominal"
              type="number"
              min="0"
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1">Catatan (opsional)</label>
            <input
              v-model="modalCatatan"
              type="text"
              placeholder="cth: SPP April 2026"
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            />
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button
            @click="modalOpen = false"
            class="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm"
          >
            Batal
          </button>
          <button
            @click="simpanMutasi"
            :disabled="saving || !modalSantriId || !modalNominal"
            class="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm"
          >
            <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i
            >{{ saving ? 'Menyimpan...' : 'Simpan' }}
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
import { fmtRp, fmtTgl } from '@/utils/format'

const auth = useAuthStore()
const toast = useToast()
const santriList = ref([])
const mutasiRaw = ref([])
const loading = ref(true)
const search = ref('')
const orphanCleaning = ref(false)
let unsubSantri = null
let unsubMutasi = null

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

const aggregated = computed(() => {
  const map = new Map()
  for (const m of mutasiRaw.value) {
    const sid = String(m.santri_id || '')
    if (!sid) continue
    let r = map.get(sid)
    if (!r) {
      r = { santri_id: sid, saldo: 0, terakhir: null, nama_cache: m.nama_cache || null }
      map.set(sid, r)
    }
    const nominal = Number(m.nominal || 0)
    if (
      String(m.jenis || '').toLowerCase() === 'tarik' ||
      String(m.tipe || '').toLowerCase() === 'keluar'
    )
      r.saldo -= nominal
    else r.saldo += nominal
    const tgl = m.tanggal || m.created_at
    if (tgl && (!r.terakhir || String(tgl) > String(r.terakhir))) r.terakhir = tgl
  }
  return [...map.values()]
})

const filteredItems = computed(() => {
  let list = aggregated.value
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter((t) =>
      String(getNamaSantri(t.santri_id) || '')
        .toLowerCase()
        .includes(kw)
    )
  return list.sort((a, b) => (Number(b.saldo) || 0) - (Number(a.saldo) || 0))
})

const orphanStats = computed(() => {
  const orphans = aggregated.value.filter(
    (t) => getNamaSantri(t.santri_id) === '(unknown)' && !t.nama_cache
  )
  return {
    count: orphans.length,
    totalSaldo: orphans.reduce((s, o) => s + Number(o.saldo || 0), 0),
    ids: orphans.map((o) => o.santri_id)
  }
})

const totalSaldoFmt = computed(() =>
  fmtRp(aggregated.value.reduce((s, t) => s + (Number(t.saldo) || 0), 0))
)

// Modal
const modalOpen = ref(false)
const modalSantriId = ref('')
const modalJenis = ref('setor')
const modalKategori = ref('tabungan')
const modalNominal = ref(0)
const modalCatatan = ref('')
const saving = ref(false)

function openModalNew() {
  modalSantriId.value = ''
  modalJenis.value = 'setor'
  modalKategori.value = 'tabungan'
  modalNominal.value = 0
  modalCatatan.value = ''
  modalOpen.value = true
}
function openModalMutasi(sid) {
  openModalNew()
  modalSantriId.value = sid
}

async function simpanMutasi() {
  if (!modalSantriId.value || !modalNominal.value || saving.value) return
  saving.value = true
  try {
    const id = `mutasi_${modalSantriId.value}_${Date.now()}`
    const santri = santriList.value.find((s) => String(s.id) === String(modalSantriId.value))
    await setDoc(doc(db, 'keuangan_tabungan_santri', id), {
      id,
      santri_id: modalSantriId.value,
      nama_cache: santri?.nama || '',
      jenis: modalJenis.value,
      kategori: modalKategori.value,
      nominal: Number(modalNominal.value),
      catatan: modalCatatan.value,
      tanggal: new Date().toISOString().slice(0, 10),
      created_at: serverTimestamp()
    })
    toast.success('Mutasi tersimpan')
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

async function cleanupOrphan() {
  if (orphanStats.value.ids.length === 0) return
  if (
    !confirm(
      `Hapus PERMANEN ${orphanStats.value.count} mutasi orphan (total ${fmtRp(orphanStats.value.totalSaldo)})?`
    )
  )
    return
  orphanCleaning.value = true
  let ok = 0
  try {
    const orphanIds = orphanStats.value.ids
    const targets = mutasiRaw.value.filter((m) => orphanIds.includes(m.santri_id))
    for (const m of targets) {
      try {
        await deleteDoc(doc(db, 'keuangan_tabungan_santri', String(m.id)))
        ok++
      } catch (e) {
        console.warn(e?.message)
      }
    }
    toast.success(`${ok} mutasi orphan dihapus`)
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    orphanCleaning.value = false
  }
}

onMounted(() => {
  unsubSantri = subscribeColl('santri', (docs) => {
    santriList.value = docs
  })
  unsubMutasi = subscribeColl('keuangan_tabungan_santri', (docs) => {
    mutasiRaw.value = docs
    loading.value = false
  })
})
onUnmounted(() => {
  if (unsubSantri) {
    try {
      unsubSantri()
    } catch (e) {}
  }
  if (unsubMutasi) {
    try {
      unsubMutasi()
    } catch (e) {}
  }
})
</script>
