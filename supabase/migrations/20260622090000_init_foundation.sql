-- ============================================================================
-- F2 · 00 FOUNDATION — Ammu Online (SINGLE-TENANT, Pondok Mambaul Ulum)
-- Extensions + util updated_at. TIDAK ada tenant_id. RLS hanya untuk PERAN.
-- ============================================================================

-- Trigram untuk pencarian nama cepat (ILIKE '%...%'). Pasang di schema `extensions`
-- (konvensi Supabase) — operator class dirujuk schema-qualified saat bikin index.
create extension if not exists pg_trgm with schema extensions;

-- Util: set updated_at = now() pada setiap UPDATE (dipasang ke semua tabel
-- ber-kolom updated_at di file 06 via loop). Dipakai juga untuk OCC (safeSaveDoc).
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
