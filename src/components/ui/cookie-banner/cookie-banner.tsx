"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// KVKK + GDPR uyumlu çerez banner — 2 buton: 'Reddet' + 'Kabul Et'.
// Tercih localStorage'de saklanır ('accepted' | 'rejected'); tekrar sormaz.
// Kabul → analytics-consent event tetiklenir (GA4 script consent'i bekleyecek şekilde
// yüklenir; consent gelmezse GA gtag'a "denied" işaretiyle başlar).

const STORAGE_KEY = "ozd-cookie-consent";
type Consent = "accepted" | "rejected";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
      if (!stored) {
        // Sayfa yüklenmesinden 800ms sonra göster — hero animasyonuna müdahale etmesin.
        const t = setTimeout(() => setVisible(true), 800);
        return () => clearTimeout(t);
      } else if (stored === "accepted") {
        emitConsent("accepted");
      }
    } catch {
      /* localStorage yasak → sessizce atla */
    }
  }, []);

  const decide = React.useCallback((choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* noop */
    }
    setVisible(false);
    emitConsent(choice);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          role="dialog"
          aria-labelledby="cookie-title"
          aria-describedby="cookie-desc"
          className={cn(
            "fixed inset-x-4 bottom-4 z-[90] mx-auto max-w-md rounded-2xl border border-ink/10 bg-white/95 p-5 shadow-2xl shadow-ink/10 backdrop-blur-md",
            "lg:inset-x-auto lg:right-6 lg:bottom-6"
          )}
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15l-4-4 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p
                id="cookie-title"
                className="mb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand"
              >
                Çerezler
              </p>
              <h2 className="mb-1.5 text-[15px] font-medium leading-snug text-ink">
                Sitemizi daha iyi yapmamıza yardım eder misiniz?
              </h2>
              <p id="cookie-desc" className="mb-4 text-[13px] leading-relaxed text-ink/70">
                Ziyaretinizi ölçmek ve deneyiminizi geliştirmek için çerez kullanıyoruz.
                Detaylar için{" "}
                <Link href="/gizlilik" className="text-brand underline underline-offset-2">
                  Gizlilik Politikası
                </Link>
                .
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => decide("rejected")}
                  className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 text-[13px] font-medium text-ink transition-colors hover:bg-ink/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  Reddet
                </button>
                <button
                  type="button"
                  onClick={() => decide("accepted")}
                  className="flex-1 rounded-full bg-brand px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// GA4/gtag script'i consent'i dinleyecek. Consent gelmediği sürece "denied" ile çalışır,
// Kabul edilince "granted" güncellenir.
function emitConsent(choice: Consent) {
  if (typeof window === "undefined") return;
  type GTagFn = (...args: unknown[]) => void;
  const w = window as unknown as { gtag?: GTagFn };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    analytics_storage: choice === "accepted" ? "granted" : "denied",
    ad_storage: choice === "accepted" ? "granted" : "denied",
    ad_user_data: choice === "accepted" ? "granted" : "denied",
    ad_personalization: choice === "accepted" ? "granted" : "denied",
  });
}
