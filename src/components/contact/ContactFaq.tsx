'use client';

import { useState } from 'react';
import { WordPressCustomPost } from '@/types/wordpress';

interface ContactFaqProps {
  faqs: WordPressCustomPost[];
}

export default function ContactFaq({ faqs }: ContactFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq.id}
          className="bg-white border border-[#EAF4EB] rounded-[20px] overflow-hidden"
        >
          <button
            onClick={() => toggleFaq(index)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[#F9FCFB] transition-colors focus:outline-none focus:ring-2 focus:ring-[#56B0BB] focus:ring-inset"
            aria-expanded={openIndex === index}
          >
            <h3 className="text-lg font-semibold text-[#1A3858] pr-4">
              {faq.title.rendered}
            </h3>
            <span className="text-[#56B0BB] text-xl flex-shrink-0">
              {openIndex === index ? '−' : '+'}
            </span>
          </button>

          {openIndex === index && (
            <div className="px-6 pb-4">
              <div
                className="text-[#5A5A5A] leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: faq.acf?.resposta_curta || faq.content.rendered || 'Resposta em breve.'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}