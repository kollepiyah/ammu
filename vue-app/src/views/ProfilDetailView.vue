<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-3">
    <BackButton />
    <div
      v-if="loading"
      class="bg-[var(--bg-card)] rounded-2xl p-8 border border-[var(--border-subtle)] text-center text-sm text-[var(--text-secondary)]"
    >
      <i class="fas fa-spinner fa-spin mr-2"></i>Memuat profil…
    </div>
    <div
      v-else-if="!rec"
      class="bg-[var(--bg-card)] rounded-2xl p-8 border border-dashed border-[var(--border-default)] text-center"
    >
      <i class="fas fa-user-slash text-3xl text-[var(--text-tertiary)] block mb-2"></i>
      <p class="text-sm text-[var(--text-secondary)]">Data tidak ditemukan.</p>
    </div>
    <template v-else>
      <!-- v.1.2.x (audit): profil hasil pencarian = readonly → tombol Edit/Kelola hilang.
           Full-access (super/admin) dapat pintasan ke Master Data ter-filter ke record ini
           (kartu tampil dgn Edit/Reset Sandi/Hapus/Non-aktifkan). SantriView/GuruView sudah
           baca ?q= + ?kelola=1. admin_keuangan dikecualikan (tak bisa tulis santri/guru RLS). -->
      <div v-if="bisaKelola" class="flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold transition cursor-pointer"
          title="Reset sandi ke 1234"
          @click="doReset"
        >
          <i class="fas fa-key"></i>Reset Sandi
        </button>
        <button
          type="button"
          :class="[
            'h-9 px-3 inline-flex items-center gap-1.5 rounded-xl text-white text-xs font-bold transition cursor-pointer',
            isAktif ? 'bg-slate-500 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-700'
          ]"
          @click="doToggle"
        >
          <i :class="['fas', isAktif ? 'fa-toggle-off' : 'fa-toggle-on']"></i
          >{{ isAktif ? 'Non-aktifkan' : 'Aktifkan' }}
        </button>
        <router-link
          :to="editLink"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition"
        >
          <i class="fas fa-edit"></i>Edit
        </router-link>
        <button
          type="button"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition cursor-pointer"
          @click="doDelete"
        >
          <i class="fas fa-trash"></i>Hapus
        </button>
        <router-link
          :to="kelolaLink"
          class="h-9 px-3 inline-flex items-center gap-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-[var(--text-primary)] text-xs font-bold transition"
          :title="`Buka ${tipe === 'guru' ? 'guru/pegawai' : 'santri'} ini di daftar Master Data`"
        >
          <i class="fas fa-list"></i>Master Data
        </router-link>
      </div>
      <ProfilGuru v-if="tipe === 'guru'" :guru="rec" readonly />
      <ProfilSantri v-else :santri="rec" readonly />

      <!-- Prestasi (santri) -->
      <div
        v-if="tipe === 'santri'"
        class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-[var(--border-subtle)] shadow-sm"
      >
        <h3
          class="text-xs font-black uppercase tracking-widest text-[var(--text-primary)] mb-3 pb-2 border-b border-[var(--border-subtle)] flex items-center gap-2"
        >
          <i class="fas fa-trophy text-amber-500"></i>Capaian Prestasi
        </h3>
        <div class="grid grid-cols-3 gap-2 text-center">
          <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
            <div class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Awal</div>
            <div class="text-lg font-black text-[var(--text-primary)]">
              {{ rec.prestasi_awal || '-' }}
            </div>
          </div>
          <div class="bg-[var(--bg-card-elevated)] rounded-xl p-3">
            <div class="text-[10px] text-[var(--text-secondary)] uppercase font-bold">Akhir</div>
            <div class="text-lg font-black text-[var(--text-primary)]">
              {{ rec.prestasi_akhir || '-' }}
            </div>
          </div>
          <div class="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
            <div class="text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">
              Total
            </div>
            <div class="text-lg font-black text-emerald-700 dark:text-emerald-300">
              {{ rec.prestasi_total || '-' }}
            </div>
          </div>
        </div>
        <p
          v-if="!rec.prestasi_awal && !rec.prestasi_akhir && !rec.prestasi_total"
          class="text-[11px] text-[var(--text-tertiary)] italic mt-3 text-center"
        >
          Belum ada data prestasi.
        </p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOne, deleteOne, mergeOne, updateOne } from '@/services/db'
import { resetUserPassword } from '@/services/authSupabase'
import { useAuthStore } from '@/stores/auth'
import { useConfirm } from '@/composables/useConfirm'
import { useToast } from '@/composables/useToast'
import { lembagaScopeMatches } from '@/composables/useLembaga'
import { isAdminKeuangan } from '@/utils/roleScope'
import { isGuruAktif } from '@/utils/guruScope'
import BackButton from '@/components/layout/BackButton.vue'
import ProfilSantri from '@/views/profil/ProfilSantri.vue'
import ProfilGuru from '@/views/profil/ProfilGuru.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const confirm = useConfirm()
const toast = useToast()
// audit A6: ConfirmDialog render message via v-html → escape nama/jabatan dinamis.
function escapeHtml(v) {
  return String(v ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  )
}
const tipe = computed(() => (route.params.tipe === 'guru' ? 'guru' : 'santri'))
const id = computed(() => String(route.params.id || ''))
const rec = ref(null)
const loading = ref(true)

// v.1.2.x (audit): boleh kelola master = super_admin/admin (bukan admin_keuangan — RLS
//   santri/guru tulis = auth_can_manage). Cermin useSantri.isFullAccess.
const bisaKelola = computed(() => {
  const s = auth.sesiAktif
  if (!s || !rec.value) return false
  if (isAdminKeuangan(s)) return false
  return s.role === 'admin' || s.id === 'admin' || ['super_admin', 'admin'].includes(s.role_sistem)
})
// Master Data ter-filter ke record ini (kartu tampil dgn Edit/Reset/Hapus/Toggle).
const kelolaLink = computed(() => {
  const r = rec.value || {}
  // status:'all' — record non-aktif pun tetap tampil di list (filterStatus default 'aktif').
  if (tipe.value === 'guru') {
    return { path: '/guru', query: { kelola: '1', q: String(r.nama || ''), status: 'all' } }
  }
  return {
    path: '/santri',
    query: { kelola: '1', q: String(r.nis || r.nama || ''), status: 'all' }
  }
})

// Status aktif (santri: boolean `aktif`; guru: string `status` via isGuruAktif).
const isAktif = computed(() => {
  const r = rec.value
  if (!r) return true
  return tipe.value === 'guru' ? isGuruAktif(r) : r.aktif !== false
})
const editLink = computed(() => `/${tipe.value}/${id.value}/edit?from=master`)

// --- Aksi cepat (identik dgn kartu Master Data SantriView/GuruView) ---
async function doReset() {
  const r = rec.value
  if (!r) return
  const ok = await confirm({
    title: `Reset sandi ${r.nama}?`,
    message: `Sandi ${tipe.value === 'guru' ? 'guru' : 'santri'} "${escapeHtml(r.nama)}" akan direset ke default: 1234. Perlu ganti sandi sendiri setelah login.`,
    confirmText: 'Reset',
    danger: true
  })
  if (!ok) return
  try {
    await resetUserPassword(tipe.value, r.id)
    toast.success(`Sandi ${r.nama} direset ke 1234`)
  } catch (e) {
    toast.error('Gagal reset: ' + (e.message || e))
  }
}
async function doToggle() {
  const r = rec.value
  if (!r) return
  if (tipe.value === 'guru') {
    const wasAktif = isGuruAktif(r)
    const newStatus = wasAktif ? 'Non-aktif' : 'Aktif'
    const ok = await confirm({
      title: `${wasAktif ? 'Non-aktifkan' : 'Aktifkan'} ${r.nama}?`,
      message: `Status guru "${escapeHtml(r.nama)}" akan di-set "${newStatus}".`,
      confirmText: wasAktif ? 'Non-aktifkan' : 'Aktifkan',
      danger: wasAktif
    })
    if (!ok) return
    try {
      await updateOne('guru', String(r.id), { status: newStatus })
      toast.success(`${r.nama} di-set ${newStatus}`)
      await load()
    } catch (e) {
      toast.error('Gagal: ' + (e.message || e))
    }
  } else {
    const newStatus = r.aktif === false
    const ok = await confirm({
      title: `${newStatus ? 'Aktifkan' : 'Non-aktifkan'} ${r.nama}?`,
      message: `Status santri "${escapeHtml(r.nama)}" akan di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}.`,
      confirmText: newStatus ? 'Aktifkan' : 'Non-aktifkan',
      danger: !newStatus
    })
    if (!ok) return
    try {
      await mergeOne('santri', String(r.id), { aktif: newStatus })
      toast.success(`${r.nama} di-set ${newStatus ? 'AKTIF' : 'TIDAK AKTIF'}`)
      await load()
    } catch (e) {
      toast.error('Gagal: ' + (e.message || e))
    }
  }
}
async function doDelete() {
  const r = rec.value
  if (!r) return
  const ok = await confirm({
    title: `Hapus ${r.nama}?`,
    message:
      tipe.value === 'guru'
        ? `Guru "${escapeHtml(r.nama)}" (${escapeHtml(r.jabatan || '-')}) akan dihapus permanen. Tidak bisa di-undo.`
        : `Santri "${escapeHtml(r.nama)}" (No. Induk: ${escapeHtml(r.nis || '-')}) akan dihapus permanen. Tidak bisa di-undo.`,
    confirmText: 'Hapus',
    danger: true
  })
  if (!ok) return
  try {
    await deleteOne(tipe.value, String(r.id))
    toast.success(`${tipe.value === 'guru' ? 'Guru' : 'Santri'} "${r.nama}" dihapus`)
    router.back()
  } catch (e) {
    toast.error('Gagal hapus: ' + (e.message || e))
  }
}

// v.98 ANTI-BOCOR: guard scope — cegah buka profil di luar wewenang (deep-link/search).
//  admin/super/admin_keuangan = bebas; guru = hanya ampuannya / dirinya; Kepala/PJ = se-lembaga.
function canView(tp, r) {
  const s = auth.sesiAktif
  if (!s || !r) return false
  if (
    s.role === 'admin' ||
    s.id === 'admin' ||
    ['super_admin', 'admin', 'admin_keuangan'].includes(s.role_sistem)
  )
    return true
  const myNama = String(s.guru || s.nama || '')
    .trim()
    .toLowerCase()
  const jab = String(s.jabatan || '').toLowerCase()
  const isKepala = /(^|\s)(kepala|pj|pengasuh)(\s|$)/.test(jab)
  if (tp === 'guru') {
    return (
      !!myNama &&
      String(r.nama || '')
        .trim()
        .toLowerCase() === myNama
    )
  }
  if (isKepala)
    return (
      lembagaScopeMatches(s.lembaga, r.lembaga) || lembagaScopeMatches(s.lembaga, r.lembaga_sekolah)
    )
  const gp = String(r.guru_pagi || '')
    .trim()
    .toLowerCase()
  const gs = String(r.guru_sore || '')
    .trim()
    .toLowerCase()
  const gOld = String(r.guru || '')
    .trim()
    .toLowerCase()
  const gsek = Array.isArray(r.guru_sekolah)
    ? r.guru_sekolah.map((x) =>
        String(x || '')
          .trim()
          .toLowerCase()
      )
    : []
  return (
    !!myNama &&
    (gp === myNama || gs === myNama || (gOld === myNama && !gp && !gs) || gsek.includes(myNama))
  )
}

async function load() {
  loading.value = true
  rec.value = null
  try {
    const r = await getOne(tipe.value, id.value)
    rec.value = canView(tipe.value, r) ? r : null
  } catch (e) {
    rec.value = null
  }
  loading.value = false
}
watch([tipe, id], load, { immediate: true })
</script>
