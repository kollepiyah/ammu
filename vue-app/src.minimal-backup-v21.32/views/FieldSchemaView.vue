<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div
      class="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm"
    >
      <h1 class="text-xl md:text-2xl font-black">
        <i class="fas fa-list-alt text-purple-500 mr-2"></i>Field Schema (ACF)
      </h1>
      <p class="text-xs text-slate-500 mt-0.5">
        Custom field per lembaga — kelola via Master Lembaga → Pengaturan
      </p>
    </div>
    <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4">
      <p class="text-sm text-amber-800">
        <i class="fas fa-info-circle mr-1"></i>Custom field santri/guru per-lembaga sekarang di-edit
        di:
      </p>
      <ol class="text-xs text-amber-700 mt-2 ml-5 list-decimal space-y-1">
        <li>Master Data → tab Lembaga → klik card lembaga</li>
        <li>Pilih section "Pengaturan" → Custom Fields</li>
        <li>Tambah/edit field (text/dropdown/number/textarea)</li>
      </ol>
      <router-link
        to="/master-data?tab=lembaga"
        class="inline-block mt-3 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg"
        ><i class="fas fa-arrow-right mr-1"></i>Buka Master Data</router-link
      >
    </div>
  </div>
</template>
<script setup></script>
