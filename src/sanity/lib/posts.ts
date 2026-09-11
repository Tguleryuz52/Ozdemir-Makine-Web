import { client } from "./client";
import { urlForImage } from "./image";
import type { BlogPost } from "@/content/site";

// Portable Text bloğu (yazı gövdesi) — blok + gömülü görsel. any yasak, gevşek ama tipli.
export type PortableBlock = { _type: string; _key: string; [k: string]: unknown };

// Bileşen şekli: BlogCard'ın beklediği BlogPost + detay için slug/tarih/gövde.
export type PostDoc = BlogPost & {
  slug: string;
  date?: string;
  featured?: boolean;
  body: PortableBlock[];
};

const cacheOpts = { next: { revalidate: 60, tags: ["post"] } };

const PROJECTION = `{
  "slug": slug.current,
  "title": baslik,
  "excerpt": ozet,
  "category": kategori,
  "date": tarih,
  "featured": vitrin,
  kapak,
  icerik
}`;

type RawPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  featured?: boolean;
  kapak?: Parameters<typeof urlForImage>[0];
  icerik?: PortableBlock[];
};

function mapPost({ kapak, icerik, ...rest }: RawPost): PostDoc {
  return {
    ...rest,
    excerpt: rest.excerpt ?? "",
    category: rest.category ?? "",
    image: kapak ? urlForImage(kapak).width(1400).fit("max").auto("format").url() : "",
    href: `/blog/${rest.slug}`,
    body: icerik ?? [],
  };
}

export async function getPosts(): Promise<PostDoc[]> {
  const rows = await client.fetch<RawPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(vitrin desc, tarih desc) ${PROJECTION}`,
    {},
    cacheOpts,
  );
  return rows.map(mapPost);
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(
    `*[_type == "post" && defined(slug.current)].slug.current`,
    {},
    cacheOpts,
  );
}

export async function getPostBySlug(slug: string): Promise<PostDoc | null> {
  const row = await client.fetch<RawPost | null>(
    `*[_type == "post" && slug.current == $slug][0] ${PROJECTION}`,
    { slug },
    cacheOpts,
  );
  return row ? mapPost(row) : null;
}
