"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Kuş tüyü akışkan scroll — lerp tabanlı (responsive, lag yok). reduced-motion'da kapalı.
// Sayfa geçişinde Lenis'in hatırladığı konumu ANINDA tepeye resetler (yoksa yeni sayfa
// bir öncekinin scroll konumundan başlıyordu — App Router + Lenis klasik tuzağı).
export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Tarayıcının kendi scroll geri-yüklemesini kapat; konumu biz yönetiyoruz.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const lenis = new Lenis({
      lerp: 0.1, // düşük = daha yumuşak, yüksek = daha anlık. 0.1 = tatlı + responsive.
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Her rota değişiminde tepeden başla (Lenis varsa onun üstünden, yoksa native).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
