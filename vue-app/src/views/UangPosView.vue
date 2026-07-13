<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses Keuangan terbatas
      </p>
    </div>

    <template v-else>
      <!-- Header + stats + aksi. Disembunyikan di Electron (aksi -> pita "Aksi Halaman"). -->
      <div
        v-if="!isDesktop"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="min-w-0">
            <h1
              class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap"
            >
              <i :class="['fas', posMeta.icon, 'text-cyan-500 mr-1']"></i>{{ pageTitle }}
              <span v-if="gedungScoped" class="text-[var(--text-secondary)]">— {{ myGedung }}</span>
            </h1>
            <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
              Rekap pos {{ pageTitle }} · bagian dari Buku Induk ·
              {{ getBulanLabel(selectedMonth) }} {{ selectedYear }}
            </p>
          </div>
          <div
            class="flex flex-nowrap md:flex-wrap items-center gap-2 overflow-x-auto md:overflow-visible hide-scrollbar [&>*]:shrink-0 md:[&>*]:shrink -mx-1 px-1 lg:mx-0 lg:px-0"
          >
            <button
              @click="bukaModalInput()"
              aria-label="Input transaksi manual"
              class="h-11 md:h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition cursor-pointer"
            >
              <i class="fas fa-plus-circle"></i>Input Manual
            </button>
          </div>
        </div>
        <!-- Stats row -->
        <div class="grid grid-cols-3 gap-2 md:gap-3 mt-3">
          <div class="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-emerald-700 uppercase">Total Masuk</p>
            <p class="text-base md:text-lg font-black text-emerald-800 mt-1">
              {{ fmtRp(stats.pemasukan) }}
            </p>
          </div>
          <div class="bg-rose-50 border-l-4 border-rose-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-rose-700 uppercase">Total Keluar</p>
            <p class="text-base md:text-lg font-black text-rose-800 mt-1">
              {{ fmtRp(stats.pengeluaran) }}
            </p>
          </div>
          <div class="bg-cyan-50 border-l-4 border-cyan-500 p-3 rounded-xl">
            <p class="text-[10px] font-bold text-cyan-700 uppercase">Saldo Pos</p>
            <p class="text-base md:text-lg font-black text-cyan-800 mt-1">
              {{ fmtRp(stats.saldo) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Input Manual Modal -->
      <Teleport to="body">
        <div
          v-if="modalInputOpen"
          @click.self="modalInputOpen = false"
          class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl w-full max-w-md">
            <form @submit.prevent="simpanInputManual" class="p-5">
              <h3 class="text-base font-black text-[var(--text-primary)] mb-4">
                <i class="fas fa-plus-circle text-emerald-600 mr-2"></i>Input {{ pageTitle }}
              </h3>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Tanggal *</label
                  >
                  <input
                    v-model="inputForm.tanggal"
                    type="date"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Tipe *</label
                  >
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      @click="inputForm.tipe = 'masuk'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'masuk'
                          ? 'bg-emerald-600 text-white border-emerald-700'
                          : 'bg-[var(--bg-card)] text-emerald-700 border-emerald-300'
                      ]"
                    >
                      <i class="fas fa-arrow-down mr-1"></i>Pemasukan
                    </button>
                    <button
                      type="button"
                      @click="inputForm.tipe = 'keluar'"
                      :class="[
                        'px-3 py-2 text-xs font-black rounded-lg border-2',
                        inputForm.tipe === 'keluar'
                          ? 'bg-rose-600 text-white border-rose-700'
                          : 'bg-[var(--bg-card)] text-rose-700 border-rose-300'
                      ]"
                    >
                      <i class="fas fa-arrow-up mr-1"></i>Pengeluaran
                    </button>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Kategori</label
                  >
                  <input
                    v-model="inputForm.kategori"
                    type="text"
                    :placeholder="pageTitle"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Keterangan *</label
                  >
                  <textarea
                    v-model="inputForm.keterangan"
                    required
                    rows="2"
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)] resize-none"
                  ></textarea>
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1"
                    >Nominal (Rp) *</label
                  >
                  <input
                    v-model.number="inputForm.nominal"
                    type="number"
                    min="0"
                    required
                    class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card)] text-[var(--text-primary)]"
                  />
                </div>
              </div>
              <div
                class="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-[var(--border-subtle)]"
              >
                <button
                  type="button"
                  @click="modalInputOpen = false"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--bg-muted)] text-[var(--text-secondary)]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="savingInput"
                  class="text-xs font-bold px-4 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50"
                >
                  <i :class="['fas', savingInput ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>
                  {{ savingInput ? 'Menyimpan...' : 'Simpan' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>

      <!-- Filter -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
          <select
            v-model.number="selectedYear"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
          <select
            v-model.number="selectedMonth"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option :value="0">Semua bulan</option>
            <option v-for="(b, i) in BULAN" :key="b" :value="i + 1">{{ b }}</option>
          </select>
          <select
            v-model="filterTipe"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">Semua tipe</option>
            <option value="masuk">Pemasukan</option>
            <option value="keluar">Pengeluaran</option>
          </select>
          <input
            v-model="search"
            type="text"
            placeholder="Cari keterangan..."
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none"
          />
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-cyan-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat rekap...</p>
      </div>

      <!-- Empty -->
      <div
        v-else-if="filtered.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-inbox text-[var(--text-tertiary)] text-4xl mb-3"></i>
        <p class="text-sm font-bold text-[var(--text-primary)]">
          Belum ada transaksi {{ pageTitle }}
        </p>
        <p class="text-[11px] text-[var(--text-secondary)] mt-1">
          Input manual di atas, atau tandai jenis pembayaran sebagai pos ini di Pengaturan Keuangan.
        </p>
      </div>

      <!-- List -->
      <div
        v-else
        class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
      >
        <div
          :class="[
            'hidden md:grid gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 text-[10px] uppercase font-bold text-[var(--text-secondary)] tracking-wider border-b border-[var(--border-subtle)]',
            'md:grid-cols-[100px_1fr_120px_120px]'
          ]"
        >
          <span>Tanggal</span>
          <span>Keterangan</span>
          <span class="text-right">Masuk</span>
          <span class="text-right">Keluar</span>
        </div>
        <div class="divide-y divide-slate-100 dark:divide-slate-700">
          <div
            v-for="b in filtered"
            :key="b.id"
            class="px-4 py-2.5 md:grid gap-2 md:grid-cols-[100px_1fr_120px_120px] hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
          >
            <span
              class="text-[11px] text-[var(--text-secondary)] font-bold whitespace-nowrap block md:inline"
            >
              {{ formatTgl(b.tanggal) }}
            </span>
            <div class="md:inline">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ b.keterangan || '-' }}
              </p>
              <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
                <span
                  v-if="b.kategori"
                  class="bg-[var(--bg-muted)] text-slate-700 dark:text-[var(--text-tertiary)] px-1.5 py-0.5 rounded font-bold"
                >
                  {{ b.kategori }}
                </span>
                <span
                  v-if="b.sumber === 'pos_santri'"
                  class="ml-1 text-emerald-600 font-bold"
                  title="Otomatis dari pembayaran POS"
                  >· auto</span
                >
              </p>
            </div>
            <div class="mt-1 md:mt-0 md:text-right">
              <span
                v-if="b.tipe === 'masuk' || Number(b.masuk) > 0"
                class="text-sm font-black text-emerald-700"
              >
                {{ fmtRp(b.masuk || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
            </div>
            <div class="md:text-right flex items-center md:justify-end gap-2">
              <span
                v-if="b.tipe === 'keluar' || Number(b.keluar) > 0"
                class="text-sm font-black text-rose-700"
              >
                {{ fmtRp(b.keluar || b.nominal) }}
              </span>
              <span v-else class="text-[var(--text-tertiary)]">—</span>
              <button
                v-if="isAdmin"
                type="button"
                @click="hapusRow(b)"
                class="text-[10px] text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-1.5 py-1 rounded"
                title="Hapus record (super admin)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ filtered.length }} transaksi · total tetap
        terhitung di Buku Induk
      </p>
    </template>
  </div>
</template>

<script setup>
// Uang Kegiatan / Uang Buku — rekap "pos" (kantong dana) di atas ledger tunggal
// keuangan_buku_induk. Pos ditentukan route.meta.pos ('kegiatan' | 'buku').
// Transaksi tetap di buku induk (ikut total), view ini hanya menyaring by pos.
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { definePageActions } from '@/composables/useRibbonContext'
import { subscribeColl, setOne, deleteOne, serverTimestamp } from '@/services/db'
import { useAuthStore } from '@/stores/auth'
import { useGedungScope } from '@/composables/useGedungScope'
import { useToast } from '@/composables/useToast'
import { fmtRp, formatTanggal as formatTgl } from '@/utils/format'
import { isSuperAdmin } from '@/utils/roleScope'

const route = useRoute()
const toast = useToast()
const auth = useAuthStore()
const isAdmin = computed(() => isSuperAdmin(auth.sesiAktif))

// Scope Gedung — konsisten dgn Buku Induk (admin ber-gedung hanya lihat gedungnya)
const { scoped: gedungScoped, myGedung, allowRow } = useGedungScope()

const POS_META = {
  kegiatan: { label: 'Uang Kegiatan', icon: 'fa-calendar-check' },
  buku: { label: 'Uang Buku', icon: 'fa-book-open' }
}
const posKey = computed(() => String(route.meta?.pos || 'kegiatan'))
const posMeta = computed(() => POS_META[posKey.value] || POS_META.kegiatan)
const pageTitle = computed(() => posMeta.value.label)

const BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const bukuRaw = ref([])
const loading = ref(true)
let unsub = null

const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1) // 0 = semua bulan
const filterTipe = ref('')
const search = ref('')

const modalInputOpen = ref(false)
const savingInput = ref(false)
const inputForm = reactive({
  tanggal: new Date().toISOString().slice(0, 10),
  tipe: 'masuk',
  kategori: '',
  keterangan: '',
  nominal: 0
})

const isFullAccess = computed(() => {
  const s = auth.sesiAktif
  if (!s) return false
  return (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
})

const filtered = computed(() => {
  // Hanya baris ber-pos ini
  let list = bukuRaw.value.filter((b) => String(b.pos || '') === posKey.value)
  // Scope Gedung (ikut Buku Induk)
  if (gedungScoped.value) list = list.filter(allowRow)
  // Tahun / bulan
  if (selectedMonth.value > 0) {
    const ym = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}`
    list = list.filter((b) => String(b.tanggal || '').substring(0, 7) === ym)
  } else {
    list = list.filter((b) => String(b.tanggal || '').startsWith(String(selectedYear.value)))
  }
  // Tipe
  if (filterTipe.value) {
    list = list.filter((b) => {
      if (filterTipe.value === 'masuk') return b.tipe === 'masuk' || Number(b.masuk) > 0
      if (filterTipe.value === 'keluar') return b.tipe === 'keluar' || Number(b.keluar) > 0
      return true
    })
  }
  // Cari
  const kw = search.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(
      (b) =>
        String(b.keterangan || '')
          .toLowerCase()
          .includes(kw) ||
        String(b.kategori || '')
          .toLowerCase()
          .includes(kw)
    )
  }
  return list.sort(
    (a, b) =>
      (b.tanggal || '').localeCompare(a.tanggal || '') || (b.id || '').localeCompare(a.id || '')
  )
})

const stats = computed(() => {
  let masuk = 0,
    keluar = 0
  for (const b of filtered.value) {
    if (b.tipe === 'masuk' || Number(b.masuk) > 0) masuk += Number(b.masuk || b.nominal) || 0
    if (b.tipe === 'keluar' || Number(b.keluar) > 0) keluar += Number(b.keluar || b.nominal) || 0
  }
  return { pemasukan: masuk, pengeluaran: keluar, saldo: masuk - keluar }
})

const years = computed(() => {
  const now = new Date().getFullYear()
  return [now - 2, now - 1, now, now + 1]
})

function getBulanLabel(m) {
  if (m === 0) return 'Sepanjang tahun'
  return BULAN[m - 1] || '-'
}

function bukaModalInput() {
  inputForm.tanggal = new Date().toISOString().slice(0, 10)
  inputForm.tipe = 'masuk'
  inputForm.kategori = ''
  inputForm.keterangan = ''
  inputForm.nominal = 0
  modalInputOpen.value = true
}

async function simpanInputManual() {
  if (!inputForm.keterangan.trim()) {
    toast.warning('Keterangan wajib diisi')
    return
  }
  if (!inputForm.nominal || inputForm.nominal <= 0) {
    toast.warning('Nominal harus > 0')
    return
  }
  savingInput.value = true
  try {
    const id = `bi_${posKey.value}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`
    const payload = {
      id,
      tanggal: inputForm.tanggal,
      tipe: inputForm.tipe,
      kategori: inputForm.kategori.trim() || pageTitle.value,
      keterangan: inputForm.keterangan.trim(),
      nominal: Number(inputForm.nominal) || 0,
      sumber: 'manual',
      // tag pos: baris ini masuk rekap pos + tetap terhitung di Buku Induk
      pos: posKey.value,
      // ikut gedung admin pencatat ('' utk super_admin = level induk)
      gedung: myGedung.value || '',
      operator: auth.sesiAktif?.nama || auth.sesiAktif?.guru || 'Admin',
      createdAt: serverTimestamp()
    }
    if (inputForm.tipe === 'masuk') payload.masuk = payload.nominal
    else payload.keluar = payload.nominal
    await setOne('keuangan_buku_induk', id, payload)
    toast.success('Transaksi tersimpan')
    modalInputOpen.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    savingInput.value = false
  }
}

async function hapusRow(b) {
  if (!isAdmin.value) return
  const label = b.keterangan || b.kategori || b.id
  if (
    !confirm(
      `Hapus PERMANEN record ${pageTitle.value}:\n${label}\nNominal: ${fmtRp(b.nominal || 0)}\n\nJuga terhapus dari Buku Induk. Tidak bisa di-undo.`
    )
  )
    return
  try {
    await deleteOne('keuangan_buku_induk', b.id)
    toast.success('Record dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

onMounted(() => {
  unsub = subscribeColl('keuangan_buku_induk', (docs) => {
    bukuRaw.value = docs
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

// Electron: header in-page disembunyikan, aksi -> grup pita "Aksi Halaman"
const { isElectron: isDesktop } = useDesktopShell()
definePageActions(() => {
  if (!isFullAccess.value) return []
  return [{ label: 'Input Manual', icon: 'plus', primary: true, on: () => bukaModalInput() }]
})
</script>
