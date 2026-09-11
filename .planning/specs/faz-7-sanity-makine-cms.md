# Faz 7 — Sanity CMS: Makine + Blog + Galeri + Ayarlar (Spec)

**Tarih:** 2026-09-11 · **Durum:** Makine + Blog + Galeri + Site Ayarları kuruldu, siteye bağlandı, build temiz ✅ (kalan: webhook, deploy, gerçek görsel/PDF yükleme)

## Amaç
Makine ekleme/çıkarma/düzenlemeyi koddan çıkarıp **Sanity Studio**'ya taşımak. Özdemir kod bilmeden, Framer-CMS kolaylığında yönetsin. Kapsam **sadece makine**; markalar/blog/galeri şimdilik statik.

## Kararlar (kilitli)
- **Neden Sanity:** custom admin = haftalar + bakım; içerik-kodda = sürdürülemez. Sanity paneli+CDN+versiyon+ücretsiz hazır, stack'te kilitli.
- **Gömülü Studio** (`/studio`) — ayrı studio/web monorepo DEĞİL; mevcut Next app'e gömülü. Tek proje, tek deploy, prod'da `ozdemirmakine.com.tr/studio`.
- **Marka:** şimdilik makine üstünde sabit dropdown. (İleride Markalar sayfası Sanity'ye alınınca logolu **referans** dokümana yükselecek — kolay migration.)
- **Kategori/alt-kategori:** sabit, kodda kilitli (stabil taksonomi, en az kırılma).
- **Özellikler:** sabit ana alanlar + **esnek** `ekOzellikler` (ad+değer) listesi.
- **Tazelik:** published-only + ISR `revalidate:60`; prod'da webhook ile `machine` tag revalidate (anında).
- **Güvenlik:** read token server-only (`SANITY_API_READ_TOKEN`, NEXT_PUBLIC değil → client'a sızmaz). Studio'yu sadece Sanity üyesi düzenler; `/studio` açık URL olsa da ziyaretçi login görür.

## Mimari
- **Şema** (`src/sanity/schemaTypes/machine.ts`): tek `machine` dokümanı, Türkçe alan başlıkları + gruplar (Temel/Sınıflandırma/Görsel&PDF/Detay). Alanlar `src/content/machines.ts` `Machine`+`MachineExtra` modelini birebir karşılar.
- **Studio** (`src/sanity/config.ts` + `app/studio/[[...tool]]/{page,Studio}.tsx`): config client sınırında (`Studio.tsx "use client"`) — Next16/Turbopack `swr` RSC fix.
- **Veri katmanı** (`src/sanity/lib/machines.ts`): GROQ projeksiyon → `MachineDoc` (bileşen şekli). `getMachines/getFeaturedMachines/getMachineBySlug/getMachineSlugs/getRelatedMachines`. Görsel→`urlForImage`, PDF→asset url.
- **Tüketiciler prop-driven** (server sayfa fetch → client bileşene prop): 4 katalog rota + `[slug]` detay + anasayfa vitrin. Görünüm/kart tasarımı **değişmedi**, sadece kaynak.
- **client** (`src/sanity/lib/client.ts`): `useCdn:true`, `perspective:"published"`, server token.
- **Migration** (`scripts/migrate-machines.ts`, `npx tsx`): 17 makine → Sanity, idempotent `_id=machine.<id>`, published.

## src/sanity alias kuralı
`src/sanity/{env,config,structure,schemaTypes}` içinde **@/ alias YOK** → sadece relative (`./`), çünkü Sanity CLI bundler'ı tsconfig path'i çözemez. Uygulama tarafı dosyalar (`lib/machines`, sayfalar) `@/sanity/...` kullanır.

## Doğrulama (tarayıcı, 2026-09-11)
Katalog 17 ürün + doğru filtre sayıları · anasayfa vitrin 3 kart · detay tam (açıklama+spec+format) · konsol 0 hata · client-fetch yok (SSR/ISR, statik hız).

## Genişleme — Blog + Galeri + Site Ayarları (2026-09-11)
Kapsam makineyle sınırlıydı; Talha "tam profesyonel" için Blog + Galeri + Ayarlar'ı da istedi (Markalar refactor'ı sonraya).
- **Şemalar:** `post` (blog: baslik/slug/kategori/tarih/ozet/kapak/vitrin + `icerik` Portable Text), `galleryItem` (gorsel/baslik/etiket/sira), `siteSettings` (singleton: email/telefon/whatsapp/adresTR/adresDE/sosyal[]).
- **Studio menüsü** (`structure.ts`): makine grupları + ✍️ Blog + 🖼️ Galeri + ⚙️ Site Ayarları (tek doküman, `documentId:"siteSettings"`).
- **Veri katmanı:** `lib/posts.ts` (getPosts/getPostBySlug/getPostSlugs → `PostDoc`), `lib/gallery.ts` (getGalleryItems → `GalleryItem`), `lib/settings.ts` (getSiteSettings → statik fallback'li tam obje).
- **Tüketiciler:** `/blog` (liste, prop-driven `BlogSection`), `/blog/[slug]` YENİ detay (Portable Text render, SSG), `/galeri` (Sanity boşsa statik placeholder), footer + contact-section artık `getSiteSettings`'ten (email/tel/adres/sosyal), boş alan → koddaki statik değere düşer.
- **Yeni bağımlılık:** `@portabletext/react@^7` (blog gövdesi; zaten sanity transitive'iydi, açıkça deps'e eklendi).
- **Seed:** `scripts/seed-content.ts` → Site Ayarları (mevcut değerler) + 3 örnek blog yazısı. Galeri seed'lenmez (gerçek foto Studio'dan).
- **Teklif akışı düzeltmesi:** detay "Fiyat Teklifi Al" → `?makine=<slug>`; iletişim sayfası makineyi Sanity'den (`getMachineBySlug`) bulur (eskiden statik + boş productCode'a takılıyordu). PDF butonu artık `pdfUrl` varsa görünür. Form onay satırı → veri-güvenliği checkmark'ları. `client.ts` `useCdn:false` (ISR'de taze veri).

## Kalan
1. Webhook → `/api/revalidate` (tag `machine`/`post`/`gallery`/`settings`) — prod'da Studio yayını anında yansısın.
2. Studio'dan gerçek görsel/PDF + galeri fotoğrafları yükleyip render doğrulaması.
3. Vercel deploy: env değişkenleri + prod domain CORS.
4. Sonraki: Markalar → Sanity (logo referansı), Zoho form entegrasyonu.
