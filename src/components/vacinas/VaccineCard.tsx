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
      whileHover={{ y: -5, borderColor: '#56B0BB' }}
      className="flex flex-col gap-4 rounded-[24px] border border-[#EAF4EB] bg-white p-6 shadow-[0_16px_38px_rgba(26,56,88,0.07)] transition-all duration-300 hover:shadow-[0_22px_48px_rgba(26,56,88,0.12)]"
    >
      <span className="self-start rounded-full bg-[rgba(86,176,187,0.12)] px-3 py-1 text-[12px] font-semibold text-[#56B0BB]">
        Vacina
      </span>

      <h2 className="text-[21px] font-black leading-snug text-[#1A3858]">{name}</h2>

      {desc && (
        <p className="line-clamp-3 flex-1 text-[14px] leading-relaxed text-[#5A5A5A]">{desc}</p>
      )}

      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span key={chip.label} className="rounded-full border border-[#EAF4EB] px-3 py-1 text-[12px] text-[#1A3858]">
              <span className="text-[#5A5A5A]">{chip.label}: </span>{chip.value}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-2 sm:flex-row">
        <Link
          href={`/vacinas/${vaccine.slug}`}
          aria-label={`Ver detalhes da vacina ${name}`}
          className="inline-flex h-[42px] flex-1 items-center justify-center rounded-[13px] border border-[#56B0BB] px-5 text-[14px] font-bold text-[#56B0BB] transition-colors duration-200 hover:bg-[#56B0BB] hover:text-white"
        >
          Ver detalhes
        </Link>

        {available && (
          <a
            href={appointmentHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Agendar vacinação: ${name}`}
            className="inline-flex h-[42px] flex-1 items-center justify-center rounded-[13px] bg-[#FFB703] px-5 text-[14px] font-black text-[#1A3858] transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
          >
            {ctaText}
          </a>
        )}
      </div>
    </motion.div>
  );
}
