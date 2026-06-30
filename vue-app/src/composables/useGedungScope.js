// useGedungScope — terapkan scope "Gedung" ke data keuangan/akademik per sesi aktif.
// Admin keuangan ber-gedung HANYA lihat santri/transaksi gedungnya; super_admin & user
// tanpa gedung = lihat semua. Helper murni ada di utils/gedung; ini menambah lookup santri.
// (v.111 — Fase 3)
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useCollectionsStore } from '@/stores/collections'
import { gedungOf, isGedungScoped } from '@/utils/gedung'

export function useGedungScope() {
  const auth = useAuthStore()
  const collections = useCollectionsStore()
  collections.ensure('santri')
  const { santri } = storeToRefs(collections)

  const myGedung = computed(() => gedungOf(auth.sesiAktif))
  const scoped = computed(() => isGedungScoped(auth.sesiAktif))

  // Map santri_id -> gedung (string) utk lookup cepat.
  const santriGedung = computed(() => {
    const m = new Map()
    for (const s of santri.value) m.set(String(s.id), String(s.gedung || '').trim())
    return m
  })

  function gedungSantri(id) {
    return santriGedung.value.get(String(id)) || ''
  }
  // Boleh lihat transaksi milik santri ini? (tak ter-scope → selalu true)
  function allowSantri(id) {
    if (!scoped.value) return true
    return gedungSantri(id) === myGedung.value
  }
  // Boleh lihat baris buku induk: santri-linked (santri_id) → ikut gedung santri;
  // manual (tanpa santri_id) → ikut tag `gedung` baris. Tak ter-scope → true.
  function allowRow(b) {
    if (!scoped.value) return true
    const sid = b?.santri_id ?? b?.data?.santri_id
    if (sid) return gedungSantri(sid) === myGedung.value
    return String(b?.gedung || '').trim() === myGedung.value
  }
  // Filter array transaksi santri-linked by id accessor (default r.santri_id).
  function filterSantri(rows, getId = (r) => r.santri_id) {
    if (!scoped.value) return rows
    return rows.filter((r) => allowSantri(getId(r)))
  }

  return { myGedung, scoped, santriGedung, gedungSantri, allowSantri, allowRow, filterSantri }
}
