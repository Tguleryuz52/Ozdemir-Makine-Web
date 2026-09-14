"use client";

import * as React from "react";

// UTM yakalayıcı — sayfa açıldığında ?utm_source=... vb. paramları görünce localStorage'e yazar,
// ilk gördüğü set'i korur (attribution için son değil ilk tıklama daha doğru).
// Form gönderiminde `kampanya` gizli alanı bunu okur → CRM lead'e taşır.

const KEY = "ozd-utm";
const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function UtmCapture() {
  React.useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) return; // ilk tıklama korunur
      const sp = new URLSearchParams(window.location.search);
      const found: Record<string, string> = {};
      for (const k of KEYS) {
        const v = sp.get(k);
        if (v) found[k] = v;
      }
      if (Object.keys(found).length > 0) {
        localStorage.setItem(KEY, JSON.stringify(found));
      }
    } catch {
      /* localStorage yasak → sessizce atla */
    }
  }, []);
  return null;
}

export function readStoredUtm(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return "";
    const obj = JSON.parse(raw) as Record<string, string>;
    return Object.entries(obj)
      .map(([k, v]) => `${k}=${v}`)
      .join(" · ");
  } catch {
    return "";
  }
}
