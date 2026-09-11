import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getPostBySlug, getPostSlugs } from "@/sanity/lib/posts";
import { urlForImage } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Yazı bulunamadı" };
  return { title: post.title, description: post.excerpt };
}

// Portable Text → site tipografisi. Görsel blokları Sanity CDN'den render eder.
const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlForImage(value as SanityImageSource)
        .width(1400)
        .fit("max")
        .auto("format")
        .url();
      const alt = (value as { alt?: string })?.alt ?? "";
      return (
        <span className="my-8 block overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={alt} loading="lazy" className="w-full" />
        </span>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-4 text-[1.6rem] font-medium tracking-tight text-ink">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-[1.3rem] font-medium tracking-tight text-ink">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-[1.05rem] leading-relaxed text-ink/70">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-brand pl-5 italic text-ink/70">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="text-brand underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc space-y-1.5 pl-5 text-ink/70">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal space-y-1.5 pl-5 text-ink/70">{children}</ol>
    ),
  },
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = post.date
    ? new Date(post.date).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-[46rem] px-6 pb-[var(--spacing-section)] pt-28 lg:pt-32">
        <Link
          href="/blog"
          className="font-mono text-[13px] uppercase tracking-[0.08em] text-ink/50 transition-colors hover:text-brand"
        >
          ← Blog
        </Link>

        <p className="mt-8 font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-brand">
          {post.category}
          {date ? ` · ${date}` : ""}
        </p>
        <h1 className="mt-4 text-[2.25rem] font-medium leading-[1.1] tracking-tight text-ink lg:text-[2.75rem]">
          {post.title}
        </h1>
        {post.excerpt && (
          <p className="mt-5 max-w-[42ch] text-[1.15rem] leading-relaxed text-ink/60">
            {post.excerpt}
          </p>
        )}

        {post.image && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-paper">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(min-width: 768px) 46rem, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mt-10">
          <PortableText value={post.body} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}
