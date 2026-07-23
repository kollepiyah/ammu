-- ============================================================================
-- v.1.2.2 · REALTIME — tambal 3 tabel yang ada di services/db.js const REALTIME
-- tapi TAK PERNAH masuk publication `supabase_realtime`.
--
-- Audit 23 Jul 2026 membandingkan Set REALTIME (36 entri) dengan seluruh
-- `alter publication ... add table` di 31 migrasi (33 entri unik). Selisihnya:
--   · absensi_shift_guru          (ceklok masuk/pulang guru — Fingerspot & HiView)
--   · keuangan_tagihan            (tagihan santri)
--   · pembayaran_transfer_pending (konfirmasi transfer menunggu verifikasi)
--
-- Kenapa ini lebih buruk daripada sekadar "tak realtime": subscribeColl memakai
-- Set REALTIME sebagai penentu. Tabel yang TERDAFTAR di Set dianggap dikabari
-- lewat channel, sehingga jalur fetch-sekali TIDAK dijalankan. Karena Postgres
-- tak pernah menyiarkan tabel yang bukan anggota publication, layarnya diam
-- total — user wajib refresh manual. Tabel yang memang di luar Set justru aman
-- (ia jatuh ke fetch-sekali). Jadi gejalanya menipu: "kadang perlu refresh".
--
-- Idempoten: `alter publication ... add table` TIDAK punya IF NOT EXISTS dan
-- error bila tabelnya sudah anggota — jadi cek pg_publication_tables dulu.
-- Aman dijalankan ulang, dan aman bila ketiganya ternyata sudah ditambahkan
-- manual lewat Dashboard.
--
-- CERMIN: kalau menambah entri ke Set REALTIME di db.js, tambahkan juga di sini
-- (atau migrasi baru). Dua tempat, selalu.
-- ============================================================================
do $$
declare t text;
begin
  foreach t in array array[
    'absensi_shift_guru',
    'keuangan_tagihan',
    'pembayaran_transfer_pending'
  ]
  loop
    -- Lewati diam-diam bila tabelnya belum ada (mis. DB lama yang belum kena
    -- migrasi pembentuknya) — supaya `db push` tak berhenti di tengah jalan.
    if not exists (
      select 1 from information_schema.tables
      where table_schema = 'public' and table_name = t
    ) then
      raise notice 'realtime: tabel %.% belum ada, dilewati', 'public', t;
      continue;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime'
        and schemaname = 'public'
        and tablename = t
    ) then
      execute format('alter publication supabase_realtime add table public.%I', t);
      raise notice 'realtime: public.% ditambahkan ke supabase_realtime', t;
    end if;
  end loop;
end $$;
