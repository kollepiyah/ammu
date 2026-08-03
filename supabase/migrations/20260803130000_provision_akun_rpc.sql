-- ============================================================================
-- AUDIT AGU 2026 · K1-b — RPC pendamping Edge Function `provision-akun`.
--
-- TUJUAN (permintaan Kyai): akun login LAHIR BERSAMA DATANYA. Begitu santri/
-- guru diimpor atau disimpan dari form, akunnya langsung ada — jadi tak perlu
-- membuat satu per satu, dan pendaftaran mandiri boleh dimatikan (K1-c) tanpa
-- ada yang terkunci.
--
-- Pembagian tugas: SQL menghitung SIAPA yang belum punya akun (hanya di sini
-- auth.users bisa dibaca dan aturan kunci kanonik hidup), Edge Function yang
-- memanggil Admin API untuk membuatnya. Cermin pola admin_target_auth_uid yang
-- dipakai reset-user-password.
--
-- Kunci kanonik = SAMA dengan _resolve_authkey (guru: username|digit WA;
--   santri: NIS|digit WA) supaya email yang dibuat identik dengan yang dipakai
--   saat login. Terukur 3 Agu: 0 kunci bentrok & 0 orang tanpa kunci dari 615
--   orang aktif (107 sudah punya akun) — tapi `distinct on` tetap dipasang
--   supaya data baru yang kebetulan bentrok tak membuat Edge Function
--   memanggil createUser dua kali untuk email yang sama.
--
-- ⚠️ GERBANG ANTI-ESKALASI: pemanggil cukup auth_can_manage() (super_admin ATAU
--   admin) supaya impor oleh admin ikut ter-provision — TAPI guru BERPERAN
--   (super_admin/admin/admin_keuangan) hanya muncul untuk super_admin. Kalau
--   tidak, seorang `admin` bisa membuatkan akun bersandi awal '1234' untuk
--   seorang super_admin yang belum pernah login, lalu memakainya. Ini pasangan
--   dari gerbang handle_new_user di 20260803120000.
-- ============================================================================

create or replace function public.admin_akun_belum_ada(
  p_collection text default null,
  p_doc_id text default null
)
returns table(sumber text, ref_id text, nama text, auth_key text, email text)
language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not public.auth_can_manage() then
    raise exception 'forbidden';
  end if;
  if p_collection is not null and p_collection not in ('guru', 'santri') then
    raise exception 'bad-input';
  end if;

  return query
  with kandidat as (
    select
      'guru'::text as src,
      g.id::text as rid,
      coalesce(g.nama, '')::text as nm,
      coalesce(g.role_sistem, '')::text as rs,
      coalesce(nullif(public._norm_key(g.username), ''), public._digits(g.wa)) as k
    from public.guru g
    where g.status is distinct from 'Tidak Aktif'
      and (p_collection is null or (p_collection = 'guru' and g.id = p_doc_id))
    union all
    select
      'santri'::text,
      s.id::text,
      coalesce(s.nama, '')::text,
      'santri'::text,
      coalesce(nullif(public._digits(s.nis), ''), public._digits(s.wa))
    from public.santri s
    where s.aktif is not false
      and (p_collection is null or (p_collection = 'santri' and s.id = p_doc_id))
  ),
  layak as (
    select distinct on (k) k, src, rid, nm
    from kandidat
    where coalesce(k, '') <> ''
      -- guru berperan: super_admin saja (lihat catatan anti-eskalasi di atas)
      and (src = 'santri' or rs not in ('super_admin', 'admin', 'admin_keuangan')
           or public.auth_is_super())
      -- SUDAH punya akun -> bukan kandidat. Ini yang menjamin sandi orang yang
      -- pernah ganti sandi TIDAK pernah tersentuh: mereka tak pernah masuk daftar.
      and not exists (
        select 1 from auth.users u where u.email = kandidat.k || '@ammu.local'
      )
    order by k, src, nm
  )
  select src, rid, nm, k, k || '@ammu.local' from layak order by src, nm;
end $$;

revoke all on function public.admin_akun_belum_ada(text, text) from public, anon;
grant execute on function public.admin_akun_belum_ada(text, text) to authenticated;
