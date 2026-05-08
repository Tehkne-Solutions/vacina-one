'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { WordPressPost } from '@/types/wordpress';

interface BlogRelatedPostsProps {
  posts: WordPressPost[];
  currentSlug?: string;
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

export default function BlogRelatedPosts({
  posts,
  currentSlug,
}: BlogRelatedPostsProps) {
  const related = posts
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="bg-[#F2FBFA] rounded-2xl py-10 px-8 mt-12">
      <h2 className="text-[22px] font-bold text-[#1A3858] mb-6">
        Outros artigos
      </h2>

      <div className="flex flex-col gap-4">
        {related.map((post, i) => {
          const imageUrl = getFeaturedImageUrl(post);
          const title = post.title.rendered.replace(/<[^>]*>/g, '');

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              whileHover={{ x: 4 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Ler artigo: ${title}`}
                className="flex items-center gap-4 group"
              >
                {/* Miniatura quadrada */}
                <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-[#EAF4EB]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={title}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#56B0BB] text-xl">
                      💉
                    </div>
                  )}
                </div>

                {/* Texto */}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-[14px] font-semibold text-[#1A3858] line-clamp-2 group-hover:text-[#56B0BB] transition-colors">
                    {title}
                  </span>
                  <span className="text-[12px] text-[#56B0BB] font-medium">
                    Continuar lendo →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
