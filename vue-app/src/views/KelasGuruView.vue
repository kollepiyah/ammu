<script setup>
// v.21.85.0527: Kelas & Guru — assign santri ke guru (checklist per lembaga)
// Flow: kategori (ngaji/sekolah) → lembaga → guru (+shift utk ngaji) → checklist santri → simpan.
// Ngaji  → tulis guru_pagi / guru_sore (by shift)
// Sekolah → tulis guru_sekolah[] (array)
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl, subscribeDoc, updateOne } from '@/services/firestore'
import { useToast } from '@/composables/useToast'
import { sortSantri } from '@/utils/santriSort'

const toast = useToast()

const santriRaw = ref([])
const guruRaw = ref([])
const lembagaRaw = ref([])
let _unsubS = null
let _unsubG = null
let _unsubL = null

onMounted(() => {
  _unsubS = subscribeColl('santri', (docs) => (santriRaw.value = docs))
  _unsubG = subscribeColl('guru', (docs) => (guruRaw.value = docs))
  _unsubL = subscribeDoc('master', 'lembaga', (d) => {
    lembagaRaw.value = Array.isArray(d?.list) ? d.list : []
  })
})
onUnmounted(() => {
  for (const u of [_unsubS, _unsubG, _unsubL]) {
    if (u) try { u() } catch (e) {}
  }
})

// ── State machine ──
const kategori = ref('') // '' | 'ngaji' | 'sekolah'
const selectedLembaga = ref('')
const selectedShift = ref('Pagi') // utk single 'TPQ'
const selectedGuru = ref('')
const guruSearch = ref('')
const checked = ref(new Set())

function reset() {
  kategori.value = ''
  selectedLembaga.value = ''
  selectedGuru.value = ''
  selectedShift.value = 'Pagi'
  guruSearch.value = ''
  checked.value = new Set()
}
function backToLembaga() {
  selectedLembaga.value = ''
  selectedGuru.value = ''
  checked.value = new Set()
}
function backToGuru() {
  selectedGuru.value = ''
  checked.value = new Set()
}

// ── Lembaga options ──
const QIRAATI = ['TPQ Pagi', 'TPQ Sore', 'TPQ', 'Pra PTPT', 'PTPT', 'PPPH', 'P3H']
const SEKOLAH = ['TK', 'SDI', 'PKBM']

const lembagaOptions = computed(() => {
  const names = (lembagaRaw.value || []).map((l) => l.lembaga || l.nama).filter(Boolean)
  if (kategori.value === 'ngaji') {
    const list = names.filter((n) => {
      const g = (lembagaRaw.value.find((l) => (l.lembaga || l.nama) === n) || {}).group
      if (g) return g === 'qiraati'
      return QIRAATI.includes(n)
    })
    return list.length ? [...new Set(list)] : QIRAATI.filter((n) => n !== 'P3H' && n !== 'TPQ')
  }
  if (kategori.value === 'sekolah') {
    const list = names.filter((n) => {
      const g = (lembagaRaw.value.find((l) => (l.lembaga || l.nama) === n) || {}).group
      if (g) return g === 'sekolah'
      return SEKOLAH.includes(n)
    })
    return list.length ? [...new Set(list)] : SEKOLAH
  }
  return []
})

// Single "TPQ" (tanpa suffix shift) → perlu picker shift
const needShiftPicker = computed(
  () => kategori.value === 'ngaji' && selectedLembaga.value.trim().toLowerCase() === 'tpq'
)

// Field santri yg ditulis (ngaji)
const assignField = computed(() => {
  if (kategori.value !== 'ngaji') return null
  const l = selectedLembaga.value.toLowerCase()
  if (l.includes('sore')) return 'guru_sore'
  if (l.includes('pagi')) return 'guru_pagi'
  if (needShiftPicker.value) return selectedShift.value === 'Sore' ? 'guru_sore' : 'guru_pagi'
  return 'guru_pagi'
})

// Shift efektif utk filter santri ('', 'pagi', 'sore')
const effShift = computed(() => {
  const l = selectedLembaga.value.toLowerCase()
  if (l.includes('sore')) return 'sore'
  if (l.includes('pagi')) return 'pagi'
  if (needShiftPicker.value) return selectedShift.value.toLowerCase()
  return ''
})

// ── Matchers ──
function matchNgaji(s, lembaga) {
  const sl = String(s.lembaga || '').toLowerCase().trim()
  const target = String(lembaga || '').toLowerCase().trim()
  if (!sl || !target) return false
  if ((target === 'ppph' || target === 'p3h') && (sl === 'ppph' || sl === 'p3h')) return true
  if (target.startsWith('tpq')) return sl.startsWith('tpq')
  return sl === target
}
function matchShift(s, shift) {
  if (!shift) return true
  const sl = String(s.lembaga || '').toLowerCase()
  const derived = sl.includes('pagi') ? 'pagi' : sl.includes('sore') ? 'sore' : ''
  const eff = String(s.shift_qiraati || s.shift || '').toLowerCase() || derived
  if (!eff) return true // shift tidak diketahui → tampil di kedua
  return eff === shift
}
function matchSekolah(s, lembaga) {
  const target = String(lembaga || '').toLowerCase().trim()
  const ls = String(s.lembaga_sekolah || '').toLowerCase().trim()
  const l = String(s.lembaga || '').toLowerCase().trim()
  return ls === target || l === target
}

// ── Guru list ──
// v.21.108.0527: filter guru sesuai lembaga terpilih + shift.
const guruList = computed(() => {
  let list = (guruRaw.value || []).filter((g) => {
    const st = String(g.status || 'Aktif').toLowerCase().trim()
    return st === 'aktif'
  })
  if (selectedLembaga.value) {
    const target = String(selectedLembaga.value || '').toLowerCase().trim()
    list = list.filter((g) => {
      const gl = String(g.lembaga || '').toLowerCase().trim()
      const gls = String(g.lembaga_sekolah || '').toLowerCase().trim()
      if (kategori.value === 'ngaji') return gl === target
      if (kategori.value === 'sekolah') return gls === target || gl === target
      return false
    })
    if (kategori.value === 'ngaji' && effShift.value) {
      const sh = String(effShift.value).toLowerCase()
      list = list.filter((g) => {
        const gShift = String(g.shift || '').toLowerCase()
        return !gShift || gShift === 'pagi_sore' || gShift === sh || gShift.includes(sh)
      })
    }
  }
  const kw = guruSearch.value.trim().toLowerCase()
  if (kw) list = list.filter((g) => String(g.nama || '').toLowerCase().includes(kw))
  return list.sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
})

// ── Santri kandidat (sesuai lembaga + shift) ──
const santriKandidat = computed(() => {
  if (!selectedLembaga.value) return []
  let list = (santriRaw.value || []).filter((s) => s && s.aktif !== false)
  if (kategori.value === 'ngaji') {
    list = list.filter((s) => matchNgaji(s, selectedLembaga.value) && matchShift(s, effShift.value))
    return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
  }
  list = list.filter((s) => matchSekolah(s, selectedLembaga.value))
  return sortSantri(list, { lembagaField: 'lembaga_sekolah', kelasField: 'kelas_sekolah' })
})

// Apakah santri saat ini sudah diampu guru terpilih
function isAssigned(s) {
  if (kategori.value === 'ngaji') {
    return String(s[assignField.value] || '').trim().toLowerCase() === selectedGuru.value.toLowerCase()
  }
  const arr = Array.isArray(s.guru_sekolah) ? s.guru_sekolah : []
  return arr.map((x) => String(x || '').toLowerCase()).includes(selectedGuru.value.toLowerCase())
}

// Saat guru dipilih → inisialisasi checkbox dari data existing
function pilihGuru(nama) {
  selectedGuru.value = nama
  const set = new Set()
  for (const s of santriKandidat.value) {
    if (isAssigned(s)) set.add(s.id)
  }
  checked.value = set
}

function toggle(id) {
  const set = new Set(checked.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  checked.value = set
}
function selectAll() {
  checked.value = new Set(santriKandidat.value.map((s) => s.id))
}
function selectNone() {
  checked.value = new Set()
}

const saving = ref(false)
const jumlahDipilih = computed(() => santriKandidat.value.filter((s) => checked.value.has(s.id)).length)

async function simpan() {
  if (!selectedGuru.value) {
    toast.warning('Pilih guru dulu')
    return
  }
  saving.value = true
  let changed = 0
  try {
    for (const s of santriKandidat.value) {
      const want = checked.value.has(s.id)
      if (kategori.value === 'ngaji') {
        const f = assignField.value
        const cur = String(s[f] || '').trim()
        if (want && cur.toLowerCase() !== selectedGuru.value.toLowerCase()) {
          await updateOne('santri', s.id, { [f]: selectedGuru.value })
          changed++
        } else if (!want && cur.toLowerCase() === selectedGuru.value.toLowerCase()) {
          await updateOne('santri', s.id, { [f]: '' })
          changed++
        }
      } else {
        const arr = Array.isArray(s.guru_sekolah) ? [...s.guru_sekolah] : []
        const lower = arr.map((x) => String(x || '').toLowerCase())
        const has = lower.includes(selectedGuru.value.toLowerCase())
        if (want && !has) {
          arr.push(selectedGuru.value)
          await updateOne('santri', s.id, { guru_sekolah: arr })
          changed++
        } else if (!want && has) {
          const next = arr.filter((x) => String(x || '').toLowerCase() !== selectedGuru.value.toLowerCase())
          await updateOne('santri', s.id, { guru_sekolah: next })
          changed++
        }
      }
    }
    toast.success(`Tersimpan — ${changed} santri diperbarui`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

function kelasLabel(s) {
  return kategori.value === 'ngaji' ? s.kelas || '-' : s.kelas_sekolah || s.kelas || '-'
}
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
            <i class="fas fa-user-friends text-teal-500 mr-2"></i>Kelas &amp; Guru
          </h1>
          <p class="text-xs text-[var(--text-secondary)] mt-0.5">
            Tetapkan santri ke guru pengampu (centang per lembaga).
          </p>
        </div>
        <button
          v-if="kategori"
          type="button"
          @click="reset"
          class="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 px-3 py-1.5 rounded-lg"
        >
          <i class="fas fa-rotate-left mr-1"></i>Mulai Ulang
        </button>
      </div>
    </div>

    <!-- STEP 1: kategori -->
    <div v-if="!kategori" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        @click="kategori = 'ngaji'"
        class="bg-gradient-to-br from-teal-500 to-teal-700 text-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
      >
        <i class="fas fa-book-quran text-2xl mb-2 drop-shadow"></i>
        <h3 class="text-base font-black">Ngaji (Qiraati)</h3>
        <p class="text-xs text-white/85 mt-1">TPQ, Pra PTPT, PTPT, PPPH — guru pagi/sore.</p>
      </button>
      <button
        type="button"
        @click="kategori = 'sekolah'"
        class="bg-gradient-to-br from-cyan-500 to-cyan-700 text-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md hover:-translate-y-0.5 transition cursor-pointer"
      >
        <i class="fas fa-school text-2xl mb-2 drop-shadow"></i>
        <h3 class="text-base font-black">Sekolah (Formal)</h3>
        <p class="text-xs text-white/85 mt-1">TK, SDI, PKBM — guru sekolah (bisa banyak).</p>
      </button>
    </div>

    <!-- STEP 2: pilih lembaga -->
    <div
      v-else-if="!selectedLembaga"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-building text-teal-600 mr-1"></i>Pilih Lembaga
          <span class="text-[10px] uppercase font-bold text-[var(--text-tertiary)] ml-1"
            >({{ kategori === 'ngaji' ? 'Ngaji' : 'Sekolah' }})</span
          >
        </h3>
        <button
          type="button"
          @click="kategori = ''"
          class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline"
        >
          <i class="fas fa-arrow-left mr-1"></i>Kembali
        </button>
      </div>
      <div v-if="lembagaOptions.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-4 text-center">
        Tidak ada lembaga.
      </div>
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          v-for="l in lembagaOptions"
          :key="l"
          type="button"
          @click="selectedLembaga = l"
          class="px-3 py-3 text-sm font-bold rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] text-[var(--text-primary)] hover:bg-teal-50 dark:hover:bg-teal-900/30 hover:border-teal-400 transition cursor-pointer"
        >
          {{ l }}
        </button>
      </div>
    </div>

    <!-- STEP 3: pilih guru (+shift) -->
    <div
      v-else-if="!selectedGuru"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-chalkboard-teacher text-teal-600 mr-1"></i>Pilih Guru —
          <span class="text-teal-600">{{ selectedLembaga }}</span>
        </h3>
        <button
          type="button"
          @click="backToLembaga"
          class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline"
        >
          <i class="fas fa-arrow-left mr-1"></i>Ganti Lembaga
        </button>
      </div>

      <!-- shift picker utk single TPQ -->
      <div v-if="needShiftPicker" class="mb-3">
        <label class="text-[11px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
          >Shift</label
        >
        <div class="flex gap-1.5">
          <button
            v-for="sh in ['Pagi', 'Sore']"
            :key="sh"
            type="button"
            @click="selectedShift = sh"
            :class="[
              'px-3 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
              selectedShift === sh
                ? 'bg-teal-600 text-white border-teal-700'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30'
            ]"
          >
            {{ sh }}
          </button>
        </div>
      </div>

      <input
        v-model="guruSearch"
        type="text"
        placeholder="Cari nama guru..."
        class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-input)] text-[var(--text-primary)] mb-3"
      />
      <div v-if="guruList.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-4 text-center">
        Tidak ada guru.
      </div>
      <ul v-else class="space-y-1.5 max-h-[55vh] overflow-y-auto">
        <li
          v-for="g in guruList"
          :key="g.id"
          @click="pilihGuru(g.nama)"
          class="flex items-center gap-2 bg-[var(--bg-muted)] px-3 py-2 rounded-lg cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/30 border border-transparent hover:border-teal-300 transition"
        >
          <i class="fas fa-user-circle text-teal-600 text-lg"></i>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ g.nama }}</p>
            <p class="text-[10px] text-[var(--text-tertiary)] truncate">
              {{ g.jabatan || 'Guru' }}<span v-if="g.lembaga"> · {{ g.lembaga }}</span>
            </p>
          </div>
          <i class="fas fa-chevron-right text-[var(--text-tertiary)] text-xs"></i>
        </li>
      </ul>
    </div>

    <!-- STEP 4: checklist santri -->
    <div
      v-else
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-list-check text-teal-600 mr-1"></i>{{ selectedGuru }}
          <span class="text-[10px] font-bold text-[var(--text-tertiary)] uppercase ml-1">
            {{ selectedLembaga }}<span v-if="effShift"> · {{ effShift }}</span>
          </span>
        </h3>
        <button
          type="button"
          @click="backToGuru"
          class="text-[11px] font-bold text-[var(--text-secondary)] hover:underline"
        >
          <i class="fas fa-arrow-left mr-1"></i>Ganti Guru
        </button>
      </div>
      <p class="text-[11px] text-[var(--text-secondary)] mb-3">
        Centang santri yang diampu
        <b v-if="kategori === 'ngaji'">({{ assignField === 'guru_sore' ? 'guru sore' : 'guru pagi' }})</b
        ><b v-else>(guru sekolah)</b>. <span class="text-teal-600 font-bold">{{ jumlahDipilih }}</span> dipilih.
      </p>

      <div class="flex gap-2 mb-3">
        <button
          type="button"
          @click="selectAll"
          class="text-[11px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-2.5 py-1 rounded-lg"
        >
          <i class="fas fa-check-double mr-1"></i>Pilih Semua
        </button>
        <button
          type="button"
          @click="selectNone"
          class="text-[11px] font-bold text-[var(--text-secondary)] bg-[var(--bg-muted)] px-2.5 py-1 rounded-lg"
        >
          <i class="fas fa-xmark mr-1"></i>Kosongkan
        </button>
      </div>

      <div v-if="santriKandidat.length === 0" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-inbox text-3xl text-[var(--border-default)] block mb-2"></i>
        Tidak ada santri di lembaga ini.
      </div>
      <ul v-else class="space-y-1 max-h-[50vh] overflow-y-auto">
        <li
          v-for="s in santriKandidat"
          :key="s.id"
          @click="toggle(s.id)"
          :class="[
            'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer border transition',
            checked.has(s.id)
              ? 'bg-teal-50 dark:bg-teal-900/30 border-teal-300'
              : 'bg-[var(--bg-muted)] border-transparent hover:border-[var(--border-default)]'
          ]"
        >
          <i
            :class="[
              'fas',
              checked.has(s.id) ? 'fa-square-check text-teal-600' : 'fa-square text-[var(--text-tertiary)]'
            ]"
          ></i>
          <span class="flex-1 text-sm font-bold text-[var(--text-primary)] truncate">{{ s.nama }}</span>
          <span class="text-[10px] font-bold text-[var(--text-tertiary)]">{{ kelasLabel(s) }}</span>
        </li>
      </ul>

      <button
        type="button"
        @click="simpan"
        :disabled="saving"
        class="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save']"></i>
        {{ saving ? 'Menyimpan...' : 'SIMPAN PENUGASAN' }}
      </button>
    </div>
  </div>
</template>
