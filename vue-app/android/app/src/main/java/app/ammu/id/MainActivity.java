package app.ammu.id;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.animation.ObjectAnimator;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.view.View;
import android.view.animation.AccelerateInterpolator;

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
}
