<template>
  <div class="rb-backstage" role="dialog" aria-label="Menu File">
    <div class="rb-bs-rail">
      <button class="rb-bs-back" type="button" @click="$emit('close')">
        <RibbonIcon name="undo" :size="20" /> Kembali
      </button>
      <template v-for="(it, i) in rail" :key="i">
        <div v-if="it.sep" class="rb-bs-sep"></div>
        <button v-else class="rb-bs-item" :class="{ active: active === it.id }" type="button" @click="onRail(it)">
          <RibbonIcon :name="it.icon" :size="18" /> {{ it.label }}
        </button>
      </template>
    </div>

    <div class="rb-bs-main">
      <template v-if="active === 'info'">
        <h1>Info</h1>
        <div class="rb-bs-info">
          <div v-for="(r, i) in infoRows" :key="i" class="row"><b>{{ r[0] }}</b><span>{{ r[1] }}</span></div>
        </div>
      </template>

      <template v-else-if="active === 'tentang'">
        <h1>Tentang</h1>
        <div style="display: flex; gap: 18px; align-items: center; margin-bottom: 20px">
          <img :src="logoSrc" alt="" style="width: 72px; height: 72px; border-radius: 16px; background: #fff; padding: 6px" />
          <div>
            <div style="font-size: 22px; font-weight: 700; color: var(--rb-text)">Ammu Online</div>
            <div style="color: var(--rb-text-dim)">Sistem Manajemen {{ lembagaName }}</div>
          </div>
        </div>
        <p style="color: var(--rb-text-dim); max-width: 560px; line-height: 1.7">
          Versi desktop (Electron) dengan antarmuka pita ala perkantoran modern — akses cepat ke data santri, guru,
          rapor, keuangan, jadwal, dan kanal informasi dalam satu jendela.
        </p>
        <div class="rb-bs-info" style="margin-top: 18px; max-width: 420px">
          <div class="row"><b>Versi</b><span>{{ version }}</span></div>
          <div class="row"><b>Hak Cipta</b><span>© 2026 {{ lembagaName }}</span></div>
        </div>
      </template>

      <template v-else-if="active === 'printer'">
        <h1>Printer</h1>
        <p style="color: var(--rb-text-dim); max-width: 560px; line-height: 1.7">
          Atur printer default untuk cetak langsung struk POS (dot-matrix / thermal). Daftar printer
          diambil dari Windows. Penyetelan ukuran slip &amp; ESC/P ada di Keuangan → Buat Tagihan.
        </p>
        <div class="rb-bs-info" style="margin-top: 18px; max-width: 460px">
          <div class="row"><b>Printer Default</b><span>{{ defaultPrinterLabel }}</span></div>
          <div class="row"><b>Mode</b><span>{{ isDesktop ? 'Desktop (Windows)' : 'Web / HP' }}</span></div>
        </div>
        <button class="rb-bs-item" style="margin-top: 18px; max-width: 340px" type="button" @click="openPrinterSettings">
          <RibbonIcon name="printer" :size="18" /> Buka Pengaturan Printer
        </button>
        <p v-if="!isDesktop" style="color: var(--rb-text-dim); margin-top: 12px; font-size: 12px">
          Deteksi printer hanya tersedia di aplikasi Desktop (Windows).
        </p>
      </template>

      <template v-else>
        <h1>Selamat datang</h1>
        <div class="rb-bs-cards">
          <button v-for="(t, i) in welcomeTiles" :key="i" class="rb-bs-tile" type="button" @click="goAndClose(t.to)">
            <div class="ti"><RibbonIcon :name="t.icon" :size="22" /></div>
            <h4>{{ t.t }}</h4>
            <p>{{ t.p }}</p>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import RibbonIcon from './RibbonIcon.vue'
import { useAuthStore } from '@/stores/auth'
import { useSettingsStore } from '@/stores/settings'
import { getDefaultPrinter, isElectron } from '@/composables/useDesktopPrint'

const emit = defineEmits(['close'])
const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()

// T15: ringkasan printer di menu File; pengaturan lengkap dibuka via modal global (event)
const isDesktop = isElectron()
const defaultPrinterLabel = computed(() => getDefaultPrinter() || '(default sistem Windows)')
function openPrinterSettings() {
  emit('close')
  try {
    window.dispatchEvent(new CustomEvent('ammu:open-printer-settings'))
  } catch (e) {
    /* ignore */
  }
}

const active = ref('beranda')

const rail = computed(() => [
  { id: 'beranda', icon: 'home', label: 'Beranda', to: '/beranda' },
  { id: 'baru', icon: 'plus', label: 'Postingan Baru', to: '/posts' },
  { id: 'buka', icon: 'folder', label: 'Buka Arsip', to: '/posts' },
  { id: 'info', icon: 'info', label: 'Info' },
  { sep: true },
  { id: 'akun', icon: 'user', label: 'Akun', to: '/profil' },
  { id: 'pengaturan', icon: 'gear', label: 'Pengaturan', to: auth.isAdmin ? '/pengaturan-desktop' : '/profil' },
  { id: 'printer', icon: 'printer', label: 'Printer' }, // T15: Pengaturan Printer di menu File
  { id: 'tentang', icon: 'help', label: 'Tentang' },
  { id: 'keluar', icon: 'logout', label: 'Keluar', action: 'logout' }
])

const logoSrc = computed(() => settings.settings?.logoUrl || '/logo.png')
const lembagaName = computed(() => settings.settings?.namaLembaga || 'Pondok Pesantren Mambaul Ulum')
const version = computed(() => settings.settings?.appVersion || 'v.100.0626')
const userName = computed(() => auth.sesiAktif?.nama || auth.sesiAktif?.name || 'Pengguna')

const infoRows = computed(() => [
  ['Aplikasi', 'Ammu Online — Desktop'],
  ['Lembaga', lembagaName.value],
  ['Pengguna', userName.value],
  ['Versi', version.value + ' (Electron)'],
  ['Status', navigator.onLine ? 'Tersambung' : 'Luring']
])

const welcomeTiles = [
  { icon: 'edit', t: 'Buat Postingan', p: 'Tulis pengumuman / dokumentasi', to: '/posts' },
  { icon: 'users', t: 'Data Santri', p: 'Kelola data santri', to: '/santri' },
  { icon: 'chart-pie', t: 'Dasbor Statistik', p: 'Ringkasan pendidikan', to: '/statistik' },
  { icon: 'wallet', t: 'Keuangan', p: 'Tagihan, tabungan, buku induk', to: '/keuangan' },
  { icon: 'calendar', t: 'Kalender', p: 'Agenda kegiatan', to: '/kalender' },
  { icon: 'gear', t: 'Pengaturan', p: 'Konfigurasi aplikasi', to: auth.isAdmin ? '/pengaturan-web' : '/profil' }
]

function goAndClose(to) {
  emit('close')
  if (to) router.push(to)
}
async function onRail(it) {
  if (it.action === 'logout') {
    try {
      await auth.logout()
    } catch (e) {
      /* ignore */
    }
    emit('close')
    router.push('/login')
    return
  }
  if (it.id === 'info' || it.id === 'tentang' || it.id === 'printer') {
    active.value = it.id
    return
  }
  if (it.to) goAndClose(it.to)
}

function onEsc(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onEsc))
onBeforeUnmount(() => window.removeEventListener('keydown', onEsc))
</script>
