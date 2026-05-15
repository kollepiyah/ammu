<script setup>
import { computed } from 'vue'
import { masehiToHijri, toArabicDigit } from '../utils/hijri'

const FONT_ARAB =
  "'Droid Arabic Naskh','Noto Naskh Arabic','Scheherazade New','Amiri','Traditional Arabic',serif"

const props = defineProps({
  kegiatan: { type: Array, default: () => [] },
  limit: { type: Number, default: 3 }
})

defineEmits(['lihat-semua'])

const sorted = computed(() => {
  // v.109.42: filter hari ini & akan datang only
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString().split('T')[0]
  return [...props.kegiatan]
    .filter((k) => k && k.tgl_mulai)
    .filter((k) => {
      const endTgl = k.tgl_akhir || k.tgl_mulai
      return endTgl >= todayStr
    })
    .sort((a, b) => (a.tgl_mulai || '').localeCompare(b.tgl_mulai || ''))
    .slice(0, props.limit)
})

const NAMA_BULAN_ARAB = [
  'ٱلْمُحَرَّم',
  'صَفَر',
  'رَبِيع ٱلْأَوَّل',
  'رَبِيع ٱلثَّانِي',
  'جُمَادَىٰ ٱلْأُولَىٰ',
  'جُمَادَىٰ ٱلثَّانِيَة',
  'رَجَب',
  'شَعْبَان',
  'رَمَضَان',
  'شَوَّال',
  'ذُو ٱلْقَعْدَة',
  'ذُو ٱلْحِجَّة'
]
const NAMA_BULAN_ID_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Okt',
  'Nov',
  'Des'
]

function tglNumber(d) {
  const dt = new Date(d)
  return isNaN(dt) ? '' : dt.getDate()
}
function bulanShort(d) {
  const dt = new Date(d)
  return isNaN(dt) ? '' : NAMA_BULAN_ID_SHORT[dt.getMonth()]
}
function hijriFull(d) {
  const dt = new Date(d)
  if (isNaN(dt)) return ''
  const h = masehiToHijri(dt)
  return `${toArabicDigit(h.day)} ${NAMA_BULAN_ARAB[h.month - 1] || ''} ${toArabicDigit(h.year)}`
}
function rangeText(k) {
  if (!k.tgl_akhir || k.tgl_akhir === k.tgl_mulai) return ''
  const a = new Date(k.tgl_mulai)
  const b = new Date(k.tgl_akhir)
  if (isNaN(a) || isNaN(b)) return ''
  return `${a.getDate()}/${String(a.getMonth() + 1).padStart(2, '0')} – ${b.getDate()}/${String(b.getMonth() + 1).padStart(2, '0')}/${b.getFullYear()}`
}
</script>

<template>
  <div class="ammu-kal">
    <div class="hdr">
      <h3 class="ttl"><i class="far fa-calendar-alt"></i>KALENDER PENDIDIKAN</h3>
      <button type="button" class="lihat" @click="$emit('lihat-semua')">Lihat semua</button>
    </div>
    <div v-if="sorted.length === 0" class="empty">
      <i class="far fa-calendar-times"></i>
      <p>Belum ada agenda</p>
    </div>
    <div v-else class="list">
      <div v-for="k in sorted" :key="k.id || k.tgl_mulai + k.judul" class="agenda">
        <div class="date-badge">
          <span class="bulan">{{ bulanShort(k.tgl_mulai) }}</span>
          <span class="tgl">{{ tglNumber(k.tgl_mulai) }}</span>
        </div>
        <div class="info">
          <p class="judul">{{ k.judul }}</p>
          <p :style="{ fontFamily: FONT_ARAB }" class="hijri" dir="rtl">
            {{ rangeText(k) || hijriFull(k.tgl_mulai) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ammu-kal {
  font-family: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;
  background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
  border-radius: 0.875rem;
  padding: 0.625rem 0.75rem;
  color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgb(0 0 0 / 0.08);
}
:global(.dark) .ammu-kal,
.dark-mode .ammu-kal {
  background: linear-gradient(135deg, #042f2e 0%, #064e3b 100%);
}
.hdr {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}
.ttl {
  font-size: 10px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin: 0;
  color: white;
}
.ttl i {
  color: #2dd4bf;
  font-size: 12px;
}
.lihat {
  font-size: 10px;
  font-weight: 700;
  color: #2dd4bf;
  background: rgba(20, 184, 166, 0.15);
  border: none;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 9999px;
}
.lihat:hover {
  background: rgba(20, 184, 166, 0.25);
}
.empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a1a1aa;
  text-align: center;
  gap: 0.375rem;
}
.empty i {
  font-size: 1.25rem;
}
.empty p {
  margin: 0;
  font-size: 0.7rem;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
  max-height: 220px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}
.list::-webkit-scrollbar {
  width: 5px;
}
.list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 999px;
}
.agenda {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.5rem;
  border-radius: 0.5rem;
  background: rgba(19, 78, 74, 0.15);
  border: 1px solid rgba(19, 78, 74, 0.25);
  transition: background 150ms;
}
.agenda:hover {
  background: rgba(19, 78, 74, 0.3);
}
.date-badge {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
  background: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #fda4af;
}
.bulan {
  background: #e11d48;
  color: white;
  font-size: 6px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-align: center;
  padding: 1px 0;
  line-height: 1;
}
.tgl {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 900;
  color: #0f172a;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.info {
  flex: 1;
  min-width: 0;
}
.judul {
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1px;
  line-height: 1.15;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hijri {
  font-size: 10px;
  color: #5eead4;
  margin: 0;
  line-height: 1;
}
</style>
