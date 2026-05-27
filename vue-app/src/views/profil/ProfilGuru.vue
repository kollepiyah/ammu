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

      <!-- GRID DETAIL -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Jenis Kelamin:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ jkLabel }}</span>
            </li>
            <li class="flex justify-between gap-2">
              <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">No WhatsApp:</span>
              <span class="font-black text-slate-800 dark:text-slate-100 text-right">{{ guru?.wa || '-' }}</span>
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
              <span class="text-cyan-700 font-bold">Lembaga/Devisi:</span>
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
              <p class="text-[10px] text-teal-600 font-bold uppercase">No. Syahadah</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ guru?.ekgq || '-' }}</p>
            </div>
            <div class="bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100">
              <p class="text-[10px] text-teal-600 font-bold uppercase">ID Fingerprint</p>
              <p class="font-black text-slate-800 dark:text-slate-100 mt-1">{{ guru?.id_fingerprint || '-' }}</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-[10px] text-[var(--text-tertiary)] italic mt-4 text-center">
        <i class="fas fa-info-circle mr-1"></i>Untuk mengubah foto, sandi, atau no WA, klik avatar di
        kanan atas → Edit Profil.
      </p>
    </div>

    <!-- v.21.26.0526: Section Kaitkan Akun Google DIHAPUS — duplikat dgn card di Pengaturan Profil grid -->

    <ProfilPengaturanSaya role="guru" :entity-id="guru?.id" :entity="guru" />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getNamaGuruGelar, formatTanggal, hitungLamaMengajar } from '@/utils/format'
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'
import { linkGoogleAccount, unlinkGoogleAccount } from '@/services/auth'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'

const props = defineProps({
  guru: { type: Object, required: true }
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
const jabatanHeader = computed(
  () => `${props.guru?.jabatan || 'Pegawai'} - ${props.guru?.lembaga || '-'}`
)
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
</script>
