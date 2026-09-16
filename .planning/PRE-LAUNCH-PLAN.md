# PRE-LAUNCH-PLAN.md — Canlıya Çıkış: Kalite, Güvenlik, Performans

> Amaç: siteyi **premium + hızlı + güvenli** seviyeye çekip canlıya almak.
> Kaynak konuşma: 2026-09-16. Bağlam: [[STATE.md]] · [[DEFINITION-OF-DONE.md]].

## Ölçülen gerçekler (tahmin değil)
- **Zoho Products = 165 kayıt** (getRecordCount ile doğrulandı, 2026-09-16).
- Tüm ürün **verisi** bulk read ile çekilebilir. **Görsel kaynağı** import anında netleşecek (Zoho ürün kaydı genelde tek "Record Image"; 10'lu galeriler muhtemelen ayrı → Talha yükler ya da eski siteden).
- Next.js deploy rehberi mevcut: `node_modules/next/dist/docs/01-app/01-getting-started/17-deploying.md` + `08-caching.md` + `12-images.md` (bu sürüme özel — kod yazmadan okunacak).

## ✅ Faz A sonuçları (2026-09-16 — prod build ile ölçüldü)
- **Build tertemiz:** 0 hata/uyarı, TS temiz, 42 sayfa. Tüm sayfalar Static/SSG (sadece /api/*, /iletisim dinamik).
- **"Render'da kalıyor" = DEV MODU** (Turbopack on-demand). Prod'da (localhost:3001) tıklama anında. Canlıda yok olur.
- **"Footer linkine ulaşamıyorum" = dev jank** — prod'da footer linki tıklandı → /kurumsal anında açıldı. Link sağlam. **Lenis smooth-scroll KALIYOR** (Talha: "yağ gibi kayma" premium hissi önemli).
- **Perf baseline (prod):** DCL 109ms, Load 416ms, JS 242KB, CSS 18KB, Font 83KB → sağlıklı & hafif. Gerçek perf riski yok; tek değişken 165 ürün görselleri (Faz C, sıkıştırma ile).
- **npm audit:** 15 açık (2 high, 13 moderate) ama **hepsi transitive** (Sanity/Vercel toolchain: smol-toml, uuid), runtime yolunda değil. Force-fix Sanity v6→v5 breaking → **yapılmadı**, izlenecek.

## Kapasite kararı — Sanity 165 ürün + görseller
- **Doküman:** 165 = ücretsiz plan limitinin ~%1.6'sı. Sorun yok.
- **Görsel:** worst-case 1650 foto. **Import'ta resize+compress** (maks ~2000px, ~%85, WebP) → ~660MB, 5GB'ın altında. Yetmezse Growth planı.
- **Katalog performansı:** sayfalama (12-24/sayfa) + **ISR** (statik HTML, Sanity'yi runtime'da sorgulamaz) + `next/image` + Sanity CDN thumbnail. → 165 ürün ziyaretçiyi hiç yavaşlatmaz.

---

## FAZ A — Teşhis & Baseline (önce ölç, sonra düzelt)
- [ ] `next build` al → gerçek hataları/uyarıları listele (dev gürültüsü değil).
- [ ] **Dev vs Prod ayrımı:** "tıklayınca render'da kalıyor" büyük ihtimalle `next dev`'in on-demand derlemesi. Prod build'de (`next start`) test et → çoğu kaybolur.
- [ ] **Gerçek buglar:** footer linklerine ulaşamama (Lenis smooth-scroll / z-index / cookie-banner overlay şüphesi) → prod build'de tekrar üret, kök neden bul.
- [ ] Lighthouse (mobil + masaüstü) ilk skorları al → baseline.
- [ ] `@next/bundle-analyzer` ile bundle boyutu bak.

## FAZ B — Performans mükemmelleştirme
- [ ] Görsel: tüm `next/image`'lar doğru `sizes`/`width` + Sanity CDN transform (`?w=&auto=format`).
- [ ] Katalog: sayfalama + ISR + kart thumbnail'leri.
- [ ] Font (`next/font` zaten var) — FOUT/CLS kontrol.
- [ ] Lenis/z-index footer bug fix + tüm linkler tıklanabilir doğrulama.
- [ ] Hedef: Lighthouse Performance ≥ 90 (mobil), CLS < 0.1, LCP < 2.5s.

## FAZ C — İçerik yükleme (165 ürün)
- [ ] Zoho → Sanity **tek seferlik import script'i** (COQL/bulk read → `machine` dokümanları, urunKodu = Product_Code).
- [ ] Görselleri import'ta **resize+compress** ederek Sanity'ye yükle (kota kontrolü).
- [ ] Sonrası: düzenleme Studio'dan (Zoho master kararı korunur, sadece ilk yük otomatik).

## FAZ D — Kod kalitesi (premium seviye)
**Standartlar (metodoloji — otomatik araç değil, çıta olarak benimsenir):**
- [ ] Google **eng-practices** reviewer (design, functionality, complexity, tests, naming, comments).
- [ ] **clean-code-javascript** (ryanmcdermott) — isimlendirme, fonksiyon, sınıf, SOLID. Kurallarının çoğu **ESLint'e** çevrilebilir → otomatik zorla.
- [ ] **nodebestpractices** (goldbergyoni) — API route/backend checklist: hata yönetimi, async/await try-catch, input validation, güvenlik, logging. Zoho/Resend/webhook route'larına uygula.
**Otomatik zorlama & review:**
- [ ] ESLint config sıkılaştır (clean-code kurallarını ekle: complexity, max-depth, no-magic-numbers vb.).
- [ ] `/code-review` (yerel diff) + `/code-review ultra` (dal geneli, çok-ajan bulut) → bulguları uygula.
- [ ] TypeScript strict temiz, `any` yok, lint temiz (proje kuralı). Ölü kod/tekrar temizliği (`/simplify`).

## FAZ E — Güvenlik
- [ ] **Strix** (github.com/usestrix/strix) ile otonom güvenlik taraması — **kendi sitemizde, canlıya çıkış öncesi (yetkili/defansif)**. Kurulum + rapor.
- [ ] `security-review` skill + `npm audit` (bağımlılık açıkları).
- [ ] Env/secret sızıntısı kontrol (NEXT_PUBLIC ayrımı), rate-limit + honeypot doğrula, KVKK.
- [ ] Webhook secret + API route input validation (zod) gözden geçir.

## FAZ F — Yük & çökme testi
- [ ] **k6** veya **Artillery** ile yük testi (eşzamanlı kullanıcı, form spike, katalog gezinme).
- [ ] Rate-limit'in yük altında davranışı (429 doğru mu).
- [ ] Zoho/Resend dış servis timeout & fail-soft senaryoları.
- [ ] Hedef: makul yükte hata oranı ~0, p95 yanıt kabul edilebilir.

## FAZ G — Deploy (Next.js checklist + prod wiring)
- [ ] `node_modules/next/dist/docs/.../17-deploying.md` + caching + images rehberini uygula.
- [ ] Vercel: prod env değişkenleri, `images.remotePatterns` (Sanity CDN), ISR/revalidate.
- [ ] Sanity webhook prod URL + filtreye `stockCategory` ekle.
- [ ] Resend mail domain doğrulama (test modundan çık).
- [ ] Staging (Vercel preview) tam QA: formlar→Zoho, mail, tüm linkler, mobil, hız.
- [ ] Canlı (STATE: şimdilik vercel.app, domain cutover sonra).

## FAZ H — Observability & Bakım (canlı hata izleme) ⭐ KRİTİK
> "Site yayında, biri hata/donma/kasma yaşadı — nerede görürüz, nasıl bakım yaparız?" sorusunun cevabı.

**İzleme yığını (önerilen — endüstri standardı):**
- [ ] **Sentry** (`@sentry/nextjs`) — JS hataları (client + server + API route), tam stack trace, source map, breadcrumb, hangi kullanıcı/hangi sayfa, hangi deploy (release). Ücretsiz plan ~5k hata/ay. **Hata olunca e-posta/Slack alarmı** → Sentry panelinde detay. Performance modülü yavaş işlemleri/donmaları da yakalar.
- [ ] **Vercel Speed Insights + Analytics** — gerçek kullanıcı Web Vitals (LCP/CLS/INP) → "kasma/donma"yı gerçek ziyaretçiden görürsün.
- [ ] **Vercel Logs/Observability** — sunucu logları, function invocation, API route hataları.
- [ ] **Uptime monitor** (UptimeRobot / Better Stack) — site down/çökme olursa **anında alarm** (e-posta/SMS).

**Hata nereye düşer (akış):**
- Tarayıcı hatası → Sentry (client) → alarm → panelde context.
- API/sunucu hatası → Sentry (server) + Vercel function log.
- Yavaşlık/donma → Sentry Performance + Vercel Speed Insights.
- Site çökmesi → uptime monitor alarmı.
- **Lead kaybı riski:** Zoho/Resend fail-soft catch bloklarına **Sentry capture** ekle → sessizce lead kaybı OLMAZ (memory: tüm lead'ler Zoho'ya akmalı).

**Bakım modeli:**
- [ ] Alarmlar tek kanala (e-posta/Slack) → Sentry'de triage → düzelt → deploy.
- [ ] **Release tracking:** her deploy'u etiketle → hata hangi deploy'da başladı, net.
- [ ] Rutin: `npm audit`/Dependabot (bağımlılık), aylık Lighthouse, **Sanity export** (içerik yedeği), Zoho entegrasyon sağlık kontrolü.
- [ ] Severity/önem sınıflama (kritik → hemen, düşük → sonraki sürüm).

---

## Sıra önerisi
**A (teşhis) → B (perf) → D (kod kalitesi) → E (güvenlik) → F (yük) → H (observability kurulumu) → C (içerik) → G (deploy).**
Not: C (165 ürün import) "sonra çekeriz" (Talha) → deploy'a yakın. H, deploy'dan ÖNCE kurulmalı ki canlıda ilk günden hata görünsün. A ilk yapılırsa gerisi netleşir.

## Araç/komut envanteri
- Perf: `next build`, Lighthouse, `@next/bundle-analyzer`, k6/Artillery.
- Kalite: `/code-review`, `/code-review ultra`, `/simplify`; standartlar: eng-practices, clean-code-javascript, nodebestpractices (+ ESLint sıkılaştırma).
- Güvenlik: Strix, `security-review` skill, `npm audit`.
- Observability: Sentry (`@sentry/nextjs`), Vercel Speed Insights/Analytics/Logs, UptimeRobot/Better Stack.
- İçerik: Zoho MCP (bulk read) + Sanity write client + sharp (resize).
