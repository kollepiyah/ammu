<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <!-- Header -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-base md:text-lg font-black text-slate-800 dark:text-white">
        <i class="fas fa-graduation-cap text-amber-500 mr-1"></i>Naik Kelas / Kenaikan Jilid
      </h1>
      <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
        Kontrol kartu kenaikan per santri — pilih lembaga lalu santri untuk mulai
      </p>
    </div>

    <!-- Tabs -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-sm flex gap-1"
    >
      <button
        @click="activeTab = 'form'"
        :class="[
          'flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer',
          activeTab === 'form'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-slate-500 hover:bg-blue-50'
        ]"
      >
        <i class="fas fa-edit mr-1"></i>Form Kenaikan
      </button>
      <button
        @click="activeTab = 'riwayat'"
        :class="[
          'flex-1 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition cursor-pointer',
          activeTab === 'riwayat'
            ? 'bg-blue-600 text-white shadow-md'
            : 'text-slate-500 hover:bg-blue-50'
        ]"
      >
        <i class="fas fa-id-card mr-1"></i>Riwayat Kenaikan
      </button>
    </div>

    <!-- Filter Lembaga (always visible) -->
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <p class="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
        Filter Lembaga
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="l in LEMBAGA_QIRAATI"
          :key="l"
          @click="filterLembaga = l"
          :class="[
            'flex-1 min-w-[100px] px-3 py-2 text-xs font-bold rounded-lg border-2 transition cursor-pointer',
            filterLembaga === l
              ? lembagaActiveColor(l)
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
          ]"
        >
          {{ l }}
        </button>
      </div>
    </div>

    <!-- Tab: Form Kenaikan -->
    <div v-if="activeTab === 'form'" class="space-y-3">
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-3 md:p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="relative">
          <i
            class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
          ></i>
          <input
            v-model="search"
            type="text"
            placeholder="Cari nama santri..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-blue-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat santri...</p>
      </div>
      <div
        v-else-if="filteredSantri.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">
          Tidak ada santri yang cocok di lembaga {{ filterLembaga }}.
        </p>
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          v-for="s in filteredSantri"
          :key="s.id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-700 dark:to-blue-700 border-2 border-white flex items-center justify-center flex-shrink-0 overflow-hidden"
            >
              <img v-if="s.foto" :src="s.foto" alt="" class="w-full h-full object-cover" />
              <i v-else class="fas fa-user-graduate text-cyan-500 dark:text-cyan-200"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-black text-slate-800 dark:text-white truncate">{{ s.nama }}</p>
              <p class="text-[10px] text-slate-500 dark:text-slate-400">
                NIS: {{ s.nis || '-' }} · {{ s.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}
              </p>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  class="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-bold"
                  >{{ s.lembaga }} {{ s.shift ? '· ' + s.shift : '' }}</span
                >
                <span
                  class="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold"
                  >Kelas: {{ s.kelas || '-' }}</span
                >
                <span
                  v-if="s.juz"
                  class="text-[9px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold"
                  >Juz {{ s.juz }}</span
                >
              </div>
            </div>
            <button
              @click="openModal(s)"
              class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-black rounded-lg shadow cursor-pointer transition flex-shrink-0"
            >
              <i class="fas fa-arrow-up mr-1"></i>Proses Naik
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Riwayat Kenaikan -->
    <div
      v-else
      class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
    >
      <div class="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
          <i class="fas fa-history text-blue-600 mr-2"></i>Riwayat Kenaikan
        </h3>
        <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
          {{ riwayatRows.length }} entry · filter: {{ filterLembaga }}
        </p>
      </div>
      <div v-if="riwayatRows.length === 0" class="p-10 text-center">
        <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
        <p class="text-sm text-slate-500 italic">Belum ada riwayat kenaikan di lembaga ini.</p>
      </div>
      <div v-else class="divide-y divide-slate-100 dark:divide-slate-700">
        <div
          v-for="(r, idx) in riwayatRows"
          :key="`${r.santri_id}_${idx}`"
          class="p-3 hover:bg-slate-50 dark:hover:bg-slate-900/30"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center"
            >
              <i class="fas fa-arrow-up"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">{{ r.nama }}</p>
              <p class="text-[10px] text-slate-500">
                {{ r.lembaga }} · {{ r.tgl_naik }} · {{ r.kelas_from || '?' }} →
                <b>{{ r.kelas_to }}</b>
              </p>
              <p v-if="r.catatan" class="text-[10px] text-slate-600 mt-0.5 italic">
                "{{ r.catatan }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Proses Naik -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="modalOpen = false"
    >
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-5">
        <h3 class="text-base font-black text-slate-800 dark:text-white mb-3">
          <i class="fas fa-arrow-up text-amber-500 mr-1"></i>Proses Kenaikan
        </h3>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 border border-amber-200 mb-3">
          <p class="text-xs font-bold text-amber-800 dark:text-amber-300">
            {{ modalSantri?.nama }}
          </p>
          <p class="text-[10px] text-amber-700 dark:text-amber-300">
            {{ modalSantri?.lembaga }} {{ modalSantri?.shift ? '· ' + modalSantri.shift : '' }} ·
            Kelas {{ modalSantri?.kelas || '-' }}
          </p>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1 uppercase"
              >Tanggal Naik</label
            >
            <input
              v-model="modalTgl"
              type="date"
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1 uppercase">Kelas Baru</label>
            <input
              v-model="modalKelasBaru"
              type="text"
              placeholder="cth: Jilid 3, Kelas 2, Juz 5"
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
          <div v-if="String(modalSantri?.lembaga || '').toUpperCase() === 'PTPT'">
            <label class="block text-xs font-bold text-rose-500 mb-1 uppercase">Juz (PTPT)</label>
            <input
              v-model="modalJuz"
              type="text"
              placeholder="cth: 5"
              class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-rose-50 focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-500 mb-1 uppercase"
              >Catatan / Rekomendasi Guru</label
            >
            <textarea
              v-model="modalCatatan"
              rows="3"
              placeholder="Catatan opsional dari guru..."
              class="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            ></textarea>
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <button
            @click="modalOpen = false"
            class="flex-1 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-sm transition"
          >
            Batal
          </button>
          <button
            @click="prosesNaik"
            :disabled="saving || !modalKelasBaru"
            class="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow transition"
          >
            <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-check', 'mr-1']"></i
            >{{ saving ? 'Memproses...' : 'Simpan Kenaikan' }}
          </button>
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

const toast = useToast()
const LEMBAGA_QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'Pra PTPT', 'PTPT', 'PPPH']

const santriRaw = ref([])
const loading = ref(true)
const search = ref('')
const filterLembaga = ref('TPQ Pagi')
const activeTab = ref('form')
let unsub = null

const modalOpen = ref(false)
const modalSantri = ref(null)
const modalTgl = ref('')
const modalKelasBaru = ref('')
const modalJuz = ref('')
const modalCatatan = ref('')
const saving = ref(false)

function lembagaActiveColor(l) {
  const colors = {
    'TPQ Pagi': 'bg-emerald-500 border-emerald-600 text-white',
    'TPQ Sore': 'bg-cyan-500 border-cyan-600 text-white',
    'Pra PTPT': 'bg-blue-500 border-blue-600 text-white',
    PTPT: 'bg-purple-500 border-purple-600 text-white',
    PPPH: 'bg-amber-500 border-amber-600 text-white'
  }
  return colors[l] || 'bg-slate-500 border-slate-600 text-white'
}

// v.21.28.0526: Filter santri shift-aware (TPQ Pagi/Sore vs lembaga 'TPQ' + shift)
const filteredSantri = computed(() => {
  let list = santriRaw.value.filter((s) => s.aktif !== false)
  // Filter by lembaga (handle TPQ Pagi/Sore via shift)
  const fl = filterLembaga.value
  if (fl === 'TPQ Pagi') {
    list = list.filter((s) => {
      const lmb = String(s.lembaga || '').trim()
      const shift = String(s.shift || '')
        .toLowerCase()
        .trim()
      return lmb.toLowerCase() === 'tpq pagi' || (lmb.toLowerCase() === 'tpq' && shift === 'pagi')
    })
  } else if (fl === 'TPQ Sore') {
    list = list.filter((s) => {
      const lmb = String(s.lembaga || '').trim()
      const shift = String(s.shift || '')
        .toLowerCase()
        .trim()
      return lmb.toLowerCase() === 'tpq sore' || (lmb.toLowerCase() === 'tpq' && shift === 'sore')
    })
  } else {
    list = list.filter(
      (s) =>
        String(s.lembaga || '')
          .trim()
          .toLowerCase() === fl.toLowerCase()
    )
  }
  // Search filter
  const kw = search.value.trim().toLowerCase()
  if (kw)
    list = list.filter(
      (s) =>
        String(s.nama || '')
          .toLowerCase()
          .includes(kw) ||
        String(s.nis || '')
          .toLowerCase()
          .includes(kw)
    )
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

// Riwayat — flatten dari semua santri.riwayat[], filter by lembaga
const riwayatRows = computed(() => {
  const rows = []
  for (const s of santriRaw.value) {
    if (!Array.isArray(s.riwayat) || s.riwayat.length === 0) continue
    const lmb = String(s.lembaga || '').toLowerCase()
    const shift = String(s.shift || '').toLowerCase()
    const fl = filterLembaga.value.toLowerCase()
    let match = false
    if (fl === 'tpq pagi') match = lmb === 'tpq pagi' || (lmb === 'tpq' && shift === 'pagi')
    else if (fl === 'tpq sore') match = lmb === 'tpq sore' || (lmb === 'tpq' && shift === 'sore')
    else match = lmb === fl
    if (!match) continue
    for (const r of s.riwayat) {
      rows.push({
        santri_id: s.id,
        nama: s.nama,
        lembaga: s.lembaga,
        tgl_naik: r.tgl_naik || '-',
        kelas_from: r.kelas_from || '',
        kelas_to: r.kelas_to || '?',
        catatan: r.catatan || ''
      })
    }
  }
  return rows.sort((a, b) => String(b.tgl_naik).localeCompare(String(a.tgl_naik)))
})

function openModal(s) {
  modalSantri.value = s
  modalTgl.value = new Date().toISOString().slice(0, 10)
  modalKelasBaru.value = ''
  modalJuz.value = s.juz || ''
  modalCatatan.value = ''
  modalOpen.value = true
}

async function prosesNaik() {
  if (!modalSantri.value || !modalKelasBaru.value || saving.value) return
  saving.value = true
  try {
    const s = modalSantri.value
    const newRiwayatEntry = {
      tgl_naik: modalTgl.value || new Date().toISOString().slice(0, 10),
      kelas_from: s.kelas || '',
      kelas_to: modalKelasBaru.value,
      catatan: modalCatatan.value || '',
      lembaga: s.lembaga,
      shift: s.shift || '',
      juz_from: s.juz || '',
      juz_to: modalJuz.value || ''
    }
    const newRiwayat = Array.isArray(s.riwayat)
      ? [...s.riwayat, newRiwayatEntry]
      : [newRiwayatEntry]
    const payload = {
      id: Number(s.id) || s.id,
      nama: s.nama,
      kelas: modalKelasBaru.value,
      riwayat: newRiwayat,
      _last_kenaikan_at: serverTimestamp()
    }
    if (String(s.lembaga || '').toUpperCase() === 'PTPT' && modalJuz.value) {
      payload.juz = modalJuz.value
    }
    await setDoc(doc(db, 'santri', String(s.id)), payload, { merge: true })
    toast.success(`${s.nama} naik ke ${modalKelasBaru.value}`)
    modalOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  unsub = subscribeColl('santri', (docs) => {
    santriRaw.value = docs
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
