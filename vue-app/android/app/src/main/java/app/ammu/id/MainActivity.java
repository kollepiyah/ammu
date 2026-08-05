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

    batasiSkalaTeks();

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

  /** Batas atas skala teks. Di atas ini tata letak Ammu mulai pecah. */
  private static final int TEXT_ZOOM_MAKS = 115;

  /**
   * v.1.2.8 — Batasi skala teks WebView, bukan mengunci mati.
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
   * KENAPA DIBATASI, BUKAN DIKUNCI 100%: mengunci berarti membuang preferensi ukuran
   * font sistem sepenuhnya — dan yang menaikkannya sering justru orang yang MEMBUTUHKAN
   * teks besar (mata lelah, penglihatan menurun). Ammu jadi satu-satunya app yang tak
   * mau membesar di HP itu. Batas 115% menahan tata letak tetap utuh sambil tetap
   * memberi sebagian pembesaran yang diminta pengguna; di bawah 100% tak diutak-atik
   * sama sekali (pengguna yang mengecilkan font memang ingin muat lebih banyak).
   *
   * Ini tetap TIDAK menyentuh Ukuran Tampilan (density): itu preferensi seluruh
   * perangkat dan memang seharusnya dihormati apa adanya.
   *
   * Bukan refleksi (API langsung), jadi tak perlu keep-rule R8.
   */
  private void batasiSkalaTeks() {
    try {
      if (getBridge() == null || getBridge().getWebView() == null) return;
      WebSettings ws = getBridge().getWebView().getSettings();
      if (ws == null) return;
      // fontScale sistem: 1.0 = normal, 1.15-1.30 = "Besar"/"Sangat besar".
      float skala = getResources().getConfiguration().fontScale;
      int persen = Math.round(skala * 100f);
      if (persen > TEXT_ZOOM_MAKS) ws.setTextZoom(TEXT_ZOOM_MAKS);
    } catch (Exception e) {
      // Jangan sampai penyesuaian kosmetik menggagalkan start-up app.
    }
  }
}
