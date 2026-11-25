-- Agenda publik (blueprint Ammu publik F4, Kyai 25 Nov 2026).
--
-- Sampai sekarang kebijakan kegiatan_sel = `using (true)` untuk SEMUA peran: siapa pun yang
-- memegang kunci anon aplikasi bisa membaca SELURUH agenda, termasuk agenda khusus guru /
-- lembaga. Penyaring tamu di aplikasi (kegiatanUntukTamu) hanya soal tampilan.
--
-- Kini admin memilih agenda mana yang tampil di publik lewat kolom `publik`. Pengguna yang
-- sudah masuk (authenticated) tetap membaca semuanya seperti dulu; tamu (anon) hanya baris
-- `publik = true`.

alter table public.kegiatan
  add column if not exists publik boolean not null default false;

-- Isi awal = aturan tampilan tamu yang berlaku sejak F1 (utils/wilayahPublik kegiatanUntukTamu):
-- untuk "semua", dan (bukan tipe 'kegiatan' ATAU tak dibatasi lembaga). Jadi tak ada agenda
-- yang tiba-tiba hilang dari kalender tamu, dan agenda guru/lembaga tetap tertutup.
update public.kegiatan
set publik = true
where coalesce(data ->> 'audience', 'semua') = 'semua'
  and (
    coalesce(data ->> 'tipe', 'kegiatan') <> 'kegiatan'
    -- CASE, bukan AND: field `lembaga` yang tak ada = NULL, dan NOT(NULL) bukan true.
    or not case
      when jsonb_typeof(data -> 'lembaga') = 'array' then jsonb_array_length(data -> 'lembaga') > 0
      else false
    end
  );

drop policy if exists kegiatan_sel on public.kegiatan;

create policy kegiatan_sel_masuk on public.kegiatan
  for select to authenticated
  using (true);

create policy kegiatan_sel_tamu on public.kegiatan
  for select to anon
  using (publik);
