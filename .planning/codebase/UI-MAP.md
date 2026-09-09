# UI-MAP.md — Ekranda gördüğün şey hangi dosyada

> **Revize geldiğinde ilk bakılacak dosya.** "Şu butonu şöyle yap" dendiğinde
> grep atmadan, tahmin etmeden, doğrudan hedefe git.
>
> `STRUCTURE.md` klasör haritasıdır. Bu dosya **görsel öğe → dosya → token** haritasıdır.
> İkisi farklı soruya cevap verir. Revizeler görsel dille gelir, o yüzden bu dosya var.
>
> **Güncelleme kuralı:** her yeni bölüm/bileşen eklendiğinde buraya bir satır yazılır.
> Faz sonunda tamamı gözden geçirilir. Güncel değilse işe yaramaz.

## Nasıl kullanılır
Talha "header'daki Teklif Al butonunun oku taşıyor" der.
→ Tabloda "Teklif Al butonu" satırını bul → dosya ve boyut değişkenini oku → doğrudan aç.
Grep yok, tarama yok, token yakılmaz.

---

## Global — her sayfada görünen

| Ekranda ne görüyorsun | Dosya | Ayar nerede |
|---|---|---|
| Üstteki beyaz şerit (header) | `src/components/layout/header.tsx:50` | `h-20`, `max-w-[104rem]`, `px-6 lg:px-10` (himon 40px) |
| Sol üstteki logo + "ÖZDEMİR MAKİNE" | `src/components/layout/header.tsx:10` `Wordmark()` | ⚠️ **GEÇİCİ** — gerçek logo gelince burası değişir |
| Logo metni (ÖZDEMİR / MAKİNE) | `src/content/site.ts:11` `siteConfig.wordmark` | içerik, koda gömülü değil |
| Ortadaki 6 nav linki | `src/components/layout/header.tsx` nav + `src/components/ui/underline-link.tsx` | liste: `src/content/site.ts:25` `mainNav`; boyut `text-[15px]` |
| **Nav hover alt çizgisi** (soldan girer, sağdan çıkar) | `src/components/ui/underline-link.tsx` ⭐ tekrar kullanılabilir | origin swap (dinlenme right / hover left), 450ms, `ease-out-soft` |
| Sağdaki siyah "Teklif Al" pill butonu | `src/components/layout/header.tsx` `QuoteButton()` | `arrow-fill-button` sarmalar; boyut alttaki satırda |
| O butonun ok dairesi + beyaz dolum efekti | `src/components/arrow-fill-button.tsx` | boyut `--afb-*` CSS değişkenleri; **`style` prop ile override** (h/circle vermezsen animasyon aynı). Header'da `--afb-px:1.7rem` ile uzatıldı |
| Mobildeki hamburger ikonu | `src/components/layout/header.tsx:70` | `lg:hidden`, `size-10` |
| Mobil menü paneli | `src/components/layout/header.tsx:80` | `lg:hidden` |
| Footer | ❌ **HENÜZ YOK** | ölçüler hazır: `design/references/himon-footer-measured.md` |

## Sayfalar

| Sayfa | Dosya | Not |
|---|---|---|
| Ana sayfa | `src/app/page.tsx` | 16 satır, henüz iskelet |
| Kök layout (font, header, metadata) | `src/app/layout.tsx` | Geist + Geist Mono buradan yüklenir |
| `/design-system` token demo | `src/app/design-system/page.tsx` | ⚠️ **GEÇİCİ** — yayına çıkmadan silinecek |

## Stil ve token

| Ne değişecek | Dosya | Kural |
|---|---|---|
| Renk, tipografi, boşluk, radius, easing | `src/app/globals.css` (`@theme`) | tek kaynak |
| Token'ın gerekçesi ve kontratı | `design/design-system.md` | önce burayı oku |
| shadcn buton varyantları | `src/components/ui/button.tsx` | `arrow-fill-button` ayrı, karıştırma |
| Alt-çizgi hover linki (her yerde) | `src/components/ui/underline-link.tsx` | `UnderlineLink` — giriş sol, çıkış sağ |
| `cn()` yardımcısı | `src/lib/utils.ts` | |

**Renk değişimi istendiğinde:** `globals.css` içindeki token'ı değiştir, bileşene ham hex yazma.
`--primary` = ink (koyu pill), `--brand` = Özdemir mavisi. İkisi ayrı, himon deseni.

## İçerik

Tüm metin ve veri `src/content/site.ts` içinde. JSX'e metin gömülmez.

| İçerik | Konum |
|---|---|
| Firma adı, tagline, wordmark | `siteConfig` (satır 9) |
| E-posta | `siteConfig.email` (13) |
| Telefon | `siteConfig.phone` (14) |
| Adres (TR + DE) | `siteConfig.address` (18) |
| Ana navigasyon (6 item) | `mainNav` (25) |
| Sosyal linkler (5) | `socialLinks` (34) |

---

## Bilinen geçici / bekleyen

| Ne | Nerede | Ne bekliyor |
|---|---|---|
| Logo placeholder | `header.tsx:10` `Wordmark()` | Talha gerçek logoyu atacak |
| `/design-system` sayfası | `src/app/design-system/` | yayın öncesi silinecek |
| Hero görseli | yok | `ozdmak.rar` şifresi çözülecek |
| Sepet / üye girişi | header'da gizli | v1'de kapalı, yapıda yer var |
| Header'ın hero üstünde şeffaflaşması | `header.tsx:50` | Faz 4'te hero yapılınca |
