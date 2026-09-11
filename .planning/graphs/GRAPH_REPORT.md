# Graph Report - ozdemir-makine-web  (2026-09-11)

## Corpus Check
- 122 files · ~149,505 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 905 nodes · 1156 edges · 77 communities (69 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0dc235d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- layout.tsx
- package.json
- Design Read, Dials & Honest Design Systems
- components.json
- compilerOptions
- Interaction Design
- Özdemir Makine — Design System (Token Kontratı)
- Bölüm A — Referanstan çıkarım
- dependencies
- Phase Details
- Design & Taste
- CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni)
- Web Interface Guidelines — pre-ship denetim kapısı
- Faz 2 · Plan 01 — Design System
- Part 2 — AI Tells (from taste-skill)
- lib/machines.ts
- Fonksiyonel (FR)
- ⏭️ CONTINUE HERE — Oturum Devir (2026-09-09)
- LEARNINGS.md — Kalıcı dersler
- Project Learning — öğrendiğini kalıcı davranışa çevir
- himon → Özdemir Makine — Tasarım Dili Analizi & Uyarlama
- Communities (56 total, 5 thin omitted)
- Doldurulacak başlıklar
- ENTERPRISE-BLUEPRINT.md — İleri hedef mimari
- Motion & Animation Craft
- Component Building Principles
- UI-MAP.md — Ekranda gördüğün şey hangi dosyada
- Design & Taste — a merged skill for Claude Code / Cowork
- himon Footer — ÖLÇÜLEN değerler (tahmin değil)
- CONVENTIONS.md — Bu projede nasıl çalışılır
- PROJECT.md — Vizyon & Kapsam
- The Animation Decision Framework
- clip-path for Animation
- Performance Rules
- Gesture and Drag Interactions
- TESTING.md — Doğrulama stratejisi
- DEFINITION-OF-DONE.md — Kalite kapıları
- 03-02 SUMMARY — Footer & Layout Shell
- CSS Transform Mastery
- The Sonner Principles (Building Loved Components)
- Spring Animations
- Pre-Flight & Review
- design/references — Tasarım Referansları
- ARCHITECTURE.md — Mimari kararlar
- Faz 2 · Plan 01 — SUMMARY
- 03-01 SUMMARY — Header & Navigasyon
- Core Philosophy
- Debugging Animations
- STACK.md — 🔒 Kilitli teknoloji yığını
- catalog-view.tsx
- shared-element-gallery.tsx
- AGENTS.md
- inbox/README.md
- eslint.config.mjs
- CONCERNS.md
- postcss.config.mjs
- index.ts
- framer-motion
- header.tsx
- site.ts
- machine-detail.tsx
- Graph Report - ozdemir-makine-web  (2026-09-09)
- blog-section.tsx
- category-cards.tsx
- ai-search-input.tsx
- Faz 7 — Sanity CMS: Makine + Blog + Galeri + Ayarlar (Spec)
- arrow-fill-button.tsx
- react
- seed-content.ts
- about-section.tsx
- hero.tsx
- card.tsx
- app/page.tsx
- featured-machines.tsx
- button.tsx
- brands.tsx

## God Nodes (most connected - your core abstractions)
1. `Communities (56 total, 5 thin omitted)` - 52 edges
2. `framer-motion` - 16 edges
3. `compilerOptions` - 16 edges
4. `react` - 15 edges
5. `Motion & Animation Craft` - 15 edges
6. `next` - 14 edges
7. `CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni)` - 14 edges
8. `Web Interface Guidelines — pre-ship denetim kapısı` - 12 edges
9. `Interaction Design` - 11 edges
10. `Phase Details` - 11 edges

## Surprising Connections (you probably didn't know these)
- `generateMetadata()` --calls--> `getPostBySlug()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/sanity/lib/posts.ts
- `BlogDetailPage()` --calls--> `getPostBySlug()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/sanity/lib/posts.ts
- `IkinciElMakinelerPage()` --calls--> `getMachines()`  [EXTRACTED]
  src/app/ikinci-el-makineler/page.tsx → src/sanity/lib/machines.ts
- `IletisimPage()` --calls--> `getMachineBySlug()`  [EXTRACTED]
  src/app/iletisim/page.tsx → src/sanity/lib/machines.ts
- `generateMetadata()` --calls--> `getMachineBySlug()`  [EXTRACTED]
  src/app/makineler/[slug]/page.tsx → src/sanity/lib/machines.ts

## Import Cycles
- None detected.

## Communities (77 total, 7 thin omitted)

### Community 0 - "layout.tsx"
Cohesion: 0.06
Nodes (28): lenis, geistMono, geistSans, metadata, Footer(), Header(), SiteChrome(), ContactSection() (+20 more)

### Community 1 - "package.json"
Cohesion: 0.06
Nodes (31): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+23 more)

### Community 2 - "Design Read, Dials & Honest Design Systems"
Cohesion: 0.07
Nodes (28): 0.A Read these signals first, 0.B Output a one-line "Design Read" before generating, 0. BRIEF INFERENCE (Read the Room Before Anything Else), 0.C If the brief is ambiguous, ask one question, do not guess, 0.D Anti-Default Discipline, 1.A Dial Inference (design read → dial values), 1.B Use-Case Presets, 1.C How the Dials Drive Output (+20 more)

### Community 3 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 5 - "Interaction Design"
Cohesion: 0.11
Nodes (17): CSS Anchor Positioning, Destructive Actions: Undo > Confirm, Dropdown & Overlay Positioning, Fixed Positioning Fallback, Focus Rings: Do Them Right, Form Design: The Non-Obvious, Gesture Discoverability, Interaction Design (+9 more)

### Community 6 - "Özdemir Makine — Design System (Token Kontratı)"
Cohesion: 0.12
Nodes (16): 1. Primitive (ham değerler), 2. Semantic (rol / amaç), 3. Tipografi (Geist — himon ölçüleri), 4. Spacing & ritim, 5. Radius, 6. Motion, 7. Component spec — Pill Buton (himon CTA), Kapı 1 — `design-taste` (zevk) (+8 more)

### Community 7 - "Bölüm A — Referanstan çıkarım"
Cohesion: 0.12
Nodes (15): A0. Referansı seç, A1. TEK BÖLÜM — tüm sayfa asla, A2. Görseli oku, tarif et — koda geçmeden önce, A2a. ⭐ ÖLÇ, TAHMİN ETME — canlı referanstan computed style çek, A2b. (Opsiyonel) Ölçü çıkarma aracı — screenshot-to-code, A3. Karar al, kod alma, A4. İçerik eşlemesi, Bölüm A — Referanstan çıkarım (+7 more)

### Community 8 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, @base-ui/react, class-variance-authority, cn, framer-motion, lenis, lucide-react, next (+10 more)

### Community 9 - "Phase Details"
Cohesion: 0.12
Nodes (15): Overview, Phase 10: Entegrasyon & Yayın, Phase 1: Keşif & Bağlam Mühendisliği, Phase 2: Design System, Phase 3: Global Layout & Navigasyon, Phase 4: Ana Sayfa, Phase 5: Makine Kataloğu, Phase 6: Kurumsal & Diğer Sayfalar (+7 more)

### Community 10 - "Design & Taste"
Cohesion: 0.13
Nodes (14): Avoid AI slop, Color, Copy, Core design rules, Design & Taste, How to execute a task, Interaction & components (full detail in `reference/interaction-states.md`), Layout & spacing (+6 more)

### Community 11 - "CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni)"
Cohesion: 0.06
Nodes (32): CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni), 🎨 Design Disiplini — ANTI-SLOP (sıfır tolerans), 🏅 Kalite Protokolü — her çıktı bu çıtadan geçer, 🧭 Karar Matrisi — hangi durumda ne yapılır, 📂 Klasör Haritası, 🚫 Kod tarafı yasaklar, 🔗 Koordinasyon, 🧠 Planlama Katmanı — bağlamın yaşadığı yer (+24 more)

### Community 12 - "Web Interface Guidelines — pre-ship denetim kapısı"
Cohesion: 0.15
Nodes (12): 1. Etkileşim, 2. Animasyon (bu projede Framer Motion — motion token'ları `design/design-system.md`), 3. Yerleşim, 4. İçerik, 5. Formlar (teklif formu / iletişim formu için kritik), 6. Performans, 7. Görsel detay, 8. Metin yazımı — Özdemir uyarlaması (+4 more)

### Community 13 - "Faz 2 · Plan 01 — Design System"
Cohesion: 0.15
Nodes (12): Amaç, Bağlam (kilitli kararlar), Doğrulama (bu plan biterse şunlar DOĞRU olmalı), Faz 2 · Plan 01 — Design System, Görevler, Kapsam, Notlar, T1 — `design/design-system.md` token kontratı (+4 more)

### Community 14 - "Part 2 — AI Tells (from taste-skill)"
Cohesion: 0.17
Nodes (11): 9.A Visual & CSS, 9.B Typography, 9.C Layout & Spacing, 9.D Content & Data ("Jane Doe" Effect), 9.E External Resources & Components, 9.F Production-Test Tells (banned outright), 9.G EM-DASH BAN (the single most-violated Tell), Anti-Slop Catalogue (+3 more)

### Community 15 - "lib/machines.ts"
Cohesion: 0.06
Nodes (40): next-sanity, @sanity/image-url, @sanity/vision, BlogDetailPage(), generateMetadata(), generateStaticParams(), ptComponents, revalidate (+32 more)

### Community 16 - "Fonksiyonel (FR)"
Cohesion: 0.18
Nodes (10): Ana sayfa & kurumsal, Açık uçlar (netleşecek), Dönüşüm & entegrasyon, Fonksiyonel (FR), İçerik yönetimi, Kapsam dışı (out — şimdilik), Makine kataloğu (çekirdek iş), Non-Fonksiyonel (NFR) (+2 more)

### Community 17 - "⏭️ CONTINUE HERE — Oturum Devir (2026-09-09)"
Cohesion: 0.20
Nodes (9): ANA SCROLL PLANI (homepage bölüm sırası — himon dili + Özdemir işlevi), ⏭️ CONTINUE HERE — Oturum Devir (2026-09-09), HERO durumu (`src/components/sections/hero.tsx`) — ✅, Hero — Talha'nın bekleyen kararları (ufak tefek), INTRODUCTION ✅ (commit sonrası), Neredeyiz, ORTAM NOTLARI, ⏭️ SIRADAKİ: SERVİS KARTLARI (4'lü) — himon 3. kalıp (+1 more)

### Community 18 - "LEARNINGS.md — Kalıcı dersler"
Cohesion: 0.20
Nodes (9): L-1 Temeli önce kur, sonra kod yaz, L-2 Türkçe metni curl ile dış servise gönderme, L-3 Dış yüzeye yazarken kısa yaz, L-4 Anomali görünce bir seviye alta in, L-5 Yeni araç ekleme, mevcut yığını kanıtla, L-6 Referans canlıysa ölçmek varken tahmin etme, L-7 Revizeyi ucuz katmanda yap, L-8 Öğrenilen şey skill'e yazılmazsa öğrenilmemiştir (+1 more)

### Community 19 - "Project Learning — öğrendiğini kalıcı davranışa çevir"
Cohesion: 0.22
Nodes (8): Anti-kalıp, Ders yazma formatı, Harita güncelleme — `UI-MAP.md`, Kod grafiği — ne zaman, Ne zaman tetiklenir, Oturum sonu kontrol listesi, Project Learning — öğrendiğini kalıcı davranışa çevir, Yönlendirme tablosu — ders nereye yazılır

### Community 20 - "himon → Özdemir Makine — Tasarım Dili Analizi & Uyarlama"
Cohesion: 0.22
Nodes (8): Bölüm kalıpları (yeniden kuracaklarımız), Faz 2'ye devir (karar bekleyenler), Genel karakter, himon → Özdemir Makine — Tasarım Dili Analizi & Uyarlama, Renk sistemi (himon), Tipografi (himon — GERÇEK ÖLÇÜLER, computed style'dan), Özdemir içerik eşlemesi (mevcut siteden — `design/references/canli-site/`), Şekil & hareket dili

### Community 21 - "Communities (56 total, 5 thin omitted)"
Cohesion: 0.04
Nodes (52): Communities (56 total, 5 thin omitted), Community 0 - "header.tsx", Community 10 - "Design & Taste", Community 11 - "CLAUDE.md — Özdemir Makine Web Sitesi (Proje Beyni)", Community 12 - "Web Interface Guidelines — pre-ship denetim kapısı", Community 13 - "Faz 2 · Plan 01 — Design System", Community 14 - "Part 2 — AI Tells (from taste-skill)", Community 15 - "STATE.md — Proje Hafızası" (+44 more)

### Community 22 - "Doldurulacak başlıklar"
Cohesion: 0.22
Nodes (8): CONTENT-INVENTORY.md — İçerik envanteri, Diller, Doldurulacak başlıklar, Formlar, Makineler / ürünler, Sayfalar, Tekrar eden bölümler, Varlıklar

### Community 23 - "ENTERPRISE-BLUEPRINT.md — İleri hedef mimari"
Cohesion: 0.18
Nodes (10): 1. İçerik yönetimi — Sanity CMS (Faz 9), 2. Çok dillilik, 3. Form ve CRM — Zoho tam entegrasyonu, 4. Analitik ve davranış ölçümü — Google Analytics, 5. Performans olgunluğu, 6. Ürün kataloğu derinliği, 7. Test olgunluğu, 8. Üye girişi / hesap (mevcut sitede var) (+2 more)

### Community 24 - "Motion & Animation Craft"
Cohesion: 0.25
Nodes (7): Accessibility, Motion & Animation Craft, prefers-reduced-motion, Review Checklist, Review Format (Required), Stagger Animations, Touch device hover states

### Community 25 - "Component Building Principles"
Cohesion: 0.25
Nodes (8): Animate enter states with @starting-style, Buttons must feel responsive, Component Building Principles, Make popovers origin-aware, Never animate from scale(0), Tooltips: skip delay on subsequent hovers, Use blur to mask imperfect transitions, Use CSS transitions over keyframes for interruptible UI

### Community 26 - "UI-MAP.md — Ekranda gördüğün şey hangi dosyada"
Cohesion: 0.25
Nodes (7): Bilinen geçici / bekleyen, Global — her sayfada görünen, İçerik, Nasıl kullanılır, Sayfalar, Stil ve token, UI-MAP.md — Ekranda gördüğün şey hangi dosyada

### Community 27 - "Design & Taste — a merged skill for Claude Code / Cowork"
Cohesion: 0.29
Nodes (6): Credits & license, Design & Taste — a merged skill for Claude Code / Cowork, Install, Structure, Usage, Where it comes from

### Community 28 - "himon Footer — ÖLÇÜLEN değerler (tahmin değil)"
Cohesion: 0.29
Nodes (6): himon Footer — ÖLÇÜLEN değerler (tahmin değil), Renk, Tipografi — hepsi ölçüldü, Yapı — dikey 4 blok, Ölçülmeyenler — hâlâ karar/gözlem gerekli, Özdemir'e uyarlama — eşleme tablosu

### Community 29 - "CONVENTIONS.md — Bu projede nasıl çalışılır"
Cohesion: 0.29
Nodes (6): CONVENTIONS.md — Bu projede nasıl çalışılır, Değişiklik akışı, Değiştirilemez, Dış yazımlar, İsimlendirme, Token disiplini

### Community 30 - "PROJECT.md — Vizyon & Kapsam"
Cohesion: 0.29
Nodes (6): Başarı Metrikleri, Hedef Kullanıcı, Kısıtlar, Problem, PROJECT.md — Vizyon & Kapsam, Çözüm

### Community 31 - "The Animation Decision Framework"
Cohesion: 0.33
Nodes (6): 1. Should this animate at all?, 2. What is the purpose?, 3. What easing should it use?, 4. How fast should it be?, Perceived performance, The Animation Decision Framework

### Community 32 - "clip-path for Animation"
Cohesion: 0.33
Nodes (6): clip-path for Animation, Comparison sliders, Hold-to-delete pattern, Image reveals on scroll, Tabs with perfect color transitions, The inset shape

### Community 33 - "Performance Rules"
Cohesion: 0.33
Nodes (6): CSS animations beat JS under load, CSS variables are inheritable, Framer Motion hardware acceleration caveat, Only animate transform and opacity, Performance Rules, Use WAAPI for programmatic CSS animations

### Community 34 - "Gesture and Drag Interactions"
Cohesion: 0.33
Nodes (6): Damping at boundaries, Friction instead of hard stops, Gesture and Drag Interactions, Momentum-based dismissal, Multi-touch protection, Pointer capture for drag

### Community 35 - "TESTING.md — Doğrulama stratejisi"
Cohesion: 0.33
Nodes (5): Ne test edilmez, Ne zaman test eklenecek, TESTING.md — Doğrulama stratejisi, Şimdi nasıl doğruluyoruz, Şu anki durum

### Community 36 - "DEFINITION-OF-DONE.md — Kalite kapıları"
Cohesion: 0.33
Nodes (5): DEFINITION-OF-DONE.md — Kalite kapıları, Faz sonu, Her kod işi için, Her UI işi için (sırayla), Yayın öncesi (Faz 5)

### Community 37 - "03-02 SUMMARY — Footer & Layout Shell"
Cohesion: 0.33
Nodes (5): 03-02 SUMMARY — Footer & Layout Shell, Doğrulama, Faz 3 kapanışı, Kararlar / sapmalar, Ne yapıldı

### Community 38 - "CSS Transform Mastery"
Cohesion: 0.40
Nodes (5): 3D transforms for depth, CSS Transform Mastery, scale() scales children too, transform-origin, translateY with percentages

### Community 39 - "The Sonner Principles (Building Loved Components)"
Cohesion: 0.40
Nodes (5): Asymmetric enter/exit timing, Cohesion matters, Review your work the next day, The opacity + height combination, The Sonner Principles (Building Loved Components)

### Community 40 - "Spring Animations"
Cohesion: 0.40
Nodes (5): Interruptibility advantage, Spring Animations, Spring-based mouse interactions, Spring configuration, When to use springs

### Community 41 - "Pre-Flight & Review"
Cohesion: 0.40
Nodes (4): Full Pre-Flight Matrix (from taste-skill), Motion Review Checklist (from emil), Pre-Flight & Review, Review Format (required when reviewing UI code)

### Community 42 - "design/references — Tasarım Referansları"
Cohesion: 0.40
Nodes (4): design/references — Tasarım Referansları, Nasıl, Ne koyacaksın, Sonra

### Community 43 - "ARCHITECTURE.md — Mimari kararlar"
Cohesion: 0.40
Nodes (4): ARCHITECTURE.md — Mimari kararlar, Katmanlar, Kurallar, Sayfa şekli

### Community 44 - "Faz 2 · Plan 01 — SUMMARY"
Cohesion: 0.40
Nodes (4): Doğrulama, Faz 2 · Plan 01 — SUMMARY, Notlar / devir, Yapıldı

### Community 45 - "03-01 SUMMARY — Header & Navigasyon"
Cohesion: 0.40
Nodes (4): 03-01 SUMMARY — Header & Navigasyon, Doğrulama, Kararlar / sapmalar, Ne yapıldı

### Community 46 - "Core Philosophy"
Cohesion: 0.50
Nodes (4): Beauty is leverage, Core Philosophy, Taste is trained, not innate, Unseen details compound

### Community 47 - "Debugging Animations"
Cohesion: 0.50
Nodes (4): Debugging Animations, Frame-by-frame inspection, Slow motion testing, Test on real devices

### Community 48 - "STACK.md — 🔒 Kilitli teknoloji yığını"
Cohesion: 0.50
Nodes (3): Henüz kurulu olmayanlar (bilinçli), STACK.md — 🔒 Kilitli teknoloji yığını, Sürüm tuzağı

### Community 49 - "catalog-view.tsx"
Cohesion: 0.07
Nodes (36): nextConfig, next, clean(), client, envText, run(), token, IkinciElMakinelerPage() (+28 more)

### Community 50 - "shared-element-gallery.tsx"
Cohesion: 0.14
Nodes (14): GaleriPage(), metadata, revalidate, GallerySection(), ratioClass, Gallery(), GalleryContext, GalleryContextType (+6 more)

### Community 56 - "index.ts"
Cohesion: 0.19
Nodes (11): sanity, ETIKETLER, galleryItem, schema, ALT_KATEGORILER, KATEGORILER, machine, MARKALAR (+3 more)

### Community 57 - "framer-motion"
Cohesion: 0.22
Nodes (12): framer-motion, buildVariants(), Reveal(), RevealGroup(), RevealItem(), EASE, EASE_SOFT, fade (+4 more)

### Community 58 - "header.tsx"
Cohesion: 0.15
Nodes (6): lucide-react, swatches, typeScale, EASE, mainNav, NavItem

### Community 59 - "site.ts"
Cohesion: 0.22
Nodes (8): metadata, BrandsSection(), BrandCard(), Brand, brandsContent, introContent, Machine, ServiceItem

### Community 60 - "machine-detail.tsx"
Cohesion: 0.24
Nodes (7): cn, EASE, PLACEHOLDER, ProductCard(), ProductCardProps, Badge(), badgeVariants

### Community 61 - "Graph Report - ozdemir-makine-web  (2026-09-09)"
Cohesion: 0.18
Nodes (10): Community Hubs (Navigation), Corpus Check, God Nodes (most connected - your core abstractions), Graph Freshness, Graph Report - ozdemir-makine-web  (2026-09-09), Import Cycles, Knowledge Gaps, Suggested Questions (+2 more)

### Community 62 - "blog-section.tsx"
Cohesion: 0.27
Nodes (8): BlogPage(), metadata, revalidate, BlogSection(), BlogCard(), blogContent, BlogPost, getPosts()

### Community 63 - "category-cards.tsx"
Cohesion: 0.18
Nodes (8): BODY, cardReveal, container, EASE, GRADIENTS, Tone, CategoryCard, categoryCardsContent

### Community 64 - "ai-search-input.tsx"
Cohesion: 0.20
Nodes (4): EASE, MachineSearch(), MachineSearchProps, searchContent

### Community 65 - "Faz 7 — Sanity CMS: Makine + Blog + Galeri + Ayarlar (Spec)"
Cohesion: 0.22
Nodes (8): Amaç, Doğrulama (tarayıcı, 2026-09-11), Faz 7 — Sanity CMS: Makine + Blog + Galeri + Ayarlar (Spec), Genişleme — Blog + Galeri + Site Ayarları (2026-09-11), Kalan, Kararlar (kilitli), Mimari, src/sanity alias kuralı

### Community 66 - "arrow-fill-button.tsx"
Cohesion: 0.28
Nodes (5): EASE, Introduction(), ArrowFillButton(), ArrowFillButtonOwnProps, ArrowFillButtonProps

### Community 67 - "react"
Cohesion: 0.25
Nodes (5): react, EASE, GRADIENTS, Services(), servicesContent

### Community 68 - "seed-content.ts"
Cohesion: 0.29
Nodes (7): BLOG_META, bodyFromText(), client, envText, run(), token, siteConfig

### Community 69 - "about-section.tsx"
Cohesion: 0.32
Nodes (4): metadata, AboutSection(), MediaFrame(), aboutContent

### Community 70 - "hero.tsx"
Cohesion: 0.25
Nodes (7): container, EASE, fadeUp, Hero(), heroBtnSize, lineReveal, heroContent

### Community 72 - "app/page.tsx"
Cohesion: 0.38
Nodes (5): HomePage(), Brandline(), DISTRIBUTORS, FeaturedMachines(), getFeaturedMachines()

### Community 73 - "featured-machines.tsx"
Cohesion: 0.33
Nodes (5): CategoryCards(), cardReveal, container, EASE, featuredMachinesContent

### Community 74 - "button.tsx"
Cohesion: 0.67
Nodes (3): class-variance-authority, Button(), buttonVariants

## Knowledge Gaps
- **549 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+544 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 623 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `framer-motion` connect `framer-motion` to `ai-search-input.tsx`, `package.json`, `arrow-fill-button.tsx`, `react`, `layout.tsx`, `hero.tsx`, `featured-machines.tsx`, `catalog-view.tsx`, `shared-element-gallery.tsx`, `header.tsx`, `machine-detail.tsx`, `category-cards.tsx`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `ai-search-input.tsx`, `package.json`, `arrow-fill-button.tsx`, `layout.tsx`, `hero.tsx`, `card.tsx`, `catalog-view.tsx`, `shared-element-gallery.tsx`, `framer-motion`, `header.tsx`, `machine-detail.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **Why does `next` connect `catalog-view.tsx` to `layout.tsx`, `package.json`, `about-section.tsx`, `lib/machines.ts`, `shared-element-gallery.tsx`, `site.ts`, `blog-section.tsx`?**
  _High betweenness centrality (0.022) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _549 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06341463414634146 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._
- **Should `Design Read, Dials & Honest Design Systems` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._