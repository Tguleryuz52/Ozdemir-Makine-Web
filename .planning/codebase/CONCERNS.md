# CONCERNS.md — Bilinen riskler

| # | Risk | Etki | Azaltma |
|---|---|---|---|
| 1 | Test yok | Regresyon fark edilmez | Faz 2 sonunda Playwright + görsel test |
| 2 | CI yok | Bozuk kod commit'lenebilir | Commit öncesi lint + build hook'u |
| 3 | Next 16 eğitim verisinden yeni | Yanlış API kullanımı | `node_modules/next/dist/docs/` oku |
| 4 | Tek tasarım estetiği kanıtlı | Kurumsal ton tutmayabilir | Faz 1'de 3-5 yön üret, seçtir |
| 5 | İçerik envanteri yok | Sayfa tasarımı boşlukta kalır | Faz 0 çıktısı, referans siteden çıkarılacak |
| 6 | Performans bütçesi ölçülmüyor | Core Web Vitals kaçar | Faz 5'te ölçüm, öncesinde görsel disiplin |
| 7 | Form Zoho'ya bağlanacak | İki proje kesişiyor | Lead kaynağı alanı zoho projesinde tanımlı |
