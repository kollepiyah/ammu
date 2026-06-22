// queryClient.js — F4 (migrasi Supabase): instance @tanstack/vue-query.
// SWR cache + dedup + invalidasi utk view yang sudah cutover ke db.js (F6).
// Dipasang di main.js (VueQueryPlugin). Aman dipasang walau belum ada konsumen.
import { QueryClient } from '@tanstack/vue-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000, // 30s: data master/jarang-berubah tak refetch beruntun
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false // app pesantren: hindari refetch tiap pindah tab
    }
  }
})
