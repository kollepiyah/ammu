<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Akses ditolak (selain santri & full-access) -->
    <div
      v-if="!isFullAccess && !isSantri"
      class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Akses Keuangan terbatas</p>
    </div>

    <!-- =================== MODE SANTRI =================== -->
    <template v-else-if="isSantri">
      <!-- Card saldo santri -->
      <div
        class="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-2xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden"
      >
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none"
        />
        <div class="relative">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-90">
            <i class="fas fa-piggy-bank mr-1"></i>Tabungan Saya
          </p>
          <h2 class="text-xl md:text-2xl font-black mt-1 drop-shadow">{{ namaSantriAktif }}</h2>
          <p class="text-[10px] font-bold uppercase tracking-widest opacity-90 mt-4">
            Saldo Tabungan
          </p>
          <p class="text-3xl md:text-4xl font-black mt-1 drop-shadow">{{ saldoSantriFmt }}</p>
        </div>
      </div>

      <!-- Riwayat mutasi santri -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <div
          class="px-4 md:px-5 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between"
        >
          <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
            <i class="fas fa-history text-emerald-600 mr-2"></i>Riwayat Mutasi
          </h3>
          <span class="text-[10px] text-slate-400 font-bold">
            {{ mutasiSantri.length }} transaksi
          </span>
        </div>

        <div v-if="loading" class="p-10 text-center">
          <i class="fas fa-spinner fa-spin text-emerald-500 text-2xl mb-2"></i>
          <p class="text-xs text-slate-500 font-bold">Memuat...</p>
        </div>
        <div
          v-else-if="mutasiSantri.length === 0"
          class="p-10 border-t-2 border-dashed border-slate-200 text-center"
        >
          <i class="fas fa-inbox text-slate-300 text-3xl mb-2"></i>
          <p class="text-sm text-slate-500 italic">Belum ada mutasi tabungan.</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead
              class="bg-slate-50 dark:bg-slate-900/40 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest"
            >
              <tr>
                <th class="px-4 py-2.5 text-left">Tanggal</th>
                <th class="px-4 py-2.5 text-left">Jenis</th>
                <th class="px-4 py-2.5 text-right">Nominal</th>
                <th class="px-4 py-2.5 text-right">Saldo</th>
                <th class="px-4 py-2.5 text-left">Catatan</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="m in mutasiSantri"
                :key="m.id"
                class="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900/30"
              >
                <td
                  class="px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 whitespace-nowrap"
                >
                  {{ fmtTgl(m.tanggal) }}
                </td>
                <td class="px-4 py-2.5">
                  <span
                    :class="[
                      'inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded',
                      m.jenis === 'setor' || m.tipe === 'masuk'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    ]"
                  >
                    {{ m.jenis || m.tipe || '-' }}
                  </span>
                </td>
                <td
                  :class="[
                    'px-4 py-2.5 text-right font-black whitespace-nowrap',
                    m.jenis === 'setor' || m.tipe === 'masuk' ? 'text-emerald-700' : 'text-rose-700'
                  ]"
                >
                  {{ fmtRp(m.nominal) }}
                </td>
                <td
                  class="px-4 py-2.5 text-right text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap"
                >
                  {{ fmtRp(m.saldo_after || m.saldo) }}
                </td>
                <td
                  class="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]"
                >
                  {{ m.catatan || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- =================== MODE ADMIN / KEUANGAN =================== -->
    <template v-else>
      <!-- Header -->
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 class="text-xl md:text-2xl font-black text-slate-800 dark:text-white">
              <i class="fas fa-piggy-bank text-emerald-500 mr-2"></i>Tabungan
            </h1>
            <p class="text-xs text-slate-500 mt-0.5">Saldo tabungan santri</p>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <div
              class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs"
            >
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">
                {{ totalSaldoFmt }}
              </span>
            </div>
            <button
              @click="openModal()"
              class="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow"
            >
              <i class="fas fa-plus mr-1"></i>Input Mutasi
            </button>
          </div>
        </div>
      </div>

      <!-- Search -->
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
            placeholder="Cari nama..."
            class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>

      <!-- Empty / loading states -->
      <div v-if="loading" class="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center">
        <i class="fas fa-spinner fa-spin text-emerald-500 text-3xl mb-3"></i>
        <p class="text-sm text-slate-500 font-bold">Memuat...</p>
      </div>
      <div
        v-else-if="filteredItems.length === 0"
        class="bg-white dark:bg-slate-800 rounded-2xl p-10 border border-dashed border-slate-300 text-center"
      >
        <i class="fas fa-wallet text-slate-300 text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Tidak ada tabungan</p>
      </div>

      <!-- Orphan banner -->
      <div
        v-if="orphanStats.count > 0"
        class="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-2"
      >
        <div class="flex items-center justify-between gap-2 flex-wrap">
          <p class="text-xs font-bold text-rose-800">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            {{ orphanStats.count }} mutasi orphan (santri_id tidak ada di koleksi santri) &mdash;
            {{ fmtRp(orphanStats.totalSaldo) }}
          </p>
          <div class="flex gap-1.5 flex-wrap">
            <button
              @click="dumpOrphan"
              class="text-[11px] font-bold text-rose-700 bg-white border border-rose-300 px-2 py-1 rounded hover:bg-rose-100 cursor-pointer"
            >
              <i class="fas fa-terminal mr-1"></i>Dump console
            </button>
            <button
              v-if="isFullAccess"
              @click="cleanupOrphan"
              :disabled="orphanCleaning"
              class="text-[11px] font-bold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 px-2 py-1 rounded cursor-pointer"
            >
              <i :class="['fas', orphanCleaning ? 'fa-spinner fa-spin' : 'fa-broom', 'mr-1']"></i>
              {{ orphanCleaning ? 'Membersihkan...' : 'Hapus Mutasi Orphan' }}
            </button>
          </div>
        </div>
        <p class="text-[10px] text-rose-600 mt-1.5">
          <i class="fas fa-info-circle mr-1"></i>
          Mutasi orphan = transaksi yang santri-nya sudah dihapus dari data santri. "Hapus Mutasi
          Orphan" akan menghapus permanen seluruh record `keuangan_tabungan_santri` dengan santri_id
          tersebut.
        </p>
      </div>

      <!-- List santri -->
      <div v-if="!loading && filteredItems.length > 0" class="space-y-2">
        <div
          v-for="t in filteredItems"
          :key="t.santri_id"
          class="bg-white dark:bg-slate-800 rounded-xl p-3 border border-emerald-200 dark:border-emerald-700 shadow-sm"
        >
          <div class="flex items-center gap-3">
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 flex items-center justify-center"
            >
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-bold text-slate-800 dark:text-white truncate">
                {{
                  getNamaSantri(t.santri_id) !== '(unknown)'
                    ? getNamaSantri(t.santri_id)
                    : t.nama_cache || `(orphan ID: ${t.santri_id})`
                }}
              </p>
              <p class="text-[10px] text-slate-500">
                {{ t.terakhir_update ? `Update: ${fmtTgl(t.terakhir_update)}` : '' }}
              </p>
            </div>
            <p class="text-base font-black text-emerald-700 dark:text-emerald-400 mr-2">
              {{ fmtRp(t.saldo) }}
            </p>
            <div class="flex gap-1">
              <button
                @click="openModal(t.santri_id, 'setor')"
                class="bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-[10px] font-black px-2 py-1 rounded"
                title="Setor"
              >
                <i class="fas fa-plus"></i>
              </button>
              <button
                @click="openModal(t.santri_id, 'tarik')"
                class="bg-rose-100 hover:bg-rose-200 text-rose-700 text-[10px] font-black px-2 py-1 rounded"
                title="Tarik"
              >
                <i class="fas fa-minus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- =================== MODAL INPUT MUTASI =================== -->
    <div
      v-if="modalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
      @click.self="closeModal"
    >
      <div
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <div
          class="px-5 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between sticky top-0 bg-white dark:bg-slate-800 z-10"
        >
          <h3 class="text-base font-black text-slate-800 dark:text-white">
            <i class="fas fa-piggy-bank text-emerald-500 mr-2"></i>Input Mutasi Tabungan
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-700">
            <i class="fas fa-times text-lg"></i>
          </button>
        </div>

        <form @submit.prevent="simpanMutasi" class="p-5 space-y-3">
          <!-- Santri (datalist autocomplete) -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
            >
              Santri
            </label>
            <input
              v-model="modalSantriLabel"
              list="tabungan-santri-list"
              placeholder="Ketik nama santri..."
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              @input="onSantriInput"
              required
            />
            <datalist id="tabungan-santri-list">
              <option
                v-for="s in santriOptions"
                :key="s.id"
                :value="`${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`"
              ></option>
            </datalist>
            <p v-if="modalSantriId" class="text-[10px] mt-1 text-emerald-700 font-bold">
              <i class="fas fa-check-circle mr-1"></i>Saldo: {{ fmtRp(modalSaldoSantri) }}
            </p>
            <p
              v-else-if="modalSantriLabel.length >= 2"
              class="text-[10px] mt-1 text-rose-600 font-bold"
            >
              Santri tidak ditemukan &mdash; pilih dari saran.
            </p>
          </div>

          <!-- Jenis + Kategori -->
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label
                class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
              >
                Jenis
              </label>
              <select
                v-model="modalJenis"
                class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="setor">Setor</option>
                <option value="tarik">Tarik</option>
              </select>
            </div>
            <div>
              <label
                class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
              >
                Kategori
              </label>
              <select
                v-model="modalKategori"
                @change="onKategoriChange"
                class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option v-for="k in kategoriOptions" :key="k.id" :value="k.id">
                  {{ k.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Nominal -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
            >
              Nominal
              <span v-if="autoFilled" class="text-emerald-600 normal-case font-bold ml-1">
                <i class="fas fa-magic mr-1"></i>auto-fill {{ getKategoriLabel(modalKategori) }}
              </span>
            </label>
            <input
              v-model.number="modalNominal"
              type="number"
              min="0"
              placeholder="Rp 0"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none font-black text-lg text-emerald-700"
              required
            />
            <p class="text-[10px] mt-1 text-slate-500">{{ fmtRp(modalNominal) }}</p>
          </div>

          <!-- Catatan -->
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400"
            >
              Catatan (opsional)
            </label>
            <input
              v-model="modalCatatan"
              type="text"
              placeholder="Misal: angsuran bulan Mei"
              class="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <!-- Actions -->
          <div
            class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700"
          >
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="saving || !modalSantriId || !modalNominal"
              class="px-5 py-2 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i class="fas fa-save mr-1"></i>{{ saving ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useKeuangan } from '@/composables/useKeuangan'
import { fmtRp, fmtTgl } from '@/utils/format'

const { tabunganSantri, loading, isFullAccess, getNamaSantri, santriRaw } = useKeuangan()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// Role flags
const isSantri = computed(() => auth.sesiAktif?.role === 'santri')
const namaSantriAktif = computed(() => auth.sesiAktif?.nama || '-')
const myId = computed(() => String(auth.sesiAktif?.id || ''))

// =================== SANTRI MODE — saldo + mutasi ===================
const mutasiRaw = ref([])
let unsubMutasi = null

const saldoSantri = computed(() => {
  let total = 0
  for (const m of mutasiRaw.value) {
    if (String(m.santri_id || m.santriId) !== myId.value) continue
    const nominal = Number(m.nominal) || 0
    const jenis = String(m.jenis || '').toLowerCase()
    if (jenis === 'setor') total += nominal
    else if (jenis === 'tarik') total -= nominal
  }
  return total
})
const saldoSantriFmt = computed(() => fmtRp(saldoSantri.value))

const mutasiSantri = computed(() =>
  mutasiRaw.value
    .filter((m) => String(m.santri_id || m.santriId) === myId.value)
    .sort((a, b) => {
      const ta = new Date(a.tanggal || a.created_at || 0).getTime()
      const tb = new Date(b.tanggal || b.created_at || 0).getTime()
      return tb - ta
    })
)

onMounted(() => {
  if (isSantri.value) {
    unsubMutasi = subscribeColl('keuangan_tabungan_santri', (docs) => {
      mutasiRaw.value = docs
    })
  }
})
onUnmounted(() => {
  if (unsubMutasi) {
    try {
      unsubMutasi()
    } catch (e) {}
    unsubMutasi = null
  }
})

// =================== ADMIN MODE — aggregate per santri ===================
const search = ref('')

const aggregated = computed(() => {
  const map = {}
  for (const t of tabunganSantri.value) {
    const sid = String(t.santri_id || t.santriId || '')
    if (!sid) continue
    if (!map[sid]) {
      map[sid] = { santri_id: sid, saldo: 0, terakhir_update: '', nama_cache: t.nama || '' }
    }
    const nominal = Number(t.nominal) || 0
    const jenis = String(t.jenis || '').toLowerCase()
    if (jenis === 'setor') map[sid].saldo += nominal
    else if (jenis === 'tarik') map[sid].saldo -= nominal
    const tgl = String(t.tanggal || '')
    if (tgl && tgl > map[sid].terakhir_update) map[sid].terakhir_update = tgl
  }
  return Object.values(map)
})

const filteredItems = computed(() => {
  const kw = search.value.trim().toLowerCase()
  let list = [...aggregated.value]
  if (kw) {
    list = list.filter((t) =>
      (getNamaSantri(t.santri_id) || t.nama_cache || '').toLowerCase().includes(kw)
    )
  }
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

// Orphan cleanup
const orphanCleaning = ref(false)

async function cleanupOrphan() {
  const ids = orphanStats.value.ids
  if (ids.length === 0) return
  const msg = `Hapus PERMANEN ${orphanStats.value.count} mutasi orphan?\n\nsantri_id: ${ids.join(', ')}\nTotal saldo: ${fmtRp(orphanStats.value.totalSaldo)}\n\nMutasi ini akan hilang dari database. Tidak bisa di-undo.`
  if (!window.confirm(msg)) return
  orphanCleaning.value = true
  let ok = 0
  let fail = 0
  try {
    const targets = tabunganSantri.value.filter((m) => ids.includes(m.santri_id))
    for (const m of targets) {
      try {
        await deleteDoc(doc(db, 'keuangan_tabungan_santri', String(m.id)))
        ok++
      } catch (e) {
        fail++
        console.error('[cleanupOrphan] gagal hapus', m.id, e)
      }
    }
    if (fail > 0) toast.warning(`Cleanup: ${ok} hapus, ${fail} gagal — cek console`)
    else toast.success(`${ok} mutasi orphan dihapus`)
  } catch (e) {
    toast.error('Gagal cleanup: ' + (e.message || e))
  } finally {
    orphanCleaning.value = false
  }
}

function dumpOrphan() {
  console.group('[TabunganView] Orphan mutasi diagnostic')
  console.log('Orphan santri_id list:', orphanStats.value.ids)
  console.log('Total saldo orphan:', orphanStats.value.totalSaldo)
  console.log(
    'Detail:',
    aggregated.value.filter((t) => orphanStats.value.ids.includes(t.santri_id))
  )
  console.groupEnd()
  alert(
    `Orphan dump tersimpan di console (F12). ${orphanStats.value.count} santri_id tidak terhubung ke koleksi santri.`
  )
}

// =================== MODAL — input mutasi ===================
const modalOpen = ref(false)
const modalSantriId = ref('')
const modalSantriLabel = ref('')
const modalJenis = ref('setor')
const modalKategori = ref('syahriyah')
const modalNominal = ref(0)
const modalCatatan = ref('')
const saving = ref(false)
const autoFilled = ref(false)

// Kategori dari settings.keuTagihanJenis (fallback syahriyah default 0)
const kategoriOptions = computed(() => {
  const raw = settings.settings?.keuTagihanJenis
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((k) => ({
      id:
        k.id ||
        String(k.label || k.nama || '')
          .toLowerCase()
          .replace(/\s+/g, '_'),
      label: k.label || k.nama || k.id || '-',
      nominal_default: Number(k.nominal_default || k.nominal || 0) || 0
    }))
  }
  return [{ id: 'syahriyah', label: 'Syahriyah', nominal_default: 0 }]
})

function getKategoriLabel(id) {
  return kategoriOptions.value.find((k) => k.id === id)?.label || id
}

// Saldo santri yang dipilih di modal
const modalSaldoSantri = computed(() => {
  if (!modalSantriId.value) return 0
  const t = aggregated.value.find((x) => String(x.santri_id) === String(modalSantriId.value))
  return t?.saldo || 0
})

// Santri options buat datalist
const santriOptions = computed(() =>
  (santriRaw.value || [])
    .filter((s) => s.aktif !== false)
    .map((s) => ({ id: s.id, nama: s.nama, lembaga: s.lembaga, kelas: s.kelas }))
    .sort((a, b) => (a.nama || '').localeCompare(b.nama || ''))
    .slice(0, 200)
)

function openModal(santriId = '', jenis = 'setor') {
  modalOpen.value = true
  modalJenis.value = jenis
  modalKategori.value = 'syahriyah'
  modalCatatan.value = ''
  const def = kategoriOptions.value.find((k) => k.id === 'syahriyah')
  modalNominal.value = def?.nominal_default || 0
  autoFilled.value = (def?.nominal_default || 0) > 0
  if (santriId) {
    const s = (santriRaw.value || []).find((x) => String(x.id) === String(santriId))
    if (s) {
      modalSantriId.value = String(s.id)
      modalSantriLabel.value = `${s.nama} (${s.lembaga || ''} - ${s.kelas || ''})`
    }
  } else {
    modalSantriId.value = ''
    modalSantriLabel.value = ''
  }
}

function closeModal() {
  modalOpen.value = false
}

// Resolve santri id ketika user mengetik di datalist
function onSantriInput() {
  const namaInput = (modalSantriLabel.value || '').trim().split(' (')[0].trim().toLowerCase()
  const match = (santriRaw.value || []).find(
    (s) => s.aktif !== false && (s.nama || '').toLowerCase() === namaInput
  )
  modalSantriId.value = match ? String(match.id) : ''
}

function onKategoriChange() {
  const k = kategoriOptions.value.find((x) => x.id === modalKategori.value)
  if (k && k.nominal_default > 0) {
    modalNominal.value = k.nominal_default
    autoFilled.value = true
  } else {
    autoFilled.value = false
  }
}

// Manual edit nominal → matikan auto-fill flag
watch(modalNominal, () => {
  if (modalOpen.value) autoFilled.value = false
})

async function simpanMutasi() {
  if (!modalSantriId.value || !modalNominal.value || saving.value) return
  saving.value = true
  try {
    const id = `mutasi_${modalSantriId.value}_${Date.now()}`
    const santri = (santriRaw.value || []).find((s) => String(s.id) === String(modalSantriId.value))
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
    closeModal()
  } catch (e) {
    toast.error('Gagal: ' + (e?.message || e))
  } finally {
    saving.value = false
  }
}
</script>
