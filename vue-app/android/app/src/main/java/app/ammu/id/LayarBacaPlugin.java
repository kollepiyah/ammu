package app.ammu.id;

import android.view.Window;
import android.view.WindowManager;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * v.1.5.5 (Kyai 25 Nov 2026) — mode baca layar penuh (blueprint Ammu publik §3.6 / §4.10).
 * Dipakai composables/useModeBaca.js untuk Kitab & Wirid (dan Al-Qur'an nanti):
 *   · masuk()  : status bar + navigasi sistem disembunyikan; muncul sementara bila tepi digeser.
 *   · keluar() : kembalikan keduanya.
 *   · tetapMenyala({ nyala }) : layar tak meredup selama membaca (FLAG_KEEP_SCREEN_ON).
 * Semua dijalankan di UI thread (jendela hanya boleh diubah di sana).
 */
@CapacitorPlugin(name = "LayarBaca")
public class LayarBacaPlugin extends Plugin {

    private WindowInsetsControllerCompat kendali(Window w) {
        return WindowCompat.getInsetsController(w, w.getDecorView());
    }

    @PluginMethod
    public void masuk(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            WindowInsetsControllerCompat k = kendali(getActivity().getWindow());
            k.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            k.hide(WindowInsetsCompat.Type.systemBars());
            call.resolve();
        });
    }

    @PluginMethod
    public void keluar(PluginCall call) {
        getActivity().runOnUiThread(() -> {
            kendali(getActivity().getWindow()).show(WindowInsetsCompat.Type.systemBars());
            call.resolve();
        });
    }

    @PluginMethod
    public void tetapMenyala(PluginCall call) {
        boolean nyala = Boolean.TRUE.equals(call.getBoolean("nyala", true));
        getActivity().runOnUiThread(() -> {
            Window w = getActivity().getWindow();
            if (nyala) w.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            else w.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
            call.resolve();
        });
    }
}
