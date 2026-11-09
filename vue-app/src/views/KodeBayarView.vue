<template>
  <!-- v.1.4.9 gel. 2 (Kyai, 4 Nov 2026: "beralih ke halaman yang menampilkan khusus no. VA dan
       tata cara bayarnya, seperti di Shopee"). Halaman sendiri (/pembayaran/kode/:id), bukan
       jendela — tombol kembali HP ikut bekerja. Status ikut keuangan_va_intent (realtime). -->
  <div class="min-h-full bg-[var(--bg-page)] pb-24">
    <!-- Kepala -->
    <div
      class="sticky top-0 z-10 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] flex items-center gap-2 px-2 py-2"
    >
      <button
        class="w-10 h-10 rounded-full hover:bg-[var(--bg-muted)] flex items-center justify-center text-[var(--text-primary)] cursor-pointer"
        aria-label="Kembali ke Pembayaran"
        @click="kembali"
      >
        <i class="fas fa-chevron-left"></i>
      </button>
      <h1 class="flex-1 text-center text-base font-black text-[var(--text-primary)] pr-10">
        Pembayaran
      </h1>
    </div>

    <div v-if="!kode" class="p-10 text-center text-sm text-[var(--text-secondary)]">
      <i class="fas fa-spinner fa-spin mr-1"></i>Memuat kode bayar…
    </div>

    <template v-else>
      <!-- Status -->
      <div
        v-if="kode.status === 'terbayar'"
        class="m-3 rounded-2xl p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center"
      >
        <i class="fas fa-circle-check text-emerald-600 text-4xl mb-2"></i>
        <p class="text-sm font-black text-emerald-800 dark:text-emerald-200">Pembayaran diterima</p>
        <p v-if="total" class="text-base font-black text-emerald-800 dark:text-emerald-200 mt-1">
          {{ fmtRp(total) }}
        </p>
        <p class="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
          Tagihan dan uang saku sudah tercatat otomatis.
        </p>
        <p class="text-xs font-bold italic text-emerald-800 dark:text-emerald-200 mt-2">
          Jazakumulloh, semoga barokah dan manfaat.
        </p>
      </div>
      <div
        v-else-if="!berlaku"
        class="m-3 rounded-2xl p-4 bg-slate-100 dark:bg-slate-800 text-center text-sm font-bold text-[var(--text-secondary)]"
      >
        Kode bayar ini sudah tidak berlaku. Silakan buat yang baru.
      </div>
      <!-- 9 Nov 2026: kode dari kunci sandbox terlihat sama persis dengan kode sungguhan —
           tandai supaya tak ada yang mencoba membayarnya dengan uang sungguhan. -->
      <div
        v-if="uji && kode.status !== 'terbayar'"
        class="m-3 rounded-2xl p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 text-center"
      >
        <p class="text-sm font-black text-orange-800 dark:text-orange-200">
          <i class="fas fa-flask mr-1"></i>Kode uji
        </p>
        <p class="text-[11px] text-orange-700 dark:text-orange-300 mt-0.5">
          Dibuat dengan kunci uji (sandbox) — tidak bisa dibayar dengan uang sungguhan.
        </p>
      </div>

      <!-- Total & batas waktu — sesudah lunas cukup kotak "Pembayaran diterima" (Kyai, 4 Nov 2026) -->
      <div
        v-if="kode.status !== 'terbayar'"
        class="bg-[var(--bg-card)] mt-2 divide-y divide-[var(--border-subtle)]"
      >
        <div class="flex items-center justify-between gap-3 px-4 py-3">
          <span class="text-sm text-[var(--text-primary)]">Total Pembayaran</span>
          <!-- Salin & ajakan bayar hanya selama kode berlaku — sesudah lunas/kedaluwarsa wali
               jangan sampai mengira harus membayar lagi. -->
          <button
            v-if="berlaku"
            class="text-base font-black text-rose-600 dark:text-rose-400 cursor-pointer"
            title="Salin nominal"
            @click="salin(String(total), 'Nominal')"
          >
            {{ fmtRp(total) }} <i class="far fa-copy text-xs ml-0.5"></i>
          </button>
          <span v-else class="text-base font-black text-[var(--text-primary)]">{{
            fmtRp(total)
          }}</span>
        </div>
        <div
          v-if="kode.status === 'pending' && berlaku"
          class="flex items-start justify-between gap-3 px-4 py-3"
        >
          <span class="text-sm text-[var(--text-primary)]">Bayar Dalam</span>
          <div class="text-right">
            <p class="text-sm font-black text-rose-600 dark:text-rose-400 font-mono">
              {{ waktu.teks }}
            </p>
            <p v-if="batasLabel" class="text-[11px] text-[var(--text-secondary)]">
              Jatuh tempo {{ batasLabel }}
            </p>
          </div>
        </div>
      </div>

      <!-- Kanal + nomor -->
      <div v-if="kode.status !== 'terbayar'" class="bg-[var(--bg-card)] mt-2">
        <div class="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
          <span
            class="w-9 h-9 rounded-lg bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 flex items-center justify-center"
          >
            <i :class="['fas', isQris ? 'fa-qrcode' : 'fa-building-columns']"></i>
          </span>
          <span class="text-sm font-bold text-[var(--text-primary)]">{{ namaKanal }}</span>
        </div>

        <!-- QRIS -->
        <div v-if="isQris" class="px-4 py-4 text-center">
          <div
            :class="[
              'inline-block p-3 bg-white rounded-2xl border border-[var(--border-subtle)]',
              { 'opacity-30': !berlaku }
            ]"
          >
            <img
              v-if="kode.qr_url && !qrGagal"
              :src="kode.qr_url"
              alt="Kode QR QRIS"
              class="w-60 h-60 object-contain"
              @error="qrGagal = true"
            />
            <div
              v-else
              class="w-60 h-60 flex items-center justify-center text-xs text-slate-500 italic px-4"
            >
              Gambar QR belum bisa dimuat. Muat ulang halaman ini.
            </div>
          </div>
          <a
            v-if="kode.qr_url && !qrGagal && berlaku"
            :href="kode.qr_url"
            target="_blank"
            rel="noopener"
            class="block mt-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:underline"
            ><i class="fas fa-download mr-1"></i>Buka / simpan gambar QR</a
          >
        </div>

        <!-- VA / Mandiri -->
        <div v-else class="px-4 py-3 space-y-3">
          <div v-if="kode.kode_perusahaan" class="flex items-end justify-between gap-3">
            <div>
              <p class="text-xs text-[var(--text-secondary)]">Kode Perusahaan</p>
              <p
                :class="[
                  'text-xl font-black font-mono tracking-wider',
                  berlaku ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--text-secondary)]'
                ]"
              >
                {{ kode.kode_perusahaan }}
              </p>
            </div>
            <button
              v-if="berlaku"
              class="text-sm font-bold text-cyan-700 dark:text-cyan-300 cursor-pointer"
              @click="salin(kode.kode_perusahaan, 'Kode perusahaan')"
            >
              Salin
            </button>
          </div>
          <div class="flex items-end justify-between gap-3">
            <div class="min-w-0">
              <p class="text-xs text-[var(--text-secondary)]">
                {{ kode.kode_perusahaan ? 'Kode Bayar' : 'No. Virtual Account' }}
              </p>
              <p
                :class="[
                  'text-xl font-black font-mono tracking-wide break-all',
                  berlaku ? 'text-rose-600 dark:text-rose-400' : 'text-[var(--text-secondary)]'
                ]"
              >
                {{ kelompokkan(kode.va) || '…' }}
              </p>
            </div>
            <button
              v-if="berlaku"
              :disabled="!kode.va"
              class="text-sm font-bold text-cyan-700 dark:text-cyan-300 disabled:opacity-50 cursor-pointer flex-shrink-0"
              @click="salin(kode.va, 'Nomor')"
            >
              Salin
            </button>
          </div>
          <p v-if="kode.biaya_layanan" class="text-[11px] text-[var(--text-tertiary)]">
            Total sudah termasuk biaya layanan {{ fmtRp(kode.biaya_layanan) }}.<template
              v-if="berlaku"
            >
              Bayar tepat sejumlah Total Pembayaran.</template
            >
          </p>
        </div>
      </div>

      <!-- Petunjuk -->
      <div v-if="langkah.length && kode.status === 'pending'" class="bg-[var(--bg-card)] mt-2">
        <details
          v-for="(c, i) in langkah"
          :key="c.judul"
          :open="i === 0"
          class="border-b border-[var(--border-subtle)] group"
        >
          <summary
            class="flex items-center justify-between px-4 py-3 text-sm font-bold text-[var(--text-primary)] cursor-pointer list-none"
          >
            Petunjuk {{ c.judul }}
            <i
              class="fas fa-chevron-down text-xs text-[var(--text-tertiary)] transition group-open:rotate-180"
            ></i>
          </summary>
          <ol class="px-4 pb-4 space-y-2.5">
            <li v-for="(l, j) in c.langkah" :key="j" class="flex gap-3 text-sm">
              <span
                class="w-5 h-5 rounded-full bg-[var(--bg-muted)] text-[11px] font-bold text-[var(--text-secondary)] flex items-center justify-center flex-shrink-0 mt-0.5"
                >{{ j + 1 }}</span
              >
              <span class="text-[var(--text-primary)]">{{ l }}</span>
            </li>
          </ol>
        </details>
        <p class="px-4 py-3 text-[11px] text-[var(--text-tertiary)] italic">
          Menu tiap aplikasi bisa sedikit berbeda. Status di Ammu berubah sendiri begitu dana masuk.
        </p>
      </div>

      <div v-if="kode.status === 'pending' && berlaku" class="px-4 mt-4 text-center">
        <button
          :disabled="membatalkan"
          class="text-xs font-bold text-rose-600 hover:underline disabled:opacity-50 cursor-pointer"
          @click="batal"
        >
          Batalkan kode bayar ini
        </button>
      </div>
    </template>

    <!-- Tombol bawah -->
    <div
      class="fixed bottom-0 inset-x-0 z-10 p-3 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] md:static md:border-0 md:bg-transparent"
    >
      <button
        class="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm cursor-pointer"
        @click="kembali"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { subscribeColl } from '@/services/db'
import { batalKodeBayar, ambilTitipan } from '@/services/midtrans'
import { fmtRp } from '@/utils/format'
import { caraBayar, sisaWaktu, labelKanal, kodeUji } from '@/utils/caraBayarMidtrans'
import { useToast } from '@/composables/useToast'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const id = computed(() => String(route.params.id || ''))

// Jawaban server yang dititip halaman Pembayaran dipakai sampai baris realtime-nya tiba;
//   sesudah itu baris itulah sumbernya.
const awal = ref(ambilTitipan(route.params.id))
const baris = ref(null)
let lepas = null
onMounted(() => {
  lepas = subscribeColl(
    'keuangan_va_intent',
    (docs) => {
      baris.value = (docs || []).find((d) => String(d.id) === id.value) || null
    },
    [['id', '==', id.value]]
  )
})
const kode = computed(() => baris.value || awal.value)

const isQris = computed(() => kode.value?.jenis === 'qris' || kode.value?.kanal === 'qris')
const uji = computed(() => kodeUji(kode.value))
const namaKanal = computed(() => {
  const l = labelKanal(kode.value)
  return isQris.value ? 'QRIS' : l.replace(/^VA\s+/i, 'Bank ')
})
const total = computed(() => Number(kode.value?.gross || kode.value?.total || 0))
const langkah = computed(() => caraBayar(kode.value?.kanal))
const qrGagal = ref(false)

const kini = ref(Date.now())
const detak = setInterval(() => (kini.value = Date.now()), 1000)
onUnmounted(() => {
  clearInterval(detak)
  if (lepas) lepas()
})
const waktu = computed(() => sisaWaktu(kode.value?.expiry_at, kini.value))
const berlaku = computed(() => kode.value?.status === 'pending' && !waktu.value.habis)
const batasLabel = computed(() => {
  const t = Date.parse(String(kode.value?.expiry_at || ''))
  if (!Number.isFinite(t)) return ''
  return (
    new Date(t).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) + ' WIB'
  )
})

function kelompokkan(v) {
  return String(v || '')
    .replace(/\s+/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim()
}
async function salin(teks, apa) {
  try {
    await navigator.clipboard.writeText(String(teks || '').replace(/\s+/g, ''))
    toast.success(`${apa} tersalin`)
  } catch {
    toast.error('Tidak bisa menyalin di perangkat ini')
  }
}
// Datang dari Pembayaran → mundur, supaya tombol kembali HP sesudah OK tak membuka kode ini lagi.
//   Dibuka langsung (tautan/notifikasi) → ganti entri, bukan menumpuk.
function kembali() {
  if (String(window.history.state?.back || '').startsWith('/pembayaran')) router.back()
  else router.replace({ path: '/pembayaran' })
}
const membatalkan = ref(false)
async function batal() {
  if (!confirm('Batalkan kode bayar ini? Nomornya tak bisa dipakai lagi.')) return
  membatalkan.value = true
  try {
    await batalKodeBayar(id.value)
    toast.success('Kode bayar dibatalkan.')
    kembali()
  } catch (e) {
    toast.error('Gagal batalkan: ' + (e?.message || e))
  } finally {
    membatalkan.value = false
  }
}
</script>
