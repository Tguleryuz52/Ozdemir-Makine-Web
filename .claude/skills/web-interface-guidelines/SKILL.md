---
name: web-interface-guidelines
description: Pre-ship audit checklist for any web UI — accessibility, keyboard, focus, forms, motion, layout, content, performance and visual detail. Use when a page or component is BUILT and about to be called done, when the user asks to audit/denetle/review a page or file against UI quality rules, or before a commit that touches UI. This is the correctness gate, not the taste gate — pair it with design-taste (taste) which runs first.
---

# Web Interface Guidelines — pre-ship denetim kapısı

Kaynak: Vercel Web Interface Guidelines (`https://vercel.com/design/guidelines`), 2026-09-08'de çekildi.
Bu **tasarım skill'i değil, kontrol listesidir.** `design-taste` işi *güzel* yapar; bu skill *doğru* yapar.

## Ne zaman çalışır
- Bir sayfa/bileşen bittiğinde, "tamam" demeden önce (`.planning/DEFINITION-OF-DONE.md` ile birlikte).
- Talha "şu sayfayı denetle" dediğinde.
- UI'a dokunan commit öncesi.

## Nasıl raporlanır — ZORUNLU format
Bulunan her sorun **üç sütunlu tablo** olarak verilir. Düzeltmeler **onay alınmadan uygulanmaz.**

| Sorun | Neden sorun | Düzeltilmiş hâli |
|---|---|---|
| `<div onClick>` ile sayfa geçişi | Klavye ve ekran okuyucu erişemez, yeni sekmede açılmaz | `<Link href="...">` |

Sadece **gerçekten ihlal edilen** maddeleri yaz. "Şuna da bakılabilir" türü dolgu yasak.
Her satır dosya + satır numarası ile referanslanır (`src/components/layout/footer.tsx:42`).

---

## 1. Etkileşim
- Klavye her akışta çalışır; WAI-ARIA kalıpları izlenir.
- Her odaklanabilir öğede görünür focus ring var — `:focus-visible` tercih edilir.
- Odak yönetimi: modal/drawer'da focus trap, kapanınca odak tetikleyiciye döner.
- Görsel hedef = tıklama hedefi. 24px altı hedefler 24px'e (mobilde 44px) genişletilir.
- Mobil input font 16px veya üstü (yoksa iOS zoom yapar).
- Tarayıcı zoom'u asla kapatılmaz.
- Yapıştırma (paste) hiçbir input'ta engellenmez.
- Yükleniyor butonu: spinner eklenir, **etiket korunur** (metin kaybolmaz).
- Loading state'e 150–300ms gecikme + 300–500ms minimum görünürlük (flash önler).
- Durum URL'de yaşar: filtre, sekme, sayfalama, açık panel — hepsi deep-link'lenebilir.
- Yıkıcı aksiyonda onay veya güvenli pencereli Geri Al.
- Kontrollerde `touch-action: manipulation` (çift dokunuş zoom'unu keser).
- `-webkit-tap-highlight-color` tasarıma göre ayarlanır.
- Tooltip: ilkinde gecikme, komşularda gecikmesiz.
- Modal/drawer'da `overscroll-behavior: contain`.
- Geri/İleri gezinmede scroll pozisyonu korunur.
- Ölü bölge yok — tıklanabilir görünen her şey tıklanabilir.
- Sürüklerken metin seçimi kapatılır, hedef dışı `inert`.
- Her jestin tap/klavye alternatifi var.
- **Gezinme `<a>` / `<Link>` ile yapılır**, `<button>` veya `<div>` ile değil.
- Async güncellemeler `aria-live="polite"` ile duyurulur (toast, satır içi doğrulama).

## 2. Animasyon (bu projede Framer Motion — motion token'ları `design/design-system.md`)
- `prefers-reduced-motion` onurlandırılır, azaltılmış varyant sunulur.
- Sıralama: CSS > Web Animations API > JS kütüphanesi.
- Sadece compositor dostu özellikler: `transform`, `opacity`. Yükseklik/genişlik animasyonu son çare.
- Gereklilik testi: animasyon ya sebep-sonucu netleştirir ya bilinçli bir keyif katar. Süs yasak.
- Easing özneye uyar. **`linear` yasak** (proje kuralı).
- Animasyonlar kullanıcı girdisiyle kesilebilir.
- `transform-origin` hareketin fiziksel başladığı yere sabitlenir.
- **`transition: all` asla.** Özellikler tek tek yazılır.
- SVG transform'ları `<g>` sarmalayıcıya, `transform-box: fill-box` ile.

## 3. Yerleşim
- Optik hizalama: algı geometriyi yendiğinde 1px düzelt.
- Her öğe bilinçli hizalanır (grid, baseline, kenar, merkez).
- Metin + ikon kilitlerinde ağırlık/boyut/boşluk/renk dengelenir.
- Mobil + laptop + ultra-wide (%50 zoom) doğrulanır.
- Safe-area değişkenleri (çentik/inset) hesaba katılır.
- Gereksiz scrollbar yok — taşma kaynağı düzeltilir.
- Boyutlandırmayı tarayıcı yapar: flex/grid, JS ölçüm değil.

## 4. İçerik
- Satır içi açıklama önce; tooltip son çare.
- Skeleton'lar nihai içeriği yansıtır (layout shift yok).
- `<title>` mevcut bağlamı doğru yansıtır.
- Çıkmaz sokak yok — her ekranda sonraki adım veya kurtarma yolu var.
- Boş / seyrek / yoğun / hata durumlarının hepsi tasarlanır.
- Kıvrık tırnak tercih edilir; üç nokta tek `…` karakteri olarak yazılır.
- Dul/yetim satır temizlenir; başlıklarda `text-wrap: balance`.
- Karşılaştırmalı sayılarda `font-variant-numeric: tabular-nums`.
- Durum sadece renkle anlatılmaz — metin etiketi de olur.
- İkonların metin karşılığı var; ikon-only butonlarda açıklayıcı `aria-label`.
- ARIA'dan önce semantik HTML.
- Hiyerarşik `<h1>`–`<h6>` + "İçeriğe geç" atlama linki.
- Marka/ürün adlarında `translate="no"`.
- Bölüm linklerinde `scroll-margin-top`.
- Kısa / ortalama / çok uzun kullanıcı içeriğine dayanıklı.
- Tarih, saat, sayı, para birimi yerel biçimde (**tr-TR**; ihracat sayfalarında dil bazlı).
- Yapışık terimlerde `&nbsp;` — "10 ton", "Ø 500 mm" gibi.

## 5. Formlar (teklif formu / iletişim formu için kritik)
- Metin input'unda Enter formu gönderir (tek kontrolse veya sonuncusuysa).
- Textarea'da Enter yeni satır, Ctrl/Cmd+Enter gönderir.
- Her kontrolün `<label>`'ı var; label'a tıklamak kontrolü odaklar.
- Submit **başta aktif**; istek sırasında devre dışı + spinner. Eksik formu göndermek doğrulamayı yüzeye çıkarır.
- Yazmayı engelleme — sayı alanında bile. Doğrulamayı geri bildirimle yap.
- Checkbox/radio + label tek ve cömert bir tıklama hedefi paylaşır.
- Hata mesajı alanın yanında; gönderimde ilk hataya odaklanılır.
- `autocomplete` ve anlamlı `name` set edilir (autofill çalışsın).
- E-posta, kod, kullanıcı adında `spellcheck={false}`.
- Doğru `type` ve `inputmode` (telefon için `inputmode="tel"`).
- Placeholder örnek değer veya kalıp gösterir ve `…` ile biter; label yerine geçmez.
- Kaydedilmemiş değişiklikte gezinme uyarısı.
- Şifre yöneticisi uyumu; tek kullanımlık kod yapıştırılabilir.
- Auth olmayan alanlarda şifre yöneticisi tetiklenmez.
- Gönderim öncesi değer `trim()` edilir.
- Native `<select>`'te `background-color` ve `color` açıkça set edilir (Windows sorunu).

## 6. Performans
- iOS Low Power Mode ve macOS Safari test edilir.
- Ölçüm eklentiler kapalıyken yapılır; CPU ve ağ throttle ile profillenir.
- Yeniden render'lar takip edilir, azaltılır.
- Layout işi toplu: okuma/yazma gruplanır, gereksiz reflow yok.
- POST/PATCH/DELETE 500ms altında biter.
- Tuş vuruşu maliyeti düşük — mümkünse uncontrolled input.
- Uzun listeler sanallaştırılır veya `content-visibility: auto` alır.
- **Ekranın üstündeki görsel preload, gerisi lazy** (`next/image` `priority`).
- **Görsel kaynaklı CLS yok** — genişlik/yükseklik verilir, yer ayrılır.
- Asset/CDN origin'lerine `preconnect` (Sanity CDN geldiğinde).
- Kritik fontlar preload ve subset — `next/font` bunu yapar, bypass etme.
- Ağır iş main thread'de değil.
- Döngü animasyon için GIF değil `<video>`; Safari için `<picture>` içine H.264 MP4.

## 7. Görsel detay
- **Katmanlı gölge** — en az iki katman (ambient ışık + direkt ışık).
- Kenarlık ve gölge birlikte; yarı saydam kenarlık netliği artırır.
- **İç içe yarıçap:** çocuk radius ebeveyn radius'undan küçük veya eşit, eşmerkezli.
- Nötr olmayan zeminde kenarlık/gölge/metin aynı tona çalınır.
- Grafiklerde renk körlüğü dostu palet.
- Kontrast: gövde 4.5:1, büyük metin 3:1 ve üstü. APCA tercih edilir.
- **Etkileşim kontrastı artırır** — hover/active/focus dinlenme hâlinden daha kontrastlı.
- `theme-color` meta tarayıcı UI'ını zeminle eşler.
- Koyu temada `<html>` üzerinde `color-scheme: dark`.
- Metin transform'unda sarmalayıcıyı animasyonla; gerekirse `translateZ(0)`.
- Gradyan bantlanmasına karşı CSS mask yerine background image.

## 8. Metin yazımı — Özdemir uyarlaması
> Vercel'in İngilizce kuralları (Title Case, ampersand tercihi) **bu projede geçerli değil.** Site Türkçe.

- Etken çatı, emir kipi: "Teklif Al", "Katalog İndir" — "Teklif alabilirsiniz" değil.
- Başlık ve butonlarda **Türkçe büyük harf kuralı** (ilk harf + özel isim). Title Case yok.
- Az kelime, net kelime.
- İkinci şahıs ("size özel"), birinci şahıs yok ("biz size sunuyoruz" değil).
- Terim tutarlılığı: aynı şey her yerde aynı isimle ("makine" mi "ekipman" mı — biri seçilir).
- Sayılar rakamla: "8 model", "sekiz model" değil.
- Sayı ile birim arası boşluk: "10 kW", "1.200 mm" (`&nbsp;` ile yapıştır).
- Para biçimi tutarlı: ya hep 0 ya hep 2 ondalık. Fiyat yoksa **"Fiyat Sorunuz"** (iş kuralı).
- Olumlu dil; hata mesajı çıkış yolunu söyler — "Tekrar deneyin" değil, "E-posta adresini kontrol edin".
- Belirsiz etiket yok: "Devam" değil, "Teklifi Gönder".

---

## Bu projede ekstra zorunlu
- `npx tsc --noEmit` ve `npx eslint <dosya>` temiz. (autocheck hook bozuk — elle çalıştır.)
- Ham renk/boşluk değeri yok, her şey `design/design-system.md` token'ı üzerinden.
- İçerik metni `src/content/` içinde, JSX'e gömülü değil.
- Gereksiz `"use client"` yok.
