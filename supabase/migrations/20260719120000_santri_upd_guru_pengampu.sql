-- v.1.1.9 — Guru kelas boleh mengedit/menaikkan santri AMPUANNYA sendiri
--   (menu Kenaikan & Mutasi). Sebelumnya UPDATE public.santri hanya lewat
--   `santri_upd_manage` = auth_can_manage() = super_admin|admin, sehingga guru
--   kelas kena 403 walau tombolnya dibuka di UI.
--
-- Cakupan: HANYA santri yang guru pengampunya = guru yang login. Nama guru
--   (public.guru.nama, via profiles.guru_id) dicocokkan dengan field pengampu di
--   santri.data: guru_pagi | guru_sore | guru (legacy) | guru_sekolah[] —
--   PERSIS sama dengan scoping baca di composables/useSantri.js, jadi
--   "yang kelihatan = yang boleh diedit".
--
-- WITH CHECK memakai baris BARU, jadi guru TAK bisa mengalihkan santri ke guru
--   lain (dia kehilangan hak begitu dialihkan) — pindah pengampu tetap admin.
--   Policy lama `santri_upd_manage` dibiarkan (policy PERMISSIVE = OR).
--
-- CATATAN RAPUH: kaitannya berbasis NAMA (skema lama, bukan id). Kalau nama guru
--   diganti, hak edit putus sampai nama di baris santri ikut diperbarui.

create or replace function public.auth_guru_nama()
returns text language sql stable security definer set search_path = public as $$
  select nullif(btrim(g.nama), '')
  from public.profiles p
  join public.guru g on g.id = p.guru_id
  where p.id = auth.uid()
  limit 1
$$;

create or replace function public.auth_is_pengampu(p_data jsonb)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    lower(public.auth_guru_nama()) in (
      lower(nullif(btrim(p_data->>'guru_pagi'), '')),
      lower(nullif(btrim(p_data->>'guru_sore'), '')),
      lower(nullif(btrim(p_data->>'guru'), ''))
    )
    or exists (
      select 1
      from jsonb_array_elements_text(
        case
          when jsonb_typeof(p_data->'guru_sekolah') = 'array' then p_data->'guru_sekolah'
          else '[]'::jsonb
        end
      ) as gs(nama)
      where btrim(gs.nama) <> ''
        and lower(btrim(gs.nama)) = lower(public.auth_guru_nama())
    ),
    false
  )
$$;

drop policy if exists santri_upd_pengampu on public.santri;
create policy santri_upd_pengampu on public.santri
  for update using (public.auth_is_pengampu(data))
  with check (public.auth_is_pengampu(data));
