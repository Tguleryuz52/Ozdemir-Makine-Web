# himon Footer — ÖLÇÜLEN değerler (tahmin değil)

> Kaynak: `https://himon.framer.website/` canlı sitesi, Playwright `getComputedStyle` ile çekildi.
> Tarih: 2026-09-08. Viewport: 1440x900 (gerçek içerik genişliği 1425px, scrollbar düşülmüş).
> **Yöntem: ölçüm.** Ekran görüntüsünden göz kararı değil, tarayıcının hesapladığı gerçek değerler.
> Kural gereği **kod alınmadı, ölçü alındı.** Bu değerler token'a çevrilir, ham yazılmaz.

## Yapı — dikey 4 blok
Footer tek satır değil, üst üste dört blok:
1. **CTA bloğu** — büyük başlık + alt metin + pill buton
2. Boşluk / ayraç
3. **Link kolonları satırı** — SITEMAP · EMAIL & SUPPORT · PHONE · ADDRESS · SOCIAL
4. **Legal bar** — "All right reserved"

Kapsayıcı: içerik genişliği **1345px**, yanal boşluk **40px** (1425px viewport'ta).
Kolon içi dikey `gap`: **32px**. Kolonlar arası yatay `gap`: **150px**.

## Renk
| Rol | Ölçülen | Hex |
|---|---|---|
| Footer zemin | `rgb(28, 28, 28)` | **`#1C1C1C`** |
| Ana metin / link | `rgb(255, 255, 255)` | `#FFFFFF` |
| Kicker etiket (mono) | `rgb(189, 189, 194)` | **`#BDBDC2`** |
| Buton metni (beyaz pill üstünde) | `rgb(28, 28, 28)` | `#1C1C1C` |

⚠️ himon'un footer zemini **`#1C1C1C`**, bizim `design-system.md`'deki near-black `#0E0E0E` değil.
Karar gerekiyor: himon'un tonuna mı gideceğiz, kendi ink'imizde mi kalacağız.

## Tipografi — hepsi ölçüldü
| Rol | Font | Size | Weight | Letter-spacing | Line-height | Transform |
|---|---|---|---|---|---|---|
| CTA başlık | Geist | **64px** | 500 | **-3.2px** (= -0.05em) | 70.4px (**1.1**) | none |
| CTA alt metin | Geist | 18px | **400** | -0.36px (= -0.02em) | 27px (**1.5**) | none |
| Pill buton metni | Geist | 16px | 500 | -0.32px (= -0.02em) | 24px (1.5) | none |
| **Kicker etiket** | **Geist Mono** | **14px** | 500 | normal | 21px (**1.5**) | **uppercase** |
| Link / gövde | Geist | 16px | 500 | -0.32px (= -0.02em) | 24px (1.5) | none |

**Çıkan kural:** himon'un tracking'i em cinsinden sabit **-0.02em** (gövde/link/buton) ve
display'de **-0.05em**. Geist Mono kicker'da tracking **normal** — sıkılaştırılmıyor.
Line-height iki değer: display **1.1**, geri kalan her şey **1.5**.

## Özdemir'e uyarlama — eşleme tablosu
| himon slotu | Özdemir karşılığı | Kaynak |
|---|---|---|
| "Ready to accelerate your supply chain" | Teklif/iletişime yönlendiren CTA başlığı | yazılacak |
| "Join hundreds of global enterprises" | Güven cümlesi (yıl, ihracat, referans) | canlı site |
| "Request a Consultation" pill | **"Teklif Al"** (mevcut arrow-fill-button) | `src/components/arrow-fill-button.tsx` |
| SITEMAP kolonu | Site haritası + **Galeri** (header'dan buraya taşındı) | `src/content/site.ts` |
| EMAIL & SUPPORT | e-posta | `site.ts` |
| PHONE | telefon | `site.ts` |
| ADDRESS | **TR + DE iki adres** (himon'da tek) | `site.ts` |
| SOCIAL | 5 sosyal link | `site.ts` |
| — | **Dev ghost "ÖZDEMİR" wordmark** (himon'da da var) | analiz |
| Legal bar | telif + yasal linkler | `site.ts` |

## Ölçülmeyenler — hâlâ karar/gözlem gerekli
- Bloklar arası dikey boşluk (footer yüksekliği tek elemanda toplandı, ayrıştırılmadı)
- Ghost wordmark'ın boyutu, opaklığı, kırpılma biçimi
- Scroll-reveal animasyonunun süresi ve easing'i
- Hover durumları (link altı çizgi, buton dolumu)
- Mobil (390px) kırılımında kolonların nasıl yığıldığı

Bunlar footer yapımı sırasında aynı yöntemle (canlı siteden ölçüm) çekilecek.
