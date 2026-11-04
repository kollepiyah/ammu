<template>
  <!-- v.1.4.9 gel. 2 (Kyai, 4 Nov 2026: "tetap di Ammu, seperti Shopee/Tokopedia"):
       nomor VA / kode QR Midtrans ditampilkan di layar Ammu sendiri. Status mengikuti
       keuangan_va_intent (realtime), jadi tak perlu tombol "cek status". -->
  <div
    class="fixed inset-0 z-50 bg-slate-900/70 flex items-end md:items-center justify-center md:p-4 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    :aria-label="'Kode bayar ' + judul"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[var(--bg-card)] rounded-t-2xl md:rounded-2xl shadow-2xl w-full md:max-w-md max-h-[92vh] overflow-y-auto"
    >
      <!-- Kepala -->
      <div
        class="sticky top-0 bg-[var(--bg-card)] px-4 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2"
      >
        <div class="min-w-0">
          <p class="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Kode Bayar
          </p>
          <h3 class="text-base font-black text-[var(--text-primary)] truncate">{{ judul }}</h3>
        </div>
        <button
          class="w-9 h-9 rounded-full hover:bg-[var(--bg-muted)] text-[var(--text-secondary)] flex items-center justify-center cursor-pointer"
          aria-label="Tutup"
          @click="$emit('close')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="p-4 space-y-4">
        <!-- Terbayar -->
        <div
          v-if="kode.status === 'terbayar'"
          class="rounded-2xl p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-center"
        >
          <i class="fas fa-circle-check text-emerald-600 text-4xl mb-2"></i>
          <p class="text-sm font-black text-emerald-800 dark:text-emerald-200">
            Pembayaran diterima
          </p>
          <p class="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">
            Tagihan dan uang saku sudah tercatat otomatis.
          </p>
        </div>
        <div
          v-else-if="kode.status !== 'pending' || waktu.habis"
          class="rounded-2xl p-4 bg-slate-100 dark:bg-slate-800 text-center text-sm font-bold text-[var(--text-secondary)]"
        >
          Kode bayar ini sudah tidak berlaku. Silakan buat yang baru.
        </div>

        <!-- Total -->
        <div
          class="rounded-2xl p-4 bg-[var(--bg-card-elevated)] border border-[var(--border-subtle)]"
        >
          <p class="text-[10px] font-bold uppercase text-[var(--text-secondary)]">Total dibayar</p>
          <div class="flex items-center justify-between gap-2 mt-0.5">
            <p class="text-2xl font-black text-[var(--text-primary)]">{{ fmtRp(total) }}</p>
            <button
              class="text-xs font-black text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 cursor-pointer"
              @click="salin(String(total), 'Nominal')"
            >
              <i class="fas fa-copy mr-1"></i>Salin
            </button>
          </div>
          <p v-if="kode.biaya_layanan" class="text-[10px] text-[var(--text-tertiary)] mt-0.5">
            Termasuk biaya layanan {{ fmtRp(kode.biaya_layanan) }}. Bayar tepat sejumlah ini.
          </p>
        </div>

        <!-- QRIS -->
        <div v-if="isQris" class="text-center">
          <div
            class="inline-block p-3 bg-white rounded-2xl border border-[var(--border-subtle)] shadow-sm"
          >
            <img
              v-if="kode.qr_url && !qrGagal"
              :src="kode.qr_url"
              alt="Kode QR QRIS"
              class="w-56 h-56 object-contain"
              @error="qrGagal = true"
            />
            <div
              v-else
              class="w-56 h-56 flex items-center justify-center text-xs text-slate-500 italic px-4"
            >
              Gambar QR belum bisa dimuat. Tutup lalu buka lagi kode bayar ini.
            </div>
          </div>
          <a
            v-if="kode.qr_url && !qrGagal"
            :href="kode.qr_url"
            target="_blank"
            rel="noopener"
            class="block mt-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:underline"
            ><i class="fas fa-download mr-1"></i>Buka / simpan gambar QR</a
          >
        </div>

        <!-- VA / Mandiri -->
        <div v-else class="space-y-2">
          <div
            v-if="kode.kode_perusahaan"
            class="rounded-xl p-3 border border-[var(--border-subtle)] flex items-center justify-between gap-2"
          >
            <div>
              <p class="text-[10px] font-bold uppercase text-[var(--text-secondary)]">
                Kode Perusahaan
              </p>
              <p class="text-lg font-black font-mono tracking-wider">{{ kode.kode_perusahaan }}</p>
            </div>
            <button
              class="text-xs font-black text-cyan-700 dark:text-cyan-300 px-2 py-1 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-900/30 cursor-pointer"
              @click="salin(kode.kode_perusahaan, 'Kode perusahaan')"
            >
              <i class="fas fa-copy mr-1"></i>Salin
            </button>
          </div>
          <div
            class="rounded-xl p-3 border-2 border-cyan-500/60 bg-cyan-50/50 dark:bg-cyan-900/20 flex items-center justify-between gap-2"
          >
            <div class="min-w-0">
              <p class="text-[10px] font-bold uppercase text-[var(--text-secondary)]">
                {{ kode.kode_perusahaan ? 'Kode Bayar' : 'Nomor Virtual Account' }}
              </p>
              <p class="text-xl font-black font-mono tracking-wider break-all">
                {{ kelompokkan(kode.va) || '…' }}
              </p>
            </div>
            <button
              :disabled="!kode.va"
              class="text-xs font-black text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 px-3 py-2 rounded-lg cursor-pointer flex-shrink-0"
              @click="salin(kode.va, 'Nomor')"
            >
              <i class="fas fa-copy mr-1"></i>Salin
            </button>
          </div>
        </div>

        <!-- Batas waktu -->
        <p
          v-if="kode.status === 'pending' && !waktu.habis && waktu.teks"
          class="text-center text-xs text-[var(--text-secondary)]"
        >
          Bayar sebelum <b>{{ batasLabel }}</b> · sisa
          <b class="font-mono text-[var(--text-primary)]">{{ waktu.teks }}</b>
        </p>

        <!-- Cara bayar -->
        <div v-if="langkah.length && kode.status === 'pending'" class="space-y-2">
          <p class="text-[10px] font-black uppercase tracking-wider text-[var(--text-secondary)]">
            Cara bayar
          </p>
          <details
            v-for="(c, i) in langkah"
            :key="c.judul"
            :open="i === 0"
            class="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
          >
            <summary
              class="px-3 py-2 text-sm font-bold cursor-pointer bg-[var(--bg-card-elevated)]"
            >
              {{ c.judul }}
            </summary>
            <ol
              class="px-4 py-2 list-decimal list-inside space-y-1 text-xs text-[var(--text-primary)]"
            >
              <li v-for="(l, j) in c.langkah" :key="j">{{ l }}</li>
            </ol>
          </details>
          <p class="text-[10px] text-[var(--text-tertiary)] italic">
            Menu tiap aplikasi bisa sedikit berbeda. Status di Ammu berubah sendiri begitu dana
            masuk.
          </p>
        </div>

        <div class="flex gap-2 pt-1">
          <button
            v-if="kode.status === 'pending' && !waktu.habis"
            :disabled="membatalkan"
            class="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 border border-[var(--border-default)] hover:bg-rose-50 dark:hover:bg-rose-900/20 disabled:opacity-50 cursor-pointer"
            @click="$emit('batal', kode)"
          >
            Batalkan
          </button>
          <button
            class="flex-1 px-4 py-2.5 rounded-xl text-sm font-black text-white bg-cyan-600 hover:bg-cyan-700 cursor-pointer"
            @click="$emit('close')"
          >
            {{ kode.status === 'terbayar' ? 'Selesai' : 'Tutup' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { fmtRp } from '@/utils/format'
import { caraBayar, sisaWaktu } from '@/utils/caraBayarMidtrans'
import { useToast } from '@/composables/useToast'

const props = defineProps({
  // Baris keuangan_va_intent (data jsonb sudah diratakan) atau jawaban midtrans-charge.
  kode: { type: Object, required: true },
  membatalkan: { type: Boolean, default: false }
})
defineEmits(['close', 'batal'])
const toast = useToast()

const isQris = computed(() => props.kode.jenis === 'qris' || props.kode.kanal === 'qris')
const judul = computed(() =>
  String(props.kode.kanal_label || '')
    .replace(/\s*\(Midtrans\)\s*$/, '')
    .trim()
)
const total = computed(() => Number(props.kode.gross || props.kode.total || 0))
const langkah = computed(() => caraBayar(props.kode.kanal))
const qrGagal = ref(false)

// Hitung mundur — detak tiap detik selama modal terbuka.
const kini = ref(Date.now())
let detak = null
onMounted(() => {
  detak = setInterval(() => (kini.value = Date.now()), 1000)
})
onUnmounted(() => clearInterval(detak))
const waktu = computed(() => sisaWaktu(props.kode.expiry_at, kini.value))
const batasLabel = computed(() => {
  const t = Date.parse(String(props.kode.expiry_at || ''))
  if (!Number.isFinite(t)) return ''
  return (
    new Date(t).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
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
</script>
