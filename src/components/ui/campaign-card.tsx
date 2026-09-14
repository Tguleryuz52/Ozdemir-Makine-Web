import type { Campaign } from "@/content/campaigns";

// Form üstünde küçük kampanya bağlam kartı — makine kartıyla aynı boyut/stil.
// Sadece özel bağlantıyla (?kampanya=<slug>) gelenlere gösterilir. Sayfanın büyük
// başlığı bozulmaz, kullanıcı sadece hangi kampanya için başvurduğunu net görür.

const detailLabelCls =
  "text-[12px] font-medium uppercase tracking-[0.06em] text-ink/55";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="mb-8 flex items-center gap-4 rounded-2xl border border-brand/25 bg-brand/[0.04] p-4">
      <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand/15 to-ink/10 text-2xl">
        {campaign.ikon}
      </div>
      <div className="min-w-0">
        <p className={detailLabelCls}>Bu kampanya için başvuruyorsunuz</p>
        <p className="mt-1 truncate text-[16px] font-medium tracking-tight text-ink">
          {campaign.title}
        </p>
        {campaign.tarih && (
          <p className="mt-0.5 text-[13px] text-ink/50">{campaign.tarih}</p>
        )}
      </div>
    </div>
  );
}
