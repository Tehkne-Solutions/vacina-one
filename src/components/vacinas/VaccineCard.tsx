'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressVaccine } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface VaccineCardProps {
  vaccine: WordPressVaccine;
  index?: number;
}

export default function VaccineCard({ vaccine, index = 0 }: VaccineCardProps) {
  const acf = vaccine.acf ?? {};
  const name = acf.nome_popular || vaccine.title.rendered.replace(/<[^>]*>/g, '');
  const desc = acf.descricao_curta || vaccine.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 140);
  const available = acf.disponivel_para_agendamento !== false;
  const ctaText = acf.cta_texto || 'Agendar Vacinação';
  const appointmentHref = getWhatsAppHref(
    `Olá! Vim pelo site da VacinaOne e quero agendar a vacina ${name}.`
  );

  const chips = [
    acf.faixa_etaria && { label: 'Faixa etária', value: acf.faixa_etaria },
    acf.numero_de_doses && { label: 'Doses', value: acf.numero_de_doses },
    acf.reforco && { label: 'Reforço', value: acf.reforco },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6, borderColor: '#56B0BB' }}
      className="bg-white border border-[#EAF4EB] rounded-[28px] p-7 flex flex-col gap-4 shadow-[0_18px_45px_rgba(26,56,88,0.08)] hover:shadow-[0_24px_56px_rgba(26,56,88,0.13)] transition-all duration-300"
    >
      {/* Badge */}
      <span className="self-start text-[13px] font-semibold text-[#56B0BB] bg-[rgba(86,176,187,0.12)] px-3 py-1 rounded-full">
        Vacina
      </span>

      {/* Nome */}
      <h2 className="text-[22px] font-black text-[#1A3858] leading-snug">
        {name}
      </h2>

      {/* Descrição */}
      {desc && (
        <p className="text-[15px] text-[#5A5A5A] leading-relaxed line-clamp-3 flex-1">
          {desc}
        </p>
      )}

      {/* Chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip.label}
              className="text-[12px] text-[#1A3858] border border-[#EAF4EB] rounded-full px-3 py-1"
            >
              <span className="text-[#5A5A5A]">{chip.label}: </span>
              {chip.value}
            </span>
          ))}
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
        <Link
          href={`/vacinas/${vaccine.slug}`}
          aria-label={`Ver detalhes da vacina ${name}`}
          className="flex-1 inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-[14px] px-5 py-3 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
        >
          Ver detalhes
        </Link>

        {available && (
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Agendar vacinação: ${name}`}
            className="flex-1 inline-flex items-center justify-center bg-[#F0B954] text-white font-bold text-[14px] px-5 py-3 rounded-full hover:scale-105 transition-transform duration-200"
          >
            {ctaText}
          </a>
        )}
      </div>
    </motion.div>
  );
}
