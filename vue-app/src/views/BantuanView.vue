<template>
  <div class="p-5 md:p-7 max-w-5xl mx-auto">
    <div class="mb-5">
      <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)] flex items-center gap-2">
        <i class="fas fa-circle-question text-[var(--color-primary)]"></i> Pusat Bantuan
      </h1>
      <p class="text-sm text-[var(--text-secondary)] mt-1">Panduan, informasi, dan kontak Ammu Online.</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
      <component
        :is="card.to ? 'button' : 'div'"
        v-for="(card, i) in cards"
        :key="i"
        class="text-left bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm transition hover:border-[var(--color-primary)] hover:shadow-md"
        :class="card.to ? 'cursor-pointer' : ''"
        @click="card.to && go(card.to)"
      >
        <div
          class="w-11 h-11 rounded-xl grid place-items-center mb-3 text-[var(--color-primary)]"
          style="background: color-mix(in srgb, var(--color-primary) 12%, transparent)"
        >
          <i :class="['fas', card.icon, 'text-lg']"></i>
        </div>
        <h4 class="text-[15px] font-bold text-[var(--text-primary)]">{{ card.title }}</h4>
        <p class="text-[12.5px] text-[var(--text-secondary)] mt-1 leading-relaxed">{{ card.desc }}</p>
      </component>
    </div>

    <div class="mt-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-sm">
      <h3 class="text-sm font-black uppercase tracking-wide text-[var(--text-primary)] mb-3">Informasi Aplikasi</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm">
        <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
          <span class="text-[var(--text-secondary)]">Aplikasi</span><span class="font-semibold">Ammu Online — Desktop</span>
        </div>
        <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
          <span class="text-[var(--text-secondary)]">Lembaga</span><span class="font-semibold">{{ lembagaName }}</span>
        </div>
        <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
          <span class="text-[var(--text-secondary)]">Versi</span><span class="font-semibold">{{ version }}</span>
        </div>
        <div class="flex justify-between border-b border-[var(--border-subtle)] py-2">
          <span class="text-[var(--text-secondary)]">Hak Cipta</span><span class="font-semibold">© 2026 {{ lembagaName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'

const router = useRouter()
const settings = useSettingsStore()

const lembagaName = computed(() => settings.settings?.namaLembaga || 'Pondok Pesantren Mambaul Ulum')
const version = computed(() => settings.settings?.appVersion || 'v.97.0626')

const cards = [
  { icon: 'fa-book', title: 'Panduan Pengguna', desc: 'Langkah pemakaian fitur utama: data santri, rapor, dan keuangan.' },
  { icon: 'fa-circle-question', title: 'Pertanyaan Umum', desc: 'Jawaban atas pertanyaan yang sering diajukan pengguna.' },
  { icon: 'fa-headset', title: 'Hubungi Admin', desc: 'Kirim pesan ke administrator lewat Kritik & Saran.', to: '/kritik-saran' },
  { icon: 'fa-bug', title: 'Lapor Bug', desc: 'Laporkan kendala atau galat yang Anda temui.', to: '/kritik-saran' },
  { icon: 'fa-clipboard-list', title: 'Catatan Rilis', desc: 'Ringkasan perubahan dan fitur baru tiap versi.' },
  { icon: 'fa-shield-halved', title: 'Lisensi', desc: 'Hak penggunaan internal Pondok Pesantren Mambaul Ulum.' }
]

function go(to) {
  router.push(to)
}
</script>
