<template>
  <div class="space-y-4">
    <div
      class="bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm"
    >
      <div
        class="relative bg-gradient-to-br from-cyan-500 dark:from-cyan-700 via-cyan-600 dark:via-cyan-800 to-cyan-700 dark:to-cyan-900 px-6 py-7"
      >
        <img
          src="/logo.png"
          alt=""
          class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none"
        />
        <div class="relative flex flex-col md:flex-row items-center gap-5">
          <div
            class="w-24 h-24 md:w-28 md:h-28 bg-[var(--bg-card)]/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0"
          >
            <img v-if="santri?.foto" :src="santri.foto" class="w-full h-full object-cover" />
            <i v-else class="fas fa-user-graduate text-white/70 text-4xl"></i>
          </div>
          <div class="flex-1 text-center md:text-left text-white">
            <h2 class="text-xl md:text-2xl font-black drop-shadow">{{ santri?.nama || '-' }}</h2>
            <p class="text-xs font-bold text-cyan-50/90 uppercase tracking-wider mt-1">
              {{ santri?.lembaga || '-' }} · Kelas {{ santri?.kelas || '-' }}
            </p>
            <span
              class="inline-block mt-2 text-[11px] bg-[var(--bg-card)]/25 border border-white/30 text-white font-black px-3 py-1 rounded-full uppercase tracking-widest"
              >{{
                santri?.is_mukim ? "Ma'had" : santri?.is_fullday ? 'Fullday' : 'Pulang Pergi'
              }}</span
            >
          </div>
        </div>
      </div>

      <!-- v.79.0526: tab/section toggle: Lihat / Edit Profil — v.91.0626: sembunyi saat readonly (profil orang lain) -->
      <div v-if="!readonly" class="px-4 pt-4 flex gap-2 border-b border-[var(--border-subtle)]">
        <button
          @click="mode = 'view'"
          :class="[
            'px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer',
            mode === 'view'
              ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 border-b-2 border-cyan-500 -mb-px'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
          ]"
        >
          <i class="fas fa-id-card mr-1"></i>Data Profil
        </button>
        <button
          @click="mode = 'edit'"
          :class="[
            'px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer',
            mode === 'edit'
              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 border-b-2 border-emerald-500 -mb-px'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]'
          ]"
        >
          <i class="fas fa-edit mr-1"></i>Edit Data Saya
        </button>
      </div>

      <!-- ===== Mode View ===== -->
      <div v-if="mode === 'view'" class="p-4 space-y-4">
        <!-- v.103 mobile: kartu info scroll-samping (snap); grid 2-kolom di desktop -->
        <div
          class="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar pb-1"
        >
          <div
            class="snap-center shrink-0 w-[88%] md:w-auto bg-[var(--bg-card-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)]"
          >
            <h3 class="text-xs font-black uppercase text-[var(--text-primary)] mb-3 border-b pb-2">
              <i class="fas fa-id-card mr-1"></i>Identitas
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">No. Induk:</span
                ><span class="font-black">{{ santri?.nis || '-' }}</span>
              </li>
              <!-- v.100: NIS Dinas (manual, santri sekolah TK/SDI/PKBM) -->
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">NIS:</span
                ><span class="font-black">{{ santri?.nis_sekolah || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">NISN:</span
                ><span class="font-black">{{ santri?.nisn || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">NIK:</span
                ><span class="font-black">{{ santri?.nik || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">Jenis Kelamin:</span
                ><span class="font-black">{{
                  santri?.jk === 'L' ? 'Laki-laki' : 'Perempuan'
                }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">Tempat Lahir:</span
                ><span class="font-black">{{ santri?.tempat_lahir || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">Tgl Lahir:</span
                ><span class="font-black">{{ santri?.tgl_lahir || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-[var(--text-secondary)] font-bold">Tgl Masuk:</span
                ><span class="font-black">{{ santri?.tgl_masuk || '-' }}</span>
              </li>
            </ul>
          </div>
          <div
            class="snap-center shrink-0 w-[88%] md:w-auto bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800"
          >
            <h3
              class="text-xs font-black uppercase text-cyan-700 dark:text-cyan-300 mb-3 border-b border-cyan-200 dark:border-cyan-800 pb-2"
            >
              <i class="fas fa-school mr-1"></i>Pendidikan
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span class="text-cyan-700 font-bold">Lembaga:</span
                ><span class="font-black">{{ santri?.lembaga || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-cyan-700 font-bold">Kelas:</span
                ><span class="font-black">{{ santri?.kelas || '-' }}</span>
              </li>
              <li v-if="santri?.juz" class="flex justify-between">
                <span class="text-cyan-700 font-bold">Juz:</span
                ><span class="font-black">{{ juzNum(santri.juz) }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-cyan-700 font-bold">Lembaga Sekolah:</span
                ><span class="font-black">{{ santri?.lembaga_sekolah || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-cyan-700 font-bold">Kelas Sekolah:</span
                ><span class="font-black">{{ santri?.kelas_sekolah || '-' }}</span>
              </li>
            </ul>
          </div>

          <!-- v.79.0526: Data Ayah -->
          <div
            class="snap-center shrink-0 w-[88%] md:w-auto bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800"
          >
            <h3
              class="text-xs font-black uppercase text-emerald-700 dark:text-emerald-300 mb-3 border-b border-emerald-200 dark:border-emerald-800 pb-2"
            >
              <i class="fas fa-male mr-1"></i>Data Ayah
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span class="text-emerald-700 font-bold">Nama:</span
                ><span class="font-black">{{ ayahNama || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-emerald-700 font-bold">NIK:</span
                ><span class="font-black">{{ ayahNik || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-emerald-700 font-bold">Pekerjaan:</span
                ><span class="font-black">{{ ayahPekerjaan || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-emerald-700 font-bold">Pendidikan:</span
                ><span class="font-black">{{ ayahPendidikan || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-emerald-700 font-bold">No. HP:</span
                ><span class="font-black">{{ ayahHp || '-' }}</span>
              </li>
            </ul>
          </div>

          <!-- v.79.0526: Data Ibu -->
          <div
            class="snap-center shrink-0 w-[88%] md:w-auto bg-rose-50 dark:bg-rose-900/20 p-4 rounded-2xl border border-rose-200 dark:border-rose-800"
          >
            <h3
              class="text-xs font-black uppercase text-rose-700 dark:text-rose-300 mb-3 border-b border-rose-200 dark:border-rose-800 pb-2"
            >
              <i class="fas fa-female mr-1"></i>Data Ibu
            </h3>
            <ul class="space-y-2 text-sm">
              <li class="flex justify-between">
                <span class="text-rose-700 font-bold">Nama:</span
                ><span class="font-black">{{ ibuNama || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-rose-700 font-bold">NIK:</span
                ><span class="font-black">{{ ibuNik || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-rose-700 font-bold">Pekerjaan:</span
                ><span class="font-black">{{ ibuPekerjaan || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-rose-700 font-bold">Pendidikan:</span
                ><span class="font-black">{{ ibuPendidikan || '-' }}</span>
              </li>
              <li class="flex justify-between">
                <span class="text-rose-700 font-bold">No. HP:</span
                ><span class="font-black">{{ ibuHp || '-' }}</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- /scroll-samping -->

        <div
          class="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800"
        >
          <h3
            class="text-xs font-black uppercase text-amber-700 dark:text-amber-300 mb-3 border-b border-amber-200 dark:border-amber-800 pb-2"
          >
            <i class="fas fa-user-friends mr-1"></i>Wali
          </h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between">
              <span class="text-amber-700 font-bold">Nama Wali:</span
              ><span class="font-black">{{ santri?.wali || '-' }}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-amber-700 font-bold">No WhatsApp:</span
              ><span class="font-black">{{ santri?.wa || '-' }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- ===== Mode Edit ===== -->
      <!-- v.79.0526: santri bisa edit data profilnya sendiri (parent, alamat, tempat lahir).
           Field master (No. Induk, lembaga, kelas, guru) hanya bisa diedit admin. -->
      <div v-else class="p-4 space-y-4">
        <p
          class="text-xs text-[var(--text-secondary)] bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2"
        >
          <i class="fas fa-info-circle text-emerald-600 mr-1"></i>
          Lengkapi data yang masih kosong. Data sekolah, kelas, dan guru hanya bisa diubah oleh
          admin.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >Tempat Lahir</label
            >
            <input
              v-model="editForm.tempat_lahir"
              type="text"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase"
              >NIK</label
            >
            <input
              v-model="editForm.nik"
              type="text"
              maxlength="16"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
        </div>

        <!-- Ayah -->
        <div
          class="bg-emerald-50/40 dark:bg-emerald-900/20 rounded-2xl p-4 border border-emerald-200 dark:border-emerald-800"
        >
          <h4 class="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase mb-3">
            <i class="fas fa-male mr-1"></i>Data Ayah
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase"
                >Nama Ayah</label
              >
              <input
                v-model="editForm.nama_ayah"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase"
                >NIK Ayah</label
              >
              <input
                v-model="editForm.nik_ayah"
                type="text"
                maxlength="16"
                class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase"
                >Pekerjaan</label
              >
              <input
                v-model="editForm.pekerjaan_ayah"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase"
                >Pendidikan Terakhir</label
              >
              <select
                v-model="editForm.pendidikan_ayah"
                class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option value="">-- Pilih --</option>
                <option v-for="p in PENDIDIKAN_OPTS" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-emerald-700 mb-1 uppercase"
                >No. HP Ayah</label
              >
              <input
                v-model="editForm.hp_ayah"
                type="tel"
                class="w-full px-3 py-2 text-sm rounded-xl border border-emerald-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Ibu -->
        <div
          class="bg-rose-50/40 dark:bg-rose-900/20 rounded-2xl p-4 border border-rose-200 dark:border-rose-800"
        >
          <h4 class="text-xs font-black text-rose-700 dark:text-rose-300 uppercase mb-3">
            <i class="fas fa-female mr-1"></i>Data Ibu
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="md:col-span-2">
              <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">Nama Ibu</label>
              <input
                v-model="editForm.nama_ibu"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">NIK Ibu</label>
              <input
                v-model="editForm.nik_ibu"
                type="text"
                maxlength="16"
                class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">Pekerjaan</label>
              <input
                v-model="editForm.pekerjaan_ibu"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-rose-700 mb-1 uppercase"
                >Pendidikan Terakhir</label
              >
              <select
                v-model="editForm.pendidikan_ibu"
                class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-rose-500 outline-none"
              >
                <option value="">-- Pilih --</option>
                <option v-for="p in PENDIDIKAN_OPTS" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-rose-700 mb-1 uppercase">No. HP Ibu</label>
              <input
                v-model="editForm.hp_ibu"
                type="tel"
                class="w-full px-3 py-2 text-sm rounded-xl border border-rose-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-rose-500 outline-none"
              />
            </div>
          </div>
        </div>

        <!-- Alamat -->
        <div
          class="bg-amber-50/40 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800"
        >
          <h4 class="text-xs font-black text-amber-700 dark:text-amber-300 uppercase mb-3">
            <i class="fas fa-map-marker-alt mr-1"></i>Alamat Detail
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="col-span-2 md:col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Dusun</label>
              <input
                v-model="editForm.alamat_dusun"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">RT</label>
              <input
                v-model="editForm.alamat_rt"
                type="text"
                maxlength="3"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div>
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">RW</label>
              <input
                v-model="editForm.alamat_rw"
                type="text"
                maxlength="3"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase"
                >Desa / Kelurahan</label
              >
              <input
                v-model="editForm.alamat_desa"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Kecamatan</label>
              <input
                v-model="editForm.alamat_kecamatan"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase"
                >Kab. / Kota</label
              >
              <input
                v-model="editForm.alamat_kabupaten"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Provinsi</label>
              <input
                v-model="editForm.alamat_provinsi"
                type="text"
                class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-2 sticky bottom-3">
          <button
            @click="mode = 'view'"
            class="flex-1 px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition"
          >
            <i class="fas fa-times mr-1"></i>Batal
          </button>
          <button
            @click="saveProfile"
            :disabled="isSaving"
            class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition"
          >
            <i :class="['fas', isSaving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i
            >{{ isSaving ? 'Menyimpan...' : 'Simpan Profil' }}
          </button>
        </div>
      </div>
    </div>
    <ProfilPengaturanSaya v-if="!readonly" role="santri" :entity-id="santri?.id" :entity="santri" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { mergeOne } from '@/services/db'
import { useToast } from '@/composables/useToast'
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'
import { juzNum } from '@/utils/format' // v.100e: normalisasi tampilan juz (anti dobel "Juz JUZ n")

const props = defineProps({
  santri: { type: Object, required: true },
  readonly: { type: Boolean, default: false }
})
const toast = useToast()
const mode = ref('view')
const isSaving = ref(false)

// v.79.0526: pendidikan options
const PENDIDIKAN_OPTS = [
  'Tidak Sekolah',
  'SD / MI',
  'SMP / MTs',
  'SMA / MA / SMK',
  'D1',
  'D2',
  'D3',
  'S1',
  'S2',
  'S3'
]

// Computed parent shortcuts (back-compat: ayah/ibu nested object atau flat fields)
const ayahNama = computed(() => props.santri?.ayah?.nama || props.santri?.nama_ayah)
const ayahNik = computed(() => props.santri?.ayah?.nik || props.santri?.nik_ayah)
const ayahPekerjaan = computed(() => props.santri?.ayah?.pekerjaan || props.santri?.pekerjaan_ayah)
const ayahPendidikan = computed(
  () => props.santri?.ayah?.pendidikan || props.santri?.pendidikan_ayah
)
const ayahHp = computed(
  () =>
    props.santri?.ayah?.telp ||
    props.santri?.ayah?.hp ||
    props.santri?.hp_ayah ||
    props.santri?.telp_ayah
)
const ibuNama = computed(() => props.santri?.ibu?.nama || props.santri?.nama_ibu)
const ibuNik = computed(() => props.santri?.ibu?.nik || props.santri?.nik_ibu)
const ibuPekerjaan = computed(() => props.santri?.ibu?.pekerjaan || props.santri?.pekerjaan_ibu)
const ibuPendidikan = computed(() => props.santri?.ibu?.pendidikan || props.santri?.pendidikan_ibu)
const ibuHp = computed(
  () =>
    props.santri?.ibu?.telp ||
    props.santri?.ibu?.hp ||
    props.santri?.hp_ibu ||
    props.santri?.telp_ibu
)

// edit form copy of editable fields
const editForm = ref({})
function buildEditForm() {
  const s = props.santri || {}
  editForm.value = {
    tempat_lahir: s.tempat_lahir || '',
    nik: s.nik || '',
    alamat_dusun: s.alamat_dusun || s.dusun || '',
    alamat_rt: s.alamat_rt || s.rt || '',
    alamat_rw: s.alamat_rw || s.rw || '',
    alamat_desa: s.alamat_desa || s.desa || '',
    alamat_kecamatan: s.alamat_kecamatan || s.kecamatan || '',
    alamat_kabupaten: s.alamat_kabupaten || s.kabupaten || '',
    alamat_provinsi: s.alamat_provinsi || s.provinsi || '',
    nama_ayah: ayahNama.value || '',
    nik_ayah: ayahNik.value || '',
    pekerjaan_ayah: ayahPekerjaan.value || '',
    pendidikan_ayah: ayahPendidikan.value || '',
    hp_ayah: ayahHp.value || '',
    nama_ibu: ibuNama.value || '',
    nik_ibu: ibuNik.value || '',
    pekerjaan_ibu: ibuPekerjaan.value || '',
    pendidikan_ibu: ibuPendidikan.value || '',
    hp_ibu: ibuHp.value || ''
  }
}
watch(() => props.santri, buildEditForm, { immediate: true, deep: true })
watch(mode, (m) => {
  if (m === 'edit') buildEditForm()
})

async function saveProfile() {
  if (!props.santri?.id) {
    toast.error('Santri ID tidak ditemukan')
    return
  }
  isSaving.value = true
  try {
    const ef = editForm.value
    const payload = {
      tempat_lahir: ef.tempat_lahir,
      nik: ef.nik,
      alamat_dusun: ef.alamat_dusun,
      alamat_rt: ef.alamat_rt,
      alamat_rw: ef.alamat_rw,
      alamat_desa: ef.alamat_desa,
      alamat_kecamatan: ef.alamat_kecamatan,
      alamat_kabupaten: ef.alamat_kabupaten,
      alamat_provinsi: ef.alamat_provinsi,
      // Ayah — flat + nested (PSB compat). v.F6e: nested pakai objek (bukan dot-notation
      //   Firestore) → mergeOne deep-merge ke ayah/ibu (jsonb), pertahankan subfield lain.
      nama_ayah: ef.nama_ayah,
      nik_ayah: ef.nik_ayah,
      pekerjaan_ayah: ef.pekerjaan_ayah,
      pendidikan_ayah: ef.pendidikan_ayah,
      hp_ayah: ef.hp_ayah,
      ayah: {
        nama: ef.nama_ayah,
        nik: ef.nik_ayah,
        pekerjaan: ef.pekerjaan_ayah,
        pendidikan: ef.pendidikan_ayah,
        telp: ef.hp_ayah
      },
      // Ibu
      nama_ibu: ef.nama_ibu,
      nik_ibu: ef.nik_ibu,
      pekerjaan_ibu: ef.pekerjaan_ibu,
      pendidikan_ibu: ef.pendidikan_ibu,
      hp_ibu: ef.hp_ibu,
      ibu: {
        nama: ef.nama_ibu,
        nik: ef.nik_ibu,
        pekerjaan: ef.pekerjaan_ibu,
        pendidikan: ef.pendidikan_ibu,
        telp: ef.hp_ibu
      },
      updated_at: new Date().toISOString()
    }
    await mergeOne('santri', String(props.santri.id), payload)
    // v.86.0526 FIX: update objek santri lokal supaya view langsung reflect (sebelumnya revert ke data lama).
    Object.assign(props.santri, {
      tempat_lahir: ef.tempat_lahir,
      nik: ef.nik,
      alamat_dusun: ef.alamat_dusun,
      alamat_rt: ef.alamat_rt,
      alamat_rw: ef.alamat_rw,
      alamat_desa: ef.alamat_desa,
      alamat_kecamatan: ef.alamat_kecamatan,
      alamat_kabupaten: ef.alamat_kabupaten,
      alamat_provinsi: ef.alamat_provinsi,
      nama_ayah: ef.nama_ayah,
      nik_ayah: ef.nik_ayah,
      pekerjaan_ayah: ef.pekerjaan_ayah,
      pendidikan_ayah: ef.pendidikan_ayah,
      hp_ayah: ef.hp_ayah,
      nama_ibu: ef.nama_ibu,
      nik_ibu: ef.nik_ibu,
      pekerjaan_ibu: ef.pekerjaan_ibu,
      pendidikan_ibu: ef.pendidikan_ibu,
      hp_ibu: ef.hp_ibu,
      ayah: {
        ...(props.santri.ayah || {}),
        nama: ef.nama_ayah,
        nik: ef.nik_ayah,
        pekerjaan: ef.pekerjaan_ayah,
        pendidikan: ef.pendidikan_ayah,
        telp: ef.hp_ayah
      },
      ibu: {
        ...(props.santri.ibu || {}),
        nama: ef.nama_ibu,
        nik: ef.nik_ibu,
        pekerjaan: ef.pekerjaan_ibu,
        pendidikan: ef.pendidikan_ibu,
        telp: ef.hp_ibu
      }
    })
    toast.success('Profil tersimpan')
    mode.value = 'view'
  } catch (e) {
    toast.error('Gagal simpan: ' + (e.message || e))
  } finally {
    isSaving.value = false
  }
}
</script>
