<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 class="text-xl md:text-2xl font-black">
            <i class="fas fa-cash-register text-purple-500 mr-2"></i>POS Santri
          </h1>
          <p class="text-xs text-slate-500 mt-0.5">Kasir cepat transaksi tabungan / syahriyah</p>
        </div>
        <div class="px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-xs">
          <span class="text-purple-700 font-bold">{{ transaksiHariIni.length }}</span>
          <span class="text-slate-500 ml-1">transaksi hari ini</span>
        </div>
      </div>
    </div>

    <!-- Pilih santri + transaksi cepat -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3"
    >
      <div>
        <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Pilih Santri</label>
        <select
          v-model="selectedSantriId"
          class="w-full px-3 py-2 text-sm rounded-xl border-2 border-purple-300 bg-purple-50 focus:ring-2 focus:ring-purple-500 outline-none font-bold"
        >
          <option value="">-- Pilih santri --</option>
          <option v-for="s in santriList" :key="s.id" :value="s.id">
            {{ s.nama }} ({{ s.lembaga }}{{ s.shift ? ' ' + s.shift : '' }})
          </option>
        </select>
      </div>
      <div
        v-if="selectedSantri"
        class="bg-purple-50 rounded-lg p-3 border border-purple-200 grid grid-cols-2 gap-2 text-xs"
      >
        <div><b>Nama:</b> {{ selectedSantri.nama }}</div>
        <div><b>NIS:</b> {{ selectedSantri.nis || '-' }}</div>
        <div><b>Lembaga:</b> {{ selectedSantri.lembaga }}</div>
        <div>
          <b>Saldo Tabungan:</b>
          <span class="text-emerald-700 font-bold">{{ fmtRp(saldoSantri) }}</span>
        </div>
        <div>
          <b>Tunggakan:</b>
          <span class="text-rose-700 font-bold">{{ fmtRp(tunggakanSantri) }}</span>
        </div>
      </div>
      <div v-if="selectedSantri" class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Jenis Transaksi</label>
          <select
            v-model="trxJenis"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
          >
            <option value="setor">Setor Tabungan</option>
            <option value="tarik">Tarik Tabungan</option>
            <option value="bayar_syahriyah">Bayar Syahriyah</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-500 mb-1">Nominal</label>
          <input
            v-model.number="trxNominal"
            type="number"
            min="0"
            placeholder="0"
            class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white text-right font-bold"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="prosesTrx"
            :disabled="saving || !trxNominal"
            class="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black rounded-xl text-sm shadow"
          >
            <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i
            >{{ saving ? 'Proses...' : 'Proses' }}
          </button>
        </div>
      </div>
      <div v-if="selectedSantri">
        <label class="block text-xs font-bold text-slate-500 mb-1">Catatan (opsional)</label>
        <input
          v-model="trxCatatan"
          type="text"
          placeholder="cth: Setor harian, bayar SPP April"
          class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
        />
      </div>
    </div>

    <!-- Transaksi hari ini -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-slate-100">
        <h3 class="text-sm font-black">
          <i class="fas fa-history text-purple-600 mr-1"></i>Transaksi Hari Ini ({{
            transaksiHariIni.length
          }})
        </h3>
      </div>
      <div v-if="transaksiHariIni.length === 0" class="p-10 text-center">
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Belum ada transaksi hari ini.</p>
      </div>
      <div v-else class="divide-y divide-slate-100">
        <div v-for="t in transaksiHariIni" :key="t.id" class="p-3 flex items-center gap-3">
          <div
            :class="[
              'w-9 h-9 rounded-full flex items-center justify-center text-white',
              String(t.jenis).includes('setor') || String(t.jenis).includes('bayar')
                ? 'bg-emerald-500'
                : 'bg-rose-500'
            ]"
          >
            <i
              class="fas fa-arrow-down"
              v-if="String(t.jenis).includes('setor') || String(t.jenis).includes('bayar')"
            ></i>
            <i class="fas fa-arrow-up" v-else></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold truncate">
              {{ t.nama_cache || getNamaSantri(t.santri_id) }}
            </p>
            <p class="text-[10px] text-slate-500">{{ t.jenis }} · {{ t.catatan || '-' }}</p>
          </div>
          <p
            class="text-sm font-black"
            :class="
              String(t.jenis).includes('setor') || String(t.jenis).includes('bayar')
                ? 'text-emerald-700'
                : 'text-rose-700'
            "
          >
            {{ fmtRp(t.nominal) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
import { fmtRp } from '@/utils/format'

const toast = useToast()
const santriList = ref([])
const mutasiRaw = ref([])
const tagihanRaw = ref([])
const selectedSantriId = ref('')
const trxJenis = ref('setor')
const trxNominal = ref(0)
const trxCatatan = ref('')
const saving = ref(false)
let unsubSantri = null
let unsubMutasi = null
let unsubTagihan = null

const selectedSantri = computed(
  () => santriList.value.find((s) => String(s.id) === String(selectedSantriId.value)) || null
)

function getNamaSantri(id) {
  const s = santriList.value.find((x) => String(x.id) === String(id))
  return s?.nama || '(unknown)'
}

const saldoSantri = computed(() => {
  if (!selectedSantri.value) return 0
  return mutasiRaw.value
    .filter((m) => String(m.santri_id) === String(selectedSantriId.value))
    .reduce(
      (s, m) =>
        s +
        (String(m.jenis).includes('setor') || String(m.jenis).includes('bayar')
          ? Number(m.nominal || 0)
          : -Number(m.nominal || 0)),
      0
    )
})

const tunggakanSantri = computed(() => {
  if (!selectedSantri.value) return 0
  return tagihanRaw.value
    .filter((t) => String(t.santri_id) === String(selectedSantriId.value))
    .reduce((s, t) => s + Math.max(0, Number(t.nominal || 0) - Number(t.bayar || 0)), 0)
})

const transaksiHariIni = computed(() => {
  const today = new Date().toISOString().slice(0, 10)
  return mutasiRaw.value
    .filter((m) => String(m.tanggal || '').slice(0, 10) === today)
    .sort((a, b) =>
      String(b.created_at?.seconds || b.tanggal).localeCompare(
        String(a.created_at?.seconds || a.tanggal)
      )
    )
})

async function prosesTrx() {
  if (!selectedSantriId.value || !trxNominal.value || saving.value) return
  saving.value = true
  try {
    const id = `pos_${selectedSantriId.value}_${Date.now()}`
    await setDoc(doc(db, 'keuangan_tabungan_santri', id), {
      id,
      santri_id: selectedSantriId.value,
      nama_cache: selectedSantri.value?.nama || '',
      jenis: trxJenis.value === 'bayar_syahriyah' ? 'setor' : trxJenis.value,
      kategori: trxJenis.value === 'bayar_syahriyah' ? 'syahriyah' : 'tabungan',
      nominal: Number(trxNominal.value),
      catatan:
        trxCatatan.value ||
        (trxJenis.value === 'bayar_syahriyah'
          ? 'POS - Bayar Syahriyah'
          : 'POS - ' + trxJenis.value),
      tanggal: new Date().toISOString().slice(0, 10),
      source: 'pos',
      created_at: serverTimestamp()
    })
    toast.success(
      `${trxJenis.value === 'tarik' ? 'Tarik' : 'Setor'} ${fmtRp(trxNominal.value)} berhasil`
    )
    trxNominal.value = 0
    trxCatatan.value = ''
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  unsubSantri = subscribeColl('santri', (docs) => {
    santriList.value = docs
  })
  unsubMutasi = subscribeColl('keuangan_tabungan_santri', (docs) => {
    mutasiRaw.value = docs
  })
  unsubTagihan = subscribeColl('keuangan_tagihan', (docs) => {
    tagihanRaw.value = docs
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
  if (unsubTagihan) {
    try {
      unsubTagihan()
    } catch (e) {}
  }
})
</script>
