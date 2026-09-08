# STACK.md — 🔒 Kilitli teknoloji yığını

Tartışma kapalı. Yeni bağımlılık eklemek karar gerektirir, gerekçesi STATE.md'ye yazılır.

| Katman | Seçim | Sürüm | Neden |
|---|---|---|---|
| Framework | Next.js App Router | 16.3.4 | SSR/SSG, görsel optimizasyonu, SEO altyapısı hazır |
| Dil | TypeScript strict | 5.x | `any` yasak, tip güvenliği |
| UI kütüphanesi | React | 19.2.8 | Next 16 ile eşleşen sürüm |
| Stil | Tailwind CSS | 4.x | Token tabanlı, PostCSS üzerinden |
| Bileşen | shadcn/ui + Base UI | — | Sahip olunan kod, kütüphane bağımlılığı değil |
| Hareket | Framer Motion | 13.x | Doğal easing, linear YASAK |
| İkon | lucide-react | 1.x | Tek ikon ailesi, karıştırma |
| Lint | ESLint + next config | 9.x | `npm run lint` |

## Sürüm tuzağı
Next 16 eğitim verisinden farklı davranır. Kod yazmadan önce
`node_modules/next/dist/docs/` altındaki ilgili rehberi oku. Bkz. `AGENTS.md`.

## Henüz kurulu olmayanlar (bilinçli)
Test koşucusu, formatter, CI. Gerçek sayfalar çıkana kadar eklenmeyecek.
Karar gerekçesi: boş projeye araç yığmak yerine mevcut yığını kanıtlamak.
Eklenme zamanı `.planning/DEFINITION-OF-DONE.md` içinde tanımlı.
