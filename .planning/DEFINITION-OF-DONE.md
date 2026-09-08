# DEFINITION-OF-DONE.md — Kalite kapıları

> Bir iş "bitti" demek, bu listedeki kapılardan geçti demek.
> Kapı atlanacaksa gerekçesi STATE.md'ye yazılır.

## Her UI işi için (sırayla)
1. **Taste check** — bu tasarım şablon kokuyor mu? Kokuyorsa başa dön.
2. **Referans kontrolü** — `design/references/` içindeki karara uyuyor mu?
3. **Token kontrolü** — tek bir ham renk, sihirli boşluk, `linear` easing var mı?
4. **Responsive** — mobil, tablet, masaüstü üçünde de bak.
5. **Erişilebilirlik** — kontrast, focus halkası, klavye ile gezilebilirlik.
6. **`npm run lint`** temiz.
7. **`npm run build`** hatasız.

## Her kod işi için
- Tip hatası yok, `any` yok.
- İçerik `src/content` içinde, JSX'e gömülü değil.
- Bileşen prop ile besleniyor, kendi verisini çekmiyor.
- `npm run lint` ve `npm run build` geçiyor.

## Faz sonu
- `STATE.md` güncellendi.
- Yeni ders çıktıysa `LEARNINGS.md`'ye eklendi.
- Açık soru kaldıysa STATE.md'nin açık sorular bölümünde.

## Yayın öncesi (Faz 5)
- Core Web Vitals ölçüldü.
- SEO: metadata, structured data, sitemap, temiz URL.
- Cross-browser kontrol.
- Playwright E2E testleri geçiyor.
