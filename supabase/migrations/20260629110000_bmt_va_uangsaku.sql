-- ============================================================================
-- Uang Saku + jalur Virtual Account BMT (keranjang / 1 transfer campur).
--
-- Tujuan: wali susun "keranjang" (tagihan + top-up uang saku) di app -> simpan
-- niat-bayar (keuangan_va_intent) + tampil VA. Saat dana masuk, server BMT lapor
-- ke Edge Function `bmt-webhook` -> panggil RPC apply_bmt_payment yang:
--   (a) idempoten via keuangan_va_inbox (1 baris per ref BMT),
--   (b) kalau ada intent cocok -> alokasi per item (tagihan + uang saku),
--   (c) kalau tidak -> WATERFALL (lunasi tagihan tertua dulu, sisa -> uang saku),
--   (d) tulis keuangan_buku_induk (sumber 'bmt_va').
--
-- Logika uang ditaruh di RPC plpgsql (atomik + native jsonb) supaya bentuk row
-- IDENTIK dgn yang ditulis app (verifyTransfer): paid = data.bayar/dibayar,
-- status = kolom, applied_transfer_refs = data jsonb. Resolusi VA->santri ada di
-- Edge Function (punya akses settings prefix + util), RPC terima santri_id jadi.
-- ============================================================================

-- ---- Tabel: niat-bayar (keranjang) -----------------------------------------
create table if not exists public.keuangan_va_intent (
  id         text primary key,
  santri_id  text,
  va         text,                  -- nomor VA yang ditampilkan ke wali
  total      bigint not null default 0 check (total >= 0),
  status     text not null default 'pending',  -- pending | terbayar | dibatalkan | kadaluarsa
  created_by uuid default auth.uid(),
  data       jsonb not null default '{}'::jsonb, -- { items:[{tipe:'tagihan',tagihan_id,kategori,nominal}|{tipe:'uang_saku',nominal}], santri_nama, paid_ref, paid_at }
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists keuangan_va_intent_santri_idx on public.keuangan_va_intent (santri_id);
create index if not exists keuangan_va_intent_status_idx on public.keuangan_va_intent (status);

-- ---- Tabel: inbox laporan BMT (idempotency ledger, server-only) -------------
create table if not exists public.keuangan_va_inbox (
  ref        text primary key,      -- id transaksi unik dari BMT (anti-dobel)
  santri_id  text,
  nominal    bigint not null default 0,
  intent_id  text,
  payload    jsonb not null default '{}'::jsonb, -- payload mentah BMT (audit)
  result     jsonb not null default '{}'::jsonb, -- hasil alokasi
  created_at timestamptz not null default now()
);
create index if not exists keuangan_va_inbox_santri_idx on public.keuangan_va_inbox (santri_id);

-- ---- RLS (tabel baru: blanket-enable loop sudah jalan duluan, set manual) ----
alter table public.keuangan_va_intent enable row level security;
alter table public.keuangan_va_inbox  enable row level security;

-- intent: baca signedIn, buat signedIn (wali), batal oleh pembuat ATAU keuangan,
--   hapus keuangan. (mirror pola pembayaran_transfer_pending yg longgar tapi jalan)
create policy va_intent_sel on public.keuangan_va_intent for select using (auth.uid() is not null);
create policy va_intent_ins on public.keuangan_va_intent for insert with check (auth.uid() is not null);
create policy va_intent_upd on public.keuangan_va_intent for update
  using (created_by = auth.uid() or public.auth_can_keuangan())
  with check (created_by = auth.uid() or public.auth_can_keuangan());
create policy va_intent_del on public.keuangan_va_intent for delete using (public.auth_can_keuangan());

-- inbox: server-only (RPC SECURITY DEFINER + service_role nulis); admin keuangan baca.
create policy va_inbox_sel on public.keuangan_va_inbox for select using (public.auth_can_keuangan());

-- ---- Realtime: intent agar status flip (terbayar) tampil di app tanpa refresh -
-- (uang_saku & tabungan sudah di publication via ...realtime_add_master_data)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public'
      and tablename = 'keuangan_va_intent'
  ) then
    execute 'alter publication supabase_realtime add table public.keuangan_va_intent';
  end if;
end $$;

-- ============================================================================
-- RPC apply_bmt_payment — terapkan 1 laporan pembayaran BMT (santri sudah dipetakan).
-- SECURITY DEFINER: bypass RLS, tulis lintas tabel keuangan. Atomik (1 transaksi).
-- Return jsonb { ok, dup, intent_id, allocated, tagihan, uang_saku }.
-- ============================================================================
create or replace function public.apply_bmt_payment(
  p_santri_id text,
  p_nominal   bigint,
  p_ref       text,
  p_payload   jsonb default '{}'::jsonb
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_existing   public.keuangan_va_inbox%rowtype;
  v_intent     public.keuangan_va_intent%rowtype;
  v_item       jsonb;
  v_tgl        text := to_char(now() at time zone 'Asia/Jakarta', 'YYYY-MM-DD');
  v_santri_nama text;
  v_remaining  bigint;
  v_pay        bigint;
  v_amt        bigint;
  v_idx        int := 0;
  v_us_total   bigint := 0;
  v_tag_total  bigint := 0;
  v_tag        record;
  v_newbayar   bigint;
  v_status     text;
  v_result     jsonb;
begin
  if p_ref is null or length(trim(p_ref)) = 0 then
    raise exception 'ref wajib (idempotency key)';
  end if;

  -- (1) idempoten: ref sudah diproses -> kembalikan hasil lama
  select * into v_existing from public.keuangan_va_inbox where ref = p_ref;
  if found then
    return jsonb_build_object('ok', true, 'dup', true, 'result', v_existing.result);
  end if;

  select nama into v_santri_nama from public.santri where id = p_santri_id;

  -- (2) cari intent cocok (santri + pending + total == nominal). Kunci baris.
  select * into v_intent
  from public.keuangan_va_intent
  where santri_id = p_santri_id and status = 'pending' and total = p_nominal
  order by created_at asc
  limit 1
  for update;

  if found then
    -- (2a) alokasi per item keranjang
    for v_item in select * from jsonb_array_elements(coalesce(v_intent.data->'items', '[]'::jsonb))
    loop
      v_idx := v_idx + 1;
      v_amt := coalesce((v_item->>'nominal')::bigint, 0);
      if v_amt <= 0 then continue; end if;

      if (v_item->>'tipe') = 'tagihan' and (v_item->>'tagihan_id') is not null then
        update public.keuangan_tagihan t
        set data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
              'bayar',   coalesce((t.data->>'bayar')::bigint, 0) + v_amt,
              'dibayar', coalesce((t.data->>'bayar')::bigint, 0) + v_amt,
              'last_payment_ref', 'bi_bmt_' || p_ref,
              'last_payment_at',  now(),
              'applied_transfer_refs',
                coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) || to_jsonb(array[p_ref])
            ),
            status = case
              when coalesce((t.data->>'bayar')::bigint, 0) + v_amt >= t.nominal and t.nominal > 0 then 'lunas'
              when coalesce((t.data->>'bayar')::bigint, 0) + v_amt > 0 then 'partial'
              else 'belum' end,
            updated_at = now()
        where t.id = (v_item->>'tagihan_id')
          and not coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) ? p_ref;
        v_tag_total := v_tag_total + v_amt;
      elsif (v_item->>'tipe') = 'uang_saku' then
        insert into public.keuangan_uang_saku_santri (id, santri_id, jenis, nominal, tanggal, data)
        values ('us_bmt_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_amt, v_tgl,
                jsonb_build_object('sumber', 'bmt_va', 'ref', p_ref, 'catatan', 'Top-up Uang Saku via VA BMT'))
        on conflict (id) do nothing;
        v_us_total := v_us_total + v_amt;
      end if;
    end loop;

    update public.keuangan_va_intent
    set status = 'terbayar',
        data = data || jsonb_build_object('paid_ref', p_ref, 'paid_at', now()),
        updated_at = now()
    where id = v_intent.id;

  else
    -- (2b) WATERFALL: tak ada intent -> lunasi tagihan tertua dulu, sisa -> uang saku
    v_remaining := p_nominal;
    for v_tag in
      select id, nominal, data from public.keuangan_tagihan
      where santri_id = p_santri_id and coalesce(status, 'belum') <> 'lunas'
      order by coalesce(data->>'jatuh_tempo', tanggal, ''), created_at
    loop
      exit when v_remaining <= 0;
      v_newbayar := coalesce((v_tag.data->>'bayar')::bigint, 0);
      v_pay := least(v_remaining, greatest(v_tag.nominal - v_newbayar, 0));
      if v_pay <= 0 then continue; end if;
      v_newbayar := v_newbayar + v_pay;
      v_status := case
        when v_newbayar >= v_tag.nominal and v_tag.nominal > 0 then 'lunas'
        when v_newbayar > 0 then 'partial' else 'belum' end;
      update public.keuangan_tagihan t
      set data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
            'bayar', v_newbayar, 'dibayar', v_newbayar,
            'last_payment_ref', 'bi_bmt_' || p_ref, 'last_payment_at', now(),
            'applied_transfer_refs',
              coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) || to_jsonb(array[p_ref])),
          status = v_status, updated_at = now()
      where t.id = v_tag.id;
      v_remaining := v_remaining - v_pay;
      v_tag_total := v_tag_total + v_pay;
    end loop;

    if v_remaining > 0 then
      v_idx := v_idx + 1;
      insert into public.keuangan_uang_saku_santri (id, santri_id, jenis, nominal, tanggal, data)
      values ('us_bmt_' || p_ref || '_' || v_idx, p_santri_id, 'setor', v_remaining, v_tgl,
              jsonb_build_object('sumber', 'bmt_va', 'ref', p_ref, 'catatan', 'Sisa transfer VA -> Uang Saku (waterfall)'))
      on conflict (id) do nothing;
      v_us_total := v_us_total + v_remaining;
    end if;
  end if;

  -- (3) buku induk (pemasukan). nominal > 0 wajib (check constraint).
  if p_nominal > 0 then
    insert into public.keuangan_buku_induk (id, tipe, sumber, nominal, tanggal, keterangan, data)
    values ('bi_bmt_' || p_ref, 'masuk', 'bmt_va', p_nominal, v_tgl,
            'Pembayaran VA BMT - ' || coalesce(v_santri_nama, p_santri_id),
            jsonb_build_object('santri_id', p_santri_id, 'santri_nama', coalesce(v_santri_nama, ''),
                               'va_ref', p_ref, 'intent_id', case when v_intent.id is not null then v_intent.id else null end))
    on conflict (id) do nothing;
  end if;

  v_result := jsonb_build_object(
    'ok', true, 'dup', false,
    'intent_id', case when v_intent.id is not null then v_intent.id else null end,
    'allocated', p_nominal, 'tagihan', v_tag_total, 'uang_saku', v_us_total);

  -- (4) tandai ref diproses (PK ref = guard anti-dobel saat balapan)
  insert into public.keuangan_va_inbox (ref, santri_id, nominal, intent_id, payload, result)
  values (p_ref, p_santri_id, p_nominal,
          case when v_intent.id is not null then v_intent.id else null end, coalesce(p_payload, '{}'::jsonb), v_result);

  return v_result;
end;
$$;

-- Hanya server (service_role) boleh eksekusi — cegah user (santri) kredit diri sendiri.
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb) from public;
revoke all on function public.apply_bmt_payment(text, bigint, text, jsonb) from anon, authenticated;
grant execute on function public.apply_bmt_payment(text, bigint, text, jsonb) to service_role;
