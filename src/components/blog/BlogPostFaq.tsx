'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface FaqItem {
  question: string;
  answer: string;
}

interface BlogPostFaqProps {
  items: FaqItem[];
}

export default function BlogPostFaq({ items }: BlogPostFaqProps) {
  const [open, setOpen] = useState<number>(0);

  if (items.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-[22px] font-black text-[#1A3858] mb-6">
        Dúvidas frequentes
      </h2>

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="border border-[#56B0BB] rounded-[20px] overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <span className="text-[15px] font-bold text-[#1A3858] leading-snug">
                {item.question}
              </span>
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#56B0BB] flex items-center justify-center text-[#56B0BB] transition-transform duration-200"
                style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-[14px] text-[#5A5A5A] leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
