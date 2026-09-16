"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

// Kök seviye (render) hatalarını yakalar → Sentry'ye gönderir + kullanıcıya sade ekran.
// Sadece beklenmedik çökmelerde devreye girer.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="tr">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
          background: "#f2f0ec",
          color: "#0e0e0e",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 500 }}>Bir şeyler ters gitti</h1>
        <p style={{ color: "#0e0e0eaa", maxWidth: "28rem" }}>
          Beklenmedik bir hata oluştu. Lütfen sayfayı yenileyin; sorun sürerse bizimle iletişime geçin.
        </p>
        <button
          onClick={() => reset()}
          style={{
            marginTop: "0.5rem",
            padding: "0.65rem 1.5rem",
            borderRadius: "9999px",
            background: "#0a509e",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          Tekrar dene
        </button>
      </body>
    </html>
  );
}
