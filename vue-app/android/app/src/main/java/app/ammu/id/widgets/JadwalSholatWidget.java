package app.ammu.id.widgets;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import android.os.SystemClock;
import android.view.View;
import android.widget.RemoteViews;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Calendar;

import app.ammu.id.MainActivity;
import app.ammu.id.R;

/**
 * v.1.5.5 (Kyai 25 Nov 2026) — widget "Jadwal Sholat" ala NU Online, menggantikan widget Kalender.
 *
 * Jadwal 7 hari dihitung di aplikasi (utils/widgetSholat.js, sumber yang sama dengan layar Jadwal
 * Sholat) lalu didorong lewat WidgetBridge -> SharedPreferences "ammu_widget" key "sholat" (JSON
 * { tempat, nama[5], hari:[{t, label, hijri, w[5] menit}], agenda:[{tgl, judul, libur}] }).
 * Widget hanya memilih hari ini & waktu berikutnya, jadi tetap benar beberapa hari walau aplikasi
 * tak dibuka. Hitung mundur memakai Chronometer (berdetak sendiri tanpa update tiap menit);
 * widget dijadwalkan ulang tepat saat waktu sholat berikutnya masuk (alarm tak-presisi cukup).
 */
public class JadwalSholatWidget extends AppWidgetProvider {

    private static final String PREFS = "ammu_widget";
    public static final String ACTION_UPDATE = "app.ammu.id.widgets.JADWAL_SHOLAT_UPDATE";
    private static final int[] ID_NAMA = {
        R.id.js_nama0, R.id.js_nama1, R.id.js_nama2, R.id.js_nama3, R.id.js_nama4
    };
    private static final int[] ID_JAM = {
        R.id.js_jam0, R.id.js_jam1, R.id.js_jam2, R.id.js_jam3, R.id.js_jam4
    };
    private static final int[] ID_SEL = {
        R.id.js_sel0, R.id.js_sel1, R.id.js_sel2, R.id.js_sel3, R.id.js_sel4
    };

    public static void updateAll(Context context) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(context);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(context, JadwalSholatWidget.class));
        for (int id : ids) updateWidget(context, mgr, id);
        if (ids.length > 0) jadwalkanUlang(context);
    }

    private static String pad2(int n) {
        return n < 10 ? "0" + n : String.valueOf(n);
    }

    private static String hhmm(int menit) {
        return pad2((menit / 60) % 24) + ":" + pad2(menit % 60);
    }

    private static String kunciHari(Calendar c) {
        return c.get(Calendar.YEAR) + "-" + pad2(c.get(Calendar.MONTH) + 1) + "-"
            + pad2(c.get(Calendar.DAY_OF_MONTH));
    }

    /** Hari ini dalam muatan (indeks), atau -1 bila muatan basi/kosong. */
    private static int cariHari(JSONArray hari, String kunci) {
        for (int i = 0; i < hari.length(); i++) {
            JSONObject h = hari.optJSONObject(i);
            if (h != null && kunci.equals(h.optString("t"))) return i;
        }
        return -1;
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        RemoteViews v = new RemoteViews(context.getPackageName(), R.layout.widget_jadwal_sholat);
        SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);

        Calendar kini = Calendar.getInstance();
        int menitKini = kini.get(Calendar.HOUR_OF_DAY) * 60 + kini.get(Calendar.MINUTE);
        try {
            JSONObject m = new JSONObject(sp.getString("sholat", "{}"));
            JSONArray hari = m.optJSONArray("hari");
            JSONArray nama = m.optJSONArray("nama");
            int idx = hari == null ? -1 : cariHari(hari, kunciHari(kini));
            if (idx < 0 || nama == null) {
                v.setViewVisibility(R.id.js_isi, View.GONE);
                v.setViewVisibility(R.id.js_kosong, View.VISIBLE);
            } else {
                v.setViewVisibility(R.id.js_isi, View.VISIBLE);
                v.setViewVisibility(R.id.js_kosong, View.GONE);
                JSONObject h = hari.getJSONObject(idx);
                JSONArray w = h.getJSONArray("w");
                v.setTextViewText(R.id.js_tempat, m.optString("tempat", ""));
                v.setTextViewText(R.id.js_tanggal, h.optString("label") + " · " + h.optString("hijri"));

                // Waktu berikutnya: hari ini, atau Subuh besok sesudah Isya.
                int berikut = -1;
                for (int i = 0; i < 5; i++) if (w.getInt(i) > menitKini) { berikut = i; break; }
                int targetMenit;
                String namaBerikut;
                if (berikut >= 0) {
                    targetMenit = w.getInt(berikut);
                    namaBerikut = nama.getString(berikut);
                } else {
                    JSONObject besok = hari.optJSONObject(idx + 1);
                    targetMenit = 1440 + (besok != null ? besok.getJSONArray("w").getInt(0) : w.getInt(0));
                    namaBerikut = nama.getString(0);
                }
                v.setTextViewText(R.id.js_berikut, namaBerikut + " " + hhmm(targetMenit));
                long sisaMs = (targetMenit - menitKini) * 60000L - kini.get(Calendar.SECOND) * 1000L;
                v.setChronometer(R.id.js_mundur, SystemClock.elapsedRealtime() + sisaMs, "− %s", true);
                v.setChronometerCountDown(R.id.js_mundur, true);

                for (int i = 0; i < 5; i++) {
                    v.setTextViewText(ID_NAMA[i], nama.getString(i));
                    v.setTextViewText(ID_JAM[i], hhmm(w.getInt(i)));
                    boolean sorot = i == berikut;
                    v.setInt(ID_SEL[i], "setBackgroundResource",
                        sorot ? R.drawable.widget_sholat_sorot : R.drawable.widget_sholat_sel);
                    int warna = sorot ? 0xFF0F766E : 0xFFFFFFFF;
                    v.setTextColor(ID_NAMA[i], warna);
                    v.setTextColor(ID_JAM[i], warna);
                }

                // Agenda terdekat (maks 2) di paling bawah.
                JSONArray ag = m.optJSONArray("agenda");
                int n = ag == null ? 0 : ag.length();
                v.setViewVisibility(R.id.js_agenda, n > 0 ? View.VISIBLE : View.GONE);
                isiAgenda(v, ag, 0, R.id.js_ag0, R.id.js_ag0_tgl, R.id.js_ag0_judul);
                isiAgenda(v, ag, 1, R.id.js_ag1, R.id.js_ag1_tgl, R.id.js_ag1_judul);
            }
        } catch (Exception e) {
            v.setViewVisibility(R.id.js_isi, View.GONE);
            v.setViewVisibility(R.id.js_kosong, View.VISIBLE);
        }

        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        v.setOnClickPendingIntent(R.id.js_root, PendingIntent.getActivity(context, 3, intent, flags));
        manager.updateAppWidget(widgetId, v);
    }

    private static void isiAgenda(RemoteViews v, JSONArray ag, int i, int idBaris, int idTgl, int idJudul) {
        JSONObject a = ag == null ? null : ag.optJSONObject(i);
        if (a == null) {
            v.setViewVisibility(idBaris, View.GONE);
            return;
        }
        v.setViewVisibility(idBaris, View.VISIBLE);
        v.setTextViewText(idTgl, a.optString("tgl"));
        v.setTextViewText(idJudul, a.optString("judul"));
        v.setInt(idTgl, "setBackgroundResource",
            a.optBoolean("libur") ? R.drawable.widget_chip_libur : R.drawable.widget_chip_agenda);
        v.setTextColor(idTgl, a.optBoolean("libur") ? 0xFF9F1239 : 0xFF115E59);
    }

    /** Bangun lagi tepat sesudah waktu sholat berikutnya / tengah malam (yang lebih dulu). */
    private static void jadwalkanUlang(Context context) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;
        long target = Long.MAX_VALUE;
        Calendar kini = Calendar.getInstance();
        int menitKini = kini.get(Calendar.HOUR_OF_DAY) * 60 + kini.get(Calendar.MINUTE);
        try {
            SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            JSONObject m = new JSONObject(sp.getString("sholat", "{}"));
            JSONArray hari = m.optJSONArray("hari");
            int idx = hari == null ? -1 : cariHari(hari, kunciHari(kini));
            if (idx >= 0) {
                JSONArray w = hari.getJSONObject(idx).getJSONArray("w");
                for (int i = 0; i < 5; i++) {
                    if (w.getInt(i) > menitKini) {
                        Calendar c = (Calendar) kini.clone();
                        c.set(Calendar.HOUR_OF_DAY, 0);
                        c.set(Calendar.MINUTE, 0);
                        c.set(Calendar.SECOND, 5);
                        c.set(Calendar.MILLISECOND, 0);
                        c.add(Calendar.MINUTE, w.getInt(i));
                        target = c.getTimeInMillis();
                        break;
                    }
                }
            }
        } catch (Exception e) { /* jatuh ke tengah malam */ }
        Calendar besok = (Calendar) kini.clone();
        besok.add(Calendar.DAY_OF_MONTH, 1);
        besok.set(Calendar.HOUR_OF_DAY, 0);
        besok.set(Calendar.MINUTE, 0);
        besok.set(Calendar.SECOND, 5);
        target = Math.min(target, besok.getTimeInMillis());

        Intent intent = new Intent(context, JadwalSholatWidget.class);
        intent.setAction(ACTION_UPDATE);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getBroadcast(context, 1003, intent, flags);
        // Alarm tak-presisi: sorotan berpindah paling lambat beberapa menit; hitung mundur tetap jalan.
        am.set(AlarmManager.RTC, target, pi);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager mgr, int[] ids) {
        for (int id : ids) updateWidget(context, mgr, id);
        jadwalkanUlang(context);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_UPDATE.equals(intent.getAction())) updateAll(context);
    }
}
