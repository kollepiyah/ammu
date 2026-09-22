-- =============================================================================
-- AUDIT URL Firebase Storage yang mati (HTTP 402) — READ-ONLY: hanya SELECT.
-- Jalankan di Supabase Dashboard → SQL Editor (peran: postgres). Tidak mengubah data apa pun.
-- Jalankan ULANG sesudah logo/TTD diunggah ulang untuk melihat sisanya (v.1.4.5, 22 Sep 2026).
-- Diuji di PGlite (Postgres 18) terhadap skema tiruan: kolom teks, jsonb bersarang, larik,
-- HTML berisi beberapa URL, path ber-spasi/non-ASCII, dan pencocokan salinan storage.objects.
--
-- Menyisir SETIAP tabel di skema public — semua kolom, termasuk jsonb bersarang — dan
-- mencari teks 'firebasestorage.googleapis.com'. Satu baris hasil = satu (tabel, kolom,
-- jalur di dalam jsonb).
--   baris_kolom   jumlah baris tabel yang KOLOM itu memuat URL Firebase (jawaban utama)
--   jalur         letak URL di dalam jsonb ('—' = isi kolom itu sendiri; '[]' = elemen larik)
--   baris / url   jumlah baris / jumlah URL di jalur itu (satu baris bisa memuat beberapa URL)
--   ada_salinan   berapa dari URL itu berkasnya SUDAH ada di Supabase Storage dengan path
--                 yang sama (bucket-nya di kolom `bucket`) → cukup tulis ulang URL-nya
--   contoh_baris / contoh_berkas   satu id baris & path berkas, untuk ditelusuri
-- =============================================================================
with tabel as (
  select table_schema::text as skema, table_name::text as tabel
  from information_schema.tables
  where table_schema = 'public' and table_type = 'BASE TABLE'
    and has_table_privilege(format('%I.%I', table_schema, table_name), 'SELECT')
),
temuan as (   -- satu baris = satu URL Firebase; tiap tabel dipindai SEKALI
  select tb.tabel,
         (xpath('/row/rid/text()', r))[1]::text     as rid,
         (xpath('/row/rkey/text()', r))[1]::text    as rkey,
         (xpath('/row/jalur/text()', r))[1]::text   as jalur,
         (xpath('/row/fb_path/text()', r))[1]::text as fb_path
  from tabel tb
  cross join lateral unnest(xpath('/table/row', query_to_xml(format($q$
      with recursive w(rid, rkey, jalur, v) as (
        select t.ctid::text, coalesce(j ->> 'id', j ->> 'key', ''), '', j
        from %I.%I t, lateral to_jsonb(t) j
        where t::text like '%%firebasestorage.googleapis.com%%'
        union all
        select w.rid, w.rkey,
               w.jalur || coalesce('.' || regexp_replace(e.k, '[][&<>.[:cntrl:]]', '?', 'g'), '[]'),
               e.v
        from w
        cross join lateral (
          select key, value from jsonb_each(case when jsonb_typeof(w.v) = 'object' then w.v end)
          union all
          select null, value from jsonb_array_elements(case when jsonb_typeof(w.v) = 'array' then w.v end)
        ) e(k, v)
        where e.v::text like '%%firebasestorage.googleapis.com%%'
      )
      select w.rid, regexp_replace(w.rkey, '[&<>]', '?', 'g') as rkey, w.jalur, m[1] as fb_path
      from w
      left join lateral regexp_matches(w.v #>> '{}',
             'firebasestorage\.googleapis\.com/v0/b/[^/]+/o/([^?#"''<>&[:space:]]+)', 'g') m on true
      where jsonb_typeof(w.v) = 'string'
    $q$, tb.skema, tb.tabel), false, false, ''))) as r
),
urai as (
  select t.tabel,
         substring(t.jalur from '^\.([^.\[]+)')                               as kolom,
         coalesce(nullif(substring(t.jalur from '^\.[^.\[]+(.*)$'), ''), '—') as jalur,
         t.rid, t.rkey, p.path
  from temuan t
  cross join lateral (   -- %XX → karakter (hanya ASCII; %XX non-ASCII dibiarkan apa adanya)
    select string_agg(case
             when x.m[1] is null then x.m[2]
             when ('x' || x.m[1])::bit(8)::int between 32 and 126
               then chr(('x' || x.m[1])::bit(8)::int)
             else '%' || upper(x.m[1]) end, '' order by x.n) as path
    from regexp_matches(t.fb_path, '%([0-9A-Fa-f]{2})|([^%]+)', 'g') with ordinality as x(m, n)
  ) p
),
cek as (
  select u.*, s.bucket
  from urai u
  left join lateral (
    select string_agg(o.bucket_id, ',' order by o.bucket_id) as bucket
    from storage.objects o
    where o.name = u.path
  ) s on true
),
per_kolom as (
  select tabel, kolom, count(distinct rid) as baris_kolom from cek group by 1, 2
)
select c.tabel, c.kolom, k.baris_kolom, c.jalur,
       count(distinct c.rid)                         as baris,
       count(*)                                      as url,
       count(*) filter (where c.bucket is not null)  as ada_salinan,
       string_agg(distinct c.bucket, ',')            as bucket,
       min(c.rkey)                                   as contoh_baris,
       min(c.path)                                   as contoh_berkas
from cek c
join per_kolom k using (tabel, kolom)
group by c.tabel, c.kolom, k.baris_kolom, c.jalur
order by k.baris_kolom desc, c.tabel, c.kolom, baris desc;
