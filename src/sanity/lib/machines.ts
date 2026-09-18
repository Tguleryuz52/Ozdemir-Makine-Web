import type { SanityImageSource } from "@sanity/image-url";
import type { Machine } from "@/content/machines";
import { client } from "./client";
import { urlForImage } from "./image";

// Uygulama tarafı veri katmanı (Sanity CLI bunu import etmez → @/ alias serbest).
// Sunucu bileşenlerinde çağrılır; sonuç statik/ISR olarak HTML'e gömülür (client-fetch yok).

// Bileşenlerin beklediği Machine + detay alanları. Kaynak: machine şeması.
export type MachineDoc = Machine & {
  href: string;
  format?: string;
  press?: string;
  description?: string;
  features?: string[];
  notes?: string[];
  gallery?: string[];
  pdfUrl?: string;
};

// GROQ projeksiyonu — Sanity alan adlarını bileşen şekline map eder.
const PROJECTION = /* groq */ `{
  "id": _id,
  "slug": slug.current,
  "href": "/makineler/" + slug.current,
  "title": baslik,
  "brand": marka,
  "model": model,
  "productCode": urunKodu,
  "year": yil,
  "condition": coalesce(durumRozeti, select(grup == "sifir" => "Sıfır", grup == "ikinci-el" => "İkinci El", grup == "yedek-parca" => "Yedek Parça", "İkinci El")),
  "group": grup,
  "category": kategori,
  "subcategory": altKategori,
  "priceOnRequest": fiyatSorunuz,
  "price": fiyat,
  "featured": vitrin,
  "format": format,
  "press": baskiAdedi,
  "description": aciklama,
  "features": oneCikanOzellikler,
  "notes": notlar,
  "gorseller": gorseller,
  "pdfUrl": pdf.asset->url
}`;

// Liste/kart projeksiyonu — sadece kartın gösterdiği alanlar + TEK kart görseli.
// 166 makinede açıklama/özellik/tüm galeri tarayıcıya boşuna gitmesin (detay tam çeker).
const LIST_PROJECTION = /* groq */ `{
  "id": _id,
  "slug": slug.current,
  "href": "/makineler/" + slug.current,
  "title": baslik,
  "brand": marka,
  "model": model,
  "productCode": urunKodu,
  "year": yil,
  "condition": coalesce(durumRozeti, select(grup == "sifir" => "Sıfır", grup == "ikinci-el" => "İkinci El", grup == "yedek-parca" => "Yedek Parça", "İkinci El")),
  "group": grup,
  "category": kategori,
  "subcategory": altKategori,
  "priceOnRequest": fiyatSorunuz,
  "price": fiyat,
  "featured": vitrin,
  "cardImage": gorseller[0]
}`;

type RawMachine = Omit<MachineDoc, "image" | "gallery"> & {
  gorseller?: SanityImageSource[];
};

// Sanity görsellerini optimize URL'e çevir; ilki ana görsel (kart).
// Sanity'de görsel slotu açılıp asset yüklenmemişse item {_type:"image"} olur ama
// 'asset' referansı gelmez → urlForImage patlar. Böyle eksik görselleri ele (166
// makinenin çoğu fotosuz gelecek → placeholder'a düşsün, katalog çökmesin).
function hasAsset(g: SanityImageSource): boolean {
  return !!g && typeof g === "object" && !!(g as { asset?: unknown }).asset;
}

function mapMachine({ gorseller, ...rest }: RawMachine): MachineDoc {
  const gallery = (gorseller ?? [])
    .filter(hasAsset)
    .map((g) => urlForImage(g).width(1400).fit("max").auto("format").url());
  return { ...rest, image: gallery[0] ?? "", gallery };
}

// Liste öğesi: tek kart görseli (~800px), ağır alanlar çekilmez (undefined kalır).
type RawListItem = Omit<MachineDoc, "image" | "gallery"> & {
  cardImage?: SanityImageSource;
};

function mapListItem({ cardImage, ...rest }: RawListItem): MachineDoc {
  const image =
    cardImage && hasAsset(cardImage)
      ? urlForImage(cardImage).width(800).fit("max").auto("format").url()
      : "";
  return { ...rest, image };
}

// Next önbellek: 60sn ISR + 'machine' etiketi (webhook revalidate için).
const cacheOpts = { next: { revalidate: 60, tags: ["machine"] } };

export async function getMachines(): Promise<MachineDoc[]> {
  const rows = await client.fetch<RawListItem[]>(
    `*[_type == "machine"] | order(coalesce(yil, 0) desc) ${LIST_PROJECTION}`,
    {},
    cacheOpts,
  );
  return rows.map(mapListItem);
}

export async function getFeaturedMachines(): Promise<MachineDoc[]> {
  const rows = await client.fetch<RawListItem[]>(
    `*[_type == "machine" && vitrin == true] | order(coalesce(yil, 0) desc) ${LIST_PROJECTION}`,
    {},
    cacheOpts,
  );
  return rows.map(mapListItem);
}

export async function getMachineSlugs(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[_type == "machine" && defined(slug.current)].slug.current`,
    {},
    cacheOpts,
  );
}

export async function getMachineBySlug(slug: string): Promise<MachineDoc | null> {
  const r = await client.fetch<RawMachine | null>(
    `*[_type == "machine" && slug.current == $slug][0] ${PROJECTION}`,
    { slug },
    cacheOpts,
  );
  return r ? mapMachine(r) : null;
}

export async function getRelatedMachines(current: MachineDoc): Promise<MachineDoc[]> {
  const rows = await client.fetch<RawListItem[]>(
    `*[_type == "machine" && slug.current != $slug && (kategori == $kat || marka == $brand)][0...4] ${LIST_PROJECTION}`,
    { slug: current.slug, kat: current.category, brand: current.brand },
    cacheOpts,
  );
  return rows.map(mapListItem);
}
