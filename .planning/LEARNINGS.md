# LEARNINGS.md — Kalıcı dersler

> Format: ne oldu / neden önemli / bir dahakine ne yap.
> Her oturum sonunda yeni ders çıktıysa buraya eklenir. Dosya hiç silinmez.

## L-1 Temeli önce kur, sonra kod yaz
**Ne oldu:** Zoho tarafında bağlantı kurulduktan sonra planlama katmanı yazıldı ve
o katman sayesinde bir sonraki oturum sıfırdan başlamayacak hale geldi.
**Neden önemli:** Bağlam dosyada durmazsa her oturum aynı keşfi tekrar yapar,
token yanar ve karar geçmişi kaybolur.
**Bir dahakine:** Kod yazmadan önce `STATE.md` ve karar kaydı hazır olsun.

## L-2 Türkçe metni curl ile dış servise gönderme
**Ne oldu:** Trello kart açıklaması curl ile gönderildi, kartta yüzde kodları
(`%2A%2AAma%E7%2A%2A`) göründü. Kabuk metni Windows kod sayfasına çevirdi.
İstek 200 döndüğü için hata fark edilmedi, kullanıcı kartta gördü.
**Neden önemli:** Hata kullanıcının gördüğü yüzeyde oldu.
**Bir dahakine:** Python `urlencode(..., encoding="utf-8")` kullan,
`charset=utf-8` başlığı ekle, **yazdıktan sonra geri oku ve doğrula.**
Bu kural iletişim formunun Zoho'ya yazacağı alanlar için de geçerli.

## L-3 Dış yüzeye yazarken kısa yaz
**Ne oldu:** Trello kart açıklaması uzun ve başlıklı yazıldı, kullanıcı
"blog yazmışsın" dedi. 2500 karakterden 500 karaktere indirildi.
**Neden önemli:** Kart bir durum işaretidir, belge değil. Uzun anlatım
`.planning/` içinde durur.
**Bir dahakine:** Dışarıya giden metin: sonuç + açık iş. Anlatı yok.

## L-4 Anomali görünce bir seviye alta in
**Ne oldu:** Aynı kampanyanın iki gönderim kaydı görülünce "mükerrer gönderim"
uyarısı yapıldı. Kırılıma bakınca birinin 4 kişilik test olduğu anlaşıldı.
**Neden önemli:** Erken ve yanlış uyarı güveni sarsar.
**Bir dahakine:** Uyarmadan önce alt kırılıma bak.

## L-5 Yeni araç ekleme, mevcut yığını kanıtla
**Ne oldu:** Yetenek değerlendirmesinde on bir denenmemiş eklenti olduğu görüldü.
Karar: yeni araç kurmak yerine gerçek bir işi baştan sona mevcut yığınla yapmak.
**Neden önemli:** Denenmemiş araç yığını güç değil, dağınıklıktır.
**Bir dahakine:** "Şunu da kuralım" refleksine direnç göster. Eksik olan
araç değil, o aracın gerçek bir işte kullanılmış olması.

## L-6 Referans canlıysa ölçmek varken tahmin etme
**Ne oldu:** himon'un footer değerlerini ekran görüntüsünden göz kararı çıkarmak
yerine Playwright ile canlı siteye gidip `getComputedStyle` çekildi. Tracking'in
em cinsinden sabit olduğu (-0.02em gövde, -0.05em display), line-height'ın sadece
iki değer kullandığı (1.1 display, 1.5 geri kalan) ve footer zemininin `#1C1C1C`
olduğu ancak ölçünce ortaya çıktı. Ekran görüntüsünden bu kesinlik imkânsızdı.
**Neden önemli:** Göz kararı her seferinde bir revize turu doğurur. Header'da
onlarca tur bu yüzden döndü. Ölçüm turu sıfıra indirir.
**Bir dahakine:** Referans canlıda duruyorsa **önce ölç, sonra yaz.**
Yöntem `reference-parity` skill'i A2a adımında. Çıktı
`design/references/<referans>-<bolum>-measured.md` dosyasına yazılır.

## L-7 Revizeyi ucuz katmanda yap
**Ne oldu:** Header'da React bileşeni yazılıp sonra "buton büyük", "ok taşıyor",
"hover kırpıyor" turları dönüldü. Her tur tsc + eslint + dev server + ekran
görüntüsü maliyeti getirdi.
**Neden önemli:** Revize kaçınılmaz, ama nerede yapıldığı maliyeti 10 kat değiştirir.
React bileşeninde iterasyon pahalı, tek dosya HTML mockup'ta ucuz.
**Bir dahakine:** Sıra şu olsun → **ölç → UI-SPEC → HTML mockup → onay → React**.
Revizeler mockup adımında toplanır, React'e geçildiğinde neredeyse hiç kalmaz.
GSD karşılıkları: `/gsd-ui-phase` (kontrat), `/gsd-sketch` (mockup), `/gsd-ui-review` (denetim).

## L-8 Öğrenilen şey skill'e yazılmazsa öğrenilmemiştir
**Ne oldu:** L-6'daki ölçüm tekniği keşfedildiğinde `reference-parity` skill'inde
yoktu. Skill'e A2a adımı olarak eklenmeseydi bir sonraki oturumda yine göz kararı
yapılacaktı.
**Neden önemli:** `LEARNINGS.md` bir arşivdir, davranışı değiştirmez. Davranışı
değiştiren şey skill dosyasıdır, çünkü iş anında yüklenir.
**Bir dahakine:** Bir ders **nasıl çalıştığımı** değiştiriyorsa ilgili skill dosyasına
yazılır, buraya sadece kaydı düşülür. Ders **nerede olduğunu** değiştiriyorsa
`.planning/codebase/UI-MAP.md` güncellenir. Detay: `.claude/skills/project-learning/`.
