// chartSentuh — opsi Chart.js yang tooltip-nya bisa dibuka dengan JARI, bukan cuma kursor.
//
// Kyai, 4 Sep 2026: *"saat diklik dari hp kok gk muncul keterangannya ya, kalau di pc muncul."*
//
// SEBABNYA bukan touch event yang hilang — Chart.js v4 sudah mendengarkan `touchstart` &
// `touchmove` secara bawaan. Yang menghalangi adalah setelan bawaan `interaction.intersect`
// = **true**: tooltip hanya muncul kalau titik sentuh JATUH PERSIS DI DALAM batang/titiknya.
//
// Di layar PC itu tak terasa — kursor mouse setajam 1 piksel. Di HP tidak:
//   · ujung jari mendarat sebagai satu titik yang meleset beberapa piksel dari niatnya;
//   · batang di grafik ini sempit (10 kategori dalam ±340 px), dan yang nilainya 1–2
//     TINGGINYA cuma beberapa piksel — praktis mustahil dikenai jari.
// Jadi tooltipnya memang tak pernah muncul di HP untuk sebagian besar batang, dan justru
// batang terkecil — yang paling perlu dibaca angkanya — yang paling mustahil disentuh.
//
// Perbaikannya `intersect: false` + `mode: 'index'`: menyentuh DI MANA SAJA pada kolom itu
// sudah cukup, dan tooltipnya sekalian menampilkan seluruh dataset di kolom tersebut
// (Lulus + Belum Lulus sekaligus). Di PC ini juga terasa lebih enak — tak perlu lagi
// membidik batang setipis rambut.
//
// SUMBER TUNGGAL. Ditaruh di sini, bukan disalin ke tiap view, karena grafiknya tersebar di
// empat berkas (AdminStatsCharts, TrenCapaianChart, LaporanView, PersonalView) dan setelan
// yang tersalin adalah kelas bug yang berulang di repo ini — grafik ke-5 pasti lahir tanpa
// setelan ini kalau tak ada satu tempat yang memaksanya. Dijaga
// `tests/unit/chartSentuh.test.js`.

/**
 * Setelan interaksi. `mode`:
 *   'index'   — batang/garis: seluruh kolom jadi sasaran sentuh (default).
 *   'nearest' — doughnut/pie: 'index' tak punya arti di sana, yang terdekat yang menang.
 */
export const MODE_BATANG = 'index'
export const MODE_LINGKARAN = 'nearest'

/**
 * Tooltip yang terbaca di layar HP. Bawaan Chart.js memakai font 12/14 px dengan padding 6 —
 * cukup di monitor, kekecilan di genggaman. `position: 'nearest'` menaruh kotaknya di dekat
 * jari, bukan di tengah kolom, supaya tak tertutup tangan sendiri.
 */
export const TOOLTIP_SENTUH = {
  position: 'nearest',
  padding: 10,
  caretSize: 6,
  titleFont: { size: 12, weight: 'bold' },
  bodyFont: { size: 12 },
  // Kotak tooltip yang muncul di bawah jari akan tertutup — digeser sedikit ke atas.
  yAlign: 'bottom'
}

function _obj(v) {
  return v && typeof v === 'object' && !Array.isArray(v) ? v : {}
}

/**
 * Bungkus opsi Chart.js supaya tooltipnya bisa disentuh.
 *
 * Setelan milik pemanggil SELALU menang — `callbacks` tooltip (mis. format Rupiah di grafik
 * arus kas) dan `legend` tetap utuh. Fungsi ini hanya MENAMBAH apa yang belum ditentukan.
 *
 * @param {object} base opsi Chart.js apa adanya.
 * @param {{mode?: string}} [opts] mode interaksi; pakai MODE_LINGKARAN untuk doughnut/pie.
 * @returns {object} opsi baru (base tidak dimutasi).
 */
export function opsiChart(base = {}, opts = {}) {
  const b = _obj(base)
  const plugins = _obj(b.plugins)
  return {
    ...b,
    interaction: {
      mode: opts.mode || MODE_BATANG,
      intersect: false,
      ..._obj(b.interaction)
    },
    plugins: {
      ...plugins,
      tooltip: {
        ...TOOLTIP_SENTUH,
        ..._obj(plugins.tooltip)
      }
    }
  }
}
