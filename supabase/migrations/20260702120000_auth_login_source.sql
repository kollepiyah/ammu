-- ============================================================================
-- v.111 · Pemisahan jalur login GURU/PEGAWAI vs SANTRI/WALI.
--
-- Masalah: 1 nomor WA bisa dipakai guru (g.wa) DAN wali santri (s.wa) sekaligus
-- (guru yang juga wali). resolve_login lama = prioritas admin>guru>santri limit 1
-- → WA selalu jatuh ke GURU, akun anak tak terjangkau.
--
-- Solusi: tambah param opsional p_source ('guru' | 'santri' | null) yang dikirim
-- dari layar login (toggle "Santri/Wali" vs "Guru/Pegawai"):
--   p_source = 'guru'   → hanya cocokkan admin + guru
--   p_source = 'santri' → hanya cocokkan santri (WA wali / No. Induk)
--   p_source = null     → perilaku LAMA (admin>guru>santri) — aman mundur utk
--                         handle_new_user & pemanggil tanpa source.
--
-- Sesudah masuk sebagai santri/wali, dropdown "ganti anak" (useWaliChildren)
-- yang sudah ada menangani wali multi-anak (switch konteks tanpa login ulang).
-- ============================================================================

-- Ganti signature (text) → (text, text default null): wajib DROP dulu.
drop function if exists public.resolve_login(text);
drop function if exists public._resolve_authkey(text);

-- ---- resolver inti (kini sadar p_source) -----------------------------------
create or replace function public._resolve_authkey(p_input text, p_source text default null)
returns table(source text, ref_id text, role_sistem text, supervisi boolean, active boolean, auth_key text)
language sql stable security definer set search_path = public as $$
  with k as (
    select public._norm_key(p_input) as key,
           public._digits(p_input) as dig,
           nullif(lower(coalesce(p_source, '')), '') as src
  )
  select * from (
    -- admin built-in (adminmu) -> super_admin. Ikut jalur guru/pegawai.
    select 'admin'::text, 'admin'::text, 'super_admin'::text, true, true, 'adminmu'::text
    from k
    where k.key in ('adminmu', 'admin')
      and (k.src is null or k.src = 'guru')
    union all
    -- guru: cocok via username ATAU WA; kanonik = username (jika ada) else digits(wa)
    select 'guru', g.id, g.role_sistem,
           (lower(coalesce(g.jabatan, '')) ~ 'direktur|supervisor'
            or lower(coalesce(g.jabatan_tambahan, '')) ~ 'direktur|supervisor'),
           (g.status is distinct from 'Tidak Aktif'),
           coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa))
    from public.guru g, k
    where (k.src is null or k.src = 'guru')
      and (nullif(public._norm_key(g.username), '') = k.key
           or (k.dig <> '' and public._digits(g.wa) = k.dig))
    union all
    -- santri: cocok via NIS ATAU WA wali; kanonik = NIS (jika ada) else digits(wa)
    select 'santri', s.id, 'santri', false,
           coalesce(s.aktif, true),
           coalesce(nullif(public._digits(s.nis), ''), public._digits(s.wa))
    from public.santri s, k
    where (k.src is null or k.src = 'santri')
      and ((k.dig <> '' and public._digits(s.nis) = k.dig)
           or (k.dig <> '' and public._digits(s.wa) = k.dig))
  ) t
  limit 1
$$;

-- ---- resolve_login: RPC anon (kini teruskan p_source) ----------------------
create or replace function public.resolve_login(p_input text, p_source text default null)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('source', m.source, 'auth_key', m.auth_key, 'active', m.active)
  from public._resolve_authkey(p_input, p_source) m
$$;

-- Grant ulang (DROP menghapus grant lama). anon WAJIB bisa panggil pra-sesi.
grant execute on function public.resolve_login(text, text) to anon, authenticated;
grant execute on function public._resolve_authkey(text, text) to anon, authenticated;
