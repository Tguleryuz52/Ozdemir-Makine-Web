# CONVENTIONS.md — Bu projede nasıl çalışılır

## Değiştirilemez
1. **Stack kilitli.** Yeni bağımlılık gerekçe ister, STATE.md'ye yazılır.
2. **`any` yasak.** TypeScript strict.
3. **Token dışı stil yasak.** Ham Tailwind paleti, inline style, sihirli sayı yok.
4. **`linear` easing yasak.** Hareket doğal olacak.
5. **Referans kodu kopyalanmaz.** `design/references/` içinden karar çıkar, kod değil.

## İsimlendirme
- Bileşen dosyası `PascalCase.tsx`, yardımcı `kebab-case.ts`.
- Bölüm bileşenleri işlevle adlandırılır: `HeroSection`, `MachineGrid`, `ContactCta`.
- Tailwind sınıf sırası: layout → boyut → tipografi → renk → efekt.

## Değişiklik akışı
Küçük iş: yap, `npm run lint`, `npm run build`, göster.
UI işi: önce tasarım kapısı (bkz. `DEFINITION-OF-DONE.md`), sonra kod.
Her oturum sonu: `STATE.md` güncelle, ders çıktıysa `LEARNINGS.md`'ye ekle.

## Token disiplini
Dosya aramadan önce `.planning/codebase/STRUCTURE.md`. Kör grep yok.
Okunmuş dosyayı tekrar okuma. Ağır işi subagent'a ver. Çıktı bullet.

## Dış yazımlar
Türkçe metni curl ile dış servise gönderme. Python UTF-8 kullan ve
yazdıktan sonra geri okuyup doğrula. Bkz. `LEARNINGS.md` L-2.
