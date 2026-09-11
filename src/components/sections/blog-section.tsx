import { blogContent, type BlogPost } from "@/content/site";
import { BlogCard } from "@/components/ui/blog-card";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

// himon "/blog" uyarlaması — büyük ortalı başlık + solda kicker etiketi (markalar ile
// aynı kalıp) + 3'lü blog kartı ızgarası. Server bileşen; yazılar prop ile (Sanity).
// kicker/heading bölüm başlığıdır, statik kalır.

const container = "mx-auto max-w-[110rem] px-5 lg:px-8";

export function BlogSection({ items }: { items: BlogPost[] }) {
  const { kicker, heading } = blogContent;

  return (
    <section className="bg-white">
      <div className={`${container} pt-[calc(var(--spacing-section)+2rem)] pb-[var(--spacing-section)]`}>
        {/* Başlık — himon: büyük ortalı başlık, solda küçük kicker etiketi */}
        <Reveal className="relative">
          <p className="absolute left-0 top-2 hidden items-center gap-2 lg:flex">
            <span className="size-2.5 bg-brand" aria-hidden="true" />
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-ink/70">
              {kicker}
            </span>
          </p>
          <h1 className="text-center text-display-xl uppercase text-ink">{heading}</h1>
        </Reveal>

        <RevealGroup className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post, i) => (
            <RevealItem key={`${post.title}-${i}`}>
              <BlogCard post={post} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

export default BlogSection;
