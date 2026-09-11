import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/content/site";

// himon "/blog" kartı birebir: üstte köşeleri yuvarlak görsel (üzerinde sol-üst kategori
// etiketi + sağ-üst yuvarlak ok butonu) · altında başlık + 2 satır özet. Görsel gelene
// kadar off-white panel + kategori placeholder olarak durur. Server bileşen — hover saf CSS.
export function BlogCard({ post }: { post: BlogPost }) {
  const { title, excerpt, category, image, href } = post;

  const inner = (
    <>
      {/* Görsel — köşeleri yuvarlak, kategori + ok overlay; hover'da hafif zoom */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-paper">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        ) : (
          <span
            className="absolute inset-0 grid place-items-center text-[15px] font-medium uppercase tracking-[0.14em] text-ink/25"
            aria-hidden="true"
          >
            Özdemir
          </span>
        )}

        {/* Kategori etiketi — sol üst, frosted pill */}
        <span className="absolute left-3 top-3 rounded-md bg-white/85 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-ink/80 backdrop-blur-sm">
          {category}
        </span>

        {/* Ok butonu — sağ üst, yuvarlak */}
        <span
          className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-white/85 text-ink/70 backdrop-blur-sm transition-colors duration-300 group-hover:bg-brand group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowUpRight className="size-4" strokeWidth={1.8} />
        </span>
      </div>

      {/* Başlık + özet */}
      <h3 className="mt-5 text-[22px] font-medium leading-snug tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-brand">
        {title}
      </h3>
      <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-ink/55">{excerpt}</p>
    </>
  );

  const base = "group block";

  return href ? (
    <a href={href} className={base}>
      {inner}
    </a>
  ) : (
    <div className={base}>{inner}</div>
  );
}

export default BlogCard;
