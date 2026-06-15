<script setup>
// v.21.85.0527: Kelola Jabatan (ACF + CRUD) — sub-menu Master Data > Lembaga > Jabatan
// Model master/jabatan: { list: [string...] (kompat lama), items: [{nama, tipe_pegawai, tipe_lembaga}] }
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { subscribeDoc } from '@/services/firestore'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const toast = useToast()
const confirmDlg = useConfirm()

const TIPE_PEGAWAI = [
  { value: 'guru_pegawai', label: 'Guru & Pegawai', icon: 'fa-users' },
  { value: 'guru', label: 'Guru saja', icon: 'fa-chalkboard-teacher' },
  { value: 'pegawai', label: 'Pegawai saja', icon: 'fa-user-tie' }
]
const TIPE_LEMBAGA = [
  { value: 'lembaga', label: 'Perlu Lembaga', icon: 'fa-building' },
  { value: 'non-lembaga', label: 'Tanpa Lembaga', icon: 'fa-globe' }
]

// Seed default kalau Firestore kosong
const DEFAULT_ITEMS = [
  { nama: 'Guru', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'Pegawai', tipe_pegawai: 'pegawai', tipe_lembaga: 'lembaga' },
  { nama: 'Kepala TPQ', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'PJ PTPT', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'PJ PPPH', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'Kepala TK', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'Kepala SDI', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'Kepala PKBM', tipe_pegawai: 'guru', tipe_lembaga: 'lembaga' },
  { nama: 'PJ Administrasi', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Bendahara', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Sekretaris', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Admin', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Admin Yayasan', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  // v.21.109.0527: Direktur/Supervisor untuk fitur Data Supervisi (Batch 2)
  { nama: 'Direktur/Supervisor', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Pengasuh', tipe_pegawai: 'guru_pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Keamanan', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' },
  { nama: 'Kebersihan', tipe_pegawai: 'pegawai', tipe_lembaga: 'non-lembaga' }
]

const items = ref([])
let _unsub = null

// Normalisasi: doc lama bisa cuma punya list[strings]; bangun items dari list bila items kosong.
function normalize(data) {
  const rawItems = Array.isArray(data?.items) ? data.items : []
  const rawList = Array.isArray(data?.list) ? data.list : []
  if (rawItems.length > 0) {
    return rawItems
      .filter((it) => it && (it.nama || typeof it === 'string'))
      .map((it) =>
        typeof it === 'string'
          ? { nama: it, tipe_pegawai: 'guru_pegawai', tipe_lembaga: 'lembaga' }
          : {
              nama: String(it.nama || '').trim(),
              tipe_pegawai: it.tipe_pegawai || 'guru_pegawai',
              tipe_lembaga: it.tipe_lembaga || 'lembaga'
            }
      )
  }
  if (rawList.length > 0) {
    // Upgrade dari list strings → items (infer default)
    return rawList
      .filter(Boolean)
      .map((nama) => ({ nama: String(nama).trim(), tipe_pegawai: 'guru_pegawai', tipe_lembaga: 'lembaga' }))
  }
  return null
}

onMounted(() => {
  _unsub = subscribeDoc('master', 'jabatan', (data) => {
    const norm = normalize(data)
    if (norm && norm.length > 0) {
      items.value = norm
    } else {
      // Seed default (idempotent — hanya bila kosong)
      items.value = [...DEFAULT_ITEMS]
      persist(DEFAULT_ITEMS).catch(() => {})
    }
  })
})
onUnmounted(() => {
  if (_unsub) {
    try {
      _unsub()
    } catch (e) {}
  }
})

// Tulis ke Firestore: simpan items + sync list (kompat reader lama yg pakai .list)
async function persist(arr) {
  const list = arr.map((it) => it.nama)
  await setDoc(doc(db, 'master', 'jabatan'), { items: arr, list }, { merge: true })
}

const form = reactive({ nama: '', tipe_pegawai: 'guru_pegawai', tipe_lembaga: 'lembaga', idx: null })
const saving = ref(false)

function resetForm() {
  form.nama = ''
  form.tipe_pegawai = 'guru_pegawai'
  form.tipe_lembaga = 'lembaga'
  form.idx = null
}
function editItem(idx) {
  const it = items.value[idx]
  if (!it) return
  form.nama = it.nama
  form.tipe_pegawai = it.tipe_pegawai || 'guru_pegawai'
  form.tipe_lembaga = it.tipe_lembaga || 'lembaga'
  form.idx = idx
}

async function simpan() {
  const nama = form.nama.trim()
  if (!nama) {
    toast.warning('Nama jabatan wajib diisi')
    return
  }
  // Cek duplikat (kecuali sedang edit dirinya sendiri)
  const dupIdx = items.value.findIndex((it) => it.nama.toLowerCase() === nama.toLowerCase())
  if (dupIdx !== -1 && dupIdx !== form.idx) {
    toast.warning('Jabatan sudah ada')
    return
  }
  saving.value = true
  try {
    const arr = [...items.value]
    const entry = { nama, tipe_pegawai: form.tipe_pegawai, tipe_lembaga: form.tipe_lembaga }
    if (form.idx !== null) arr[form.idx] = entry
    else arr.push(entry)
    await persist(arr)
    toast.success(form.idx !== null ? 'Jabatan diperbarui' : 'Jabatan ditambahkan')
    resetForm()
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function hapus(idx) {
  const it = items.value[idx]
  if (!it) return
  const ok = await confirmDlg({
    title: 'Hapus Jabatan?',
    message: `Hapus jabatan "${it.nama}"? Guru/pegawai yang sudah memakai jabatan ini tidak otomatis berubah.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    const arr = [...items.value]
    arr.splice(idx, 1)
    await persist(arr)
    toast.success('Jabatan dihapus')
    if (form.idx === idx) resetForm()
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

function labelPegawai(v) {
  return TIPE_PEGAWAI.find((t) => t.value === v)?.label || v
}
function labelLembaga(v) {
  return TIPE_LEMBAGA.find((t) => t.value === v)?.label || v
}

const sorted = computed(() =>
  [...items.value].sort((a, b) => String(a.nama || '').localeCompare(String(b.nama || ''), 'id'))
)
</script>

<template>
  <div class="p-3 md:p-5 space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
        <i class="fas fa-id-badge text-teal-500 mr-2"></i>Kelola Jabatan
      </h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">
        Master jabatan untuk dropdown Data Guru/Pegawai. Atur tipe pegawai &amp; apakah jabatan perlu
        lembaga.
      </p>
    </div>

    <!-- Form -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm space-y-3"
    >
      <h3 class="text-sm font-black text-[var(--text-primary)]">
        <i :class="['fas', form.idx !== null ? 'fa-edit' : 'fa-plus-circle', 'text-teal-600 mr-1']"></i>
        {{ form.idx !== null ? 'Edit Jabatan' : 'Tambah Jabatan' }}
      </h3>
      <div>
        <label class="text-[11px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
          >Nama Jabatan</label
        >
        <input
          v-model="form.nama"
          type="text"
          class="w-full px-3 py-2 text-sm border border-[var(--border-default)] rounded-lg bg-[var(--bg-input)] text-[var(--text-primary)]"
          @keyup.enter="simpan"
        />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="text-[11px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
            >Tipe Pegawai</label
          >
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="t in TIPE_PEGAWAI"
              :key="t.value"
              type="button"
              @click="form.tipe_pegawai = t.value"
              :class="[
                'px-2.5 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
                form.tipe_pegawai === t.value
                  ? 'bg-teal-600 text-white border-teal-700'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-teal-50 dark:hover:bg-teal-900/30'
              ]"
            >
              <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
            </button>
          </div>
        </div>
        <div>
          <label class="text-[11px] font-bold text-[var(--text-secondary)] uppercase block mb-1"
            >Tipe Jabatan</label
          >
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="t in TIPE_LEMBAGA"
              :key="t.value"
              type="button"
              @click="form.tipe_lembaga = t.value"
              :class="[
                'px-2.5 py-1.5 text-xs font-bold rounded-lg border transition cursor-pointer',
                form.tipe_lembaga === t.value
                  ? 'bg-cyan-600 text-white border-cyan-700'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-cyan-50 dark:hover:bg-cyan-900/30'
              ]"
            >
              <i :class="['fas', t.icon, 'mr-1']"></i>{{ t.label }}
            </button>
          </div>
        </div>
      </div>
      <div class="flex gap-2 pt-1">
        <button
          type="button"
          @click="simpan"
          :disabled="saving"
          class="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg text-xs disabled:opacity-50"
        >
          <i :class="['fas', saving ? 'fa-spinner fa-spin' : form.idx !== null ? 'fa-save' : 'fa-plus', 'mr-1']"></i>
          {{ form.idx !== null ? 'Update' : 'Tambah' }}
        </button>
        <button
          v-if="form.idx !== null"
          type="button"
          @click="resetForm"
          class="bg-[var(--bg-muted)] hover:bg-slate-300 dark:hover:bg-slate-600 text-[var(--text-secondary)] font-bold px-3 py-2 rounded-lg text-xs"
        >
          Batal
        </button>
      </div>
    </div>

    <!-- List -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
    >
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-black text-[var(--text-primary)]">
          <i class="fas fa-list text-teal-600 mr-1"></i>Daftar Jabatan
        </h3>
        <span class="text-[10px] text-[var(--text-tertiary)] font-bold uppercase"
          >{{ sorted.length }} jabatan</span
        >
      </div>
      <div v-if="sorted.length === 0" class="text-center text-[var(--text-tertiary)] italic text-xs py-6">
        <i class="fas fa-inbox text-3xl text-[var(--border-default)] block mb-2"></i>
        Belum ada jabatan. Tambah via form di atas.
      </div>
      <ul v-else class="space-y-1.5">
        <li
          v-for="(j, idx) in sorted"
          :key="j.nama + idx"
          class="flex items-center gap-2 bg-[var(--bg-muted)] border-l-4 border-teal-500 px-3 py-2 rounded-r-lg"
        >
          <i class="fas fa-id-badge text-teal-600"></i>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-[var(--text-primary)] truncate">{{ j.nama }}</p>
            <div class="flex flex-wrap gap-1 mt-0.5">
              <span
                class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                >{{ labelPegawai(j.tipe_pegawai) }}</span
              >
              <span
                class="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
                >{{ labelLembaga(j.tipe_lembaga) }}</span
              >
            </div>
          </div>
          <button
            type="button"
            @click="editItem(items.indexOf(j))"
            class="text-[10px] text-cyan-600 hover:underline font-bold"
          >
            edit
          </button>
          <button
            type="button"
            @click="hapus(items.indexOf(j))"
            class="text-[10px] text-rose-600 hover:underline font-bold"
          >
            hapus
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
