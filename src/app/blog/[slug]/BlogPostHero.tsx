'use client';

import { motion } from 'framer-motion';

interface BlogPostHeroProps {
  title: string;
  author: string;
  date: string;
  readTime: number;
}

export default function BlogPostHero({
  title,
  author,
  date,
  readTime,
}: BlogPostHeroProps) {
  return (
    <section className="bg-white border-b border-[#EAF4EB] py-14">
      <div className="w-[85%] mx-auto max-w-[860px]">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[#56B0BB] text-[13px] font-semibold uppercase tracking-widest mb-4"
        >
          Blog VacinaOne
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="text-[32px] md:text-[44px] font-black text-[#1A3858] leading-tight mb-6"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="flex flex-wrap items-center gap-2 text-[#5A5A5A] text-[13px] font-[Inter,sans-serif]"
        >
          <span>{author}</span>
          <span className="w-px h-3 bg-[#5A5A5A] opacity-40" />
          <span>{date}</span>
          <span className="w-px h-3 bg-[#5A5A5A] opacity-40" />
          <span>{readTime} min de leitura</span>
        </motion.div>
      </div>
    </section>
  );
}
