# STATE.md — Proje Hafızası

> Her oturum başında **ilk okunan** dosya. Ayrıntılı devir: `.continue-here.md`.

## 📍 Şu An (2026-09-09 — Faz 4: Ana Sayfa)
- **✅ Hero** (`sections/hero.tsx`, `51922fb`): himon 1. bölüm — full-bleed, sol kicker+ayraç+↓, dev UPPERCASE başlık, beyaz pill CTA (mavi ok), dipte gövde. BG geçici gradient (foto swappable). Giriş anim: Framer Motion (satır-maske + fade-up + zoom-out).
- **✅ Header:** hero-overlay (şeffaf→scroll'da beyaz) + hide-on-scroll. `pathname==="/"` overlay.
- **✅ Introduction:** split-istatistik (himon-02) bitti.
- **⏭️ SIRADAKİ:** servis kartları (4'lü) → vitrin → süreç → marka şeridi → CTA.
- **Talha kuralları:** her faz sonrası `/clear` · sürekli screenshot yok (kendi kontrolün) · Özdemir bilgisini gerçek veriye çevir · token az yak · section desktop'ta tek viewport (100vh).

## ✅ Tamamlanan Fazlar
- **Faz 1 (Keşif):** canlı site + himon analiz edildi → 5 bölüm kalıbı, renk/tipografi/hareket. Ekranlar `design/references/`, analiz `himon-analysis.md`.
- **Faz 2 (Design System):** aksan mavi `#234D9C` + Geist/Geist Mono (kilitli). `design-system.md` token kontratı + `globals.css`. tsc/eslint/build temiz.
- **Faz 3 (Layout & Nav):** Header (mobil menü + a11y) + Footer (himon CTA + kolon grid + legal) + layout shell. Playwright denetim (1440/390/mobil) geçti. Ekranlar `.work/shots/faz3/`.
- **Altyapı:** 4 kapılı tasarım akışı (`.claude/skills/`: design-taste → reference-parity → web-interface-guidelines → DoD → project-learning) · ölçüm tekniği (Playwright `getComputedStyle`, L-6, `himon-footer-measured.md`) · `UI-MAP.md` · Graphify (`.planning/graphs/`, 554 node/549 edge) · GitHub `Tguleryuz52/Ozdemir-Makine-Web`.

## 🧠 Kararlar (tarihli)
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
