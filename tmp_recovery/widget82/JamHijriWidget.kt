package app.ammu.id.widgets

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.SystemClock
import android.widget.RemoteViews
import app.ammu.id.MainActivity
import app.ammu.id.R
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.chrono.HijrahDate
import java.time.format.DateTimeFormatter
import java.util.Date
import java.util.Locale

/**
 * v.75.0526 — Widget Android home screen: Jam digital + tanggal Masehi + tanggal Hijriyah.
 *
 * Update setiap menit via AlarmManager. Tap widget → buka app (MainActivity).
 *
 * Hijri calc pakai java.time.chrono.HijrahDate (Java 8+, Android API 26+).
 * Untuk API <26 fallback ke perkiraan offset.
 */
class JamHijriWidget : AppWidgetProvider() {

    companion object {
        private const val ACTION_UPDATE = "app.ammu.id.widgets.JAM_HIJRI_UPDATE"

        // Nama bulan Hijriyah dalam bahasa Indonesia
        private val NAMA_BULAN_HIJRI = arrayOf(
            "Muharram", "Safar", "Rabiul Awal", "Rabiul Akhir",
            "Jumadil Awal", "Jumadil Akhir", "Rajab", "Sya'ban",
            "Ramadhan", "Syawal", "Dzulqo'dah", "Dzulhijjah"
        )

        private val NAMA_HARI = arrayOf(
            "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"
        )

        private val NAMA_BULAN_MASEHI = arrayOf(
            "Januari", "Februari", "Maret", "April", "Mei", "Juni",
            "Juli", "Agustus", "September", "Oktober", "November", "Desember"
        )

        fun updateAllWidgets(context: Context) {
            val mgr = AppWidgetManager.getInstance(context)
            val ids = mgr.getAppWidgetIds(ComponentName(context, JamHijriWidget::class.java))
            for (id in ids) {
                updateWidget(context, mgr, id)
            }
        }

        private fun updateWidget(context: Context, manager: AppWidgetManager, widgetId: Int) {
            val views = RemoteViews(context.packageName, R.layout.widget_jam_hijri)

            // 1. Jam digital (HH:mm)
            val now = Date()
            val jamFormat = SimpleDateFormat("HH:mm", Locale("id"))
            views.setTextViewText(R.id.widget_jam, jamFormat.format(now))

            // 2. Tanggal Masehi: e.g. "Jumat, 29 Mei 2026"
            val cal = java.util.Calendar.getInstance()
            cal.time = now
            val hariIdx = cal.get(java.util.Calendar.DAY_OF_WEEK) - 1
            val tgl = cal.get(java.util.Calendar.DAY_OF_MONTH)
            val bulan = cal.get(java.util.Calendar.MONTH)
            val tahun = cal.get(java.util.Calendar.YEAR)
            val masehiStr = "${NAMA_HARI[hariIdx]}, $tgl ${NAMA_BULAN_MASEHI[bulan]} $tahun"
            views.setTextViewText(R.id.widget_tanggal_masehi, masehiStr)

            // 3. Tanggal Hijriyah
            val hijriStr = hitungHijri()
            views.setTextViewText(R.id.widget_tanggal_hijri, hijriStr)

            // 4. Tap widget → buka MainActivity
            val intent = Intent(context, MainActivity::class.java).apply {
                addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
            }
            val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
            } else {
                PendingIntent.FLAG_UPDATE_CURRENT
            }
            val pendingIntent = PendingIntent.getActivity(context, 0, intent, flags)
            views.setOnClickPendingIntent(R.id.widget_root, pendingIntent)

            manager.updateAppWidget(widgetId, views)
        }

        private fun hitungHijri(): String {
            return try {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    val hijri = HijrahDate.from(LocalDate.now())
                    val day = hijri.get(java.time.temporal.ChronoField.DAY_OF_MONTH)
                    val month = hijri.get(java.time.temporal.ChronoField.MONTH_OF_YEAR) - 1
                    val year = hijri.get(java.time.temporal.ChronoField.YEAR)
                    "$day ${NAMA_BULAN_HIJRI[month]} $year H"
                } else {
                    // Fallback: simple offset (kurang akurat ±1-2 hari)
                    // Selisih Masehi vs Hijri saat ini sekitar 622 tahun
                    val nowYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR)
                    val approxHijriYear = ((nowYear - 622) * 33 / 32) + 1
                    "(Approx) $approxHijriYear H"
                }
            } catch (e: Exception) {
                "—"
            }
        }
    }

    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        for (id in appWidgetIds) {
            updateWidget(context, appWidgetManager, id)
        }
        // Jadwalkan update tiap menit
        scheduleNextUpdate(context)
    }

    override fun onReceive(context: Context, intent: Intent) {
        super.onReceive(context, intent)
        if (intent.action == ACTION_UPDATE) {
            updateAllWidgets(context)
            scheduleNextUpdate(context)
        }
    }

    override fun onEnabled(context: Context) {
        super.onEnabled(context)
        scheduleNextUpdate(context)
    }

    override fun onDisabled(context: Context) {
        super.onDisabled(context)
        cancelUpdate(context)
    }

    private fun scheduleNextUpdate(context: Context) {
        val alarmMgr = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, JamHijriWidget::class.java).apply {
            action = ACTION_UPDATE
        }
        val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        } else {
            PendingIntent.FLAG_UPDATE_CURRENT
        }
        val pi = PendingIntent.getBroadcast(context, 1001, intent, flags)
        // Update di awal menit berikutnya
        val now = System.currentTimeMillis()
        val nextMinute = ((now / 60000) + 1) * 60000
        try {
            alarmMgr.setExact(AlarmManager.RTC, nextMinute, pi)
        } catch (e: SecurityException) {
            // API 31+ butuh USE_EXACT_ALARM permission — fallback ke set()
            alarmMgr.set(AlarmManager.RTC, nextMinute, pi)
        }
    }

    private fun cancelUpdate(context: Context) {
        val alarmMgr = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
        val intent = Intent(context, JamHijriWidget::class.java).apply {
            action = ACTION_UPDATE
        }
        val flags = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_NO_CREATE
        } else {
            PendingIntent.FLAG_NO_CREATE
        }
        val pi = PendingIntent.getBroadcast(context, 1001, intent, flags)
        if (pi != null) {
            alarmMgr.cancel(pi)
            pi.cancel()
        }
    }
}
