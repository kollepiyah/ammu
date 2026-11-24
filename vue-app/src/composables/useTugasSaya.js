// v.1.5.0 (gelombang 3) — pembungkus kartu "Tugas Saya". Datanya kini di stores/tugasSaya.js
// (18 Nov 2026) supaya sidebar ikut memakai tarikan yang sama untuk menyaring menu tugas;
// penyusunan daftarnya tetap di utils/tugasSaya.js.
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTugasSayaStore } from '@/stores/tugasSaya'

export function useTugasSaya() {
  const store = useTugasSayaStore()
  const { hasil, hariIni, memuat, galat, berlaku } = storeToRefs(store)
  onMounted(() => store.muat())
  return { hasil, hariIni, memuat, galat, berlaku, muat: store.muat }
}
