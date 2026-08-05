package app.ammu.id;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.animation.AccelerateInterpolator;
import android.webkit.WebSettings;

import androidx.core.splashscreen.SplashScreen;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  // v.91.0626 IN-APP ANIM (final): splash sistem = LATAR mint SINGKAT (tanpa logo). Tahan ~450ms
  //   lalu fade-out; logo (animasi Netflix 2 detik) + footer muncul beranimasi di DALAM app.
  private boolean keepSplash = true;

  @Override
  public void onCreate(Bundle savedInstanceState) {
    // Android SplashScreen API — WAJIB install SEBELUM super.onCreate()
    SplashScreen splashScreen = SplashScreen.installSplashScreen(this);
    // v.94.0626: daftarkan plugin bridge widget (push data Hijri + agenda ke widget home screen)
    registerPlugin(WidgetBridgePlugin.class);
    super.onCreate(savedInstanceState);

    kunciSkalaTeks();

    splashScreen.setKeepOnScreenCondition(() -> keepSplash);
    new Handler(Looper.getMainLooper()).postDelayed(() -> keepSplash = false, 450L);

    // Fade-out halus splash -> MainActivity
    splashScreen.setOnExitAnimationListener(provider -> {
      final View splashView = provider.getView();
      ObjectAnimator fade = ObjectAnimator.ofFloat(splashView, View.ALPHA, 1f, 0f);
      fade.setInterpolator(new AccelerateInterpolator());
      fade.setDuration(500L);
      fade.addListener(new AnimatorListenerAdapter() {
        @Override
        public void onAnimationEnd(Animator animation) {
          provider.remove();
        }
      });
      fade.start();
    });
  }

  /**
   * v.1.2.8 — Kunci skala teks WebView ke 100%.
   *
   * GEJALA (Kyai, 5 Agu 2026): "di beberapa HP low end ... tampilannya seperti terlalu
   * zoom". HP itu memang disetel Ukuran Font besar — lazim di HP low-end supaya layar
   * kecil lebih terbaca.
   *
   * SEBAB: Android WebView menurunkan fontScale sistem ke halaman lewat textZoom, jadi
   * "Ukuran Font: Besar" (fontScale 1.15-1.30) memperbesar SETIAP teks di dalam app.
   * Karena tata letak Ammu berbasis teks (kartu, tabel, pita), pembesaran itu ikut
   * mendorong tinggi baris & memaksa pembungkusan — hasilnya terbaca sebagai "ke-zoom",
   * bukan sebagai "font lebih besar".
   *
   * Ini SENGAJA hanya menetralkan skala font sistem, bukan Ukuran Tampilan (density):
   * yang kedua memang seharusnya dihormati — itu preferensi seluruh perangkat, dan
   * melawannya berarti membuat app satu-satunya yang kecil di HP tsb.
   *
   * Bukan refleksi (API langsung), jadi tak perlu keep-rule R8.
   */
  private void kunciSkalaTeks() {
    try {
      if (getBridge() == null || getBridge().getWebView() == null) return;
      WebSettings ws = getBridge().getWebView().getSettings();
      if (ws != null) ws.setTextZoom(100);
    } catch (Exception e) {
      // Jangan sampai penyesuaian kosmetik menggagalkan start-up app.
    }
  }
}
