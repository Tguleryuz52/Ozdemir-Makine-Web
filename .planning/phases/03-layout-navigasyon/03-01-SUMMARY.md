# 03-01 SUMMARY — Header & Navigasyon

> Not: Bu faz GSD `execute-phase` dışında, referans-tabanlı elle geliştirmeyle kuruldu.
> SUMMARY, GSD state'ini gerçekle hizalamak için geriye dönük (backfill) yazıldı (2026-09-09).

## Ne yapıldı
- **Header** (`src/components/layout/header.tsx`) himon diline oturtuldu: beyaz zemin,
  sticky top, alt 1px ayraç, logo sol + nav + sağda "Teklif Al" pill.
- **Navigasyon:** `mainNav` (`src/content/site.ts`) — Kurumsal, Sıfır Makineler, İkinci El
  Makineler, Yedek Parçalar, İletişim. Galeri header'dan çıkarıldı (footer'a taşındı).
- **UnderlineLink** (`src/components/ui/underline-link.tsx`): soldan-sağa altı-çizili hover
  animasyonu (`::after` scaleX, ease-out-soft). Nav + footer ortak kullanıyor.
- **Teklif Al butonu:** `ArrowFillButton` (21st.dev arrow-fill), boyut-bağımsız CSS değişkenli
  refactor; header ölçeği ~48px, siyah pill → hover beyaz dolum + ok.
- **Mobil menü:** hamburger (lucide Menu/X) toggle, `useState`, `aria-expanded`/`aria-label`,
  `lg:hidden` breakpoint; açık panelde nav item'lar + Teklif Al.
- **Logo:** GEÇİCİ wordmark (siyah mark + "ÖZDEMİR MAKİNE"). Gerçek logo gelince `Wordmark()` değişecek.

## Kararlar / sapmalar
- Nav, logodan sonra sola yaslı (`ml-12`) — himon'da ortada; görsel olarak kabul edildi, sonraya not.
- Sepet/üye girişi header'da GİZLİ (v1 kararı), yapıda yer var.

## Doğrulama
- `npx tsc --noEmit` temiz · `npx eslint` (header) temiz.
- Playwright canlı denetim (1440 + 390 + mobil menü açık): himon dili, responsive, a11y ✓.
  Ekranlar: `.work/shots/faz3/`.
