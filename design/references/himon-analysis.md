# himon → Özdemir Makine — Tasarım Dili Analizi & Uyarlama

> Referans: https://himon.framer.website/ (ekranlar: `design/references/himon/`)
> Hedef: himon'un **tasarım dilini** al, Özdemir Makine'nin **içerik/işlevine** uyarla.
> Framer kodu **kopyalanmaz** — dil çıkarılır, Next + Tailwind + Framer Motion ile sıfırdan kurulur.
> Bu doküman Faz 1 çıktısı; Faz 2'de `design-system.md` token'larına dönüşür.

## Genel karakter
Endüstriyel-editoryal, güven veren, "precision" hissi. Bol negatif alan, full-bleed fotoğraf,
dev tipografi, tek cesur aksan rengi, yuvarlak köşeli kartlar/pill butonlar, monospace etiketler,
scroll-tetiklemeli sakin animasyon. Lojistik → **matbaa/ambalaj makinesi** dünyasına birebir oturur.

## Renk sistemi (himon)
- **Zemin koyu:** ~`#0E0E0E` (near-black) — dark bölümler, footer.
- **Zemin açık:** ~`#F2F0EC` (warm off-white) — light bölümler, kartlar.
- **Beyaz:** hero/foto üstü metin.
- **Tek aksan:** asit/lime yeşili ~`#C3F53C` — CTA ok, etiket bullet'ı, timeline çizgisi, 1 kart dolgusu.
- **Nötr gri:** muted body metni.
- **✅ Özdemir aksanı KİLİTLENDİ:** **`#234D9C`** (kurumsal mavi, canlı siteden örneklendi — 562 kullanım).
  Derin varyant `#164295`, parlak ikincil `#0E92DD` / `#00C2FF`. himon'un lime'ı yerine bu mavi.
  Koyu/açık/beyaz + tek-aksan iskeleti korunur; aksan = Özdemir mavisi.

## Tipografi (himon — GERÇEK ÖLÇÜLER, computed style'dan)
> himon fontu = **Geist** (başlık/body) + **Geist Mono** (etiket) + **Syncopate** (logo/özel).
> **Bizim scaffold zaten Geist + Geist_Mono ile kurulu** → birebir eşleşme, ekstra kurulum yok.
- **Hero (h1):** Geist, **weight 500**, 70px, letter-spacing ~**-0.04em** (-2.8px), line-height 1.0, **UPPERCASE**.
- **Bölüm başlığı (h2):** Geist 500, ~64px, tracking ~**-0.05em** (-3.2px), lh ~1.1, sentence-case.
- **Kart başlığı (h3):** Geist 500, 32px, tracking ~-0.04em, lh ~1.3.
- **Kicker etiket:** **Geist Mono**, UPPERCASE, ~12-13px, hafif pozitif tracking. Aksan kare bullet ile.
- **Body:** Geist **400**, muted gri, rahat satır yüksekliği.
- **Logo wordmark:** himon Syncopate benzeri geniş-geometrik kullanıyor; Özdemir'de kendi wordmark stilimiz.
- **Hiyerarşi:** dev başlık (Geist 500 tight) → mono kicker (Geist Mono) → muted body (Geist 400). Üç kademe.

## Bölüm kalıpları (yeniden kuracaklarımız)
1. **Hero** — full-bleed fotoğraf (himon: kamyon; **biz: matbaa/ambalaj makinesi**), dev UPPERCASE
   başlık, sol üst mono kicker, pill CTA + dairesel aksan-ok, altta 2 satır muted alt metin.
2. **Split istatistik** — solda büyük foto, sağda paragraf + dev rakam istatistik satırları
   (ince ayraçlarla) + koyu pill CTA. (himon: 1.2M+/%98/24-7 → **biz: 20+ yıl / 1000 m² depo /
   binlerce makine / TR+DE ofis**).
3. **Servis kartları** — 4'lü, alternatif dolgu (**aksan / off-white / siyah / off-white**), bold
   başlık + muted açıklama + monoline geometrik ikon. (**biz: Sıfır Makine · İkinci El Alım-Satım ·
   Yedek Parça · Montaj & Lojistik / Gümrük & Leasing**).
4. **Sticky-scroll süreç** — koyu zemin, solda sticky dev başlık, sağda numaralı adımlar (01→05)
   görsel kart + başlık + açıklama, dikey aksan çizgi + numaralı düğümler. (**biz: "Nasıl Çalışıyoruz":
   01 Talep/Keşif · 02 Makine Seçimi · 03 Alım-Satım · 04 Montaj & Teslim · 05 Servis/Destek**).
5. **Büyük CTA bandı** — kapanış çağrısı ("Ready to accelerate..." → **biz: "Doğru makineyi bulalım /
   Teklif alın"**).
6. **Footer** — koyu, monospace-etiketli kolonlar (Sitemap · İletişim · Adres · Sosyal), altta **dev
   ghost wordmark** (himon → **ÖZDEMİR**), monospace legal bar. (Özdemir'de TR + DE adres, 5 sosyal hesap).

## Şekil & hareket dili
- **Yuvarlak köşe:** kart/foto ~16-24px, butonlar tam pill.
- **Ayraç:** 1px ince, düşük kontrast.
- **İkonlar:** custom monoline geometrik (jenerik icon set değil).
- **Hareket:** scroll-reveal (opacity + translate), sticky-pin bölümler, sayı sayaçları, yumuşak
  easing (linear yasak). **Framer Motion**: `useScroll`, `whileInView`, sticky container.

## Özdemir içerik eşlemesi (mevcut siteden — `design/references/canli-site/`)
- **Nav:** Kurumsal · Sıfır Makineler · İkinci El Makineler · Yedek Parçalar · Galeri · Referanslar · İletişim.
- **Kategoriler:** Baskı Öncesi · Ofset Baskı · Baskı Sonrası · Baskı Ekipmanları.
- **Markalar:** Bobst, Heidelberg, Man Roland, Kolbus, Komori, KBA, Steinmann, Nagel, DGM, Horda…
- **Makine adı:** "2008 - Man Roland R 905-6+LV" (yıl + marka + model). Specs: TİPİ, EBAT, BASKI, YIL, Seri No.
- **Kurumsal:** 20+ yıl, Topkapı İstanbul merkez + Krefeld/Almanya GmbH, 1000 m² Güneşli depo, gümrük
  müşaviri, leasing/akreditif, kendi montaj ekibi.
- **İletişim:** TR +90 212 544 63 46, info@ozdemirmakine.com.tr, FB/Twitter/IG/YouTube/LinkedIn.
- **İşlevler:** arama (kategori dropdown), sepet + üye girişi (mevcut sitede var — v1 kapsamı tartışılacak).

## Faz 2'ye devir (karar bekleyenler)
- **Aksan rengi:** shotgun'da 3-5 yön (Özdemir marka rengi mi, yeni sanayi aksanı mı?).
- **Display font seçimi:** General Sans / Neue Haas / Inter-tight benzeri — lisans + `next/font`.
- **Hero görseli:** makine fotoğrafı kalitesi (mevcut arşiv kilitli; geçici yüksek kalite görsel gerekebilir).
- **Sepet/üye girişi:** yeni sitede v1'de var mı? (mevcut sitede var, ihtiyaç netleşmeli).
