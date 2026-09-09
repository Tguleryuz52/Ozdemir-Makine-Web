# 03-02 SUMMARY — Footer & Layout Shell

> Not: GSD `execute-phase` dışında elle geliştirildi; SUMMARY geriye dönük backfill (2026-09-09).

## Ne yapıldı
- **Footer** (`src/components/layout/footer.tsx`) himon deseni: koyu zemin (`bg-footer-bg`),
  üstte CTA (başlık + metin + ArrowFillButton, beyaz→mavi `#234d9c` dolum), altında 4 kolonlu grid.
  - **Site Haritası** (2 kolon geniş): `siteMapNav` — Kurumsal, Sıfır/İkinci El Makineler,
    Yedek Parçalar, İletişim, **Galeri** (header'dan buraya taşındı).
  - **İletişim:** E-posta / Telefon / Adres (TR) — `siteConfig`'ten.
  - **Sosyal:** `socialLinks` — Facebook, X, Instagram, YouTube, LinkedIn.
  - **Legal bar:** `footerContent.legal`, üstte 1px ayraç.
- İçerik tamamen `src/content/site.ts`'ten prop/config ile besleniyor (JSX'e gömülü metin yok).
- Kicker etiketleri Geist Mono, uppercase, muted gri (himon dili).
- **Layout shell** (`src/app/layout.tsx`): `<Header /> {children} <Footer />` — tüm sayfalar ortak.

## Kararlar / sapmalar
- Alttaki dev "ÖZDEMİR" ghost wordmark ŞİMDİLİK YOK — gerçek logo/marka gelince eklenecek.
- İletişim kolonunda E-posta/Telefon/Adres üçü ayrı kicker taşıyor (himon tek kolona göre
  biraz tekrarlı) — polish notu, sonraya.

## Doğrulama
- `npx tsc --noEmit` temiz · `npx eslint` (footer) temiz.
- Playwright canlı denetim (1440 + 390): CTA + kolon grid + legal, responsive tek-kolon çöküş ✓.
  Ekranlar: `.work/shots/faz3/`.

## Faz 3 kapanışı
Success Criteria karşılandı: (1) header+nav+mobil menü tüm kırılımlarda ✓, (2) footer içerik+link ✓,
(3) layout shell ortak, içerik prop/config ile ✓, (4) klavye/focus + aria ✓.
Kalan polish (nav ortalama, iletişim kolonu, ghost wordmark) → Faz 7 (Etkileşim & Cila) veya ara düzeltme.
