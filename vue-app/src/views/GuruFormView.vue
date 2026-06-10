<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4 page-narrow">
    <!-- Header -->
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm flex items-center justify-between gap-3">
      <div>
        <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
          <i :class="editingId ? 'fas fa-edit text-cyan-500' : 'fas fa-user-plus text-teal-500'" class="mr-2"></i>
          {{ editingId ? `Edit Guru: ${form.nama}` : 'Tambah Guru / Pegawai Baru' }}
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">Form lengkap CRUD guru &amp; pegawai</p>
      </div>
      <router-link to="/guru" class="px-3 py-2 text-sm bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl transition">
        <i class="fas fa-arrow-left mr-1"></i>Kembali
      </router-link>
    </div>

    <div v-if="isLoading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data guru...</p>
    </div>

    <form v-else @submit.prevent="onSubmit" class="space-y-4">
      <!-- Identitas -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-id-card text-teal-500 mr-1"></i>Identitas Guru / Pegawai
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="md:col-span-3">
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Nama Lengkap (dengan gelar) *</label>
            <input v-model="form.nama" type="text" required placeholder="Nama lengkap dengan gelar" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">L / P *</label>
            <select v-model="form.jk" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none">
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- v.21.17.0526: Jabatan & Lembaga (refactor — split qiraati/sekolah, hide untuk admin/kebersihan/keamanan) -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-briefcase text-cyan-500 mr-1"></i>Jabatan &amp; Lembaga
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- v.21.17b.0526: Jabatan dari master/jabatan Firestore (sync dengan Master Data → Jabatan tab) -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Jabatan Utama *</label>
            <select v-model="form.jabatan" required class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none">
              <option v-for="j in jabatanOptionsFiltered" :key="j" :value="j">{{ j }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Jabatan Tambahan</label>
            <select v-model="form.jabatan_tambahan" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none">
              <option value="">-- Tidak ada --</option>
              <option v-for="j in jabatanOptionsFiltered.filter(x => x !== form.jabatan)" :key="j" :value="j">{{ j }}</option>
            </select>
          </div>
          <!-- v.21.18.0526: Tipe Pegawai — Guru / Pegawai / Pegawai+Guru -->
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tipe Pegawai *</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="t in TIPE_PEGAWAI_OPTIONS" :key="t.value" class="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer hover:bg-[var(--bg-muted)] text-sm">
                <input v-model="form.tipe_pegawai" :value="t.value" type="radio" class="accent-cyan-600" />
                {{ t.label }}
              </label>
            </div>
          </div>
          <!-- v.21.24d.0526: Pegawai mode — boleh pilih shift juga (kyai req), tetap tanpa lembaga -->
          <div v-if="form.tipe_pegawai === 'pegawai'" class="md:col-span-2 bg-[var(--bg-card-elevated)] rounded-lg p-3 space-y-2">
            <p class="text-xs text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>Tipe <b>Pegawai</b> tidak perlu pilih lembaga (kerja umum/yayasan).
            </p>
            <div>
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Shift Kerja</label>
              <select v-model="form.shift" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)] focus:ring-2 focus:ring-cyan-500 outline-none">
                <option v-for="s in SHIFT_OPTIONS" :key="`peg-${s.value}`" :value="s.value">{{ s.label }}</option>
              </select>
            </div>
          </div>
          <!-- Guru / Pegawai+Guru mode: lembaga fields (optional, pilih salah satu atau keduanya) -->
          <template v-if="showLembagaQiraati || showLembagaSekolah">
            <div v-if="showLembagaQiraati">
              <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Lembaga Qiraati</label>
              <select v-model="form.lembaga" class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none">
                <option value="">-- Tidak ada --</option>
                <option v-for="l in lembagaPondokOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div v-if="showLembagaSekolah">
              <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Lembaga Sekolah</label>
              <select v-model="form.lembaga_sekolah" class="w-full px-3 py-2 text-sm rounded-xl border-2 border-cyan-400 bg-cyan-50 focus:ring-2 focus:ring-cyan-500 outline-none">
                <option value="">-- Tidak ada --</option>
                <option v-for="l in lembagaSekolahOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div v-if="form.lembaga">
              <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Shift Qiraati</label>
              <select v-model="form.shift" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none">
                <option v-for="s in SHIFT_OPTIONS" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>
            </div>
            <p class="md:col-span-2 text-[10px] text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>Boleh pilih Qiraati saja, Sekolah saja, atau keduanya (kalau ngajar di 2 lembaga).
            </p>
          </template>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tanggal Tugas</label>
            <input v-model="form.tanggal_tugas" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer" />
          </div>
        </div>
      </div>

      <!-- Kontak & ID -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-address-book text-teal-500 mr-1"></i>Kontak &amp; Identifikasi
        </h3>
        <!-- v.21.17.0526: + NIK + reorder field -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIK (16 digit)</label>
            <input v-model="form.nik" type="text" maxlength="16" placeholder="Diisi user nanti" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none font-mono" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">No. WhatsApp *</label>
            <input v-model="form.wa" type="tel" required placeholder="08..." class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIG (Nomor Induk Guru)</label>
            <input v-model="form.no_nig" type="text" placeholder="Opsional" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">No. Rekening BMT</label>
            <input v-model="form.rek_bmt" type="text" inputmode="numeric" placeholder="Untuk pencairan bisyaroh (opsional)" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none font-mono" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">ID Fingerprint</label>
            <input v-model="form.id_fingerprint" type="text" placeholder="Opsional" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none" />
          </div>
        </div>
      </div>

      <!-- Status & Role -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3">
          <i class="fas fa-toggle-on text-emerald-500 mr-1"></i>Status &amp; Akses
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Status</label>
            <select v-model="form.status" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none">
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
          <div v-if="isSuperAdmin">
            <label class="block text-xs font-bold text-teal-700 mb-1 uppercase">Role Sistem (super-admin only)</label>
            <select v-model="form.role_sistem" class="w-full px-3 py-2 text-sm rounded-xl border border-teal-300 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none">
              <option v-for="r in ROLE_SISTEM_OPTIONS" :key="r.value" :value="r.value">{{ r.label }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm sticky bottom-3 flex gap-2">
        <!-- v.21.23.0526: Batal pakai cancelTarget biar konsisten -->
        <router-link :to="cancelTarget" class="flex-1 text-center px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition">
          <i class="fas fa-times mr-1"></i>Batal
        </router-link>
        <button type="submit" :disabled="isSaving" class="flex-1 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition">
          <i class="fas fa-save mr-1"></i>{{ isSaving ? 'Menyimpan...' : (editingId ? 'Update Guru' : 'Simpan Guru') }}
        </button>
      </div>
    </form>

    <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>Vue 3 · v.21.17.0526 — Full CRUD Guru (lembaga split + NIK)
    </p>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  useGuruForm,
  JABATAN_OPTIONS,
  JABATAN_NO_LEMBAGA,
  TIPE_PEGAWAI_OPTIONS,
  SHIFT_OPTIONS,
  ROLE_SISTEM_OPTIONS
} from '@/composables/useGuruForm'

const route = useRoute()
const router = useRouter()

const {
  form,
  isLoading,
  isSaving,
  editingId,
  butuhLembaga,
  lembagaPondokOptions,
  lembagaSekolahOptions,
  jabatanOptionsFiltered,
  isSuperAdmin,
  loadGuru,
  resetForm,
  save
} = useGuruForm()

// v.99: show/butuh lembaga dari JABATAN (master/jabatan tipe_lembaga) — bukan tipe_pegawai
const isJabatanNoLembaga = computed(() => !butuhLembaga.value)
const showLembagaQiraati = computed(() => butuhLembaga.value)
const showLembagaSekolah = computed(() => butuhLembaga.value)

watch(() => form.value.tipe_pegawai, (newTipe) => {
  // Pegawai → clear lembaga (no teaching context)
  if (newTipe === 'pegawai') {
    form.value.lembaga = ''
    form.value.lembaga_sekolah = ''
    form.value.shift = ''
  }
})

onMounted(async () => {
  const id = route.params.id
  if (id && id !== 'new') await loadGuru(id)
  else resetForm()
})

watch(() => route.params.id, async (newId) => {
  if (newId && newId !== 'new') await loadGuru(newId)
  else resetForm()
})

// v.21.23.0526: object form router.push lebih reliable di hash mode + query
const fromMaster = computed(() => route.query.from === 'master')
const cancelTarget = computed(() => fromMaster.value ? { path: '/master-data', query: { tab: 'guru' } } : '/guru')

async function onSubmit() {
  const ok = await save()
  if (ok) {
    if (fromMaster.value) router.push({ path: '/master-data', query: { tab: 'guru' } })
    else router.push('/guru')
  }
}
</script>
