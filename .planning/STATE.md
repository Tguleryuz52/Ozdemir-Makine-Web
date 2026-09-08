# STATE.md — Proje Hafızası

> Her oturum başında **ilk okunan** dosya. Kaldığın yeri buradan hatırla; sıfırdan başlama.

## 🔖 CHECKPOINT 2026-09-08 — `/clear` öncesi
> **Devir dosyası: `.planning/.continue-here.md`** (her şey orada — header durumu, bekleyen buton refactor'u, footer, ortam notları). Yeni oturumda önce onu oku.
> Özet: Faz 1-2 ✅ · Faz 3 header 🚧. Sıradaki: arrow-fill-button'ı boyut-bağımsız yap (ok dairesi taşıyor + hover "Al" kırpıyor) → header'da büyüt/himon'a oturt → footer.

## 📍 Son Durum (2026-09-08 — yetenek + altyapi oturumu)
- **4 kapili tasarim akisi kuruldu.** Skill'ler `.claude/skills/` altinda, repoda:
  `design-taste` (zevk) -> `reference-parity` (referans + tarayici) ->
  `web-interface-guidelines` (dogruluk) -> `DEFINITION-OF-DONE.md` (proje).
  Besincisi `project-learning` (ogrenileni kalici davranisa cevirme).
- **Olcum teknigi kesfedildi (L-6).** Referans canliysa Playwright ile
  `getComputedStyle` cekilir, goz karari yapilmaz. himon footer olculdu ->
  `design/references/himon-footer-measured.md`. Teknik `reference-parity` A2a'da.
- **`UI-MAP.md` kuruldu** (`.planning/codebase/`). Gorsel oge -> dosya -> token haritasi.
  Revize geldiginde grep atmadan hedefe gitmek icin.
- **Dosya yapisi temizlendi.** Kokteki 12 png -> `.work/shots/arsiv/`,
  `screen/` -> `design/inbox/`, `.playwright-mcp/` -> `.work/playwright/`.
- **screenshot-to-code kuruldu** ama repo disinda (`C:/Software Dev/tools/`).
  Rolu sinirli: canli referans yoksa olcu cikarma. API anahtari henuz girilmedi.
- **GitHub baglandi:** `Tguleryuz52/Ozdemir-Makine-Web`.

## 📍 Onceki Durum (2026-09-07)
- Proje kuruldu: `C:\Software Dev\ozdemir-makine-web` (Work Asistant'tan ayrı, temiz context).
- **Next.js temeli hazır:** create-next-app (TS strict + Tailwind v4 + App Router + `@/*` alias).
- **Bağımlılıklar:** shadcn/ui (button + lib/utils), framer-motion kuruldu.
- **Mimari:** `src/components/{ui,layout,sections}`, `src/lib`, `src/hooks`, `src/content`, `src/types`.
- Henüz: tasarım referansları yok, mevcut site içeriği aktarılmadı, sayfa geliştirmesi başlamadı.

## ✅ Yapılanlar
- 2026-09-07: Proje scaffold + bağımlılıklar + klasör mimarisi + planning/design iskeleti.
- 2026-09-07: **Bağlam temeli sağlamlaştırıldı.** Kod haritası (STACK, ARCHITECTURE,
  CONVENTIONS, CONCERNS, TESTING), kalite kapıları (DEFINITION-OF-DONE), kalıcı
  dersler (LEARNINGS), içerik envanteri iskeleti, ileri hedef mimari
  (ENTERPRISE-BLUEPRINT) ve devir dosyası eklendi. CLAUDE.md'ye karar matrisi,
  planlama katmanı haritası ve kod yasakları tablosu işlendi.
- 2026-09-07: Commit öncesi lint kapısı kuruldu (`.claude/settings.local.json`).

## 📥 Referans Site
- 2026-09-07: `design/references/ornek-site/` açıldı. Talha örnek siteyi arşivden
  çıkarıp buraya atacak. Ardından: yapı analizi → içerik envanteri → tasarım
  kararlarının çıkarılması. Kod kopyalanmayacak, karar çıkarılacak.

## ⏭️ Sıradaki Adımlar
**Faz 1 büyük ölçüde tamam** (2026-09-08):
- ✅ Mevcut site analiz edildi (Playwright) → nav, kategoriler, markalar, kurumsal metin, footer, işlevler. Ekran: `design/references/canli-site/`.
- ✅ **himon referansı detaylı incelendi** → 5 bölüm kalıbı, renk, tipografi, hareket dili çıkarıldı. Ekranlar: `design/references/himon/`. Analiz: `design/references/himon-analysis.md`.
- ⏳ Kalan: `CONTENT-INVENTORY.md`'yi bu analizle doldur · repomix/graphify haritası.

**✅ Faz 2 Design System TAMAM (2026-09-08):**
- Aksan = Özdemir mavisi `#234D9C` (kilitli). Font = Geist + Geist Mono (kilitli, himon'la birebir).
- `design/design-system.md` token kontratı (ui-ux-pro-max üç katman) + `globals.css` uygulandı.
- `/design-system` geçici demo sayfası + header taslağı çalışıyor. tsc/eslint/build temiz.
- Header taslağı (`src/components/layout/header.tsx`) sepet/üye gizli, dil+Teklif Al pill.

**Sonra → Faz 3 Global Layout & Navigasyon:**
1. Header'ı resmî planla cilalanır (logo entegrasyonu — **Talha atacak**).
2. Footer kurulur (himon dili: mono kolonlar + dev ghost ÖZDEMİR wordmark, TR+DE adres, 5 sosyal).
3. Mobil menü + erişilebilirlik.

**Karar bekleyenler:** yeni logo (Talha atacak) · hero görseli (arşiv kilitli) · sepet/üye v1'de mi (şimdilik gizli).

## 🧠 Kararlar (tarihli)
- 2026-09-07: **Stack KİLİTLİ** → Next.js + TS + Tailwind + shadcn/ui + Framer Motion.
- 2026-09-07: Proje `C:\Software Dev\` kökünde, Work Asistant DIŞINDA (temiz context, halüsinasyon riski düşük).
- 2026-09-07: Mevcut site **redesign** ediliyor (sıfırdan modern build, mevcut içerik/marka korunarak).
- 2026-09-07: **Test aracı şimdi kurulmayacak.** Gerekçe: ortada sayfa yokken test
  yazmak boşa iş. Faz 2 bitince Playwright eklenecek, koşul `codebase/TESTING.md`'de.
- 2026-09-07: **Yeni araç eklenmeyecek, mevcut yığın kanıtlanacak.** Gerekçe:
  denenmemiş eklenti yığını güç değil dağınıklık. Bkz. `LEARNINGS.md` L-5.
- 2026-09-08: **CMS = Sanity.io (KİLİTLİ, ama EN SON faz).** Uyumluluk teyitli
  (`sanity@6` + `next-sanity@13`, React 19.2.8 + Next 16). Kuruldu ama Faz 9'a kadar
  dokunulmayacak. Bkz. frontend-önce kararı.
- 2026-09-08: **FRONTEND-ÖNCE, Sanity-EN-SON (yön kararı).** Roadmap 10 faza kuruldu:
  Faz 1-8 frontend (asıl mesai, tasarım-yoğun), Faz 9 Sanity, Faz 10 yayın. Referans =
  **yayındaki canlı site (link, kaynak kod yok)** + Framer. İçerik önce **tipli mock**
  (`src/content`), gelecekteki Sanity şemasıyla aynı şekilde → Faz 9 geçişi ucuz.
  Gerekçe: Talha tasarıma çok yüklenmek istiyor; bağlamı sağlam kurup sonra üretmek.
- 2026-09-08: **package.json temizlendi.** `node-unrar-js` + `7zip-bin` (arşiv denemesi
  artığı) kaldırıldı, `button.tsx` importu `@/lib/utils`'a çekildi. `cn`/`@base-ui/react`/
  `shadcn` scaffold'un bilinçli modern tercihi, korundu. Lint + tsc temiz.

## ⚠️ Açık Sorular
- Mevcut ozdemirmakine.com.tr'nin içerik/sayfa envanteri? (çıkarılacak)
- Framer referansı: birebir mi, hangi bölümler? (Talha ile netleşecek)
- Çok dilli (TR/EN) gerekli mi? (ihracat için muhtemel — audit TR/EN/DE diyor)
- Sedat Bey'in kodu: içerik kaynağı mı, yoksa incelenip bırakılacak mı?
- **ozdmak.rar hâlâ kilitli:** dış arşiv parolası bilinmiyor (`1234` tutmadı). Görseller
  ve metinler bu yüzden çekilemedi. Doğru parola gelince makine görselleri + içerik aktarılacak.
- **Sanity projesi:** ücretsiz hesap + proje açılması gerekiyor (`npx sanity login`).
  projectId gelince env'e yazılacak. Talha'nın yapması gereken tek dış adım.
