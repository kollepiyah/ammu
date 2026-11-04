-- ============================================================================
-- v.1.4.9 — Kelas terakhir PTPT: "Persiapan Khotaman" (Kyai, 4 Nov 2026).
--
-- "Santri PTPT yang sudah lulus tes Juz 30, ketika proses naik jangan langsung masuk ke PPPH,
-- tapi ada kelas baru di akhir: Persiapan Khotaman, dan gurunya juga bisa ditunjuk. Urutan kelas
-- PTPT: Kelas 1–6, Kelas Persiapan Khotaman." Naik ke PPPH lewat Tes Khotaman (tanpa glondongan).
--
-- Daftar kelas PTPT hidup di master/lembaga (`kelas`, kadang `kelas_list`) — sumber dropdown kelas,
-- Kelas & Guru (kelas_guru per kelas), dan jenjangLembaga (penentu "kelas terakhir" yang
-- menamatkan PTPT). Kode sudah siap sejak commit 913569a; migrasi ini yang menyalakannya.
--
-- Hanya MENAMBAH di ujung daftar, hanya bila daftarnya ada & belum memuatnya — idempoten, aman
-- dijalankan ulang, tak menyentuh lembaga lain maupun data santri.
-- ============================================================================

update public.master m
set value = jsonb_set(
      m.value,
      '{list}',
      (
        select jsonb_agg(
                 case
                   when upper(coalesce(e->>'lembaga', e->>'nama', '')) = 'PTPT'
                    and jsonb_typeof(e->'kelas') = 'array'
                    and jsonb_array_length(e->'kelas') > 0
                    and not exists (
                      select 1 from jsonb_array_elements_text(e->'kelas') k
                      where lower(trim(k)) in ('persiapan khotaman', 'kelas persiapan khotaman')
                    )
                   then jsonb_set(e, '{kelas}', (e->'kelas') || '["Persiapan Khotaman"]'::jsonb)
                   else e
                 end
                 order by t.ord)
        from jsonb_array_elements(m.value->'list') with ordinality as t(e, ord)
      ),
      false),
    updated_at = now()
where m.key = 'lembaga' and jsonb_typeof(m.value->'list') = 'array';

-- `kelas_list` (bila ada) didahulukan jenjangLembaga — ikut ditambah dengan aturan yang sama.
update public.master m
set value = jsonb_set(
      m.value,
      '{list}',
      (
        select jsonb_agg(
                 case
                   when upper(coalesce(e->>'lembaga', e->>'nama', '')) = 'PTPT'
                    and jsonb_typeof(e->'kelas_list') = 'array'
                    and jsonb_array_length(e->'kelas_list') > 0
                    and not exists (
                      select 1 from jsonb_array_elements_text(e->'kelas_list') k
                      where lower(trim(k)) in ('persiapan khotaman', 'kelas persiapan khotaman')
                    )
                   then jsonb_set(e, '{kelas_list}', (e->'kelas_list') || '["Persiapan Khotaman"]'::jsonb)
                   else e
                 end
                 order by t.ord)
        from jsonb_array_elements(m.value->'list') with ordinality as t(e, ord)
      ),
      false),
    updated_at = now()
where m.key = 'lembaga' and jsonb_typeof(m.value->'list') = 'array';
