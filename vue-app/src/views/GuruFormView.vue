<template>
  <div class="p-3 md:p-5 max-w-4xl mx-auto space-y-4 page-narrow">
    <!-- Header -->
    <div
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm flex items-center justify-between gap-3"
    >
      <div>
        <h1 class="text-lg md:text-xl font-black text-[var(--text-primary)]">
          <i
            :class="editingId ? 'fas fa-edit text-cyan-500' : 'fas fa-user-plus text-teal-500'"
            class="mr-2"
          ></i>
          {{ editingId ? `Edit Guru: ${form.nama}` : 'Tambah Guru / Pegawai Baru' }}
        </h1>
        <p class="text-xs text-[var(--text-secondary)] mt-0.5">
          Form lengkap CRUD guru &amp; pegawai
        </p>
      </div>
      <router-link
        to="/guru"
        class="px-3 py-2 text-sm bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl transition"
      >
        <i class="fas fa-arrow-left mr-1"></i>Kembali
      </router-link>
    </div>

    <div v-if="isLoading" class="bg-[var(--bg-card)] rounded-2xl p-10 text-center">
      <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
      <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data guru...</p>
    </div>

    <form v-else class="space-y-4" @submit.prevent="onSubmit">
      <!-- Identitas -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3"
        >
          <i class="fas fa-id-card text-teal-500 mr-1"></i>Identitas Guru / Pegawai
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div class="md:col-span-3">
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Nama Lengkap (dengan gelar) *</label
            >
            <input
              v-model="form.nama"
              type="text"
              required
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >L / P *</label
            >
            <select
              v-model="form.jk"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
        </div>
      </div>

      <!-- v.21.17.0526: Jabatan & Lembaga (refactor — split qiraati/sekolah, hide untuk admin/kebersihan/keamanan) -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3"
        >
          <i class="fas fa-briefcase text-cyan-500 mr-1"></i>Jabatan &amp; Lembaga
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <!-- v.21.17b.0526: Jabatan dari master/jabatan Firestore (sync dengan Master Data → Jabatan tab) -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Jabatan Utama *</label
            >
            <select
              v-model="form.jabatan"
              required
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none"
            >
              <option v-for="j in jabatanOptionsFiltered" :key="j" :value="j">{{ j }}</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Jabatan Tambahan</label
            >
            <!-- Kyai 7 Agu 2026: "ada yg punya 3 jabatan" — dulu satu dropdown, jadi
                 maksimal 2 jabatan. Klik untuk memilih beberapa; disimpan dipisah koma di
                 kolom yang sama supaya data lama tetap terbaca apa adanya. -->
            <div
              class="flex flex-wrap gap-1.5 p-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] max-h-40 overflow-y-auto"
            >
              <button
                v-for="j in jabatanOptionsFiltered.filter((x) => x !== form.jabatan)"
                :key="'jt-' + j"
                type="button"
                :class="[
                  'text-[11px] font-bold px-2.5 py-1 rounded-full border transition',
                  jabatanTambahanList.includes(j)
                    ? 'bg-cyan-600 text-white border-cyan-600'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                ]"
                @click="toggleJabatanTambahan(j)"
              >
                {{ j }}
              </button>
              <span
                v-if="jabatanOptionsFiltered.filter((x) => x !== form.jabatan).length === 0"
                class="text-[11px] italic text-[var(--text-tertiary)]"
                >Tak ada pilihan lain.</span
              >
            </div>
            <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
              Boleh lebih dari satu — tiap jabatan membawa unit/lembaganya sendiri.
              {{ jabatanTambahanList.length ? jabatanTambahanList.length + ' dipilih.' : '' }}
            </p>
          </div>
          <!-- v.21.18.0526: Tipe Pegawai — Guru / Pegawai / Pegawai+Guru -->
          <div class="md:col-span-2">
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Tipe Pegawai *</label
            >
            <div class="flex flex-wrap gap-2">
              <label
                v-for="t in TIPE_PEGAWAI_OPTIONS"
                :key="t.value"
                class="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] cursor-pointer hover:bg-[var(--bg-muted)] text-sm"
              >
                <input
                  v-model="form.tipe_pegawai"
                  :value="t.value"
                  type="radio"
                  class="accent-cyan-600"
                />
                {{ t.label }}
              </label>
            </div>
          </div>
          <div
            v-if="form.tipe_pegawai === 'pegawai'"
            class="md:col-span-2 bg-[var(--bg-card-elevated)] rounded-lg p-3"
          >
            <p class="text-xs text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>Tipe <b>Pegawai</b> tidak perlu pilih lembaga
              (kerja umum/yayasan).
            </p>
          </div>
          <!-- v.1.1.9: Jabatan terikat unit (master/jabatan units[]) → Unit Tugas menggantikan
               dua dropdown lembaga. 1 unit = terisi otomatis; >1 = Kyai pilih. Jabatan global
               (mis. "Guru", units kosong) tetap pakai dropdown Qiraati/Sekolah di bawah. -->
          <div v-if="jabatanPunyaUnit" class="md:col-span-2">
            <label class="block text-xs font-bold text-indigo-600 mb-1 uppercase"
              >Unit / Lembaga Tugas</label
            >
            <div
              v-if="unitsJabatan.length === 1"
              class="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200 font-bold"
            >
              <i class="fas fa-building"></i>{{ unitsJabatan[0] }}
              <span class="ml-auto text-[10px] font-normal opacity-70">otomatis dari jabatan</span>
            </div>
            <select
              v-else
              v-model="unitTerpilih"
              class="w-full px-3 py-2 text-sm rounded-xl border-2 border-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">-- Pilih unit --</option>
              <option v-for="u in unitsJabatan" :key="u" :value="u">{{ u }}</option>
            </select>
            <p class="text-[10px] text-[var(--text-secondary)] italic mt-1">
              <i class="fas fa-info-circle mr-1"></i>Ditentukan jabatan <b>{{ form.jabatan }}</b> di
              Master Data &rsaquo; Jabatan.
            </p>
          </div>

          <!-- Guru / Pegawai+Guru mode: lembaga fields (optional, pilih salah satu atau keduanya) -->
          <template v-else-if="showLembagaQiraati || showLembagaSekolah">
            <div v-if="showLembagaQiraati">
              <label class="block text-xs font-bold text-teal-700 mb-1 uppercase"
                >Lembaga Qiraati</label
              >
              <select
                v-model="form.lembaga"
                class="w-full px-3 py-2 text-sm rounded-xl border-2 border-teal-400 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none"
              >
                <option value="">-- Tidak ada --</option>
                <option v-for="l in lembagaPondokOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <div v-if="showLembagaSekolah">
              <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase"
                >Lembaga Sekolah</label
              >
              <select
                v-model="form.lembaga_sekolah"
                class="w-full px-3 py-2 text-sm rounded-xl border-2 border-cyan-400 bg-cyan-50 focus:ring-2 focus:ring-cyan-500 outline-none"
              >
                <option value="">-- Tidak ada --</option>
                <option v-for="l in lembagaSekolahOptions" :key="l" :value="l">{{ l }}</option>
              </select>
            </div>
            <p class="md:col-span-2 text-[10px] text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>Boleh pilih Qiraati saja, Sekolah saja, atau
              keduanya (kalau ngajar di 2 lembaga).
            </p>
          </template>

          <!-- v.1.1.9: Shift Tugas — satu daftar centang dari Master Shift, menggantikan
               3 dropdown lama (Shift Kerja / Shift Qiraati / Shift Kerja Pegawai) yang
               semuanya menulis ke field `shift` & `shift_pegawai` yang artinya berganti
               tergantung tipe pegawai. Kini eksplisit: centang = shift yang dia jalani. -->
          <div class="md:col-span-2 bg-[var(--bg-card-elevated)] rounded-lg p-3 space-y-2">
            <div class="flex items-center justify-between gap-2 flex-wrap">
              <label class="block text-xs font-bold text-indigo-600 uppercase">Shift Tugas</label>
              <RouterLink
                to="/pengaturan-web?section=shift"
                class="text-[10px] font-bold text-teal-600 hover:underline"
              >
                <i class="fas fa-cog mr-1"></i>Kelola daftar shift
              </RouterLink>
            </div>
            <div
              v-if="shiftOptions.length === 0"
              class="text-xs text-[var(--text-tertiary)] italic"
            >
              Belum ada shift untuk tipe ini. Tambahkan di Pengaturan &rsaquo; Master Shift.
            </div>
            <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-1.5">
              <label
                v-for="s in shiftOptions"
                :key="s.id"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition text-xs',
                  (form.shift_ids || []).includes(s.id)
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-400 text-indigo-800 dark:text-indigo-200 font-bold'
                    : 'border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-card)]'
                ]"
              >
                <input
                  type="checkbox"
                  :checked="(form.shift_ids || []).includes(s.id)"
                  class="w-4 h-4 accent-indigo-600"
                  @change="toggleShift(s.id)"
                />
                <span class="min-w-0">
                  {{ s.label }}
                  <span class="block text-[9px] font-normal opacity-70">
                    {{ s.untuk === 'pegawai' ? 'kerja' : 'mengajar' }}
                  </span>
                </span>
              </label>
            </div>
            <p class="text-[10px] text-[var(--text-secondary)] italic">
              <i class="fas fa-info-circle mr-1"></i>Menentukan kolom absensi &amp; bonus kehadiran
              di slip bisyaroh. Tak dicentang = tidak diabsen di shift itu.
            </p>
          </div>
          <!-- Kyai 7 Agu 2026: field lama `tanggal_tugas` DIGANTI NAMANYA jadi "Tgl. Syahadah"
               (kuncinya sengaja tetap — NIG diturunkan darinya). Masa pengabdian dihitung dari
               field BARU di sebelahnya, yang diisi Kyai sendiri. -->
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Tgl. Syahadah</label
            >
            <input
              v-model="form.tanggal_tugas"
              type="date"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            />
            <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
              Dasar penomoran NIG — jangan diubah tanpa perlu.
              <b>Boleh kosong</b> untuk yang belum bersyahadah (NIG-nya tak terbit otomatis).
            </p>
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Tgl. Tugas</label
            >
            <input
              v-model="form.tanggal_mengabdi"
              type="date"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
            />
            <p class="text-[10px] text-[var(--text-tertiary)] italic mt-1">
              Awal mengabdi — dasar tunjangan pengabdian. Kosong = tunjangan itu tak terbit.
            </p>
          </div>
        </div>
      </div>

      <!-- Kontak & ID -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3"
        >
          <i class="fas fa-address-book text-teal-500 mr-1"></i>Kontak &amp; Identifikasi
        </h3>
        <!-- v.21.17.0526: + NIK + reorder field -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >NIK (16 digit)</label
            >
            <input
              v-model="form.nik"
              type="text"
              maxlength="16"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none font-mono"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >No. WhatsApp *</label
            >
            <input
              v-model="form.wa"
              type="tel"
              required
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >NIG (Nomor Induk Guru)</label
            >
            <input
              v-model="form.no_nig"
              type="text"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >No. Rekening BMT</label
            >
            <input
              v-model="form.rek_bmt"
              type="text"
              inputmode="numeric"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none font-mono"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >ID Fingerprint</label
            >
            <input
              v-model="form.id_fingerprint"
              type="text"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Status & Role -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs font-black text-slate-700 dark:text-[var(--text-tertiary)] uppercase tracking-wide mb-3"
        >
          <i class="fas fa-toggle-on text-emerald-500 mr-1"></i>Status &amp; Akses
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Status</label
            >
            <select
              v-model="form.status"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
          <div v-if="isSuperAdmin">
            <label class="block text-xs font-bold text-teal-700 mb-1 uppercase"
              >Role Sistem (super-admin only)</label
            >
            <select
              v-model="form.role_sistem"
              class="w-full px-3 py-2 text-sm rounded-xl border border-teal-300 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option v-for="r in ROLE_SISTEM_OPTIONS" :key="r.value" :value="r.value">
                {{ r.label }}
              </option>
            </select>
          </div>
          <!-- v.111: Gedung yang dikelola admin keuangan (scope Buku Kas) -->
          <div v-if="isSuperAdmin && form.role_sistem === 'admin_keuangan'">
            <label class="block text-xs font-bold text-teal-700 mb-1 uppercase"
              >Gedung (scope Buku Kas)</label
            >
            <select
              v-model="form.gedung"
              class="w-full px-3 py-2 text-sm rounded-xl border border-teal-300 bg-teal-50 focus:ring-2 focus:ring-teal-500 outline-none"
            >
              <option value="">-- Semua (tak ter-scope) --</option>
              <option v-for="g in gedungOptions" :key="g" :value="g">{{ g }}</option>
            </select>
            <p class="text-[10px] text-[var(--text-tertiary)] mt-1 italic">
              Kosong = lihat semua gedung. Pilih satu agar admin ini hanya pegang Buku Kas gedung
              tersebut.
            </p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm sticky bottom-3 flex gap-2"
      >
        <!-- v.21.23.0526: Batal pakai cancelTarget biar konsisten -->
        <router-link
          :to="cancelTarget"
          class="flex-1 text-center px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition"
        >
          <i class="fas fa-times mr-1"></i>Batal
        </router-link>
        <button
          type="submit"
          :disabled="isSaving"
          class="flex-1 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition"
        >
          <i class="fas fa-save mr-1"></i
          >{{ isSaving ? 'Menyimpan...' : editingId ? 'Update Guru' : 'Simpan Guru' }}
        </button>
      </div>
    </form>

    <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
      <i class="fas fa-circle-info mr-1"></i>v.21.17.0526
    </p>
  </div>
</template>

<script setup>
import { onMounted, watch, computed } from 'vue'
import { pecahJabatan } from '@/utils/jabatanUnit'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import {
  useGuruForm,
  JABATAN_OPTIONS,
  JABATAN_NO_LEMBAGA,
  TIPE_PEGAWAI_OPTIONS,
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
  gedungOptions,
  shiftOptions,
  toggleShift,
  syncShiftIdsKeTipe,
  unitsJabatan,
  jabatanPunyaUnit,
  unitTerpilih,
  syncUnitKeJabatan,
  loadGuru,
  resetForm,
  save
} = useGuruForm()

// v.1.1.9: jabatan menentukan unit tugas → lembaga terisi/dibatasi otomatis.
watch(() => [form.value.jabatan, form.value.jabatan_tambahan], syncUnitKeJabatan)

// Kyai 7 Agu 2026: jabatan tambahan boleh banyak. Nilainya tetap SATU string dipisah koma
//   (kolomnya bertipe teks, dan bentuk itu terbaca oleh data lama tanpa migrasi apa pun).
const jabatanTambahanList = computed(() => pecahJabatan(form.value.jabatan_tambahan))
function toggleJabatanTambahan(nama) {
  const cur = pecahJabatan(form.value.jabatan_tambahan)
  const i = cur.findIndex((x) => x.toLowerCase() === String(nama).toLowerCase())
  if (i >= 0) cur.splice(i, 1)
  else cur.push(nama)
  form.value.jabatan_tambahan = cur.join(', ')
}

// v.99: show/butuh lembaga dari JABATAN (master/jabatan tipe_lembaga) — bukan tipe_pegawai
const isJabatanNoLembaga = computed(() => !butuhLembaga.value)
const showLembagaQiraati = computed(() => butuhLembaga.value)
const showLembagaSekolah = computed(() => butuhLembaga.value)

watch(
  () => form.value.tipe_pegawai,
  (newTipe) => {
    // Pegawai → clear lembaga (no teaching context)
    if (newTipe === 'pegawai') {
      form.value.lembaga = ''
      form.value.lembaga_sekolah = ''
    }
    // v.1.1.9: buang shift yang tak lagi ditawarkan utk tipe ini.
    //   Dulu di sini ada `form.value.shift = ''` — padahal utk tipe 'pegawai' field itu
    //   JUSTRU shift kerjanya, dan dropdown-nya tak punya opsi kosong. Kalau admin tak
    //   sadar memilih ulang, tersimpan '' → pembaca legacy menerjemahkannya 'pagi_sore'
    //   → pegawai shift pagi dihitung hadir 2 shift (bonus dobel di slip bisyaroh).
    syncShiftIdsKeTipe()
  }
)

onMounted(async () => {
  const id = route.params.id
  if (id && id !== 'new') await loadGuru(id)
  else resetForm()
})

watch(
  () => route.params.id,
  async (newId) => {
    if (newId && newId !== 'new') await loadGuru(newId)
    else resetForm()
  }
)

// v.21.23.0526: object form router.push lebih reliable di hash mode + query
const fromMaster = computed(() => route.query.from === 'master')
const cancelTarget = computed(() =>
  fromMaster.value ? { path: '/master-data', query: { tab: 'guru' } } : '/guru'
)

async function onSubmit() {
  const ok = await save()
  if (ok) {
    if (fromMaster.value) router.push({ path: '/master-data', query: { tab: 'guru' } })
    else router.push('/guru')
  }
}
</script>
