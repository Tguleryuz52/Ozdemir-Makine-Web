# Faz 7 — Sanity CMS: Makine Yönetimi (Spec)

**Tarih:** 2026-09-11 · **Durum:** Kuruldu + siteye bağlandı ✅ (kalan: webhook, görsel yükleme, deploy)

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

## Kalan
1. Webhook → `/api/revalidate` (tag `machine`) — prod'da Studio yayını anında yansısın.
2. Studio'dan gerçek görsel/PDF yükleyip render doğrulaması.
3. Vercel deploy: env değişkenleri + prod domain CORS.
