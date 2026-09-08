# REQUIREMENTS.md — Gereksinimler

> REQ-ID'ler `ROADMAP.md` fazlarına eşlenir. Kapsam: **v1** (bu milestone), **v2** (sonraki), **out** (kapsam dışı).
> Kaynak: mevcut site sayfaları (index/machines/machine-detail/spare-parts/compare/gallery/blog/references/about/contact) + Antigravity `legacy_codebase_audit.md` veri modeli.

## Fonksiyonel (FR)

### Ana sayfa & kurumsal
- **FR-1 (v1):** Ana sayfa — hero + kurumsal tanıtım + **öne çıkan makineler** vitrini (Sanity `featured`) + güven öğeleri (marka logoları, referanslar) + net CTA (teklif/iletişim).
- **FR-3 (v1):** Kurumsal sayfalar — Hakkımızda (şirket tarihçesi), Referanslar, İletişim.
- **FR-9 (v2):** Blog / haberler — Sanity'de `post` tipi, SEO içerik üretimi için.

### Makine kataloğu (çekirdek iş)
- **FR-2 (v1):** Makine **liste** sayfası — kategori ve tip (sıfır/2.el) filtresi, arama, SEO-uyumlu URL (`/makineler/[slug]`).
- **FR-2b (v1):** Makine **detay** sayfası — audit modelinin tüm alanları: marka, model, kategori, yıl, durum, konum, görsel galerisi, specs, açıklama.
- **FR-2c (v1):** **priceOnRequest** iş kuralı — fiyat varsa göster, yoksa "Fiyat Sorunuz" CTA'sı (teklif formuna bağlanır). **Kritik.**
- **FR-2d (v1):** **Öne çıkan** (`featured`) makineler ana sayfada ve listenin üstünde önceliklenir.
- **FR-7 (v2):** Makine **karşılaştırma** (eski `compare.html`) — 2-3 makineyi yan yana kıyaslama.
- **FR-8 (v2):** **Yedek parça** kataloğu (eski `spare-parts.html`) — ayrı Sanity tipi, liste + detay.
- **FR-10 (v2):** **Galeri** (eski `gallery.html`) — kurumsal/ürün görsel galerisi.

### İçerik yönetimi
- **FR-6 (v1):** **Sanity CMS** — makineler, kurumsal içerik, çeviriler, site ayarları (logo, iletişim, sosyal) gömülü Studio'dan (`/studio`) teknik bilgi gerektirmeden yönetilir.
- **FR-6b (v1):** Görsel yönetimi — Sanity image CDN, `next/image` ile WebP optimize sunum.

### Dönüşüm & entegrasyon
- **FR-4 (v1):** İletişim / **teklif formu** — doğrulama + spam koruması; başarı/hata durumları.
- **FR-4b (v1):** Form gönderimi **Zoho CRM'e lead** düşürür (Zoho projesiyle koordineli; boş Lead-kaynağı sorunu `CONTENT-INVENTORY.md`'de not).
- **FR-11 (v2):** Bülten kaydı (eski `newsletter`) — e-posta toplama.

### Çok dillilik
- **FR-5 (v1):** **TR + EN** içerik (ihracat). Sanity'de dil alanları; dil değiştirici.
- **FR-5b (v2):** **DE** (Almanca) — audit çeviri havuzunda mevcut, ihracat pazarı.

## Non-Fonksiyonel (NFR)
- **NFR-1 (v1):** **Performans** — Core Web Vitals yeşil (LCP < 2.5s, CLS < 0.1, INP < 200ms); görsel lazy-load; makul JS bütçesi.
- **NFR-2 (v1):** **SEO** — semantic HTML, per-sayfa metadata + Open Graph, makinelerde Product structured data, sitemap, robots, temiz URL, kanonik etiketler.
- **NFR-3 (v1):** **Erişilebilirlik** — WCAG AA hedefi: kontrast, focus halkası, klavye navigasyonu, ARIA, semantic landmark'lar.
- **NFR-4 (v1):** **Görsel kalite** — anti-slop, referans seviyesinde tutarlı token sistemi (`DEFINITION-OF-DONE.md` kapısı).
- **NFR-5 (v1):** **Bakım** — modüler, type-safe (`strict`, `any` yasak), okunabilir; içerik koddan ayrı (Sanity/`src/content`).
- **NFR-6 (v1):** **Responsive** — mobil öncelikli, tüm kırılımlar (mobil/tablet/masaüstü).
- **NFR-7 (v1):** **Güvenlik** — form input doğrulama, rate-limit/spam koruması, secret'lar env'de, Sanity token'ı sadece server-side.
- **NFR-8 (v1):** **Deploy** — GitHub → Vercel CI; preview deploy'lar; production'da custom domain.

## Kapsam dışı (out — şimdilik)
- E-ticaret / online ödeme (fiyat sorunuz modeli var, sepet yok).
- Kullanıcı hesapları / üyelik.
- Canlı sohbet botu (eski sitenin sahte pop-up'ları — bilinçli olarak yok).

## Açık uçlar (netleşecek)
- İçerik envanteri (arşiv açılınca): gerçek makine adedi, kategoriler, marka listesi.
- DE dili v1 mi v2 mi? (ihracat yoğunluğuna göre)
- Blog v1'e alınmalı mı? (SEO değeri yüksek olabilir)
