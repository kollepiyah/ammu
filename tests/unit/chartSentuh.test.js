// chartSentuh — tooltip grafik harus bisa dibuka dengan jari, dan setelan itu tak boleh
// tercecer di satu-dua grafik saja.
//
// Kyai (4 Sep 2026): "saat diklik dari hp kok gk muncul keterangannya ya, kalau di pc muncul."
//
// Dua hal yang dijaga:
//   1. `opsiChart` memang memasang `intersect: false` DAN tak merusak setelan pemanggil —
//      kalau `callbacks` tooltip (format Rupiah) sampai terhapus, grafik arus kas berubah
//      jadi angka telanjang tanpa ada yang menyadarinya;
//   2. SEMUA berkas pemilik grafik memakainya. Setelan yang tersalin manual adalah kelas bug
//      yang berulang di repo ini — grafik berikutnya pasti lahir tanpa setelan ini kalau tak
//      ada yang memaksa.
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { opsiChart, TOOLTIP_SENTUH, MODE_BATANG, MODE_LINGKARAN } from '@/utils/chartSentuh'

describe('opsiChart — sasaran sentuh diperlebar', () => {
  it('KUNCI: intersect false — menyentuh kolomnya sudah cukup, tak harus kena batangnya', () => {
    const o = opsiChart({ responsive: true })
    expect(o.interaction.intersect).toBe(false)
    expect(o.interaction.mode).toBe(MODE_BATANG)
  })

  it('doughnut/pie memakai mode nearest — "index" tak punya arti di sana', () => {
    expect(opsiChart({}, { mode: MODE_LINGKARAN }).interaction.mode).toBe('nearest')
  })

  it('tooltip diperbesar supaya terbaca di genggaman', () => {
    const o = opsiChart({})
    expect(o.plugins.tooltip.bodyFont.size).toBe(TOOLTIP_SENTUH.bodyFont.size)
    expect(o.plugins.tooltip.position).toBe('nearest')
  })

  it('KUNCI: callbacks tooltik pemanggil TIDAK terhapus (format Rupiah tetap jalan)', () => {
    const label = () => 'Rp 1.000'
    const o = opsiChart({ plugins: { tooltip: { callbacks: { label } } } })
    expect(o.plugins.tooltip.callbacks.label).toBe(label)
    // sekaligus tetap dapat setelan sentuhnya
    expect(o.plugins.tooltip.padding).toBe(TOOLTIP_SENTUH.padding)
  })

  it('setelan pemanggil selalu MENANG atas bawaan sentuh', () => {
    const o = opsiChart({ plugins: { tooltip: { position: 'average' } } })
    expect(o.plugins.tooltip.position).toBe('average')
    const p = opsiChart({ interaction: { mode: 'point' } })
    expect(p.interaction.mode).toBe('point')
  })

  it('plugin lain (legend, scales) tak tersentuh', () => {
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: { x: { stacked: true } }
    }
    const o = opsiChart(base)
    expect(o.plugins.legend).toEqual({ position: 'bottom' })
    expect(o.scales).toEqual({ x: { stacked: true } })
    expect(o.maintainAspectRatio).toBe(false)
  })

  it('tidak memutasi objek asalnya', () => {
    const base = { plugins: { legend: {} } }
    opsiChart(base)
    expect(base.interaction).toBeUndefined()
    expect(base.plugins.tooltip).toBeUndefined()
  })

  it('masukan sampah aman', () => {
    expect(opsiChart().interaction.intersect).toBe(false)
    expect(opsiChart(null).plugins.tooltip.position).toBe('nearest')
    expect(opsiChart('bukan objek').interaction.mode).toBe(MODE_BATANG)
  })
})

// ── Penjaga drift: tiap berkas pemilik grafik WAJIB lewat opsiChart ──────────
//
// Dicek dengan membaca berkasnya, bukan dengan me-mount komponennya: yang ingin dijamin
// justru KEBIASAAN menulisnya, dan itu tak terlihat dari hasil render.
const BERKAS_GRAFIK = [
  'vue-app/src/components/charts/AdminStatsCharts.vue',
  'vue-app/src/components/charts/TrenCapaianChart.vue',
  'vue-app/src/views/LaporanView.vue',
  'vue-app/src/views/PersonalView.vue'
]

describe('semua grafik memakai opsiChart', () => {
  for (const rel of BERKAS_GRAFIK) {
    it(`${rel} — tiap objek opsi dibungkus opsiChart`, () => {
      const isi = readFileSync(resolve(process.cwd(), rel), 'utf8')
      expect(isi).toContain("from '@/utils/chartSentuh'")
      // Tiap objek opsi Chart.js di repo ini ditandai `maintainAspectRatio: false`.
      const jmlOpsi = (isi.match(/maintainAspectRatio/g) || []).length
      const jmlBungkus = (isi.match(/opsiChart\(/g) || []).length
      expect(jmlOpsi).toBeGreaterThan(0)
      expect(jmlBungkus).toBeGreaterThanOrEqual(jmlOpsi)
    })
  }
})
