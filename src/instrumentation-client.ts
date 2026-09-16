import * as Sentry from "@sentry/nextjs";

// Tarayıcı (client) Sentry başlatma — JS hataları, yavaşlık ve (hata anında) session replay.
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    // Performans izleme (LCP/yavaş etkileşim). Kota/overhead için %20 örnekleme.
    tracesSampleRate: 0.2,
    // Session Replay — "kasma/donma" anını video gibi izlemek için.
    // Normal oturumların %10'u, HATA olan oturumların %100'ü kaydedilir.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
    ],
    sendDefaultPii: false,
    environment: process.env.NODE_ENV,
  });
}

// App Router sayfa geçişlerini izlemeye bağlar (navigasyon performansı).
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
