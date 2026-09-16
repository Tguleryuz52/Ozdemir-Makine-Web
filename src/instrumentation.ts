import * as Sentry from "@sentry/nextjs";

// Sunucu + edge runtime Sentry başlatma. Next.js bu register()'ı otomatik çağırır.
// Client tarafı ayrı: src/instrumentation-client.ts.
export async function register() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return; // DSN yoksa Sentry sessizce devre dışı

  if (process.env.NEXT_RUNTIME === "nodejs") {
    Sentry.init({
      dsn,
      // İzleme (yavaş istek/işlem tespiti). Kota/overhead için %20 örnekleme.
      tracesSampleRate: 0.2,
      // PII gönderme (KVKK). IP/kullanıcı verisi Sentry'ye gitmesin.
      sendDefaultPii: false,
      environment: process.env.NODE_ENV,
    });
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    Sentry.init({
      dsn,
      tracesSampleRate: 0.2,
      sendDefaultPii: false,
      environment: process.env.NODE_ENV,
    });
  }
}

// Server bileşen / route hatalarını Sentry'ye iletir (Next 15+ hook).
export const onRequestError = Sentry.captureRequestError;
