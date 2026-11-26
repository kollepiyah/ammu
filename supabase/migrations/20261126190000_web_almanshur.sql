-- ============================================================================
-- Skema Database Website Publik almanshur.id (Terintegrasi Supabase Ammu Online)
-- Jalankan di Supabase Dashboard -> SQL Editor, atau salin ke supabase/migrations/
-- proyek Ammu lalu jalankan `npx supabase db push`.
--
-- Aman dijalankan ulang (idempoten). Tidak mengubah tabel operasional Ammu.
-- ============================================================================

-- 1) Helper updated_at mandiri
create or replace function public.web_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- 2) Helper hak akses pengelola web (super_admin, admin, atau user dengan akses.kelola_web = true)
create or replace function public.web_can_manage()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(
    public.auth_can_manage()
    or exists (
      select 1 from public.profiles
      where id = auth.uid()
        and coalesce((akses ->> 'kelola_web')::boolean, false) = true
    ),
    false
  )
$$;

-- ============================================================================
-- TABEL 1: web_pengaturan (Profil pondok, Visi-Misi, Unit Pendidikan, FAQ, Galeri, Sakelar ON/OFF)
-- ============================================================================
create table if not exists public.web_pengaturan (
  id         text primary key,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_web_pengaturan_updated on public.web_pengaturan;
create trigger trg_web_pengaturan_updated
  before update on public.web_pengaturan
  for each row execute function public.web_set_updated_at();

grant all on public.web_pengaturan to anon, authenticated, service_role;
alter table public.web_pengaturan enable row level security;

drop policy if exists web_pengaturan_sel on public.web_pengaturan;
create policy web_pengaturan_sel on public.web_pengaturan
  for select using (true);

drop policy if exists web_pengaturan_ins on public.web_pengaturan;
create policy web_pengaturan_ins on public.web_pengaturan
  for insert with check (public.web_can_manage());

drop policy if exists web_pengaturan_upd on public.web_pengaturan;
create policy web_pengaturan_upd on public.web_pengaturan
  for update using (public.web_can_manage()) with check (public.web_can_manage());

drop policy if exists web_pengaturan_del on public.web_pengaturan;
create policy web_pengaturan_del on public.web_pengaturan
  for delete using (public.web_can_manage());

-- ============================================================================
-- TABEL 2: web_artikel (Portal Artikel & Kajian /artikel & /artikel/[slug])
-- ============================================================================
create table if not exists public.web_artikel (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  judul       text not null,
  ringkasan   text not null default '',
  isi_html    text not null default '',
  kategori    text not null default 'Kajian Islam',
  penulis     text not null default 'Tim Media Al Manshur',
  gambar_url  text not null default '',
  status      text not null default 'draf' check (status in ('draf', 'terbit')),
  unggulan    boolean not null default false,
  terbit_pada timestamptz,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists web_artikel_status_terbit_idx
  on public.web_artikel (status, terbit_pada desc nulls last, created_at desc);
create index if not exists web_artikel_kategori_idx
  on public.web_artikel (kategori, status);

drop trigger if exists trg_web_artikel_updated on public.web_artikel;
create trigger trg_web_artikel_updated
  before update on public.web_artikel
  for each row execute function public.web_set_updated_at();

grant all on public.web_artikel to anon, authenticated, service_role;
alter table public.web_artikel enable row level security;

drop policy if exists web_artikel_sel on public.web_artikel;
create policy web_artikel_sel on public.web_artikel
  for select using (status = 'terbit' or public.web_can_manage());

drop policy if exists web_artikel_ins on public.web_artikel;
create policy web_artikel_ins on public.web_artikel
  for insert with check (public.web_can_manage());

drop policy if exists web_artikel_upd on public.web_artikel;
create policy web_artikel_upd on public.web_artikel
  for update using (public.web_can_manage()) with check (public.web_can_manage());

drop policy if exists web_artikel_del on public.web_artikel;
create policy web_artikel_del on public.web_artikel
  for delete using (public.web_can_manage());

-- ============================================================================
-- TABEL 3: web_unit_usaha (Etalase Unit Usaha / BUMP: Al Manshur Media, Pustaka Al Manshur, dll.)
-- ============================================================================
create table if not exists public.web_unit_usaha (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  nama           text not null,
  tagline        text not null default '',
  kategori       text not null default 'Unit Usaha',
  ringkasan      text not null default '',
  deskripsi_html text not null default '',
  gambar_url     text not null default '',
  galeri_urls    jsonb not null default '[]'::jsonb,
  paket          jsonb not null default '[]'::jsonb,
  portofolio     jsonb not null default '[]'::jsonb,
  kontak_wa      text not null default '',
  kontak_ig      text not null default '',
  kontak_youtube text not null default '',
  teks_cta       text not null default 'Konsultasi via WhatsApp',
  urutan         integer not null default 0,
  aktif          boolean not null default true,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

create index if not exists web_unit_usaha_aktif_urutan_idx
  on public.web_unit_usaha (aktif, urutan asc);

drop trigger if exists trg_web_unit_usaha_updated on public.web_unit_usaha;
create trigger trg_web_unit_usaha_updated
  before update on public.web_unit_usaha
  for each row execute function public.web_set_updated_at();

grant all on public.web_unit_usaha to anon, authenticated, service_role;
alter table public.web_unit_usaha enable row level security;

drop policy if exists web_unit_usaha_sel on public.web_unit_usaha;
create policy web_unit_usaha_sel on public.web_unit_usaha
  for select using (aktif = true or public.web_can_manage());

drop policy if exists web_unit_usaha_ins on public.web_unit_usaha;
create policy web_unit_usaha_ins on public.web_unit_usaha
  for insert with check (public.web_can_manage());

drop policy if exists web_unit_usaha_upd on public.web_unit_usaha;
create policy web_unit_usaha_upd on public.web_unit_usaha
  for update using (public.web_can_manage()) with check (public.web_can_manage());

drop policy if exists web_unit_usaha_del on public.web_unit_usaha;
create policy web_unit_usaha_del on public.web_unit_usaha
  for delete using (public.web_can_manage());

-- ============================================================================
-- DATA DRAF AWAL UNIT USAHA (aman dijalankan ulang, tidak menimpa data yang sudah diedit)
-- ============================================================================
insert into public.web_unit_usaha (
  slug, nama, tagline, kategori, ringkasan, deskripsi_html, paket, portofolio,
  kontak_wa, kontak_ig, kontak_youtube, teks_cta, urutan, aktif
) values
(
  'al-manshur-media',
  'Al Manshur Media',
  'Jasa Live Streaming Multi-Kamera & Produksi Video Profesional',
  'Jasa Media & Siaran',
  'Unit media Pondok Pesantren Mambaul Ulum yang melayani jasa live streaming YouTube/Instagram, dokumentasi pengajian, haflah, acara lembaga, walimah, serta pembuatan video profil.',
  '<p><strong>Al Manshur Media</strong> adalah unit kreatif dan penyiaran di bawah naungan Badan Usaha Milik Pondok (BUMP) Yayasan Al Manshur. Berbekal pengalaman menayangkan berbagai kegiatan besar pesantren, kami membuka layanan profesional untuk masyarakat umum, majelis taklim, sekolah, instansi, dan acara keluarga di wilayah Sidoarjo, Surabaya, dan sekitarnya.</p><h3>Mengapa Memilih Al Manshur Media?</h3><ul><li>Kualitas gambar jernih Full HD dengan sistem switching multi-kamera real-time.</li><li>Audio bersih langsung dari mixer sound system acara (bebas bising ruangan).</li><li>Tampilan grafis siaran rapi (lower-third pembicara, running text, overlay logo lembaga).</li><li>Tim kru berpengalaman, sopan, dan memahami tata krama majelis/acara keagamaan.</li></ul>',
  '[
    {
      "nama": "Paket Siaran Pengajian",
      "harga": "Hubungi Kami (Draf)",
      "deskripsi": "Cocok untuk kajian rutin, majelis sholawat, dan rapat/seminar lembaga.",
      "fitur": ["1–2 kamera Full HD + operator", "Live streaming YouTube / Facebook", "Audio direct mixer bersih", "Rekaman arsip video penuh"],
      "populer": false
    },
    {
      "nama": "Paket Multi-Cam Event & Haflah",
      "harga": "Hubungi Kami (Draf)",
      "deskripsi": "Produksi siaran lengkap untuk acara besar, wisuda, haflah, dan walimah.",
      "fitur": ["3 kamera Full HD + video switcher", "Grafis lower-third & bumper acara", "Live multi-platform + layar LED/proyektor", "Highlight reels 1 menit siap unggah"],
      "populer": true
    },
    {
      "nama": "Paket Video Profil & Dokumentasi",
      "harga": "Hubungi Kami (Draf)",
      "deskripsi": "Pembuatan company profile lembaga, sekolah, UMKM, hingga film pendek.",
      "fitur": ["Konsep naskah & pengambilan gambar sinematik", "Editing color grading & audio mastering", "Format landscape (YouTube) & vertikal (Reels/TikTok)", "Revisi terarah sampai final"],
      "populer": false
    }
  ]'::jsonb,
  '[
    {"judul": "Dokumentasi & Siaran Resmi @almanshurtv", "url": "https://www.youtube.com/@almanshurtv1990", "platform": "YouTube"},
    {"judul": "Cuplikan Karya & Reels @almanshurtv", "url": "https://www.instagram.com/almanshurtv/", "platform": "Instagram"}
  ]'::jsonb,
  '',
  '@almanshurtv',
  '@almanshurtv1990',
  'Pesan Jasa via WhatsApp',
  1,
  true
),
(
  'pustaka-al-manshur',
  'Pustaka Al Manshur',
  'Penerbitan Buku, Percetakan Sertifikat, Rapor & Kebutuhan ATK Lembaga',
  'Penerbitan & Percetakan',
  'Layanan penerbitan buku, cetak sertifikat, blangko rapor, poster A3 tahan air, modul pembelajaran, serta pengadaan kitab dan alat tulis untuk lembaga pendidikan dan masyarakat.',
  '<p><strong>Pustaka Al Manshur</strong> hadir untuk mendukung kemandirian literasi dan kebutuhan cetak lembaga pendidikan maupun masyarakat luas. Kami menangani cetak skala kecil hingga menengah dengan hasil rapi dan harga bersahabat.</p><h3>Layanan Utama</h3><ul><li>Cetak sertifikat, piagam, blangko rapor, dan poster A3 tinta tahan air.</li><li>Penerbitan buku, modul pengajian, buku penghubung santri, dan panduan acara.</li><li>Pengadaan kitab kuning, buku Qiraati/pendukung, serta alat tulis kantor (ATK).</li></ul>',
  '[
    {
      "nama": "Cetak Sertifikat, Rapor & Poster A3",
      "harga": "Hubungi Kami (Draf)",
      "deskripsi": "Hasil cetak tajam dengan opsi tinta tahan air untuk kebutuhan resmi lembaga.",
      "fitur": ["Kertas art paper / linen / concord pilihan", "Bisa cetak personalisasi nama peserta", "Ukuran hingga A3+ tahan air"],
      "populer": true
    },
    {
      "nama": "Penerbitan & Cetak Modul/Buku",
      "harga": "Hubungi Kami (Draf)",
      "deskripsi": "Pendampingan tata letak hingga cetak buku pondok, sekolah, atau karya tulis.",
      "fitur": ["Layout & desain sampul rapi", "Jilid lem panas / steples tengah", "Oplah fleksibel sesuai kebutuhan"],
      "populer": false
    }
  ]'::jsonb,
  '[]'::jsonb,
  '',
  '@almanshurtv',
  '',
  'Tanya Cetak via WhatsApp',
  2,
  true
)
on conflict (slug) do nothing;

-- Catatan Storage:
-- Unggahan foto dari /admin memakai bucket publik `branding` yang sudah ada di Ammu Online
-- (folder `web_almanshur/...`) yang kebijakan tulisnya sudah dijaga `public.auth_can_manage()`.
-- Bila nanti ada user non-admin yang diberi akses `akses.kelola_web = true`, perbarui policy
-- bucket `branding` di Dashboard -> Storage agar memeriksa `public.web_can_manage()`.
