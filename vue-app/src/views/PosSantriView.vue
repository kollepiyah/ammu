<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex items-center justify-between gap-2">
        <div>
          <h2
            class="text-lg md:text-xl font-black text-slate-800 dark:text-white flex items-center gap-2"
          >
            <i class="fas fa-cash-register text-teal-600"></i>POS Santri
          </h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pembayaran tagihan, syahriyah, tabungan, dll
          </p>
        </div>
        <span
          class="text-[10px] font-bold text-teal-700 bg-teal-50 dark:bg-teal-900/30 dark:text-teal-300 px-2 py-1 rounded-full"
        >
          {{ santriList.length }} santri aktif
        </span>
      </div>
    </div>

    <!-- Access denied -->
    <div
      v-if="!isAdminKeu"
      class="bg-rose-50 dark:bg-rose-900/30 border border-rose-200 dark:border-rose-700 rounded-2xl p-5 text-center"
    >
      <i class="fas fa-lock text-3xl text-rose-600 mb-2"></i>
      <p class="text-sm font-bold text-rose-700 dark:text-rose-300">Akses Ditolak</p>
      <p class="text-xs text-rose-600 dark:text-rose-400 mt-1">
        Hanya admin keuangan / super admin yang bisa pakai POS Santri.
      </p>
    </div>

    <!-- Filter bar -->
    <div
      v-if="isAdminKeu"
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <div class="flex flex-col md:flex-row gap-2">
        <div class="relative flex-1">
          <i
            class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
          ></i>
          <input
            v-model="search"
            type="search"
            placeholder="Cari nama, NIS, atau WA wali..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          />
        </div>
        <select
          v-model="filterLembaga"
          class="px-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
        >
          <option value="">Semua Lembaga</option>
          <option v-for="lb in lembagaList" :key="lb" :value="lb">{{ lb }}</option>
        </select>
        <label
          class="flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-2.5 rounded-xl border border-rose-200 cursor-pointer hover:bg-rose-100"
        >
          <input v-model="filterTunggakan" type="checkbox" class="w-4 h-4 accent-rose-600" />
          Tunggakan saja
        </label>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="isAdminKeu && loading"
      class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-slate-200 dark:border-slate-700 text-center"
    >
      <i class="fas fa-spinner fa-spin text-2xl text-teal-600 mb-2"></i>
      <p class="text-sm text-slate-500">Memuat data santri...</p>
    </div>

    <!-- Santri grid -->
    <div
      v-if="isAdminKeu && !loading"
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <p v-if="filteredSantri.length === 0" class="text-center text-slate-400 py-6 text-sm">
        Tidak ada santri yang cocok.
      </p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <button
          v-for="s in filteredSantri"
          :key="s.id"
          @click="openModal(s)"
          class="text-left p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:border-teal-300 transition cursor-pointer flex items-center gap-2.5"
        >
          <div
            class="w-9 h-9 rounded-full bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-700 dark:to-cyan-700 flex items-center justify-center font-black text-teal-700 dark:text-teal-200 flex-shrink-0"
          >
            {{ (s.nama || '?').charAt(0).toUpperCase() }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ s.nama }}</p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">
              {{ s.nis || '—' }}{{ s.lembaga ? ' · ' + s.lembaga : ''
              }}{{ s.kelas ? ' · ' + s.kelas : '' }}
            </p>
            <p
              v-if="tunggakanMap[s.id]?.count > 0"
              class="text-[10px] font-black text-rose-600 mt-0.5"
            >
              <i class="fas fa-exclamation-circle mr-1"></i>
              {{ tunggakanMap[s.id].count }} tagihan · {{ fmtRp(tunggakanMap[s.id].total) }}
            </p>
          </div>
          <i class="fas fa-chevron-right text-slate-300 text-xs"></i>
        </button>
      </div>
      <p v-if="filteredSantri.length === 50" class="text-center text-[10px] text-slate-400 mt-3">
        Menampilkan 50 santri pertama — refine pencarian untuk lihat lainnya
      </p>
    </div>

    <!-- Histori transaksi terakhir -->
    <div
      v-if="isAdminKeu && histori.length > 0"
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h3 class="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest mb-2">
        <i class="fas fa-history text-cyan-600 mr-1"></i>Transaksi Terakhir
      </h3>
      <div class="space-y-1.5">
        <div
          v-for="t in histori"
          :key="t.id"
          class="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-xs"
        >
          <div class="flex-1 min-w-0">
            <p class="font-bold truncate text-slate-700 dark:text-slate-200">{{ t.santri_nama }}</p>
            <p class="text-[10px] text-slate-500 truncate">
              {{ t.kategori }} · {{ fmtTgl(t.tanggal) }}
            </p>
          </div>
          <span class="font-black text-emerald-600">{{ fmtRp(t.nominal) }}</span>
        </div>
      </div>
    </div>

    <!-- Modal POS -->
    <ModalPOS
      :open="modalOpen"
      :santri="selectedSantri"
      :operator="operatorName"
      :initial-cart="initialCart"
      @close="closeModal"
      @simpan="handleSimpan"
    />
  </div>
</template>

<script setup>
// v.21+: POS Santri — kasir cepat pembayaran tagihan/syahriyah/tabungan dengan modal cart.
// Save ke keuangan_buku_induk (sumber='pos_santri') + auto-lunas tagihan terkait.
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '@/services/firebase'
import ModalPOS from '@/components/pos/ModalPOS.vue'

const auth = useAuthStore()
const toast = useToast()

const santriList = ref([])
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('')
const selectedSantri = ref(null)
const modalOpen = ref(false)
const histori = ref([])
const tunggakanMap = ref({})
const filterTunggakan = ref(false)
const initialCart = ref([])
const loadingCart = ref(false)

const operatorName = computed(() => {
  return auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin'
})

const isAdminKeu = computed(() => {
  const rs = auth.sesiAktif?.role_sistem || ''
  return auth.sesiAktif?.role === 'admin' || ['admin', 'admin_keuangan', 'super_admin'].includes(rs)
})

onMounted(async () => {
  if (!isAdminKeu.value) {
    toast.error('Akses ditolak — hanya admin keuangan yang bisa pakai POS Santri')
    loading.value = false
    return
  }
  try {
    // Load santri
    const snap = await getDocs(collection(db, 'santri'))
    santriList.value = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((s) => s.aktif !== false)
      .sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))

    // Load 5 transaksi terakhir POS Santri
    const histSnap = await getDocs(
      query(collection(db, 'keuangan_buku_induk'), orderBy('createdAt', 'desc'), limit(5))
    )
    histori.value = histSnap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.sumber === 'pos_santri')

    // Load tunggakan map (count + total per santri_id)
    try {
      const tagSnap = await getDocs(collection(db, 'keuangan_tagihan'))
      const map = {}
      for (const t of tagSnap.docs) {
        const data = t.data()
        const status = String(data.status || 'belum').toLowerCase()
        if (status !== 'belum' && status !== 'partial') continue
        const sid = data.santri_id
        if (!sid) continue
        if (!map[sid]) map[sid] = { count: 0, total: 0 }
        map[sid].count++
        map[sid].total += Number(data.nominal || 0) - Number(data.dibayar || 0)
      }
      tunggakanMap.value = map
    } catch (e) {
      console.warn('[pos] load tunggakan fail:', e.message)
    }
  } catch (e) {
    toast.error('Gagal load data santri: ' + e.message)
  } finally {
    loading.value = false
  }
})

const lembagaList = computed(() => {
  const set = new Set(santriList.value.map((s) => s.lembaga).filter(Boolean))
  return Array.from(set).sort()
})

const filteredSantri = computed(() => {
  let list = santriList.value
  if (filterLembaga.value) list = list.filter((s) => s.lembaga === filterLembaga.value)
  if (filterTunggakan.value) list = list.filter((s) => (tunggakanMap.value[s.id]?.count || 0) > 0)
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(q) ||
        String(s.nis || '').includes(q) ||
        String(s.wa || '').includes(q)
    )
  }
  if (filterTunggakan.value) {
    list = [...list].sort(
      (a, b) => (tunggakanMap.value[b.id]?.total || 0) - (tunggakanMap.value[a.id]?.total || 0)
    )
  }
  return list.slice(0, 50)
})

async function openModal(s) {
  selectedSantri.value = s
  loadingCart.value = true
  initialCart.value = []
  try {
    const tagCol = collection(db, 'keuangan_tagihan')
    const snap = await getDocs(query(tagCol, where('santri_id', '==', s.id), limit(50)))
    const pending = snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((t) => t.status === 'belum' || t.status === 'partial')
      .sort((a, b) => (a.jatuh_tempo || '').localeCompare(b.jatuh_tempo || ''))
    if (pending.length > 0) {
      initialCart.value = pending.map((t) => ({
        jenis: t.jenis_label || t.jenis_id || 'Tagihan',
        nominal: Number(t.nominal || 0),
        keterangan: t.keterangan || (t.bulan ? `Bulan ${t.bulan}` : ''),
        tagihan_id: t.id
      }))
      toast.info(`${pending.length} tagihan pending dimuat ke cart`)
    }
  } catch (e) {
    console.warn('[pos] load tagihan fail:', e.message)
  } finally {
    loadingCart.value = false
    modalOpen.value = true
  }
}

function closeModal() {
  modalOpen.value = false
  initialCart.value = []
}

async function handleSimpan(payload) {
  try {
    const tanggal = payload.tanggal
    const writes = []
    const tagihanIdsToLunas = []
    for (const item of payload.items) {
      const id = `pos_${Date.now()}_${Math.floor(Math.random() * 1000)}`
      const docData = {
        id,
        tanggal,
        tipe: 'masuk',
        kategori: item.jenis,
        nominal: item.nominal,
        keterangan: `${item.jenis} — ${payload.santri_nama} (${payload.santri_nis || payload.santri_id})${item.keterangan ? ' — ' + item.keterangan : ''}`,
        sumber: 'pos_santri',
        santri_id: payload.santri_id,
        santri_nama: payload.santri_nama,
        operator: payload.operator || operatorName.value,
        wali: '',
        createdAt: serverTimestamp()
      }
      writes.push(setDoc(doc(db, 'keuangan_buku_induk', id), docData))
      histori.value.unshift(docData)
      if (item.tagihan_id) tagihanIdsToLunas.push(item.tagihan_id)
    }
    for (const tid of tagihanIdsToLunas) {
      writes.push(
        updateDoc(doc(db, 'keuangan_tagihan', tid), {
          status: 'lunas',
          tanggal_lunas: tanggal,
          dibayar_via: 'pos_santri',
          operator_pelunasan: payload.operator || operatorName.value
        }).catch((e) => console.warn('[pos] update tagihan fail:', tid, e.message))
      )
    }
    await Promise.all(writes)
    if (histori.value.length > 5) histori.value = histori.value.slice(0, 5)
    const extra =
      tagihanIdsToLunas.length > 0 ? ` (${tagihanIdsToLunas.length} tagihan dilunasi)` : ''
    toast.success(
      `Sukses! ${payload.items.length} transaksi tersimpan untuk ${payload.santri_nama}${extra}`
    )
    modalOpen.value = false
    selectedSantri.value = null
    initialCart.value = []
  } catch (e) {
    toast.error('Gagal simpan: ' + e.message)
  }
}

function fmtRp(n) {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(n || 0))
}

function fmtTgl(t) {
  if (!t) return '—'
  try {
    return new Date(t).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  } catch {
    return t
  }
}
</script>
