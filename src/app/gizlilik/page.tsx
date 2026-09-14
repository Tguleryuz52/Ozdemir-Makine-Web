import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Özdemir Makine gizlilik politikası — kişisel verilerinizi nasıl topladığımız, kullandığımız ve koruduğumuz hakkında bilgi.",
};

// KVKK/GDPR uyumu için minimal gizlilik metni. Talha detay ekletmek isterse
// içerik src/content/site.ts altına taşınır. Şimdilik sayfa var, banner'daki
// link kırık olmasın diye — canlıya çıkmadan önce hukuki metin gözden geçirilir.

export default function GizlilikPage() {
  const container = "mx-auto max-w-3xl px-5 lg:px-8";
  return (
    <article className="bg-white">
      <div className={`${container} pt-[calc(var(--spacing-section)+2rem)] pb-[var(--spacing-section)]`}>
        <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand">
          Yasal
        </p>
        <h1 className="mb-8 text-display-lg uppercase text-ink">Gizlilik Politikası</h1>

        <div className="prose max-w-none space-y-6 text-[15px] leading-relaxed text-ink/75">
          <p>
            Özdemir Makine olarak, ziyaretçilerimizin gizliliğine önem veriyoruz. 6698 sayılı
            Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, sitemizi ziyaret ettiğinizde
            işlediğimiz veriler ve haklarınız aşağıda özetlenmiştir.
          </p>

          <h2 className="text-heading font-medium text-ink">Toplanan Veriler</h2>
          <p>
            Sitemizde iletişim ve teklif formları aracılığıyla ilettiğiniz kişisel bilgiler
            (ad, soyad, telefon, e-posta, firma, mesaj) yalnızca talebinize dönüş yapabilmek
            amacıyla toplanır. Ayrıca çerezler aracılığıyla anonim kullanım istatistikleri
            (sayfa görüntüleme, tıklama) toplanır — bunlar kimliğinizle eşleştirilmez.
          </p>

          <h2 className="text-heading font-medium text-ink">Verilerin Kullanımı</h2>
          <p>
            Form verileri, Zoho CRM sistemimize kaydedilerek ekip üyelerimizce sizinle
            iletişime geçmek için kullanılır. Üçüncü şahıslara satılmaz, kiralanmaz.
            Anonim istatistikler Google Analytics 4 ile toplanır ve site deneyimini
            iyileştirmek için kullanılır.
          </p>

          <h2 className="text-heading font-medium text-ink">Çerezler</h2>
          <p>
            Sitemizde &quot;Kabul Et&quot; seçtiğinizde analitik çerezleri etkinleştirmiş
            olursunuz. &quot;Reddet&quot; seçeneği ile bu çerezleri kapatabilirsiniz;
            sitenin çalışması için gerekli olan minimum çerezler dışında hiçbir çerez
            kaydedilmez.
          </p>

          <h2 className="text-heading font-medium text-ink">Haklarınız</h2>
          <p>
            KVKK m. 11 uyarınca; verilerinize erişme, düzeltme, silme ve işlemeyi
            durdurmayı talep etme haklarınız vardır. Talepleriniz için{" "}
            <a href="mailto:info@ozdemirmakine.com.tr" className="text-brand underline underline-offset-2">
              info@ozdemirmakine.com.tr
            </a>{" "}
            adresinden bize ulaşabilirsiniz.
          </p>

          <p className="pt-8 text-[13px] text-ink/50">
            Son güncelleme: 14 Eylül 2026
          </p>
        </div>
      </div>
    </article>
  );
}
