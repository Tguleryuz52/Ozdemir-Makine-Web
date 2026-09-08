# TESTING.md — Doğrulama stratejisi

## Şu anki durum
Otomatik test **yok**. Bu bilinçli bir karar, kalıcı değil.
Ortada sayfa yokken test yazmak boşa iş olurdu.

## Şimdi nasıl doğruluyoruz
1. `npm run lint` — ESLint temiz olmalı.
2. `npm run build` — tip hatası ve build hatası yakalanır.
3. Tarayıcıda gözle kontrol. Claude sayfayı Playwright ile açıp görebilir.

## Ne zaman test eklenecek
**Faz 2 bitince** (ana sayfa ayakta olduğunda). O noktada:
- Playwright projeye eklenir.
- Kritik akışlar için birkaç E2E test: sayfa açılıyor mu, navigasyon çalışıyor mu,
  form gönderiliyor mu.
- Ana sayfa ve ürün sayfası için görsel anlık görüntü testi.

## Ne test edilmez
Tasarımın "güzel" olup olmadığı test edilmez, o tasarım kapısının işi.
Test kırılma yakalar, zevk yakalamaz.
