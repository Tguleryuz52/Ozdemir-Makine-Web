# ARCHITECTURE.md — Mimari kararlar

## Katmanlar
```
src/app/          route + layout + metadata. İş mantığı BURAYA yazılmaz.
src/components/
  ui/             tekil, aptal, yeniden kullanılabilir (shadcn tabanlı)
  layout/         header, footer, nav, container
  sections/       sayfa bölümleri (hero, ürün grid, referanslar, CTA)
src/content/      metin ve veri. Sabit içerik JSX içine gömülmez.
src/lib/          yardımcılar, saf fonksiyonlar
src/hooks/        React hook'ları
src/types/        paylaşılan tipler
design/           design-system.md + referans siteler
```

## Kurallar
- **İçerik koddan ayrı.** Metin, ürün listesi, referanslar `src/content` içinde durur.
  Sebep: çok dillilik ve içerik güncellemesi kodu değiştirmeden yapılabilsin.
- **Bölüm bileşeni sayfaya bağlı değildir.** `sections/` içindeki her bileşen
  prop ile beslenir, kendi verisini kendi çekmez.
- **Sunucu bileşeni varsayılan.** `"use client"` sadece etkileşim gerektiğinde.
- **Import alias `@/*`.** Göreli yol zinciri (`../../..`) yazma.
- **Token dışı değer yok.** Renk, boşluk, radius doğrudan yazılmaz, token'dan gelir.

## Sayfa şekli
Her sayfa: `layout` içinde metadata → `sections/` bileşenlerinin dizilimi.
Sayfa dosyası ince kalır, mantık bölüm bileşenlerinde durur.
