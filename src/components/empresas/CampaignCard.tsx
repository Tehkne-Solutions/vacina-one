'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressCorporateCampaign } from '@/types/wordpress';
import { getWhatsAppHref } from '@/lib/whatsapp';

interface CampaignCardProps {
  campaign: WordPressCorporateCampaign;
  index?: number;
}

export default function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  const acf = campaign.acf ?? {};
  const name = acf.titulo_publico || campaign.title.rendered.replace(/<[^>]*>/g, '');
  const desc = acf.descricao_curta || campaign.excerpt.rendered.replace(/<[^>]*>/g, '').slice(0, 140);
  const ctaText = acf.cta_primario_texto || 'Ver campanha';

  const chips = [
    acf.publico_alvo && { label: 'Público', value: acf.publico_alvo },
    acf.modelo_de_atendimento && { label: 'Modelo', value: acf.modelo_de_atendimento },
    acf.regioes_atendidas && { label: 'Regiões', value: acf.regioes_atendidas },
  ].filter(Boolean) as { label: string; value: string }[];

  const whatsappUrl =
    acf.whatsapp_cta && acf.whatsapp_cta.startsWith('http')
      ? acf.whatsapp_cta
      : getWhatsAppHref(
          `Olá! Vim pelo site da VacinaOne e quero falar sobre campanha para empresas: ${name}.`
        );

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
        Empresas
      </span>

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
          href={`/empresas/${campaign.slug}`}
          aria-label={`Ver campanha: ${name}`}
          className="flex-1 inline-flex items-center justify-center border-2 border-[#56B0BB] text-[#56B0BB] font-bold text-[14px] px-5 py-3 rounded-full hover:bg-[#56B0BB] hover:text-white transition-colors duration-200"
        >
          {ctaText}
        </Link>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Falar no WhatsApp sobre: ${name}`}
          className="flex-1 inline-flex items-center justify-center bg-[#56B0BB] text-white font-bold text-[14px] px-5 py-3 rounded-full hover:scale-105 transition-transform duration-200"
        >
          WhatsApp
        </a>
      </div>
    </motion.div>
  );
}
