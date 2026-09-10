---
name: reference-parity
description: Build UI from a reference screenshot and verify it in a real browser until it matches. Use whenever a reference image (himon ekranı, canlı site, Talha'nın attığı görsel) is the source of truth for a section, whenever a page or component is created or changed and needs visual verification, or when the user says "birebir olsun", "referansa benzet", "ekran görüntüsü al", "bak nasıl olmuş". Covers the section-at-a-time extraction method and the Playwright screenshot → compare → fix loop.
---

# Reference Parity — referanstan koda, tarayıcıda doğrula

İki iş bir arada:
1. **Çıkarım** — referans görselden koda (screenshot-to-code'un işi, ama proje kurallarıyla).
2. **Doğrulama** — yazdığın kodu tarayıcıda aç, gör, bozuksa Talha'ya söylemeden önce düzelt.

**Demir kural: kodu yazıp "çalışıyordur" varsayma. Aç, bak, karşılaştır, düzelt.**

---

## Bölüm A — Referanstan çıkarım

### A0. Referansı seç
Kaynaklar bu projede sabit:
- `design/references/himon/` — himon.framer.website ekranları (**tasarım dili kaynağı**)
- `design/references/himon-analysis.md` — çıkarılmış 5 bölüm kalıbı
- `design/references/canli-site/` — mevcut ozdemirmakine.com.tr (**içerik kaynağı**)
- Talha'nın sohbete attığı görseller

### A1. TEK BÖLÜM — tüm sayfa asla
> Tüm sayfayı verirsen model ortalama alır ve **hiçbir bölüm doğru çıkmaz.**

Bir seferde bir bölüm: sadece footer, sadece hero, sadece kart ızgarası.
Gerekirse referans görselini kırp. Bölüm bitmeden sonrakine geçme.

### A2. Görseli oku, tarif et — koda geçmeden önce
Referans PNG'yi `Read` ile aç ve **yazılı olarak** çıkar:

- **Izgara:** kaç kolon, hizalama ekseni, kenar boşluğu, maks genişlik
- **Dikey ritim:** bölüm üstü/altı boşluk, blok arası boşluk, satır aralığı
- **Tipografi:** her metin katmanının rolü (kicker / başlık / gövde / etiket), boyut oranı, ağırlık, tracking, büyük-küçük harf
- **Renk:** zemin, mürekkep, ayraç, aksan — kaç ton var
- **Şekil:** köşe yarıçapı, kenarlık kalınlığı, gölge var mı
- **Hareket:** ne giriyor, nereden, ne zaman (scroll-reveal / sticky-pin / sayaç / parallax)

Bu çıkarım bir cümlelik özet değil, **listedir.** Yazmadan koda başlama.

### A2a. ⭐ ÖLÇ, TAHMİN ETME — canlı referanstan computed style çek
> **Bu projenin en değerli tekniği.** 2026-09-08'de keşfedildi, footer'da kanıtlandı.
> Ekran görüntüsüne bakıp "bu boşluk 24 olmalı" demek tahmindir ve revize turu doğurur.
> Referans **canlıda** duruyorsa tarayıcıya sor, tarayıcı sana kesin cevabı verir.

Referans canlı bir siteyse (himon.framer.website gibi) A2'yi gözle değil **ölçerek** yap:

1. `browser_resize` → `1440x900`
2. `browser_navigate` → referans URL
3. `browser_evaluate` → ilgili bölümü seç, `getComputedStyle` ile değerleri çek

Çekilecek minimum set:
- **Metin katmanları:** `fontFamily`, `fontSize`, `fontWeight`, `letterSpacing`, `lineHeight`, `textTransform`, `color`
- **Kaplar:** `backgroundColor`, `padding*`, `borderRadius`, `display`, `gap`, `justifyContent`, `alignItems`
- **Ölçüler:** `getBoundingClientRect()` ile genişlik, konum, kolon dağılımı

Sonuç `design/references/<referans>-<bolum>-measured.md` dosyasına yazılır.
Örnek çıktı: `design/references/himon-footer-measured.md`.

**Neden bu kadar önemli:** himon'un tracking'inin em cinsinden sabit `-0.02em` (gövde) ve
`-0.05em` (display) olduğunu, line-height'ın sadece iki değer kullandığını (`1.1` display, `1.5` geri kalan)
ekran görüntüsünden asla bu kesinlikte çıkaramazsın. Ölçünce tek turda oturur.

**Ölçüm de karardır, kod değildir.** CLAUDE.md'nin "kod alınmaz" kuralını ihlal etmez.
Çekilen her değer yine A3'te token'a çevrilir, ham yazılmaz.

Ölçülemeyenler (animasyon süresi, easing, hover, mobil kırılım) için hâlâ gözlem + `browser_hover` gerekir.

**⚡ TOKEN KURALI (zorunlu):** `browser_evaluate` sonuçları context'i şişirir.
- Sonucu `filename` parametresiyle `.work/`'e yaz, ham JSON'u context'e dökme; sadece gereken 3-5 değeri döndür.
- Diziyi `.slice(0, N)` ile kısalt (himon nav 12 değil 3 örnek yeter).
- Fonksiyonu kısa tut — her evaluate fonksiyon kodunu bir de "Ran Playwright code" olarak tekrar yazdırır.
- `browser_snapshot` çağırma (55KB YAML); ölçüm için `browser_evaluate` + hedefli seçici yeter.

### A2b. (Opsiyonel) Ölçü çıkarma aracı — screenshot-to-code
Gözle çıkarım yeterli gelmezse (`bu boşluk 24 mü 32 mi`, `grid 3 kolon mu 4 mü`):
`C:/Software Dev/tools/screenshot-to-code` kurulu. Kullanım `BASLA.md`'de.
Backend `127.0.0.1:7001`, frontend `localhost:5173`, `backend/.env`'e API anahtarı gerekir.

⚠️ **A2a varken buna nadiren ihtiyaç olur.** Canlı referans yoksa (Talha'nın attığı düz PNG,
kapalı bir site) devreye girer. Canlı referans varsa A2a her zaman daha isabetlidir.

**Sadece ölçü için.** Çıktısı Tailwind CDN'li ham hex HTML — bu projeye ASLA kopyalanmaz.
Ondan alınan: kolon sayısı, boşluk px'leri, font-size oranları, hizalama ekseni.
Alınan her sayı A3'te token'a çevrilir.

### A3. Karar al, kod alma
> **himon'dan dil alınır, kod alınmaz.** (CLAUDE.md kilitli kuralı.)

Referanstan çıkan her ölçü **token'a çevrilir**, ham değer olarak yazılmaz:
- Ölçtüğün `24px` boşluk → `design/design-system.md`'deki en yakın spacing token'ı
- Gördüğün lime aksan → **Özdemir mavisi `#234D9C`** token'ı
- Ölçtüğün easing → design-system'deki motion token'ı (`linear` yasak)

Referansta olup token sisteminde karşılığı olmayan bir şey varsa: **önce token'ı ekle**, sonra kullan.

### A4. İçerik eşlemesi
himon'un slotlarına **gerçek Özdemir bilgisi** oturur — lorem yok, himon'un metni yok.
Kaynak: `src/content/site.ts` ve `.planning/CONTENT-INVENTORY.md`.
Metin JSX'e gömülmez, `src/content/`'ten prop ile gelir.

---

## Bölüm B — Tarayıcıda doğrulama (her UI değişikliğinden sonra ZORUNLU)

Playwright MCP kurulu (`mcp__plugin_playwright_playwright__*`). Dev sunucu: `npm run dev` → `localhost:3000`.

### Döngü
1. **Önce** — değişiklikten önceki hâlin ekran görüntüsünü al (yoksa atla, ilk yapımsa).
2. **Değiştir** — kodu yaz.
3. **Aç** — `browser_navigate` ile ilgili sayfaya git.
4. **Ölç** — `browser_resize` ile en az iki genişlik: `1440x900` (masaüstü) ve `390x844` (mobil).
5. **Çek** — `browser_take_screenshot`. Bölüm işi ise `element` parametresiyle sadece o bölümü çek.
6. **BAK** — görüntüyü `Read` ile aç ve gerçekten incele. Çekip geçme.
7. **Karşılaştır** — referans görsel ile yan yana koy. Fark listesi çıkar.
8. **Düzelt** — bulduğun bozuklukları **Talha'ya söylemeden önce** düzelt. 3-6. adımları tekrarla.
9. **Konsol** — `browser_console_messages` ile hata/uyarı var mı bak.
10. **Sun** — Talha'ya **öncesi ve sonrası** görüntüsünü ver, kalan bilinen farkları yaz.

### Ekran görüntüsünde ne aranır
- Taşma, kırpılma, yatay scrollbar
- Yanlış hizalama, bozuk dikey ritim
- Kırılmış metin sarması, dul satır, kırpılmış buton etiketi
- Yüklenmemiş görsel, kırık ikon, yanlış font (fallback'e düşme)
- Kontrast kaybı, görünmez odak halkası
- Mobilde çakışan/üst üste binen öğeler

### Hover ve etkileşim
Buton/link işlerinde `browser_hover` ile hover hâlini de çek. Odak hâli için `browser_press_key` → `Tab`.

### Ekran görüntülerinin yeri
Geçici karşılaştırma görselleri **`.work/shots/`** altına yazılır (git dışı), repo köküne ASLA.
Dosya adı: `<bolum>-<varyant>-<viewport>.png` → `footer-v1-1440.png`, `footer-v1-390.png`.
Repoya sadece Talha'ya kalıcı referans olacaklar girer (`design/references/` altına, isimlendirilmiş).

---

## Bölüm C — Kapılar

Bu skill iş **bitirmez**, sadece görsel eşleme yapar. Sıra:

| Sıra | Kapı | Ne yapar |
|---|---|---|
| 1 | `design-taste` | Zevk kapısı — brief oku, dial'ları kur, slop avla |
| 2 | **`reference-parity`** (bu) | himon'a birebir oturt, tarayıcıda doğrula |
| 3 | `web-interface-guidelines` | Doğruluk kapısı — erişilebilirlik, klavye, form, performans |
| 4 | `.planning/DEFINITION-OF-DONE.md` | Proje kapısı — lint, build, STATE.md |

Doğrulama komutları (autocheck hook bozuk, elle çalıştır):
`npx tsc --noEmit` ve `npx eslint <dosya>`
