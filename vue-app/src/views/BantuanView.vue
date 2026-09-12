<template>
  <div class="p-5 md:p-7 w-full">
    <div class="mb-4">
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
        <i class="fas fa-circle-question text-[var(--color-primary)]"></i> Pusat Bantuan
      </h1>
      <p class="text-sm text-[var(--text-secondary)] mt-1">
        Panduan, informasi, dan kontak Ammu Online.
      </p>
    </div>

    <!-- Navigasi bagian -->
    <div class="flex flex-wrap gap-2 mb-5">
      <button
        v-for="s in sections"
        :key="s.id"
        class="px-3.5 py-1.5 rounded-full text-sm font-semibold border transition"
        :class="
          bagian === s.id
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'bg-[var(--bg-card)] text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--color-primary)]'
        "
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
        @click="c.kontak ? showKontak() : c.to ? go(c.to) : goBagian(c.id)"
      >
        <div
          class="w-11 h-11 rounded-xl grid place-items-center mb-3 text-[var(--color-primary)]"
          style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)"
        >
          <i :class="['fas', c.icon, 'text-lg']"></i>
        </div>
        <h4 class="text-[15px] font-bold text-[var(--text-primary)]">{{ c.title }}</h4>
        <p class="text-[12.5px] text-[var(--text-secondary)] mt-1 leading-relaxed">{{ c.desc }}</p>
      </button>
    </div>

    <!-- PANDUAN -->
    <div v-else-if="bagian === 'panduan'" class="max-w-3xl space-y-2.5">
      <div v-if="isSuperAdmin" class="flex justify-end">
        <button
          v-if="!editPanduan"
          class="text-xs font-bold text-[var(--color-primary)] hover:underline"
          @click="mulaiEditPanduan"
        >
          <i class="fas fa-pen mr-1"></i>Edit Panduan
        </button>
      </div>
      <template v-if="editPanduan">
        <div
          v-for="(p, i) in panduanDraft"
          :key="i"
          class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 space-y-2"
        >
          <div class="flex items-center gap-2">
            <input
              v-model="p.q"
              class="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none"
            />
            <button
              class="text-rose-600 hover:text-rose-700 px-2"
              title="Hapus"
              @click="hapusPanduan(i)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <textarea
            v-model="p.stepsText"
            rows="4"
            class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none resize-y"
          ></textarea>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"
            @click="tambahPanduan"
          >
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            @click="simpanPanduan"
          >
            <i class="fas fa-save mr-1"></i>Simpan
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
            @click="resetPanduan"
          >
            Reset bawaan
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"
            @click="editPanduan = false"
          >
            Tutup
          </button>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(p, i) in panduan"
          :key="i"
          class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
            @click="toggle(i)"
          >
            <span class="font-bold text-[var(--text-primary)] flex items-center gap-2"
              ><i :class="['fas', p.icon, 'text-[var(--color-primary)]']"></i>{{ p.q }}</span
            >
            <i
              class="fas fa-chevron-down text-[var(--text-tertiary)] transition-transform"
              :class="{ 'rotate-180': open === i }"
            ></i>
          </button>
          <div
            v-if="open === i"
            class="px-4 pb-4 -mt-1 text-sm text-[var(--text-secondary)] leading-relaxed"
          >
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
        <button
          v-if="!editFaq"
          class="text-xs font-bold text-[var(--color-primary)] hover:underline"
          @click="mulaiEditFaq"
        >
          <i class="fas fa-pen mr-1"></i>Edit FAQ
        </button>
      </div>
      <template v-if="editFaq">
        <div
          v-for="(f, i) in faqDraft"
          :key="i"
          class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 space-y-2"
        >
          <div class="flex items-center gap-2">
            <input
              v-model="f.q"
              class="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none"
            />
            <button
              class="text-rose-600 hover:text-rose-700 px-2"
              title="Hapus"
              @click="hapusFaq(i)"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
          <textarea
            v-model="f.a"
            rows="3"
            class="w-full px-3 py-2 text-sm rounded-lg border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none resize-y"
          ></textarea>
        </div>
        <div class="flex gap-2 flex-wrap">
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"
            @click="tambahFaq"
          >
            <i class="fas fa-plus mr-1"></i>Tambah
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--color-primary)] text-white"
            @click="simpanFaq"
          >
            <i class="fas fa-save mr-1"></i>Simpan
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
            @click="resetFaq"
          >
            Reset bawaan
          </button>
          <button
            class="text-xs font-bold px-3 py-2 rounded-lg bg-[var(--bg-muted)]"
            @click="editFaq = false"
          >
            Tutup
          </button>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(f, i) in faq"
          :key="i"
          class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
            @click="toggle(i)"
          >
            <span class="font-bold text-[var(--text-primary)]">{{ f.q }}</span>
            <i
              class="fas fa-chevron-down text-[var(--text-tertiary)] transition-transform"
              :class="{ 'rotate-180': open === i }"
            ></i>
          </button>
          <div
            v-if="open === i"
            class="px-4 pb-4 -mt-1 text-sm text-[var(--text-secondary)] leading-relaxed"
          >
            {{ f.a }}
          </div>
        </div>
      </template>
    </div>

    <!-- TENTANG -->
    <div v-else-if="bagian === 'tentang'" class="max-w-2xl">
      <div
        class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm"
      >
        <div class="flex items-center gap-4 mb-4">
          <img
            :src="logoSrc"
            alt=""
            class="w-16 h-16 rounded-2xl bg-white p-1.5 object-contain border border-[var(--border-subtle)]"
          />
          <div>
            <div class="text-lg font-black text-[var(--text-primary)]">
              Ammu Online — {{ platformName }}
            </div>
            <div class="text-sm text-[var(--text-secondary)]">
              Sistem Manajemen {{ lembagaName }}
            </div>
          </div>
        </div>
        <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{{ introText }}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Versi</span
            ><span class="font-semibold">{{ version }}</span>
          </div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Lembaga</span
            ><span class="font-semibold">{{ lembagaName }}</span>
          </div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Platform</span
            ><span class="font-semibold">{{ platformDetail }}</span>
          </div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Hak Cipta</span
            ><span class="font-semibold">© 2026 {{ lembagaName }}</span>
          </div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Author</span
            ><span class="font-semibold">{{ AUTHOR.nama }}</span>
          </div>
          <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
            <span class="text-[var(--text-secondary)]">Kontak</span
            ><span class="font-semibold">WA: {{ AUTHOR.wa }}</span>
          </div>
          <div
            v-if="AUTHOR.org && AUTHOR.org !== AUTHOR.nama"
            class="flex justify-between border-b border-[var(--border-subtle)] py-2"
          >
            <span class="text-[var(--text-secondary)]">Organization</span
            ><span class="font-semibold">{{ AUTHOR.org }}</span>
          </div>
        </div>

        <!-- v.1.4.0 (Kyai 3 Sep 2026): "matikan notif pembaruan untuk android, cukup
             update via playstore saja." Tombol "Cek Pembaruan" + "Unduh APK" + "Semua
             versi" (GitHub Releases) DIGANTI satu tautan Play Store. Jalur APK ditutup
             karena berdampingan dengan Play ia justru menjebak: APK yang beda tanda
             tangan tak bisa memasang menimpa aplikasi dari Play, dan itu baru ketahuan
             sesudah pengguna mengunduh. -->
        <div class="mt-5 pt-4 border-t border-[var(--border-subtle)]">
          <p class="text-sm font-bold text-[var(--text-primary)] mb-1">
            <i class="fab fa-android text-emerald-600 mr-1"></i>Aplikasi Android
          </p>
          <p class="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
            <template v-if="isAndroid">
              Pembaruan datang sendiri lewat Google Play. Kalau ingin memeriksa lebih awal, buka
              halaman aplikasi di Play Store lalu tekan Perbarui bila tersedia.
            </template>
            <template v-else>
              Aplikasi Android dipasang dan diperbarui lewat Google Play Store.
            </template>
          </p>
          <div class="flex flex-wrap gap-2">
            <a
              :href="URL_PLAYSTORE"
              target="_blank"
              rel="noopener"
              class="text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg transition"
            >
              <i class="fab fa-google-play mr-1"></i>Buka Play Store
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- CATATAN RILIS -->
    <div v-else-if="bagian === 'rilis'" class="max-w-3xl space-y-3">
      <div
        v-for="(r, i) in rilis"
        :key="i"
        class="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-sm"
      >
        <div class="flex items-center gap-2 mb-1.5">
          <span
            class="text-xs font-black px-2 py-0.5 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
            >{{ r.versi }}</span
          >
          <span class="text-xs text-[var(--text-tertiary)]">{{ r.tgl }}</span>
        </div>
        <ul class="list-disc ml-5 text-sm text-[var(--text-secondary)] space-y-1">
          <li v-for="(item, j) in r.items" :key="j">{{ item }}</li>
        </ul>
      </div>
    </div>

    <!-- LISENSI -->
    <div
      v-else-if="bagian === 'lisensi'"
      class="max-w-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm text-sm text-[var(--text-secondary)] leading-relaxed"
    >
      <h3 class="text-base font-bold text-[var(--text-primary)] mb-2">Lisensi Penggunaan</h3>
      <p>
        Aplikasi ini untuk penggunaan internal {{ lembagaName }}. Dilarang menggandakan,
        mendistribusikan, atau memodifikasi tanpa izin pengelola pondok. Seluruh data santri, guru,
        dan keuangan bersifat rahasia dan menjadi tanggung jawab pengguna yang diberi akses.
      </p>
    </div>

    <!-- v.99: Modal Hubungi Admin (popup detail + edit kontak super_admin) -->
    <div
      v-if="showKontakModal"
      class="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="showKontakModal = false"
    >
      <div
        class="bg-[var(--bg-card)] rounded-2xl shadow-2xl max-w-sm w-full border-t-8 border-[var(--color-primary)]"
      >
        <div class="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <h3 class="text-base font-black text-[var(--text-primary)]">
            <i class="fas fa-headset text-[var(--color-primary)] mr-2"></i>Hubungi Admin
          </h3>
          <button
            class="text-[var(--text-tertiary)] hover:text-rose-500 text-xl"
            @click="showKontakModal = false"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div v-if="!editKontak" class="p-5 space-y-3">
          <div class="flex items-center gap-3">
            <div
              class="w-12 h-12 rounded-full grid place-items-center text-[var(--color-primary)]"
              style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)"
            >
              <i class="fas fa-user-tie text-xl"></i>
            </div>
            <div>
              <div class="text-base font-black text-[var(--text-primary)]">{{ AUTHOR.nama }}</div>
              <div
                v-if="AUTHOR.org && AUTHOR.org !== AUTHOR.nama"
                class="text-xs text-[var(--text-secondary)]"
              >
                {{ AUTHOR.org }}
              </div>
            </div>
          </div>
          <a
            :href="waLink"
            target="_blank"
            class="flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm"
            ><i class="fab fa-whatsapp text-lg"></i>WhatsApp: {{ AUTHOR.wa }}</a
          >
          <button
            v-if="isSuperAdmin"
            class="w-full text-xs font-bold text-[var(--color-primary)] hover:underline"
            @click="mulaiEditKontak"
          >
            <i class="fas fa-pen mr-1"></i>Edit kontak admin
          </button>
        </div>
        <div v-else class="p-5 space-y-3">
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1"
              >Nama</label
            >
            <input
              v-model="kontakDraft.nama"
              type="text"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1"
              >No. WhatsApp</label
            >
            <input
              v-model="kontakDraft.wa"
              type="tel"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label class="block text-[11px] font-bold text-[var(--text-secondary)] uppercase mb-1"
              >Organisasi</label
            >
            <input
              v-model="kontakDraft.org"
              type="text"
              class="w-full px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card-elevated)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div class="flex gap-2 justify-end pt-1">
            <button
              class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--bg-muted)]"
              @click="editKontak = false"
            >
              Batal
            </button>
            <button
              class="px-3 py-2 text-xs font-bold rounded-lg bg-[var(--color-primary)] text-white"
              @click="simpanKontak"
            >
              <i class="fas fa-save mr-1"></i>Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mergeOne } from '@/services/db'
import { useSettingsStore } from '@/stores/settings'
// v.1.4.3: SATU sumber nomor versi (lihat utils/appVersion.js) — label yang diketik
//   tangan di layar sudah terbukti membeku (kaki Data Santri tertinggal di v.74.0526).
import { labelVersi } from '@/utils/appVersion'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useDesktopShell } from '@/composables/useDesktopShell'
import { URL_PLAYSTORE } from '@/utils/unduhan'

const route = useRoute()
const router = useRouter()
const settings = useSettingsStore()
const toast = useToast()

const auth = useAuthStore()
const isSuperAdmin = computed(() => auth.sesiAktif?.role_sistem === 'super_admin')

// v.99: kontak admin dari settings (editable/ACF) — fallback ke default.
// v.1.3.0 (Kyai, 6 Agu 2026): Author = nama PROYEK, bukan nama orang — sejalan
//   dengan "Powered By Bakafrawi Project" di layar login. Baris Organization jadi
//   kembar karenanya, jadi ia hanya ditampilkan bila memang BERBEDA dari Author
//   (mis. lembaga lain mengisi adminNama/adminOrg sendiri lewat Pengaturan Web).
const DEFAULT_AUTHOR = { nama: 'Bakafrawi Project', wa: '085331172477', org: 'Bakafrawi Project' }
const AUTHOR = computed(() => ({
  nama: settings.settings?.adminNama || DEFAULT_AUTHOR.nama,
  wa: settings.settings?.adminWa || DEFAULT_AUTHOR.wa,
  org: settings.settings?.adminOrg || DEFAULT_AUTHOR.org
}))
const waLink = computed(
  () =>
    'https://wa.me/' +
    String(AUTHOR.value.wa || '')
      .replace(/\D/g, '')
      .replace(/^0/, '62')
)

// v.99: Hubungi Admin → POPUP modal (bukan toast)
const showKontakModal = ref(false)
function showKontak() {
  showKontakModal.value = true
}

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
  await mergeOne('settings', 'general', patch)
  await mergeOne('settings', 'web', patch)
}
async function simpanKontak() {
  try {
    await _saveSettings({
      adminNama: kontakDraft.nama.trim(),
      adminWa: kontakDraft.wa.trim(),
      adminOrg: kontakDraft.org.trim()
    })
    toast.success('Kontak admin tersimpan')
    editKontak.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

// v.98.0626: Bantuan tampil di SEMUA platform (Electron/Android/Web) — konten menyesuaikan.
const { isElectron } = useDesktopShell()
const isAndroid = (() => {
  try {
    return !!(
      typeof window !== 'undefined' &&
      window.Capacitor &&
      window.Capacitor.isNativePlatform &&
      window.Capacitor.isNativePlatform()
    )
  } catch (e) {
    return false
  }
})()
// v.1.2.8 memasang jalur pembaruan di luar Play Store (cek versi lewat /app-version.json
//   lalu unduh APK GitHub). v.1.4.0 MENUTUPNYA atas perintah Kyai — pembaruan Android
//   sepenuhnya lewat Play Store. Yang tersisa cuma satu tautan; `useAndroidUpdate` tak
//   lagi dipanggil dari mana pun (berkasnya sengaja dibiarkan, lihat App.vue).

const platformName = computed(() => (isElectron.value ? 'Desktop' : isAndroid ? 'Android' : 'Web'))
const platformDetail = computed(() =>
  isElectron.value ? 'Windows (Electron)' : isAndroid ? 'Android (aplikasi)' : 'Web (Browser / PWA)'
)
const introText = computed(() =>
  isElectron.value
    ? 'Versi desktop (Electron) dengan antarmuka pita ala perkantoran modern — akses cepat ke data santri, guru, rapor, keuangan, jadwal, dan kanal informasi dalam satu jendela.'
    : isAndroid
      ? 'Versi aplikasi Android — akses data santri, guru, rapor, keuangan, jadwal, dan kanal informasi langsung dari ponsel, lengkap dengan notifikasi.'
      : 'Versi web (browser / PWA) — akses dari mana saja lewat peramban, dengan fitur yang sama seperti aplikasi.'
)

const lembagaName = computed(
  () => settings.settings?.namaLembaga || 'Pondok Pesantren Mambaul Ulum'
)
const version = computed(() => labelVersi(settings.settings))
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
watch(
  () => route.query.kontak,
  (v) => {
    if (v) showKontakModal.value = true
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
  {
    id: 'panduan',
    icon: 'fa-book',
    title: 'Panduan Pengguna',
    desc: 'Langkah pemakaian fitur utama: data santri, rapor, dan keuangan.'
  },
  {
    id: 'faq',
    icon: 'fa-circle-question',
    title: 'Pertanyaan Umum (FAQ)',
    desc: 'Jawaban atas pertanyaan yang sering diajukan pengguna.'
  },
  {
    id: 'tentang',
    icon: 'fa-circle-info',
    title: 'Tentang Aplikasi',
    desc: 'Informasi versi, lembaga, dan platform aplikasi.'
  },
  {
    id: 'rilis',
    icon: 'fa-clipboard-list',
    title: 'Catatan Rilis',
    desc: 'Ringkasan perubahan dan fitur baru tiap versi.'
  },
  {
    title: 'Hubungi Admin',
    icon: 'fa-headset',
    desc: 'Tampilkan kontak admin/pembuat aplikasi (WA).',
    kontak: true
  },
  {
    title: 'Lapor Bug',
    icon: 'fa-bug',
    desc: 'Laporkan kendala atau galat yang Anda temui.',
    to: '/kritik-saran'
  }
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
  {
    q: 'Kata sandi default akun baru apa?',
    a: 'Akun baru memakai kata sandi default "1234". Pengguna disarankan segera menggantinya lewat menu Personal → Profil Saya.'
  },
  {
    q: 'Kenapa beberapa menu tidak muncul untuk saya?',
    a: 'Menu menyesuaikan peran (RBAC). Misalnya menu Keuangan hanya untuk admin keuangan/super admin, dan Master Data hanya untuk super admin.'
  },
  {
    q: 'Bagaimana mengganti tema gelap/terang?',
    a: 'Klik ikon bulan/matahari di bagian atas aplikasi. Di versi desktop juga tersedia tombol "Tema" pada pita Home → Tampilan.'
  },
  {
    q: 'Tabungan tidak masuk ke Buku Induk, apakah normal?',
    a: 'Ya. Tabungan santri terpisah dari kas pondok, jadi memang tidak ikut dihitung di Buku Induk maupun dasbor keuangan.'
  },
  {
    q: 'Cetak slip/struk tidak keluar di printer dot-matrix?',
    a: 'Gunakan menu cetak struk (ESC/P) di POS, bukan "Struk PDF". Pastikan printer dot-matrix terpilih sebagai printer default.'
  }
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
  panduanDraft.value = panduan.value.map((p) => ({
    q: p.q,
    icon: p.icon || 'fa-circle-info',
    stepsText: (p.steps || []).join('\n')
  }))
  editPanduan.value = true
}
function tambahPanduan() {
  panduanDraft.value.push({ q: '', icon: 'fa-circle-info', stepsText: '' })
}
function hapusPanduan(i) {
  panduanDraft.value.splice(i, 1)
}
async function simpanPanduan() {
  const arr = panduanDraft.value
    .map((p) => ({
      q: String(p.q || '').trim(),
      icon: p.icon || 'fa-circle-info',
      steps: String(p.stepsText || '')
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    }))
    .filter((p) => p.q)
  try {
    await _saveSettings({ bantuanPanduan: arr })
    toast.success('Panduan tersimpan')
    editPanduan.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
async function resetPanduan() {
  try {
    await _saveSettings({ bantuanPanduan: [] })
    toast.success('Panduan dikembalikan ke bawaan')
    editPanduan.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
const editFaq = ref(false)
const faqDraft = ref([])
function mulaiEditFaq() {
  faqDraft.value = faq.value.map((f) => ({ q: f.q, a: f.a }))
  editFaq.value = true
}
function tambahFaq() {
  faqDraft.value.push({ q: '', a: '' })
}
function hapusFaq(i) {
  faqDraft.value.splice(i, 1)
}
async function simpanFaq() {
  const arr = faqDraft.value
    .map((f) => ({ q: String(f.q || '').trim(), a: String(f.a || '').trim() }))
    .filter((f) => f.q)
  try {
    await _saveSettings({ bantuanFaq: arr })
    toast.success('FAQ tersimpan')
    editFaq.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}
async function resetFaq() {
  try {
    await _saveSettings({ bantuanFaq: [] })
    toast.success('FAQ dikembalikan ke bawaan')
    editFaq.value = false
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  }
}

// ⚠️ DAFTAR MANUAL — tidak terhubung ke CHANGELOG.md, jadi ia TIDAK ikut naik saat
//   versi dibump. Sempat tertinggal jauh (isinya berhenti di v.98 Juni 2026 sementara
//   aplikasi sudah v.1.2.9). Kalau menambah rilis, tulis untuk PEMBACA PONDOK: apa yang
//   berubah di layar mereka, bukan nama fungsi. Cukup beberapa rilis terakhir —
//   riwayat lengkap ada di CHANGELOG.md untuk pengembang.
const rilis = [
  {
    versi: 'v.1.4.3',
    tgl: 'September 2026',
    items: [
      'Penyaring dan kata pencarian tidak hilang lagi sesudah mengedit. Di Data Santri dan Data Guru, memilih penyaring lalu menekan Edit dan Simpan dulu selalu mengembalikan daftar ke "tampil semua", sehingga nama yang sedang dikerjakan harus dicari ulang. Sekarang daftar kembali persis seperti sebelum diedit — termasuk penyaring Gedung, PJ PTPT, Kelas-Guru, dan sub-tab Qiraati/Sekolah yang sebelumnya memang tak pernah tersimpan. Tombol "Kelola" juga membawa penyaringnya, tidak lagi membuka daftar kosong.',
      'Data tidak lagi diam-diam basi sesudah HP atau laptop ditinggal. Sambungan langsung ke server memang terputus saat perangkat tidur, berpindah WiFi, atau aplikasi lama di latar belakang — dan dulu tak ada yang menyambungkannya kembali, sehingga layar tampak normal tapi isinya beku sampai aplikasi dimuat ulang. Kini sambungannya dipasang ulang sendiri dan data disegarkan begitu aplikasi dipakai lagi.',
      'Penyaring baru di Data Santri: Kelas / Jilid / Level. Pilihannya mengikuti data yang ada — Jilid 1–6, Level 3 Juz, kelas Romawi sekolah — dan menyempit sendiri mengikuti lembaga yang sedang dipilih.',
      'Penyaring Kelas (nama guru) kini bisa dicentang lebih dari satu, jadi kelas dari beberapa guru bisa ditampilkan sekaligus tanpa membuka-tutup penyaring.',
      'Nomor versi di kaki layar tidak lagi tertinggal. Kaki daftar Data Santri sempat menampilkan versi Mei 2026 karena nomornya diketik terpisah di tiap halaman; sekarang semuanya membaca satu sumber yang ikut naik sendiri tiap rilis.'
    ]
  },
  {
    versi: 'v.1.4.2',
    tgl: 'September 2026',
    items: [
      'Pengajuan Izin / Sakit / Cuti yang "selalu gagal" kini bisa dikirim. Pegawai kantor — yang akunnya berperan admin keuangan — selalu ditolak saat menekan Kirim, sejak menu perizinan itu ada. Sebabnya bukan isian yang salah, melainkan hak akses yang tertinggal; sekarang setiap pegawai yang punya shift boleh mengajukan, dan staf kantor juga bisa ikut menyetujui.',
      'Lampiran surat dokter bisa diunggah. Melampirkan foto atau PDF pada pengajuan izin dulu selalu menggagalkan pengirimannya kecuali yang mengirim seorang admin. Lampiran lama tetap bisa dibuka seperti biasa.',
      'Tanggapan atas Catatan Supervisi bisa dikirim. Kotak tanggapan beserta tombol "Tandai Diproses" dan "Tandai Selesai" tampil untuk orang yang dicatat, tetapi setiap kali ditekan selalu gagal. Catatan dan penilaiannya sendiri tetap tak bisa diubah oleh yang bersangkutan — hanya tanggapan dan statusnya.',
      'Pesan gagal tak lagi berbahasa mesin. Kalimat seperti "new row violates row-level security policy" berganti menjadi keterangan yang bisa dibaca: apakah ini soal hak akses, sesi yang kedaluwarsa, atau sambungan internet yang putus — sehingga jelas apakah perlu lapor ke admin atau cukup dicoba lagi.',
      'Riwayat perizinan guru kini bisa dilihat per orang. Kepala, PJ, dan admin punya daftar baru di halaman Personal yang mengumpulkan seluruh pengajuan izin, sakit, dan cuti setiap guru — lengkap dengan pencarian nama, penyaring tahun, dan jumlah hari yang sudah disetujui. Sebelumnya yang tampil hanya pengajuan yang sedang menunggu, jadi begitu diputus riwayatnya hilang dari layar.',
      'Lampiran pengajuan bisa dibuka ulang kapan pun. Surat dokter atau surat keterangan yang dilampirkan guru tak lagi hanya bisa dilihat sekali waktu hendak disetujui.',
      'Izin yang dibatalkan sendiri tak lagi tertulis "Ditolak". Guru yang menarik pengajuannya sendiri dulu melihat tulisan merah "Ditolak" seolah pimpinan yang menolaknya; sekarang berbunyi "Dibatalkan". Pengajuan lama ikut terbaca benar dengan sendirinya.',
      'Daftar "Sudah disetujui, absensinya belum terisi" bisa dibersihkan. Ada nama yang menetap di sana walau absensinya sebenarnya sudah benar dan tak bisa dikeluarkan dengan cara apa pun; kini tersedia tombol "Abaikan" untuk menutupnya tanpa mengubah absensi.'
    ]
  },
  {
    versi: 'v.1.4.1',
    tgl: 'September 2026',
    items: [
      'Rekap absen bulanan guru jauh lebih ringan — membuka halamannya dan membetulkan absen dengan klik tak lagi tersendat, terutama di HP dan PC yang lebih tua.',
      'Pemberitahuan "pembaruan tersedia" di aplikasi Android dihentikan. Pembaruan kini sepenuhnya lewat Google Play Store, seperti aplikasi lain di ponsel.'
    ]
  },
  {
    versi: 'v.1.3.9',
    tgl: 'Agustus 2026',
    items: [
      'Cetak laporan Buku Induk: baris TOTAL kini berisi uang masuk dikurangi uang keluar pada periode yang disaring saja — harian, bulanan, maupun tahunan. Posisi kas keseluruhan tetap ikut tercetak, tapi sebagai dua baris keterangan di bawah TOTAL, jadi angka total tak lagi ikut minus gara-gara transaksi di luar periode.',
      'Potongan bisyaroh kini punya penyaring lengkap seperti Jenis Bisyaroh dan Tunjangan — jabatan, lembaga, shift, laki-laki/perempuan, atau orang tertentu. Satu baris "Potongan Seragam Putri" sudah cukup, tak perlu lagi mencentang nama satu per satu.',
      'Penyaring laki-laki/perempuan juga tersedia di Jenis Bisyaroh dan Jenis Tunjangan. Guru yang kolom L/P-nya belum diisi tidak akan terkena jenis yang memakai penyaring ini — mohon dilengkapi lebih dulu di Data Guru.',
      '"Usia Masuk" santri diperbaiki. Perhitungan lama keliru membaca bulan tanggal masuk, sehingga hampir selalu meleset; kini dihitung benar dari tanggal lahir ke tanggal masuk.',
      'Akun guru: daftar santri yang sebelumnya kosong di Input Nilai Bulanan, Rekap Diniyah, dan Absensi Santri kini tampil. Wali kelas sekolah dan kepala lembaga paling terdampak.'
    ]
  },
  {
    versi: 'v.1.3.6',
    tgl: 'Agustus 2026',
    items: [
      'Admin keuangan yang memegang satu gedung kini melihat angka gedungnya saja di Laporan Keuangan, Tagihan, Pembayaran, dan grafik Arus Kas — sebelumnya ikut terhitung uang seluruh pondok sehingga saldonya tampak minus.',
      'Bisyaroh guru tetap dikelola terpusat dan diberi keterangan "semua gedung" agar tidak dikira angka satu gedung.',
      'Cetak laporan harian Buku Induk kini berisi transaksi hari itu saja dan dimulai dari nol, jadi angkanya langsung cocok dengan uang yang disetorkan hari itu. Laporan bulanan dan tahunan tetap berjalan kumulatif seperti biasa.'
    ]
  },
  {
    versi: 'v.1.3.5',
    tgl: 'Agustus 2026',
    items: [
      'Alat "Rapikan Tagihan Gabungan" di Pengaturan Keuangan: menemukan tagihan ngaji yang sudah termasuk di syahriyah sekolah/pondok tapi masih tercatat belum bayar, lalu menghapusnya setelah diperiksa.',
      'Generate Tagihan Khusus menampilkan pratinjau sasaran — sebaran per lembaga, total rupiah, dan daftar nama — sebelum tagihan benar-benar terbit.',
      'Simulasi Pemasukan menampilkan berapa tagihan yang digabung beserta nilai komponen di dalamnya.'
    ]
  },
  {
    versi: 'v.1.3.3',
    tgl: 'Agustus 2026',
    items: [
      'Kepala lembaga tak lagi menerima bisyaroh pokok guru di lembaga yang ia pimpin; jam mengajarnya tetap dibayar per JP.',
      'Kepala yang juga mengaji tetap menerima bisyaroh pokok guru di lembaga ngajinya.',
      'Simulasi Bisyaroh bisa diekspor ke PDF — rekap per jenis sekaligus rincian per orang.',
      'Simulasi Pemasukan Bulanan di Pengaturan Keuangan: perkiraan uang masuk sebulan dari jenis bulanan saja.'
    ]
  },
  {
    versi: 'v.1.3.2',
    tgl: 'Agustus 2026',
    items: [
      'Bisyaroh sekolah bisa dihitung per JP per BULAN (JP/minggu × tarif, dipotong sesuai kehadiran) — pilih cara hitung "× JP/minggu (bulanan)" di Jenis Bisyaroh.',
      'Guru yang mengajar di lebih dari satu sekolah kini terbayar untuk semuanya; cukup tambahkan barisnya di menu Beban Mengajar.',
      'Jabatan Tambahan boleh lebih dari satu, jadi yang merangkap tiga jabatan tertampung.',
      'Simulasi Plafon kini ikut menghitung tunjangan.'
    ]
  },
  {
    versi: 'v.1.3.1',
    tgl: 'Agustus 2026',
    items: [
      'Tunjangan bisyaroh kini berkategori seperti Jenis Bisyaroh: tunjangan jabatan (mis. Kepala Lembaga), tunjangan pengabdian yang dikali tahun mengabdi, tunjangan khusus masa kerja tertentu, dan tunjangan berprestasi bagi yang tepat waktu.',
      'Data guru: "Tanggal Tugas" kini bernama "Tgl. Syahadah" dan boleh dikosongkan; ada field baru "Tgl. Tugas" sebagai dasar masa pengabdian.',
      'Simulasi Plafon Bisyaroh kini juga merinci per guru/pegawai.',
      'POS: tagihan bulanan tak lagi terdampar di daftar Nonbulanan.'
    ]
  },
  {
    versi: 'v.1.3.0',
    tgl: 'Agustus 2026',
    items: [
      'Simulasi Plafon Bisyaroh — coba nominal sebelum diputuskan, tak ada yang disimpan.',
      'Input Absensi Harian bisa memilih tanggal, termasuk hari yang sudah lewat (super admin).',
      'Kolom Saldo di Buku Induk tak lagi menabrak kolom Keluar.'
    ]
  },
  {
    versi: 'v.1.2.9',
    tgl: 'Agustus 2026',
    items: [
      'Toleransi scan per shift — guru yang datang lebih awal tak lagi terbaca alpa.',
      'Tab "Jejak Mesin" di Absensi Guru: bukti scan sampai atau tidak ke server.',
      'Kolom Saldo di laporan Buku Induk kini mengikuti penyaring yang diekspor.',
      "Uang Saku menampilkan seluruh santri ma'had, tanpa lewat Input Mutasi dulu.",
      'Login tak lagi gagal karena salah memilih tab Santri/Wali vs Guru/Pegawai.',
      'Tombol unduh aplikasi Desktop diperbaiki (sempat membuka halaman kosong).'
    ]
  },
  {
    versi: 'v.1.2.8',
    tgl: 'Agustus 2026',
    items: [
      'Perizinan yang disetujui tak lagi luput dari absensi.',
      'Tampilan tak lagi terlihat "ke-zoom" di HP dengan ukuran font besar.',
      'Pembaruan aplikasi Android bisa diunduh langsung tanpa menunggu Play Store.',
      'Ekspor PDF harian untuk Tabungan.'
    ]
  },
  {
    versi: 'v.1.2.7',
    tgl: 'Agustus 2026',
    items: [
      'Syahriyah gabungan: ngaji menempel ke syahriyah sekolah/pondok, tak tertagih dua kali.',
      'Kas per lembaga di Buku Induk, Uang Pos, dan Tabungan.',
      'Laporan PDF harian per lembaga, berkas tunai dan transfer terpisah.'
    ]
  },
  {
    versi: 'v.1.2.6',
    tgl: 'Juli 2026',
    items: [
      "Jenis pembayaran bisa ditargetkan ke status santri (Non-mukim / Ma'had / Fullday).",
      'Admin keuangan yang merangkap guru kini melihat kelasnya sendiri di menu Pendidikan.'
    ]
  }
]
</script>
