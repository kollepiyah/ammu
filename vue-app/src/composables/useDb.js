// useDb.js — F4 (migrasi Supabase): pembungkus vue-query tipis di atas db.js.
// Dipakai view yang sudah cutover (F6) utk SWR + cache + invalidasi seragam.
// CONTOH:
//   const { data: santri, isLoading } = useColl('santri', { orders: [['nama','asc']] })
//   const inval = useInvalidate()
//   await setOne('santri', id, payload); inval('santri')
import { useQuery, useQueryClient } from '@tanstack/vue-query'
import { getAll, getOne, queryColl } from '@/services/db'

/** Subscribe-style read 1 koleksi (cache key per filter/order/limit). */
export function useColl(
  collectionName,
  { filters = [], orders = [], limit = 0, enabled = true } = {}
) {
  const hasQuery = filters.length || orders.length || limit > 0
  return useQuery({
    queryKey: ['coll', collectionName, { filters, orders, limit }],
    queryFn: () =>
      hasQuery ? queryColl(collectionName, filters, orders, limit) : getAll(collectionName),
    enabled
  })
}

/** Read 1 dokumen by id. */
export function useDoc(collectionName, id, { enabled = true } = {}) {
  return useQuery({
    queryKey: ['doc', collectionName, id],
    queryFn: () => getOne(collectionName, id),
    enabled
  })
}

/** Invalidasi cache koleksi (+dokumennya) setelah mutasi tulis/hapus. */
export function useInvalidate() {
  const qc = useQueryClient()
  return (collectionName) => {
    qc.invalidateQueries({ queryKey: ['coll', collectionName] })
    qc.invalidateQueries({ queryKey: ['doc', collectionName] })
  }
}
