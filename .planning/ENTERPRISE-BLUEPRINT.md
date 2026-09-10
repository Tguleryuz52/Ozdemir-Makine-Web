# ENTERPRISE-BLUEPRINT.md — İleri hedef mimari

> ⚠️ Bu MVP değildir. Buradaki hiçbir madde Faz 0-5'i kirletmez.
> Site ayağa kalktıktan sonra bakılır.

## 1. İçerik yönetimi — Sanity CMS (Faz 9)
İçerik şu an tipli mock (`src/content`, Sanity şemasıyla aynı şekil → geçiş ucuz).
Hedef: **makineler Sanity'de yaşar**, non-teknik kullanıcı Studio'dan **ekler / siler / düzenler**.

**Talha'nın kabul kriteri (ÖNEMLİ):** deneyim **Framer CMS kadar rahat** olmalı — teknik
olmayan biri (satış/ofis) korkmadan makine girsin. Talha Sanity'yi **daha önce kurmadı/kullanmadı**,
bu yüzden Faz 9 kurulumu:
- Adım adım, elle tutulur kurulum (projectId + dataset + `npx sanity login`); tek dış adım Talha'da.
- Şema **sade + Türkçe alan başlıkları** (marka, model, kategori, durum, yıl, fiyat/priceOnRequest,
  featured, görsel, specs, açıklama) — teknik jargon Studio'ya sızmasın.
- Görsel yükleme + sürükle-bırak sıralama + önizleme; "kaydet → sitede canlı" hissi.
- Talha için kısa bir **"makine nasıl eklenir" onboarding notu** (`.planning/` altına) yazılır.
- `zoho-api` disiplini gibi, Sanity için de tuzak/kural notu tutulur (DC, CDN, remotePatterns).

## 2. Çok dillilik
TR/EN(/DE) yapısal ayrım, dil bazlı route ve metadata. İhracat hedefi netleşince
(audit TR/EN/DE diyor, 2 ofis TR+DE zaten var).

## 3. Form ve CRM — Zoho tam entegrasyonu
**Hedef: sitedeki TÜM lead verisi Zoho CRM'e akar** — hiçbir talep kaybolmaz.
- İletişim/teklif formu → doğrudan Zoho'ya yazar (gizli alanlar `makineKodu`, `leadSource`,
  `kampanya` **baştan dolu** — frontend'de hazır bırakıldı, Faz 6).
- Kaynak/kampanya asla boş gelmez (eski `zoho-crm-integration` projesindeki kayıp sorunu çözülür).
- Onay kuyruğu atlanır veya alarmlanır; dönüşüm CRM kaydına kadar izlenir.
- `zoho-api` skill + `zoho-crm-integration` projesiyle ortak iş; DC/OAuth/refresh disiplini oradan.

## 4. Analitik ve davranış ölçümü — Google Analytics
Hedef: **kim nerede takılıyor, kim hangi makineye bakmış** görünür olsun.
- GA4 (+ olası GTM): sayfa/scroll/etkileşim, hangi makine detayına bakıldı, hangi CTA'ya basıldı.
- Teklif getiren sayfa/ürün ölçülür; kampanya UTM'leri site içinde takip edilip CRM kaydına taşınır.
- İleride: makine bazlı "ilgi ısı haritası" → hangi makineler talep çekiyor, stok/vitrin kararına girdi.

## 5. Performans olgunluğu
Görsel optimizasyon pipeline'ı, font yükleme stratejisi, kritik CSS,
performans bütçesinin CI'da zorlanması.

## 6. Ürün kataloğu derinliği
Filtreleme, karşılaştırma, teknik özellik tabloları, PDF döküman indirme.

## 7. Test olgunluğu
Görsel regresyon, erişilebilirlik testinin otomatikleşmesi, CI üzerinde koşma.

## 8. Üye girişi / hesap (mevcut sitede var)
Eski sitede üye girişi mevcut → yeni sitede de olacak (muhtemelen). Kapsam netleşecek:
- Ne sağlıyor? (bayi/kurumsal fiyat görünürlüğü, kayıtlı teklifler, favori makineler, döküman erişimi?)
- Auth yöntemi (NextAuth / Sanity auth / harici) — Zoho Contact eşleşmesiyle mi?
- v1'de gizli tutulmuştu (STATE açık soru); backend fazında karar verilecek.

---

## 🔭 Backend genel resmi (2026-09-10, Talha notu)
Şu an **frontend odaklıyız**, ama backend'de iş yükü büyük ve birbirine bağlı:
**Sanity (içerik/makine CRUD) · Zoho CRM (tüm lead akışı) · Google Analytics (davranış) ·
Üye girişi.** Sıralama site ayağa kalkınca netleşir; frontend kararları (form gizli alanları,
Sanity-şekilli mock veri) şimdiden bu backend'e zemin hazırlıyor — dönüş maliyeti düşük kalsın diye.
