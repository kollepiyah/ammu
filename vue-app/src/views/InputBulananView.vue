<template>
  <div class="p-4 md:p-6 max-w-7xl mx-auto space-y-4">
    <!-- Header + filter card -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-3 flex-wrap mb-3">
        <h2 class="text-base md:text-lg font-black text-[var(--text-primary)]">
          <i class="fas fa-pen-fancy text-teal-600 mr-2"></i>Input Prestasi Bulanan
        </h2>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-[var(--text-secondary)] hidden md:inline">
            {{ filteredSantri.length }} santri
          </span>
          <button
            @click="simpanBatch"
            :disabled="saving || dirtyCount === 0"
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white transition cursor-pointer disabled:opacity-50"
          >
            <i class="fas fa-save mr-1"></i>
            {{ saving ? 'Menyimpan...' : `Simpan${dirtyCount ? ` (${dirtyCount})` : ''}` }}
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <select
          v-model="filterLembaga"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option value="">Semua Lembaga</option>
          <option v-for="l in lembagaOptions" :key="l" :value="l">{{ l }}</option>
        </select>

        <select
          v-model.number="bulan"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option v-for="(name, idx) in NAMA_BULAN" :key="idx" :value="idx">{{ name }}</option>
        </select>

        <select
          v-model.number="tahun"
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        >
          <option v-for="y in tahunOptions" :key="y" :value="y">{{ y }}</option>
        </select>

        <input
          v-model="search"
          type="search"
          placeholder="Cari santri..."
          class="text-xs px-3 py-2 border border-[var(--border-default)] rounded-lg bg-white dark:bg-slate-900 text-[var(--text-primary)]"
        />
      </div>

      <p class="text-[10px] text-[var(--text-tertiary)] italic mt-2">
        <i class="fas fa-info-circle mr-1"></i>
        Total: <b>TPQ Pagi/Sore + PPPH</b> manual, <b>Pra PTPT</b> auto dari khotam (Lvl
        &le;1&frac12; Juz: 2x, Lvl 2-3 Juz: 3x), <b>PTPT</b> auto = Akhir - Awal Hal.
      </p>
    </div>

    <!-- Table card -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] shadow-sm overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead class="bg-[var(--bg-muted)] sticky top-0">
            <tr>
              <th
                class="p-2 text-left font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600"
              >
                Nama
              </th>
              <th
                class="p-2 text-center font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-10"
              >
                L/P
              </th>
              <th
                class="p-2 text-center font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-24"
              >
                Kls Sekolah
              </th>
              <th
                class="p-2 text-center font-black text-[var(--text-primary)] uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 w-24"
              >
                Qiraati
              </th>
              <th
                v-if="hasPtpt"
                class="p-2 text-center font-black text-rose-700 dark:text-rose-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-rose-50/50 dark:bg-rose-900/20 w-20"
              >
                Juz
              </th>
              <th
                class="p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-teal-50/50 dark:bg-teal-900/20 w-24"
              >
                Awal Bln
              </th>
              <th
                class="p-2 text-center font-black text-teal-700 dark:text-teal-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-teal-50/50 dark:bg-teal-900/20 w-24"
              >
                Akhir Bln
              </th>
              <th
                class="p-2 text-center font-black text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-cyan-50/50 dark:bg-cyan-900/20 w-24"
              >
                Total
              </th>
              <th
                class="p-2 text-center font-black text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-widest border-b border-slate-200 dark:border-slate-600 bg-cyan-50/50 dark:bg-cyan-900/20 w-24"
              >
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredSantri.length === 0">
              <td :colspan="hasPtpt ? 9 : 8" class="text-center text-[var(--text-tertiary)] italic py-8">
                <i class="fas fa-inbox text-2xl block mb-2 text-slate-300 dark:text-[var(--text-secondary)]"></i>
                Tidak ada santri yang cocok dengan filter.
              </td>
            </tr>
            <template v-else v-for="(grp, gi) in grouped" :key="gi">
              <tr class="bg-slate-200 dark:bg-slate-700/50">
                <td
                  :colspan="hasPtpt ? 9 : 8"
                  class="p-2 font-black text-[var(--text-primary)] uppercase text-[11px] tracking-widest"
                >
                  <i class="fas fa-layer-group mr-2 text-teal-600"></i>{{ grp.label }}
                </td>
              </tr>
              <tr
                v-for="s in grp.items"
                :key="s.id"
                class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
              >
                <td
                  class="p-2 font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] whitespace-nowrap leading-tight"
                >
                  {{ s.nama }}
                  <span
                    v-if="s.usia"
                    class="block text-[9px] font-bold text-[var(--text-secondary)] bg-[var(--bg-muted)] px-1 rounded mt-0.5 w-fit"
                    >{{ s.usia }}</span
                  >
                </td>
                <td
                  class="p-2 text-center font-bold border-b border-[var(--border-subtle)]"
                >
                  {{ s.jk }}
                </td>

                <!-- Kelas sekolah -->
                <td
                  class="p-1 border-b border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]/30 dark:bg-slate-700/20"
                >
                  <select
                    v-model="formMap[s.id].kelas_sekolah"
                    @change="markDirty(s.id)"
                    class="w-full text-center text-[10px] font-bold p-1 rounded border border-[var(--border-default)] bg-white dark:bg-slate-900 text-[var(--text-primary)] cursor-pointer"
                  >
                    <option value="">-</option>
                    <option v-for="k in kelasSekolahOptions" :key="k" :value="k">{{ k }}</option>
                  </select>
                </td>

                <!-- Kelas qiraati -->
                <td
                  class="p-1 border-b border-[var(--border-subtle)] bg-[var(--bg-card-elevated)]/30 dark:bg-slate-700/20"
                >
                  <select
                    v-model="formMap[s.id].kelas"
                    @change="markDirty(s.id)"
                    class="w-full text-center text-[10px] font-bold p-1 rounded border border-[var(--border-default)] bg-white dark:bg-slate-900 text-[var(--text-primary)] cursor-pointer"
                  >
                    <option value="">-</option>
                    <option v-for="k in kelasOptions(s.lembaga)" :key="k" :value="k">
                      {{ k }}
                    </option>
                  </select>
                </td>

                <!-- Juz (PTPT only) -->
                <td
                  v-if="hasPtpt"
                  class="p-1 border-b border-[var(--border-subtle)] bg-rose-50/30 dark:bg-rose-900/10"
                >
                  <div v-if="lembagaKey(s) === 'ptpt'" class="flex items-center gap-1">
                    <input
                      v-model="formMap[s.id].juz"
                      @input="markDirty(s.id)"
                      type="number"
                      min="1"
                      max="30"
                      inputmode="numeric"
                      placeholder="-"
                      :title="ptptJuzHint(s.kelas)"
                      class="flex-1 min-w-0 text-center font-black text-[11px] p-1 rounded border border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/30 text-rose-900 dark:text-rose-200"
                    />
                  </div>
                  <p
                    v-if="lembagaKey(s) === 'ptpt' && s.kelas"
                    class="text-[9px] text-rose-600 dark:text-rose-400 text-center mt-0.5 leading-none"
                  >
                    {{ ptptJuzHint(s.kelas) }}
                  </p>
                  <span v-else class="text-[10px] text-[var(--text-tertiary)]">-</span>
                </td>

                <!-- Awal bulan -->
                <td class="p-1 border-b border-[var(--border-subtle)]">
                  <input
                    v-model="formMap[s.id].prestasi_awal"
                    @input="markDirty(s.id)"
                    type="text"
                    placeholder="-"
                    class="w-full text-center font-black text-[11px] p-1.5 rounded border border-[var(--border-default)] bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                  />
                </td>

                <!-- Akhir bulan -->
                <td class="p-1 border-b border-[var(--border-subtle)]">
                  <input
                    v-model="formMap[s.id].prestasi_akhir"
                    @input="markDirty(s.id)"
                    type="text"
                    placeholder="-"
                    class="w-full text-center font-black text-[11px] p-1.5 rounded border border-[var(--border-default)] bg-white dark:bg-slate-900 text-[var(--text-primary)]"
                  />
                </td>

                <!-- Total -->
                <td
                  class="p-1 border-b border-[var(--border-subtle)] bg-cyan-50/30 dark:bg-cyan-900/10"
                >
                  <input
                    v-if="isAutoCompute(s)"
                    :value="hitungTotal(s, formMap[s.id])"
                    :class="[
                      'w-full text-center font-black text-[11px] p-1.5 rounded cursor-not-allowed',
                      totalClass(s, formMap[s.id])
                    ]"
                    readonly
                    title="Auto-compute"
                  />
                  <input
                    v-else
                    v-model="formMap[s.id].prestasi_total"
                    @input="markDirty(s.id)"
                    type="text"
                    placeholder="manual"
                    class="w-full text-center font-black text-[11px] p-1.5 rounded border border-cyan-300 dark:border-cyan-700 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-900 dark:text-cyan-200"
                    title="Manual input"
                  />
                </td>

                <!-- Catatan -->
                <td
                  class="p-1 border-b border-[var(--border-subtle)] bg-cyan-50/30 dark:bg-cyan-900/10 text-center"
                >
                  <button
                    @click="openCatatan(s)"
                    :class="[
                      'inline-flex items-center justify-center w-8 h-7 rounded transition cursor-pointer',
                      formMap[s.id]?.catatan
                        ? 'bg-cyan-200 dark:bg-cyan-700 text-[var(--text-on-accent)] dark:text-cyan-100'
                        : 'bg-[var(--bg-muted)] text-[var(--text-tertiary)] hover:bg-cyan-100 hover:text-cyan-700'
                    ]"
                    :title="
                      formMap[s.id]?.catatan
                        ? 'Catatan: ' + formMap[s.id].catatan.slice(0, 50) + '...'
                        : 'Belum ada catatan — klik untuk tulis'
                    "
                  >
                    <i class="fas fa-eye text-[11px]"></i>
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Catatan modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showCatatan"
          class="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3"
          @click.self="showCatatan = false"
        >
          <div
            class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-md w-full border-t-8 border-cyan-500"
          >
            <header
              class="flex justify-between items-center border-b border-[var(--border-subtle)] px-5 py-4"
            >
              <h3 class="text-base font-black text-[var(--text-primary)]">
                <i class="fas fa-comment-dots mr-2 text-cyan-600"></i>Catatan Bulanan
              </h3>
              <button
                @click="showCatatan = false"
                class="text-[var(--text-tertiary)] hover:text-rose-500 text-2xl font-bold w-8 h-8 rounded-full bg-[var(--bg-muted)] flex items-center justify-center cursor-pointer"
              >
                &times;
              </button>
            </header>
            <div class="p-5 space-y-3">
              <div
                class="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-xl border border-cyan-200 dark:border-cyan-700"
              >
                <p
                  class="text-[10px] text-cyan-700 dark:text-cyan-300 font-black uppercase tracking-widest mb-1"
                >
                  Santri
                </p>
                <strong class="text-[var(--text-primary)] text-base font-black">{{
                  catatanTarget?.nama || '-'
                }}</strong>
                <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {{ catatanTarget?.lembaga || '-' }} &middot; {{ NAMA_BULAN[bulan] }} {{ tahun }}
                </p>
              </div>
              <textarea
                v-model="catatanDraft"
                rows="6"
                placeholder="Tulis catatan bulan ini untuk santri (mis: progress, perilaku, hal yg perlu diperhatikan, rekomendasi)..."
                class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-card-elevated)] text-[var(--text-primary)] resize-none"
              ></textarea>
              <p class="text-[10px] text-[var(--text-tertiary)] italic">
                <i class="fas fa-info-circle mr-1"></i>Catatan tampil di Capaian Prestasi santri.
                Akun santri bisa lihat langsung.
              </p>
            </div>
            <footer
              class="px-5 py-4 border-t border-[var(--border-subtle)] bg-[var(--bg-card-elevated)] flex justify-end gap-2 rounded-b-2xl"
            >
              <button
                @click="showCatatan = false"
                class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-[var(--text-primary)]"
              >
                Batal
              </button>
              <button
                @click="simpanCatatan"
                class="px-5 py-2 text-sm font-black rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white shadow-md cursor-pointer"
              >
                <i class="fas fa-save mr-1"></i>Simpan Catatan
              </button>
            </footer>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { writeBatch, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useAuthStore } from '@/stores/auth'
import { useSantri } from '@/composables/useSantri'
import { useLembaga } from '@/composables/useLembaga'
import { sortSantri } from '@/utils/santriSort'
import { useGuru } from '@/composables/useGuru'
import { useToast } from '@/composables/useToast'

const { santriRaw } = useSantri()
const { lembagaRaw } = useLembaga()
const { guruRaw } = useGuru()
const toast = useToast()
const auth = useAuthStore()
const route = useRoute()

const NAMA_BULAN = [
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

// --- Auth scoping ---
const isGuruScoped = computed(() => {
  const sesi = auth.sesiAktif
  return (
    sesi?.role === 'guru' &&
    sesi?.role_sistem !== 'super_admin' &&
    sesi?.role_sistem !== 'admin' &&
    sesi?.role_sistem !== 'admin_keuangan'
  )
})

// --- Filter state ---
const now = new Date()
const bulan = ref(now.getMonth())
const tahun = ref(now.getFullYear())
const filterLembaga = ref('')
const search = ref('')

const tahunOptions = computed(() => {
  const t = now.getFullYear()
  return [t - 1, t, t + 1]
})

const lembagaOptions = computed(() =>
  (lembagaRaw.value || []).map((l) => l.lembaga).filter(Boolean)
)

const kelasSekolahOptions = computed(() => {
  const set = new Set()
  santriRaw.value.forEach((s) => {
    if (s.kelas_sekolah) set.add(s.kelas_sekolah)
  })
  ;['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].forEach((k) => set.add(k))
  return [...set].sort((a, b) => Number(a) - Number(b))
})

function kelasOptions(namaLembaga) {
  const found = (lembagaRaw.value || []).find((l) => l.lembaga === namaLembaga)
  return found && Array.isArray(found.kelas_list) ? found.kelas_list : []
}

function parseAngka(val) {
  const m = String(val || '').match(/\d+/)
  return m ? parseInt(m[0]) : 0
}

// --- Filtered + sorted santri ---
const filteredSantri = computed(() => {
  let list = santriRaw.value.filter((s) => s.aktif !== false)

  // Optional kategori query param (?kategori=qiraati)
  const QIRAATI_LEMBAGA = ['TPQ', 'TPQ PAGI', 'TPQ SORE', 'PRA PTPT', 'PTPT', 'PPPH', 'P3H']
  if (String(route?.query?.kategori || '').toLowerCase() === 'qiraati') {
    list = list.filter((s) =>
      QIRAATI_LEMBAGA.includes(
        String(s.lembaga || '')
          .toUpperCase()
          .trim()
      )
    )
  }

  // Guru scope — show only santri assigned to this guru
  if (isGuruScoped.value) {
    const myId = String(auth.sesiAktif?.id || '').toLowerCase()
    const myNama = String(auth.sesiAktif?.nama || '')
      .toLowerCase()
      .trim()
    list = list.filter((s) => {
      const namaGuru = [s.guru, s.guru_pagi, s.guru_sore]
        .flat()
        .filter(Boolean)
        .map((g) => String(g).toLowerCase().trim())
      const idGuru = [s.guru_id, s.guru_pagi_id, s.guru_sore_id]
        .filter(Boolean)
        .map((g) => String(g).toLowerCase())
      return namaGuru.includes(myNama) || idGuru.includes(myId)
    })
  }

  // Lembaga filter — special handling untuk TPQ shift-variant
  if (filterLembaga.value) {
    const key = String(filterLembaga.value).toUpperCase().trim()
    if (key === 'TPQ PAGI' || key === 'TPQ SORE') {
      const shift = key === 'TPQ PAGI' ? 'pagi' : 'sore'
      list = list.filter((s) => {
        const lem = String(s.lembaga || '')
          .toUpperCase()
          .trim()
        const sh = String(s.shift || '')
          .toLowerCase()
          .trim()
        return (lem === 'TPQ' && sh === shift) || lem === key
      })
    } else {
      list = list.filter((s) => s.lembaga === filterLembaga.value)
    }
  }

  // Search
  if (search.value.trim()) {
    const kw = search.value.trim().toLowerCase()
    list = list.filter((s) =>
      String(s.nama || '')
        .toLowerCase()
        .includes(kw)
    )
  }

  // v.21.86.0527: Sort konsisten lembaga→kelas→nama (natural order via sortSantri)
  return sortSantri(list, { lembagaField: 'lembaga', kelasField: 'kelas' })
})

// --- Group by lembaga + kelas + guru ---
const grouped = computed(() => {
  const groups = []
  let lastLabel = null
  for (const s of filteredSantri.value) {
    const guruLabel = (() => {
      const arr = Array.isArray(s.guru) ? s.guru : s.guru ? [s.guru] : []
      if (arr.length === 0) return 'Tanpa Guru'
      const matched = (guruRaw.value || []).find((g) => g.nama === arr[0])
      return matched ? matched.nama : arr[0]
    })()
    const label = `${s.lembaga || '-'} · ${s.kelas || '-'} · Guru: ${guruLabel}`
    if (label !== lastLabel) {
      groups.push({ label, items: [] })
      lastLabel = label
    }
    groups[groups.length - 1].items.push(s)
  }
  return groups
})

// --- Lembaga helpers ---
function lembagaKey(s) {
  return String(s?.lembaga || '')
    .toLowerCase()
    .trim()
}

function isAutoCompute(s) {
  const k = lembagaKey(s)
  return k === 'ptpt' || k === 'pra ptpt'
}

const hasPtpt = computed(() => filteredSantri.value.some((s) => lembagaKey(s) === 'ptpt'))

// --- Periode key (YYYY_MM) ---
const periodeKey = computed(() => `${tahun.value}_${String(bulan.value + 1).padStart(2, '0')}`)

// --- Pra PTPT khotam counting helper ---
function levelMultiplier(level) {
  const s = String(level || '').toLowerCase()
  let n = 0
  if (s.includes('½') || s.includes('1/2')) {
    if (/[12]/.test(s)) n = parseFloat((s.match(/\d+/) || ['0'])[0]) + 0.5
    else n = 0.5
  } else {
    const m = s.match(/(\d+(?:\.\d+)?)/)
    n = m ? parseFloat(m[1]) : 0
  }
  return n <= 1.5 ? 2 : 3
}

function khotamPraPtpt(s) {
  if (!s?.kartu_kenaikan || typeof s.kartu_kenaikan !== 'object') return 0
  const praKey = Object.keys(s.kartu_kenaikan).find(
    (k) => String(k).toLowerCase().trim() === 'pra ptpt'
  )
  if (!praKey) return 0
  const node = s.kartu_kenaikan[praKey]
  if (!node || typeof node !== 'object') return 0
  const monthPrefix = `${tahun.value}-${String(bulan.value + 1).padStart(2, '0')}-`
  let total = 0
  for (const [, levelData] of Object.entries(node)) {
    if (!levelData || typeof levelData !== 'object') continue
    const mult = levelMultiplier(levelData.levelBaca || '')
    for (const [field, val] of Object.entries(levelData)) {
      if (field === 'entries' || field === 'ceremonial' || field === 'levelBaca') continue
      if (typeof val === 'string' && val.startsWith(monthPrefix)) {
        total += mult
      }
    }
  }
  return total
}

// --- Editable per-santri form state ---
const formMap = reactive({})
const dirtyIds = ref(new Set())
const saving = ref(false)
const dirtyCount = computed(() => dirtyIds.value.size)

watch(
  [filteredSantri, periodeKey],
  ([list, key]) => {
    for (const s of list) {
      const existingCatatan =
        (s.catatan_bulanan && typeof s.catatan_bulanan === 'object' && s.catatan_bulanan[key]) || ''
      const current = formMap[s.id]
      if (!current || current._periodKey !== key) {
        formMap[s.id] = {
          _periodKey: key,
          prestasi_awal: s.prestasi_awal || '',
          prestasi_akhir: s.prestasi_akhir || '',
          prestasi_total: s.prestasi_total || '',
          kelas: s.kelas || '',
          kelas_sekolah: s.kelas_sekolah || '',
          juz: parseAngka(s.juz) || '',
          catatan: existingCatatan
        }
      }
    }
  },
  { immediate: true, deep: false }
)

function markDirty(id) {
  dirtyIds.value.add(id)
  dirtyIds.value = new Set(dirtyIds.value)
}

// --- Total computation ---
function hitungTotal(s, form) {
  if (!form) return '-'
  const k = lembagaKey(s)
  if (k === 'ptpt') {
    const akhir = parseAngka(form.prestasi_akhir)
    const awal = parseAngka(form.prestasi_awal)
    const delta = akhir - awal
    return delta > 0 ? `${delta} Hal` : '-'
  }
  if (k === 'pra ptpt') {
    const total = khotamPraPtpt(s)
    return total > 0 ? `${total} Khotam` : '-'
  }
  return form.prestasi_total || '-'
}

function totalClass(s, form) {
  const fallback = 'text-cyan-800 dark:text-cyan-300 bg-transparent'
  const k = lembagaKey(s)
  if (k === 'ptpt') {
    const n = parseAngka(hitungTotal(s, form))
    if (n >= 100)
      return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
    if (n >= 70)
      return 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-900 dark:text-cyan-200 border border-cyan-300'
    if (n >= 40)
      return 'bg-cyan-100 dark:bg-cyan-900/40 text-[var(--text-on-accent)] dark:text-cyan-200 border border-cyan-300'
    if (n > 0)
      return 'bg-rose-100 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200 border border-rose-300'
  }
  if (k === 'pra ptpt') {
    const n = parseAngka(hitungTotal(s, form))
    if (n >= 6)
      return 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
    if (n >= 3)
      return 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-900 dark:text-cyan-200 border border-cyan-300'
    if (n > 0)
      return 'bg-cyan-100 dark:bg-cyan-900/40 text-[var(--text-on-accent)] dark:text-cyan-200 border border-cyan-300'
  }
  return fallback
}

// --- Catatan modal ---
const showCatatan = ref(false)
const catatanTarget = ref(null)
const catatanDraft = ref('')

function openCatatan(s) {
  catatanTarget.value = s
  catatanDraft.value = formMap[s.id]?.catatan || ''
  showCatatan.value = true
}

function simpanCatatan() {
  const s = catatanTarget.value
  if (s && formMap[s.id]) {
    formMap[s.id].catatan = catatanDraft.value
    markDirty(s.id)
    toast.success('Catatan disimpan (klik Simpan utama untuk apply ke server)')
    showCatatan.value = false
  }
}

// --- Bulk save ---
async function simpanBatch() {
  if (dirtyIds.value.size === 0) return
  saving.value = true
  try {
    const batch = writeBatch(db)
    for (const id of dirtyIds.value) {
      const s = santriRaw.value.find((x) => String(x.id) === String(id))
      if (!s) continue
      const form = formMap[id]
      const k = lembagaKey(s)
      const isPtpt = k === 'ptpt'
      const isPra = k === 'pra ptpt'

      let totalStr = ''
      if (isPtpt) {
        const delta = parseAngka(form.prestasi_akhir) - parseAngka(form.prestasi_awal)
        totalStr = delta > 0 ? `${delta} Hal` : ''
      } else if (isPra) {
        const t = khotamPraPtpt(s)
        totalStr = t > 0 ? `${t} Khotam` : ''
      } else {
        totalStr = form.prestasi_total || ''
      }

      const payload = {
        prestasi_awal: form.prestasi_awal || '',
        prestasi_akhir: form.prestasi_akhir || '',
        prestasi_total: totalStr,
        kelas: form.kelas || '',
        kelas_sekolah: form.kelas_sekolah || ''
      }

      if (isPtpt) {
        const juzNum = parseAngka(form.juz)
        payload.juz = juzNum > 0 ? `JUZ ${juzNum}` : ''
      }

      const catatanMap =
        s.catatan_bulanan && typeof s.catatan_bulanan === 'object' ? { ...s.catatan_bulanan } : {}
      catatanMap[periodeKey.value] = form.catatan || ''
      payload.catatan_bulanan = catatanMap

      batch.update(doc(db, 'santri', String(id)), payload)
    }
    await batch.commit()
    toast.success(`Tersimpan ${dirtyIds.value.size} santri`)
    dirtyIds.value.clear()
    dirtyIds.value = new Set()
  } catch (e) {
    toast.error('Error: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// v.21.71.0526: PTPT range juz hint per kelas (Kelas 1 = Juz 1-5, Kelas 2 = Juz 6-10, ..., Kelas 6 = Juz 26-30)
function ptptJuzHint(kelas) {
  if (!kelas) return ''
  // Extract angka dari "Kelas 1", "Kelas 2", dll
  const m = String(kelas).match(/(\d+)/)
  const k = m ? parseInt(m[1], 10) : 0
  if (k < 1 || k > 6) return ''
  const start = (k - 1) * 5 + 1
  const end = start + 4
  return `Juz ${start}-${end}`
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
                                                                                                                                                                                                                                                                                     