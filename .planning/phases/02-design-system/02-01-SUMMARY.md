---
phase: 2
plan: 02-01
title: Design System — Token Kontratı & Uygulama
status: done
date: 2026-09-08
---

# Faz 2 · Plan 01 — SUMMARY

## Yapıldı
- **`design/design-system.md`** — ui-ux-pro-max üç katmanlı token kontratı (primitive→semantic→
  component): renk rolleri, tipografi ölçeği, spacing ritmi, radius, motion, pill buton spec.
- **`src/app/globals.css`** — uygulandı:
  - Marka renkleri: `--brand #234D9C`, `--brand-deep`, `--brand-bright`, `--ink`, `--paper`.
  - Tipografi ölçeği (`@theme --text-*`): display-xl/lg, heading, kicker — Geist boyut+tracking+lh+weight.
  - `--spacing-section`, `--radius-card`, `--ease-out-soft`, `--dur-*` motion.
  - `--ring` = marka mavisi (focus erişilebilir + on-brand).
- **`src/app/design-system/page.tsx`** — geçici token doğrulama sayfası (swatch, tipografi, buton, radius/motion).

## Doğrulama
- ✅ tsc temiz · eslint temiz · `npm run build` başarılı (3 route).
- ✅ Tüm token grupları render ediliyor (mavi paleti, Geist ölçeği, pill butonlar).
- ✅ Ham default Tailwind rengi / sihirli değer yok — hepsi token.

## Notlar / devir
- Shotgun tek yön (aksan + font kilitli). Görsel varyasyon hero/bölümde (Faz 3-4) denenecek.
- `/design-system` **geçici** — yayın öncesi kaldırılacak.
- Header taslağı bu tokenları kullanıyor; Faz 3'te resmî planla cilalanacak.
- **Bekleyen:** Talha yeni logoyu atacak → header wordmark yerine gerçek logo.
