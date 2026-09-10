# STATE.md — Proje Hafızası

> Her oturum başında **ilk okunan** dosya. Ayrıntılı devir: `.continue-here.md`.

## 📍 Şu An (2026-09-10 — Faz 6 başladı: İletişim sayfası ✅)
- **✅ İletişim + Teklif sayfası (`/iletisim`) TAMAM (UI).** himon `/contact` (TALK WITH US) uyarlaması, canlı ölçümle (Geist 70px display-xl / -0.04em, mono kicker etiketler, 2 kolon split). **Tek form iki yüzey:** genel `/iletisim` + `/iletisim?makine=<productCode>` teklif (başlık "FİYAT TEKLİFİ ALIN" olur + form üstünde makine bağlam kartı + mesaj prefill). Native HTML5 validasyon, başarı ekranı, mobil tek-kolon, konsol temiz, tsc/eslint temiz.
  - Dosyalar: `content/site.ts→contactContent` · `ui/contact-form.tsx` (client, gizli Zoho alanları) · `sections/contact-section.tsx` (server) · `app/iletisim/page.tsx` (async searchParams).
  - **🔑 Zoho hazırlığı:** formda gizli alanlar `makineKodu` / `leadSource` ("Website — Makine Teklifi" | "İletişim") / `kampanya` baştan dolu bırakıldı. Gönderim şu an client stub → `TODO(Zoho)` (backend fazı).
- **⏭️ SIRADAKİ (Faz 6 devam):** Header yeniden yapısı (Hakkımızda · Makinalar ▾ dropdown · Markalar · Blog · Galeri · İletişim + sağda Teklif Al pill) → sonra sayfaları tek tek himon'dan uyarla (Hakkımızda→Markalar→Blog→Galeri). Her sayfa: Talha himon ekranı atar → çıkar/token/tarayıcı-doğrula.
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
- **Altyapı:** 4 kapılı tasarım akışı (`.claude/skills/`: design-taste → reference-parity → web-interface-guidelines → DoD → project-learning) · ölçüm tekniği (Playwright `getComputedStyle`, L-6, `himon-footer-measured.md`) · `UI-MAP.md` · Graphify (`.planning/graphs/`, 554 node/549 edge) · GitHub `Tguleryuz52/Ozdemir-Makine-Web`.

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
