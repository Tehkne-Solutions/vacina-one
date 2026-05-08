'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WordPressPost } from '@/types/wordpress';

interface BlogPostCardProps {
  post: WordPressPost;
  index?: number;
}

function getFeaturedImageUrl(post: WordPressPost): string | null {
  const embedded = (post as unknown as Record<string, unknown>)['_embedded'] as
    | Record<string, unknown>
    | undefined;
  if (!embedded) return null;
  const media = embedded['wp:featuredmedia'] as
    | Array<{ source_url?: string }>
    | undefined;
  return media?.[0]?.source_url ?? null;
}

function getAuthorName(post: WordPressPost): string {
  const embedded = (post as unknown as Record<string, unknown>)['_embedded'] as
    | Record<string, unknown>
    | undefined;
  if (!embedded) return 'VacinaOne';
  const authors = embedded['author'] as
    | Array<{ name?: string }>
    | undefined;
  return authors?.[0]?.name ?? 'VacinaOne';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date);
  const title = post.title.rendered.replace(/<[^>]*>/g, '');
  const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 120);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(86,176,187,0.18)' }}
      className="bg-white rounded-2xl border border-[#EAF4EB] overflow-hidden flex flex-col"
    >
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Ler artigo: ${title}`}
        className="flex flex-col flex-1"
      >
        {/* Imagem quadrada */}
        <div className="relative w-full aspect-square overflow-hidden bg-[#EAF4EB]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-[#56B0BB] text-4xl">💉</span>
            </div>
          )}
        </div>

        {/* Corpo do card */}
        <div className="p-6 flex flex-col flex-1 gap-3">
          {/* Autor + data */}
          <div className="flex items-center gap-2 text-[#5A5A5A] text-[13px] font-[Inter,sans-serif]">
            <span>{author}</span>
            <span className="w-px h-3 bg-[#5A5A5A] opacity-40" />
            <span>{date}</span>
          </div>

          {/* Título */}
          <h2 className="text-[18px] font-bold text-[#1A3858] leading-snug line-clamp-2 underline decoration-[#56B0BB] decoration-1 underline-offset-2">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-[14px] text-[#5A5A5A] leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* CTA inline */}
          <span className="text-[#56B0BB] text-[13px] font-semibold mt-auto">
            Ler artigo →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
