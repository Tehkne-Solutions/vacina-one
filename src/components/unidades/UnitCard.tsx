'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WordPressUnit } from '@/types/wordpress';

interface UnitCardProps {
  unit: WordPressUnit;
  index?: number;
}

export default function UnitCard({ unit, index = 0 }: UnitCardProps) {
  const acf = unit.acf ?? {};
  const name = acf.nome_da_unidade || unit.title.rendered.replace(/<[^>]*>/g, '');
  const city = [acf.bairro, acf.cidade, acf.estado].filter(Boolean).join(' · ');
  const address = acf.endereco_completo;
  const phone = acf.telefone || acf.whatsapp;
  const hours = acf.horario_de_funcionamento;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="bg-white border border-[#EAF4EB] rounded-[24px] p-7 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Nome */}
      <h2 className="text-[18px] font-black text-[#1A3858] leading-snug">
        {name}
      </h2>

      {/* Localização */}
      {city && (
        <p className="text-[13px] font-semibold text-[#56B0BB] uppercase tracking-wide">
          {city}
        </p>
      )}

      {/* Endereço */}
      {address && (
        <p className="text-[14px] text-[#5A5A5A] leading-relaxed">{address}</p>
      )}

      {/* Horário */}
      {hours && (
        <p className="text-[13px] text-[#5A5A5A]">
          <span className="font-semibold text-[#1A3858]">Horário: </span>
          {hours}
        </p>
      )}

      {/* Telefone */}
      {phone && (
        <p className="text-[13px] text-[#5A5A5A]">
          <span className="font-semibold text-[#1A3858]">Contato: </span>
          {phone}
        </p>
      )}

      {/* Link */}
      <Link
        href={`/unidades/${unit.slug}`}
        aria-label={`Ver detalhes da unidade ${name}`}
        className="mt-auto inline-flex items-center gap-1 text-[#56B0BB] text-[13px] font-bold hover:underline"
      >
        Ver unidade →
      </Link>
    </motion.div>
  );
}
