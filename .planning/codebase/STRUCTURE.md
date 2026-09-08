# STRUCTURE.md — Ne nerede

> Dosya aramadan önce buraya bak. Kör grep yok.

```
ozdemir-makine-web/
├─ CLAUDE.md                 projenin beyni + karar matrisi + yasaklar
├─ AGENTS.md                 Next.js sürüm uyarısı (next dev tarafından yazılır)
├─ .claude/
│  ├─ settings.local.json    commit öncesi lint kapısı
│  └─ skills/                🔧 projeye ait skill'ler (REPODA, ekiple gider)
│     ├─ design-taste/       kapı 1 — zevk (klon: h3nryprod01/design-taste)
│     ├─ reference-parity/   kapı 2 — referanstan koda + tarayıcı doğrulama
│     ├─ web-interface-guidelines/  kapı 3 — doğruluk denetimi (Vercel)
│     └─ project-learning/   öğrenileni kalıcı davranışa çevirme
├─ design/
│  ├─ design-system.md       🔒 token'lar + 4 kapılı tasarım iş akışı
│  ├─ inbox/                 📥 Talha'nın attığı ham görseller (git dışı)
│  └─ references/            kalıcı referanslar (görseller git dışı, .md commit)
│     ├─ himon/              himon.framer.website ekranları
│     ├─ himon-analysis.md   ✅ çıkarılmış 5 bölüm kalıbı
│     └─ canli-site/         mevcut ozdemirmakine.com.tr ekranı
├─ .work/                    🗑️ geçici çalışma alanı (GIT DIŞI, silinebilir)
│  ├─ shots/                 Playwright ekran görüntüleri
│  ├─ shots/arsiv/           eski iterasyonlar (header v1-v4)
│  └─ playwright/            MCP console/page logları
├─ ozdmak/                   eski site arşivi (GIT DIŞI)
├─ .planning/
│  ├─ STATE.md               ⭐ ilk okunan dosya
│  ├─ .continue-here.md      sıradaki somut adım
│  ├─ PROJECT.md             vizyon, hedef kullanıcı, metrikler
│  ├─ REQUIREMENTS.md        FR / NFR
│  ├─ ROADMAP.md             faz kırılımı
│  ├─ DEFINITION-OF-DONE.md  ⭐ kalite kapıları
│  ├─ LEARNINGS.md           ⭐ kalıcı dersler
│  ├─ CONTENT-INVENTORY.md   sayfa ve ürün envanteri (Faz 0 çıktısı)
│  ├─ ENTERPRISE-BLUEPRINT.md  MVP sonrası hedefler, şimdi okuma
│  ├─ config.json            workflow anahtarları
│  ├─ codebase/              bu harita dosyaları
│  └─ phases/                faz bazlı SPEC / PLAN / SUMMARY
└─ src/
   ├─ app/                   route + layout + metadata
   ├─ components/{ui,layout,sections}
   ├─ content/               metin ve veri, JSX'e gömülmez
   ├─ lib/  hooks/  types/
```

## Hangi soru için hangi dosya
| Soru | Bak |
|---|---|
| Nerede kalmıştık | `.planning/STATE.md` |
| Sıradaki adım ne | `.planning/.continue-here.md` |
| Bu iş bitti mi | `.planning/DEFINITION-OF-DONE.md` |
| Bu hatayı daha önce yaptık mı | `.planning/LEARNINGS.md` |
| Renk / font / boşluk ne | `design/design-system.md` |
| Bileşen nereye konur | `.planning/codebase/ARCHITECTURE.md` |
| Nasıl kod yazılır | `.planning/codebase/CONVENTIONS.md` |
| Hangi sürüm, neden | `.planning/codebase/STACK.md` |
| Risk ne | `.planning/codebase/CONCERNS.md` |
| Nasıl doğrularız | `.planning/codebase/TESTING.md` |
| Tasarım nasıl yapılır | `design/design-system.md` → "Tasarım İş Akışı" (4 kapı) |
| **Şu butonu/boşluğu değiştir** | ⭐ `.planning/codebase/UI-MAP.md` — görsel öğe → dosya |
| himon'un gerçek ölçüsü ne | `design/references/himon-*-measured.md` |
| Ekran görüntüsü nereye | `.work/shots/`, asla repo köküne |
| Talha görsel attı, nerede | `design/inbox/` |

## 🧹 Dosya disiplini — ihlal edilmez
- **Repo kökü temiz kalır.** Kök dizine gelişigüzel `.png`, `.log`, `test.js` atılmaz.
- Geçici her şey `.work/` altına. Orası git dışı, her an silinebilir.
- Ekran görüntüsü adı: `<bolum>-<varyant>-<viewport>.png` → `footer-v1-1440.png`.
- Kalıcı olacak görsel `design/references/<kaynak>/` altına isimlendirilerek taşınır.
- Repo dışı araçlar `C:/Software Dev/tools/` altında yaşar, bu repoya girmez
  (örn. `tools/screenshot-to-code` — ölçü çıkarma aracı, kullanımı `BASLA.md`).
