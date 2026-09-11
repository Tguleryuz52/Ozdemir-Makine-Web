// Faz 7 (Blog+Galeri+Ayarlar) — seed: Site Ayarları singleton + 3 örnek blog yazısı.
// Çalıştır:  npx tsx scripts/seed-content.ts
// Idempotent: sabit _id ile createOrReplace. Galeri seed'lenmez (gerçek görsel Studio'dan gelir).

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { siteConfig, socialLinks, blogContent } from "../src/content/site";

const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf8");
const token = envText.match(/^\s*SANITY_API_READ_TOKEN=(.+)$/m)?.[1]?.trim();
if (!token) throw new Error("SANITY_API_READ_TOKEN bulunamadı (.env.local).");

const client = createClient({
  projectId: "qgzvu8g9",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// Blog yazıları için slug/tarih/kategori eşlemesi (sıra blogContent.items ile aynı).
const BLOG_META = [
  { slug: "avrasya-ambalaj-2024", kategori: "Fuar", tarih: "2024-10-15" },
  { slug: "drupa-2024", kategori: "Fuar", tarih: "2024-05-28" },
  { slug: "yeni-makine-yatirimlari", kategori: "Duyuru", tarih: "2024-11-01" },
];

// Tek paragraflık Portable Text gövde (özetten) — yazı boş başlamasın, Özdemir düzenlesin.
function bodyFromText(text: string) {
  return [
    {
      _type: "block",
      _key: "b0",
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: "s0", text, marks: [] }],
    },
  ];
}

async function run() {
  // 1) Site Ayarları singleton
  const settings = {
    _id: "siteSettings",
    _type: "siteSettings",
    email: siteConfig.email,
    telefon: siteConfig.phone.label,
    adresTR: siteConfig.address.tr,
    adresDE: siteConfig.address.de,
    sosyal: socialLinks.map((l, i) => ({
      _key: `soc${i}`,
      _type: "object",
      ad: l.label,
      url: l.href,
    })),
  };
  await client.createOrReplace(settings);
  console.log("✓ Site Ayarları");

  // 2) Blog yazıları
  for (let i = 0; i < blogContent.items.length; i++) {
    const p = blogContent.items[i];
    const meta = BLOG_META[i];
    if (!meta) continue;
    const doc = {
      _id: `post.${meta.slug}`,
      _type: "post",
      baslik: p.title,
      slug: { _type: "slug", current: meta.slug },
      kategori: meta.kategori,
      tarih: new Date(meta.tarih).toISOString(),
      ozet: p.excerpt,
      vitrin: i === 0,
      icerik: bodyFromText(p.excerpt),
    };
    await client.createOrReplace(doc);
    console.log("✓ Blog:", p.title);
  }

  console.log("\n✅ Site Ayarları + 3 blog yazısı Sanity'ye seed edildi.");
}

run().catch((e) => {
  console.error("HATA:", e instanceof Error ? e.message : e);
  process.exit(1);
});
