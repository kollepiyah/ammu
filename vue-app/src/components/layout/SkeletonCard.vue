<template>
  <!-- v.21.115.0528: SkeletonCard — placeholder loading state untuk list-heavy pages.
       Props:
         - count: jumlah card placeholder (default 3)
         - variant: 'list' (avatar + 2 lines + tags) | 'compact' (1 line)
  -->
  <div class="space-y-2">
    <div
      v-for="i in count"
      :key="i"
      class="bg-[var(--bg-card)] rounded-xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm animate-pulse"
    >
      <div v-if="variant === 'list'" class="flex items-start gap-3">
        <!-- Avatar -->
        <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div class="flex-1 min-w-0 space-y-2">
          <!-- Name line -->
          <div class="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
          <!-- Subline -->
          <div class="h-2.5 bg-slate-100 dark:bg-slate-700/60 rounded w-1/2"></div>
          <!-- Tags row -->
          <div class="flex gap-1.5 pt-1">
            <div class="h-4 w-16 bg-slate-100 dark:bg-slate-700/60 rounded"></div>
            <div class="h-4 w-20 bg-slate-100 dark:bg-slate-700/60 rounded"></div>
          </div>
        </div>
      </div>
      <div v-else class="space-y-2">
        <div class="h-3.5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
        <div class="h-2.5 bg-slate-100 dark:bg-slate-700/60 rounded w-3/4"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 3 },
  variant: { type: String, default: 'list' }
})
</script>
