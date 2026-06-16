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
      <div v-if="isSuperAdmin" class="flex justify-end">
        <button v-if="!editPanduan" @click="mulaiEditPanduan" class="text-xs font-bold text-[var(--color-primary)] hover:underline"><i class="fas fa-pen mr-1"></i>Edit Panduan</button>
      </div>
      <template v-if="editPanduan">
        <div v-for="(p, i) in panduanDraft" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 space-y-2">
          <div class="flex items-center gap-2">
            <input v-model="p.q" class="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none" />
            <button @click="hapusPanduan(i)" class="text-rose-600 hover:text-rose-700 px-2" title="Hapus"><i class="fas fa-trash"></i></button>
          </div>
          <textarea v-model="p.stepsText" rows="4" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none resize-y"></textarea>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button @click="tambahPanduan" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"><i class="fas fa-plus mr-1"></i>Tambah</button>
          <button @click="simpanPanduan" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white"><i class="fas fa-save mr-1"></i>Simpan</button>
          <button @click="resetPanduan" class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Reset bawaan</button>
          <button @click="editPanduan = false" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]">Tutup</button>
        </div>
      </template>
      <template v-else>
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
      </template>
    </div>

    <!-- FAQ -->
    <div v-else-if="bagian === 'faq'" class="max-w-3xl space-y-2.5">
      <div v-if="isSuperAdmin" class="flex justify-end">
        <button v-if="!editFaq" @click="mulaiEditFaq" class="text-xs font-bold text-[var(--color-primary)] hover:underline"><i class="fas fa-pen mr-1"></i>Edit FAQ</button>
      </div>
      <template v-if="editFaq">
        <div v-for="(f, i) in faqDraft" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 space-y-2">
          <div class="flex items-center gap-2">
            <input v-model="f.q" class="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none" />
            <button @click="hapusFaq(i)" class="text-rose-600 hover:text-rose-700 px-2" title="Hapus"><i class="fas fa-trash"></i></button>
          </div>
          <textarea v-model="f.a" rows="3" class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none resize-y"></textarea>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button @click="tambahFaq" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"><i class="fas fa-plus mr-1"></i>Tambah</button>
          <button @click="simpanFaq" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white"><i class="fas fa-save mr-1"></i>Simpan</button>
          <button @click="resetFaq" class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Reset bawaan</button>
          <button @click="editFaq = false" class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]">Tutup</button>
        </div>
      </template>
      <template v-else>
        <div v-for="(f, i) in faq" :key="i" class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
          <button class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left" @click="toggle(i)">
            <span class="font-bold text-[var(--text-primary)]">{{ f.q }}</span>
            <i class="fas fa-chevron-down text-[var(--text-tertiary)] transition-transform" :class="{ 'rotate-180': open === i }"></i>
          </button>
          <div v-if="open === i" class="px-4 pb-4 -mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">{{ f.a }}</div>
        </div>
      </template>
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

    <!-- v.99: Modal Hubungi Admin (popup detail + edit kontak super_admin) -->
    <div v-if="showKontakModal" class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4" @click.self="showKontakModal = false">
      <div class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-sm w-full border-t-8 border-[var(--color-primary)]">
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-base font-black text-[var(--text-primary)]"><i class="fas fa-headset text-[var(--color-primary)] mr-2"></i>Hubungi Admin</h3>
          <button @click="showKontakModal = false" class="text-[var(--text-tertiary)] hover:text-rose-500 text-xl"><i class="fas fa-times"></i></button>
        </div>
        <div v-if="!editKontak" class="p-5 space-y-3">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full grid place-items-center text-[var(--color-primary)]" style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)"><i class="fas fa-user-tie text-xl"></i></div>
            <div>
              <div class="text-base font-black text-[var(--text-primary)]">{{ AUTHOR.nama }}</div>
              <div class="text-xs text-[var(--text-secondary)]">{{ AUTHOR.org }}</div>
            </div>
          </div>
          <a :href="waLink" target="_blank" class="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm"><i class="fab fa-whatsapp text-lg"></i>WhatsApp: {{ AUTHOR.wa }}</a>
          <button v-if="isSuperAdmin" @click="mulaiEditKontak" class="w-full text-xs font-bold text-[var(--color-primary)] hover:underline"><i class="fas fa-pen mr-1"></i>Edit kontak admin</button>
        </div>
        <div v-else class="p-5 space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Nama</label>
            <input v-model="kontakDraft.nama" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">No. WhatsApp</label>
            <input v-model="kontakDraft.wa" type="tel" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1">Organisasi</label>
            <input v-model="kontakDraft.org" type="text" class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <div class="flex gap-2 justify-end pt-1">
            <button @click="editKontak = false" class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--bg-muted)]">Batal</button>
            <button @click="simpanKontak" class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] text-white"><i class="fas fa-save mr-1"></i>Simpan</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useDesktopShell } from '@/composables/useDesktopShell'

const route = useRoute()
const router = useRouter()
const settings = useSettingsStore()
const toast = useToast()

const auth = useAuthStore()
const isSuperAdmin = computed(() => auth.sesiAktif?.role_sistem === 'super_admin')

// v.99: kontak admin dari settings (editable/ACF) — fallback ke default.
const DEFAULT_AUTHOR = { nama: 'Rahman Fanani', wa: '085331172477', org: 'Bakafrawi Project' }
const AUTHOR = computed(() => ({
  nama: settings.settings?.adminNama || DEFAULT_AUTHOR.nama,
  wa: settings.settings?.adminWa || DEFAULT_AUTHOR.wa,
  org: settings.settings?.adminOrg || DEFAULT_AUTHOR.org
}))
const waLink = computed(() => 'https://wa.me/' + String(AUTHOR.value.wa || '').replace(/\D/g, '').replace(/^0/, '62'))

// v.99: Hubungi Admin → POPUP modal (bukan toast)
const showKontakModal = ref(false)
function showKontak() { showKontakModal.value = true }

// v.99: edit kontak admin (super_admin) → simpan ke settings
const editKontak = ref(false)
const kontakDraft = reactive({ nama: '', wa: '', org: '' })
function mulaiEditKontak() {
  kontakDraft.nama = AUTHOR.value.nama
  kontakDraft.wa = AUTHOR.value.wa
  kontakDraft.org = AUTHOR.value.org
  editKontak.value = true
}
async function _saveSettings(patch) {
  await setDoc(doc(db, 'settings', 'general'), patch, { merge: true })
  await setDoc(doc(db, 'settings', 'web'), patch, { merge: true })
}
async function simpanKontak() {
  try {
    await _saveSettings({ adminNama: kontakDraft.nama.trim(), adminWa: kontakDraft.wa.trim(), adminOrg: kontakDraft.org.trim() })
    toast.success('Kontak admin tersimpan')
    editKontak.value = false
  } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
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
const version = computed(() => settings.settings?.appVersion || 'v.102.0626')
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
// v.99: buka popup kontak admin via query ?kontak=1 (dari pita Bantuan)
watch(() => route.query.kontak, (v) => { if (v) showKontakModal.value = true }, { immediate: true })
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

const DEFAULT_PANDUAN = [
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

const panduan = computed(() =>
  Array.isArray(settings.settings?.bantuanPanduan) && settings.settings.bantuanPanduan.length
    ? settings.settings.bantuanPanduan
    : DEFAULT_PANDUAN
)

const DEFAULT_FAQ = [
  { q: 'Kata sandi default akun baru apa?', a: 'Akun baru memakai kata sandi default "1234". Pengguna disarankan segera menggantinya lewat menu Personal → Profil Saya.' },
  { q: 'Kenapa beberapa menu tidak muncul untuk saya?', a: 'Menu menyesuaikan peran (RBAC). Misalnya menu Keuangan hanya untuk admin keuangan/super admin, dan Master Data hanya untuk super admin.' },
  { q: 'Bagaimana mengganti tema gelap/terang?', a: 'Klik ikon bulan/matahari di bagian atas aplikasi. Di versi desktop juga tersedia tombol "Tema" pada pita Home → Tampilan.' },
  { q: 'Tabungan tidak masuk ke Buku Induk, apakah normal?', a: 'Ya. Tabungan santri terpisah dari kas pondok, jadi memang tidak ikut dihitung di Buku Induk maupun dasbor keuangan.' },
  { q: 'Cetak slip/struk tidak keluar di printer dot-matrix?', a: 'Gunakan menu cetak struk (ESC/P) di POS, bukan "Struk PDF". Pastikan printer dot-matrix terpilih sebagai printer default.' }
]

const faq = computed(() =>
  Array.isArray(settings.settings?.bantuanFaq) && settings.settings.bantuanFaq.length
    ? settings.settings.bantuanFaq
    : DEFAULT_FAQ
)

// v.99: ACF editor Panduan + FAQ (super_admin) → simpan ke settings
const editPanduan = ref(false)
const panduanDraft = ref([])
function mulaiEditPanduan() {
  panduanDraft.value = panduan.value.map((p) => ({ q: p.q, icon: p.icon || 'fa-circle-info', stepsText: (p.steps || []).join('\n') }))
  editPanduan.value = true
}
function tambahPanduan() { panduanDraft.value.push({ q: '', icon: 'fa-circle-info', stepsText: '' }) }
function hapusPanduan(i) { panduanDraft.value.splice(i, 1) }
async function simpanPanduan() {
  const arr = panduanDraft.value
    .map((p) => ({ q: String(p.q || '').trim(), icon: p.icon || 'fa-circle-info', steps: String(p.stepsText || '').split('\n').map((s) => s.trim()).filter(Boolean) }))
    .filter((p) => p.q)
  try { await _saveSettings({ bantuanPanduan: arr }); toast.success('Panduan tersimpan'); editPanduan.value = false } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}
async function resetPanduan() {
  try { await _saveSettings({ bantuanPanduan: [] }); toast.success('Panduan dikembalikan ke bawaan'); editPanduan.value = false } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}
const editFaq = ref(false)
const faqDraft = ref([])
function mulaiEditFaq() { faqDraft.value = faq.value.map((f) => ({ q: f.q, a: f.a })); editFaq.value = true }
function tambahFaq() { faqDraft.value.push({ q: '', a: '' }) }
function hapusFaq(i) { faqDraft.value.splice(i, 1) }
async function simpanFaq() {
  const arr = faqDraft.value.map((f) => ({ q: String(f.q || '').trim(), a: String(f.a || '').trim() })).filter((f) => f.q)
  try { await _saveSettings({ bantuanFaq: arr }); toast.success('FAQ tersimpan'); editFaq.value = false } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}
async function resetFaq() {
  try { await _saveSettings({ bantuanFaq: [] }); toast.success('FAQ dikembalikan ke bawaan'); editFaq.value = false } catch (e) { toast.error('Gagal: ' + (e.message || e)) }
}

const rilis = [
  { versi: 'v.98', tgl: 'Juni 2026', items: ['Antarmuka desktop bergaya Ribbon (Office/Windows 11).', 'Dasbor Home: statistik pendidikan + keuangan.', 'Tema gelap konsisten (palet slate).', 'Filter lembaga (Qiraati + Sekolah) jadi dropdown di Data Santri & Guru.', 'Pusat Bantuan kini tersedia di web & Android.', 'Perapian tanda tangan rapor & info kontak admin.'] },
  { versi: 'v.97', tgl: 'Juni 2026', items: ['Bisyaroh metode BMT/Cash + ekspor Laporan BMT.', 'Integrasi VA BMT PETA (kerangka).'] },
  { versi: 'v.95', tgl: 'Juni 2026', items: ['Generate tagihan khusus/infaq.', 'FCM push notification (Android).', 'Struk dot-matrix 9.5×11 (ESC/P raster).'] }
]
</script>
