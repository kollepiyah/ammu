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
import android.widget.RemoteViews;

import java.util.Calendar;

import app.ammu.id.MainActivity;
import app.ammu.id.R;

/**
 * v.94.0626 — Widget home screen "Jam Hijri" (Java; sebelumnya .kt yang TIDAK ter-compile
 *   karena project Android tanpa plugin kotlin -> widget cuma tampil placeholder).
 *
 * Desain dibuat SAMA dengan kartu Hijri di beranda (DashboardJamHijri.vue):
 *   kartu gradient teal, chip hari, tanggal Hijri Arab, tanggal Masehi italic, label WIB + jam besar.
 *
 * Nilai Hijri Arab di-PUSH dari app (WidgetBridge -> SharedPreferences "ammu_widget" key "hijri")
 *   supaya PERSIS sama dengan beranda (metode + kalibrasi). Kalau belum/ stale, fallback hitung
 *   Umm al-Qura (android.icu, API 24+) + offset kalibrasi.
 *
 * Update tiap menit via AlarmManager. Tap -> buka app.
 */
public class JamHijriWidget extends AppWidgetProvider {

    private static final String ACTION_UPDATE = "app.ammu.id.widgets.JAM_HIJRI_UPDATE";
    private static final String PREFS = "ammu_widget";

    private static final String[] ARABIC_DIGITS = {"٠","١","٢","٣","٤","٥","٦","٧","٨","٩"};

    // Nama bulan Hijri dalam Arab — selaras utils/hijri.js (NAMA_BULAN_ARAB)
    private static final String[] NAMA_BULAN_ARAB = {
        "ٱلمحرم", "صفر", "ربيع ٱلأول", "ربيع ٱلثاني",
        "جمادى ٱلأولى", "جمادى ٱلثانية", "رجب", "شعبان",
        "رمضان", "شوال", "ذو ٱلقعدة", "ذو ٱلحجة"
    };

    private static final String[] NAMA_HARI = {
        "MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"
    };

    private static final String[] NAMA_BULAN_MASEHI = {
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    };

    public static void updateAll(Context context) {
        AppWidgetManager mgr = AppWidgetManager.getInstance(context);
        int[] ids = mgr.getAppWidgetIds(new ComponentName(context, JamHijriWidget.class));
        for (int id : ids) updateWidget(context, mgr, id);
    }

    private static String toArabic(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c >= '0' && c <= '9') sb.append(ARABIC_DIGITS[c - '0']);
            else sb.append(c);
        }
        return sb.toString();
    }

    private static int kalibrasi(SharedPreferences sp) {
        try { return Integer.parseInt(sp.getString("kalibrasi", "0")); }
        catch (Exception e) { return 0; }
    }

    /** Hijri Arab: pakai nilai push dari app kalau masih untuk hari ini; selain itu hitung Umm al-Qura. */
    private static String hijriText(Context context, String todayKey) {
        SharedPreferences sp = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        String pushed = sp.getString("hijri", "");
        String pushedKey = sp.getString("hijriKey", "");
        if (!pushed.isEmpty() && pushedKey.equals(todayKey)) return pushed;
        // Fallback: hitung sendiri (Umm al-Qura) + offset kalibrasi
        return computeHijriUmalqura(kalibrasi(sp));
    }

    private static String computeHijriUmalqura(int offsetDays) {
        try {
            if (Build.VERSION.SDK_INT >= 24) {
                Calendar greg = Calendar.getInstance();
                greg.add(Calendar.DAY_OF_MONTH, offsetDays);
                android.icu.util.IslamicCalendar ic = new android.icu.util.IslamicCalendar();
                ic.setCalculationType(android.icu.util.IslamicCalendar.CalculationType.ISLAMIC_UMALQURA);
                ic.setTime(greg.getTime());
                int day = ic.get(android.icu.util.IslamicCalendar.DAY_OF_MONTH);
                int month = ic.get(android.icu.util.IslamicCalendar.MONTH); // 0-based
                int year = ic.get(android.icu.util.IslamicCalendar.YEAR);
                if (month < 0 || month > 11) return "";
                return toArabic(String.valueOf(day)) + " " + NAMA_BULAN_ARAB[month] + " " + toArabic(String.valueOf(year));
            }
        } catch (Exception e) { /* ignore */ }
        return "";
    }

    private static void updateWidget(Context context, AppWidgetManager manager, int widgetId) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.widget_jam_hijri);

        Calendar cal = Calendar.getInstance();
        int hariIdx = cal.get(Calendar.DAY_OF_WEEK) - 1;
        int tgl = cal.get(Calendar.DAY_OF_MONTH);
        int bulan = cal.get(Calendar.MONTH);
        int tahun = cal.get(Calendar.YEAR);
        int jam = cal.get(Calendar.HOUR_OF_DAY);
        int menit = cal.get(Calendar.MINUTE);

        String todayKey = tahun + "-" + pad2(bulan + 1) + "-" + pad2(tgl);

        // Jam HH:mm (widget update per menit)
        views.setTextViewText(R.id.widget_jam, pad2(jam) + ":" + pad2(menit));
        // Chip hari (uppercase)
        views.setTextViewText(R.id.widget_hari, NAMA_HARI[hariIdx]);
        // Tanggal Hijri (Arab)
        views.setTextViewText(R.id.widget_tanggal_hijri, hijriText(context, todayKey));
        // Tanggal Masehi: "4 Juni 2026"
        views.setTextViewText(R.id.widget_tanggal_masehi, tgl + " " + NAMA_BULAN_MASEHI[bulan] + " " + tahun);

        // Tap -> buka app
        Intent intent = new Intent(context, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getActivity(context, 0, intent, flags);
        views.setOnClickPendingIntent(R.id.widget_root, pi);

        manager.updateAppWidget(widgetId, views);
    }

    private static String pad2(int n) {
        return n < 10 ? "0" + n : String.valueOf(n);
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        for (int id : appWidgetIds) updateWidget(context, appWidgetManager, id);
        scheduleNextUpdate(context);
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (ACTION_UPDATE.equals(intent.getAction())) {
            updateAll(context);
            scheduleNextUpdate(context);
        }
    }

    @Override
    public void onEnabled(Context context) {
        super.onEnabled(context);
        scheduleNextUpdate(context);
    }

    @Override
    public void onDisabled(Context context) {
        super.onDisabled(context);
        cancelUpdate(context);
    }

    private void scheduleNextUpdate(Context context) {
        AlarmManager alarmMgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmMgr == null) return;
        Intent intent = new Intent(context, JamHijriWidget.class);
        intent.setAction(ACTION_UPDATE);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT)
            : PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent pi = PendingIntent.getBroadcast(context, 1001, intent, flags);
        long now = System.currentTimeMillis();
        long nextMinute = ((now / 60000) + 1) * 60000;
        try {
            alarmMgr.setExact(AlarmManager.RTC, nextMinute, pi);
        } catch (SecurityException e) {
            alarmMgr.set(AlarmManager.RTC, nextMinute, pi);
        }
    }

    private void cancelUpdate(Context context) {
        AlarmManager alarmMgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmMgr == null) return;
        Intent intent = new Intent(context, JamHijriWidget.class);
        intent.setAction(ACTION_UPDATE);
        int flags = Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
            ? (PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_NO_CREATE)
            : PendingIntent.FLAG_NO_CREATE;
        PendingIntent pi = PendingIntent.getBroadcast(context, 1001, intent, flags);
        if (pi != null) {
            alarmMgr.cancel(pi);
            pi.cancel();
        }
    }
}
