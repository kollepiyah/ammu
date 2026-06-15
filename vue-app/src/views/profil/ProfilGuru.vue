<template>
  <!-- v.20.2.0526: Banner hijau gradient match legacy + logo app watermark efek (seperti widget Ahlan) -->
  <div class="space-y-4">
    <div class="bg-[var(--bg-card)] rounded-[2rem] shadow-sm border border-[var(--border-subtle)] overflow-hidden">
      <!-- HEADER BANNER — gradient teal/emerald dengan logo app sebagai watermark -->
      <div
        class="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-hover)] px-6 md:px-8 py-6 md:py-7 overflow-hidden"
      >
        <!-- Logo app watermark (efek mirip Ahlan widget) -->
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-4 -top-6 w-44 h-44 object-contain opacity-10 pointer-events-none select-none"
        />
        <img
          src="/logo.png"
          alt=""
          aria-hidden="true"
          class="absolute -right-12 -bottom-12 w-32 h-32 object-contain opacity-[0.07] pointer-events-none select-none rotate-12"
        />

        <div class="relative flex flex-col md:flex-row items-center md:items-center gap-5">
          <!-- Foto profil bulat -->
          <div
            class="w-28 h-28 md:w-32 md:h-32 bg-[var(--bg-card)]/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm"
          >
            <img
              v-if="guru?.foto"
              :src="guru.foto"
              class="w-full h-full object-cover"
              alt="Foto Profil"
            />
            <i v-else class="fas fa-user-tie text-white/60 text-5xl"></i>
          </div>

          <!-- Nama + jabatan + badge role -->
          <div class="flex-1 text-center md:text-left text-white min-w-0">
            <h2 class="text-2xl md:text-3xl font-black leading-tight drop-shadow-sm">
              {{ namaGelar }}
            </h2>
            <p class="text-xs md:text-sm font-bold text-emerald-50/90 uppercase tracking-wider mt-1.5">
              {{ jabatanHeader }}
            </p>
            <!-- v.21.26.0526: Fix kontras — sebelumnya bg-[var(--bg-card)] text-white = badge invisible -->
            <span
              class="inline-block mt-3 text-[11px] bg-[var(--bg-card)]/25 dark:bg-slate-800/25 backdrop-blur-sm text-white font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md border border-white/30"
            >
              {{ roleLabel }}
            </span>
          </div>
        </div>
      </div>

      <!-- v.79.0526: tab toggle Lihat / Edit Profil Saya — v.91.0626: sembunyi saat readonly -->
      <div v-if="!readonly" class="px-4 pt-4 flex gap-2 border-b border-[var(--border-subtle)]">
        <button
          @click="mode = 'view'"
          :class="['px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer',
            mode === 'view'
              ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-700 border-b-2 border-teal-500 -mb-px'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]']"
        >
          <i class="fas fa-id-card mr-1"></i>Data Profil
        </button>
        <button
          @click="mode = 'edit'"
          :class="['px-3 py-2 text-xs font-bold rounded-t-lg transition cursor-pointer',
            mode === 'edit'
              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 border-b-2 border-emerald-500 -mb-px'
              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)]']"
        >
          <i class="fas fa-edit mr-1"></i>Edit Data Saya
        </button>
      </div>

      <!-- ===== Mode View ===== -->
      <!-- GRID DETAIL -->
      <div v-if="mode === 'view'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Identitas -->
        <div class="bg-[var(--bg-card-elevated)] p-5 rounded-2xl border border-[var(--border-subtle)]">
          <h3
            class="font-black text-[var(--text-primary)] text-sm uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2 mb-4"
          >
            <i class="fas fa-user mr-2"></i>Identitas
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Nama:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ namaGelar }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Username:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.username || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">NIK:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.nik || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Jenis Kelamin:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ jkLabel }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Tempat, Tgl Lahir:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ ttlFmt }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">No WhatsApp:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.wa || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Email:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.email || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Pendidikan Terakhir:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ pendidikanFmt }}</span>
            </li>
          </ul>
        </div>

        <!-- Tugas & Lembaga -->
        <div class="bg-cyan-50 dark:bg-cyan-900/20 p-5 rounded-2xl border border-cyan-100">
          <h3
            class="font-black text-cyan-800 text-sm uppercase tracking-widest border-b border-cyan-200 pb-2 mb-4"
          >
            <i class="fas fa-briefcase mr-2"></i>Tugas &amp; Lembaga
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Jabatan:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.jabatan || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Lembaga:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.lembaga || '-' }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Tanggal Tugas:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ tglTugasFmt }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Lama Mengajar:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ lamaMengajar }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-cyan-700 font-bold">Status:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.status || 'Aktif' }}</span>
            </li>
          </ul>
        </div>

        <!-- Sistem & Akses (full width on md) -->
        <div class="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-2xl border border-teal-100 md:col-span-2">
          <h3
            class="font-black text-teal-800 text-sm uppercase tracking-widest border-b border-teal-200 pb-2 mb-4"
          >
            <i class="fas fa-shield-halved mr-2"></i>Sistem &amp; Akses
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div class="bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100">
              <p class="text-[10px] text-teal-600 font-bold uppercase">Role Sistem</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ roleSistem }}</p>
            </div>
            <div class="bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100">
              <p class="text-[10px] text-teal-600 font-bold uppercase">NIG</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ guru?.nig || guru?.ekgq || guru?.no_syahadah || '-' }}</p>
            </div>
            <div class="bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100">
              <p class="text-[10px] text-teal-600 font-bold uppercase">ID Fingerprint</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ guru?.id_fingerprint || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ===== Mode Edit ===== -->
      <!-- v.79.0526: guru bisa edit data profil personal sendiri (nik, ttl, hp, email, pendidikan, alamat).
           Field master (jabatan, lembaga, role_sistem, fingerprint) hanya bisa diubah admin. -->
      <div v-if="mode === 'edit'" class="p-4 space-y-4">
        <p class="text-xs text-[var(--text-secondary)] bg-emerald-50/60 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-2">
          <i class="fas fa-info-circle text-emerald-600 mr-1"></i>
          Lengkapi data profil Anda. Data jabatan, lembaga, dan akses sistem hanya bisa diubah oleh admin.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">NIK</label>
            <input v-model="editForm.nik" type="text" maxlength="16" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tempat Lahir</label>
            <input v-model="editForm.tempat_lahir" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Tgl Lahir</label>
            <input v-model="editForm.tgl_lahir" type="date" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer" />
          </div>
          <div>
            <label class="block text-xs font-bold text-[var(--text-secondary)] mb-1 uppercase">Email</label>
            <input v-model="editForm.email" type="email" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
        </div>

        <!-- Pendidikan -->
        <div class="bg-cyan-50/40 dark:bg-cyan-900/20 rounded-2xl p-4 border border-cyan-200 dark:border-cyan-800">
          <h4 class="text-xs font-black text-cyan-700 dark:text-cyan-300 uppercase mb-3"><i class="fas fa-graduation-cap mr-1"></i>Pendidikan Terakhir</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Jenjang</label>
              <select v-model="editForm.pendidikan_terakhir" class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none">
                <option value="">-- Pilih --</option>
                <option v-for="p in PENDIDIKAN_OPTS" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Nama Sekolah/Universitas</label>
              <input v-model="editForm.nama_ijazah" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-cyan-700 mb-1 uppercase">Tahun Lulus</label>
              <input v-model="editForm.tahun_lulus" type="number" min="1950" :max="new Date().getFullYear()" class="w-full px-3 py-2 text-sm rounded-xl border border-cyan-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-cyan-500 outline-none" />
            </div>
          </div>
        </div>

        <!-- Alamat -->
        <div class="bg-amber-50/40 dark:bg-amber-900/20 rounded-2xl p-4 border border-amber-200 dark:border-amber-800">
          <h4 class="text-xs font-black text-amber-700 dark:text-amber-300 uppercase mb-3"><i class="fas fa-map-marker-alt mr-1"></i>Alamat Detail</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div class="col-span-2 md:col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Dusun</label>
              <input v-model="editForm.alamat_dusun" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">RT</label>
              <input v-model="editForm.alamat_rt" type="text" maxlength="3" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">RW</label>
              <input v-model="editForm.alamat_rw" type="text" maxlength="3" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Desa / Kelurahan</label>
              <input v-model="editForm.alamat_desa" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Kecamatan</label>
              <input v-model="editForm.alamat_kecamatan" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Kab. / Kota</label>
              <input v-model="editForm.alamat_kabupaten" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-bold text-amber-700 mb-1 uppercase">Provinsi</label>
              <input v-model="editForm.alamat_provinsi" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 bg-white dark:bg-[var(--bg-card-elevated)] focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
          </div>
        </div>

        <div class="flex gap-2 sticky bottom-3">
          <button @click="mode = 'view'" class="flex-1 px-4 py-3 bg-[var(--bg-muted)] hover:bg-slate-200 text-slate-700 dark:text-[var(--text-tertiary)] font-bold rounded-xl text-sm shadow-md transition">
            <i class="fas fa-times mr-1"></i>Batal
          </button>
          <button @click="saveProfile" :disabled="isSaving" class="flex-1 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition">
            <i :class="['fas', isSaving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>{{ isSaving ? 'Menyimpan...' : 'Simpan Profil' }}
          </button>
        </div>
      </div>

      <p v-if="mode === 'view' && !readonly" class="text-[10px] text-[var(--text-tertiary)] italic mt-4 text-center pb-3">
        <i class="fas fa-info-circle mr-1"></i>Untuk mengubah foto/sandi → tab "Pengaturan Profil" di bawah.
        Untuk update data personal (NIK, alamat, pendidikan, dll) → klik tab "Edit Data Saya" di atas.
      </p>
    </div>

    <!-- v.21.26.0526: Section Kaitkan Akun Google DIHAPUS — duplikat dgn card di Pengaturan Profil grid -->

    <ProfilPengaturanSaya v-if="!readonly" role="guru" :entity-id="guru?.id" :entity="guru" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { getNamaGuruGelar, formatTanggal, hitungLamaMengajar } from '@/utils/format'
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'
import { linkGoogleAccount, unlinkGoogleAccount } from '@/services/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

// v.79.0526: mode tab + edit profil pribadi guru
const mode = ref('view')
const isSaving = ref(false)
const PENDIDIKAN_OPTS = [
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

const props = defineProps({
  guru: { type: Object, required: true },
  readonly: { type: Boolean, default: false }
})

const toast = useToast()
const confirmDlg = useConfirm()
const linkBusy = ref(false)

async function handleLinkGoogle() {
  if (!props.guru?.id) return
  linkBusy.value = true
  try {
    const res = await linkGoogleAccount('guru', props.guru.id)
    if (props.guru) {
      props.guru.linked_uid = res.uid
      props.guru.linked_email = res.email
    }
    toast.success(`Akun ${res.email || 'Google'} berhasil dikaitkan`)
  } catch (e) {
    if (e?.code === 'auth/popup-closed-by-user') return
    toast.error('Gagal kaitkan: ' + (e.message || e))
  } finally {
    linkBusy.value = false
  }
}

async function handleUnlinkGoogle() {
  if (!props.guru?.id) return
  const ok = await confirmDlg({
    title: 'Lepas kaitan Google?',
    message: `Akun Google "${props.guru.linked_email || props.guru.linked_uid}" akan dilepas.`,
    confirmText: 'Lepas',
    danger: true
  })
  if (!ok) return
  linkBusy.value = true
  try {
    await unlinkGoogleAccount('guru', props.guru.id)
    if (props.guru) {
      props.guru.linked_uid = null
      props.guru.linked_email = null
    }
    toast.success('Akun Google dilepas')
  } catch (e) {
    toast.error('Gagal lepas: ' + (e.message || e))
  } finally {
    linkBusy.value = false
  }
}

const namaGelar = computed(() => getNamaGuruGelar(props.guru?.nama, props.guru?.jk))
// v.101: sembunyikan " - lembaga" kalau guru tak punya lembaga (jangan tampil "Jabatan - -")
const jabatanHeader = computed(() => {
  const jab = props.guru?.jabatan || 'Pegawai'
  const lemb = props.guru?.lembaga
  return lemb ? `${jab} - ${lemb}` : jab
})
const jkLabel = computed(() => (props.guru?.jk === 'L' ? 'Laki-laki' : 'Perempuan'))
const tglTugasFmt = computed(() => formatTanggal(props.guru?.tanggal_tugas))
const lamaMengajar = computed(() => hitungLamaMengajar(props.guru?.tanggal_tugas))

const ROLE_LABELS = {
  user: 'User',
  admin: 'Admin',
  admin_keuangan: 'Admin Keuangan',
  super_admin: 'Super Admin'
}
const roleLabel = computed(() => ROLE_LABELS[props.guru?.role_sistem || 'user'] || 'Guru')
const roleSistem = computed(() =>
  (props.guru?.role_sistem || 'user').replace('_', ' ').toUpperCase()
)

// v.79.0526: format Tempat, Tgl Lahir + pendidikan untuk display
const ttlFmt = computed(() => {
  const tp = props.guru?.tempat_lahir
  const tgl = props.guru?.tgl_lahir
  if (tp && tgl) return `${tp}, ${formatTanggal(tgl)}`
  if (tp) return tp
  if (tgl) return formatTanggal(tgl)
  return '-'
})
const pendidikanFmt = computed(() => {
  const p = props.guru?.pendidikan_terakhir
  const inst = props.guru?.nama_ijazah
  const thn = props.guru?.tahun_lulus
  if (p && inst) return `${p} — ${inst}${thn ? ` (${thn})` : ''}`
  if (p) return p
  return '-'
})

// v.79.0526: editForm state — copy field editable saja
const editForm = ref({})
function buildEditForm() {
  const g = props.guru || {}
  editForm.value = {
    nik: g.nik || '',
    tempat_lahir: g.tempat_lahir || '',
    tgl_lahir: g.tgl_lahir || '',
    email: g.email || '',
    pendidikan_terakhir: g.pendidikan_terakhir || '',
    nama_ijazah: g.nama_ijazah || '',
    tahun_lulus: g.tahun_lulus || '',
    alamat_dusun: g.alamat_dusun || '',
    alamat_rt: g.alamat_rt || '',
    alamat_rw: g.alamat_rw || '',
    alamat_desa: g.alamat_desa || '',
    alamat_kecamatan: g.alamat_kecamatan || '',
    alamat_kabupaten: g.alamat_kabupaten || '',
    alamat_provinsi: g.alamat_provinsi || ''
  }
}
watch(() => props.guru, buildEditForm, { immediate: true, deep: true })
watch(mode, (m) => { if (m === 'edit') buildEditForm() })

async function saveProfile() {
  if (!props.guru?.id) {
    toast.error('Guru ID tidak ditemukan')
    return
  }
  isSaving.value = true
  try {
    const ef = editForm.value
    await updateDoc(doc(db, 'guru', String(props.guru.id)), {
      nik: ef.nik,
      tempat_lahir: ef.tempat_lahir,
      tgl_lahir: ef.tgl_lahir,
      email: ef.email,
      pendidikan_terakhir: ef.pendidikan_terakhir,
      nama_ijazah: ef.nama_ijazah,
      tahun_lulus: ef.tahun_lulus,
      alamat_dusun: ef.alamat_dusun,
      alamat_rt: ef.alamat_rt,
      alamat_rw: ef.alamat_rw,
      alamat_desa: ef.alamat_desa,
      alamat_kecamatan: ef.alamat_kecamatan,
      alamat_kabupaten: ef.alamat_kabupaten,
      alamat_provinsi: ef.alamat_provinsi,
      updated_at: new Date().toISOString()
    })
    // v.86.0526 FIX: update objek guru lokal supaya view langsung reflect data baru.
    //   Sebelumnya view baca props.guru (di-load sekali di ProfilView, tak di-refresh) → tampak "kembali ke default".
    Object.assign(props.guru, {
      nik: ef.nik,
      tempat_lahir: ef.tempat_lahir,
      tgl_lahir: ef.tgl_lahir,
      email: ef.email,
      pendidikan_terakhir: ef.pendidikan_terakhir,
      nama_ijazah: ef.nama_ijazah,
      tahun_lulus: ef.tahun_lulus,
      alamat_dusun: ef.alamat_dusun,
      alamat_rt: ef.alamat_rt,
      alamat_rw: ef.alamat_rw,
      alamat_desa: ef.alamat_desa,
      alamat_kecamatan: ef.alamat_kecamatan,
      alamat_kabupaten: ef.alamat_kabupaten,
      alamat_provinsi: ef.alamat_provinsi
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
