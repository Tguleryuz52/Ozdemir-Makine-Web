# Faz 8 — Backend & Ölçüm (Spec)

**Tarih:** 2026-09-14 · **Durum:** ✅ TAMAM

## Amaç
Sitenin arka planını canlıya hazır hâle getirmek: form → CRM, mail bildirim, çerez rızası, davranış ölçümü, Studio yayın → site anında tazelenme. Vercel deploy'a git-hazır kod.

## Kararlar (kilitli)
- **Zoho CRM Insert Leads API** (Web Form endpoint DEĞİL) — OAuth self-client + refresh token. Kontrol, retry, mapping, hata yakalama.
- **DC = .eu** (Europe): `accounts.zoho.eu` / `www.zohoapis.eu`.
- **KVKK banner: 2-buton** ("Reddet" + "Kabul Et") — hukuki minimum, dönüşüm düşürmez. Detay tercih paneli YOK (v2).
- **E-posta akışı: Kullanıcı + Ofis** — form doldurana teşekkür + `LEAD_NOTIFY_EMAIL`'e bildirim. Zoho fail olursa güvenlik ağı.
- **Resend** — Aylık 3000 ücretsiz, modern SDK. `MAIL_FROM=onboarding@resend.dev` (test). Prod'da `info@ozdemirmakine.com.tr` DNS doğrulanınca.
- **Spam: Honeypot + rate-limit** — B2B için yeter, reCAPTCHA gereksiz karmaşa.
- **GA4 consent-first** — Default `denied` (KVKK), banner "Kabul Et" → `granted`.
- **Kampanya UI URL-driven** — `?kampanya=<slug>` config'ten okur, ekstra route açılmaz.

## Mimari
- **`/api/revalidate`**: `next-sanity/webhook` parseBody + secret. `_type in [machine, post, galleryItem, siteSettings]` → `revalidateTag(tag, { expire: 0 })`. Publish sonrası anında.
- **`/api/lead`** (main entry): Zod validation → honeypot check → rate-limit → **paralel:** Zoho insertLead + Resend userMail + Resend officeMail. Kısmi başarısızlık ofis mail'inde raporlanır (güvenlik ağı).
- **`src/lib/zoho/client.ts`**: `getAccessToken()` (refresh flow, in-memory cache 1h), `insertLead()` (POST /crm/v8/Leads, description biçimlendirici — emojisiz ASCII, "===" başlık + `>>` alt-başlıklar + makine sayfa linki).
- **`src/lib/mail/send.ts`**: `Resend.emails.send()` sarmalayıcı + 2 branded HTML template.
- **`src/lib/rate-limit/ip.ts`**: In-memory bucket, 5 dk / 3 istek.
- **`src/components/ui/cookie-banner/`**: `localStorage` (`ozd-cookie-consent`), `gtag('consent', 'update')` çağrısı.
- **`src/components/analytics/{ga4,utm-capture}.tsx`**: Consent-first script, UTM ilk-tıklama attribution.
- **`src/content/campaigns.ts`** + **`src/components/ui/campaign-card.tsx`** + `?kampanya=` URL param.

## Env Değişkenleri (`.env.local`)
```
SANITY_WEBHOOK_SECRET=<32-byte hex>
ZOHO_CRM_CLIENT_ID=...
ZOHO_CRM_CLIENT_SECRET=...
ZOHO_CRM_REFRESH_TOKEN=...
ZOHO_CRM_ACCOUNTS_DOMAIN=accounts.zoho.eu
ZOHO_CRM_API_DOMAIN=www.zohoapis.eu
LEAD_NOTIFY_EMAIL=info@ozdemirmakine.com.tr
RESEND_API_KEY=re_...
MAIL_FROM=Özdemir Makine <onboarding@resend.dev>   # prod'da custom domain
NEXT_PUBLIC_GA_ID=G-ZQ9989Y9P2
```

## Zoho CRM Kurulumu (Talha manuel)
1. **Refresh token** — `api-console.zoho.eu` → Self Client → Grant Code scope `ZohoCRM.modules.leads.CREATE,ZohoCRM.modules.leads.READ,ZohoCRM.settings.READ` → `_zoho-refresh.ts` ile çevirdi.
2. **Custom View "🌐 Websiteden Gelenler"** — Leads → `...` → Yeni Özel Görünüm → Kaynak içerir "Website" → Herkes.
3. **Lead Source pick list değerleri** — Otomatik oluştu (Zoho custom değerleri kabul etti).

## Doğrulama (2026-09-14)
- Test lead × 3 → hepsi Zoho'ya düştü, Kaynak doğru, description mükemmel format, link tıklanır.
- Resend test modu → hesap sahibi mail'ine 2 mail (teşekkür + ofis bildirim).
- Cookie banner 2 buton çalışıyor, `analytics_storage` consent güncelleniyor.
- GA4 script yüklendi (`gtag` global), Measurement ID doğru okundu (env trim guard).
- Zoho MCP ile bağımsız doğrulama: `getRecords(module=Leads)` → son 3 lead field yapısı beklendiği gibi.
- tsc temiz.

## Ertelenen (→ Faz 9)
- **Sanity → Zoho Products SYNC** — Sanity webhook `_type == machine` yakalayınca paralel Products upsert.
- **Leads modülünde "İlgilendiği Makine (Website)" Lookup field** — Talha manuel oluşturacak, sonra kodda ID lookup eklenecek.
- **Ön gereklilik:** Sanity READ token yenile (bugünkü scriptte 401 aldı) + Zoho için `products.CREATE` scope'lu yeni refresh token.

## Prod Öncesi (→ Faz 10 Deploy)
- Resend `ozdemirmakine.com.tr` domain doğrulama (SPF/DKIM/DMARC DNS kayıtları) → `MAIL_FROM=info@ozdemirmakine.com.tr` → herkese mail atabilir.
- Sanity Manage → API → Webhooks → Create: URL `https://<vercel-app>.vercel.app/api/revalidate`, secret aynı, `_type in [...]` filter.
- Vercel env değişkenleri (yukarıdaki listeden hepsi, `.env.local`'den kopyala, hepsi "Sensitive").
- Sanity CORS: `https://<vercel-app>.vercel.app` origin ekle.
