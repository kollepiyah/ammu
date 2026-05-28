<template>
  <div class="p-3 md:p-5 max-w-5xl mx-auto space-y-4">
    <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
      <h1 class="text-xl md:text-2xl font-black"><i class="fas fa-chart-line text-cyan-500 mr-2"></i>Laporan Keuangan</h1>
      <p class="text-xs text-[var(--text-secondary)] mt-0.5">Ringkasan pemasukan + pengeluaran per periode</p>
    </div>

    <div class="bg-[var(--bg-card)] rounded-2xl p-3 border border-[var(--border-subtle)] shadow-sm grid grid-cols-2 gap-2">
      <select v-model.number="filterBulan" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
        <option :value="0">Setahun</option>
        <option v-for="(b, i) in NAMA_BULAN" :key="b" :value="i+1">{{ b }}</option>
      </select>
      <select v-model.number="filterTahun" class="px-3 py-2 text-sm rounded-xl border border-[var(--border-default)] bg-[var(--bg-card)]">
        <option v-for="y in [2024,2025,2026,2027]" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div class="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-200">
        <p class="text-[10px] uppercase font-black text-emerald-700">Pemasukan</p>
        <p class="text-2xl font-black text-emerald-800 mt-1">{{ fmtRp(totalPemasukan) }}</p>
        <p class="text-[10px] text-emerald-600 mt-1">{{ pembayaranList.length }} pembayaran POS</p>
      </div>
      <div class="bg-rose-50 rounded-2xl p-4 border-2 border-rose-200">
        <p class="text-[10px] uppercase font-black text-rose-700">Pengeluaran</p>
        <p class="text-2xl font-black text-rose-800 mt-1">{{ fmtRp(totalPengeluaran) }}</p>
        <p class="text-[10px] text-rose-600 mt-1">{{ bisyarohList.length }} slip bisyaroh</p>
      </div>
      <div :class="['rounded-2xl p-4 border-2', saldoBersih >= 0 ? 'bg-cyan-50 border-cyan-200' : 'bg-cyan-50 border-cyan-200']">
        <p class="text-[10px] uppercase font-black" :class="saldoBersih >= 0 ? 'text-cyan-700' : 'text-cyan-700'">Saldo Bersih</p>
        <p class="text-2xl font-black mt-1" :class="saldoBersih >= 0 ? 'text-cyan-800' : 'text-cyan-800'">{{ fmtRp(saldoBersih) }}</p>
        <p class="text-[10px] mt-1" :class="saldoBersih >= 0 ? 'text-cyan-600' : 'text-cyan-600'">{{ saldoBersih >= 0 ? 'Surplus' : 'Defisit' }} periode ini</p>
      </div>
    </div>

    <!-- Detail breakdown -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase mb-2 text-emerald-700"><i class="fas fa-arrow-down mr-1"></i>Pemasukan</h3>
        <div class="space-y-1 text-xs">
          <div class="flex justify-between"><span>Pembayaran Tagihan</span><b class="text-emerald-700">{{ fmtRp(sumPembayaran) }}</b></div>
          <!-- v.21.104.0527: tabungan tidak masuk pemasukan (selaras Buku Induk) -->
          <div class="flex justify-between text-[10px] text-[var(--text-tertiary)] italic"><span>Setor tabungan</span><span>tidak dihitung</span></div>
          <div class="border-t pt-1 flex justify-between font-black"><span>Total</span><span class="text-emerald-800">{{ fmtRp(totalPemasukan) }}</span></div>
        </div>
      </div>
      <div class="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-subtle)] shadow-sm">
        <h3 class="text-xs font-black uppercase mb-2 text-rose-700"><i class="fas fa-arrow-up mr-1"></i>Pengeluaran</h3>
        <div class="space-y-1 text-xs">
          <div class="flex justify-between"><span>Slip Bisyaroh Guru</span><b class="text-rose-700">{{ fmtRp(sumBisyaroh) }}</b></div>
          <!-- v.21.104.0527: tabungan tidak masuk pengeluaran (selaras Buku Induk) -->
          <div class="flex justify-between text-[10px] text-[var(--text-tertiary)] italic"><span>Tarik tabungan</span><span>tidak dihitung</span></div>
          <div class="border-t pt-1 flex justify-between font-black"><span>Total</span><span class="text-rose-800">{{ fmtRp(totalPengeluaran) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { subscribeColl } from '@/services/firestore'
import { fmtRp } from '@/utils/format'

const NAMA_BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
const pembayaranRaw = ref([])
const tabunganRaw = ref([])
const bisyarohRaw = ref([])
const filterBulan = ref(0)
const filterTahun = ref(new Date().getFullYear())
let unsubP = null, unsubT = null, unsubB = null

function matchPeriode(dateStr) {
  const d = new Date(dateStr || '')
  if (isNaN(d.getTime())) return false
  if (d.getFullYear() !== filterTahun.value) return false
  if (filterBulan.value > 0 && (d.getMonth() + 1) !== filterBulan.value) return false
  return true
}

const pembayaranList = computed(() => pembayaranRaw.value.filter((p) => matchPeriode(p.tanggal || p.created_at)))
const setorList = computed(() => tabunganRaw.value.filter((m) => (String(m.jenis).includes('setor') || String(m.jenis).includes('bayar')) && matchPeriode(m.tanggal || m.created_at)))
const tarikList = computed(() => tabunganRaw.value.filter((m) => String(m.jenis).includes('tarik') && matchPeriode(m.tanggal || m.created_at)))
const bisyarohList = computed(() => bisyarohRaw.value.filter((g) => {
  const [y, m] = String(g.periode || '').split('-')
  if (!y) return false
  if (Number(y) !== filterTahun.value) return false
  if (filterBulan.value > 0 && Number(m) !== filterBulan.value) return false
  return true
}))

const sumPembayaran = computed(() => pembayaranList.value.reduce((s, p) => s + (Number(p.nominal) || 0), 0))
const sumSetor = computed(() => setorList.value.reduce((s, m) => s + (Number(m.nominal) || 0), 0))
const sumTarik = computed(() => tarikList.value.reduce((s, m) => s + (Number(m.nominal) || 0), 0))
const sumBisyaroh = computed(() => bisyarohList.value.reduce((s, g) => s + (Number(g.take_home) || 0), 0))

// v.21.104.0527: tabungan dikeluarkan dari pemasukan/pengeluaran (selaras Buku Induk).
const totalPemasukan = computed(() => sumPembayaran.value)
const totalPengeluaran = computed(() => sumBisyaroh.value)
const saldoBersih = computed(() => totalPemasukan.value - totalPengeluaran.value)

onMounted(() => {
  unsubP = subscribeColl('keuangan_pembayaran', (docs) => { pembayaranRaw.value = docs })
  unsubT = subscribeColl('keuangan_tabungan_santri', (docs) => { tabunganRaw.value = docs })
  unsubB = subscribeColl('keuangan_gaji', (docs) => { bisyarohRaw.value = docs })
})
onUnmounted(() => {
  if (unsubP) { try { unsubP() } catch (e) {} }
  if (unsubT) { try { unsubT() } catch (e) {} }
  if (unsubB) { try { unsubB() } catch (e) {} }
})
</script>
