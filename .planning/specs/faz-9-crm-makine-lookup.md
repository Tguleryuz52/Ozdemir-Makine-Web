# Faz 9 — CRM Makine Lookup (Spec)

**Tarih:** 2026-09-15 · **Durum:** ✅ TAMAM · **Süre:** ~30 dk

## Amaç
Website form'undan gelen bir teklif/iletişim lead'i, Zoho CRM'de o makinenin **Products** kaydına otomatik bağlansın; satış temsilcisi lead'i açtığında "İlgilendiği Makine" dropdown'unda makine seçili görünsün.

## Karar (kilitli)
- **Zoho = master data** (single source of truth). 164 makine zaten Zoho Products modülünde. Talha elle yönetiyor.
- **Sync YOK** (planlanmıştı, iptal edildi). Sanity → Zoho sync mimari olarak yanlış çünkü Zoho zaten dolu. Sanity gerekirse ileride Zoho'nun aynası olur.
- **Yeni Lookup field oluşturmadık.** Mevcut `lgilendi_i_Makine_PressXchange` field'ı reuse edildi. Semantik olarak "PressXchange" adını taşır ama `Lead_Source` alanı zaten kaynağı ayırıyor (`Website — Makine Teklifi` vs `PressXchange`) — lookup sadece "hangi makine" sorusuna cevap veriyor.
- **Eşleşme anahtarı:** Sanity `urunKodu` = Zoho `Product_Code` **birebir aynı** (numerik: 60016, 80022, 120009...).

## Mimari
- **`src/lib/zoho/client.ts`** yeni helper: `findProductByCode(token, code)` → `POST /crm/v8/Products/search?criteria=(Product_Code:equals:<code>)` → `{ id, name } | null`. Fail-soft: HTTP hatası/204 → null.
- **`insertLead()`** — `machineCode` gelirse `findProductByCode` çağrılır, ID bulunursa `lgilendi_i_Makine_PressXchange: { id }` Lead payload'ına eklenir. Bulunmazsa Lead yine oluşur (dropdown boş).
- **Sanity `machine.ts`** — `urunKodu` field'ı: title "Ürün Kodu (Zoho CRM ile eşleşme)", uzun açıklama Zoho eşleşme kritik olduğunu vurguluyor, `custom()` validation boşluk uyarısı veriyor.
- **Pipeline (mevcut Faz 8 kodu):** `machine.productCode` (Sanity) → `contact-section` prop → `contact-form` hidden input `makineKodu` → POST `/api/lead` → zod schema `makineKodu` → `insertLead({ machineCode })` → Zoho.

## Uçtan Uca Akış (satış temsilcisi bakışı)
1. Talha Sanity Studio'da yeni makine ekler → `urunKodu` alanına Zoho'daki Product Code'u birebir yazar.
2. Ziyaretçi makine sayfasında "Fiyat Teklifi Al" butonuna basar → `/iletisim?makine=<slug>` açılır → form makinesi bağlam kartı gösterir + hidden `makineKodu` dolar.
3. Form gönderilir → `/api/lead` → `insertLead()` → Zoho'da lead oluşur, `lgilendi_i_Makine_PressXchange` alanı Product ID ile dolu.
4. Satış temsilcisi Zoho'da lead'i açar → "İlgilendiği Makine (PressXchange)" dropdown'unda makine adı seçili → tıklarsa Products kaydına gider. Description'da da tıklanır web link + tüm bilgi.

## Test (2026-09-15, Zoho MCP)
- `searchRecords(Products, Product_Code:equals:60016)` → ID `997203000001002091` (DGM TECHNOCUT 1650 S) ✓
- `createRecords(Leads, { ..., lgilendi_i_Makine_PressXchange: { id: "997203000001002091" } })` → Lead ID `997203000001945001` ✓
- `getRecord(Leads, 997203000001945001)` → `lgilendi_i_Makine_PressXchange: { name: "DGM TECHNOCUT 1650 S", id: "..." }` ✓ **Lookup dolu.**

## Sonraki (ertelenen)
- Sanity → Zoho Products **sync** (webhook upsert): şu an gerek yok. Zoho master; Talha elle yönetiyor. İstenirse ileride: `products.CREATE` scope + `scripts/sync-sanity-to-zoho.ts` + `/api/revalidate` içine paralel upsert.
- Sanity `urunKodu` field'ı için Zoho'dan **otomatik picker** (Studio'da dropdown Zoho'dan gelen 164 makineyi göstersin): custom Sanity input component gerekir, karmaşık. Şimdilik manuel kopyala/yapıştır yeter.
