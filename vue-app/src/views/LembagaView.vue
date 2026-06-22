<template>
  <div class="p-3 md:p-5 max-w-6xl mx-auto space-y-4">
    <div
      v-if="!isFullAccess"
      class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-rose-300 text-center"
    >
      <i class="fas fa-lock text-rose-300 text-4xl mb-3"></i>
      <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
        Akses terbatas
      </p>
      <p class="text-xs text-[var(--text-secondary)] mt-1">
        Halaman Data Lembaga hanya untuk admin.
      </p>
    </div>
    <template v-else>
      <!-- v.21.14.0526: Header refactor inline -->
      <div
        class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div class="flex items-baseline gap-2 flex-wrap">
            <h1
              class="text-base md:text-lg font-black text-[var(--text-primary)] whitespace-nowrap"
            >
              <i class="fas fa-building text-teal-500 mr-1"></i>Data Lembaga
            </h1>
            <p class="text-[11px] text-[var(--text-secondary)]">— Master data lembaga pendidikan</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <div
              class="px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 text-xs"
            >
              <span class="text-teal-700 dark:text-teal-300 font-bold">{{ stats.total }}</span>
              <span class="text-[var(--text-secondary)] ml-1">total</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-xs"
            >
              <span class="text-emerald-700 dark:text-emerald-300 font-bold">{{
                stats.qiraati
              }}</span>
              <span class="text-[var(--text-secondary)] ml-1">qiraati</span>
            </div>
            <div
              class="px-3 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-700 text-xs"
            >
              <span class="text-cyan-700 dark:text-cyan-300 font-bold">{{ stats.formal }}</span>
              <span class="text-[var(--text-secondary)] ml-1">formal</span>
            </div>
            <router-link
              to="/lembaga/new"
              class="px-3 py-1.5 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-xs font-bold transition"
            >
              <i class="fas fa-plus mr-1"></i>Tambah Lembaga
            </router-link>
          </div>
        </div>
      </div>

      <div
        class="bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border border-[var(--border-subtle)] shadow-sm"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div class="md:col-span-2 relative">
            <i
              class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] text-sm"
            ></i>
            <input
              v-model="search"
              type="text"
              placeholder="Cari nama lembaga..."
              class="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none transition"
            />
          </div>
          <select
            v-model="filterTipe"
            class="px-3 py-2.5 text-sm rounded-xl border border-[var(--border-default)] bg-white dark:bg-slate-900 focus:ring-2 focus:ring-teal-500 outline-none"
          >
            <option value="">Semua tipe</option>
            <option value="Qiraati">Qiraati</option>
            <option value="Formal">Formal (Sekolah)</option>
          </select>
        </div>
      </div>

      <div
        v-if="loading"
        class="bg-[var(--bg-card)] rounded-2xl p-10 text-center border border-[var(--border-subtle)]"
      >
        <i class="fas fa-spinner fa-spin text-teal-500 text-3xl mb-3"></i>
        <p class="text-sm text-[var(--text-secondary)] font-bold">Memuat data lembaga...</p>
      </div>
      <div
        v-else-if="lembaga.length === 0"
        class="bg-[var(--bg-card)] rounded-2xl p-10 border border-dashed border-[var(--border-default)] text-center"
      >
        <i class="fas fa-building text-[var(--text-tertiary)] text-4xl mb-3"></i>
        <p class="text-sm font-bold text-slate-700 dark:text-[var(--text-tertiary)]">
          Belum ada lembaga
        </p>
      </div>
      <!-- v.21.24d.0526: Nested by group umbrella (TPQ Pagi/Sore/Pra PTPT → TPQ; TK A/B → TK) -->
      <div v-else class="space-y-5">
        <!-- Render setiap group section -->
        <div
          v-for="grp in groupedLembaga"
          :key="grp.groupName"
          :class="
            grp.isUmbrella
              ? 'bg-[var(--bg-card)] rounded-2xl p-3 md:p-4 border-2 border-[var(--border-subtle)] shadow-sm'
              : ''
          "
        >
          <!-- Header umbrella -->
          <div v-if="grp.isUmbrella" class="flex items-center justify-between mb-3 px-2">
            <div class="flex items-center gap-2">
              <div
                :class="[
                  'w-9 h-9 rounded-xl bg-gradient-to-br',
                  grp.gradient,
                  'flex items-center justify-center'
                ]"
              >
                <i :class="['fas text-white text-base drop-shadow', grp.icon]"></i>
              </div>
              <div>
                <h3 class="text-sm md:text-base font-black text-[var(--text-primary)]">
                  {{ grp.groupName }}
                </h3>
                <p class="text-[10px] text-[var(--text-secondary)]">
                  Group {{ grp.items.length }} sub-lembaga
                </p>
              </div>
            </div>
            <span
              class="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg-muted)] text-slate-700 dark:text-[var(--text-tertiary)]"
              >{{ grp.badge }}</span
            >
          </div>
          <!-- Grid sub-lembaga -->
          <div
            :class="[
              'grid grid-cols-1 gap-3',
              grp.isUmbrella
                ? 'sm:grid-cols-2 md:grid-cols-3'
                : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            ]"
          >
            <router-link
              v-for="l in grp.items"
              :key="l.id || l.lembaga"
              :to="{
                path: `/lembaga/${l.id || l.lembaga}`,
                query:
                  $route.path.startsWith('/master-data') || $route.query.from === 'master-data'
                    ? { from: 'master-data' }
                    : {}
              }"
              :class="[
                'rounded-2xl p-4 md:p-5 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer bg-gradient-to-br relative overflow-hidden block',
                cardGradient(l)
              ]"
            >
              <span
                class="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-[var(--bg-card)]/25 text-white backdrop-blur-sm"
              >
                {{ tipeLabel(l) }}
              </span>
              <div
                class="w-12 h-12 rounded-xl bg-[var(--bg-card)]/15 flex items-center justify-center mb-3 backdrop-blur-sm"
              >
                <i :class="['fas text-white text-2xl drop-shadow', cardIcon(l)]"></i>
              </div>
              <h3 class="text-lg md:text-xl font-black text-white drop-shadow-sm leading-tight">
                {{ l.lembaga }}
              </h3>
              <p class="text-xs text-white/85 mt-1">{{ subInfo(l) }}</p>
              <span
                v-if="l.group"
                class="inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--bg-card)]/20 text-white mb-1.5 mt-2"
              >
                {{
                  l.tpq_group ||
                  l.tk_group ||
                  (l.group === 'mahad'
                    ? "Ma'had"
                    : l.group === 'qiraati'
                      ? 'Qiraati'
                      : l.group === 'sekolah'
                        ? 'Sekolah'
                        : l.group === 'non-lembaga'
                          ? 'Non Lembaga'
                          : l.group)
                }}
              </span>
              <div
                v-if="getCounts(l.lembaga).guru || getCounts(l.lembaga).santri"
                class="flex gap-3 mt-3 text-[10px] text-white/80"
              >
                <span
                  ><i class="fas fa-chalkboard-teacher mr-1"></i
                  >{{ getCounts(l.lembaga).guru }} guru</span
                >
                <span
                  ><i class="fas fa-users mr-1"></i>{{ getCounts(l.lembaga).santri }} santri</span
                >
              </div>
            </router-link>
          </div>
        </div>
      </div>

      <p class="text-center text-[10px] text-[var(--text-tertiary)] pt-2">
        <i class="fas fa-circle-info mr-1"></i>{{ lembaga.length }} lembaga
      </p>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLembaga } from '@/composables/useLembaga'
const { lembaga, loading, search, filterTipe, stats, isFullAccess, getCounts } = useLembaga()

// v.21.24d.0526: Group nested — TPQ Pagi/Sore/Pra PTPT → umbrella TPQ; TK A/B → umbrella TK
const groupedLembaga = computed(() => {
  const tpqItems = []
  const tkItems = []
  const standalone = []
  for (const l of lembaga.value) {
    if (l.tpq_group === 'TPQ') tpqItems.push(l)
    else if (l.tk_group === 'TK') tkItems.push(l)
    else standalone.push(l)
  }
  const out = []
  if (tpqItems.length > 0) {
    out.push({
      groupName: 'TPQ (Qiraati)',
      isUmbrella: true,
      gradient: 'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900',
      icon: 'fa-mosque',
      badge: 'Group',
      items: tpqItems
    })
  }
  if (tkItems.length > 0) {
    out.push({
      groupName: 'TK (Taman Kanak-Kanak)',
      isUmbrella: true,
      gradient: 'from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900',
      icon: 'fa-child',
      badge: 'Group',
      items: tkItems
    })
  }
  if (standalone.length > 0) {
    out.push({
      groupName: 'Lembaga Lain',
      isUmbrella: false,
      items: standalone
    })
  }
  return out
})

// v.20.23.0526: Card style match legacy (gradient + icon per-tipe lembaga)
function tipeLabel(l) {
  const nm = String(l.lembaga || '').toUpperCase()
  const tp = String(l.tipe || '').toLowerCase()
  if (nm === 'YAYASAN') return 'Non Lembaga'
  if (nm.includes('SARANA') || nm.includes('PRASARANA')) return 'Non Lembaga'
  if (nm === 'TPQ' || nm === 'TPQ PAGI' || nm === 'TPQ SORE') return 'Group'
  if (tp === 'formal') return 'Formal'
  if (tp === 'non lembaga' || tp.includes('non')) return 'Non Lembaga'
  return 'Qiraati'
}

function cardGradient(l) {
  const nm = String(l.lembaga || '').toUpperCase()
  if (nm === 'YAYASAN') return 'from-slate-600 to-slate-800'
  if (nm.includes('SARANA') || nm.includes('PRASARANA')) return 'from-slate-600 to-slate-800'
  if (nm === 'TPQ' || nm === 'TPQ PAGI' || nm === 'TPQ SORE')
    return 'from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900'
  if (nm === 'PRA PTPT') return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  if (nm === 'PTPT') return 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
  if (nm === 'PPPH' || nm === 'P3H')
    return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  if (nm === 'SDI') return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  if (nm === 'PKBM') return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  if (nm === 'TK' || nm === 'TK A' || nm === 'TK B')
    return 'from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900'
  if (nm === 'MA' || nm.includes('ALIYAH'))
    return 'from-rose-500 dark:from-rose-700 to-rose-700 dark:to-rose-900'
  if (nm === 'MTS' || nm.includes('TSANAWIYAH'))
    return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  const tp = String(l.tipe || '').toLowerCase()
  if (tp === 'formal') return 'from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900'
  return 'from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900'
}

function cardIcon(l) {
  const nm = String(l.lembaga || '').toUpperCase()
  if (nm === 'YAYASAN') return 'fa-landmark'
  if (nm.includes('SARANA') || nm.includes('PRASARANA')) return 'fa-screwdriver-wrench'
  if (nm === 'TPQ' || nm === 'TPQ PAGI' || nm === 'TPQ SORE') return 'fa-mosque'
  if (nm === 'PRA PTPT') return 'fa-book-quran'
  if (nm === 'PTPT') return 'fa-book-quran'
  if (nm === 'PPPH' || nm === 'P3H') return 'fa-book-quran'
  if (nm === 'TK' || nm === 'TK A' || nm === 'TK B') return 'fa-child'
  if (nm === 'SDI') return 'fa-school'
  if (nm === 'PKBM') return 'fa-graduation-cap'
  return 'fa-building'
}

function subInfo(l) {
  const k = Array.isArray(l.kelas) ? l.kelas.length : 0
  if (k > 0) return `${k} kelas`
  return ''
}
</script>
