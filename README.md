# Özdemir Makine — Kurumsal Web Sitesi

> `ozdemirmakine.com.tr`'nin modern, dönüşüm + SEO odaklı redesign'ı.
> Hedef kitle: B2B makine alıcıları, ihracat/referans arayan kurumlar.

Bu repo **plan-önce, referans-tabanlı, anti-slop** bir disiplinle geliştirilir. Kod yazmadan önce
`CLAUDE.md` (proje beyni) ve `.planning/STATE.md` (kaldığın yer) okunur.

---

## 🧱 Teknoloji Yığını (kilitli)

| Katman | Seçim |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript `strict` |
| Styling | Tailwind CSS v4 · shadcn/ui (Base UI tabanlı) |
| Animasyon | Framer Motion |
| CMS | Sanity.io (gömülü Studio `/studio`) — Faz 9 |
| Deploy | GitHub → Vercel |

Import alias: `@/*` → `src/*`. `any` yasak, ham renk/boşluk değeri yasak (her şey token üzerinden).

## 🚀 Başlangıç

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # teslim öncesi zorunlu
npm run build    # teslim öncesi zorunlu
```

## 📂 Dosya Haritası

```
src/
├─ app/                 # route + layout (App Router). /studio = gömülü Sanity
├─ components/
│  ├─ ui/               # primitive'ler (button, link, arrow-fill-button)
│  ├─ layout/           # header, footer, shell
│  └─ sections/         # sayfa bölümleri (hero, introduction, services…) — prop-driven
├─ content/             # statik UI metinleri (site.ts) — JSX'e gömülmez
├─ lib/ · hooks/ · types/
└─ sanity/              # CMS şema + client (Faz 9)

design/                 # referanslar + token sistemi
├─ references/          # himon + canlı site ekranları, ölçülmüş değerler
└─ design-system.md     # token kontratı (renk/font/spacing/motion)

.planning/              # 🧠 proje beyni — bağlamın yaşadığı yer
├─ STATE.md             # her oturumun ilk dosyası
├─ ROADMAP.md           # 10 fazlık yol haritası (GSD)
├─ codebase/            # STRUCTURE · ARCHITECTURE · CONVENTIONS · UI-MAP · …
├─ phases/              # faz faz plan + özet
└─ graphs/              # kod knowledge-graph (graphify)
```

## 🎨 Tasarım Sistemi

- **Referans:** `himon.framer.website` (dil alınır, kod alınmaz) + canlı site.
- **Aksan:** Özdemir mavisi `#234D9C` (derin `#164295`, parlak `#0E92DD`).
- **İskelet:** near-black `#0E0E0E` + sıcak off-white `#F2F0EC` + beyaz, tek aksan.
- **Font:** Geist (display, tight tracking, hero UPPERCASE) + Geist Mono (kicker).
- Detay ve tüm token'lar: [`design/design-system.md`](design/design-system.md).

## 🗺️ Çalışma Şekli

Referans-tabanlı, iteratif, faz faz. Her UI işi **4 kaliteden** geçer: zevk (`design-taste`) →
referans (`reference-parity`) → doğruluk (`web-interface-guidelines`) → proje (`DEFINITION-OF-DONE.md`).
Ayrıntı: [`CLAUDE.md`](CLAUDE.md).

## 📚 Nereden Başlamalı

1. [`CLAUDE.md`](CLAUDE.md) — proje kuralları, karar matrisi, kalite protokolü.
2. [`.planning/STATE.md`](.planning/STATE.md) — şu an nerede kaldık.
3. [`.planning/codebase/STRUCTURE.md`](.planning/codebase/STRUCTURE.md) — dosya ararken (kör grep yerine).
