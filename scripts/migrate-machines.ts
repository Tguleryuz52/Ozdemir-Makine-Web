// Faz 7 — Migration: src/content/machines.ts içindeki 17 makineyi Sanity'ye aktarır.
// Çalıştır:  npx tsx scripts/migrate-machines.ts
// Idempotent: sabit _id (machine.<id>) ile createOrReplace — tekrar çalıştırınca çoğaltmaz,
// günceller. Görsel/PDF aktarılmaz (henüz gerçek asset yok); Studio'dan yüklenecek.

import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { machines, machineDetails } from "../src/content/machines";

// tsx .env.local'i otomatik yüklemez — token'ı elle oku.
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

function clean<T extends Record<string, unknown>>(obj: T): T {
  for (const k of Object.keys(obj)) if (obj[k] === undefined) delete obj[k];
  return obj;
}

async function run() {
  const docs = machines.map((m) => {
    const extra = machineDetails[m.id] ?? {};
    return clean({
      _id: `machine.${m.id}`,
      _type: "machine",
      baslik: m.title,
      slug: { _type: "slug", current: m.slug },
      marka: m.brand,
      model: m.model,
      urunKodu: m.productCode,
      yil: m.year,
      format: extra.format,
      baskiAdedi: extra.press,
      grup: m.group,
      durumRozeti: m.condition,
      kategori: m.category,
      altKategori: m.subcategory,
      vitrin: m.featured ?? false,
      fiyatSorunuz: m.priceOnRequest,
      fiyat: m.price,
      aciklama: extra.description,
      oneCikanOzellikler: extra.features,
      notlar: extra.notes,
    });
  });

  for (const d of docs) {
    await client.createOrReplace(d);
    console.log("✓", d._id, "—", d.baslik);
  }
  console.log(`\n✅ ${docs.length} makine Sanity'ye aktarıldı (production dataset).`);
}

run().catch((e) => {
  console.error("HATA:", e instanceof Error ? e.message : e);
  process.exit(1);
});
