<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm flex items-center justify-between gap-3">
      <div>
        <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
          <i :class="editingId ? 'fas fa-edit text-cyan-500' : 'fas fa-building text-teal-500'" class="mr-2"></i>
          {{ editingId ? `Edit Lembaga: ${form.lembaga}` : 'Tambah Lembaga Baru' }}
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">Master data lembaga + daftar kelas/jilid</p>
      </div>
      <router-link to="/lembaga" class="px-3 py-2 text-sm bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl transition">
        <i class="fas fa-arrow-left mr-1"></i>Kembali
      </router-link>
    </div>

    <div v-if="isLoading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data lembaga...</p>
    </div>

    <form v-else @submit.prevent="onSubmit" class="space-y-4">
      <!-- Identitas lembaga -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-id-card text-teal-500 mr-1"></i>Identitas Lembaga
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Lembaga *</label>
            <input
              v-model="form.lembaga"
              type="text"
              required
              :disabled="!!editingId"
              placeholder="cth: TPQ Pagi, PTPT, SDI, PKBM"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] disabled:opacity-60 focus:ring-2 focus:ring-teal-500 outline-none"
            />
            <p v-if="editingId" class="text-[10px] text-cyan-600 mt-1">
              <i class="fas fa-info-circle mr-1"></i>Nama lembaga tidak bisa diubah saat edit (sebagai ID)
            </p>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tipe Lembaga *</label>
            <select v-model="form.tipe" required class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
              <option v-for="t in TIPE_OPTIONS" :key="t.value" :value="t.value">{{ t.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Daftar Kelas -->
      <div class="bg-teal-50/40 dark:bg-teal-900/20 rounded-2xl p-4 md:p-5 border-2 border-teal-300 dark:border-teal-700 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-black text-teal-800 dark:text-teal-300 uppercase tracking-wide">
            <i class="fas fa-door-open text-teal-600 mr-1"></i>Daftar Kelas / Jilid
            <span class="ml-1 text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">{{ form.kelas.length }}</span>
          </h3>
        </div>

        <!-- Add new kelas -->
        <div class="flex gap-2 mb-3">
          <input
            v-model="newKelasInput"
            @keydown.enter.prevent="onAddKelas"
            type="text"
            placeholder="Ketik nama kelas, lalu Enter (cth: I, II, Jilid 1, Pra A...)"
            class="flex-1 px-3 py-2 text-sm rounded-xl border border-teal-300 bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <button
            type="button"
            @click="onAddKelas"
            class="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl text-sm transition"
          >
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>

        <!-- Kelas list -->
        <div v-if="form.kelas.length === 0" class="text-center text-xs text-[var(--text-tertiary)] italic py-6 bg-[var(--bg-card)]/40 rounded-xl border border-dashed border-teal-300">
          Belum ada kelas. Ketik di atas + Enter untuk menambah.
        </div>
        <div v-else class="space-y-1.5">
          <div
            v-for="(k, idx) in form.kelas"
            :key="idx"
            class="flex items-center gap-2 bg-[var(--bg-card)] border border-teal-200 rounded-lg p-2"
          >
            <span class="text-[10px] bg-teal-100 text-teal-700 font-black px-2 py-0.5 rounded">#{{ idx + 1 }}</span>
            <span class="flex-1 text-sm font-bold text-[var(--text-primary)]">{{ k }}</span>
            <button
              type="button"
              :disabled="idx === 0"
              @click="moveKelas(idx, idx - 1)"
              class="w-7 h-7 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 disabled:opacity-30 text-[var(--text-secondary)] text-xs transition"
              title="Naik"
            >
              <i class="fas fa-chevron-up"></i>
            </button>
            <button
              type="button"
              :disabled="idx === form.kelas.length - 1"
              @click="moveKelas(idx, idx + 1)"
              class="w-7 h-7 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 disabled:opacity-30 text-[var(--text-secondary)] text-xs transition"
              title="Turun"
            >
              <i class="fas fa-chevron-down"></i>
            </button>
            <button
              type="button"
              @click="removeKelas(idx)"
              class="w-7 h-7 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-600 text-xs transition"
              title="Hapus kelas"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- v.21.23.0526: Daftar Jabatan (kyai edit manual per-lembaga) -->
      <div class="bg-teal-50/40 dark:bg-teal-900/20 rounded-2xl p-4 md:p-5 border-2 border-teal-300 dark:border-teal-700 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-black text-teal-800 dark:text-teal-300 uppercase tracking-wide">
            <i class="fas fa-user-tie text-teal-600 mr-1"></i>Daftar Jabatan
            <span class="ml-1 text-[10px] bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded">{{ form.jabatan.length }}</span>
          </h3>
        </div>
        <p class="text-[10px] text-[var(--text-secondary)] mb-2"><i class="fas fa-info-circle mr-1"></i>Jabatan yang tersedia di lembaga ini (contoh: Kepala TPQ, Wali Kelas, PJ Administrasi). Pilih <b>tipe</b> untuk filter di Form Guru.</p>

        <!-- Add new jabatan + tipe -->
        <div class="grid grid-cols-[1fr_140px_auto] gap-2 mb-3">
          <input
            v-model="newJabatanInput"
            @keydown.enter.prevent="onAddJabatan"
            type="text"
            placeholder="Ketik nama jabatan, lalu Enter (cth: Kepala TPQ, Wali Kelas...)"
            class="px-3 py-2 text-sm rounded-xl border border-teal-300 bg-[var(--bg-card)] focus:ring-2 focus:ring-teal-500 outline-none"
          />
          <select v-model="newJabatanTipe" class="px-2 py-2 text-sm rounded-xl border border-teal-300 bg-[var(--bg-card)] cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none">
            <option value="guru">Guru</option>
            <option value="pegawai">Pegawai</option>
            <option value="guru_pegawai">Guru + Pegawai</option>
          </select>
          <button
            type="button"
            @click="onAddJabatan"
            class="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition whitespace-nowrap"
          >
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
        </div>

        <!-- Jabatan list -->
        <div v-if="form.jabatan.length === 0" class="text-center text-xs text-[var(--text-tertiary)] italic py-6 bg-[var(--bg-card)]/40 rounded-xl border border-dashed border-teal-300">
          Belum ada jabatan. Ketik di atas + pilih tipe + Enter/Tambah.
        </div>
        <div v-else class="space-y-1.5">
          <div
            v-for="(j, idx) in form.jabatan"
            :key="`jab-${idx}`"
            class="flex items-center gap-2 bg-[var(--bg-card)] border border-teal-200 rounded-lg p-2"
          >
            <span class="text-[10px] bg-teal-100 text-teal-700 font-black px-2 py-0.5 rounded">#{{ idx + 1 }}</span>
            <span class="flex-1 text-sm font-bold text-[var(--text-primary)]">{{ typeof j === 'string' ? j : j.nama }}</span>
            <select
              :value="(typeof j === 'object' && j.tipe) || 'guru'"
              @change="updateJabatanTipe(idx, $event.target.value)"
              class="text-[11px] font-bold px-2 py-1 rounded-lg border border-teal-200 bg-teal-50 cursor-pointer focus:ring-2 focus:ring-teal-500 outline-none"
              title="Tipe jabatan"
            >
              <option value="guru">Guru</option>
              <option value="pegawai">Pegawai</option>
              <option value="guru_pegawai">Guru+Peg</option>
            </select>
            <button
              type="button"
              :disabled="idx === 0"
              @click="moveJabatan(idx, idx - 1)"
              class="w-7 h-7 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 disabled:opacity-30 text-[var(--text-secondary)] text-xs transition"
              title="Naik"
            >
              <i class="fas fa-chevron-up"></i>
            </button>
            <button
              type="button"
              :disabled="idx === form.jabatan.length - 1"
              @click="moveJabatan(idx, idx + 1)"
              class="w-7 h-7 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 disabled:opacity-30 text-[var(--text-secondary)] text-xs transition"
              title="Turun"
            >
              <i class="fas fa-chevron-down"></i>
            </button>
            <button
              type="button"
              @click="removeJabatan(idx)"
              class="w-7 h-7 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-600 text-xs transition"
              title="Hapus jabatan"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- KOP Section (Formal only) -->
      <div v-if="showKop" class="bg-cyan-50/40 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border-2 border-cyan-300 dark:border-cyan-700 shadow-sm">
        <h3 class="text-xs font-black text-cyan-800 dark:text-cyan-300 uppercase tracking-wide mb-3">
          <i class="fas fa-file-image text-cyan-600 mr-1"></i>KOP Letterhead (Formal)
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Logo KOP URL</label>
            <input
              v-model="form.kop_logo"
              type="text"
              placeholder="https://..."
              class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-cyan-50 focus:ring-2 focus:ring-cyan-500 outline-none"
            />
            <p class="text-[10px] text-[var(--text-secondary)] mt-0.5">
              <i class="fas fa-info-circle mr-1"></i>Upload logo lewat /pengaturan-web atau paste URL Firebase Storage.
            </p>
          </div>
          <div>
            <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Alamat KOP</label>
            <input v-model="form.kop_alamat" type="text" placeholder="cth: Jl. ..." class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-cyan-50 focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">No. Telp</label>
            <input v-model="form.kop_telp" type="text" placeholder="cth: 0331-..." class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-cyan-50 focus:ring-2 focus:ring-cyan-500 outline-none" />
          </div>
        </div>
      </div>

      <!-- Actions sticky -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm sticky bottom-3 flex gap-2">
        <router-link to="/lembaga" class="flex-1 text-center px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition">
          <i class="fas fa-times mr-1"></i>Batal
        </router-link>
        <button
          v-if="editingId"
          type="button"
          @click="onDelete"
          :disabled="isSaving"
          class="px-4 py-3 bg-rose-100 hover:bg-rose-200 disabled:opacity-50 text-rose-700 font-bold rounded-xl text-sm shadow-md transition"
        >
          <i class="fas fa-trash mr-1"></i>Hapus
        </button>
        <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition">
          <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : (editingId ? 'Update Lembaga' : 'Simpan Lembaga') }}
        </button>
      </div>
    </form>

    <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · v.21.23.0526 — CRUD Lembaga + Jabatan per-lembaga
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLembagaForm, TIPE_OPTIONS } from '@/composables/useLembagaForm'

const route = useRoute()
const router = useRouter()

const {
  form,
  isLoading,
  isSaving,
  editingId,
  showKop,
  resetForm,
  loadLembaga,
  addKelas,
  removeKelas,
  moveKelas,
  addJabatan,
  updateJabatanTipe,
  removeJabatan,
  moveJabatan,
  save,
  deleteLembaga
} = useLembagaForm()

const newKelasInput = ref('')
// v.21.23.0526: input + tipe untuk tambah jabatan
const newJabatanInput = ref('')
const newJabatanTipe = ref('guru')

onMounted(async () => {
  const id = route.params.id
  if (id && id !== 'new') await loadLembaga(id)
  else resetForm()
})

watch(
  () => route.params.id,
  async (newId) => {
    if (newId && newId !== 'new') await loadLembaga(newId)
    else resetForm()
  }
)

function onAddKelas() {
  if (addKelas(newKelasInput.value)) {
    newKelasInput.value = ''
  }
}

// v.21.23.0526: handler tambah jabatan dengan tipe
function onAddJabatan() {
  if (addJabatan(newJabatanInput.value, newJabatanTipe.value)) {
    newJabatanInput.value = ''
  }
}

async function onSubmit() {
  const ok = await save()
  if (ok) router.push('/lembaga')
}

async function onDelete() {
  const ok = await deleteLembaga()
  if (ok) router.push('/lembaga')
}
</script>
