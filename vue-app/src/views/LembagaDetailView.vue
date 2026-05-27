<template>
  <!-- v.21.10.0526: Lembaga Detail page + group hierarchy badge + sibling variants -->
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <!-- Breadcrumb + actions -->
    <div
      class="bg-emerald-50/40 dark:bg-slate-800 rounded-2xl p-4 md:p-5 border border-emerald-200 dark:border-slate-700 shadow-sm"
    >
      <p class="text-[11px] text-[var(--text-secondary)] mb-2">
        <!-- v.21.25.0526: back button context-aware (Master Data atau Lembaga) -->
        <router-link
          v-if="route.query.from === 'master-data'"
          :to="{ path: '/master-data', query: { tab: 'lembaga' } }"
          class="text-cyan-600 hover:underline cursor-pointer"
        >
          <i class="fas fa-arrow-left mr-1"></i>Kembali ke Master Data
        </router-link>
        <router-link v-else to="/lembaga" class="text-cyan-600 hover:underline cursor-pointer"
          ><i class="fas fa-home mr-1"></i>Lembaga</router-link
        >
        <i class="fas fa-chevron-right mx-1 text-[9px]"></i>
        <span class="font-bold text-[var(--text-primary)]">{{ lembagaId }}</span>
        <span v-if="activeSection" class="text-[var(--text-tertiary)]">
          <i class="fas fa-chevron-right mx-1 text-[9px]"></i> {{ sectionLabel }}</span
        >
      </p>
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h1 class="text-xl md:text-2xl font-black text-[var(--text-primary)]">
            <i class="fas fa-building text-teal-600 mr-1"></i>{{ lembagaId }}
          </h1>
          <span
            :class="[
              'inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider',
              tipeBadgeClass
            ]"
            >{{ tipeLabel }}</span
          >
        </div>
        <div class="flex gap-2">
          <router-link
            :to="`/lembaga/${lembagaId}/edit`"
            class="px-3 py-2 text-xs font-bold bg-cyan-100 hover:bg-cyan-200 text-cyan-700 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <i class="fas fa-edit"></i>Edit Info
          </router-link>
          <button
            @click="onDelete"
            class="px-3 py-2 text-xs font-bold bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <i class="fas fa-trash"></i>Hapus
          </button>
        </div>
      </div>
    </div>

    <!-- v.21.10.0526: Group Hierarchy info card — tampil kalau lembaga termasuk dalam group multi-variant -->
    <div
      v-if="!activeSection && groupInfo && siblingVariants.length > 0"
      :class="['rounded-2xl p-4 border-2 shadow-sm', groupBadgeClass]"
    >
      <div class="flex items-start justify-between gap-3 flex-wrap">
        <div class="flex-1 min-w-0">
          <p class="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">
            <i class="fas fa-layer-group mr-1"></i>Group Hierarchy
          </p>
          <p class="text-sm font-black">
            {{ lembagaId }} <span class="opacity-60 font-normal">termasuk group</span>
            <span class="ml-1 px-2 py-0.5 bg-[var(--bg-card)]/60 rounded text-xs font-black uppercase">{{
              groupKey
            }}</span>
          </p>
          <p class="text-[11px] mt-1 opacity-80">
            <i class="fas fa-user-tie mr-1"></i>Kepala lembaga:
            <b>{{ groupInfo.kepala_jabatan }}</b>
          </p>
          <div class="mt-2 flex flex-wrap gap-1.5">
            <span class="text-[10px] font-bold opacity-60 mr-1">Varian lain di group ini:</span>
            <router-link
              v-for="sib in siblingVariants"
              :key="sib"
              :to="`/lembaga/${sib}`"
              class="text-[11px] font-bold px-2 py-0.5 bg-[var(--bg-card)]/80 hover:bg-[var(--bg-card)] rounded border border-current/30 cursor-pointer transition"
            >
              <i class="fas fa-arrow-right mr-1 text-[9px] opacity-50"></i>{{ sib }}
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- v.21.24.0526: Quick Action Cards — full saat tidak ada section, mini saat section aktif (kyai req: bisa pindah sub-menu langsung tanpa Kembali) -->
    <div
      v-if="!activeSection"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-3"
    >
      <UiActionCard
        v-if="!isNonLembaga"
        icon="fas fa-list-ol"
        title="KELAS/JILID"
        subtitle="Daftar kelas lembaga"
        gradient="from-teal-500 dark:from-teal-700 to-teal-700 dark:to-teal-900"
        @click="activeSection = 'kelas'"
      />
      <UiActionCard
        v-if="!isNonLembaga"
        icon="fas fa-graduation-cap"
        title="RAPOR SEMESTER"
        subtitle="Schema & nilai"
        gradient="from-emerald-500 dark:from-emerald-700 to-emerald-700 dark:to-emerald-900"
        @click="activeSection = 'rapor'"
      />
      <UiActionCard
        v-if="!isNonLembaga"
        icon="fas fa-book-open"
        title="REKAP PRESTASI"
        subtitle="Prestasi santri"
        gradient="from-cyan-500 dark:from-cyan-700 to-cyan-700 dark:to-cyan-900"
        @click="activeSection = 'rekap'"
      />
      <UiActionCard
        v-if="!isNonLembaga"
        icon="fas fa-calendar-check"
        title="ABSEN BULANAN"
        subtitle="Rekap kehadiran"
        gradient="from-cyan-500 dark:from-cyan-700 to-cyan-600 dark:to-cyan-800"
        @click="activeSection = 'absen'"
      />
      <UiActionCard
        icon="fas fa-cog"
        title="PENGATURAN"
        subtitle="KOP & Logo lembaga"
        gradient="from-slate-500 to-slate-700"
        @click="activeSection = 'pengaturan'"
      />
    </div>

    <!-- v.21.24.0526: Section tab pill bar — tetap visible saat section aktif, bisa langsung pindah sub-menu -->
    <div
      v-else
      class="bg-[var(--bg-card)] rounded-xl p-2 border border-[var(--border-subtle)] flex items-center gap-1.5 flex-wrap"
    >
      <button
        @click="activeSection = ''"
        class="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--bg-muted)] hover:bg-slate-200 text-[var(--text-primary)] cursor-pointer"
      >
        <i class="fas fa-arrow-left mr-1"></i>Menu
      </button>
      <button
        v-if="!isNonLembaga"
        @click="activeSection = 'kelas'"
        :class="[
          'text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition',
          activeSection === 'kelas'
            ? 'bg-teal-600 text-white'
            : 'bg-[var(--bg-muted)] hover:bg-teal-50 text-[var(--text-primary)]'
        ]"
      >
        <i class="fas fa-list-ol mr-1"></i>Kelas
      </button>
      <button
        v-if="!isNonLembaga"
        @click="activeSection = 'rapor'"
        :class="[
          'text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition',
          activeSection === 'rapor'
            ? 'bg-emerald-600 text-white'
            : 'bg-[var(--bg-muted)] hover:bg-emerald-50 text-[var(--text-primary)]'
        ]"
      >
        <i class="fas fa-graduation-cap mr-1"></i>Rapor
      </button>
      <button
        v-if="!isNonLembaga"
        @click="activeSection = 'rekap'"
        :class="[
          'text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition',
          activeSection === 'rekap'
            ? 'bg-cyan-600 text-white'
            : 'bg-[var(--bg-muted)] hover:bg-cyan-50 text-[var(--text-primary)]'
        ]"
      >
        <i class="fas fa-book-open mr-1"></i>Rekap
      </button>
      <button
        v-if="!isNonLembaga"
        @click="activeSection = 'absen'"
        :class="[
          'text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition',
          activeSection === 'absen'
            ? 'bg-cyan-600 text-white'
            : 'bg-[var(--bg-muted)] hover:bg-cyan-50 text-[var(--text-primary)]'
        ]"
      >
        <i class="fas fa-calendar-check mr-1"></i>Absen
      </button>
      <button
        @click="activeSection = 'pengaturan'"
        :class="[
          'text-[11px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition',
          activeSection === 'pengaturan'
            ? 'bg-slate-700 text-white'
            : 'bg-[var(--bg-muted)] hover:bg-slate-200 text-[var(--text-primary)]'
        ]"
      >
        <i class="fas fa-cog mr-1"></i>Pengaturan
      </button>
      <span class="text-xs font-black text-[var(--text-primary)] uppercase tracking-wider">{{
        sectionLabel
      }}</span>
    </div>

    <!-- KELAS/JILID section -->
    <div
      v-if="activeSection === 'kelas'"
      class="bg-[var(--bg-card)] rounded-2xl p-4 md:p-5 border border-teal-200 shadow-sm space-y-3"
    >
      <p class="text-xs text-[var(--text-primary)]">
        <i class="fas fa-info-circle mr-1 text-teal-600"></i>Daftar kelas/jilid yang muncul sebagai
        pilihan di form santri lembaga <b>{{ lembagaId }}</b
        >.
      </p>
      <form @submit.prevent="onAddKelas" class="flex gap-2">
        <input
          v-model="newKelasInput"
          placeholder="Nama kelas/jilid (mis: Jilid 1, KPI, Persiapan Khotaman)"
          class="flex-1 px-3 py-2 text-sm border border-teal-300 rounded-lg bg-[var(--bg-card)]"
        />
        <button
          type="submit"
          class="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-bold px-4 py-2 rounded-lg text-sm"
        >
          <i class="fas fa-plus mr-1"></i>Tambah
        </button>
      </form>
      <ul
        v-if="(lembagaData?.kelas || []).length === 0"
        class="text-center text-[var(--text-tertiary)] italic text-xs py-4 bg-[var(--bg-card-elevated)] rounded-lg"
      >
        Belum ada kelas. Tambahkan di form atas.
      </ul>
      <ul v-else class="space-y-1.5">
        <li
          v-for="(k, i) in lembagaData?.kelas || []"
          :key="i"
          class="flex justify-between items-center bg-[var(--bg-card-elevated)] px-3 py-2 rounded-lg border border-[var(--border-subtle)]"
        >
          <span class="text-sm font-bold"
            ><i class="fas fa-grip-vertical text-[var(--text-tertiary)] mr-2 text-xs"></i>{{ i + 1 }}.
            {{ k }}</span
          >
          <div class="flex gap-1">
            <button
              @click="onEditKelas(i)"
              class="text-cyan-600 hover:bg-cyan-50 p-1.5 rounded text-xs"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              @click="onHapusKelas(i)"
              class="text-rose-500 hover:bg-rose-50 p-1.5 rounded text-xs"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- RAPOR SEMESTER section: Predikat + Schema Editor + buka page rapor -->
    <div v-if="activeSection === 'rapor'" class="space-y-3">
      <!-- Predikat Global -->
      <div
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700 shadow-sm"
      >
        <h5 class="text-xs font-black text-cyan-900 uppercase mb-2 flex items-center gap-2">
          <i class="fas fa-star"></i>Aturan Predikat
          <span class="text-[9px] bg-cyan-200 text-cyan-900 px-2 py-0.5 rounded">GLOBAL</span>
        </h5>
        <p class="text-[11px] text-cyan-700 mb-3 italic">
          Berlaku di semua lembaga. Edit di sini = berlaku untuk semua.
        </p>
        <div class="space-y-1">
          <div
            v-for="(r, idx) in predikatRules"
            :key="idx"
            class="flex items-center gap-2 text-xs bg-[var(--bg-card)] rounded px-2 py-1"
          >
            <input
              v-model="r.label"
              class="w-10 font-black text-center px-1 py-0.5 border border-[var(--border-default)] rounded"
            />
            <input
              v-model.number="r.min"
              type="number"
              class="w-14 px-2 py-0.5 border border-[var(--border-default)] rounded"
            />
            <span>-</span>
            <input
              v-model.number="r.max"
              type="number"
              class="w-14 px-2 py-0.5 border border-[var(--border-default)] rounded"
            />
            <button @click="predikatRules.splice(idx, 1)" class="text-rose-500 text-xs">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <button
            @click="addPredikatRule"
            class="text-xs text-cyan-600 hover:text-cyan-800 font-bold"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Aturan
          </button>
        </div>
      </div>

      <!-- v.20.44.0526: Struktur Field Rapor editor — preset template buttons + inline edit (no tipe dropdown) -->
      <div
        class="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 md:p-5 border border-teal-200 dark:border-teal-700 shadow-sm space-y-3"
      >
        <div class="flex items-center justify-between flex-wrap gap-2">
          <h5 class="text-xs font-black text-teal-900 uppercase">
            <i class="fas fa-list-alt mr-1"></i>Struktur Field Rapor
          </h5>
          <div class="flex gap-1">
            <button
              @click="resetRaporSchema"
              class="text-[10px] font-bold px-2 py-1 rounded bg-cyan-100 text-cyan-800 hover:bg-cyan-200"
            >
              <i class="fas fa-undo mr-1"></i>Reset Default
            </button>
            <button
              @click="simpanRaporSchema"
              :disabled="saving"
              class="text-[10px] font-black px-3 py-1 rounded bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50"
            >
              <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>Simpan
            </button>
          </div>
        </div>

        <!-- Preset template buttons -->
        <div class="bg-[var(--bg-card)] rounded-lg p-3 border border-teal-100">
          <p class="text-[10px] font-bold text-[var(--text-secondary)] uppercase mb-2">
            Mulai dari template (klik lalu edit di bawah):
          </p>
          <div class="flex flex-wrap gap-1.5">
            <button
              @click="applyTemplate('tpq')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-teal-100 hover:bg-teal-200 text-teal-800"
            >
              <i class="fas fa-mosque mr-0.5"></i>TPQ (Jilid + IMTAS + Khotaman)
            </button>
            <button
              @click="applyTemplate('pra-ptpt')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-cyan-100 hover:bg-cyan-200 text-cyan-800"
            >
              <i class="fas fa-book-quran mr-0.5"></i>Pra PTPT (5 Level Khotam)
            </button>
            <button
              @click="applyTemplate('ptpt')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-teal-100 hover:bg-teal-200 text-teal-800"
            >
              <i class="fas fa-book-quran mr-0.5"></i>PTPT (Kelas Juz)
            </button>
            <button
              @click="applyTemplate('ppph')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-cyan-100 hover:bg-cyan-200 text-cyan-800"
            >
              <i class="fas fa-book mr-0.5"></i>PPPH (Tahap)
            </button>
            <button
              @click="applyTemplate('diniyah')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-cyan-100 hover:bg-cyan-200 text-cyan-800"
            >
              <i class="fas fa-school mr-0.5"></i>Diniyah (Mapel × Kelas)
            </button>
            <button
              @click="applyTemplate('kosong')"
              class="text-[10px] font-bold px-2.5 py-1 rounded bg-[var(--bg-muted)] hover:bg-slate-200 text-[var(--text-primary)]"
            >
              <i class="fas fa-ban mr-0.5"></i>Tidak Punya Rapor
            </button>
          </div>
        </div>

        <!-- perLevel editor (Pra PTPT / PTPT / PPPH pattern) -->
        <div
          v-if="raporSchema.perLevel"
          class="space-y-2 bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100"
        >
          <div class="flex justify-between items-center">
            <p class="text-xs font-black text-teal-800 uppercase">
              Field Nilai (kolom angka tiap khotam)
            </p>
            <button
              @click="addFieldNilai"
              class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
            >
              + Field
            </button>
          </div>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="(f, idx) in raporSchema.fieldsNilai || []"
              :key="idx"
              class="bg-teal-50 border border-teal-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
            >
              <input
                v-model="f.label"
                class="bg-transparent border-0 outline-none text-[11px] w-24"
              />
              <button
                @click="raporSchema.fieldsNilai.splice(idx, 1)"
                class="text-rose-400 text-[10px]"
              >
                <i class="fas fa-times"></i>
              </button>
            </span>
          </div>
          <div class="flex justify-between items-center mt-3">
            <p class="text-xs font-black text-teal-800 uppercase">Level × Khotam</p>
            <button
              @click="addLevel"
              class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
            >
              + Level
            </button>
          </div>
          <div
            v-for="(lvl, lIdx) in raporSchema.levels || []"
            :key="lvl.id || lIdx"
            class="bg-teal-50/60 border border-teal-100 rounded p-2 space-y-2"
          >
            <div class="grid grid-cols-[1fr_1fr_auto] gap-2">
              <input
                v-model="lvl.label"
                placeholder="Label (Level 1)"
                class="text-xs px-2 py-1 border border-[var(--border-default)] rounded"
              />
              <input
                v-model="lvl.levelBaca"
                placeholder="Baca (½ Juz)"
                class="text-xs px-2 py-1 border border-[var(--border-default)] rounded"
              />
              <button
                @click="raporSchema.levels.splice(lIdx, 1)"
                class="text-rose-500 text-xs px-2"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <p class="text-[10px] font-black text-teal-700">Khotam:</p>
                <button
                  @click="addKhotam(lvl)"
                  class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
                >
                  + Khotam
                </button>
              </div>
              <div
                v-for="(kh, kIdx) in lvl.khotamList || []"
                :key="kh.id || kIdx"
                class="grid grid-cols-[1fr_50px_30px] gap-1 items-center bg-[var(--bg-card)] rounded px-2 py-1"
              >
                <input
                  v-model="kh.labelKhotam"
                  placeholder="Khotam I"
                  class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded"
                />
                <input
                  v-model.number="kh.multiplier"
                  type="number"
                  min="1"
                  max="10"
                  class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded text-center"
                  :title="`Multiplier: ${kh.multiplier}x`"
                />
                <button @click="lvl.khotamList.splice(kIdx, 1)" class="text-rose-500 text-[11px]">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- perKelas editor (Diniyah pattern) -->
        <div
          v-else-if="raporSchema.perKelas"
          class="space-y-2 bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100"
        >
          <div class="flex justify-between items-center">
            <p class="text-xs font-black text-teal-800 uppercase">
              Jenjang Kelas × Mata Pelajaran
            </p>
            <button
              @click="addJenjang"
              class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
            >
              + Jenjang
            </button>
          </div>
          <div
            v-for="(j, jIdx) in raporSchema.jenjang || []"
            :key="jIdx"
            class="bg-teal-50/60 p-2 rounded"
          >
            <div class="flex items-center justify-between mb-1">
              <input
                v-model="j.kelas"
                placeholder="Kelas (I/II/...)"
                class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded w-32"
              />
              <button @click="raporSchema.jenjang.splice(jIdx, 1)" class="text-rose-500 text-xs">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div
                v-for="(m, mIdx) in j.mapel || []"
                :key="mIdx"
                class="flex items-center gap-1 bg-[var(--bg-card)] p-1 rounded"
              >
                <input
                  v-model="m.nama"
                  class="flex-1 text-[11px] px-1 py-0.5 border-0 bg-transparent outline-none"
                  placeholder="Mapel"
                />
                <input
                  v-model.number="m.kkm"
                  type="number"
                  class="w-12 text-[11px] px-1 border border-[var(--border-default)] rounded text-center"
                  title="KKM"
                />
                <button @click="j.mapel.splice(mIdx, 1)" class="text-rose-400 text-[10px]">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <button
              @click="j.mapel = j.mapel || []; j.mapel.push({ id: 'm_' + Date.now(), nama: '', kkm: 80 })"
              class="text-[10px] text-teal-700 font-bold mt-1"
            >
              + Tambah Mapel
            </button>
          </div>
        </div>

        <!-- sections editor (TPQ pattern) -->
        <div
          v-else-if="Array.isArray(raporSchema.sections) && raporSchema.sections.length > 0"
          class="space-y-2 bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100"
        >
          <div class="flex justify-between items-center">
            <p class="text-xs font-black text-teal-800 uppercase">Sections</p>
            <button
              @click="addSection"
              class="text-[10px] bg-teal-200 hover:bg-teal-300 text-teal-800 font-bold px-2 py-0.5 rounded"
            >
              + Section
            </button>
          </div>
          <div
            v-for="(sec, sIdx) in raporSchema.sections || []"
            :key="sIdx"
            class="bg-teal-50/60 p-2 rounded space-y-2"
          >
            <div class="flex items-center justify-between gap-2">
              <input
                v-model="sec.title"
                placeholder="Title section"
                class="text-xs font-bold px-2 py-1 border border-[var(--border-default)] rounded flex-1"
              />
              <button @click="raporSchema.sections.splice(sIdx, 1)" class="text-rose-500 text-xs">
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div>
              <p class="text-[10px] font-black text-teal-700 mb-1">
                Rows (Jilid/Kelas) — kosongkan untuk single row:
              </p>
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="(r, rIdx) in sec.rows || []"
                  :key="rIdx"
                  class="bg-[var(--bg-card)] border border-teal-200 px-2 py-0.5 rounded text-[11px] flex items-center gap-1"
                >
                  <input
                    v-model="sec.rows[rIdx]"
                    class="bg-transparent border-0 outline-none text-[11px] w-16"
                  />
                  <button @click="sec.rows.splice(rIdx, 1)" class="text-rose-400 text-[10px]">
                    <i class="fas fa-times"></i>
                  </button>
                </span>
                <button
                  @click="(sec.rows = sec.rows || []) && sec.rows.push('Baru')"
                  class="bg-teal-200 hover:bg-teal-300 text-[10px] font-bold px-2 py-0.5 rounded"
                >
                  + Row
                </button>
              </div>
            </div>
            <div>
              <p class="text-[10px] font-black text-teal-700 mb-1">Fields (Kolom Nilai):</p>
              <div
                v-for="(fl, fIdx) in sec.fields || []"
                :key="fIdx"
                class="grid grid-cols-[1fr_90px_30px] gap-1 items-center mb-1"
              >
                <input
                  v-model="fl.label"
                  placeholder="Label"
                  class="text-[11px] px-1.5 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                />
                <select
                  v-model="fl.type"
                  class="text-[11px] px-1 py-0.5 border border-[var(--border-default)] rounded bg-[var(--bg-card)]"
                >
                  <option value="number">Angka</option>
                  <option value="text">Teks</option>
                  <option value="date">Tanggal</option>
                  <option value="auto_predikat">Predikat (auto)</option>
                </select>
                <button @click="sec.fields.splice(fIdx, 1)" class="text-rose-500 text-[11px]">
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <button
                @click="(sec.fields = sec.fields || []) && sec.fields.push({ id: 'f_' + Date.now(), label: 'Baru', type: 'number' })"
                class="bg-teal-200 hover:bg-teal-300 text-[10px] font-bold px-2 py-0.5 rounded"
              >
                + Field
              </button>
            </div>
          </div>
        </div>

        <!-- v.20.56.0526: warning banner kalau Firestore masih simpan PTPT legacy -->
        <div
          v-if="ptptLegacyDetected"
          class="bg-cyan-50 border-2 border-cyan-300 rounded-xl p-3 mb-2"
        >
          <p class="text-xs font-black text-[var(--text-on-accent)] mb-1">
            <i class="fas fa-exclamation-triangle mr-1"></i>Schema lama terdeteksi di Firestore
          </p>
          <p class="text-[11px] text-cyan-700 mb-2">
            Klik tombol <b>PTPT (Kelas Juz)</b> di atas lalu <b>Simpan</b> untuk migrasi ke format
            baru. Atau hapus schema lama dulu:
          </p>
          <button
            @click="resetRaporSchema"
            class="text-[11px] font-bold px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-700 text-white"
          >
            <i class="fas fa-trash mr-1"></i>Hapus Schema Lama
          </button>
        </div>

        <!-- v.20.52.0526: flat kelasJuz preview (PTPT/PPPH) -->
        <div
          v-else-if="raporSchema.tableLayout === 'kelasJuz'"
          class="space-y-2 bg-[var(--bg-card)] p-3 rounded-xl border border-teal-100"
        >
          <p class="text-xs font-black text-teal-800 dark:text-teal-200 mb-1">
            📋 Schema PTPT (Flat Kelas × Juz)
          </p>
          <div
            class="bg-teal-50/60 p-2 rounded text-[11px] text-[var(--text-primary)] space-y-1"
          >
            <p><strong>Total baris:</strong> {{ (raporSchema.rows || []).length }} (Kelas × Juz)</p>
            <p>
              <strong>Kolom nilai:</strong>
              {{ (raporSchema.fields || []).map((f) => f.label).join(' · ') }}
            </p>
            <p class="text-[10px] italic text-[var(--text-secondary)]">
              Saat tampil rapor santri, baris otomatis ter-filter sesuai kelas santri (mis. Kelas 1
              → Juz 1-5 saja).
            </p>
          </div>
          <details class="text-[11px] mt-2">
            <summary class="cursor-pointer font-bold text-teal-700 dark:text-teal-300">
              Lihat distribusi Juz per Kelas
            </summary>
            <div class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-1">
              <div
                v-for="kg in flatKelasGroupsPreview"
                :key="kg.kelas"
                class="bg-[var(--bg-card-elevated)] p-1.5 rounded border border-[var(--border-subtle)]"
              >
                <p class="font-bold text-teal-700">{{ kg.kelas }}</p>
                <p class="text-[var(--text-secondary)] text-[10px]">{{ kg.juzList.join(', ') }}</p>
              </div>
            </div>
          </details>
        </div>

        <!-- kosong / empty -->
        <div v-else class="bg-cyan-50 border border-cyan-200 p-3 rounded text-xs text-cyan-800">
          <i class="fas fa-info-circle mr-1"></i>Belum ada struktur schema. Klik tombol template di
          atas untuk mulai.
        </div>

        <p class="text-[10px] text-[var(--text-secondary)] italic">
          <i class="fas fa-info-circle mr-1"></i>Klik "Simpan" untuk apply ke Firestore. Vue rapor
          page otomatis pakai schema ini.
        </p>
      </div>

      <button
        @click="bukaRaporPage"
        class="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md"
      >
        <i class="fas fa-external-link-alt mr-2"></i>Buka Page Rapor Santri →
      </button>
    </div>

    <!-- REKAP PRESTASI section -->
    <div v-if="activeSection === 'rekap'" class="space-y-3">
      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 md:p-5 border border-emerald-200 dark:border-emerald-700"
      >
        <h5 class="text-xs font-black text-emerald-900 uppercase mb-2">
          <i class="fas fa-info-circle mr-1"></i>Rekap Prestasi {{ lembagaId }}
        </h5>
        <p class="text-[11px] text-emerald-800 leading-relaxed">
          {{
            isFormalLembaga
              ? 'Untuk Diniyah, atur mata pelajaran Rekap di bawah ini.'
              : 'Untuk Rekap Qiraati, struktur kolom (Awal Bulan, Akhir Bulan, Total) sudah ditentukan otomatis sesuai jenis lembaga. Tidak perlu konfigurasi manual.'
          }}
        </p>
      </div>

      <div
        v-if="isFormalLembaga"
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700 space-y-2"
      >
        <h5 class="text-xs font-black text-[var(--text-on-accent)] uppercase">
          <i class="fas fa-list mr-1"></i>Mapel Diniyah
        </h5>
        <p class="text-[11px] text-[var(--text-secondary)]">
          Mata pelajaran kolom di Rekap Diniyah {{ lembagaId }}. Pisah dgn koma.
        </p>
        <textarea
          v-model="rekapMapelStr"
          rows="3"
          placeholder="Aqidah Akhlak, Fiqh, Tarikh, Bahasa Arab"
          class="w-full px-3 py-2 text-sm border border-cyan-300 rounded-lg bg-[var(--bg-card)]"
        ></textarea>
        <button
          @click="simpanRekapMapel"
          :disabled="saving"
          class="text-xs font-black px-3 py-1.5 rounded bg-cyan-600 hover:bg-cyan-700 text-white disabled:opacity-50"
        >
          <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-1']"></i>Simpan Mapel
        </button>
      </div>

      <button
        @click="bukaRekapPage"
        class="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md"
      >
        <i class="fas fa-external-link-alt mr-2"></i>Buka Page Rekap Prestasi →
      </button>
    </div>

    <!-- ABSEN BULANAN section -->
    <div v-if="activeSection === 'absen'" class="space-y-3">
      <div class="bg-cyan-50 rounded-2xl p-4 md:p-5 border border-cyan-200">
        <h5 class="text-xs font-black text-[var(--text-on-accent)] uppercase mb-2">
          <i class="fas fa-info-circle mr-1"></i>Absen Bulanan {{ lembagaId }}
        </h5>
        <p class="text-[11px] text-cyan-800">Input absensi santri per bulan untuk lembaga ini.</p>
      </div>
      <button
        @click="bukaAbsenPage"
        class="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 rounded-xl shadow-md"
      >
        <i class="fas fa-external-link-alt mr-2"></i>Buka Page Absen Santri →
      </button>
    </div>

    <!-- PENGATURAN section: KOP override + Logo (match legacy) -->
    <div v-if="activeSection === 'pengaturan'" class="space-y-3">
      <!-- KOP override -->
      <div
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700"
      >
        <h5 class="text-xs font-black text-cyan-900 uppercase mb-2">
          <i class="fas fa-heading mr-1"></i>Kop Header Rapor — Override Per-Lembaga
        </h5>
        <p class="text-[11px] text-cyan-700 mb-3">
          Isi field di bawah untuk override kop. Kosongkan = pakai kop aplikasi global di Pengaturan
          Web.
        </p>
        <div class="space-y-2">
          <input
            v-model="pengaturanForm.kop_line1"
            :placeholder="`Baris 1${globalKop.kopLine1 ? ' (default: ' + globalKop.kopLine1 + ')' : ''}`"
            class="w-full px-3 py-2 text-xs bg-[var(--bg-card)] border border-cyan-300 rounded-lg"
          />
          <input
            v-model="pengaturanForm.kop_line2"
            :placeholder="`Baris 2${globalKop.kopLine2 ? ' (default: ' + globalKop.kopLine2 + ')' : ''}`"
            class="w-full px-3 py-2 text-xs bg-[var(--bg-card)] border border-cyan-300 rounded-lg"
          />
          <input
            v-model="pengaturanForm.kop_line3"
            :placeholder="`Baris 3${globalKop.kopLine3 ? ' (default: ' + globalKop.kopLine3 + ')' : ''}`"
            class="w-full px-3 py-2 text-xs bg-[var(--bg-card)] border border-cyan-300 rounded-lg"
          />
          <input
            v-model="pengaturanForm.kop_line4"
            :placeholder="`Baris 4${globalKop.kopLine4 ? ' (default: ' + globalKop.kopLine4 + ')' : ''}`"
            class="w-full px-3 py-2 text-xs bg-[var(--bg-card)] border border-cyan-300 rounded-lg"
          />
        </div>
      </div>

      <!-- Logo Kop Lembaga (sisi kanan rapor) -->
      <div
        class="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-4 md:p-5 border border-emerald-200 dark:border-emerald-700"
      >
        <h5 class="text-xs font-black text-emerald-900 uppercase mb-2">
          <i class="fas fa-image mr-1"></i>Logo KOP Lembaga (Sisi Kanan Rapor)
        </h5>
        <p class="text-[11px] text-emerald-700 mb-2">
          Kosong = pakai Logo Kop dari Pengaturan Web.
        </p>
        <div class="flex items-center gap-3">
          <div
            class="w-20 h-20 rounded bg-[var(--bg-card)] border border-emerald-300 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="pengaturanForm.kop_logo"
              :src="pengaturanForm.kop_logo"
              class="w-full h-full object-contain"
            />
            <i v-else class="fas fa-image text-[var(--text-tertiary)] text-2xl"></i>
          </div>
          <input
            type="file"
            accept="image/*"
            @change="uploadKopLogo"
            :disabled="uploading"
            class="text-xs flex-1"
          />
          <button
            v-if="pengaturanForm.kop_logo"
            @click="pengaturanForm.kop_logo = ''"
            class="text-xs text-rose-600 font-bold"
          >
            <i class="fas fa-trash mr-1"></i>Hapus
          </button>
        </div>
      </div>

      <!-- Logo Qiraati (shared global) — hanya untuk lembaga Qiraati -->
      <div
        v-if="!isFormalLembaga"
        class="bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl p-4 md:p-5 border border-cyan-200 dark:border-cyan-700"
      >
        <h5 class="text-xs font-black text-[var(--text-on-accent)] uppercase mb-2">
          <i class="fas fa-star mr-1"></i>Logo Qiraati (GLOBAL — Sisi Kiri Rapor &amp; Rekap)
        </h5>
        <p class="text-[11px] text-cyan-800 mb-2">
          Shared: berlaku untuk SEMUA lembaga Qiraati (TPQ Pagi/Sore, Pra PTPT, PTPT, PPPH). Logo
          bintang segi 8.
        </p>
        <div class="flex items-center gap-3">
          <div
            class="w-20 h-20 rounded bg-[var(--bg-card)] border border-cyan-300 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="globalKop.logoQiraati"
              :src="globalKop.logoQiraati"
              class="w-full h-full object-contain"
            />
            <i v-else class="fas fa-star text-cyan-300 text-2xl"></i>
          </div>
          <input
            type="file"
            accept="image/*"
            @change="uploadLogoQiraati"
            :disabled="uploading"
            class="text-xs flex-1"
          />
        </div>
      </div>

      <!-- v.20.70.0526: PSB Info Pembayaran + Syarat Ketentuan PDF per-lembaga -->
      <div
        class="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-4 md:p-5 border border-teal-200 dark:border-teal-700"
      >
        <h5 class="text-xs font-black text-teal-900 uppercase mb-2">
          <i class="fas fa-file-pdf mr-1"></i>Dokumen PSB Lembaga (PDF, max 5 MB)
        </h5>
        <p class="text-[11px] text-teal-700 mb-3">
          Akan tampil sebagai tombol di form PSB publik setelah calon santri pilih lembaga ini.
        </p>
        <div class="space-y-3">
          <div>
            <label class="text-[11px] font-bold text-teal-800 block mb-1"
              >📄 Info Pembayaran</label
            >
            <div class="flex items-center gap-2">
              <input
                type="file"
                accept="application/pdf"
                @change="(e) => uploadPdf('info_pembayaran_url', e)"
                :disabled="uploading"
                class="text-xs flex-1"
              />
              <a
                v-if="pengaturanForm.info_pembayaran_url"
                :href="pengaturanForm.info_pembayaran_url"
                target="_blank"
                rel="noopener"
                class="text-xs text-emerald-700 font-bold underline"
                >Lihat PDF</a
              >
              <button
                v-if="pengaturanForm.info_pembayaran_url"
                @click="pengaturanForm.info_pembayaran_url = ''"
                class="text-xs text-rose-600 font-bold"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div>
            <label class="text-[11px] font-bold text-teal-800 block mb-1"
              >📋 Syarat &amp; Ketentuan</label
            >
            <div class="flex items-center gap-2">
              <input
                type="file"
                accept="application/pdf"
                @change="(e) => uploadPdf('syarat_ketentuan_url', e)"
                :disabled="uploading"
                class="text-xs flex-1"
              />
              <a
                v-if="pengaturanForm.syarat_ketentuan_url"
                :href="pengaturanForm.syarat_ketentuan_url"
                target="_blank"
                rel="noopener"
                class="text-xs text-emerald-700 font-bold underline"
                >Lihat PDF</a
              >
              <button
                v-if="pengaturanForm.syarat_ketentuan_url"
                @click="pengaturanForm.syarat_ketentuan_url = ''"
                class="text-xs text-rose-600 font-bold"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <!-- v.20.75.0526: Text version Info Pembayaran + Syarat (lebih praktis daripada PDF) -->
          <div>
            <label class="text-[11px] font-bold text-teal-800 block mb-1"
              >📝 Info Pembayaran (teks inline)</label
            >
            <textarea
              v-model="pengaturanForm.info_pembayaran_teks"
              rows="3"
              placeholder="Cth: SPP Rp 150.000/bulan, daftar ulang Rp 250.000..."
              class="w-full text-xs px-3 py-2 rounded border border-teal-200 bg-[var(--bg-card)] resize-none"
            ></textarea>
          </div>
          <div>
            <label class="text-[11px] font-bold text-teal-800 block mb-1"
              >📜 Syarat &amp; Ketentuan (teks inline)</label
            >
            <textarea
              v-model="pengaturanForm.syarat_ketentuan_teks"
              rows="4"
              placeholder="Cth: 1. Mengisi formulir lengkap
2. Foto copy KK + Akta
3. ..."
              class="w-full text-xs px-3 py-2 rounded border border-teal-200 bg-[var(--bg-card)] resize-none"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- v.20.75.0526: ACF Custom Fields PSB per-lembaga -->
      <div
        class="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-4 md:p-5 border border-rose-200 dark:border-rose-700"
      >
        <h5 class="text-xs font-black text-rose-900 uppercase mb-2">
          <i class="fas fa-list-check mr-1"></i>Custom Fields PSB (ACF)
        </h5>
        <p class="text-[11px] text-rose-700 mb-3">
          Field tambahan yang akan muncul di form PSB publik setelah calon santri pilih lembaga ini.
        </p>
        <div class="space-y-2">
          <div
            v-for="(field, idx) in pengaturanForm.psb_fields"
            :key="idx"
            class="bg-[var(--bg-card)] rounded-lg p-3 border border-rose-200 space-y-2"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-2">
              <input
                v-model="field.label"
                placeholder="Label *"
                class="md:col-span-3 text-xs px-2 py-1.5 border rounded"
              />
              <input
                v-model="field.id"
                placeholder="id (slug, opt)"
                class="md:col-span-2 text-xs px-2 py-1.5 border rounded"
              />
              <select v-model="field.type" class="md:col-span-2 text-xs px-2 py-1.5 border rounded">
                <option value="text">Teks</option>
                <option value="number">Angka</option>
                <option value="date">Tanggal</option>
                <option value="tel">No. Telp</option>
                <option value="email">Email</option>
                <option value="textarea">Textarea</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
                <option value="file">Upload File</option>
              </select>
              <input
                v-model="field.placeholder"
                placeholder="Placeholder/help"
                class="md:col-span-3 text-xs px-2 py-1.5 border rounded"
              />
              <label class="md:col-span-1 flex items-center gap-1 text-xs">
                <input type="checkbox" v-model="field.required" /> Wajib
              </label>
              <button
                @click="removeAcfField(idx)"
                class="md:col-span-1 text-xs text-rose-600 font-bold hover:bg-rose-100 rounded px-2 py-1"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
            <div v-if="field.type === 'dropdown'">
              <input
                v-model="field._optsStr"
                @input="updateOptsFromStr(field)"
                placeholder="Pilihan dropdown (pisah koma)"
                class="w-full text-xs px-2 py-1.5 border rounded"
              />
            </div>
          </div>
          <button
            @click="addAcfField"
            class="text-xs font-bold px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Field
          </button>
        </div>
      </div>

      <button
        @click="simpanPengaturan"
        :disabled="saving"
        class="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-black py-3 rounded-xl shadow-md disabled:opacity-50"
      >
        <i :class="['fas', saving ? 'fa-spinner fa-spin' : 'fa-save', 'mr-2']"></i>SIMPAN PENGATURAN
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// v.21.10.0526: + LEMBAGA_GROUPS + getLembagaGroup untuk group hierarchy display
import { useLembaga, LEMBAGA_GROUPS, getLembagaGroup } from '@/composables/useLembaga'
import { useSettingsStore } from '@/stores/settings'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { uploadBase64 } from '@/services/storage'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/services/firebase'
import UiActionCard from '@/components/ui/UiActionCard.vue'

const route = useRoute()
const router = useRouter()
const { lembagaRaw } = useLembaga()
const settings = useSettingsStore()
const toast = useToast()
const confirm = useConfirm()

const lembagaId = computed(() => route.params.id || '')
const activeSection = ref('')

const SECTION_LABELS = {
  kelas: 'Kelas/Jilid',
  rapor: 'Rapor Semester',
  rekap: 'Rekap Prestasi',
  absen: 'Absen Bulanan',
  pengaturan: 'Pengaturan'
}
const sectionLabel = computed(() => SECTION_LABELS[activeSection.value] || '')

const lembagaData = computed(
  () =>
    (lembagaRaw.value || []).find(
      (l) =>
        String(l.lembaga || '')
          .toLowerCase()
          .trim() === String(lembagaId.value).toLowerCase().trim()
    ) || null
)
const tipeRaw = computed(() =>
  String(lembagaData.value?.tipe || lembagaData.value?.tipe_lembaga || 'Qiraati')
)
const tipeLabel = computed(() => tipeRaw.value.toUpperCase())
const tipeBadgeClass = computed(() => {
  const t = tipeRaw.value.toLowerCase()
  if (t === 'formal') return 'bg-cyan-100 text-cyan-700'
  if (t.includes('non')) return 'bg-slate-200 text-[var(--text-primary)]'
  return 'bg-emerald-100 text-emerald-700'
})
const isFormalLembaga = computed(() => /formal|sekolah/i.test(tipeRaw.value))
// v.20.74.4.0526: Non-lembaga (Yayasan, Pondok, dst) tidak punya KBM — hide Kelas/Rapor/Rekap/Absen, hanya tampilkan Pengaturan
const isNonLembaga = computed(() => /non.lembaga|yayasan|pondok|kantor|admin/i.test(tipeRaw.value))

// v.21.10.0526: Group hierarchy info — TPQ Pagi/Sore/Pra PTPT ada di group TPQ, etc.
const groupKey = computed(() => {
  // Cari key di LEMBAGA_GROUPS dimana lembagaId termasuk variants
  const id = String(lembagaId.value || '').trim()
  for (const [key, info] of Object.entries(LEMBAGA_GROUPS)) {
    if ((info.variants || []).includes(id)) return key
  }
  return null
})
const groupInfo = computed(() => (groupKey.value ? LEMBAGA_GROUPS[groupKey.value] : null))
const siblingVariants = computed(() => {
  if (!groupInfo.value) return []
  return (groupInfo.value.variants || []).filter((v) => v !== lembagaId.value)
})
const groupBadgeClass = computed(() => {
  const g = groupInfo.value?.group
  if (g === 'qiraati') return 'bg-emerald-100 text-emerald-800 border-emerald-300'
  if (g === 'sekolah') return 'bg-cyan-100 text-cyan-800 border-cyan-300'
  if (g === 'mahad') return 'bg-teal-100 text-teal-800 border-teal-300'
  if (g === 'non-lembaga') return 'bg-slate-200 text-[var(--text-primary)] border-[var(--border-default)]'
  return 'bg-cyan-100 text-cyan-800 border-cyan-300'
})

// === Kelas CRUD ===
const newKelasInput = ref('')
async function onAddKelas() {
  const v = newKelasInput.value.trim()
  if (!v) return
  const idx = (lembagaRaw.value || []).findIndex((l) => l.lembaga === lembagaData.value?.lembaga)
  if (idx < 0) return
  const list = [...(lembagaRaw.value[idx].kelas || [])]
  if (list.includes(v)) {
    toast.warning(`"${v}" sudah ada`)
    return
  }
  list.push(v)
  await saveLembagaKelas(list)
  newKelasInput.value = ''
}
async function onEditKelas(i) {
  const oldVal = lembagaData.value?.kelas?.[i] || ''
  const newVal = prompt('Edit kelas:', oldVal)
  if (!newVal || newVal.trim() === oldVal) return
  const list = [...(lembagaData.value?.kelas || [])]
  list[i] = newVal.trim()
  await saveLembagaKelas(list)
}
async function onHapusKelas(i) {
  if (
    !(await confirm({
      title: 'Hapus kelas?',
      message: `Hapus "${lembagaData.value?.kelas?.[i]}"?`,
      danger: true
    }))
  )
    return
  const list = [...(lembagaData.value?.kelas || [])]
  list.splice(i, 1)
  await saveLembagaKelas(list)
}
async function saveLembagaKelas(newList) {
  saving.value = true
  try {
    const all = [...(lembagaRaw.value || [])]
    const idx = all.findIndex((l) => l.lembaga === lembagaData.value?.lembaga)
    if (idx < 0) throw new Error('Lembaga tidak ditemukan')
    all[idx] = { ...all[idx], kelas: newList }
    await setDoc(doc(db, 'master', 'lembaga'), { list: all })
    toast.success('Daftar kelas tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// === Rapor: Predikat global + Schema editor ===
const saving = ref(false)
const uploading = ref(false)
const predikatRules = ref([])
const raporSchema = ref({})

// v.20.56.0526: Deteksi PTPT/PPPH legacy schema di Firestore (perKelas + juz_* mapel)
const ptptLegacyDetected = computed(() => {
  const all = settings.settings?.raporSchemas || {}
  const lname = String(lembagaId.value || '')
    .toLowerCase()
    .trim()
  if (!['ptpt', 'ppph', 'p3h'].includes(lname)) return false
  const k = Object.keys(all).find((kk) => String(kk).toLowerCase().trim() === lname)
  const found = k ? all[k] : null
  if (!found) return false
  return (
    found.perKelas &&
    Array.isArray(found.jenjang) &&
    found.jenjang.some(
      (j) =>
        Array.isArray(j.mapel) && j.mapel.some((m) => /juz/i.test(String(m.id || m.nama || '')))
    )
  )
})

// v.20.52.0526: Preview Kelas → Juz groups untuk flat kelasJuz schema
const flatKelasGroupsPreview = computed(() => {
  if (raporSchema.value.tableLayout !== 'kelasJuz') return []
  const rows = raporSchema.value.rows || []
  const map = {}
  for (const r of rows) {
    if (!map[r.kelas]) map[r.kelas] = []
    map[r.kelas].push(r.juz)
  }
  return Object.keys(map).map((k) => ({ kelas: k, juzList: map[k] }))
})

function loadPredikatRules() {
  const rules = settings.settings?.predikatRules
  if (Array.isArray(rules) && rules.length > 0) {
    predikatRules.value = JSON.parse(JSON.stringify(rules))
  } else {
    predikatRules.value = [
      { min: 85, max: 100, label: 'A' },
      { min: 70, max: 84, label: 'B' },
      { min: 55, max: 69, label: 'C' },
      { min: 0, max: 54, label: 'D' }
    ]
  }
}
function addPredikatRule() {
  predikatRules.value.push({ min: 0, max: 0, label: '' })
}

function loadSchema() {
  const all = settings.settings?.raporSchemas || {}
  const keys = Object.keys(all)
  const lname = String(lembagaId.value || '')
    .toLowerCase()
    .trim()
  const k = keys.find((kk) => String(kk).toLowerCase().trim() === lname)
  const found = k ? all[k] : null
  if (found && Object.keys(found).length > 0) {
    // v.20.56.0526: Auto-skip legacy PTPT/PPPH schema (perKelas + juz_* mapel) — biar kyai bisa klik template kelasJuz
    const isPtptLike = lname === 'ptpt' || lname === 'ppph' || lname === 'p3h'
    const looksLegacyJuzMapel =
      found.perKelas &&
      Array.isArray(found.jenjang) &&
      found.jenjang.some(
        (j) =>
          Array.isArray(j.mapel) && j.mapel.some((m) => /juz/i.test(String(m.id || m.nama || '')))
      )
    if (isPtptLike && looksLegacyJuzMapel) {
      raporSchema.value = {} // anggap kosong → kyai klik tombol PTPT (Kelas Juz) → preview muncul → Simpan
      return
    }
    raporSchema.value = JSON.parse(JSON.stringify(found))
  } else {
    raporSchema.value = {}
  }
}
function addLevel() {
  if (!Array.isArray(raporSchema.value.levels)) raporSchema.value.levels = []
  const next = raporSchema.value.levels.length + 1
  raporSchema.value.levels.push({
    id: 'lvl_' + Date.now(),
    label: 'Level ' + next,
    levelBaca: '',
    khotamList: [{ id: 'kh_I', labelKhotam: 'Khotam I', multiplier: 2 }]
  })
}
function addKhotam(lvl) {
  if (!Array.isArray(lvl.khotamList)) lvl.khotamList = []
  const RM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  const next = lvl.khotamList.length
  lvl.khotamList.push({
    id: 'kh_' + (RM[next] || next + 1),
    labelKhotam: 'Khotam ' + (RM[next] || next + 1),
    multiplier: lvl.khotamList[lvl.khotamList.length - 1]?.multiplier || 2
  })
}
function addFieldNilai() {
  if (!Array.isArray(raporSchema.value.fieldsNilai)) raporSchema.value.fieldsNilai = []
  raporSchema.value.fieldsNilai.push({ id: 'f_' + Date.now(), label: 'Baru' })
}
function addJenjang() {
  if (!Array.isArray(raporSchema.value.jenjang)) raporSchema.value.jenjang = []
  raporSchema.value.jenjang.push({
    kelas: 'Baru',
    mapel: [{ id: 'm_' + Date.now(), nama: '', kkm: 80 }]
  })
}
function addSection() {
  if (!Array.isArray(raporSchema.value.sections)) raporSchema.value.sections = []
  raporSchema.value.sections.push({
    id: 'sec_' + Date.now(),
    title: 'Section Baru',
    rows: [],
    fields: [{ id: 'f_' + Date.now(), label: 'Nilai', type: 'number' }]
  })
}

async function simpanRaporSchema() {
  saving.value = true
  try {
    const allSchemas = { ...(settings.settings?.raporSchemas || {}) }
    allSchemas[lembagaId.value] = JSON.parse(JSON.stringify(raporSchema.value))
    await setDoc(
      doc(db, 'settings', 'general'),
      { raporSchemas: allSchemas, predikatRules: predikatRules.value },
      { merge: true }
    )
    await setDoc(
      doc(db, 'settings', 'web'),
      { raporSchemas: allSchemas, predikatRules: predikatRules.value },
      { merge: true }
    )
    settings.settings.raporSchemas = allSchemas
    settings.settings.predikatRules = predikatRules.value
    toast.success(`Schema rapor ${lembagaId.value} tersimpan`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

async function resetRaporSchema() {
  if (
    !(await confirm({
      title: 'Reset schema?',
      message: `Hapus override schema rapor ${lembagaId.value}?`,
      danger: true
    }))
  )
    return
  saving.value = true
  try {
    const allSchemas = { ...(settings.settings?.raporSchemas || {}) }
    delete allSchemas[lembagaId.value]
    await setDoc(doc(db, 'settings', 'general'), { raporSchemas: allSchemas }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { raporSchemas: allSchemas }, { merge: true })
    settings.settings.raporSchemas = allSchemas
    raporSchema.value = {}
    toast.success('Schema di-reset ke default factory')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// === Rekap mapel ===
const rekapMapelStr = ref('')
function loadRekapMapel() {
  const all = settings.settings?.rekapDiniyahMapel || {}
  rekapMapelStr.value = all[lembagaId.value] || ''
}
async function simpanRekapMapel() {
  saving.value = true
  try {
    const all = { ...(settings.settings?.rekapDiniyahMapel || {}) }
    all[lembagaId.value] = rekapMapelStr.value
    await setDoc(doc(db, 'settings', 'general'), { rekapDiniyahMapel: all }, { merge: true })
    await setDoc(doc(db, 'settings', 'web'), { rekapDiniyahMapel: all }, { merge: true })
    settings.settings.rekapDiniyahMapel = all
    toast.success('Mapel rekap tersimpan')
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// === Pengaturan (KOP override + Logo Kop Lembaga) ===
const pengaturanForm = reactive({
  kop_line1: '',
  kop_line2: '',
  kop_line3: '',
  kop_line4: '',
  kop_logo: '',
  info_pembayaran_url: '',
  syarat_ketentuan_url: '',
  // v.20.75.0526: text version + ACF fields
  info_pembayaran_teks: '',
  syarat_ketentuan_teks: '',
  psb_fields: []
})
const globalKop = computed(() => settings.settings || {})

function loadPengaturan() {
  const l = lembagaData.value || {}
  pengaturanForm.kop_line1 = l.kop_line1 || ''
  pengaturanForm.kop_line2 = l.kop_line2 || ''
  pengaturanForm.kop_line3 = l.kop_line3 || ''
  pengaturanForm.kop_line4 = l.kop_line4 || ''
  pengaturanForm.kop_logo = l.kop_logo || ''
  pengaturanForm.info_pembayaran_url = l.info_pembayaran_url || ''
  pengaturanForm.syarat_ketentuan_url = l.syarat_ketentuan_url || ''
  // v.20.75.0526
  pengaturanForm.info_pembayaran_teks = l.info_pembayaran_teks || ''
  pengaturanForm.syarat_ketentuan_teks = l.syarat_ketentuan_teks || ''
  pengaturanForm.psb_fields = Array.isArray(l.psb_fields)
    ? l.psb_fields.map((f) => ({
        ...f,
        _optsStr: Array.isArray(f.options) ? f.options.join(', ') : ''
      }))
    : []
}

// v.20.75.0526: ACF field helpers
function addAcfField() {
  pengaturanForm.psb_fields.push({
    id: 'field_' + (pengaturanForm.psb_fields.length + 1),
    label: '',
    type: 'text',
    placeholder: '',
    required: false,
    options: [],
    _optsStr: ''
  })
}
function removeAcfField(idx) {
  pengaturanForm.psb_fields.splice(idx, 1)
}
function updateOptsFromStr(field) {
  field.options = String(field._optsStr || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

async function uploadKopLogo(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 4 * 1024 * 1024) return toast.error('Max 4 MB')
  uploading.value = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `lembaga_logos/kop_${lembagaId.value}_${Date.now()}.png`,
          reader.result,
          file.type
        )
        pengaturanForm.kop_logo = url
        toast.success('Logo terupload')
      } catch (err) {
        toast.error('Upload gagal: ' + err.message)
      } finally {
        uploading.value = false
      }
    }
    reader.readAsDataURL(file)
  } catch (err) {
    uploading.value = false
    toast.error('Error: ' + err.message)
  }
  e.target.value = ''
}

async function uploadLogoQiraati(e) {
  const file = e.target.files?.[0]
  if (!file) return
  if (file.size > 4 * 1024 * 1024) return toast.error('Max 4 MB')
  uploading.value = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const url = await uploadBase64(
          `app_logos/logoQiraati_${Date.now()}.png`,
          reader.result,
          file.type
        )
        await setDoc(doc(db, 'settings', 'general'), { logoQiraati: url }, { merge: true })
        await setDoc(doc(db, 'settings', 'web'), { logoQiraati: url }, { merge: true })
        settings.settings.logoQiraati = url
        toast.success('Logo Qiraati global terupload')
      } catch (err) {
        toast.error('Upload gagal: ' + err.message)
      } finally {
        uploading.value = false
      }
    }
    reader.readAsDataURL(file)
  } catch (err) {
    uploading.value = false
    toast.error('Error: ' + err.message)
  }
  e.target.value = ''
}

async function uploadPdf(field, e) {
  // v.20.70.0526: Upload PDF (Info Pembayaran / Syarat Ketentuan) per-lembaga
  const file = e.target.files?.[0]
  if (!file) return
  if (file.type !== 'application/pdf') {
    toast.error('Harus file PDF')
    e.target.value = ''
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Max 5 MB')
    e.target.value = ''
    return
  }
  uploading.value = true
  try {
    const reader = new FileReader()
    reader.onload = async () => {
      try {
        const fname = field === 'info_pembayaran_url' ? 'info_pembayaran' : 'syarat_ketentuan'
        const url = await uploadBase64(
          `lembaga/${lembagaId.value}/${fname}_${Date.now()}.pdf`,
          reader.result,
          'application/pdf'
        )
        pengaturanForm[field] = url
        toast.success('PDF terupload — jangan lupa SIMPAN PENGATURAN')
      } catch (err) {
        toast.error('Upload gagal: ' + err.message)
      } finally {
        uploading.value = false
      }
    }
    reader.readAsDataURL(file)
  } catch (err) {
    uploading.value = false
    toast.error('Error: ' + err.message)
  }
  e.target.value = ''
}

async function simpanPengaturan() {
  saving.value = true
  try {
    const all = [...(lembagaRaw.value || [])]
    const idx = all.findIndex((l) => l.lembaga === lembagaData.value?.lembaga)
    if (idx < 0) throw new Error('Lembaga tidak ditemukan')
    // v.20.75.0526: strip _optsStr ephemeral key before save
    const cleanedFields = (pengaturanForm.psb_fields || []).map((f) => {
      const { _optsStr, ...rest } = f
      return rest
    })
    all[idx] = {
      ...all[idx],
      kop_line1: pengaturanForm.kop_line1,
      kop_line2: pengaturanForm.kop_line2,
      kop_line3: pengaturanForm.kop_line3,
      kop_line4: pengaturanForm.kop_line4,
      kop_logo: pengaturanForm.kop_logo,
      info_pembayaran_url: pengaturanForm.info_pembayaran_url,
      syarat_ketentuan_url: pengaturanForm.syarat_ketentuan_url,
      info_pembayaran_teks: pengaturanForm.info_pembayaran_teks,
      syarat_ketentuan_teks: pengaturanForm.syarat_ketentuan_teks,
      psb_fields: cleanedFields
    }
    await setDoc(doc(db, 'master', 'lembaga'), { list: all })
    toast.success(`Pengaturan ${lembagaId.value} tersimpan`)
  } catch (e) {
    toast.error('Gagal: ' + (e.message || e))
  } finally {
    saving.value = false
  }
}

// === Navigation ke page lain ===
function bukaRaporPage() {
  router.push({ path: '/rapor' })
}
function bukaRekapPage() {
  router.push({ path: '/input-bulanan', query: { lembaga: lembagaId.value } })
}
function bukaAbsenPage() {
  router.push({ path: '/absensi-santri', query: { lembaga: lembagaId.value } })
}

async function onDelete() {
  router.push(`/lembaga/${lembagaId.value}/edit`)
  toast.info('Buka edit form untuk konfirmasi hapus')
}

const hasSchema = computed(() => {
  const all = settings.settings?.raporSchemas || {}
  const keys = Object.keys(all)
  const lname = String(lembagaId.value || '')
    .toLowerCase()
    .trim()
  return keys.some((k) => String(k).toLowerCase().trim() === lname)
})

function getSchemaTypeBadge() {
  if (raporSchema.value?.perLevel) return 'perLevel (Level × Khotam Matrix)'
  if (raporSchema.value?.perKelas) return 'perKelas (Mapel × Kelas + KKM)'
  if (Array.isArray(raporSchema.value?.sections) && raporSchema.value.sections.length > 0)
    return 'sections (Matrix Jilid)'
  return 'belum di-set / kosong'
}

function applyTemplate(t) {
  if (t === 'tpq') {
    raporSchema.value = {
      sections: [
        {
          id: 'jilid',
          title: 'Jilid',
          rows: ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B', '5A', '5B'],
          fields: [
            { id: 'tgl_khotam', label: 'Tgl Khotam Jilid', type: 'date' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text' },
            { id: 'surat_pendek', label: 'Surat Pendek', type: 'text' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'adab' }
          ]
        },
        {
          id: 'imtas',
          title: 'Kelas Persiapan IMTAS',
          rows: [],
          fields: [
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text' },
            { id: 'surat_pendek', label: 'Surat Pendek', type: 'text' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        },
        {
          id: 'khotaman',
          title: 'Kelas Persiapan Khotaman',
          rows: [],
          fields: [
            { id: 'tgl_imtas', label: 'Tgl IMTAS', type: 'date' },
            { id: 'fashohah', label: 'Fashohah', type: 'number' },
            { id: 'tartil', label: 'Tartil', type: 'number' },
            { id: 'ghorib', label: 'Ghorib', type: 'number' },
            { id: 'tajwid', label: 'Tajwid', type: 'number' },
            { id: 'doa_harian', label: 'Doa Harian', type: 'text' },
            { id: 'surat_pendek', label: 'Surat Pendek', type: 'text' },
            { id: 'adab', label: 'Adab', type: 'number' },
            { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
          ]
        }
      ]
    }
  } else if (t === 'pra-ptpt') {
    const KH3_2 = ['I', 'II', 'III'].map((rm) => ({
      id: 'kh_' + rm,
      labelKhotam: 'Khotam ' + rm,
      multiplier: 2
    }))
    const KH3_3 = ['I', 'II', 'III'].map((rm) => ({
      id: 'kh_' + rm,
      labelKhotam: 'Khotam ' + rm,
      multiplier: 3
    }))
    const KH11_3 = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map(
      (rm) => ({ id: 'kh_' + rm, labelKhotam: 'Khotam ' + rm, multiplier: 3 })
    )
    raporSchema.value = {
      perLevel: true,
      fieldsNilai: [
        { id: 'fashohah', label: 'Fashohah' },
        { id: 'tartil', label: 'Tartil' },
        { id: 'tahfizh_juz_30', label: 'Tahfizh Juz 30' },
        { id: 'ghorib', label: 'Ghorib' },
        { id: 'tajwid', label: 'Tajwid' },
        { id: 'doa_harian', label: 'Doa Harian' },
        { id: 'adab', label: 'Adab' }
      ],
      levels: [
        { id: 'lvl_1', label: 'Level 1', levelBaca: '½ Juz', khotamList: KH3_2 },
        { id: 'lvl_2', label: 'Level 2', levelBaca: '1 Juz', khotamList: KH3_2 },
        { id: 'lvl_3', label: 'Level 3', levelBaca: '1½ Juz', khotamList: KH3_2 },
        { id: 'lvl_4', label: 'Level 4', levelBaca: '2 Juz', khotamList: KH3_3 },
        { id: 'lvl_5', label: 'Level 5', levelBaca: '3 Juz', khotamList: KH11_3 }
      ]
    }
  } else if (t === 'ptpt') {
    // v.20.50.0526: PTPT spec kyai v2 — Istimror+Kelancaran (Hafalan), Fashohah+Tajwid (Bacaan), 7 juz per kelas
    const PTPT_FIELDS = [
      { id: 'istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'kelancaran', label: 'Kelancaran', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'tajwid', label: 'Tajwid', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'adab', label: 'Adab', type: 'number' },
      { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
    ]
    // v.20.51.0526: 5 juz × 6 kelas = 30 juz total
    const rows = []
    for (let kls = 1; kls <= 6; kls++) {
      const start = (kls - 1) * 5 + 1
      for (let j = start; j <= start + 4; j++) rows.push({ kelas: 'Kelas ' + kls, juz: 'Juz ' + j })
    }
    raporSchema.value = { tableLayout: 'kelasJuz', fields: PTPT_FIELDS, rows }
  } else if (t === 'ppph') {
    // v.20.45.0526: PPPH = PTPT struktur (kelas × juz), kyai req
    const PPPH_FIELDS = [
      { id: 'istimror', label: 'Istimror', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'murajaah', label: 'Murajaah', type: 'number', group: 'Kualitas Hafalan' },
      { id: 'fashohah', label: 'Fashohah', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'tartil', label: 'Tartil', type: 'number', group: 'Kualitas Bacaan' },
      { id: 'adab', label: 'Adab', type: 'number' },
      { id: 'predikat', label: 'Predikat', type: 'auto_predikat', source: 'avg' }
    ]
    raporSchema.value = {
      sections: [
        {
          id: 'tahap_1',
          title: 'Tahap 1',
          rows: ['Juz 1', 'Juz 2', 'Juz 3', 'Juz 4', 'Juz 5'],
          fields: JSON.parse(JSON.stringify(PPPH_FIELDS))
        },
        {
          id: 'tahap_2',
          title: 'Tahap 2',
          rows: ['Juz 6', 'Juz 7', 'Juz 8', 'Juz 9', 'Juz 10'],
          fields: JSON.parse(JSON.stringify(PPPH_FIELDS))
        },
        {
          id: 'tahap_3',
          title: 'Tahap 3',
          rows: ['Juz 11', 'Juz 12', 'Juz 13', 'Juz 14', 'Juz 15'],
          fields: JSON.parse(JSON.stringify(PPPH_FIELDS))
        }
      ]
    }
  } else if (t === 'diniyah') {
    // v.21.24.0526: Diniyah template — restore minimal (mapel default Madin)
    const DM = [
      { id: 'tauhid', nama: 'TAUHID', kkm: 80 },
      { id: 'fiqih', nama: 'FIQIH', kkm: 80 },
      { id: 'akhlaq', nama: 'AKHLAQ', kkm: 80 },
      { id: 'nahwu', nama: 'NAHWU', kkm: 80 },
      { id: 'sharaf', nama: 'SHARAF', kkm: 80 },
      { id: 'hadits', nama: 'HADITS', kkm: 80 },
      { id: 'tajwid', nama: 'TAJWID', kkm: 80 }
    ]
    raporSchema.value = {
      perKelas: true,
      jenjang: [
        { kelas: 'Kelas 1', mapel: JSON.parse(JSON.stringify(DM)) },
        { kelas: 'Kelas 2', mapel: JSON.parse(JSON.stringify(DM)) },
        { kelas: 'Kelas 3', mapel: JSON.parse(JSON.stringify(DM)) }
      ]
    }
  }
  toast.success(`Template "${t}" diterapkan`)
}
</script>
