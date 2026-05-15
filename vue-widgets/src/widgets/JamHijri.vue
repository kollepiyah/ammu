<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { formatHijri, formatMasehi } from '../utils/hijri'

const FONT_ARAB =
  "'Scheherazade New','El Messiri','Noto Naskh Arabic','Amiri','Traditional Arabic',serif"

const jam = ref('')
const menit = ref('')
const detik = ref('')
const hari = ref('')
const hijri = ref('')
const masehi = ref('')
let timer = null

function tick() {
  const d = new Date()
  jam.value = String(d.getHours()).padStart(2, '0')
  menit.value = String(d.getMinutes()).padStart(2, '0')
  detik.value = String(d.getSeconds()).padStart(2, '0')
  hari.value = d.toLocaleDateString('id-ID', { weekday: 'long' }).toUpperCase()
  hijri.value = formatHijri(d)
  masehi.value = formatMasehi(d)
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="ammu-jam">
    <svg class="pattern" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="bp" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M16 0 L32 16 L16 32 L0 16 Z" fill="none" stroke="white" stroke-width="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp)" />
    </svg>
    <div class="grid">
      <div class="col-l">
        <p class="hari-top">{{ hari }}</p>
        <p :style="{ fontFamily: FONT_ARAB }" class="hijri" dir="rtl">{{ hijri }}</p>
        <p class="masehi">{{ masehi }}</p>
      </div>
      <div class="col-r">
        <p class="label-r"><i class="far fa-clock"></i>WIB</p>
        <div class="jam-wrap">
          <span class="jam">{{ jam }}:{{ menit }}</span>
        </div>
        <p class="detik">: {{ detik }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ammu-jam {
  font-family: 'Manrope', 'Inter', system-ui, sans-serif;
  position: relative;
  overflow: hidden;
  border-radius: 0.875rem;
  background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
  color: white;
  padding: 0.75rem 0.875rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.08);
  height: 100%;
  display: flex;
  align-items: center;
}
:global(.dark) .ammu-jam,
.dark-mode .ammu-jam {
  background: linear-gradient(135deg, #042f2e 0%, #064e3b 100%);
}
.pattern {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.08;
  pointer-events: none;
}
.grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}
.col-l {
  text-align: left;
}
.col-r {
  text-align: right;
  border-left: 1px solid rgba(255, 255, 255, 0.18);
  padding-left: 0.5rem;
}
.label,
.label-r {
  font-family: 'Manrope', sans-serif;
  font-size: 8.5px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-weight: 600;
  opacity: 0.92;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
.label-r {
  justify-content: flex-end;
}
.label i,
.label-r i {
  font-size: 10px;
}
.hari-top {
  display: inline-block;
  font-family: 'Manrope', sans-serif;
  font-size: 9.5px;
  font-weight: 600;
  letter-spacing: 0.22em;
  margin: 0 0 0.3rem 0;
  padding: 3px 9px;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 6px;
  text-align: left;
  text-transform: uppercase;
  color: white;
}
/* v.109.26: tgl hijri geser atas + perbesar */
.hijri {
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 0.2rem;
  margin-bottom: 0.15rem;
  line-height: 1.4;
  text-align: left;
  letter-spacing: 0.02em;
}
@media (min-width: 768px) {
  .hijri {
    font-size: 1.45rem;
  }
}
.masehi {
  font-family: 'Spectral', 'Playfair Display', Georgia, serif;
  font-size: 0.85rem;
  font-style: italic;
  font-weight: 500;
  margin-top: 0.3rem;
  line-height: 1.1;
  text-align: left;
  opacity: 0.95;
  letter-spacing: 0.01em;
}
@media (min-width: 768px) {
  .masehi {
    font-size: 0.95rem;
  }
}
.jam-wrap {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 0.25rem;
}
.jam {
  font-family: 'Spectral', 'Playfair Display', Georgia, serif;
  font-size: 1.7rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.01em;
}
@media (min-width: 768px) {
  .jam {
    font-size: 2rem;
  }
}
.detik {
  font-family: 'Manrope', sans-serif;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.85;
  margin-top: 0.2rem;
}
</style>
