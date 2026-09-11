# STATE.md — Proje Hafızası

> Her oturum başında **ilk okunan** dosya. Ayrıntılı devir: `.continue-here.md`.

## 📍 Şu An (2026-09-11 — Faz 7: Sanity CMS — Makine + Blog + Galeri + Ayarlar ✅ + harita güncel)
- **✅ Gömülü Sanity Studio (`/studio`) + `machine` şeması + 17 makine migration + site bağlandı.** Makine ekle/çıkar artık Studio'dan, kod yok. Uçtan uca tarayıcıda doğrulandı: katalog 17 ürün (filtre/sayılar doğru), anasayfa vitrin 3 kart, detay tam (açıklama+spec+format), konsol temiz.
  - **Proje:** Sanity `Ozdemir Makine` — projectId `qgzvu8g9`, dataset `production`. Env `.env.local` (git-dışı): PROJECT_ID/DATASET/API_VERSION + `SANITY_API_READ_TOKEN` (Editor). Token rotate edildi (ilk sohbette düz metin sızmıştı → yeni üretildi).
  - **Kod:** `src/sanity/` (env · lib/client · lib/image · lib/machines · schemaTypes/machine · structure · config) + root `sanity.config.ts`/`sanity.cli.ts` + `app/studio/[[...tool]]/{page,Studio}.tsx`. `next.config`→cdn.sanity.io. `layout` içinde `SiteChrome` (client gate) header/footer/smooth-scroll'ü `/studio`'da gizler.
  - **⚠️ Fix (Next16/Turbopack):** config'i doğrudan server page'de import edince `swr` `react-server` sürümüne düşüp "default export yok" patlıyor → Sanity import'u `Studio.tsx` **`"use client"`** sınırına alındı. Ayrıca dataset private → read client'a **server-only token** + `perspective:"published"`.
  - **Şema `machine` (Türkçe alanlar):** baslik·slug·marka(dropdown)·model·urunKodu·yil·format·baskiAdedi·grup·durumRozeti·kategori·altKategori·vitrin·fiyatSorunuz·fiyat·gorseller·pdf·aciklama·oneCikanOzellikler·notlar·ekOzellikler(serbest ad+değer).
  - **Veri katmanı `src/sanity/lib/machines.ts`:** GROQ→`MachineDoc` map (Sanity alanları→bileşen şekli), getMachines/Featured/BySlug/Slugs/Related, ISR `revalidate:60`+tag `machine`. Tüketiciler **prop-driven** oldu (catalog-view · machine-detail · featured-machines · 4 katalog rota + [slug] + anasayfa), görünüm birebir aynı.
  - **Migration:** `scripts/migrate-machines.ts` (`npx tsx`), idempotent `_id=machine.<id>`, published. Görsel/PDF henüz yok → Studio'dan yüklenecek.
- **✅ Studio netleştirme + teklif akışı fix (2026-09-11):** makine şeması örnekli açıklama/uyarı/önizleme; sol menü **grup klasörleri** (📗Sıfır 📘İkinci El 🔧Yedek + Tüm). `client.ts` **`useCdn:false`** (ISR'de taze; ziyaretçi hızı etkilenmez — CDN gecikmesi çözüldü). Detay "Fiyat Teklifi Al" → `?makine=<slug>`; iletişim makineyi **Sanity'den** bulur (eski `productCode` boş takılması giderildi). PDF butonu `pdfUrl` varsa görünür (ölü buton yok). Form onay satırı → veri-güvenliği ✓checkmark'ları.
- **✅ Blog + Galeri + Site Ayarları Sanity'de (2026-09-11 — Talha "tam profesyonel" isteği):**
  - Şemalar: `post` (blog + Portable Text `icerik`), `galleryItem` (foto/etiket/sıra), `siteSettings` (singleton: email/tel/whatsapp/adresTR/DE/sosyal). Studio menüsü: ✍️Blog · 🖼️Galeri · ⚙️Site Ayarları.
  - Data: `lib/posts.ts` · `lib/gallery.ts` · `lib/settings.ts` (hepsi statik fallback'li → site asla boşalmaz). Tüketiciler: `/blog` liste + **`/blog/[slug]` YENİ detay (Portable Text, SSG)** · `/galeri` (boşsa placeholder) · footer + contact-section artık `getSiteSettings`'ten.
  - Yeni dep: `@portabletext/react@^7`. Seed: `scripts/seed-content.ts` (Site Ayarları + 3 örnek blog). **build temiz (35 sayfa)**, tsc/eslint temiz (preloader + productcard pre-existing lint borcu da temizlendi).
  - **Graphify haritası güncellendi (LLM'siz `graphify update`):** 554→**905 node**, 549→**1156 edge**, 77 topluluk. `.planning/graphs/` kanonik + `graphify-out/` (git-dışı). Community isim tazeleme (LLM) bilerek atlandı (token). İleride Obsidian bağlanacak.
- **⏭️ SIRADAKİ (Faz 7 kalan):** (1) webhook revalidate (Studio "Yayınla" → prod anında; tag machine/post/gallery/settings) (2) Studio'dan gerçek görsel/PDF + galeri fotoğrafı yükleyip render testi (3) Vercel deploy: env + prod domain CORS. Sonra: Markalar → Sanity (logo referansı), Zoho form.
- **Kararlar:** Sanity blueprint'te Faz 9'du → Talha isteğiyle öne çekildi. Marka şimdilik dropdown (Markalar sayfası Sanity'ye alınınca logolu referansa yükselecek); kategori sabit (kodda); özellikler sabit+esnek.

## 📍 Önceki (2026-09-10 — Faz 6: İletişim sayfası ✅)
- **✅ İletişim + Teklif sayfası (`/iletisim`) TAMAM (UI).** himon `/contact` (TALK WITH US) uyarlaması, canlı ölçümle (Geist 70px display-xl / -0.04em, mono kicker etiketler, 2 kolon split). **Tek form iki yüzey:** genel `/iletisim` + `/iletisim?makine=<productCode>` teklif (başlık "FİYAT TEKLİFİ ALIN" olur + form üstünde makine bağlam kartı + mesaj prefill). Native HTML5 validasyon, başarı ekranı, mobil tek-kolon, konsol temiz, tsc/eslint temiz.
  - Dosyalar: `content/site.ts→contactContent` · `ui/contact-form.tsx` (client, gizli Zoho alanları) · `sections/contact-section.tsx` (server) · `app/iletisim/page.tsx` (async searchParams).
  - **🔑 Zoho hazırlığı:** formda gizli alanlar `makineKodu` / `leadSource` ("Website — Makine Teklifi" | "İletişim") / `kampanya` baştan dolu bırakıldı. Gönderim şu an client stub → `TODO(Zoho)` (backend fazı).
- **✅ Header yeniden yapısı TAMAM.** Yeni nav: `Hakkımızda · Makineler ▾ · Markalar · Blog · Galeri · İletişim` + Teklif Al pill. **Makineler dropdown** (masaüstü hover kartı: Tüm/Sıfır/İkinci El/Yedek + mobil accordion). `mainNav` artık `children`'lı (`site.ts`). Footer `siteMapNav` düz listeye çevrildi. Placeholder sayfalar kondu (`/kurumsal /markalar /blog /galeri` → `layout/page-placeholder.tsx`, on-marka "hazırlanıyor") — 404 yok, tek tek gerçek içerikle değişecek.
- **✅ 30 yıl düzeltmesi (site geneli).** "20+" → "30" (hero/intro/stats/metadata/design-system). Talha: 30. yıldayız. Kurucu = **Murat Özdemir (Gümrük Müşaviri)**.
- **✅ Hakkımızda (`/kurumsal`) TAMAM.** himon /about-us uyarlaması, 5 bölüm: (1) başlık + geniş görsel (2) firma/hikaye split + 3'lü görsel galerisi (3) ⭐Kurucu **Murat Özdemir** (foto + faktüel bio, uydurma alıntı YOK) (4) Vizyon & Misyon (5) **Ofisler & Tesisler** (5 lokasyon — CTA yerine, footer CTA'yı tekrar etmesin diye Özdemir'e özgü güven öğesi). Hizmetler ayrı liste YOK (karar). Scroll-reveal (`Reveal`), gerçek içerik (site.ts `aboutContent`).
  - **Görsel slotları:** `ui/media-frame.tsx` — `src` boşken placeholder, dolunca `next/image`. Slotlar: hero (16:10), galeri ×3 (4:3), kurucu portre (4:5). Talha görsel atınca `aboutContent`'te `src` doldur. Marka görselleri çok gelecek → bol slot.
  - ⚠️ Reveal doğrulama notu: in-app browser pane gizliyken rAF+IntersectionObserver donuyor → otomasyonda reveal opacity 0 kalıyor (kod DEĞİL, ortam). Gerçek tarayıcıda çalışıyor (statement 0.58'de canlı yakalandı). İçerik+layout doğrulandı.
- **⏭️ SIRADAKİ: Markalar → Blog → Galeri** (placeholder'lar duruyor). Her biri himon'dan uyarlanacak; Talha ekran/görsel atar.
- **Backend ufku (Talha notu → ENTERPRISE-BLUEPRINT §1,3,4,8):** Sanity (Framer-CMS kolaylığında makine CRUD, Talha yeni→onboarding şart) · Zoho (tüm lead akışı) · GA (kim hangi makineye bakmış) · üye girişi. Şimdilik frontend odak.

## 📍 Önceki (Faz 5 — Katalog + Detay ✅)
- **✅ Faz 5 (Makine Katalogu + Detay) TAMAM.**
  - **Katalog** `/makineler` + kategori rotaları (`/sifir-makineler`, `/ikinci-el-makineler`, `/yedek-parcalar`): editoryal header + canlı sayaç · sol sidebar (Markalar/Model/Durum accordion + bağımsız scroll) · **kategori solda seçilir → alt kategoriler üstte pill** (Özdemir taksonomisi; Ofset Baskı→renk sayısı) · anlık client filtre + URL sync · chip · empty · mobil drawer · Framer `layout` canlı grid.
  - **Detay** `/makineler/[slug]` (17 SSG): galeri (placeholder) + specs tablosu + accordion (Açıklama/Özellikler/Notlar) + Benzer Makineler + Instagram bölümü. CTA'lar **ArrowFillButton** (Fiyat Teklifi Al + PDF Döküman → `/iletisim?makine=<kod>`).
  - **Veri:** `src/content/machines.ts` (17 mock, Sanity şekliyle birebir) + `categoryTree` + `machineDetails` map. `ProductCard.year` opsiyonel.
- **⏭️ SIRADAKİ: Faz 6 — İletişim + Teklif sayfası.** `/iletisim` YOK → tüm teklif/CTA/nav linkleri 404. Form (`?makine=` prefill) + gönderim: **Sanity kaydı + Resend e-posta** (backend; Resend key / Sanity projesi gerekir). Kurumsal/Galeri/Referanslar rotaları da eksik.
- **Talha kuralları:** token az yak · her CTA'da ArrowFillButton · animasyonlar önemli (sonra cila turu) · müşteri-önce (aradığını hemen bulsun) · düzenli GSD faz takibi.

## ✅ Tamamlanan Fazlar
- **Faz 1 (Keşif):** canlı site + himon analiz edildi → 5 bölüm kalıbı, renk/tipografi/hareket. Ekranlar `design/references/`, analiz `himon-analysis.md`.
- **Faz 2 (Design System):** aksan mavi `#234D9C` + Geist/Geist Mono (kilitli). `design-system.md` token kontratı + `globals.css`. tsc/eslint/build temiz.
- **Faz 3 (Layout & Nav):** Header (mobil menü + a11y) + Footer (himon CTA + kolon grid + legal) + layout shell. Playwright denetim (1440/390/mobil) geçti. Ekranlar `.work/shots/faz3/`.
- **Faz 4 (Ana Sayfa):** Hero + Introduction + Kategori kartları (folder-notch) + arama çubuğu (`ui/ai-search-input`) + Öne Çıkan Makineler vitrini + Services + Brandline. (Talha iteratif düzenledi; vitrin `featured-machines` içinde `CategoryCards`'ı sarıyor.)
- **Faz 5 (Katalog + Detay):** yukarıda "Şu An"da.
- **Altyapı:** 4 kapılı tasarım akışı (`.claude/skills/`: design-taste → reference-parity → web-interface-guidelines → DoD → project-learning) · ölçüm tekniği (Playwright `getComputedStyle`, L-6, `himon-footer-measured.md`) · `UI-MAP.md` · Graphify (`.planning/graphs/`, 905 node/1156 edge — 2026-09-11 güncel) · GitHub `Tguleryuz52/Ozdemir-Makine-Web`.

## 🧠 Kararlar (tarihli)
- 2026-09-10: **Scroll reset fix (SİTE GENELİ, kritik).** Lenis kendi `targetScroll`'unu hatırlıyordu → yeni sayfa öncekinin konumundan başlıyordu. `ui/smooth-scroll.tsx`: `usePathname` + rota değişince `lenis.scrollTo(0,{immediate,force})`, `history.scrollRestoration='manual'`. Doğrulandı: nav öncesi 2500 → sonrası 0.
- 2026-09-10: **İletişim premium cila (himon ölçümüyle).** himon detay etiketi Geist **Sans 400** iken bizimki **Mono 500** idi ("bold farkı" buradandı) → detay+form etiketleri **soft Sans**'a çevrildi; değerler 17→19px medium (himon hiyerarşisi). Üst kicker ("İLETİŞİM") mono kaldı (marka aksanı). Telefon **çoklu ülke** (`contactContent.phoneCountries`, 23 ülke, TR default, ihracat için AB+Körfez+majör) → `telefonKodu` hidden alanla Zoho'ya gider. (Windows bayrak emojisini "TR"/"DE" harfi gösterir — kabul.)
- 2026-09-10: **Motion sadeleştirildi — SADECE smooth scroll.** Talha isteği: preloader + sayfa geçişi (yukarı açılma) KALDIRILDI (`app/template.tsx` silindi, `ui/preloader.tsx` dormant/import yok). Geri gelen tek efekt: **Lenis smooth scroll** (`ui/smooth-scroll.tsx`, layout'ta, `lerp:0.1` responsive/lag'siz) = "kuş tüyü akışkan" his. Blur'süz reveal engine (`ui/reveal.tsx` + `lib/motion.ts`) dormant, ileride section'larda kullanılabilir. Kural: hız = 1. öncelik.
- 2026-09-10: **Motion motoru + Lenis (YENİ BAĞIMLILIK).** `lib/motion.ts` (EASE_SOFT expo-out + fadeUp/scaleIn/stagger) + `ui/reveal.tsx` (`<Reveal>`/`<RevealGroup>`/`<RevealItem>`, whileInView once + blur, reduced-motion saygılı) + `ui/smooth-scroll.tsx` (**Lenis 1.3.26**, layout'ta global, reduced-motion'da kapalı). Gerekçe: himon premium hissi. Detay: CTA'lar ArrowFillButton + accordion Framer height-auto + galeri hover.
- 2026-09-10: **Motion — hız düzeltmesi (Lenis KALDIRILDI).** Lenis scroll'da lag/kasma hissi verdi → **native scroll**'a dönüldü (sıfır gecikme). Reveal'lerden **blur animasyonu çıkarıldı** (GPU jank kaynağı) → sadece y+opacity, tereyağı gibi. `Preloader` yazı yerine **logo (`/logo_main.png`) aşağıdan yukarı "dolma" (clip reveal) + perde yukarı** oldu. Sayfa geçişi `app/template.tsx` (fade+y, 0.5s). `smooth-scroll.tsx` kullanılmıyor (import yok; lenis paketi ileride diye duruyor). Kural: **hız = 1. öncelik**, ağır efekt yok.
- 2026-09-09: **Token tasarrufu — plugin/MCP budandı.** Kullanılmayan pluginler `~/.claude/settings.json`'da `false`: skill-creator, superdesign, claude-mem, semgrep, security-guidance. Kalan: frontend-design, ui-ux-pro-max, playwright, context7, code-review, typescript-lsp, superpowers. **Blender MCP → app UI'dan kapatılacak** (desktop config'i app geri yazıyor, elle edit tutmuyor). Kök çöp (.py/.png) → `.work/`. `graphify-out/` çift kopya (git-dışı) → `rm -rf graphify-out`. `arrow-fill-button` → `components/ui/` (6 import güncellendi, tsc/lint temiz). README ön kapıya çevrildi. CLAUDE.md'ye Kalite Protokolü eklendi. STATE.md budandı (9.4→~4KB).
- 2026-09-09: **Token tasarrufu — 1. tur.** effortLevel xhigh→medium · GSD skill 67→19 (`.disabled-gsd/`) · context7/zoho MCP disable · Graphify aktif · CLAUDE.md "Arama sırası" protokolü (Karar Matrisi→graphify→codebase→ast-grep→grep). repomix bilinçli atlandı (süregelen kendi proje).
- 2026-09-08: **CMS = Sanity.io** (KİLİTLİ, EN SON faz 9). `sanity@6`+`next-sanity@13`, React 19.2.8+Next 16 uyumlu. Faz 9'a kadar dokunulmaz.
- 2026-09-08: **FRONTEND-ÖNCE, Sanity-EN-SON.** 10 faz: 1-8 frontend, 9 Sanity, 10 yayın. İçerik önce tipli mock (`src/content`), Sanity şemasıyla aynı şekil → geçiş ucuz. Referans = canlı site (link, kaynak yok) + Framer.
- 2026-09-08: package.json temizlendi (`node-unrar-js`+`7zip-bin` kaldırıldı). `cn`/`@base-ui/react` korundu.
- 2026-09-07: **Stack KİLİTLİ:** Next.js + TS strict + Tailwind v4 + shadcn/ui + Framer Motion. Redesign (içerik/marka korunur). Proje Work Asistant DIŞINDA (temiz context). Test aracı Faz 2 sonrası (Playwright).

## ⏳ Bekleyen Polish (Faz 7'ye)
nav ortalama · İletişim kolonu tek-kicker · footer ghost "ÖZDEMİR" wordmark (logo gelince) · gerçek logo entegrasyonu (Talha atacak).

## ⚠️ Açık Sorular
- ozdemirmakine.com.tr içerik/sayfa envanteri çıkarılacak.
- Çok dilli (TR/EN/DE)? İhracat için muhtemel (audit TR/EN/DE diyor).
- **ozdmak.rar kilitli** (`1234` tutmadı) → makine görselleri + metinler bekliyor. Doğru parola gelince aktarılacak.
- Hero görseli (arşiv kilitli) · yeni logo (Talha atacak) · sepet/üye v1'de mi (şimdilik gizli).
- **Sanity:** `npx sanity login` + proje açılması, projectId env'e (Talha'nın tek dış adımı).
