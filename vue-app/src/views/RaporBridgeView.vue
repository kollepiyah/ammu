<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-6 md:p-8 border border-cyan-300 dark:border-cyan-700 shadow-sm text-center">
      <i class="fas fa-graduation-cap text-cyan-500 text-4xl mb-3"></i>
      <h2 class="text-lg font-black text-[var(--text-primary)] mb-2">
        Rapor Semester
      </h2>
      <p class="text-sm text-[var(--text-secondary)] mb-4">
        Generate &amp; cetak rapor PDF dengan tabel nilai tilawah, kelancaran, ujian
        + KOP letterhead masih live di sistem lama. Vue migration di-defer karena
        scope PDF generation kompleks (jsPDF + autoTable + custom header).
      </p>
      <a
        href="/"
        class="inline-block px-5 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold rounded-xl text-sm shadow-md transition"
      >
        <i class="fas fa-external-link-alt mr-1"></i>Buka di Sistem Lama
      </a>
      <p class="text-[10px] text-[var(--text-tertiary)] mt-4">
        <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.15 bridge
      </p>
    </div>
  </div>
</template>
<script setup></script>
