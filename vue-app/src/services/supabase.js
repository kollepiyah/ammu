// Supabase client — init satu kali, export instance.
// F1 (migrasi Supabase): SCAFFOLD SAJA — belum dipakai view/composable manapun.
// Firebase tetap sumber kebenaran sampai cutover per-koleksi (F6).
//
// Kredensial dari .env.local (anon key PUBLIK, aman di client; RLS yang menjaga data).
// SINGLE-TENANT: tak ada tenant_id; peran ditegakkan via RLS auth.uid().
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Guard: kalau env belum diisi, export null (JANGAN throw saat boot app).
// Saat adapter mulai memakai ini (F4/F6), ketiadaan env akan ketahuan eksplisit.
export const supabase =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          // v.109: detectSessionInUrl FALSE (true bikin login username/WA/NIS hang krn
          //   proses URL hash-router saat init). OAuth Google balik dgn `?code=` ditukar
          //   MANUAL via authSupabase.exchangeOAuthCode di initAuth (lihat stores/auth.js).
          detectSessionInUrl: false,
          flowType: 'pkce'
        }
      })
    : null

if (!supabase && import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY belum di-set (.env.local) — client = null (scaffold F1).'
  )
}

/** True bila client Supabase siap dipakai (env terisi). */
export function isSupabaseReady() {
  return supabase !== null
}
