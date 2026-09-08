---
name: project-learning
description: Turn what was learned this session into a permanent behavior change, and keep the project map current so revisions land instantly. Use at the end of a session, when the user says "bunu unutma / kaydet / öğren", when the same revision reason comes up twice, when a new component or section is finished, or when a wrong assumption was corrected. Routes each lesson to the right file — skill, UI map, learnings log, or state.
---

# Project Learning — öğrendiğini kalıcı davranışa çevir

**Temel ilke:** Bir ders arşive yazılırsa unutulur, skill'e yazılırsa uygulanır.
`LEARNINGS.md` bir kayıttır, davranışı değiştirmez. Davranışı değiştiren şey iş anında
yüklenen skill dosyasıdır. O yüzden her ders **doğru dosyaya** gider.

## Ne zaman tetiklenir
- Oturum sonunda (her zaman)
- Talha "bunu unutma", "kaydet", "bir daha böyle yapma" dediğinde
- **Aynı revize sebebi ikinci kez geldiğinde** ← en önemli tetikleyici
- Yeni bir bölüm/bileşen bittiğinde (harita güncellenmeli)
- Yanlış bir varsayım düzeltildiğinde

## Yönlendirme tablosu — ders nereye yazılır

| Ders neyi değiştiriyor | Nereye yazılır |
|---|---|
| **Nasıl çalıştığımı** (yöntem, sıra, teknik) | İlgili **skill dosyası** (`.claude/skills/*/SKILL.md`) |
| **Nerede olduğunu** (hangi öğe hangi dosyada) | `.planning/codebase/UI-MAP.md` |
| **Neye benzeyeceğini** (renk, ölçü, token) | `design/design-system.md` |
| **Referansın gerçek değerlerini** | `design/references/<ref>-<bolum>-measured.md` |
| **Nerede kaldığımızı** | `.planning/STATE.md` + `.planning/.continue-here.md` |
| **Bir daha yapılmayacak hatayı** | `.planning/LEARNINGS.md` (numaralı ders) |
| **Klasör/dosya düzenini** | `.planning/codebase/STRUCTURE.md` |

**Kural:** yöntem dersi hem skill'e yazılır **hem** `LEARNINGS.md`'ye tek satır kayıt düşülür,
ders hangi skill'e gittiği belirtilerek. Böylece arşiv de tam kalır, davranış da değişir.

## Ders yazma formatı
`LEARNINGS.md` içinde, numaralı, üç başlık:
```
## L-<n> <tek cümlelik başlık, emir kipi>
**Ne oldu:** somut olay, tahmin değil.
**Neden önemli:** maliyeti ne oldu.
**Bir dahakine:** uygulanabilir kural + hangi skill'e yazıldığı.
```

## Harita güncelleme — `UI-MAP.md`
Yeni bir bölüm veya bileşen bittiğinde **aynı oturumda** satır eklenir:

| Sütun | Ne yazılır |
|---|---|
| Ekranda ne görüyorsun | Talha'nın kullanacağı dille ("sağdaki siyah Teklif Al butonu") |
| Dosya | `path:satır` |
| Ayar nerede | hangi değişken/token/class kontrol ediyor |

Talha'nın revizeleri **görsel dille** gelir ("şu boşluk", "şu buton"). Import grafiği
bu soruya cevap vermez, bu tablo verir. Grep atmadan hedefe gitmenin tek yolu bu tablonun güncel olması.

**Geçici ve bekleyen şeyler** de haritaya yazılır (placeholder logo, silinecek demo sayfa,
kilitli arşiv bekleyen görsel). Aksi halde her oturumda yeniden keşfedilir.

## Kod grafiği — ne zaman
`gsd-graphify` **şimdi değil.** Tetikleyici: `src/components/sections/` beş bileşene çıktığında
(Faz 4 sonu). O boyuta kadar `UI-MAP.md` + `STRUCTURE.md` yeterli ve daha ucuz.
`repomix` bu proje için kullanılmaz; `ozdmak.rar` açıldığında eski siteyi tek seferde
sindirmek için kullanılır.

## Oturum sonu kontrol listesi
1. Bu oturumda **yöntemi** değiştiren bir şey öğrendim mi → skill'e yaz
2. Yeni bileşen/bölüm çıktı mı → `UI-MAP.md`'ye satır ekle
3. Referanstan ölçüm aldım mı → `*-measured.md` dosyasına yaz
4. Token değişti mi → `design/design-system.md`
5. Ders çıktı mı → `LEARNINGS.md` (numaralı)
6. `STATE.md` + `.continue-here.md` güncelle
7. Commit

## Anti-kalıp
- ❌ Dersi sadece sohbette söyleyip geçmek
- ❌ Yöntem dersini `LEARNINGS.md`'ye yazıp skill'e yazmamak (bir daha uygulanmaz)
- ❌ `UI-MAP.md`'yi faz sonuna biriktirmek (bileşen bitince aynı anda yaz)
- ❌ Talha'nın söylemediği şeyi ders diye kaydetmek
- ❌ Repo'nun zaten anlattığı şeyi (dosya yapısı, git geçmişi) ders diye yazmak
