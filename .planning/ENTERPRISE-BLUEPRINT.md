# ENTERPRISE-BLUEPRINT.md — İleri hedef mimari

> ⚠️ Bu MVP değildir. Buradaki hiçbir madde Faz 0-5'i kirletmez.
> Site ayağa kalktıktan sonra bakılır.

## 1. İçerik yönetimi
Şu an içerik dosyada. Ölçek büyürse başsız CMS (Sanity, Payload) düşünülür.
Tetikleyici: içerik güncellemesi için kod değişikliği bir yük haline geldiğinde.

## 2. Çok dillilik
TR/EN yapısal ayrım, dil bazlı route ve metadata. İhracat hedefi netleşince.

## 3. Form ve CRM tam entegrasyonu
Form doğrudan CRM'e yazar, kaynak ve kampanya alanları dolu gelir,
onay kuyruğu atlanır veya alarmlanır. `zoho-crm-integration` projesiyle ortak iş.

## 4. Analitik ve dönüşüm ölçümü
Hangi sayfa teklif getiriyor, hangi ürün ilgi çekiyor. Kampanya UTM'leri
site içinde takip edilir ve CRM kaydına kadar taşınır.

## 5. Performans olgunluğu
Görsel optimizasyon pipeline'ı, font yükleme stratejisi, kritik CSS,
performans bütçesinin CI'da zorlanması.

## 6. Ürün kataloğu derinliği
Filtreleme, karşılaştırma, teknik özellik tabloları, PDF döküman indirme.

## 7. Test olgunluğu
Görsel regresyon, erişilebilirlik testinin otomatikleşmesi, CI üzerinde koşma.
