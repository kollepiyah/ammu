<script setup>
// v.111: Glondongan PTPT — 1 layar, tab per-peran (scope halus di dalam view).
//   - Penugasan   : koordinator kelas asal / PJ PTPT / super_admin tunjuk guru penguji blok 'menunggu'.
//   - Tugas Menilai: guru yang ditugaskan input nilai per juz + catatan (Task #5).
//   - Catatan     : guru kelas + PJ lihat catatan evaluasi (Task #6).
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { subscribeColl } from '@/services/db'
import { useGlondongan } from '@/composables/useGlondongan'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
// Aspek nilai PTPT (sama persis dg tes PJ): Tahfizh, Istimror, Fashohah, Tajwid (0..90).
import { tesAspekFlat, clampNilaiTes, TES_NILAI_MAX } from '@/utils/tesKenaikan'
import { KATEGORI_GLONDONGAN, KATEGORI_LABEL, periodeBulan } from '@/utils/glondongan'
import { useSettingsStore } from '@/stores/settings'

const {
  loaded,
  rowsRaw,
  sesi,
  myNama,
  antrianTugas,
  canAssignAny,
  myKategori,
  koordinatorGlondongan,
  isPjPtpt,
  isSuper,
  tugaskan,
  tugasNilaiSaya,
  simpanNilai,
  saveKoordinator,
  // v.1.1.9: hapus baris (super_admin). Sudah ada di composable sejak v.111 tapi
  //   tak pernah dipasang ke UI — jadi data uji glondongan tak bisa dibersihkan.
  canCrud,
  hapus
} = useGlondongan()
const toast = useToast()
const confirmDlg = useConfirm()

// Hapus 1 baris tes glondongan (koreksi / bersihkan data uji).
// ConfirmDialog merender message pakai v-html → escape nilai dari data, pisah baris dgn <br>.
const _esc = (v) =>
  String(v == null ? '' : v).replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )
const hapusId = ref('')
async function hapusRow(r) {
  if (!canCrud.value || !r) return
  const ok = await confirmDlg({
    title: 'Hapus baris glondongan?',
    message:
      `<b>${_esc(r.nama_cache || 'Santri')}</b> — ${_esc(tipeLabel(r))} · Kelas ${_esc(r.kelas_asal)} · ${_esc(juzLabel(r))}` +
      (r.status === 'selesai'
        ? '<br><br>Baris ini <b>sudah dinilai</b>. Bisyaroh glondongan pengujinya ikut berkurang di slip yang belum digenerate.'
        : '') +
      '<br><br>Tidak bisa di-undo.',
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  hapusId.value = String(r.id)
  try {
    await hapus(r.id)
    toast.success('Baris glondongan dihapus')
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  } finally {
    hapusId.value = ''
  }
}
const settingsStore = useSettingsStore()

// Tab awal: koordinator/PJ/super -> Penugasan; selain itu -> Tugas Menilai.
const tab = ref(canAssignAny.value ? 'penugasan' : 'nilai')

// ── Guru PTPT aktif (kandidat penguji) + santri (map guru kelas utk tab Catatan) ──
const guruRaw = ref([])
const santriRaw = ref([])
let unsubG = null
let unsubS = null
onMounted(() => {
  unsubG = subscribeColl('guru', (docs) => (guruRaw.value = docs || []))
  unsubS = subscribeColl('santri', (docs) => (santriRaw.value = docs || []))
  settingsStore.subscribe() // idempotent — untuk tarif bisyaroh glondongan (tab Rekap)
})
onUnmounted(() => {
  if (unsubG) unsubG()
  if (unsubS) unsubS()
})
const guruPtpt = computed(() =>
  (guruRaw.value || [])
    .filter(
      (g) =>
        String(g.status || 'Aktif')
          .toLowerCase()
          .trim() === 'aktif' &&
        String(g.lembaga || '')
          .trim()
          .toUpperCase() === 'PTPT'
    )
    .sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)

// Konteks peran (ditampilkan di header Penugasan).
const scopeLabel = computed(() => {
  if (isSuper.value) return 'Super Admin — semua kategori'
  if (isPjPtpt.value) return 'PJ PTPT — semua kategori'
  const ks = myKategori.value
  return ks.length
    ? 'Koordinator ' + ks.map((k) => KATEGORI_LABEL[k]).join(' & ')
    : 'Tanpa scope penugasan'
})

// Label kategori ('Ma’had'/'Selain Ma’had') dari baris glondongan (baris.mukim).
function kategoriLabel(row) {
  return KATEGORI_LABEL[row && row.mukim ? 'mahad' : 'nonmahad']
}

// ── Aksi tugaskan ──
const pick = ref({}) // { [rowId]: guruId }
const savingId = ref('')
async function assign(row) {
  const guruId = pick.value[row.id]
  if (!guruId) {
    toast.warning('Pilih guru penguji dulu')
    return
  }
  const g = guruPtpt.value.find((x) => String(x.id) === String(guruId))
  if (!g) {
    toast.warning('Guru tidak ditemukan')
    return
  }
  savingId.value = row.id
  try {
    await tugaskan(row.id, { id: g.id, nama: g.nama })
    toast.success(`Blok ${juzLabel(row)} ditugaskan ke ${g.nama}`)
    delete pick.value[row.id]
  } catch (e) {
    toast.error('Gagal menugaskan: ' + (e.message || e))
  } finally {
    savingId.value = ''
  }
}

function juzLabel(row) {
  return row.juz_dari === row.juz_sampai
    ? `Juz ${row.juz_dari}`
    : `Juz ${row.juz_dari}–${row.juz_sampai}`
}

// ── Tab Tugas Menilai: input nilai per juz + catatan ──
const PTPT_ASPEK = tesAspekFlat({ lembaga: 'PTPT' }) // [{ key, label }]
const NILAI_MAX = TES_NILAI_MAX
const openId = ref('') // baris yang terbuka (accordion)
const drafts = ref({}) // { [rowId]: { nilai: {<juz>:{aspek:val}}, catatan } }
const savingNilaiId = ref('')

function tipeLabel(row) {
  return row.tipe === 'berjalan' ? 'Review juz berjalan' : 'Glondongan'
}

function toggleNilai(row) {
  if (openId.value === row.id) {
    openId.value = ''
    return
  }
  openId.value = row.id
  if (!drafts.value[row.id]) {
    const nilai = {}
    for (const j of row.juz || []) {
      nilai[j] = {}
      for (const a of PTPT_ASPEK) {
        const cur = row.nilai && row.nilai[j] ? row.nilai[j][a.key] : undefined
        nilai[j][a.key] = cur === undefined || cur === null ? '' : cur
      }
    }
    drafts.value[row.id] = { nilai, catatan: row.catatan || '' }
  }
}

async function saveNilai(row) {
  const d = drafts.value[row.id]
  if (!d) return
  const nilai = {}
  for (const j of row.juz || []) {
    const per = {}
    for (const a of PTPT_ASPEK) {
      const v = clampNilaiTes(d.nilai?.[j]?.[a.key])
      if (v !== null) per[a.key] = v
    }
    if (Object.keys(per).length) nilai[j] = per
  }
  savingNilaiId.value = row.id
  try {
    await simpanNilai(row.id, nilai, d.catatan)
    toast.success('Nilai tersimpan — blok selesai')
    openId.value = ''
  } catch (e) {
    toast.error('Gagal simpan nilai: ' + (e.message || e))
  } finally {
    savingNilaiId.value = ''
  }
}

// ── Tab Catatan: evaluasi per santri (guru kelas: santri ampuannya; PJ/super: semua) ──
const canSeeAllCatatan = computed(() => isPjPtpt.value || isSuper.value)
const catatanSearch = ref('')

// santri.id yang guru kelasnya = saya (match nama guru_pagi/sore/guru).
const mySantriIds = computed(() => {
  const me = myNama.value.toLowerCase()
  const ids = new Set()
  if (!me) return ids
  for (const s of santriRaw.value || []) {
    const guru = [s.guru_pagi, s.guru_sore, s.guru].map((x) =>
      String(x || '')
        .toLowerCase()
        .trim()
    )
    if (guru.includes(me)) ids.add(String(s.id))
  }
  return ids
})

const catatanGroups = computed(() => {
  let rows = rowsRaw.value || []
  if (!canSeeAllCatatan.value) rows = rows.filter((r) => mySantriIds.value.has(String(r.santri_id)))
  const map = {}
  for (const r of rows) {
    const sid = String(r.santri_id)
    if (!map[sid]) map[sid] = { santri_id: sid, nama: r.nama_cache || '—', rows: [] }
    map[sid].rows.push(r)
  }
  let groups = Object.values(map).map((g) => ({
    ...g,
    rows: g.rows.slice().sort((a, b) => (a.kelas_asal || 0) - (b.kelas_asal || 0))
  }))
  const kw = catatanSearch.value.trim().toLowerCase()
  if (kw) groups = groups.filter((g) => g.nama.toLowerCase().includes(kw))
  return groups.sort((a, b) => String(a.nama).localeCompare(String(b.nama), 'id'))
})

const STATUS_BADGE = {
  menunggu: {
    label: 'Menunggu penugasan',
    cls: 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
  },
  ditugaskan: {
    label: 'Belum dinilai',
    cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'
  },
  selesai: {
    label: 'Selesai',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
  }
}
function statusBadge(s) {
  return STATUS_BADGE[s] || STATUS_BADGE.menunggu
}
function nilaiJuzText(nilaiJuz) {
  if (!nilaiJuz) return ''
  return PTPT_ASPEK.map((a) => `${a.label} ${nilaiJuz[a.key] ?? '–'}`).join(' · ')
}

// ── Tab Koordinator (super_admin): set guru koordinator per KATEGORI (multi-guru) ──
const KATEGORI_LIST = KATEGORI_GLONDONGAN // ['mahad','nonmahad']
const koorDraft = ref({ mahad: [], nonmahad: [] }) // { mahad:[guruId], nonmahad:[guruId] }
const savingKoor = ref(false)
// Sinkronkan draft tiap map dari master/lembaga berubah (mis. realtime / muat awal).
watch(
  koordinatorGlondongan,
  (m) => {
    koorDraft.value = {
      mahad: [...((m && m.mahad) || [])],
      nonmahad: [...((m && m.nonmahad) || [])]
    }
  },
  { immediate: true, deep: true }
)
function isKoorChecked(kategori, guruId) {
  return (koorDraft.value[kategori] || []).includes(String(guruId))
}
// Toggle 1 guru pada kategori tertentu (multi-guru per kategori).
function toggleKoor(kategori, guruId) {
  const id = String(guruId)
  const cur = koorDraft.value[kategori] || []
  koorDraft.value[kategori] = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
}
async function saveKoor() {
  savingKoor.value = true
  try {
    await saveKoordinator(koorDraft.value)
    toast.success('Koordinator glondongan tersimpan')
  } catch (e) {
    toast.error('Gagal simpan koordinator: ' + (e.message || e))
  } finally {
    savingKoor.value = false
  }
}

// ── Tab Rekap Bisyaroh (admin_keuangan / super_admin): Σ juz selesai × tarif per guru/bulan ──
const canRekap = computed(
  () => isSuper.value || String(sesi.value?.role_sistem || '') === 'admin_keuangan'
)
const tarifPerJuz = computed(() => Number(settingsStore.settings?.keu_glondongan_per_juz) || 0)
const rekapBulan = ref(periodeBulan()) // 'YYYY-MM'

function fmtRp(n) {
  return 'Rp ' + (Number(n) || 0).toLocaleString('id-ID')
}

// Rekap per penguji untuk bulan terpilih (berdasar tgl_nilai baris 'selesai').
const rekapRows = computed(() => {
  const per = {}
  for (const r of rowsRaw.value || []) {
    if (r.status !== 'selesai') continue
    const bln = r.tgl_nilai ? periodeBulan(new Date(r.tgl_nilai)) : ''
    if (bln !== rekapBulan.value) continue
    const key = String(r.penguji_id || r.penguji_nama || r.penilai_nama || '—')
    const nama = r.penguji_nama || r.penilai_nama || '—'
    const juzCount = Array.isArray(r.juz) ? r.juz.length : 0
    if (!per[key]) per[key] = { key, nama, juz: 0, blok: 0 }
    per[key].juz += juzCount
    per[key].blok += 1
  }
  return Object.values(per)
    .map((g) => ({ ...g, total: g.juz * tarifPerJuz.value }))
    .sort((a, b) => b.total - a.total || String(a.nama).localeCompare(String(b.nama), 'id'))
})
const rekapTotal = computed(() => rekapRows.value.reduce((s, g) => s + g.total, 0))
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-people-arrows text-teal-500 mr-2"></i>Glondongan PTPT
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Muroja'ah kumulatif sebelum tes kenaikan juz. Nilai di sini
        <b>tidak masuk rapor</b> — catatan evaluasi saja.
      </p>
    </div>

    <!-- Tab bar -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-if="canAssignAny"
        type="button"
        @click="tab = 'penugasan'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'penugasan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-user-plus mr-1"></i>Penugasan
        <span
          v-if="antrianTugas.length"
          class="ml-1 px-1.5 rounded-full bg-amber-500 text-white text-[10px]"
          >{{ antrianTugas.length }}</span
        >
      </button>
      <button
        type="button"
        @click="tab = 'nilai'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'nilai'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-pen-to-square mr-1"></i>Tugas Menilai
      </button>
      <button
        type="button"
        @click="tab = 'catatan'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'catatan'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-clipboard-list mr-1"></i>Catatan
      </button>
      <button
        v-if="isSuper"
        type="button"
        @click="tab = 'koordinator'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'koordinator'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-user-gear mr-1"></i>Koordinator
      </button>
      <button
        v-if="canRekap"
        type="button"
        @click="tab = 'rekap'"
        :class="[
          'px-3 py-2 text-xs font-bold rounded-lg border transition',
          tab === 'rekap'
            ? 'bg-teal-600 text-white border-teal-600'
            : 'bg-[var(--bg-muted)] text-[var(--text-secondary)] border-[var(--border-default)]'
        ]"
      >
        <i class="fas fa-money-bill-wave mr-1"></i>Rekap Bisyaroh
      </button>
    </div>

    <!-- ── TAB: PENUGASAN ── -->
    <div
      v-if="tab === 'penugasan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-list-check text-teal-600 mr-1"></i>Antrian Penugasan
        </h3>
        <span class="text-[11px] font-bold text-teal-700 dark:text-teal-300">{{ scopeLabel }}</span>
      </div>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="!canAssignAny"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-lock text-2xl block mb-2 text-[var(--border-default)]"></i>
        Anda bukan koordinator kelas / PJ PTPT.
      </div>
      <div
        v-else-if="antrianTugas.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Tidak ada blok yang menunggu penugasan.
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="row in antrianTugas"
          :key="row.id"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <div class="flex items-start justify-between gap-2 flex-wrap">
            <div class="min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] flex items-center gap-1.5">
                <span class="truncate">{{ row.nama_cache || '—' }}</span>
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold shrink-0',
                    row.mukim
                      ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  ]"
                  >{{ kategoriLabel(row) }}</span
                >
              </p>
              <p class="text-[11px] text-[var(--text-secondary)]">
                Blok <b class="text-teal-700 dark:text-teal-300">Kelas {{ row.kelas_asal }}</b> ·
                {{ juzLabel(row) }}
                <span class="text-[var(--text-tertiary)]">· utk tes Juz {{ row.juz_target }}</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2 mt-2">
            <select
              v-model="pick[row.id]"
              class="flex-1 min-w-0 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)] cursor-pointer"
            >
              <option value="">— pilih guru penguji —</option>
              <option v-for="g in guruPtpt" :key="g.id" :value="g.id">{{ g.nama }}</option>
            </select>
            <button
              type="button"
              @click="assign(row)"
              :disabled="savingId === row.id || !pick[row.id]"
              class="px-3 py-2 text-xs font-bold rounded-lg bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 whitespace-nowrap"
            >
              <i :class="['fas mr-1', savingId === row.id ? 'fa-spinner fa-spin' : 'fa-check']"></i
              >Tugaskan
            </button>
            <!-- v.1.1.9: hapus blok yang salah terbentuk (super_admin) -->
            <button
              v-if="canCrud"
              type="button"
              @click="hapusRow(row)"
              :disabled="hapusId === String(row.id)"
              title="Hapus blok ini (super admin)"
              aria-label="Hapus blok glondongan"
              class="shrink-0 px-2.5 py-2 text-xs font-bold rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 disabled:opacity-40"
            >
              <i
                :class="['fas', hapusId === String(row.id) ? 'fa-spinner fa-spin' : 'fa-trash']"
              ></i>
            </button>
          </div>
        </li>
      </ul>
      <p
        v-if="guruPtpt.length === 0 && canAssignAny"
        class="text-[10px] text-amber-600 dark:text-amber-400 mt-3"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT aktif untuk dipilih.
      </p>
    </div>

    <!-- ── TAB: TUGAS MENILAI ── -->
    <div
      v-else-if="tab === 'nilai'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-3">
        <i class="fas fa-pen-to-square text-teal-600 mr-1"></i>Tugas Menilai Saya
      </h3>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="tugasNilaiSaya.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-clipboard-check text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada tugas menilai untuk Anda.
      </div>

      <ul v-else class="space-y-2">
        <li
          v-for="row in tugasNilaiSaya"
          :key="row.id"
          class="rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)] overflow-hidden"
        >
          <button
            type="button"
            @click="toggleNilai(row)"
            class="w-full flex items-center justify-between gap-2 p-3 text-left"
          >
            <div class="min-w-0">
              <p class="text-sm font-bold text-[var(--text-primary)] truncate">
                {{ row.nama_cache || '—' }}
              </p>
              <p class="text-[11px] text-[var(--text-secondary)] mt-0.5">
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold mr-1',
                    row.tipe === 'berjalan'
                      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300'
                      : 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300'
                  ]"
                  >{{ tipeLabel(row) }}</span
                >
                Kelas {{ row.kelas_asal }} · {{ juzLabel(row) }}
                <span class="text-[var(--text-tertiary)]">· tes Juz {{ row.juz_target }}</span>
              </p>
            </div>
            <i
              :class="[
                'fas text-[var(--text-tertiary)]',
                openId === row.id ? 'fa-chevron-up' : 'fa-chevron-down'
              ]"
            ></i>
          </button>

          <div v-if="openId === row.id && drafts[row.id]" class="px-3 pb-3">
            <div class="overflow-x-auto -mx-1 px-1">
              <table class="w-full text-xs border-collapse">
                <thead>
                  <tr class="text-[var(--text-secondary)]">
                    <th class="text-left font-bold py-1 pr-2">Juz</th>
                    <th
                      v-for="a in PTPT_ASPEK"
                      :key="a.key"
                      class="font-bold py-1 px-1 text-center"
                    >
                      {{ a.label }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="j in row.juz" :key="j" class="border-t border-[var(--border-subtle)]">
                    <td class="py-1 pr-2 font-bold text-[var(--text-primary)] whitespace-nowrap">
                      Juz {{ j }}
                    </td>
                    <td v-for="a in PTPT_ASPEK" :key="a.key" class="py-1 px-1 text-center">
                      <input
                        v-model.number="drafts[row.id].nilai[j][a.key]"
                        type="number"
                        min="0"
                        :max="NILAI_MAX"
                        class="w-14 px-1.5 py-1 text-center rounded-md border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-1">
              Skala 0–{{ NILAI_MAX }} per aspek. Kosongkan bila belum dinilai.
            </p>

            <textarea
              v-model="drafts[row.id].catatan"
              rows="2"
              placeholder="Catatan evaluasi (opsional)…"
              class="w-full mt-2 px-2.5 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
            ></textarea>

            <button
              type="button"
              @click="saveNilai(row)"
              :disabled="savingNilaiId === row.id"
              class="w-full mt-2 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <i :class="['fas', savingNilaiId === row.id ? 'fa-spinner fa-spin' : 'fa-check']"></i>
              {{ savingNilaiId === row.id ? 'Menyimpan…' : 'Simpan & Selesai' }}
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- ── TAB: CATATAN ── -->
    <div
      v-else-if="tab === 'catatan'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-clipboard-list text-teal-600 mr-1"></i>Catatan Evaluasi
        </h3>
        <span class="text-[11px] text-[var(--text-secondary)]">{{
          canSeeAllCatatan ? 'Semua santri PTPT' : 'Santri ampuan Anda'
        }}</span>
      </div>

      <input
        v-if="catatanGroups.length || catatanSearch"
        v-model="catatanSearch"
        type="search"
        placeholder="Cari nama santri…"
        class="w-full mb-3 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
      />

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="catatanGroups.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada catatan glondongan.
      </div>

      <ul v-else class="space-y-3">
        <li
          v-for="g in catatanGroups"
          :key="g.santri_id"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <p class="text-sm font-bold text-[var(--text-primary)] mb-2">{{ g.nama }}</p>
          <div class="space-y-2">
            <div
              v-for="r in g.rows"
              :key="r.id"
              class="text-[11px] border-l-2 pl-2 border-[var(--border-default)]"
            >
              <p class="flex items-center gap-1 flex-wrap">
                <span class="font-bold text-[var(--text-primary)]"
                  >{{ tipeLabel(r) }} · Kelas {{ r.kelas_asal }} · {{ juzLabel(r) }}</span
                >
                <span
                  :class="[
                    'px-1.5 py-0.5 rounded text-[10px] font-bold',
                    statusBadge(r.status).cls
                  ]"
                  >{{ statusBadge(r.status).label }}</span
                >
                <!-- v.1.1.9: hapus baris (super_admin) — koreksi / bersihkan data uji -->
                <button
                  v-if="canCrud"
                  type="button"
                  @click="hapusRow(r)"
                  :disabled="hapusId === String(r.id)"
                  title="Hapus baris ini (super admin)"
                  aria-label="Hapus baris glondongan"
                  class="ml-auto shrink-0 w-6 h-6 rounded-lg border border-[var(--border-default)] text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 flex items-center justify-center disabled:opacity-40"
                >
                  <i
                    :class="[
                      'fas text-[10px]',
                      hapusId === String(r.id) ? 'fa-spinner fa-spin' : 'fa-trash'
                    ]"
                  ></i>
                </button>
              </p>
              <div v-if="r.status === 'selesai'" class="mt-1 space-y-0.5">
                <p v-for="j in r.juz" :key="j" class="text-[var(--text-tertiary)]">
                  <span class="font-bold text-[var(--text-secondary)]">Juz {{ j }}:</span>
                  {{ nilaiJuzText(r.nilai && r.nilai[j]) || '—' }}
                </p>
              </div>
              <p v-if="r.catatan" class="mt-1 text-[var(--text-primary)] italic">
                <i class="fas fa-quote-left text-[9px] mr-1 text-[var(--text-tertiary)]"></i
                >{{ r.catatan }}
              </p>
              <p v-if="r.penilai_nama" class="mt-0.5 text-[10px] text-[var(--text-tertiary)]">
                oleh {{ r.penilai_nama }}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- ── TAB: KOORDINATOR (super_admin) ── -->
    <div
      v-else-if="tab === 'koordinator' && isSuper"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)] mb-1">
        <i class="fas fa-user-gear text-teal-600 mr-1"></i>Koordinator Glondongan PTPT
      </h3>
      <p class="text-xs text-[var(--text-secondary)] mb-3">
        Guru yang berhak menugaskan penguji glondongan, dibagi per kategori santri. Tiap kategori
        boleh diisi lebih dari satu guru.
      </p>

      <div
        v-if="guruPtpt.length === 0"
        class="text-xs italic text-amber-600 dark:text-amber-400 py-4 text-center"
      >
        <i class="fas fa-triangle-exclamation mr-1"></i>Belum ada guru PTPT aktif untuk dipilih.
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="k in KATEGORI_LIST"
          :key="k"
          class="p-3 rounded-xl border border-[var(--border-default)] bg-[var(--bg-muted)]"
        >
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="text-sm font-bold text-teal-700 dark:text-teal-300">
              <i
                :class="[
                  'fas mr-1',
                  k === 'mahad' ? 'fa-house-chimney' : 'fa-person-walking-arrow-right'
                ]"
              ></i>
              {{ KATEGORI_LABEL[k] }}
            </span>
            <span class="text-[10px] text-[var(--text-tertiary)]"
              >{{ (koorDraft[k] || []).length }} guru</span
            >
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            <label
              v-for="g in guruPtpt"
              :key="g.id"
              class="flex items-center gap-2 px-2.5 py-2 rounded-lg border cursor-pointer text-sm transition"
              :class="
                isKoorChecked(k, g.id)
                  ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 font-bold'
                  : 'border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]'
              "
            >
              <input
                type="checkbox"
                class="accent-teal-600"
                :checked="isKoorChecked(k, g.id)"
                @change="toggleKoor(k, g.id)"
              />
              <span class="truncate">{{ g.nama }}</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          @click="saveKoor"
          :disabled="savingKoor"
          class="w-full mt-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <i :class="['fas', savingKoor ? 'fa-spinner fa-spin' : 'fa-floppy-disk']"></i>
          {{ savingKoor ? 'Menyimpan…' : 'Simpan Koordinator' }}
        </button>
        <p class="text-[10px] text-[var(--text-tertiary)] italic">
          Kategori diambil dari data <b>Mukim/Ma'had</b> santri. Santri yang belum diset mukim
          dihitung <b>Selain Ma'had</b>.
        </p>
      </div>
    </div>

    <!-- ── TAB: REKAP BISYAROH (admin_keuangan / super_admin) ── -->
    <div
      v-else-if="tab === 'rekap' && canRekap"
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-money-bill-wave text-teal-600 mr-1"></i>Rekap Bisyaroh Glondongan
        </h3>
        <input
          v-model="rekapBulan"
          type="month"
          class="px-2.5 py-1.5 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] text-[var(--text-primary)]"
        />
      </div>

      <p v-if="tarifPerJuz === 0" class="text-[11px] text-amber-600 dark:text-amber-400 mb-2">
        <i class="fas fa-triangle-exclamation mr-1"></i>Tarif per juz belum diatur — set di
        Pengaturan Keuangan → Bisyaroh.
      </p>
      <p v-else class="text-[11px] text-[var(--text-secondary)] mb-2">
        Tarif: <b>{{ fmtRp(tarifPerJuz) }}</b> / juz disimak.
      </p>

      <div v-if="!loaded" class="text-xs italic text-[var(--text-tertiary)] py-6 text-center">
        <i class="fas fa-spinner fa-spin mr-1"></i>Memuat…
      </div>
      <div
        v-else-if="rekapRows.length === 0"
        class="text-xs italic text-[var(--text-tertiary)] py-6 text-center"
      >
        <i class="fas fa-inbox text-2xl block mb-2 text-[var(--border-default)]"></i>
        Belum ada penilaian selesai pada bulan ini.
      </div>

      <div v-else class="overflow-x-auto -mx-1 px-1">
        <table class="w-full text-xs border-collapse">
          <thead>
            <tr class="text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
              <th class="text-left font-bold py-1.5 pr-2">Guru Penguji</th>
              <th class="text-center font-bold py-1.5 px-2">Blok</th>
              <th class="text-center font-bold py-1.5 px-2">Juz</th>
              <th class="text-right font-bold py-1.5 pl-2">Bisyaroh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="g in rekapRows" :key="g.key" class="border-b border-[var(--border-subtle)]">
              <td class="py-1.5 pr-2 font-bold text-[var(--text-primary)]">{{ g.nama }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.blok }}</td>
              <td class="py-1.5 px-2 text-center text-[var(--text-secondary)]">{{ g.juz }}</td>
              <td class="py-1.5 pl-2 text-right font-bold text-teal-700 dark:text-teal-300">
                {{ fmtRp(g.total) }}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="border-t-2 border-[var(--border-default)]">
              <td class="py-1.5 pr-2 font-black text-[var(--text-primary)]" colspan="3">Total</td>
              <td class="py-1.5 pl-2 text-right font-black text-[var(--text-primary)]">
                {{ fmtRp(rekapTotal) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
