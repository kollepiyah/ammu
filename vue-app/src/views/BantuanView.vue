<template>
  <div class="p-5 md:p-7 w-full">
    <div class="mb-4">
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
        <i class="fas fa-circle-question text-[var(--color-primary)]"></i> Pusat Bantuan
      </h1>
      <p class="text-sm text-[var(--text-secondary)] mt-1">Panduan, informasi, dan kontak Ammu Online.</p>
    </div>

    <!-- Navigasi bagian -->
    <div class="flex flex-wrap gap-2 mb-5">
      <button
        v-for="s in sections"
        :key="s.id"
        class="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition"
        :class="bagian === s.id
          ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
          : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--color-primary)]'"
        @click="goBagian(s.id)"
      >
        <i :class="['fas', s.icon, 'mr-1.5', 'text-xs']"></i>{{ s.label }}
      </button>
    </div>

    <!-- BERANDA -->
    <div v-if="bagian === 'beranda'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      <button
        v-for="c in homeCards"
        :key="c.id"
        class="text-left bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm transition hover:border-[var(--color-primary)] hover:shadow-md"
        @click="c.kontak ? showKontak() : (c.to ? go(c.to) : goBagian(c.id))"
      >
        <div class="w-11 h-11 rounded-xl grid place-items-center mb-3 text-[var(--color-primary)]" style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)">
          <i :class="['fas', c.icon, 'text-lg']"></i>
        </div>
        <h4 class="text-[15px] font-bold text-[var(--text-primary)]">{{ c.title }}</h4>
        <p class="text-[12.5px] text-[var(--text-secondary)] mt-1 leading-relaxed">{{ c.desc }}</p>
      </button>
    </div>

    <!-- PANDUAN -->
    <div v-else-if="bagian === 'panduan'" class="max-w-3xl space-y-2.5">
      <div v-for="(p, i) in panduan" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <button class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left" @click="toggle(i)">
          <span class="font-bold text-[var(--text-primary)] flex items-center gap-2"><i :class="['fas', p.icon, 'text-[var(--color-primary)]']"></i>{{ p.q }}</span>
          <i class="fas fa-chevron-down text-[var(--text-tertiary)] transition-transform" :class="{ 'rotate-180': open === i }"></i>
        </button>
        <div v-if="open === i" class="px-4 pb-4 -mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">
          <ol class="list-decimal ml-5 space-y-1">
            <li v-for="(step, j) in p.steps" :key="j">{{ step }}</li>
          </ol>
        </div>
      </div>
    </div>

    <!-- FAQ -->
    <div v-else-if="bagian === 'faq'" class="max-w-3xl space-y-2.5">
      <div v-for="(f, i) in faq" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <button class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left" @click="toggle(i)">
          <span class="font-bold text-[var(--text-primary)]">{{ f.q }}</span>
          <i class="fas fa-chevron-down text-[var(--text-tertiary)] transition-transform" :class="{ 'rotate-180': open === i }"></i>
        </button>
        <div v-if="open === i" class="px-4 pb-4 -mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">{{ f.a }}</div>
      </div>
    </div>

    <!-- TENTANG -->
    <div v-else-if="bagian === 'tentang'" class="max-w-2xl">
      <div class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm">
        <div class="flex items-center gap-4 mb-4">
          <img :src="logoSrc" alt="" class="w-16 h-16 rounded-2xl bg-white p-1.5 object-contain border border-[var(--border-subtle)]" />
          <div>
            <div class="text-lg font-black text-[var(--text-primary)]">Ammu Online — {{ platformName }}</div>
            <div class="text-sm text-[var(--text-secondary)]">Sistem Manajemen {{ lembagaName }}</div>
          </div>
        </div>
        <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{{ introText }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Versi</span><span class="font-semibold">{{ version }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Lembaga</span><span class="font-semibold">{{ lembagaName }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Platform</span><span class="font-semibold">{{ platformDetail }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Hak Cipta</span><span class="font-semibold">© 2026 {{ lembagaName }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Author</span><span class="font-semibold">{{ AUTHOR.nama }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Kontak</span><span class="font-semibold">WA: {{ AUTHOR.wa }}</span></div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2"><span class="text-[var(--text-secondary)]">Organization</span><span class="font-semibold">{{ AUTHOR.org }}</span></div>
        </div>
      </div>
    </div>

    <!-- CATATAN RILIS -->
    <div v-else-if="bagian === 'rilis'" class="max-w-3xl space-y-3">
      <div v-for="(r, i) in rilis" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="text-xs font-black px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">{{ r.versi }}</span>
          <span class="text-xs text-[var(--text-tertiary)]">{{ r.tgl }}</span>
        </div>
        <ul class="list-disc ml-5 text-sm text-[var(--text-secondary)] space-y-1">
          <li v-for="(item, j) in r.items" :key="j">{{ item }}</li>
        </ul>
      </div>
    </div>

    <!-- LISENSI -->
    <div v-else-if="bagian === 'lisensi'" class="max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm text-sm text-[var(--text-secondary)] leading-relaxed">
      <h3 class="text-base font-bold text-[var(--text-primary)] mb-2">Lisensi Penggunaan</h3>
      <p>Aplikasi ini untuk penggunaan internal {{ lembagaName }}. Dilarang menggandakan, mendistribusikan, atau memodifikasi tanpa izin pengelola pondok. Seluruh data santri, guru, dan keuangan bersifat rahasia dan menjadi tanggung jawab pengguna yang diberi akses.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useDesktopShell } from '@/composables/useDesktopShell'

const route = useRoute()
const router = useRouter()
const settings = useSettingsStore()
const toast = useToast()

// v.97.0626: info author/kontak (dipakai kartu "Hubungi Admin" + bagian Tentang)
const AUTHOR = { nama: 'Rahman Fanani', wa: '085331172477', org: 'Bakafrawi Project' }
function showKontak() {
  toast.info(`Hubungi Admin — ${AUTHOR.nama} · WA: ${AUTHOR.wa} (${AUTHOR.org})`, 8000)
}

// v.98.0626: Bantuan tampil di SEMUA platform (Electron/Android/Web) — konten menyesuaikan.
const { isElectron } = useDesktopShell()
const isAndroid = (() => {
  try { return !!(typeof window !== 'undefined' && window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform()) } catch (e) { return false }
})()
const platformName = computed(() => (isElectron.value ? 'Desktop' : isAndroid ? 'Android' : 'Web'))
const platformDetail = computed(() => (isElectron.value ? 'Windows (Electron)' : isAndroid ? 'Android (aplikasi)' : 'Web (Browser / PWA)'))
const introText = computed(() =>
  isElectron.value
    ? 'Versi desktop (Electron) dengan antarmuka pita ala perkantoran modern — akses cepat ke data santri, guru, rapor, keuangan, jadwal, dan kanal informasi dalam satu jendela.'
    : isAndroid
      ? 'Versi aplikasi Android — akses data santri, guru, rapor, keuangan, jadwal, dan kanal informasi langsung dari ponsel, lengkap dengan notifikasi.'
      : 'Versi web (browser / PWA) — akses dari mana saja lewat peramban, dengan fitur yang sama seperti aplikasi.'
)

const lembagaName = computed(() => settings.settings?.namaLembaga || 'Pondok Pesantren Mambaul Ulum')
const version = computed(() => settings.settings?.appVersion || 'v.98.0626')
const logoSrc = computed(() => settings.settings?.logoUrl || '/logo.png')

const sections = [
  { id: 'beranda', label: 'Beranda', icon: 'fa-house' },
  { id: 'panduan', label: 'Panduan', icon: 'fa-book' },
  { id: 'faq', label: 'FAQ', icon: 'fa-circle-question' },
  { id: 'tentang', label: 'Tentang', icon: 'fa-circle-info' },
  { id: 'rilis', label: 'Catatan Rilis', icon: 'fa-clipboard-list' },
  { id: 'lisensi', label: 'Lisensi', icon: 'fa-shield-halved' }
]
const bagian = ref('beranda')
// v.97.0626: deklarasi `open` HARUS sebelum watch immediate di bawah (callback akses open.value
// sinkron saat setup -> kalau dideklarasi setelah watch = TDZ "Cannot access 'd' before init").
const open = ref(-1)
watch(
  () => route.query.bagian,
  (v) => {
    const id = String(v || 'beranda')
    bagian.value = sections.some((s) => s.id === id) ? id : 'beranda'
    open.value = -1
  },
  { immediate: true }
)
function goBagian(id) {
  router.replace({ path: '/bantuan', query: id === 'beranda' ? {} : { bagian: id } })
}
function go(to) {
  router.push(to)
}

function toggle(i) {
  open.value = open.value === i ? -1 : i
}

const homeCards = [
  { id: 'panduan', icon: 'fa-book', title: 'Panduan Pengguna', desc: 'Langkah pemakaian fitur utama: data santri, rapor, dan keuangan.' },
  { id: 'faq', icon: 'fa-circle-question', title: 'Pertanyaan Umum (FAQ)', desc: 'Jawaban atas pertanyaan yang sering diajukan pengguna.' },
  { id: 'tentang', icon: 'fa-circle-info', title: 'Tentang Aplikasi', desc: 'Informasi versi, lembaga, dan platform aplikasi.' },
  { id: 'rilis', icon: 'fa-clipboard-list', title: 'Catatan Rilis', desc: 'Ringkasan perubahan dan fitur baru tiap versi.' },
  { title: 'Hubungi Admin', icon: 'fa-headset', desc: 'Tampilkan kontak admin/pembuat aplikasi (WA).', kontak: true },
  { title: 'Lapor Bug', icon: 'fa-bug', desc: 'Laporkan kendala atau galat yang Anda temui.', to: '/kritik-saran' }
]

const panduan = [
  {
    icon: 'fa-users',
    q: 'Mengelola Data Santri',
    steps: [
      'Buka menu Pendidikan → Data Santri.',
      'Gunakan kotak cari atau dropdown lembaga (Qiraati / Sekolah) untuk menyaring.',
      'Klik kartu santri untuk melihat profil; klik "Kelola" untuk tambah/ubah (khusus super admin).',
      'Filter "status tempat" untuk memisah santri Ma\'had (mukim) dan Pulang-Pergi.'
    ]
  },
  {
    icon: 'fa-graduation-cap',
    q: 'Input Nilai & Cetak Rapor',
    steps: [
      'Menu Pendidikan → Nilai / Rapor (atau Rekap Nilai untuk input bulanan).',
      'Pilih lembaga, kelas, dan semester.',
      'Isi nilai per santri, lalu simpan.',
      'Buka Cetak Rapor → pilih kelas → cetak (Save as PDF / printer).'
    ]
  },
  {
    icon: 'fa-chalkboard-teacher',
    q: 'Menugaskan Guru ke Santri (Kelas)',
    steps: [
      'Menu Pendidikan → Kelas (Guru-Santri).',
      'Pilih kategori (Ngaji/Sekolah) → lembaga → guru (+shift untuk ngaji).',
      'Centang santri yang diampu guru tersebut, lalu simpan.'
    ]
  },
  {
    icon: 'fa-cash-register',
    q: 'Transaksi Keuangan (POS & Tagihan)',
    steps: [
      'Menu Keuangan → POS Santri untuk transaksi cepat pembayaran.',
      'Tagihan Aktif untuk melihat & membuat tagihan.',
      'Verifikasi Bayar untuk menyetujui bukti transfer wali.',
      'Buku Induk & Laporan untuk rekap kas pondok.'
    ]
  }
]

const faq = [
  { q: 'Kata sandi default akun baru apa?', a: 'Akun baru memakai kata sandi default "1234". Pengguna disarankan segera menggantinya lewat menu Personal → Profil Saya.' },
  { q: 'Kenapa beberapa menu tidak muncul untuk saya?', a: 'Menu menyesuaikan peran (RBAC). Misalnya menu Keuangan hanya untuk admin keuangan/super admin, dan Master Data hanya untuk super admin.' },
  { q: 'Bagaimana mengganti tema gelap/terang?', a: 'Klik ikon bulan/matahari di bagian atas aplikasi. Di versi desktop juga tersedia tombol "Tema" pada pita Home → Tampilan.' },
  { q: 'Tabungan tidak masuk ke Buku Induk, apakah normal?', a: 'Ya. Tabungan santri terpisah dari kas pondok, jadi memang tidak ikut dihitung di Buku Induk maupun dasbor keuangan.' },
  { q: 'Cetak slip/struk tidak keluar di printer dot-matrix?', a: 'Gunakan menu cetak struk (ESC/P) di POS, bukan "Struk PDF". Pastikan printer dot-matrix terpilih sebagai printer default.' }
]

const rilis = [
  { versi: 'v.98', tgl: 'Juni 2026', items: ['Antarmuka desktop bergaya Ribbon (Office/Windows 11).', 'Dasbor Home: statistik pendidikan + keuangan.', 'Tema gelap konsisten (palet slate).', 'Filter lembaga (Qiraati + Sekolah) jadi dropdown di Data Santri & Guru.', 'Pusat Bantuan kini tersedia di web & Android.', 'Perapian tanda tangan rapor & info kontak admin.'] },
  { versi: 'v.97', tgl: 'Juni 2026', items: ['Bisyaroh metode BMT/Cash + ekspor Laporan BMT.', 'Integrasi VA BMT PETA (kerangka).'] },
  { versi: 'v.95', tgl: 'Juni 2026', items: ['Generate tagihan khusus/infaq.', 'FCM push notification (Android).', 'Struk dot-matrix 9.5×11 (ESC/P raster).'] }
]
</script>
