-- ============================================================================
-- v.1.4.2 · supervisi_catatan — orang yang DISUPERVISI boleh menjawab.
--
-- DITEMUKAN saat menyisir halaman Personal untuk keluhan izin (12 Sep 2026).
-- Belum dilaporkan siapa pun, tapi kerusakannya pasti dan sama persis kelasnya:
-- yang TAMPIL di layar lebih luas daripada yang DIIZINKAN basis data.
--
-- GEJALA: di kartu "Catatan Supervisi" (PersonalView) tiap guru melihat catatan
-- yang dialamatkan kepadanya — "Untuk Anda" — lengkap dengan kotak tanggapan dan
-- tiga tombol: Tandai Diproses, Tandai Selesai, Kirim Tanggapan. Ketiganya
-- memanggil mergeOne('supervisi_catatan', …) => UPDATE. Kebijakan tulisnya:
--
--   supervisi_upd … using (public.auth_can_supervisi())
--   auth_can_supervisi() = super_admin ATAU profiles.supervisi = true
--                          (jabatan Direktur/Supervisor)
--
-- Yang disupervisi justru BUKAN supervisor — itulah definisinya. Jadi setiap
-- guru biasa yang mencoba menjawab catatan tentang dirinya selalu memperoleh
-- "tak ada baris yang berubah (kemungkinan ditolak RLS / hak akses kurang)".
-- Fitur tanggapan itu tak pernah bisa dipakai oleh orang yang dituju.
--
-- PERBAIKAN, dua lapis — sengaja TIDAK cukup satu:
--
--   1. KEBIJAKAN `supervisi_upd_target` membuka UPDATE bagi PENERIMA catatan.
--      Kebijakan PERMISSIVE di-OR-kan, jadi jalur supervisor lama tak tersentuh.
--
--   2. TRIGGER `guard_supervisi_respon_target` mempersempit grain-nya ke KOLOM.
--      RLS Postgres hanya bisa berkata "boleh menyentuh baris ini" — tanpa
--      lapis kedua, guru yang ditegur bisa (lewat REST langsung) menyunting
--      `judul`/`catatan` teguran itu sendiri. Untuk tabel yang isinya justru
--      CATATAN TENTANG DIRINYA, itu bukan detail: menghapus kritik tentang diri
--      sendiri harus mustahil, bukan sekadar tak disediakan tombolnya.
--      Bandingkan dengan keputusan 31 Agu 2026 pada tabel `santri`, di mana
--      grain BARIS memang diterima — di sana pelakunya kepala lembaga yang
--      menyunting data ORANG LAIN yang memang wewenangnya. Di sini tidak.
--
--      Yang boleh berubah persis empat kunci di ekor jsonb: `status`,
--      `respon_target`, `responded_at`, `updatedAt` (+ `updated_at` bila kelak
--      ditulis eksplisit). Sisanya wajib identik — dan itu aman dilewati
--      mergeOne, yang menulis ulang SELURUH baris hasil deep-merge: kolom yang
--      tak disentuh ditulis kembali dengan nilai yang sama, jadi `is distinct
--      from` bernilai false.
--
-- PENERIMA = siapa (cermin supervisiList di PersonalView.vue):
--   · target_type 'guru'    → profiles.guru_id = target_id. Lurus, tak ada tafsir.
--   · target_type 'lembaga' → auth_heads_lembaga(data->>'target_nama'), helper
--     yang sudah ada sejak 20260831120000 dan sudah dijaga tes cermin
--     (tests/unit/lembagaKelompokCermin.test.js).
--
--     Catatan jujur: untuk cabang lembaga, SQL ini sedikit LEBIH SEMPIT daripada
--     JS. JS berkata "saya kepala (apa pun) DAN nama lembaga catatan = lembaga
--     saya"; auth_heads_lembaga berkata "jabatan saya Kepala/PJ/Pengasuh lembaga
--     ITU (atau kelompoknya)". Perbedaannya hanya menggigit kepala yang jabatannya
--     menyebut lembaga LAIN dari lembaga tempatnya terdaftar. Arah selisihnya
--     disengaja: lebih sempit = orang yang salah tak pernah dapat hak tulis, dan
--     yang terdampak tetap melihat pesan "akses ditolak" yang sejak v.1.4.2 sudah
--     berbahasa manusia (utils/pesanGalatDb.js) — bukan diam-diam gagal.
-- ============================================================================

-- ---- Penerima catatan supervisi -------------------------------------------
create or replace function public.auth_is_target_supervisi(
  p_target_type text, p_target_id text, p_data jsonb
)
returns boolean language sql stable security definer set search_path = public as $$
  select case lower(btrim(coalesce(p_target_type, '')))
    when 'guru' then exists (
      select 1 from public.profiles p
      where p.id = auth.uid()
        and coalesce(p.guru_id, '') <> ''
        and p.guru_id = coalesce(p_target_id, '')
    )
    when 'lembaga' then public.auth_heads_lembaga(coalesce(p_data->>'target_nama', ''))
    else false
  end
$$;

-- ---- Lapis 2: hanya empat kunci tanggapan yang boleh berubah ---------------
create or replace function public.guard_supervisi_respon_target()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  -- Kunci ekor jsonb yang memang milik si penerima. `updated_at` ikut didaftarkan
  -- meski kini kolom riil berdefault DB — supaya penambahan penulisan eksplisit
  -- kelak tidak diam-diam membuat tanggapan guru tertolak.
  v_boleh text[] := array['status', 'respon_target', 'responded_at', 'updatedAt', 'updated_at'];
begin
  -- Jalur server (edge function/service_role, auth.uid() null) dan jalur supervisor
  -- lewat tanpa diperiksa: keduanya memang berwenang atas seluruh isi catatan.
  if auth.uid() is null or public.auth_can_supervisi() then
    return new;
  end if;

  if (new.target_type, new.target_id, new.judul, new.catatan)
     is distinct from (old.target_type, old.target_id, old.judul, old.catatan)
  then
    raise exception
      'forbidden: penerima catatan supervisi hanya boleh mengisi tanggapan & status'
      using errcode = '42501';
  end if;

  if (coalesce(new.data, '{}'::jsonb) - v_boleh)
     is distinct from (coalesce(old.data, '{}'::jsonb) - v_boleh)
  then
    raise exception
      'forbidden: penerima catatan supervisi hanya boleh mengisi tanggapan & status'
      using errcode = '42501';
  end if;

  return new;
end $$;

drop trigger if exists trg_guard_supervisi_respon_target on public.supervisi_catatan;
create trigger trg_guard_supervisi_respon_target
  before update on public.supervisi_catatan
  for each row
  execute function public.guard_supervisi_respon_target();

-- ---- Lapis 1: kebijakan UPDATE untuk penerima ------------------------------
-- `supervisi_upd` (jalur supervisor) SENGAJA dibiarkan apa adanya — dua kebijakan
-- PERMISSIVE di-OR-kan, jadi ini menambah, bukan menggeser.
drop policy if exists supervisi_upd_target on public.supervisi_catatan;
create policy supervisi_upd_target on public.supervisi_catatan for update
  using (public.auth_is_target_supervisi(target_type, target_id, data))
  with check (public.auth_is_target_supervisi(target_type, target_id, data));
