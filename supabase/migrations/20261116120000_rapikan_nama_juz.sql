-- ============================================================================
-- v.1.5.0 — Perapian data (Kyai, 16 Nov 2026): (1) huruf sesudah petik pada nama tak lagi
-- kapital, (2) juz santri ditulis "Juz 5" (bukan "JUZ 5" / "5").
--
-- (1) NAMA.
--
-- "Siti Ma'rifatin" tersimpan "Siti Ma'Rifatin": impor Excel awal (services/importMap.titleCase)
-- memakai `\b\w`, yang menganggap petik sebagai batas kata. Kodenya sudah dibetulkan; migrasi
-- ini merapikan data yang terlanjur tersimpan.
--
-- Aturan: huruf BESAR yang tepat sesudah petik (' ’ ‘ `) DAN didahului huruf → huruf kecil.
-- Kolom: guru.nama, santri.nama, santri.wali, dan salinan nama guru di santri.data
-- (guru_pagi, guru_sore, guru, guru_sekolah) — pencocokan santri↔guru memang tak peka huruf
-- besar, tetapi salinannya ikut dirapikan supaya label rombel & PDF seragam dengan guru.nama.
-- Idempoten: baris yang sudah rapi tak tersentuh; aman dijalankan ulang.
-- ============================================================================

create or replace function public._rapikan_petik(s text)
returns text
language plpgsql
immutable
as $$
declare
  hasil text := '';
  i int;
  c text;
begin
  if s is null then
    return null;
  end if;
  for i in 1 .. length(s) loop
    c := substr(s, i, 1);
    if i >= 3
       and substr(s, i - 1, 1) in ('''', '’', '‘', '`')
       and substr(s, i - 2, 1) ~ '[[:alpha:]]'
       and c ~ '[[:upper:]]' then
      c := lower(c);
    end if;
    hasil := hasil || c;
  end loop;
  return hasil;
end;
$$;

-- Pola baris yang perlu dirapikan (huruf + petik + huruf besar).
-- ' dan ’ ‘ ` ditulis dalam satu kelas karakter.

update public.guru
set nama = public._rapikan_petik(nama)
where nama ~ '[[:alpha:]][''’‘`][[:upper:]]';

update public.santri
set nama = public._rapikan_petik(nama)
where nama ~ '[[:alpha:]][''’‘`][[:upper:]]';

update public.santri
set wali = public._rapikan_petik(wali)
where wali ~ '[[:alpha:]][''’‘`][[:upper:]]';

-- Salinan nama guru di ekor jsonb santri. guru_sekolah bisa larik ATAU teks lama.
update public.santri s
set data = (
  select coalesce(s.data, '{}'::jsonb)
    || coalesce(
         (
           select jsonb_object_agg(k, to_jsonb(public._rapikan_petik(s.data ->> k)))
           from unnest(array['guru_pagi', 'guru_sore', 'guru']) as k
           where jsonb_typeof(s.data -> k) = 'string'
         ),
         '{}'::jsonb
       )
    || case
         when jsonb_typeof(s.data -> 'guru_sekolah') = 'array' then
           jsonb_build_object(
             'guru_sekolah',
             coalesce(
               (
                 select jsonb_agg(
                          case
                            when jsonb_typeof(e) = 'string'
                              then to_jsonb(public._rapikan_petik(e #>> '{}'))
                            else e
                          end
                          order by o
                        )
                 from jsonb_array_elements(s.data -> 'guru_sekolah') with ordinality as t(e, o)
               ),
               '[]'::jsonb
             )
           )
         when jsonb_typeof(s.data -> 'guru_sekolah') = 'string' then
           jsonb_build_object('guru_sekolah', public._rapikan_petik(s.data ->> 'guru_sekolah'))
         else '{}'::jsonb
       end
)
where concat_ws(
        ' ',
        s.data ->> 'guru_pagi',
        s.data ->> 'guru_sore',
        s.data ->> 'guru',
        s.data ->> 'guru_sekolah'
      ) ~ '[[:alpha:]][''’‘`][[:upper:]]';

-- Default guru per kelas (master/lembaga → list[i].kelas_guru) dipakai mengisi otomatis pilihan
-- guru di form santri; isinya hanya nama guru, jadi dirapikan utuh per subpohon.
update public.master m
set value = jsonb_set(
      m.value,
      '{list}',
      (
        select jsonb_agg(
                 case
                   when jsonb_typeof(e -> 'kelas_guru') = 'object'
                    and (e ->> 'kelas_guru') ~ '[[:alpha:]][''’‘`][[:upper:]]'
                   then jsonb_set(e, '{kelas_guru}', public._rapikan_petik(e ->> 'kelas_guru')::jsonb)
                   else e
                 end
                 order by o
               )
        from jsonb_array_elements(m.value -> 'list') with ordinality as t(e, o)
      )
    )
where m.key = 'lembaga'
  and jsonb_typeof(m.value -> 'list') = 'array'
  and (m.value ->> 'list') ~ '[[:alpha:]][''’‘`][[:upper:]]';

drop function public._rapikan_petik(text);

-- (2) JUZ. Kode kini menyimpan "Juz n" (utils/format.juzSimpan); baris lama "JUZ 5", "juz 05",
-- atau angka telanjang PTPT ("5") diseragamkan. Nilai lain (kosong, "-", teks bebas) dibiarkan.
update public.santri
set juz = 'Juz ' || ((regexp_match(juz, '\d+'))[1])::int
where (
        juz ~* '^\s*juz\s*\d+\s*$'
        or (upper(btrim(coalesce(lembaga, ''))) = 'PTPT' and juz ~ '^\s*\d+\s*$')
      )
  and ((regexp_match(juz, '\d+'))[1])::int > 0
  and juz is distinct from 'Juz ' || ((regexp_match(juz, '\d+'))[1])::int;
