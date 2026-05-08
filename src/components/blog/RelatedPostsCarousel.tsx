'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressPost } from '@/types/wordpress';
import { getFeaturedImage } from '@/lib/wp-helpers';

interface RelatedPostsCarouselProps {
  posts: WordPressPost[];
  currentSlug: string;
}

export default function RelatedPostsCarousel({
  posts,
  currentSlug,
}: RelatedPostsCarouselProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="text-[22px] font-black text-[#1A3858] mb-6">
        Outros artigos
      </h2>

      {/* Cards — scroll horizontal no mobile, linha no desktop */}
      <div className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
        {related.map((post, i) => {
          const img = getFeaturedImage(post);
          const title = post.title.rendered.replace(/<[^>]*>/g, '');
          const excerpt = post.excerpt.rendered
            .replace(/<[^>]*>/g, '')
            .slice(0, 90);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="snap-start flex-shrink-0 w-[80vw] md:w-auto bg-white border border-[#EAF4EB] rounded-[20px] overflow-hidden flex flex-col"
            >
              <Link
                href={`/blog/${post.slug}`}
                aria-label={`Ler artigo: ${title}`}
                className="flex flex-col flex-1"
              >
                {/* Imagem */}
                <div className="w-full aspect-video bg-[#EAF4EB] overflow-hidden">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img.url.replace(/^http:\/\//, 'https://')}
                      alt={img.alt}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#56B0BB] text-3xl">
                      💉
                    </div>
                  )}
                </div>

                {/* Texto */}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="text-[14px] font-bold text-[#1A3858] line-clamp-2 leading-snug">
                    {title}
                  </h3>
                  <p className="text-[13px] text-[#5A5A5A] line-clamp-2 flex-1">
                    {excerpt}
                  </p>
                  <span className="text-[#56B0BB] text-[12px] font-semibold mt-1">
                    Ler artigo →
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Botão ver todos */}
      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 border-2 border-[#1A3858] text-[#1A3858] font-black text-[15px] px-8 py-3 rounded-[50px] hover:bg-[#1A3858] hover:text-white transition-colors duration-200"
        >
          Ver todos os posts
        </Link>
      </div>
    </section>
  );
}
