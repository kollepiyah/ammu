-- ============================================================================
-- v.1.1.9 — Helper RLS untuk menu khusus PTPT (Tes Glondongan & Ceremonial).
--
-- Migrasi ini HANYA menambah fungsi. TIDAK ada policy yang disentuh, jadi
--   perilaku aplikasi tak berubah sama sekali setelah di-push. Penguncian
--   policy-nya menyusul di 20260719140100 (tes_glondongan) & 20260719140200
--   (ceremonial_ptpt).
--
-- Semua fungsi SECURITY DEFINER + `set search_path = public` (pola sama dgn
--   auth_role_sistem dkk di 20260622090500_profiles_rls.sql). Definer WAJIB:
--   fungsi ini membaca public.guru / public.master / public.santri dari DALAM
--   policy, dan tanpa definer ia akan kena RLS tabel itu sendiri -> hasil bisa
--   "kosong diam-diam" tergantung peran pemanggil.
--
-- Semua predikat di sini CERMIN dari gerbang UI yang sudah ada, supaya tak ada
--   tombol yang tampak tapi menghasilkan 403:
--     auth_guru_di_lembaga()            <- cocokUnit()          (useMenus.js)
--     auth_is_pj_lembaga()              <- _isPjPtpt()          (useGlondongan/useCeremonial)
--     auth_is_koordinator_glondongan()  <- kategoriKoordinatori() (utils/glondongan.js)
-- ============================================================================

-- id guru dari profil yang login. NULL kalau yang login bukan guru (santri/wali)
--   atau profilnya belum tertaut ke baris guru.
--   CATATAN: id Supabase = TEKS, jangan pernah di-cast ke angka.
create or replace function public.auth_guru_id()
returns text language sql stable security definer set search_path = public as $$
  select nullif(btrim(p.guru_id), '')
  from public.profiles p
  where p.id = auth.uid()
  limit 1
$$;

-- Guru yang login bertugas di lembaga ini? Dicocokkan ke `lembaga` MAUPUN
--   `lembaga_sekolah` — cermin cocokUnit() di useMenus.js.
create or replace function public.auth_guru_di_lembaga(p_lembaga text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles p
    join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
      and upper(btrim(coalesce(p_lembaga, ''))) <> ''
      and upper(btrim(coalesce(p_lembaga, ''))) in (
        upper(btrim(coalesce(g.lembaga, ''))),
        upper(btrim(coalesce(g.lembaga_sekolah, '')))
      )
  )
$$;

-- Guru yang login = kepala/PJ/pengasuh lembaga ini?
--   Cermin PERSIS _isPjPtpt(): regex kena jabatan ATAU jabatan_tambahan, dan
--   lembaganya dibaca dari kolom `lembaga` SAJA (bukan lembaga_sekolah).
create or replace function public.auth_is_pj_lembaga(p_lembaga text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.profiles p
    join public.guru g on g.id = p.guru_id
    where p.id = auth.uid()
      and lower(coalesce(g.jabatan, '') || ' ' || coalesce(g.jabatan_tambahan, ''))
          ~ '(^|\s)(kepala|pj|pengasuh)(\s|$)'
      and upper(btrim(coalesce(g.lembaga, ''))) = upper(btrim(coalesce(p_lembaga, '')))
  )
$$;

-- Guru yang login = koordinator glondongan PTPT?
--   Sumber: master (key='lembaga') -> value->'list' -> item PTPT ->
--           koordinator_glondongan = { "mahad":[guruId,...], "nonmahad":[...] }
--   p_kategori NULL = kategori mana pun (dipakai utk gerbang "boleh menulis
--   ceremonial"); diisi 'mahad'/'nonmahad' utk mencocokkan kategori 1 baris.
create or replace function public.auth_is_koordinator_glondongan(p_kategori text default null)
returns boolean language sql stable security definer set search_path = public as $$
  select public.auth_guru_id() is not null and exists (
    select 1
    from public.master m
    cross join lateral jsonb_array_elements(
      case when jsonb_typeof(m.value->'list') = 'array' then m.value->'list' else '[]'::jsonb end
    ) as l(obj)
    cross join lateral jsonb_each(
      case when jsonb_typeof(l.obj->'koordinator_glondongan') = 'object'
           then l.obj->'koordinator_glondongan' else '{}'::jsonb end
    ) as k(kategori, ids)
    cross join lateral jsonb_array_elements_text(
      case when jsonb_typeof(k.ids) = 'array' then k.ids else '[]'::jsonb end
    ) as g(guru_id)
    where m.key = 'lembaga'
      and upper(btrim(coalesce(l.obj->>'lembaga', l.obj->>'nama', ''))) = 'PTPT'
      and (p_kategori is null or k.kategori = p_kategori)
      and btrim(g.guru_id) = public.auth_guru_id()
  )
$$;

-- Guru yang login = pengampu santri ini? Bungkus auth_is_pengampu(jsonb)
--   (20260719120000) supaya policy tak perlu SELECT public.santri sendiri —
--   SELECT dari dalam policy akan kena RLS santri dan bisa gagal senyap.
create or replace function public.auth_is_pengampu_santri(p_santri_id text)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1
    from public.santri s
    where s.id = p_santri_id
      and public.auth_is_pengampu(s.data)
  )
$$;
