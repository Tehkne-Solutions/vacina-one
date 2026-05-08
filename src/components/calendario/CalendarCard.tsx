'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressCalendar } from '@/types/wordpress';

interface CalendarCardProps {
  item: WordPressCalendar;
  index?: number;
}

// Ícone visual por público (CSS puro, sem dependência)
function PublicIcon({ publico }: { publico: string }) {
  const initial = publico.charAt(0).toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full bg-[#EAF4EB] flex items-center justify-center flex-shrink-0">
      <span className="text-[18px] font-black text-[#56B0BB]">{initial}</span>
    </div>
  );
}

export default function CalendarCard({ item, index = 0 }: CalendarCardProps) {
  const acf = item.acf ?? {};
  const name = acf.titulo_publico || item.title.rendered.replace(/<[^>]*>/g, '');
  const desc = acf.descricao_curta || item.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 130);
  const ctaText = acf.cta_texto || 'Acessar calendário';
  const publico = acf.publico_alvo || name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6, borderColor: '#56B0BB' }}
      className="bg-white border border-[#EAF4EB] rounded-[28px] p-7 flex flex-col gap-4 shadow-[0_18px_45px_rgba(26,56,88,0.08)] hover:shadow-[0_24px_56px_rgba(26,56,88,0.13)] transition-all duration-300"
    >
      {/* Topo: ícone + badge */}
      <div className="flex items-center gap-3">
        <PublicIcon publico={publico} />
        <span className="text-[13px] font-semibold text-[#56B0BB] bg-[rgba(86,176,187,0.12)] px-3 py-1 rounded-full">
          Calendário
        </span>
      </div>

      {/* Nome */}
      <h2 className="text-[20px] font-black text-[#1A3858] leading-snug">
        {name}
      </h2>

      {/* Descrição */}
      {desc && (
        <p className="text-[14px] text-[#5A5A5A] leading-relaxed line-clamp-3 flex-1">
          {desc}
        </p>
      )}

      {/* Chips */}
      <div className="flex flex-wrap gap-2">
        {acf.faixa_etaria && (
          <span className="text-[12px] text-[#1A3858] border border-[#EAF4EB] rounded-full px-3 py-1">
            {acf.faixa_etaria}
          </span>
        )}
        {acf.publico_alvo && (
          <span className="text-[12px] text-[#1A3858] border border-[#EAF4EB] rounded-full px-3 py-1">
            {acf.publico_alvo}
          </span>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/calendario/${item.slug}`}
        aria-label={`Acessar calendário: ${name}`}
        className="mt-auto inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-[14px] px-5 py-3 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
      >
        {ctaText}
      </Link>
    </motion.div>
  );
}
