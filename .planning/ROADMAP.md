# Roadmap: Özdemir Makine Web Sitesi

## Overview
Yayındaki ozdemirmakine.com.tr'nin **frontend-önce** redesign'ı. Referans: canlı site (link) + Framer.
Next.js 16 + TS strict + Tailwind v4 + shadcn/ui + Framer Motion. **Faz 1-8 frontend** (asıl mesai),
içerik önce tipli **mock** (`src/content`), **Faz 9'da Sanity** ile dinamikleşir, **Faz 10 yayın**.
Anti-slop, referans-tabanlı, GSD faz faz. GitHub + Vercel.

## Phases

**Phase Numbering:** Tam sayı (1,2,3) planlı iş; ondalık (2.1) acil eklemeler (INSERTED).

- [ ] **Phase 1: Keşif & Bağlam Mühendisliği** - Canlı site + Framer analizi, içerik/işlev envanteri, tasarım yönü, harita
- [ ] **Phase 2: Design System** - Referanstan token sistemi + temel bileşenler + shotgun
- [x] **Phase 3: Global Layout & Navigasyon** - Header, nav, footer, responsive iskelet
- [ ] **Phase 4: Ana Sayfa** - Hero + tüm bölümler, tasarım-yoğun
- [ ] **Phase 5: Makine Kataloğu** - Liste + filtre + detay (mock veri)
- [ ] **Phase 6: Kurumsal & Diğer Sayfalar** - Hakkımızda, referanslar, iletişim, yedek parça, galeri
- [ ] **Phase 7: Etkileşim & Cila** - Framer Motion, mikro-etkileşim, erişilebilirlik, responsive ince ayar
- [ ] **Phase 8: SEO & Performans** - Metadata, structured data, sitemap, CWV, görsel optimizasyon
- [ ] **Phase 9: CMS (Sanity)** - İçeriği dinamikleştir, Studio + şema, mock → Sanity geçişi
- [ ] **Phase 10: Entegrasyon & Yayın** - Form → Zoho, Vercel deploy, domain

## Phase Details

### Phase 1: Keşif & Bağlam Mühendisliği
**Goal**: Ne yapacağımız zerre belirsizlik kalmadan yazılı — canlı sitenin işleyişi, içerik envanteri, tasarım yönü ve kod haritası hazır.
**Depends on**: Nothing (first phase)
**Requirements**: NFR-4, NFR-5
**Success Criteria** (what must be TRUE):
  1. Canlı sitenin sayfa + işlev envanteri çıkarıldı (`CONTENT-INVENTORY.md` dolu).
  2. Framer referansları toplanıp analiz edildi (layout/tipografi/renk/boşluk ritmi).
  3. Tasarım yönü kararı yazılı (mood, ton, benzer/farklı olduğumuz noktalar).
  4. Proje repomix/graphify ile haritalandı — sonraki fazlar körlemesine dosya taramaz.
**Plans**: TBD

Plans:
- [ ] 01-01: Canlı site analizi + içerik/işlev envanteri
- [ ] 01-02: Framer referans analizi + tasarım yönü
- [ ] 01-03: Kod haritalama (repomix/graphify)

### Phase 2: Design System
**Goal**: Referanstan çıkmış tutarlı token sistemi + anti-slop temel bileşenler.
**Depends on**: Phase 1
**Requirements**: NFR-4, NFR-3, NFR-6
**Success Criteria** (what must be TRUE):
  1. `design/design-system.md` + `globals.css`'te renk/tipografi/spacing/easing token'ları kilitli.
  2. Ham default Tailwind paleti veya sihirli değer yok; her şey token üzerinden.
  3. Temel bileşenler (button, card, nav shell, section shell) token'la besleniyor.
  4. 3-5 tasarım yönü (shotgun) sunulmuş, biri seçilmiş.
**Plans**: TBD

Plans:
- [ ] 02-01: Token çıkarımı + globals.css kilidi
- [ ] 02-02: Temel bileşen kütüphanesi
- [ ] 02-03: Shotgun 3-5 yön → seçim

### Phase 3: Global Layout & Navigasyon
**Goal**: Sitenin çatısı ayakta — her sayfada tutarlı, responsive header/footer.
**Depends on**: Phase 2
**Requirements**: NFR-6, NFR-3
**Success Criteria** (what must be TRUE):
  1. Header + navigasyon (mobil menü dahil) tüm kırılımlarda çalışıyor.
  2. Footer içerik + linklerle kurulu.
  3. Layout shell tüm sayfalar için ortak; içerik prop ile besleniyor.
  4. Klavye navigasyonu + focus halkaları çalışıyor.
**Plans**: TBD

Plans:
- [x] 03-01: Header + navigasyon (mockup → build → review)
- [x] 03-02: Footer + layout shell

### Phase 4: Ana Sayfa
**Goal**: Etkileyici ana sayfa — hero + kurumsal bölümler, tasarım kapısından geçmiş.
**Depends on**: Phase 3
**Requirements**: FR-1, NFR-4
**Success Criteria** (what must be TRUE):
  1. Hero bölümü referans seviyesinde, anti-slop.
  2. Kurumsal tanıtım + öne çıkan makineler + güven öğeleri (marka/referans) + CTA bölümleri render ediliyor.
  3. Tüm bölümler mock veriyle, tipli, prop-driven.
  4. Design review kapısı geçildi; responsive.
**Plans**: TBD

Plans:
- [ ] 04-01: Hero (mockup → build → review)
- [ ] 04-02: Ana sayfa bölümleri (vitrin, güven, CTA)

### Phase 5: Makine Kataloğu
**Goal**: Katalog frontend'i tam — liste, filtre, detay; mock veriyle çalışıyor.
**Depends on**: Phase 4
**Requirements**: FR-2, FR-2b, FR-2c, FR-2d
**Success Criteria** (what must be TRUE):
  1. Liste sayfası kategori + tip (sıfır/2.el) filtresi + arama ile çalışıyor.
  2. Detay sayfası tüm makine alanlarını gösteriyor (görsel galeri, specs, açıklama).
  3. **priceOnRequest** kuralı doğru: fiyat yoksa "Fiyat Sorunuz" CTA'sı.
  4. Mock veri şekli gelecekteki Sanity `machine` şemasıyla birebir (Faz 9 ucuz geçiş).
**Plans**: TBD

Plans:
- [ ] 05-01: Tipli mock veri modeli + liste + filtre
- [ ] 05-02: Makine detay + priceOnRequest

### Phase 6: Kurumsal & Diğer Sayfalar
**Goal**: Kalan sayfalar tam — kurumsal, iletişim, yedek parça, galeri.
**Depends on**: Phase 5
**Requirements**: FR-3, FR-4, FR-7, FR-8, FR-10
**Success Criteria** (what must be TRUE):
  1. Hakkımızda + referanslar sayfaları içerikle kurulu.
  2. İletişim sayfası + teklif formu UI'ı (doğrulama, başarı/hata durumları) çalışıyor.
  3. Yedek parça + galeri sayfaları (mock veri) render ediliyor.
  4. Makine karşılaştırma iskeleti (v2 ise iskelet).
**Plans**: TBD

Plans:
- [ ] 06-01: Kurumsal sayfalar (hakkımızda, referanslar)
- [ ] 06-02: İletişim + form UI
- [ ] 06-03: Yedek parça + galeri

### Phase 7: Etkileşim & Cila
**Goal**: Site "canlı" hissettiriyor — bilinçli animasyon, mikro-etkileşim, erişilebilirlik cilası.
**Depends on**: Phase 6
**Requirements**: NFR-3, NFR-4
**Success Criteria** (what must be TRUE):
  1. Framer Motion geçişleri/scroll animasyonları bilinçli, robotik değil (linear easing yok).
  2. Hover/focus/loading mikro-etkileşimleri tutarlı.
  3. Erişilebilirlik denetimi: kontrast, ARIA, klavye, reduced-motion desteği.
  4. Tüm kırılımlarda responsive ince ayar tamam.
**Plans**: TBD

Plans:
- [ ] 07-01: Animasyon + mikro-etkileşim sistemi
- [ ] 07-02: Erişilebilirlik + responsive cila

### Phase 8: SEO & Performans
**Goal**: Site aranabilir ve hızlı — yayına teknik olarak hazır.
**Depends on**: Phase 7
**Requirements**: NFR-1, NFR-2
**Success Criteria** (what must be TRUE):
  1. Per-sayfa metadata + Open Graph; makinelerde Product structured data.
  2. Sitemap + robots + temiz URL + kanonik etiketler.
  3. Core Web Vitals yeşil (LCP, CLS, INP); görseller optimize (WebP, lazy).
**Plans**: TBD

Plans:
- [ ] 08-01: Metadata + structured data + sitemap
- [ ] 08-02: Performans + görsel optimizasyon

### Phase 9: CMS (Sanity)
**Goal**: İçerik koddan çıkıp panele taşınıyor — makineler/metinler Studio'dan yönetiliyor.
**Depends on**: Phase 8
**Requirements**: FR-6, FR-6b, FR-5
**Success Criteria** (what must be TRUE):
  1. Gömülü Sanity Studio (`/studio`) çalışıyor; `machine` + `siteSettings` şemaları tanımlı.
  2. Frontend bileşenleri mock yerine Sanity'den okuyor (aynı veri şekli, minimum değişiklik).
  3. Görseller Sanity image CDN'inden `next/image` ile geliyor.
  4. TR/EN içerik Sanity'de yönetiliyor.
**Plans**: TBD

Plans:
- [ ] 09-01: Sanity proje + Studio + şemalar
- [ ] 09-02: Mock → Sanity veri geçişi + i18n

### Phase 10: Entegrasyon & Yayın
**Goal**: Teklif akışı bağlı, site production'da canlı.
**Depends on**: Phase 9
**Requirements**: FR-4b, NFR-8
**Success Criteria** (what must be TRUE):
  1. İletişim/teklif formu Zoho CRM'e lead düşürüyor (Zoho projesiyle koordineli).
  2. Vercel production deploy canlı, preview akışı çalışıyor.
  3. Custom domain bağlı, SSL aktif.
**Plans**: TBD

Plans:
- [ ] 10-01: Form → Zoho CRM
- [ ] 10-02: Vercel deploy + domain

## Progress

**Execution Order:** 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Keşif & Bağlam Mühendisliği | 2/3 | In progress | - |
| 2. Design System | 1/1 | Complete | 2026-09-08 |
| 3. Global Layout & Navigasyon | 2/2 | Complete | 2026-09-09 |
| 4. Ana Sayfa | 0/2 | In progress (hero ✅) | - |
| 5. Makine Kataloğu | 0/2 | Not started | - |
| 6. Kurumsal & Diğer Sayfalar | 0/3 | Not started | - |
| 7. Etkileşim & Cila | 0/2 | Not started | - |
| 8. SEO & Performans | — | Ertelendi (Faz 11'e) | - |
| 9. CMS (Sanity) | 4/2 | ✅ Tamam | 2026-09-11 |
| 10. Entegrasyon & Yayın | 1/2 | ✅ Form→Zoho tamam (deploy kalan) | 2026-09-14 |

## Yeni Fazlar (2026-09-14+ Talha isteği)
- **Faz 8 Backend & Ölçüm** ✅ TAMAM 2026-09-14 — Zoho CRM Lead + Resend mail + KVKK banner + GA4 + Sanity webhook + rate-limit + honeypot + kampanya UI. Detay `.planning/specs/faz-8-backend-olcum.md`.
- **Faz 9 CRM Makine Lookup** ✅ TAMAM 2026-09-15 — Zoho **master data** kararı (sync yok, Sanity onun aynası). `insertLead()` `machineCode` → Zoho Products search → mevcut `lgilendi_i_Makine_PressXchange` Lookup field'ına ID bind. Sanity `machine.ts` `urunKodu` field'ı Zoho Product_Code ile birebir eşleşecek şekilde netleştirildi. Uçtan uca test (Zoho MCP) ✓.
- **Faz 11 Frontend Cila & Markalaşma** ⏭️ AÇIK — Hero + arama birleştirme, logo/tipografi denge, distribütör logoları renkli, kurumsal görseller, footer link'leri, adres düzenleme.
- **Faz 10 Vercel Deploy** ⏭️ Faz 11 sonrası, sadece vercel.app URL'inde (domain cutover YOK — mevcut ozdemirmakine.com.tr korunacak).
- **Faz 12 SEO & Performans** ⏭️ (Faz 8'in ertelenen SEO/CWV kısmı — canlıya çıkınca).
