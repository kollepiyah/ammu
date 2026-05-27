<template>
  <div class="space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl overflow-hidden border border-[var(--border-subtle)] shadow-sm">
      <div class="relative bg-gradient-to-br from-cyan-500 dark:from-cyan-700 via-cyan-600 dark:via-cyan-800 to-cyan-700 dark:to-cyan-900 px-6 py-7">
        <img src="/logo.png" alt="" class="absolute -right-6 -top-6 w-36 h-36 object-contain opacity-10 pointer-events-none" />
        <div class="relative flex flex-col md:flex-row items-center gap-5">
          <div class="w-24 h-24 md:w-28 md:h-28 bg-[var(--bg-card)]/20 border-4 border-white/80 rounded-full flex items-center justify-center overflow-hidden shadow-2xl flex-shrink-0">
            <img v-if="santri?.foto" :src="santri.foto" class="w-full h-full object-cover" />
            <i v-else class="fas fa-user-graduate text-white/70 text-4xl"></i>
          </div>
          <div class="flex-1 text-center md:text-left text-white">
            <h2 class="text-xl md:text-2xl font-black drop-shadow">{{ santri?.nama || '-' }}</h2>
            <p class="text-xs font-bold text-cyan-50/90 uppercase tracking-wider mt-1">{{ santri?.lembaga || '-' }} · Kelas {{ santri?.kelas || '-' }}</p>
            <span class="inline-block mt-2 text-[11px] bg-[var(--bg-card)]/25 border border-white/30 text-white font-black px-3 py-1 rounded-full uppercase tracking-widest">{{ santri?.is_mukim ? "Ma'had" : (santri?.is_fullday ? 'Fullday' : 'Pulang Pergi') }}</span>
          </div>
        </div>
      </div>
      <div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-[var(--bg-card-elevated)] p-4 rounded-2xl border border-[var(--border-subtle)]">
          <h3 class="text-xs font-black uppercase text-[var(--text-primary)] mb-3 border-b pb-2"><i class="fas fa-id-card mr-1"></i>Identitas</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span class="text-[var(--text-secondary)] font-bold">NIS:</span><span class="font-black">{{ santri?.nis || '-' }}</span></li>
            <li class="flex justify-between"><span class="text-[var(--text-secondary)] font-bold">Jenis Kelamin:</span><span class="font-black">{{ santri?.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}</span></li>
            <li class="flex justify-between"><span class="text-[var(--text-secondary)] font-bold">Tgl Lahir:</span><span class="font-black">{{ santri?.tgl_lahir || '-' }}</span></li>
            <li class="flex justify-between"><span class="text-[var(--text-secondary)] font-bold">Tgl Masuk:</span><span class="font-black">{{ santri?.tgl_masuk || '-' }}</span></li>
          </ul>
        </div>
        <div class="bg-cyan-50 p-4 rounded-2xl border border-cyan-200">
          <h3 class="text-xs font-black uppercase text-cyan-700 mb-3 border-b border-cyan-200 pb-2"><i class="fas fa-school mr-1"></i>Pendidikan</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span class="text-cyan-700 font-bold">Lembaga:</span><span class="font-black">{{ santri?.lembaga || '-' }}</span></li>
            <li class="flex justify-between"><span class="text-cyan-700 font-bold">Kelas:</span><span class="font-black">{{ santri?.kelas || '-' }}</span></li>
            <li v-if="santri?.juz" class="flex justify-between"><span class="text-cyan-700 font-bold">Juz:</span><span class="font-black">{{ santri.juz }}</span></li>
            <li class="flex justify-between"><span class="text-cyan-700 font-bold">Lembaga Sekolah:</span><span class="font-black">{{ santri?.lembaga_sekolah || '-' }}</span></li>
            <li class="flex justify-between"><span class="text-cyan-700 font-bold">Kelas Sekolah:</span><span class="font-black">{{ santri?.kelas_sekolah || '-' }}</span></li>
          </ul>
        </div>
        <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 md:col-span-2">
          <h3 class="text-xs font-black uppercase text-emerald-700 mb-3 border-b border-emerald-200 pb-2"><i class="fas fa-users mr-1"></i>Wali</h3>
          <ul class="space-y-2 text-sm">
            <li class="flex justify-between"><span class="text-emerald-700 font-bold">Nama Wali:</span><span class="font-black">{{ santri?.wali || '-' }}</span></li>
            <li class="flex justify-between"><span class="text-emerald-700 font-bold">No WhatsApp:</span><span class="font-black">{{ santri?.wa || '-' }}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <ProfilPengaturanSaya role="santri" :entity-id="santri?.id" :entity="santri" />
  </div>
</template>
<script setup>
import ProfilPengaturanSaya from './ProfilPengaturanSaya.vue'
defineProps({ santri: { type: Object, required: true } })
</script>
