'use client';

import { motion } from 'framer-motion';
import BlogPostCard from '@/components/BlogPostCard';
import { WordPressPost } from '@/types/wordpress';

interface BlogListClientProps {
  posts: WordPressPost[];
}

export default function BlogListClient({ posts }: BlogListClientProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-white border-b border-[#EAF4EB] py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[#56B0BB] text-[15px] font-semibold uppercase tracking-widest mb-3"
          >
            Conteúdo e educação em saúde
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="text-[42px] md:text-[56px] font-black text-[#1A3858] leading-tight mb-4"
          >
            Blog{' '}
            <span className="text-[#56B0BB]">VacinaOne</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
            className="text-[18px] text-[#5A5A5A] max-w-[600px] leading-relaxed"
          >
            Informação clara para ajudar você a cuidar melhor da sua saúde e da
            sua família.
          </motion.p>
        </div>
      </section>

      {/* Grid de posts */}
      <section className="py-16">
        <div className="w-[85%] mx-auto max-w-[1570px]">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-20"
            >
              <p className="text-[20px] text-[#5A5A5A] mb-2">
                Nenhum artigo publicado ainda.
              </p>
              <p className="text-[16px] text-[#5A5A5A]">
                Em breve, você encontrará aqui conteúdos sobre vacinação,
                prevenção e cuidado em saúde.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <BlogPostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
