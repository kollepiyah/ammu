<template>
  <!-- Modal Kartu Kenaikan — Matrix kelas × items + KOP + Catatan/Rekomendasi -->
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="kk.modalOpen.value"
        class="fixed inset-0 z-[140] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto no-print"
        @click.self="kk.tutupKartu()"
      >
        <div
          class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full my-4 max-h-[90vh] flex flex-col"
        >
          <!-- Header KOP -->
          <div
            id="kk-print-area"
            class="px-4 md:px-6 pt-5 pb-3 border-b-2 border-slate-700 text-center"
          >
            <p class="text-sm md:text-base font-black uppercase text-slate-800 dark:text-white">
              {{ kk.currentKop.value.judul || 'KONTROL KENAIKAN KELAS' }}
            </p>
            <p
              class="text-base md:text-lg font-black uppercase text-slate-800 dark:text-white mt-0.5"
            >
              {{ kk.currentKop.value.subjudul || '' }}
            </p>
            <p
              v-if="kk.currentKop.value.alamat"
              class="text-[10px] text-slate-600 dark:text-slate-400 mt-1"
            >
              {{ kk.currentKop.value.alamat }}
            </p>
          </div>

          <!-- Content scrollable -->
          <div class="flex-1 overflow-y-auto p-4 md:p-6">
            <!-- Identitas Santri -->
            <div
              class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 mb-3 border border-slate-200 dark:border-slate-700 text-xs"
            >
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                <div>
                  <span class="font-bold text-slate-500 inline-block w-32">No. Induk</span>:
                  {{ kk.currentSantri.value?.nis || '-' }}
                </div>
                <div>
                  <span class="font-bold text-slate-500 inline-block w-32">Tanggal Masuk</span>:
                  {{ kk.currentSantri.value?.tgl_masuk || '-' }}
                </div>
                <div>
                  <span class="font-bold text-slate-500 inline-block w-32">Nama</span>:
                  {{ kk.currentSantri.value?.nama || '-' }}
                </div>
                <div>
                  <span class="font-bold text-slate-500 inline-block w-32">Alamat</span>:
                  {{ kk.currentSantri.value?.alamat || '-' }}
                </div>
              </div>
            </div>

            <!-- Matrix kelas — 2 kelas per row -->
            <div v-if="kk.currentSchema.value?.kelasList?.length" class="space-y-3">
              <div
                v-for="(rowGroup, ri) in matrixRows"
                :key="`row-${ri}`"
                class="grid grid-cols-1 md:grid-cols-2 gap-3"
              >
                <div
                  v-for="kelas in rowGroup"
                  :key="kelas.id"
                  class="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden"
                >
                  <!-- Header kelas -->
                  <div
                    class="bg-slate-200 dark:bg-slate-700 text-center font-black text-xs py-1.5 border-b border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white"
                  >
                    {{ kelas.label }}
                  </div>
                  <!-- Item header label -->
                  <div
                    class="bg-slate-50 dark:bg-slate-900/50 text-center text-[10px] font-bold border-b border-slate-300 dark:border-slate-600 py-1 text-slate-700 dark:text-slate-300"
                  >
                    {{ kk.currentSchema.value.itemHeader || 'Item' }}
                  </div>
                  <!-- Matrix table -->
                  <table class="w-full text-[10px]">
                    <thead>
                      <tr class="bg-white dark:bg-slate-800">
                        <th
                          v-for="item in kelas.items || []"
                          :key="item.id"
                          class="border border-slate-300 dark:border-slate-600 px-1 py-1 font-bold text-center text-slate-700 dark:text-slate-200"
                        >
                          {{ item.label }}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white dark:bg-slate-800">
                        <td
                          v-for="item in kelas.items || []"
                          :key="item.id"
                          class="border border-slate-300 dark:border-slate-600 px-1 py-1"
                        >
                          <input
                            type="date"
                            :value="kk.getCellValue(kelas.id, item.id)"
                            @input="(e) => kk.setCellValue(kelas.id, item.id, e.target.value)"
                            class="w-full text-[9px] py-0.5 px-1 border-0 outline-none bg-transparent text-slate-800 dark:text-slate-100"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Ceremonial date (kalau enabled) -->
                  <div
                    v-if="kelas.ceremonial"
                    class="bg-amber-50 dark:bg-amber-900/20 border-t border-slate-300 dark:border-slate-600 px-2 py-1.5 flex items-center gap-2 text-[10px]"
                  >
                    <span class="font-bold text-amber-800 dark:text-amber-300">Ceremonial:</span>
                    <input
                      type="date"
                      :value="kk.getCeremonial(kelas.id)"
                      @input="(e) => kk.setCeremonial(kelas.id, e.target.value)"
                      class="flex-1 py-0.5 px-1 text-[10px] border border-amber-200 dark:border-amber-700 rounded bg-white dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center text-slate-400 py-6 text-sm italic">
              Schema untuk lembaga {{ kk.currentLembaga.value }} belum dikonfigurasi.
            </div>
          </div>

          <!-- Footer Actions -->
          <div
            class="px-4 md:px-6 py-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-2 rounded-b-2xl"
          >
            <button
              @click="kk.tutupKartu()"
              class="px-4 py-2 text-sm font-bold rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 cursor-pointer"
            >
              Batal
            </button>
            <button
              @click="cetakKartu"
              class="px-4 py-2 text-sm font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white cursor-pointer flex items-center gap-1.5"
            >
              <i class="fas fa-print"></i>Cetak
            </button>
            <button
              @click="kk.simpanKartu()"
              :disabled="kk.saving.value"
              class="px-4 py-2 text-sm font-black rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
            >
              <i :class="['fas', kk.saving.value ? 'fa-spinner fa-spin' : 'fa-save']"></i>
              {{ kk.saving.value ? 'Menyimpan...' : 'Simpan Kartu' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useKartuKenaikan } from '@/composables/useKartuKenaikan'
import { useSettingsStore } from '@/stores/settings'

const props = defineProps({
  kk: { type: Object, required: true }
})

const settings = useSettingsStore()

// Group kelas list jadi pairs (2 per row)
const matrixRows = computed(() => {
  const list = props.kk.currentSchema.value?.kelasList || []
  const rows = []
  for (let i = 0; i < list.length; i += 2) {
    rows.push([list[i], list[i + 1]].filter(Boolean))
  }
  return rows
})

// v.21.60.0526: Cetak kartu — inject KOP letterhead (logo + nama yayasan) sesuai kyai req
function cetakKartu() {
  setTimeout(() => {
    const target = document.querySelector('.fixed.z-\\[140\\] .bg-white.rounded-2xl')
    if (!target) {
      window.print()
      return
    }
    const w = window.open('', '_blank', 'width=900,height=1100')
    if (!w) {
      window.print()
      return
    }
    const s = settings.settings || {}
    const kop = props.kk.currentKop.value || {}
    const lembaga = props.kk.currentLembaga.value || ''
    // Pilih logo: logoUtama global atau logoQiraati untuk TPQ/Pra PTPT/PTPT/PPPH
    const isQiraati = /TPQ|PRA PTPT|PTPT|PPPH/i.test(lembaga)
    const logoUrl = isQiraati && s.logoQiraati ? s.logoQiraati : s.logoUtama || s.logoUrl || ''
    const line1 = s.kopLine1 || 'YAYASAN MAMBAUL ULUM'
    const line2 = kop.subjudul || s.kopLine2 || 'PONDOK PESANTREN MAMBAUL ULUM'
    const line3 = s.kopLine3 || ''
    const line4 = s.kopLine4 || ''
    const kopHtml = `
      <div style="display:flex;align-items:center;gap:14px;padding:8px 10px 12px;border-bottom:3px double #1e293b;margin-bottom:12px;">
        ${logoUrl ? `<img src="${logoUrl}" style="height:78px;width:78px;object-fit:contain;flex-shrink:0;" alt="logo" />` : ''}
        <div style="flex:1;text-align:center;">
          <div style="font-size:12px;font-weight:700;letter-spacing:0.5px;color:#1e293b;text-transform:uppercase;">${line1}</div>
          <div style="font-size:18px;font-weight:900;letter-spacing:1px;color:#0f172a;text-transform:uppercase;margin-top:2px;">${line2}</div>
          ${line3 ? `<div style="font-size:10px;color:#475569;margin-top:2px;">${line3}</div>` : ''}
          ${line4 ? `<div style="font-size:10px;color:#475569;">${line4}</div>` : ''}
        </div>
        ${logoUrl ? `<div style="height:78px;width:78px;flex-shrink:0;"></div>` : ''}
      </div>
      <div style="text-align:center;font-size:14px;font-weight:900;letter-spacing:1.2px;color:#1e293b;text-transform:uppercase;margin-bottom:10px;text-decoration:underline;">
        ${kop.judul || 'KONTROL KENAIKAN KELAS'}
      </div>
    `
    const html = target.outerHTML
    w.document.write(`<!DOCTYPE html><html><head><title>Kartu Kenaikan</title>
<script src="https://cdn.tailwindcss.com"><\/script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
<style>@media print { @page { size: A4; margin: 10mm; } input { border: 0 !important; } #kk-print-area { display:none !important; } }</style>
</head><body class="p-4">${kopHtml}${html}
<script>setTimeout(()=>{window.print();},500);<\/script></body></html>`)
    w.document.close()
  }, 100)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
