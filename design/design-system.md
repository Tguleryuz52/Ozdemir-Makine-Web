# Özdemir Makine — Design System (Token Kontratı)

> Yöntem: **ui-ux-pro-max** üç katmanlı token mimarisi (primitive → semantic → component).
> Referans dil: himon.framer.website (`design/references/himon-analysis.md`).
> Uygulama: `src/app/globals.css` (`@theme`) + Tailwind v4. **Ham hex/sihirli değer yasak** — hep token.

## 1. Primitive (ham değerler)

### Renk — Marka mavisi (Özdemir, canlı siteden)
| Token | Değer | Not |
|---|---|---|
| `--brand` | `#234D9C` | ana kurumsal mavi (aksan) |
| `--brand-deep` | `#164295` | hover/koyu varyant |
| `--brand-bright` | `#0E92DD` | parlak vurgu (link, ikincil) |

### Renk — Nötr (himon iskeleti, hafif sıcak)
| Token | Değer | Not |
|---|---|---|
| `--ink` | `#0E0E0E` | koyu zemin / ana metin |
| `--paper` | `#F2F0EC` | sıcak off-white zemin |
| `--white` | `#FFFFFF` | kart / foto üstü |
| gri kademe | oklch nötr (shadcn) | muted/border/ring |

## 2. Semantic (rol / amaç)
| Rol | Kaynak | Kullanım |
|---|---|---|
| `background` | white | sayfa zemini |
| `foreground` (ink) | `--ink` | ana metin |
| `paper` | `--paper` | açık bölüm zemini (header, section) |
| `ink-muted` | ink %60 | ikincil metin |
| `brand` | `--brand` | aksan CTA, link, vurgu |
| `brand-hover` | `--brand-deep` | hover |
| `ground-dark` | `--ink` | koyu bölüm zemini (footer, süreç) |
| `on-dark` | `--paper`/white | koyu zemin üstü metin |
| `border` | ink %10 | ince ayraç |
| `ring` | `--brand` | focus halkası (erişilebilir) |

**Light/Dark:** site açık zeminli; koyu **bölümler** (footer, süreç timeline) `ground-dark` ile
kurulur (global dark-mode değil, bölüm bazlı). Global `.dark` shadcn tokenları korunur.

## 3. Tipografi (Geist — himon ölçüleri)
Font: **Geist** (display+body), **Geist Mono** (kicker). Ağırlık: display **500**, body **400**.

| Rol | Boyut (clamp) | Ağırlık | Tracking | Line-height | Not |
|---|---|---|---|---|---|
| `display-xl` (hero) | `clamp(2.75rem, 6vw, 4.5rem)` | 500 | -0.04em | 1.0 | UPPERCASE opsiyonlu |
| `display-lg` (h2) | `clamp(2rem, 4vw, 3.25rem)` | 500 | -0.03em | 1.08 | sentence-case |
| `heading` (h3/kart) | `clamp(1.5rem, 2.5vw, 2rem)` | 500 | -0.02em | 1.2 | |
| `kicker` | `0.8125rem` (13px) | 500 | 0.08em | 1.2 | **Geist Mono**, UPPERCASE |
| `body-lg` | `1.125rem` | 400 | 0 | 1.6 | intro paragraf |
| `body` | `1rem` | 400 | 0 | 1.6 | gövde |
| `body-sm` | `0.875rem` | 400 | 0 | 1.5 | nav, meta |

## 4. Spacing & ritim
| Token | Değer | Kullanım |
|---|---|---|
| `--container` | `80rem` (max-w-7xl) | içerik genişliği |
| `--gutter` | `1.25rem` / `2rem` (lg) | yatay padding |
| `--section-y` | `clamp(4rem, 8vw, 7rem)` | bölüm dikey ritmi |
| spacing skalası | Tailwind 4pt tabanı | 2/3/4/6/8/12/16/24 |

## 5. Radius
| Token | Değer | Kullanım |
|---|---|---|
| `--radius` | `1.25rem` (20px) | kart/görsel |
| `--radius-sm` | 8px | küçük öğe |
| pill | `9999px` | buton/etiket (himon full pill) |

## 6. Motion
| Token | Değer | Kullanım |
|---|---|---|
| `--ease-out-soft` | `cubic-bezier(0.22, 1, 0.36, 1)` | reveal/geçiş (linear YASAK) |
| `--dur-fast` | `200ms` | hover |
| `--dur-base` | `400ms` | reveal |
| `--dur-slow` | `700ms` | hero/parallax |
- Framer Motion: `whileInView` (opacity/translateY reveal), `useScroll`/`useTransform` (sticky-pin,
  parallax), animasyonlu sayaç, `whileHover`. `prefers-reduced-motion` desteği zorunlu.

## 7. Component spec — Pill Buton (himon CTA)
| Özellik | Default | Hover | Focus | Disabled |
|---|---|---|---|---|
| Zemin (accent) | `brand` | `brand-hover` | `brand` | ink %20 |
| Metin | white | white | white | white %60 |
| Radius | pill | pill | pill | pill |
| Ok ikonu kutusu | white %15 | +translate-x | — | — |
| Ring | — | — | 2px `ring` | — |

**Varyantlar:** `accent` (mavi, ana CTA) · `dark` (ink pill, ikincil) · `ghost` (çerçevesiz).

## Uygulama notları
- shadcn `--primary` = ink (koyu pill), `--brand` = mavi aksan — ikisi ayrı (himon deseni: koyu pill + tek aksan).
- `--ring` marka mavisine bağlı → focus görünür + on-brand.
- Doğrulama: `/design-system` sayfası tüm token gruplarını render eder.

---

# Tasarım İş Akışı — 4 kapı (2026-09-08'de kilitlendi)

> Bu sıra **atlanmaz.** Her UI işi (yeni bölüm, yeni sayfa, "şurayı şöyle yap") bu dört kapıdan geçer.
> Kapı 1-3 skill, kapı 4 dosya. Hepsi `.claude/skills/` altında, repoda, ekip görsün diye.

| # | Kapı | Skill / dosya | Sorusu | Ne zaman |
|---|---|---|---|---|
| 1 | **Zevk** | `design-taste` | "Bu slop mu? Bir görüşü var mı?" | Kod yazmadan ÖNCE |
| 2 | **Referans** | `reference-parity` | "himon'a birebir oturuyor mu? Tarayıcıda gerçekten öyle mi?" | Yazarken + hemen sonra |
| 3 | **Doğruluk** | `web-interface-guidelines` | "Klavye, odak, kontrast, form, performans tamam mı?" | "Bitti" demeden önce |
| 4 | **Proje** | `.planning/DEFINITION-OF-DONE.md` | "Lint/build temiz mi? STATE.md güncel mi?" | Teslim anında |

`ui-ux-pro-max` bunların yerine geçmez — **token mimarisi** (bu dosyanın üç katmanı),
palet ve font eşleştirmesi hâlâ ondan gelir. Yeni token gerektiğinde ona başvurulur.

## Kapı 1 — `design-taste` (zevk)
Kod yazmadan önce üç şey üretilir ve **yazılı olarak söylenir**:

1. **Design Read** — tek cümle: *"Bunu şu tür sayfa / şu kitle / şu dil / şu estetik aile olarak okuyorum."*
2. **Üç dial** (1-10), bu proje için varsayılanlar:
   - `DESIGN_VARIANCE` **4** — himon simetrik-ağırlıklı, ölçülü asimetri. Kurumsal B2B, sirk değil.
   - `MOTION_INTENSITY` **5** — scroll-reveal + sticky-pin var, sinematik yok.
   - `VISUAL_DENSITY` **3** — himon havadar. Cömert boşluk, sıkışık ızgara yok.
   Bir bölüm bu değerlerden sapacaksa **gerekçesi yazılır.**
3. **Demir kural: ilk versiyon asla teslim edilmez.** `Oku → Kur → Taze gözle eleştir → Rafine et → Pre-flight → Teslim`.
   Eleştiri adımını atlamak bu projedeki 1 numaralı hata modudur.

Derinlik gerektiğinde skill'in referans dosyaları okunur:
`reference/anti-slop.md` (AI parmak izleri) · `reference/motion.md` (easing, giriş) ·
`reference/interaction-states.md` (8 durum) · `reference/design-systems.md` (dial'lar) ·
`reference/pre-flight.md` (teslim öncesi matris).

**Çatışma kuralı:** `design-taste` genel bir zevk skill'i, bu proje ise **kilitli.**
Çatıştığında **proje kazanır.** Bu dosyadaki token'lar, Özdemir mavisi `#234D9C`,
Geist font çifti ve himon referansı tartışmaya kapalı. Skill'in "şu rengi/fontu tercih etme"
türü genel tavsiyeleri kilitli kararları **ezemez.**

## Kapı 2 — `reference-parity` (referans + tarayıcı)
- **Tek bölüm.** Tüm sayfayı referans alma; model ortalama alır, hiçbiri tutmaz.
- Referans PNG önce **yazılı çıkarılır** (ızgara, dikey ritim, tipografi rolleri, renk, şekil, hareket), sonra kod.
- Ölçülen her değer **token'a çevrilir**. Ham px/hex yazılmaz. Karşılığı yoksa önce token eklenir.
- himon'un lime'ı → **Özdemir mavisi**. himon'un metni → **gerçek Özdemir içeriği** (`src/content/`).
- **Her UI değişikliğinden sonra tarayıcı döngüsü:** aç → 1440x900 ve 390x844'te çek → görüntüye
  gerçekten bak → referansla karşılaştır → bozuksa **söylemeden önce düzelt** → konsolu kontrol et →
  öncesi/sonrası sun. Geçici görseller scratchpad'e, repoya değil.

## Kapı 3 — `web-interface-guidelines` (doğruluk)
Vercel'in arayüz kuralları. Çıktı **üç sütunlu tablo**: sorun / neden sorun / düzeltilmiş hâli.
**Düzeltmeler onay alınmadan uygulanmaz.** Dolgu madde yazılmaz, sadece gerçek ihlaller.
Bu projede en çok ısıracak yerler: focus ring görünürlüğü, ikon-only buton `aria-label`'ları,
`transition: all` kullanımı, teklif formu davranışı, `next/image` CLS, tr-TR sayı/birim biçimi.

## Yasaklar — bu akıştan çıkan
- ❌ Referans okumadan "kafadan" bölüm yazmak
- ❌ Tüm sayfayı tek seferde referanstan çıkarmaya çalışmak
- ❌ Tarayıcıda görmeden "oldu" demek
- ❌ İlk versiyonu teslim etmek (eleştiri adımını atlamak)
- ❌ Ölçülen değeri token'a çevirmeden ham yazmak
- ❌ Skill tavsiyesi diye kilitli karara (mavi, Geist, himon) dokunmak
