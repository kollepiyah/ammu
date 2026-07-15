-- ============================================================================
-- keuangan_tagihan.terbayar jadi SUMBER KEBENARAN (audit 15 Jul 2026).
--
-- MASALAH: kolom riil `terbayar` (DDL 20260622090200_keuangan.sql:12) TAK PERNAH diisi
--   siapa pun. App menulis `bayar`/`dibayar` — nama itu tak terdaftar di db.js COLS, jadi
--   jatuh ke ekor jsonb `data`. RPC apply_bmt_payment pun menulis ke data->>'bayar'.
--   Akibatnya kolomnya selamanya 0: laporan/query SQL yang mempercayainya diam-diam salah
--   (mis. `where terbayar < nominal` -> SEMUA tagihan tampak nunggak penuh, termasuk lunas),
--   dan angka bayar terkubur di jsonb sehingga tak bisa di-index/difilter di SQL.
--
-- ISI MIGRASI:
--   (1) BACKFILL kolom `terbayar` dari jsonb untuk baris lama.
--   (2) apply_bmt_payment ditulis ulang -> update kolom `terbayar` (bukan data->>'bayar').
--
-- ⚠️ URUTAN DEPLOY: JALANKAN MIGRASI INI **SEBELUM** deploy web/Electron versi baru.
--   Kalau kode baru live duluan tanpa backfill, baris lama punya terbayar = 0. Helper
--   utils/tagihan.js `terbayarDari()` sengaja punya fallback ke jsonb sebagai jaring
--   pengaman, jadi TIDAK fatal — tapi jangan diandalkan.
--
-- CATATAN: `bayar`/`dibayar` di jsonb SENGAJA TIDAK dihapus. Itu jaring pengaman untuk
--   klien lama (Electron memuat snapshot bundle via file://) dan bahan rekonsiliasi kalau
--   backfill meleset. Bersihkan lewat migrasi terpisah setelah semua klien diperbarui.
-- ============================================================================

-- ---- (1) BACKFILL --------------------------------------------------------
-- Hanya sentuh baris yang terbayar-nya masih 0 TAPI jsonb-nya menyimpan angka > 0, jadi
-- migrasi ini idempoten & tak menimpa nilai kolom yang sudah benar. Regex guard: jsonb
-- bebas-bentuk, isinya bisa saja teks/null -> cast langsung bisa meledak.
update public.keuangan_tagihan t
set terbayar = v.byr
from (
  select id,
         greatest(0, coalesce(
           case when data->>'bayar' ~ '^[0-9]+(\.[0-9]+)?$'
                then floor((data->>'bayar')::numeric)::bigint end,
           case when data->>'dibayar' ~ '^[0-9]+(\.[0-9]+)?$'
                then floor((data->>'dibayar')::numeric)::bigint end,
           0)) as byr
  from public.keuangan_tagihan
) v
where t.id = v.id
  and t.terbayar = 0
  and v.byr > 0;

comment on column public.keuangan_tagihan.terbayar is
  'Jumlah SUDAH terbayar (sumber kebenaran sejak 15 Jul 2026). Ekor jsonb data->>bayar/dibayar = peninggalan lama, jangan dipakai untuk hitungan baru.';

-- ---- (2) apply_bmt_payment -> pakai kolom `terbayar` ----------------------
-- Sama persis dgn 20260629110000_bmt_va_uangsaku.sql KECUALI 2 blok update tagihan:
-- angka bayar pindah dari data->>'bayar' ke kolom terbayar. Metadata pembayaran
-- (last_payment_ref/at, applied_transfer_refs) TETAP di jsonb — itu bukan angka uang.
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
        -- t.terbayar di sisi kanan = nilai LAMA (semantik UPDATE Postgres) -> aman menambah.
        update public.keuangan_tagihan t
        set terbayar = coalesce(t.terbayar, 0) + v_amt,
            data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
              'last_payment_ref', 'bi_bmt_' || p_ref,
              'last_payment_at',  now(),
              'applied_transfer_refs',
                coalesce(t.data->'applied_transfer_refs', '[]'::jsonb) || to_jsonb(array[p_ref])
            ),
            status = case
              when coalesce(t.terbayar, 0) + v_amt >= t.nominal and t.nominal > 0 then 'lunas'
              when coalesce(t.terbayar, 0) + v_amt > 0 then 'partial'
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
      select id, nominal, terbayar, data from public.keuangan_tagihan
      where santri_id = p_santri_id and coalesce(status, 'belum') <> 'lunas'
      order by coalesce(data->>'jatuh_tempo', tanggal, ''), created_at
    loop
      exit when v_remaining <= 0;
      v_newbayar := coalesce(v_tag.terbayar, 0);
      v_pay := least(v_remaining, greatest(v_tag.nominal - v_newbayar, 0));
      if v_pay <= 0 then continue; end if;
      v_newbayar := v_newbayar + v_pay;
      v_status := case
        when v_newbayar >= v_tag.nominal and v_tag.nominal > 0 then 'lunas'
        when v_newbayar > 0 then 'partial' else 'belum' end;
      update public.keuangan_tagihan t
      set terbayar = v_newbayar,
          data = coalesce(t.data, '{}'::jsonb) || jsonb_build_object(
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
