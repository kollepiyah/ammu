<template>
  <!-- v.20.7.0526: Banner hijau gradient + logo app watermark (match ProfilGuru) -->
  <div class="space-y-4">
    <div
      class="bg-[var(--bg-card)] rounded-[2rem] shadow-sm border border-[var(--border-subtle)] overflow-hidden"
    >
      <!-- HEADER BANNER — gradient teal/emerald dengan logo app sebagai watermark -->
      <div
        class="relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-hover)] to-[var(--color-primary-hover)] px-6 md:px-8 py-6 md:py-7 overflow-hidden"
      >
        <!-- Logo app watermark efek (mirip Ahlan widget) -->
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
          <!-- Avatar admin (built-in, pakai icon shield) -->
          <div
            class="w-28 h-28 md:w-32 md:h-32 bg-[var(--bg-card)]/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0 backdrop-blur-sm"
          >
            <img
              v-if="adminFoto"
              :src="adminFoto"
              alt="Foto Administrator"
              class="w-full h-full object-cover"
            />
            <i v-else class="fas fa-user-shield text-white/80 text-5xl"></i>
          </div>

          <!-- Nama + subtitle + badge -->
          <div class="flex-1 text-center md:text-left text-white min-w-0">
            <h2 class="text-2xl md:text-3xl font-black leading-tight drop-shadow-sm">
              Administrator
            </h2>
            <p
              class="text-xs md:text-sm font-bold text-emerald-50/90 uppercase tracking-wider mt-1.5"
            >
              Built-in Super Admin · Pondok
            </p>
            <span
              class="inline-block mt-3 text-[11px] bg-[var(--bg-card)]/25 backdrop-blur-sm text-white font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md"
            >
              Super Admin
            </span>
          </div>
        </div>
      </div>

      <!-- Body content (Identitas + Informasi + Pengaturan Profil) -->
      <div class="p-6 md:p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="bg-[var(--bg-card-elevated)] p-5 rounded-2xl border border-[var(--border-subtle)]"
          >
            <h3
              class="font-black text-[var(--text-primary)] text-sm uppercase tracking-widest border-b border-[var(--border-subtle)] pb-2 mb-4"
            >
              <i class="fas fa-user mr-2"></i>Identitas
            </h3>
            <ul class="space-y-3 text-sm">
              <li class="flex justify-between gap-2">
                <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold"
                  >Username:</span
                >
                <span class="font-black text-slate-800 dark:text-slate-100 text-right">admin</span>
              </li>
              <li class="flex justify-between gap-2">
                <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold">Role:</span>
                <span class="font-black text-slate-800 dark:text-slate-100 text-right"
                  >Administrator Utama</span
                >
              </li>
              <li class="flex justify-between gap-2">
                <span class="text-slate-700 dark:text-[var(--text-tertiary)] font-bold"
                  >Hak Akses:</span
                >
                <span class="font-black text-emerald-700 text-right">Penuh (semua fitur)</span>
              </li>
            </ul>
          </div>

          <div
            class="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100"
          >
            <h3
              class="font-black text-emerald-800 text-sm uppercase tracking-widest border-b border-emerald-200 pb-2 mb-4"
            >
              <i class="fas fa-info-circle mr-2"></i>Informasi
            </h3>
            <p class="text-xs text-[var(--text-primary)] leading-relaxed">
              Akun ini adalah <b>Administrator utama</b> Ammu Online. Hanya satu akun ini yang
              memiliki akses penuh ke semua modul, termasuk Master Data, Keuangan, dan Audit Log.
            </p>
            <p
              class="text-[11px] text-cyan-700 italic mt-3 bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded border border-cyan-100 dark:border-cyan-800"
            >
              <i class="fas fa-exclamation-triangle mr-1"></i>Demi keamanan, segera ganti kata sandi
              default di Pengaturan → Profil.
            </p>
          </div>
        </div>

        <p class="text-[10px] text-[var(--text-tertiary)] italic mt-4 text-center">
          <i class="fas fa-info-circle mr-1"></i>Untuk mengubah kata sandi, klik avatar di kanan
          atas → Edit Profil → Ganti Sandi.
        </p>
      </div>
      <!-- /body p-6 md:p-8 -->
    </div>
    <!-- /card luar -->

    <!-- v.72.7.0526: Pengaturan Profil di BAWAH Data Pribadi -->
    <ProfilPengaturanSaya role="admin" :entity-id="'admin'" :entity="{ username: 'adminmu' }" />
  </div>
</template>

<script setup>
// Admin built-in profil — minimal, mostly informational
import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings'
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'

// v.100f: foto admin disimpan di settings/web.adminFoto (admin tak punya dok guru/santri)
const settings = useSettingsStore()
const adminFoto = computed(() => settings.settings?.adminFoto || '')
</script>
