<template>
  <div class="p-3 md:p-5 max-w-3xl mx-auto space-y-4">
    <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 border border-amber-300 dark:border-amber-700 shadow-sm text-center">
      <i class="fas fa-graduation-cap text-amber-500 text-4xl mb-3"></i>
      <h2 class="text-lg font-black text-slate-800 dark:text-white mb-2">
        Rapor Semester
      </h2>
      <p class="text-sm text-slate-600 dark:text-slate-300 mb-4">
        Generate &amp; cetak rapor PDF dengan tabel nilai tilawah, kelancaran, ujian
        + KOP letterhead masih live di sistem lama. Vue migration di-defer karena
        scope PDF generation kompleks (jsPDF + autoTable + custom header).
      </p>
      <a
        href="/"
        class="inline-block px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm shadow-md transition"
      >
        <i class="fas fa-external-link-alt mr-1"></i>Buka di Sistem Lama
      </a>
      <p class="text-[10px] text-slate-400 mt-4">
        <i class="fas fa-circle-info mr-1"></i>Vue 3 · Phase 5.15 bridge
      </p>
    </div>
  </div>
</template>
<script setup></script>
