<template>
  <div class="rb-backstage" role="dialog" aria-label="Menu File">
    <div class="rb-bs-rail">
      <button class="rb-bs-back" type="button" @click="$emit('close')">
        <RibbonIcon name="undo" :size="20" /> Kembali
      </button>
      <template v-for="(it, i) in rail" :key="i">
        <div v-if="it.sep" class="rb-bs-sep"></div>
        <button
          v-else
          class="rb-bs-item"
          :class="{ active: active === it.id }"
          type="button"
          @click="onRail(it)"
        >
          <RibbonIcon :name="it.icon" :size="18" /> {{ it.label }}
        </button>
      </template>
    </div>

    <div class="rb-bs-main">
      <template v-if="active === 'info'">
        <h1>Info</h1>
        <div class="rb-bs-info">
          <div v-for="(r, i) in infoRows" :key="i" class="row">
            <b>{{ r[0] }}</b
            ><span>{{ r[1] }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="active === 'tentang'">
        <h1>Tentang</h1>
        <div style="display: flex; gap: 18px; align-items: center; margin-bottom: 20px">
          <img
            :src="logoSrc"
            alt=""
            style="width: 72px; height: 72px; border-radius: 16px; background: #fff; padding: 6px"
          />
          <div>
            <div style="font-size: 22px; font-weight: 700; color: var(--rb-text)">Ammu Online</div>
            <div style="color: var(--rb-text-dim)">Sistem Manajemen {{ lembagaName }}</div>
          </div>
        </div>
        <p style="color: var(--rb-text-dim); max-width: 560px; line-height: 1.7">
          Versi desktop (Electron) dengan antarmuka pita ala perkantoran modern — akses cepat ke
          data santri, guru, rapor, keuangan, jadwal, dan kanal informasi dalam satu jendela.
        </p>
        <div class="rb-bs-info" style="margin-top: 18px; max-width: 420px">
          <div class="row">
            <b>Versi</b><span>{{ version }}</span>
          </div>
          <div class="row">
            <b>Hak Cipta</b><span>© 2026 {{ lembagaName }}</span>
          </div>
        </div>
      </template>

      <template v-else-if="active === 'printer'">
        <h1>Printer</h1>
        <p style="color: var(--rb-text-dim); max-width: 560px; line-height: 1.7">
          Pilih printer default untuk cetak langsung struk/slip (dot-matrix / thermal). Daftar
          diambil langsung dari Windows. Penyetelan ukuran slip &amp; ESC/P ada di Keuangan → Buat
          Tagihan.
        </p>

        <template v-if="isDesktop">
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 10px;
              max-width: 560px;
              margin-top: 18px;
            "
          >
            <b style="color: var(--rb-text)">Printer Terdeteksi ({{ printers.length }})</b>
            <button
              class="rb-bs-item"
              style="width: auto; padding: 6px 12px"
              type="button"
              :disabled="loadingPrinters"
              @click="refreshPrinters"
            >
              <RibbonIcon name="refresh" :size="16" />
              {{ loadingPrinters ? 'Mendeteksi…' : 'Deteksi Ulang' }}
            </button>
          </div>

          <div
            style="
              max-width: 560px;
              margin-top: 10px;
              display: flex;
              flex-direction: column;
              gap: 8px;
            "
          >
            <button
              type="button"
              class="rb-bs-item"
              :style="printerItemStyle('')"
              @click="selectedPrinter = ''"
            >
              <RibbonIcon name="printer" :size="18" />
              <span style="flex: 1; text-align: left">(Printer default sistem Windows)</span>
              <span
                v-if="selectedPrinter === ''"
                style="font-size: 11px; font-weight: 700; color: var(--accent)"
                >✓ dipilih</span
              >
            </button>
            <button
              v-for="p in printers"
              :key="p.name"
              type="button"
              class="rb-bs-item"
              :style="printerItemStyle(p.name)"
              @click="selectedPrinter = p.name"
            >
              <RibbonIcon name="printer" :size="18" />
              <span style="flex: 1; text-align: left">
                {{ p.displayName || p.name }}
                <span v-if="p.isDefault" style="font-size: 11px; color: var(--rb-text-dim)">
                  — default Windows</span
                >
              </span>
              <span
                v-if="selectedPrinter === p.name"
                style="font-size: 11px; font-weight: 700; color: var(--accent)"
                >✓ dipilih</span
              >
            </button>
            <p
              v-if="!loadingPrinters && printers.length === 0"
              style="color: #d97706; font-size: 12px"
            >
              Tidak ada printer terdeteksi. Pastikan printer menyala &amp; terpasang di Windows,
              lalu klik "Deteksi Ulang".
            </p>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 16px; max-width: 560px">
            <button
              class="rb-bs-item"
              style="width: auto; padding: 8px 16px; background: var(--accent); color: #fff"
              type="button"
              @click="simpanPrinter"
            >
              <RibbonIcon name="save" :size="16" /> Simpan Default
            </button>
            <button
              class="rb-bs-item"
              style="width: auto; padding: 8px 16px"
              type="button"
              :disabled="testingPrint"
              @click="tesCetakPrinter"
            >
              <RibbonIcon name="printer" :size="16" />
              {{ testingPrint ? 'Mengirim…' : 'Tes Cetak' }}
            </button>
          </div>

          <div class="rb-bs-info" style="margin-top: 18px; max-width: 460px">
            <div class="row">
              <b>Default App</b><span>{{ defaultPrinterLabel }}</span>
            </div>
            <div class="row"><b>Mode</b><span>Desktop (Windows)</span></div>
          </div>
        </template>

        <p v-else style="color: var(--rb-text-dim); margin-top: 12px; font-size: 12px">
          Deteksi printer hanya tersedia di aplikasi Desktop (Windows).
        </p>
      </template>

      <template v-else>
        <h1>Selamat datang</h1>
        <div class="rb-bs-cards">
          <button
            v-for="(t, i) in welcomeTiles"
            :key="i"
            class="rb-bs-tile"
            type="button"
            @click="goAndClose(t.to)"
          >
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
import {
  listPrinters,
  getDefaultPrinter,
  setDefaultPrinter,
  isElectron,
  printRaw
} from '@/composables/useDesktopPrint'
import { buildStrukSlipEscpBase64 } from '@/utils/escpImage'
import { useToast } from '@/composables/useToast'

const emit = defineEmits(['close'])
const router = useRouter()
const auth = useAuthStore()
const settings = useSettingsStore()
const toast = useToast()

// v.100 Batch9 (T15 lanjutan): pengaturan printer PENUH langsung di backstage gaya Office —
//   deteksi printer Windows, pilih default app, tes cetak ESC/P (reuse useDesktopPrint, tanpa modal).
const isDesktop = isElectron()
const printers = ref([])
const selectedPrinter = ref(getDefaultPrinter())
const savedPrinter = ref(getDefaultPrinter())
const loadingPrinters = ref(false)
const testingPrint = ref(false)
const defaultPrinterLabel = computed(() => savedPrinter.value || '(default sistem Windows)')

async function refreshPrinters() {
  loadingPrinters.value = true
  try {
    printers.value = (await listPrinters()) || []
  } catch (e) {
    printers.value = []
  } finally {
    loadingPrinters.value = false
  }
}

function printerItemStyle(name) {
  const base = 'display:flex;align-items:center;gap:10px;'
  return selectedPrinter.value === name
    ? base +
        'border:1.5px solid var(--accent);background:color-mix(in srgb, var(--accent) 10%, transparent)'
    : base
}

function simpanPrinter() {
  setDefaultPrinter(selectedPrinter.value)
  savedPrinter.value = selectedPrinter.value
  toast.success(
    selectedPrinter.value
      ? 'Printer default: ' + selectedPrinter.value
      : 'Pakai printer default sistem'
  )
}

async function tesCetakPrinter() {
  testingPrint.value = true
  try {
    const now = new Date()
    const dummy = {
      santri_nama: 'TES CETAK STRUK',
      santri_nis: '-',
      tanggal: now.toISOString().slice(0, 10),
      no_struk: 'TEST-' + now.toTimeString().slice(0, 5).replace(':', ''),
      metode: 'TUNAI',
      operator: selectedPrinter.value || 'Printer',
      penyetor: '',
      terbilang: 'Seratus Ribu Rupiah',
      items: [{ jenis: 'Tes Cetak Struk', nominal: 100000, keterangan: '' }],
      total: 100000,
      bayar: 100000,
      kembali: 0
    }
    const s = settings.settings || {}
    const res = await printRaw({
      base64: buildStrukSlipEscpBase64(dummy, s),
      deviceName: selectedPrinter.value || undefined
    })
    if (res && res.ok === false) throw new Error(res.error || 'Print gagal')
    toast.success('Tes cetak terkirim ke printer')
  } catch (e) {
    toast.error('Gagal tes cetak: ' + (e?.message || e))
  } finally {
    testingPrint.value = false
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
  {
    id: 'pengaturan',
    icon: 'gear',
    label: 'Pengaturan',
    to: auth.isAdmin ? '/pengaturan-desktop' : '/profil'
  },
  { id: 'printer', icon: 'printer', label: 'Printer' }, // T15: Pengaturan Printer di menu File
  { id: 'tentang', icon: 'help', label: 'Tentang' },
  { id: 'keluar', icon: 'logout', label: 'Keluar', action: 'logout' }
])

const logoSrc = computed(() => settings.settings?.logoUrl || '/logo.png')
const lembagaName = computed(
  () => settings.settings?.namaLembaga || 'Pondok Pesantren Mambaul Ulum'
)
const version = computed(() => settings.settings?.appVersion || 'v.107.0626')
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
  {
    icon: 'gear',
    t: 'Pengaturan',
    p: 'Konfigurasi aplikasi',
    to: auth.isAdmin ? '/pengaturan-web' : '/profil'
  }
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
    if (it.id === 'printer' && isDesktop) refreshPrinters()
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
