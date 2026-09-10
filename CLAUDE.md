# CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni)

> Her oturum başında `.planning/STATE.md` ile birlikte **ilk okunan** dosya.
> Bu proje: **mevcut ozdemirmakine.com.tr'nin modern redesign'ı.** Amaç: yüksek kaliteli, **anti-slop**, referans-tabanlı, planlı geliştirme.

## 🎯 Vizyon
Özdemir Makine için modern, güven veren, dönüşüm + SEO odaklı kurumsal web sitesi. Hedef: B2B makine alıcıları, ihracat/referans arayan kurumlar.

## 🧱 Tech Stack — 🔒 KİLİTLİ (tartışma yok)
| Katman | Seçim |
|---|---|
| Framework | **Next.js 16 (App Router) + React 19 + TypeScript `strict`** |
| Styling | **Tailwind CSS v4 + shadcn/ui** (base-nova / **Base UI** tabanlı, Radix değil) |
| Animasyon | **Framer Motion** |
| **CMS / İçerik** | **Sanity.io** — gömülü Studio (`/studio`), `sanity@6` + `next-sanity@13` |
| Görsel/Font | `next/image`, `next/font` |
| Akış / Deploy | GitHub + **Vercel** |

- Import alias: `@/*` → `src/*`. `any` **yasak**.
- Yeni büyük bağımlılık eklemeden önce gerekçe + STATE.md kaydı.
- ⚠️ **Next.js sürüm uyarısı:** bu Next.js senin bildiğin değil olabilir — kod yazmadan `node_modules/next/dist/docs/` içindeki ilgili rehberi oku (detay `@AGENTS.md`).

## 🎨 Design Disiplini — ANTI-SLOP (sıfır tolerans)
> Referanstan çalışılıyor: **Framer'dan beğenilen site + mevcut site** → `design/references/`. Token'lar `design/design-system.md`'de kilitlenir.

**Her UI işinde ZORUNLU 4 kapı** (detay: `design/design-system.md` → "Tasarım İş Akışı"):
1. **Zevk** — `design-taste` skill. Design Read + 3 dial + "ilk versiyonu asla teslim etme".
2. **Referans** — `reference-parity` skill. himon'dan TEK bölüm çıkar → token'a çevir → **tarayıcıda çek, bak, düzelt**.
3. **Doğruluk** — `web-interface-guidelines` skill. Üç sütunlu tablo, düzeltmeler onaysız uygulanmaz.
4. **Proje** — `.planning/DEFINITION-OF-DONE.md`. Lint + build + STATE.md.

`ui-ux-pro-max` kapı değil, **token/palet/font kaynağı** — yeni token gerektiğinde başvurulur.
Skill tavsiyesi ile kilitli karar (mavi `#234D9C`, Geist, himon) çatışırsa **proje kazanır**.

**Yasaklar ❌:** ham default Tailwind paleti · dağınık inline style · jenerik "hero+3 kart+footer" AI slop · linear/robotik easing · tutarsız spacing · referanssız "kafadan" tasarım.
**Olması gereken ✅:** referanstan çıkmış tutarlı token sistemi · bilinçli tipografi hiyerarşisi + boşluk ritmi · erişilebilirlik (kontrast/focus/semantic) · responsive.

## 🎨 Tasarım Kararları — kilitli (kaynak: `design/references/himon-analysis.md`)
- **Referans:** himon.framer.website — dil alınır, kod alınmaz. 5 bölüm kalıbı analizde.
- **Aksan:** **Özdemir mavisi `#234D9C`** (derin `#164295`, parlak `#0E92DD`). himon'un lime'ı yerine.
- **İskelet:** koyu (near-black `#0E0E0E`) + sıcak off-white (`#F2F0EC`) + beyaz, tek aksan (mavi).
- **Font:** **Geist** (display, weight 500, tight tracking, hero UPPERCASE) + **Geist Mono** (kicker etiket).
  Zaten kurulu. himon'un fontu da Geist — birebir. Body Geist 400 muted.
- **Şekil:** yuvarlak köşe (kart ~16-24px, buton tam pill) · 1px ince ayraç · custom monoline ikon.
- **Hareket:** scroll-reveal + sticky-pin · yumuşak easing (linear yasak) · Framer Motion.
- **Çalışma:** header + footer önce, sonra arayı doldur. Küçük lokma, sayfa sayfa. himon slotlarına
  gerçek Özdemir bilgisi eşlenir (kaynak: canlı site — zip kilitli). Graphify haritası aktif (`.planning/graphs/`).
- **⚠️ ZORUNLU:** her tasarım/UI/token işinde yukarıdaki **4 kapı** + `design/references/`
  materyalleri (himon analizi, ekranlar) kullanılır. "Kafadan" tasarım yok, tarayıcıda görmeden "oldu" yok.
- **Animasyon:** himon scroll-reveal / sticky-pin / sayaç / parallax → **Framer Motion** (`whileInView`,
  `useScroll`/`useTransform`, custom easing; linear yasak). Motion token'ları design-system'de.

## 🗄️ Veri Katmanı — Sanity CMS
- **İçerik Sanity'de yaşar**, kodda değil. Makineler/kurumsal metinler/çeviriler Studio'dan yönetilir.
- Şema tipleri `src/sanity/schemaTypes/` · client + GROQ `src/sanity/lib/` · Studio rotası `src/app/studio/`.
- **Makine veri modeli** eski koddan çıkarıldı (Antigravity `legacy_codebase_audit.md`):
  marka, model, kategori, tip (sıfır/2.el), yıl, durum, konum, fiyat, **priceOnRequest**
  (fiyat sorunuz — kritik iş kuralı), **featured** (vitrin), görsel, specs, açıklama.
- Bölüm bileşenleri veriyi **prop ile** alır; Sanity çağrısı sayfa/server katmanında yapılır.
- `next/image` için Sanity görsel CDN'i `next.config` `images.remotePatterns`'a eklenir.

## 🗺️ Çalışma Şekli — GSD aktif
- **GSD workflow açık.** Yol haritası GSD formatında (`.planning/ROADMAP.md`, 6 faz).
  Akış: `discuss-phase → plan-phase → execute-phase → verify-work`. Config `.planning/config.json`.
- Referans-tabanlı iteratif ("burayı şöyle, burayı böyle") — her değişiklik token + review kapısından geçer.
- Faz faz ilerle; her oturum sonunda **STATE.md güncelle.**
- **🔴 Arama sırası ZORUNLU (kör grep yasak) — en ucuzdan başla:**
  1. Bu dosyadaki **Karar Matrisi** / **Planlama Katmanı** tabloları — çoğu soru burada var.
  2. `node ~/.claude/get-shit-done/bin/gsd-tools.cjs graphify query <terim>` — kod graph'ı
     (kim neyi import ediyor, sembol nerede). Graph `.planning/graphs/` altında (554 node/549 edge,
     kuruldu 2026-09-09). ⚠️ **Tazeleme maliyeti:** `graphify build` **agent spawn eder (pahalı)** —
     sadece büyük/toplu değişiklikte kullan. Tek dosya taşıma/yeniden adlandırmada grafiği
     `sed` ile cerrahi yama (yolu `.planning/graphs/graph.json`'da güncelle), agent açma.
  3. `.planning/codebase/*.md` (STRUCTURE/ARCHITECTURE/CONVENTIONS/UI-MAP) — insan-okur özet.
  4. `ast-grep` / `sg` — belirli bir kod kalıbı ararken.
  5. Grep / tüm dosya okuma — **son çare**, yukarıdakiler cevap vermediyse.
- **Okuma/yazma disiplini:** okunmuş dosyayı tekrar okuma · sadece değiştirilecek satırı
  `offset/limit` ile oku, tüm dosyayı çekme · cevapta koca dosyayı geri yazdırma, sadece
  diff/değişen blok ver · ekran görüntüsünü sürekli alma, kendi kontrolünü (tsc/eslint) yap ·
  gereksiz subagent/fork yok · çıktı kısa (bullet, GSD modu).

## 📂 Klasör Haritası
`src/app` (route+layout, `app/studio` = gömülü Sanity Studio) · `src/components/{ui,layout,sections}` · `src/sanity/{schemaTypes,lib}` (CMS şema + client) · `src/lib` · `src/hooks` · `src/content` (statik UI metinleri) · `src/types` · `design/` (referans + token) · `.planning/` (hafıza + kalite kapıları + GSD faz dosyaları). Detay: `.planning/codebase/STRUCTURE.md`.

## 🔎 Referans & Eski Site
- **Framer referansları** → `design/references/`. Kod **kopyalanmaz**; yapı, bölüm
  sıralaması, tipografi/renk kararı çıkarılıp `design/design-system.md`'ye yazılır.
- **Eski site (`ozdmak/`)**: statik HTML + ayrı bir ASP.NET denemesi. Kaynağı
  `ozdmak.rar` **parola korumalı, henüz açılamadı** (`1234` tutmadı). Analizi hazır:
  Antigravity `legacy_codebase_audit.md` — çöp listesi + kurtarılacak veri modeli orada.
  Görseller/metinler arşiv açılınca çekilecek. Klasör git dışıdır.

## 🧠 Planlama Katmanı — bağlamın yaşadığı yer
| Dosya | Ne zaman okunur |
|---|---|
| `.planning/STATE.md` | **Her oturumun ilk dosyası.** Nerede kaldık, kararlar, açık sorular |
| `.planning/.continue-here.md` | Oturuma devam ederken, sıradaki somut adım |
| `.planning/DEFINITION-OF-DONE.md` | Bir işe "bitti" demeden önce |
| `.planning/LEARNINGS.md` | Bir hata yapmadan önce, oturum sonunda yazarken |
| `.planning/CONTENT-INVENTORY.md` | İçerik, sayfa, ürün sorusu geldiğinde |
| `.planning/codebase/UI-MAP.md` | ⭐ **"Şu butonu şöyle yap" dendiğinde.** Görsel öğe → dosya → token |
| `.planning/codebase/STRUCTURE.md` | Dosya ararken. **Kör grep yerine buraya bak** |
| `.planning/codebase/ARCHITECTURE.md` | Yeni bileşen/sayfa eklerken |
| `.planning/codebase/CONVENTIONS.md` | Kod yazmadan önce |
| `.planning/codebase/STACK.md` | Bağımlılık veya sürüm sorusunda |
| `.planning/codebase/CONCERNS.md` | Risk değerlendirirken |
| `.planning/codebase/TESTING.md` | Doğrulama nasıl yapılır sorusunda |
| `.planning/ENTERPRISE-BLUEPRINT.md` | **MVP'de okuma.** Site ayakta olduktan sonra |

## 🧭 Karar Matrisi — hangi durumda ne yapılır
| Durum | Yapılacak |
|---|---|
| Yeni sayfa veya bölüm | Tasarım kapısı → mockup → build → review (`DEFINITION-OF-DONE.md`) |
| "Şu rengi değiştir" tarzı küçük iş | Token üzerinden değiştir, ham değer yazma |
| Dosya arıyorum | `graphify query <terim>` → yoksa `codebase/STRUCTURE.md`. Grep son çare |
| Next.js API'sinden emin değilim | `node_modules/next/dist/docs/` oku, tahmin etme |
| Yeni kütüphane gerekiyor | Önce gerekçe, sonra STATE.md kaydı, sonra kur |
| İçerik metni lazım | `src/content`. JSX'e gömme |
| Referans sitede güzel bir şey gördüm | Kararı al, kodu alma |
| Bir şey bozuldu | Önce `npm run build`, hatayı oku, sonra tahmin |
| Oturum bitiyor | `project-learning` skill'i — ders skill'e, harita `UI-MAP.md`'ye, durum `STATE.md`'ye |

## 🏅 Kalite Protokolü — her çıktı bu çıtadan geçer
> Amaç: 20 yıllık mühendis + tasarımcı kalitesi. "Çalışıyor" yetmez; **doğru + zarif + bakımı kolay** olacak.

**İşe başlamadan (30 sn düşün):**
1. **Hedefi 1 cümlede yaz** — ne değişecek, neden. Belirsizse **sor, tahmin etme**.
2. **En küçük lokma** — tüm bölümü değil tek parçayı hedefle. Büyük diff = büyük risk + çok token.
3. **Bağlamı ucuzdan çek** — Karar Matrisi → graphify → `codebase/*.md`. Kör grep/okuma yasak.
4. **Tasarım işiyse referansı aç** — himon analizi + `design/references/`. "Kafadan" tasarım yok.

**Kod yazarken:**
- Token üzerinden stil · `@/*` alias · **prop-driven** bölüm · **server-default** · a11y (kontrast/focus/semantic) · içerik `src/content`.
- **Mevcut kalıbı taklit et** (komşu dosyanın ismi, easing, spacing, yorum yoğunluğu). Yeni kalıp uydurmadan önce `CONVENTIONS.md`.
- primitive → `components/ui`, bölüm → `components/sections`, kabuk → `components/layout`. Dosyayı doğru katmana koy.

**Teslim etmeden (Definition of Done):**
1. **Kendi kontrolün:** `npm run lint` + `npm run build` temiz. autocheck hook zaten koşar — **kırmızıysa dur, düzelt, sonra devam.**
2. **Tasarım işiyse tarayıcıda gör** (`reference-parity`): ekran al → referansla yan yana → düzelt. "Herhalde olmuştur" yok.
3. **STATE.md güncelle** — ne bitti, sıradaki ne.

**"İlk versiyonu asla teslim etme":** ürettiğin ilk hali bir kez eleştir (hiyerarşi? boşluk ritmi? slop? tek viewport'a sığıyor mu?), **sonra** ver.

**İletişim:** GSD — kısa, aksiyon odaklı. Koca dosyayı geri yazdırma, sadece diff/değişen blok. Sonunda 1-2 cümle "ne yaptım".

## 🚫 Kod tarafı yasaklar
**❌** `any` · ham renk/boşluk değeri · göreli yol zinciri (`../../..`) · JSX'e gömülü
içerik metni · kendi verisini çeken bölüm bileşeni · gereksiz `"use client"` ·
referans siteden kopyalanmış kod · lint hatasıyla iş teslimi.

**✅** Token üzerinden stil · `@/*` alias · içerik `src/content` içinde · prop ile
beslenen bölümler · sunucu bileşeni varsayılan · `npm run lint` ve `npm run build` temiz.

## 🔗 Koordinasyon
- Trello: "Özdemir Makine Web Sitesi — Kod İnceleme & Roadmap" (Yazılım Geliştirme (AI) listesi).
- Üst koordinasyon ana workspace sohbetinde; bu klasör = geliştirme sohbeti.

@AGENTS.md
